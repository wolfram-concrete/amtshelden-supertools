import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/blocks/article/ArticleBody";
import { ArticleHeader } from "@/components/blocks/article/ArticleHeader";
import { ArticleSidebar } from "@/components/blocks/article/ArticleSidebar";
import { AuthorBio } from "@/components/blocks/article/AuthorBio";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { articleRegistry, articles, articleSummaries } from "@/mocks/articles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articleRegistry[slug];
  if (!article) return { title: "Artikel nicht gefunden" };

  return {
    title: article.title,
    description: article.lead.slice(0, 160),
    openGraph: {
      title: article.title,
      description: article.lead.slice(0, 160),
      type: "article",
      authors: [article.author.name],
      publishedTime: article.publishedAt,
      images: article.cover?.url ? [article.cover.url] : undefined,
    },
  };
}

export default async function WissenArtikelPage({ params }: PageProps) {
  const { slug } = await params;
  const article = articleRegistry[slug];
  if (!article) notFound();

  const relatedArticles = (article.related || [])
    .map((s) => articleRegistry[s])
    .filter(Boolean)
    .slice(0, 3);

  return (
    <>

      <ArticleHeader article={article} />

      {/* Zweispaltig: Lesespalte links (linksbündig) + Sticky-Sidebar rechts */}
      <div className="container mx-auto px-6 lg:px-10 pb-16 lg:pb-24">
        <div className="grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
          <div className="min-w-0">
            <ArticleBody blocks={article.body} />
            <AuthorBio author={article.author} />
          </div>
          <ArticleSidebar current={article} articles={articleSummaries} />
        </div>
      </div>

      {relatedArticles.length > 0 && (
        <section className="bg-cream/50">
          <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <header className="border-t border-border pt-8 max-w-2xl space-y-3 mb-12">
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                Weiterlesen
              </div>
              <h2 className="font-serif text-[clamp(24px,3vw,36px)] font-normal leading-[1.1] tracking-tight text-dark">
                Verwandte Beiträge
              </h2>
            </header>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.slug} article={rel} variant="list" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
