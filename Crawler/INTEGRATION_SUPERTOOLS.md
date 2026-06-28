# Integration in die bestehende Supertools-Seite

Stand: 2026-06-28

## Kurzfazit

Die Crawler-Daten lassen sich gut in die bestehende Seite einhaengen, aber nur
als redaktionell freigegebene Basisdaten. Die aktuelle Website arbeitet mit
`ToolCardSummary` fuer Listen und mit `ToolProfile` fuer tiefe Profilseiten.
Der Crawler kann `ToolCardSummary` relativ schnell vorbefuellen. Ein komplettes
`ToolProfile` braucht weiterhin redaktionelle Arbeit.

## Aktuelle Website-Struktur

Listen-Daten:

```text
src/mocks/tools/index.ts
```

Typ:

```text
src/types/content.ts -> ToolCardSummary
```

Kategorie-Seiten lesen:

```text
toolCardsByCategory[slug]
```

aus:

```text
src/mocks/tools/index.ts
```

## Mapping: Crawler -> ToolCardSummary

| Website-Feld | Quelle im Crawler | Automatisch moeglich? | Hinweis |
| --- | --- | --- | --- |
| `slug` | Firmenname | ja | Muss spaeter ggf. manuell gekuerzt werden |
| `name` | Firmenname | ja | Produktname vs. Firmenname ist oft noch unklar |
| `provider` | Firma + Hauptsitz | ja | Kommt aus Excel |
| `categorySlug` | Topic-Cluster/Branche | teilweise | Braucht redaktionelles Mapping |
| `categoryLabel` | Kategorie-Mapping | teilweise | Abhaengig von finaler Taxonomie |
| `pitch` | Branche + Notiz + Snippet | teilweise | Muss redaktionell formuliert werden |
| `tier` | Standard `basis` | ja | Verified/Partner nie automatisch |
| `facts.price` | leer/auf Anfrage | ja | Pricing besser nicht automatisch |
| `facts.setup` | leer | nein | Meist nicht oeffentlich auffindbar |
| `facts.operation` | Betriebsmodell-Signal | teilweise | Muss geprueft werden |
| `compliance.dsgvo` | Datenschutz-Signal | teilweise | Nur Hinweis, keine juristische Aussage |
| `compliance.serverDe` | Hosting-Signal | teilweise | Nur wenn Deutschland klar genannt wird |
| `compliance.bsi` | Security-Signal | teilweise | BSI/C5/ISO sauber trennen |
| `compliance.vergabe` | leer/false | nein | Nicht automatisch ableiten |
| `lastCheckedAt` | Crawler-Laufdatum | ja | Sehr gut geeignet |

## Mapping: Content Pieces -> Website

Content Pieces sollten zunaechst nicht direkt in `ToolCardSummary`, sondern als
eigener Inhaltsblock am Tool haengen. Auf Karten reicht spaeter ein kurzes
Signal wie "Video", "Case Study" oder "Whitepaper vorhanden". Auf Subpages kann
ein kuratierter Bereich mit 3-6 freigegebenen Inhalten ausgespielt werden.

| Website-Ziel | Quelle im Crawler | Automatisch moeglich? | Hinweis |
| --- | --- | --- | --- |
| Card-Badge "Video" | `content_pieces.kind === "youtube"` | ja | Nur nach Review sichtbar machen |
| Card-Badge "Case Study" | `case_study`/`use_case` | ja | Gute Eignung fuer Behoerdenkontext pruefen |
| Subpage-Video | `youtube.video_id` + `thumbnail_url` | ja | Einbettung erst nach Datenschutzentscheidung |
| Subpage-Ressourcen | `whitepaper`, `download`, `blog_article` | teilweise | Titel oft redaktionell nachschaerfen |
| Quellenliste | `source_url` | ja | Wichtig fuer Nachvollziehbarkeit |

Empfohlene Datenform fuer spaetere Profile:

```ts
type ToolContentPiece = {
  kind: "youtube" | "video" | "webinar" | "case_study" | "use_case" | "whitepaper" | "blog_article" | "download";
  title: string;
  url: string;
  sourceUrl: string;
  videoId?: string;
  thumbnailUrl?: string;
  reviewed: boolean;
};
```

