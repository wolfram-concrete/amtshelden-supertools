import { RevealHeading } from "@/components/motion/RevealHeading";
import { cn } from "@/lib/utils";

interface SectionHeadProps {
  /** @deprecated Eyebrow entfernt (De-Slop) — Trennlinie + Titel tragen die Sektion. */
  eyebrow?: string;
  title: string;
  className?: string;
}

/**
 * Wiederkehrendes Sektions-Heading (Editorial-Stil):
 * - Feine Trennlinie oben
 * - Source-Serif-Titel (trägt die Sektion selbst — kein Käppchen)
 */
export function SectionHead({ title, className }: SectionHeadProps) {
  return (
    <header
      className={cn(
        "pt-8 mt-12 border-t border-border space-y-3",
        className,
      )}
    >
      <RevealHeading
        as="h2"
        text={title}
        baseDelay={100}
        className="font-display text-[clamp(28px,3.5vw,40px)] leading-[1.02] text-dark"
      />
    </header>
  );
}
