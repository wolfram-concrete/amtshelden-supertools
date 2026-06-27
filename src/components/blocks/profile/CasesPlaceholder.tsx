import { cn } from "@/lib/utils";
import type { CasesData } from "@/types/profile";

import { SectionHead } from "./SectionHead";

interface CasesPlaceholderProps extends CasesData {
  className?: string;
}

/**
 * Phase 2: Zeigt nur den Placeholder.
 * Echte Cases-Liste folgt als Add-on (siehe README Kap. 31).
 */
export function CasesPlaceholder({
  enabled,
  placeholderText,
  className,
}: CasesPlaceholderProps) {
  if (enabled) {
    // TODO Phase 3+: echte Case-Cards rendern
    return null;
  }

  return (
    <section className={cn("space-y-4", className)}>
      <SectionHead
        eyebrow="Implementierungsfälle"
        title="Wie das Tool in der Praxis eingesetzt wird"
      />

      <div className="rounded-2xl bg-cream border border-dashed border-border p-8 text-center space-y-3">
        <div className="text-3xl" aria-hidden>
          📋
        </div>
        <div className="font-serif text-[20px] font-normal text-dark">
          Cases folgen in Kürze
        </div>
        {placeholderText && (
          <p className="font-sans text-[14px] leading-[1.65] text-soft max-w-md mx-auto">
            {placeholderText}
          </p>
        )}
      </div>
    </section>
  );
}
