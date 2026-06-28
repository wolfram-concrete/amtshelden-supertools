/**
 * Entscheidungsabkürzung — Beispiel-Szenario für die Home.
 *
 * Operationalisiert die 6 Entscheidungsfragen aus dem Gespräch („passt zum
 * Problem? Größe? Voraussetzungen? Was kann es? Was fehlt? Wie weiter?") an
 * EINEM konkreten, geprüften Tool. Macht den Claim „Entscheidungsabkürzung"
 * sichtbar.
 *
 * Quelle der Antworten: verifiziertes Profil von VivioAkte (siehe
 * src/mocks/tools/vivioakte.ts), geprüft am 12. Juni 2026. Redaktionell
 * verdichtet — inhaltlich deckungsgleich mit dem Profil, nichts erfunden.
 *
 * LOGO: VivioAkte ist ein fiktives Referenzbeispiel → kein echtes Marken-Logo.
 * `logoUrl` bleibt leer, die Komponente zeigt den Letter-Mark. Echte Tools
 * tragen hier ihr Logo (logoUrl) — dann wird es statt des Marks gerendert.
 */

export type DecisionTone = "default" | "gap" | "next";

export interface DecisionQuestion {
  /** lucide-Icon-Name (siehe DecisionShortcut.tsx Icon-Map) */
  icon: string;
  num: string;
  label: string;
  answer: string;
  tone?: DecisionTone;
}

export interface DecisionExample {
  toolSlug: string;
  toolName: string;
  /** Fallback-Letter-Mark, wenn kein logoUrl vorhanden */
  toolMark: string;
  markBg?: string;
  /** Pfad zum echten Marken-Logo (sobald vorhanden) */
  logoUrl?: string;
  category: string;
  verified: boolean;
  /** Anzeigeformat des Prüfdatums */
  lastChecked: string;
  scenario: string;
  ctaHref: string;
  questions: DecisionQuestion[];
}

export const decisionExample: DecisionExample = {
  toolSlug: "vivioakte",
  toolName: "VivioAkte",
  toolMark: "VA",
  category: "E-Akte & Dokumentenmanagement",
  verified: true,
  lastChecked: "12.06.2026",
  scenario: "Kommune mit 12.400 Einwohnern, keine eigene IT-Abteilung.",
  ctaHref: "/anfrage?tool=vivioakte",
  questions: [
    {
      icon: "Target",
      num: "01",
      label: "Passt zum Problem?",
      answer: "E-Akte & Dokumentenmanagement, kuratiert für kleine Kommunen.",
    },
    {
      icon: "UsersRound",
      num: "02",
      label: "Für unsere Größe?",
      answer: "Ausgelegt auf 5.000–50.000 Einwohner.",
    },
    {
      icon: "ClipboardCheck",
      num: "03",
      label: "Voraussetzungen?",
      answer: "Keine eigene IT-Abteilung nötig. Migration & Onboarding inklusive.",
    },
    {
      icon: "Zap",
      num: "04",
      label: "Was kann es?",
      answer:
        "Stark bei Bürgerservice & Standesamt. DSGVO · DE-Server · BSI · vergabegeeignet.",
    },
    {
      icon: "TriangleAlert",
      num: "05",
      label: "Was fehlt noch?",
      answer:
        "Barrierefreiheit (BITV 2.0) und Schnittstellen (OZG-Adapter) offen.",
      tone: "gap",
    },
    {
      icon: "Mail",
      num: "06",
      label: "Wie weiter?",
      answer: "Amtshelden stellt den Kontakt zum Anbieter her.",
      tone: "next",
    },
  ],
};
