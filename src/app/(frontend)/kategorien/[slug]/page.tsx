import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { KategorieHero } from "@/components/blocks/category/KategorieHero";
import { ToolFilters } from "@/components/blocks/category/ToolFilters";
import { articleSummaries } from "@/mocks/articles";
import { categories, categoryRegistry } from "@/mocks/categories";
import { toolCardsByCategory } from "@/mocks/tools";

import { ArticleCard } from "@/components/cards/ArticleCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryRegistry[slug];
  if (!category) return { title: "Kategorie nicht gefunden" };

  return {
    title: `${category.name} — Software für die Verwaltung`,
    description: category.tagline,
  };
}

export default async function KategorieDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categoryRegistry[slug];
  if (!category) notFound();

  const tools = toolCardsByCategory[slug] || [];
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

      <div className="container mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <ToolFilters tools={tools} />
      </div>

      {/* Verwandte Wissensartikel */}
      {relatedArticles.length > 0 && (
        <section className="bg-cream/50 mt-12">
          <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <header className="border-t border-border pt-8 max-w-2xl space-y-3 mb-12">
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
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
