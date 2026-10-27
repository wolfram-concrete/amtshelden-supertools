import type { Metadata } from "next";
import { Info } from "lucide-react";

import { PageHero } from "@/components/blocks/PageHero";
import { CaseCard } from "@/components/cards/CaseCard";
import { caseSummaries } from "@/mocks/cases";

export const metadata: Metadata = {
  title: "Echte Anwendung — Supertools",
  description:
    "Wie Verwaltungen Software auswählen, einführen und betreiben: exemplarische Praxis-Cases von der Prüfung über die Einführung bis zur laufenden Betreuung.",
};

export default function AnwendungIndexPage() {
  const [lead, ...rest] = caseSummaries;

  return (
    <>
      <PageHero
        image="/brand/generated/hero-anwendung.jpg"
        imageAlt="Beschäftigte einer Verwaltung arbeiten gemeinsam am Laptop"
        lines={["So kommt Software", "in die Verwaltung."]}
        copy="Prüfen, erproben, einführen, betreiben. Drei Wege aus der Praxis, erzählt von den Menschen, die sie gegangen sind."
      />

      <div className="container mx-auto px-6 pb-16 pt-12 lg:px-10 lg:pb-24 lg:pt-16">
        {/* Exemplarisch-Hinweis, offen */}
        <div className="mb-12 flex items-start gap-2.5 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 font-ui text-[13px] leading-[1.55] text-accent-ink lg:mb-14">
          <Info size={16} className="mt-0.5 flex-shrink-0" aria-hidden />
          <p>
            Beispiel-Cases: Die Städte und ihre Motive sind real, die
            geschilderten Abläufe, Personen und Zitate sind exemplarisch
            zusammengestellt und nicht von den genannten Städten freigegeben. So
            ist eine echte, abgestimmte Referenz aufgebaut. Sobald eine
            Verwaltung einen Praxisfall freigibt, ersetzen wir das Beispiel.
          </p>
        </div>

        {/* Lead-Case */}
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
