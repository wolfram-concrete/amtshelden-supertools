/**
 * Die 4 verbindlichen Themenfelder (Strategie-Meeting 12.06.2026).
 *
 * Oberste Strukturebene von Supertools — gespiegelt aus den
 * Amtshelden-Wissensgebieten. Verhindert, dass das Verzeichnis beliebig wird:
 * es geht nicht um jede Software der Welt, sondern um Tools, die in den
 * Themenfeldern von Amtshelden für Behörden relevant sind.
 *
 * Kategorien (src/mocks/categories.ts) sind diesen Themenfeldern via
 * `themenfeldSlug` zugeordnet.
 */

import type { ThemenfeldDefinition } from "@/types/content";

export const themenfelder: ThemenfeldDefinition[] = [
  {
    slug: "kommunikation-krise",
    name: "Kommunikation & Krise",
    tagline:
      "Bürgerkommunikation, Social Media, Krisenkommunikation und der Dialog mit der Öffentlichkeit.",
    intro:
      "Verwaltung lebt von Kommunikation — nach innen und nach außen. Wir kuratieren Software, die Bürgerdialog, Social-Media-Arbeit und Krisenkommunikation für Behörden handhabbar macht. Nicht für Konzerne umgerüstet, sondern für die Realität öffentlicher Stellen gedacht.",
    icon: "bubble",
    accentColor: "#2563EB",
    image: {
      url: "/brand/Images/magnific_four-public-administratio_LUFSlrOswO.jpg",
      alt: "Vier Verwaltungsmitarbeitende in einer Besprechung am Tisch",
    },
  },
  {
    slug: "smartes-personalmanagement",
    name: "Smartes Personalmanagement",
    tagline:
      "Recruiting, Dienstplanung, Onboarding und Personalakte — tarif- und mitbestimmungskonform.",
    intro:
      "Personalgewinnung ist die vielleicht größte Herausforderung der öffentlichen Verwaltung. Software muss hier tarifrechtliche Spezifika abbilden, Mitbestimmungsrechte respektieren und mit Altsystemen sprechen. Wir zeigen, was tatsächlich für Behörden taugt.",
    icon: "users",
    accentColor: "#DC2626",
    image: {
      url: "/brand/Images/magnific_an-experienced-public-adm_LUFSlCvswO.jpg",
      alt: "Erfahrene Verwaltungskraft bespricht mit Kollegen etwas am Bildschirm",
    },
  },
  {
    slug: "transformation-ki",
    name: "Transformation & KI",
    tagline:
      "E-Akte, Digitalisierung, KI-Werkzeuge und die technische Modernisierung der Verwaltung.",
    intro:
      "Die digitale Transformation der Verwaltung ist kein Projekt, sondern eine Daueraufgabe. Von der E-Akte bis zu KI-gestützten Werkzeugen kuratieren wir Software, die den Wandel handhabbar macht — DSGVO-konform, vergabefähig, aus Behördenperspektive eingeordnet.",
    icon: "sparkles",
    accentColor: "#009460",
    image: {
      url: "/brand/Images/magnific_a-project-workshop-inside_5xvrkdeKxe.jpg",
      alt: "Workshop zum Software-Rollout in der Verwaltung mit Whiteboard",
    },
  },
  {
    slug: "moderne-fuehrung",
    name: "Moderne Führung",
    tagline:
      "Steuerung, Haushalt, Controlling und Werkzeuge für Führungsverantwortung in der Verwaltung.",
    intro:
      "Führung in der Verwaltung heißt: steuern, entscheiden, Verantwortung tragen — oft unter knappen Ressourcen. Wir kuratieren Software, die Haushalt, Controlling und Steuerung unterstützt und Führungskräften belastbare Entscheidungsgrundlagen liefert.",
    icon: "target",
    accentColor: "#7C3AED",
    image: {
      url: "/brand/Images/magnific_the-mayor-and-the-head-of_0p3M0zgTfW.jpeg",
      alt: "Bürgermeisterin und Amtsleiter besprechen Kennzahlen am Tablet",
    },
  },
];

export const themenfeldRegistry: Record<string, ThemenfeldDefinition> =
  Object.fromEntries(themenfelder.map((t) => [t.slug, t]));
