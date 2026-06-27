import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AlternativenBlock } from "@/components/blocks/profile/AlternativenBlock";
import { CasesPlaceholder } from "@/components/blocks/profile/CasesPlaceholder";
import { ImplementierungBlock } from "@/components/blocks/profile/ImplementierungBlock";
import { KontaktBlock } from "@/components/blocks/profile/KontaktBlock";
import { PassDasBlock } from "@/components/blocks/profile/PassDasBlock";
import { ProfilCta } from "@/components/blocks/profile/ProfilCta";
import { ProfilHero } from "@/components/blocks/profile/ProfilHero";
import { ProfilSidebar } from "@/components/blocks/profile/ProfilSidebar";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { toolRegistry } from "@/mocks/tools/vivioakte";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Static Params für SSG-Vorgeneration (alle Mock-Tools)
export function generateStaticParams() {
  return Object.keys(toolRegistry).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolRegistry[slug];

  if (!tool) {
    return { title: "Tool nicht gefunden" };
  }

  return {
    title: `${tool.name} — ${tool.hero.categoryLabel}`,
    description: tool.hero.lead.slice(0, 160),
    openGraph: {
      title: tool.hero.title,
      description: tool.hero.lead.slice(0, 160),
      type: "article",
      authors: [tool.hero.byline.editor],
    },
  };
}

export default async function ToolProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const tool = toolRegistry[slug];

  if (!tool) notFound();

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Supertools", href: "/" },
          {
            label: tool.hero.categoryLabel,
            href: `/kategorien/${tool.categorySlug}`,
          },
          { label: tool.name },
        ]}
      />

      <div className="container mx-auto px-6 lg:px-10 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-12 lg:gap-16">
          {/* ── MAIN COLUMN ── */}
          <main className="min-w-0 space-y-10">
            <ProfilHero
              {...tool.hero}
              lastCheckedAt={tool.lastCheckedAt}
            />

            <PassDasBlock {...tool.passDas} />

            <ImplementierungBlock {...tool.implementierung} />

            <CasesPlaceholder {...tool.cases} />

            <KontaktBlock {...tool.kontakt} />

            <AlternativenBlock {...tool.alternativen} />

            <ProfilCta {...tool.cta} />
          </main>

          {/* ── STICKY SIDEBAR ── */}
          <ProfilSidebar
            {...tool.sidebar}
            lastCheckedAt={tool.lastCheckedAt}
          />
        </div>
      </div>
    </>
  );
}
