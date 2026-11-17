/**
 * „Echte Anwendung" — Referenzkarten für drei reale Tools aus dem redaktionell
 * freigegebenen Bestand (`src/data/software-master.ts`). Jede Karte zeigt
 * Name, Bereich, Logo und einen Software-Screenshot (Header) sowie den echten,
 * gescrapten Pitch (lt. Anbieter). Bewusst KEINE Compliance-Tags: DSGVO/Server/
 * BSI sind für diese drei Tools nicht bestätigt (siehe software-master.json),
 * also werden keine Zusagen suggeriert (AGENTS.md: Quellenbindung, Trennung von
 * Signal und redaktioneller Aussage). „Was sie leistet" verlinkt auf das Profil
 * `/tools/[slug]`.
 */

import type { ReferenceCard } from "@/types/content";

export const referenzen: ReferenceCard[] = [
  {
    slug: "ceyoniq",
    name: "Ceyoniq",
    provider: "Ceyoniq",
    categoryLabel: "E-Akte & Dokumentenmanagement",
    pitch: "ECM und Dokumentenmanagement für die kommunale Digitalisierung.",
    mark: "CE",
    markBg: "var(--color-brand)",
    logoUrl: "https://www.google.com/s2/favicons?domain=ceyoniq.com&sz=128",
    header: {
      url: "/brand/screenshots/ceyoniq/shot-1.jpg",
      alt: "Software-Oberfläche von Ceyoniq",
      width: 1200,
      height: 750,
    },
    motif: {
      url: "/brand/generated/bereich-e-akte.jpg",
      alt: "Sachbearbeitung mit Aktenordnern am Bildschirm",
      width: 1600,
      height: 900,
    },
    shortFacts: ["Basis-Profil"],
    lastCheckedAt: "2026-08-14",
  },
  {
    slug: "nolis",
    name: "Nolis",
    provider: "Nolis",
    categoryLabel: "Bürgerservice & Fachverfahren",
    pitch: "Kommunale Fachsoftware und Digitalisierungslösungen.",
    mark: "NO",
    markBg: "var(--color-brand)",
    logoUrl: "https://www.google.com/s2/favicons?domain=nolis.de&sz=128",
    header: {
      url: "/brand/screenshots/nolis/shot-1.jpg",
      alt: "Software-Oberfläche von Nolis",
      width: 1200,
      height: 750,
    },
    motif: {
      url: "/brand/generated/bereich-buergerservice.jpg",
      alt: "Beratungsgespräch am Schreibtisch in der Verwaltung",
      width: 1600,
      height: 900,
    },
    shortFacts: ["Basis-Profil"],
    lastCheckedAt: "2026-08-14",
  },
  {
    slug: "opendesk",
    name: "openDesk",
    provider: "openDesk",
    categoryLabel: "Kommunikation & Zusammenarbeit",
    pitch:
      "Souveräne Office- und Kollaborationssuite für die öffentliche Verwaltung.",
    mark: "OP",
    markBg: "var(--color-brand)",
    logoUrl: "https://www.google.com/s2/favicons?domain=opendesk.eu&sz=128",
    header: {
      url: "/brand/screenshots/opendesk/shot-1.jpg",
      alt: "Software-Oberfläche von openDesk",
      width: 1200,
      height: 750,
    },
    motif: {
      url: "/brand/generated/bereich-kommunikation.jpg",
      alt: "Team einer Verwaltung in einer Besprechung",
      width: 1600,
      height: 900,
    },
    shortFacts: ["Open Source", "Basis-Profil"],
    lastCheckedAt: "2026-08-14",
  },
];
