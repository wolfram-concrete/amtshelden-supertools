import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BrandIcon } from "@/components/icons/BrandIcon";
import { CATEGORY_COLOR, CATEGORY_COLOR_FALLBACK } from "@/lib/category-colors";
import type { CategoryDefinition } from "@/types/content";

interface CategoryTilesProps {
  title: string;
  description?: string;
  categories: CategoryDefinition[];
}

/**
 * Bereichs-Kacheln (Wolfram 26.10.): oben das echte AMS-Motiv, unten ein
 * solides Farbband mit dem Titel in Weiß — die vier Bereiche sind so auf einen
 * Blick eindeutig und heben sich klar ab. Farbe je Bereich als Code (DNA §6).
 */
const TILE_IMAGE: Record<string, string> = {
  "e-akte-dokumentenmanagement": "/brand/generated/bereich-e-akte.jpg",
  "buergerservice-fachverfahren": "/brand/generated/bereich-buergerservice.jpg",
  "personal-organisation": "/brand/generated/bereich-personal.jpg",
  "kommunikation-zusammenarbeit": "/brand/generated/bereich-kommunikation.jpg",
};
const TILE_COLOR = CATEGORY_COLOR;
const FALLBACK_IMAGE = "/brand/generated/hero-verwaltung.jpg";
const FALLBACK_COLOR = CATEGORY_COLOR_FALLBACK;

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
          {categories.map((category) => {
            const color = TILE_COLOR[category.slug] || FALLBACK_COLOR;
            return (
              <Link
                key={category.slug}
                href={`/kategorien/${category.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl shadow-[0_18px_40px_-28px_rgba(0,0,0,0.5)] transition-shadow hover:shadow-[0_26px_55px_-28px_rgba(0,0,0,0.6)]"
              >
                {/* Motiv */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={TILE_IMAGE[category.slug] || FALLBACK_IMAGE}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover brightness-[1.1] saturate-[1.12] transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <span
                    aria-hidden
                    className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm"
                    style={{ backgroundColor: color }}
                  >
                    {category.icon && (
                      <BrandIcon name={category.icon} size={20} strokeWidth={2.2} />
                    )}
                  </span>
                </div>

                {/* Farbband mit Titel */}
                <div
                  className="flex flex-1 items-center justify-between gap-3 px-5 py-4 text-white"
                  style={{ backgroundColor: color }}
                >
                  <div className="min-w-0">
                    <h3 className="font-sans font-bold text-[17px] leading-[1.15] tracking-[-0.01em] [overflow-wrap:anywhere] hyphens-auto">
                      {category.name}
                    </h3>
                    <div className="mt-1 font-sans text-[13px] font-semibold text-white/85">
                      {category.toolCount} Tools
                    </div>
                  </div>
                  <ArrowRight
                    size={20}
                    className="flex-shrink-0 text-white/80 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
