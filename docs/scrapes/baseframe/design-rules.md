# Baseframe Design Rules

Source: https://app.byq.supply/styles/baseframe
Scraped: 2026-06-27T19:40:00+02:00
Tooling: Crawl4AI 0.9.0 with Chromium rendering.

## Claude Code Build Brief

Rebuild the template as a premium consultancy/advisory website. The visual system should feel calm, structured, editorial, and trustworthy. Prefer hierarchy, whitespace, and restrained grids over decorative effects.

## Core Identity

- Positioning: premium consultancy template for advisory firms and service-driven businesses.
- Mood: calm authority, legibility, mature structure, long-lived editorial polish.
- Key message: complexity made legible.
- CTA behavior: use one sharp accent color sparingly for actions, section markers, and small moments of emphasis.
- Motion: smooth translate-Y entrance animations; movement should support clarity rather than spectacle.

## Visual System

- Palette: dual mode with warm off-white/parchment light sections and deep charcoal-brown dark hero/CTA zones.
- Accent: Sun Yellow for CTAs and small markers.
- Typography: IBM Plex Serif for headings, IBM Plex Sans for body text, IBM Plex Mono for uppercase labels, code-like metadata, and compact tabular content.
- Layout: generous section padding, restrained bento grids, service cards, tabbed content, hero sections with strong image hierarchy, and structured footer/navigation.
- Shape: conservative radius and clean card surfaces; avoid playful pill-heavy treatment.

## Public Design Tokens

These values were visible without unlocking the paid template:

