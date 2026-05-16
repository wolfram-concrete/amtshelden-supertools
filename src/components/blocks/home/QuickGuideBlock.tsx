import type { MethodStep } from "@/mocks/stats";

interface QuickGuideBlockProps {
  eyebrow: string;
  title: string;
  lead: string;
  steps: MethodStep[];
}

/**
 * 4-Schritte-Methodik als Editorial-Grid.
 * Vermittelt: hier wird nicht oberflächlich gelistet, hier wird geprüft.
 */
export function QuickGuideBlock({
  eyebrow,
  title,
  lead,
  steps,
}: QuickGuideBlockProps) {
  return (
    <section className="space-y-8">
      <header className="border-t-2 border-dark pt-8 space-y-3 max-w-2xl">
        <div className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
          {eyebrow}
        </div>
        <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.1] tracking-tight text-dark">
          {title}
        </h2>
        <p className="font-sans text-[16px] leading-[1.65] text-mid">{lead}</p>
      </header>

      <ol className="grid gap-px sm:grid-cols-2 bg-border rounded-xl overflow-hidden border border-border">
        {steps.map((step) => (
          <li key={step.number} className="bg-white p-6 space-y-2">
            <div className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              Schritt {step.number}
            </div>
            <h3 className="font-serif text-[20px] font-bold leading-tight text-dark">
              {step.title}
            </h3>
            <p className="font-sans text-[14px] leading-[1.65] text-mid">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
