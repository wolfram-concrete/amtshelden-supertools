/**
 * Problem-/Use-Case-Einstiege (Strategie-Meeting 12.06.2026).
 *
 * „Behörden suchen oft nicht nach einem Tooltyp, sondern nach einem Problem."
 * Jeder Use Case führt zum passenden Themenfeld oder zur passenden Kategorie —
 * der Einstieg über das Problem, nicht über die interne Taxonomie.
 */

export interface UseCase {
  /** Problem-Formulierung aus Behördensicht */
  label: string;
  /** Emoji-Icon */
  icon: string;
  /** Ziel-Route (Themenfeld oder Kategorie) */
  href: string;
}

export const useCases: UseCase[] = [
  {
    label: "Social Media organisieren",
    icon: "📱",
    href: "/themenfelder/kommunikation-krise",
  },
  {
    label: "Recruiting verbessern",
    icon: "🧑‍💼",
    href: "/themenfelder/smartes-personalmanagement",
  },
  {
    label: "Bürgerkommunikation vereinfachen",
    icon: "🏛",
    href: "/kategorien/buergerservice-fachverfahren",
  },
  {
    label: "KI in der Verwaltung nutzen",
    icon: "🤖",
    href: "/themenfelder/transformation-ki",
  },
  {
    label: "Akten digitalisieren",
    icon: "🗂️",
    href: "/kategorien/e-akte-dokumentenmanagement",
  },
  {
    label: "Interne Zusammenarbeit strukturieren",
    icon: "💬",
    href: "/kategorien/kommunikation-zusammenarbeit",
  },
  {
    label: "Haushalt & Controlling steuern",
    icon: "💶",
    href: "/themenfelder/moderne-fuehrung",
  },
  {
    label: "Krisenkommunikation vorbereiten",
    icon: "🚨",
    href: "/themenfelder/kommunikation-krise",
  },
];
