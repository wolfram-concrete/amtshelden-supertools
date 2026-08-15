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
| `availability` / Filter | Verfuegbarkeits-Signal | teilweise | `bundesweit`, `bundeslandspezifisch`, `regional`, `unklar`; immer mit Review-Hinweis und Quelle |

## Mapping: Regionale Verfuegbarkeit

Die Verfuegbarkeit ist ein eigener Review- und Filterbereich. Sie sollte nicht
aus Firmensitz oder Einzelreferenz abgeleitet werden, sondern nur aus
oeffentlichen Angebots- oder Verfuegbarkeitshinweisen.

Empfohlene Datenform:

```ts
type ToolAvailability = {
  scope: "nationwide" | "federal_state" | "regional" | "unknown";
  label: "bundesweit" | "bundeslandspezifisch" | "regional" | "unklar";
  regions: string[];
  confidence: "hoch" | "mittel" | "niedrig" | "offen";
  needsReview: boolean;
  evidence: Array<{ url: string; snippet: string; region?: string }>;
};
```

Fuer die Website ist daraus spaeter ein Filter sinnvoll:

- Bundesweit verfuegbar
- Bundeslandspezifisch verfuegbar
- Regional verfuegbar
- Noch zu pruefen

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

## Aktuelle Website-Verknuepfung (15.08.2026)

Das Frontend fuehrt inzwischen zwei Datenstraenge zusammen:

```text
# Bestehende Excel-/Review-Basis: 59 Tools
src/mocks/tools/crawler-preview.ts

# Neue Master-/Watchlist: 13 Tools
data/crawler/master/software-master.json
  -> scripts/build_software_master.py
  -> src/data/software-master.ts

# Gemeinsame Verzeichnisquelle: 72 Tools
src/data/directory.ts
```

`src/data/directory.ts` wird aktuell unter anderem von Kategorie-Seiten,
Tool-Profil-Fallbacks und dem Home-ToolTeaser gelesen. Die interne Route
`/crawler-preview` zeigt weiterhin die bestehende 59er-Arbeitsbasis.

Die Aggregation fuehrt beide Arrays zusammen und dedupliziert technisch nach
Slug. Bei identischen Slugs hat der spaeter geladene Masterdatensatz Vorrang.
Die aktuellen 59 und 13 sichtbaren Slugs sind disjunkt; ein fachlicher
Konflikt-Report fehlt weiterhin.

Wichtiger Kontroll-Gap: `scripts/build_software_master.py` uebernimmt aktuell
alle 13 Eintraege aus der technischen Master-/Watchlist und liest dabei
`review-decisions.json` nicht ein. Kategorie und neutraler Pitch liegen als
manuelles `EDITORIAL`-Mapping im Script; interne Statusfelder werden nicht ins
Frontend exportiert und Compliance-Flags bleiben bewusst leer. Vor einem
oeffentlichen Livegang muss dieser neue Strang an dasselbe explizite Review-
Gate wie die bestehende 59er-Basis angeschlossen werden.

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

## Pflicht: Produktbilder + Produkt-Summary

Das Frontend hat zwei neue Slots, die der Crawler **je freigegebenem Tool
mitliefern muss**:

### 1) Produktbilder der tatsächlichen Software-Oberfläche
- Der Anbieter-Crawl sammelt Bild-URLs und bewertet sie als
  `product_image_candidates`. Bevorzugt werden vorhandene WebP-, PNG- oder
  JPEG-Assets, deren Dateiname, Alt-Text oder Fundseite auf Dashboard, App-UI,
  Workflow, Portal oder Software-Interface hindeutet.
- **Qualifizierung — wichtig:** NICHT die Marketing-/Startseite abfotografieren
  (Hero mit Navigation, Claim, Buttons). Das liest sich im Frontend wie ein
  Link zur Website, nicht wie ein Produktbild. Ziel ist die tatsächliche
  Oberfläche: das eigentliche Interface-Panel möglichst formatfüllend.
- **Kein Browser-Rahmen nötig** (Adressleiste/Fenster-Punkte): das Frontend
  rahmt die Bilder selbst sauber. Reiner Interface-Ausschnitt genügt.
- Assets werden nur in ein internes Review-Paket heruntergeladen. Es gibt kein
  Hotlinking und keine automatische Übernahme nach `public/`.
- Zielformat: Breite ~1100–1400 px, JPEG, unter ~120 KB, scharf (nicht aus
  einem winzigen Ausschnitt hochskaliert). Nach expliziter Freigabe Ablage z. B.
  `public/brand/screenshots/<slug>/shot-N.jpg`.
- Export ins Frontend als:
  ```ts
  export const crawlerToolScreenshotPreview: Record<string, string[]> = {
    "<slug>": ["/brand/screenshots/<slug>/shot-1.jpg", "..."],
  };
  ```
- Rendern in `ProductShots`; ohne freigegebene Bilder erscheinen Platzhalter.

### 2) Produkt-Summary (Long-Copy)
- Der Crawler erzeugt pro Tool eine **redaktionell verdichtete Beschreibung
  (3–5 Sätze)**: Was ist das Produkt/Unternehmen, für wen, was kann es.
- Quelle: die öffentlichen Anbieter-Inhalte (Startseite, Produktseiten). Kein
  1:1-Copy-Paste — verdichtet/umformuliert, faktisch, ohne Werbe-Superlative.
- Export ins Frontend als:
  ```ts
  export const crawlerToolSummaryPreview: Record<string, string> = {
    "<slug>": "Kurzbeschreibung des Produkts/Unternehmens …",
  };
  ```
- Rendert auf der Profilseite als Abschnitt **„Über das Produkt"**.

Beide Felder werden fuer die bestehende 59er-Basis vom Preview-Export-Script
mit ausgegeben und dort nur nach Review sichtbar. Die gemeinsame Frontend-
Datenquelle ist inzwischen `src/data/directory.ts`; sie aggregiert
`src/mocks/tools/crawler-preview.ts` und `src/data/software-master.ts`.

Produktbild-Kandidaten aus einem vorhandenen Lauf recherchieren:

```bash
cd /Users/wolfram/web-projekte/supertools
.venv/bin/python scripts/discover_product_images.py \
  data/crawler/runs/full-excel-2026-06-28 \
  --out data/crawler/product-images/review-2026-08-15 \
  --decisions data/crawler/review-decisions.json
```

Der Lauf erzeugt `manifest.json`, `review-report.md`, lokale JPEG-Vorschauen
und `review-decisions.template.json` — ausschließlich unter `data/crawler/`.
Jeder Treffer bleibt `needs_review`, bis eine Person bestätigt, dass wirklich
die Software-Oberfläche zu sehen ist. Fotos, Whitepaper-Cover, Marketing-Heroes,
Logos und Website-Screenshots werden abgelehnt.

Frontend-Export mit separaten Bildentscheidungen:

```bash
cd /Users/wolfram/web-projekte/supertools
.venv/bin/python scripts/export_crawler_toolcards_preview.py \
  data/crawler/runs/full-excel-2026-06-28/product-candidates.json \
  --decisions data/crawler/review-decisions.json \
  --image-decisions data/crawler/product-images/review-decisions.json \
  --out src/mocks/tools/crawler-preview.ts
```

`--image-decisions` akzeptiert nur Einträge mit `status: "approved"` und einem
vorhandenen `public_path` unter
`/brand/screenshots/<slug>/shot-N.jpg`. Ohne diese explizite Freigabe bleibt das
Screenshot-Array leer. Der Exporter nimmt selbst keine Screenshots mehr auf.
