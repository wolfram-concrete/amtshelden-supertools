# CHANGELOG — Amtshelden Supertools

---

## [0.9.0] — 2026-05-16

### Über-uns-Seite: redaktionelle Verbindung Amtshelden ↔ Supertools

Ersetzt die Platzhalter-Seite `/ueber` durch eine vollwertige Editorial-Seite,
die die Verbindung zur Mutter-Marke Amtshelden herstellt.

---

### 📖 7 Sektionen, redaktionell

1. **Hero** — „Vertrauen entsteht dort, wo Software ein Gesicht bekommt."
   (Cormorant clamp 40-84px, leading 0.98, italic-Highlight)
2. **Editorial mit Drop-Cap** — „Behörden haben kein Tool-Problem,
   sie haben ein Orientierungsproblem." Asymmetrisches 2-Spalter
   (4/8) mit sticky-Heading links, Long-Form-Body rechts, Drop-Cap
   im ersten Absatz (first-letter 64px italic).
3. **Drei Grundsätze** — 3-Spalter mit vertikalen Hairlines:
   - Wir vergleichen nicht. Wir ordnen ein.
   - Wir vertrauen Behörden, nicht Algorithmen.
   - Wir machen Software sichtbar, die taugt.
4. **Verbindung Amtshelden ↔ Supertools** (grüne Highlight-Sektion,
   `bg-brand-dark`) — Logo inverse, 4 Cards: Amtshelden, Supertools,
   gemeinsamer Anspruch, gemeinsame Community (12k+).
   CTAs: „Zu Amtshelden →" + „Kontakt aufnehmen"
5. **Wie wir arbeiten** — 4-Schritte-Methodik im Newspaper-Stil
   (sticky-Heading links, nummerierte Liste rechts mit italic-Cormorant
   `01.`, `02.` Indikatoren)
6. **Wer wir sind** — Sitz Frankfurt, Hinweis auf Julia + Christian,
   Redaktion mit Verwaltungs-Background, italic-Cormorant-Zitat
   „Kultur entscheidet, ob Veränderung in der Verwaltung überhaupt ankommt."
7. **CTA** — Mittig zentriert, „Kontakt" + „Pulse abonnieren"

---

### 🔗 Inhaltliche Brücke

- Amtshelden-Substanz extrahiert von amtshelden.de:
  Beratungs- und Bildungsplattform für digitalen Wandel in Behörden,
  Sitz Frankfurt, Gründer Julia und Christian, Connected-Konferenz,
  KI-Führerschein, Amtfluencer-Programm, 12k+ Community
- Supertools-Vision aus README Kap. 26 verwoben:
  „Magazin statt Verzeichnis", „Vertrauensarchitektur", Verantwortungsabnahme

---

### 📝 README aktualisiert

- Kapitel 3 „Aktuelle Situation" komplett umgeschrieben — spiegelt
  jetzt v0.9 Tech-Stack (Next.js 16, Tailwind v4, App Router, 25 Routes),
  Komponenten-Architektur, Design-System, Mock-Daten-Stand,
  Payload-Roadmap

---

### ✅ Status

- TypeScript: clean
- Build: clean — 25 routes alle static
- `/ueber` jetzt vollwertige Editorial-Seite

---

## [0.8.0] — 2026-05-16

### Editorial-Iteration: Magazin-Tiefe + Grüne Highlightflächen

User-Feedback umgesetzt: Mehr redaktionelle Inhalte, engere Zeilenabstände,
weniger generisches Card-Design, grüne Akzent­flächen statt schwarz.

---

### 📝 Mehr Editorial-Inhalt

- **Zwei neue redaktionelle Schwerpunkt-Artikel**:
  - `digitalisierung-bund-2030` — „Was der Bund jetzt von Kommunen erwartet"
  - `kommunen-realer-stand` — „Drei Realitäten, die Strategien gerne ausblenden"
