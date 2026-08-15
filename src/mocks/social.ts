/**
 * Amtshelden Social — Trust-/Community-Block auf der Home.
 *
 * Supertools ist der kuratierte Tool-Teil von Amtshelden. Dieser Block baut
 * Vertrauen über die etablierte Amtshelden-Community (Instagram + LinkedIn) auf.
 *
 * WICHTIG (Ehrlichkeit): Die `socialFeed`-Einträge kommen entweder aus dem
 * vorbereiteten Social-Import oder aus redaktionellen Fallbacks. Der aktuelle
 * Zwischenstand bildet oeffentlich sichtbare LinkedIn-Historie ab, ist aber
 * noch kein automatischer Live-Feed. Like-/Kommentar-Zahlen werden bewusst
 * nicht erfunden.
 *
 * Für einen echten Live-Feed: Instagram Graph API (Business-Account-Token)
 * oder einen Embed-Dienst (z. B. behold.so, Elfsight, Curator) anbinden und
 * `socialFeed` daraus speisen.
 */

import { importedSocialFeed } from "./social-import.generated";

export type SocialPlatform = "instagram" | "linkedin";

export interface SocialProfile {
  platform: SocialPlatform;
  handle: string;
  url: string;
  label: string;
  /** Nur intern: Quelle für Redaktion/Admin, nicht als öffentlicher CTA nutzen. */
  adminUrl?: string;
  /** Nur intern/API: Plattform-ID bzw. Organisations-ID. */
  sourceId?: string;
}

export interface SocialFeedItem {
  platform: SocialPlatform;
  /** Kurzer Themen-/Kategorie-Tag (Mono-Label) */
  topic: string;
  /** Beitrag-Text bzw. Kernaussage */
  text: string;
  /** optionale Attribution (echtes Zitat) */
  author?: string;
  /** Optionales Post-/Reel-/Carousel-Bild, später aus API-Import befüllbar */
  image?: {
    url: string;
    alt: string;
  };
  /** Direkter Beitragslink, falls aus API oder redaktionellem Import bekannt */
  href?: string;
  /** ISO-Datum aus API/importierter Quelle. Keine Fake-Daten bei Fallbacks. */
  publishedAt?: string;
  /** Kleines Format-Label im Kartenfuß */
  format?: "Post" | "Reel" | "Carousel" | "Artikel";
}

export const socialProfiles: Record<SocialPlatform, SocialProfile> = {
  linkedin: {
    platform: "linkedin",
    handle: "Amtshelden",
    url: "https://www.linkedin.com/company/86876852/",
    adminUrl: "https://www.linkedin.com/company/86876852/admin/feed/posts/",
    sourceId: "86876852",
    label: "Auf LinkedIn folgen",
  },
  instagram: {
    platform: "instagram",
    handle: "@amtshelden",
    url: "https://www.instagram.com/amtshelden/",
    label: "Auf Instagram folgen",
  },
};

export const fallbackSocialFeed: SocialFeedItem[] = [
  {
    platform: "linkedin",
    topic: "Behördenkommunikation",
    text: "Die Frage ist nicht, ob Verwaltungen auf LinkedIn sein sollten, sondern wer dort für sie spricht.",
    author: "Christian Rosenberger, Gründer Amtshelden",
    image: {
      url: "/brand/amtshelden/perspektive.png",
      alt: "Amtshelden-Beitrag zu Perspektiven in der Behördenkommunikation",
    },
    format: "Post",
  },
  {
    platform: "instagram",
    topic: "Amtfluencer",
    text: "Echte Menschen statt Beamten-Klischee: Wie Amtfluencer ihre Verwaltung sichtbar machen — und zu attraktiven Arbeitgebern.",
    image: {
      url: "/brand/amtshelden-gruender.jpg",
      alt: "Julia und Christian von Amtshelden",
    },
    format: "Reel",
  },
  {
    platform: "linkedin",
    topic: "KI & Transformation",
    text: "KI in der Verwaltung beginnt nicht beim Tool, sondern bei der Haltung. Wir zeigen, wie Behörden pragmatisch und rechtssicher starten.",
    image: {
      url: "/brand/amtshelden/connected2026.png",
      alt: "Amtshelden Connected 2026",
    },
    format: "Artikel",
  },
  {
    platform: "instagram",
    topic: "Kultur",
    text: "Wie Verwaltung sichtbar wird, ohne beliebig zu werden: Kultur, Haltung und Menschen hinter der Behörde.",
    image: {
      url: "/brand/amtshelden/kultur.png",
      alt: "Amtshelden-Beitrag zu Kultur in der Verwaltung",
    },
    format: "Carousel",
  },
  {
    platform: "linkedin",
    topic: "Vertrauen",
    text: "Digitale Transformation braucht Vertrauen: intern im Team, extern gegenüber Bürgerinnen und Bürgern.",
    image: {
      url: "/brand/amtshelden/vertrauen.png",
      alt: "Amtshelden-Beitrag zu Vertrauen in der Verwaltung",
    },
    format: "Post",
  },
];

export const socialFeed: SocialFeedItem[] =
  importedSocialFeed.length > 0 ? importedSocialFeed : fallbackSocialFeed;
