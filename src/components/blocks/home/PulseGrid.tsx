import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ArticleCard } from "@/components/cards/ArticleCard";
import type { ArticleSummary } from "@/types/content";

interface PulseGridProps {
  eyebrow: string;
  title: string;
  description?: string;
  articles: ArticleSummary[];
  ctaHref?: string;
  ctaLabel?: string;
}

/**
 * Magazine-Grid für Pulse-Beiträge auf der Startseite.
 * Erster Artikel als "Lead" (groß), Rest in 3-Spalten-Grid.
 */
export function PulseGrid({
  eyebrow,
  title,
  description,
  articles,
  ctaHref = "/wissen",
  ctaLabel = "Alle Artikel ansehen",
}: PulseGridProps) {
  if (!articles?.length) return null;
  const [lead, ...rest] = articles;

  return (
    <section className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
      <header className="border-t-2 border-dark pt-8 mb-10 lg:mb-14 flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            {eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] font-normal leading-[1.02] tracking-tight text-dark">
            {title}
          </h2>
          {description && (
            <p className="font-sans text-[16px] leading-[1.65] text-mid">
              {description}
            </p>
          )}
        </div>

        <Link
          href={ctaHref}
          className="group inline-flex items-center gap-2 font-ui text-[13px] font-semibold text-dark hover:text-brand transition-colors"
        >
          {ctaLabel}
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </header>

      {/* Lead-Artikel */}
      {lead && <ArticleCard article={lead} variant="lead" />}

      {/* Restliche Artikel */}
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
    </section>
  );
}
