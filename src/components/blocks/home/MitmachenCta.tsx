import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Zwei-Zielgruppen-CTA auf der Startseite (Strategie-Meeting 12.06.2026):
 * Behörden empfehlen Tools · Anbieter tragen sich ein.
 */
export function MitmachenCta() {
  return (
    <section className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
      <div className="grid md:grid-cols-2 gap-5">
        {/* Behörden */}
        <Link
          href="/vorschlagen"
          className="group rounded-2xl border border-border bg-white p-7 lg:p-9 transition-colors hover:border-brand/60"
        >
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            Für Behörden
          </div>
          <h3 className="mt-3 font-serif text-[26px] font-normal leading-tight text-dark group-hover:text-brand-dark transition-colors">
            Ein Tool fehlt?
          </h3>
          <p className="mt-2 font-sans text-[15px] leading-[1.6] text-mid">
            Empfehlen Sie Software, die Sie nutzen — oder sagen Sie uns, welche
            Lösung Sie für Ihr Problem vermissen.
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 font-ui text-[13px] font-semibold text-brand">
            Tool vorschlagen
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </Link>

        {/* Anbieter */}
        <Link
          href="/anbieter"
          className="group rounded-2xl border border-border bg-dark text-white p-7 lg:p-9 transition-colors hover:bg-brand-dark"
        >
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
            Für Anbieter
          </div>
          <h3 className="mt-3 font-serif text-[26px] font-normal leading-tight">
            Erreichen Sie Ihre Behörden.
          </h3>
          <p className="mt-2 font-sans text-[15px] leading-[1.6] text-white/80">
            Bringen Sie Ihr Tool ins Verzeichnis und erreichen Sie genau die
            Behörden, für die Ihr Produkt relevant ist.
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 font-ui text-[13px] font-semibold text-white">
            Für Anbieter
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </Link>
      </div>
    </section>
  );
}
