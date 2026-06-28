import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AlternativenBlock } from "@/components/blocks/profile/AlternativenBlock";
import { CasesPlaceholder } from "@/components/blocks/profile/CasesPlaceholder";
import { CorrectionWidget } from "@/components/blocks/profile/CorrectionWidget";
import { ExtendedProfileNotice } from "@/components/blocks/profile/ExtendedProfileNotice";
import { ImplementierungBlock } from "@/components/blocks/profile/ImplementierungBlock";
import { KontaktBlock } from "@/components/blocks/profile/KontaktBlock";
import { PassDasBlock } from "@/components/blocks/profile/PassDasBlock";
import { ProfilCta } from "@/components/blocks/profile/ProfilCta";
import { ProfilHero } from "@/components/blocks/profile/ProfilHero";
import { ProfilSidebar } from "@/components/blocks/profile/ProfilSidebar";
import { TransparencyBlock } from "@/components/blocks/profile/TransparencyBlock";
import { CrawlerToolProfile } from "@/components/blocks/crawler/CrawlerToolProfile";
import { toolProfileRegistry as toolRegistry } from "@/mocks/tools/profiles";
import { crawlerToolCardPreview } from "@/mocks/tools/crawler-preview";
import { publicPitch } from "@/lib/crawler-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Static Params für SSG: vollständige Profile + freigegebene Crawler-Tools
export function generateStaticParams() {
  const slugs = new Set<string>([
    ...Object.keys(toolRegistry),
    ...crawlerToolCardPreview.map((t) => t.slug),
  ]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolRegistry[slug];

  if (tool) {
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

  const crawlerTool = crawlerToolCardPreview.find((t) => t.slug === slug);
  if (crawlerTool) {
    return {
      title: `${crawlerTool.name} — Crawler-Freigabe`,
      description: publicPitch(crawlerTool.pitch).slice(0, 160),
      robots: { index: false, follow: false },
    };
  }

  return { title: "Tool nicht gefunden" };
}

export default async function ToolProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const tool = toolRegistry[slug];

  // Fallback: freigegebenes Crawler-Tool ohne vollständiges Profil
  if (!tool) {
    const crawlerTool = crawlerToolCardPreview.find((t) => t.slug === slug);
    if (crawlerTool) return <CrawlerToolProfile tool={crawlerTool} />;
    notFound();
  }

  return (
    <>

      <div className="container mx-auto px-6 lg:px-10 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-12 lg:gap-16">
          {/* ── MAIN COLUMN ── */}
          <main className="min-w-0 space-y-10">
            <ExtendedProfileNotice tier={tool.tier} />

            <ProfilHero
              {...tool.hero}
              lastCheckedAt={tool.lastCheckedAt}
            />

            <PassDasBlock {...tool.passDas} />

            <ImplementierungBlock {...tool.implementierung} />

            {tool.transparency && (
              <TransparencyBlock {...tool.transparency} />
            )}

            <CasesPlaceholder {...tool.cases} />

            <KontaktBlock {...tool.kontakt} />

            <AlternativenBlock {...tool.alternativen} />

            <ProfilCta {...tool.cta} />

            <CorrectionWidget toolName={tool.name} />
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
