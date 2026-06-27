import Link from "next/link";

import { cn } from "@/lib/utils";
import type { PassDasData } from "@/types/profile";

import { SectionHead } from "./SectionHead";

interface PassDasBlockProps extends PassDasData {
  className?: string;
}

export function PassDasBlock({
  body,
  fitTags,
  notFit,
  className,
}: PassDasBlockProps) {
  return (
    <section className={cn("space-y-6", className)}>
      <SectionHead
        eyebrow="Für wen ist das?"
        title="Passt das zu unserer Behörde?"
      />

      <p className="font-sans text-[17px] leading-[1.75] text-mid">{body}</p>

      {/* Fit-Tags */}
      {fitTags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {fitTags.map((tag, idx) => (
            <span
              key={`${tag.label}-${idx}`}
              className={cn(
                "inline-flex items-center font-ui text-[12px] font-medium px-3 py-1.5 rounded-full",
                tag.neutral
                  ? "bg-cream text-mid border border-border"
                  : "bg-brand-light text-brand-dark border border-brand/20",
              )}
            >
              {tag.label}
            </span>
          ))}
        </div>
      )}

      {/* "Nicht geeignet für" — positiv umformuliert */}
      {notFit && (
        <div className="mt-6 flex gap-4 rounded-xl bg-amber-light/50 border border-amber-light p-5">
          <div
            aria-hidden
            className="flex-shrink-0 mt-1 h-7 w-7 rounded-full bg-white border border-border flex items-center justify-center text-brand font-bold"
          >
            →
          </div>
          <div className="flex-1">
            <div className="font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-dark mb-2">
              {notFit.label}
            </div>
            <p className="font-sans text-[15px] leading-[1.65] text-mid">
              {renderNotFitText(notFit.text, notFit.alternativeLinks)}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

/** Ersetzt Tool-Namen im Text durch klickbare Links, falls vorhanden */
function renderNotFitText(
  text: string,
  links?: { text: string; url: string }[],
) {
  if (!links?.length) return text;

  const escapedNames = links.map((l) =>
    l.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const re = new RegExp(`(${escapedNames.join("|")})`, "g");
  const parts = text.split(re);

  return parts.map((part, idx) => {
    const link = links.find((l) => l.text === part);
    if (link) {
      return (
        <Link
          key={idx}
          href={link.url}
          className="text-brand-dark font-medium underline-offset-2 hover:underline"
        >
          {part}
        </Link>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}
