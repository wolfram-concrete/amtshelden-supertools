import Link from "next/link";

import { BrandIcon } from "@/components/icons/BrandIcon";
import { cn } from "@/lib/utils";
import { behoerdenFaqs } from "@/mocks/faq";
import { categories } from "@/mocks/categories";
import { toolCards } from "@/mocks/tools";

/**
 * Aggregierte Sticky-Sidebar für die Startseite.
 * Mehrere Widgets in einer Komponente — die Reihenfolge ist redaktionell
 * sortiert: Kategorie-Nav zuerst (Booking-Style Sofort-Zugriff),
 * dann Trust-Stats, dann FAQ-Quicklinks, neue Tools, kompakter Newsletter.
 */
export function HomeSidebar() {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      <SidebarCategoryNav />
      <SidebarFaqLinks />
      <SidebarNewArrivals />
      <SidebarNewsletterCompact />
    </aside>
  );
}

// ============================================================
// Sidebar Widget: Kategorie-Quick-Nav
// ============================================================
function SidebarCategoryNav() {
  return (
    <Widget label="Alle Kategorien">
      <ul className="space-y-px">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/kategorien/${c.slug}`}
              className="group flex items-center gap-2.5 rounded-md px-3 py-2.5 transition-colors hover:bg-cream"
            >
              <span
                aria-hidden
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-brand-light text-brand-dark"
              >
                {c.icon && <BrandIcon name={c.icon} size={15} />}
              </span>
              <span className="flex-1 font-ui text-[12.5px] font-medium text-dark group-hover:text-brand-dark transition-colors">
                {c.name}
              </span>
              <span className="font-ui text-[10px] font-semibold text-soft">
                {c.toolCount}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/kategorien"
        className="mt-3 inline-flex items-center gap-1 font-ui text-[11px] font-semibold text-brand hover:underline"
      >
        Alle Kategorien ansehen →
      </Link>
    </Widget>
  );
}

// ============================================================
// Sidebar Widget: FAQ Quicklinks
// ============================================================
function SidebarFaqLinks() {
  const topFaqs = behoerdenFaqs.slice(0, 5);
  return (
    <Widget label="Häufig gefragt">
      <ul className="space-y-2.5">
        {topFaqs.map((faq, idx) => (
          <li key={idx}>
            <a
              href="#faq"
              className="block group"
            >
              <span className="font-ui text-[12px] font-medium leading-[1.4] text-dark group-hover:text-brand-dark transition-colors">
                {faq.question}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#faq"
        className="mt-4 inline-flex items-center gap-1 font-ui text-[11px] font-semibold text-brand hover:underline"
      >
        Alle Fragen lesen →
      </a>
    </Widget>
  );
}

// ============================================================
// Sidebar Widget: Neue / Top Tools
// ============================================================
function SidebarNewArrivals() {
  const items = toolCards.slice(0, 4);
  return (
    <Widget label="Neu im Verzeichnis">
      <ul className="space-y-3">
        {items.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={`/tools/${tool.slug}`}
              className="group flex items-start gap-3"
            >
              <span
                aria-hidden
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md text-white font-ui text-[11px] font-extrabold"
                style={{ background: tool.markBg || "var(--color-brand)" }}
              >
                {tool.mark}
              </span>
              <div className="min-w-0">
                <div className="font-ui text-[12px] font-semibold text-dark leading-tight group-hover:text-brand-dark transition-colors">
                  {tool.name}
                </div>
                <div className="font-ui text-[10px] text-soft truncate">
                  {tool.categoryLabel}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Widget>
  );
}

// ============================================================
// Sidebar Widget: Compact Newsletter
// ============================================================
function SidebarNewsletterCompact() {
  return (
    <div className="rounded-xl bg-brand-dark text-white p-5 space-y-3">
      <div className="font-ui text-[10px] font-bold uppercase tracking-[0.18em] text-white/85">
        Newsletter
      </div>
      <h3 className="font-serif text-[18px] font-bold leading-[1.2]">
        1× pro Woche das Wichtigste.
      </h3>
      <p className="font-sans text-[12px] leading-[1.55] text-white/70">
        Kuratiert für Behörden. Kein Spam.
      </p>
      <Link
        href="#newsletter"
        className="block w-full text-center rounded-full bg-white py-2.5 font-ui text-[12px] font-semibold text-brand-dark transition-colors hover:bg-cream"
      >
        Anmelden
      </Link>
    </div>
  );
}

// ============================================================
// Shared: Widget-Wrapper
// ============================================================
function Widget({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-white p-5",
        className,
      )}
    >
      <div className="font-ui text-[10px] font-bold uppercase tracking-[0.18em] text-soft mb-3 pb-2 border-b border-border">
        {label}
      </div>
      {children}
    </div>
  );
}
