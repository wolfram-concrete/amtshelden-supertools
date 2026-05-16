import type { Metadata } from "next";

import { AboutBlock } from "@/components/blocks/home/AboutBlock";
import { CategoryMagazine } from "@/components/blocks/home/CategoryMagazine";
import { EditorialHero } from "@/components/blocks/home/EditorialHero";
import { FeaturedToolBlock } from "@/components/blocks/home/FeaturedToolBlock";
import { NewsletterCta } from "@/components/blocks/home/NewsletterCta";
import { PulseGrid } from "@/components/blocks/home/PulseGrid";
import { articleSummaries } from "@/mocks/articles";
import { categories } from "@/mocks/categories";
import { toolCards } from "@/mocks/tools";

export const metadata: Metadata = {
  title: "Software für die digitale Verwaltung — Amtshelden Supertools",
  description:
    "Handverlesene Software für Behörden. Kuratiert, ehrlich, aus Behördenperspektive eingeordnet. Das Gedächtnis der digitalen Verwaltung Deutschlands.",
};

export default function HomePage() {
  const featuredTool = toolCards.find((t) => t.slug === "vivioakte")!;
  const featuredArticles = articleSummaries.slice(0, 4);

  return (
    <>
      <EditorialHero
        eyebrow="Beta · Mai 2026"
        title={
          <>
            Das Gedächtnis der digitalen{" "}
            <em className="not-italic font-medium text-brand-dark">
              Verwaltung
            </em>
            .
          </>
        }
        lead="Handverlesene Software für Behörden. Kuratiert, ehrlich, aus Behördenperspektive eingeordnet. Hier wurde für Menschen gedacht, die Verantwortung tragen — mit ihren Ängsten, ihrem Kontext, ihren Anforderungen."
        primaryCta={{ label: "Kategorien entdecken", href: "/kategorien" }}
        secondaryCta={{
          label: "Pulse: aktuelle Beiträge",
          href: "/wissen",
        }}
        meta={`${toolCards.length}+ Tools redaktionell geprüft · ${articleSummaries.length} Beiträge im Wissensbereich`}
      />

      <PulseGrid
        eyebrow="Supertools Pulse"
        title="Was diese Woche zählt"
        description="Redaktionelle Beiträge aus der digitalen Verwaltung — kurz, präzise, ohne PR-Phrasen."
        articles={featuredArticles}
      />

      <CategoryMagazine
        eyebrow="Verzeichnis"
        title="Sechs Kategorien. Volle Tiefe."
        description="Jede Kategorie wird redaktionell betreut — mit Einordnung aus Behördenperspektive, ehrlichen Empfehlungen und Alternativen."
        categories={categories}
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

      <NewsletterCta
        eyebrow="Supertools Pulse"
        title="Einmal pro Woche das Wichtigste aus der digitalen Verwaltung."
        description="Beschlüsse, Implementierungserfahrungen, neue Tools im Verzeichnis — kompakt aufbereitet. Für Menschen, die in der Behörde Entscheidungen treffen müssen."
      />
    </>
  );
}
