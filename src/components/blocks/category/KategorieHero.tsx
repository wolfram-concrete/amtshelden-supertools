import { BrandIcon } from "@/components/icons/BrandIcon";
import { RevealHeading } from "@/components/motion/RevealHeading";
import type { CategoryDefinition } from "@/types/content";

interface KategorieHeroProps {
  category: CategoryDefinition;
  toolCount: number;
}

export function KategorieHero({ category, toolCount }: KategorieHeroProps) {
  return (
    <header className="container mx-auto px-6 lg:px-10 pt-12 lg:pt-20 pb-10 lg:pb-14">
      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12 items-end">
        {/* Linke Spalte: Editorial */}
        <div className="space-y-5">
          <div data-reveal className="flex items-center gap-3">
            <div
              aria-hidden
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-brand-dark"
            >
              {category.icon && <BrandIcon name={category.icon} size={22} />}
            </div>
            <div className="font-sans text-[13px] font-semibold text-brand">
              {toolCount} Tools
            </div>
          </div>

          <RevealHeading
            as="h1"
            text={category.name}
            baseDelay={120}
            className="font-display text-[clamp(36px,5vw,64px)] leading-[1.04] text-dark"
          />

          <p
            data-reveal
            style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            className="font-sans text-[18px] leading-[1.7] text-mid max-w-2xl"
          >
            {category.tagline}
          </p>
        </div>

        {/* Rechte Spalte: Topics + redaktioneller Intro */}
        <div className="space-y-4">
          {category.topics && category.topics.length > 0 && (
            <div className="space-y-2">
              <div className="font-sans text-[12px] font-semibold text-soft">
                Themenfelder
              </div>
              <div className="flex flex-wrap gap-2">
                {category.topics.map((topic) => (
                  <span
                    key={topic}
                    className="inline-flex items-center rounded-full bg-cream border border-border px-3 py-1 font-ui text-[12px] font-medium text-mid"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
