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
 * - Cormorant-Serif-Titel
 */
export function SectionHead({ eyebrow, title, className }: SectionHeadProps) {
  return (
    <header
      className={cn(
        "pt-8 mt-12 border-t-2 border-dark space-y-3",
        className,
      )}
    >
      <div className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
        {eyebrow}
      </div>
      <h2 className="font-serif font-bold text-[clamp(28px,3.5vw,40px)] leading-[1.02] tracking-tight text-dark">
        {title}
      </h2>
    </header>
  );
}
