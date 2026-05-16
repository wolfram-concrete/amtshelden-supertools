import type { Metadata } from "next";

import { CategoryCard } from "@/components/cards/CategoryCard";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { categories } from "@/mocks/categories";

export const metadata: Metadata = {
  title: "Alle Kategorien — Supertools",
  description:
    "Übersicht aller Software-Kategorien für die digitale Verwaltung — von E-Akte über Bürgerservice bis Personalmanagement.",
};

export default function CategoriesIndexPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Supertools", href: "/" }, { label: "Kategorien" }]} />

      <div className="container mx-auto px-6 lg:px-10 py-12 lg:py-20">
        <header className="max-w-3xl space-y-5 mb-14 lg:mb-20">
          <div className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            Verzeichnis
          </div>
          <h1 className="font-serif text-[clamp(36px,5vw,64px)] font-bold leading-[1.05] tracking-tight text-dark">
            Alle Kategorien im Überblick
          </h1>
          <p className="font-sans text-[18px] leading-[1.7] text-mid">
            Wir kuratieren Software für die digitale Verwaltung — handverlesen
            und aus Behördenperspektive eingeordnet. Jede Kategorie hat eine
            redaktionelle Einleitung, transparente Tool-Profile und ehrliche
            Alternativen.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </>
  );
}
