import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BrandIcon } from "@/components/icons/BrandIcon";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { categoriesByThemenfeld } from "@/mocks/categories";
import { themenfelder } from "@/mocks/themenfelder";

export const metadata: Metadata = {
  title: "Themenfelder — Supertools",
  description:
    "Die vier Themenfelder von Supertools: Kommunikation & Krise, Smartes Personalmanagement, Transformation & KI, Moderne Führung.",
};

export default function ThemenfelderIndexPage() {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Supertools", href: "/" }, { label: "Themenfelder" }]}
      />

      <div className="container mx-auto px-6 lg:px-10 py-12 lg:py-20">
        <header className="max-w-3xl space-y-5 mb-14 lg:mb-20">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            Struktur
          </div>
          <h1 className="font-serif text-[clamp(36px,5vw,64px)] font-normal leading-[1.0] tracking-tight text-dark">
            Vier Themenfelder.
          </h1>
          <p className="font-sans text-[18px] leading-[1.7] text-mid">
            Supertools ist kein beliebiges Software-Verzeichnis. Wir kuratieren
            entlang von vier Themenfeldern, die aus der Arbeit von Amtshelden
            stammen — und für Behörden tatsächlich relevant sind.
          </p>
        </header>

        <div className="space-y-5">
          {themenfelder.map((tf) => {
            const cats = categoriesByThemenfeld[tf.slug] || [];
            return (
              <article
                key={tf.slug}
                className="group grid lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-12 rounded-2xl border border-border bg-white p-6 lg:p-8 transition-colors hover:border-brand/60"
              >
                <div>
                  <Link
                    href={`/themenfelder/${tf.slug}`}
                    className="flex items-start gap-4"
                  >
                    <span
                      aria-hidden
                      className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand-dark"
                    >
                      {tf.icon && <BrandIcon name={tf.icon} size={26} />}
                    </span>
                    <div>
                      <h2 className="font-serif text-[26px] font-normal leading-tight text-dark group-hover:text-brand-dark transition-colors">
                        {tf.name}
                      </h2>
                      <p className="mt-1.5 font-sans text-[14.5px] leading-[1.6] text-mid">
                        {tf.tagline}
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="lg:border-l lg:border-border lg:pl-12 flex flex-col justify-center">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-soft mb-3">
                    Kategorien
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cats.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/kategorien/${c.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-cream border border-border px-3.5 py-2 font-ui text-[13px] font-medium text-mid transition-colors hover:border-brand hover:text-brand-dark"
                      >
                        {c.icon && (
                          <BrandIcon
                            name={c.icon}
                            size={15}
                            className="text-brand-dark"
                          />
                        )}
                        {c.name}
                        {c.toolCount !== undefined && (
                          <span className="text-soft">· {c.toolCount}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/themenfelder/${tf.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 font-ui text-[12px] font-semibold text-brand hover:underline"
                  >
                    Themenfeld ansehen
                    <ArrowUpRight size={14} aria-hidden />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