- **`EditorialFeatureStory`** — Wapo-Stil Featured Article:
  asymmetrisches 2-Spalter-Layout, großes Cover (sticky), Cormorant-Headline
  clamp 36–60 px, **Drop-Cap** im Lead (first-letter floated, italic, 64 px),
  Byline + „Beitrag lesen →"-Link
- **`ThemenClusterBlock`** — 3 redaktionelle Schwerpunkte nebeneinander:
  „Digitalisierung Deutschland", „Behörden im Wandel", „Methodik & Haltung"
  — jeder mit Cover, Eyebrow, Cluster-Titel, Lead, 2-3 Artikel-Links

---

### 🟢 Grüne Highlight­flächen (statt schwarz)

- `AboutBlock` Startseite: `bg-dark` → **`bg-brand-dark`** + leichte
  Top-Gradient-Linie für Editorial-Raffinesse
- `ProfilCta` Profilseite: `bg-dark` → **`bg-brand-dark`**, Primary-Button
  als weiße Pille mit grünem Text (besserer Kontrast)
- Text-Kontraste auf grün angepasst: weniger `white/70`, mehr `white/85`

---

### ✂️ Headline-Zeilenabstände eng

- Alle Section-h2: `leading-[1.1]` → **`leading-[1.02]`**
- ArticleCard lead-Variante: `leading-[1.15]` → **`leading-[1.05]`**
- SectionHead: `leading-[1.1]` → **`leading-[1.02]`**
- EditorialFeatureStory h2: **`leading-[0.98]`** (extra-tight)
- ThemenClusterBlock: **`leading-[1.05]`** (cluster titles)

---

### 🎨 Weniger „Claude-Design"

- **QuickGuideBlock** komplett neu: Newspaper-Spalten statt 2×2 Card-Grid.
  4 Spalten mit vertikalen Trennlinien (`before:bg-border`), keine Cards,
  Cormorant italic für „Schritt 01"-Indikator
- **FaqBlock**: Plus-Icon entfernt, ersetzt durch
  - italic Cormorant „01." `02.` … Nummerierung links
  - typografischer Status rechts („Lesen" / „Geschlossen")
  - readMore-Link als italic-Cormorant statt Pill
- **Headers**: 2-Spalter-Layouts (Title links, Lead rechts-bündig) für
  Magazin-Editorial-Feel

---

### 🏠 Startseite neu strukturiert

