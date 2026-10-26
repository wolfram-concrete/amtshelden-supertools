import type { Metadata } from "next";

import { ArticleCard } from "@/components/cards/ArticleCard";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { WissenSidebar } from "@/components/sidebars/WissenSidebar";
import { articleSummaries } from "@/mocks/articles";

export const metadata: Metadata = {
  title: "Tool-Wissen — Supertools",
  description:
    "Einordnungen, Leitfäden und Auswahlfragen rund um Software für die Verwaltung — damit Sie vor der Entscheidung die richtigen Fragen stellen.",
};

export default function WissenIndexPage() {
  const [lead, ...rest] = articleSummaries;

  return (
    <>
      {/* HERO — plakativ, ohne Foto */}
      <section className="bg-white">
        <div className="container mx-auto px-6 lg:px-10 pt-16 pb-8 lg:pt-24 lg:pb-12">
          <div className="max-w-3xl">
            <RevealHeading
              as="h1"
              text="Wissen, das bei der Auswahl hilft."
              baseDelay={120}
              className="font-display text-[clamp(36px,5.5vw,64px)] leading-[1.04] text-dark"
            />
            <p
              data-reveal
              style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
              className="mt-5 max-w-2xl font-sans text-[18px] lg:text-[20px] leading-[1.55] text-mid"
            >
              Einordnungen, Leitfäden und Auswahlfragen rund um Software für die
              Verwaltung — damit Sie vor der Entscheidung die richtigen Fragen
              stellen. Geschrieben von Menschen, die aus der Verwaltung kommen.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-10 pb-12 lg:pb-20">
        {/* Zwei-Spalten: Hauptbereich + Archiv-Sidebar */}
        <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-12 lg:gap-16 items-start">
          <div className="min-w-0">
            {/* Lead */}
            {lead && <ArticleCard article={lead} variant="lead" />}

            {/* Grid */}
            {rest.length > 0 && (
              <div className="mt-14 grid gap-10 lg:gap-12 sm:grid-cols-2 pt-12 border-t border-border">
                {rest.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    article={article}
                    variant="list"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Archiv-Spalte */}
          <WissenSidebar articles={articleSummaries} />
        </div>
      </div>
    </>
  );
}