### Colors
Canvas
Deep Ember
#3e3a35
Second-level dark lift. Icon backgrounds and card-detail surfaces on dark sections.
Warm Linen
#f6f3f0
Page canvas base. The lightest background value used beneath content sections.
Shadow Bark
#33302b
Dark card lift surface. Inverted contact cards and dark bento tiles.
Lifted Stone
#e6e0d6
Lifted card surface & section backgrounds. Used for card fills, nav container, and stats gradient endpoint.
Pressed Sand
#dbd4c9
Second-tier lift surface. Deeper card backgrounds and tab-menu fills.
Parchment White
#eee9e1
Primary light surface & ink-on-dark. Base page background, footer text, inverted button labels.
Ink
Charcoal Earth
#27241f
Primary dark surface & ink. Hero sections, footer fills, primary button backgrounds, body text.
Accent
Sun Yellow
#fed007
Brand accent. Accent buttons, section-marker dots, logo fill on dark, rated-badge background.
State — utility only
Moss Success
#4eab52
Success state. Form success indicators and confirmation messages.
Terracotta Error
#a63f3a
Error state. Form validation borders and error messaging only.
### Typography
Precision Mono
The quick brown fox jumps
Labels, tags, and metadata. Always uppercase with wide letter-spacing for categorical precision.
Structural Sans
The quick brown fox jumps
Body copy and buttons. Neutral, legible, and scales cleanly from captions to large text.
Editorial Serif
The quick brown fox jumps
All headings h0–h6. Conveys editorial authority and long-form clarity.
### Spacing & shape
Purpose
Value
Preview
Density
`spacious`
Max width
`1800px`
Section gap
`120px`
Card padding
`32px`
Element gap
`24px`
#### Spacing scale
Purpose
Value
Preview
--spacing-4
`4px`
--spacing-8
`8px`
--spacing-12
`12px`
--spacing-16
`16px`
--spacing-20
`20px`
--spacing-24
`24px`
--spacing-32
`32px`
--spacing-48
`48px`
--spacing-64
`64px`
--spacing-80
`80px`
--spacing-120
`120px`
--spacing-160
`160px`
--spacing-200
`200px`
#### Border radius
`tags``16px`
`cards``16px`
`small``8px`
`inputs``8px`
`buttons``16px`
`full-pill``9999px`
`cards-large``24px`
`buttons-circle``24px`
### Surfaces
Step from canvas (level 1) to lifted (level 2) to inset depth (level 3), then invert into the dark levels for full-bleed sections. Hex codes and roles live in the _Colors_ section above; this ladder shows the layering only.
Level 1Warm Linen
Level 2Lifted Stone
Level 3Pressed Sand
Level 4Charcoal Earth
Level 5Shadow Bark
Level 6Deep Ember
### Do's and don'ts
  * Apply IBM Plex Serif at weight 400 for all headings — the template's editorial voice depends entirely on its regular-weight serif, never bold.
  * Use the Sun Yellow (#fed007) accent exclusively for calls-to-action, section-marker dots, and the logo mark; it should appear sparingly so it retains its signal value.
  * Apply a 16px border-radius to all standard buttons and cards; use the 9999px full-pill radius only for tab-switcher menus and badge elements.
  * Reserve Charcoal Earth (#27241f) sections for high-stakes moments — hero panels, footer, and CTA blocks — to preserve the contrast rhythm between dark and light zones.
  * Use IBM Plex Mono in uppercase with 0.75px letter-spacing exclusively for labels, tags, and metadata categories to maintain the precision hierarchy.
  * Maintain section padding at 80px minimum and scale up to 200px for feature heroes to honor the template's deliberately spacious breathing room.
  * Use translate-Y entrance animations (50px to 0, opacity 0 to 1) consistently on all above-the-fold text and card groups for a unified reveal language.


  * Do not introduce saturated colors outside of Sun Yellow — the entire palette is desaturated warm neutrals, and any vivid hue will break the editorial calm.
  * Do not use IBM Plex Serif for body copy or UI labels; its role is strictly editorial display and heading hierarchy.
  * Do not apply drop shadows liberally — the single approved shadow is intentionally minimal; adding card shadows would undermine the flat, surface-based depth model.
  * Do not bold headings; the template intentionally uses weight 400 for all serif headings to project authority through scale and tracking rather than weight.
  * Do not mix the warm linen light palette (#f6f3f0) with a pure white (#ffffff) — the warmth of the canvas is part of the brand identity and must stay consistent.
  * Do not reduce section padding below 32px between major content blocks; the spacious rhythm is core to the calm authority aesthetic.
  * Do not use the accent yellow as a text color on light backgrounds — contrast ratios are insufficient and it is reserved strictly for filled surfaces and markers.


### Example prompts
Hero sectionCopy
Create a dark hero section with a full-bleed portrait photo, a large IBM Plex Serif h2 heading in Parchment White (#eee9e1) with -2px letter-spacing, a single body paragraph in IBM Plex Sans at 20px, and one Sun Yellow (#fed007) accent CTA button with 16px border-radius on a Charcoal Earth (#27241f) background.
Service card gridCopy
Design a bento grid of four service cards on a Warm Linen (#f6f3f0) background. Cards use Lifted Stone (#e6e0d6) fills with 16px radius, a Lucide icon at 24px, a bold IBM Plex Sans small label for the title, and two lines of 14px body copy in 64% opacity dark ink.
Stats sectionCopy
Build a statistics row on a light Warm Linen canvas alternating between IBM Plex Mono uppercase labels at 12px (0.75px tracking) and large IBM Plex Serif numerals at 56px with -2px letter-spacing, separated by 1px hairline dividers in Charcoal Earth at 16% opacity.
Dark CTA blockCopy
Produce a full-width CTA section with Charcoal Earth (#27241f) background, 24px bottom-corner radius, a centered IBM Plex Serif h2 headline in Parchment White, a supporting paragraph at 20px in 88% opacity Parchment White, and two buttons side-by-side: one primary dark-fill button and one Sun Yellow accent button, both 16px radius with 300ms hover transitions.

## Locked DESIGN.md Area

The on-page `DESIGN.md` tab is intentionally locked. Crawl4AI captured the preview, but BYQ masks the full token file with `#xxxxxx` placeholders:

# Design System Guide

> Unlock the template to access the full design system.

## Brand voice

A short paragraph describing the brand voice, mood, and visual
principles that anchor the system. Tone, cadence, and intent.

## Colors

| Token        | Hex      | Role                                  |
| ------------ | -------- | ------------------------------------- |
| canvas-1     | #xxxxxx  | Page background, large surfaces       |
| canvas-2     | #xxxxxx  | Lifted surfaces, cards                |
| canvas-3     | #xxxxxx  | Inset wells, depressed states         |
| ink-1        | #xxxxxx  | Primary body text                     |
| ink-2        | #xxxxxx  | Secondary text, labels                |
| ink-3        | #xxxxxx  | Tertiary text, hints                  |
| accent-1     | #xxxxxx  | Primary brand accent                  |
| accent-2     | #xxxxxx  | Secondary accent                      |
| state-ok     | #xxxxxx  | Success, confirmations                |
| state-warn   | #xxxxxx  | Warnings                              |
| state-err    | #xxxxxx  | Errors, destructive actions           |

## Typography

- **Display** — heading scale, used for hero text and section titles.
- **Body** — primary reading text, optimized for paragraphs.
- **Mono** — code, data, and tabular numerals.

```
display: 32px / 40px / 48px / 64px / 80px
body:    14px / 16px / 18px
mono:    12px / 14px
```

## Spacing & shape

Base unit: 4px. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
Radii: sm (4px), md (8px), lg (12px), xl (20px), full (9999px).

## Surfaces

Layered elevation from canvas → lifted → inset. Surfaces invert in
dark sections for full-bleed contrast.

## Do's and don'ts

- Do use accent-1 sparingly for primary CTAs only.
- Do maintain at least 4.5:1 contrast on body text.
- Don't mix display and body in the same line.
- Don't use state colors for branding.

## Agent prompt guide

Prompts for AI design tools that respect this system.
Includes example prompts for sections, components, and layouts.

## Component Inventory

Use these scraped section names as implementation targets:

- ## Baseframe™
- ### Sections from Baseframe
- ### Bento Grid Layout
- ### Services Overview Grid Layout
- ### Services Bento Grid Layout
- ### Services Tabbed Content Section
- ### Hero Section with Background Image
- ### Multi-Column Newsletter Footer
- ### Multi Level Navigation Menu
- ### Hero Grid with Stats
- ### Hero with Animated Marquee Gallery
- ### Philosophy Section with Chat Interface
- ### Blog Grid with Article Cards
- ### Contact Section With Cards
- ### Colors
- ### Typography
- ### Spacing & shape
- #### Spacing scale
- #### Border radius
- ### Surfaces
- ### Do's and don'ts
- ### Example prompts
- # Design System Guide
- ## Brand voice
- ## Colors
- ## Typography
- ## Spacing & shape
- ## Surfaces
- ## Do's and don'ts
- ## Agent prompt guide

## Scraped Image Assets

- Baseframe icon: `images/01-baseframe-icon.svg`
- Baseframe gallery image 1: `images/02-baseframe-gallery-image-1.webp`
- Baseframe gallery image 2: `images/03-baseframe-gallery-image-2.webp`
- Baseframe gallery image 3: `images/04-baseframe-gallery-image-3.webp`
- Baseframe gallery image 4: `images/05-baseframe-gallery-image-4.webp`
- Baseframe gallery image 5: `images/06-baseframe-gallery-image-5.webp`
- Bento Grid Layout: `images/07-bento-grid-layout.webp`
- Services Overview Grid Layout: `images/08-services-overview-grid-layout.webp`
- Services Bento Grid Layout: `images/09-services-bento-grid-layout.webp`
- Services Tabbed Content Section: `images/10-services-tabbed-content-section.webp`
- Hero Section with Background Image: `images/11-hero-section-with-background-image.webp`
- Multi-Column Newsletter Footer: `images/12-multi-column-newsletter-footer.webp`
- Multi Level Navigation Menu: `images/13-multi-level-navigation-menu.webp`
- Hero Grid with Stats: `images/14-hero-grid-with-stats.webp`
- Hero with Animated Marquee Gallery: `images/15-hero-with-animated-marquee-gallery.webp`
- Philosophy Section with Chat Interface: `images/16-philosophy-section-with-chat-interface.webp`
- Blog Grid with Article Cards: `images/17-blog-grid-with-article-cards.webp`
- Contact Section With Cards: `images/18-contact-section-with-cards.webp`

## Raw Scrape

The normalized Crawl4AI markdown is stored next to this file as `baseframe.raw.md`. Use it for exact section copy and image references.
