import Image from "next/image";

import { Parallax } from "@/components/motion/Parallax";
import { ToolFinderWizard } from "./ToolFinderWizard";

interface HeroImmersiveProps {
  title: React.ReactNode;
  lead: string;
  /** Trust-Badges unter dem Lead (1–3 kurze Aussagen) */
  badges?: string[];
}

/**
 * Hero — großflächiges Behördenalltag-Motiv als Hintergrund, darüber
 * Headline/Lead links und der grüne Tool-Finder als Karte rechts.
 *
 * Motiv: echtes Verwaltungs-Großraumbüro (public/brand/Images, KI-generiert).
 * `object-cover` → kein Strecken. Swap über HERO_IMAGE.
 */
const HERO_IMAGE = {
  url: "/brand/Images/magnific_wide-view-inside-a-modern_dIn8okKXSL.jpg",
  alt: "Großraumbüro einer Verwaltung mit mehreren Mitarbeitenden an Arbeitsplätzen",
};

export function HeroImmersive({ title, lead, badges }: HeroImmersiveProps) {
  return (
    <section className="bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-4 lg:pt-6 pb-10 lg:pb-14">
        <div className="relative flex items-center overflow-hidden rounded-3xl min-h-[560px] lg:min-h-[720px]">
          {/* Hintergrund-Motiv mit leichtem Parallax */}
          <Parallax speed={0.12} className="absolute inset-x-0 -inset-y-[10%]">
            <Image
              src={HERO_IMAGE.url}
              alt={HERO_IMAGE.alt}
              fill
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="object-cover"
              priority
            />
          </Parallax>
          {/* Lesbarkeits-Overlay — mobil von oben (anderer Bildausschnitt),
              ab lg von links */}
          <div aria-hidden className="absolute inset-0 bg-black/15" />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent lg:bg-gradient-to-r lg:from-black/55 lg:via-black/15 lg:to-transparent"
          />

          {/* Inhalt */}
          <div className="relative z-10 grid w-full items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_minmax(0,400px)] lg:gap-12 lg:p-14">
            {/* Text links */}
            <div className="max-w-xl">
              <h1
                data-reveal
                style={{ lineHeight: 1.02 }}
                className="font-serif text-[clamp(38px,5.4vw,68px)] font-normal tracking-tight text-white"
              >
                {title}
              </h1>
              <p
                data-reveal
                style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
                className="mt-4 font-sans text-[16px] lg:text-[18px] leading-[1.6] text-white/85 max-w-md"
              >
                {lead}
              </p>

              {badges && badges.length > 0 && (
                <ul
                  data-reveal
                  style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {badges.map((badge) => (
                    <li
                      key={badge}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-white backdrop-blur"
                    >
                      <span
                        aria-hidden
                        className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand text-white text-[8px] font-bold"
                      >
                        ✓
                      </span>
                      {badge}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Tool-Finder rechts */}
            <ToolFinderWizard className="shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
