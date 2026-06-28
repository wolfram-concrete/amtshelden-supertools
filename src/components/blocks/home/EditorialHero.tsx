import Link from "next/link";

import { Badge } from "@/components/ui/badge";

interface EditorialHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  meta?: string;
}

/**
 * Großzügiger Editorial-Hero für die Startseite.
 * Setzt den ruhigen Magazin-Ton. Kein Bild — nur Typografie und Whitespace.
 */
export function EditorialHero({
  eyebrow,
  title,
  lead,
  primaryCta,
  secondaryCta,
  meta,
}: EditorialHeroProps) {
  return (
    <section className="container mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-12 lg:pb-16">
      <div className="max-w-4xl space-y-7">
        <Badge variant="eyebrow" size="default">
          {eyebrow}
        </Badge>

        <h1 className="font-serif text-[clamp(44px,7vw,88px)] font-normal leading-[1.02] tracking-tight text-dark">
          {title}
        </h1>

        <p className="font-sans text-[19px] leading-[1.7] text-mid max-w-2xl">
          {lead}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center rounded-xl bg-brand px-6 py-3 font-ui text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            {primaryCta.label}
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center rounded-xl border border-border px-6 py-3 font-ui text-[14px] font-medium text-mid transition-colors hover:bg-cream hover:text-dark"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>

        {meta && (
          <div className="font-ui text-[12px] text-soft pt-2">{meta}</div>
        )}
      </div>
    </section>
  );
}
