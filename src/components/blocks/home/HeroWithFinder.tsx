import { Badge } from "@/components/ui/badge";
import { categories } from "@/mocks/categories";

import { QuickFinder } from "./QuickFinder";

interface HeroWithFinderProps {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  trustSignals?: string[];
}

/**
 * Editorial-Hero (Magazin) + QuickFinder (Booking.com-Vibe) — beides parallel.
 * Linke Spalte: Cormorant-Headline, Lead, Trust-Signale.
 * Rechte Spalte: QuickFinder mit 3 Fragen.
 */
export function HeroWithFinder({
  eyebrow,
  title,
  lead,
  trustSignals,
}: HeroWithFinderProps) {
  return (
    <section className="container mx-auto px-6 lg:px-10 pt-12 lg:pt-20 pb-10 lg:pb-16">
      <div className="grid lg:grid-cols-[1.45fr_1fr] gap-10 lg:gap-16 items-start">
        {/* ── Linke Spalte: Editorial ── */}
        <div className="space-y-7 lg:pt-6">
          <Badge variant="eyebrow" size="default">
            {eyebrow}
          </Badge>

          <h1 className="font-serif text-[clamp(40px,6.5vw,84px)] font-bold leading-[1.02] tracking-tight text-dark">
            {title}
          </h1>

          <p className="font-sans text-[19px] leading-[1.7] text-mid max-w-xl">
            {lead}
          </p>

          {trustSignals && trustSignals.length > 0 && (
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
              {trustSignals.map((signal) => (
                <li
                  key={signal}
                  className="flex items-center gap-1.5 font-ui text-[12px] font-medium text-soft"
                >
                  <span
                    aria-hidden
                    className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-light text-brand-dark text-[9px] font-bold"
                  >
                    ✓
                  </span>
                  {signal}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Rechte Spalte: QuickFinder ── */}
        <QuickFinder categories={categories} />
      </div>
    </section>
  );
}
