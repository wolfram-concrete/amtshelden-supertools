import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import { ToolLogo } from "@/components/ui/ToolLogo";
import { cn } from "@/lib/utils";
import type { CaseSummary } from "@/types/content";

interface CaseCardProps {
  item: CaseSummary;
  className?: string;
  /** "lead" = große Auftakt-Karte, "list" = Grid-Karte */
  variant?: "lead" | "list";
}

/**
 * Referenz-Karte für „Echte Anwendung". Zeigt eine Software, was sie konkret
 * leistet und zu welcher Kategorie sie gehört — aus Software-Sicht, nicht aus
 * Sicht einer einzelnen Kommune.
 */
export function CaseCard({ item, className, variant = "list" }: CaseCardProps) {
  const isLead = variant === "lead";

  return (
    <article
      className={cn(
        "group",
        isLead && "grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12",
        className,
      )}
    >
      <Link
        href={`/anwendung/${item.slug}`}
        className={cn("block", isLead && "lg:order-2")}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl bg-cream",
            isLead ? "aspect-[16/10]" : "aspect-[3/2]",
          )}
        >
          {item.cover?.url && (
            <Image
              src={item.cover.url}
              alt={item.cover.alt}
              fill
              sizes={isLead ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 640px) 50vw, 100vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}
        </div>
      </Link>

      <div className={cn("min-w-0", isLead ? "lg:order-1" : "mt-5")}>
        {/* Software + Logo */}
        <div className="flex items-center gap-2.5">
          <ToolLogo name={item.tool.name} slug={item.tool.slug} size={30} />
          <div className="min-w-0">
            <div className="font-ui text-[13.5px] font-semibold text-dark">
              {item.tool.name}
            </div>
            <div className="font-ui text-[12px] text-soft">
              {item.tool.categoryLabel}
            </div>
          </div>
        </div>

        <h3
          className={cn(
            "mt-4 font-display text-dark",
            isLead
              ? "text-[clamp(25px,3vw,37px)] leading-[1.04]"
              : "text-[clamp(20px,2.2vw,25px)] leading-[1.08]",
          )}
        >
          <Link
            href={`/anwendung/${item.slug}`}
            className="transition-colors hover:text-brand-dark"
          >
            {item.title}
          </Link>
        </h3>

        <p
          className={cn(
            "mt-3 font-sans leading-[1.65] text-mid",
            isLead ? "text-[17px]" : "text-[15px]",
          )}
        >
          {item.lead}
        </p>

        {item.nutzen && item.nutzen.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {item.nutzen.map((n) => (
              <li
                key={n}
                className="flex items-start gap-2 font-ui text-[13.5px] leading-[1.5] text-dark"
              >
                <Check
                  size={15}
                  className="mt-0.5 flex-shrink-0 text-brand"
                  aria-hidden
                />
                {n}
              </li>
            ))}
          </ul>
        )}

        <Link
          href={`/anwendung/${item.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 font-ui text-[13px] font-semibold text-brand transition-colors hover:text-brand-dark"
        >
          Was sie leistet
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </article>
  );
}
