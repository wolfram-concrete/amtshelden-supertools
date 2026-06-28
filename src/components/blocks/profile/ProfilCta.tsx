import Link from "next/link";

import { Logo } from "@/components/site/Logo";
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
        "mt-16 rounded-2xl bg-brand-dark text-white px-8 py-12 lg:px-12 lg:py-16 relative overflow-hidden",
        className,
      )}
    >
      <div className="mb-8 relative">
        <Logo variant="inverse" height={28} link={false} />
      </div>

      <div className="max-w-xl space-y-5 relative">
        <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
          {eyebrow}
        </div>
        <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] font-normal leading-[1.02] tracking-tight whitespace-pre-line">
          {title}
        </h2>
        <p className="font-sans text-[16px] leading-[1.7] text-white/85">
          {subtitle}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={primaryCta.url}
            target={primaryCta.newTab ? "_blank" : undefined}
            rel={primaryCta.newTab ? "noopener noreferrer" : undefined}
            className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-ui text-[14px] font-semibold text-brand-dark transition-colors hover:bg-cream"
          >
            {primaryCta.text}
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.url}
              target={secondaryCta.newTab ? "_blank" : undefined}
              rel={secondaryCta.newTab ? "noopener noreferrer" : undefined}
              className="inline-flex items-center rounded-xl border border-white/35 px-6 py-3 font-ui text-[14px] font-medium text-white transition-colors hover:bg-white/10"
            >
              {secondaryCta.text}
            </Link>
          )}
        </div>

        {note && (
          <p className="font-ui text-[11px] text-white/60 pt-4 whitespace-pre-line">
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
