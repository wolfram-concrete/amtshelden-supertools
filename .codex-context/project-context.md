# Projektkontext

Tech-Stack, Tailwind-Konfiguration, bestehende Blocks und Design-Patterns für das noma-Projekt.

---

## Tech-Stack

| Komponente | Technologie |
|-----------|------------|
| Framework | Next.js (App Router) |
| Sprache | TypeScript (TSX) |
| Styling | Tailwind CSS + shadcn/ui |
| Icons | Lucide React |
| Animationen | Framer Motion (Client Components) |
| UI-Primitives | shadcn/ui (Radix-basiert) |
| CMS (später) | Payload CMS 3.x (Single-Repo) |
| Datenbank (später) | PostgreSQL |

---

## Architektur (Single-Repo)

```
/ (Repo-Root)
├── src/
│   ├── app/(frontend)/     # Öffentliche Seiten (Server Components)
│   ├── app/(payload)/      # Admin Panel (auto-generiert)
│   ├── blocks/             # Block-Definitionen (Payload)
│   ├── globals/            # Global-Definitionen (Payload)
│   ├── collections/        # Collections (Users, Media)
│   ├── types/blocks.ts     # Shared Types (PayloadImage, PayloadLink, BlockBase)
│   ├── mocks/              # Mock-Daten (temporär)
│   └── components/
│       ├── blocks/         # Frontend Block-Komponenten
│       ├── BlockRenderer.tsx
│       └── ui/             # shadcn/ui
├── public/mock/            # Vorschau-Bilder (temporär)
└── tailwind.config.ts
```

---

## Bestehende Block-Typen (12 Blocks)

| # | Slug | Beschreibung | Server/Client |
|---|------|-------------|---------------|
| 1 | `hero` | Hero mit Titel, Subtitle, Kicker, Hintergrundbild, Button | Client (Framer Motion) |
| 2 | `slider` | Bild-Slider mit Slides (image, caption, label) | Client (State) |
| 3 | `process` | Prozess-Schritte (kicker, title, steps[]) | Client (Framer Motion) |
| 4 | `quote` | Zitat mit Hintergrundbild | Client (Framer Motion) |
| 5 | `persons` | Personen-Grid (persons[]: name, role, image) | Client (Framer Motion) |
| 6 | `cta` | Call-to-Action mit Button und Hintergrundbild | Client (Framer Motion) |
| 7 | `text` | Text-Sektion mit optionalen Primary/Secondary Buttons | Client (Framer Motion) |
| 8 | `events` | Event-Liste mit Kalender-Daten und Links | Client (Framer Motion) |
| 9 | `testimonials` | Zitate-Karussell | Client (Framer Motion) |
| 10 | `text-image` | Text mit Bild daneben | Client (Framer Motion) |
| 11 | `image` | Einzelbild mit Alt-Text | Server |
| 12 | `projects` | Projekt-Grid mit Tags | Client (Framer Motion) |

**Regel:** Bestehenden Block mit optionalen Feldern erweitern statt neuen Block anlegen.

---

## Tailwind-Konfiguration

### Fonts

```typescript
fontFamily: {
  heading: ['Cormorant Garamond', 'serif'],   // Elegante Serif für Überschriften
  body: ['DM Sans', 'sans-serif'],             // Moderne Sans für Body
}
```

### Projekt-Farben (noma)

```typescript
noma: {
  navy: 'hsl(var(--noma-navy))',
  'navy-light': 'hsl(var(--noma-navy-light))',
  blue: 'hsl(var(--noma-blue))',
  'blue-light': 'hsl(var(--noma-blue-light))',
  sky: 'hsl(var(--noma-sky))',
  red: 'hsl(var(--noma-red))',
  'red-light': 'hsl(var(--noma-red-light))',
  'red-soft': 'hsl(var(--noma-red-soft))',
}
```

### Container

```typescript
container: {
  center: true,
  padding: '2rem',
  screens: { '2xl': '1400px' },
}
```

