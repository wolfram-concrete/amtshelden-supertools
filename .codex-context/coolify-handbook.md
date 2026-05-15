# Coolify Handbook: Payload CMS + Next.js + PostgreSQL

Generisches Runbook fuer neue Payload CMS 3.x + Next.js Instanzen auf einem Ubuntu/ARM64 Server mit Coolify. Beispiele nutzen Platzhalter wie `<SERVER_IP>`, `<DOMAIN>` und `<REPO>` und duerfen nicht projektspezifisch ersetzt werden, wenn dieses Handbook als Skill-Referenz genutzt wird. Fuer Backups, Restore und Production-Daten-Sync zusaetzlich [backup-info.md](backup-info.md) lesen.

---

## 1. Voraussetzungen

- Server: Ubuntu 24.04, ARM64 oder x86_64, mindestens 4 GB RAM, SSH-Zugriff als `root` oder sudo-User.
- DNS-Zugriff: A-Records fuer Apex und optional `www` muessen auf `<SERVER_IP>` zeigen.
- GitHub-Repository: Payload CMS 3.x + Next.js App Router, PostgreSQL Adapter, Branch fuer Production Deploy.
- Repo ist deployment-ready:
  - `output: "standalone"` in `next.config.mjs`
  - `Dockerfile` und `.dockerignore` im Repo-Root
  - `.env.example` dokumentiert Production-Variablen
  - `src/migrations` ist committed
  - keine `force-dynamic` Seiten, sondern ISR mit `revalidate`
  - Revalidation Hooks fuer Pages, Jobs und Globals vorhanden

---

## 2. Server Bootstrap

Vor Coolify-Deploys zuerst Swap, Docker, BuildKit und Firewall einrichten.

```bash
ssh root@<SERVER_IP>

# Swap: wichtig fuer Next/Payload Builds auf kleinen Servern.
fallocate -l 4G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
grep -q '^/swapfile ' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
grep -q '^vm.swappiness=10' /etc/sysctl.conf || echo 'vm.swappiness=10' >> /etc/sysctl.conf
sysctl -p

# Docker installieren.
apt-get update
curl -fsSL https://get.docker.com | sh
apt-get install -y docker-buildx-plugin ufw
systemctl enable docker
systemctl start docker
```

BuildKit und Docker-Logrotation bestehend-schonend aktivieren. Wenn `/etc/docker/daemon.json` bereits existiert, die vorhandenen Keys behalten und nur die fehlenden Keys ergaenzen.

```json
{
  "features": { "buildkit": true },
  "log-driver": "json-file",
  "log-opts": { "max-size": "10m", "max-file": "3" }
}
```

```bash
systemctl restart docker
docker buildx ls

ufw default deny incoming
ufw default allow outgoing
ufw allow 22
ufw allow 80
ufw allow 443
ufw allow 8000
ufw --force enable
```

Coolify installieren:

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

Danach `http://<SERVER_IP>:8000` oeffnen und den ersten Admin-Account anlegen.

---

## 3. API Token Flow fuer Agenten

Nach der Coolify-Erstinstallation muss ein API Token erstellt werden, damit ein Agent die restliche Konfiguration selbststaendig per API einrichten kann.

1. Coolify Dashboard oeffnen: `http://<SERVER_IP>:8000`
2. Admin-Account erstellen oder einloggen.
3. Settings -> API Tokens -> Generate.
4. Token dem Agenten nur temporaer geben.
5. Nach erfolgreichem Setup Token rotieren oder loeschen.

Token testen:

```bash
BASE="http://<SERVER_IP>:8000/api/v1"
TOKEN="<COOLIFY_API_TOKEN>"

curl -s "$BASE/version" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json"
```

Token niemals in Git committen, in Logs wiederholen oder in Dokumentation festhalten.

---

## 4. Coolify API Setup

### 4.1 Project und Environment

Wenn ein Project/Environment bereits existiert, dieses verwenden. Sonst neu anlegen.

```bash
curl -s "$BASE/projects" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json"
```

Merke:

- `<PROJECT_UUID>`
- `<ENVIRONMENT_UUID>`
- `<SERVER_UUID>` fuer den lokalen Coolify-Server
- `<DESTINATION_UUID>` fuer das Docker-Netzwerk/Destination

### 4.2 PostgreSQL Resource

In Coolify eine PostgreSQL 16 Resource erstellen. Fuer Production immer die interne Coolify Connection URL verwenden, nicht `localhost`.

Runtime-Format:

```env
DATABASE_URL=postgresql://<USER>:<PASSWORD>@<POSTGRES_RESOURCE_NAME>:5432/<DATABASE>
```

Die Datenbank muss vor dem App-Deploy laufen und healthy sein.

### 4.3 Application Resource

App aus GitHub Repo anlegen:

- Source: GitHub oder Git URL
- Repository: `<REPO>`
- Branch: `<BRANCH>`
- Build Pack: `Dockerfile`
- Base Directory: `/`
- Dockerfile: `/Dockerfile`
- Port: `3000`
- Domains: `https://<DOMAIN>` und optional `https://www.<DOMAIN>`
- Redirect: fuer erste DNS-Phase optional `both`, spaeter je nach Wunsch `non-www` oder `www`

