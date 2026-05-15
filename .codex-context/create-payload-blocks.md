# Create Payload Blocks: Next.js Module sauber in Payload Blocks ueberfuehren

Dieses Runbook beschreibt, wie ein neues oder bestehendes Next.js Modul so modelliert wird, dass es direkt als editierbarer Payload CMS Block nutzbar ist. Ziel ist ein Workflow, der fuer neue Projekte wiederverwendbar ist: erst fachlich sauber modellieren, dann Payload-Felder, Renderer, Migration und optional kontrollierten Import bauen.

Grundsatz: Ein Modul ist erst dann wirklich CMS-ready, wenn ein Designer im Payload Admin alle relevanten Inhalte bearbeiten kann, ohne Code oder JSON-Pfade anfassen zu muessen.

---

## 1. Vor jedem neuen Modul fragen

Wenn der User ein neues Modul, eine neue Sektion oder eine groessere Komponente bauen laesst, muss der Agent kurz klaeren:

> Soll dieses Modul nur als Next.js Komponente mit Mock-Daten gebaut werden, oder direkt als editierbarer Payload Block inklusive Schema, Renderer und Migration?

Empfohlene Entscheidung:

| Antwort                  | Vorgehen                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| Nur Design/Prototype     | `component-architecture.md` und `mock-data-strategy.md` nutzen. Keine Payload-Dateien aendern.    |
| Direkt editierbar im CMS | Dieses Runbook nutzen. Payload Block, Types, Renderer, Migration und optional Seed/Import bauen.  |
| Unsicher                 | Erst CMS-ready Props modellieren, aber keine Payload-Dateien aendern, bis der User es bestaetigt. |

Wenn der User ausdruecklich "editierbar im Payload Admin", "CMS Block", "Payload Block", "im Backend pflegbar" oder aehnlich sagt, ist das eine direkte Freigabe fuer den Payload-Block-Workflow.

---

## 2. Feldmodell vor Code klaeren

Vor der Implementierung die UI in echte redaktionelle Felder zerlegen.

Gute Fragen:

- Welche Inhalte soll der Designer spaeter bearbeiten koennen?
- Welche Felder sind optional?
- Welche Felder sind Wiederholungen, also Arrays?
- Welche Varianten braucht das Modul wirklich?
- Gibt es Bilder, Videos, Links, CTAs, Icons, Personen, Karten oder Listen?
- Soll das Modul auf mehreren Seiten wiederverwendbar sein?
- Muss bestehender Content ohne Datenverlust weiter funktionieren?

Best Practice:

- Wenn derselbe Inhalt auf mehreren Seiten synchron gepflegt werden soll, nicht als duplizierten Page-Block bauen. Dann [reusable-blocks.md](reusable-blocks.md) lesen und Global + Placeholder-Block oder Reusable-Collection modellieren.
- Felder redaktionell benennen, nicht technisch: `title`, `eyebrow`, `description`, `items`, `image`, `primaryLink`.
- Varianten sparsam halten: `variant` oder `theme` nur nutzen, wenn Layoutvarianten wirklich gebraucht werden.
- Bestehende Blocks lieber optional erweitern, wenn das neue Modul nur eine leichte Variante ist.
- Neuen Block anlegen, wenn die redaktionelle Struktur klar anders ist.

---

## 3. Payload Field Mapping

Standard-Mapping:

| Inhalt            | Payload Field                       | Frontend Shape                         |
| ----------------- | ----------------------------------- | -------------------------------------- |
| Kurzer Text       | `text`                              | `string`                               |
| Mehrzeiliger Text | `textarea`                          | `string`                               |
| Formatierter Text | `richText`                          | Lexical JSON                           |
| Bild              | `upload`, `relationTo: "media"`     | `PayloadImage` Objekt                  |
| Video-Dateipfad   | `text`                              | `"/videos/name.mp4"` oder absolute URL |
| Link/CTA          | `group` mit `text`, `url`, `newTab` | `PayloadLink`                          |
| Karten/Liste      | `array`                             | Array mit `id`                         |
| Boolean           | `checkbox`                          | `boolean`                              |
| Auswahl           | `select`                            | String Union                           |

Wichtige Regeln:

