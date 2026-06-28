# Dateiuebersicht Crawler

## Wissen und Doku

```text
Crawler/README.md
Crawler/INTEGRATION_SUPERTOOLS.md
Crawler/SCHAUBILD.md
docs/crawler/01-mvp-workflow.md
```

## Code

```text
scripts/supertools_crawler_mvp.py
scripts/init_crawler_review_decisions.py
scripts/export_crawler_toolcards_preview.py
```

## Eingabe

```text
Amtshelden_Zielkundenliste_Sponsoring_2026 (1).xlsx
```

Die Excel-Datei enthaelt 72 Anbieter mit Rang, Website, Branche,
Topic-Cluster, Relevanzscore und Notiz.

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
```

`product-candidates.json` enthaelt je Anbieter jetzt auch:

```text
content_pieces[]
```

Ein Content Piece hat typischerweise `kind`, `title`, `url`, `source_url` und
optional `meta`, `video_id` und `thumbnail_url`. Fuer echte YouTube-Videos wird
die `video_id` extrahiert, damit spaeter sauber eingebettet oder ein Thumbnail
angezeigt werden kann.

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
