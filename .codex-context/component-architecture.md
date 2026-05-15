# Component Architecture

Vollständige Referenz für Komponentenstruktur, Props/Interfaces, Naming-Konventionen und Block-Templates.

---

## Naming-Konventionen

| Element | Konvention | Beispiel |
|---------|-----------|---------|
| Datei | PascalCase + `Block.tsx` | `HeroBlock.tsx` |
| Interface | PascalCase + `BlockProps` | `HeroBlockProps` |
| Export | PascalCase + `Block` | `HeroBlock` |
| Slug (BlockRenderer Key) | kebab-case | `hero`, `text-image` |
| Mock-Daten Datei | kebab-case `.ts` | `src/mocks/blocks/hero.ts` |
| Sub-Interface (Array Items) | PascalCase + `Item` | `PersonItem`, `EventItem` |

---

## Props/Interface-Design-Patterns

### Basis-Typen (aus `src/types/blocks.ts`)

```typescript
export interface PayloadImage {
  url: string
  alt: string
  width?: number
  height?: number
  mimeType?: string
}

export interface PayloadLink {
  text: string
  url: string
  newTab?: boolean
}

export interface BlockBase {
  blockType?: string
  id?: string
}
```

### Block-Interface Pattern

```typescript
import type { BlockBase, PayloadImage } from '@/types/blocks'

export interface HeroBlockProps extends BlockBase {
  title: string
  subtitle?: string
  kicker?: string
  backgroundImage?: PayloadImage
  buttonText?: string
  buttonLink?: string
}
```

**Regeln:**
- Jedes Interface **extends BlockBase**
- Pflichtfelder: `title` (fast immer)
- Optionale Felder: alles andere mit `?`
- Bilder: immer `PayloadImage` (Objekt, nicht String)
- Arrays: eigene Sub-Interfaces

### Array-Felder

```typescript
export interface PersonItem {
  id?: string  // Payload generiert IDs für Array-Items
  name: string
  role?: string
  description?: string
  image?: PayloadImage
}

export interface PersonsBlockProps extends BlockBase {
  kicker?: string
  title: string
  description?: string
  bgColor?: boolean
  persons?: PersonItem[]
}
```

### Payload-Datenform-Referenz

Diese Tabelle zeigt wie Interface-Typen auf Payload-Felder abbilden:

| Interface-Typ | Payload Feld | API Response |
|---------------|-------------|-------------|
| `string` | `{ type: 'text' }` | `"Hallo Welt"` |
| `string` (lang) | `{ type: 'textarea' }` | `"Langer Text..."` |
| `number` | `{ type: 'number' }` | `42` |
| `boolean` | `{ type: 'checkbox' }` | `true` |
| `PayloadImage` | `{ type: 'upload', relationTo: 'media' }` | `{ url: "/media/bild.jpg", alt: "...", width: 1920, height: 1080, mimeType: "image/jpeg" }` |
| `'option1' \| 'option2'` | `{ type: 'select', options: [...] }` | `"option1"` |
| `SomeItem[]` | `{ type: 'array', fields: [...] }` | `[{ id: "abc123", ...fields }]` |
| `any` (RichText) | `{ type: 'richText' }` | Lexical Nodes (komplexer JSON-Baum) |
| `string` (Datum) | `{ type: 'date' }` | `"2024-03-15T00:00:00.000Z"` |

---

## Server vs. Client Components

### Default: Server Component

```tsx
// src/components/blocks/TextBlock.tsx
import Image from 'next/image'
import Link from 'next/link'
import type { TextBlockProps } from './TextBlock'

export const TextBlock = ({ kicker, title, description }: TextBlockProps) => {
  return (
    <section className="py-24 lg:py-32">
      {/* ... */}
    </section>
  )
}
```

### Client Component (nur wenn nötig)

