import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatDateDE } from "@/lib/utils";
import type { ArticleSummary } from "@/types/content";

interface EditorialFeatureStoryProps {
  article: ArticleSummary;
  /** Optional: starker Akzent-Hintergrund (z. B. cream oder green) */
  background?: "white" | "cream" | "brand";
}

/**
 * Wapo-Stil großes Editorial-Feature: Cover-Bild asymmetrisch,
 * großer Headline (Cormorant), Drop-Cap im Lead, Byline.
 * Setzt einen klaren Magazin-Anker auf der Startseite.
 */
export function EditorialFeatureStory({
  article,
  background = "white",
}: EditorialFeatureStoryProps) {
  const bgClasses = {
    white: "bg-white",
    cream: "bg-cream/40",
    brand: "bg-brand text-white",
  } as const;

  const isOnBrand = background === "brand";

  return (
    <section className={cn(bgClasses[background])}>
      <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Cover-Bild: linke Spalte, asymmetrisch oben */}
          {article.cover?.url && (
            <figure className="lg:col-span-6 lg:col-start-1 lg:sticky lg:top-24">
              <Link href={`/wissen/${article.slug}`}>
                <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-cream">
                  <Image
                    src={article.cover.url}
                    alt={article.cover.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                  />
                </div>
              </Link>
              {article.cover.alt && (
                <figcaption
                  className={cn(
                    "mt-3 font-ui text-[11px] italic",
                    isOnBrand ? "text-white/70" : "text-soft",
                  )}
                >
                  {article.cover.alt}
                </figcaption>
              )}
            </figure>
          )}

          {/* Text: rechte Spalte */}
          <div className="lg:col-span-6 space-y-6 lg:pt-4">
            <div
              className={cn(
                "font-ui text-[11px] font-bold uppercase tracking-[0.18em]",
                isOnBrand ? "text-white/85" : "text-brand",
              )}
            >
              {article.eyebrow}
            </div>

            <h2
              className={cn(
                "font-serif font-bold leading-[0.98] tracking-tight",
                "text-[clamp(36px,4.5vw,60px)]",
                isOnBrand ? "text-white" : "text-dark",
              )}
            >
              <Link
                href={`/wissen/${article.slug}`}
                className={cn(
                  "transition-colors",
                  isOnBrand
                    ? "hover:text-cream"
                    : "hover:text-brand-dark",
                )}
              >
                {article.title}
              </Link>
            </h2>

            <p
              className={cn(
                "font-sans text-[18px] leading-[1.7]",
                isOnBrand ? "text-white/90" : "text-mid",
                // Drop-Cap im ersten Buchstaben für Editorial-Feel
                "first-letter:font-serif first-letter:italic first-letter:font-bold first-letter:text-[64px] first-letter:leading-[0.85] first-letter:mr-1 first-letter:float-left first-letter:pt-1",
                isOnBrand
                  ? "first-letter:text-white"
                  : "first-letter:text-brand-dark",
              )}
            >
              {article.lead}
            </p>

            {/* Byline + Read-More */}
            <div
              className={cn(
                "flex items-center justify-between gap-4 pt-5 border-t",
                isOnBrand ? "border-white/30" : "border-border",
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                {article.author.avatar?.url && (
                  <Image
                    src={article.author.avatar.url}
                    alt={article.author.avatar.alt}
                    width={36}
                    height={36}
                    sizes="36px"
                    className="h-9 w-9 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div
                  className={cn(
                    "font-ui text-[12px] leading-tight min-w-0",
                    isOnBrand ? "text-white/85" : "text-soft",
                  )}
                >
                  <div
                    className={cn(
                      "font-semibold truncate",
                      isOnBrand ? "text-white" : "text-dark",
                    )}
                  >
                    {article.author.name}
                  </div>
                  <div>
                    {formatDateDE(article.publishedAt)} ·{" "}
                    {article.readingTime} Min.
                  </div>
                </div>
              </div>

              <Link
                href={`/wissen/${article.slug}`}
                className={cn(
                  "inline-flex items-center gap-1.5 font-serif italic text-[16px] font-medium flex-shrink-0 transition-colors",
                  isOnBrand
                    ? "text-white hover:text-cream"
                    : "text-brand-dark hover:text-brand",
                )}
              >
                Beitrag lesen
                <ArrowUpRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
