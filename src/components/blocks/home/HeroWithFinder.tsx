import Image from "next/image";

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
  url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1280&h=800&fit=crop&q=80",
  alt: "Zwei Verwaltungsmitarbeitende besprechen eine Einstellung am Bildschirm eines Arbeitsplatzes",
};

/**
 * Bento-Hero — Off-White-Fläche, weiße Karten ohne harte Konturen
 * (Fill-Kontrast statt Linien). Linke Spalte: Headline-Modul + Bildcontainer
 * mit festem Seitenverhältnis. Rechte Spalte: grüner Tool-Finder als Anker.
 * Darunter: kompakte Kennzahlen-Leiste.
 */
export function HeroWithFinder({
  eyebrow,
  title,
  lead,
  trustSignals,
}: HeroWithFinderProps) {
  return (
    <section className="bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-6 lg:pt-10 pb-10 lg:pb-14">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4 lg:gap-5 items-start">
          {/* ── Linke Spalte: Headline-Modul + Bild ── */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {/* Headline-Karte */}
            <div className="rounded-3xl bg-white px-7 py-9 lg:px-10 lg:py-11">
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
                      className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 font-ui text-[12px] font-medium text-mid"
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

            {/* Bildcontainer — festes Seitenverhältnis, kein Strecken */}
            <figure className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-white">
              <Image
                src={HERO_IMAGE.url}
                alt={HERO_IMAGE.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
                priority
              />
            </figure>
          </div>

          {/* ── Rechte Spalte: Tool-Finder (grün) ── */}
          <ToolFinderWizard />
        </div>

        {/* ── Kompakte Kennzahlen-Leiste ── */}
        <div className="mt-4 lg:mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {trustStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white px-5 py-4 flex items-baseline gap-2.5"
            >
              <span className="font-serif text-[26px] font-semibold leading-none text-dark">
                {stat.value}
              </span>
              <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.08em] text-soft leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
