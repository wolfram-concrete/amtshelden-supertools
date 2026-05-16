import type { Metadata } from "next";

import { AboutBlock } from "@/components/blocks/home/AboutBlock";
import { CategoryMagazine } from "@/components/blocks/home/CategoryMagazine";
import { FaqBlock } from "@/components/blocks/home/FaqBlock";
import { FeaturedToolBlock } from "@/components/blocks/home/FeaturedToolBlock";
import { HeroWithFinder } from "@/components/blocks/home/HeroWithFinder";
import { NewsletterCta } from "@/components/blocks/home/NewsletterCta";
import { PulseGrid } from "@/components/blocks/home/PulseGrid";
import { QuickGuideBlock } from "@/components/blocks/home/QuickGuideBlock";
import { TrustStrip } from "@/components/blocks/home/TrustStrip";
import { HomeSidebar } from "@/components/sidebars/HomeSidebar";
import { articleSummaries } from "@/mocks/articles";
import { categories } from "@/mocks/categories";
import { behoerdenFaqs } from "@/mocks/faq";
import { methodSteps, trustStats } from "@/mocks/stats";
import { toolCards } from "@/mocks/tools";

export const metadata: Metadata = {
  title: "Software für die digitale Verwaltung — Amtshelden Supertools",
  description:
    "Handverlesene Software für Behörden. Kuratiert, ehrlich, aus Behördenperspektive eingeordnet. Tool-Finder, Wissensartikel und Erfahrungsberichte für Verwaltungen.",
};

export default function HomePage() {
  const featuredTool = toolCards.find((t) => t.slug === "vivioakte")!;
  const pulseArticles = articleSummaries.slice(0, 4);

  return (
    <>
      {/* ── HERO mit QuickFinder rechts ── */}
      <HeroWithFinder
        eyebrow="Beta · Mai 2026"
        title={
          <>
            Software für die Verwaltung —{" "}
            <em className="not-italic font-medium text-brand-dark">
              handverlesen
            </em>{" "}
            statt überfüllt.
          </>
        }
        lead="Wir vergleichen nicht. Wir ordnen ein. Für Menschen, die Verantwortung tragen — mit Behörden­kontext, Implementierungs­erfahrungen und ehrlichen Empfehlungen."
        trustSignals={[
          "Aus Behördenperspektive",
          "Kein Pay-to-Rank",
          "DSGVO + Vergabe transparent",
          "Redaktionell kuratiert",
        ]}
      />

      {/* ── Trust-Strip ── */}
      <TrustStrip stats={trustStats} />

      {/* ── PULSE: aktuelle Artikel ── */}
      <PulseGrid
        eyebrow="Supertools Pulse"
        title="Was diese Woche zählt"
        description="Redaktionelle Beiträge aus der digitalen Verwaltung — kurz, präzise, ohne PR-Phrasen."
        articles={pulseArticles}
      />

      {/* ── MAIN + STICKY SIDEBAR ── */}
      <section className="bg-cream/30">
        <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-[minmax(0,1fr)_320px]">
            {/* Main */}
            <div className="min-w-0 space-y-16">
              <QuickGuideBlock
                eyebrow="Methodik"
                title="So prüfen wir Software."
                lead="Wir nehmen ein Tool nur auf, wenn wir es selbst eingeordnet haben — aus Behördenperspektive, mit Referenzen, mit Compliance-Check."
                steps={methodSteps}
              />

              <FeaturedToolBlock
                eyebrow="Tool im Fokus"
                title="VivioAkte — wenn die E-Akte tatsächlich funktioniert"
                description="Wir prüfen Tool-Profile nicht, weil wir sie verkaufen wollen. Wir prüfen sie, weil andere Behörden darauf eine Entscheidung gründen werden. Bei VivioAkte hat uns überzeugt, wie ehrlich der Anbieter über die Grenzen des eigenen Systems spricht."
                tool={featuredTool}
                rationale={{
                  title: "Amtshelden-Urteil",
                  body: "Für Kommunen bis 50.000 Einwohner, die erstmals digitalisieren — ohne sich dabei zu verlieren.",
                }}
              />

              <FaqBlock
                eyebrow="Häufig gefragt"
                title="Was Behörden vor der Entscheidung wissen wollen."
                items={behoerdenFaqs}
              />
            </div>

            {/* Sticky Sidebar */}
            <HomeSidebar />
          </div>
        </div>
      </section>

      {/* ── KATEGORIEN-MAGAZIN (außerhalb Sidebar — voll Breite) ── */}
      <CategoryMagazine
        eyebrow="Verzeichnis"
        title="Sechs Kategorien. Volle Tiefe."
        description="Jede Kategorie wird redaktionell betreut — mit Einordnung aus Behördenperspektive, ehrlichen Empfehlungen und Alternativen."
        categories={categories}
      />

      {/* ── ABOUT (Dark, 4 Prinzipien) ── */}
      <AboutBlock
        eyebrow="Über Supertools"
        title="Wir vergleichen nicht. Wir ordnen ein."
        lead="Capterra hat Sterne. OMR Reviews hat Sterne. Wir nicht — und das ist Absicht. Behörden-Software lässt sich nicht in Punkten messen. Sie passt zu Strukturen, zu Menschen, zu Anforderungen. Oder eben nicht. Wir machen den Unterschied transparent."
        principles={[
          {
            title: "Handverlesen statt vollständig",
            body: "Wir nehmen lieber weniger Tools auf und prüfen sie tiefer. Lieber 300 ernst gemeinte Profile als 3.000 oberflächliche.",
          },
          {
            title: "Aus Behördenperspektive",
            body: "Unsere Einschätzungen kommen aus der Perspektive der Verwaltung — nicht vom Anbieter. Wenn etwas nicht passt, schreiben wir es.",
          },
          {
            title: "Kein Ranking",
            body: 'Kein „bestes Tool"-Score, keine Sterne. Stattdessen redaktionelle Einordnung — was funktioniert für wen, und unter welchen Umständen.',
          },
          {
            title: "Verantwortungsabnahme",
            body: "Wer Software einführt, trägt Verantwortung. Wir liefern die Tiefe, die diese Verantwortung handhabbar macht.",
          },
        ]}
      />

      {/* ── NEWSLETTER ── */}
      <div id="newsletter">
        <NewsletterCta
          eyebrow="Supertools Pulse"
          title="Einmal pro Woche das Wichtigste aus der digitalen Verwaltung."
          description="Beschlüsse, Implementierungserfahrungen, neue Tools im Verzeichnis — kompakt aufbereitet. Für Menschen, die in der Behörde Entscheidungen treffen müssen."
        />
      </div>
    </>
  );
}
