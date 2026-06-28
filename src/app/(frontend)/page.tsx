import type { Metadata } from "next";

import { AboutBlock } from "@/components/blocks/home/AboutBlock";
import { AmtsheldenFeed } from "@/components/blocks/home/AmtsheldenFeed";
import { FokusTool } from "@/components/blocks/home/FokusTool";
import { FoerderHinweis } from "@/components/blocks/home/FoerderHinweis";
import { EditorialFeatureStory } from "@/components/blocks/home/EditorialFeatureStory";
import { ToolTeaser } from "@/components/blocks/home/ToolTeaser";
import { HeroImmersive } from "@/components/blocks/home/HeroImmersive";
import { NewsletterCta } from "@/components/blocks/home/NewsletterCta";
import { ThemenClusterBlock } from "@/components/blocks/home/ThemenClusterBlock";
import { StimmenSlider } from "@/components/blocks/home/StimmenSlider";
import { ThemenfeldGrid } from "@/components/blocks/home/ThemenfeldGrid";
import { UseCaseEntry } from "@/components/blocks/home/UseCaseEntry";
import { articleRegistry, articleSummaries } from "@/mocks/articles";
import { methodSteps } from "@/mocks/stats";
import { themenfelder } from "@/mocks/themenfelder";
import { useCases } from "@/mocks/usecases";

export const metadata: Metadata = {
  title: "Software für die digitale Verwaltung — Amtshelden Supertools",
  description:
    "Handverlesene Software für Behörden. Kuratiert, ehrlich, aus Behördenperspektive eingeordnet. Tool-Finder, redaktionelle Schwerpunkte zu Digitalisierung Deutschland, Kommunen, Vergabe.",
};

export default function HomePage() {
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
      {/* ── HERO — Behördenalltag-Motiv + Tool-Finder ── */}
      <HeroImmersive
        title="Die passende Software für Ihre Verwaltung."
        lead="Wir vergleichen nicht. Wir ordnen ein. Für Menschen, die Verantwortung tragen — mit Behörden­kontext und ehrlichen Empfehlungen."
        badges={["Aus Behördenperspektive", "Kein Pay-to-Rank", "DSGVO transparent"]}
      />

      {/* ── TRUST: Förderhinweis (INAKTIV bis Partnerschaft + Logo-Freigabe
            bestätigt — confirmed auf true setzen und logoUrl ergänzen) ── */}
      <FoerderHinweis />

      {/* ── 2 · STIMMEN (Beispiele direkt unter dem Hero, Slider full-bleed) ── */}
      <StimmenSlider
        eyebrow="Aus dem Verwaltungsalltag"
        title="Womit Behörden zu uns kommen."
        lead="Typische Ausgangslagen aus der Praxis — und das Themenfeld, das weiterhilft. Repräsentative Stimmen, keine geschönten Testimonials."
      />

      {/* ── 3 · TOOL IM FOKUS (ein echtes, freigegebenes Tool — ehrlich eingeordnet) ── */}
      <FokusTool
        eyebrow="Tool im Fokus"
        title="Eye-Able — digitale Barrierefreiheit für die Verwaltung."
        slug="eye-able-web-inclusion-gmbh"
        was="Eye-Able ist ein deutscher Anbieter aus Würzburg für digitale Barrierefreiheit — Werkzeuge, die Webauftritte für alle Nutzer:innen zugänglicher machen."
        einordnung="Öffentliche Stellen sind verpflichtet, ihre Webangebote barrierefrei zu gestalten (BITV 2.0). Genau dieses Feld adressiert das Produkt — DSGVO-konform, Server in Deutschland."
      />

      {/* ── 4 · THEMENFELDER (kuratierte Struktur) ── */}
      <ThemenfeldGrid
        eyebrow="Struktur"
        title="Vier Themenfelder. Volle Tiefe."
        description="Supertools kuratiert entlang von vier Themenfeldern, die aus der Arbeit von Amtshelden stammen — und für Behörden tatsächlich relevant sind."
        themenfelder={themenfelder}
      />

      {/* ── 5 · TOOL-TEASER (Breite: echte freigegebene Tools mit Logo) ── */}
      <ToolTeaser
        eyebrow="Frisch im Verzeichnis"
        title="Fünf Tools, quer durch die Bereiche."
        lead="Echte Anbieter aus der breiten Crawler-Arbeits-Preview — je ein Beispiel aus mehreren Themenfeldern. Noch redaktionell zu prüfen, kein Ranking."
        exclude={["eye-able-web-inclusion-gmbh"]}
      />

      {/* ── 6 · MAGAZIN: Redaktionelle Schwerpunkte (radialer Stone-Slab) ── */}
      <section className="bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-10">
          <div className="rounded-[2.5rem] bg-stone">
            <EditorialFeatureStory article={featuredStory} background="white" />
            <ThemenClusterBlock
              sectionEyebrow="Redaktionelle Schwerpunkte"
              sectionTitle="Was diese Woche zählt — in der Tiefe."
              clusters={themenCluster}
            />
          </div>
        </div>
      </section>

      {/* ── 7 · PROBLEM-EINSTIEG (ergänzend: vom Problem zur Auswahl) ── */}
      <UseCaseEntry
        eyebrow="Wonach suchen Sie?"
        title="Starten Sie beim Problem, nicht bei der Kategorie."
        description="Die meisten kommen mit einer konkreten Aufgabe — nicht mit dem Wunsch nach einer Software-Datenbank. Wählen Sie Ihr Anliegen, wir führen Sie zur passenden Auswahl."
        useCases={useCases}
      />

      {/* ── 8 · METHODIK + HALTUNG (zusammengeführt) + Mitmachen-CTAs ── */}
      <AboutBlock
        eyebrow="Methodik & Haltung"
        title="Wir vergleichen nicht. Wir ordnen ein."
        lead="Capterra hat Sterne, OMR Reviews hat Sterne. Wir nicht — und das ist Absicht. Behörden-Software lässt sich nicht in Punkten messen. Stattdessen prüfen wir jedes Tool aus Behördenperspektive — in vier Schritten."
        image={{
          url: "/brand/amtshelden-gruender.jpg",
          alt: "Julia und Christian, Gründungsteam von Amtshelden",
        }}
        principles={methodSteps.map((s) => ({ title: s.title, body: s.body }))}
        overlapPrev
      />

      {/* ── 9 · AMTSHELDEN-COMMUNITY (Trust: Social-Proof + Follow) ── */}
      <AmtsheldenFeed />

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
