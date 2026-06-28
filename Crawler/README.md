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
2. Er prueft Anbieter-Websites aus der Excel-Seedliste.
3. Er sammelt oeffentliche Hinweise zu DSGVO, Hosting, Sicherheit,
   Barrierefreiheit, Betriebsmodell, Referenzen und Behoerdenbezug.
4. Er sammelt passende Content Pieces wie YouTube-Videos, Webinare,
   Case Studies, Whitepaper, Blogartikel und Downloads.
5. Er vergleicht die Ergebnisse mit dem letzten gespeicherten Stand.
6. Er erzeugt einen Review-Report.
7. Montagmorgen prueft ein Mensch die Liste.
8. Erst nach Freigabe wandern Daten auf die Website oder spaeter ins CMS.

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

Seed-Datei:

```text
/Users/wolfram/web-projekte/supertools/Amtshelden_Zielkundenliste_Sponsoring_2026 (1).xlsx
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
- fehlende Pflichtinformationen
- Review-Confidence

Dadurch loesen Tracking-Snippets, Cookie-IDs oder kleine dynamische Website-
Aenderungen nicht sofort einen falschen Alarm aus.

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

## Naechste sinnvolle Schritte

1. Review-Report besser lesbar machen:
   - Quellen-URLs pro Signal ausgeben
   - Snippets kuerzen
   - harte Warnungen oben sammeln

2. Crawler robuster machen:
   - HTTP-Fallback fuer blockierte Browser-Crawls
   - alternative Domains aus Redirects erkennen
   - bessere Erkennung von Datenschutz-/Security-Seiten

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
