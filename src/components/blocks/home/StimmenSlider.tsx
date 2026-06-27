"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { BrandIcon } from "@/components/icons/BrandIcon";
import { cn } from "@/lib/utils";
import { stimmen } from "@/mocks/stimmen";

interface StimmenSliderProps {
  eyebrow: string;
  title: string;
  lead?: string;
}

/**
 * Persona-Stimmen-Slider — typische Ausgangslagen aus der Verwaltung.
 * Ein Card pro Slide (großes Serif-Zitat), Prev/Next + Dots. Baut Relevanz
 * und Vertrauen, ohne erfundene Namens-Testimonials.
 */
export function StimmenSlider({ eyebrow, title, lead }: StimmenSliderProps) {
  const [index, setIndex] = useState(0);
  const count = stimmen.length;
  const s = stimmen[index];

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  return (
    <section className="bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <header className="max-w-2xl space-y-3 mb-10 lg:mb-12">
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(28px,3.4vw,42px)] font-normal leading-[1.05] tracking-tight text-dark">
            {title}
          </h2>
          {lead && (
            <p className="font-sans text-[16px] leading-[1.65] text-mid">
              {lead}
            </p>
          )}
        </header>

        {/* Slide */}
        <div className="rounded-2xl bg-white p-7 sm:p-10 lg:p-14">
          <div key={index} className="animate-stimme">
            {/* Themenfeld-Icon */}
            <span
              aria-hidden
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-brand-dark"
            >
              <BrandIcon name={s.themenfeld.icon} size={24} />
            </span>

            <blockquote className="mt-6 font-serif text-[clamp(22px,2.8vw,34px)] font-normal leading-[1.3] tracking-tight text-dark max-w-3xl">
              <span aria-hidden className="text-accent">„</span>
              {s.quote}
              <span aria-hidden className="text-accent">"</span>
            </blockquote>

            <figcaption className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-soft">
              <span className="text-dark">{s.role}</span>
              <span aria-hidden className="text-border">·</span>
              <span>{s.context}</span>
            </figcaption>

            <Link
              href={`/themenfelder/${s.themenfeld.slug}`}
              className="mt-5 inline-flex items-center gap-1.5 font-ui text-[13px] font-semibold text-brand-dark transition-colors hover:text-brand"
            >
              Passendes Themenfeld: {s.themenfeld.name}
              <ArrowUpRight size={15} aria-hidden />
            </Link>
          </div>
        </div>

        {/* Steuerung */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {stimmen.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Stimme ${i + 1} von ${count}`}
                aria-current={i === index}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === index ? "w-6 bg-brand" : "w-2 bg-border hover:bg-soft",
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Vorherige Stimme"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-mid transition-colors hover:border-brand hover:text-brand-dark"
            >
              <ArrowLeft size={17} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Nächste Stimme"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-mid transition-colors hover:border-brand hover:text-brand-dark"
            >
              <ArrowRight size={17} aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes stimme-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-stimme { animation: stimme-in 0.35s ease-out; }
      `}</style>
    </section>
  );
}
