# Dateiuebersicht Crawler

## Wissen und Doku

```text
Crawler/README.md
docs/crawler/01-mvp-workflow.md
```

## Code

```text
scripts/supertools_crawler_mvp.py
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
```

## State

```text
data/crawler/state/products.json
```

Der State ist die Vergleichsbasis fuer spaetere Monitoring-Laeufe.
