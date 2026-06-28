import Image from "next/image";

interface FoerderHinweisProps {
  /**
   * Schaltet den Förderhinweis live. ERST auf `true` setzen, wenn:
   *  1. die Partnerschaft/Förderung offiziell bestätigt ist UND
   *  2. die Logo-Nutzung schriftlich freigegeben wurde.
   * Solange `false` → kein Render (keine unbelegte Förder-/Hoheitszeichen-Aussage).
   */
  confirmed?: boolean;
  /** Pfad zum freigegebenen Logo, z. B. "/brand/partner/bmds.svg". */
  logoUrl?: string;
  ministry?: string;
}

/**
 * Förderhinweis-Badge — rechtsbündig in der Fläche unter dem Hero.
 * Trust-Signal für eine staatliche Förderung/Partnerschaft.
 *
 * WICHTIG: Standardmäßig inaktiv. Der Claim und das Bundes-Logo dürfen erst
 * erscheinen, wenn beides real und autorisiert ist — siehe `confirmed`.
 */
export function FoerderHinweis({
  confirmed = false,
  logoUrl,
  ministry = "Bundesministerium für Digitales und Staatsmodernisierung",
}: FoerderHinweisProps) {
  if (!confirmed) return null;

  return (
    <section className="bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-6 lg:pt-10">
        <div className="flex justify-end">
          <div className="inline-flex items-center gap-3.5 rounded-2xl border border-border bg-white px-4 py-3">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-cream">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={ministry}
                  width={44}
                  height={44}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="font-mono text-[9px] font-bold uppercase tracking-wide text-soft">
                  Logo
                </span>
              )}
            </span>
            <div className="max-w-[28ch]">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                Gefördert durch
              </div>
              <div className="mt-0.5 font-ui text-[12.5px] font-medium leading-snug text-dark">
                {ministry}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
