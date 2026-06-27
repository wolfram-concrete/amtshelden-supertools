import type { MethodStep } from "@/mocks/stats";

interface QuickGuideBlockProps {
  eyebrow: string;
  title: string;
  lead: string;
  steps: MethodStep[];
}

/**
 * Editorial-Newspaper-Stil: 4 Spalten, vertikale Trennlinien.
 * Keine Cards mit Borders — typografische Hierarchie macht die Struktur.
 */
export function QuickGuideBlock({
  eyebrow,
  title,
  lead,
  steps,
}: QuickGuideBlockProps) {
  return (
    <section className="space-y-10">
      <header className="border-t-2 border-dark pt-8 grid lg:grid-cols-[1fr_1.6fr] gap-8 lg:gap-12 items-end">
        <div className="space-y-2">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            {eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(32px,3.8vw,48px)] font-normal leading-[1.08] tracking-tight text-dark">
            {title}
          </h2>
        </div>
        <p className="font-sans text-[16px] leading-[1.7] text-mid lg:max-w-md lg:justify-self-end lg:text-right">
          {lead}
        </p>
      </header>

      <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10 relative">
        {steps.map((step, idx) => (
          <li
            key={step.number}
            className="space-y-3 lg:relative lg:pl-6 lg:[&:not(:first-child)]:before:absolute lg:[&:not(:first-child)]:before:left-0 lg:[&:not(:first-child)]:before:top-0 lg:[&:not(:first-child)]:before:bottom-0 lg:[&:not(:first-child)]:before:w-px lg:[&:not(:first-child)]:before:bg-border"
          >
            <div className="font-serif italic text-[14px] text-soft">
              Schritt {step.number}
            </div>
            <h3 className="font-serif text-[22px] font-normal leading-[1.1] text-dark">
              {step.title}
            </h3>
            <p className="font-sans text-[14.5px] leading-[1.7] text-mid">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
