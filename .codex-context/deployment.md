# Deployment: Coolify + PostgreSQL

Standard-Anleitung fuer Payload CMS 3.x + Next.js App Router Deployments auf Coolify mit PostgreSQL. Fuer operative Server- und API-Automation immer zusaetzlich [coolify-handbook.md](coolify-handbook.md) lesen. Fuer Backups, Restore, Production DB Sync und Media-Volume Sicherung zusaetzlich [backup-info.md](backup-info.md) lesen.

Diese Anleitung ist generisch. Beispiele nutzen `<DOMAIN>`, `<SERVER_IP>`, `<REPO>` und `<BRANCH>` als Platzhalter.

---

## 1. Voraussetzungen im Repo

- Payload CMS 3.x + Next.js als Single-Repo.
- PostgreSQL Adapter ist konfiguriert; Production nutzt keine SQLite-Datenbank.
- `output: "standalone"` ist in `next.config.mjs` gesetzt.
- `Dockerfile` und `.dockerignore` liegen im Repo-Root.
- `src/migrations` ist committed. Ohne committed Migrationen erzeugt `payload migrate` in Production keine verlaessliche initiale Tabellenstruktur.
- Payload-Seiten verwenden ISR (`revalidate`) statt `force-dynamic`.
- Pages, Jobs und Globals haben `afterChange` Hooks, die direkt `revalidatePath()` aufrufen.
- Optional externe Revalidation Route: `POST /api/revalidate` mit Header `x-revalidation-secret`.

---

## 2. Repo Readiness

### `next.config.mjs`

```js
const nextConfig = {
  output: "standalone",
  // bestehende Config
}

export default nextConfig
```

### `.dockerignore`

```dockerignore
node_modules/
.next/
.git/
.github/
.claude/
.env
.env.local
.env.*.local
*.log
dist/
.output/
.turbo/
docker-compose.yml
.DS_Store
public/videos/
```

`public/videos/` nur ausschliessen, wenn Videos separat als Bind Mount bereitgestellt werden.

### Payload Migrations

Vor dem ersten Production Deploy:

```bash
npm run payload -- migrate:create initial_schema --skip-empty
```

Committen:

- `src/migrations/*.ts`
- `src/migrations/*.json`
- `src/migrations/index.ts`

---

## 3. Dockerfile Template

Das Template ist fuer ARM64 und x86_64 geeignet und nutzt Debian/glibc statt Alpine, um native Module wie `sharp` stabil zu betreiben.

```dockerfile
# syntax=docker/dockerfile:1.4

FROM node:22-slim AS deps
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /app
RUN npm install -g npm@11
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --legacy-peer-deps

FROM node:22-slim AS builder
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /app
RUN npm install -g npm@11
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG PAYLOAD_SECRET=build-time-placeholder
ARG SERVER_URL=http://localhost:3000
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3000
ARG DATABASE_URL=postgresql://placeholder:placeholder@localhost:5432/placeholder

ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV SERVER_URL=$SERVER_URL
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NODE_OPTIONS=--no-deprecation

RUN node node_modules/.bin/payload generate:importmap
RUN node --max-old-space-size=2048 node_modules/next/dist/bin/next build

FROM node:22-slim AS runner
RUN apt-get update && apt-get install -y --no-install-recommends libvips && rm -rf /var/lib/apt/lists/*
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS=--no-deprecation
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/src ./src
COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json ./tsconfig.json
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

RUN mkdir -p /app/media /app/public/videos && chown -R nextjs:nodejs /app/media /app/public/videos

USER nextjs
EXPOSE 3000

CMD ["sh", "-c", "node node_modules/.bin/payload migrate && exec node server.js"]
```

Kritische Details:

- `node:22-slim`: Debian/glibc vermeidet Alpine-musl Probleme bei nativen Paketen.
- `npm@11`: Version explizit setzen, damit `package-lock.json` reproduzierbar installiert wird.
- `npm ci --legacy-peer-deps`: verwenden, wenn das Repo damit entwickelt wurde.
- `node_modules` im Runner: Payload CLI und native Module werden vom Standalone Bundle nicht vollstaendig abgedeckt.
- `src` im Runner: `payload migrate` braucht Payload Config, Collections und Migrationen.
- `payload migrate && exec node server.js`: Migrationen laufen bei jedem Start idempotent vor dem Next Server.

---

## 4. ISR und Revalidation

Production-Seiten sollen nicht `force-dynamic` nutzen. Standard:

```ts
export const revalidate = 3600
```

Statische Slugs sollen per `generateStaticParams()` aus der bekannten Seitenliste oder CMS-Slug-Quelle abgeleitet werden.

Payload-Zugriffe in Seiten muessen build-tolerant sein:

