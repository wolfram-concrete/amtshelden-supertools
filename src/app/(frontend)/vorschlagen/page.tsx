import type { Metadata } from "next";

import { VorschlagForm } from "@/components/blocks/VorschlagForm";
import { Breadcrumb } from "@/components/site/Breadcrumb";

export const metadata: Metadata = {
  title: "Tool vorschlagen oder eintragen — Supertools",
  description:
    "Behörden empfehlen Tools, die sie nutzen oder vermissen. Anbieter tragen ihr Unternehmen ein. Beides läuft über die Amtshelden-Redaktion — kein automatisiertes Listing.",
};

export default function VorschlagenPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Supertools", href: "/" },
          { label: "Tool vorschlagen" },
        ]}
      />

      <div className="container mx-auto px-6 lg:px-10 py-12 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
          {/* Linke Spalte: Editorial */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              Mitmachen
            </div>
            <h1 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.0] tracking-tight text-dark">
              Ein Tool fehlt?<br />
              <em className="not-italic font-medium text-brand-dark">
                Sagen Sie es uns.
              </em>
            </h1>
            <p className="font-sans text-[17px] leading-[1.7] text-mid">
              Supertools wächst handverlesen — auch durch Hinweise aus der
              Praxis. Egal ob Sie als Behörde ein Tool empfehlen, eine Lösung
              vermissen, oder als Anbieter gelistet werden möchten: Hier sind
              Sie richtig.
            </p>

            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex gap-3">
                <span className="font-serif italic text-soft text-[18px] flex-shrink-0">
                  01.
                </span>
                <div>
                  <div className="font-ui text-[14px] font-semibold text-dark">
                    Behörden empfehlen
                  </div>
                  <p className="font-sans text-[13px] text-soft leading-[1.6]">
                    Sie nutzen ein Tool, das hier fehlt? Oder vermissen eine
                    Lösung für Ihr Problem? Ihr Hinweis fließt in unsere
                    redaktionelle Pipeline.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="font-serif italic text-soft text-[18px] flex-shrink-0">
                  02.
                </span>
                <div>
                  <div className="font-ui text-[14px] font-semibold text-dark">
                    Anbieter tragen sich ein
                  </div>
                  <p className="font-sans text-[13px] text-soft leading-[1.6]">
                    Wir prüfen, ob Ihr Produkt in eines unserer Themenfelder
                    passt — kein automatisches Listing, jede Aufnahme wird
                    redaktionell geprüft.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Rechte Spalte: Formular */}
          <VorschlagForm />
        </div>
      </div>
    </>
  );
}
