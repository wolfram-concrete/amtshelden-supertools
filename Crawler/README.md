# Supertools Crawler - Wissensstand

Stand: 2026-06-28

Dieser Ordner ist die menschlich lesbare Ablage fuer den Supertools-Crawler.
Er fasst den aktuellen Stand, die Produktlogik, die Kommandos und die naechsten
Schritte zusammen.

## Grundidee

Der Crawler ist kein Auto-Publisher. Er ist ein Recherche-Assistent fuer die
Supertools-Redaktion.

Der Wochenflow:

1. Sonntagabend laeuft der Crawler.
2. Er prueft Anbieter-Websites aus der Excel-Seedliste und optional aus
   kuratierten Discovery-Seeds.
3. Er sammelt oeffentliche Hinweise zu DSGVO, Hosting, Sicherheit,
   Barrierefreiheit, Betriebsmodell, Referenzen und Behoerdenbezug.
4. Er klassifiziert die Angebotsverfuegbarkeit vorsichtig als `bundesweit`,
   `bundeslandspezifisch`, `regional` oder `unklar`.
5. Er sammelt passende Content Pieces wie YouTube-Videos, Webinare,
   Case Studies, Whitepaper, Blogartikel und Downloads.
6. Er vergleicht die Ergebnisse mit dem letzten gespeicherten Stand.
7. Er erzeugt einen Review-Report.
8. Montagmorgen prueft ein Mensch die Liste.
9. Erst nach Freigabe wandern Daten auf die Website oder spaeter ins CMS.

## Warum so vorsichtig?

Supertools lebt von Vertrauen. Die Plattform soll keine Rankings, Sterne oder
gekaufte Empfehlungen erzeugen. Sie soll Informationen aus Behoerdenperspektive
strukturieren und fehlende Informationen sichtbar machen.

Wichtige Leitplanken:

- Keine automatische Veroeffentlichung.
- Keine Anbietertexte ungeprueft uebernehmen.
- Keine Rankings oder Empfehlungs-Scores.
- Fehlende Informationen markieren.
- Jede relevante Aussage braucht eine Quelle.
- Pricing wird nicht aktiv bewertet und kann leer bleiben.
- Der Crawler nutzt nur oeffentlich erreichbare Webseiten.

## Aktuelle Implementierung

Script:

```text
/Users/wolfram/web-projekte/supertools/scripts/supertools_crawler_mvp.py
```

Workflow-Doku:

```text
/Users/wolfram/web-projekte/supertools/docs/crawler/01-mvp-workflow.md
```

Daten/Reports:

```text
/Users/wolfram/web-projekte/supertools/data/crawler/
```

Integrationsnotiz zur bestehenden Website:

```text
/Users/wolfram/web-projekte/supertools/Crawler/INTEGRATION_SUPERTOOLS.md
```

Vollstaendige Systemlogik fuer Redaktion, Projektsteuerung und Entwicklung
(inklusive Prozess-, Verantwortungs- und Aenderungsmatrix):

```text
/Users/wolfram/web-projekte/supertools/docs/status-quo-2026-08-14/systemlogik-qualifizierung.md
```

Seed-Datei:

```text
/Users/wolfram/web-projekte/supertools/Amtshelden_Zielkundenliste_Sponsoring_2026 (1).xlsx
```

Zusaetzliche kuratierte Seed-Datei:

```text
/Users/wolfram/web-projekte/supertools/data/crawler/discovery/curation-seeds.json
```

## MVP-Kommando

```bash
cd /Users/wolfram/web-projekte/supertools
.venv/bin/python scripts/supertools_crawler_mvp.py --limit 10 --pages-per-company 3
```

Kleiner Test ohne State-Update:

```bash
cd /Users/wolfram/web-projekte/supertools
.venv/bin/python scripts/supertools_crawler_mvp.py --limit 3 --pages-per-company 3 --no-save-state
```

Nur ein Cluster:

```bash
cd /Users/wolfram/web-projekte/supertools
.venv/bin/python scripts/supertools_crawler_mvp.py --cluster KOM --limit 5
```

Nur kuratierte neue Kandidaten aus dem Discovery-Memory crawlen:

```bash
cd /Users/wolfram/web-projekte/supertools
.venv/bin/python scripts/supertools_crawler_mvp.py \
  --seed-source curation \
  --limit 20 \
  --pages-per-company 4
```