Neue Reihenfolge:
1. Hero + QuickFinder
2. TrustStrip
3. **EditorialFeatureStory** (Bund-Schwerpunkt prominent)
4. **ThemenClusterBlock** (3 Schwerpunkte)
5. Main + Sticky-Sidebar (QuickGuide, Featured Tool, FAQ)
6. PulseGrid (jetzt nur Pulse-Type-Artikel, „Kurze Reads")
7. CategoryMagazine
8. AboutBlock (grün)
9. NewsletterCta

---

### ✅ Status

- TypeScript: clean
- Build: clean — 25 routes (2 neue Artikel)
- Startseite jetzt dichter mit Editorial-Inhalten, ohne CMS noch
- Grüne Highlightflächen brechen die Monochrom-Linearität

---

## [0.7.0] — 2026-05-16

### Startseite: Editorial-Magazin meets E-Com-Klarheit

Booking.com/Airbnb-Zugänglichkeit verbunden mit redaktioneller Fachmagazin-Tiefe.
Behörden-Mitarbeiter:innen bekommen sofort Orientierung — ohne Suchfeld, ohne Klick-Marathon.

---

### 🧭 Navigation: Mega-Menu

- `MegaMenu` (Client) im Header — Hover/Focus öffnet full-width Panel
- 6 Kategorien sofort sichtbar mit Icon, Name, Tagline, Tool-Count
- Esc + Click-Outside schließen, Animation `mega-in` (.18s)
- Booking-Vibe: keine versteckten Inhalte, alles 1 Klick entfernt

---

### 🔎 Hero mit Tool-Finder

- `HeroWithFinder` ersetzt EditorialHero — 2-Spalten-Layout
- Links: Editorial-Headline (Cormorant clamp 40–84px) + Lead + Trust-Pills
  (Aus Behördenperspektive · Kein Pay-to-Rank · DSGVO transparent · Redaktionell)
- Rechts: `QuickFinder` (Client) — 3-Frage-Selektor:
  1. Kategorie-Dropdown mit Icon-Prefix
  2. Behördengröße (4 Radio-Pills)
  3. Betriebsart (4 Radio-Pills: Cloud / OnPremise / Hybrid / Egal)
- Submit navigiert zu `/kategorien/[slug]?size=X&ops=Y`

---

### 📊 Trust-Strip unter Hero

- `TrustStrip` — 4 Stat-Blöcke (Tools, Kategorien, Beiträge, DSGVO 100%)
- Cream-Hintergrund, schmale Trennlinien

---

### 🧱 Main + Sticky-Sidebar Layout

Mid-Section auf cream/30 mit 2-Spalter (Main + 320px Sticky-Sidebar):

**Main:**
- `QuickGuideBlock` — 4-Schritte-Methodik („So prüfen wir Software")
- `FeaturedToolBlock` — Tool im Fokus (VivioAkte) mit Amtshelden-Urteil
- `FaqBlock` — 8 typische Behörden-Fragen mit nativen `<details>`,
  Plus-zu-X-Animation, Verlinkung zu vertiefenden Wissensartikeln

**Sticky-Sidebar (`HomeSidebar`):**
- Kategorie-Quick-Nav (alle 6 Kategorien mit Tool-Count, accentColor)
- Häufig gefragt (Top-5 FAQ-Quicklinks)
- Neu im Verzeichnis (4 Tool-Marks mit Kategorie)
- Pulse-Newsletter kompakt (dunkler Card-CTA)

---

### 📦 Mock-Daten erweitert

- `src/mocks/faq.ts` — 8 redaktionelle FAQ-Items mit `readMoreSlug`
- `src/mocks/stats.ts` — `trustStats` (4) + `methodSteps` (4)

---

### ✅ Status

- TypeScript: clean
- Build: clean — 23 routes, alle static prerender
- Startseite jetzt informationsdicht aber editorial ruhig
- Cormorant Garamond + IBM Plex Sans bleiben — kein Glassmorphismus, kein Purple-Gradient

---

## [0.6.0] — 2026-05-16

### Phase 3+4+5 — Startseite, Kategorien, Wissensbereich

---

### 🏠 Startseite (Editorial-Frontpage)

- `EditorialHero` — typografisch ruhiger Magazin-Hero mit Eyebrow, Cormorant-Headline,
  Lead, Primary/Secondary-CTA, Meta-Zeile
- `PulseGrid` — Lead-Artikel (2-Spalten-Layout mit großem Cover) + 3-Spalten-Grid
  für Folge-Artikel, beide via `ArticleCard`
- `CategoryMagazine` — 6 Kategorien als CategoryCards in 3-Spalten-Grid
  (cream-Hintergrund-Sektion)
- `FeaturedToolBlock` — "Tool im Fokus" Spotlight mit redaktioneller Begründung
  links (sticky) und ToolCard rechts (feature-Variante)
- `AboutBlock` — Dark-Sektion mit 4 Prinzipien (Handverlesen · Behördenperspektive ·
  Kein Ranking · Verantwortungsabnahme)
- `NewsletterCta` — Client Component mit Form-State + Success-Feedback

---

### 🗂️ Kategorien (`/kategorien` + `/kategorien/[slug]`)

- **Index-Seite:** Alle 6 Kategorien in CategoryCard-Grid mit redaktioneller Einleitung
- **Detail-Seite:**
  - `KategorieHero` mit Icon, Titel, Tagline, Topics-Tags, italic-Intro-Quote
  - `ToolFilters` (Client Component) — Filter-Sidebar mit Checkboxen für
    Betrieb (Cloud/OnPremise/Hybrid), Profil-Stufe, Compliance (DSGVO/Server-DE/BSI/UVgO)
  - Live-gefilterte Tool-Liste mit Counter + Reset-Button
  - Verwandte Wissensartikel (auto-matched via Tags ↔ Topics)

---

### 📖 Wissensbereich (`/wissen` + `/wissen/[slug]`)

- **Index-Seite:** Lead-Artikel + Magazine-Grid aller 5 Pulse-Beiträge
- **Detail-Seite:**
  - `ArticleHeader` — Eyebrow, Headline, Lead, Author-Byline, Hero-Image
  - `ArticleBody` — Renderer für 8 Block-Kinds: heading, subheading, paragraph,
    quote (mit Pull-Quote-Style), list (mit grünen Bullet-Dashes),
    image, divider, callout (info/warning/highlight)
  - `AuthorBio` — Bio-Block am Ende mit Avatar + Bio-Text
  - Related Articles als 3-Spalten-Grid

---

### 🧱 Shared Components

- `ToolCard` — list/feature-Varianten mit Mark, Verified-Badge, Pitch,
  3 Quick-Facts (Preis/Einführung/Betrieb), Compliance-Pills
- `ArticleCard` — lead/list/compact-Varianten für Magazin-Layouts
- `CategoryCard` — Icon + Titel + Tagline + Tool-Count + Topics

---

### 📦 Mock-Daten

- `src/mocks/categories.ts` — 6 redaktionell beschriebene Kategorien
- `src/mocks/tools/index.ts` — 8 Tool-Cards (für Listen) + `toolCardsByCategory`-Lookup
- `src/mocks/articles.ts` — 5 Pulse-Artikel mit Long-Form-Body + 3 Author-Profilen

---

### 🛣️ Routing

- 18 Routes total, alle als static prerender:
  - `/` (Startseite)
  - `/kategorien` + `/kategorien/[slug]` (6 SSG)
  - `/wissen` + `/wissen/[slug]` (5 SSG)
  - `/tools/[slug]` (1 SSG, aus Phase 2)
- Alle dynamic Routes mit `generateStaticParams` + `generateMetadata`
- Breadcrumb durchgängig auf allen Detail-Seiten

---

### ✅ Status

- TypeScript: clean
- Build: clean — 18 routes, alle static
- 4 Seitentypen aus README Kap. 26 vollständig umgesetzt
- Bereit für Phase 6 (Payload-Anbindung via `payload-react-agent`)

---

## [0.5.0] — 2026-05-16

### Phase 2 — Tool-Profil-Seite (Port aus supertools_profil_beispiel.html)

---

### 🧱 Profil-Blöcke (alle 8 Zonen aus README Kap. 27)

- `ProfilHero` (Zone 1) — Kategorie-Eyebrow, Headline, Lead, Byline mit
  Verifiziert-Badge, Hero-Image mit Company-Overlay, Caption,
  **Amtshelden-Urteil** (Pull-Quote-Style), frühe Stimmungs-Quote,
  Body-Absätze mit Inline-`*italic*`/`**bold**`-Parser
- `PassDasBlock` (Zone 2) — Fit-Tags + ehrliche „Nicht geeignet für"-Notiz
  mit klickbaren Alternativ-Links inline
- `ImplementierungBlock` (Zone 3) — 3-Tile-Grid (Dauer/Aufwand/Kosten) +
  Lösungs-Cards mit grünem Streifen und „Gelöst"-Badges
- `CasesPlaceholder` (Zone 4) — Coming-soon-Block bis Cases als Add-on
  produziert werden
- `KontaktBlock` (Zone 6) — Pill-Buttons mit Lucide-Icons (Globe/Mail/Phone)
- `AlternativenBlock` (Zone 7) — 3 Alternative-Cards mit farbigen Marks
- `ProfilCta` (Zone 8) — Dark Editorial-CTA mit primärem/sekundärem Button
- `ProfilSidebar` — Sticky Compliance-Widgets (expandable `<details>`),
  Quick-Facts, Sticky-CTA, „Warum dieses Tool?", Weiterführende Inhalte
- `SectionHead` — Wiederkehrendes Heading mit schwarzem Top-Border,
  grünem Eyebrow, Cormorant-Serif-Titel
- `Breadcrumb` — Brotkrumen-Komponente für Profil + spätere Seiten

---

### 🗂️ Architektur

- Dynamische Route `src/app/(frontend)/tools/[slug]/page.tsx`
- `generateStaticParams()` für SSG (Mock-Tools werden vorgeneriert)
- `generateMetadata()` mit OG-Tags je Tool
- 1:1 Payload-kompatible Typen in `src/types/profile.ts`
- Mock-Daten in `src/mocks/tools/vivioakte.ts` (VivioAkte, alle 8 Zonen)
- `toolRegistry` als zentrales Mock-Map (wird in Phase 4 für Kategorie-Seiten genutzt)
- `next.config.ts` — `images.unsplash.com` als `remotePatterns` whitelisted
  (Platzhalter bis eigene KI-Bilder produziert sind, siehe README Kap. 28)

---

### ✅ Status

- TypeScript: clean
- Build: clean — `/tools/vivioakte` als SSG-prerender
- Live-Route: `/tools/vivioakte`
- Bereit für Phase 3 (Startseite)

---

## [0.4.0] — 2026-05-16

### Migration zu Next.js (App Router) + Tailwind v4

---

### 🏗️ Architektur-Umstellung

- **Next.js 16.2.6** (App Router + Turbopack) + **React 19.2.4** + **TypeScript 5**
- **Tailwind v4** mit `@theme`-Tokens direkt in `globals.css`
- Skill-konforme Route Group: `src/app/(frontend)/` für alle öffentlichen Seiten
- Statische HTMLs (`supertools_v4.html`, Profil-Beispiel, Infografik, Monetarisierungsplan)
  und Gotham Webfonts in `/legacy/` archiviert — bleiben als Referenz erhalten
- `payload-nextjs-agent` Skill-Regeln als verbindlicher Style-Guide (`.codex-context/`)

---

### 🎨 Design-System (auf Basis supertools_profil_beispiel.html)

- **Editorial Fonts via `next/font/google`** (kein CDN-Link mehr):
  - Cormorant Garamond — Serif Headlines (600, 700, italic)
  - IBM Plex Sans — Body / Copy (300–600, italic)
  - Inter Tight — UI / Labels / Navigation (300–700)
- Brand-Tokens als CSS-Variablen unter `@theme`:
  - `--color-brand` `#009460` · `--color-brand-dark` `#006b45` · `--color-brand-light` `#EAF3DE`
  - `--color-cream` · `--color-dark/mid/soft` · `--color-border`
  - Tier-Abstufungen (free / verified / partner / addon)
  - Semantische Hintergründe (blue-light, amber-light, purple-light)

---

### 🧱 Komponenten-Grundgerüst

- `src/components/ui/button.tsx` — shadcn-Style mit cva, Pill-Form, Variants (default/outline/ghost/link)
- `src/components/ui/badge.tsx` — Editorial Tag/Pill mit Variants (default/verified/outline/soft/eyebrow)
- `src/components/site/Header.tsx` — Sticky Editorial-Nav mit ST-Marker
- `src/components/site/Footer.tsx` — 4 Säulen + Brand-Block + Bottom-Leiste
- `src/components/BlockRenderer.tsx` — Block-Registry mit Dev-Warnings für unbekannte Types
- `src/types/blocks.ts` — Payload-kompatible Interfaces (PayloadImage, PayloadLink, ToolCategory,
  Contact, Testimonial, ProfileHighlights, ProfileTier, PageType) — **ohne** Payload-Import
- `src/lib/utils.ts` — `cn()`, `slugify()`, `formatDateDE()`

---

### 🚀 Deployment-Wechsel

- **Wechsel von Netlify zu Vercel** geplant — Vercel auto-detected Next.js,
  keine Config-Datei nötig
- `netlify.toml` entfernt

---

### 📦 Dependencies

- `@radix-ui/react-slot` für `asChild`-Pattern
- `class-variance-authority` + `clsx` + `tailwind-merge` für utility-Komposition
- `lucide-react` für Icon-Bibliothek

---

### ✅ Status

- TypeScript: clean (`npm run typecheck`)
- Build: clean (`npm run build`) — `/` als static prerender
- Phase 1 abgeschlossen — bereit für Phase 2 (Profil-Seite-Port)

---

## [0.2.0] — 2026-05-15

### Website-Konzeption & Tool-Profil Anatomie

---

### 🎨 Tool-Profil Beispiel (supertools_profil_beispiel.html)

- Vollständiges Beispielprofil "VivioAkte" (fiktiv) als HTML gebaut — alle 8 Zonen
- **Editorial-Layout** nach Washington Post / Time Referenz:
  - Playfair Display als Serifenschrift für Headlines
  - Inter Tight für Copy, 17px, Zeilenhöhe 1.75
  - Pull Quote direkt nach dem Amtshelden-Urteil — menschliche Stimme früh
  - Byline unter dem Titel (wer hat geprüft, wann)
  - Section Headers mit starker schwarzer Trennlinie oben, Eyebrow-Label grün
- **Two-Column Layout:** Main Content + Sticky Sidebar
- **Sidebar:** DSGVO-Widgets mit Hover-Detail, Schnellinfos, Mini-CTA
- **DSGVO-Kacheln** direkt nach Hero verschoben (Hard Facts zuerst)
- **Lösungen-Block** umgedreht: Lösung prominent, Problem als Kontext
- **Nicht-geeignet-Block** positiv umformuliert, kein Warndreieck
- **Echte Fotos** via Unsplash als Platzhalter (Produktion: KI-generiert)
- **Ansprechpartner** mit echtem Portraitfoto statt Initials-Avatar
- **Erfahrungsberichte** mit Personenfotos
- **Hero-Bild** mit Büro/Verwaltungskontext + Unternehmenslogo overlay

---

### 📐 Konzept & Architektur

- **Tool-Profil Anatomie** (8 Zonen) vollständig dokumentiert:
  Zone 1 Hero · Zone 2 Passt das? · Zone 3 Implementierung ·
  Zone 4 Erfahrungen · Zone 5 DSGVO · Zone 6 Ansprechpartner ·
  Zone 7 Alternativen · Zone 8 CTA
- **Website-Konzept** definiert: Magazin statt Verzeichnis
- **Seitenarchitektur** (4 Typen): Startseite · Kategorie · Profil · Wissen
- **Emotionale Reise** je Seitentyp dokumentiert
- **Profil-Anatomie** als separates MD-Dokument (`supertools_profil_anatomie.md`)

---

### 📸 KI-Bildkonzept (README Kapitel 28)

- Prompt-Vorlagen für alle 4 Bildcontainer:
  - Hero-Bild (mit Kategorie-Varianten)
  - Ansprechpartner Portrait (männlich + weiblich)
  - Erfahrungsbericht Avatar
  - Video-Thumbnail
- Dateistruktur `/assets/images/` definiert
- Globale Bildregeln: kein Stock-Foto, WebP, erdige Töne, deutsche Physiognomie

---

### 📝 README Updates (Kapitel 26–28)

- Kapitel 26: Website-Konzeption Neustart — psychologisches Ziel, Magazin-Konzept
- Kapitel 27: Tool-Profil Anatomie — 8 Zonen mit Zielen und Prinzipien
- Kapitel 28: KI-Bildkonzept & Prompt-Vorlagen

---

## [0.1.0] — 2026-05-15

### Initialer Commit — Business Development & Design Session

---

### 🧠 Strategie & Vision

- Supertools als Sub-Brand von Amtshelden definiert (analog OMR → OMR Reviews)
- Positionierung finalisiert: **handverlesen · kuratiert · Behörden-first**
- Vision formuliert: „Das Gedächtnis der digitalen Verwaltung Deutschlands"
- 3 Zeithorizonte: Verzeichnis (J.1–3) → Leitmedium (J.3–6) → Referenz-Infrastruktur (J.6+)
- Supertools Pulse: laufender redaktioneller Feed (1–3×/Woche)
- Supertools Report: halbjährliches Großformat als Branchenquelle
- Dienstleister-Verzeichnis als Jahr-2-Erweiterung geplant
- AI Overview & Listicle-Strategie dokumentiert

---

### 💶 Monetarisierung & Preismodell

- Free Listing abgeschafft — widerspricht Kuratierungsversprechen
- Basis-Profil: von Amtshelden kuratiert, kein Self-Service
- Verified Listing: 199–299 EUR/Mo (in Diskussion → Fixpreis 249?)
- Partner-Paket: 499–799 EUR/Mo (in Diskussion → Fixpreis 599?)
- ROI: 1 Abschluss (30k CLV) = 8–12× ROI auf Jahresabo
- ARR-Potenzial: 300 Tools=193k, 600 Tools=382k, 900 Tools=576k EUR netto
- Benchmark: OMR Reviews 335 EUR/Mo, Capterra CPC ab 500 USD/Mo

---

### 🎨 Design & Infografik

- Kosmos-Infografik HTML (9 Blöcke, SVG-Logo inline, Grün-Abstufung)
- Gotham Font-Familie woff2 eingebunden (9 Varianten)
- Trade Gothic als primäre Brand-Font definiert
- Design-Tokens dokumentiert

---

### 📁 Assets

- README.md: 28 Kapitel, vollständige Wissensbasis (~40k Zeichen)
- supertools_kosmos_infografik.html — Holistische Infografik
- supertools_v4.html — One Pager, 40 Tools
- Supertools_Monetarisierungsplan.html — Monetarisierungsplan
- amtshelden_ST_transparent.png — Logo freigestellt
- Gotham woff2 Fonts (9 Varianten)

---

*Session: 14.–15. Mai 2026 · Wolfram Stratmann × Claude (Anthropic)*

---

## [0.3.0] — 2026-05-15

### Profil-Überarbeitung & Produktlogik

---

### 📐 Profil-Struktur (supertools_profil_beispiel.html)

- **Cormorant Garamond** als finale Headline-Schrift (schmal, elegant)
- **IBM Plex Sans** als Copy-Font (offener, mehr Zeichenabstand als Inter Tight)
- **Inter Tight** bleibt für UI-Elemente (Labels, Badges, Navigation)
- Ansprechpartner-Zone entfernt → Add-on für später
- Kundenstimmen / Pull Quote entfernt → kein Standard-Feature
- Cases-Placeholder eingefügt (folgt in Phase 2 als Add-on)
- Kontakt-Button in Byline-Leiste oben (sichtbar ohne zu scrollen)
- Sidebar: "Warum dieses Tool?" Block hinzugefügt
- Sidebar: "Weiterführende Inhalte" mit 3 Querverlinkungen hinzugefügt
- Sidebar: DSGVO-Widgets mit Hover-Detail beibehalten

---

### 📝 README Updates (Kapitel 29–31)

- **Kapitel 29:** Profil-Grundsätze — informieren nicht vergleichen, kein Ranking
- **Kapitel 30:** Standardisiertes Profil-Card-Format (6 Blöcke, Mobilfunk-Analogie)
- **Kapitel 31:** Profil-Stufen — Crawler-Basis vs. Add-ons
  - Stufe 1: Basis-Profil (automatisch per Crawler)
  - Stufe 2: Verified Listing (Kontakt, erweitertes Profil)
  - Stufe 3: Add-ons (Ansprechpartner mit Foto, Urteil, Cases)
  - Cases statt Kundenstimmen — für Phase 2+

