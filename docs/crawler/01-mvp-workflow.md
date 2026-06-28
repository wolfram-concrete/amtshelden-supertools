# Supertools Crawler MVP

Stand: 2026-06-28

## Ziel

Der MVP ist ein Recherche-Assistent fuer Supertools. Er sammelt oeffentlich sichtbare Informationen zu Softwareanbietern, markiert Aenderungen und erzeugt eine Review-Liste fuer die Redaktion. Er veroeffentlicht nichts automatisch.

## Woechentlicher Workflow

1. Sonntagabend laeuft der Crawler mit der Excel-Seedliste.
2. Pro Anbieter crawlt er die Homepage und wenige relevante Unterseiten.
3. Er extrahiert Hinweise zu Behoerdenrelevanz, DSGVO, Hosting, Sicherheit, Barrierefreiheit, Betriebsmodell und Referenzen.
4. Er vergleicht den neuen Stand mit dem lokalen State.
5. Er erzeugt einen Run-Ordner mit `review-report.md`, `product-candidates.json`, `changes.json` und Rohtexten.
6. Montagmorgen prueft die Redaktion die Review-Liste.
7. Nur freigegebene Informationen wandern spaeter in Website-Daten oder CMS.

## Leitplanken

- Keine automatische Website-Aktualisierung.
- Keine Rankings, Sterne oder Empfehlungs-Scores auf der Website.
- Keine Anbietertexte ungeprueft als Amtshelden-Text uebernehmen.
- Fehlende Informationen sichtbar machen.
- Jede Aussage braucht mindestens eine Quelle.
- Pricing wird nicht aktiv bewertet und kann bewusst leer bleiben.
- Der Crawler nutzt nur oeffentlich erreichbare Webseiten.

## MVP-Kommando

```bash
.venv/bin/python scripts/supertools_crawler_mvp.py --limit 10
```

Nuetzliche Varianten:

```bash
# Nur 3 Anbieter fuer schnellen Funktionstest
.venv/bin/python scripts/supertools_crawler_mvp.py --limit 3

# Nur Anbieter aus einem Topic-Cluster
.venv/bin/python scripts/supertools_crawler_mvp.py --cluster KOM --limit 5

# State nicht aktualisieren, nur Test-Report schreiben
.venv/bin/python scripts/supertools_crawler_mvp.py --limit 3 --no-save-state
```

## Output

Standardpfad:

```text
data/crawler/runs/YYYYMMDD-HHMMSS/
```

Wichtige Dateien:

- `review-report.md` - menschlich lesbarer Montagmorgen-Report
- `product-candidates.json` - strukturierte Kandidaten und Signale
- `changes.json` - neue/geaenderte/unveraenderte Anbieter
- `raw/*.md` - Rohtexte pro Anbieter als Quellenbasis

Der Vergleichs-State liegt unter:

```text
data/crawler/state/products.json
```
