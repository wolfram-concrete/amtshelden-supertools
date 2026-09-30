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
 * Plakative, farbige Kategorie-Kacheln (Christian-Call 30.09.2026, Airbnb-DNA).
 * Da wir keine Fotos nutzen, trägt Farbe die visuelle Wucht: jede Kategorie ist
 * eine große, farbige, sofort scannbare Fläche mit dickem Icon, großem Titel und
 * Tool-Zahl. Das ist das plakative Zentrum der Startseite.
 */
const TILE_COLORS: Record<string, string> = {
  "kommunikation-zusammenarbeit": "#006b45",
  "e-akte-dokumentenmanagement": "#215E8C",
  "personal-organisation": "#B0530F",
  "buergerservice-fachverfahren": "#5A4A88",
  "finanzen-haushalt": "#0E7C74",
  "geo-bauen-umwelt": "#4E6B26",
};
const FALLBACK = "#006b45";

export function CategoryTiles({
  title,
  description,
  categories,
}: CategoryTilesProps) {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 pb-16 lg:pb-24">
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

        <div className="grid gap-5 sm:grid-cols-2">
          {categories.map((category) => {
            const color = TILE_COLORS[category.slug] || FALLBACK;
            return (
              <Link
                key={category.slug}
                href={`/kategorien/${category.slug}`}
                style={{ backgroundColor: color }}
                className="group relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-3xl p-7 text-white transition-transform duration-300 hover:-translate-y-1 lg:min-h-[220px] lg:p-8"
              >
                <div className="flex items-start justify-between">
                  <span
                    aria-hidden
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15"
                  >
                    {category.icon && (
                      <BrandIcon
                        name={category.icon}
                        size={32}
                        strokeWidth={2.2}
                      />
                    )}
                  </span>
                  <ArrowRight
                    size={24}
                    className="text-white/75 transition-transform group-hover:translate-x-1 group-hover:text-white"
                    aria-hidden
                  />
                </div>

                <div className="mt-6">
                  <h3 className="font-sans font-bold text-[26px] leading-[1.1] tracking-[-0.01em] [overflow-wrap:anywhere] hyphens-auto">
                    {category.name}
                  </h3>
                  <div className="mt-2 font-sans text-[15px] font-semibold text-white">
                    {category.toolCount} Tools
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
