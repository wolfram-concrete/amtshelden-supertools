import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BrandIcon } from "@/components/icons/BrandIcon";
import type { UseCase } from "@/mocks/usecases";

interface UseCaseEntryProps {
  eyebrow: string;
  title: string;
  description?: string;
  useCases: UseCase[];
}

/**
 * Problem-/Use-Case-Einstieg — Full-Bleed-Motiv (Screen-zu-Screen) mit radialen
 * Logo-Kanten; Headline links, die kompakten Glas-Zeilen rechts angedockt
 * (links mehr Luft / Bild).
 */
export function UseCaseEntry({
  eyebrow,
  title,
  description,
  useCases,
}: UseCaseEntryProps) {
  return (
    <section className="bg-cream pt-6 lg:pt-10">
      {/* Full-Bleed-Bildcontainer mit radialen Kanten — unten verlängert,
          damit die folgende grüne Karte sich darüber legt (Lap-Effekt). */}
      <div className="relative isolate overflow-hidden rounded-[2.5rem]">
        <Image
          src="/brand/Images/magnific_two-municipal-employees-s_jSQglw9LD0.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div aria-hidden className="absolute inset-0 bg-dark/72" />

        <div className="relative container mx-auto px-6 lg:px-10 pt-14 lg:pt-20 pb-32 lg:pb-52">
          <header data-reveal className="max-w-xl space-y-3">
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              {eyebrow}
            </div>
            <h2
              style={{ lineHeight: 1.05 }}
              className="font-serif text-[clamp(30px,3.8vw,48px)] font-normal tracking-tight text-white"
            >
              {title}
            </h2>
            {description && (
              <p className="font-sans text-[15px] leading-[1.6] text-white/80">
                {description}
              </p>
            )}
          </header>

          {/* Kompakte Glas-Zeilen — rechts angedockt */}
          <div className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:ml-auto lg:w-[62%]">
            {useCases.map((uc) => (
              <Link
                key={uc.label}
                href={uc.href}
                className="group flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <span
                  aria-hidden
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/15 text-white"
                >
                  <BrandIcon name={uc.icon} size={17} />
                </span>
                <span className="flex-1 font-ui text-[13.5px] font-medium text-white">
                  {uc.label}
                </span>
                <ArrowRight
                  size={15}
                  className="flex-shrink-0 text-white/55 transition-all group-hover:translate-x-0.5 group-hover:text-white"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
