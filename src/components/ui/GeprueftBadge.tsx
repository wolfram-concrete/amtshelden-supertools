import { BadgeCheck } from "lucide-react";

import { cn, formatDateDEShort } from "@/lib/utils";

interface GeprueftBadgeProps {
  /** ISO-Datum (lastCheckedAt) */
  date: string;
  /** Label vor dem Datum (Default „Geprüft") */
  label?: string;
  className?: string;
}

/**
 * Prüfdatum als grüne Highlight-Fläche — zentrales Trust-Element. Überall in
 * Produktkarten einheitlich, damit die Aktualität der Prüfung hervorsticht.
 */
export function GeprueftBadge({
  date,
  label = "Geprüft",
  className,
}: GeprueftBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-brand px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.06em] text-white",
        className,
      )}
    >
      <BadgeCheck size={12} aria-hidden />
      {label} {formatDateDEShort(date)}
    </span>
  );
}
