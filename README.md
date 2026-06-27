# SUPERTOOLS — Master README
## Kuratiertes Software-Verzeichnis für Behörden & Kommunen

**Stand:** Juni 2026 · **Version:** 0.16 · **Live:** [amtshelden-supertools.vercel.app](https://amtshelden-supertools.vercel.app/)
**Repo:** `github.com/wolfram-concrete/amtshelden-supertools` · **Betrieben von:** Amtshelden.de

> **Dies ist die einzige README.** Eine ältere Word-Export-Kopie (`README.md (1).docx`,
> Stand Mai) wurde am 27.06.2026 entfernt — der gesamte aktuelle Stand lebt hier.

### Assets / Brand

- **Logo (aktuell, Brand-Refresh 27.06.2026):**
  - `public/brand/supertools-logo.svg` — default (helle Hintergründe)
  - `public/brand/supertools-logo-inverse.svg` — invers (dunkle/grüne Sektionen)
  - PNG-Fallbacks unter gleichem Basisnamen · AR ≈ 2.895 · Gotham-Wortmarke
  - Eingebunden über `<Logo variant="default|inverse" height={n} />`
- **Brand-Grün:** `#009460` (Logo-Bubble `#0d9d69`) · Dunkelgrau `#3D3D3D` · Cream `#F8F4EB`
- **Headline-Schrift:** Source Serif 4 (seit v0.16, ersetzt Cormorant Garamond —
  institutionell-seriös statt Lifestyle-elegant, passend zum Behörden-Vertrauen)
- **Fonts gesamt:** Source Serif 4 (Headlines) · IBM Plex Sans (Body) · Inter Tight (UI).
  Gotham-woff2 (Logo-Schrift) liegt in `/legacy/fonts/` für künftigen UI-Einsatz.

**Vorbild:** OMR Reviews, Capterra — aber fokussiert auf den öffentlichen Sektor,
ohne Ranking, ohne gekaufte Empfehlungen.

---

## 1. VISION & POSITIONIERUNG

### Was ist Supertools?
Supertools ist das führende kuratierte Software-Verzeichnis für die öffentliche Verwaltung in Deutschland. Keine generische Tool-Datenbank — sondern eine geprüfte, redaktionell verantwortete Liste von Software, die wirklich für Behörden und Kommunen taugt: DSGVO-konform, praxiserprobt, mit echten Referenzen.

### Wettbewerbsvorteil gegenüber OMR Reviews / Capterra
- **Fokus:** Ausschließlich öffentlicher Sektor — kein Rauschen, keine irrelevanten Tools
- **Kuratierung:** Redaktionell geprüft (DSGVO, Serverstandort, Behörden-Referenzen) — keine Self-Service-Listings ohne Qualitätsprüfung
- **Vertrauen:** Amtshelden-Brand mit 12.000+ Community, Podcast, Newsletter — kein Kaltstart
- **Sprache:** Deutsch, verwaltungsnah, kein Tech-Jargon
- **Unabhängigkeit:** Keine bezahlten Placements ohne Kennzeichnung (explizites Markenversprechen)

### Kernthese
Der öffentliche Sektor hat ein massives Orientierungsproblem bei Software. Einkäufer in Kommunen sind keine IT-Profis, haben wenig Zeit, und müssen trotzdem DSGVO-konforme, budgetierbare Lösungen beschaffen. Supertools löst genau das.

---

## 2. MARKT & KONTEXT

### Zielgruppen
**Primär (Nachfrageseite):**
- IT-Verantwortliche in Kommunen & Landkreisen
- Amtsleiter, Bürgermeister-Büros, Stabsstellen Digitalisierung
- Pressestellen & Kommunikationsverantwortliche
- HR-Verantwortliche in Behörden
- OZG-Beauftragte, Digitalisierungsbeauftragte

**Sekundär (Angebotsseite):**
- Software-Anbieter, die Behörden als Zielgruppe haben
- GovTech-Startups auf Marktzugang-Suche
- Etablierte Anbieter (Grundig, Dataport, MHM etc.) mit Sichtbarkeitsbedarf

### Marktgröße (Deutschland)
- ~11.000 Kommunen & Gemeinden
- ~400 Landkreise
- ~16 Bundesländer mit Landesbehörden
- Geschätzter öffentlicher IT-Beschaffungsmarkt: 20+ Mrd. EUR/Jahr
- GovTech-Sektor wächst >15% p.a.

### Wettbewerb
| Anbieter | Fokus | Schwäche für uns |
|---|---|---|
| OMR Reviews | Alle Branchen, B2B | Kein Behördenfokus, kein DSGVO-Filter |
| Capterra | Alle Branchen, global | Nicht deutsch, keine Kuratierung |
| Govtech.de | GovTech-News | Kein Verzeichnis, kein Tool-Vergleich |
| KGSt | Empfehlungen | Nicht öffentlich, langsam, nicht digital |
| Keine | Kuratiertes Behörden-Verzeichnis DE | **Marktlücke** |

---

## 3. AKTUELLE SITUATION (Stand v0.16, Juni 2026)

### Tech-Stack

**Frontend:** Next.js 16.2.6 (App Router, Turbopack) · React 19.2.4 · TypeScript 5
· Tailwind v4 (`@theme`-Tokens in CSS) · shadcn-Style Primitives (`@radix-ui/react-slot`,
`class-variance-authority`, `clsx`, `tailwind-merge`)
· `lucide-react` für Icons.
**Deployment:** Vercel, Git-Auto-Deploy (GitHub-App). Build clean, **31 Routes** (alle Static/SSG).
**Repo:** `github.com/wolfram-concrete/amtshelden-supertools`.

### Strukturebene: 4 Themenfelder (seit v0.16, Strategie-Meeting 12.06.2026)

Oberste Navigationsebene — Kategorien sind diesen zugeordnet (`themenfeldSlug`):
**Kommunikation & Krise · Smartes Personalmanagement · Transformation & KI · Moderne Führung.**

### Implementierte Routen

| Route | Status | Was es ist |
|---|---|---|
| `/` | ✓ | Editorial-Frontpage: Hero+Tool-Finder-Wizard, TrustStrip, Use-Case-Einstieg, FeatureStory, ThemenCluster, Main+Sidebar, Pulse, Themenfeld-Grid, About (grün), Mitmachen-CTA, Newsletter |
| `/themenfelder` + `/[slug]` | ✓ | Index + 4 Themenfeld-Detailseiten (SSG) |
| `/kategorien` + `/[slug]` | ✓ | Index + 6 Kategorie-Detailseiten (Filter + Listen-Ansicht + Related) |
| `/tools/[slug]` | ✓ | Tool-Profil (VivioAkte): 8 Zonen + Transparenz-Block + Extended-Notice + Korrektur-Widget |
| `/wissen` + `/[slug]` | ✓ | Magazin-Index + 7 Artikel (Long-Form, 8 Block-Kinds) |
| `/anbieter` | ✓ | B2B-Landingpage (6 Sektionen) |
| `/vorschlagen` | ✓ | Tool vorschlagen / Unternehmen eintragen (Behörde/Anbieter-Umschalter) |
| `/ueber` | ✓ | Editorial-Seite (7 Sektionen, Amtshelden-Brücke) |
| `/kontakt`, `/impressum`, `/datenschutz` | ✓ | Service-Stubs |

### Strategie-Meeting umgesetzt (v0.16, alle 9 Punkte)

1. „Zuletzt geprüft am" überall · 2. „Was wir nicht prüfen konnten"-Block ·
3. 4 Themenfelder · 4. Transparenz-Hinweis an bezahlten Profilen ·
5. B2B-Landingpage · 6. Tool-vorschlagen-Flow · 7. Problem-/Use-Case-Einstieg ·
8. Korrektur-Widget · 9. 6-Fragen-Tool-Finder.
Globales Chat-Widget (Sprechblase mit „s") mit Terminbuchung übers Kalendertool.

**Build:** 25 routes total, alle static prerender. TypeScript clean.

### Komponenten-Architektur

```
src/
├── app/(frontend)/         ← öffentliche Seiten, Skill-konform
├── components/
│   ├── blocks/
│   │   ├── home/           ← EditorialFeatureStory, HeroWithFinder, QuickFinder,
│   │   │                     QuickGuide, ThemenCluster, Pulse, About, FAQ, ...
│   │   ├── profile/        ← 8 Zonen (ProfilHero, PassDas, Implementierung, ...)
│   │   ├── category/       ← KategorieHero, ToolFilters (Client)
│   │   └── article/        ← ArticleHeader, ArticleBody (8 Block-Kinds), AuthorBio
│   ├── cards/              ← ToolCard, ArticleCard, CategoryCard
│   ├── sidebars/           ← HomeSidebar (aggregierte Widgets)
│   ├── site/               ← Header, Footer, Logo, Breadcrumb, MegaMenu, PlaceholderPage
│   └── ui/                 ← Button, Badge (cva-basiert)
├── types/                  ← blocks.ts, content.ts, profile.ts (Payload-ready)
├── mocks/                  ← Tools, Kategorien, Artikel, FAQ, Stats
└── lib/utils.ts            ← cn(), slugify(), formatDateDE()
```

### Verbindliche Skills

| Skill | Wann anwenden | Quelle |
|---|---|---|
| **`payload-nextjs-agent`** | Bei jeder neuen Komponente / Page — sichert Payload-ready Architektur, Server/Client-Component-Trennung, defensive Optionals, `next/image`/`next/link` | `~/.claude/skills/payload-nextjs-agent/` · `.codex-context/SKILL.md` |
| **`list-ui-design`** | Bei jeder Listen-/Verzeichnis-/Tabellen-Darstellung — Item-Höhe, Dichte, Hierarchie, gleichberechtigte Darstellung ohne Ranking-Anmutung | `~/.claude/skills/list-ui-design/` · `.codex-context/list-ui-design.md` |

### Dokumentation & Snapshots

Für Strukturbesprechungen mit Geschäftspartnern liegt eine vollständige
Sitemap-Doku unter `public/sitemap.html` — wird von Vercel automatisch
mit-deployt und ist extern teilbar:

**Öffentlich erreichbar:**
`https://amtshelden-supertools.vercel.app/sitemap.html`
(`noindex,nofollow` gesetzt — nicht in Google-Suche)

- 8 Full-Page-Screenshots aller Hauptseiten in `public/sitemap/`
- HTML-Übersicht: Snapshot links · rudimentäre Section-Notizen rechts
- Reproduzierbar via `scripts/screenshot-pages.mjs`
- Print-/PDF-export-fertig (`@media print`)

```bash
# Lokal öffnen
open public/sitemap.html

# Frische Screenshots nach Design-Änderungen
PORT=3001 npm run start &
sleep 5 && node scripts/screenshot-pages.mjs
kill %1
```

PDF-Export: im Browser `Cmd+P` → „Als PDF speichern".

### Mobile / Responsive (Stand v0.14)

- **Header < 768 px:** Logo (36 px) + Hamburger-Button (44 × 44 px) — keine Inline-Nav
- **`MobileNavDrawer`** (Client) öffnet von rechts (`top-0 right-0 bottom-0`,
  85 % Breite max-w-sm), `transition-transform duration-200 ease-out`
- **Drawer-Inhalt:** Newsletter-Form · Kategorien-Akkordeon (6 Cats mit Icon/Count)
  · Wissen · Über · Anbieter · Kontakt · Impressum/Datenschutz
- **Body-Scroll-Lock** während Drawer offen, ESC + Backdrop-Click schließen
- **Touch-Targets** überall ≥ 44 px (Apple HIG / Google Material)
- **ToolFilters Mobile:** Filter sind **default eingeklappt** mit Active-Counter-Pill
  („Filter [3]") — User landet sofort auf der Tool-Liste
- **Container-Padding:** `px-4 sm:px-6 lg:px-10` für Mobile-Edge-Space
- **Wichtige Regel:** `position: fixed` + `h-full` ist auf iOS unzuverlässig —
  immer `top-0 right-0 bottom-0` (oder `inset-y-0 inset-x-0`) verwenden

### Design-System (verbindlich)

- **Fonts via `next/font/google`:** **Source Serif 4** (Headlines, italic für Akzente —
  seit v0.16, ersetzt Cormorant Garamond für seriösere Behörden-Anmutung),
  IBM Plex Sans (Body 17px, leading-1.75), Inter Tight (UI/Labels)
- **Headline-Leading (Source Serif 4):**
  - Display H1 (clamp 36–84 px): `leading-[0.96]` + `tracking-[-0.02em]`
  - Section H2 (clamp 28–48 px): `leading-[1.0]`–`[1.05]`
  - Card-Titel (17–22 px): `leading-tight` bis `leading-[1.15]`
  - Hinweis: Source Serif 4 hat engere Metrik als Cormorant — Werte daher
    minimal lockerer als die alten Cormorant-Tunings.
- **Brand-Tokens als CSS-Variablen in `@theme`:**
  - `--color-brand` `#009460` · `--color-brand-dark` `#006b45` · `--color-brand-light` `#EAF3DE`
  - `--color-cream` `#F8F4EB` · `--color-dark/mid/soft` für Editorial-Hierarchie
  - Tier-Farben (free/verified/partner/addon) · Semantische Hintergründe
- **Logo-Komponente:** `<Logo variant="default|inverse" height={n} />` —
  default für helle BG (Header, Footer), inverse für dunkle/grüne Sektionen
  (AboutBlock, ProfilCta)
- **Editorial-Prinzipien:** Kein Glassmorphismus, kein Purple-Gradient, keine Sterne,
  Cormorant italic für Akzente, native `<details>` statt JS-Akkordeons,
  vertikale Hairlines zwischen Spalten

### Mock-Daten-Stand

- **6 Kategorien** (E-Akte, Bürgerservice, Finanzen, Personal, Geo/Bau, Kommunikation)
- **8 Tool-Cards** (für Listen-Ansichten) + **1 vollständiges Profil** (VivioAkte mit allen 8 Zonen)
- **7 Pulse-Artikel** inkl. zwei Schwerpunkt-Stories („Digitalisierung Bund 2030", „Kommunen-Realität")
- **8 FAQ-Items** für Behörden mit `readMoreSlug`-Verlinkungen
- **4 Trust-Stats** + **4 Methodik-Schritte**

### Geschäftsmodell MVP
- Manuelle Vermittlung (Anfrage → Amtshelden → Anbieter) — vor Payload-Integration weiterhin gültig

### Wann kommt Payload?
Frontend ist Payload-ready aufgesetzt (Skill: `payload-nextjs-agent`):
TypeScript-Interfaces matchen 1:1 spätere Payload-Block-Schemata, BlockRenderer
ist als Registry vorbereitet, Mock-Daten haben Payload-API-Shape. Wechsel zu
CMS-Backend via `payload-react-agent` Skill — sobald das Design lokal stabil ist.

---

## 4. BUSINESS MODEL & MONETARISIERUNG

### Phase 1: Reichweite & Vertrauen (Monate 1–6)
**Ziel:** Community aufbauen, Marke etablieren, Datenbasis ausbauen
**Monetarisierung:** Keine direkte — aber Amtshelden-Brand stärken
**Aktivitäten:**
- Supertools als fester Bestandteil Amtshelden Newsletter
- Tool des Monats / Redaktionelle Features
- Anbieter-Einreichungen sammeln (kostenlos, kuratiert)
- 100+ Tools anstreben

### Phase 2: Basis-Monetarisierung (Monate 4–9)
**Erlösmodell A — Verified Listing (Anbieterseite):**
- Kostenloser Basis-Eintrag (kuratiert, redaktionell)
- **Premium Verified Listing:** 299–499 EUR/Monat
  - Erweitertes Profil (Screenshots, Videos, Fallstudien)
  - „Verifiziert von Amtshelden"-Badge
  - Priorität in Suchergebnissen
  - Direkter Anfragen-Eingang ohne Amtshelden-Vermittlung

**Erlösmodell B — Lead-Vermittlung:**
- Qualifizierte Anfragen von Behörden → Weiterleitung an Anbieter
- 150–500 EUR pro qualifiziertem Lead (je nach Softwarepreis)
- Erfolgsbasiert: 1–3% der Lizenzgebühr bei nachgewiesenem Abschluss

**Erlösmodell C — Sponsored Content (klar gekennzeichnet):**
- Redaktionelle Tool-Features, Case Studies: 1.500–3.000 EUR/Stück
- Newsletter-Integration (12k Abonnenten): 500–1.000 EUR/Ausgabe
- Webinare / Demo-Sessions für Behörden: 800–2.000 EUR/Session

### Phase 3: Plattform-Skalierung (Monate 9–18)
**Erlösmodell D — SaaS für Anbieter (Vendor Dashboard):**
- Anbieter-Login: Profil selbst pflegen, Anfragen managen
- Analytics: Wie viele Behörden haben mein Profil gesehen?
- 99–299 EUR/Monat SaaS-Subscription

**Erlösmodell E — Procurement-Tool für Behörden:**
- Behörden-Login: Eigene Shortlists, Vergleiche, interne Notizen
- Kostenlos für Behörden (Volumen-Effekt), Premium-Features optional
- Finanzierung über Anbieter-Seite

**Erlösmodell F — Marktberichte & Research:**
- Jährlicher „State of GovTech Germany"-Report: 299–999 EUR
- Custom Research für Anbieter: 2.000–8.000 EUR/Projekt

### Umsatzpotenzial (konservative Schätzung, Jahr 2)
| Kanal | Einheiten | Preis | Monatlich |
|---|---|---|---|
| Premium Listings | 20 Anbieter | 399 EUR | 7.980 EUR |
| Lead-Vermittlung | 10 Leads/Mo | 300 EUR | 3.000 EUR |
| Sponsored Content | 2/Monat | 2.000 EUR | 4.000 EUR |
| Newsletter-Ads | 4/Monat | 600 EUR | 2.400 EUR |
| **Gesamt** | | | **~17.380 EUR/Mo** |

Annualisiert: **~200.000 EUR ARR** (Jahr 2, konservativ)
Skaliert auf 50 Premium Listings + mehr Leads: **400.000–600.000 EUR ARR** (Jahr 3)

---

## 5. PHASENPLAN BUSINESSPLAN-ERARBEITUNG

### Session-Agenda (diese Stunde)
1. ✅ README / Wissensbasis anlegen (jetzt)
2. ⬜ Markt & Wettbewerb vertiefen (Dialog)
3. ⬜ Erlösmodelle priorisieren & Pricing verfeinern
4. ⬜ Go-to-Market-Strategie (wie erreichen wir Behörden UND Anbieter?)
5. ⬜ Phasenplan Produktentwicklung (MVP → Plattform)
6. ⬜ Finanzmodell / P&L-Projektion
7. ⬜ Offene Fragen & nächste Schritte

### Produkt-Roadmap (Monate 1–18)

**Phase 0 — Jetzt (One Pager, statisch)**
- 34 Tools, manueller Prozess
- Validierung: Kriegen wir Anfragen? Kriegen wir Anbieter-Interesse?

**Phase 1 — CMS + Datenbankbasis (Monat 2–4)**
- WordPress oder Webflow mit strukturierten Tool-Profilen
- Formular-Backend (Anfragen automatisch erfassen)
- Newsletter-Integration (Amtshelden)
- Ziel: 100+ Tools

**Phase 2 — Anbieter-Self-Service (Monat 5–8)**
- Anbieter können Profil einreichen (Formular)
- Redaktioneller Review-Prozess (Qualitätssicherung)
- Basis-Monetarisierung startet

**Phase 3 — Plattform (Monat 9–15)**
- Anbieter-Dashboard (Login, Profil-Pflege, Analytics)
- Behörden-Features (Shortlist, Vergleich)
- Review-System (verifizierte Behörden-Bewertungen)
- SEO-Strategie voll ausgerollt

**Phase 4 — Marktführer (Monat 15+)**
- API für Behörden-Beschaffungssysteme
- Integration in kommunale Vergabeplattformen
- Internationalisierung (AT, CH)

---

## 6. GO-TO-MARKET

### Behörden-Seite (Nachfrage)
- **Amtshelden Newsletter:** 12k Abonnenten, direkter Kanal
- **Amtshelden Podcast:** Tool-Features als Episoden-Inhalt
- **Kommunale Netzwerke:** KGSt, Kommunalverband, Städtetag
- **LinkedIn:** Behörden-Entscheider sind aktiv auf LinkedIn
- **Kongresse:** SCCON, Kommunalmesse, Digitaler Staat
- **SEO:** „Software für Behörden", „DSGVO-konforme Tools Kommunen" etc.

### Anbieter-Seite (Angebot)
- **Direktansprache:** GovTech-Startups über LinkedIn/E-Mail
- **PR:** „Das OMR Reviews für Behörden" — klares Narrativ
- **Partner:** GovConnect, KGSt, Digitale Verwaltungsschule
- **Content Marketing:** Tool-Vergleiche, DSGVO-Guides als Lead-Magneten
- **Webinare:** „Wie erreiche ich Behörden als Softwareanbieter?"

### Content-Strategie
- Monatlicher „Tool des Monats" im Newsletter
- Jährlicher GovTech-Report (Meinungsführerschaft)
- Vergleichs-Artikel: „Die 5 besten KI-Tools für Kommunen"
- Case Studies: „Wie Stadt X Problem Y mit Tool Z gelöst hat"

---

## 7. TEAM & RESSOURCEN

### Aktuell (CONCRETE / Amtshelden)
- **Wolfram Stratmann:** Founder, Design, Strategie, Produktentwicklung
- **Amtshelden-Team:** Inhaltliche Kuratierung, Community, Newsletter

### Bedarf (Skalierung)
- **Phase 1:** VA/Werkstudent für Tool-Recherche & Datenpflege (400–600h/Jahr)
- **Phase 2:** Part-time Sales/Partnerships für Anbieter-Akquise
- **Phase 3:** Entwickler (oder Claude Code für Plattform-Bau)

### Budget-Rahmen (grob)
- Phase 0–1: <5.000 EUR (primär Zeitaufwand)
- Phase 1–2: 10.000–20.000 EUR (Entwicklung, VA, Marketing)
- Phase 2–3: 30.000–60.000 EUR (Plattform, Sales)

---

## 8. ARCHITEKTUR & TECHNOLOGIE (Für Claude Code)

### IT-Experten-Hinweis (LinkedIn-Artikel — Kernaussagen)
> **Lokale Produktivitätsgewinne führen nicht automatisch zu besseren Ergebnissen auf Systemebene.**

Daraus abgeleitete Prinzipien für den Supertools-Plattform-Bau:

**1. Konzeption vor Code**
- Datenmodell vollständig durchdenken BEVOR die erste Zeile Code geschrieben wird
- API-Struktur definieren, bevor Frontend gebaut wird
- User Flows für Behörden UND Anbieter komplett mappen

**2. Stabiles Fundament**
- Entscheidungen auf Architektur-Ebene sind teuer zu ändern
- Tech-Stack-Entscheidung muss Skalierbarkeit berücksichtigen (100 Tools → 1000 Tools)
- DSGVO-Compliance by Design (nicht nachträglich)

**3. Qualitätssicherung**
- Review-Prozess für jede neue Feature-Iteration
- Jede Anbieter-Einreichung durch redaktionellen Filter
- Kein automatisches Publish ohne Qualitätsprüfung

**4. Empfohlener Tech-Stack (Vorschlag)**
- **Frontend:** Next.js (SSR für SEO) oder Webflow (schneller MVP)
- **Backend/CMS:** Sanity.io oder Directus (strukturierte Tool-Profile)
- **Datenbank:** PostgreSQL (relationale Struktur: Tools, Anbieter, Kategorien, Bewertungen)
- **Auth:** Clerk oder Auth.js (Anbieter-Login, Behörden-Login)
- **Search:** Algolia oder Typesense (Echtzeit-Suche, Filter)
- **Forms/Leads:** Tally.so + Zapier/Make → CRM
- **Hosting:** Vercel + Supabase (DE-Region für DSGVO)
- **Analytics:** Plausible (DSGVO-konform, DE-gehostet)

### Datenmodell (Kern-Entities)
```
Tool {
  id, name, slug, logo, website, hq, founding_year
  themenfeld: [social_media | personalmanagement | transformation]
  use_cases: string[]
  zielgruppen: string[]
  funktionen: string[]
  server_standort, hosting_modell, rz_partner
  dsgvo_bestaetigt: bool, av_vertrag: bool, datenschutzseite: bool
  iso_27001: bool, bsi_c5: bool, bitv: bool
  ki_funktionen: bool, api: bool
  confidence: [HOCH | MITTEL | OFFEN]
  behörden_referenzen: string[]
  review_status, last_updated
}

Anbieter {
  id, company_name, contact_email
  listing_tier: [free | premium | verified]
  tools: Tool[]
  subscription_status, mrr
}

Anfrage {
  id, tool_id, behoerde, email, use_case, timestamp
  status: [neu | in_bearbeitung | vermittelt | abgeschlossen]
}

Behoerde {  // Phase 3
  id, name, typ, bundesland
  shortlists: Tool[][]
  bewertungen: Bewertung[]
}
```

### SEO-Strategie (technisch)
- Jedes Tool bekommt eigene SEO-optimierte URL: `/tools/stackfield`
- Themenfeld-Seiten: `/social-media-tools-behoerden`
- Vergleichs-Seiten: `/stackfield-vs-meistertask`
- Schema.org SoftwareApplication Markup
- Sitemap automatisch generiert

---

## 9. OFFENE FRAGEN (Dialog-Agenda)

Diese Fragen müssen im Business-Plan-Dialog geklärt werden:

1. **Eigenständige Marke oder Amtshelden-Sub-Brand?**
   - Eigene Domain supertools.de? Oder amtshelden.de/supertools?
   - Eigene GmbH / eigenes P&L oder integriert in Amtshelden?

2. **Kuratierung als USP — wie skalierbar?**
   - Wer prüft die Tools bei 200+ Einträgen?
   - Crawler + KI-Vorbefüllung + menschlicher Review?

3. **Pricing-Validierung**
   - Sind Anbieter bereit, 299–499 EUR/Monat zu zahlen?
   - Was ist der wahrgenommene Wert eines Amtshelden-Listings?

4. **Behörden-Reviews**
   - Wie verifizieren wir, dass Reviewer wirklich Behörden sind?
   - Rechtliche Risiken bei Bewertungen (Verleumdung, Wettbewerbsrecht)?

5. **Salesforce Behörden — direkter Kontakt?**
   - Brauchen wir einen Behörden-Account-Manager?
   - Oder reicht Inbound über Amtshelden-Reichweite?

6. **Wann ist der richtige Zeitpunkt für Eigenständigkeit?**
   - Ab welchem ARR / welcher Tool-Anzahl wird Supertools eigenständig?

---

## 10. NÄCHSTE SCHRITTE (Session)

### Sofort (diese Stunde)
- [ ] Business-Plan-Dialog: Erlösmodelle priorisieren
- [ ] Go-to-Market konkretisieren
- [ ] Finanzmodell aufsetzen (P&L-Projektion 3 Jahre)

### Diese Woche
- [ ] Supertools-Landing als WordPress-Unterseite live schalten
- [ ] Erste Anbieter-Ansprache (10 Tool-Anbieter direkt kontaktieren)
- [ ] Newsletter-Feature: Tool des Monats vorbereiten

### Dieser Monat
- [ ] 50+ Tools in die Datenbasis aufnehmen
- [ ] CMS-Entscheidung treffen und Umsetzung starten
- [ ] Erste Premium-Listings verkaufen (3 als Pilot)

---

## 11. DATEIEN & RESSOURCEN

### Lokale Dateien
- `supertools_v4.html` — Aktueller One Pager (34 Tools, vollständiges Design)
- `Supertools_Datenbasis_komplett.xlsx` — 40 Tools, vollständiges Briefing-Schema

### Design-Tokens
- Primärfarbe Grün: `#009460`
- Gelb/Highlight: `#FFE500`
- Dunkel: `#1A202C`
- Cream/Background: `#F8F4EB`
- Font: Gotham (Light 300, Book 400, Medium 500, Bold 700)

### Amtshelden-Links
- Website: https://www.amtshelden.de
- Newsletter-Anmeldung: https://www.amtshelden.de/amtshelden-newsletter/
- LinkedIn: https://www.linkedin.com/company/86876852/
- Instagram: https://www.instagram.com/amtshelden/

---

*Dieses README wird fortlaufend aktualisiert. Alle Entscheidungen, Konzepte und Architektur-Beschlüsse werden hier dokumentiert, damit der Kontext in Claude Code vollständig verfügbar ist.*

---

## 22. SUPERTOOLS KOSMOS — HOLISTISCHE INFOGRAFIK

### Übersicht (9 Blöcke auf einen Blick)

```
┌─────────────────────────────────────────────────────────────────┐
│          AMTSHELDEN — Vertrauensanker                           │
│   7.000 Newsletter · Podcast · Community · 12k Reichweite      │
│                    ↓ Trust-Transfer                             │
│              ┌─────────────────┐                               │
│              │   SUPERTOOLS    │                               │
│              │ Kuratiert · handverlesen                        │
│              └─────────────────┘                               │
├──────────────────────┬──────────────────────────────────────────┤
│ NACHFRAGE (Behörden) │ ANGEBOT (Anbieter)                      │
│ Kommunen · Landkreise│ GovTech-Startups                        │
│ Digitalisierungsbeauf│ Etablierte Anbieter                     │
│ IT-Verantwortliche   │ IT-Consultings (J.2)                    │
│ ~11.000 Kommunen     │ 72 identifiziert · 24 sofort            │
│ kostenlos            │ zahlen für Listings                     │
├──────────────────────┴──────────────────────────────────────────┤
│ CUSTOMER JOURNEY                                                │
│ Problem → Entdecken → Vergleichen → Anfragen → Vermittlung     │
│          (Supertools)   (Profile)   (CTA→AH)  (Lead→Anbieter) │
├─────────────────────────────────────────────────────────────────┤
│ MONETARISIERUNG                                                 │
│ Free (0€) │ Verified (199–299€/Mo) │ Partner (499–799€/Mo)    │
│ Add-ons: NL redakt. 1.800–2.500€ · NL Anzeige 800–1.200€      │
│ Lead-Vermittlung 200–500€ · Webinar 1.500–3.000€               │
│ P&L: Jahr 1 ~52k € · Jahr 2 ~198k € · Jahr 3 ~420k € ARR     │
├──────────────┬──────────────────┬──────────────────────────────┤
│ ① VERZEICHNIS│ ② PULSE          │ ③ REPORT                    │
│ 300–700 Tools│ 1–3x/Woche       │ Halbjährlich                │
│ DSGVO-geprüft│ Beschlüsse·Trends│ Branchenquelle              │
│ Crawler+Redak│ Thematisierung   │ Meinungsführerschaft        │
│ NIE verwässern│ ab sofort        │ ab Phase 2                  │
├──────────────┴──────────────────┴──────────────────────────────┤
│ KOMMUNIKATIONSKANÄLE                                            │
│ Newsletter (7k) · Webinar · Podcast · SEO · SCCON/KGSt         │
├────────────────────────────┬───────────────────────────────────┤
│ TECHNIK PHASE 1 (jetzt)    │ TECHNIK PHASE 2–3 (Plattform)    │
│ HTML One Pager (statisch)  │ CMS: Webflow / Next.js           │
│ Crawler-Datenbasis (Excel) │ DB: PostgreSQL (Supabase EU)     │
│ Manuelle Anfragen via AH   │ Anbieter-Dashboard               │
│ DSGVO · DE/EU-Server       │ Tracking EU-konform              │
├──────────────┬─────────────┴──────────────────────────────────┤
│ JAHR 1–3     │ JAHR 3–6                 │ JAHR 6+             │
│ Verzeichnis  │ Leitmedium               │ Referenz-Infra DE   │
│ Pulse startet│ Report etabliert         │ Zitierte Instanz    │
│ Erste Monet. │ Dienstleister-Verz.      │ Standard-Plattform  │
└──────────────┴──────────────────────────┴─────────────────────┘
               „Das Gedächtnis der digitalen Verwaltung Deutschlands."
```

### Block-Beschreibungen

**Block 1 — Amtshelden-Fundament**
Supertools ist kein Standalone-Produkt. Es steht auf den Schultern von Amtshelden:
7.000 Newsletter-Abonnenten (alle 2 Wochen), Podcast, Community, 12k Gesamtreichweite.
Der Trust-Transfer von Amtshelden ist der entscheidende Startvorteil.

**Block 2 — Zielgruppen**
Zwei Seiten, eine Plattform:
- Nachfrageseite (Behörden): ~11.000 Kommunen, kostenlos — sie suchen Orientierung
- Angebotsseite (Anbieter): 72 identifiziert, 24 sofort ansprechen — sie zahlen für Sichtbarkeit

**Block 3 — Customer Journey (Behörde)**
Problem → Supertools entdecken → Profile vergleichen → CTA klicken →
Anfrage läuft über Amtshelden → qualifiziert → Anbieter kontaktiert → Abschluss

**Block 4 — Monetarisierung**
3 Tiers + Add-ons:
- Free Listing (0€): Volumen, Basis-Sichtbarkeit
- Verified Listing (199–299€/Mo): Badge, Analytics, Direktkontakt
- Partner-Paket (499–799€/Mo): NL-Feature, Webinar, Top-Placement, Leads
- Add-ons: Newsletter redaktionell 1.800–2.500€, Anzeige 800–1.200€, Leads 200–500€
- P&L: 52k → 198k → 420k EUR ARR (Jahre 1–3)

**Block 5 — 3 Produktsäulen**
① Verzeichnis (Fundament, dauerhaft): 300–700 Tools, handverlesen, nie verwässern
② Supertools Pulse (ab sofort, laufend): redaktioneller Feed 1–3x/Woche
③ Supertools Report (ab Phase 2, halbjährlich): destilliertes Großformat, Branchenquelle

**Block 6 — Kommunikationskanäle**
Newsletter (AH 7k, eigener ab Phase 2), Webinar/Tool Talks, Podcast-Integration,
Sponsored Content, SEO, Direktansprache (SCCON, KGSt, LinkedIn, 24 Sofort-Kandidaten)

**Block 7 — Technische Architektur**
Phase 1 (jetzt): HTML One Pager + Excel-Datenbasis + manuelle Vermittlung
Phase 2–3 (Plattform): Next.js/Webflow + PostgreSQL EU + Anbieter-Dashboard + EU-Tracking

**Block 8 — Vision Zeithorizont**
Jahr 1–3: Kuratiertes Verzeichnis + Pulse-Start + erste Monetarisierung
Jahr 3–6: Leitmedium + Report etabliert + Dienstleister-Verzeichnis live
Jahr 6+: Referenz-Infrastruktur DE, zitierte Brancheninstanz

**Vision-Claim:** „Das Gedächtnis der digitalen Verwaltung Deutschlands."

### Schnittstellen Supertools ↔ Amtshelden

| Schnittstelle | Funktion |
|---|---|
| Newsletter | Supertools-Rubrik im AH-Newsletter · später eigener NL |
| Podcast | Tool-Features als Episoden-Content |
| Community | Behörden-Anfragen kommen über AH-Kanal |
| Anfrage-Routing | CTA → Amtshelden → qualifiziert → Anbieter |
| Brand | „Amtshelden Supertools" — Trust-Transfer aktiv |
| Vertrieb | Bestandskontakte (SocialHub, Just Social, Stage) als Erstakquise |
| Events | SCCON, Zukunftskongress, KGSt — gemeinsam |


---

## 23. DESIGN-SYSTEM & BRAND-FONTS (VERBINDLICH FÜR ALLE BUILDS)

### Primäre Brand-Font: Trade Gothic

**Trade Gothic ist die verbindliche Brand-Font für alle Supertools-Ausgaben.**
Immer direkt einbinden — nie durch Google Fonts oder andere Fonts ersetzen.

**Font-Gewichte und Einsatz:**
- **Trade Gothic Light (300)** → Fließtext, Beschreibungen, dezente Labels
- **Trade Gothic Regular (400)** → Standard-Body-Text, Listen
- **Trade Gothic Medium (500)** → Subheadings, Karten-Titel, Badges
- **Trade Gothic Bold (700)** → Headlines, CTAs, Key Numbers, Claim

**@font-face Einbindung (Standard-Template für alle HTML-Dateien):**
```css
@font-face {
  font-family: 'TradeGothic';
  src: url('tradegothiclight-webfont.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: 'TradeGothic';
  src: url('tradegothic-webfont.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: 'TradeGothic';
  src: url('tradegothicbold-webfont.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}

:root {
  --font: 'TradeGothic', 'Gotham', system-ui, sans-serif;
}
```

**Fallback-Reihenfolge:** Trade Gothic → Gotham → system-ui
(Gotham als Fallback weil strukturell ähnlich und bereits als woff2 vorhanden)

### Aktuell verfügbare Fonts (bereits als .woff2 im Outputs-Ordner)

Gotham-Familie (bis Trade Gothic verfügbar als Fallback nutzbar):
- `gothamlight-webfont.woff2` (300)
- `gothambook-webfont.woff2` (400)
- `gothammedium-webfont.woff2` (500)
- `gothambold-webfont.woff2` (700)
- Italic-Varianten jeweils vorhanden

### Design-Token (verbindlich)

```css
:root {
  /* Brand Colors */
  --green:      #009460;   /* Primärgrün Supertools */
  --green-dark: #006b45;   /* Hover / Vertiefung */
  --yellow:     #FFE500;   /* Akzent / Highlight */
  --dark:       #1A202C;   /* Texte / Dark Backgrounds */
  --cream:      #F8F4EB;   /* Seitenhintergrund */
  --white:      #ffffff;

  /* Semantische Farben */
  --blue-light: #E6F1FB;   /* Behörden-Seite */
  --green-light: #EAF3DE;  /* Wachstum / Erfolg */
  --amber-light: #FAEEDA;  /* Add-ons / Erweiterung */
  --purple-light: #EEEDFE; /* Technische Architektur */

  /* Grün-Abstufung Listing-Tiers */
  --tier-free:     rgba(0,148,96,0.14);  /* 14% = Free */
  --tier-verified: rgba(0,148,96,0.42);  /* 42% = Verified */
  --tier-partner:  rgba(0,148,96,0.72);  /* 72% = Partner-Paket */
  --tier-addon:    #009460;              /* 100% = Add-ons */

  /* Font */
  --font: 'TradeGothic', 'Gotham', system-ui, sans-serif;
}
```

### Wichtige No-Gos
- Kein Inter, Roboto, Arial als Hauptfont
- Kein Google Fonts CDN in Produktionsdateien
- Kein DM Sans / DM Serif (nur temporär wenn Trade Gothic nicht verfügbar)
- Keine Purple-Gradienten, kein Glassmorphismus-Klischee
- Keine generische KI-Ästhetik


---

## 24. AI OVERVIEW & LISTICLE-STRATEGIE (Stand Mai 2026)

### Christians Hinweis — und warum er strategisch goldrichtig ist

Listicles sind der am häufigsten zitierte Content-Typ in Google AI Overviews,
ChatGPT und Perplexity — mit 21,9% aller AI-Zitierungen. Bei kommerziellen
Suchanfragen sogar 40,86%. "Best X"-Listen machen 43,8% aller ChatGPT-Zitierungen aus.

**Supertools IST strukturell ein Listicle-Format — das ist ein Riesenvorteil.**

### Was das konkret bedeutet

**Supertools-Kategorie-Seiten = hochwertige AI-Zitier-Kandidaten**
Jede Kategorie ("Beste E-Akte-Software für Kommunen", "Top DSGVO-konforme
Videokonferenz-Tools für Behörden") ist eine potenzielle AI-Overview-Quelle.
Behörden-Mitarbeiter googeln genau solche Fragen — und AI übernimmt die Antwort
direkt aus kuratierten, strukturierten Quellen.

### Der entscheidende Unterschied: Kuratiert ≠ Selbstpromotiiert

Ab Januar 2026 straft Google selbstpromotierende "Best of"-Listen ab —
Seiten die eigene Produkte auf Platz 1 ihrer eigenen Listen setzen verloren
bis zu 49% Sichtbarkeit. Supertools listet Anbieter, nicht sich selbst.
Das ist genau der Unterschied zwischen bestrafen und belohnen.

### Was AI-Systeme an Listicles lieben — und wie Supertools das nutzt

- **Strukturierte, modulare Inhalte** — jedes Tool-Profil ist ein eigener
  "Block" der zitiert werden kann
- **"Best for"-Labels** — z.B. "Beste Lösung für kleine Kommunen unter 10.000 EW"
  erhöht Long-Tail-Trefferquote massiv
- **Erstes-Satz-Prinzip**: AI zitiert oft die ersten 150 Zeichen eines
  Listicle-Eintrags — jedes Profil muss mit einer klaren Aussage beginnen
- **Eigenständige Einträge**: Jedes Tool-Profil soll als komplette Antwort
  stehen können, ohne den Rest der Seite zu benötigen

### Supertools Pulse als AI-Zitier-Maschine

Der laufende Pulse-Feed ist der Content-Motor für AI-Sichtbarkeit:
- Strukturierte Kurz-Artikel zu Beschlüssen, Piloten, neuen Tools
- Klare Frage-Antwort-Struktur ("Welche E-Akte-Software wurde in Hamburg pilotiert?")
- Regelmäßige Aktualisierung = frischer Content = höhere Zitierwahrscheinlichkeit

### Konkrete Umsetzungsregeln für jedes Tool-Profil

Jedes Supertools-Profil muss enthalten:
1. **Erster Satz**: Klare Aussage was das Tool macht + für wen (max. 150 Zeichen)
2. **"Beste Lösung für"**: Konkrete Behördentyp-Zuweisung
3. **DSGVO-Status**: Explizit genannt (AI zitiert das gerne)
4. **Referenz-Kommunen**: Min. 1 konkrete Behörde die das Tool nutzt
5. **Preisspanne**: Für Behörden relevant, erhöht kommerzielle Trefferquote

### Listicle-Seiten die gebaut werden sollten (Priorität)

| Seite | Suchanfrage | AI-Potenzial |
|---|---|---|
| Beste E-Akte-Software für Kommunen | "welche e-akte software für kommunen" | Sehr hoch |
| DSGVO-konforme Videokonferenz Behörden | "dsgvo videokonferenz behörden" | Hoch |
| OZG-konforme Bürgerportal-Software | "ozg bürgerportal software" | Hoch |
| Beste HR-Software öffentlicher Dienst | "hr software öffentlicher dienst" | Mittel |
| Digitale Unterschrift Behörden | "digitale signatur behörden dsgvo" | Hoch |

### Warnung: Was nicht funktioniert

- Dünn produzierte Listen ohne Kontext → werden ab 2026 abgestraft
- Selbstpromotion (Supertools als "bestes Verzeichnis" in eigenen Listen) → Risiko
- Statische Listen ohne Updates → verlieren gegenüber frisch aktualisierten Inhalten

**Fazit:** Supertools Pulse + strukturierte Kategorie-Seiten = natürlicher
AI-Overview-Kandidat. Kein SEO-Trick nötig — das Format stimmt bereits.


---

## 25. PREISMODELL — DISKUSSIONSSTAND & GRUNDLAGENBERECHNUNG (Mai 2026)

### Entscheidung: Free Listing wird abgeschafft

Free Listing fliegt raus. Begründung:
- Widerspricht dem Kernversprechen "kuratiert und handverlesen"
- Wer sich selbst eintragen kann, macht Supertools zum Branchenverzeichnis
- Kein Revenue, aber Qualitätsverwässerung

**Ersatz:** Supertools legt selbst kuratierte Basis-Profile an — ohne Zutun des Anbieters.
Der Anbieter hat keine Kontrolle, kein Badge, keinen Direktkontakt.
Das ist Kuratierung, kein Free Listing.

### Grundlagenberechnung: Was ist ein Behörden-Lead wert?

Typische Deal-Größen im öffentlichen Sektor (Softwareverkauf Anbieter → Behörde):

| Softwaretyp            | Deal-Größe (einmalig) | Laufzeit   | Customer Lifetime Value |
|---|---|---|---|
| E-Akte / DMS           | 30.000–150.000 EUR    | 5–10 Jahre | 50.000–200.000 EUR      |
| Bürgerportal / OZG     | 20.000–80.000 EUR     | 3–5 Jahre  | 40.000–120.000 EUR      |
| HR-Software ÖD         | 15.000–60.000 EUR     | 3–5 Jahre  | 30.000–80.000 EUR       |
| Videokonferenz/Kollabo | 5.000–25.000 EUR      | 1–3 Jahre  | 10.000–40.000 EUR       |
| Kleinere SaaS-Tools    | 2.000–10.000 EUR      | 1–2 Jahre  | 5.000–15.000 EUR        |

**Konservative Annahme: 1 Behörden-Abschluss = 30.000 EUR CLV (Customer Lifetime Value)**

### ROI-Verhältnis: Listing-Preis vs. Deal-Wert

| Listing         | Jahrespreis | 1 Abschluss (konservativ 30k) | ROI Faktor |
|---|---|---|---|
| Verified        | 2.400–3.600 EUR | 30.000 EUR                | 8–12×      |
| Partner-Paket   | 6.000–9.600 EUR | 30.000 EUR                | 3–5×       |

**Fazit: Unsere Preise sind eher zu niedrig als zu hoch.**
Ein einziger Abschluss über Supertools amortisiert das Jahresabo in Woche 1.
Das ist das stärkste Verkaufsargument: kein Marketing-Budget ergibt einen
besseren ROI als ein kuratierter Behörden-Lead.

### Offene Preisdiskussion (mit Partnern zu klären)

Folgende Punkte sind noch offen:

**1. Fixpreise statt Spannen?**
Aktuelle Spannen (199–299, 499–799) sind aus Käufersicht unklar.
Optionen:
- Fix: Verified 249 EUR, Partner-Paket 599 EUR
- Zwei Varianten mit Namen (z.B. Verified S / Verified M)

**2. Gründungspartner-Modell für Launch?**
Erste 20 Anbieter: 50% Rabatt auf Jahr 1, dafür "Gründungspartner"-Badge.
Gibt sofort Volumen + Social Proof. Danach voller Preis.

**3. Mittelfristiges Preis-Upside:**
Wenn Plattform 3.000+ monatliche Behörden-Besucher hat:
Verified auf 299–399 EUR anheben, Partner-Paket auf 799–1.200 EUR.
Das ist bei Deal-Größen von 30k+ noch immer trivial für Anbieter.

**4. Jahresabo-Rabatt überdenken:**
Aktuell: 1–2 Monate gratis.
Alternative: Monatlich buchbar, aber 20% teurer (Verified 299/Mo monatlich vs. 249/Mo jährlich).
Gibt Flexibilität für unsichere Anbieter ohne Preis zu verwässern.

→ Status: OFFEN — Entscheidung nach Partner-Gespräch


---

## 26. WEBSITE-KONZEPTION — NEUSTART (Mai 2026)

### Strategischer Reset

Alles bisher Erstellte (Business Case, Monetarisierung, Infografik) bleibt erhalten.
Für die Website-Konzeption starten wir neu — mit dem richtigen Fokus für Jahr 1.

**Jahr 1 ist keine Verkaufsplattform. Es ist eine Vertrauensarchitektur.**

### Das psychologische Ziel

Der Behördenmitarbeiter öffnet Supertools und denkt:
**„Wo hat diese Plattform für uns eigentlich die ganze Zeit gesteckt?"**

Er trägt Verantwortung. Wenn die Softwareeinführung scheitert, scheitert er.
Er braucht keine Featureliste. Er braucht das Gefühl:
„Hier wurde für Menschen wie mich gedacht — mit meinen Ängsten,
meiner Verantwortung, meinem Kontext."

### Das Konzept: Magazin statt Verzeichnis

Supertools ist kein Verzeichnis das wie ein Magazin aussieht.
Es ist ein **Magazin das ein Verzeichnis enthält.**

Referenz: redaktionelles Advertorial / Editorial — Fülle, Tiefe, Haltung.
Nicht: Capterra, OMR Reviews, G2.
Eher: ein kuratiertes Fachmagazin für digitale Verwaltung.

### Die 4 Website-Elemente (Pflicht)

1. **Kategorien mit Fülle** — sofort sichtbar: hier wurde viel strukturiert
2. **Wissensvermittlung / Pulse** — redaktioneller Bereich:
   Implementierungserfahrungen, Beschlüsse, FAQ für Behörden
3. **Menschliche Bild- und Videocontainer** — echte Gespräche, echte Gesichter,
   keine Stock-Fotos. Das Gefühl: hier reden Menschen über echte Probleme
4. **Tool-Profile mit Tiefe** — nicht technische Specs, sondern:
   Wer ist der Mensch dahinter? Wie war die Implementierung bei anderen?
   Was sagen Behörden die es schon nutzen?

### Die emotionale Reise durch die Website

- Startseite → „Hier bin ich richtig"
- Kategorie → „Ich verstehe das Thema besser als vorher"
- Tool-Profil → „Ich bin nicht allein mit dieser Entscheidung"
- Wissensartikel → „Ich lerne etwas das ich morgen nutzen kann"

### Seitenarchitektur (4 Typen)

A — Startseite (Editorial-Frontpage)
B — Kategorie-Seite (kuratiert + redaktionelle Einleitung)
C — Tool-Profil (Herzstück — siehe Kapitel 27)
D — Wissensbereich / Pulse (redaktionelle Artikel)

→ Details: siehe Kapitel 27 (Tool-Profil Anatomie)


---

## 27. TOOL-PROFIL ANATOMIE — 8 ZONEN (v1.0)

### Psychologisches Ziel
Verantwortungsabnahme durch Information.
Der Behördenmitarbeiter verlässt das Profil mit dem Gefühl:
„Ich bin nicht allein. Andere haben das gemacht. Ich weiß mit wem ich spreche."

---

### ZONE 1 — Hero / Erster Eindruck
*„Bin ich hier richtig?"*
- Logo + Name des Tools
- Ein Satz (max. 150 Zeichen): Was, für wen, warum relevant
- „Verifiziert von Amtshelden"-Badge
- Kategorie-Tag
- Amtshelden-Urteil: 2–3 Sätze redaktionell, aus Behördenperspektive
  → Nicht vom Anbieter — von Amtshelden geschrieben

### ZONE 2 — Passt das zu uns?
*„Für meinen Kontext?"*
- Für welche Behördengröße (z.B. Kommunen unter 20.000 EW)
- Für welchen Behördentyp (Kämmerei / Ordnungsamt / Bürgerservice)
- **„Nicht geeignet für:"** — ehrliche Einschränkung
  → Das schafft mehr Vertrauen als Vollständigkeit

### ZONE 3 — Implementierung
*„Was kommt auf uns zu?"*
- Typische Implementierungsdauer (z.B. „6–12 Wochen")
- Was braucht die Behörde (z.B. „1 IT-Ansprechpartner, 2–3 Std./Woche")
- Was stellt der Anbieter (Onboarding, Schulung, Support)
- **Was kann schiefgehen — und wie wurde es gelöst?**
  → Der mutigste und vertrauensbildendste Teil

### ZONE 4 — Erfahrungen anderer Behörden
*„Andere haben das geschafft"*
- 2–3 Erfahrungsberichte: Name, Ort, Typ, Einwohnerzahl
- Ehrlich, kein Marketing-Zitat
  z.B. „Die Einführung hat 3 Monate länger gedauert als geplant,
  aber der Support hat das gut aufgefangen."
- Optional: kurzes Video-Gespräch zwischen Behördenmitarbeitern

### ZONE 5 — DSGVO & Compliance
*„Ist das rechtlich sauber?"*
- DSGVO-Status: konform / in Prüfung / mit Einschränkungen
- Serverstandort: Deutschland / EU / International
- BSI-Zertifizierungen
- Vergabe-Eignung: öffentliche Ausschreibung möglich (ja/nein)

### ZONE 6 — Dein Ansprechpartner
*„Ich weiß mit wem ich es zu tun habe"*
- Foto, Name, Position
- Persönliche Aussage (2 Sätze, menschlich, nicht werblich)
- Erreichbarkeit + Reaktionszeit
→ Das Gesicht hinter dem Tool — entscheidet ob jemand anfrägt

### ZONE 7 — Vergleich & Alternativen
*„Supertools denkt mit — nicht nur für einen Anbieter"*
- „Auch interessant für deinen Fall:" → 2–3 Alternativen
- Kurze Unterscheidung: „Wenn du X bevorzugst, schau dir Y an"
→ Radikal ehrlich — genau deshalb vertrauensbildend

### ZONE 8 — Nächster Schritt
*„Niedrigschwelliger Einstieg — keine Kaufentscheidung"*
- Primär: „Unverbindlich anfragen" → läuft über Amtshelden
- Sekundär: „Ähnliche Tools ansehen"
- Tertiär: „Zum Wissensbereich: Wie läuft eine Software-Einführung?"

---

### Redaktionelle Prinzipien
1. Amtshelden schreibt — nicht der Anbieter
2. Ehrlichkeit über Vollständigkeit
3. Konkret statt allgemein (welche Behörde, welche Größe, welcher Mensch)
4. Menschliche Sprache — kein Behördendeutsch, kein Technik-Jargon
5. Das Amtshelden-Urteil ist das Herzstück

---

### Offene Fragen
- Wie werden Erfahrungsberichte gesammelt und verifiziert?
- Gibt es ein Bewertungssystem (Sterne) oder nur redaktionelle Einschätzungen?
- Wie aktuell werden Profile gehalten?
- Mobile-Reihenfolge der Zonen?
- Welche Zone bekommt mehr Platz?


---

## 28. KI-BILDKONZEPT & PROMPT-VORLAGEN (verbindlich für alle Fotocontainer)

### Grundsatz
Supertools nutzt ausschließlich KI-generierte Bilder — keine Stock-Fotografie.
Jedes Bild muss das Gefühl erzeugen: echte Menschen, echter Kontext, keine Werbeästhetik.
Empfohlene Tools: Midjourney v6, DALL-E 3, Adobe Firefly.

---

### BILD 1 — Hero-Bild pro Tool-Profil

Zweck: Das Thema des Tools menschlich einfassen. Zwei Menschen in einem
Verwaltungskontext die miteinander arbeiten — kein Produkt, keine Software.

**Prompt-Vorlage (Midjourney):**
```
Two German municipal employees in a bright modern office, reviewing documents together,
warm natural light through large windows, one pointing at a laptop screen,
professional but approachable, real candid moment, editorial photography style,
no stock photo feel, soft depth of field, muted warm tones --ar 16:9 --v 6 --style raw
```

**Varianten je Kategorie:**
- E-Akte/DMS: „reviewing paper documents transitioning to digital tablets"
- HR-Software: „HR manager and employee in a relaxed one-on-one meeting"
- Bürgerportal: „municipal employee helping a citizen at a service counter"
- Videokonferenz: „small team in a hybrid meeting, laptop and screen"
- Finanz/Kämmerei: „accountant at desk with dual monitors, focused expression"

**Technische Anfos:**
- Format: 1200×675px (16:9), WebP, max. 200KB
- Immer mit dunklem Overlay versehen (rgba 0,0,0, 0.45) für Lesbarkeit der Headline
- Dateibenennung: `hero_[toolname]_[kategorie].webp`

---

### BILD 2 — Ansprechpartner Portrait

Zweck: Den konkreten Menschen beim Anbieter zeigen. Professionell aber warm —
kein LinkedIn-Profilbild-Feeling, eher ein gut gemachtes Editorial-Portrait.

**Prompt-Vorlage Männlich:**
```
Professional portrait of a German man in his late 30s to mid 40s, business casual attire
(no tie), warm genuine smile, neutral light grey or warm white background,
soft studio lighting, slight head tilt, approachable and trustworthy expression,
photorealistic, editorial portrait style, sharp focus on eyes --ar 1:1 --v 6 --style raw
```

**Prompt-Vorlage Weiblich:**
```
Professional portrait of a German woman in her late 30s to mid 40s, business casual attire,
warm genuine smile, neutral light grey or warm white background,
soft studio lighting, approachable and trustworthy expression,
photorealistic, editorial portrait style, sharp focus on eyes --ar 1:1 --v 6 --style raw
```

**Technische Anfos:**
- Format: 400×400px, quadratisch, WebP
- Wird mit border-radius: 50% als Kreis dargestellt
- Kein harter Hintergrund — immer soft/neutral
- Dateibenennung: `person_[vorname]_[nachname].webp`

---

### BILD 3 — Erfahrungsbericht Avatar

Zweck: Die zitierende Person aus der Behörde glaubwürdig darstellen.
Weniger professionell als der Ansprechpartner — mehr „Kollegin aus dem Amt".

**Prompt-Vorlage:**
```
Candid portrait of a German public servant, early to late 40s, warm and honest expression,
office environment slightly blurred in background, natural window light,
slightly informal — no suit, more like a cardigan or blouse,
trustworthy face, photorealistic --ar 1:1 --v 6 --style raw
```

**Technische Anfos:**
- Format: 88×88px (wird klein dargestellt), WebP
- Dateibenennung: `review_[behoerde]_[kuerzel].webp`

---

### BILD 4 — Video-Thumbnail

Zweck: Ein Gespräch zwischen zwei Verwaltungsmenschen suggerieren.
Das Thumbnail soll echte Gesprächsatmosphäre zeigen, nicht Werbung.

**Prompt-Vorlage:**
```
Two German municipal employees having an informal conversation, sitting across a table,
one is speaking and gesturing naturally, the other listening with engaged expression,
modern bright office, warm afternoon light, editorial documentary style,
no eye contact with camera, authentic candid moment --ar 16:9 --v 6 --style raw
```

**Technische Anfos:**
- Format: 900×506px (16:9), WebP
- Wird mit dunklem Overlay und Play-Button überlagert
- Dateibenennung: `video_thumb_[toolname].webp`

---

### ALLGEMEINE BILDREGELN

**Immer:**
- Echte, menschliche Ausdrücke — kein gezwungenes Lächeln
- Deutsche/europäische Physiognomie und Kleidung
- Warme, natürliche Lichtstimmung
- Muted, erdige Farbtöne — passend zum Cream/Grün Design-System
- WebP-Format für Performance

**Nie:**
- Stock-Foto-Ästhetik (zu perfekt, zu gestellt)
- Buntes, knalliges Licht
- Anzug und Krawatte (zu formal für Verwaltungskontext)
- Diverse Diversity-Klischees (natürliche Mischung stattdessen)
- Logos, Texte oder erkennbare Software-UIs im Bild

---

### DATEISTRUKTUR IM REPO

```
/assets/
  /images/
    /hero/          → Hero-Bilder pro Profil
    /portraits/     → Ansprechpartner-Portraits
    /reviews/       → Erfahrungsbericht-Avatare
    /video-thumbs/  → Video-Thumbnails
```


---

## 29. PROFIL-GRUNDSÄTZE — WAS SUPERTOOLS TUT UND NICHT TUT

### Grundsatz: Informieren, nicht vergleichen

Supertools listet Informationen — wir setzen sie nicht ins Verhältnis.
Es gibt kein Amtshelden-Ranking, keine Sternebewertung durch Amtshelden,
keinen direkten Produktvergleich zwischen zwei Tools.

**Was wir tun:**
- Informationen des Anbieters aufbereiten und kuratieren
- Aus Behördenperspektive einordnen (für wen besonders geeignet)
- Erfahrungsberichte anderer Behörden wiedergeben
- DSGVO-Status, Serverstandort, Zertifizierungen auflisten
- Implementierungsaufwand transparent machen
- Alternativen nennen — ohne Wertung welche besser ist

**Was wir nicht tun:**
- Produkte gegeneinander bewerten oder ranken
- Sterne vergeben oder Scores berechnen
- Aussagen machen die der Anbieter nicht selbst getroffen hat
- Vergleichstabellen mit Wertungsurteilen erstellen

---

## 30. AMTSHELDEN PROFIL-CARD — STANDARDISIERTES FORMAT

### Das Konzept: Mobilfunk-ähnliche Faktentabelle

Analog zu Mobilfunkanbietern die ihre Tarife in klaren Faktentabellen darstellen —
ohne zu bewerten, nur zu informieren. Der Nutzer entscheidet selbst.

### Die Profil-Card: 6 feste Informationsblöcke

**Block 1 — Steckbrief (immer oben)**
Kategorie · Anbieter · Hauptsitz · Gründungsjahr · Mitarbeiterzahl

**Block 2 — Für wen geeignet (nach eigener Aussage / Amtshelden-Einschätzung)**
Behördentyp · Gemeindegröße · Betriebsmodell (Cloud/OnPremise/Hybrid)

**Block 3 — Compliance & Sicherheit**
DSGVO · Serverstandort · BSI-Zertifizierung · Vergabe-Eignung

**Block 4 — Implementierung**
Typische Dauer · Interner Aufwand · Was der Anbieter stellt · Preisrahmen

**Block 5 — Leistungsmerkmale (nach Anbieterangabe)**
Welche Module/Funktionen · Integrationen · Besonderheiten
→ Keine Bewertung — nur Auflistung was der Anbieter angibt

**Block 6 — Referenzen**
Welche Behördentypen bereits im Einsatz · Konkrete Nennungen wenn verfügbar

### Was die Card nicht enthält
- Keine Sternebewertung
- Kein Amtshelden-Score
- Kein "Besser als" oder "Schlechter als"
- Keine Empfehlungsstärke (1–10 o.ä.)

Das Amtshelden-Urteil ist eine redaktionelle Einschätzung in Prosaform —
kein numerischer Wert, kein Ranking.


---

## 31. PROFIL-STUFEN — BASIS vs. ADD-ON (PRODUKTLOGIK)

### Grundprinzip: Crawler-Basis zuerst, Anreicherung als Add-on

Die ersten 300 Profile entstehen per Crawler — automatisiert aus öffentlich
verfügbaren Quellen. Das ist der Ausgangspunkt. Alles Persönliche, Individuelle
und Redaktionelle kommt danach als buchbares Add-on.

---

### STUFE 1 — Basis-Profil (Crawler-generiert, kostenlos)

Was automatisch befüllt wird:
- Firmenname, Logo, Hauptsitz, Gründungsjahr
- Kategorie & Unterkategorien
- Betriebsmodell (Cloud/OnPremise/Hybrid) — aus Website
- DSGVO-Status, Serverstandort — aus Website/Impressum
- Leistungsmerkmale — aus Website gescraped
- Referenz-Behördentypen — aus Website gescraped
- Kontaktmöglichkeit (Website-URL / allgemeine Kontaktseite)

Was NICHT im Basis-Profil enthalten ist:
- Persönlicher Ansprechpartner mit Foto
- Kundenstimmen / Quotes
- Cases / Implementierungserfahrungen
- Amtshelden-Urteil (redaktionell)
- Implementierungsdetails (Dauer, Aufwand)
- Individuelle Beschreibung aus Behördenperspektive

---

### STUFE 2 — Verified Listing (bezahlt, 199–299 EUR/Mo)

Zusätzlich zum Basis-Profil:
- Verifiziert-Badge
- Kontaktmöglichkeit oben in der Highlight-Leiste (Name, E-Mail, Tel)
- Erweitertes Profil (Bilder, detailliertere Beschreibung)
- Analytics-Dashboard
- Direkter Anfragen-Eingang

---

### STUFE 3 — Add-ons (einzeln buchbar)

Jedes dieser Elemente ist ein eigenständiges Add-on:
- Persönlicher Ansprechpartner mit KI-Foto + Zitat (einmalig 500–1.000 EUR)
- Amtshelden-Urteil (redaktionell von Amtshelden verfasst)
- Implementierungsdetails (Dauer, Aufwand, was der Anbieter stellt)
- Case Study / Implementierungsfall (statt Kundenstimmen — tiefer Einblick)
- Video-Gespräch / Thumbnail

---

### CASES statt KUNDENSTIMMEN (für später)

Supertools präsentiert Cases — keine Kundenstimmen.
Ein Case zeigt: Welche Behörde? Welches Problem? Wie wurde es gelöst?
Was hat funktioniert, was nicht? Wie lange hat es gedauert?

Das ist tiefer, glaubwürdiger und informativer als ein Zitat.
Cases sind ein Premium-Add-on — aufwändig zu produzieren, hochwertig in der Wirkung.

→ Kundenstimmen / Quotes: nicht im Standard-Profil
→ Cases: buchbares Add-on für später (Phase 2+)

---

### HIGHLIGHT-LEISTE (oben rechts im Profil)

Die Highlight-Leiste ist immer sichtbar — auch im Basis-Profil.
Sie enthält:
- DSGVO-Status (immer)
- Serverstandort (immer)
- BSI-Zertifizierung (immer)
- Vergabe-Eignung (immer)
- Kontaktmöglichkeit (ab Verified Listing: Name + E-Mail/Tel/URL)
