import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";

import { ToolLogo } from "@/components/ui/ToolLogo";
import type { CaseStudy } from "@/types/content";

interface CaseHeaderProps {
  item: CaseStudy;
}

/**
 * Kopf einer Case-Seite („Echte Anwendung"). Trägt Kommune, schildernde Person,
 * geprüftes Tool, die Kennwerte und das Leitzitat. Der Exemplarisch-Hinweis
 * steht sichtbar oben, nicht im Kleingedruckten.
 */
export function CaseHeader({ item }: CaseHeaderProps) {
  return (
    <header className="container mx-auto px-6 pt-12 pb-10 lg:px-10 lg:pt-16">
      <div className="max-w-3xl">
        {/* Exemplarisch-Hinweis, sichtbar */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-accent/50 bg-accent/15 px-3 py-1.5 font-ui text-[12px] font-medium text-accent-ink">
          <Info size={14} aria-hidden />
          Beispiel-Case. Stadt real, Abläufe und Zitate exemplarisch, nicht freigegeben.
        </div>

        <div className="font-sans font-semibold text-brand">{item.eyebrow}</div>

        <h1
          style={{ lineHeight: 1.06 }}
          className="mt-3 font-display text-[clamp(30px,4.4vw,52px)] text-dark"
        >
          {item.title}
        </h1>

        <p className="mt-5 max-w-2xl font-sans text-[18px] leading-[1.6] text-mid lg:text-[19px]">
          {item.lead}
        </p>

        {/* Kommune + Person + Tool */}
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-5">
          <div>
            <div className="font-ui text-[11px] uppercase tracking-wide text-soft">
              Verwaltung
            </div>
            <div className="flex items-center gap-2">
              {item.wappen && (
                <Image
                  src={item.wappen}
                  alt={`Wappen ${item.kommune}`}
                  width={22}
                  height={22}
                  className="h-[22px] w-[22px] object-contain"
                />
              )}
              <span className="font-ui text-[14px] font-semibold text-dark">
                {item.kommune}
              </span>
            </div>
            <div className="mt-0.5 font-ui text-[12px] text-soft">
              {item.kommuneTyp}
            </div>
          </div>

          <div className="h-10 w-px bg-border" aria-hidden />

          <div>
            <div className="font-ui text-[11px] uppercase tracking-wide text-soft">
              Schildert
            </div>
            <div className="font-ui text-[14px] font-semibold text-dark">
              {item.person.name}
            </div>
            <div className="font-ui text-[12px] text-soft">
              {item.person.role}
            </div>
          </div>

          <div className="h-10 w-px bg-border" aria-hidden />

          <div>
            <div className="font-ui text-[11px] uppercase tracking-wide text-soft">
              Geprüftes Tool
            </div>
            <div className="mt-1 flex items-center gap-2.5">
              <ToolLogo name={item.tool.name} slug={item.tool.slug} size={34} />
              <div>
                {item.tool.slug ? (
                  <Link
                    href={`/tools/${item.tool.slug}`}
                    className="group inline-flex items-center gap-1 font-ui text-[14px] font-semibold text-brand-dark transition-colors hover:text-brand"
                  >
                    {item.tool.name}
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                ) : (
                  <div className="font-ui text-[14px] font-semibold text-dark">
                    {item.tool.name}
                    <span className="ml-1.5 font-normal text-soft">
                      (Profil in Vorbereitung)
                    </span>
                  </div>
                )}
                <div className="font-ui text-[12px] text-soft">
                  {item.tool.categoryLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cover */}
      {item.cover?.url && (
        <figure className="mt-10 max-w-5xl lg:mt-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-cream">
            <Image
              src={item.cover.url}
              alt={item.cover.alt}
              fill
              sizes="(min-width: 1280px) 1024px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </figure>
      )}

      {/* Kennwerte */}
      <div className="mt-8 max-w-5xl">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
          {item.facts.map((fact) => (
            <div key={fact.label} className="bg-white px-4 py-4">
              <dt className="font-ui text-[11px] uppercase tracking-wide text-soft">
                {fact.label}
              </dt>
              <dd className="mt-1 font-sans text-[15px] font-semibold leading-[1.3] text-dark">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Leitzitat */}
      <blockquote className="mt-10 max-w-3xl border-l-2 border-brand pl-6">
        <p className="font-sans text-[22px] font-normal italic leading-[1.4] text-dark lg:text-[26px]">
          „{item.quote.text}"
        </p>
        <footer className="mt-3 font-ui text-[12.5px] text-soft">
          {item.quote.source}
        </footer>
      </blockquote>
    </header>
  );
}
