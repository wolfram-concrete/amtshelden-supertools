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
 * Problem-/Use-Case-Einstieg als plakatives Bento-Grid.
 *
 * „Behörden suchen nicht nach einem Tooltyp, sondern nach einem Problem."
 * Große, klar abgegrenzte Kacheln mit Icon-Chip + Problem-Statement —
 * scanbar, fingerfreundlich, zielgruppengerecht proportioniert.
 */
export function UseCaseEntry({
  eyebrow,
  title,
  description,
  useCases,
}: UseCaseEntryProps) {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
      <header className="max-w-2xl space-y-3 mb-8 lg:mb-10">
        <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
          {eyebrow}
        </div>
        <h2
          style={{ lineHeight: 1.05 }}
          className="font-serif text-[clamp(28px,3.4vw,42px)] font-normal tracking-tight text-dark"
        >
          {title}
        </h2>
        {description && (
          <p className="font-sans text-[16px] leading-[1.65] text-mid">
            {description}
          </p>
        )}
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {useCases.map((uc) => (
          <Link
            key={uc.label}
            href={uc.href}
            className="group flex flex-col justify-between gap-6 rounded-2xl border border-border bg-white p-5 lg:p-6 min-h-[140px] transition-colors hover:border-brand hover:bg-cream/40"
          >
            <span
              aria-hidden
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-brand-dark"
            >
              <BrandIcon name={uc.icon} size={24} />
            </span>
            <div className="flex items-end justify-between gap-3">
              <span className="font-serif text-[19px] font-normal leading-[1.15] text-dark group-hover:text-brand-dark transition-colors">
                {uc.label}
              </span>
              <ArrowRight
                size={17}
                className="flex-shrink-0 mb-0.5 text-soft transition-all group-hover:translate-x-0.5 group-hover:text-brand"
                aria-hidden
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
