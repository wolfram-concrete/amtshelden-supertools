import Image from "next/image";

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
 * Hero-Bild — Platzhalter (Unsplash), bis das echte KI-Bild produziert ist.
 * Brief: zwei Personen (öffentlicher Dienst) besprechen eine Einstellung am
 * Monitor eines Arbeitsplatzes. Vor Produktion durch lokales Asset ersetzen
 * (public/brand/…) und HERO_IMAGE anpassen.
 */
const HERO_IMAGE = {
  url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&h=900&fit=crop&q=80",
  alt: "Zwei Verwaltungsmitarbeitende besprechen eine Einstellung am Bildschirm eines Arbeitsplatzes",
};

/**
 * Bento-Hero — Fusion aus den Bento-Referenzen, an die Behörden-Zielgruppe
 * angepasst (große Tap-Targets, klare Hierarchie, plakativ statt kleinteilig).
 *
 * Linke Spalte (Bento-Stack): Headline-Modul + Bildcontainer.
 * Rechte Spalte: Tool-Finder-Wizard.
 * Darunter: Reihe aus Stat-Tiles.
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
        {/* ── Linke Spalte: Headline-Modul + Bild ── */}
        <div className="flex flex-col gap-4 lg:gap-5">
          {/* Headline-Karte */}
          <div className="rounded-3xl bg-cream border border-border px-7 py-9 lg:px-10 lg:py-11">
            <div className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-brand mb-5">
              {eyebrow}
            </div>
            <h1
              style={{ lineHeight: 1.04 }}
              className="font-serif text-[clamp(32px,4.2vw,54px)] font-semibold tracking-tight text-dark"
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

          {/* Bildcontainer */}
          <figure className="relative flex-1 min-h-[200px] rounded-3xl overflow-hidden bg-cream border border-border">
            <Image
              src={HERO_IMAGE.url}
              alt={HERO_IMAGE.alt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
              priority
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
            />
            <figcaption className="absolute bottom-4 left-4 right-4 font-ui text-[12px] font-medium text-white/95">
              Aus Behördenperspektive — gemeinsam die passende Lösung
              einordnen.
            </figcaption>
          </figure>
        </div>

        {/* ── Rechte Spalte: Tool-Finder ── */}
        <ToolFinderWizard />
      </div>

      {/* ── Stat-Tiles ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-5 mt-4 lg:mt-5">
        {trustStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white border border-border px-4 py-5 flex flex-col justify-center"
          >
            <div className="font-serif text-[clamp(26px,2.4vw,34px)] font-semibold leading-none text-dark">
              {stat.value}
            </div>
            <div className="mt-2 font-ui text-[10.5px] font-bold uppercase tracking-[0.12em] text-brand leading-tight">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* dezenter Hinweis */}
      <p className="mt-5 flex items-center gap-2 font-ui text-[11px] text-soft justify-center lg:justify-start">
        <BrandIcon name="target" size={13} className="text-brand" />
        Starten Sie über den Tool-Finder oder direkt bei Ihrem Problem — siehe
        unten.
      </p>
    </section>
  );
}
