#!/usr/bin/env node
/**
 * Importiert Amtshelden-Posts aus Instagram Graph API und LinkedIn Posts API.
 *
 * Ohne Tokens bricht das Script bewusst ohne Dateiaenderung ab. Mit Tokens
 * schreibt es:
 * - data/social/amtshelden-feed-import.json
 * - src/mocks/social-import.generated.ts
 * - optional lokale Medien nach public/brand/social/amtshelden/imported/
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_JSON = path.join(ROOT, "data/social/amtshelden-feed-import.json");
const OUT_TS = path.join(ROOT, "src/mocks/social-import.generated.ts");
const MEDIA_DIR = path.join(ROOT, "public/brand/social/amtshelden/imported");

const PUBLIC_LINKEDIN_URL = "https://www.linkedin.com/company/86876852/";
const PUBLIC_INSTAGRAM_URL = "https://www.instagram.com/amtshelden/";

const LIMIT = Number.parseInt(process.env.SOCIAL_IMPORT_LIMIT || "8", 10);
const DOWNLOAD_MEDIA = process.env.SOCIAL_DOWNLOAD_MEDIA !== "0";
const LINKEDIN_VERSION = process.env.LINKEDIN_VERSION || "202608";
const LINKEDIN_ORGANIZATION_ID =
  process.env.LINKEDIN_ORGANIZATION_ID || "86876852";

function requireAnyToken() {
  return Boolean(
    (process.env.INSTAGRAM_USER_ID && process.env.INSTAGRAM_ACCESS_TOKEN) ||
      process.env.LINKEDIN_ACCESS_TOKEN,
  );
}

function textExcerpt(value = "", maxLength = 180) {
  const clean = value
    .replace(/\s+/g, " ")
    .replace(/https?:\/\/\S+/g, "")
    .trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 1).trim()}…`;
}

function inferTopic(text = "", fallback = "Amtshelden") {
  const lower = text.toLowerCase();
  if (lower.includes("ki") || lower.includes("künstliche")) return "KI";
  if (lower.includes("kommunikation") || lower.includes("social")) {
    return "Behördenkommunikation";
  }
  if (lower.includes("kultur") || lower.includes("arbeitgeber")) return "Kultur";
  if (lower.includes("vertrauen")) return "Vertrauen";
  if (lower.includes("connected") || lower.includes("event")) return "Event";
  return fallback;
}

function normalizeFormat(platform, mediaType, content = {}) {
  if (platform === "instagram") {
    if (mediaType === "VIDEO") return "Reel";
    if (mediaType === "CAROUSEL_ALBUM") return "Carousel";
    return "Post";
  }
  if (content.article) return "Artikel";
  return "Post";
}

function extensionFromContentType(contentType = "") {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("gif")) return "gif";
  return "jpg";
}

function slugPart(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${body.slice(0, 500)}`);
  }
  return JSON.parse(body);
}

async function downloadMedia(url, filenameSeed) {
  if (!DOWNLOAD_MEDIA || !url) return null;
  await mkdir(MEDIA_DIR, { recursive: true });

  const response = await fetch(url);
  if (!response.ok) return null;

  const contentType = response.headers.get("content-type") || "";
  const ext = extensionFromContentType(contentType);
  const filename = `${slugPart(filenameSeed)}.${ext}`;
  const filepath = path.join(MEDIA_DIR, filename);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(filepath, bytes);
  return `/brand/social/amtshelden/imported/${filename}`;
}

async function importInstagram() {
  const userId = process.env.INSTAGRAM_USER_ID;
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!userId || !token) return [];

  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
  ].join(",");

  const url = new URL(`https://graph.facebook.com/v23.0/${userId}/media`);
  url.searchParams.set("fields", fields);
  url.searchParams.set("limit", String(LIMIT));
  url.searchParams.set("access_token", token);

  const json = await fetchJson(url);
  const items = [];

  for (const media of json.data || []) {
    const sourceImage = media.thumbnail_url || media.media_url;
    const localImage = await downloadMedia(sourceImage, `instagram-${media.id}`);
    const text = textExcerpt(media.caption || "Amtshelden auf Instagram");
    items.push({
      platform: "instagram",
      topic: inferTopic(media.caption, "Instagram"),
      text,
      href: media.permalink || PUBLIC_INSTAGRAM_URL,
      publishedAt: media.timestamp,
      format: normalizeFormat("instagram", media.media_type),
      image: localImage
        ? {
            url: localImage,
            alt: `Instagram-Beitrag von Amtshelden: ${textExcerpt(text, 90)}`,
          }
        : undefined,
    });
  }

  return items;
}

async function resolveLinkedinImage(mediaUrn, token) {
  if (!mediaUrn || !mediaUrn.includes(":image:")) return null;
  const encoded = encodeURIComponent(mediaUrn);
  const url = `https://api.linkedin.com/rest/images/${encoded}`;
  try {
    const json = await fetchJson(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Linkedin-Version": LINKEDIN_VERSION,
        "X-Restli-Protocol-Version": "2.0.0",
      },
    });
    return json.downloadUrl || json.downloadUrlExpiresAt ? json.downloadUrl : null;
  } catch {
    return null;
  }
}

async function importLinkedin() {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!token) return [];

  const author = `urn:li:organization:${LINKEDIN_ORGANIZATION_ID}`;
  const url = new URL("https://api.linkedin.com/rest/posts");
  url.searchParams.set("author", author);
  url.searchParams.set("q", "author");
  url.searchParams.set("count", String(LIMIT));
  url.searchParams.set("sortBy", "LAST_MODIFIED");
  url.searchParams.set("viewContext", "AUTHOR");

  const json = await fetchJson(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Linkedin-Version": LINKEDIN_VERSION,
      "X-Restli-Protocol-Version": "2.0.0",
      "X-RestLi-Method": "FINDER",
    },
  });

  const items = [];
  for (const post of json.elements || []) {
    const text = textExcerpt(post.commentary || "Amtshelden auf LinkedIn");
    const mediaUrn = post.content?.media?.id || post.content?.article?.thumbnail;
    const remoteImage = await resolveLinkedinImage(mediaUrn, token);
    const localImage = await downloadMedia(remoteImage, `linkedin-${post.id}`);

    items.push({
      platform: "linkedin",
      topic: inferTopic(post.commentary, "LinkedIn"),
      text,
      href: PUBLIC_LINKEDIN_URL,
      publishedAt: post.publishedAt
        ? new Date(post.publishedAt).toISOString()
        : undefined,
      format: normalizeFormat("linkedin", undefined, post.content || {}),
      image: localImage
        ? {
            url: localImage,
            alt: `LinkedIn-Beitrag von Amtshelden: ${textExcerpt(text, 90)}`,
          }
        : undefined,
    });
  }

  return items;
}

function sortNewestFirst(items) {
  return [...items].sort((a, b) => {
    const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return bTime - aTime;
  });
}

async function writeOutputs(items, sources) {
  await mkdir(path.dirname(OUT_JSON), { recursive: true });
  const payload = {
    generatedAt: new Date().toISOString(),
    sources,
    items,
  };
  await writeFile(OUT_JSON, `${JSON.stringify(payload, null, 2)}\n`);

  const ts = `// AUTO-GENERIERT von scripts/import_amtshelden_social_feed.mjs.
// Fallback bleibt in src/mocks/social.ts. Nicht von Hand editieren.

import type { SocialFeedItem } from "./social";

export const importedSocialFeed: SocialFeedItem[] = ${JSON.stringify(items, null, 2)};

export const socialImportMeta = ${JSON.stringify(
    { generatedAt: payload.generatedAt, sources },
    null,
    2,
  )};
`;
  await writeFile(OUT_TS, ts);
}

async function main() {
  if (!requireAnyToken()) {
    console.log("Keine Social-API-Tokens gefunden. Keine Dateien geaendert.");
    console.log("");
    console.log("Instagram:");
    console.log("  INSTAGRAM_USER_ID=...");
    console.log("  INSTAGRAM_ACCESS_TOKEN=...");
    console.log("");
    console.log("LinkedIn:");
    console.log("  LINKEDIN_ACCESS_TOKEN=...");
    console.log(`  LINKEDIN_ORGANIZATION_ID=${LINKEDIN_ORGANIZATION_ID}`);
    console.log(`  LINKEDIN_VERSION=${LINKEDIN_VERSION}`);
    return;
  }

  const [instagram, linkedin] = await Promise.all([
    importInstagram(),
    importLinkedin(),
  ]);
  const items = sortNewestFirst([...instagram, ...linkedin]).slice(0, LIMIT);
  const sources = [
    instagram.length > 0 && "instagram",
    linkedin.length > 0 && "linkedin",
  ].filter(Boolean);

  await writeOutputs(items, sources);
  console.log(`Import fertig: ${items.length} Items (${sources.join(", ") || "keine"})`);
  console.log(`JSON: ${path.relative(ROOT, OUT_JSON)}`);
  console.log(`TS:   ${path.relative(ROOT, OUT_TS)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
