/**
 * Content-Types: Kategorien + Pulse-Artikel.
 * Werden für Startseite, Kategorie-Seiten und Wissensbereich genutzt.
 *
 * Payload-kompatibel — keine Payload-Imports.
 */

import type { BrandIconName } from "@/components/icons/BrandIcon";

import type { PayloadImage, PayloadLink } from "./blocks";

// ============================================================
// THEMENFELD (oberste Strukturebene — Strategie-Meeting 12.06.2026)
// ============================================================

/**
 * Die 4 verbindlichen Themenfelder aus dem Strategie-Meeting.
 * Sie sind die oberste Navigationsebene und verhindern, dass Supertools
 * beliebig wird — gespiegelt aus den Amtshelden-Wissensgebieten.
 */
export interface ThemenfeldDefinition {
  slug: string;
  name: string;
  /** Kurze Beschreibung — 1-2 Sätze */
  tagline: string;
  /** Längere redaktionelle Einleitung (Detail-Seite) */
  intro?: string;
  icon?: BrandIconName;
  accentColor?: string;
  /** „im Aufbau" — wenn noch keine/wenige Kategorien vorhanden */
  inAufbau?: boolean;
}

// ============================================================
// CATEGORY
// ============================================================

export interface CategoryDefinition {
  slug: string;
  name: string;
  /** Themenfeld, zu dem diese Kategorie gehört (oberste Ebene) */
  themenfeldSlug: string;
  /** Kurze redaktionelle Beschreibung — 1-2 Sätze */
  tagline: string;
  /** Längere Einleitung (für die Kategorie-Detail-Seite) */
  intro?: string;
  /** Sub-Topics in der Kategorie (Tags zum Filtern) */
  topics?: string[];
  /** Anzahl Tools in der Kategorie (mock — später aus DB) */
  toolCount?: number;
  /** Optional Hero-Bild für Kategorie-Detail */
  heroImage?: PayloadImage;
  /** Emoji oder Icon-Name für Magazin-Grid */
  icon?: BrandIconName;
  /** Farb-Akzent (CSS-Hex), für Mark/Badge */
  accentColor?: string;
}

// ============================================================
// PULSE / ARTICLE
// ============================================================

export type ArticleType = "wissen" | "pulse" | "leitfaden";

export interface Author {
  name: string;
  role?: string;
  avatar?: PayloadImage;
  bio?: string;
}

export interface ArticleSummary {
  slug: string;
  type: ArticleType;
  /** Themenfeld-Zuordnung (für Archiv-Gruppierung auf der Wissensseite) */
  themenfeldSlug?: string;
  /** Eyebrow-Label (Kategorie / Themenfeld) */
  eyebrow: string;
  title: string;
  /** Lead-Absatz */
  lead: string;
  /** Lesezeit in Minuten */
  readingTime: number;
  publishedAt: string; // ISO Date
  cover?: PayloadImage;
  author: Author;
  /** Tags für Querverlinkung */
  tags?: string[];
}

export interface ArticleBlock {
  /** Heading, paragraph, quote, list, image, divider */
  kind:
    | "heading"
    | "subheading"
    | "paragraph"
    | "quote"
    | "list"
    | "image"
    | "divider"
    | "callout";
  /** Text-Inhalt für heading/subheading/paragraph/quote */
  text?: string;
  /** Quelle für quote */
  source?: string;
  /** Items für list */
  items?: string[];
  /** Bild für image */
  image?: PayloadImage;
  /** Bildunterschrift */
  caption?: string;
  /** Callout-Variante */
  calloutVariant?: "info" | "warning" | "highlight";
}

export interface Article extends ArticleSummary {
  body: ArticleBlock[];
  related?: string[]; // slugs anderer Artikel
}

// ============================================================
// TOOL CARD-Form (für Listen)
// ============================================================

export interface ToolCardSummary {
  slug: string;
  name: string;
  /** Anbieter / Firmenname (z.B. "Software GmbH · Hamburg") */
  provider: string;
  /** Kategorie-Slug */
  categorySlug: string;
  /** Kategorie-Anzeigename */
  categoryLabel: string;
  /** 1-Satz Beschreibung */
  pitch: string;
  /** Profil-Stufe (free/verified/partner) */
  tier: "basis" | "verified" | "partner";
  /** Quick-Facts (Preis, Einführung, Betrieb) */
  facts: {
    price?: string;
    setup?: string;
    operation?: string; // Cloud / OnPremise / Hybrid
  };
  /** Compliance-Quickflags */
  compliance: {
    dsgvo: boolean;
    serverDe: boolean;
    bsi?: boolean;
    vergabe?: boolean;
  };
  /** Mark-Initialen + Farbe */
  mark: string;
  markBg?: string;
  /** Verifiziert-Status */
  verified?: boolean;
  /**
   * Datum der letzten redaktionellen Prüfung (ISO).
   * Zentrales Trust-Element — wird in der Listen-Zeile angezeigt.
   */
  lastCheckedAt: string;
}

/** Filter-Optionen für Kategorie-Seiten */
export interface ToolFilterState {
  operation?: ("Cloud" | "OnPremise" | "Hybrid")[];
  size?: ("Klein" | "Mittel" | "Groß")[];
  compliance?: ("dsgvo" | "serverDe" | "bsi" | "vergabe")[];
}
