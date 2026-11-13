import type { Metadata } from "next";

import { PageHero } from "@/components/blocks/PageHero";
import { CaseCard } from "@/components/cards/CaseCard";
import { caseSummaries } from "@/mocks/cases";

export const metadata: Metadata = {
  title: "Echte Anwendung — Supertools",
  description:
    "Was einzelne Lösungen in der Verwaltung konkret leisten: Fähigkeiten, Einsatzbereich und Grenzen pro Software, von der E-Akte über Online-Anträge bis zum KI-Dialog.",
};

export default function AnwendungIndexPage() {
  const [lead, ...rest] = caseSummaries;

  return (
    <>
      <PageHero
        image="/brand/generated/hero-anwendung.jpg"
        imageAlt="Beschäftigte einer Verwaltung arbeiten gemeinsam am Laptop"
        objectPosition="72% 60%"
        lines={["Was Software in der", "Verwaltung leistet."]}
        copy="Wir zeigen pro Lösung, was sie konkret kann, für welche Behörde sie passt und wo ihre Grenzen liegen."
      />

      <div className="container mx-auto px-6 pb-16 pt-12 lg:px-10 lg:pb-24 lg:pt-16">
        {/* Lead-Referenz */}
        {lead && <CaseCard item={lead} variant="lead" />}

        {/* Grid */}
        {rest.length > 0 && (
          <div className="mt-14 grid gap-10 border-t border-border pt-12 sm:grid-cols-2 lg:gap-12">
            {rest.map((item) => (
              <CaseCard key={item.slug} item={item} variant="list" />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
