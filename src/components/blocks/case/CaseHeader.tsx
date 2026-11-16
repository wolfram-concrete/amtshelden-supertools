import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import { ToolLogo } from "@/components/ui/ToolLogo";
import type { CaseStudy } from "@/types/content";

interface CaseHeaderProps {
  item: CaseStudy;
}

/**
 * Kopf einer Referenz-Seite („Echte Anwendung"). Trägt die Software, was sie
 * leistet, das Motiv und die Kennwerte — aus Software-Sicht.
 */
export function CaseHeader({ item }: CaseHeaderProps) {
  return (
    <header className="container mx-auto px-6 pt-12 pb-10 lg:px-10 lg:pt-16">
      <div className="max-w-3xl">
        {/* Software */}
        <div className="flex items-center gap-2.5">
          <ToolLogo name={item.tool.name} slug={item.tool.slug} size={34} />
          <div>
            {item.tool.slug ? (
              <Link
                href={`/tools/${item.tool.slug}`}
                className="group inline-flex items-center gap-1 font-ui text-[15px] font-semibold text-brand-dark transition-colors hover:text-brand"
              >
                {item.tool.name}
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            ) : (
              <div className="font-ui text-[15px] font-semibold text-dark">
                {item.tool.name}
                <span className="ml-1.5 font-normal text-soft">
                  (Profil in Vorbereitung)
                </span>
              </div>
            )}
            <div className="font-ui text-[12.5px] text-soft">
              {item.tool.categoryLabel}
            </div>
          </div>
        </div>

        <h1
          style={{ lineHeight: 1.06 }}
          className="mt-5 font-display text-[clamp(30px,4.4vw,52px)] text-dark"
        >
          {item.title}
        </h1>

        <p className="mt-5 max-w-2xl font-sans text-[18px] leading-[1.6] text-mid lg:text-[19px]">
          {item.lead}
        </p>

        {item.nutzen && item.nutzen.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {item.nutzen.map((n) => (
              <li
                key={n}
                className="tag px-3 py-1.5 font-ui text-[13.5px] font-medium text-dark"
              >
                <Check size={15} className="flex-shrink-0 text-brand" aria-hidden />
                {n}
              </li>
            ))}
          </ul>
        )}
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

      {/* Kennwerte — griffige Fakten-Panels */}
      <div className="mt-8 max-w-5xl">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {item.facts.map((fact) => (
            <div key={fact.label} className="panel rounded-xl px-4 py-3">
              <dt className="font-ui text-[11.5px] font-medium text-soft">
                {fact.label}
              </dt>
              <dd className="mt-1 font-sans text-[15px] font-semibold leading-[1.3] text-dark">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
