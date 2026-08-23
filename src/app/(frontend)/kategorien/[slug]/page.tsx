import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { KategorieHero } from "@/components/blocks/category/KategorieHero";
import { KategorieEntscheidungBlock } from "@/components/blocks/category/KategorieEntscheidung";
import { ToolFilters } from "@/components/blocks/category/ToolFilters";
import { articleSummaries } from "@/mocks/articles";
import { kategorieEntscheidung } from "@/data/kategorie-entscheidung";
import {
  directoryCategories,
  directoryCategoryRegistry,
  directoryToolCardsByCategory,
} from "@/data/directory";

import { ArticleCard } from "@/components/cards/ArticleCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return directoryCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = directoryCategoryRegistry[slug];
  if (!category) return { title: "Kategorie nicht gefunden" };

  return {
    title: `${category.name} — Software für die Verwaltung`,
    description: category.tagline,
  };
}

export default async function KategorieDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = directoryCategoryRegistry[slug];
  if (!category) notFound();

  const tools = directoryToolCardsByCategory[slug] || [];
  const kat = kategorieEntscheidung[slug];
  const relatedArticles = articleSummaries
    .filter((a) =>
      a.tags?.some((tag) =>
        category.topics?.some(
          (t) => t.toLowerCase() === tag.toLowerCase(),
        ),
      ),
    )
    .slice(0, 3);

  return (
    <>

      <KategorieHero category={category} toolCount={tools.length} />

      {kat && <KategorieEntscheidungBlock data={kat} />}

      <div className="container mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <header className="mb-8 max-w-2xl space-y-2">
          <div
            data-reveal
            className="flex items-center gap-2.5 font-sans text-[14px] font-semibold text-brand"
          >
            Verzeichnis
          </div>
          <h2
            data-reveal
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            className="font-serif text-[clamp(24px,3vw,36px)] font-normal leading-[1.1] tracking-tight text-dark"
          >
            {tools.length > 0
              ? `${tools.length} Tools in dieser Kategorie`
              : "Tools in dieser Kategorie"}
          </h2>
        </header>

        {tools.length > 0 ? (
          <ToolFilters tools={tools} />
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-cream/50 p-8 text-center lg:p-12">
            <div className="font-serif text-[22px] font-normal text-dark">
              Diese Kategorie ist im Aufbau.
            </div>
            <p className="mx-auto mt-2 max-w-md font-sans text-[14.5px] leading-[1.6] text-mid">
              Wir nehmen Anbieter handverlesen auf. Sie kennen ein Tool, das hier
              fehlt — oder setzen als Verwaltung eines ein? Sagen Sie es uns, dann
              prüfen wir es.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                href="/vorschlagen"
                className="inline-flex items-center rounded-xl bg-brand-dark px-5 py-2.5 font-ui text-[13px] font-semibold text-white transition-colors hover:bg-brand"
              >
                Tool vorschlagen
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center rounded-xl border border-border bg-white px-5 py-2.5 font-ui text-[13px] font-semibold text-dark transition-colors hover:border-brand hover:text-brand-dark"
              >
                Praxisfall melden
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Verwandte Wissensartikel */}
      {relatedArticles.length > 0 && (
        <section className="bg-cream/50 mt-12">
          <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <header className="border-t border-border pt-8 max-w-2xl space-y-3 mb-12">
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-brand">
                Wissensbereich
              </div>
              <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] font-normal leading-[1.1] tracking-tight text-dark">
                Lesenswert für diese Kategorie
              </h2>
            </header>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  variant="list"
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