### Animationen

```typescript
keyframes: {
  'fade-in-up': {
    from: { opacity: '0', transform: 'translateY(20px)' },
    to: { opacity: '1', transform: 'translateY(0)' },
  },
  'accordion-down': { /* Radix Accordion */ },
  'accordion-up': { /* Radix Accordion */ },
}
```

### shadcn/ui Farb-System (HSL CSS Variables)

```
--background, --foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive, --destructive-foreground
--border, --input, --ring
```

---

## Design-Patterns (aus bestehendem Code extrahiert)

### Kicker-Pattern
```html
<span class="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
  {kicker}
</span>
```

Variante mit Linie (Hero):
```html
<span class="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/60">
  <span class="h-px w-8 bg-white/40" /> {kicker}
</span>
```

### Heading-Pattern
```html
<h2 class="mt-4 font-heading text-4xl font-normal leading-[1.15] text-foreground md:text-5xl">
  {title}
</h2>
```

Hero-Variante:
```html
<h1 class="font-heading text-5xl font-normal leading-[1.1] text-white md:text-6xl lg:text-7xl">
```

### Section-Spacing
```html
<section class="py-24 lg:py-32">
```

### Container
```html
<div class="container">
```

### Grid-Patterns
```html
<!-- 2 Spalten (Standard) -->
<div class="grid gap-8 lg:grid-cols-2 lg:gap-20 items-start">

<!-- 3 Spalten (Events) -->
<div class="grid gap-px bg-border md:grid-cols-3">

<!-- 4 Spalten (Persons Grid) -->
<div class="grid gap-px bg-border grid-cols-2 md:grid-cols-4">
```

### Bild mit Hover-Effekt
```html
<div class="overflow-hidden">
  <img class="... transition-transform duration-700 group-hover:scale-105" />
</div>
```

### Gradient-Overlays (auf dunklen Bildern)
```html
<!-- Von unten nach oben -->
<div class="absolute inset-0 bg-gradient-to-t from-[hsl(215_62%_18%/0.7)] via-[hsl(215_62%_24%/0.3)] to-transparent" />

<!-- Von links nach rechts -->
<div class="absolute inset-0 bg-gradient-to-r from-[hsl(215_62%_18%/0.7)] to-[hsl(215_62%_24%/0.3)]" />
```

### Button-Patterns

Primary (dunkel):
```html
<Button class="bg-noma-navy text-white hover:bg-noma-navy-light px-8 text-sm tracking-wide">
```

Secondary (Text-Link):
```html
<a class="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors">
  {text} <ArrowUpRight size={14} />
</a>
```

Ghost (auf dunklem Hintergrund):
```html
<Button class="border border-white/20 bg-transparent text-white hover:bg-white/10 px-8 text-sm tracking-wide">
```

---

## shadcn/ui Komponenten (verfügbar)

Button, Card, Tabs, Accordion, Pagination, Alert Dialog, Aspect Ratio und weitere Radix-basierte Primitives.

**Regel:** Immer shadcn/ui Komponenten verwenden wenn verfügbar. Keine eigenen Buttons, Modals oder Dropdowns bauen.

---

## Utilities

### `cn()` — Bedingte CSS-Klassen (`src/lib/utils.ts`)

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Verwendung:**
```tsx
import { cn } from '@/lib/utils'

// Bedingte Klassen
<section className={cn('py-24 lg:py-32', bgColor && 'bg-secondary/50')}>

// Mehrere bedingte Klassen
<div className={cn(
  'grid gap-px bg-border',
  columns === 4 ? 'md:grid-cols-4' : 'md:grid-cols-2'
)}>
```

### `next/font` — Font-Loading

Fonts werden über `next/font/google` im Frontend-Layout geladen (kein CDN-Link):
```tsx
// src/app/(frontend)/layout.tsx
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'

const heading = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-heading' })
const body = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-body' })
```
