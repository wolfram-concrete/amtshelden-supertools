/**
 * Problem-/Use-Case-Einstiege (Strategie-Meeting 12.06.2026).
 *
 * „Behörden suchen oft nicht nach einem Tooltyp, sondern nach einem Problem."
 * Jeder Use Case führt zum passenden Themenfeld oder zur passenden Kategorie —
 * der Einstieg über das Problem, nicht über die interne Taxonomie.
 */

import type { BrandIconName } from "@/components/icons/BrandIcon";

export interface UseCase {
  /** Problem-Formulierung aus Behördensicht */
  label: string;
  /** Brand-Icon-Name */
  icon: BrandIconName;
  /** Ziel-Route (Themenfeld oder Kategorie) */
  href: string;
}

export const useCases: UseCase[] = [
  {
    label: "Social Media organisieren",
    icon: "hash",
    href: "/themenfelder/kommunikation-krise",
  },
  {
    label: "Recruiting verbessern",
    icon: "user-plus",
    href: "/themenfelder/smartes-personalmanagement",
  },
  {
    label: "Bürgerkommunikation vereinfachen",
    icon: "building",
    href: "/kategorien/buergerservice-fachverfahren",
  },
  {
    label: "KI in der Verwaltung nutzen",
    icon: "sparkles",
    href: "/themenfelder/transformation-ki",
  },
  {
    label: "Akten digitalisieren",
    icon: "folder",
    href: "/kategorien/e-akte-dokumentenmanagement",
  },
  {
    label: "Interne Zusammenarbeit strukturieren",
    icon: "chat",
    href: "/kategorien/kommunikation-zusammenarbeit",
  },
  {
    label: "Haushalt & Controlling steuern",
    icon: "coins",
    href: "/themenfelder/moderne-fuehrung",
  },
  {
    label: "Krisenkommunikation vorbereiten",
    icon: "alert",
    href: "/themenfelder/kommunikation-krise",
  },
];