Bei privaten Repositories Deploy Key erzeugen und in GitHub als read-only Deploy Key hinterlegen. Danach von Coolify/Server aus pruefen:

```bash
ssh -T git@github.com
git ls-remote <REPO> <BRANCH>
```

### 4.4 Environment Variables

Runtime Env:

```env
DATABASE_URL=<COOLIFY_INTERNAL_POSTGRES_URL>
PAYLOAD_SECRET=<openssl rand -hex 32>
SERVER_URL=https://<DOMAIN>
NEXT_PUBLIC_SERVER_URL=https://<DOMAIN>
REVALIDATION_SECRET=<openssl rand -hex 32>
NODE_ENV=production
```

Build Env:

```env
PAYLOAD_SECRET=<build-time-placeholder-or-real-secret>
SERVER_URL=https://<DOMAIN>
NEXT_PUBLIC_SERVER_URL=https://<DOMAIN>
DATABASE_URL=postgresql://placeholder:placeholder@localhost:5432/placeholder
```

Wenn die App beim Build Payload-Daten liest, muessen alle Payload-Zugriffe mit Fallbacks abgesichert sein. Der Build darf ohne echte Tabellen erfolgreich sein.

### 4.5 Storages

Vor dem ersten Deploy konfigurieren:

| Typ | Container Path | Zweck |
| --- | --- | --- |
| Docker Volume | `/app/media` | Payload Uploads |
| Optional Bind Mount | `/app/public/videos` | grosse statische Videos, die nicht im Git liegen |

Keine SQLite-Volumes konfigurieren. PostgreSQL ist eine eigene Coolify Resource.

### 4.6 Deploy starten und Logs pollen

```bash
curl -s "$BASE/deploy?uuid=<APPLICATION_UUID>" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json"
```

Deployment Status:

```bash
curl -s "$BASE/deployments/<DEPLOYMENT_UUID>" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json"
```

Logs bis `finished` oder `failed` pollen. Kritische Logzeilen:

- `payload migrate` liest `src/migrations`
- Migrationen laufen ohne Fehler
- `Next.js ... Ready`
- Rolling update completed

---

## 5. DNS und SSL

DNS vor SSL-Ausstellung setzen:

```text
<DOMAIN>       A  <SERVER_IP>
www.<DOMAIN>   A  <SERVER_IP>
```

Pruefen:

```bash
for r in 1.1.1.1 8.8.8.8 9.9.9.9; do
  nslookup <DOMAIN> "$r"
  nslookup www.<DOMAIN> "$r"
done
```

Wichtige Lessons:

- Lokale Resolver koennen Apex oder `www` noch auf eine alte IP cachen, obwohl Public Resolver korrekt sind.
- Apex und `www` immer getrennt testen.
- Wenn Apex noch cached, `www` aber schon korrekt ist, Coolify temporaer auf `redirect: both` setzen. So wird `www` nicht auf den gecachten Apex umgeleitet.
- Eine alte Apache/nginx-Seite mit `Not Found` oder `Forbidden` ist meist ein Hinweis auf alte DNS-Ziel-IP, nicht auf die Coolify-App.

Endpunkte testen:

```bash
curl -I -L http://<DOMAIN>
curl -I https://<DOMAIN>
curl -I https://www.<DOMAIN>
curl -I https://<DOMAIN>/admin
```

---

## 6. Post-Deploy Verification

Container und Datenbank:

```bash
docker ps -a
docker logs --tail 200 <APP_CONTAINER>
```

Erwartung:

- PostgreSQL Resource ist `running:healthy`.
- App Container ist `Up`.
- Logs zeigen `Reading migration files from /app/src/migrations`.
- Erste Migration wurde angewendet oder bei spaeteren Deploys steht `Done`.
- `/` und `/admin` liefern `200`.

Migrationen sind nur Schema. Wenn lokale Pages, Jobs, Globals oder andere Inhalte in Production vorhanden sein sollen, muss ein Seed oder Datenimport separat laufen. Vor dem Seed pruefen, ob das Script User oder bestehende Production-Daten veraendert.

```bash
docker exec <APP_CONTAINER> sh -lc 'node --import=tsx/esm src/seed.ts'
```

Nach einem CLI-Seed die externe Revalidation Route ausfuehren. Direkte `revalidatePath()` Hooks koennen ausserhalb eines Next-Request-Kontexts nur Warnungen ausgeben.

Revalidation testen:

```bash
curl -X POST "https://<DOMAIN>/api/revalidate" \
  -H "x-revalidation-secret: <REVALIDATION_SECRET>"
```

Media testen:

- Payload Upload in `/app/media` hochladen.
- Redeploy ausloesen.
- Upload-URL erneut oeffnen und Persistenz bestaetigen.

---

## 7. Troubleshooting

### Domain zeigt `Not Found` von altem Server

Ursache: DNS ist noch nicht voll propagiert oder lokaler Resolver cached alte IP.

Fix:

- Public Resolver gegenpruefen.
- Apex und `www` getrennt testen.
- Browser-/OS-DNS-Cache abwarten oder leeren.
- In Coolify temporaer `redirect: both` setzen, wenn nur `www` korrekt propagiert ist.

