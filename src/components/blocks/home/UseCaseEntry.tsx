import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { UseCase } from "@/mocks/usecases";

interface UseCaseEntryProps {
  eyebrow: string;
  title: string;
  description?: string;
  useCases: UseCase[];
}

/**
 * Problem-/Use-Case-Einstieg (Strategie-Meeting 12.06.2026):
 * „Behörden suchen nicht nach einem Tooltyp, sondern nach einem Problem."
 *
 * Klickbare Problem-Statements als Einstieg — führen direkt zum passenden
 * Themenfeld oder zur Kategorie. Bewusst der erste „aktive" Block nach dem
 * Hero, weil der Problem-Einstieg die Realität der Zielgruppe trifft.
 */
export function UseCaseEntry({
  eyebrow,
  title,
  description,
  useCases,
}: UseCaseEntryProps) {
  return (
    <section className="container mx-auto px-6 lg:px-10 py-16 lg:py-20">
      <header className="max-w-2xl space-y-3 mb-8 lg:mb-10">
        <div className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
          {eyebrow}
        </div>
        <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.02] tracking-tight text-dark">
          {title}
        </h2>
        {description && (
          <p className="font-sans text-[16px] leading-[1.65] text-mid">
            {description}
          </p>
        )}
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {useCases.map((uc) => (
          <Link
            key={uc.label}
            href={uc.href}
            className="group flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3.5 transition-colors hover:border-brand hover:bg-cream/40"
          >
            <span aria-hidden className="text-xl flex-shrink-0">
              {uc.icon}
            </span>
            <span className="flex-1 font-ui text-[14px] font-medium leading-tight text-dark group-hover:text-brand-dark transition-colors">
              {uc.label}
            </span>
            <ArrowRight
              size={15}
              className="flex-shrink-0 text-soft transition-all group-hover:translate-x-0.5 group-hover:text-brand"
              aria-hidden
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