```tsx
// src/components/blocks/SliderBlock.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { SliderBlockProps } from './SliderBlock'

export const SliderBlock = ({ slides }: SliderBlockProps) => {
  const [current, setCurrent] = useState(0)
  // ...
}
```

**`'use client'` nur für:**
- `useState`, `useEffect`, `useRef`
- Event Handler (`onClick`, `onChange`)
- Framer Motion (`motion.div`)
- Browser APIs (`window`, `localStorage`)
- Slider, Karussells, Tabs, Accordions, Formulare

---

## BlockRenderer-Pattern

```tsx
// src/components/BlockRenderer.tsx
import { HeroBlock } from './blocks/HeroBlock'
import { TextBlock } from './blocks/TextBlock'
import { TextImageBlock } from './blocks/TextImageBlock'
// ... weitere Imports

const components: Record<string, React.ComponentType<any>> = {
  hero: HeroBlock,
  text: TextBlock,
  'text-image': TextImageBlock,
  // Key = Block slug (kebab-case)
}

export const BlockRenderer = ({ blocks }: { blocks: any[] }) => {
  if (!blocks || !Array.isArray(blocks)) return null

  return (
    <>
      {blocks.map((block, i) => {
        const Component = components[block.blockType]
        if (!Component) {
          console.warn(`Block "${block.blockType}" nicht gefunden.`)
          return null
        }
        return <Component key={block.id || i} {...block} />
      })}
    </>
  )
}
```

---

## Block-Templates

### 1. Hero Block (Server Component)

```tsx
// src/components/blocks/HeroBlock.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { BlockBase, PayloadImage } from '@/types/blocks'

export interface HeroBlockProps extends BlockBase {
  title: string
  subtitle?: string
  kicker?: string
  backgroundImage?: PayloadImage
  buttonText?: string
  buttonLink?: string
}

export const HeroBlock = ({ title, subtitle, kicker, backgroundImage, buttonText, buttonLink }: HeroBlockProps) => {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden">
      {backgroundImage?.url && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt || title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215_62%_18%/0.7)] via-[hsl(215_62%_24%/0.3)] to-transparent" />
        </div>
      )}
      <div className="container relative z-10 pb-16 lg:pb-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-end">
          <div>
            {kicker && (
              <span className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                <span className="h-px w-8 bg-white/40" /> {kicker}
              </span>
            )}
            <h1 className="font-heading text-5xl font-normal leading-[1.1] text-white md:text-6xl lg:text-7xl">
              {title}
            </h1>
          </div>
          <div>
            {subtitle && (
              <p className="text-base leading-relaxed text-white/70 md:text-lg max-w-md">{subtitle}</p>
            )}
            {buttonText && buttonLink && (
              <Button asChild size="lg" className="mt-6 bg-white text-foreground hover:bg-white/90 px-8 text-sm tracking-wide">
                <Link href={buttonLink}>{buttonText}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
```

### 2. Text Block (Server Component)

```tsx
// src/components/blocks/TextBlock.tsx
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { BlockBase } from '@/types/blocks'

export interface TextBlockProps extends BlockBase {
  kicker?: string
  title: string
  description?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
}

export const TextBlock = ({ kicker, title, description, primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink }: TextBlockProps) => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-20 items-start">
          <div>
            {kicker && <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{kicker}</span>}
            <h2 className="mt-4 font-heading text-4xl font-normal leading-[1.15] text-foreground md:text-5xl">{title}</h2>
            {description && <p className="mt-6 text-muted-foreground leading-[1.8]">{description}</p>}
          </div>
          {(primaryButtonText || secondaryButtonText) && (
            <div className="flex flex-col gap-4 lg:pt-14">
              {primaryButtonText && primaryButtonLink && (
                <Button asChild className="bg-noma-navy text-white hover:bg-noma-navy-light px-8 text-sm tracking-wide w-fit">
                  <Link href={primaryButtonLink}>{primaryButtonText}</Link>
                </Button>
              )}
              {secondaryButtonText && secondaryButtonLink && (
                <Link href={secondaryButtonLink} className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors">
                  {secondaryButtonText} <ArrowUpRight size={14} />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
```

