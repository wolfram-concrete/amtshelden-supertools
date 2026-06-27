import { cn } from "@/lib/utils";

import { SectionHead } from "./SectionHead";

interface TransparencyBlockProps {
  missingInfo?: string[];
  sourceNote?: string;
  className?: string;
}

/**
 * „Was wir nicht prüfen konnten" — macht Lücken aktiv sichtbar.
 *
 * Strategie-Meeting (12.06.2026): fehlende Informationen offen benennen
 * schafft mehr Vertrauen als ein lückenlos wirkendes Profil. Bewusst ruhig
 * und sachlich gestaltet — kein Warn-Rot, keine Alarm-Anmutung.
 */
export function TransparencyBlock({
  missingInfo,
  sourceNote,
  className,
}: TransparencyBlockProps) {
  if (!missingInfo?.length && !sourceNote) return null;

  return (
    <section className={cn("space-y-5", className)}>
      <SectionHead
        eyebrow="Transparenz"
        title="Was wir nicht prüfen konnten"
      />

      <p className="font-sans text-[16px] leading-[1.7] text-mid">
        Wir machen offen, wo uns Angaben fehlen — statt Lücken zu kaschieren.
        Diese Punkte konnten wir bei der Recherche nicht abschließend prüfen
        oder öffentlich auffinden:
      </p>

      {missingInfo && missingInfo.length > 0 && (
        <ul className="space-y-2.5">
          {missingInfo.map((item, idx) => (
            <li
              key={idx}
              className="flex gap-3 rounded-lg border border-border bg-cream/40 px-4 py-3"
            >
              <span
                aria-hidden
                className="flex-shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-white text-soft text-[11px] font-bold"
              >
                ?
              </span>
              <span className="font-sans text-[14px] leading-[1.6] text-mid">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}

      {sourceNote && (
        <p className="font-ui text-[12px] italic text-soft pt-1">
          {sourceNote}
        </p>
      )}
    </section>
  );
}
