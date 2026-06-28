"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { stimmen } from "@/mocks/stimmen";

interface StimmenSliderProps {
  eyebrow: string;
  title: string;
  lead?: string;
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
    <section className="bg-cream py-10 lg:py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <header className="flex flex-wrap items-end justify-between gap-6 mb-7 lg:mb-9">
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

        {/* Teaser-Cards — Scroll-Snap, full-bleed bis zum rechten Fensterrand */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 mr-[calc(50%-50vw)] pr-4 sm:pr-6 lg:pr-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {stimmen.map((s, i) => (
            <article
              key={i}
              data-card
              className="flex w-[280px] flex-shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-white sm:w-[340px]"
            >
              {/* Stadtbild-Banner (Platzhalter) */}
              <div className="relative aspect-[16/10]">
                <Image
                  src={s.stadtbild}
                  alt={`Ansicht ${s.context}`}
                  fill
                  sizes="340px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-3">
                <span className="relative h-12 w-10 flex-shrink-0">
                  <Image
                    src={s.wappen}
                    alt={`Wappen ${s.context}`}
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </span>
                <div className="font-mono text-[10.5px] font-bold uppercase leading-tight tracking-[0.1em]">
                  <div className="text-dark">{s.context}</div>
                  <div className="mt-0.5 text-soft">{s.role}</div>
                </div>
              </div>

              <blockquote className="mt-5 font-serif text-[18px] font-normal leading-[1.35] text-dark">
                <span aria-hidden className="text-accent">„</span>
                {s.quote}
                <span aria-hidden className="text-accent">"</span>
              </blockquote>

              <Link
                href={`/themenfelder/${s.themenfeld.slug}`}
                className="mt-auto inline-flex items-center gap-1.5 pt-5 font-ui text-[12.5px] font-semibold text-brand-dark transition-colors hover:text-brand"
              >
                {s.themenfeld.name}
                <ArrowUpRight size={14} aria-hidden />
              </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