### GitHub Deploy Key funktioniert nicht

Ursache: Public Key fehlt in GitHub oder ist nicht fuer das richtige Repo hinterlegt.

Fix:

- Deploy Key in Coolify kopieren.
- GitHub Repo -> Settings -> Deploy keys -> Key read-only hinzufuegen.
- `git ls-remote <REPO> <BRANCH>` vom Server pruefen.

### Build OOM oder haengt

Ursache: zu wenig RAM/Swap oder zu grosses Docker Build Context.

Fix:

- 4 GB Swap aktivieren.
- `.dockerignore` pruefen.
- `public/videos`, `.next`, `node_modules`, `.git`, Logs und lokale Env-Dateien ausschliessen.
- `next build` mit `node --max-old-space-size=2048` starten.

### BuildKit Cache-Mount funktioniert nicht

Ursache: BuildKit oder Buildx fehlt.

Fix:

- `/etc/docker/daemon.json` enthaelt `"features": { "buildkit": true }`.
- `docker-buildx-plugin` ist installiert.
- Docker wurde neu gestartet.

### `npm ci` scheitert an Peer Dependencies

Ursache: Lockfile wurde mit neuer npm-Version erzeugt oder Peer Dependencies sind streng.

Fix:

- Im Dockerfile npm-Version explizit setzen, z. B. `npm@11`.
- `npm ci --legacy-peer-deps` verwenden, wenn das Repo damit entwickelt wurde.

### Container startet, aber Tabellen fehlen

Ursache: `src/migrations` fehlt im Repo oder wird nicht in den Runner kopiert.

Fix:

- Migration lokal erzeugen und committen: `npm run payload -- migrate:create initial_schema --skip-empty`.
- `src/migrations` und `src/migrations/index.ts` committen.
- Runner kopiert `src`, `tsconfig.json`, `package.json` und `node_modules`.
- Start Command fuehrt `node node_modules/.bin/payload migrate && exec node server.js` aus.

### Admin ist leer, obwohl Migration erfolgreich war

Ursache: Migrationen haben das Schema angelegt, aber keine lokalen Inhalte kopiert.

Fix:

- Production Seed oder Datenimport ausfuehren.
- Counts in `pages`, `jobs` und Globals pruefen.
- Danach externe Revalidation Route aufrufen.

### `502 Bad Gateway`

Ursache: falscher Port, Server bindet nicht auf `0.0.0.0`, `server.js` fehlt oder Migration bricht ab.

Fix:

- Coolify Port: `3000`.
- Dockerfile: `ENV HOSTNAME=0.0.0.0`, `ENV PORT=3000`.
- `output: "standalone"` in Next config.
- Container logs pruefen.

### Uploads verschwinden nach Redeploy

Ursache: `/app/media` ist kein persistentes Volume.

Fix:

- Coolify Storage: Docker Volume auf `/app/media`.
- Vor erstem Deploy konfigurieren.

### Backup fehlt oder ist unvollstaendig

Ursache: Nur PostgreSQL wurde gesichert, aber Payload Uploads, Video-Bind-Mounts oder Coolify Settings wurden vergessen.

Fix:

- [backup-info.md](backup-info.md) lesen.
- Coolify PostgreSQL Scheduled Backups aktivieren.
- Externes S3-kompatibles Backup-Ziel konfigurieren.
- `/app/media` Volume separat sichern.
- `/app/public/videos` Bind Mount separat sichern, falls Videos ausserhalb von Git liegen.
- Coolify Settings Backup, `APP_KEY` und SSH Keys sichern.
- Restore-Test auf separater DB/App durchfuehren.

---

## 8. Deployment Checkliste

- [ ] DNS-Zugriff vorhanden
- [ ] SSH auf `<SERVER_IP>` funktioniert
- [ ] 4 GB Swap aktiv
- [ ] Docker, Buildx und BuildKit aktiv
- [ ] Coolify installiert und erreichbar
- [ ] Coolify API Token erstellt und temporaer an Agent uebergeben
- [ ] GitHub Deploy Key hinterlegt und getestet
- [ ] PostgreSQL 16 Resource erstellt und healthy
- [ ] App Resource mit Build Pack `Dockerfile`
- [ ] Port `3000`, Base Directory `/`, Dockerfile `/Dockerfile`
- [ ] Env Vars gesetzt: `DATABASE_URL`, `PAYLOAD_SECRET`, `SERVER_URL`, `NEXT_PUBLIC_SERVER_URL`, `REVALIDATION_SECRET`, `NODE_ENV`
- [ ] Storage `/app/media` vor erstem Deploy gesetzt
- [ ] Backup-Konzept nach [backup-info.md](backup-info.md) eingerichtet
- [ ] `src/migrations` committed
- [ ] Deploy gestartet und Logs bis `finished` gepollt
- [ ] Migration erfolgreich
- [ ] `/`, `/admin`, `/api/revalidate` getestet
- [ ] DNS/SSL fuer Apex und `www` geprueft
- [ ] API Token nach Setup rotiert oder geloescht
