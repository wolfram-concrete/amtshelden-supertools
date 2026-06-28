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
4. Er vergleicht die Ergebnisse mit dem letzten gespeicherten Stand.
5. Er erzeugt einen Review-Report.
6. Montagmorgen prueft ein Mensch die Liste.
7. Erst nach Freigabe wandern Daten auf die Website oder spaeter ins CMS.

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

## Review-Entscheidungen

Der Report enthaelt pro Anbieter vier menschliche Optionen:

- Uebernehmen
- Nachrecherche
- Anbieter kontaktieren
- Ablehnen / ignorieren

Noch nicht gebaut ist ein echtes Review-Dashboard. Fuer den MVP reicht der
Markdown-Report.

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