## Aktueller Testlauf

Erster echter MVP-Lauf:

```text
/Users/wolfram/web-projekte/supertools/data/crawler/runs/first-10/
```

Aktueller Qualitaetspruefungs-Report mit besserer Lesbarkeit und Quellen je Signal:

```text
/Users/wolfram/web-projekte/supertools/data/crawler/runs/qa-10-signal-tuned/review-report.md
```

Nicht-live ToolCard-Vorschau fuer die Website-Struktur:

```text
/Users/wolfram/web-projekte/supertools/data/crawler/runs/qa-10-signal-tuned/toolcards.preview.ts
```

Review-Datei fuer menschliche Freigaben:

```text
/Users/wolfram/web-projekte/supertools/data/crawler/review-decisions.json
```

Ergebnis:

- 10 Anbieter verarbeitet
- 10 neue Kandidaten
- 8 Anbieter erfolgreich gecrawlt
- 2 Anbieter blockiert oder fehlgeschlagen

Blockierte/faellige Anbieter:

- Just Social: Anti-Bot-Protection, kein verwertbarer Body
- iAble: Cloudflare/Sedo-Challenge

Wichtigster Report:

```text
/Users/wolfram/web-projekte/supertools/data/crawler/runs/first-10/review-report.md
```

Strukturierte Kandidaten:

```text
/Users/wolfram/web-projekte/supertools/data/crawler/runs/first-10/product-candidates.json
```

Monitoring-State:

```text
/Users/wolfram/web-projekte/supertools/data/crawler/state/products.json
```

Aktueller Content-Piece-Testlauf:

```text
/Users/wolfram/web-projekte/supertools/data/crawler/runs/qa-content-5-final/review-report.md
```

Vollstaendiger Excel-Lauf ueber alle 72 Anbieter:

```text
/Users/wolfram/web-projekte/supertools/data/crawler/runs/full-excel-2026-06-28/
```

Produktbild-Recherche auf den bereits gespeicherten Anbieter-Inhalten:

```bash
cd /Users/wolfram/web-projekte/supertools
.venv/bin/python scripts/discover_product_images.py \
  data/crawler/runs/full-excel-2026-06-28 \
  --out data/crawler/product-images/review-2026-08-15 \
  --decisions data/crawler/review-decisions.json
```

Der Anbieter-Crawl schreibt pro Seite bewertete `product_image_candidates` in
den Kandidatendatensatz. Der zusätzliche Research-Lauf nutzt außerdem die
Bild-URLs aus den gespeicherten Roh-Markdowns. Er lädt geeignete WebP-/PNG-/JPEG-
Assets in ein **internes** Review-Paket, prüft Mindestgröße, Seitenverhältnis
und visuelle Varianz und markiert jeden Treffer als `needs_review`.

Das Script schreibt nie nach `public/` und ändert keine Frontend-Daten. Erst
eine menschliche Bildentscheidung darf bestätigen, dass ein Kandidat wirklich
Dashboard, App-UI oder Software-Interface zeigt. Marketingseiten-Screenshots,
Fotos, Logos und Dokument-Cover bleiben ausgeschlossen. Der Preview-Exporter
übernimmt nur `approved`-Einträge aus einer separaten Bildentscheidungsdatei.

Kurzzusammenfassung:

```text
/Users/wolfram/web-projekte/supertools/data/crawler/runs/full-excel-2026-06-28/SUMMARY.md
```

Wichtig: Die aktuelle Website-Preview arbeitet bewusst mit breiter Masse. 59
technisch erfolgreich gecrawlte Tools sind fuer die MVP-Ansicht freigegeben,
damit Layout, Kategorien, Logos, Content Pieces und Profil-Fallbacks mit echten
Daten geprueft werden koennen. Diese Freigabe ist keine finale kuratorische
Empfehlung. Vor der fixen Definition der finalen Toolliste muessen technische
Problemfaelle, schwache Signale, Dubletten und unklare Produktzuschnitte erneut
geprueft werden.

## Discovery-Seed-Memory

Neben der Partner-/Excel-Liste gibt es jetzt zwei getrennte Discovery-Ebenen:

```text
/Users/wolfram/web-projekte/supertools/data/crawler/discovery/multiplier-sources.json
```

