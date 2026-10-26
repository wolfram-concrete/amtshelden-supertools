import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BrandIcon } from "@/components/icons/BrandIcon";
import type { CategoryDefinition } from "@/types/content";

interface CategoryTilesProps {
  title: string;
  description?: string;
  categories: CategoryDefinition[];
}

/**
 * Bereichs-Kacheln als Bild-Karten (Wolfram 26.10.): echtes AMS-Motiv je
 * Bereich macht sofort klar, worum es geht; dunkler Tannengrün-Film hält die
 * Bühne zusammen, ein Grün-Akzent als Signal. Vier Spalten.
 */
const TILE_IMAGE: Record<string, string> = {
  "e-akte-dokumentenmanagement": "/brand/generated/bereich-e-akte.jpg",
  "buergerservice-fachverfahren": "/brand/generated/bereich-buergerservice.jpg",
  "personal-organisation": "/brand/generated/bereich-personal.jpg",
  "kommunikation-zusammenarbeit": "/brand/generated/bereich-kommunikation.jpg",
};
const FALLBACK_IMAGE = "/brand/generated/hero-verwaltung.jpg";

export function CategoryTiles({
  title,
  description,
  categories,
}: CategoryTilesProps) {
  return (
    <section className="bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <header className="mb-8 max-w-2xl lg:mb-10">
          <h2 className="font-sans font-bold text-[clamp(26px,3.4vw,42px)] leading-[1.05] tracking-[-0.02em] text-dark">
            {title}
          </h2>
          {description && (
            <p className="mt-3 font-sans text-[16px] lg:text-[17px] leading-[1.5] text-mid">
              {description}
            </p>
          )}
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/kategorien/${category.slug}`}
              className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl p-5 text-white"
            >
              <Image
                src={TILE_IMAGE[category.slug] || FALLBACK_IMAGE}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover brightness-[1.1] saturate-[1.12] transition-transform duration-500 group-hover:scale-[1.04]"
              />
              {/* Leichter, neutral-warmer Verlauf: Bild oben fast voll farbig,
                  nur unten so weit abgesenkt, wie Titel + Zahl es brauchen. */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(12,16,12,0.22) 0%, rgba(12,16,12,0.06) 38%, rgba(10,14,10,0.80) 100%)",
                }}
              />

              <div className="relative z-10 flex items-start justify-between">
                <span
                  aria-hidden
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm"
                >
                  {category.icon && (
                    <BrandIcon name={category.icon} size={22} strokeWidth={2.2} />
                  )}
                </span>
                <ArrowRight
                  size={20}
                  className="text-white/70 transition-transform group-hover:translate-x-1 group-hover:text-white"
                  aria-hidden
                />
              </div>

              <div className="relative z-10">
                <h3 className="font-sans font-bold text-[18px] leading-[1.15] tracking-[-0.01em] [overflow-wrap:anywhere] hyphens-auto">
                  {category.name}
                </h3>
                <div className="mt-1.5 inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-white/85">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
                  {category.toolCount} Tools
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
