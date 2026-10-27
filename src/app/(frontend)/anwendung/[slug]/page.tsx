import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { ArticleBody } from "@/components/blocks/article/ArticleBody";
import { CaseHeader } from "@/components/blocks/case/CaseHeader";
import { CaseCard } from "@/components/cards/CaseCard";
import { caseRegistry, cases, caseSummaries } from "@/mocks/cases";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = caseRegistry[slug];
  if (!item) return { title: "Case nicht gefunden" };

  return {
    title: `${item.title} — Echte Anwendung`,
    description: item.lead.slice(0, 160),
    openGraph: {
      title: item.title,
      description: item.lead.slice(0, 160),
      type: "article",
      publishedTime: item.publishedAt,
      images: item.cover?.url ? [item.cover.url] : undefined,
    },
  };
}

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;
  const item = caseRegistry[slug];
  if (!item) notFound();

  const relatedCases = (item.related || [])
    .map((s) => caseSummaries.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .slice(0, 2);

  return (
    <>
      <CaseHeader item={item} />

      <div className="container mx-auto px-6 pb-16 lg:px-10 lg:pb-24">
        <div className="max-w-3xl">
          <ArticleBody blocks={item.body} />

          <div className="mt-12 border-t border-border pt-6">
            <Link
              href="/anwendung"
              className="inline-flex items-center gap-1.5 font-ui text-[13px] font-semibold text-brand transition-colors hover:text-brand-dark"
            >
              <ArrowLeft size={15} aria-hidden />
              Alle Cases
            </Link>
          </div>
        </div>
      </div>

      {relatedCases.length > 0 && (
        <section className="bg-cream/50">
          <div className="container mx-auto px-6 py-16 lg:px-10 lg:py-24">
            <header className="mb-12 max-w-2xl space-y-3 border-t border-border pt-8">
              <div className="font-sans font-semibold text-brand">
                Weitere Anwendung
              </div>
              <h2 className="font-display text-[clamp(24px,3vw,36px)] leading-[1.1] text-dark">
                Andere Verwaltungen, andere Wege
              </h2>
            </header>

            <div className="grid gap-10 md:grid-cols-2">
              {relatedCases.map((rel) => (
                <CaseCard key={rel.slug} item={rel} variant="list" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
