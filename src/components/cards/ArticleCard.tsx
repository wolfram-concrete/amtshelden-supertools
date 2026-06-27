import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BrandIcon } from "@/components/icons/BrandIcon";
import { cn } from "@/lib/utils";
import { formatDateDE } from "@/lib/utils";
import { themenfeldRegistry } from "@/mocks/themenfelder";
import type { ArticleSummary } from "@/types/content";

interface ArticleCardProps {
  article: ArticleSummary;
  className?: string;
  /** "lead" = großes Hero-Card auf Startseite, "list" = magazine-grid */
  variant?: "lead" | "list" | "compact";
}

export function ArticleCard({
  article,
  className,
  variant = "list",
}: ArticleCardProps) {
  const isLead = variant === "lead";
  const isCompact = variant === "compact";
  // Topic-Icon des Themenfelds (gleiche Logik wie die Wissen-Sidebar)
  const topicIcon = article.themenfeldSlug
    ? themenfeldRegistry[article.themenfeldSlug]?.icon
    : undefined;

  return (
    <article
      className={cn(
        "group",
        isLead && "grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center",
        className,
      )}
    >
      <Link
        href={`/wissen/${article.slug}`}
        className={cn("block space-y-4", isLead && "lg:order-2")}
      >
        {article.cover?.url && !isCompact && (
          <div
            className={cn(
              "relative overflow-hidden rounded-xl bg-cream",
              isLead ? "aspect-[16/10]" : "aspect-[16/9]",
            )}
          >
            <Image
              src={article.cover.url}
              alt={article.cover.alt}
              fill
              sizes={
                isLead
                  ? "(min-width: 1024px) 50vw, 100vw"
                  : "(min-width: 768px) 33vw, 100vw"
              }
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        )}
      </Link>

      <div className={cn("space-y-3", isLead && "lg:order-1")}>
        <Link href={`/wissen/${article.slug}`} className="block space-y-3">
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            {topicIcon && (
              <BrandIcon name={topicIcon} size={14} className="text-brand" />
            )}
            {article.eyebrow}
          </div>

          <h3
            className={cn(
              "font-serif font-normal text-dark group-hover:text-brand-dark transition-colors",
              isLead
                ? "text-[clamp(28px,3.5vw,42px)] leading-[1.05]"
                : isCompact
                  ? "text-[18px] leading-[1.15]"
                  : "text-[22px] leading-[1.1]",
            )}
          >
            {article.title}
          </h3>

          {!isCompact && (
            <p
              className={cn(
                "font-sans leading-[1.65] text-mid",
                isLead ? "text-[17px]" : "text-[14px]",
              )}
            >
              {article.lead}
            </p>
          )}
        </Link>

        <div className="flex items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-3 min-w-0">
            {article.author.avatar?.url && (
              <Image
                src={article.author.avatar.url}
                alt={article.author.avatar.alt}
                width={28}
                height={28}
                sizes="28px"
                className="h-7 w-7 rounded-full object-cover flex-shrink-0"
              />
            )}
            <div className="font-ui text-[11px] text-soft min-w-0 truncate">
              <span className="text-dark font-semibold">
                {article.author.name}
              </span>
              <span aria-hidden className="mx-1.5">
                ·
              </span>
              <span>{formatDateDE(article.publishedAt)}</span>
              <span aria-hidden className="mx-1.5">
                ·
              </span>
              <span>{article.readingTime} Min.</span>
            </div>
          </div>

          {!isCompact && (
            <Link
              href={`/wissen/${article.slug}`}
              className="inline-flex flex-shrink-0 items-center gap-1.5 font-ui text-[13px] font-semibold text-brand-dark transition-colors hover:text-brand"
            >
              Weiterlesen
              <ArrowUpRight size={14} aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
