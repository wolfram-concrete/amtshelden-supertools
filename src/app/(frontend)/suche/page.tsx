import type { Metadata } from "next";

import { ToolFilters } from "@/components/blocks/category/ToolFilters";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { directoryToolCards } from "@/data/directory";

export const metadata: Metadata = {
  title: "Software suchen — Supertools",
  description:
    "Suchen Sie Software für Ihre Verwaltung nach Bedarf, Tool-Art oder Anbieter. Einordnung statt Ranking — mit klaren Angaben, was öffentlich auffindbar ist und was fehlt.",
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SuchePage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;

  return (
    <section className="bg-white">
      <header className="container mx-auto px-6 lg:px-10 pt-12 lg:pt-16 pb-6 lg:pb-8">
        <div className="max-w-2xl">
          <RevealHeading
            as="h1"
            text="Software für Ihre Aufgabe finden."
            baseDelay={40}
            className="font-sans font-bold text-[clamp(30px,4.4vw,52px)] leading-[1.05] tracking-[-0.02em] text-dark"
          />
          <p
            data-reveal
            style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            className="mt-4 font-sans text-[17px] leading-[1.6] text-mid"
          >
            {q ? (
              <>
                Ergebnisse für{" "}
                <span className="font-semibold text-dark">„{q}“</span>. Suche
                verfeinern oder Filter nutzen — Einordnung statt Ranking.
              </>
            ) : (
              "Nach Bedarf, Tool-Art oder Anbieter suchen. Wir zeigen passende Produkte, was öffentlich auffindbar ist und was noch fehlt — kein Ranking, keine Sterne."
            )}
          </p>
        </div>
      </header>

      <div className="container mx-auto px-6 lg:px-10 pb-12 lg:pb-16">
        <ToolFilters key={q} tools={directoryToolCards} initialSearch={q} />
      </div>
    </section>
  );
}
