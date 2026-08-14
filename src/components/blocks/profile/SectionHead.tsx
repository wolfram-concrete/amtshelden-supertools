import { RevealHeading } from "@/components/motion/RevealHeading";
import { cn } from "@/lib/utils";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  className?: string;
}

/**
 * Wiederkehrendes Sektions-Heading (Editorial-Stil):
 * - Schwarze starke Trennlinie oben
 * - Grünes Eyebrow-Label (uppercase, gespacet)
 * - Source-Serif-Titel
 */
export function SectionHead({ eyebrow, title, className }: SectionHeadProps) {
  return (
    <header
      className={cn(
        "pt-8 mt-12 border-t border-border space-y-3",
        className,
      )}
    >
      <div
        data-reveal
        className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-brand"
      >
        {eyebrow}
      </div>
      <RevealHeading
        as="h2"
        text={title}
        baseDelay={100}
        className="font-serif font-normal text-[clamp(28px,3.5vw,40px)] leading-[1.02] tracking-tight text-dark"
      />
    </header>
  );
}
