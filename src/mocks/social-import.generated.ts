// Manuell aktualisierter Zwischenstand aus oeffentlich sichtbaren Social-Quellen.
// Spaeter wieder automatisch von scripts/import_amtshelden_social_feed.mjs erzeugen.

import type { SocialFeedItem } from "./social";

export const importedSocialFeed: SocialFeedItem[] = [
  {
    platform: "instagram",
    topic: "Podcast",
    text: "Kleinstadtniveau, Folge 107: Kommunikation gehoert zur Fuehrung. Amtshelden zeigt den Podcast-Impuls mit Maximilian Bieri, Buergermeister der Stadt Hanau.",
    href: "https://www.instagram.com/amtshelden/reel/DcA_KYbI6uO/",
    publishedAt: "2026-08-14",
    format: "Reel",
    image: {
      url: "/brand/social/amtshelden/instagram/ig-post-01.jpg",
      alt: "Instagram-Reel von Amtshelden am 14. August 2026 zu Kleinstadtniveau Folge 107",
    },
  },
  {
    platform: "instagram",
    topic: "Behördenkommunikation",
    text: "Aktueller Instagram-Beitrag aus der Amtshelden-Redaktion zu Kommunikation, Sichtbarkeit und Haltung in der Verwaltung.",
    href: "https://www.instagram.com/amtshelden/p/Db-iqnkjPev/",
    publishedAt: "2026-08-13",
    format: "Carousel",
    image: {
      url: "/brand/social/amtshelden/instagram/ig-post-02.jpg",
      alt: "Instagram-Carousel von Amtshelden am 13. August 2026",
    },
  },
  {
    platform: "instagram",
    topic: "Führung",
    text: "Ein Social-Impuls zur Frage, wie Fuehrung in schwierigen Situationen reagiert und was Teams nach belastenden Kontakten brauchen.",
    href: "https://www.instagram.com/amtshelden/p/Db2iNreDJX4/",
    publishedAt: "2026-08-10",
    format: "Carousel",
    image: {
      url: "/brand/social/amtshelden/instagram/ig-post-03.jpg",
      alt: "Instagram-Carousel von Amtshelden am 10. August 2026 zu Fuehrung",
    },
  },
  {
    platform: "instagram",
    topic: "Verwaltung",
    text: "Aktueller Amtshelden-Post aus der Reihe zu guter Behoerdenkommunikation und zeitgemaesser Verwaltungsarbeit.",
    href: "https://www.instagram.com/amtshelden/p/DbsPCOcgRdA/",
    publishedAt: "2026-08-06",
    format: "Carousel",
    image: {
      url: "/brand/social/amtshelden/instagram/ig-post-05.jpg",
      alt: "Instagram-Carousel von Amtshelden am 6. August 2026",
    },
  },
  {
    platform: "instagram",
    topic: "Podcast",
    text: "Kleinstadtniveau, Folge 107: Ein Buergermeister ist kein kleiner Koenig. Ein Amtshelden-Reel ueber Fuehrung, Rolle und Verantwortung.",
    href: "https://www.instagram.com/amtshelden/reel/Dbu2tkGoHW8/",
    publishedAt: "2026-08-07",
    format: "Reel",
    image: {
      url: "/brand/social/amtshelden/instagram/ig-post-04.jpg",
      alt: "Instagram-Reel von Amtshelden am 7. August 2026 zu Kleinstadtniveau",
    },
  },
  {
    platform: "instagram",
    topic: "Social Media",
    text: "Ein weiterer aktueller Beitrag aus dem Amtshelden-Feed rund um Social Media, Vermittlung und Alltag in Verwaltungen.",
    href: "https://www.instagram.com/amtshelden/p/DbpqQOiAE0o/",
    publishedAt: "2026-08-05",
    format: "Carousel",
    image: {
      url: "/brand/social/amtshelden/instagram/ig-post-06.jpg",
      alt: "Instagram-Carousel von Amtshelden am 5. August 2026",
    },
  },
  {
    platform: "instagram",
    topic: "Vertrauen",
    text: "Kleinstadtniveau, Folge 106: Vertrauen ist wichtiger als Informationen. Ein Podcast-Impuls mit Alexander Saengerlaub von futur eins.",
    href: "https://www.instagram.com/amtshelden/reel/DbcxwBxB7tt/",
    publishedAt: "2026-07-31",
    format: "Reel",
    image: {
      url: "/brand/social/amtshelden/instagram/ig-post-07.jpg",
      alt: "Instagram-Reel von Amtshelden am 31. Juli 2026 zu Vertrauen",
    },
  },
  {
    platform: "instagram",
    topic: "Event",
    text: "Connected Conference 2026: Social Media fuer Behoerden in Frankfurt am Main. Amtshelden bewirbt den Austausch fuer Verwaltungskommunikation.",
    href: "https://www.instagram.com/amtshelden/p/DbVD7Prjw0O/",
    publishedAt: "2026-07-28",
    format: "Post",
    image: {
      url: "/brand/social/amtshelden/instagram/ig-post-08.jpg",
      alt: "Instagram-Post von Amtshelden am 28. Juli 2026 zur Connected Conference 2026",
    },
  },
  {
    platform: "linkedin",
    topic: "Führung",
    text: "Manchmal zeigt sich in einem einzigen Satz, ob Führung im Alltag funktioniert. Etwa dann, wenn nach einem schwierigen Bürgerkontakt gefragt wird: Was brauchst du jetzt?",
    href: "https://de.linkedin.com/company/amtshelden",
    publishedAt: "2026-08-10",
    format: "Post",
    image: {
      url: "/brand/amtshelden/vertrauen.png",
      alt: "Amtshelden-Beitrag zu Führung und Vertrauen in Verwaltungen",
    },
  },
  {
    platform: "linkedin",
    topic: "Podcast",
    text: "Zwischen Druck, Haltung und Alltag: Führung in Verwaltungen. Eine neue Podcastfolge über klare Grenzen, Wirkung und Verantwortung in Behörden.",
    href: "https://de.linkedin.com/company/amtshelden",
    publishedAt: "2026-08-07",
    format: "Artikel",
    image: {
      url: "/brand/amtshelden/connected2026.png",
      alt: "Amtshelden-Podcast und Community-Beitrag",
    },
  },
  {
    platform: "linkedin",
    topic: "Kultur",
    text: "Viele Behörden investieren viel Zeit in Digitalisierung. Trotzdem verändert sich der Arbeitsalltag oft weniger als erhofft. Häufig liegt der Grund nicht in der Technik, sondern in den Gewohnheiten einer Organisation.",
    href: "https://de.linkedin.com/company/amtshelden",
    publishedAt: "2026-08-07",
    format: "Post",
    image: {
      url: "/brand/amtshelden/kultur.png",
      alt: "Amtshelden-Beitrag zu Organisationskultur in Verwaltungen",
    },
  },
  {
    platform: "linkedin",
    topic: "Behördenkommunikation",
    text: "Was mit Klopapier und Aufregung auf Kleinstadtniveau vor fünf Jahren begann, wurde zu einer größeren Geschichte über Behördenkommunikation, Bühne und Netzwerk.",
    href: "https://de.linkedin.com/company/amtshelden",
    publishedAt: "2026-07-24",
    format: "Post",
    image: {
      url: "/brand/amtshelden/perspektive.png",
      alt: "Amtshelden-Beitrag zur Entwicklung der Behördenkommunikation",
    },
  },
  {
    platform: "linkedin",
    topic: "Führung",
    text: "Bürgermeister:innen und Mitarbeitende in Verwaltungen sind keine Blitzableiter. In der Podcastfolge mit Leila Adjemi geht es um Druck, persönliche Angriffe und die Frage, wie Führung Grenzen sichtbar macht.",
    href: "https://de.linkedin.com/company/amtshelden",
    publishedAt: "2026-07-24",
    format: "Post",
    image: {
      url: "/brand/amtshelden/vertrauen.png",
      alt: "Amtshelden-Beitrag zu Führung und Schutz in Verwaltungen",
    },
  },
  {
    platform: "linkedin",
    topic: "Krisenkommunikation",
    text: "Krisenkommunikation: Was Behörden vorbereiten sollten, bevor es ernst wird. Ein Amtshelden-Impuls zu Rollen, Abläufen und klaren Botschaften vor dem eigentlichen Ernstfall.",
    href: "https://de.linkedin.com/company/amtshelden",
    publishedAt: "2026-07-24",
    format: "Artikel",
    image: {
      url: "/brand/amtshelden/perspektive.png",
      alt: "Amtshelden-Beitrag zu Krisenkommunikation in Behörden",
    },
  },
  {
    platform: "linkedin",
    topic: "Social Media",
    text: "Viele Behörden veröffentlichen Hinweise, erklären Abläufe und beantworten Fragen. Der Beitrag zeigt, warum Reichweite oft davon abhängt, ob Inhalte aus Sicht der Menschen verständlich vermittelt werden.",
    href: "https://de.linkedin.com/company/amtshelden",
    publishedAt: "2026-07-24",
    format: "Post",
    image: {
      url: "/brand/amtshelden/kultur.png",
      alt: "Amtshelden-Beitrag zu verständlichen Social-Media-Inhalten",
    },
  },
  {
    platform: "linkedin",
    topic: "Podcast",
    text: "Was Behörden sagen dürfen und was sie sich oft nicht trauen. Eine Folge über Kommunikationsspielräume, Unsicherheit und den Unterschied zwischen Verwaltungssprache und verständlicher Haltung.",
    href: "https://de.linkedin.com/company/amtshelden",
    format: "Artikel",
    image: {
      url: "/brand/amtshelden/connected2026.png",
      alt: "Amtshelden-Podcast-Beitrag zu Kommunikationsspielraeumen",
    },
  },
  {
    platform: "linkedin",
    topic: "Pressearbeit",
    text: "Was darf Verwaltung selbst erzählen und was ist Aufgabe der Presse? Der Beitrag ordnet ein, wie Behörden ihre eigene Sichtbarkeit verantwortungsvoll gestalten können.",
    href: "https://de.linkedin.com/company/amtshelden",
    format: "Artikel",
    image: {
      url: "/brand/amtshelden/perspektive.png",
      alt: "Amtshelden-Beitrag zu Pressearbeit und eigener Verwaltungskommunikation",
    },
  },
  {
    platform: "linkedin",
    topic: "Zukunftskongress",
    text: "Wenn das Amt nicht mehr als Gegner gesehen wird: Rückblick auf ein Panel beim Zukunftskongress Staat & Verwaltung über Social Media, Dialog und Vertrauen.",
    href: "https://de.linkedin.com/company/amtshelden",
    format: "Post",
    image: {
      url: "/brand/amtshelden/connected2026.png",
      alt: "Amtshelden-Beitrag vom Zukunftskongress Staat und Verwaltung",
    },
  },
];

export const socialImportMeta = {
  generatedAt: "2026-08-14T20:45:00.000Z",
  sources: [
    "https://de.linkedin.com/company/amtshelden",
    "https://www.instagram.com/amtshelden/",
  ],
};
