import type { Metadata } from "next";

import { AboutBlock } from "@/components/blocks/home/AboutBlock";
import { EditorialFeatureStory } from "@/components/blocks/home/EditorialFeatureStory";
import { FaqBlock } from "@/components/blocks/home/FaqBlock";
import { FeaturedToolBlock } from "@/components/blocks/home/FeaturedToolBlock";
import { HeroImmersive } from "@/components/blocks/home/HeroImmersive";
import { MitmachenCta } from "@/components/blocks/home/MitmachenCta";
import { NewsletterCta } from "@/components/blocks/home/NewsletterCta";
import { PulseGrid } from "@/components/blocks/home/PulseGrid";
import { QuickGuideBlock } from "@/components/blocks/home/QuickGuideBlock";
import { ThemenClusterBlock } from "@/components/blocks/home/ThemenClusterBlock";
import { ThemenfeldGrid } from "@/components/blocks/home/ThemenfeldGrid";
import { ToolFinderSection } from "@/components/blocks/home/ToolFinderSection";
import { UseCaseEntry } from "@/components/blocks/home/UseCaseEntry";
import { HomeSidebar } from "@/components/sidebars/HomeSidebar";
import { articleRegistry, articleSummaries } from "@/mocks/articles";
import { behoerdenFaqs } from "@/mocks/faq";
import { methodSteps } from "@/mocks/stats";
import { themenfelder } from "@/mocks/themenfelder";
import { toolCards } from "@/mocks/tools";
import { useCases } from "@/mocks/usecases";

export const metadata: Metadata = {
  title: "Software für die digitale Verwaltung — Amtshelden Supertools",
  description:
    "Handverlesene Software für Behörden. Kuratiert, ehrlich, aus Behördenperspektive eingeordnet. Tool-Finder, redaktionelle Schwerpunkte zu Digitalisierung Deutschland, Kommunen, Vergabe.",
};

