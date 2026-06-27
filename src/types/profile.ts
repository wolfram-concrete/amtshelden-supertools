/**
 * Tool-Profil Types — bilden die 8 Zonen aus README Kap. 27 ab.
 *
 * Quelle: supertools_profil_beispiel.html (VivioAkte) v0.3.0
 * Stand: Mai 2026
 *
 * Hinweis: Diese Typen sind Payload-kompatibel — werden später 1:1
 * auf Block-Schemata abgebildet.
 */

import type {
  Contact,
  DsgvoStatus,
  PayloadImage,
  PayloadLink,
  ProfileTier,
  ServerLocation,
  VergabeEignung,
} from "./blocks";

// ============================================================
// HERO (Zone 1)
// ============================================================

export interface ProfilHeroData {
  /** Kategorie-Label oberhalb der Headline */
  categoryLabel: string;
  /** Headline (max ~120 Zeichen) */
  title: string;
  /** Lead-Absatz unter der Headline */
  lead: string;
  /** Geprüft-von Byline */
  byline: {
    editor: string;
    updatedAt: string; // "März 2026"
    avatar?: PayloadImage;
  };
  /** Verifiziert-Badge anzeigen */
  verified?: boolean;
  /** Hero-Bild + Firmen-Overlay */
  heroImage?: PayloadImage;
  heroCaption?: string;
  company: {
    mark: string; // "VA"
    name: string; // "VivioAkte"
    type: string; // "Software GmbH · Hamburg"
  };
  /** Amtshelden-Urteil — 2-3 Sätze redaktionell */
  urteil: string;
  /** Frühe Pull-Quote — menschliche Stimme sofort */
  pullQuote?: {
    text: string;
    source: string;
  };
  /** Einleitender Body-Text (kann mehrere Absätze haben) */
  body?: string[];
}

// ============================================================
// PASS DAS ZU UNS (Zone 2)
// ============================================================

export interface PassDasData {
  body: string;
  /** "Fit"-Tags (z.B. "Kommunen 5k-50k EW", "Bürgerservice") */
  fitTags: { label: string; neutral?: boolean }[];
  /** "Nicht geeignet für" — ehrliche Einschränkung */
  notFit: {
    label: string;
    text: string;
    alternativeLinks?: PayloadLink[];
  };
}

// ============================================================
// IMPLEMENTIERUNG (Zone 3)
// ============================================================

export interface ImplementierungTile {
  icon: string; // emoji oder Lucide-Name
  label: string;
  value: string;
  description: string;
}

export interface SolutionCard {
  challenge: string;
  solution: string;
  context: string;
  status?: "gelöst" | "offen";
}

export interface ImplementierungData {
  intro: string;
  tiles: ImplementierungTile[];
  solutionsHeading?: string;
  solutions: SolutionCard[];
}

// ============================================================
// CASES (Zone 4 — Add-on Placeholder)
// ============================================================

export interface CasesData {
  enabled: boolean;
  cases?: CaseEntry[];
  placeholderText?: string;
}

export interface CaseEntry {
  title: string;
  behoerdenTyp: string;
  einwohnerzahl: number;
  ort: string;
  summary: string;
  link?: PayloadLink;
  cover?: PayloadImage;
}

// ============================================================
// KONTAKT (Zone 6 — Anfrage über Amtshelden)
// ============================================================

export interface KontaktData {
  intro: string;
  links: {
    website?: string;
    email?: string;
    phone?: string;
  };
}

// ============================================================
// ALTERNATIVEN (Zone 7)
// ============================================================

export interface AlternativeEntry {
  mark: string; // 2-Buchstaben-Abkürzung
  markBg?: string; // CSS-Farbe für Mark-Hintergrund
  name: string;
  why: string;
  href: string;
}

export interface AlternativenData {
  intro: string;
  alternatives: AlternativeEntry[];
}

// ============================================================
// CTA (Zone 8)
// ============================================================

export interface ProfilCtaData {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: PayloadLink;
  secondaryCta?: PayloadLink;
  note?: string;
}

// ============================================================
// SIDEBAR — Compliance + Quick Facts + Why + Related
// ============================================================

export interface ComplianceWidget {
  icon: string; // emoji
  name: string;
  value: string;
  detail: string;
  positive?: boolean;
}

export interface QuickFact {
  key: string;
  value: string;
}

export interface WhyEntry {
  title: string;
  description: string;
}

export interface RelatedLink {
  icon: string;
  title: string;
  meta: string; // "Supertools Wissen · 5 Min."
  href: string;
}

export interface ProfilSidebarData {
  complianceWidgets: ComplianceWidget[];
  quickFacts: QuickFact[];
  ctaLabel: string;
  ctaHref: string;
  whyEntries: WhyEntry[];
  relatedLinks: RelatedLink[];
}

// ============================================================
// TOOL-PROFIL Gesamtmodell
// ============================================================

export interface ToolProfile {
  /** URL-Slug, z.B. "vivioakte" */
  slug: string;
  /** Anzeigetitel (= company.name in Hero) */
  name: string;
  /** Kategorie-Slug, z.B. "e-akte" */
  categorySlug: string;
  /** Profil-Stufe */
  tier: ProfileTier;

  /**
   * Datum der letzten redaktionellen Prüfung (ISO-Datum, z.B. "2026-06-12").
   * Wird in Hero-Byline, Sidebar und Listen-Zeilen prominent angezeigt —
   * zentrales Trust-Element laut Strategie-Meeting (Whiteboard 12.06.2026).
   */
  lastCheckedAt: string;

  /** Zonen */
  hero: ProfilHeroData;
  passDas: PassDasData;
  implementierung: ImplementierungData;
  cases: CasesData;
  kontakt: KontaktData;
  alternativen: AlternativenData;
  cta: ProfilCtaData;

  /** Sidebar */
  sidebar: ProfilSidebarData;

  /** Ansprechpartner (Add-on, optional) */
  contact?: Contact;

  /** Compliance-Status (für Listen-Ansichten und Sidebar-Generierung) */
  compliance: {
    dsgvo: DsgvoStatus;
    serverLocation: ServerLocation;
    bsiZertifizierung?: boolean;
    vergabeEignung?: VergabeEignung;
  };
}
