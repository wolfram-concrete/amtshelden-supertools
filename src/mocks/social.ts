/**
 * Amtshelden Social — Trust-/Community-Block auf der Home.
 *
 * Supertools ist der kuratierte Tool-Teil von Amtshelden. Dieser Block baut
 * Vertrauen über die etablierte Amtshelden-Community (Instagram + LinkedIn) auf.
 *
 * WICHTIG (Ehrlichkeit): Die `socialFeed`-Einträge sind redaktionell-
 * repräsentativ aus den realen Amtshelden-Themen (Behördenkommunikation,
 * KI & Transformation, Amtfluencer). Es sind KEINE live gescrapten Posts und
 * KEINE erfundenen Like-/Kommentar-Zahlen. Das LinkedIn-Zitat von Christian
 * Rosenberger ist echt und attribuiert.
 *
 * Für einen echten Live-Feed: Instagram Graph API (Business-Account-Token)
 * oder einen Embed-Dienst (z. B. behold.so, Elfsight, Curator) anbinden und
 * `socialFeed` daraus speisen.
 */

export type SocialPlatform = "instagram" | "linkedin";

export interface SocialProfile {
  platform: SocialPlatform;
  handle: string;
  url: string;
  label: string;
}

export interface SocialFeedItem {
  platform: SocialPlatform;
  /** Kurzer Themen-/Kategorie-Tag (Mono-Label) */
  topic: string;
  /** Beitrag-Text bzw. Kernaussage */
  text: string;
  /** optionale Attribution (echtes Zitat) */
  author?: string;
}

export const socialProfiles: Record<SocialPlatform, SocialProfile> = {
  linkedin: {
    platform: "linkedin",
    handle: "Amtshelden",
    url: "https://www.linkedin.com/company/86876852/",
    label: "Auf LinkedIn folgen",
  },
  instagram: {
    platform: "instagram",
    handle: "@amtshelden",
    url: "https://www.instagram.com/amtshelden/",
    label: "Auf Instagram folgen",
  },
};

export const socialFeed: SocialFeedItem[] = [
  {
    platform: "linkedin",
    topic: "Behördenkommunikation",
    text: "Die Frage ist nicht, ob Verwaltungen auf LinkedIn sein sollten, sondern wer dort für sie spricht.",
    author: "Christian Rosenberger, Gründer Amtshelden",
  },
  {
    platform: "instagram",
    topic: "Amtfluencer",
    text: "Echte Menschen statt Beamten-Klischee: Wie Amtfluencer ihre Verwaltung sichtbar machen — und zu attraktiven Arbeitgebern.",
  },
  {
    platform: "linkedin",
    topic: "KI & Transformation",
    text: "KI in der Verwaltung beginnt nicht beim Tool, sondern bei der Haltung. Wir zeigen, wie Behörden pragmatisch und rechtssicher starten.",
  },
];