export default function HomePage() {
  const featuredTool = toolCards.find((t) => t.slug === "vivioakte")!;
  const pulseArticles = articleSummaries
    .filter((a) => a.type === "pulse")
    .slice(0, 4);

  // Featured Editorial Story — der Bund-Schwerpunkt prominent
  const featuredStory =
    articleSummaries.find((a) => a.slug === "digitalisierung-bund-2030") ||
    articleSummaries[0];

  // Themen-Cluster für die Schwerpunkte-Section
  const themenCluster = [
    {
      eyebrow: "Digitalisierung Deutschland",
      title: "Was der Bund vorgibt — und was kommunal funktioniert.",
      lead: "Strategien, Förderprogramme, OZG-Folgenutzen. Wir ordnen ein, was auf der kommunalen Ebene wirklich greift.",
      articles: [
        articleRegistry["digitalisierung-bund-2030"],
        articleRegistry["ozg-e-akte"],
        articleRegistry["vergabe-software"],
      ].filter(Boolean),
    },
    {
      eyebrow: "Behörden im Wandel",
      title: "Drei Realitäten, die jede Software-Strategie vergisst.",
      lead: "Wir sprechen mit Bürgermeisterinnen, Hauptamtsleitern und Kämmerinnen — und dokumentieren, was im Tagesgeschäft tatsächlich entscheidet.",
      articles: [
        articleRegistry["kommunen-realer-stand"],
        articleRegistry["doppik-stolpersteine"],
        articleRegistry["e-akte-einfuehrung"],
      ].filter(Boolean),
    },
    {
      eyebrow: "Methodik & Haltung",
      title: "Warum wir nicht ranken — und was wir stattdessen tun.",
      lead: "Behörden-Software lässt sich nicht in Sternen messen. Wir erklären unsere redaktionellen Grundsätze und warum sie für Verwaltungen relevanter sind.",
      articles: [
        articleRegistry["warum-kein-ranking"],
        articleRegistry["vergabe-software"],
      ].filter(Boolean),
    },
  ];

  return (
    <>
      {/* ── HERO — großflächiges Motiv mit überlagerten Texten ── */}
      <HeroImmersive
        eyebrow="Beta · 2026"
        title={
          <>
            Die passende Software für Ihre Verwaltung.{" "}
            <em className="not-italic font-medium text-brand-light">
              Von Expert:innen kuratiert.
            </em>
          </>
        }
        lead="Wir vergleichen nicht. Wir ordnen ein. Für Menschen, die Verantwortung tragen — mit Behörden­kontext und ehrlichen Empfehlungen."
        ctaLabel="Themenfelder ansehen"
        ctaHref="/themenfelder"
        secondaryLabel="Tool-Finder starten"
        secondaryHref="#tool-finder"
        badges={["Aus Behördenperspektive", "Kein Pay-to-Rank", "DSGVO transparent"]}
      />

      {/* ── PROBLEM-/USE-CASE-EINSTIEG (Behörden suchen nach Problem) ── */}
      <UseCaseEntry
        eyebrow="Wonach suchen Sie?"
        title="Starten Sie beim Problem, nicht bei der Kategorie."
        description="Die meisten kommen mit einer konkreten Aufgabe — nicht mit dem Wunsch nach einer Software-Datenbank. Wählen Sie Ihr Anliegen, wir führen Sie zur passenden Auswahl."
        useCases={useCases}
      />

      {/* ── TOOL-FINDER (aus dem Hero ausgelagert) ── */}
      <ToolFinderSection
        eyebrow="Tool-Finder"
        title="In sechs Fragen zur passenden Auswahl."
        lead="Nicht sicher, wo Sie anfangen sollen? Der Tool-Finder führt Sie anhand Ihrer Behördengröße und Ihres Anliegens zur passenden Auswahl — ein zusätzlicher Zugang, kein Ersatz für die Kategorien."
        points={[
          "Sechs kurze Fragen, kein Login",
          "Endet bei einem passenden Themenfeld",
          "Jederzeit anpassbar",
        ]}
      />

      {/* ── EDITORIAL FEATURE STORY (Wapo-Stil, asymmetrisch) ── */}
      <EditorialFeatureStory article={featuredStory} background="white" />

      {/* ── THEMEN-SCHWERPUNKTE (3 Cluster) ── */}
      <ThemenClusterBlock
        sectionEyebrow="Redaktionelle Schwerpunkte"
        sectionTitle="Was diese Woche zählt — in der Tiefe."
        clusters={themenCluster}
      />

      {/* ── MAIN + STICKY SIDEBAR ── */}
      <section className="bg-cream/30">
        <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0 space-y-20">
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

            <HomeSidebar />
          </div>
        </div>
      </section>

      {/* ── PULSE-KURZ (3 Artikel quer als Magazin-Grid) ── */}
      <PulseGrid
        eyebrow="Supertools Magazin"
        title="Kurze Reads."
        description="Wöchentliche Beobachtungen — kompakter als die Schwerpunkte."
        articles={pulseArticles}
      />

      {/* ── THEMENFELDER (oberste Strukturebene) ── */}
      <ThemenfeldGrid
        eyebrow="Struktur"
        title="Vier Themenfelder. Volle Tiefe."
        description="Supertools kuratiert entlang von vier Themenfeldern, die aus der Arbeit von Amtshelden stammen — und für Behörden tatsächlich relevant sind."
        themenfelder={themenfelder}
      />

      {/* ── ABOUT (Grün, 4 Prinzipien) ── */}
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

      {/* ── MITMACHEN (Behörden / Anbieter) ── */}
      <MitmachenCta />

      {/* ── NEWSLETTER ── */}
      <div id="newsletter">
        <NewsletterCta
          eyebrow="Newsletter"
          title="Einmal pro Woche das Wichtigste aus der digitalen Verwaltung."
          description="Beschlüsse, Implementierungserfahrungen, neue Tools im Verzeichnis — kompakt aufbereitet. Für Menschen, die in der Behörde Entscheidungen treffen müssen."
        />
      </div>
    </>
  );
}
