import Link from "next/link";

import { ToolCard } from "@/components/cards/ToolCard";
import type { ToolCardSummary } from "@/types/content";

interface FeaturedToolBlockProps {
  eyebrow: string;
  title: string;
  description?: string;
  tool: ToolCardSummary;
  /** Sidebar-Kontext (z.B. „Warum gerade dieses Tool?") */
  rationale?: { title: string; body: string };
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * "Tool des Monats" Spotlight — 2-Spalten: ToolCard groß + redaktioneller Kontext.
 */
export function FeaturedToolBlock({
  eyebrow,
  title,
  description,
  tool,
  rationale,
  ctaLabel = "Vollständiges Profil ansehen",
  ctaHref,
}: FeaturedToolBlockProps) {
  const href = ctaHref || `/tools/${tool.slug}`;

  return (
    <section className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
        {/* Linke Spalte: redaktioneller Kontext */}
        <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
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
          {rationale && (
            <div className="mt-6 border-l-2 border-brand pl-5 py-2 space-y-2">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
                {rationale.title}
              </div>
              <p className="font-serif italic text-[18px] leading-[1.5] text-dark">
                {rationale.body}
              </p>
            </div>
          )}
          <Link
            href={href}
            className="inline-flex items-center rounded-full bg-dark px-5 py-2.5 font-ui text-[13px] font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            {ctaLabel} →
          </Link>
        </div>

        {/* Rechte Spalte: ToolCard */}
        <ToolCard tool={tool} variant="feature" />
      </div>
    </section>
  );
}