Die YouTube-Erkennung speichert bewusst nur echte Video-IDs, keine allgemeinen
YouTube-Links oder Datenschutzseiten. Damit vermeiden wir falsche Treffer wie
API-Hinweise, Cookie-Texte oder Social-Footer.

## Preview-Exporter

Es gibt jetzt einen nicht-live Exporter:

```bash
cd /Users/wolfram/web-projekte/supertools
.venv/bin/python scripts/export_crawler_toolcards_preview.py \
  data/crawler/runs/qa-10-signal-tuned/product-candidates.json
```

Er schreibt:

```text
data/crawler/runs/qa-10-signal-tuned/toolcards.preview.ts
```

Diese Datei ist nur eine Vorschau. Sie wird nicht von der Website importiert.

Mit Review-Datei wird daraus ein echter Freigabe-Export:

```bash
cd /Users/wolfram/web-projekte/supertools
.venv/bin/python scripts/init_crawler_review_decisions.py \
  data/crawler/runs/qa-content-5-final/product-candidates.json \
  --out data/crawler/review-decisions.json

.venv/bin/python scripts/export_crawler_toolcards_preview.py \
  data/crawler/runs/qa-content-5-final/product-candidates.json \
  --decisions data/crawler/review-decisions.json \
  --out data/crawler/runs/qa-content-5-final/toolcards.reviewed.preview.ts
```

Solange in `review-decisions.json` nichts auf `approved` steht, exportiert
dieser Workflow bewusst 0 Cards und 0 Content Pieces.

## Empfohlener Integrationsflow

1. Crawler-Report pruefen.
2. Kandidaten in `review-decisions.json` mit `approved` markieren.
3. Einzelne Content Pieces mit `approved` markieren und Surface `card`/`profile`
   setzen.
4. Aus den freigegebenen Kandidaten Preview-Cards und Content-Previews erzeugen.
5. Preview-Cards in einer lokalen Testdatei ansehen.
6. Erst danach manuell oder per Freigabe-Script in `src/mocks/tools/index.ts`
   uebernehmen.

## Aktuelle Website-Verknuepfung

Die freigegebenen Crawlerdaten werden aktuell nicht in die redaktionelle
Hauptliste gemischt. Stattdessen gibt es eine separate Website-Bruecke:

```text
src/mocks/tools/crawler-preview.ts
src/components/blocks/category/CrawlerApprovedTools.tsx
src/app/(frontend)/kategorien/[slug]/page.tsx
```

Auf Kategorie-Seiten erscheint dadurch ein eigener Abschnitt `Crawler-Freigabe`,
wenn fuer diese Kategorie freigegebene Crawler-Tools existieren. Fuer den
aktuellen Testlauf betrifft das:

```text
/kategorien/kommunikation-zusammenarbeit
```

Die Buttons zeigen noch auf `/crawler-preview#<tool-slug>`, weil fuer die
Crawler-Tools noch keine vollstaendigen redaktionellen Profilseiten existieren.
Der naechste Integrationsschritt ist ein Crawler-Profil-Fallback oder die
Ueberfuehrung einzelner freigegebener Tools in echte `ToolProfile`-Daten.

## Warum noch kein Auto-Import?

Die Website ist aktuell redaktionell positioniert. Ein automatischer Import
wuerde zu schnell Anbietertexte, unklare Produktnamen oder unsichere Compliance-
Claims sichtbar machen. Das waere gegen die Supertools-DNA.

Der erste sinnvolle technische Schritt ist deshalb:

```text
Crawler -> Review -> ToolCard-Preview -> lokale Sichtpruefung -> manuelle Freigabe
```

## Was fuer ein echter Import noch braucht

- Review-Status-Datei, z.B. `data/crawler/review-decisions.json`
- Kategorie-Mapping pro Branche/Cluster
- Trennung von Firmenname und Produktname
- redaktioneller Pitch-Generator oder manuell gepflegtes Pitch-Feld
- Quellenhinweis pro Compliance-Aussage
- Testseite oder Admin-Preview, bevor Daten in echte Kategorien laufen
