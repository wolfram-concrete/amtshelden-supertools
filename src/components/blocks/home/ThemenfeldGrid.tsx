import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { categoriesByThemenfeld } from "@/mocks/categories";
import type { ThemenfeldDefinition } from "@/types/content";

interface ThemenfeldGridProps {
  eyebrow: string;
  title: string;
  description?: string;
  themenfelder: ThemenfeldDefinition[];
}

/**
 * Die 4 Themenfelder als oberste Strukturebene (Strategie-Meeting 12.06.2026).
 * Prominente 2×2-Karten mit Icon, Name, Tagline und den enthaltenen
 * Kategorien als Sub-Links.
 */
export function ThemenfeldGrid({
  eyebrow,
  title,
  description,
  themenfelder,
}: ThemenfeldGridProps) {
  return (
    <section className="bg-cream/50">
      <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <header className="max-w-2xl space-y-3 mb-12 lg:mb-16">
          <div className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            {eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(32px,3.8vw,48px)] font-bold leading-[1.0] tracking-tight text-dark">
            {title}
          </h2>
          {description && (
            <p className="font-sans text-[16px] leading-[1.65] text-mid">
              {description}
            </p>
          )}
        </header>

        <div className="grid gap-5 sm:grid-cols-2">
          {themenfelder.map((tf) => {
            const cats = categoriesByThemenfeld[tf.slug] || [];
            return (
              <article
                key={tf.slug}
                className="group flex flex-col rounded-2xl border border-border bg-white p-6 lg:p-8 transition-colors hover:border-brand/60"
              >
                <Link
                  href={`/themenfelder/${tf.slug}`}
                  className="flex items-start justify-between gap-4"
                >
                  <div
                    aria-hidden
                    className="flex h-14 w-14 items-center justify-center rounded-xl text-2xl"
                    style={{
                      background: `${tf.accentColor || "#009460"}14`,
                      color: tf.accentColor || "#009460",
                    }}
                  >
                    {tf.icon}
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="flex-shrink-0 text-soft transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                    aria-hidden
                  />
                </Link>

                <Link href={`/themenfelder/${tf.slug}`} className="mt-5">
                  <h3 className="font-serif text-[26px] font-bold leading-tight text-dark group-hover:text-brand-dark transition-colors">
                    {tf.name}
                  </h3>
                  <p className="mt-2 font-sans text-[14.5px] leading-[1.6] text-mid">
                    {tf.tagline}
                  </p>
                </Link>

                {/* Kategorien innerhalb des Themenfelds */}
                {cats.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-border flex flex-wrap gap-2">
                    {cats.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/kategorien/${c.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-cream border border-border px-3 py-1.5 font-ui text-[12px] font-medium text-mid transition-colors hover:border-brand hover:text-brand-dark"
                      >
                        <span aria-hidden>{c.icon}</span>
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
