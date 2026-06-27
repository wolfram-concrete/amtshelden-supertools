"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { BrandIcon, type BrandIconName } from "@/components/icons/BrandIcon";
import { stimmen } from "@/mocks/stimmen";

interface StimmenSliderProps {
  eyebrow: string;
  title: string;
  lead?: string;
}

/**
 * Stilisiertes Wappen-Emblem als Logo-Slot (generisch, markenkonform).
 * Platzhalter für ein echtes Stadtlogo, sobald eine reale Referenzkommune
 * vorliegt — echte Hoheitszeichen werden NICHT an Personas gehängt.
 */
function WappenBadge({ icon }: { icon: BrandIconName }) {
  return (
    <span className="relative inline-flex h-12 w-11 flex-shrink-0 items-center justify-center">
      <svg
        viewBox="0 0 24 28"
        className="absolute inset-0 h-full w-full text-brand"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 1.5 21 4.8V13c0 6-4 10.6-9 12.7C7 23.6 3 19 3 13V4.8Z" />
      </svg>
      <BrandIcon name={icon} size={17} className="relative text-white" />
    </span>
  );
}

/**
 * Stimmen aus der Verwaltung — Teaser-Cards (Scroll-Snap-Slider).
 * Repräsentative Behörden-Personas mit Problem-Ausgangslage; pro Karte ein
 * Wappen-Emblem (Logo-Slot). Baut Relevanz + Vertrauen.
 */
export function StimmenSlider({ eyebrow, title, lead }: StimmenSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(dir: number) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : 340;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <section className="bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-20">
        <header className="flex flex-wrap items-end justify-between gap-6 mb-8 lg:mb-10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              {eyebrow}
            </div>
            <h2 className="font-serif text-[clamp(28px,3.4vw,42px)] font-normal leading-[1.05] tracking-tight text-dark">
              {title}
            </h2>
            {lead && (
              <p className="font-sans text-[15px] leading-[1.65] text-mid">
                {lead}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Zurück"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-mid transition-colors hover:border-brand hover:text-brand-dark"
            >
              <ArrowLeft size={17} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Weiter"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-mid transition-colors hover:border-brand hover:text-brand-dark"
            >
              <ArrowRight size={17} aria-hidden />
            </button>
          </div>
        </header>

        {/* Teaser-Cards — Scroll-Snap */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {stimmen.map((s, i) => (
            <article
              key={i}
              data-card
              className="flex w-[280px] flex-shrink-0 snap-start flex-col rounded-2xl bg-white p-6 sm:w-[340px]"
            >
              <div className="flex items-center gap-3">
                <WappenBadge icon={s.themenfeld.icon} />
                <div className="font-mono text-[10.5px] font-bold uppercase leading-tight tracking-[0.1em]">
                  <div className="text-dark">{s.role}</div>
                  <div className="mt-0.5 text-soft">{s.context}</div>
                </div>
              </div>

              <blockquote className="mt-5 font-serif text-[18px] font-normal leading-[1.35] text-dark">
                <span aria-hidden className="text-accent">„</span>
                {s.quote}
                <span aria-hidden className="text-accent">"</span>
              </blockquote>

              <Link
                href={`/themenfelder/${s.themenfeld.slug}`}
                className="mt-auto inline-flex items-center gap-1.5 pt-6 font-ui text-[12.5px] font-semibold text-brand-dark transition-colors hover:text-brand"
              >
                {s.themenfeld.name}
                <ArrowUpRight size={14} aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
