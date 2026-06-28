/**
 * Footer — ruhig, redaktionell, mit allen wichtigen Säulen-Links.
 */

import Link from "next/link";

import { Logo } from "@/components/site/Logo";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const columns: FooterColumn[] = [
  {
    title: "Entdecken",
    links: [
      { label: "Themenfelder", href: "/themenfelder" },
      { label: "Alle Kategorien", href: "/kategorien" },
      { label: "Wissen & Magazin", href: "/wissen" },
      { label: "Tool vorschlagen", href: "/vorschlagen" },
    ],
  },
  {
    title: "Für Anbieter",
    links: [
      { label: "Anbieter werden", href: "/anbieter" },
      { label: "Unternehmen eintragen", href: "/vorschlagen" },
    ],
  },
  {
    title: "Amtshelden",
    links: [
      { label: "Über uns", href: "/ueber" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 rounded-t-[2.5rem] bg-brand-dark text-white">
      <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          {/* Brand-Spalte */}
          <div>
            <Logo variant="inverse" height={36} />
            <p className="mt-5 font-sans text-sm leading-relaxed text-white/70 max-w-xs">
              Das Gedächtnis der digitalen Verwaltung Deutschlands.
              Handverlesen. Aus Behördenperspektive.
            </p>
          </div>

          {/* Link-Spalten */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-ui text-[13px] text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