```ts
let data = null

try {
  const payload = await getPayload({ config: configPromise })
  data = await payload.findGlobal({ slug: "site-settings" })
} catch {
  // Build-Zeit oder leere DB: statischer Fallback
}
```

Direkte Hooks statt HTTP-Fetch aus dem Container:

```ts
import { revalidatePath } from "next/cache"
import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from "payload"

export const revalidateLayout: GlobalAfterChangeHook = ({ doc }) => {
  revalidatePath("/", "layout")
  return doc
}

export const revalidatePage: CollectionAfterChangeHook = ({ doc }) => {
  const slug = typeof doc.slug === "string" ? doc.slug : undefined
  revalidatePath(slug && slug !== "home" ? `/${slug}` : "/")
  return doc
}
```

Jobs sollten mindestens `/` und `/jobs-finden` revalidieren. Globals revalidieren das Layout.

Externe Route:

```ts
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidation-secret")

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const path = typeof body?.path === "string" ? body.path : "/"

  if (path === "/") {
    revalidatePath("/", "layout")
  } else {
    revalidatePath(path)
  }

  return NextResponse.json({ revalidated: true, path, timestamp: Date.now() })
}
```

---

## 5. Coolify Konfiguration

Vor Server-/API-Details [coolify-handbook.md](coolify-handbook.md) lesen.

### Server

- Ubuntu 24.04
- Docker + Buildx + BuildKit
- 4 GB Swap fuer Builds
- UFW: 22, 80, 443, 8000
- Coolify erreichbar unter `http://<SERVER_IP>:8000`
- Nach Erstlogin API Token erstellen, wenn ein Agent die Einrichtung uebernehmen soll

### PostgreSQL

In Coolify eine PostgreSQL 16 Resource erstellen. App nutzt die interne Connection URL:

```env
DATABASE_URL=postgresql://<USER>:<PASSWORD>@<POSTGRES_RESOURCE_NAME>:5432/<DATABASE>
```

Keine Datenbank-Datei, kein `/app/data` Volume, keine SQLite-Pfade.

### Application

- Build Pack: `Dockerfile`
- Base Directory: `/`
- Dockerfile Location: `/Dockerfile`
- Port: `3000`
- Branch: `<BRANCH>`
- Domains: `https://<DOMAIN>` und optional `https://www.<DOMAIN>`
- Redirect: waehrend DNS-Propagation optional `both`, danach Projektstandard

### Environment Variables

Runtime:

```env
DATABASE_URL=<COOLIFY_INTERNAL_POSTGRES_URL>
PAYLOAD_SECRET=<openssl rand -hex 32>
SERVER_URL=https://<DOMAIN>
NEXT_PUBLIC_SERVER_URL=https://<DOMAIN>
REVALIDATION_SECRET=<openssl rand -hex 32>
NODE_ENV=production
```

Build-time:

```env
PAYLOAD_SECRET=<placeholder-or-real-secret>
SERVER_URL=https://<DOMAIN>
NEXT_PUBLIC_SERVER_URL=https://<DOMAIN>
DATABASE_URL=postgresql://placeholder:placeholder@localhost:5432/placeholder
```

### Storages

Vor dem ersten Deploy:

| Typ | Container Path | Zweck |
| --- | --- | --- |
| Docker Volume | `/app/media` | Payload Uploads |
| Optional Bind Mount | `/app/public/videos` | grosse Videos ausserhalb von Git |

---

## 6. Deploy und Verification

Deploy in Coolify starten und Logs bis zum Abschluss verfolgen.

Erwartete Logs:

- `payload generate:importmap`
- `next build`
- `Reading migration files from /app/src/migrations`
- `Migrated: ...` beim ersten Deploy oder `Done.` bei spaeteren Deploys
- `Next.js ... Ready`

Server pruefen:

```bash
docker ps -a
docker logs --tail 200 <APP_CONTAINER>
```

HTTP/HTTPS pruefen:

```bash
curl -I -L http://<DOMAIN>
curl -I https://<DOMAIN>
curl -I https://www.<DOMAIN>
curl -I https://<DOMAIN>/admin
```

Revalidation pruefen:

```bash
curl -X POST "https://<DOMAIN>/api/revalidate" \
  -H "x-revalidation-secret: <REVALIDATION_SECRET>"
```

Nach dem ersten Deploy:

1. `/admin` oeffnen und ersten Admin-User erstellen.
2. Content importieren oder Seed ausfuehren, falls Production die lokalen Pages/Jobs/Globals enthalten soll. `payload migrate` legt nur Tabellen an, kopiert aber keine lokalen Daten.
3. Nach CLI-Seeds die externe Revalidation Route ausfuehren, weil `revalidatePath()` Hooks ausserhalb eines Next-Request-Kontexts nur warnen koennen.
4. Payload Upload testen und nach Redeploy pruefen, ob die Datei erhalten bleibt.

