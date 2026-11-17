import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { GeprueftBadge } from "@/components/ui/GeprueftBadge";
import { cn } from "@/lib/utils";
import type { ReferenceCard } from "@/types/content";

interface CaseCardProps {
  item: ReferenceCard;
  className?: string;
}

/**
 * Referenzkarte „Echte Anwendung" im LinkedIn-/Facebook-Thumbnail-Stil: oben der
 * Software-Screenshot als Header, das Logo rund und groß über die Header-Kante
 * ragend, darunter Name, Bereich und der echte Pitch, dann „Was sie leistet"
 * auf das Profil. Ganz unten ein kleines, eingefasstes Dokumentarmotiv.
 */
export function CaseCard({ item, className }: CaseCardProps) {
  const href = `/tools/${item.slug}`;

  return (
    <article
      className={cn(
        "lift group flex h-full flex-col overflow-hidden rounded-2xl card-soft",
        className,
      )}
    >
      {/* Header: Software-Screenshot */}
      <Link href={href} className="block">
        <div className="relative aspect-[16/8] w-full overflow-hidden bg-cream">
          <Image
            src={item.header.url}
            alt={item.header.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-5 pb-5">
        {/* Logo überlappt die Header-Kante (LinkedIn-Stil), ~doppelt so groß */}
        <Link
          href={href}
          aria-label={item.name}
          className="relative z-10 -mt-11 mb-3 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_10px_24px_-12px_rgba(17,17,17,0.4)] ring-4 ring-white"
          style={{ backgroundColor: item.logoUrl ? "#fff" : item.markBg }}
        >
          {item.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.logoUrl}
              alt=""
              className="h-11 w-11 object-contain"
              loading="lazy"
            />
          ) : (
            <span className="font-ui text-[22px] font-extrabold text-white">
              {item.mark}
            </span>
          )}
        </Link>

        <div className="font-ui text-[18px] font-bold leading-tight text-dark">
          {item.name}
        </div>
        <div className="mt-0.5 font-ui text-[12.5px] text-soft">
          {item.categoryLabel}
        </div>

        <p className="mt-3 font-sans text-[14.5px] leading-[1.6] text-mid">
          {item.pitch}
        </p>
        <div className="mt-1.5 font-ui text-[11px] text-soft">lt. Anbieter</div>

        {/* Short Facts: belegbare Signale als Tags + Prüfdatum */}
        {(item.shortFacts?.length || item.lastCheckedAt) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {item.shortFacts?.map((f) => (
              <span
                key={f}
                className="tag px-2.5 py-1 font-ui text-[11.5px] font-medium text-mid"
              >
                {f}
              </span>
            ))}
            {item.lastCheckedAt && <GeprueftBadge date={item.lastCheckedAt} />}
          </div>
        )}

        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1.5 self-start font-ui text-[13px] font-semibold text-brand transition-colors hover:text-brand-dark"
        >
          Was sie leistet
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>

        {/* Kleines, eingefasstes Dokumentarmotiv als Ergänzung */}
        {item.motif && (
          <div className="panel mt-5 overflow-hidden rounded-xl p-1">
            <div className="relative aspect-[16/7] w-full overflow-hidden rounded-lg bg-cream">
              <Image
                src={item.motif.url}
                alt={item.motif.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
