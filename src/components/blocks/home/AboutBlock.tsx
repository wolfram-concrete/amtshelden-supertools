import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Logo } from "@/components/site/Logo";

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
}

export function AboutBlock({
  eyebrow,
  title,
  lead,
  principles,
  image,
}: AboutBlockProps) {
  return (
    <section className="bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-10">
        {/* Grüner Slab mit Logo-Radien — weiche Trennung statt Vollbreit-Band */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-dark text-white px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
          {/* Linke Spalte */}
          <div className="space-y-5">
            <Logo variant="inverse" height={32} link={false} className="mb-2" />
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              {eyebrow}
            </div>
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

          {/* Rechte Spalte: Prinzipien */}
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
          </div>

          {/* Mitmachen — beide Zielgruppen im selben Modul */}
          <div className="mt-12 border-t border-white/20 pt-10 lg:mt-16">
            <div className="mb-5 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              Mitmachen — und wie es weitergeht
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Für Behörden */}
              <Link
                href="/vorschlagen"
                className="group rounded-2xl bg-white/10 p-6 transition-colors hover:bg-white/15 lg:p-7"
              >
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
                  Für Behörden
                </div>
                <h3 className="mt-2 font-serif text-[22px] font-normal leading-tight">
                  Ein Tool fehlt?
                </h3>
                <p className="mt-2 font-sans text-[14px] leading-[1.6] text-white/75">
                  Empfehlen Sie Software, die Sie nutzen — oder sagen Sie uns,
                  welche Lösung Sie für Ihr Problem vermissen.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-ui text-[13px] font-semibold text-white">
                  Tool vorschlagen
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>

              {/* Für Anbieter — weiße Primär-CTA auf Grün */}
              <Link
                href="/anbieter"
                className="group rounded-2xl bg-white p-6 text-dark transition-[filter] hover:brightness-95 lg:p-7"
              >
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                  Für Anbieter
                </div>
                <h3 className="mt-2 font-serif text-[22px] font-normal leading-tight text-dark">
                  Erreichen Sie Ihre Behörden.
                </h3>
                <p className="mt-2 font-sans text-[14px] leading-[1.6] text-mid">
                  Bringen Sie Ihr Tool ins Verzeichnis und erreichen Sie genau
                  die Behörden, für die Ihr Produkt relevant ist.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-ui text-[13px] font-semibold text-brand-dark">
                  Für Anbieter
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
