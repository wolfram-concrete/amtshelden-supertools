# Dateiuebersicht Crawler

## Wissen und Doku

```text
Crawler/README.md
Crawler/INTEGRATION_SUPERTOOLS.md
Crawler/SCHAUBILD.md
docs/crawler/01-mvp-workflow.md
docs/status-quo-2026-08-14/systemlogik-qualifizierung.md
```

## Code

```text
scripts/supertools_crawler_mvp.py
scripts/discover_multiplier_candidates.py
scripts/build_crawler_masterlist.py
scripts/build_software_master.py
scripts/init_crawler_review_decisions.py
scripts/export_crawler_toolcards_preview.py
scripts/discover_product_images.py
```

## Eingabe

```text
Amtshelden_Zielkundenliste_Sponsoring_2026 (1).xlsx
data/crawler/discovery/curation-seeds.json
```

Die Excel-Datei enthaelt 72 Anbieter mit Rang, Website, Branche,
Topic-Cluster, Relevanzscore und Notiz.

Die Discovery-Datei enthaelt manuell kuratierte Zusatzkandidaten und Dubletten-
Merker aus Gespraechen, Partnerhinweisen und spaeter Messe-/Eventquellen. Nur
Eintraege mit `crawl_action: "crawl"` werden als neue Seeds gecrawlt.

Cluster-Verteilung:

- IT: 31
- KOM: 14
- CROSS: 10
- HR: 10
- ORG: 7

## Ausgabe

```text
data/crawler/runs/<run-id>/review-report.md
data/crawler/runs/<run-id>/product-candidates.json
data/crawler/runs/<run-id>/changes.json
data/crawler/runs/<run-id>/run-meta.json
data/crawler/runs/<run-id>/raw/*.md
data/crawler/runs/<run-id>/toolcards.preview.ts
data/crawler/runs/<run-id>/toolcards.reviewed.preview.ts
data/crawler/master/software-master.json
data/crawler/master/software-master.md
data/crawler/master/software-master-google-sheet.csv
data/crawler/master/google-sheet-target.json
data/crawler/product-images/<run-id>/manifest.json
data/crawler/product-images/<run-id>/review-report.md
data/crawler/product-images/<run-id>/review-decisions.template.json
data/crawler/product-images/review-decisions.json
src/data/software-master.ts
src/data/directory.ts
public/brand/screenshots/<slug>/shot-1.jpg
```

`product-candidates.json` enthaelt je Anbieter jetzt auch:

```text
content_pieces[]
availability{}
product_image_candidates[]
```

Ein Content Piece hat typischerweise `kind`, `title`, `url`, `source_url` und
optional `meta`, `video_id` und `thumbnail_url`. Fuer echte YouTube-Videos wird
die `video_id` extrahiert, damit spaeter sauber eingebettet oder ein Thumbnail
angezeigt werden kann.

`availability` klassifiziert die Angebotsverfuegbarkeit vorsichtig als
`nationwide`, `federal_state`, `regional` oder `unknown`. Die Masterliste und
der Google-Sheet-Export fuehren daraus eigene Spalten fuer Scope, Label,
Regionen, Confidence, Review-Pflicht und Evidenz.

`product_image_candidates` enthaelt gefundene Bild-Assets mit Quell-URL,
Fundstelle, Alt-Text, technischem Score und Begruendung. Das ist nur eine
automatische Vorsortierung, keine Bildfreigabe. Heruntergeladene Kandidaten und
Entscheidungen unter `data/crawler/product-images/` bleiben interne,
unversionierte Arbeitsdaten. Unter `public/brand/screenshots/` duerfen nur
explizit freigegebene Bilder der tatsaechlichen Software-Oberflaeche liegen;
Marketingseiten-Snapshots sind dort nicht zulaessig.

## Masterliste / Google Sheet

```text
data/crawler/master/software-master.json
data/crawler/master/software-master-google-sheet.csv
data/crawler/master/google-sheet-target.json
```

`google-sheet-target.json` verweist auf die zentrale native, API-faehige
Google-Sheets-Arbeitsdatei:

```text
https://docs.google.com/spreadsheets/d/1_omRLrsWPOTR2mbkpfaDSYmqGNDqkUnj2D5ZtjlgTgQ
```

Diese Datei fuehrt die relevanten Arbeitsbereiche in Tabs zusammen:

- `00_Legende`
- `01_Fuellhoerner`
- `02_Discovery_Inbox`
- `03_Master_Qualifizierung`
- `04_Review_Historie`
- `05_Website_Datenbasis`

Die alte Datei
`https://docs.google.com/spreadsheets/d/1EN79qleCexFDWlL5aVbi3EMCZS4Z0JuQ/edit`
ist eine Office-/Excel-Datei in Google Drive und deshalb nicht direkt
zellweise ueber die Google-Sheets-API beschreibbar.

## State

```text
data/crawler/state/products.json
```

Der State ist die Vergleichsbasis fuer spaetere Monitoring-Laeufe.

## Review-Freigaben

```text
data/crawler/review-decisions.json
```

Diese Datei ist die manuelle Bremse zwischen Crawl und Website. Tools und
Content Pieces werden dort auf `approved`, `needs_review`, `needs_research`,
`contact_vendor` oder `rejected` gesetzt. Nur `approved` wird im reviewed
Preview-Export sichtbar.
