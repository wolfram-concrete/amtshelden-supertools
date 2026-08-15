import { ArrowUpRight } from "lucide-react";

import { RevealHeading } from "@/components/motion/RevealHeading";
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

function formatSocialDate(date?: string) {
  if (!date) return null;
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

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
        <header className="flex flex-wrap items-end justify-between gap-6 mb-8 lg:mb-11">
          <div className="max-w-2xl space-y-3">
            <div
              data-reveal
              className="flex items-center gap-2.5 font-sans text-[14px] font-semibold text-brand"
            >
              Teil von Amtshelden
            </div>
            <RevealHeading
              as="h2"
              text="Hinter Supertools steht eine aktive Behörden-Community."
              baseDelay={120}
              className="font-serif text-[clamp(28px,3.4vw,42px)] font-normal leading-[1.05] tracking-tight text-dark"
            />
            <p
              data-reveal
              style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
              className="font-sans text-[15px] leading-[1.65] text-mid"
            >
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

        <div className="-mx-4 overflow-x-auto px-4 pb-12 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:-mr-10 lg:ml-0 lg:px-0 lg:pb-14 [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max snap-x snap-mandatory gap-4 lg:gap-5">
            {socialFeed.map((item, i) => {
              const { Glyph, name } = platformMeta[item.platform];
              const profile = socialProfiles[item.platform];
              const date = formatSocialDate(item.publishedAt);
              return (
                <a
                  key={i}
                  href={item.href || profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-reveal="float"
                  style={
                    { "--reveal-delay": `${i * 80}ms` } as React.CSSProperties
                  }
                  className="group w-[78vw] max-w-[320px] flex-shrink-0 snap-start overflow-hidden rounded-2xl bg-white transition-shadow hover:shadow-[0_24px_54px_-30px_rgba(0,0,0,0.32)] sm:w-[300px] lg:w-[320px]"
                >
                  <div className="flex aspect-[9/16] flex-col">
                    <div className="relative h-[57%] overflow-hidden bg-brand-dark">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image.url}
                          alt={item.image.alt}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-brand-dark px-8 text-center font-serif text-[28px] leading-tight text-white">
                          {item.topic}
                        </div>
                      )}
                      <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/94 px-2.5 py-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-brand-dark shadow-sm">
                          <Glyph size={13} />
                          {name}
                        </span>
                        {item.format && (
                          <span className="rounded-full bg-dark/70 px-2.5 py-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-white">
                            {item.format}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col bg-white p-5">
                      <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-brand-dark">
                        {item.topic}
                      </div>
                      <p
                        className={cn(
                          "mt-3 text-dark",
                          item.author
                            ? "line-clamp-4 font-serif text-[21px] leading-[1.18]"
                            : "line-clamp-5 font-sans text-[15px] font-medium leading-[1.45]",
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
                        <p className="mt-3 line-clamp-1 font-ui text-[12px] text-soft">
                          {item.author}
                        </p>
                      )}

                      <div className="mt-auto flex items-end justify-between gap-5 border-t border-border pt-4">
                        <div className="min-w-0 truncate font-ui text-[12px] text-soft">
                          {date ? `${date} · ${profile.handle}` : profile.handle}
                        </div>
                        <span className="inline-flex flex-shrink-0 items-center gap-1.5 font-ui text-[13px] font-semibold text-brand-dark transition-colors group-hover:text-brand">
                          Ansehen
                          <ArrowUpRight
                            size={14}
                            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
