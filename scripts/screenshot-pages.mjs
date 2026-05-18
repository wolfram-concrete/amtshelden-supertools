/**
 * Full-Page-Screenshots aller Hauptseiten für die Sitemap-Doku.
 *
 * Voraussetzung: Production-Server läuft auf http://localhost:3001
 *
 * Härtung gegen typische Puppeteer-Probleme:
 *  - Sticky-Elemente werden während Screenshot auf static gesetzt
 *    (sonst „kleben" sie beim Auto-Scroll und erscheinen mehrfach)
 *  - Auto-Scroll vor Screenshot, damit alle Lazy-Loading-Bilder geladen sind
 *  - extra Wait für Font-Loading + Layout-Stabilisierung
 *
 * Lokal:
 *   PORT=3001 npm run start &
 *   sleep 5
 *   node scripts/screenshot-pages.mjs
 *
 * Output: public/sitemap/*.png
 */

import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";

const CHROME_PATH =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE_URL = "http://localhost:3001";
const OUTPUT_DIR = "public/sitemap";
const VIEWPORT = { width: 1440, height: 900, deviceScaleFactor: 2 };

const ROUTES = [
  { slug: "01-home", path: "/", title: "Startseite" },
  { slug: "02-kategorien-index", path: "/kategorien", title: "Kategorien-Index" },
  {
    slug: "03-kategorie-detail",
    path: "/kategorien/e-akte-dokumentenmanagement",
    title: "Kategorie-Detail",
  },
  { slug: "04-tool-profil", path: "/tools/vivioakte", title: "Tool-Profil" },
  { slug: "05-wissen-index", path: "/wissen", title: "Wissen-Index" },
  {
    slug: "06-wissen-detail",
    path: "/wissen/digitalisierung-bund-2030",
    title: "Wissens-Artikel",
  },
  { slug: "07-ueber", path: "/ueber", title: "Über uns" },
  { slug: "08-kontakt", path: "/kontakt", title: "Kontakt (Stub)" },
];

await mkdir(OUTPUT_DIR, { recursive: true });

console.log("Starting Chrome…");
const browser = await puppeteer.launch({
  executablePath: CHROME_PATH,
  headless: "new",
  defaultViewport: VIEWPORT,
  args: ["--hide-scrollbars", "--font-render-hinting=none"],
});

/**
 * Scrollt durch die Seite, damit alle Lazy-Loading-Images geladen werden.
 * Anschließend zurück nach oben.
 */
async function autoScrollAndReset(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        window.scrollBy(0, step);
        total += step;
        if (total >= scrollHeight + 200) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          // Kurz warten, damit lazy-images final rendern
          setTimeout(resolve, 300);
        }
      }, 80);
    });
  });
}

for (const route of ROUTES) {
  const url = BASE_URL + route.path;
  process.stdout.write(`  → ${route.title.padEnd(22)} ${url}  `);
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

    // Disable sticky-Verhalten während Screenshot — verhindert Doppel-Render
    // des Headers + ProfilSidebar + HomeSidebar bei Full-Page-Capture
    await page.addStyleTag({
      content: `
        .sticky, .lg\\:sticky, .md\\:sticky, .sm\\:sticky,
        [class*="sticky:"], [style*="sticky"] {
          position: static !important;
          top: auto !important;
        }
      `,
    });

    // Auto-Scroll für Lazy-Loaded-Bilder
    await autoScrollAndReset(page);

    // Final settle (Fonts, Layout, Animations)
    await new Promise((r) => setTimeout(r, 1500));

    await page.screenshot({
      path: `${OUTPUT_DIR}/${route.slug}.png`,
      fullPage: true,
      type: "png",
      captureBeyondViewport: true,
    });
    console.log("✓");
  } catch (err) {
    console.log("✗", err.message);
  }
  await page.close();
}

await browser.close();
console.log("Done.");
