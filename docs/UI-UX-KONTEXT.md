# UI/UX-Kontext & verbindliche Regeln — Supertools

> Diese Datei ist die **verbindliche Referenz** für jede UI/UX-Arbeit an der
> Website (egal welches Tool/Agent). Vor Änderungen an Frontend, Design, Texten
> oder Motion: lies dieses Dokument und halte dich strikt daran.

Stand: August 2026

---

## 1. Projekt & Stack
- **Supertools** = kuratiertes Software-Verzeichnis für deutsche Behörden/Kommunen,
  Sub-Brand von **Amtshelden**. Positionierung: redaktionelles **Fachmagazin MIT
  Verzeichnis** — kein Ranking, keine gekauften Empfehlungen, aus Behördenperspektive.
- **Next.js 16** (App Router, Route-Group `src/app/(frontend)`), **React 19**,
  **TypeScript**, **Tailwind v4** (Tokens via `@theme` in `src/app/globals.css`).
- Deploy: **Vercel**, Auto-Deploy vom `main`-Branch.
  Repo: `github.com/wolfram-concrete/amtshelden-supertools`.

## 2. Ton für alle UI-Texte
- Direkte **Sie-Ansprache**. Ehrlich, präzise, redaktionell. **KEINE AI-Floskeln**,
  keine Marketing-Superlative. „von Experten kuratiert" statt Werbe-Sprech.
- **NIEMALS „Crawler" / „der Crawler hat gefunden"** nach außen. Die Datenbasis
  heißt öffentlich „intern kuratierte Supertools-Datenbasis".
- **Compliance ehrlich:** gefundene `criteria` sind ÖFFENTLICHE SIGNALE, keine
  Zertifikate (privacy ≠ „DSGVO-konform", hosting ≠ „Server DE"). Immer der Zusatz
  „Hinweise, keine geprüfte juristische Zusage".

## 3. Design-System (Tokens in `globals.css` @theme)
- **Marke Grün:** `--color-brand` #009460 · brand-dark #006b45 · brand-light #EAF3DE ·
  logo #0d9d69.
- **Signal Gelb (SPARSAM: CTAs/Badges):** accent #fed007 · accent-ink #27241f.
- **Warme Neutralflächen:** cream #F6F3F0 (Canvas) · stone · sand · dark #27241f ·
  mid · soft · border #E0DAD0.
- **Fonts:** IBM Plex Serif (Headlines, immer `font-normal`/400) · IBM Plex Sans
  (Body + UI) · IBM Plex Mono (nur Labels/Tags/Meta).
- **Flächensprache (Bento):** cream trägt **randlose weiße Karten**; Trennung über
  Fill-Kontrast + weiche Schatten, große Radien (`rounded-2xl/3xl`); plakativer
  Typo-Sprung (großes Serif-Display ↔ kleine UI-Labels).

## 4. HARTE Design-Regeln (nicht verletzen)
1. **Headlines: keine Kursiv/Gerade-Mischung.** Kein `<em className="italic">` in
   einer Headline — das ist ein AI-Tell. Differenzierung zweier Satzteile NUR über
   **Farbe** (`text-brand-dark`/`-light`). `<em>` in Headlines braucht `not-italic`.
   Vollständig kursive Editorial-Elemente im Fließtext (Drop-Caps, Pull-Quotes,
   Bildunterschriften) sind erlaubt.
2. **Headlines: keine erzwungenen `<br />`.** Natürlich umbrechen lassen; zweiten
   Satz mit `{" "}` direkt anhängen. `<br>` in Impressum/Datenschutz-**Adressen** ok.
3. **Keine winzigen Deko-Schriftgrößen**, keine Punkt-Eyebrows, kein
   mono-uppercase-tracked als Default-Label. Eyebrows als ruhige Sans
   (~14px, `font-semibold text-brand`).

## 5. Motion-System (Charakter: „schwebend & weich")
- **Feder-Easing:** `--ease-soft: cubic-bezier(0.32,1.32,0.5,1)` (in globals.css).
- **Global `ScrollReveal`** (`src/components/motion/ScrollReveal.tsx`, gemountet in
  `(frontend)/layout.tsx`): IntersectionObserver, setzt `.reveal-ready` auf `<html>`,
  beobachtet `[data-reveal]`, fügt `.is-visible` hinzu. Progressive Enhancement,
  `prefers-reduced-motion`-safe.
