import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ThemenfeldTabs } from "@/components/blocks/category/ThemenfeldTabs";
import { BarHeading } from "@/components/ui/BarHeading";
import {
  directoryCategoriesByThemenfeld,
  directoryToolCardsByCategory,
} from "@/data/directory";
import { themenfelder, themenfeldRegistry } from "@/mocks/themenfelder";

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

  const cats = directoryCategoriesByThemenfeld[slug] || [];
  const toolsByCategory = Object.fromEntries(
    cats.map((c) => [c.slug, directoryToolCardsByCategory[c.slug] || []]),
  );

  return (
    <>

      {/* Hero — mittelachsig wie der Home-Hero: zentrierte Meta, Headline im
          grünen Balken, Intro in einem Textcontainer (weiße Karte auf Cream). */}
      <header className="container mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-10 lg:pb-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <BarHeading
            as="h1"
            className="text-center text-[clamp(34px,5vw,62px)]"
          >
            {tf.name}
          </BarHeading>

          {tf.intro && (
            <p className="mt-7 max-w-2xl font-sans text-[16px] leading-[1.7] text-mid lg:text-[17px]">
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
            <p className="font-sans text-[20px] font-normal text-dark">
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