Das ist die Quellen- und Multiplikatorenliste. Hier gehoeren Messen, Konferenzen,
Awards, Verbaende, Plattformen, Such-APIs und andere "Fuellhoerner" hinein. Sie
enthaelt keine finalen Tools, sondern Orte, an denen der Crawler potenzielle
Anbieter finden soll.

Wichtig: Quellen und konkrete Jahrgaenge werden getrennt gedacht. Eine Messe
oder Konferenz ist die Serie, darunter liegen einzelne Editionen wie 2025, 2026
oder 2027. Nicht jede Quelle findet jedes Jahr statt; deshalb speichert die
Multiplikatorenliste pro Quelle `cadence`, `active_status` und `editions[]` mit
eigenem Crawl-/Review-Status.

```text
/Users/wolfram/web-projekte/supertools/data/crawler/discovery/curation-seeds.json
```

Das ist die Candidate-Inbox. Sie enthaelt konkret gefundene oder manuell
eingeworfene Anbieter aus Gespraechen, Partnerhinweisen oder spaeter aus den
Multiplikatorenquellen. Jeder Eintrag hat einen Status:

- `new_seed`: neuer Kandidat fuer gezielten Crawl
- `already_in_seed`: bereits in der bestehenden Excel-/Crawler-Liste vorhanden
- `needs_research`: Name bekannt, belastbare Quelle noch offen

Der Crawler kann diese Liste separat oder zusammen mit der Excel-Liste nutzen:

```bash
# Excel + kuratierte Seeds
.venv/bin/python scripts/supertools_crawler_mvp.py --seed-source all --limit 20

# Nur Excel
.venv/bin/python scripts/supertools_crawler_mvp.py --seed-source excel --limit 20

# Nur kuratierte Seeds
.venv/bin/python scripts/supertools_crawler_mvp.py --seed-source curation --limit 20
```

Die am 2026-08-14 ergaenzte Liste liegt zusaetzlich menschlich lesbar hier:

```text
/Users/wolfram/web-projekte/supertools/data/crawler/discovery/curation-seeds-2026-08-14.md
```

## Aktueller Discovery-Lauf vom 2026-08-14

Der erste Lauf nach der Drei-Listen-Logik ist abgeschlossen:

1. **Fuellhoerner / Multiplikatoren**
   - 17 hoch passende Public-Sector-Quellen wurden gecrawlt.
   - Ergebnis: 87 rohe Kandidaten, davon 67 mit Score >= 5.
   - Report:
     `/Users/wolfram/web-projekte/supertools/data/crawler/discovery/runs/multiplier-highfit-2026-08-14/review-report.md`

2. **Candidate-Inbox**
   - Die Discovery-Treffer wurden gegen offensichtliches Rauschen gefiltert.
   - Crawlbare neue Kandidaten aus Julia/Christian plus Multiplikatoren liegen in:
     `/Users/wolfram/web-projekte/supertools/data/crawler/discovery/curation-seeds.json`

3. **Gezielter Anbieter-Crawl**
   - 17 kuratierte Kandidaten wurden mit bis zu 4 Seiten pro Anbieter geprueft.
   - Report:
     `/Users/wolfram/web-projekte/supertools/data/crawler/runs/curated-discovery-2026-08-14/review-report.md`
   - Kandidaten-Daten:
     `/Users/wolfram/web-projekte/supertools/data/crawler/runs/curated-discovery-2026-08-14/product-candidates.json`

4. **Interne Masterliste**
   - 13 Anbieter sind aktuell Master-/Watchlist-Eintraege.
   - 13 Anbieter bleiben in Recherche, Ablehnung oder technischem Recrawl.
   - Neu aus der breiten Discovery uebernommen:
     `govdigital`, `ITC AG`, `Empolis`.
   - Weiter als Recherche-/Reject-Historie sichtbar:
     `collect.AI`, `Dimater`, `Konica Minolta ECM`, `Lime Technologies`,
     `ERDigital`, `Modirum Platforms`.
   - Masterliste:
     `/Users/wolfram/web-projekte/supertools/data/crawler/master/software-master.json`
   - Menschlich lesbarer Kurzreport:
     `/Users/wolfram/web-projekte/supertools/data/crawler/master/software-master.md`
   - Google-Sheet-Import/Abgleich:
     `/Users/wolfram/web-projekte/supertools/data/crawler/master/software-master-google-sheet.csv`