- Bilder niemals als `imageUrl: string` modellieren, wenn sie im Admin gepflegt werden sollen. Bilder sind Upload-Felder, damit Payload Preview, Alt-Text und Media-Verwaltung funktionieren.
- Video-Dateien duerfen als URL/Pfad modelliert werden, wenn sie bewusst ausserhalb von Payload als statische Dateien oder Server-Bind-Mount ausgeliefert werden.
- Upload-Felder fuer Bilder nach Moeglichkeit optional lassen. Pflichtbilder koennen bestehende Daten und Migrationen brechen.
- Arrays bekommen klare Labels und sinnvolle `minRows`/`maxRows`, wenn die Anzahl fachlich fest ist.
- Required-Felder nur einsetzen, wenn bestehender Content sicher befuellt wird oder ein Backfill existiert.

---

## 4. Datei- und Code-Struktur

Typischer Umbau fuer einen neuen Block:

```text
src/
├── blocks/
│   └── ContentBlocks.ts oder <BlockName>.ts
├── collections/
│   └── Pages.ts
├── components/
│   └── blocks/
│       └── BlockRenderer.tsx
├── data/
│   └── <optional-import-data>.ts
├── migrations/
│   ├── <timestamp>_<migration_name>.ts
│   └── index.ts
├── payload-types.ts
├── seed.ts oder scripts/<controlled-import>.ts
└── types/
    └── blocks.ts
```

Die genaue Struktur darf dem Projekt folgen. Wichtig ist die Trennung:

- `src/blocks`: Payload Admin Schema.
- `src/types/blocks.ts`: Frontend-Typen, Payload-kompatibel.
- `BlockRenderer`: Runtime Rendering.
- `seed.ts`/Import: nur kontrollierte Initial- oder Migrationsdaten.
- `src/migrations`: committed Schema-Aenderungen fuer Production.

---

## 5. Implementierungsworkflow

### Schritt 1: Block-Felder definieren

Payload Block erstellen oder bestehende Block-Datei erweitern.

```ts
import type { Block } from "payload";

const linkFields = () => [
  { name: "text", type: "text" as const, required: true },
  { name: "url", type: "text" as const, required: true },
  { name: "newTab", type: "checkbox" as const, defaultValue: false },
];

export const FeatureGrid: Block = {
  slug: "feature-grid",
  interfaceName: "FeatureGridBlock",
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    {
      name: "items",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "link",
          type: "group",
          fields: linkFields(),
        },
      ],
    },
  ],
};
```

### Schritt 2: Page Collection registrieren

Den neuen Block im `layout` Feld der Pages Collection registrieren.

```ts
blocks: [StaticPage, Hero, FeatureGrid, CTA];
```

Nicht genutzte alte Fallback-Blocks erst entfernen, wenn alle Seiten migriert sind.

### Schritt 3: Frontend-Typen anpassen

Typen muessen dem Payload Response Shape entsprechen.

```ts
export interface PayloadImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  mimeType?: string;
}

export interface FeatureGridItem {
  id?: string;
  title: string;
  description?: string;
  image?: PayloadImage;
  link?: PayloadLink;
}

export interface FeatureGridBlockProps extends BlockBase {
  blockType: "feature-grid";
  eyebrow?: string;
  title: string;
  description?: string;
  items?: FeatureGridItem[];
}
```

### Schritt 4: Renderer defensiv implementieren

Server Component als Default. Client Component nur, wenn Interaktion mit State noetig ist.

```tsx
function FeatureGridBlock({ eyebrow, title, description, items }: FeatureGridBlockProps) {
  return (
    <section className="feature-grid">
      {eyebrow && <p className="feature-grid__eyebrow">{eyebrow}</p>}
      <h2 className="feature-grid__title">{title}</h2>
      {description && <p className="feature-grid__description">{description}</p>}
      {!!items?.length && (
        <div className="feature-grid__items">
          {items.map((item) => (
            <article key={item.id || item.title} className="feature-card">
              {item.image?.url && (
                <Image
                  src={item.image.url}
                  alt={item.image.alt || item.title}
                  width={800}
                  height={600}
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              )}
              <h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
```

Renderer registrieren:

```tsx
case "feature-grid":
  return <FeatureGridBlock key={block.id || index} {...block} />;
```

### Schritt 5: Payload Types und Importmap generieren

```bash
npm run payload:importmap
npm run payload:types
```

### Schritt 6: Migration erzeugen

```bash
npm run payload -- migrate:create add_feature_grid_block --skip-empty
```

Die Migration muss committed werden. Production darf nicht nur per lokaler Dev-Sync funktionieren.

### Schritt 7: Daten importieren oder im Admin pflegen

Bei neuen Blocks gibt es zwei Wege:

- Live im Admin befuellen: bevorzugt fuer neue Inhalte.
- Kontrollierter Import/Seed: sinnvoll bei Legacy-Migration oder initialer Demo-Befuellung.

