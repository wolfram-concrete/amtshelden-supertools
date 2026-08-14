// Kuratierte Supertools-Datenbasis (Aggregation).
// Bündelt die bestehende Vorschau-Liste + die intern kuratierte Masterliste zu
// einer gemeinsamen Verzeichnis-Sicht. Keine „Crawler"-Formulierungen nach außen;
// nur redaktionell freigegebene Datensätze.
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

/** Alle Verzeichnis-Karten: bestehende + Masterliste (ergänzend, keine Ablösung). */
export const directoryToolCards: ToolCardSummary[] = [
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

/** Nur Masterliste liefert diese reicheren Felder. */
export const directoryToolAvailability: Record<string, SoftwareAvailability> =
  masterToolAvailability;
export const directoryToolEvidence: Record<string, string[]> = masterToolEvidence;
export const directoryToolSignals: Record<string, string[]> = masterToolSignals;

export type { SoftwareAvailability };
