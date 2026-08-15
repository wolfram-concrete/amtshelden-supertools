// Kuratierte Supertools-Datenbasis (Aggregation).
// Bündelt die bestehende Vorschau-Liste + die intern kuratierte Masterliste zu
// einer gemeinsamen Verzeichnis-Sicht. Keine „Crawler"-Formulierungen nach außen;
// nur redaktionell freigegebene Datensätze.
import { publicPitch } from "@/lib/crawler-content";
import {
  categories as baseCategories,
  categoryRegistry as baseCategoryRegistry,
} from "@/mocks/categories";
import type { ToolCardSummary } from "@/types/content";
import {
  crawlerToolCardPreview,
  crawlerToolLogoPreview,
  crawlerToolScreenshotPreview,
  crawlerToolSummaryPreview,
} from "@/mocks/tools/crawler-preview";
import {
  masterToolCards,
  masterToolLogoPreview,
  masterToolScreenshotPreview,
  masterToolSummaryPreview,
  masterToolAvailability,
  masterToolEvidence,
  masterToolSignals,
  type SoftwareAvailability,
} from "@/data/software-master";

function withPublicSurface(tool: ToolCardSummary): ToolCardSummary {
  const logo = directoryToolLogos[tool.slug];
  return {
    ...tool,
    pitch: publicPitch(tool.pitch),
    logoUrl: logo?.logoUrl ?? tool.logoUrl,
    logoBg: logo?.backgroundColor ?? tool.logoBg,
  };
}

function dedupeBySlug(tools: ToolCardSummary[]) {
  const seen = new Map<string, ToolCardSummary>();
  for (const tool of tools) {
    seen.set(tool.slug, tool);
  }
  return Array.from(seen.values());
}

/** Alle Verzeichnis-Karten: bestehende + Masterliste (ergänzend, keine Ablösung). */
const rawDirectoryToolCards: ToolCardSummary[] = [
  ...crawlerToolCardPreview,
  ...masterToolCards,
];

export const directoryToolLogos: Record<
  string,
  { website: string; domain: string; logoUrl: string; backgroundColor: string }
> = {
  ...crawlerToolLogoPreview,
  ...masterToolLogoPreview,
};

export const directoryToolScreenshots: Record<string, string[]> = {
  ...crawlerToolScreenshotPreview,
  ...masterToolScreenshotPreview,
};

export const directoryToolSummaries: Record<string, string> = {
  ...crawlerToolSummaryPreview,
  ...masterToolSummaryPreview,
};

export const directoryToolCards: ToolCardSummary[] = dedupeBySlug(
  rawDirectoryToolCards,
).map(withPublicSurface);

export const directoryToolCardsByCategory: Record<string, ToolCardSummary[]> =
  directoryToolCards.reduce(
    (acc, tool) => {
      (acc[tool.categorySlug] ||= []).push(tool);
      return acc;
    },
    {} as Record<string, ToolCardSummary[]>,
  );

export const directoryCategories = baseCategories.map((category) => ({
  ...category,
  toolCount: directoryToolCardsByCategory[category.slug]?.length || 0,
}));

export const directoryCategoryRegistry = {
  ...baseCategoryRegistry,
  ...Object.fromEntries(directoryCategories.map((c) => [c.slug, c])),
};

export const directoryCategoriesByThemenfeld = directoryCategories.reduce(
  (acc, category) => {
    (acc[category.themenfeldSlug] ||= []).push(category);
    return acc;
  },
  {} as Record<string, typeof directoryCategories>,
);

/** Nur Masterliste liefert diese reicheren Felder. */
export const directoryToolAvailability: Record<string, SoftwareAvailability> =
  masterToolAvailability;
export const directoryToolEvidence: Record<string, string[]> = masterToolEvidence;
export const directoryToolSignals: Record<string, string[]> = masterToolSignals;

export type { SoftwareAvailability };