Seeds duerfen bestehende Production-Layouts nicht blind ueberschreiben. Wenn ein Seed Layouts setzt:

- nur ausfuehren, wenn die Seite noch einen Legacy-/Static-Block hat,
- oder Import explizit per Script/Flag starten,
- oder vorher Backup/Export erstellen.

---

## 6. Wiederkehrende und synchrone Blocks

Vor jedem neuen Block pruefen:

- Kommt dieser Abschnitt auf mehreren Seiten vor?
- Soll der Inhalt dort identisch bleiben?
- Soll die Seite trotzdem entscheiden koennen, ob und wo der Abschnitt erscheint?

Wenn ja: [reusable-blocks.md](reusable-blocks.md) anwenden.

Standardloesung fuer einen einzelnen zentralen Abschnitt:

- Global enthaelt die echten Inhalte.
- Page-Block ist nur ein Placeholder mit kleinen Anzeigeoptionen.
- Renderer laedt die Global-Daten und nutzt den bestehenden visuellen Block.
- Seed/Import ersetzt duplizierte Page-Blocks durch Placeholder, ueberschreibt aber keine Production-Daten blind.

Beispiel: Ein globaler Kontakt-CTA wie `Lass uns reden` wird zentral im Global gepflegt. Jede Page enthaelt nur `shared-contact-cta`, damit Designer den Block pro Seite hinzufuegen, entfernen oder verschieben koennen.

---

## 7. Bild- und Medienregeln

### Bilder

Bilder immer ueber Payload Media Collection modellieren:

```ts
{
  name: "image",
  type: "upload",
  relationTo: "media",
}
```

Vorteile:

- Preview im Admin.
- Alt-Text und Metadaten zentral.
- Austausch ohne Code-Deploy.
- Uploads bleiben im `/app/media` Volume erhalten.

Nie fuer editierbare Bilder:

```ts
{ name: "imageUrl", type: "text" }
```

Ausnahme: reine technische Fallbacks in einer kontrollierten Migration. Diese sollten spaeter entfernt werden.

### Videos

Videos koennen als Pfad/URL modelliert werden, wenn sie bewusst nicht in Payload liegen:

```ts
{ name: "videoUrl", type: "text" }
```

Empfehlung:

- grosse MP4s ausserhalb von Git und Docker-Image speichern,
- Server-Bind-Mount verwenden,
- im CMS nur `/videos/<filename>.mp4` oder absolute URL speichern,
- nur bekannte/erlaubte Dateien ausliefern.

---

## 8. Bestehendes Modul erweitern

Workflow:

1. Bestehendes Payload Schema, Frontend-Typen und Renderer lesen.
2. Neues Feld moeglichst optional einfuehren.
3. Renderer so erweitern, dass alter Content identisch weiter rendert.
4. Migration erzeugen und committen.
5. Bestehende Seiten lokal mit altem und neuem Content testen.
6. Nach Deploy neue Felder live im Admin befuellen.

Beispiel:

```ts
{
  name: "secondaryLink",
  type: "group",
  fields: linkFields(),
}
```

Renderer:

```tsx
{
  secondaryLink?.url && (
    <Link href={secondaryLink.url} target={secondaryLink.newTab ? "_blank" : undefined}>
      {secondaryLink.text}
    </Link>
  );
}
```

Pflichtfeld nur dann setzen, wenn alle bestehenden Dokumente vorher oder in derselben Migration Backfill-Daten bekommen.

---

## 9. Legacy-/Static-Seiten migrieren

Wenn eine Seite nur einen `static-page` oder Legacy Block enthaelt, sind die Inhalte im Admin nicht wirklich editierbar. Migration in Phasen:

1. Eine Seite als Pilot waehlen.
2. Legacy DOM/JSON in echte Block-Strukturen zerlegen.
3. Blocks bauen und registrieren.
4. Seed/Import nur fuer diese Seite schreiben.
5. Import nur ausfuehren, wenn das bestehende Layout noch Legacy/static ist.
6. Lokal visuell gegen alte Seite pruefen.
7. Designer im Admin pruefen lassen, ob die Felder verstaendlich sind.
8. Danach weitere Seiten schrittweise migrieren.
9. Legacy/static Fallback erst entfernen, wenn keine Seite ihn mehr nutzt.

Wichtig: Eine visuell migrierte Seite ist nicht automatisch CMS-editierbar. Editierbar ist sie erst, wenn echte Payload Blocktabellen und Felder existieren.

### Legacy-CSS und Animation-Hooks pruefen

