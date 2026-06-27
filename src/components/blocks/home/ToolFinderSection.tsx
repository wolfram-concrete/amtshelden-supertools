import { ToolFinderWizard } from "./ToolFinderWizard";

interface ToolFinderSectionProps {
  eyebrow: string;
  title: string;
  lead: string;
  points?: string[];
}

/**
 * Eigene Sektion für den Tool-Finder (aus dem Hero ausgelagert).
 * Links redaktionelle Einordnung, rechts der grüne 6-Fragen-Wizard.
 * „Zusätzlicher Zugang, nicht Ersatz für die normalen Kategorien."
 */
export function ToolFinderSection({
  eyebrow,
  title,
  lead,
  points,
}: ToolFinderSectionProps) {
  return (
    <section id="tool-finder" className="bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_minmax(0,480px)] lg:gap-14">
          {/* Einordnung */}
          <div className="max-w-lg">
            <div className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              {eyebrow}
            </div>
            <h2
              style={{ lineHeight: 1.05 }}
              className="mt-3 font-serif text-[clamp(28px,3.4vw,42px)] font-semibold tracking-tight text-dark"
            >
              {title}
            </h2>
            <p className="mt-4 font-sans text-[16px] leading-[1.65] text-mid">
              {lead}
            </p>

            {points && points.length > 0 && (
              <ul className="mt-6 space-y-2.5">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 font-ui text-[14px] text-mid"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-dark text-[9px] font-bold"
                    >
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Wizard */}
          <ToolFinderWizard />
        </div>
      </div>
    </section>
  );
}
