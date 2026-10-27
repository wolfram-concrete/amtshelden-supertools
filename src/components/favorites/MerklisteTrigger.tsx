"use client";

import { Bookmark } from "lucide-react";

import { cn } from "@/lib/utils";
import { useFavorites } from "./FavoritesProvider";

/**
 * Merklisten-Einstieg oben rechts im Header: Bookmark-Icon mit Zähler-Badge.
 * Öffnet das Slide-in-Panel. onDark passt die Farben an die transparente Navi
 * über den Bild-Heroes an (analog MegaMenu/NewsletterPopover).
 */
export function MerklisteTrigger({ onDark = false }: { onDark?: boolean }) {
  const { count, ready, setOpen } = useFavorites();
  const showCount = ready && count > 0;

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={
        showCount ? `Merkliste öffnen, ${count} Tools` : "Merkliste öffnen"
      }
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
        onDark
          ? "text-white/90 hover:bg-white/10 hover:text-white"
          : "text-mid hover:bg-cream hover:text-dark",
      )}
    >
      <Bookmark size={18} className={showCount ? "fill-current" : ""} aria-hidden />
      {showCount && (
        <span
          className={cn(
            "absolute -right-1 -top-1 inline-flex h-[17px] min-w-[17px] items-center justify-center rounded-full px-1 font-ui text-[10px] font-bold leading-none",
            "bg-accent text-accent-ink ring-2",
            onDark ? "ring-[rgba(9,26,18,0.6)]" : "ring-cream",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
