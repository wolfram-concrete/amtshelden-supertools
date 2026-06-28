import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface AboutPrinciple {
  title: string;
  body: string;
}

interface AboutBlockProps {
  eyebrow: string;
  title: string;
  lead: string;
  principles: AboutPrinciple[];
  /** Optionales Motiv in der linken Spalte */
  image?: { url: string; alt: string };
  /** Slab über die vorige (Bild-)Sektion ziehen — Lap-Effekt */
  overlapPrev?: boolean;
}

export function AboutBlock({
  eyebrow,
  title,
  lead,
  principles,
  image,
  overlapPrev = false,
}: AboutBlockProps) {
  return (
    <section className="bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-10">
        {/* Grüner Slab mit Logo-Radien */}
        <div
          className={cn(
            "relative z-10 overflow-hidden rounded-[2.5rem] bg-brand-dark text-white px-6 sm:px-10 lg:px-16 py-12 lg:py-16",
            overlapPrev && "-mt-28 lg:-mt-44",
          )}
        >
          {/* Eyebrow oben — zwischen Slab-Kante und Headline */}
          <div className="mb-8 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </div>

          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            {/* Linke Spalte — Headline oben bündig mit den Prinzipien rechts */}
            <div className="space-y-5">
              <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] font-normal leading-[1.02] tracking-tight">
                {title}
              </h2>
              <p className="font-sans text-[16px] leading-[1.7] text-white/80">
                {lead}
              </p>

              {image && (
                <figure className="relative mt-7 aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/15">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover"
                  />
                </figure>
              )}
            </div>

            {/* Rechte Spalte — Prinzipien + Mitmachen-CTAs (füllen die Lücke) */}
            <div className="space-y-10">
              <div className="grid gap-8 sm:grid-cols-2">
                {principles.map((p, idx) => (
                  <div
                    key={idx}
                    className="space-y-2 border-t border-white/25 pt-5"
                  >
                    <div className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
                      0{idx + 1}
                    </div>
                    <h3 className="font-serif text-[20px] font-normal leading-tight">
                      {p.title}
                    </h3>
                    <p className="font-sans text-[14px] leading-[1.65] text-white/75">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mitmachen — kompakt, beide Zielgruppen */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/vorschlagen"
                  className="group rounded-2xl bg-white/10 p-5 transition-colors hover:bg-white/15"
                >
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/70">
                    Für Behörden
                  </div>
                  <h3 className="mt-1.5 font-serif text-[20px] font-normal leading-tight">
                    Ein Tool fehlt?
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-ui text-[12.5px] font-semibold text-white">
                    Tool vorschlagen
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>

                <Link
                  href="/anbieter"
                  className="group rounded-2xl bg-white p-5 text-dark transition-[filter] hover:brightness-95"
                >
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-brand">
                    Für Anbieter
                  </div>
                  <h3 className="mt-1.5 font-serif text-[20px] font-normal leading-tight text-dark">
                    Erreichen Sie Ihre Behörden.
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-ui text-[12.5px] font-semibold text-brand-dark">
                    Für Anbieter
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
