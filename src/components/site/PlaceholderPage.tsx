import Link from "next/link";

import { Breadcrumb } from "@/components/site/Breadcrumb";

interface PlaceholderPageProps {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumb: { label: string; href?: string }[];
}

/**
 * Generischer "Coming Soon"-Platzhalter mit Editorial-Stil.
 * Wird für Seiten verwendet, die in der Nav verlinkt sind aber noch
 * keinen finalen Inhalt haben (Über, Kontakt, Impressum, Datenschutz, Anbieter).
 */
export function PlaceholderPage({
  eyebrow,
  title,
  description,
  breadcrumb,
}: PlaceholderPageProps) {
  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <div className="container mx-auto px-6 lg:px-10 py-20 lg:py-32">
        <div className="max-w-2xl space-y-7">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            {eyebrow}
          </div>
          <h1 className="font-serif text-[clamp(36px,5vw,64px)] font-normal leading-[1.05] tracking-tight text-dark">
            {title}
          </h1>
          <p className="font-sans text-[18px] leading-[1.7] text-mid">
            {description}
          </p>
          <div className="pt-4 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-brand px-6 py-3 font-ui text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Zur Startseite
            </Link>
            <Link
              href="/kategorien"
              className="inline-flex items-center rounded-full border border-border px-6 py-3 font-ui text-[14px] font-medium text-mid transition-colors hover:bg-cream hover:text-dark"
            >
              Kategorien entdecken
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