5. **Zielsystem**
   - Die urspruengliche Datenbasis aus Google Drive bleibt als historische
     Office-/Excel-Quelle erhalten:
     `https://docs.google.com/spreadsheets/d/1EN79qleCexFDWlL5aVbi3EMCZS4Z0JuQ/edit?gid=483711098#gid=483711098`
   - Wichtig: Diese Datei ist technisch eine in Drive liegende Office-/Excel-
     Datei (`Supertools_Datenbasis_komplett.xlsx`). Die Google-Sheets-API kann
     sie deshalb nicht direkt zellweise aktualisieren.
   - Als zentrale, API-faehige Arbeitsdatei gibt es jetzt eine native
     Google-Sheets-Datei mit mehreren Tabs:
     `https://docs.google.com/spreadsheets/d/1_omRLrsWPOTR2mbkpfaDSYmqGNDqkUnj2D5ZtjlgTgQ`
   - Tabs:
     `00_Legende`, `01_Fuellhoerner`, `02_Discovery_Inbox`,
     `03_Master_Qualifizierung`, `04_Review_Historie`,
     `05_Website_Datenbasis`.
   - Die Zielkonfiguration liegt hier:
     `/Users/wolfram/web-projekte/supertools/data/crawler/master/google-sheet-target.json`
   - Kuenftige Crawler-Exporte sollen diese zentrale Tab-Datei aktualisieren,
     nicht mehrere getrennte Dokumente erzeugen.

Wichtig: Die Masterliste ist weiterhin intern. Sie ist keine automatische
Veroeffentlichung und kein redaktionelles Qualitaetssiegel. Sie dient als
Arbeitsstand fuer Review, Nachrecherche und spaetere Website-/CMS-Uebernahme.

## Monitoring-Logik

Der Crawler unterscheidet:

- `new`: Anbieter wurde noch nicht im State gesehen.
- `changed`: relevante Monitoring-Signale haben sich geaendert.
- `unchanged`: Monitoring-Signale sind stabil.

Wichtig: Der Vergleich nutzt nicht den kompletten dynamischen Website-Text als
Aenderungsausloeser, sondern stabilere Monitoring-Signale:

- Signal vorhanden oder nicht vorhanden
- DSGVO/Datenschutz
- Hosting/Serverstandort
- Sicherheit/Zertifizierung
- Barrierefreiheit
- Betriebsmodell
- Behoerden-/Verwaltungsbezug
- Referenzen/Cases
- Angebotsverfuegbarkeit: bundesweit, bundeslandspezifisch, regional, unklar
- fehlende Pflichtinformationen
- Review-Confidence

Dadurch loesen Tracking-Snippets, Cookie-IDs oder kleine dynamische Website-
Aenderungen nicht sofort einen falschen Alarm aus.

## Regionale Verfuegbarkeit

Die Masterliste enthaelt jetzt ein eigenes Verfuegbarkeitsfeld. Ziel ist, spaeter
im Google Sheet und auf der Website danach filtern zu koennen, ob ein Tool
bundesweit, nur fuer ein Bundesland, regional oder noch unklar verfuegbar ist.

Interne Werte:

- `nationwide`: bundesweit
- `federal_state`: bundeslandspezifisch
- `regional`: regional
- `unknown`: unklar

Wichtig: Der Crawler entscheidet hier vorsichtig. Ein Firmensitz oder eine
einzelne Referenz in Bayern, Niedersachsen oder NRW reicht nicht automatisch
fuer eine regionale Einschraenkung. Ein Bundesland-Hinweis wird nur markiert,
wenn er nahe an Angebots-, Verwaltungs- oder Verfuegbarkeitskontext steht. Alle
nicht eindeutigen Faelle bleiben `needs_review`.

Der Google-Sheet-Export enthaelt dafuer eigene Spalten:

- `availability_scope`
- `availability_label`
- `availability_regions`
- `availability_confidence`
- `availability_needs_review`
- `availability_evidence`

## Content Pieces

Der Crawler sammelt jetzt auch oeffentliche Content-Stuecke, die spaeter auf
Software-Cards oder Profilseiten ausgespielt werden koennen. Diese Daten liegen
pro Anbieter im Feld `content_pieces`.

Aktuell erkannte Typen:

