/**
 * Shared types — Payload-kompatible Interfaces ohne Payload-Import.
 * Diese Typen bilden 1:1 das spätere Payload Block-Schema ab.
 *
 * Regel: KEIN Import aus 'payload' oder '@payloadcms/*' in dieser Datei.
 */

// ============================================================
// BASE
// ============================================================

export interface BlockBase {
  blockType?: string;
  id?: string;
}

export interface PayloadImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  mimeType?: string;
}

export interface PayloadLink {
  text: string;
  url: string;
  newTab?: boolean;
}

// ============================================================
// SUPERTOOLS DOMAIN MODELS
// ============================================================

/** DSGVO / Compliance-Status für die Highlight-Leiste */
export type DsgvoStatus = "konform" | "in-pruefung" | "mit-einschraenkungen";
export type ServerLocation = "deutschland" | "eu" | "international";
export type VergabeEignung = "ja" | "nein" | "in-pruefung";

/** Profil-Stufen (README Kap. 31) */
export type ProfileTier = "basis" | "verified" | "partner" | "addon";

/** Kategorie eines Tools */
export interface ToolCategory {
  slug: string;
  name: string;
  description?: string;
}

/** Ansprechpartner-Info (Add-on ab Stufe 3) */
export interface Contact {
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  photo?: PayloadImage;
  quote?: string;
  responseTime?: string;
}

/** Erfahrungsbericht einer Behörde */
export interface Testimonial {
  authorName: string;
  authorRole?: string;
  authorLocation?: string;
  behoerdenTyp?: string;
  einwohnerzahl?: number;
  quote: string;
  photo?: PayloadImage;
}

/** Highlight-Leiste oben rechts im Profil (immer sichtbar) */
export interface ProfileHighlights {
  dsgvo: DsgvoStatus;
  serverLocation: ServerLocation;
  bsiZertifizierung?: boolean;
  vergabeEignung?: VergabeEignung;
  contact?: Contact; // ab Verified Listing
}

// ============================================================
// SEITENTYPEN (4 Typen laut README Kap. 26)
// ============================================================

export type PageType =
  | "startseite"     // A — Editorial Frontpage
  | "kategorie"      // B — Kuratierte Liste
  | "tool-profil"    // C — Herzstück (8 Zonen)
  | "wissen";        // D — Pulse / Artikel
