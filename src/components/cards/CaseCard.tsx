import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import { ToolLogo } from "@/components/ui/ToolLogo";
import { cn } from "@/lib/utils";
import type { CaseSummary } from "@/types/content";

interface CaseCardProps {
  item: CaseSummary;
  className?: string;
  /** Beibehalten für API-Kompatibilität; alle Karten rendern als Modulkarte. */
  variant?: "lead" | "list";
}

/**
 * Referenz-Modulkarte für „Echte Anwendung". Produkt zuerst: Logo und Name
 * tragen den Kopf, darunter der Nutzen (was die Software löst). Das Motiv ist
 * bewusst ein kompaktes Band, damit es das Produkt nicht überlagert.
 */
export function CaseCard({ item, className }: CaseCardProps) {
  const href = `/anwendung/${item.slug}`;

  return (
    <article
      className={cn(
        "lift group flex h-full flex-col overflow-hidden rounded-2xl card-soft",
        className,
      )}
    >
      {/* kompaktes Motiv-Band */}
      {item.cover?.url && (
        <Link href={href} className="block">
          <div className="relative aspect-[16/7] overflow-hidden bg-cream">
            <Image
              src={item.cover.url}
              alt={item.cover.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        </Link>
      )}

      <div className="flex flex-1 flex-col p-6">
        {/* Produkt zuerst: Logo + Name */}
        <div className="flex items-center gap-3">
          <ToolLogo name={item.tool.name} slug={item.tool.slug} size={46} />
          <div className="min-w-0">
            <div className="font-ui text-[16px] font-bold leading-tight text-dark">
              {item.tool.name}
            </div>
            <div className="font-ui text-[12.5px] text-soft">
              {item.tool.categoryLabel}
            </div>
          </div>
        </div>

        {/* Was die Software löst */}
        <h3 className="mt-4 font-display text-[clamp(19px,1.5vw,23px)] leading-[1.12] text-dark">
          <Link href={href} className="transition-colors hover:text-brand-dark">
            {item.title}
          </Link>
        </h3>

        <p className="mt-2.5 font-sans text-[14.5px] leading-[1.6] text-mid line-clamp-3">
          {item.lead}
        </p>

        {item.nutzen && item.nutzen.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {item.nutzen.map((n) => (
              <li
                key={n}
                className="tag px-2.5 py-1.5 font-ui text-[12.5px] font-medium leading-tight text-dark"
              >
                <Check
                  size={13}
                  className="flex-shrink-0 text-brand"
                  aria-hidden
                />
                {n}
              </li>
            ))}
          </ul>
        )}

        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1.5 self-start font-ui text-[13px] font-semibold text-brand transition-colors hover:text-brand-dark"
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
