import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { RevealHeading } from "@/components/motion/RevealHeading";
import { directoryToolCards, directoryToolLogos } from "@/data/directory";
import type { ToolCardSummary } from "@/types/content";

/**
 * Wählt Tools möglichst breit über die Kategorien (Round-Robin): erst je ein
 * Tool pro Bereich, dann das zweite pro Bereich usw. — damit der Teaser
 * verschiedene Themenfelder zeigt statt nur eines.
 */
function pickAcrossCategories(
  pool: ToolCardSummary[],
  exclude: string[],
  limit: number,
) {
  const groups = new Map<string, ToolCardSummary[]>();
  for (const t of pool) {
    if (exclude.includes(t.slug)) continue;
    const list = groups.get(t.categorySlug) ?? [];
    list.push(t);
    groups.set(t.categorySlug, list);
  }
  const buckets = Array.from(groups.values());
  const out: ToolCardSummary[] = [];
  for (let round = 0; out.length < limit; round++) {
    let added = false;
    for (const bucket of buckets) {
      if (!bucket[round]) continue;
      out.push(bucket[round]);
      added = true;
      if (out.length >= limit) break;
    }
    if (!added) break;
  }
  return out;
}

interface ToolTeaserProps {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Slugs ausschließen (z. B. das bereits prominente Fokus-Tool) */
  exclude?: string[];
  limit?: number;
}

/**
 * Tool-Teaser — kompakte Vorschau echter, freigegebener Verzeichnis-Tools
 * (Logo + Kurzbeschreibung). Verschafft Breite neben dem einen Fokus-Tool.
 * Datenquelle ist die zentrale Verzeichnisaggregation in src/data/directory.ts.
 */
export function ToolTeaser({
  eyebrow,
  title,
  lead,
  exclude = [],
  limit = 5,
}: ToolTeaserProps) {
  const tools = pickAcrossCategories(directoryToolCards, exclude, limit);

  if (tools.length === 0) return null;

  return (
    <section className="bg-cream py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <header className="mb-8 max-w-2xl space-y-3 lg:mb-10">
          <div
            data-reveal
            className="flex items-center gap-2.5 font-sans text-[14px] font-semibold text-brand"
          >
            {eyebrow}
          </div>
          <RevealHeading
            as="h2"
            text={title}
            baseDelay={120}
            className="font-serif text-[clamp(26px,3.2vw,40px)] font-normal leading-[1.05] tracking-tight text-dark"
          />
          {lead && (
            <p
              data-reveal
              style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
              className="font-sans text-[15px] leading-[1.65] text-mid"
            >
              {lead}
            </p>
          )}
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {tools.map((tool, i) => {
            const logo = directoryToolLogos[tool.slug];
            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                data-reveal="float"
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="group flex flex-col rounded-2xl border border-border bg-white p-4 transition-shadow hover:shadow-[0_18px_45px_-30px_rgba(17,17,17,0.28)]"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border"
                    style={{
                      background:
                        logo?.backgroundColor ||
                        tool.markBg ||
                        "var(--color-brand)",
                    }}
                  >
                    {logo?.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logo.logoUrl}
                        alt={`${tool.name} Logo`}
                        className="h-9 w-9 rounded-md object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <span className="font-ui text-[12px] font-extrabold text-white">
                        {tool.mark}
                      </span>
                    )}
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="text-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-dark"
                    aria-hidden
                  />
                </div>

                <div className="mt-3 line-clamp-1 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-brand">
                  {tool.categoryLabel}
                </div>
                <h3 className="mt-1 font-serif text-[16px] font-normal leading-[1.2] text-dark transition-colors group-hover:text-brand-dark">
                  {tool.name}
                </h3>
                <p className="mt-1.5 line-clamp-3 font-sans text-[12.5px] leading-[1.5] text-mid">
                  {tool.pitch}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
