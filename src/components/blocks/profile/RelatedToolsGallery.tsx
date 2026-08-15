import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { directoryToolCards } from "@/data/directory";
import { RevealHeading } from "@/components/motion/RevealHeading";
import type { ToolCardSummary } from "@/types/content";

function stableOffset(seed: string, length: number) {
  if (length <= 0) return 0;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % length;
  }
  return hash;
}

function rotate<T>(items: T[], offset: number) {
  if (items.length <= 1 || offset === 0) return items;
  return [...items.slice(offset), ...items.slice(0, offset)];
}

function pickRelatedTools({
  currentSlug,
  categorySlug,
  limit,
}: {
  currentSlug: string;
  categorySlug?: string;
  limit: number;
}) {
  const sameCategory = directoryToolCards.filter(
    (tool) => tool.slug !== currentSlug && tool.categorySlug === categorySlug,
  );
  const otherCategories = directoryToolCards.filter(
    (tool) => tool.slug !== currentSlug && tool.categorySlug !== categorySlug,
  );

  const preferred = rotate(
    sameCategory,
    stableOffset(currentSlug, sameCategory.length),
  );
  const fallback = rotate(
    otherCategories,
    stableOffset(`${currentSlug}-fallback`, otherCategories.length),
  );

  return [...preferred, ...fallback].slice(0, limit);
}

function RelatedToolCard({ tool }: { tool: ToolCardSummary }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex min-h-[250px] flex-col rounded-2xl bg-white p-5 shadow-[0_14px_35px_rgba(20,45,36,0.07)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(20,45,36,0.11)]"
    >
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border font-ui text-[13px] font-extrabold text-white"
          style={{ background: tool.logoBg || tool.markBg || "var(--color-brand)" }}
        >
          {tool.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={tool.logoUrl}
              alt=""
              className="h-full w-full object-contain p-1.5"
              loading="lazy"
            />
          ) : (
            tool.mark
          )}
        </span>
        <ArrowUpRight
          size={17}
          className="mt-1 flex-shrink-0 text-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-dark"
          aria-hidden
        />
      </div>

      <div className="mt-5 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-brand">
        {tool.categoryLabel}
      </div>
      <h2 className="mt-1 font-serif text-[21px] font-normal leading-[1.1] text-dark transition-colors group-hover:text-brand-dark">
        {tool.name}
      </h2>
      <p className="mt-2 line-clamp-3 font-sans text-[13.5px] leading-[1.6] text-mid">
        {tool.pitch}
      </p>

      <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border pt-4">
        {tool.compliance.dsgvo && <Pill>DSGVO</Pill>}
        {tool.compliance.serverDe && <Pill>Server DE</Pill>}
        {tool.compliance.bsi && <Pill>BSI</Pill>}
        {tool.compliance.vergabe && <Pill>Vergabe</Pill>}
      </div>
    </Link>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-brand/15 bg-brand-light/55 px-2.5 py-1 font-ui text-[11px] font-medium text-brand-dark">
      {children}
    </span>
  );
}

interface RelatedToolsGalleryProps {
  currentSlug: string;
  categorySlug?: string;
  categoryLabel?: string;
  limit?: number;
}

export function RelatedToolsGallery({
  currentSlug,
  categorySlug,
  categoryLabel,
  limit = 4,
}: RelatedToolsGalleryProps) {
  const tools = pickRelatedTools({ currentSlug, categorySlug, limit });

  if (tools.length === 0) return null;

  return (
    <section className="bg-cream pb-6 pt-8 lg:pb-2 lg:pt-12">
      <div className="container mx-auto px-6 lg:px-10">
        <header className="border-t border-border pt-8">
          <div
            data-reveal
            className="font-sans text-[14px] font-semibold text-brand"
          >
            Weitere Tools
          </div>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <RevealHeading
                as="h2"
                text="Weiter im Verzeichnis"
                baseDelay={120}
                className="font-serif text-[clamp(28px,3.4vw,42px)] font-normal leading-[1.02] tracking-tight text-dark"
              />
              <p
                data-reveal
                style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
                className="mt-3 font-sans text-[15px] leading-[1.65] text-mid"
              >
                {categoryLabel
                  ? `Weitere Einträge aus ${categoryLabel} und angrenzenden Bereichen.`
                  : "Weitere Einträge aus der kuratierten Supertools-Datenbasis."}
              </p>
            </div>
            <Link
              href={categorySlug ? `/kategorien/${categorySlug}` : "/kategorien"}
              className="inline-flex items-center gap-2 self-start rounded-xl border border-border bg-white px-4 py-3 font-ui text-[13px] font-semibold text-dark transition-colors hover:border-brand hover:text-brand-dark lg:self-auto"
            >
              {categoryLabel ? "Kategorie ansehen" : "Kategorien ansehen"}
              <ArrowUpRight size={15} aria-hidden />
            </Link>
          </div>
        </header>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) => (
            <div
              key={tool.slug}
              data-reveal="float"
              style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
            >
              <RelatedToolCard tool={tool} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
