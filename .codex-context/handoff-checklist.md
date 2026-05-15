# Handoff-Checkliste

Was der Payload-Integrations-Agent (z.B. `payload-react-agent`) nach diesem Agent tun muss, um die Komponenten an Payload CMS anzubinden.

---

## Feld-Mapping: Interface-Typ → Payload Block-Field

| Interface-Typ | Payload Field | Hinweis |
|---------------|--------------|---------|
| `string` (kurz) | `{ name: 'x', type: 'text', required: true }` | `required` nur bei Pflichtfeldern |
| `string?` (optional) | `{ name: 'x', type: 'text' }` | Kein `required` |
| `string` (lang) | `{ name: 'x', type: 'textarea' }` | Für `description`, mehrzeilige Texte |
| `number` | `{ name: 'x', type: 'number' }` | |
| `boolean` | `{ name: 'x', type: 'checkbox' }` | |
| `PayloadImage` | `{ name: 'x', type: 'upload', relationTo: 'media' }` | **NIEMALS `required: true`** |
| `'a' \| 'b' \| 'c'` | `{ name: 'x', type: 'select', options: ['a','b','c'] }` | |
| `SomeItem[]` | `{ name: 'x', type: 'array', fields: [...] }` | Sub-Interface → Array fields |
| `any` (RichText) | `{ name: 'x', type: 'richText' }` | Lexical Editor |
| `string` (Datum) | `{ name: 'x', type: 'date' }` | ISO-String |

---

## Integrations-Schritte (für den Payload-Agent)

### 1. Block-Definition erstellen

Für jeden Block eine Datei in `src/blocks/`:

```typescript
// src/blocks/HeroBlock.ts
import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heros' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'textarea' },
    { name: 'kicker', type: 'text' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' }, // KEIN required!
    { name: 'buttonText', type: 'text' },
    { name: 'buttonLink', type: 'text' },
  ],
}
```

### 2. Global anlegen

```typescript
// src/globals/Startseite.ts
import { GlobalConfig } from 'payload'
import { revalidatePath } from 'next/cache'
import { HeroBlock } from '../blocks/HeroBlock'

export const Startseite: GlobalConfig = {
  slug: 'startseite',
  label: 'Startseite',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),  // ⚠️ KRITISCH
  },
  hooks: {
    afterChange: [
      () => { try { revalidatePath('/') } catch {} },  // ⚠️ try/catch PFLICHT
    ],
  },
  fields: [
    { name: 'layout', type: 'blocks', blocks: [HeroBlock] },
  ],
}
```

### 3. In `payload.config.ts` registrieren

```typescript
globals: [...bestehendeGlobals, Startseite],
```

### 4. Migration generieren

```bash
npx payload migrate:create --name startseite
```

Die generierten Dateien committen und pushen.

### 5. Mock-Daten → Seed-Script

Mock-Daten aus `src/mocks/` in `seed.ts` überführen:

```typescript
// seed.ts
const layout: any[] = [  // ⚠️ any[] wegen TypeScript blockType Inference
  {
    blockType: 'hero',
    title: 'Gemeinsam Stadt gestalten',
    backgroundImage: mediaDocs['hero-bg.jpg'] || null,
  },
]

await (payload.updateGlobal as any)({  // ⚠️ as any bis Types regeneriert
  slug: 'startseite',
  data: { layout },
})
```

### 6. Page: Mock → Payload Local API

**Vorher (Mock):**
```tsx
import { startseiteMock } from '@/mocks/pages/startseite'

export default function Home() {
  return <BlockRenderer blocks={startseiteMock.layout} />
}
```

**Nachher (Payload):**
```tsx
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function Home() {
  let data = null
  try {
    const payload = await getPayload({ config: configPromise })
    data = await (payload.findGlobal as any)({ slug: 'startseite' })
  } catch {}

  if (!data?.layout?.length) {
    return <div>Inhalte werden geladen...</div>
  }

  return <BlockRenderer blocks={data.layout} />
}
```

### 7. ISR-Pattern aktivieren

- Kein `force-dynamic` — ISR mit try/catch
- `afterChange` Hook im Global mit `revalidatePath()` in try/catch
- Nach Deploy: Global einmal im Admin speichern (Cache initialisieren)

### 8. Aufräumen

Löschen:
- `src/mocks/` (komplett)
- `public/mock/` (komplett)
- `src/app/(frontend)/preview/` (komplett)

---

## Payload-Stolperfallen

| Falle | Problem | Lösung |
|-------|---------|--------|
| Upload `required: true` | Admin kann nicht speichern ohne Bild-Upload | **Niemals `required` auf Upload-Feldern** |
| Layout `any[]` | TypeScript blockType literal inference Fehler im Seed | `const layout: any[] = [...]` |
| `revalidatePath()` | Wirft Error außerhalb Next.js Kontext (z.B. Seed via tsx) | **Immer in try/catch wrappen** |
| `findGlobal` TypeScript | Neues Global nicht in `payload-types.ts` | `(payload.findGlobal as any)()` |
| `updateGlobal` TypeScript | Neues Global nicht in `payload-types.ts` | `(payload.updateGlobal as any)()` |
| Globals Access | Admin kann nicht speichern | `update: ({req: {user}}) => Boolean(user)` |
| Array Items ohne `id` | Payload erwartet IDs bei Updates | Payload generiert IDs automatisch bei `create`/`updateGlobal` |

---

## Vollständiges Beispiel: HeroBlock Handoff

### 1. Interface (bereits vorhanden, vom nextjs-agent erstellt)

```typescript
// src/components/blocks/HeroBlock.tsx
export interface HeroBlockProps extends BlockBase {
  title: string
  subtitle?: string
  kicker?: string
  backgroundImage?: PayloadImage
  buttonText?: string
  buttonLink?: string
}
```

### 2. Block-Definition (Payload-Agent erstellt)

```typescript
// src/blocks/HeroBlock.ts
import { Block } from 'payload'
export const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'textarea' },
    { name: 'kicker', type: 'text' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
    { name: 'buttonText', type: 'text' },
    { name: 'buttonLink', type: 'text' },
  ],
}
```

### 3. Global (Payload-Agent erstellt)

```typescript
// src/globals/Startseite.ts
import { HeroBlock } from '../blocks/HeroBlock'
export const Startseite: GlobalConfig = {
  slug: 'startseite',
  access: { read: () => true, update: ({req: {user}}) => Boolean(user) },
  hooks: { afterChange: [() => { try { revalidatePath('/') } catch {} }] },
  fields: [{ name: 'layout', type: 'blocks', blocks: [HeroBlock] }],
}
```

### 4. Seed (Payload-Agent erstellt)

```typescript
// seed.ts (Auszug)
const layout: any[] = [
  { blockType: 'hero', title: 'Gemeinsam Stadt gestalten', backgroundImage: mediaDocs['hero-bg.jpg'] || null },
]
await (payload.updateGlobal as any)({ slug: 'startseite', data: { layout } })
```

### 5. Page (Payload-Agent ändert)

```typescript
// src/app/(frontend)/page.tsx — Mock-Import wird ersetzt durch getPayload()
```

Die **Komponente selbst** (`src/components/blocks/HeroBlock.tsx`) bleibt unverändert. Sie funktioniert sowohl mit Mock-Daten als auch mit Payload-Daten, weil die Datenform identisch ist.
