import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { cn, formatDateDE } from "@/lib/utils";
import type { ProfilHeroData } from "@/types/profile";

interface ProfilHeroProps extends ProfilHeroData {
  /** ISO-Datum der letzten redaktionellen Prüfung — zentrales Trust-Element */
  lastCheckedAt?: string;
  className?: string;
}

/** Einfacher Inline-Renderer: *italic* → <em> und **bold** → <strong> */
function renderInline(text: string) {
  // Reihenfolge: erst bold, dann italic
  const parts: Array<{ type: "text" | "em" | "strong"; value: string }> = [];
  let remaining = text;
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIdx = 0;
  let m;
  while ((m = re.exec(remaining))) {
    if (m.index > lastIdx) {
      parts.push({ type: "text", value: remaining.slice(lastIdx, m.index) });
    }
    const matched = m[0];
    if (matched.startsWith("**")) {
      parts.push({ type: "strong", value: matched.slice(2, -2) });
    } else {
      parts.push({ type: "em", value: matched.slice(1, -1) });
    }
    lastIdx = re.lastIndex;
  }
  if (lastIdx < remaining.length) {
    parts.push({ type: "text", value: remaining.slice(lastIdx) });
  }
  return parts.map((p, i) => {
    if (p.type === "strong") return <strong key={i} className="font-semibold text-dark">{p.value}</strong>;
    if (p.type === "em") return <em key={i} className="not-italic font-medium text-brand-dark">{p.value}</em>;
    return <span key={i}>{p.value}</span>;
  });
}

export function ProfilHero({
  categoryLabel,
  title,
  lead,
  byline,
  verified,
  lastCheckedAt,
  heroImage,
  heroCaption,
  company,
  urteil,
  pullQuote,
  body,
  className,
}: ProfilHeroProps) {
  return (
    <article className={cn("space-y-6", className)}>
      {/* Kategorie-Eyebrow */}
      <div className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
        {categoryLabel}
      </div>

      {/* Headline */}
      <h1 className="font-serif font-semibold text-[clamp(36px,5vw,56px)] leading-[1.05] tracking-tight text-dark">
        {title}
      </h1>

      {/* Lead */}
      <p className="font-sans text-[19px] leading-relaxed text-mid max-w-[60ch]">
        {lead}
      </p>

      {/* Byline */}
      <div className="flex items-center gap-3 pt-3 pb-1 border-y border-border">
        {byline.avatar?.url && (
          <Image
            src={byline.avatar.url}
            alt={byline.avatar.alt || byline.editor}
            width={byline.avatar.width || 34}
            height={byline.avatar.height || 34}
            className="h-[34px] w-[34px] rounded-full object-cover"
            sizes="34px"
          />
        )}
        <p className="font-ui text-[12px] text-soft flex-1">
          Recherchiert von{" "}
          <strong className="font-semibold text-dark">{byline.editor}</strong>
          {lastCheckedAt ? (
            <>
              {" "}·{" "}
              <span className="font-medium text-dark">
                Zuletzt geprüft am {formatDateDE(lastCheckedAt)}
              </span>
            </>
          ) : (
            <> · Aktualisiert {byline.updatedAt}</>
          )}
        </p>
        {verified && (
          <Badge variant="verified" size="sm">
            ✓ Verifiziert
          </Badge>
        )}
      </div>

      {/* Hero Image */}
      {heroImage?.url && (
        <figure className="space-y-2">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-dark">
            <Image
              src={heroImage.url}
              alt={heroImage.alt}
              fill
              sizes="(min-width: 1024px) 720px, 100vw"
              className="object-cover"
              priority
            />
            {/* Gradient-Overlay für Lesbarkeit der Company-Marke */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

            {/* Company-Overlay unten links */}
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-[14px] font-ui font-extrabold text-dark">
                {company.mark}
              </div>
              <div className="leading-tight">
                <div className="font-ui text-[14px] font-bold text-white">
                  {company.name}
                </div>
                <div className="font-ui text-[10px] text-white/60">
                  {company.type}
                </div>
              </div>
            </div>
          </div>
          {heroCaption && (
            <figcaption className="font-ui text-[11px] text-soft italic">
              {heroCaption}
            </figcaption>
          )}
        </figure>
      )}

      {/* Amtshelden-Urteil — Pull Quote Style */}
      <aside className="border-l-2 border-brand pl-6 py-2 my-4">
        <div className="font-ui text-[10px] font-bold uppercase tracking-[0.18em] text-brand mb-2">
          Amtshelden-Urteil
        </div>
        <p className="font-serif text-[20px] font-semibold leading-[1.5] italic text-dark">
          {renderInline(urteil)}
        </p>
      </aside>

      {/* Pull Quote — menschliche Stimme früh */}
      {pullQuote && (
        <blockquote className="bg-cream/60 border border-border rounded-xl px-6 py-5">
          <p className="font-serif text-[22px] font-semibold leading-tight italic text-dark">
            „{pullQuote.text}"
          </p>
          <footer className="mt-3 font-ui text-[12px] text-soft">
            {pullQuote.source}
          </footer>
        </blockquote>
      )}

      {/* Body-Absätze */}
      {body?.map((paragraph, idx) => (
        <p
          key={idx}
          className="font-sans text-[17px] leading-[1.75] text-mid"
        >
          {renderInline(paragraph)}
        </p>
      ))}
    </article>
  );
}
