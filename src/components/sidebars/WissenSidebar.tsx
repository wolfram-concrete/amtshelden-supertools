import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BrandIcon } from "@/components/icons/BrandIcon";
import { formatDateDEShort } from "@/lib/utils";
import { themenfelder } from "@/mocks/themenfelder";
import type { ArticleSummary } from "@/types/content";

interface WissenSidebarProps {
  articles: ArticleSummary[];
}

/**
 * Archiv-Spalte der Wissensseite — nach Themenfeldern gruppiert (Topthemen
 * statt Rubriken). Kompakte, modulare Artikel-Karten; je Themenfeld ein
 * „Alle Artikel lesen"-Link, der in die Tiefe führt.
 *
 * Signalisiert Themen-Kompetenz: Supertools als die Stelle, die sich mit
 * Behörden-Digitalisierung auskennt.
 */
export function WissenSidebar({ articles }: WissenSidebarProps) {
  // Artikel nach Themenfeld gruppieren
  const byThemenfeld = new Map<string, ArticleSummary[]>();
  for (const a of articles) {
    const slug = a.themenfeldSlug;
    if (!slug) continue;
    if (!byThemenfeld.has(slug)) byThemenfeld.set(slug, []);
    byThemenfeld.get(slug)!.push(a);
  }

  // Nur Themenfelder mit Beiträgen, in fester Themenfeld-Reihenfolge
  const groups = themenfelder.filter((tf) => byThemenfeld.has(tf.slug));

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
      <div className="font-ui text-[10px] font-bold uppercase tracking-[0.18em] text-soft">
        Nach Themen
      </div>

      {groups.map((tf) => {
        const items = byThemenfeld.get(tf.slug)!;
        return (
          <div key={tf.slug}>
            {/* Themenfeld-Kopf */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <span
                aria-hidden
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand-dark"
              >
                {tf.icon && <BrandIcon name={tf.icon} size={15} />}
              </span>
              <span className="flex-1 font-ui text-[12.5px] font-bold text-dark leading-tight">
                {tf.name}
              </span>
              <span className="font-ui text-[10px] text-soft">
                {items.length}
              </span>
            </div>

            {/* Artikel-Module */}
            <div className="space-y-1.5">
              {items.map((a) => (
                <Link
                  key={a.slug}
                  href={`/wissen/${a.slug}`}
                  className="group block rounded-lg border border-border bg-white px-3 py-2.5 transition-colors hover:border-brand hover:bg-cream/40"
                >
                  <span
                    style={{ lineHeight: 1.2 }}
                    className="block font-serif text-[13px] font-semibold text-dark group-hover:text-brand-dark transition-colors line-clamp-2"
                  >
                    {a.title}
                  </span>
                  <span className="mt-1 block font-ui text-[10px] uppercase tracking-[0.08em] text-soft">
                    {formatDateDEShort(a.publishedAt)} · {a.readingTime} Min.
                  </span>
                </Link>
              ))}
            </div>

            {/* Alle Artikel lesen */}
            <Link
              href={`/themenfelder/${tf.slug}`}
              className="mt-2.5 inline-flex items-center gap-1 font-ui text-[11px] font-semibold text-brand hover:underline"
            >
              Alle Artikel lesen
              <ArrowUpRight size={13} aria-hidden />
            </Link>
          </div>
        );
      })}
    </aside>
  );
}
