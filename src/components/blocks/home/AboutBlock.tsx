import Image from "next/image";

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
            <div className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
              {eyebrow}
            </div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] font-semibold leading-[1.02] tracking-tight">
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
                <div className="font-ui text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-[20px] font-semibold leading-tight">
                  {p.title}
                </h3>
                <p className="font-sans text-[14px] leading-[1.65] text-white/75">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