- `youtube`: echtes YouTube-Video mit `video_id` und Thumbnail-URL
- `video`: andere Videoseiten oder Video-Bereiche
- `webinar`: Webinare, Events, Aufzeichnungen
- `case_study`: Kundenstories, Referenzen, Use Cases
- `use_case`: konkrete Anwendungsfaelle
- `whitepaper`: Leitfaeden, Reports, Studien
- `blog_article`: Blog- oder Magazinbeitraege
- `download`: PDFs, Datenblaetter, Broschueren

Wichtig: Auch Content Pieces sind nur Vorschlaege fuer die Redaktion. Der
Crawler filtert Datenschutz-, Impressums-, Cookie-, Terms- und Social-Media-
Rauschen so weit wie moeglich heraus, aber die finale Auswahl bleibt menschlich.

Beispiel aus dem Testlauf: SocialHub wurde mit einem echten YouTube-Embed
gefunden. Der Crawler speichert dabei neben URL und Titel auch die YouTube-ID
und eine Thumbnail-URL.

## Review-Entscheidungen

Der Report enthaelt pro Anbieter vier menschliche Optionen:

- Uebernehmen
- Nachrecherche
- Anbieter kontaktieren
- Ablehnen / ignorieren

Noch nicht gebaut ist ein echtes Review-Dashboard. Fuer den MVP reicht der
Markdown-Report.

## Freigabe-Workflow

Nach einem Crawl wird aus den Kandidaten eine bearbeitbare Review-Datei erzeugt:

```bash
cd /Users/wolfram/web-projekte/supertools
.venv/bin/python scripts/init_crawler_review_decisions.py \
  data/crawler/runs/qa-content-5-final/product-candidates.json \
  --out data/crawler/review-decisions.json
```

In `data/crawler/review-decisions.json` werden Tools und einzelne Content
Pieces geprueft. Sichtbar exportiert wird nur, was den Status `approved` hat.

Preview-Export mit Review-Bremse:

```bash
cd /Users/wolfram/web-projekte/supertools
.venv/bin/python scripts/export_crawler_toolcards_preview.py \
  data/crawler/runs/qa-content-5-final/product-candidates.json \
  --decisions data/crawler/review-decisions.json \
  --out data/crawler/runs/qa-content-5-final/toolcards.reviewed.preview.ts
```

Das Ergebnis enthaelt:

- `crawlerToolCardPreview`: freigegebene Tool-Karten
- `crawlerToolContentPreview`: freigegebene Videos, Webinare, Cases, Downloads usw.

Diese Review-Bremse gilt fuer die bestehende Excel-/59er-Pipeline. Die neue
13-Tool-Masterliste wird aktuell separat ueber
`scripts/build_software_master.py` in `src/data/software-master.ts` erzeugt und
in `src/data/directory.ts` mit der 59er-Basis aggregiert. Dieser neue Strang
liest `review-decisions.json` noch nicht; das einheitliche Review-Gate ist ein
offener Integrationsschritt. Details:
`docs/status-quo-2026-08-14/systemlogik-qualifizierung.md`.

## Naechste sinnvolle Schritte

1. Review-Report besser lesbar machen:
   - Quellen-URLs pro Signal ausgeben
   - Snippets kuerzen
   - harte Warnungen oben sammeln

2. Crawler robuster machen:
   - HTTP-Fallback fuer blockierte Browser-Crawls
   - alternative Domains aus Redirects erkennen
   - bessere Erkennung von Datenschutz-/Security-Seiten
   - Produktbild-Kandidaten um CSS-Hintergrundbilder und strukturierte
     Metadaten erweitern, ohne das menschliche Bild-Review zu umgehen

3. Datenmodell schaerfen:
   - Basisprofil-Felder definieren
   - Pflichtfelder vs. optionale Felder trennen
   - Mapping zu `ToolCardSummary` und spaeter `ToolProfile`

4. GitHub Action bauen:
   - Sonntagslauf
   - Report als Artefakt
   - optional Pull Request mit `data/crawler/runs/...`

5. Spaeter Admin-Dashboard:
   - Status: neu, geaendert, pruefen, freigegeben, abgelehnt, archiviert
   - Quellenansicht
   - Freigabe-Button
   - Export in Website-Daten oder CMS

## Produkt-DNA

Supertools ist eine Entscheidungsabkuerzung fuer Behoerden. Der Crawler soll
diese Arbeit vorbereiten, aber nicht ersetzen.

Die Redaktion entscheidet. Der Crawler sammelt, strukturiert und warnt.
