---
name: list-ui-design
description: Verbindliche UX/UI-Prinzipien für Listen-Darstellungen in Webprojekten — Item-Höhe, Dichte, Hierarchie, Sortierung, Suche, gleichberechtigte Darstellung ohne Ranking-Anmutung. Wird bei jedem Listing/Verzeichnis/Karten-Layout angewendet (Tool-Verzeichnis, Artikel-Liste, Kategorie-Liste, Suchergebnisse, Such-Filter-Resultate).
---

# Listen-UI-Design — verbindliche Prinzipien

Diese Regeln gelten für alle Listen-, Verzeichnis- und Tabellen-Layouts in
Webprojekten. Sie sind das Ergebnis aus Material Design Guidelines, dem
Justinmind-Listen-Artikel (https://www.justinmind.com/de/ui-design/liste),
OMR-Reviews-Logik und konkreter Anwendung im Amtshelden-Supertools-Projekt
(Mai 2026).

## Grundsatz

> **Eine Liste ist keine Empfehlung.** Sie ist eine geordnete Repräsentation
> von Optionen. Sortierung und Hierarchie müssen transparent sein. Sterne,
> Scores und „Top X"-Listen sind verboten, wenn das Geschäftsmodell ehrliche
> Einordnung (statt Bewertung) vorsieht.

---

## 1. Listen-Typen — wann welcher

### Single-Line (~48–56 px Höhe)
- Avatar/Icon + 1 Primär-Text (+ optional Meta rechts)
- **Verwenden für:** sehr lange, vertraute Listen (Kontakte, Songs, Tags)
- **Nicht verwenden für:** Tool-Verzeichnisse — der User braucht Kontext

### Two-Line (~72–90 px Höhe) ★ Default für Verzeichnisse
- Avatar/Mark (40–48 px) + Primär (fett) + Sekundär (gedämpft) + Meta rechts
- Sekundärzeile mit `line-clamp-2` für konsistente Höhe
- **Verwenden für:** Software-Listings, Artikel-Listen mit Lead, Suchergebnisse
- **Im Viewport:** 7–8 Items bei 1080 p Browser-Höhe

### Three-Line (~110–140 px Höhe)
- Wie Two-Line + zusätzliche Meta-Zeile darunter
- Material Design: „nicht mehr als drei Zeilen"
- **Verwenden für:** Listen, wo der dritte Faktor entscheidend ist (z. B. Preis-Tag bei Hotels)

### Card-Grid (Tile-Layout, 240–300 px Höhe)
- Mehrere Spalten mit visuellen Karten
- **Verwenden für:** Magazin-Übersicht, Galerien, Artikel mit prominentem Cover
- **Nicht verwenden für:** Lange Verzeichnisse — verschwendet Vertikalraum,
  reduziert Items im Viewport drastisch

---

## 2. Item-Anatomie (Two-Line Default)

```
┌──┬───────────────────────────────────────────┬──────────────────┬─┐
│MA│ Primär-Text · Status-Badge                │ Meta (rechtsbündig)│
│RK│ Sekundär (Provider · Pitch, line-clamp-2)│ Quick-Facts · Pills│ →│
└──┴───────────────────────────────────────────┴──────────────────┴─┘
   ↑ 44 px      ↑ flex-1                         ↑ ~220 px           ↑
   Avatar       Hauptinfo                        Meta                Chevron
```

**Hierarchie:**
1. **Mark/Avatar** — visueller Anker (40–48 px, einheitlich)
2. **Primär** — Titel, fett, Serif oder Sans-Display (1 Zeile)
3. **Sekundär** — Beschreibung, kleiner, gedämpft (line-clamp-2)
4. **Meta** — Quick-Facts + Status (rechtsbündig, kleiner)
5. **Chevron / Aktion** — klare Klick-Affordanz (16–20 px)

**Grid-CSS:**
```tsx
className="grid grid-cols-[44px_minmax(0,1fr)_18px] sm:grid-cols-[44px_minmax(0,1fr)_220px_18px] items-center gap-x-4 gap-y-2"
```

---

## 3. Best Practices für lange Listen (100 + Items)

| Maßnahme | Wann |
|---|---|
| **Filter-Sidebar** | Immer ab > 20 Items — Drittel der Optionen muss filterbar sein |
| **Suche-Input** | Immer ab > 30 Items — Volltextsuche über Name + Beschreibung |
| **Sortier-Dropdown** | Immer ab > 50 Items — mit transparentem Default |
| **Buchstaben-Anker** | Nur bei A-Z-Sortierung als Section-Header, nicht als Sticky-Index |
| **Pagination / Infinite Scroll** | Erst ab 200 + Items, vorher direkt rendern |
| **Counter** | Immer („X Tools gefunden · sortiert nach Y") |
| **Reset-Button** | Wenn ≥ 1 Filter aktiv |

---

## 4. Sortierung ohne Ranking-Anmutung

Wenn das Produkt KEINE Bewertungen, Scores, „Top"-Listen anbietet, MUSS die
Default-Sortierung transparent sein.

### Empfohlene Default-Sortierung — Auswahl je Kontext

| Kontext | Default | Warum |
|---|---|---|
| Redaktionelles Verzeichnis | **„Redaktionell"** (handsortierte Reihenfolge) | Ehrlich: jemand hat sortiert, das ist transparent |
| Frische Inhalte (Magazin, Blog) | **„Neueste zuerst"** | Standard, kein Wertungs-Vorwurf |
| Symmetrische Auswahl | **„Zufällig"** (deterministisch pro Sitzung) | Maximal egalitär |
| Bekannter Suchbegriff | **„Relevanz"** (mit Score) | Kontext-getrieben |

### Sortier-Dropdown-Optionen

Mindestens:
- Redaktionell / Editorial / Neueste (Default)
- A–Z
- Z–A
- Zufällig

Optional:
- Preis aufsteigend / absteigend (bei kommerziellen Listen)
- Datum neueste / älteste

### Transparenz-Note

Bei „Redaktionell"-Default eine kleine italic-Note unter der Liste:

> *„Reihenfolge: Redaktionell — kuratiert von der Redaktion, kein Ranking,
> kein Pay-to-Top."*

---

## 5. Gleichberechtigte Darstellung

| Risiko | Maßnahme |
|---|---|
| Position oben wirkt prominenter | Default „Zufällig" anbieten; bei A-Z: Buchstaben-Anker davor |
| Verified/Partner-Tools wirken größer | **Einheitliche Item-Höhe** — Verified nur als kleines ✓-Pill |
| Eye-Catcher-Bilder dominieren | Keine Hero-Bilder pro Item in Listen-Ansicht — nur farbige 40–48 px Marks |
| Mehr Inhalt = mehr Aufmerksamkeit | **Line-clamp auf Sekundär-Text** (max. 2 Zeilen) — alle Items gleich hoch |
| Tier-Indikator als visuelle Hierarchie | Tier nur als textuelles Mini-Label, **keine farbigen Card-Hintergründe** |

---

## 6. Typografie für Listen

| Element | Größe | Weight | Family |
|---|---|---|---|
| Primär (Titel) | 17–20 px | bold | Serif (Display) oder Sans-Display |
| Sekundär | 13–14 px | regular | Sans (Body) |
| Meta | 11–12 px | regular | Sans (UI) |
| Eyebrow / Status-Badge | 9–10 px | bold uppercase | Sans (UI) mit tracking 0.14–0.18 em |
| Mark | 11–12 px | extrabold | Sans (UI), tracking tight |

**Line-heights** für gedrängte Listen:
- Primär: `leading-tight` (1.2)
- Sekundär: `leading-[1.55]`
- Meta: `leading-tight`

---

## 7. Visuelle Hierarchie

1. **Avatar/Mark links** — schweres visuelles Gewicht durch Farbe/Größe
2. **Primär-Text** — fett, dunkel, gut lesbar
3. **Sekundär-Text** — gedämpfter Ton (`text-mid` statt `text-dark`)
4. **Meta-Spalte rechtsbündig** — wirkt sekundär durch Position
5. **Chevron** — neutral grau, klar als „Klick mich"

**Weißraum:**
- Vertikale Padding pro Item: 16–20 px (py-4 bis py-5)
- Horizontaler Gap zwischen Spalten: 16 px (gap-x-4)
- Trennlinien zwischen Items: 1 px `border-border` (hairline)

---

## 8. Interaktion & States

| State | Behandlung |
|---|---|
| Default | Borders sichtbar, neutrale Farben |
| Hover (Item) | `bg-cream/50` oder `bg-muted/30`, Chevron translatet 2 px rechts |
| Hover (Action) | Brand-Farbe |
| Focus | Outline ring (2 px, brand/30) |
| Selected (Filter) | Brand-Hintergrund, Checkmark |
| Loading | Skeleton mit Pulse-Animation, identische Item-Höhe |
| Empty | Mittiger Block mit Cormorant-Italic-Headline + Reset-CTA |

---

## 9. Mobile-Anpassung

Auf < `sm` (640 px):
- Meta-Spalte (Quick-Facts) ausblenden (`hidden sm:flex`)
- Layout reduziert auf: Mark + Primär + Sekundär + Chevron
- Item-Höhe schrumpft auf ~60–70 px
- Filter werden zu einem Drawer/Bottom-Sheet (nicht Sidebar)
- Sortier-Dropdown bleibt sichtbar

---

## 10. Anti-Patterns

🚫 **Niemals:**
- Sterne-Bewertungen ohne echte User-Reviews
- „Top X"-Listen ohne transparente Methodik
- Cards mit unterschiedlichen Höhen je Premium-Status
- Stark farbige Hintergründe für „Featured"-Items (Banner-Anmutung)
- Hero-Bilder pro Item in einer langen Liste
- Glassmorphismus-Cards
- Animations beim Filter-Wechsel (Layout-Shift)
- Sortier-Default „Neueste" mit Tools, die fast nie hinzugefügt werden (täuscht Aktualität vor)
- Pay-to-Top ohne klare Kennzeichnung

✅ **Stattdessen:**
- Redaktionelle Einordnung in textueller Form
- Transparente Sortier-Optionen
- Einheitliche Item-Höhen
- Gedämpfte, dezente Status-Pills
- Farbige Marks (40–48 px Quadrat) als visueller Anker
- Editorial-Trennlinien
- Sofortiges, JS-loses Filter-Update (kein Loading-State)

---

## 11. Implementierungs-Beispiel (React + Tailwind)

```tsx
// ToolCard "row"-Variante — Two-Line Listenzeile
<Link
  href={href}
  className="group grid grid-cols-[44px_minmax(0,1fr)_18px] sm:grid-cols-[44px_minmax(0,1fr)_220px_18px] items-center gap-x-4 gap-y-2 border-b border-border px-2 py-5 transition-colors hover:bg-cream/50"
>
  <span className="h-11 w-11 rounded-lg flex items-center justify-center text-white font-ui text-[12px] font-extrabold" style={{ background: markBg }}>
    {mark}
  </span>

  <div className="min-w-0">
    <div className="flex items-center gap-2 flex-wrap">
      <h3 className="font-serif text-[18px] font-bold leading-tight text-dark group-hover:text-brand-dark">
        {name}
      </h3>
      {verified && <Pill>✓ Verifiziert</Pill>}
    </div>
    <p className="font-sans text-[13.5px] leading-[1.55] text-mid line-clamp-2 mt-0.5">
      <span className="text-soft">{provider} · </span>{pitch}
    </p>
  </div>

  <div className="hidden sm:flex flex-col items-end gap-1.5">
    <span className="font-ui text-[11.5px]">{quickFacts}</span>
    <div className="flex gap-1 flex-wrap">{compliancePills}</div>
  </div>

  <ChevronRight size={18} className="text-soft group-hover:translate-x-0.5 group-hover:text-brand transition-all" />
</Link>
```

---

## Quellen

- Material Design — Lists (https://m3.material.io/components/lists)
- Justinmind — UI-Design: Listen (https://www.justinmind.com/de/ui-design/liste)
- OMR Reviews — Software-Verzeichnis-Patterns
- Eigene Anwendung: Amtshelden Supertools v0.12 (Mai 2026)
