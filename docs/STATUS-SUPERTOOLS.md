# Supertools — Status & nächste Schritte

**Stand:** 28. Juni 2026 · **Vorschau (intern, noch nicht öffentlich live):** https://amtshelden-supertools.vercel.app
**Für:** Christian & Julia · **Kurz:** Wo Supertools heute steht und was bis zur finalen Version fehlt.

---

## Wo wir stehen — in einem Satz

Supertools ist als **kuratiertes Software-Verzeichnis für Behörden** als **interne Vorschau** (Arbeitsstand) online abrufbar — **noch nicht öffentlich live**, wir nutzen den Link, um den Aufbau gemeinsam zu prüfen. Startseite, vier Themenfelder, Kategorie-Seiten mit Tool-Listen, Tool-Profile, Anbieter- und Wissensbereich stehen. Inhaltlich arbeiten wir gerade mit einer **breiten Arbeitsbasis aus 59 echten Anbietern** — die **finale, redaktionell fixierte Tool-Liste** ist der nächste große Schritt.

---

## ✅ Was steht

### Fundament & Design
- Eigenständige Website (Next.js), **online erreichbar als interne Vorschau** (Vercel, Auto-Deploy bei jeder Änderung) — noch nicht öffentlich beworben.
- Klares Design-System: Marken-Grün, Signal-Gelb, Magazin-Typografie, „Bento"-Bildsprache.
- **Bewegung/Lebendigkeit:** sanfte Scroll-Einblendungen + Parallax über die ganze Startseite.

### Startseite
- Immersiver Hero mit Tool-Finder.
- „Womit Behörden zu uns kommen" (Praxis-Ausgangslagen).
- **Tool im Fokus** mit einem **echten** Anbieter (Eye-Able, digitale Barrierefreiheit) — ehrlich eingeordnet, ohne erfundenes Urteil.
- **Vier Themenfelder** als oberste Struktur (kompakte Spaltenkarten).
- **Tool-Teaser**: fünf echte Tools quer durch die Bereiche, mit Logo.
- Redaktionelle Schwerpunkte (Magazin), Problem-Einstieg, „Methodik & Haltung", **Amtshelden-Community-Block** (Trust, Instagram/LinkedIn), Newsletter.

