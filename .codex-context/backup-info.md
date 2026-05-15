# Backup Info: Coolify + Payload + PostgreSQL

Generisches Backup-Runbook fuer Payload CMS 3.x + Next.js Projekte auf Coolify mit PostgreSQL. Beispiele nutzen Platzhalter wie `<DOMAIN>`, `<SERVER_IP>`, `<PROJECT>` und `<APPLICATION_UUID>`.

Dieses Dokument beschreibt Production-Backups. Es ersetzt kein Git-Repository und kein Deployment-Runbook. Fuer Deployments zusaetzlich [deployment.md](deployment.md) und [coolify-handbook.md](coolify-handbook.md) lesen.

---

## 1. Was ist durch Git gesichert?

Git versioniert:

- Next.js/Payload Code
- Block-Definitionen, Collections, Globals und Hooks
- Styles, Komponenten und Renderer
- Dockerfile, `.dockerignore`, Config-Dateien
- Payload Migrationen in `src/migrations`
- Seed-/Import-Scripts, sofern committed

Git versioniert nicht:

- Live-PostgreSQL-Datenbank
- Payload Admin User und Sessions
- Live-Content in Pages, Jobs, Globals und Media-Metadaten
- Payload Upload-Dateien aus `/app/media`
- grosse statische Videos aus Bind Mounts wie `/app/public/videos`
- Coolify Secrets, Env Vars, Deploy Keys, API Tokens und Coolify-interne Settings

Fazit: Frontend und Schema sind ueber Git reproduzierbar. Die redaktionellen Live-Daten brauchen eigene Backups.

---

## 2. Backup-Schichten

Ein vollstaendiges Production-Backup besteht aus vier getrennten Schichten:

| Schicht | Enthalt | Standard-Backup |
| --- | --- | --- |
| Code | App, Schema, Migrationen, Dockerfile | Git Remote |
| PostgreSQL | Payload Content, User, Jobs, Globals, Media-Metadaten | Coolify Scheduled Database Backup |
| Payload Uploads | Dateien aus Media Uploads | Volume-Backup von `/app/media` |
| Statische Videos | grosse MP4s ausserhalb von Git | Bind-Mount-Backup, z. B. `/data/<PROJECT>/videos` |
| Coolify Instanz | Coolify Settings, Projects, Resources | Coolify Settings Backup + `APP_KEY` + SSH Keys |

Keine dieser Schichten ersetzt die andere.

---

## 3. Coolify PostgreSQL Backups

Coolify kann fuer PostgreSQL geplante Backups erstellen. Diese Backups sind Full Backups der ausgewaehlten Datenbank(en).

Empfohlene Konfiguration:

1. Coolify Dashboard oeffnen.
2. PostgreSQL Resource waehlen.
3. Backups aktivieren.
4. Schedule setzen, z. B. `daily` oder `0 */12 * * *`.
5. Datenbanknamen explizit setzen, falls mehrere Datenbanken existieren.
6. Backup-Ziel auf S3-kompatiblen Storage setzen.
7. Nach dem ersten Backup einen Restore-Test durchfuehren.

Coolify nutzt fuer PostgreSQL sinngemaess:

```bash
pg_dump --format=custom --no-acl --no-owner --username <USER> <DATABASE>
```

Restore erfolgt mit `pg_restore`, z. B.:

```bash
pg_restore --verbose --clean -h localhost -U <USER> -d <DATABASE> <BACKUP_FILE>
```

Wichtig:

- Custom Format Dumps sind praktisch fuer Restore mit `pg_restore`.
- Bei PostgreSQL-Major-Version-Wechseln kann ein Plain Dump robuster sein.
- Backups enthalten Content, User und potenziell personenbezogene Daten. Zugriff begrenzen und verschluesseln.

---

## 4. S3-kompatibler Storage

Backups duerfen nicht nur lokal auf demselben Server liegen. Wenn der Server ausfaellt, sind lokale Backups sonst ebenfalls weg.

Geeignete Ziele:

- Hetzner Object Storage
- Backblaze B2
- AWS S3
- Cloudflare R2
- MinIO
- Supabase Storage mit S3-kompatiblem Endpoint

