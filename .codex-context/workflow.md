# Workflow: Lokal entwickeln, live pflegen

Best-Practice Workflow fuer Payload CMS + Next.js Projekte nach dem ersten Production Deploy. Ziel ist eine klare Trennung zwischen Code, Schema und Content, damit Designer, Entwickler und Agenten ohne doppelte Arbeit oder Datenverlust zusammenarbeiten.

---

## 1. Grundprinzip

**Production Payload ist die Source of Truth fuer Inhalte.**

**Git ist die Source of Truth fuer Code, Komponenten, Schema und Migrationen.**

Das bedeutet:

- Texte, Jobs, Seiteninhalte, Navigation, Footer und SEO-Texte werden live im Payload Admin gepflegt.
- Komponenten, Layout-Logik, neue Felder, Blocks, Collections, Globals und Hooks werden lokal entwickelt und per Git/Coolify deployed.
- Lokale Datenbanken sind Arbeitskopien. Sie duerfen Production nicht ungeprueft ueberschreiben.
- Seeds sind fuer Initialbefuellung oder kontrollierte Imports gedacht, nicht fuer laufende Content-Pflege.

---

## 2. Entscheidungsbaum

| Aenderung                               | Wo arbeiten?                   | Deploy noetig? | Danach im Live-Admin pflegen?                  |
| --------------------------------------- | ------------------------------ | -------------- | ---------------------------------------------- |
| Text auf bestehender Seite              | Live Payload Admin             | Nein           | Nein, dort direkt erledigt                     |
| Neuer Job                               | Live Payload Admin             | Nein           | Nein                                           |
| Navigation/Footer aendern               | Live Payload Admin             | Nein           | Nein                                           |
| Bild/Media austauschen                  | Live Payload Admin             | Nein           | Nein                                           |
| Styling eines bestehenden Blocks        | Lokal im Code                  | Ja             | Nur falls Content-Felder betroffen sind        |
| Neues Modul/neuer Block                 | Lokal im Code + Payload Schema | Ja             | Ja, Inhalte danach live eintragen              |
| Bestehendes Modul bekommt neues Feld    | Lokal im Code + Migration      | Ja             | Ja, Feld danach live befuellen                 |
| Neue Collection/Global                  | Lokal im Code + Migration      | Ja             | Ja, Daten danach live pflegen                  |
| Initiale Demo-/Legacy-Daten importieren | Kontrollierter Seed/Import     | Meist ja       | Danach Production als Content-Quelle behandeln |

---

## 3. Taeglicher Content Workflow

Fuer Designer, Content Manager und Redakteure:

1. Live Admin oeffnen: `https://<DOMAIN>/admin`
2. Bestehende Page, Job oder Global bearbeiten.
3. Speichern.
4. Payload Hook revalidiert die betroffenen Seiten.
5. Live-Seite im Browser per Hard Refresh pruefen.

Kein lokaler Dev-Server, kein Git Commit und kein Coolify Deploy noetig.

Wenn eine Aenderung nicht moeglich ist, weil ein Feld fehlt oder ein Layout anders aussehen soll, ist das eine Code-/Schema-Aenderung und gehoert in den Entwickler-Workflow.

---

## 4. Entwickler Workflow fuer Code-Aenderungen

1. Lokal Branch erstellen oder auf dem passenden Arbeitsbranch arbeiten.
2. Production-Daten bei Bedarf als lokale Arbeitskopie importieren, damit lokal realistische Inhalte sichtbar sind.
3. Code, Komponenten, Payload Blocks/Collections/Globals und Hooks lokal anpassen.
4. Wenn sich Payload Schema aendert: Migration erzeugen und committen.
5. Lokal pruefen:
   - Typecheck/Lint
   - Payload Importmap
   - Production Build mit Dummy- oder lokaler DB
   - betroffene Seiten im Browser
6. Commit und Push.
7. Coolify deployed den Code.
8. Production Logs pruefen:
   - Migration erfolgreich
   - App ready
   - keine 500/502 Fehler
9. Neue oder geaenderte Felder live im Payload Admin befuellen.
10. Revalidation pruefen.

---

## 5. Coolify Deployment Trigger

Der Production-Deploy laeuft ueber den in Coolify konfigurierten Git-Branch.

Fuer dieses Setup gilt als Standard:

- Production Branch: `main`
- Build Pack: Dockerfile
- Auto Deploy: aktiv
- Push auf `main` startet einen neuen Coolify Deploy
- Push auf andere Branches deployed nicht automatisch nach Production

