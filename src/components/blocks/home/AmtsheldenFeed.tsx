import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { socialFeed, socialProfiles } from "@/mocks/social";

/** Brand-Glyphs — lucide-react führt keine Marken-Icons mehr; inline statt Abhängigkeit. */
function InstagramGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const platformMeta = {
  instagram: { Glyph: InstagramGlyph, name: "Instagram" },
  linkedin: { Glyph: LinkedinGlyph, name: "LinkedIn" },
} as const;

/**
 * Amtshelden-Feed — Trust-/Community-Block im unteren Home-Bereich.
 * Verbindet Supertools sichtbar mit der etablierten Amtshelden-Community
 * und führt zu beiden Social-Profilen.
 */
export function AmtsheldenFeed() {
  const { linkedin, instagram } = socialProfiles;

  return (
    <section className="bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-20">
        <header data-reveal className="flex flex-wrap items-end justify-between gap-6 mb-8 lg:mb-11">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              Teil von Amtshelden
            </div>
            <h2 className="font-serif text-[clamp(28px,3.4vw,42px)] font-normal leading-[1.05] tracking-tight text-dark">
              Hinter Supertools steht eine aktive Behörden-Community.
            </h2>
            <p className="font-sans text-[15px] leading-[1.65] text-mid">
              Amtshelden begleitet Verwaltungen bei Kommunikation, KI und
              Transformation. Supertools ist der kuratierte Tool-Teil davon —
              getragen von denselben Menschen, die täglich mit Behörden arbeiten.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-dark px-4 font-ui text-[13px] font-semibold text-white transition-colors hover:bg-brand"
            >
              <LinkedinGlyph size={16} />
              {linkedin.label}
            </a>
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-white px-4 font-ui text-[13px] font-semibold text-dark transition-colors hover:border-brand hover:text-brand-dark"
            >
              <InstagramGlyph size={16} />
              {instagram.label}
            </a>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {socialFeed.map((item, i) => {
            const { Glyph, name } = platformMeta[item.platform];
            const profile = socialProfiles[item.platform];
            return (
              <a
                key={i}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl bg-white p-6 transition-shadow hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)]"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-brand-dark">
                    <Glyph size={15} />
                    {name}
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-soft">
                    {item.topic}
                  </span>
                </div>

                <p
                  className={cn(
                    "mt-5 flex-1 text-dark",
                    item.author
                      ? "font-serif text-[19px] leading-[1.35]"
                      : "font-sans text-[15px] leading-[1.6]",
                  )}
                >
                  {item.author && (
                    <span aria-hidden className="text-accent">
                      „
                    </span>
                  )}
                  {item.text}
                  {item.author && (
                    <span aria-hidden className="text-accent">
                      "
                    </span>
                  )}
                </p>

                {item.author && (
                  <p className="mt-3 font-ui text-[12px] text-soft">
                    {item.author}
                  </p>
                )}

                <span className="mt-5 inline-flex items-center gap-1.5 font-ui text-[12.5px] font-semibold text-brand-dark transition-colors group-hover:text-brand">
                  Mehr auf {name}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
