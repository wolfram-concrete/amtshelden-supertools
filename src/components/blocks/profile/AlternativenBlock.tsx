import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AlternativenData } from "@/types/profile";

import { SectionHead } from "./SectionHead";

interface AlternativenBlockProps extends AlternativenData {
  className?: string;
}

export function AlternativenBlock({
  intro,
  alternatives,
  className,
}: AlternativenBlockProps) {
  return (
    <section id="alternativen" className={cn("space-y-5", className)}>
      <SectionHead
        eyebrow="Ehrlicher Vergleich"
        title="Wenn das nicht das Richtige ist"
      />

      <p className="font-sans text-[17px] leading-[1.75] text-mid">{intro}</p>

      <div className="space-y-3">
        {alternatives?.map((alt, idx) => (
          <Link
            key={`${alt.name}-${idx}`}
            href={alt.href}
            className="group flex items-center gap-4 rounded-xl border border-border bg-white p-4 transition-colors hover:border-brand"
          >
            <div
              aria-hidden
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-white font-ui text-[14px] font-extrabold"
              style={{ background: alt.markBg || "var(--color-brand)" }}
            >
              {alt.mark}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-serif text-[18px] font-normal leading-tight text-dark">
                {alt.name}
              </div>
              <p className="font-ui text-[12px] leading-[1.55] text-soft mt-1">
                {alt.why}
              </p>
            </div>
            <ChevronRight
              size={20}
              className="flex-shrink-0 text-soft transition-transform group-hover:translate-x-1 group-hover:text-brand"
              aria-hidden
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
