# Kurationsstamm - Erweiterung vom 2026-08-14

Diese Datei dokumentiert die neue manuelle Kandidatenliste fuer den Supertools-
Crawler. Die maschinenlesbare Quelle liegt in:

```text
data/crawler/discovery/curation-seeds.json
```

## Status

Neue Seeds fuer den naechsten gezielten Crawl:

- Ivicos / ivCAMPUS - virtuelles Buero / digitale Zusammenarbeit
- SpeechMind - KI-Protokollierung fuer kommunale Sitzungen
- GoSpeech - KI-Transkription fuer Verwaltung und Sitzungen
- Scriba - KI-Sitzungsprotokollierung fuer oeffentliche Verwaltung
- Threema Work - sicherer Messenger / Behoerdenkommunikation
- Convaise - KI-Verwaltungslotse / Buergerdialog
- Splitbot / KOSMO - KI-Wissensbot / interner KI-Assistent
- Findus One - KI-Plattform fuer den oeffentlichen Bereich
- Intrakommuna - Kommunikationsplattform / Wissensmanagement fuer Verwaltungen
- openDesk - Office- und Kollaborationssuite fuer oeffentliche Verwaltung

Bereits in der bestehenden 72er Seedliste vorhanden:

- MeisterLabs GmbH (MeisterTask)
- Stackfield GmbH
- factro (Schuchert Managementberatung)
- Viind GmbH
- Just Social (Just Software AG)

## Herkunft

- Julia-Liste: Ivicos / ivCAMPUS, MeisterTask, Stackfield, factro, SpeechMind,
  GoSpeech, Scriba, Threema Work, Viind
- Christian-Liste: Convaise, Splitbot, Findus, Just Social, Intrakommuna,
  openDesk

## Offener Punkt

Die konkreten Messe-/Eventquellen fehlen noch. Sobald die 20 relevanten Messen
als Namen oder URLs vorliegen, sollten sie als eigener Discovery-Stamm unter
`data/crawler/discovery/event-sources.json` abgelegt werden.

## Naechster Crawl

Nur die neuen kuratierten Kandidaten crawlen:

```bash
cd /Users/wolfram/web-projekte/supertools
.venv/bin/python scripts/supertools_crawler_mvp.py \
  --seed-source curation \
  --limit 20 \
  --pages-per-company 4 \
  --run-id curated-expansion-2026-08-14
```

Test ohne State-Update:

```bash
cd /Users/wolfram/web-projekte/supertools
.venv/bin/python scripts/supertools_crawler_mvp.py \
  --seed-source curation \
  --limit 3 \
  --pages-per-company 3 \
  --no-save-state
```
