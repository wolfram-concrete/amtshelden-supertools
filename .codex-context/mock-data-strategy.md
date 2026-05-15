# Mock-Daten-Strategie

Wie Mock-Daten strukturiert werden, damit sie exakt der Payload API Response Shape entsprechen und die Komponenten ohne CMS funktionieren.

---

## Verzeichnisstruktur

```
src/mocks/
├── images.ts              # Wiederverwendbare Mock-PayloadImage Objekte
├── blocks/
│   ├── hero.ts            # Mock-Daten pro Block-Typ
│   ├── text.ts
│   ├── persons.ts
│   ├── events.ts
│   ├── cta.ts
│   └── ...
└── pages/
    ├── startseite.ts      # Komplettes Layout als Block-Array
    ├── ueber-uns.ts
    └── ...

public/mock/               # Vorschau-Bilder (werden nach Payload-Integration gelöscht)
├── hero-bg.jpg
├── portrait-1.jpg
└── ...
```

---

## Regeln

### 1. Exakte Payload API Response Shape

Mock-Daten müssen die Form haben, die Payload später liefert:

```typescript
// ✅ Richtig — Payload Response Shape
const heroMock = {
  blockType: 'hero',
  id: 'mock-hero-1',
  title: 'Willkommen bei Noma',
  subtitle: 'Architektur & Stadtentwicklung',
  backgroundImage: {
    url: '/mock/hero-bg.jpg',
    alt: 'Hero Hintergrund',
    width: 1920,
    height: 1080,
    mimeType: 'image/jpeg',
  },
  buttonText: 'Mehr erfahren',
  buttonLink: '/ueber-uns',
}

// ❌ Falsch — nicht Payload-kompatibel
const heroMock = {
  title: 'Willkommen',
  imageSrc: '/hero-bg.jpg',  // Payload liefert {url, alt, ...}!
  imageAlt: 'Hero',           // Alt gehört ins Image-Objekt!
}
```

### 2. `blockType` und `id` immer setzen

Jedes Mock-Block-Objekt braucht:
- `blockType: 'slug'` — für den BlockRenderer
- `id: 'mock-xxx'` — Payload generiert IDs automatisch, Mock verwendet Prefixed IDs

### 3. Arrays mit `id`-Feld

Payload gibt Array-Items immer mit `id` zurück:

```typescript
const personsMock = {
  blockType: 'persons',
  id: 'mock-persons-1',
  title: 'Unser Team',
  persons: [
    {
      id: 'mock-person-1',    // Payload generiert das automatisch
      name: 'Max Mustermann',
      role: 'Geschäftsführer',
      image: { url: '/mock/portrait-1.jpg', alt: 'Max Mustermann', width: 400, height: 533 },
    },
    {
      id: 'mock-person-2',
      name: 'Erika Muster',
      role: 'Projektleitung',
      image: { url: '/mock/portrait-2.jpg', alt: 'Erika Muster', width: 400, height: 533 },
    },
  ],
}
```

### 4. Kein Payload-Import

```typescript
// ❌ Verboten
import type { Media } from '@/payload-types'

// ✅ Richtig — eigene Typen verwenden
import type { PayloadImage } from '@/types/blocks'
```

---

## Beispiel: Mock-Bilder (`src/mocks/images.ts`)

```typescript
import type { PayloadImage } from '@/types/blocks'

export const mockImages: Record<string, PayloadImage> = {
  heroBg: {
    url: '/mock/hero-bg.jpg',
    alt: 'Hero Hintergrund',
    width: 1920,
    height: 1080,
    mimeType: 'image/jpeg',
  },
  portrait1: {
    url: '/mock/portrait-1.jpg',
    alt: 'Team-Mitglied 1',
    width: 400,
    height: 533,
    mimeType: 'image/jpeg',
  },
  ctaBg: {
    url: '/mock/cta-bg.jpg',
    alt: 'CTA Hintergrund',
    width: 1920,
    height: 800,
    mimeType: 'image/jpeg',
  },
}
```

**Alternative ohne lokale Bilder:**
```typescript
export const mockImages: Record<string, PayloadImage> = {
  heroBg: {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop',
    alt: 'Architektur',
    width: 1920,
    height: 1080,
  },
}
```

---

## Beispiel: Block-Mock (`src/mocks/blocks/hero.ts`)

```typescript
import type { HeroBlockProps } from '@/components/blocks/HeroBlock'
import { mockImages } from '../images'

export const heroMock: HeroBlockProps = {
  blockType: 'hero',
  id: 'mock-hero-1',
  title: 'Gemeinsam Stadt gestalten',
  subtitle: 'Noma verbindet Architektur, Kultur und Stadtentwicklung.',
  kicker: 'Willkommen',
  backgroundImage: mockImages.heroBg,
  buttonText: 'Projekte entdecken',
  buttonLink: '/stadtprojekte',
}
```

---

## Beispiel: Seiten-Layout (`src/mocks/pages/startseite.ts`)

```typescript
import { heroMock } from '../blocks/hero'
import { textMock } from '../blocks/text'
import { personsMock } from '../blocks/persons'
import { ctaMock } from '../blocks/cta'

export const startseiteMock = {
  layout: [
    heroMock,
    textMock,
    personsMock,
    ctaMock,
  ],
}
```

---

## Vorschau-Seiten

Erstelle eine Vorschau-Route die alle Blocks mit Mock-Daten rendert:

```tsx
// src/app/(frontend)/preview/page.tsx
import { BlockRenderer } from '@/components/BlockRenderer'
import { startseiteMock } from '@/mocks/pages/startseite'

export default function PreviewPage() {
  return (
    <main>
      <BlockRenderer blocks={startseiteMock.layout} />
    </main>
  )
}
```

Für einzelne Blocks:

```tsx
// src/app/(frontend)/preview/blocks/page.tsx
import { HeroBlock } from '@/components/blocks/HeroBlock'
import { heroMock } from '@/mocks/blocks/hero'

export default function BlocksPreview() {
  return (
    <main className="space-y-8">
      <h1 className="container pt-8 font-heading text-3xl">Block-Vorschau</h1>
      <HeroBlock {...heroMock} />
      {/* Weitere Blocks hier einzeln rendern */}
    </main>
  )
}
```

---

## Bilder in `public/mock/`

Vorschau-Bilder in `public/mock/` ablegen. Diese werden nach der Payload-Integration gelöscht (Payload verwaltet Bilder über die Media Collection).

```
public/mock/
├── hero-bg.jpg        # 1920x1080
├── portrait-1.jpg     # 400x533 (Hochformat 3:4)
├── portrait-2.jpg
├── event-1.jpg        # 640x360 (16:9)
├── cta-bg.jpg         # 1920x800
└── ...
```

**Tipp:** Bilder aus Unsplash oder Pexels in passenden Formaten herunterladen. Oder `placehold.co` URLs als Alternative verwenden:
```
https://placehold.co/1920x1080/1a365d/ffffff?text=Hero
https://placehold.co/400x533/e2e8f0/334155?text=Portrait
```

---

## Nach Payload-Integration entfernen

Folgende Dateien werden nach der CMS-Anbindung gelöscht:
- `src/mocks/` (komplett)
- `public/mock/` (komplett)
- `src/app/(frontend)/preview/` (komplett)
- Mock-Imports in Page-Dateien (ersetzt durch `getPayload()`)
