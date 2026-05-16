/**
 * Tool-Card-Liste — Steckbrief-Format für Listen-Ansichten
 * (Startseite Featured, Kategorie-Seite, Suche).
 *
 * Diese Liste enthält bewusst weniger Tiefe als die vollständigen
 * ToolProfile (z.B. VivioAkte) — sie dient dem schnellen Überblick.
 */

import type { ToolCardSummary } from "@/types/content";

const EAKTE = "e-akte-dokumentenmanagement";
const EAKTE_LABEL = "E-Akte & Dokumentenmanagement";

export const toolCards: ToolCardSummary[] = [
  // ── E-Akte & Dokumentenmanagement ──────────────────────────
  {
    slug: "aktima",
    name: "Aktima",
    provider: "Aktima Software GmbH · Leipzig",
    categorySlug: EAKTE,
    categoryLabel: EAKTE_LABEL,
    pitch:
      "Schlanke E-Akte für kleine bis mittlere Kommunen. Schneller Rollout, klare Standardprozesse, deutsches Rechenzentrum.",
    tier: "basis",
    facts: {
      price: "ab 8.500 €/Jahr",
      setup: "6–10 Wochen",
      operation: "Cloud (SaaS)",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: false, vergabe: true },
    mark: "AK",
    markBg: "#0891B2",
  },
  {
    slug: "arge-edok",
    name: "ARGE eDok",
    provider: "ARGE Digital eG · Wiesbaden",
    categorySlug: EAKTE,
    categoryLabel: EAKTE_LABEL,
    pitch:
      "Genossenschaftliche On-Premise-Lösung mit starker Akten- und Vorgangskontrolle für komplexere Verwaltungen.",
    tier: "verified",
    facts: {
      price: "ab 22.000 €/Jahr",
      setup: "16–22 Wochen",
      operation: "OnPremise",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: true, vergabe: true },
    mark: "AE",
    markBg: "#15803D",
    verified: true,
  },
  {
    slug: "biebridocs",
    name: "BiebriDocs",
    provider: "Biebri Cloud GmbH · Bremen",
    categorySlug: EAKTE,
    categoryLabel: EAKTE_LABEL,
    pitch:
      "Cloud-DMS mit Fokus auf einfache Bedienung und schnelle Posteingangsdigitalisierung — speziell für kleine Behörden.",
    tier: "basis",
    facts: {
      price: "ab 5.500 €/Jahr",
      setup: "4–8 Wochen",
      operation: "Cloud (SaaS)",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: false, vergabe: true },
    mark: "BD",
    markBg: "#DC2626",
  },
  {
    slug: "datacite-verwaltung",
    name: "Datacite Verwaltung",
    provider: "Datacite Systems AG · Köln",
    categorySlug: EAKTE,
    categoryLabel: EAKTE_LABEL,
    pitch:
      "Hybrid-Lösung mit Schwerpunkt auf revisionssicherer Langzeitarchivierung nach BSI-TR-RESISCAN.",
    tier: "verified",
    facts: {
      price: "ab 14.000 €/Jahr",
      setup: "12–18 Wochen",
      operation: "Hybrid",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: true, vergabe: true },
    mark: "DV",
    markBg: "#2563EB",
    verified: true,
  },
  {
    slug: "doxbox-kommunal",
    name: "DoxBox Kommunal",
    provider: "DoxBox AG · München",
    categorySlug: EAKTE,
    categoryLabel: EAKTE_LABEL,
    pitch:
      "Querschnittslösung für mittelgroße Verwaltungen mit ämterübergreifenden Workflows und SAP-Anbindung.",
    tier: "partner",
    facts: {
      price: "ab 28.000 €/Jahr",
      setup: "4–9 Monate",
      operation: "Hybrid",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: true, vergabe: true },
    mark: "DB",
    markBg: "#2563EB",
    verified: true,
  },
  {
    slug: "envent-dokumente",
    name: "Envent Dokumente",
    provider: "Envent IT GmbH · Hannover",
    categorySlug: EAKTE,
    categoryLabel: EAKTE_LABEL,
    pitch:
      "Modulare Cloud-Plattform mit guter Anbindung an gängige Bürgerservice-Portale.",
    tier: "basis",
    facts: {
      price: "ab 7.200 €/Jahr",
      setup: "8–12 Wochen",
      operation: "Cloud (SaaS)",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: false, vergabe: true },
    mark: "EN",
    markBg: "#F59E0B",
  },
  {
    slug: "fabasoft-egov",
    name: "Fabasoft eGov",
    provider: "Fabasoft Deutschland GmbH · Linz/München",
    categorySlug: EAKTE,
    categoryLabel: EAKTE_LABEL,
    pitch:
      "On-Premise-fähige DMS-Lösung für große Behörden mit hohen Anforderungen an SAP-Integration und Auditierbarkeit.",
    tier: "verified",
    facts: {
      price: "auf Anfrage",
      setup: "6–12 Monate",
      operation: "OnPremise / Cloud",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: true, vergabe: true },
    mark: "FE",
    markBg: "#7C3AED",
    verified: true,
  },
  {
    slug: "greenakte",
    name: "GreenAkte",
    provider: "GreenAkte UG · Freiburg",
    categorySlug: EAKTE,
    categoryLabel: EAKTE_LABEL,
    pitch:
      "E-Akte mit CO₂-Bilanzierung pro Vorgang. Für Kommunen, die ihre Nachhaltigkeitsziele dokumentieren wollen.",
    tier: "verified",
    facts: {
      price: "ab 9.800 €/Jahr",
      setup: "10–14 Wochen",
      operation: "Cloud (SaaS)",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: false, vergabe: true },
    mark: "GA",
    markBg: "#15803D",
    verified: true,
  },
  {
    slug: "heimat-dokumente",
    name: "Heimat Dokumente",
    provider: "Heimat GovTech GmbH · Erfurt",
    categorySlug: EAKTE,
    categoryLabel: EAKTE_LABEL,
    pitch:
      "Auf ländliche Verwaltungen und Verbandsgemeinden zugeschnitten. Offline-Modus für Außenstellen.",
    tier: "basis",
    facts: {
      price: "ab 6.800 €/Jahr",
      setup: "8–10 Wochen",
      operation: "Cloud (SaaS)",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: false, vergabe: true },
    mark: "HD",
    markBg: "#A16207",
  },
  {
    slug: "iakte-verwaltung",
    name: "iAkte Verwaltung",
    provider: "iAkte AG · Stuttgart",
    categorySlug: EAKTE,
    categoryLabel: EAKTE_LABEL,
    pitch:
      "Strukturierte Aktenführung mit eingebautem Workflow-Designer für mittelgroße Verwaltungen.",
    tier: "verified",
    facts: {
      price: "ab 11.500 €/Jahr",
      setup: "10–14 Wochen",
      operation: "Cloud (SaaS)",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: true, vergabe: true },
    mark: "iA",
    markBg: "#0F766E",
    verified: true,
  },
  {
    slug: "komakt-dms",
    name: "Komakt DMS",
    provider: "Komakt Verwaltung GmbH · Dresden",
    categorySlug: EAKTE,
    categoryLabel: EAKTE_LABEL,
    pitch:
      "Querschnittslösung mit Hybrid-Architektur — speziell für Landkreise und größere Mittelstädte.",
    tier: "partner",
    facts: {
      price: "ab 19.000 €/Jahr",
      setup: "14–18 Wochen",
      operation: "Hybrid",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: true, vergabe: true },
    mark: "KD",
    markBg: "#9333EA",
    verified: true,
  },
  {
    slug: "linus-akten",
    name: "Linus Akten",
    provider: "Linus Software GmbH · Bonn",
    categorySlug: EAKTE,
    categoryLabel: EAKTE_LABEL,
    pitch:
      "On-Premise-Lösung mit starker Mandantentrennung — für Bundesbehörden und Aufsichtsorganisationen.",
    tier: "verified",
    facts: {
      price: "ab 24.000 €/Jahr",
      setup: "18–24 Wochen",
      operation: "OnPremise",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: true, vergabe: true },
    mark: "LA",
    markBg: "#1E40AF",
    verified: true,
  },
  {
    slug: "nordkom-digital",
    name: "NordKom Digital",
    provider: "NordKom Software · Kiel",
    categorySlug: EAKTE,
    categoryLabel: EAKTE_LABEL,
    pitch:
      "Spezialisiert auf norddeutsche Kommunen — stark bei Standesamt, Einwohnermeldewesen und Bürgerservice-Workflows.",
    tier: "basis",
    facts: {
      price: "ab 12.000 €/Jahr",
      setup: "10–16 Wochen",
      operation: "Cloud (SaaS)",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: false, vergabe: true },
    mark: "NK",
    markBg: "#059669",
  },
  {
    slug: "paperlite",
    name: "PaperLite",
    provider: "PaperLite UG · Karlsruhe",
    categorySlug: EAKTE,
    categoryLabel: EAKTE_LABEL,
    pitch:
      "Minimal-Setup E-Akte für sehr kleine Verwaltungen (unter 5.000 EW). Pauschalpreis, kein Onboarding-Aufwand.",
    tier: "basis",
    facts: {
      price: "ab 4.200 €/Jahr",
      setup: "4–6 Wochen",
      operation: "Cloud (SaaS)",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: false, vergabe: true },
    mark: "PL",
    markBg: "#EA580C",
  },
  {
    slug: "register-pro",
    name: "Register Pro",
    provider: "Register Systems AG · Berlin",
    categorySlug: EAKTE,
    categoryLabel: EAKTE_LABEL,
    pitch:
      "On-Premise-DMS für Bundesoberbehörden und Landesministerien mit hohen Auditing-Anforderungen.",
    tier: "partner",
    facts: {
      price: "ab 26.000 €/Jahr",
      setup: "18–26 Wochen",
      operation: "OnPremise",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: true, vergabe: true },
    mark: "RP",
    markBg: "#BE185D",
    verified: true,
  },
  {
    slug: "vivioakte",
    name: "VivioAkte",
    provider: "VivioAkte GmbH · Hamburg",
    categorySlug: EAKTE,
    categoryLabel: EAKTE_LABEL,
    pitch:
      "Digitale Aktenführung speziell für Kommunen ohne eigene IT-Abteilung. Browserbasiert, Server in Frankfurt.",
    tier: "verified",
    facts: {
      price: "ab 8.000 €/Jahr",
      setup: "8–14 Wochen",
      operation: "Cloud (SaaS)",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: true, vergabe: true },
    mark: "VA",
    markBg: "#009460",
    verified: true,
  },

  // Bürgerservice & Fachverfahren
  {
    slug: "ozg-portal",
    name: "OZG-Portal",
    provider: "Govman Digital · Berlin",
    categorySlug: "buergerservice-fachverfahren",
    categoryLabel: "Bürgerservice & Fachverfahren",
    pitch:
      "Komplettes Bürgerservice-Portal mit Antragsstrecken nach FIM-Standard. Bewährt in über 80 Kommunen.",
    tier: "partner",
    facts: {
      price: "ab 14.500 €/Jahr",
      setup: "12–18 Wochen",
      operation: "Cloud (SaaS)",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: true, vergabe: true },
    mark: "OZ",
    markBg: "#2563EB",
    verified: true,
  },
  {
    slug: "terminius",
    name: "Terminius",
    provider: "Terminius UG · Leipzig",
    categorySlug: "buergerservice-fachverfahren",
    categoryLabel: "Bürgerservice & Fachverfahren",
    pitch:
      "Schlanke Terminvergabe-Lösung mit Wartebereich-Anzeige, SMS-Erinnerung und API zu gängigen Fachverfahren.",
    tier: "verified",
    facts: {
      price: "ab 1.800 €/Jahr",
      setup: "2–4 Wochen",
      operation: "Cloud (SaaS)",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: false, vergabe: true },
    mark: "TM",
    markBg: "#0EA5E9",
    verified: true,
  },

  // Finanzen & Haushalt
  {
    slug: "doppik-pro",
    name: "Doppik Pro",
    provider: "Kämmerei Software AG · Münster",
    categorySlug: "finanzen-haushalt",
    categoryLabel: "Finanzen & Haushalt",
    pitch:
      "Doppik-Software für kleine bis mittlere Kommunen mit GoBD-konformer Buchhaltung und Konzernabschluss-Modul.",
    tier: "verified",
    facts: {
      price: "ab 18.000 €/Jahr",
      setup: "16–24 Wochen",
      operation: "OnPremise",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: true, vergabe: true },
    mark: "DP",
    markBg: "#7C3AED",
    verified: true,
  },

  // Personal
  {
    slug: "personnel-suite",
    name: "Personnel Suite TVöD",
    provider: "OEffPers GmbH · Stuttgart",
    categorySlug: "personal-organisation",
    categoryLabel: "Personal & Organisation",
    pitch:
      "Personalmanagement mit TVöD-Logik, Mitbestimmungs-Workflow und Anbindung an gängige Abrechnungssysteme.",
    tier: "basis",
    facts: {
      price: "ab 9.500 €/Jahr",
      setup: "10–14 Wochen",
      operation: "Cloud / Hybrid",
    },
    compliance: { dsgvo: true, serverDe: true, bsi: false, vergabe: true },
    mark: "PS",
    markBg: "#DC2626",
  },
];

export const toolCardsByCategory: Record<string, ToolCardSummary[]> =
  toolCards.reduce(
    (acc, t) => {
      (acc[t.categorySlug] ||= []).push(t);
      return acc;
    },
    {} as Record<string, ToolCardSummary[]>,
  );
