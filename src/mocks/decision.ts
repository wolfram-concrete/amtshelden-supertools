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
  toolMark: string;
  category: string;
  verified: boolean;
  /** Anzeigeformat des Prüfdatums */
  lastChecked: string;
  scenario: string;
  price: string;
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
  scenario:
    "Ausgangslage: Kommune mit 12.400 Einwohnern, keine eigene IT-Abteilung.",
  price: "ab 8.000 €",
  ctaHref: "/anfrage?tool=vivioakte",
  questions: [
    {
      icon: "Target",
      num: "01",
      label: "Passt zum Problem?",
      answer:
        "E-Akte & Dokumentenmanagement — von Grund auf für Kommunen ohne eigene IT gebaut.",
    },
    {
      icon: "UsersRound",
      num: "02",
      label: "Für unsere Größe?",
      answer:
        "Ausgelegt auf 5.000–50.000 Einwohner, erstmalige Digitalisierung.",
    },
    {
      icon: "ClipboardCheck",
      num: "03",
      label: "Voraussetzungen?",
      answer:
        "Keine eigene IT-Abteilung nötig. Migrations-Team & Onboarding inklusive.",
    },
    {
      icon: "Zap",
      num: "04",
      label: "Was kann es wirklich?",
      answer:
        "Digitale Aktenführung, stark bei Bürgerservice & Standesamt. DSGVO · DE-Server · BSI · vergabegeeignet.",
    },
    {
      icon: "TriangleAlert",
      num: "05",
      label: "Was fehlt noch?",
      answer:
        "Keine öffentliche Angabe zu Barrierefreiheit (BITV 2.0) und Schnittstellen (OZG-Adapter / REST-API).",
      tone: "gap",
    },
    {
      icon: "Mail",
      num: "06",
      label: "Wie komme ich weiter?",
      answer: "Amtshelden stellt den Kontakt zum Anbieter her.",
      tone: "next",
    },
  ],
};