Nicht von `master` ausgehen. Immer den tatsaechlichen Coolify Branch pruefen, bevor ein Agent oder Entwickler sagt: "Push deployed live."

Empfohlener Git-Workflow:

1. Feature lokal oder auf Feature-Branch entwickeln.
2. Review/Test lokal abschliessen.
3. In `main` mergen oder direkt auf `main` committen, wenn das Projekt bewusst so arbeitet.
4. Push auf `main`.
5. Coolify Build- und Runtime-Logs pruefen.
6. Nach Schema-Aenderungen sicherstellen, dass `payload migrate` erfolgreich lief.

Wenn Auto Deploy deaktiviert ist oder keine GitHub Webhooks eingerichtet sind, muss der Deploy manuell in Coolify oder per Coolify API gestartet werden.

---

## 6. Statische Videos und grosse Assets

Grosse Videos gehoeren nicht ins Git-Repo und nicht in das Docker-Image.

Standard fuer dieses Setup:

- lokale Quelle: komprimierte Videodateien ausserhalb des Repos
- Server-Ziel: `/data/<project>/videos/`
- Container Mount: `/data/<project>/videos -> /app/public/videos`
- Public URLs: `https://<DOMAIN>/videos/<filename>.mp4`
- `.dockerignore` schliesst `public/videos/` aus

Diese Dateien bleiben bei Redeploys erhalten, weil sie auf dem Host liegen und in den Container gemountet werden. Ein neuer Docker-Container ersetzt nicht den Host-Ordner.

Workflow fuer Video-Aenderungen:

1. Video lokal komprimieren.
2. Per `rsync` auf den Server-Bind-Mount laden.
3. Falls neue Dateinamen verwendet werden: Code oder CMS-Felder auf die neuen URLs anpassen.
4. URL testen:
   ```bash
   curl -I "https://<DOMAIN>/videos/<filename>.mp4"
   curl -H "Range: bytes=0-99" -I "https://<DOMAIN>/videos/<filename>.mp4"
   ```
5. Erwartung: `200` fuer HEAD und `206` fuer Range Requests.

Wenn Next.js nachtraeglich gemountete Dateien nicht direkt aus `public/videos` ausliefert, eine explizite Route wie `/videos/[filename]` nutzen, die nur erlaubte Dateien streamt und Range Requests unterstuetzt.

Wichtig fuer lokale Entwicklung:

- Im CMS oder Code bevorzugt relative Video-Pfade wie `/videos/<filename>.mp4` speichern.
- Ein URL-Helper darf Production-Pfade mit `NEXT_PUBLIC_SERVER_URL` absolut machen.
- Wenn `NEXT_PUBLIC_SERVER_URL` auf `localhost` oder `127.0.0.1` zeigt, relative Pfade beibehalten. Sonst kann ein lokaler Server auf `localhost:3001` versehentlich Video-URLs zu `localhost:3000` erzeugen.
- Bilder bleiben davon getrennt: editierbare Bilder gehoeren in Payload Media, nicht in Video-/Pfad-Felder.

---

## 7. Beispiel: Neues Modul bauen

Beispiel: Ein neues Modul `benefit-grid` soll auf mehreren Seiten nutzbar sein.

Vor dem Start immer klaeren:

> Soll das Modul nur als lokale Next.js Komponente entstehen, oder direkt als editierbarer Payload Block?

Wenn es direkt editierbar sein soll, [create-payload-blocks.md](create-payload-blocks.md) verwenden. Das ist der Standard fuer Module, die Designer spaeter im Payload Admin pflegen sollen.

Wenn das Modul auf mehreren Seiten mit identischem Inhalt erscheinen soll, zusaetzlich [reusable-blocks.md](reusable-blocks.md) verwenden. Dann ist es kein kopierter Page-Block, sondern ein zentral gepflegter Global-/Reusable-Block mit schlankem Placeholder pro Seite.

### Lokal umsetzen

1. Anforderungen klaeren:
   - Welche Inhalte pflegt der Designer spaeter?
   - Welche Felder sind Pflicht?
   - Welche Varianten braucht das Modul?
   - Ist der Inhalt pro Seite individuell oder zentral synchron?
2. Frontend-Komponente bauen:
   - TSX Komponente
   - typisierte Props
   - responsive Layouts
   - defensives Rendering fuer optionale Felder