Seed-Beispiel, wenn `src/seed.ts` im Runner vorhanden ist:

```bash
docker exec <APP_CONTAINER> sh -lc 'node --import=tsx/esm src/seed.ts'

curl -X POST "https://<DOMAIN>/api/revalidate" \
  -H "x-revalidation-secret: <REVALIDATION_SECRET>"
```

Vor jedem Seed pruefen, ob das Script User beruehrt oder bestehende Production-Inhalte ueberschreibt.

### Backups nach dem ersten Deploy

Nach dem ersten erfolgreichen Production-Deploy muss ein Backup-Konzept eingerichtet werden. Details stehen in [backup-info.md](backup-info.md).

Minimum:

- PostgreSQL Scheduled Backups in Coolify aktivieren.
- S3-kompatiblen externen Storage nutzen, nicht nur lokale Server-Backups.
- Payload Upload Volume `/app/media` separat sichern.
- Video Bind Mounts wie `/app/public/videos` separat sichern.
- Coolify Settings Backup, `APP_KEY` und Coolify SSH Keys sichern.
- Restore-Test dokumentieren.

---

## 7. DNS und SSL

DNS:

```text
<DOMAIN>       A  <SERVER_IP>
www.<DOMAIN>   A  <SERVER_IP>
```

Public Resolver testen:

```bash
for r in 1.1.1.1 8.8.8.8 9.9.9.9; do
  nslookup <DOMAIN> "$r"
  nslookup www.<DOMAIN> "$r"
done
```

Wenn ein Geraet noch `Not Found` von einem alten Server zeigt:

- alte Ziel-IP per DNS-Check bestaetigen
- lokalen DNS-/Browser-Cache abwarten oder leeren
- Apex und `www` getrennt testen
- Coolify temporaer auf `redirect: both` setzen, damit ein korrekt propagiertes `www` nicht auf einen lokal gecachten Apex umgeleitet wird

SSL erst aktivieren, wenn die relevanten A-Records auf `<SERVER_IP>` zeigen.

---

## 8. Troubleshooting

### Build bricht wegen Speicher ab

- 4 GB Swap aktivieren.
- `.dockerignore` pruefen.
- Videos und grosse lokale Artefakte nicht in den Build Context kopieren.
- `node --max-old-space-size=2048 ... next build` verwenden.

### BuildKit Cache-Mount wird ignoriert

- `docker-buildx-plugin` installieren.
- `/etc/docker/daemon.json` um `"features": { "buildkit": true }` ergaenzen.
- Docker neu starten.

### `npm ci` scheitert

- npm-Version im Dockerfile an Lockfile anpassen, standardmaessig `npm@11`.
- Bei bestehendem Lockfile `npm ci --legacy-peer-deps` verwenden.

### Tabellen fehlen in Production

- `src/migrations` wurde nicht committed oder nicht in den Runner kopiert.
- Migration lokal erzeugen und committen.
- Runner muss `src`, `node_modules`, `tsconfig.json` und `package.json` enthalten.
- Containerstart muss `payload migrate` ausfuehren.

### `502 Bad Gateway`

- Coolify Port muss `3000` sein.
- Next Standalone braucht `output: "standalone"`.
- Container muss auf `0.0.0.0` binden.
- Container logs auf Migration- oder Startfehler pruefen.

### Uploads verschwinden nach Redeploy

- Coolify Storage `/app/media` fehlt.
- Volume vor dem ersten Deploy konfigurieren und danach erneut deployen.

---

## 9. Checkliste

- [ ] `output: "standalone"` gesetzt
- [ ] `.dockerignore` vorhanden
- [ ] Dockerfile nutzt Postgres-kompatibles Standalone Runner Pattern
- [ ] `src/migrations` committed
- [ ] ISR statt `force-dynamic`
- [ ] Revalidation Hooks in Pages, Jobs und Globals
- [ ] Coolify API Token erstellt, falls Agent konfigurieren soll
- [ ] PostgreSQL 16 Resource healthy
- [ ] App Build Pack `Dockerfile`
- [ ] Env Vars gesetzt: `DATABASE_URL`, `PAYLOAD_SECRET`, `SERVER_URL`, `NEXT_PUBLIC_SERVER_URL`, `REVALIDATION_SECRET`, `NODE_ENV`
- [ ] Storage `/app/media` gesetzt
- [ ] DNS fuer Apex und optional `www` korrekt
- [ ] Deploy erfolgreich
- [ ] Migration erfolgreich
- [ ] `/`, `/admin`, `/api/revalidate` getestet
- [ ] API Token nach Setup rotiert oder geloescht
