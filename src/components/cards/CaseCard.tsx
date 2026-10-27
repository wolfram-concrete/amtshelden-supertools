import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
 * Case-Karte für „Echte Anwendung". Zeigt Kommune, Rolle der schildernden
 * Person und das geprüfte Tool. Bewusst sachlich, mit sichtbarem
 * Exemplarisch-Hinweis (Ehrlichkeits-Konvention, AGENTS.md).
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
          {/* Kommune-Label mit Wappen auf dem Bild */}
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-dark/85 py-1 pl-1.5 pr-2.5 font-ui text-[11px] font-semibold text-white backdrop-blur-sm">
            {item.wappen && (
              <Image
                src={item.wappen}
                alt=""
                width={16}
                height={16}
                className="h-4 w-4 object-contain"
                aria-hidden
              />
            )}
            {item.kommune}
          </div>
          {/* Exemplarisch-Kennzeichnung */}
          <div className="absolute right-3 top-3 inline-flex items-center rounded-lg bg-accent/90 px-2 py-0.5 font-ui text-[10px] font-semibold uppercase tracking-wide text-accent-ink">
            Beispiel
          </div>
        </div>
      </Link>

      <div className={cn("min-w-0", isLead ? "lg:order-1" : "mt-5")}>
        <div className="font-sans font-semibold text-brand">{item.eyebrow}</div>

        <h3
          className={cn(
            "mt-2 font-display text-dark",
            isLead
              ? "text-[clamp(25px,3vw,37px)] leading-[1.02]"
              : "text-[clamp(20px,2.2vw,25px)] leading-[1.05]",
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

        {/* Meta: Person + geprüftes Tool (mit Logo) */}
        <div className="mt-5 border-t border-border pt-4">
          <div className="font-ui text-[12.5px] text-dark">
            {item.person.name}
            <span className="text-soft">, {item.person.role}</span>
          </div>
          <div className="mt-3 inline-flex items-center gap-2.5">
            <ToolLogo name={item.tool.name} slug={item.tool.slug} size={30} />
            <span className="font-ui text-[12.5px] text-soft">
              Geprüft:{" "}
              <span className="font-semibold text-brand-dark">
                {item.tool.name}
              </span>
            </span>
          </div>
        </div>

        <Link
          href={`/anwendung/${item.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 font-ui text-[13px] font-semibold text-brand transition-colors hover:text-brand-dark"
        >
          Case lesen
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
