import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ThemenfeldTabs } from "@/components/blocks/category/ThemenfeldTabs";
import { BrandIcon } from "@/components/icons/BrandIcon";
import { categoriesByThemenfeld } from "@/mocks/categories";
import { themenfelder, themenfeldRegistry } from "@/mocks/themenfelder";
import { toolCardsByCategory } from "@/mocks/tools";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return themenfelder.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tf = themenfeldRegistry[slug];
  if (!tf) return { title: "Themenfeld nicht gefunden" };
  return {
    title: `${tf.name} — Themenfeld`,
    description: tf.tagline,
  };
}

export default async function ThemenfeldDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tf = themenfeldRegistry[slug];
  if (!tf) notFound();

  const cats = categoriesByThemenfeld[slug] || [];
  const toolsByCategory = Object.fromEntries(
    cats.map((c) => [c.slug, toolCardsByCategory[c.slug] || []]),
  );

  return (
    <>

      {/* Hero */}
      <header className="container mx-auto px-6 lg:px-10 pt-12 lg:pt-20 pb-10 lg:pb-14">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-brand-dark"
            >
              {tf.icon && <BrandIcon name={tf.icon} size={22} />}
            </span>
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              Themenfeld · {cats.length}{" "}
              {cats.length === 1 ? "Kategorie" : "Kategorien"}
            </div>
          </div>

          <h1 className="font-serif text-[clamp(40px,5.5vw,72px)] font-normal leading-[1.0] tracking-tight text-dark">
            {tf.name}
          </h1>

          {tf.intro && (
            <p className="font-sans text-[18px] leading-[1.7] text-mid">
              {tf.intro}
            </p>
          )}
        </div>
      </header>

      {/* Tools direkt — mit Reiter-/Subnav zum Filtern nach Bereich */}
      <div className="container mx-auto px-6 lg:px-10 pb-16 lg:pb-24">
        {cats.length > 0 ? (
          <ThemenfeldTabs
            categories={cats}
            toolsByCategory={toolsByCategory}
          />
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-cream p-12 text-center">
            <p className="font-serif text-[20px] font-normal text-dark">
              Dieses Themenfeld wird gerade aufgebaut
            </p>
            <p className="font-sans text-[14px] text-soft mt-2">
              Wir kuratieren hier gerade die passenden Bereiche und Tools.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
