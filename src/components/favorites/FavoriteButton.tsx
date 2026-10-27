"use client";

import { Bookmark } from "lucide-react";

import { cn } from "@/lib/utils";
import { useFavorites, type FavoriteTool } from "./FavoritesProvider";

interface FavoriteButtonProps {
  tool: FavoriteTool;
  /** "icon" = runder Button für Karten-Ecken, "solid" = mit Label (Profil) */
  variant?: "icon" | "solid";
  className?: string;
}

/**
 * Merken-Button. Sitzt häufig innerhalb einer Karten-Verlinkung — daher
 * preventDefault + stopPropagation, damit das Markieren nicht zum Profil
 * navigiert. Vor der Hydration (ready=false) neutral, um Flackern/Mismatch zu
 * vermeiden.
 */
export function FavoriteButton({
  tool,
  variant = "icon",
  className,
}: FavoriteButtonProps) {
  const { isFavorite, toggle, ready } = useFavorites();
  const active = ready && isFavorite(tool.slug);

  const label = active
    ? `${tool.name} aus der Merkliste entfernen`
    : `${tool.name} zur Merkliste hinzufügen`;

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(tool);
  }

  if (variant === "solid") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={active}
        aria-label={label}
        className={cn(
          "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 font-ui text-[13px] font-semibold transition-colors",
          active
            ? "border-brand bg-brand-light/60 text-brand-dark"
            : "border-border bg-white text-dark hover:border-brand hover:text-brand-dark",
          className,
        )}
      >
        <Bookmark
          size={16}
          className={active ? "fill-brand-dark text-brand-dark" : ""}
          aria-hidden
        />
        {active ? "Gemerkt" : "Merken"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={label}
      title={active ? "Gemerkt" : "Merken"}
      className={cn(
        "inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border backdrop-blur-sm transition-colors",
        active
          ? "border-brand bg-brand text-white"
          : "border-border bg-white/90 text-soft hover:border-brand hover:text-brand-dark",
        className,
      )}
    >
      <Bookmark size={16} className={active ? "fill-white" : ""} aria-hidden />
    </button>
  );
}