### Struktur & Tools
- **4 Themenfelder** + Detailseiten; **6 Kategorien** mit **einer gemeinsamen Tool-Liste** (Suche, Filter, Sortierung) — **echte Logos** in der Liste.
- **Tool-Profile:** vollwertige redaktionelle Profil-Vorlage (8 Zonen) **plus** ein **Basis-Profil** für jedes Verzeichnis-Tool (Logo, Pitch, Compliance-Signale, „geprüft am", Material-Shortlinks, Video nur als Vorschau-Link).
- **59 echte Anbieter** aus dem Crawl als Arbeitsbasis eingepflegt — öffentlich als **kuratiertes Verzeichnis** dargestellt (kein „Crawler"-Wording nach außen).

### Vertrauen (USP)
- **Kein Ranking, keine Sterne, kein Pay-to-Top** — konsequent umgesetzt.
- „Zuletzt geprüft am"-Stempel überall grün hervorgehoben.
- Transparenz-Muster „was wir noch nicht geprüft haben" + **Korrektur-Funktion** auf Profilen.

### Conversion & Seiten
- **Anbieter-Landingpage** (/anbieter) inkl. „Unternehmen eintragen", Anfrage- & Kontaktstrecke.
- **„Tool vorschlagen"** (Behörde/Anbieter).
- **Über**-Seite (Amtshelden-Brücke), **Wissen & Magazin** (Artikel zweispaltig mit Sidebar).
- Impressum & Datenschutz (als Entwurf, gelb markierte Pflichtfelder).
- Chat-Widget, Newsletter-CTA.

---

## ⬜ Was noch fehlt (nächste Schritte)

### Inhalt — der wichtigste Block
1. **Finale Tool-Liste festlegen.** Die 59 sind eine breite Arbeitsbasis, **keine finale Empfehlung**. Zu klären: schwache Signale raus, Dubletten zusammenführen, unklare Produktzuschnitte schärfen, 13 technisch nicht sauber gecrawlte Anbieter nachrecherchieren.
2. **Fiktive Platzhalter-Tools entfernen** (Aktima, BiebriDocs … aus der frühen Entwicklung) — sobald die echte Liste steht.
3. **Vollständige redaktionelle Profile** für die wichtigsten echten Tools (aktuell nur Basis-Profile).
4. **Eigene Kategorie für IT/Sicherheit/Infrastruktur** (liegt vorläufig unter „E-Akte").
5. **Echte Referenzen/Stimmen** statt der aktuellen Platzhalter-Personas (im Code klar als fiktiv markiert).

### Redaktion, Ton & Review
- **Review durch Julia & Christian:** Seitenaufbau und Informationssammlung noch einmal challengen — stimmt die Struktur, fehlt etwas, ist die Auswahl richtig?
- **Tool-Informationsmodell festlegen:** Welche Infos bilden wir je Tool verbindlich ab (über Pitch + Compliance hinaus)? Einheitliches Feld-Set definieren.
- **Editorialer Ton — kuratierter, weniger faktisch:** Die Tool-Darstellung soll stärker unsere eigene, eingeordnete Stimme tragen (nicht nur trockene Fakten). Hier wollen wir besser werden — das ist der Kern unseres „kein Verzeichnis, sondern Magazin"-Versprechens.

### Technik & Recht
6. **Logos in höherer Qualität** (aktuell Domain-Favicons).
7. **Formulare/Newsletter scharf schalten** (aktuell ohne echten Versand/Backend).
8. **CMS (Payload) anbinden** — bisher alles Mock-Daten.
9. **Rechtstexte anwaltlich prüfen** (Impressum/Datenschutz).
10. **Bildnachweise** (einige Stadt-/Motivbilder sind Wikimedia-Commons, CC-Lizenz) vor finalem Livegang ordnen.

### Strategisch / offen für eure Entscheidung
11. **Gütesiegel / Förderung BMDS:** Platzhalter ist angelegt. Offen ist die **genaue Form** (Förderung, Partnerschaft oder Gütesiegel des Bundesministeriums für Digitales und Staatsmodernisierung) — geht **erst live, wenn offiziell bestätigt + Logo-Nutzung freigegeben** ist.
12. **Monetarisierung** (Verified-/Partner-Pakete): konzeptionell da, technisch noch nicht gebaut.
13. SEO/Analytics, eigene Domain.

---

## 💼 Geschäftsmodell & Go-to-Market — noch zu definieren / aufzusetzen

*(aus dem Business Case, README Kap. 4 — konzeptionell da, operativ/technisch offen)*

### Payment & Pakete — Definition + finale Preise festlegen
Was bei uns buchbar sein soll, muss final entschieden und dann gebaut werden:
- **Basis-Eintrag** — kostenlos, kuratiert *(inhaltlich steht das schon)*.
- **Verified Listing** — 299–499 €/Monat: erweitertes Profil (Screenshots, Videos, Cases), „Verifiziert von Amtshelden"-Badge, direkter Anfragen-Eingang.
- **Lead-Vermittlung** — 150–500 € pro qualifiziertem Lead bzw. 1–3 % erfolgsbasiert.
- **Sponsored Content** (klar gekennzeichnet) — Tool-Feature/Case 1.500–3.000 €, Newsletter-Integration 500–1.000 €/Ausgabe, Webinar 800–2.000 €.
- **Später:** Vendor-Dashboard (SaaS 99–299 €/Mo), Procurement-Tool für Behörden, „State of GovTech"-Report.
- **To do:** Welche Pakete zum Start? Preise festklopfen. Buchung & Abrechnung technisch umsetzen (an CMS/Backend gekoppelt).

### Newsletter — aufsetzen
- **Eigener Supertools-Newsletter** (Versand-Tool, Anmeldung, Double-Opt-in). Aktuell nur Anmelde-CTA auf der Seite, **kein echter Versand**.
- Zusätzlich feste **Supertools-Strecke im bestehenden Amtshelden-Newsletter** (Phase-1-Reichweite, ~12k Abonnent:innen).

### Social Media — Profile eröffnen
- **Eigene Profile für Amtshelden Supertools** (Instagram + LinkedIn) anlegen. Aktuell verweist der Community-Block auf die **Amtshelden-Hauptprofile** — eigene Supertools-Kanäle fehlen.

### Bildmaterial & Fotos
- Die generierten **KI-Motive nochmal prüfen und gezielt nachschießen/nachbessern** (Qualität, Konsistenz, ggf. neue Motive).
- **Neue Fotos von Julia & Christian** (aktuell ein Foto von der Amtshelden-Seite) — für Über-Seite & Community-Block.
- **Bildnachweise** der Commons-Stadtbilder vor finalem Livegang ordnen.

### Reichweite / Go-to-Market
- **100+ Tools** als Zielgröße (aktuell 59 als Arbeitsbasis).
- **„Tool des Monats"** / redaktionelle Features als wiederkehrendes Format etablieren.

---

## 🔗 Links zur Vorschau (intern — zum Durchklicken)

| Seite | Link |
|---|---|
| Startseite | https://amtshelden-supertools.vercel.app/ |
| Themenfelder (Übersicht) | https://amtshelden-supertools.vercel.app/themenfelder |
| Themenfeld-Beispiel | https://amtshelden-supertools.vercel.app/themenfelder/transformation-ki |
| Kategorien | https://amtshelden-supertools.vercel.app/kategorien |
| Kategorie mit vielen Tools | https://amtshelden-supertools.vercel.app/kategorien/kommunikation-zusammenarbeit |
| Tool-Profil (echt) | https://amtshelden-supertools.vercel.app/tools/eye-able-web-inclusion-gmbh |
| Tool-Profil (redakt. Vorlage) | https://amtshelden-supertools.vercel.app/tools/vivioakte |
| Wissen & Magazin | https://amtshelden-supertools.vercel.app/wissen |
| Über uns | https://amtshelden-supertools.vercel.app/ueber |
| Anbieter werden | https://amtshelden-supertools.vercel.app/anbieter |
| Tool vorschlagen | https://amtshelden-supertools.vercel.app/vorschlagen |
| Kontakt | https://amtshelden-supertools.vercel.app/kontakt |

---

## Wichtig einzuordnen

Die Seite wirkt schon **voll und realistisch** — das ist Absicht, damit wir Layout, Dichte und Profile mit echten Daten beurteilen können. Sie ist aber **noch nicht öffentlich live**, sondern unser **Arbeitsstand / interne Vorschau**: die Tool-Auswahl ist bewusst breit, einzelne Profile sind Basis-Einträge, Formulare sind noch nicht scharf. Den Link bekommt vorerst nur das Team. Der nächste Meilenstein ist die **finale, redaktionell kuratierte Tool-Liste** — danach Profile vertiefen und Formulare/CMS produktiv schalten.
