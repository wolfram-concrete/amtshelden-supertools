# CHANGELOG — Amtshelden Supertools

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

