"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ProfileTier } from "@/types/blocks";

interface ExtendedProfileNoticeProps {
  tier: ProfileTier;
  className?: string;
}

/**
 * Transparenz-Hinweis an erweiterten (bezahlten) Profilen.
 *
 * Strategie-Meeting (12.06.2026), Grundprinzip „Keine gekauften Empfehlungen":
 * Behörden müssen verstehen, dass ein ausführlicheres Profil NICHT bedeutet,
 * dass Amtshelden dieses Tool empfiehlt — nur, dass das Unternehmen zusätzliche
 * Informationen bereitgestellt oder eine erweiterte Darstellung gebucht hat.
 *
 * Erscheint nur bei tier „verified" / „partner" (nicht bei „basis"/„addon").
 */
export function ExtendedProfileNotice({
  tier,
  className,
}: ExtendedProfileNoticeProps) {
  const [expanded, setExpanded] = useState(false);

  // Nur erweiterte (bezahlte) Profile bekommen den Hinweis
  if (tier !== "verified" && tier !== "partner") return null;

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-cream/60 px-4 py-3",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <Info
          size={16}
          className="flex-shrink-0 mt-0.5 text-brand-dark"
          aria-hidden
        />
        <div className="flex-1 min-w-0">
          <p className="font-ui text-[12.5px] leading-[1.55] text-mid">
            <span className="font-semibold text-dark">
              Erweitertes Profil:
            </span>{" "}
            Dieses Unternehmen hat zusätzliche Informationen bereitgestellt.
            {!expanded && (
              <>
                {" "}
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="font-medium text-brand-dark hover:underline"
                >
                  Was heißt das?
                </button>
              </>
            )}
          </p>
          {expanded && (
            <p className="font-ui text-[12px] leading-[1.6] text-soft mt-2">
              Die Ausführlichkeit eines Profils ist{" "}
              <strong className="text-dark font-semibold">
                keine Bewertung und keine Empfehlung
              </strong>
              . Sie sagt nur, dass das Unternehmen mehr Informationen geliefert
              oder eine erweiterte Darstellung gebucht hat. Unsere
              redaktionelle Einordnung bleibt davon unberührt — wir empfehlen
              kein Tool gegen Bezahlung.
            </p>
          )}
        </div>
        {expanded && (
          <button
            type="button"
            onClick={() => setExpanded(false)}
            aria-label="Hinweis einklappen"
            className="flex-shrink-0 text-soft hover:text-dark transition-colors"
          >
            <X size={14} aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
}
