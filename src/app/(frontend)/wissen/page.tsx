import type { Metadata } from "next";
import Image from "next/image";

import { ArticleCard } from "@/components/cards/ArticleCard";
import { WissenSidebar } from "@/components/sidebars/WissenSidebar";
import { articleSummaries } from "@/mocks/articles";

export const metadata: Metadata = {
  title: "Wissen & Magazin — Supertools",
  description:
    "Redaktionelle Beiträge, Leitfäden und aktuelle Themen aus der digitalen Verwaltung. Handverlesen, geprüft, ohne PR-Phrasen.",
};

export default function WissenIndexPage() {
  const [lead, ...rest] = articleSummaries;

  return (
    <>
      {/* HERO — immersiv, analog zur Startseite */}
      <section className="bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-4 lg:pt-6 pb-8 lg:pb-12">
          <div className="relative flex items-center overflow-hidden rounded-3xl min-h-[560px] lg:min-h-[720px]">
            <Image
              src="/brand/Images/magnific_open-office-inside-a-germ_UyKJgh9wny.jpg"
              alt="Mitarbeitende in einem Verwaltungsbüro bei der Arbeit"
              fill
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="object-cover"
              priority
            />
            <div aria-hidden className="absolute inset-0 bg-black/15" />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent"
            />
            <div className="relative z-10 max-w-xl p-7 sm:p-10 lg:p-12">
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                Wissen & Magazin
              </div>
              <h1
                style={{ lineHeight: 1.05 }}
                className="mt-5 font-serif text-[clamp(32px,4.4vw,56px)] font-normal tracking-tight text-white"
              >
                Was diese Woche zählt.
              </h1>
              <p className="mt-5 font-sans text-[16px] lg:text-[18px] leading-[1.6] text-white/85">
                Redaktionelle Beiträge, Leitfäden und aktuelle Themen aus der
                digitalen Verwaltung — geschrieben von Menschen, die selbst aus
                der Verwaltung kommen.
              </p>
            </div>
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
