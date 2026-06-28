import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BrandIcon } from "@/components/icons/BrandIcon";
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
 * Vier kompakte Spaltenkarten (lg) mit kleinem Motiv-Banner, Icon, Name,
 * Tagline und den enthaltenen Kategorien als Sub-Links.
 */
export function ThemenfeldGrid({
  eyebrow,
  title,
  description,
  themenfelder,
}: ThemenfeldGridProps) {
  return (
    <section className="bg-cream">
      <div className="container mx-auto px-6 lg:px-10 py-14 lg:py-20">
        <header data-reveal className="max-w-2xl space-y-3 mb-10 lg:mb-12">
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(32px,3.8vw,48px)] font-normal leading-[1.0] tracking-tight text-dark">
            {title}
          </h2>
          {description && (
            <p className="font-sans text-[16px] leading-[1.65] text-mid">
              {description}
            </p>
          )}
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {themenfelder.map((tf) => {
            const cats = categoriesByThemenfeld[tf.slug] || [];
            return (
              <article
                key={tf.slug}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white transition-shadow duration-300 hover:shadow-[0_20px_50px_-32px_rgba(17,17,17,0.22)]"
              >
                {/* Kompaktes Motiv-Banner */}
                <Link
                  href={`/themenfelder/${tf.slug}`}
                  className="relative block aspect-[16/10] overflow-hidden"
                >
                  {tf.image && (
                    <Image
                      src={tf.image.url}
                      alt={tf.image.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"
                  />
                  <span
                    aria-hidden
                    className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/95 text-brand-dark shadow-sm"
                  >
                    {tf.icon && <BrandIcon name={tf.icon} size={20} />}
                  </span>
                  <ArrowUpRight
                    size={17}
                    className="absolute top-3 right-3 text-white/90 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>

                <div className="flex flex-1 flex-col p-5">
                  <Link href={`/themenfelder/${tf.slug}`}>
                    <h3 className="font-serif text-[19px] font-normal leading-[1.2] text-dark transition-colors group-hover:text-brand-dark">
                      {tf.name}
                    </h3>
                    <p className="mt-1.5 font-sans text-[13px] leading-[1.5] text-mid">
                      {tf.tagline}
                    </p>
                  </Link>

                  {/* Kategorien innerhalb des Themenfelds */}
                  {cats.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {cats.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/kategorien/${c.slug}`}
                          className="inline-flex items-center gap-1 rounded-full bg-cream px-2.5 py-1 font-ui text-[11px] font-medium text-mid transition-colors hover:bg-brand-light hover:text-brand-dark"
                        >
                          {c.icon && (
                            <BrandIcon
                              name={c.icon}
                              size={13}
                              className="text-brand-dark"
                            />
                          )}
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
