/**
 * Tool-Card-Liste — Steckbrief-Format für Listen-Ansichten
 * (Startseite Featured, Kategorie-Seite, Suche).
 *
 * Diese Liste enthält bewusst weniger Tiefe als die vollständigen
 * ToolProfile (z.B. VivioAkte) — sie dient dem schnellen Überblick.
 */

import type { ToolCardSummary } from "@/types/content";

export const toolCards: ToolCardSummary[] = [
  // E-Akte & Dokumentenmanagement
  {
    slug: "vivioakte",
    name: "VivioAkte",
    provider: "VivioAkte GmbH · Hamburg",
    categorySlug: "e-akte-dokumentenmanagement",
    categoryLabel: "E-Akte & Dokumentenmanagement",
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
  {
    slug: "doxbox-kommunal",
    name: "DoxBox Kommunal",
    provider: "DoxBox AG · München",
    categorySlug: "e-akte-dokumentenmanagement",
    categoryLabel: "E-Akte & Dokumentenmanagement",
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
    slug: "fabasoft-egov",
    name: "Fabasoft eGov",
    provider: "Fabasoft Deutschland GmbH · Linz/München",
    categorySlug: "e-akte-dokumentenmanagement",
    categoryLabel: "E-Akte & Dokumentenmanagement",
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
    slug: "nordkom-digital",
    name: "NordKom Digital",
    provider: "NordKom Software · Kiel",
    categorySlug: "e-akte-dokumentenmanagement",
    categoryLabel: "E-Akte & Dokumentenmanagement",
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
