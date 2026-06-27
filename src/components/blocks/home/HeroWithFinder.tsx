import { BrandIcon } from "@/components/icons/BrandIcon";
import { trustStats } from "@/mocks/stats";

import { ToolFinderWizard } from "./ToolFinderWizard";

interface HeroWithFinderProps {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  trustSignals?: string[];
}

/**
 * Bento-Hero — Fusion aus den Bento-Referenzen, an die Behörden-Zielgruppe
 * angepasst (große Tap-Targets, klare Hierarchie, plakativ statt kleinteilig).
 *
 * Linke Spalte (Bento-Stack):
 *   - großes Headline-Modul (cream, rounded-3xl)
 *   - Reihe aus Stat-Tiles
 * Rechte Spalte: Tool-Finder-Wizard als erhöhte Karte.
 *
 * Source-Serif-Headline bleibt (Brand), das Bento-Gefühl kommt aus den
 * weichen, rounded Karten — nicht aus der Schrift.
 */
export function HeroWithFinder({
  eyebrow,
  title,
  lead,
  trustSignals,
}: HeroWithFinderProps) {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-10 pt-6 lg:pt-10 pb-10 lg:pb-14">
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4 lg:gap-5 items-stretch">
        {/* ── Linke Spalte: Headline-Modul + Stat-Tiles ── */}
        <div className="flex flex-col gap-4 lg:gap-5">
          {/* Headline-Karte */}
          <div className="flex-1 rounded-3xl bg-cream border border-border px-7 py-9 lg:px-10 lg:py-12 flex flex-col justify-center">
            <div className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-brand mb-5">
              {eyebrow}
            </div>
            <h1
              style={{ lineHeight: 1.04 }}
              className="font-serif text-[clamp(34px,4.6vw,60px)] font-bold tracking-tight text-dark"
            >
              {title}
            </h1>
            <p className="mt-6 font-sans text-[17px] lg:text-[18px] leading-[1.65] text-mid max-w-xl">
              {lead}
            </p>

            {trustSignals && trustSignals.length > 0 && (
              <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
                {trustSignals.map((signal) => (
                  <li
                    key={signal}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white border border-border px-3 py-1.5 font-ui text-[12px] font-medium text-mid"
                  >
                    <span
                      aria-hidden
                      className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-light text-brand-dark text-[9px] font-bold"
                    >
                      ✓
                    </span>
                    {signal}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Stat-Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-5">
            {trustStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white border border-border px-4 py-5 flex flex-col justify-center"
              >
                <div className="font-serif text-[clamp(26px,2.4vw,34px)] font-bold leading-none text-dark">
                  {stat.value}
                </div>
                <div className="mt-2 font-ui text-[10.5px] font-bold uppercase tracking-[0.12em] text-brand leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Rechte Spalte: Tool-Finder ── */}
        <ToolFinderWizard />
      </div>

      {/* dezenter Hinweis */}
      <p className="mt-4 flex items-center gap-2 font-ui text-[11px] text-soft justify-center lg:justify-start">
        <BrandIcon name="target" size={13} className="text-brand" />
        Starten Sie über den Tool-Finder oder direkt bei Ihrem Problem — siehe
        unten.
      </p>
    </section>
  );
}
