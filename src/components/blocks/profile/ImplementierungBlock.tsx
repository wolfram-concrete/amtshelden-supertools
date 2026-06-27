import { cn } from "@/lib/utils";
import type { ImplementierungData } from "@/types/profile";

import { SectionHead } from "./SectionHead";

interface ImplementierungBlockProps extends ImplementierungData {
  className?: string;
}

export function ImplementierungBlock({
  intro,
  tiles,
  solutionsHeading,
  solutions,
  className,
}: ImplementierungBlockProps) {
  return (
    <section className={cn("space-y-6", className)}>
      <SectionHead
        eyebrow="Was kommt auf uns zu?"
        title="Die Einführung — realistisch betrachtet"
      />

      <p className="font-sans text-[17px] leading-[1.75] text-mid">{intro}</p>

      {/* Tiles: Dauer / Aufwand / Kosten */}
      {tiles?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          {tiles.map((tile, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border bg-white p-5 space-y-1.5"
            >
              <div className="text-2xl">{tile.icon}</div>
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                {tile.label}
              </div>
              <div className="font-serif text-[28px] font-normal leading-tight text-dark">
                {tile.value}
              </div>
              <div className="font-ui text-[12px] leading-[1.5] text-soft">
                {tile.description}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Solutions / Herausforderungen */}
      {solutions?.length > 0 && (
        <div className="space-y-4">
          {solutionsHeading && (
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand pt-4">
              {solutionsHeading}
            </div>
          )}
          {solutions.map((sol, idx) => (
            <div
              key={idx}
              className="relative flex gap-0 rounded-xl border border-border bg-white overflow-hidden"
            >
              {/* Grün-Streifen links */}
              <div className="w-1 flex-shrink-0 bg-brand" aria-hidden />
              <div className="flex-1 p-5 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="font-serif text-[17px] font-normal leading-[1.35] text-dark">
                    {sol.challenge}
                  </div>
                  {sol.status && (
                    <span className="flex-shrink-0 inline-flex items-center font-mono text-[10px] font-bold uppercase tracking-[0.14em] px-2 py-0.5 rounded-full bg-brand-light text-brand-dark border border-brand/20">
                      ✓ {sol.status === "gelöst" ? "Gelöst" : sol.status}
                    </span>
                  )}
                </div>
                <p className="font-sans text-[14px] leading-[1.65] text-mid">
                  {sol.solution}
                </p>
                <p className="font-ui text-[11px] italic text-soft pt-1 border-t border-border/60">
                  {sol.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
