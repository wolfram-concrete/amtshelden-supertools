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
 * Problem-/Use-Case-Einstieg — die Thematik wird groß über ein Vollbild-Motiv
 * eröffnet; darüber kompakte, scanbare Glas-Zeilen (Icon + Problem-Statement)
 * statt großer Kacheln. „Behörden suchen nach einem Problem, nicht nach einem
 * Tooltyp."
 */
export function UseCaseEntry({
  eyebrow,
  title,
  description,
  useCases,
}: UseCaseEntryProps) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Vollbild-Motiv im Hintergrund */}
      <Image
        src="/brand/Images/magnific_two-municipal-employees-s_jSQglw9LD0.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div aria-hidden className="absolute inset-0 bg-dark/72" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <header className="max-w-2xl space-y-3">
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
            <p className="font-sans text-[16px] leading-[1.65] text-white/80">
              {description}
            </p>
          )}
        </header>

        {/* Kompakte Glas-Zeilen */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {useCases.map((uc) => (
            <Link
              key={uc.label}
              href={uc.href}
              className="group flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <span
                aria-hidden
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/15 text-white"
              >
                <BrandIcon name={uc.icon} size={20} />
              </span>
              <span className="flex-1 font-ui text-[14.5px] font-medium text-white">
                {uc.label}
              </span>
              <ArrowRight
                size={16}
                className="flex-shrink-0 text-white/55 transition-all group-hover:translate-x-0.5 group-hover:text-white"
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