- **Muster pro Section-Header** (wie überall):
  - Eyebrow → `data-reveal`
  - Headline → `<RevealHeading as="h2" text={…} baseDelay={120} className="…unverändert…" />`
    (Wort-Aufbau; KEIN `"use client"`)
  - Lead → `data-reveal` + `style={{ "--reveal-delay": "240ms" }}`
  - Karten-Grids → `data-reveal="float"` + Stagger `${i*80}ms`
  - Reveal-Varianten (globals.css): `fade` / `left` / `right` / `zoom` / `float` / `word`
  - Headlines mit verschachteltem JSX (`<em>`/`<Link>`) NICHT auf RevealHeading
    umstellen → nur `data-reveal` aufs Element.
- **`Parallax`** (`src/components/motion/Parallax.tsx`): dezent, mobil runtergefahren,
  reduced-motion aus.
- **WICHTIG:** interaktive Overlays (Popover/Dialog) **NICHT** in einen
  `[data-reveal]`-Container legen — der Reveal-Transform erzeugt einen Stacking-Context
  und sperrt das Overlay hinter die Typo. `will-change` bewusst **nicht** in den
  Reveal-Regeln.
- Motion ist **selektiv**: wenige Signature-Momente, Rest ruhig. Nicht alles animieren.

## 6. Datenarchitektur (Tools)
- Frontend liest Tool-Daten **nur** über `src/data/directory.ts` (Aggregation:
  59 aus `src/mocks/tools/crawler-preview.ts` + 13 Master aus `src/data/software-master.ts`
  = **72**). Exporte: `directoryToolCards` / `…Logos` / `…Screenshots` / `…Summaries` /
  `…Availability` / `…Evidence` / `…Signals`.
- **Master-Daten sind generiert:** `scripts/build_software_master.py` liest die INTERNE
  `data/crawler/master/software-master.json` (**nie committen**) und schreibt
  `src/data/software-master.ts`. Kategorie + Pitch liegen als `EDITORIAL`-Mapping im
  Script. Neu erzeugen: `python3 scripts/build_software_master.py`.
- **Zwei Profil-Stufen:**
  - volle redaktionelle Profile in `src/mocks/tools/profiles.ts`
    (`tier: "verified"`, gerendert via `ProfilHero` + Profil-Blöcke)
  - Basis-Profil-Fallback `src/components/blocks/crawler/CrawlerToolProfile.tsx`
    (`tier: "basis"`)
  - Beide Badges tragen eine `InfoPopover`-Box, die den Unterschied erklärt:
    **Basis-Profil** = belegte Grunddaten, Tiefenprüfung folgt ·
    **Verifiziert** = Redaktion hat tief geprüft und steht dafür ein.
- **Produkt-Screenshots:** `public/brand/screenshots/<slug>/shot-1.jpg` — müssen die
  ECHTE Produkt-Oberfläche (Dashboard/App-UI) zeigen, **nicht** die Marketing-Startseite.
  Werden im `ProductShots`-Rahmen **ohne Browser-Chrome** gezeigt.
- **Bilder generell:** eigene KI-Behörden-Motive in `public/brand/Images/` (nicht Unsplash).

## 7. Kernkomponenten & Seiten
- **Home-Blöcke:** `src/components/blocks/home/*`
- **Geteilt** (decken alle Kategorie-/Profil-/Artikelseiten ab): `KategorieHero`,
  `ProfilHero`, `SectionHead`, `ArticleHeader`.
- **UI:** `ProductShots`, `InfoPopover` (Props `align` / `triggerClassName` / `iconSize`),
  `GeprueftBadge`, `Badge`, `ToolCard`.
- **Seiten:** `src/app/(frontend)/*/page.tsx`.

## 8. Verifikation & Deploy
- Dev: `npm run dev` (Port 3000). **Typecheck vor jedem Commit:** `npm run typecheck`.
- Änderungen im Browser wirklich prüfen (Reveal-Zustände settlen lassen,
  Popover-Stacking, Mobile). Vercel deployt automatisch bei push auf `main`.

## 9. Git-Disziplin (streng)
- **NIEMALS `git add -A`.** Nur explizite Pfade stagen (`src/`, `public/brand/`,
  `docs/`, `scripts/`).
- **NIEMALS interne Crawler-Daten committen:** `data/crawler/*` (insb.
  `software-master.json`, `runs/`, `review-decisions.json`). Der generierte
  `src/data/software-master.ts` wird committet, die Quell-JSON **nicht**.
- Commit-Messages auf Deutsch, präzise, mit Scope (`feat`/`fix`/`docs`). Nach
  substanziellen UI-Änderungen `CHANGELOG.md` + `README.md` aktuell halten.

---

Arbeite iterativ: kleine, sichtbare Schritte, jeweils Typecheck + Browser-Check, dann push.
