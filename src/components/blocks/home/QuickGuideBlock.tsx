import type { MethodStep } from "@/mocks/stats";

interface QuickGuideBlockProps {
  eyebrow: string;
  title: string;
  lead: string;
  steps: MethodStep[];
}

/**
 * Methodik „So prüfen wir Software" — kompaktes Bento.
 * Vier faktische Schritt-Karten (große grüne Nummer), schnell scanbar.
 */
export function QuickGuideBlock({
  eyebrow,
  title,
  lead,
  steps,
}: QuickGuideBlockProps) {
  return (
    <section className="space-y-8">
      <header className="max-w-2xl space-y-3">
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
          {eyebrow}
        </div>
        <h2 className="font-serif text-[clamp(28px,3.4vw,42px)] font-normal leading-[1.08] tracking-tight text-dark">
          {title}
        </h2>
        <p className="font-sans text-[15px] leading-[1.65] text-mid">{lead}</p>
      </header>

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li
            key={step.number}
            className="flex flex-col rounded-2xl bg-white p-6"
          >
            <span className="font-serif text-[36px] font-normal leading-none text-brand">
              {step.number}
            </span>
            <h3 className="mt-4 font-serif text-[18px] font-normal leading-[1.2] text-dark">
              {step.title}
            </h3>
            <p className="mt-2 font-sans text-[13.5px] leading-[1.6] text-mid">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
