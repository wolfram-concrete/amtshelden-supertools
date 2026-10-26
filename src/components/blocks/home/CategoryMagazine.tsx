import { CategoryCard } from "@/components/cards/CategoryCard";
import type { CategoryDefinition } from "@/types/content";

interface CategoryMagazineProps {
  /** @deprecated Eyebrow entfernt (De-Slop) — Prop bleibt für Aufrufer-Kompatibilität. */
  eyebrow?: string;
  title: string;
  description?: string;
  categories: CategoryDefinition[];
}

export function CategoryMagazine({
  title,
  description,
  categories,
}: CategoryMagazineProps) {
  return (
    <section className="bg-cream/50">
      <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <header className="max-w-2xl space-y-3 mb-12 lg:mb-16">
          <h2 className="font-display text-[clamp(28px,3.5vw,42px)] leading-[1.02] text-dark">
            {title}
          </h2>
          {description && (
            <p className="font-sans text-[16px] leading-[1.65] text-mid">
              {description}
            </p>
          )}
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