### 3. Text-Image Block (Server Component)

```tsx
// src/components/blocks/TextImageBlock.tsx
import Image from 'next/image'
import type { BlockBase, PayloadImage } from '@/types/blocks'

export interface TextImageBlockProps extends BlockBase {
  kicker?: string
  title: string
  description?: string
  image?: PayloadImage
}

export const TextImageBlock = ({ kicker, title, description, image }: TextImageBlockProps) => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-20 items-start">
          <div>
            {kicker && <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{kicker}</span>}
            <h2 className="mt-4 font-heading text-4xl font-normal leading-[1.15] text-foreground md:text-5xl">{title}</h2>
            {description && <p className="mt-6 text-muted-foreground leading-[1.8]">{description}</p>}
          </div>
          {image?.url && (
            <div className="aspect-[4/3] overflow-hidden">
              <Image
                src={image.url}
                alt={image.alt || title}
                width={image.width || 800}
                height={image.height || 600}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
```

### 4. Persons-Grid Block (Server Component)

```tsx
// src/components/blocks/PersonsBlock.tsx
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { BlockBase, PayloadImage } from '@/types/blocks'

export interface PersonItem {
  id?: string
  name: string
  role?: string
  description?: string
  image?: PayloadImage
}

export interface PersonsBlockProps extends BlockBase {
  kicker?: string
  title: string
  description?: string
  bgColor?: boolean
  persons?: PersonItem[]
}

export const PersonsBlock = ({ kicker, title, description, bgColor, persons }: PersonsBlockProps) => {
  return (
    <section className={cn('py-24 lg:py-32', bgColor && 'bg-secondary/50')}>
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-20 items-end mb-16">
          <div>
            {kicker && <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{kicker}</span>}
            <h2 className="mt-4 font-heading text-4xl font-normal leading-[1.15] text-foreground md:text-5xl">{title}</h2>
          </div>
          {description && <p className="text-muted-foreground leading-[1.8]">{description}</p>}
        </div>
        <div className={cn(
          'grid gap-px bg-border',
          (persons?.length ?? 0) > 4 ? 'grid-cols-2 md:grid-cols-4' : 'md:grid-cols-2 max-w-3xl'
        )}>
          {persons?.map((member, i) => (
            <div key={member.id || `${member.name}-${i}`} className="bg-background overflow-hidden">
              {member.image?.url && (
                <div className="aspect-[3/4] bg-muted">
                  <Image
                    src={member.image.url}
                    alt={member.image.alt || member.name}
                    width={member.image.width || 400}
                    height={member.image.height || 533}
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="p-4 lg:p-6">
                <h3 className="font-heading text-base font-normal text-foreground">{member.name}</h3>
                {member.role && <p className="text-xs font-medium uppercase tracking-widest text-accent mt-1">{member.role}</p>}
                {member.description && <p className="mt-1 text-xs text-muted-foreground">{member.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### 5. Events-Grid Block (Server Component)

```tsx
// src/components/blocks/EventsBlock.tsx
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, ArrowUpRight } from 'lucide-react'
import type { BlockBase, PayloadImage } from '@/types/blocks'

export interface EventItem {
  id?: string
  title: string
  slug?: string
  description?: string
  type?: string
  day?: string
  date?: string
  month?: string
  location?: string
  image?: PayloadImage
}

export interface EventsBlockProps extends BlockBase {
  kicker?: string
  title?: string
  events?: EventItem[]
}

