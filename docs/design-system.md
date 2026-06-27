# Supertools Design System (v0.19)

**Basis:** Baseframe-Designsystem (byq.supply) — siehe `scrapes/baseframe/design-rules.md`.
**Adaption:** Grün bleibt Marke, **Sun Yellow** wird sparsames Signal; **IBM Plex**-Familie durchgängig.

Dieses Dokument hält die Regeln fest, die Baseframe vorgibt **und** ergänzt sie um
Vorlagen für die Supertools-eigenen Module, die Baseframe nicht abdeckt.

---

## 1. Foundation (aus Baseframe übernommen + Supertools-Deltas)

### Palette
| Rolle | Token | Hex | Einsatz |
|---|---|---|---|
| **Marke** | `brand` | `#009460` | Grün — Markenfläche, Tool-Finder, Nav-Pill, Icons, sekundäre CTAs |
| Marke dunkel | `brand-dark` | `#006b45` | Dark-Sektionen (Slabs), Hover |
| Marke hell | `brand-light` | `#EAF3DE` | Icon-Chips, Selektion |
| **Signal** | `accent` | `#fed007` | **Sun Yellow — SPARSAM**: primäre CTAs, Section-Marker-Dots, Badges |
| Signal-Text | `accent-ink` | `#27241f` | Text auf Gelb (Gelb NIE als Textfarbe auf Hell) |
| Canvas | `cream` | `#F6F3F0` | Seiten-Grundfläche (Warm Linen) — **kein reines Weiß mischen** |
| Karten-Lift | `stone` | `#E6E0D6` | Karten/Nav-Container (Level 2) |
| Tiefe | `sand` | `#DBD4C9` | Tiefere Füllungen, Tab-Menüs (Level 3) |
| Ink | `dark` | `#27241f` | Text + Dark-Flächen (warmes Charcoal, **nicht** #000) |
| Sekundärtext | `mid` | `#4A463F` | |
| Tertiärtext | `soft` | `#807A70` | Labels, Hints |

Flächen-Ladder: Canvas (cream) → Lift (stone) → Tiefe (sand) → invertiert: brand-dark / dark.
Keine gesättigten Farben außer Sun Yellow. Warmes Charcoal statt reinem Schwarz.

### Typografie (IBM Plex)
- **Headlines:** IBM Plex Serif, **Regular (400)** — nie bold. Autorität über Größe + enges Tracking (`tracking-tight`, große Displays `-0.02em`).
- **Body + UI/Buttons:** IBM Plex Sans (`font-sans` / `font-ui`).
- **Labels/Tags/Metadata:** IBM Plex Mono (`font-mono`), **uppercase**, Tracking `0.12–0.2em`.
- Skala Display: 32 / 40 / 48 / 64 / 80 px · Body: 14 / 16 / 18 px · Mono-Labels: 11–12 px.

### Spacing & Form
- Sektions-Padding: 80px (Standard) bis 200px (Feature-Hero). Nie < 32px zwischen Blöcken.
- Radius: Cards/Buttons **16px** (`rounded-2xl`) — entspricht der **Logo-Kurve** (Bubble-Eckradius ≈ 23 % der Höhe). Große Slabs **24–40px**.
- **Navi-Pill + Tool-Finder = `rounded-2xl`** (Logo-Kurve), **kein** Full-Pill.
- **Full-Pill (`rounded-full`) nur** für Tab-Switcher, Badges, Trust-Chips, Dots.
- Schatten **minimal** — Tiefe über Flächen-Steps, nicht über Schlagschatten. Hero-Glas darf einen weichen Schatten haben.

### Motion
- Eingang: translate-Y (50px→0) + Fade (0→1), 300ms, ruhig. Bewegung dient Klarheit, nicht Spektakel.

### Flächen-Trennung (Supertools-Regel)
- **Durchgängige Cream-Fläche**, keine kartigen Vollbreit-Bänder.
- Kontrast-Sektionen (z. B. grüner About-Block) als **abgerundeter Slab** (`rounded-[2.5rem]`, Logo-Radien) auf dem Canvas — weiche Trennung statt harter Kante.

### Signatur-Moves
- **Section-Marker-Dot:** jeder Sektions-Eyebrow bekommt links einen `1.5×1.5` Sun-Yellow-Punkt (`bg-accent rounded-full`).
- **Primär-CTA = Gelb** (`bg-accent text-accent-ink`), **sekundär = Grün/Outline**. Pro Sektion max. ein gelber CTA.

---

## 2. Module mit Baseframe-Vorlage

| Baseframe-Modul | Supertools-Entsprechung |
|---|---|
| Hero with Background Image | `HeroImmersive` — Motiv-Vollbild + grünes Glas-Tool-Finder |
| Bento / Services Grid | `ThemenfeldGrid`, `UseCaseEntry` |
| Hero Grid with Stats | Kennzahlen-Leiste (Mono-Labels + große Serif-Zahlen, Hairline-Divider) |
| Dark CTA Block | `AboutBlock` (grüner Slab), `MitmachenCta` |
| Blog Grid with Article Cards | `PulseGrid`, `ThemenClusterBlock` |
| Multi-Column Newsletter Footer | `Footer` |
| Multi Level Navigation Menu | `Header` + `MegaMenu` |

---

## 3. NEUE Regeln — Supertools-Module ohne Baseframe-Vorlage

### 3.1 Tool-Finder (Logo-Grün, solid)
- Container: `rounded-3xl bg-logo` (#0d9d69 — exaktes Logo-Grün), weißer Text.
- Liegt über dem Hero-Motiv. Optionen: `bg-white/10`, selektiert `bg-white text-brand-dark`.
- Fortschritt: weißer Balken auf `bg-white/15`. Labels in Mono.
- **Kein `backdrop-blur`** (Glas-Experiment verworfen — Logo-Grün soll satt sein).

### 3.2 Tool-Profil — 8 Zonen
- Reihenfolge fix (Hero → Passt das → Implementierung → Erfahrungen → Compliance → Ansprechpartner → Alternativen → Nächster Schritt).
- Editorial-Tiefe **behalten** (USP) — NICHT zu Bento flachklopfen. Funnel-Unten = Substanz.
- „Zuletzt geprüft am" + Transparenz-Block (`Was wir nicht prüfen konnten`) als Mono-Metadata-Zeilen.
- Primärer CTA „Unverbindlich anfragen" = **gelb**; „Ähnliche Tools" = outline.

### 3.3 Kategorie-Liste + Filter
- Listen-Zeilen gleichberechtigt, **kein Ranking/keine Sterne** (siehe `list-ui-design`-Skill).
- Filter mobil default eingeklappt mit Active-Counter-Pill.
- Quick-Facts + Compliance-Flags in Mono. Zeilen-Trennung über Hairline (`border-border`), nicht über Karten.

### 3.4 Wissen-Artikel (Long-Form)
- IBM Plex Serif Regular für H1–H3, große Tracking-tight-Displays.
- Drop-Cap im Lead: Serif-Italic, `first-letter` groß, in `brand-dark`.
- Byline/Datum/Lesezeit in Mono. Max. Lesebreite ~680px.

### 3.5 Themenfeld-Cards
- `rounded-3xl bg-white` (randlos), 16:9-Motiv-Banner oben, **kein grünes Overlay** — nur dezenter neutraler Scrim für Badge/Pfeil-Lesbarkeit.
- Icon-Badge weiß auf Bild, Pfeil oben rechts. Hover: weicher Schatten-Lift + Bild-Zoom.

### 3.6 Mega-Menu
- **Kontainiertes Panel** (KEIN Full-Width-Weiß): rechts unter der Navi ein
  abgerundeter Cream-Panel mit den **4 Themenfeld-Karten** (2×2, Kategorie-Pills).
- **Keine** Zwischen-/Feature-Karte („Vier Themenfelder. Volle Tiefe.") — die
  vier Felder sprechen für sich.
- Technik: `fixed inset-x-0` Positioner (transparent, `pointer-events-none`) +
  innen `container … justify-end` → Panel sitzt unter der rechtsbündigen Pill.

### 3.7 Navigation
- Eine **Pill in Logo-Grün** (`bg-logo`, solid, `rounded-2xl` = Logo-Kurve) als Insel. Enthält Nav + Actions (Newsletter als weiße CTA). Innere Chips `rounded-xl`.
- **Verankert je Kontext:** Startseite Header transparent (Pill schwebt über Hero); Innenseiten Header `bg-cream + border-b` (Anker-Navi).
- **Scroll-Frost:** beim Scrollen blendet eine Frost-Ebene (`backdrop-blur` + `from-cream/65`, maskiert) hinter Logo+Navi ein, damit Content lesbar wegblurrt.
- **WICHTIG:** Header/Pill dürfen **kein** `backdrop-blur`/`filter`/`transform` als Ancestor des Mega-Menüs haben (Containing-Block sperrt das `position: fixed`-Panel ein). Die Frost-Ebene ist daher ein **Sibling** der Navi, nicht ihr Ancestor.

### 3.8 Chat-Widget
- Grüne Sprechblase mit „s" (Logo-Formsprache), Terminbuchung übers Kalendertool.

### 3.9 Stimmen-Slider (Persona-Voices)
- Trust durch Relevanz: rollenbasierte Behörden-Personas mit Problem-Ausgangslage
  (`mocks/stimmen.ts`), **keine erfundenen Namens-Testimonials**.
- Ein Card pro Slide: Themenfeld-Icon, großes Serif-Zitat (gelbe Anführungszeichen),
  Mono-Attribution (Rolle · Behördentyp · Größe), Link ins passende Themenfeld.
- Prev/Next + Dots. **Regel:** je mehr ehrliche Cases/Bestätigungen über die Seite
  verteilt, desto mehr Trust — aber sinnvoll platziert, nie geschönt.

### 3.10 Trust-Signale
- Als Mono-Uppercase-Chips (`rounded-full`), optional Glas auf Bild (`bg-white/10 backdrop-blur`).

---

## 4. Do / Don't (Supertools)
- **Do:** Grün = Marke, Gelb = seltenes Signal. Serif Regular. Mono-Labels. Warme Flächen, durchgängig.
- **Do:** Bildmotive aus `public/brand/Images/` (deutscher Behördenalltag) — siehe Memory `bildbibliothek`.
- **Don't:** Gelb flächig/als Text auf Hell. Bold-Headlines. Reines Weiß als Canvas. Kartige Vollbreit-Bänder. Schlagschatten-Stapel.
