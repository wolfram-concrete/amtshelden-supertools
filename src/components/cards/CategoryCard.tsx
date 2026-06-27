import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BrandIcon } from "@/components/icons/BrandIcon";
import { cn } from "@/lib/utils";
import type { CategoryDefinition } from "@/types/content";

interface CategoryCardProps {
  category: CategoryDefinition;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link
      href={`/kategorien/${category.slug}`}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-border bg-white p-6 lg:p-7 transition-colors hover:border-brand/70",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          aria-hidden
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-brand-dark"
        >
          {category.icon && <BrandIcon name={category.icon} size={22} />}
        </div>
        <ArrowUpRight
          size={20}
          className="flex-shrink-0 text-soft transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
          aria-hidden
        />
      </div>

      <div className="mt-5 space-y-2 flex-1">
        <h3 className="font-serif text-[22px] font-bold leading-tight text-dark group-hover:text-brand-dark transition-colors">
          {category.name}
        </h3>
        <p className="font-sans text-[14px] leading-[1.6] text-mid">
          {category.tagline}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        {category.toolCount !== undefined && (
          <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-soft">
            {category.toolCount} Tools
          </span>
        )}
        {category.topics?.[0] && (
          <span className="font-ui text-[11px] text-soft">
            {category.topics.slice(0, 3).join(" · ")}
          </span>
        )}
      </div>
    </Link>
  );
}