3. Payload Block-Definition erstellen:
   - Slug stabil waehlen, z. B. `benefit-grid`
   - Felder so modellieren, dass sie fuer Redakteure eindeutig sind
   - Defaults setzen, wo sinnvoll
   - Bilder als `upload` Relation zur Media Collection modellieren, nicht als Text-URL
   - Videos nur dann als URL/Pfad modellieren, wenn sie bewusst extern/static ausgeliefert werden
4. BlockRenderer registrieren.
5. Mock- oder lokale Testdaten anlegen.
6. Migration erzeugen:
   ```bash
   npm run payload -- migrate:create add_benefit_grid_block --skip-empty
   ```
7. Lokal pruefen:
   ```bash
   npm run payload:importmap
   npm run lint
   npm run build
   ```
8. Wenn das Modul aus einem Legacy-/HTML-Build migriert wurde:
   - Original-HTML daneben pruefen.
   - Sektionen, Wrapper, Klassen und IDs vergleichen.
   - Animation-Hooks und interaktive Attribute erhalten.
   - CSS auf globale Klassennamen pruefen und bei Konflikten auf `.link-page--<slug>` scopen.

### Deployen

1. Committen und pushen.
2. Coolify Deployment abwarten.
3. Logs pruefen, ob `payload migrate` erfolgreich war.

### Live Content pflegen

1. Live Payload Admin oeffnen.
2. Page bearbeiten.
3. Neues Modul im Layout hinzufuegen.
4. Inhalte eintragen.
5. Speichern.
6. Live-Seite pruefen.

Wichtig: Das neue Modul wird nicht durch lokale Testdaten in Production befuellt. Production Content wird live im Admin gepflegt oder bewusst importiert.

---

## 8. Beispiel: Bestehendes Modul erweitern

Beispiel: Ein bestehender Hero soll optional ein zweites CTA erhalten.

Wenn das Modul bereits im Payload Admin editierbar ist, ist jede Feld-Erweiterung eine Schema-Aenderung. Dann [create-payload-blocks.md](create-payload-blocks.md) lesen, Migration erzeugen und bestehende Inhalte rueckwaertskompatibel halten.

### Lokal umsetzen

1. Bestehendes Interface und Payload Block-Felder lesen.
2. Neues Feld optional modellieren, z. B. `secondaryLink`.
3. Frontend defensiv erweitern:
   - Wenn `secondaryLink` fehlt, bleibt das alte Layout unveraendert.
   - Keine bestehenden Inhalte brechen.
4. Payload Block-Definition erweitern.
5. Migration erzeugen:
   ```bash
   npm run payload -- migrate:create add_hero_secondary_link --skip-empty
   ```
6. Lokal mit bestehendem Content und mit neuem Feld testen.

### Deployen

1. Commit + Push.
2. Coolify Deploy.
3. Migration Logs pruefen.

### Live nachpflegen

1. Live Payload Admin oeffnen.
2. Seiten mit Hero bearbeiten.
3. Optionales neues Feld nur dort befuellen, wo es gebraucht wird.
4. Speichern und Live-Seiten pruefen.

Best Practice: Neue Felder standardmaessig optional einfuehren. Pflichtfelder nur verwenden, wenn klar ist, dass alle bestehenden Inhalte sie sofort bekommen.

---

## 9. Lokale Daten aktuell halten

Damit lokal realistische Inhalte sichtbar sind, sollte nicht Production aus lokalen Seeds ueberschrieben werden. Stattdessen Production gelegentlich nach lokal spiegeln.

Empfohlener Rhythmus:

- Vor groesseren Design-/Schema-Aenderungen Production DB Backup nach [backup-info.md](backup-info.md) ziehen.
- Lokal in eine Entwicklungsdatenbank importieren.
- Lokal testen.
- Code deployen.
- Neue Inhalte live pflegen.

Wichtig:

- Production DB Backups enthalten User und Secrets/PII. Sicher speichern und nicht committen.
- Backup/Restore/Production-Sync immer nach [backup-info.md](backup-info.md) planen. Git sichert Code, aber keine Live-Inhalte, Uploads oder Datenbankdaten.
- Lokale Experimente nicht automatisch zurueck nach Production pushen.
- Seeds nach dem Initialimport nicht erneut blind in Production ausfuehren.

---

## 10. Seeds und Datenimporte

Seeds sind sinnvoll fuer:

- erste Initialbefuellung
- Migration von Legacy-Content
- reproduzierbare Demo-Daten in lokalen Umgebungen
- kontrollierte einmalige Imports

Seeds sind riskant fuer:

- laufende Content-Pflege
- Production, wenn sie bestehende Inhalte updaten oder loeschen
- User- oder Rollenverwaltung

Vor jedem Production Seed:

1. Script lesen.
2. Pruefen, welche Collections/Globals es beruehrt.
3. Backup der Production DB und bei Media-Aenderungen auch `/app/media` nach [backup-info.md](backup-info.md) erstellen.
4. Seed ausfuehren.
5. Counts und Stichproben pruefen.
6. Externe Revalidation Route ausfuehren.

Merksatz: `payload migrate` ist Schema. `seed/import` ist Content.

---

## 11. Revalidation

Live Admin Saves sollen die Revalidation Hooks ausloesen.

Bei CLI-Seeds oder Imports gilt:

- Direkte `revalidatePath()` Hooks koennen ausserhalb eines Next-Request-Kontexts warnen.
- Daten werden trotzdem geschrieben, wenn der Seed erfolgreich endet.
- Danach externe Revalidation Route aufrufen:

```bash
curl -X POST "https://<DOMAIN>/api/revalidate" \
  -H "x-revalidation-secret: <REVALIDATION_SECRET>"
```

Fuer gezielte Pfade:

```bash
curl -X POST "https://<DOMAIN>/api/revalidate" \
  -H "content-type: application/json" \
  -H "x-revalidation-secret: <REVALIDATION_SECRET>" \
  -d '{"path":"/jobs-finden"}'
```

---

## 12. Kommunikation mit Designern

Wenn ein Designer fragt, wo eine Aenderung gemacht wird:

- "Kannst du den Text aendern?" -> Live Payload Admin.
- "Kannst du ein Bild austauschen?" -> Live Payload Admin.
- "Kannst du einen neuen Abschnitt mit bestehendem Modul einfuegen?" -> Live Payload Admin, wenn der Block schon existiert.
- "Kannst du ein neues Modul entwerfen?" -> lokal entwickeln, deployen, danach live befuellen.
- "Kann dieses Modul ein neues Feld bekommen?" -> lokal Schema erweitern, deployen, danach live befuellen.

Der Agent soll dem Designer klar sagen:

1. Was sofort im CMS geht.
2. Was Code braucht.
3. Ob ein Deploy noetig ist.
4. Ob danach Live-Content nachgepflegt werden muss.

Wenn ein Designer sagt, dass eine Seite im Admin zwar sichtbar ist, aber die Module nicht bearbeitbar sind, pruefen:

- Enthaelt die Page nur `static-page`/Legacy-Fallback?
- Gibt es echte Payload Block-Felder fuer jeden Abschnitt?
- Sind Bilder als Media Upload Relations modelliert und im Admin mit Preview sichtbar?
- Werden Videos bewusst als Pfad/URL gepflegt?
- Werden wiederkehrende Inhalte zentral per Global/Reusable-Block gepflegt statt pro Seite dupliziert?
- Ist die Seite nur visuell migriert oder wirklich CMS-editierbar?

---

## 13. Anti-Patterns

- Lokale DB als dauerhafte Content-Quelle fuer Production behandeln.
- Nach jeder Textaenderung deployen.
- Seeds als Ersatz fuer Redaktionsarbeit verwenden.
- Pflichtfelder in bestehende Blocks einfuehren, ohne Backfill-Plan.
- Production-Inhalte durch lokale Demo-Daten ueberschreiben.
- `payload migrate` erwarten, dass es Inhalte kopiert.
- Revalidation nach CLI-Imports vergessen.
- Grosse Videos ins Git-Repo oder Docker-Image legen.
- Wiederkehrende Inhalte wie Kontakt-CTAs als duplizierte Page-Blocks pflegen, obwohl sie zentral synchron bleiben sollen.
- Von `master` als Production Branch ausgehen, ohne Coolify zu pruefen.
- Legacy-CSS-Dateien mit globalen Klassen unkontrolliert gemeinsam laden.
- Eine `static-page`/Legacy-Seite als fertig migrierte CMS-Seite behandeln.
- Bildpfade als Textfelder pflegen, wenn Redakteure eigentlich Media Preview und Upload brauchen.
- Production-Base-URLs lokal erzwingen und dadurch lokale Dev-Ports brechen.
