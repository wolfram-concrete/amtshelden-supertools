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
        <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.1] tracking-tight text-dark">
          {title}
        </h2>
      </header>

      <div className="divide-y divide-border border-y border-border">
        {items.map((item, idx) => (
          <details key={idx} className="group py-5">
            <summary className="flex cursor-pointer items-start justify-between gap-6 list-none [&::-webkit-details-marker]:hidden">
              <h3 className="font-serif text-[19px] font-bold leading-[1.3] text-dark group-hover:text-brand-dark transition-colors">
                {item.question}
              </h3>
              <span
                aria-hidden
                className="flex-shrink-0 mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-border text-mid transition-all group-open:bg-brand group-open:text-white group-open:border-brand group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="mt-4 pr-12 space-y-3">
              <p className="font-sans text-[15px] leading-[1.7] text-mid">
                {item.answer}
              </p>
              {item.readMoreSlug && (
                <Link
                  href={`/wissen/${item.readMoreSlug}`}
                  className="inline-flex items-center gap-1 font-ui text-[12px] font-semibold text-brand hover:underline"
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