Bei Lovable/HTML-Migrationen reicht es nicht, nur die Inhalte in Payload Blocks zu uebertragen. Viele visuelle Details haengen an globalen Klassen, Wrappern, IDs und kleinen Skripten.

Pflichtchecks pro migrierter Seite:

- Original-/Build-HTML als Referenz oeffnen und Reihenfolge der Sektionen vergleichen.
- Wrapper, Klassen, IDs und `data-*` Attribute der interaktiven Module vergleichen.
- Animation-Hooks erhalten, z. B. IDs wie `vidSection`, `vidWrap`, Tabs-/Accordion-Attribute oder Slider-Container.
- Globale Legacy-CSS-Klassen suchen, z. B. `.strip`, `.hero`, `.vid`, `.sta`, `.arb`.
- Wenn mehrere Seiten dieselben Klassennamen anders stylen: Regeln auf `.link-page--<slug>` scopen oder die CSS-Dateien bereinigen.
- Nicht nur `lint`/`build` ausfuehren, sondern die Seite im Browser gegen die Referenz pruefen.

Typischer Fehler: Eine spaeter geladene Unterseiten-CSS-Datei definiert `.strip` global und ueberschreibt dadurch den Strip auf der Startseite. In solchen Faellen ist ein seitenbezogener Selector wie `.link-page--home .strip` robuster als eine weitere globale `.strip` Regel.

### Bilder und Videos korrekt modellieren

- Bilder in editierbaren Blocks immer als `upload` Relation zur Media Collection modellieren. Redakteure brauchen Preview, Alt-Text und Austausch im Admin.
- Keine editierbaren `imageUrl`/`imageSrc` Textfelder fuer Bilder verwenden, ausser es ist bewusst ein externer CDN-Sonderfall.
- Videos duerfen als Pfad/URL-Felder modelliert werden, wenn grosse MP4s bewusst ausserhalb von Git/Docker per Bind Mount oder CDN ausgeliefert werden.
- Video-Felder speichern bevorzugt `/videos/<filename>.mp4` oder eine absolute externe URL.
- Helper fuer public URLs muessen lokale Entwicklung schuetzen: Wenn `NEXT_PUBLIC_SERVER_URL` auf `localhost` zeigt, relative Pfade beibehalten, damit abweichende Dev-Ports wie `localhost:3001` nicht auf `localhost:3000` umgebogen werden.

---

## 10. Test-Checkliste

Vor Commit:

```bash
npm run payload:importmap
npm run payload:types
npm run lint
npm run build
```

Datenbank pruefen:

- Migration erzeugt neue Tabellen/Spalten.
- `payload migrate:status` erkennt die Migration.
- Seite enthaelt echte Blockeintraege, nicht nur Legacy/static Fallback.
- Bilder sind `media` Relations und zeigen im Admin Preview.
- Videos bleiben URL/Pfad-Felder, wenn so vorgesehen.

Browser/Admin pruefen:

- Frontend-Seite rendert visuell korrekt.
- Sektionen erscheinen in derselben Reihenfolge wie in der Referenz.
- Kritische Animation-/Interaktions-Hooks sind im HTML vorhanden.
- Seitenbezogene CSS-Regeln werden nicht von spaeter geladenen globalen Legacy-Regeln ueberschrieben.
- Payload Admin zeigt alle erwarteten Felder.
- Optionale Felder koennen leer bleiben.
- Speichern im Admin revalidiert die betroffene Seite.

Production erst deployen, wenn:

- lokale Seite visuell freigegeben ist,
- Payload Admin UX vom Designer akzeptiert ist,
- Migration committed ist,
- Import-/Seed-Strategie fuer Production klar ist,
- klar ist, ob Production Content manuell gepflegt oder kontrolliert importiert wird.

---

## 11. Agent-Verhalten

Der Agent soll bei Modul-Aufgaben so arbeiten:

1. Kurz fragen, ob direkt Payload Blocks erstellt werden sollen, sofern der User es nicht schon gesagt hat.
2. Wenn ja: dieses Runbook lesen und den kompletten lokalen Block-Workflow umsetzen.
3. Keine Live-Deploys ausloesen, solange der User lokale Pruefung oder weitere Seitenmigration verlangt.
4. Keine Production-Inhalte blind mit Seeds ueberschreiben.
5. Bei Bildern Upload-Felder bevorzugen; bei Videos Pfad-/URL-Felder akzeptieren.
6. Nach Umsetzung klar sagen:
   - welche Blocks/Felder entstanden sind,
   - welche Migrationen erzeugt wurden,
   - wie lokal geprueft wurde,
   - was der Designer im Admin pruefen soll.
