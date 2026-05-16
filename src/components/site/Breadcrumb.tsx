import Link from "next/link";

import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (!items?.length) return null;

  return (
    <nav
      aria-label="Brotkrumen"
      className={cn(
        "border-b border-border bg-white/60",
        className,
      )}
    >
      <div className="container mx-auto px-6 lg:px-10 py-3.5">
        <ol className="flex flex-wrap items-center gap-2 font-ui text-[12px] text-soft">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={`${item.label}-${idx}`} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      isLast ? "text-dark font-medium" : "text-soft",
                    )}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <span aria-hidden className="text-border">
                    ›
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
