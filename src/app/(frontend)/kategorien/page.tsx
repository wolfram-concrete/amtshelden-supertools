import type { Metadata } from "next";

import { CategoryCard } from "@/components/cards/CategoryCard";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { directoryCategories } from "@/data/directory";

export const metadata: Metadata = {
  title: "Alle Kategorien — Supertools",
  description:
    "Übersicht aller Software-Kategorien für die digitale Verwaltung — von E-Akte über Bürgerservice bis Personalmanagement.",
};

export default function CategoriesIndexPage() {
  return (
    <>

      <div className="container mx-auto px-6 lg:px-10 py-12 lg:py-20">
        <header className="max-w-3xl space-y-5 mb-14 lg:mb-20">
          <div
            data-reveal
            className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-brand"
          >
            Verzeichnis
          </div>
          <RevealHeading
            as="h1"
            text="Alle Kategorien im Überblick"
            baseDelay={120}
            className="font-serif text-[clamp(36px,5vw,64px)] font-normal leading-[1.05] tracking-tight text-dark"
          />
          <p
            data-reveal
            style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            className="font-sans text-[18px] leading-[1.7] text-mid"
          >
            Wir kuratieren Software für die digitale Verwaltung — handverlesen
            und aus Behördenperspektive eingeordnet. Jede Kategorie hat eine
            redaktionelle Einleitung, transparente Tool-Profile und ehrliche
            Alternativen.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {directoryCategories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </>
  );
}
