/**
 * Aufbereitung der freigegebenen Crawler-Inhalte für öffentliche Oberflächen.
 *
 * Einzige Frontend-Datenquelle: src/mocks/tools/crawler-preview.ts.
 * Kein Zugriff auf data/crawler/* im Frontend.
 */
import {
  crawlerToolContentPreview,
  type CrawlerToolContentPiece,
} from "@/mocks/tools/crawler-preview";

export const crawlerContentLabels: Record<
  CrawlerToolContentPiece["kind"],
  string
> = {
  youtube: "Video",
  video: "Video",
  webinar: "Webinar",
  case_study: "Praxisbeispiel",
  use_case: "Anwendungsfall",
  whitepaper: "Leitfaden",
  blog_article: "Blog",
  download: "Download",
};

const resourcePriority: CrawlerToolContentPiece["kind"][] = [
  "case_study",
  "use_case",
  "whitepaper",
  "webinar",
  "blog_article",
  "download",
  "youtube",
  "video",
];

const hiddenResourceTerms = [
  "capterra",
  "pressemitteilung",
  "status und trends",
  "newsletter anmeldung",
];

function topicPhrase(toolName: string, pitch: string) {
  const haystack = `${toolName} ${pitch}`.toLowerCase();
  if (haystack.includes("barrierefreiheit") || haystack.includes("bfsg")) {
    return "zur digitalen Barrierefreiheit";
  }
  if (haystack.includes("mitarbeiter")) return "zur Mitarbeiterkommunikation";
  if (haystack.includes("social media") || haystack.includes("community")) {
    return "zum Social Media Management";
  }
  return "zum Produkt";
}

function isGenericTitle(title: string) {
  return [
    "blog",
    "webinare",
    "events",
    "guides",
    "jetzt anmelden",
    "case study anschauen",
    "erfolgsgeschichten",
  ].includes(title.trim().toLowerCase());
}

function shouldHideResource(piece: CrawlerToolContentPiece) {
  const haystack = `${piece.title} ${piece.url}`.toLowerCase();
  return hiddenResourceTerms.some((term) => haystack.includes(term));
}

export function crawlerResourceTitle(
  piece: CrawlerToolContentPiece,
  toolName: string,
  pitch: string,
) {
  const phrase = topicPhrase(toolName, pitch);
  const title = piece.title.trim();

  if (piece.kind === "youtube" || piece.kind === "video") {
    return `Produktvideo: ${title}`;
  }
  if (piece.kind === "webinar") return `Webinare ${phrase}`;
  if (piece.kind === "blog_article") return `Blog ${phrase}`;
  if (piece.kind === "whitepaper") {
    if (title.toLowerCase().includes("web content accessibility guidelines")) {
      return "WCAG-Leitfaden zur Barrierefreiheit";
    }
    return isGenericTitle(title) ? `Leitfaden ${phrase}` : title;
  }
  if (piece.kind === "download") {
    return isGenericTitle(title) ? `Download ${phrase}` : title.replace(/\.pdf$/i, "");
  }
  if (piece.kind === "case_study") {
    return isGenericTitle(title) ? `Praxisbeispiele ${phrase}` : title;
  }
  if (piece.kind === "use_case") {
    return isGenericTitle(title) ? `Anwendungsfälle ${phrase}` : title;
  }
  return isGenericTitle(title) ? crawlerContentLabels[piece.kind] : title;
}

/**
 * Entfernt den internen „Crawler-Hinweis: …"-Teil (Sales-/Review-Notiz) aus
 * dem Pitch. NUR für öffentliche Oberflächen — die interne /crawler-preview
 * darf den vollen Pitch behalten.
 */
export function publicPitch(pitch: string) {
  return pitch
    .split(/crawler-hinweis\s*:/i)[0]
    .trim()
    .replace(/[·,–-]+\s*$/, "")
    .trim();
}

/** YouTube-Piece für die Profil-Oberfläche (nur Thumbnail/Link, keine Einbettung). */
export function pickProfileYoutube(slug: string) {
  return (
    (crawlerToolContentPreview[slug] || []).find(
      (p) =>
        p.kind === "youtube" &&
        p.reviewed &&
        p.surface.includes("profile") &&
        (p.videoId || p.thumbnailUrl),
    ) || null
  );
}

/**
 * Kuratierte Shortlinks fürs Profil — pro Inhaltsart max. einer, ohne Video
 * (das läuft separat als Thumbnail), nur freigegebene Profil-Pieces.
 */
export function selectProfileResources(
  slug: string,
  toolName: string,
  pitch: string,
  limit = 5,
) {
  const seen = new Set<string>();
  const pieces = (crawlerToolContentPreview[slug] || [])
    .filter((p) => p.reviewed && p.surface.includes("profile"))
    .filter((p) => p.kind !== "youtube" && p.kind !== "video")
    .filter((p) => !shouldHideResource(p))
    .sort(
      (a, b) => resourcePriority.indexOf(a.kind) - resourcePriority.indexOf(b.kind),
    );

  const out: CrawlerToolContentPiece[] = [];
  for (const piece of pieces) {
    if (seen.has(piece.kind)) continue;
    out.push({ ...piece, title: crawlerResourceTitle(piece, toolName, pitch) });
    seen.add(piece.kind);
    if (out.length >= limit) break;
  }
  return out;
}
