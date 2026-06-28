import Image from "next/image";

interface FoerderHinweisProps {
  /**
   * Schaltet den ECHTEN Hinweis (mit Logo) live. ERST auf `true` setzen, wenn:
   *  1. die Partnerschaft/Förderung offiziell bestätigt ist UND
   *  2. die Logo-Nutzung schriftlich freigegeben wurde.
   * Solange `false`: in Produktion kein Render, in Entwicklung ein neutraler,
   * klar markierter Platzhalter (kein Logo, keine Aussage) — so entsteht live
   * kein falscher Zustand.
   */
  confirmed?: boolean;
  /** Pfad zum freigegebenen Logo, z. B. "/brand/partner/bmds.svg". */
  logoUrl?: string;
  kicker?: string;
  partner?: string;
}

/**
 * Förder-/Partnerhinweis-Slot — rechtsbündig in der Fläche unter dem Hero.
 *
 * Der Platz ist hier reserviert. Sichtbar wird er erst, wenn `confirmed` gesetzt
 * ist (echte, autorisierte Partnerschaft). Bis dahin: nichts in Produktion.
 */
export function FoerderHinweis({
  confirmed = false,
  logoUrl,
  kicker = "In Zusammenarbeit mit",
  partner = "Bundesministerium für Digitales und Staatsmodernisierung",
}: FoerderHinweisProps) {
  // ── Bestätigt: echter Hinweis mit Logo (geht live) ──
  if (confirmed) {
    return (
      <section className="bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-6 lg:pt-10">
          <div className="flex justify-end">
            <div className="inline-flex items-center gap-3.5 rounded-2xl border border-border bg-white px-4 py-3">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-cream">
                {logoUrl && (
                  <Image
                    src={logoUrl}
                    alt={partner}
                    width={44}
                    height={44}
                    className="h-full w-full object-contain"
                  />
                )}
              </span>
              <div className="max-w-[28ch]">
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                  {kicker}
                </div>
                <div className="mt-0.5 font-ui text-[12.5px] font-medium leading-snug text-dark">
                  {partner}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Nicht bestätigt: in Produktion nichts (kein falscher Online-Zustand) ──
  if (process.env.NODE_ENV === "production") return null;

  // ── Entwicklung: neutraler Platzhalter, der den Platz definiert ──
  return (
    <section className="bg-cream" aria-hidden>
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-6 lg:pt-10">
        <div className="flex justify-end">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-dashed border-border bg-cream/60 px-4 py-3">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-dashed border-border font-mono text-[9px] font-bold uppercase tracking-wide text-soft">
              Logo
            </span>
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-soft">
                Platzhalter · Partner / Förderung
              </div>
              <div className="mt-0.5 font-ui text-[11.5px] text-soft">
                Erscheint live erst nach Bestätigung — nur in Entwicklung sichtbar
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
