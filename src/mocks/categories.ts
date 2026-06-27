/**
 * Mock-Kategorien — 6 redaktionell beschriebene Kategorien.
 * Slugs entsprechen den URLs unter /kategorien/[slug].
 */

import type { CategoryDefinition } from "@/types/content";

export const categories: CategoryDefinition[] = [
  {
    slug: "e-akte-dokumentenmanagement",
    name: "E-Akte & Dokumentenmanagement",
    themenfeldSlug: "transformation-ki",
    tagline:
      "Software für digitale Aktenführung, Posteingang, Aufbewahrung und Vorgangsbearbeitung.",
    intro:
      "Die elektronische Akte ist Kernstück der Verwaltungsdigitalisierung. Wir kuratieren Lösungen, die ohne IT-Abteilung einführbar sind — und solche, die für komplexe Querschnittsbedarfe ausgelegt sind. Der Unterschied ist groß; wir machen ihn transparent.",
    topics: ["E-Akte", "DMS", "Posteingang", "Workflow", "Aufbewahrung"],
    toolCount: 16,
    icon: "folder",
    accentColor: "#009460",
  },
  {
    slug: "buergerservice-fachverfahren",
    name: "Bürgerservice & Fachverfahren",
    themenfeldSlug: "kommunikation-krise",
    tagline:
      "Online-Anträge, OZG-Leistungen, Terminvergabe, Self-Service-Portale für Bürger:innen.",
    intro:
      "OZG-Konformität wird oft als technische Frage missverstanden. In Wahrheit ist sie eine Frage der Prozessqualität. Wir zeigen Lösungen, die Bürger:innen wirklich nutzen — und nicht nur ein Häkchen auf der Checkliste setzen.",
    topics: ["OZG", "Anträge", "Termine", "Portale"],
    toolCount: 22,
    icon: "building",
    accentColor: "#2563EB",
  },
  {
    slug: "finanzen-haushalt",
    name: "Finanzen & Haushalt",
    themenfeldSlug: "moderne-fuehrung",
    tagline:
      "Doppik-Software, Haushaltsplanung, Zahlungsverkehr, Steuerveranlagung.",
    intro:
      "Die Doppik hat den kommunalen Finanzbereich umgekrempelt. Wir vergleichen Lösungen, die kleine Kämmereien meistern — und solche, die für Großstädte mit komplexen Konzernstrukturen ausgelegt sind.",
    topics: ["Doppik", "Haushalt", "Steuer", "Zahlungsverkehr"],
    toolCount: 9,
    icon: "coins",
    accentColor: "#7C3AED",
  },
  {
    slug: "personal-organisation",
    name: "Personal & Organisation",
    themenfeldSlug: "smartes-personalmanagement",
    tagline:
      "Dienstplanung, Abwesenheiten, Personalakte, Onboarding für Verwaltungen.",
    intro:
      'Personalmanagement-Software für Behörden ist kein „HR-Tool" — sie muss tarifrechtliche Spezifika abbilden, Mitbestimmungsrechte respektieren und mit Altsystemen sprechen. Hier liegen die Stolperfallen.',
    topics: ["Personal", "Dienstplan", "Abwesenheit", "Tarif"],
    toolCount: 7,
    icon: "users",
    accentColor: "#DC2626",
  },
  {
    slug: "geo-bauen-umwelt",
    name: "Geo, Bauen & Umwelt",
    themenfeldSlug: "transformation-ki",
    tagline:
      "GIS, Bauantragsverfahren, Liegenschaftskataster, Umweltdaten-Management.",
    intro:
      "Geodaten sind die Grundlage fast jeder kommunalen Entscheidung. Wir betrachten Lösungen, die das XPlanung-Schema sauber implementieren — und solche, die einen integrierten Bauantragsworkflow mitbringen.",
    topics: ["GIS", "Bauantrag", "Kataster", "Umweltdaten"],
    toolCount: 11,
    icon: "map",
    accentColor: "#059669",
  },
  {
    slug: "kommunikation-zusammenarbeit",
    name: "Kommunikation & Zusammenarbeit",
    themenfeldSlug: "kommunikation-krise",
    tagline:
      "Videokonferenzen, Chat, kollaborative Dokumente — alles DSGVO-konform und vergabefähig.",
    intro:
      "Microsoft Teams und Zoom dominieren den Markt — doch viele Behörden brauchen Alternativen, die ihre Vergabeanforderungen erfüllen. Wir zeigen, was tatsächlich für die öffentliche Verwaltung tauglich ist.",
    topics: ["Video", "Chat", "Office", "Collab"],
    toolCount: 8,
    icon: "chat",
    accentColor: "#EA580C",
  },
];

export const categoryRegistry: Record<string, CategoryDefinition> =
  Object.fromEntries(categories.map((c) => [c.slug, c]));

/** Kategorien gruppiert nach Themenfeld-Slug */
export const categoriesByThemenfeld: Record<string, CategoryDefinition[]> =
  categories.reduce(
    (acc, c) => {
      (acc[c.themenfeldSlug] ||= []).push(c);
      return acc;
    },
    {} as Record<string, CategoryDefinition[]>,
  );