export const EventsBlock = ({ kicker, title, events }: EventsBlockProps) => {
  if (!events?.length) return null

  return (
    <section className="py-24 lg:py-32">
      <div className="container">
        {(kicker || title) && (
          <div className="mb-16">
            {kicker && <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{kicker}</span>}
            {title && <h2 className="mt-4 font-heading text-4xl font-normal leading-[1.15] text-foreground md:text-5xl">{title}</h2>}
          </div>
        )}
        <div className="grid gap-px bg-border md:grid-cols-3">
          {events.map((e, i) => (
            <div key={e.id || `${e.slug}-${i}`}>
              <Link href={e.slug ? `/netzwerk-events/${e.slug}` : '#'} className="group block bg-background h-full">
                {e.image?.url && (
                  <div className="aspect-[16/9] overflow-hidden">
                    <Image
                      src={e.image.url}
                      alt={e.image.alt || e.title}
                      width={e.image.width || 640}
                      height={e.image.height || 360}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                    {e.type && <span className="font-medium uppercase tracking-[0.2em] text-accent">{e.type}</span>}
                    {e.day && e.date && e.month && (
                      <span><Clock size={12} className="inline mr-1" />{e.day}, {e.date}. {e.month}</span>
                    )}
                    {e.location && <span><MapPin size={12} className="inline mr-1" />{e.location}</span>}
                  </div>
                  <h3 className="mt-3 font-heading text-xl font-normal text-foreground group-hover:text-accent transition-colors">{e.title}</h3>
                  {e.description && <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{e.description}</p>}
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                    Zur Veranstaltung <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### 6. CTA Block (Server Component)

```tsx
// src/components/blocks/CallToActionBlock.tsx
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { BlockBase, PayloadImage } from '@/types/blocks'

export interface CallToActionBlockProps extends BlockBase {
  kicker?: string
  title: string
  description?: string
  buttonText?: string
  buttonLink?: string
  backgroundImage?: PayloadImage
}

export const CallToActionBlock = ({ kicker, title, description, buttonText, buttonLink, backgroundImage }: CallToActionBlockProps) => {
  return (
    <section className="py-4">
      <div className="container">
        <div className="relative overflow-hidden py-16 lg:py-20 rounded-[20px]">
          {backgroundImage?.url && (
            <div className="absolute inset-0">
              <Image
                src={backgroundImage.url}
                alt={backgroundImage.alt || title}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(215_62%_18%/0.7)] to-[hsl(215_62%_24%/0.3)]" />
            </div>
          )}
          <div className="container relative z-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-20 items-start">
              <div>
                {kicker && <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">{kicker}</span>}
                <h2 className="mt-4 font-heading text-4xl font-normal text-white md:text-5xl">{title}</h2>
                {description && <p className="mt-4 text-white/60 leading-[1.8]">{description}</p>}
                {buttonText && (
                  <Button asChild className="mt-6 border border-white/20 bg-transparent text-white hover:bg-white/10 px-8 text-sm tracking-wide">
                    <a href={buttonLink || '#'}>
                      {buttonText} <ArrowUpRight size={14} className="ml-2" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### 7. FAQ/Accordion Block (Client Component)

```tsx
// src/components/blocks/FaqBlock.tsx
'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { BlockBase } from '@/types/blocks'

export interface FaqItem {
  id?: string
  question: string
  answer: string
}

export interface FaqBlockProps extends BlockBase {
  kicker?: string
  title: string
  items?: FaqItem[]
}

export const FaqBlock = ({ kicker, title, items }: FaqBlockProps) => {
  if (!items?.length) return null

  return (
    <section className="py-24 lg:py-32">
      <div className="container max-w-3xl">
        {kicker && <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{kicker}</span>}
        <h2 className="mt-4 mb-12 font-heading text-4xl font-normal leading-[1.15] text-foreground md:text-5xl">{title}</h2>
        <Accordion type="single" collapsible>
          {items.map((item, i) => (
            <AccordionItem key={item.id || i} value={item.id || `faq-${i}`}>
              <AccordionTrigger className="font-heading text-lg font-normal">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-[1.8]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
```