Best Practices:

- Eigener Bucket pro Projekt oder Environment.
- Eigene Credentials nur fuer Backups.
- Schreibzugriff minimal halten.
- Lifecycle/Retention aktivieren.
- Server-seitige Verschluesselung aktivieren, falls verfuegbar.
- Restore-Zugriff getrennt dokumentieren.

Empfohlene Retention:

- 7 taegliche Backups
- 4 woechentliche Backups
- 3 monatliche Backups

Bei sehr aktivem CMS:

- alle 6 oder 12 Stunden PostgreSQL Backup
- taeglich Media-/Volume-Backup

---

## 5. Payload Media Volume sichern

PostgreSQL-Backups enthalten nur Media-Metadaten, nicht die Upload-Dateien selbst. Payload Uploads muessen separat gesichert werden.

Coolify Storage:

```text
Container Path: /app/media
```

Server-Pfad ermitteln:

```bash
docker inspect <APP_CONTAINER> \
  --format '{{range .Mounts}}{{println .Source "->" .Destination}}{{end}}'
```

Beispiel:

```text
/var/lib/docker/volumes/<VOLUME_NAME>/_data -> /app/media
```

Backup per `tar`:

```bash
TS="$(date +%Y%m%d-%H%M%S)"
mkdir -p /root/<PROJECT>-media-backups
tar -C /var/lib/docker/volumes/<VOLUME_NAME>/_data \
  -czf /root/<PROJECT>-media-backups/media-$TS.tgz .
```

Danach in S3 kopieren, z. B. mit `rclone`, `restic`, `aws s3 cp` oder `mc`.

Besser fuer regelmaessige Backups:

- `restic` fuer verschluesselte inkrementelle Backups
- `borg` fuer deduplizierte Backups
- `rclone sync` nur, wenn Versionierung/Retention im Bucket aktiv ist

---

## 6. Video Bind Mount sichern

Wenn Videos nicht in Git liegen und per Bind Mount ausgeliefert werden, gehoeren sie ebenfalls ins Backup.

Typisches Setup:

```text
Host:      /data/<PROJECT>/videos
Container: /app/public/videos
Public:    https://<DOMAIN>/videos/<FILE>.mp4
```

Backup:

```bash
TS="$(date +%Y%m%d-%H%M%S)"
mkdir -p /root/<PROJECT>-video-backups
tar -C /data/<PROJECT>/videos \
  -czf /root/<PROJECT>-video-backups/videos-$TS.tgz .
```

Wenn Videos gross sind:

- nicht taeglich voll tarballen, wenn sich selten etwas aendert
- lieber `restic`, `rclone sync` oder Object Storage mit Versionierung nutzen
- nach Uploads einmal sofort ein manuelles Backup ausfuehren

---

## 7. Coolify selbst sichern

Coolify hat eigene Backups fuer die Coolify-Instanz. Diese sichern Coolify Settings, nicht automatisch die App-Daten und Volumes.

Sichern:

- Coolify Settings -> Backup -> Backup Now oder Scheduled Backup
- S3 Backup aktivieren, wenn moeglich
- `APP_KEY` aus `/data/coolify/source/.env` sicher speichern
- SSH Keys aus `/data/coolify/ssh/keys` sichern

Wichtig:

- Ohne `APP_KEY` kann ein Coolify-Backup nicht korrekt entschluesselt/restored werden.
- Coolify-Backup ersetzt kein PostgreSQL-Backup der App.
- Coolify-Backup ersetzt kein `/app/media` Volume-Backup.

---

## 8. Manuelles PostgreSQL Backup per SSH

Vor riskanten Aktionen wie Production-DB-Ueberschreiben, Migrationen mit Schema-Drift oder grossen Imports immer ein manuelles Backup ziehen.

Container finden:

```bash
docker ps --format '{{.ID}} {{.Names}} {{.Image}}'
```

Backup im PostgreSQL Container erzeugen:

```bash
TS="$(date +%Y%m%d-%H%M%S)"
PG_CONTAINER="<POSTGRES_CONTAINER>"
mkdir -p /root/<PROJECT>-db-backups

docker exec "$PG_CONTAINER" sh -lc '
  export PGPASSWORD="$POSTGRES_PASSWORD"
  pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" \
    --format=custom --no-owner --no-privileges \
    -f /tmp/prod-$TS.dump
'

docker cp "$PG_CONTAINER:/tmp/prod-$TS.dump" \
  "/root/<PROJECT>-db-backups/prod-$TS.dump"
```

Hinweis: Variablen innerhalb des Container-Kommandos muessen je nach Shell quoting korrekt uebergeben werden. Vor Automatisierung immer mit einem Testlauf pruefen.

---

## 9. Restore-Test

Ein Backup ist erst belastbar, wenn Restore getestet wurde.

Minimaler Restore-Test:

1. Frisches lokales oder separates PostgreSQL starten.
2. Dump importieren.
3. App mit dieser DB starten.
4. `/admin`, `/`, eine Unterseite, Media-Dateien und Jobs pruefen.
5. Payload Login und Media-Preview testen.

Restore mit Custom Dump:

```bash
pg_restore --verbose --clean --if-exists \
  -h <HOST> -U <USER> -d <DATABASE> <BACKUP_FILE>
```

Bei komplett leerer Testdatenbank:

```bash
createdb <DATABASE>
pg_restore --verbose -h <HOST> -U <USER> -d <DATABASE> <BACKUP_FILE>
```

---

## 10. Production-Sync und Datenbank-Ueberschreiben

Lokale DB auf Live zu kopieren ist kein normales Deployment, sondern ein Daten-Replace. Nur machen, wenn der User das explizit verlangt.

Vorher:

- aktuellen Git Commit pushen
- Coolify Deploy abwarten
- Production PostgreSQL Backup ziehen
- Production `/app/media` Backup ziehen
- optional Video-Bind-Mount sichern
- App kurz stoppen oder Wartungsfenster nutzen

Danach:

- lokale DB mit `pg_dump --format=custom --no-owner --no-privileges` exportieren
- Production Schema kontrolliert droppen/restoren
- `payload_migrations` pruefen
- lokale `media/` Dateien nach `/app/media` synchronisieren
- App starten
- Logs pruefen
- alle relevanten Pages und `/admin` pruefen
- Revalidation fuer alle oeffentlichen Pfade ausloesen

Wenn die lokale DB durch Payload Dev-Schema-Push entstanden ist, kann ein `payload_migrations` Eintrag mit `name = 'dev'` und `batch = -1` existieren. In Production darf der Container dann nicht an einem interaktiven Migration-Prompt haengen bleiben.

Nach Restore pruefen:

```sql
select name, batch from payload_migrations order by name;
select count(*) from pages_blocks_static_page;
select count(*) from media;
select count(*) from users;
```

---

## 11. Monitoring und Alerting

Regelmaessig pruefen:

- Backup Jobs laufen erfolgreich.
- S3 Bucket erhaelt neue Dateien.
- Backup-Dateigroesse ist plausibel.
- Server-Disk laeuft nicht voll.
- PostgreSQL Resource ist `healthy`.
- App kann Media-Dateien aus `/api/media/file/...` ausliefern.

Automatisierbare Checks:

```bash
curl -f https://<DOMAIN> >/dev/null
curl -f https://<DOMAIN>/admin >/dev/null
curl -I https://<DOMAIN>/api/media/file/<KNOWN_FILE>
```

---

## 12. Agent-Regeln

Wenn der User nach Backup, Restore, Production DB Sync, Datenbank-Ueberschreiben oder Coolify Backup fragt:

1. Dieses Dokument lesen.
2. Bei Coolify/PostgreSQL zusaetzlich [coolify-handbook.md](coolify-handbook.md) lesen.
3. Vor destruktiven Restore-/Overwrite-Aktionen immer Production-Backups erstellen.
4. Keine Secrets, Tokens oder Dumps committen.
5. Lokale temporare Dumps nach Abschluss entfernen.
6. Ergebnis mit DB-Zaehlern, HTTP Checks und Media Checks verifizieren.
