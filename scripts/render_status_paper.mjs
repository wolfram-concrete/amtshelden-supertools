import fs from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const outDir = path.join(root, "docs/status-quo-2026-08-14");
const assetDir = path.join(outDir, "assets");
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const baseUrl = "http://localhost:3000";

const pages = [
  { path: "/", file: "website-home.png", label: "Startseite" },
  {
    path: "/kategorien/kommunikation-zusammenarbeit",
    file: "website-category.png",
    label: "Kategorie / Tool-Liste",
  },
  {
    path: "/tools/eye-able-web-inclusion-gmbh",
    file: "website-tool-profile.png",
    label: "Tool-Profil",
  },
  { path: "/anbieter", file: "website-vendor.png", label: "Anbieter-Seite" },
];

function rel(file) {
  return `assets/${file}`;
}

function tag(text, tone = "neutral") {
  return `<span class="tag tag-${tone}">${text}</span>`;
}

function pill(text) {
  return `<span class="pill">${text}</span>`;
}

function col(title, eyebrow, items, tone = "green") {
  return `
    <section class="pillar pillar-${tone}">
      <div class="eyebrow">${eyebrow}</div>
      <h3>${title}</h3>
      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </section>
  `;
}

const html = `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <title>Supertools Status Quo 2026-08-14</title>
  <style>
    @page { size: 16in 9in; margin: 0; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: #e9e4da;
      color: #26231f;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    .page {
      width: 1600px;
      height: 900px;
      overflow: hidden;
      position: relative;
      padding: 54px 62px;
      background:
        linear-gradient(90deg, rgba(13,157,105,.07) 1px, transparent 1px),
        linear-gradient(180deg, rgba(13,157,105,.055) 1px, transparent 1px),
        #f4f0e9;
      background-size: 40px 40px;
      page-break-after: always;
    }
    .page::after {
      content: "";
      position: absolute;
      inset: 22px;
      border: 1px solid rgba(38,35,31,.12);
      pointer-events: none;
    }
    h1, h2, h3, p { margin: 0; }
    h1 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 76px;
      line-height: .95;
      font-weight: 400;
      letter-spacing: -1px;
      max-width: 950px;
    }
    h2 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 42px;
      line-height: 1;
      font-weight: 400;
    }
    h3 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 29px;
      line-height: 1.05;
      font-weight: 400;
      margin-top: 7px;
    }
    .kicker, .eyebrow, .smallcap {
      font-size: 11px;
      letter-spacing: .16em;
      text-transform: uppercase;
      font-weight: 760;
      color: #0b8159;
    }
    .deck {
      margin-top: 22px;
      max-width: 760px;
      font-size: 19px;
      line-height: 1.55;
      color: #5b554c;
    }
    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 30px;
      margin-bottom: 34px;
    }
    .meta {
      width: 360px;
      border-left: 1px solid rgba(38,35,31,.18);
      padding-left: 24px;
      color: #625c53;
      font-size: 14px;
      line-height: 1.55;
    }
    .grid5 {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 14px;
      margin-top: 30px;
    }
    .pillar {
      min-height: 500px;
      border: 1px solid rgba(38,35,31,.12);
      background: rgba(255,255,255,.72);
      border-radius: 18px;
      padding: 20px 18px;
      box-shadow: 0 22px 60px -50px rgba(0,0,0,.45);
    }
    .pillar-green { border-top: 7px solid #0d9d69; }
    .pillar-yellow { border-top: 7px solid #f1c84b; }
    .pillar-dark { border-top: 7px solid #2d2a26; }
    .pillar-blue { border-top: 7px solid #4b7f9d; }
    .pillar-red { border-top: 7px solid #bd6048; }
    ul {
      list-style: none;
      margin: 18px 0 0;
      padding: 0;
      display: grid;
      gap: 11px;
    }
    li {
      position: relative;
      padding-left: 17px;
      font-size: 14px;
      line-height: 1.35;
      color: #4f4941;
    }
    li::before {
      content: "";
      position: absolute;
      left: 0;
      top: .55em;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #0d9d69;
    }
    .ribbon {
      position: absolute;
      right: 62px;
      bottom: 44px;
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .tag, .pill {
      display: inline-flex;
      align-items: center;
      min-height: 27px;
      border-radius: 999px;
      padding: 5px 10px;
      font-size: 11px;
      font-weight: 760;
      letter-spacing: .08em;
      text-transform: uppercase;
      border: 1px solid rgba(13,157,105,.22);
      background: rgba(13,157,105,.08);
      color: #096647;
    }
    .tag-warn { background: rgba(241,200,75,.18); color: #695112; border-color: rgba(241,200,75,.5); }
    .tag-risk { background: rgba(189,96,72,.12); color: #883c2c; border-color: rgba(189,96,72,.3); }
    .tag-dark { background: rgba(45,42,38,.09); color: #2d2a26; border-color: rgba(45,42,38,.22); }
    .screen-grid {
      display: grid;
      grid-template-columns: 1.05fr .95fr;
      grid-template-rows: 1fr 1fr;
      gap: 18px;
      height: 640px;
      margin-top: 28px;
    }
    .shot {
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid rgba(38,35,31,.14);
      background: #fff;
      box-shadow: 0 28px 70px -54px rgba(0,0,0,.6);
      position: relative;
    }
    .shot img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top left;
      display: block;
    }
    .shot .caption {
      position: absolute;
      left: 14px;
      bottom: 14px;
      background: rgba(244,240,233,.94);
      border: 1px solid rgba(38,35,31,.12);
      border-radius: 999px;
      padding: 7px 11px;
      font-size: 11px;
      font-weight: 760;
      letter-spacing: .1em;
      text-transform: uppercase;
      color: #0b8159;
    }
    .wide { grid-row: span 2; }
    .two {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 22px;
      margin-top: 30px;
    }
    .panel {
      border-radius: 22px;
      border: 1px solid rgba(38,35,31,.13);
      background: rgba(255,255,255,.74);
      padding: 24px;
      min-height: 300px;
    }
    .panel h3 { font-size: 32px; }
    .matrix {
      margin-top: 18px;
      display: grid;
      grid-template-columns: 1.05fr .85fr .85fr .85fr;
      gap: 1px;
      background: rgba(38,35,31,.12);
      border: 1px solid rgba(38,35,31,.12);
      border-radius: 16px;
      overflow: hidden;
    }
    .cell {
      background: rgba(255,255,255,.86);
      min-height: 96px;
      padding: 13px 14px;
      font-size: 13px;
      line-height: 1.32;
      color: #5a544b;
    }
    .head {
      min-height: auto;
      background: #2d2a26;
      color: #f4f0e9;
      font-weight: 760;
      letter-spacing: .08em;
      text-transform: uppercase;
      font-size: 11px;
    }
    .source-map {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
      margin-top: 24px;
    }
    .source {
      min-height: 172px;
      border-radius: 18px;
      border: 1px solid rgba(38,35,31,.13);
      background: rgba(255,255,255,.72);
      padding: 18px;
    }
    .source strong {
      display: block;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 25px;
      font-weight: 400;
      margin-bottom: 12px;
    }
    .flow {
      margin-top: 34px;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      align-items: stretch;
      gap: 10px;
    }
    .step {
      position: relative;
      min-height: 118px;
      padding: 16px 13px;
      border: 1px solid rgba(13,157,105,.22);
      border-radius: 18px;
      background: rgba(255,255,255,.74);
    }
    .step:not(:last-child)::after {
      content: "";
      position: absolute;
      top: 50%;
      right: -11px;
      width: 11px;
      height: 1px;
      background: rgba(13,157,105,.7);
    }
    .step b {
      display: block;
      font-size: 14px;
      line-height: 1.2;
      margin-bottom: 9px;
    }
    .step span {
      display: block;
      font-size: 12px;
      line-height: 1.35;
      color: #615b52;
    }
    .footer-note {
      position: absolute;
      left: 62px;
      right: 62px;
      bottom: 34px;
      display: flex;
      justify-content: space-between;
      gap: 24px;
      color: #716a60;
      font-size: 12px;
      letter-spacing: .03em;
    }
  </style>
</head>
<body>
  <main>
    <section class="page" id="slide-1">
      <div class="topbar">
        <div>
          <div class="kicker">Supertools Status Quo · 14.08.2026</div>
          <h1>Kuratierte Software-Orientierung für den Public Sector</h1>
          <p class="deck">Arbeitsstand für die gemeinsame Besprechung: Website, Discovery Engine, gezielter Crawler, Qualitätskriterien und Marketing-Mechanik als ein System.</p>
        </div>
        <div class="meta">
          <div class="smallcap">Grundsatz</div>
          Kein automatisches Verzeichnis. Der technische Unterbau liefert Signale; veröffentlicht werden nur kuratierte, belegte und redaktionell freigegebene Informationen.
          <div style="margin-top:14px">${tag("Christian: 20 relevante Messen", "warn")} ${tag("Suchbegriff: Public Sector")}</div>
        </div>
      </div>
      <div class="grid5">
        ${col("Website", "Was steht", [
          "Interne Vorschau mit Startseite, Themenfeldern, Kategorien, Tool-Listen und Profilen.",
          "59 echte Anbieter als breite Arbeitsbasis, aber noch keine finale Empfehlungsliste.",
          "Öffentliche Sprache: kuratiertes Verzeichnis, Basis-Profile, keine Crawler-Erzählung.",
          "Formulare, Newsletter, CMS, Rechtstexte und finale Toolprofile noch offen."
        ], "green")}
        ${col("Discovery", "Was wir suchen", [
          "Neue Software-Kandidaten über Suchräume, Events, Messen, Public-Sector-Begriffe und Beschaffungsdaten.",
          "Kernbegriff: Public Sector plus Kategorie, Kommune, Verwaltung, Behörde, GovTech.",
          "Ziel: Kandidaten finden, nicht sofort bewerten.",
          "Output: Kandidatenliste mit Quelle, Kontext, Kategorie-Hypothese und Priorität."
        ], "yellow")}
        ${col("Gezielter Crawler", "Was er macht", [
          "Grast bekannte Kandidaten systematisch ab: Anbieterwebsite, Trust, Security, Datenschutz, Docs, Cases, Webinar.",
          "Sammelt Belege statt Marketingtext.",
          "Trennt Produktdaten, Anbieterclaims, Website-Hosting und redaktionelle Notizen.",
          "Output: Evidence Store und Review-Report."
        ], "dark")}
        ${col("Qualität", "Wie wir messen", [
          "Quelle stark, mittel oder schwach.",
          "Signal belegt, unsicher, widersprüchlich oder fehlt.",
          "Produktbezug vor Website-Bezug.",
          "Menschliche Freigabe vor Website-Export."
        ], "blue")}
        ${col("Marketing", "Wie es wachsen soll", [
          "Amtshelden-Reichweite als Startkanal.",
          "Supertools-Newsletter und wiederkehrende Formate: Tool des Monats, Messe-Radar, GovTech-Fundstücke.",
          "Anbieterpakete später: Basis, Verified, Sponsored Content, Leads.",
          "Tracking-Funnel: Liste → Profil → CTA → Anfrage."
        ], "red")}
      </div>
      <div class="ribbon">${pill("Mission zuerst")} ${pill("Datenqualität vor Automatisierung")} ${pill("Redaktion bleibt Gatekeeper")}</div>
    </section>

    <section class="page" id="slide-2">
      <div class="topbar">
        <div>
          <div class="kicker">Website · aktueller Entwicklungsstand</div>
          <h2>Sichtbares Produkt: schon realistisch, aber noch interne Vorschau</h2>
        </div>
        <div class="meta">Screenshots vom lokalen Stand. Die Seite wirkt bewusst voll, damit Dichte, Navigation und Profilmuster mit echten Daten geprüft werden können.</div>
      </div>
      <div class="screen-grid">
        <figure class="shot wide"><img src="${rel("website-home.png")}" /><figcaption class="caption">Startseite</figcaption></figure>
        <figure class="shot"><img src="${rel("website-category.png")}" /><figcaption class="caption">Tool-Liste</figcaption></figure>
        <figure class="shot"><img src="${rel("website-tool-profile.png")}" /><figcaption class="caption">Profilseite</figcaption></figure>
      </div>
      <div class="footer-note">
        <span>Aktuelle Regeln: kein Ranking, keine Sterne, kein Pay-to-Top, zuletzt-geprüft-Signale, Korrekturpfad.</span>
        <span>Offen: finale Tool-Liste, CMS, Formulare, Newsletter, Rechtstexte, hochwertige Logos.</span>
      </div>
    </section>

    <section class="page" id="slide-3">
      <div class="topbar">
        <div>
          <div class="kicker">Discovery Engine + Crawler-Konzept</div>
          <h2>Erst entdecken, dann gezielt belegen</h2>
        </div>
        <div class="meta">Der Crawler wird erst gebaut, wenn die Mission klar ist: Welche Quellen liefern welche Qualität für welche öffentliche Aussage?</div>
      </div>
      <div class="flow">
        <div class="step"><b>Suchräume</b><span>Themen, Kategorien, Public-Sector-Keywords, 20 relevante Messen.</span></div>
        <div class="step"><b>Discovery</b><span>Search APIs, Messeprogramme, Vergaben, News, YouTube, Anbieterlandschaft.</span></div>
        <div class="step"><b>Entity Match</b><span>Produkt, Anbieter, Domain, Kategorie und Dubletten zusammenführen.</span></div>
        <div class="step"><b>Qualifizierung</b><span>Softwareprodukt? Behördenfit? Ausschlussgrund? Priorität?</span></div>
        <div class="step"><b>Targeted Crawl</b><span>Trust, Security, Datenschutz, Docs, Cases, Webinare, Downloads.</span></div>
        <div class="step"><b>Evidence Store</b><span>Aussage + Quelle + Fundstelle + Qualität + Zeitstempel.</span></div>
        <div class="step"><b>Human Review</b><span>Freigabe, Nachrecherche oder Ausschluss.</span></div>
      </div>
      <div class="source-map">
        <div class="source"><strong>Anbieterquellen</strong>${tag("mittel/stark")}<ul><li>Security, Trust, Datenschutz, Subprozessoren</li><li>Docs, Changelog, Case Studies, Public Sector</li><li>Gut für Produktdetails, aber Anbieterclaim bleibt Anbieterclaim</li></ul></div>
        <div class="source"><strong>Externe Belege</strong>${tag("stark")}<ul><li>TED/Vergabe, BSI, öffentliche Register</li><li>Behördenreferenzen, Zertifikate, Rahmenverträge</li><li>Gut für belastbare Signale</li></ul></div>
        <div class="source"><strong>Search APIs</strong>${tag("discovery", "warn")}<ul><li>Brave, Google Programmable Search, Bing</li><li>Queries wie Public Sector, Kommune, Verwaltung, GovTech</li><li>Gut zum Finden, nicht zum Publizieren</li></ul></div>
        <div class="source"><strong>Content-Kanäle</strong>${tag("kuratiert")}<ul><li>YouTube, Webinare, Whitepaper, Presse, Events</li><li>Nur mit Thema und Relevanz ausspielen</li><li>Maximal wenige hochwertige Stücke je Tool</li></ul></div>
      </div>
      <div class="footer-note">
        <span>Merksatz: Website-Hosting ist kein Produkt-Hosting. DSGVO-Wortlaut ist kein belastbarer Compliance-Beleg.</span>
        <span>Output: Kandidatenliste, Evidence Store, Review-Report, freigegebener Website-Export.</span>
      </div>
    </section>

    <section class="page" id="slide-4">
      <div class="topbar">
        <div>
          <div class="kicker">Qualitätskriterien + Marketing-System</div>
          <h2>Was Behörden schnell erkennen sollen</h2>
        </div>
        <div class="meta">Supertools verkauft keine absolute Wahrheit, sondern schnelle Orientierung mit Quellen, Grenzen und redaktioneller Einordnung.</div>
      </div>
      <div class="matrix">
        <div class="cell head">Datenfeld</div><div class="cell head">Gute Qualität</div><div class="cell head">Achtung</div><div class="cell head">Website-Wert</div>
        <div class="cell">Produktidentität</div><div class="cell">Produktname, Anbieter, Domain, Rechtsform, Kategorie klar getrennt.</div><div class="cell">Firma ≠ Produkt; Agentur/Integrator ≠ Software.</div><div class="cell">Schneller Überblick, saubere Profile.</div>
        <div class="cell">Behördenfit</div><div class="cell">Öffentliche Kunden, kommunale Cases, Verwaltungssprache, GovTech-Use-Cases.</div><div class="cell">Generisches “Public Sector” ohne Beleg.</div><div class="cell">Warum relevant für Behörden?</div>
        <div class="cell">Datenschutz & Betrieb</div><div class="cell">AVV, Subprozessoren, Datenregion, Betriebsmodell, Produktbezug.</div><div class="cell">Datenschutzerklärung der Website als falscher Produktbeleg.</div><div class="cell">Risiken schnell erkennen.</div>
        <div class="cell">Sicherheit</div><div class="cell">ISO, BSI/C5, SSO, Rollen, Audit, Doku mit Fundstelle.</div><div class="cell">“Sicher” als Marketingfloskel.</div><div class="cell">Beschaffungs- und IT-Prüfung vorbereiten.</div>
        <div class="cell">Aktualität</div><div class="cell">Changelog, neue Zertifikate, Events, Statuspage, Monitoring-Zeitstempel.</div><div class="cell">Einmalige Momentaufnahme ohne Wiedervorlage.</div><div class="cell">Vertrauen durch Stand der Prüfung.</div>
        <div class="cell">Content</div><div class="cell">Case, Webinar, Video oder Whitepaper mit erkennbarem Thema.</div><div class="cell">Generische Blogs, leere Webinarseiten, Download-Friedhof.</div><div class="cell">Vertiefung ohne Recherchefrust.</div>
      </div>
      <div class="footer-note">
        <span>Publikationsregel: Interne Signale werden erst nach Review zu öffentlichen Aussagen.</span>
        <span>Systemregel: Je stärker die Aussage, desto stärker muss die Quelle sein.</span>
      </div>
    </section>

    <section class="page" id="slide-5">
      <div class="topbar">
        <div>
          <div class="kicker">Marketing-System + nächste Entscheidung</div>
          <h2>Vom Amtshelden-Publikum zur kuratierten Nachfrage</h2>
        </div>
        <div class="meta">Marketing, Discovery und Datenqualität greifen ineinander: Reichweite erzeugt Suchsignale, Suchsignale erzeugen Kandidaten, Review erzeugt Vertrauen.</div>
      </div>
      <div class="two">
        <div class="panel">
          <div class="eyebrow">Marketing-Mechanik</div>
          <h3>Vom Amtshelden-Publikum zur Supertools-Nutzung</h3>
          <ul>
            <li>Amtshelden Newsletter und Social als Startmotor.</li>
            <li>Messe-Radar: 20 relevante Events als Discovery- und Content-Taktgeber.</li>
            <li>Redaktionelle Formate: Tool des Monats, Public-Sector-Shortlist, Kategorie-Guides.</li>
            <li>Conversion messen: Kategorie → Toolprofil → CTA → Anfrage.</li>
          </ul>
        </div>
        <div class="panel">
          <div class="eyebrow">Nächste Entscheidung</div>
          <h3>Mission klarziehen, dann bauen</h3>
          <ul>
            <li>Finale Taxonomie und Ausschlusskriterien definieren.</li>
            <li>Quellengewichtung und Qualitätsmatrix verbindlich machen.</li>
            <li>20 Messen + API-Suchräume als Discovery-Backlog sammeln.</li>
            <li>Goldstandard-Testset mit 15 Tools manuell bewerten.</li>
          </ul>
        </div>
      </div>
      <div class="screen-grid" style="height: 310px; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr; margin-top: 22px;">
        <figure class="shot"><img src="${rel("website-vendor.png")}" /><figcaption class="caption">Anbieter werden</figcaption></figure>
        <div class="panel" style="min-height: 310px;">
          <div class="eyebrow">Messbare Conversion</div>
          <h3>Liste → Profil → CTA → Anfrage</h3>
          <ul>
            <li>Tool-Karten-Klicks nach Kategorie und Position messen.</li>
            <li>Profil-CTAs trennen: Anfrage, Anbieterwebsite, Video, Webinar, Whitepaper.</li>
            <li>Qualifizierte Anfrage als Kern-Conversion definieren.</li>
            <li>UTM-Logik für Amtshelden, Newsletter, Messen und Social sauber nutzen.</li>
          </ul>
        </div>
      </div>
      <div class="footer-note">
        <span>Leitfrage fürs Team: Welche öffentlichen Aussagen wollen wir sicher treffen können?</span>
        <span>Erst danach lohnt sich ein stabiler, automatisierter Crawler.</span>
      </div>
    </section>
  </main>
</body>
</html>`;

await fs.mkdir(assetDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  for (const shot of pages) {
    await page.goto(`${baseUrl}${shot.path}`, { waitUntil: "networkidle0", timeout: 60000 });
    await page.screenshot({
      path: path.join(assetDir, shot.file),
      fullPage: false,
    });
  }

  const htmlPath = path.join(outDir, "supertools-status-quo-2026-08-14.html");
  await fs.writeFile(htmlPath, html, "utf8");

  await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });
  await page.pdf({
    path: path.join(outDir, "supertools-status-quo-2026-08-14.pdf"),
    width: "16in",
    height: "9in",
    printBackground: true,
    preferCSSPageSize: true,
  });

  for (let i = 1; i <= 5; i += 1) {
    const slide = await page.$(`#slide-${i}`);
    await slide.screenshot({
      path: path.join(outDir, `supertools-status-quo-slide-${i}.png`),
    });
  }
} finally {
  await browser.close();
}

console.log(`Rendered status paper to ${outDir}`);
