interface AboutPrinciple {
  title: string;
  body: string;
}

interface AboutBlockProps {
  eyebrow: string;
  title: string;
  lead: string;
  principles: AboutPrinciple[];
}

export function AboutBlock({
  eyebrow,
  title,
  lead,
  principles,
}: AboutBlockProps) {
  return (
    <section className="bg-dark text-white">
      <div className="container mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
          {/* Linke Spalte */}
          <div className="space-y-5">
            <div className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              {eyebrow}
            </div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.1] tracking-tight">
              {title}
            </h2>
            <p className="font-sans text-[16px] leading-[1.7] text-white/70">
              {lead}
            </p>
          </div>

          {/* Rechte Spalte: Prinzipien */}
          <div className="grid gap-8 sm:grid-cols-2">
            {principles.map((p, idx) => (
              <div key={idx} className="space-y-2 border-t border-white/15 pt-5">
                <div className="font-ui text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-[20px] font-bold leading-tight">
                  {p.title}
                </h3>
                <p className="font-sans text-[14px] leading-[1.65] text-white/65">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
