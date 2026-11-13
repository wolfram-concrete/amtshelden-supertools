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
  return (
    <>
      <PageHero
        image="/brand/generated/hero-anwendung.jpg"
        imageAlt="Beschäftigte einer Verwaltung arbeiten gemeinsam am Laptop"
        objectPosition="72% 60%"
        lines={["Was Software in der", "Verwaltung leistet."]}
        copy="Wir zeigen pro Lösung, was sie konkret kann, für welche Behörde sie passt und wo ihre Grenzen liegen."
      />

      <div className="container mx-auto px-6 pb-20 pt-14 lg:px-10 lg:pb-28 lg:pt-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {caseSummaries.map((item) => (
            <CaseCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
