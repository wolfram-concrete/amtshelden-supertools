import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroImmersiveProps {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Trust-Badges unten links (1–3 kurze Aussagen) */
  badges?: string[];
}

/**
 * Hero-Motiv — großflächiges Hintergrundbild mit überlagerten Texten.
 *
 * PLATZHALTER: Konferenz-/Sitzungssaal (Unsplash), bis die echten
 * Behördenalltag-Motive produziert sind. Brief: deutsche
 * Verwaltungssituationen (Bürgerbüro, Amtsstube, Sitzung, Schalter).
 * Vor Produktion durch lokales Asset ersetzen (public/brand/…) und
 * HERO_IMAGE anpassen — `object-cover` verhindert jedes Strecken.
 */
const HERO_IMAGE = {
  url: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=2000&h=1200&fit=crop&q=80",
  alt: "Sitzungssaal einer Verwaltung mit langem Konferenztisch",
};

export function HeroImmersive({
  eyebrow,
  title,
  lead,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
  badges,
}: HeroImmersiveProps) {
  return (
    <section className="bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-4 lg:pt-6 pb-10 lg:pb-14">
        <div className="relative flex min-h-[540px] lg:min-h-[660px] overflow-hidden rounded-3xl">
          {/* Hintergrund-Motiv */}
          <Image
            src={HERO_IMAGE.url}
            alt={HERO_IMAGE.alt}
            fill
            sizes="(min-width: 1024px) 1200px, 100vw"
            className="object-cover"
            priority
          />
          {/* Lesbarkeits-Overlays: links abgedunkelt, unten Verlauf */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
          />

          {/* Inhalt */}
          <div className="relative z-10 flex w-full flex-col justify-center p-7 sm:p-12 lg:p-16">
            <div className="max-w-xl">
              <div className="font-ui text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                {eyebrow}
              </div>
              <h1
                style={{ lineHeight: 1.04 }}
                className="mt-5 font-serif text-[clamp(34px,5vw,62px)] font-semibold tracking-tight text-white"
              >
                {title}
              </h1>
              <p className="mt-5 font-sans text-[16px] lg:text-[18px] leading-[1.6] text-white/85 max-w-md">
                {lead}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-ui text-[14px] font-semibold text-white transition-colors hover:bg-white hover:text-brand-dark"
                >
                  {ctaLabel}
                  <ArrowRight size={16} aria-hidden />
                </Link>
                {secondaryLabel && secondaryHref && (
                  <Link
                    href={secondaryHref}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-ui text-[14px] font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    {secondaryLabel}
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Trust-Badges unten links */}
          {badges && badges.length > 0 && (
            <div className="absolute bottom-6 left-7 right-7 z-10 flex flex-wrap gap-2 sm:left-12 lg:left-16">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-ui text-[11px] font-medium uppercase tracking-[0.1em] text-white backdrop-blur"
                >
                  <span
                    aria-hidden
                    className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand text-white text-[8px] font-bold"
                  >
                    ✓
                  </span>
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
