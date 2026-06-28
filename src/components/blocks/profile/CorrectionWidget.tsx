"use client";

import { useState } from "react";
import { Flag } from "lucide-react";

import { cn } from "@/lib/utils";

interface CorrectionWidgetProps {
  toolName: string;
  className?: string;
}

/**
 * Korrekturfunktion auf jedem Tool-Profil (Strategie-Meeting 12.06.2026).
 *
 * „Daten veraltet?"-Hinweis + Meldemöglichkeit. Anbieter und Behörden
 * können einfach melden, wenn etwas falsch oder veraltet ist. Die Redaktion
 * prüft Änderungen vor Veröffentlichung (kein automatisches Überschreiben).
 *
 * Stub-Submit — gleiche UX-Logik wie die anderen Formulare.
 */
const REASONS = [
  "Information ist falsch",
  "Information ist veraltet",
  "Produkt wurde umbenannt",
  "Datenschutzangabe hat sich geändert",
  "Referenz oder Case kann ergänzt werden",
  "Sonstiges",
] as const;

export function CorrectionWidget({
  toolName,
  className,
}: CorrectionWidgetProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reason, setReason] = useState<string>(REASONS[0]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section
      id="korrektur"
      className={cn(
        "scroll-mt-24 rounded-2xl border border-dashed border-border bg-cream/40 p-6 lg:p-7",
        className,
      )}
    >
      {submitted ? (
        <div className="text-center py-4">
          <div className="text-2xl mb-2" aria-hidden>
            ✓
          </div>
          <h3 className="font-serif text-[20px] font-normal text-dark">
            Danke für den Hinweis.
          </h3>
          <p className="font-sans text-[14px] text-soft mt-1.5 max-w-md mx-auto">
            Unsere Redaktion prüft die Meldung und aktualisiert das Profil bei
            Bedarf. Änderungen werden vor Veröffentlichung redaktionell geprüft.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white border border-border text-soft">
              <Flag size={15} aria-hidden />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-[18px] font-normal leading-tight text-dark">
                Angaben veraltet oder falsch?
              </h3>
              <p className="font-sans text-[13.5px] leading-[1.55] text-soft mt-1">
                Helfen Sie mit, das Profil von{" "}
                <strong className="text-dark font-medium">{toolName}</strong>{" "}
                aktuell zu halten. Anbieter und Behörden können Korrekturen
                melden — die Redaktion prüft jede Änderung.
              </p>
              {!open && (
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="mt-3 inline-flex items-center rounded-full border border-border bg-white px-4 py-2 font-ui text-[12.5px] font-semibold text-dark transition-colors hover:border-brand hover:text-brand-dark"
                >
                  Korrektur melden
                </button>
              )}
            </div>
          </div>

          {open && (
            <form
              onSubmit={handleSubmit}
              className="mt-5 space-y-3 border-t border-border pt-5"
            >
              <label className="block space-y-1.5">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-soft">
                  Was stimmt nicht?
                </span>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="cw-input"
                >
                  {REASONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block space-y-1.5">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-soft">
                  Details (optional)
                </span>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Was sollte korrigiert werden?"
                  className="cw-input resize-none"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-soft">
                  E-Mail (für Rückfragen)
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@behoerde.de"
                  className="cw-input"
                />
              </label>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="submit"
                  className="rounded-xl bg-brand px-5 py-2.5 font-ui text-[13px] font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  Korrektur senden
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="font-ui text-[12px] text-soft hover:text-dark"
                >
                  Abbrechen
                </button>
              </div>
            </form>
          )}

          <style>{`
            .cw-input {
              width: 100%;
              border: 1px solid var(--color-border);
              border-radius: 10px;
              padding: 0.6rem 0.85rem;
              font-family: var(--font-ui);
              font-size: 13.5px;
              color: var(--color-dark);
              background: var(--color-white, #fff);
              outline: none;
              transition: border-color 0.15s;
            }
            .cw-input::placeholder { color: var(--color-soft); }
            .cw-input:focus {
              border-color: var(--color-brand);
              box-shadow: 0 0 0 3px rgba(0, 148, 96, 0.15);
            }
          `}</style>
        </>
      )}
    </section>
  );
}
