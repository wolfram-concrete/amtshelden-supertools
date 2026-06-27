"use client";

import { useEffect, useState } from "react";
import { Calendar, MessageSquare, Send, X } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Floating Chat-Widget — grüne Sprechblase mit „s" (Ableitung aus dem
 * Supertools-Logo). Aufgeklappt: direkter Chat + Terminbuchung über das
 * Kalendertool (Informationsgespräch / Anbieter).
 *
 * Bewusst KEIN Antwortzeit-Versprechen.
 *
 * Chat-Submit ist ein Stub (kein echter Endpoint). Die Terminbuchung
 * verlinkt auf das externe Kalendertool — URL via CAL_URL anpassbar.
 */
const CAL_URL = "https://cal.com/amtshelden";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
  }

  return (
    <>
      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat mit Supertools"
          className="fixed bottom-24 right-5 z-50 w-[340px] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-border bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)] animate-chat-in"
        >
          {/* Header */}
          <div className="flex items-center gap-3 rounded-t-2xl bg-brand-dark px-5 py-4 text-white">
            <SpeechBubbleS size={28} />
            <div className="flex-1">
              <div className="font-ui text-[14px] font-bold leading-tight">
                Supertools
              </div>
              <div className="font-ui text-[11px] text-white/75">
                Wir sind für Sie da
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Schließen"
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={18} aria-hidden />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-5">
            {/* Termin */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={15} className="text-brand-dark" aria-hidden />
                <span className="font-ui text-[10px] font-bold uppercase tracking-[0.16em] text-soft">
                  Termin vereinbaren
                </span>
              </div>
              <p className="font-sans text-[13px] leading-[1.55] text-mid mb-3">
                Informationsgespräch oder Anbieter-Anfrage? Buchen Sie direkt
                einen Termin über unseren Kalender.
              </p>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-full bg-brand px-5 py-2.5 font-ui text-[13px] font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                <Calendar size={14} aria-hidden />
                Termin buchen
              </a>
            </div>

            {/* Trenner */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="font-ui text-[10px] uppercase tracking-[0.16em] text-soft">
                oder
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Chat */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare
                  size={15}
                  className="text-brand-dark"
                  aria-hidden
                />
                <span className="font-ui text-[10px] font-bold uppercase tracking-[0.16em] text-soft">
                  Schreiben Sie uns
                </span>
              </div>

              {sent ? (
                <div className="rounded-xl border border-brand bg-brand-light/40 px-4 py-3 font-ui text-[12.5px] text-brand-dark">
                  ✓ Danke! Wir melden uns persönlich bei Ihnen.
                </div>
              ) : (
                <form onSubmit={handleSend} className="flex items-end gap-2">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={2}
                    placeholder="Ihre Frage an uns …"
                    className="flex-1 resize-none rounded-xl border border-border bg-white px-3.5 py-2.5 font-ui text-[13px] text-dark placeholder:text-soft outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
                  />
                  <button
                    type="submit"
                    aria-label="Senden"
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand text-white transition-colors hover:bg-brand-dark"
                  >
                    <Send size={15} aria-hidden />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating-Button: Sprechblase mit „s" */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Chat schließen" : "Chat öffnen"}
        aria-expanded={open}
        className={cn(
          "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center transition-transform hover:scale-105 active:scale-95",
          open && "scale-95",
        )}
      >
        {open ? (
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-dark text-white shadow-[0_12px_30px_-8px_rgba(0,107,69,0.6)]">
            <X size={22} aria-hidden />
          </span>
        ) : (
          <SpeechBubbleS size={56} withShadow />
        )}
      </button>

      <style>{`
        @keyframes chat-in {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-chat-in { animation: chat-in 0.18s cubic-bezier(0.16,1,0.3,1) forwards; }
      `}</style>
    </>
  );
}

/**
 * Sprechblase mit „s" — Ableitung aus der Logo-Formsprache
 * (rounded Tag/Bubble + kleiner Tail unten links, Brand-Grün).
 */
function SpeechBubbleS({
  size = 56,
  withShadow = false,
}: {
  size?: number;
  withShadow?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={
        withShadow
          ? { filter: "drop-shadow(0 12px 30px rgba(0,107,69,0.55))" }
          : undefined
      }
    >
      {/* Bubble-Körper */}
      <rect x="4" y="4" width="48" height="40" rx="12" fill="#009460" />
      {/* Tail unten links */}
      <path d="M16 42 L16 53 L27 42 Z" fill="#009460" />
      {/* „s" */}
      <text
        x="28"
        y="31"
        textAnchor="middle"
        fontFamily="'Inter Tight', system-ui, sans-serif"
        fontSize="26"
        fontWeight="800"
        fill="#ffffff"
        letterSpacing="-0.02em"
      >
        s
      </text>
    </svg>
  );
}
