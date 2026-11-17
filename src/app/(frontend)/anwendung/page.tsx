import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/blocks/PageHero";
import { CaseCard } from "@/components/cards/CaseCard";
import { BarHeading } from "@/components/ui/BarHeading";
import { referenzen } from "@/mocks/referenzen";

export const metadata: Metadata = {
  title: "Echte Anwendung — Supertools",
  description:
    "Echte Software für die Verwaltung in der Anwendung: Produkt, Oberfläche und Einsatzbereich pro Lösung — von der E-Akte über Fachverfahren bis zur souveränen Kollaboration.",
};

/** Ehrliche, anbieterunabhängige Praxis-Hinweise zur Einführung (keine Zusagen). */
const EINFUEHRUNG = [
  {
    title: "Prozesse zuerst, Technik später",
    body: "Der größte Aufwand liegt im sauberen Beschreiben der Abläufe, nicht in der Software selbst.",
  },
  {
    title: "Key-User je Amt",
    body: "Benannte Ansprechpersonen und Schulungen in kleinen Gruppen tragen die Einführung.",
  },
  {
    title: "Erst testen, dann produktiv",
    body: "Updates und neue Module laufen zuerst in einer Testumgebung, bevor sie live gehen.",
  },
  {
    title: "Bei KI: DSFA und Personalrat früh",
    body: "Datenschutz-Folgenabschätzung vor dem Start, eng beginnen, jeden Themenbereich prüfen.",
  },
];

export default function AnwendungIndexPage() {
  return (
    <>
      <PageHero
        image="/brand/generated/hero-anwendung.jpg"
        imageAlt="Beschäftigte einer Verwaltung arbeiten gemeinsam am Laptop"
        objectPosition="72% 60%"
        lines={["Was Software in der", "Verwaltung leistet."]}
        copy="Echte Lösungen aus dem Verzeichnis in der Anwendung — mit Oberfläche, Einsatzbereich und Profil. Die Angaben stammen von den Anbietern."
      />

      {/* Referenzkarten */}
      <div className="container mx-auto px-6 pt-14 pb-16 lg:px-10 lg:pt-20 lg:pb-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {referenzen.map((item) => (
            <CaseCard key={item.slug} item={item} />
          ))}
        </div>
      </div>

      {/* Praxis: worauf es bei der Einführung ankommt (anbieterunabhängig) */}
      <section className="bg-cream/40">
        <div className="container mx-auto px-6 py-20 lg:px-10 lg:py-28">
          <header className="mb-10 max-w-2xl lg:mb-14">
            <BarHeading>Worauf es bei der Einführung ankommt.</BarHeading>
            <p className="mt-6 font-sans text-[16px] leading-[1.7] text-mid lg:text-[17px]">
              Unabhängig vom Produkt entscheidet die Vorbereitung. Vier Punkte,
              die in der Praxis über Erfolg und Frust entscheiden.
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EINFUEHRUNG.map((item, i) => (
              <div key={item.title} className="panel rounded-2xl p-5 lg:p-6">
                <div className="font-ui text-[13px] font-bold text-brand-dark">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 font-sans text-[16px] font-normal leading-tight text-dark">
                  {item.title}
                </h3>
                <p className="mt-2 font-sans text-[13.5px] leading-[1.6] text-mid">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brücke ins Verzeichnis + Lösung vorschlagen */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-10 my-12 lg:my-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-dark px-6 py-16 text-white sm:px-10 lg:px-14 lg:py-20">
          <div className="max-w-2xl space-y-6">
            <h2 className="font-display text-[clamp(28px,3.6vw,48px)] leading-[1.02]">
              Das ist nur der Anfang.
            </h2>
            <p className="font-sans text-[16px] leading-[1.7] text-white/85">
              Im Verzeichnis liegen alle kuratierten Lösungen — nach Bereich
              sortiert, filterbar, mit Profil. Und wenn eine Software fehlt,
              sagen Sie uns Bescheid.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/suche"
                className="btn-key inline-flex items-center rounded-xl bg-white px-6 py-3 font-ui text-[14px] font-semibold text-brand-dark hover:bg-cream"
              >
                Alle Lösungen ansehen
              </Link>
              <Link
                href="/vorschlagen"
                className="inline-flex items-center rounded-xl border border-white/35 px-6 py-3 font-ui text-[14px] font-medium text-white transition-colors hover:bg-white/10"
              >
                Lösung vorschlagen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
