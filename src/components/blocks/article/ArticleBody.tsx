import Image from "next/image";

import { cn } from "@/lib/utils";
import type { ArticleBlock } from "@/types/content";

interface ArticleBodyProps {
  blocks: ArticleBlock[];
}

/**
 * Long-Form Article-Body — rendert die ArticleBlock-Liste in
 * editorialem Layout.
 */
export function ArticleBody({ blocks }: ArticleBodyProps) {
  if (!blocks?.length) return null;

  return (
    <div className="container mx-auto px-6 lg:px-10 pb-16 lg:pb-24">
      <article className="mx-auto max-w-2xl space-y-6">
        {blocks.map((block, idx) => (
          <BlockRenderer key={idx} block={block} />
        ))}
      </article>
    </div>
  );
}

function BlockRenderer({ block }: { block: ArticleBlock }) {
  switch (block.kind) {
    case "heading":
      return (
        <h2 className="font-serif text-[clamp(24px,3vw,32px)] font-normal leading-[1.2] tracking-tight text-dark mt-12 first:mt-0 pt-4 border-t border-border">
          {block.text}
        </h2>
      );

    case "subheading":
      return (
        <h3 className="font-serif text-[22px] font-normal leading-[1.25] tracking-tight text-dark mt-8">
          {block.text}
        </h3>
      );

    case "paragraph":
      return (
        <p className="font-sans text-[17px] leading-[1.8] text-mid">
          {block.text}
        </p>
      );

    case "quote":
      return (
        <blockquote className="border-l-2 border-brand pl-6 py-2 my-6">
          <p className="font-serif text-[22px] italic font-normal leading-[1.45] text-dark">
            „{block.text}"
          </p>
          {block.source && (
            <footer className="mt-3 font-ui text-[12px] text-soft">
              {block.source}
            </footer>
          )}
        </blockquote>
      );

    case "list":
      return (
        <ul className="space-y-2.5 my-4">
          {block.items?.map((item, idx) => (
            <li
              key={idx}
              className="flex gap-3 font-sans text-[16px] leading-[1.7] text-mid"
            >
              <span
                aria-hidden
                className="flex-shrink-0 mt-3 h-1 w-3 bg-brand rounded-full"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "image":
      if (!block.image?.url) return null;
      return (
        <figure className="my-8 -mx-6 lg:mx-0">
          <div className="relative aspect-[16/9] overflow-hidden lg:rounded-xl bg-cream">
            <Image
              src={block.image.url}
              alt={block.image.alt}
              fill
              sizes="(min-width: 1024px) 672px, 100vw"
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 px-6 lg:px-0 font-ui text-[12px] italic text-soft text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "divider":
      return (
        <hr
          aria-hidden
          className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        />
      );

    case "callout": {
      const variant = block.calloutVariant || "info";
      const styles = {
        info: "bg-blue-light border-blue-light text-dark",
        warning: "bg-amber-light border-amber-light text-dark",
        highlight: "bg-brand-light border-brand/30 text-dark",
      } as const;
      const labels = {
        info: "Hinweis",
        warning: "Wichtig",
        highlight: "Merksatz",
      } as const;
      const icons = { info: "ℹ", warning: "⚠", highlight: "★" } as const;

      return (
        <aside
          className={cn(
            "my-6 rounded-xl border p-5 flex gap-4",
            styles[variant],
          )}
        >
          <div
            aria-hidden
            className="flex-shrink-0 h-7 w-7 rounded-full bg-white/70 border border-border flex items-center justify-center text-sm"
          >
            {icons[variant]}
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
              {labels[variant]}
            </div>
            <p className="font-sans text-[15px] leading-[1.6] text-dark">
              {block.text}
            </p>
          </div>
        </aside>
      );
    }

    default:
      return null;
  }
}
