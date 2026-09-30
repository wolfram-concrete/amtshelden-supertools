import type { Metadata } from "next";

import { CategoryMagazine } from "@/components/blocks/home/CategoryMagazine";
import { HeroSearch } from "@/components/blocks/home/HeroSearch";
import { directoryCategories } from "@/data/directory";

export const metadata: Metadata = {
  title: "Software für die digitale Verwaltung — Amtshelden Supertools",
  description:
    "Handverlesene Software für Behörden. Suchen Sie nach Aufgabe, Tool-Art oder Anbieter — kuratiert, ehrlich, aus Behördenperspektive eingeordnet. Kein Ranking, keine Sterne.",
};

/**
 * Startseite — radikal funktional (Christian-Call 30.09.2026, Airbnb-Standard):
 * eine Such-Maske, die sofort in den Nutzen führt, und darunter die konkreten
 * Kategorien zum Stöbern. Bewusst nichts weiter — kein Magazin, keine
 * Community, keine Themenfeld-Struktur, keine emotionalen Ablenkungen. Diese
 * Inhalte bleiben auf ihren Unterseiten erreichbar.
 */
export default function HomePage() {
  return (
    <>
      <HeroSearch />

      <CategoryMagazine
        title="Wählen Sie Ihren Aufgabenbereich."
        description="Konkrete Software-Kategorien für die Verwaltung — von E-Akte über Bürgerservice bis Personal. Jede Kategorie führt direkt zu den passenden Produkten."
        categories={directoryCategories}
      />
    </>
  );
}
