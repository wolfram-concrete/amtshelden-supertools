import Image from "next/image";
import Link from "next/link";

import { formatDateDE } from "@/lib/utils";
import type { ArticleSummary } from "@/types/content";

interface ThemenCluster {
  eyebrow: string;
  title: string;
  lead: string;
  articles: ArticleSummary[];
}

interface ThemenClusterBlockProps {
  sectionEyebrow: string;
  sectionTitle: string;
  clusters: ThemenCluster[];
}

/**
 * Themen-Schwerpunkte: 3 redaktionelle Cluster nebeneinander.
 * Jeder Cluster hat ein Cover-Bild, redaktionelle Einleitung
 * und 2-3 verlinkte Artikel — Magazin-Spread-Stil.
 */
export function ThemenClusterBlock({
  sectionEyebrow,
  sectionTitle,
  clusters,
}: ThemenClusterBlockProps) {
  return (
    <section className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
      <header className="border-t-2 border-dark pt-8 mb-12 lg:mb-16 max-w-3xl space-y-2">
        <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
          {sectionEyebrow}
        </div>
        <h2 className="font-serif text-[clamp(32px,3.8vw,48px)] font-normal leading-[1.0] tracking-tight text-dark">
          {sectionTitle}
        </h2>
      </header>

      <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3 relative">
        {clusters.map((cluster, idx) => (
          <article
            key={idx}
            className="space-y-5 md:relative md:[&:not(:first-child)]:before:hidden lg:[&:not(:first-child)]:before:absolute lg:[&:not(:first-child)]:before:top-0 lg:[&:not(:first-child)]:before:bottom-0 lg:[&:not(:first-child)]:before:-left-5 lg:[&:not(:first-child)]:before:w-px lg:[&:not(:first-child)]:before:bg-border"
          >
            {/* Cover */}
            {cluster.articles[0]?.cover?.url && (
              <Link
                href={`/wissen/${cluster.articles[0].slug}`}
                className="block"
              >
                <div className="relative aspect-[5/4] overflow-hidden rounded-sm bg-cream">
                  <Image
                    src={cluster.articles[0].cover.url}
                    alt={cluster.articles[0].cover.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
              </Link>
            )}

            {/* Eyebrow */}
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              {cluster.eyebrow}
            </div>

            {/* Cluster-Titel */}
            <h3 className="font-serif text-[26px] font-normal leading-[1.05] text-dark">
              {cluster.title}
            </h3>

            {/* Cluster-Lead */}
            <p className="font-sans text-[15px] leading-[1.65] text-mid">
              {cluster.lead}
            </p>

            {/* Artikel-Liste */}
            {cluster.articles.length > 0 && (
              <ul className="space-y-3 pt-2 border-t border-border">
                {cluster.articles.slice(0, 3).map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/wissen/${a.slug}`}
                      className="block group space-y-1 py-1"
                    >
                      <span className="block font-serif text-[16px] font-normal leading-[1.25] text-dark group-hover:text-brand-dark transition-colors">
                        {a.title}
                      </span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-soft">
                        {formatDateDE(a.publishedAt)} · {a.readingTime} Min.
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
