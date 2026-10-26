import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { KategorieHero } from "@/components/blocks/category/KategorieHero";
import { KategorieEntscheidungBlock } from "@/components/blocks/category/KategorieEntscheidung";
import { ToolFilters } from "@/components/blocks/category/ToolFilters";
import { kategorieEntscheidung } from "@/data/kategorie-entscheidung";
import {
  directoryCategories,
  directoryCategoryRegistry,
  directoryToolCardsByCategory,
} from "@/data/directory";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return directoryCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = directoryCategoryRegistry[slug];
  if (!category) return { title: "Kategorie nicht gefunden" };

  return {
    title: `${category.name} — Software für die Verwaltung`,
    description: category.tagline,
  };
}

export default async function KategorieDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = directoryCategoryRegistry[slug];
  if (!category) notFound();

  const tools = directoryToolCardsByCategory[slug] || [];
  const kat = kategorieEntscheidung[slug];

  return (
    <section className="bg-cream">
      <KategorieHero category={category} toolCount={tools.length} />

      {/* Tools zuerst — plakativ, ohne Umweg (Christian-Call 30.09.) */}
      <div className="container mx-auto px-6 lg:px-10 pb-12 lg:pb-16">
        <header className="mb-8 max-w-2xl">
          <h2
            data-reveal
            className="font-sans font-bold text-[clamp(24px,3vw,36px)] leading-[1.1] tracking-[-0.02em] text-dark"
          >
            {tools.length > 0
              ? `${tools.length} Tools in diesem Bereich`
              : "Tools in diesem Bereich"}
          </h2>
        </header>

        {tools.length > 0 ? (
          <ToolFilters tools={tools} />
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-cream/50 p-8 text-center lg:p-12">
            <div className="font-sans text-[22px] font-bold text-dark">
              Dieser Bereich ist im Aufbau.
            </div>
            <p className="mx-auto mt-2 max-w-md font-sans text-[14.5px] leading-[1.6] text-mid">
              Wir nehmen Anbieter handverlesen auf. Sie kennen ein Tool, das hier
              fehlt — oder setzen als Verwaltung eines ein? Sagen Sie es uns, dann
              prüfen wir es.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                href="/vorschlagen"
                className="inline-flex items-center rounded-xl bg-brand px-5 py-2.5 font-sans text-[13px] font-bold text-white transition-colors hover:bg-brand-dark"
              >
                Tool vorschlagen
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center rounded-xl border border-border bg-white px-5 py-2.5 font-sans text-[13px] font-semibold text-dark transition-colors hover:border-brand hover:text-brand-dark"
              >
                Praxisfall melden
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Entscheidungshilfe — einklappbar UNTER den Tools (Christian-Call 30.09.) */}
      {kat && (
        <details className="group border-t border-border">
          <summary className="container mx-auto flex cursor-pointer list-none items-center justify-between gap-4 px-6 lg:px-10 py-6 font-sans text-[17px] font-semibold text-dark [&::-webkit-details-marker]:hidden hover:text-brand-dark">
            <span>
              Entscheidungshilfe: Wann lohnt sich Software in diesem Bereich — und
              was sollten Sie vorab klären?
            </span>
            <ChevronDown
              size={20}
              className="flex-shrink-0 text-soft transition-transform group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <KategorieEntscheidungBlock data={kat} />
        </details>
      )}
    </section>
  );
}
