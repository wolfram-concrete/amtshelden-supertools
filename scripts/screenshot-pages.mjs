/**
 * Full-Page-Screenshots aller Hauptseiten für die Sitemap-Doku.
 *
 * Voraussetzung: Production-Server läuft auf http://localhost:3001
 *
 * Lokal:
 *   npm run start &
 *   sleep 4
 *   node scripts/screenshot-pages.mjs
 *
 * Output: docs/screenshots/*.png
 */

import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";

const CHROME_PATH =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE_URL = "http://localhost:3001";
const OUTPUT_DIR = "docs/screenshots";
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

for (const route of ROUTES) {
  const url = BASE_URL + route.path;
  process.stdout.write(`  → ${route.title.padEnd(22)} ${url}  `);
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
    // Wait for fonts + animations to settle
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({
      path: `${OUTPUT_DIR}/${route.slug}.png`,
      fullPage: true,
      type: "png",
    });
    console.log("✓");
  } catch (err) {
    console.log("✗", err.message);
  }
  await page.close();
}

await browser.close();
console.log("Done.");
