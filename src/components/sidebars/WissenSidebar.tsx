import Link from "next/link";

import { formatDateDEShort } from "@/lib/utils";
import type { ArticleSummary } from "@/types/content";

interface WissenSidebarProps {
  articles: ArticleSummary[];
}

/**
 * Archiv-Spalte für die Wissensseite — listet alle Beiträge nach Rubriken
 * gruppiert. Signalisiert Tiefe und Themen-Kompetenz (Supertools als die
 * Stelle, die sich mit Behörden-Digitalisierung auskennt).
 *
 * Rubrik wird aus dem Eyebrow abgeleitet (Teil vor „ · "), z.B.
 * „Leitfaden · E-Akte" → Rubrik „Leitfaden".
 */

// Bevorzugte Reihenfolge der Rubriken
const RUBRIK_ORDER = ["Schwerpunkt", "Leitfaden", "Magazin"];

function rubrikOf(article: ArticleSummary): string {
  return article.eyebrow.split("·")[0].trim();
}

export function WissenSidebar({ articles }: WissenSidebarProps) {
  // Gruppieren nach Rubrik
  const groups = new Map<string, ArticleSummary[]>();
  for (const a of articles) {
    const r = rubrikOf(a);
    if (!groups.has(r)) groups.set(r, []);
    groups.get(r)!.push(a);
  }

  // Sortierte Rubrik-Liste (bekannte zuerst, Rest alphabetisch)
  const rubriken = Array.from(groups.keys()).sort((a, b) => {
    const ia = RUBRIK_ORDER.indexOf(a);
    const ib = RUBRIK_ORDER.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b, "de");
  });

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start space-y-7">
      {/* Kopf */}
      <div className="rounded-2xl bg-cream border border-border p-5">
        <div className="font-ui text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
          Im Archiv
        </div>
        <div className="mt-1.5 font-serif text-[22px] font-bold leading-tight text-dark">
          {articles.length} Beiträge
        </div>
        <p className="mt-1.5 font-ui text-[12px] leading-[1.55] text-soft">
          Unsere komplette Sammlung zu Software und Digitalisierung in der
          öffentlichen Verwaltung — in {rubriken.length} Rubriken.
        </p>
      </div>

      {/* Rubriken */}
      {rubriken.map((rubrik) => {
        const items = groups.get(rubrik)!;
        return (
          <div key={rubrik}>
            <div className="flex items-baseline justify-between gap-2 pb-2.5 mb-2.5 border-b border-border">
              <span className="font-ui text-[11px] font-bold uppercase tracking-[0.16em] text-brand-dark">
                {rubrik}
              </span>
              <span className="font-ui text-[11px] text-soft">
                {items.length}
              </span>
            </div>
            <ul className="space-y-3">
              {items.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/wissen/${a.slug}`}
                    className="group block"
                  >
                    <span className="font-serif text-[14.5px] font-bold leading-[1.25] text-dark group-hover:text-brand-dark transition-colors">
                      {a.title}
                    </span>
                    <span className="mt-1 block font-ui text-[10.5px] uppercase tracking-[0.1em] text-soft">
                      {formatDateDEShort(a.publishedAt)} · {a.readingTime} Min.
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {/* Themenfelder-Querverweis */}
      <div className="rounded-2xl border border-border bg-white p-5">
        <div className="font-ui text-[10px] font-bold uppercase tracking-[0.18em] text-soft mb-2">
          Lieber nach Thema?
        </div>
        <p className="font-ui text-[12px] leading-[1.55] text-mid mb-3">
          Durchsuchen Sie unsere Beiträge entlang der vier Themenfelder.
        </p>
        <Link
          href="/themenfelder"
          className="inline-flex items-center gap-1 font-ui text-[12px] font-semibold text-brand hover:underline"
        >
          Zu den Themenfeldern →
        </Link>
      </div>
    </aside>
  );
}
