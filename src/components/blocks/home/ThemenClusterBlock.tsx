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
    <section className="px-6 sm:px-8 lg:px-14 pt-8 pb-12 lg:pb-16">
      {/* Schwarze Linie über die volle Gridbreite */}
      <div className="border-t border-border pt-7">
        <header className="mb-10 lg:mb-12 max-w-3xl space-y-2">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            {sectionEyebrow}
          </div>
          <h2 className="font-serif text-[clamp(30px,3.6vw,46px)] font-normal leading-[1.0] tracking-tight text-dark">
            {sectionTitle}
          </h2>
        </header>

        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {clusters.map((cluster, idx) => (
            <article key={idx} className="space-y-4">
              {/* Cover — kleiner, abgerundet, Eyebrow über dem Bild */}
              {cluster.articles[0]?.cover?.url && (
                <Link
                  href={`/wissen/${cluster.articles[0].slug}`}
                  className="group relative block aspect-[16/10] overflow-hidden rounded-xl bg-cream"
                >
                  <Image
                    src={cluster.articles[0].cover.url}
                    alt={cluster.articles[0].cover.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
                  />
                  <span className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-black/35 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
                    {cluster.eyebrow}
                  </span>
                </Link>
              )}

              {/* Cluster-Titel */}
              <h3 className="font-serif text-[24px] font-normal leading-[1.08] text-dark">
                {cluster.title}
              </h3>

              {/* Cluster-Lead */}
              <p className="font-sans text-[14.5px] leading-[1.6] text-mid">
                {cluster.lead}
              </p>

              {/* Artikel — modulare Karten */}
              {cluster.articles.length > 0 && (
                <ul className="space-y-2 pt-1">
                  {cluster.articles.slice(0, 3).map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/wissen/${a.slug}`}
                        className="group block rounded-xl bg-white px-4 py-3 transition-shadow hover:shadow-[0_12px_30px_-18px_rgba(17,17,17,0.25)]"
                      >
                        <span className="block font-serif text-[15px] font-normal leading-[1.25] text-dark group-hover:text-brand-dark transition-colors">
                          {a.title}
                        </span>
                        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-soft">
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
      </div>
    </section>
  );
}
