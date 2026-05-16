import Link from "next/link";

import { cn } from "@/lib/utils";
import type { ProfilCtaData } from "@/types/profile";

interface ProfilCtaProps extends ProfilCtaData {
  className?: string;
  id?: string;
}

export function ProfilCta({
  id = "anfrage",
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  note,
  className,
}: ProfilCtaProps) {
  return (
    <section
      id={id}
      className={cn(
        "mt-16 rounded-2xl bg-dark text-white px-8 py-12 lg:px-12 lg:py-16",
        className,
      )}
    >
      <div className="max-w-xl space-y-5">
        <div className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
          {eyebrow}
        </div>
        <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.1] tracking-tight whitespace-pre-line">
          {title}
        </h2>
        <p className="font-sans text-[16px] leading-[1.7] text-white/70">
          {subtitle}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={primaryCta.url}
            target={primaryCta.newTab ? "_blank" : undefined}
            rel={primaryCta.newTab ? "noopener noreferrer" : undefined}
            className="inline-flex items-center rounded-full bg-brand px-6 py-3 font-ui text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            {primaryCta.text}
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.url}
              target={secondaryCta.newTab ? "_blank" : undefined}
              rel={secondaryCta.newTab ? "noopener noreferrer" : undefined}
              className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 font-ui text-[14px] font-medium text-white transition-colors hover:bg-white/10"
            >
              {secondaryCta.text}
            </Link>
          )}
        </div>

        {note && (
          <p className="font-ui text-[11px] text-white/50 pt-4 whitespace-pre-line">
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
