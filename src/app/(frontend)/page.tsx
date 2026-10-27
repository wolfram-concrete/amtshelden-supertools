import type { Metadata } from "next";

import { CategoryTiles } from "@/components/blocks/home/CategoryTiles";
import { HeroSearch } from "@/components/blocks/home/HeroSearch";
import { NewsletterBand } from "@/components/blocks/home/NewsletterBand";
import { directoryCategories } from "@/data/directory";

export const metadata: Metadata = {
  title: "Software für die digitale Verwaltung — Amtshelden Supertools",
  description:
    "Handverlesene Software für Behörden. Suchen Sie nach Aufgabe, Tool-Art oder Anbieter — kuratiert, ehrlich, aus Behördenperspektive eingeordnet. Kein Ranking, keine Sterne.",
};

/**
 * Startseite — radikal funktional & plakativ (Christian-Call 30.09.2026,
 * Airbnb-DNA): eine Such-Maske, die sofort in den Nutzen führt, darunter die
 * konkreten Bereiche als große farbige Kacheln. Bewusst nichts weiter — kein
 * Magazin, keine Community, keine emotionalen Ablenkungen. Leere Kategorien
 * (0 Tools) sind ausgeblendet.
 */
export default function HomePage() {
  const populatedCategories = directoryCategories.filter(
    (c) => (c.toolCount ?? 0) > 0,
  );

  return (
    <>
      <HeroSearch />

      <CategoryTiles
        title="Wählen Sie Ihren Bereich."
        description="Konkrete Software-Bereiche für die Verwaltung — ein Klick zu den passenden Tools."
        categories={populatedCategories}
      />

      <NewsletterBand />
    </>
  );
}
