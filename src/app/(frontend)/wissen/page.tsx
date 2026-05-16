import type { Metadata } from "next";

import { ArticleCard } from "@/components/cards/ArticleCard";
import { Breadcrumb } from "@/components/site/Breadcrumb";
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
      <Breadcrumb
        items={[{ label: "Supertools", href: "/" }, { label: "Wissen" }]}
      />

      <div className="container mx-auto px-6 lg:px-10 py-12 lg:py-20">
        <header className="max-w-3xl space-y-5 mb-14 lg:mb-20">
          <div className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            Wissen & Magazin
          </div>
          <h1 className="font-serif text-[clamp(36px,5vw,64px)] font-bold leading-[1.05] tracking-tight text-dark">
            Was diese Woche zählt.
          </h1>
          <p className="font-sans text-[18px] leading-[1.7] text-mid">
            Redaktionelle Beiträge, Leitfäden und aktuelle Themen aus der
            digitalen Verwaltung. Geschrieben von Menschen, die selbst aus der
            Verwaltung kommen — oder sehr lange dort gearbeitet haben.
          </p>
        </header>

        {/* Lead */}
        {lead && <ArticleCard article={lead} variant="lead" />}

        {/* Grid */}
        {rest.length > 0 && (
          <div className="mt-16 grid gap-10 lg:gap-12 md:grid-cols-2 lg:grid-cols-3 pt-12 border-t border-border">
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
    </>
  );
}
