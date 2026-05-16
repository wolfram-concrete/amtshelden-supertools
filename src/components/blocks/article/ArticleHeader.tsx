import Image from "next/image";

import { formatDateDE } from "@/lib/utils";
import type { ArticleSummary } from "@/types/content";

interface ArticleHeaderProps {
  article: ArticleSummary;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <header className="container mx-auto px-6 lg:px-10 pt-12 lg:pt-20 pb-10">
      <div className="max-w-3xl space-y-7">
        <div className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
          {article.eyebrow}
        </div>

        <h1 className="font-serif text-[clamp(36px,5.5vw,68px)] font-bold leading-[0.92] tracking-[-0.015em] text-dark">
          {article.title}
        </h1>

        <p className="font-sans text-[19px] leading-[1.7] text-mid">
          {article.lead}
        </p>

        {/* Byline */}
        <div className="flex items-center gap-3 pt-3 border-t border-border">
          {article.author.avatar?.url && (
            <Image
              src={article.author.avatar.url}
              alt={article.author.avatar.alt}
              width={40}
              height={40}
              sizes="40px"
              className="h-10 w-10 rounded-full object-cover"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="font-ui text-[13px] font-semibold text-dark leading-tight">
              {article.author.name}
            </div>
            {article.author.role && (
              <div className="font-ui text-[11px] text-soft">
                {article.author.role}
              </div>
            )}
          </div>
          <div className="hidden sm:block text-right font-ui text-[11px] text-soft">
            <div>{formatDateDE(article.publishedAt)}</div>
            <div>{article.readingTime} Min. Lesezeit</div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      {article.cover?.url && (
        <figure className="mt-10 lg:mt-14 max-w-5xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-cream">
            <Image
              src={article.cover.url}
              alt={article.cover.alt}
              fill
              sizes="(min-width: 1280px) 1024px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </figure>
      )}
    </header>
  );
}
