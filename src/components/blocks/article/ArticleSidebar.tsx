import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { ArticleSummary } from "@/types/content";

interface ArticleSidebarProps {
  current: ArticleSummary;
  articles: ArticleSummary[];
  /** maximale Anzahl gelisteter Artikel */
  limit?: number;
}

/**
 * Sticky-Sidebar auf der Artikel-Seite — Sprung zu weiteren Beiträgen,
 * während man liest. Bleibt rechts neben der Spalte stehen.
 */
export function ArticleSidebar({
  current,
  articles,
  limit = 6,
}: ArticleSidebarProps) {
  const others = articles
    .filter((a) => a.slug !== current.slug)
    .slice(0, limit);

  if (!others.length) return null;

  return (
    <aside className="mt-12 lg:mt-2 lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-2xl border border-border bg-cream/40 p-6">
        <div className="mb-4 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-brand">
          Weitere Artikel
        </div>

        <ul className="divide-y divide-border">
          {others.map((a, i) => (
            <li key={a.slug} className={i ? "pt-4" : "pb-0"}>
              <Link href={`/wissen/${a.slug}`} className="group block pb-4">
                <div className="mb-1 line-clamp-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.12em] text-soft">
                  {a.eyebrow}
                </div>
                <div className="font-serif text-[15px] leading-[1.25] text-dark transition-colors group-hover:text-brand-dark">
                  {a.title}
                </div>
                <div className="mt-1.5 font-ui text-[11px] text-soft">
                  {a.readingTime} Min. Lesezeit
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/wissen"
          className="mt-2 inline-flex items-center gap-1.5 font-ui text-[12.5px] font-semibold text-brand-dark transition-colors hover:text-brand"
        >
          Alle Beiträge
          <ArrowUpRight size={14} aria-hidden />
        </Link>
      </div>
    </aside>
  );
}
