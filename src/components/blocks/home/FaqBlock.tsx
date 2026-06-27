import Link from "next/link";

import type { FaqItem } from "@/mocks/faq";

interface FaqBlockProps {
  eyebrow: string;
  title: string;
  items: FaqItem[];
}

/**
 * FAQ-Block mit nativen <details>-Elementen (kein State, kein JS nötig).
 * Editorial-Stil: schlichte Trennlinien, kein Akkordeon-Klischee.
 */
export function FaqBlock({ eyebrow, title, items }: FaqBlockProps) {
  return (
    <section id="faq" className="space-y-8 scroll-mt-24">
      <header className="border-t-2 border-dark pt-8 space-y-3 max-w-2xl">
        <div className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
          {eyebrow}
        </div>
        <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] font-semibold leading-[1.02] tracking-tight text-dark">
          {title}
        </h2>
      </header>

      <div className="divide-y divide-border border-y border-border">
        {items.map((item, idx) => (
          <details key={idx} className="group py-6">
            <summary className="flex cursor-pointer items-baseline gap-5 list-none [&::-webkit-details-marker]:hidden">
              <span
                aria-hidden
                className="font-serif italic text-soft text-[16px] flex-shrink-0 group-hover:text-brand-dark transition-colors min-w-[32px]"
              >
                {String(idx + 1).padStart(2, "0")}.
              </span>
              <h3 className="font-serif text-[20px] font-semibold leading-[1.25] text-dark group-hover:text-brand-dark transition-colors flex-1">
                {item.question}
              </h3>
              <span
                aria-hidden
                className="font-ui text-[10px] font-bold uppercase tracking-[0.18em] text-soft group-open:text-brand transition-colors hidden sm:block"
              >
                <span className="group-open:hidden">Lesen</span>
                <span className="hidden group-open:inline">Geschlossen</span>
              </span>
            </summary>
            <div className="mt-4 ml-12 pr-6 space-y-3">
              <p className="font-sans text-[15px] leading-[1.7] text-mid">
                {item.answer}
              </p>
              {item.readMoreSlug && (
                <Link
                  href={`/wissen/${item.readMoreSlug}`}
                  className="inline-flex items-center gap-1 font-serif italic text-[14px] font-medium text-brand-dark hover:underline"
                >
                  Vertieft im Wissensbereich →
                </Link>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
