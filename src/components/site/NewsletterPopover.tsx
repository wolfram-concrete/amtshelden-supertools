"use client";

import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Newsletter-Widget im Header — Button öffnet ein kompaktes Popover mit
 * E-Mail-Input + Submit. Stub-Submit (kein echter Endpoint), gleiche UX
 * wie der große NewsletterCta.
 */
interface NewsletterPopoverProps {
  /** Darstellung in der grünen Floating-Pill (weiße CTA auf Grün) */
  onDark?: boolean;
}

export function NewsletterPopover({ onDark = false }: NewsletterPopoverProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    // Automatisch schließen nach kurzer Erfolgsanzeige
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
    }, 1800);
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-xl h-9 px-4 font-ui text-[12px] font-semibold transition-colors",
          onDark
            ? "bg-white text-brand-dark hover:bg-white/90"
            : open
              ? "bg-brand-dark text-white"
              : "bg-brand text-white hover:bg-brand-dark",
        )}
      >
        <Mail size={13} aria-hidden />
        Newsletter
      </button>

      {open && (
        <div
          className="absolute right-0 mt-3 w-[320px] rounded-xl border border-border bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] p-5 z-50 animate-popover-in"
          role="dialog"
          aria-label="Newsletter abonnieren"
        >
          <div className="space-y-1.5 mb-4">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
              Supertools Newsletter
            </div>
            <h3 className="font-serif text-[20px] font-normal leading-[1.15] text-dark">
              1× pro Woche das Wichtigste.
            </h3>
            <p className="font-sans text-[12px] leading-[1.55] text-soft">
              Beschlüsse, Tools, Behördenwissen — kompakt. Kein Spam.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-lg border border-brand bg-brand-light/40 px-4 py-3 font-ui text-[12px] text-brand-dark">
              ✓ Danke! Bestätigung kommt per E-Mail.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <label htmlFor="nl-pop-email" className="sr-only">
                E-Mail
              </label>
              <input
                id="nl-pop-email"
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dein.name@kommune.de"
                className="w-full rounded-full border border-border bg-white px-4 py-2.5 font-ui text-[13px] text-dark placeholder:text-soft outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-brand px-5 py-2.5 font-ui text-[13px] font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Anmelden
              </button>
              <p className="font-ui text-[10px] text-soft text-center pt-1">
                Abmelden jederzeit. DSGVO-konform.
              </p>
            </form>
          )}
        </div>
      )}

      <style>{`
        @keyframes popover-in {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-popover-in { animation: popover-in 0.18s ease-out forwards; }
      `}</style>
    </div>
  );
}
