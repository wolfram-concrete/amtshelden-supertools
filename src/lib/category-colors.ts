/**
 * Holistische Farblogik der Kategorien (Bereiche).
 *
 * Eine Farbe je Kategorie — zuerst auf den Home-Bereichskacheln definiert,
 * von dort site-weit übernommen (Mega-Menü, Chips, Wayfinding), damit das
 * Farbsystem überall dasselbe ist. Gedeckte, erdige Mitteltöne in der
 * CONCRETE-Logik: warmes Neutral als Grund, je Bereich ein eigener Ton.
 */
export const CATEGORY_COLOR: Record<string, string> = {
  "e-akte-dokumentenmanagement": "#215E8C", // Steel-Blau
  "buergerservice-fachverfahren": "#5A4A88", // Violett
  "personal-organisation": "#B0530F", // Burnt-Orange
  "kommunikation-zusammenarbeit": "#006B45", // Pinie-Grün
  "finanzen-haushalt": "#1E6E78", // Teal
  "geo-bauen-umwelt": "#5E6836", // Olive
};

/** Grün als neutraler Rückfall (Markenfarbe). */
export const CATEGORY_COLOR_FALLBACK = "#006B45";

/** Farbe zu einem Kategorie-Slug, mit Rückfall. */
export function categoryColor(slug?: string): string {
  return (slug && CATEGORY_COLOR[slug]) || CATEGORY_COLOR_FALLBACK;
}
