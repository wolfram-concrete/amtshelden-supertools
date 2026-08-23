import { HelpCircle, Layers, ListChecks } from "lucide-react";

import { RevealHeading } from "@/components/motion/RevealHeading";
import type { KategorieEntscheidung } from "@/data/kategorie-entscheidung";

interface KategorieEntscheidungBlockProps {
  data: KategorieEntscheidung;
}

/**
 * Kategorie-Entscheidungshilfe (Christian-Feedback 3.2/4.4).
 * Macht die Kategorie-Seite zur Entscheidungsfläche: Worum geht's, welche
 * Verwaltungsprobleme passen, welche Tool-Arten, wann Software (nicht) hilft,
 * was vorab zu klären ist und welche Fragen man Anbietern stellt — BEVOR die
 * eigentliche Tool-Liste kommt.
 */
export function KategorieEntscheidungBlock({
  data,
}: KategorieEntscheidungBlockProps) {
  return (
    <section className="bg-cream">
      <div className="container mx-auto px-6 lg:px-10 pb-4 lg:pb-8">
        {/* Worum geht es */}
        <div className="max-w-3xl">
          <div
            data-reveal
            className="flex items-center gap-2.5 font-sans text-[14px] font-semibold text-brand"
          >
            Entscheidungshilfe
          </div>
          <RevealHeading
            as="h2"
            text="Bevor Sie Tools vergleichen."
            baseDelay={120}
            className="mt-3 font-serif text-[clamp(26px,3.2vw,40px)] font-normal leading-[1.05] tracking-tight text-dark"
          />
          <p
            data-reveal
            style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
            className="mt-4 font-sans text-[17px] leading-[1.7] text-mid"
          >
            {data.worumGehtEs}
          </p>
        </div>

        {/* Verwaltungsprobleme + Tool-Arten */}
        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          <div data-reveal className="rounded-2xl bg-white p-6">
            <div className="mb-3 font-sans text-[14px] font-semibold text-brand">
              Diese Verwaltungsprobleme passen dazu
            </div>
            <ul className="space-y-2.5">
              {data.verwaltungsProbleme.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2.5 font-sans text-[14px] leading-[1.55] text-mid"
                >
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div
            data-reveal
            style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
            className="rounded-2xl bg-white p-6"
          >
            <div className="mb-3 flex items-center gap-2 font-sans text-[14px] font-semibold text-brand">
              <Layers size={15} aria-hidden />
              Welche Tool-Arten gibt es?
            </div>
            <div className="flex flex-wrap gap-2">
              {data.toolArten.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-border bg-cream px-3 py-1.5 font-ui text-[12.5px] font-medium text-mid"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Wann Software hilft — und wann nicht */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div data-reveal className="rounded-2xl border border-brand/15 bg-brand-light/40 p-6">
            <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-brand-dark">
              Wann Software wirklich hilft
            </div>
            <p className="font-sans text-[14.5px] leading-[1.6] text-dark">
              {data.wannSoftwareHilft}
            </p>
          </div>
          <div
            data-reveal
            style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
            className="rounded-2xl border border-accent/30 bg-accent/5 p-6"
          >
            <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-accent-ink">
              Wann Software nicht die Lösung ist
            </div>
            <p className="font-sans text-[14.5px] leading-[1.6] text-dark">
              {data.wannSoftwareNichtHilft}
            </p>
          </div>
        </div>

        {/* Vorab klären + Fragen an Anbieter */}
        <div className="mt-9 grid gap-8 lg:grid-cols-2">
          <div data-reveal>
            <div className="mb-3 flex items-center gap-2 font-sans text-[14px] font-semibold text-brand">
              <ListChecks size={15} aria-hidden />
              Vorab in der Behörde klären
            </div>
            <ul className="space-y-2">
              {data.voraussetzungen.map((v) => (
                <li
                  key={v}
                  className="flex items-start gap-2.5 font-sans text-[14px] leading-[1.5] text-mid"
                >
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                  {v}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal style={{ "--reveal-delay": "90ms" } as React.CSSProperties}>
            <div className="mb-3 flex items-center gap-2 font-sans text-[14px] font-semibold text-brand">
              <HelpCircle size={15} aria-hidden />
              Fragen, die Sie Anbietern stellen sollten
            </div>
            <ol className="space-y-2">
              {data.fragenAnAnbieter.map((q, i) => (
                <li
                  key={q}
                  className="flex gap-3 rounded-xl border border-border bg-white px-4 py-2.5"
                >
                  <span className="font-mono text-[12px] font-bold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[13.5px] leading-[1.5] text-mid">
                    {q}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
