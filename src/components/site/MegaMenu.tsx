"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { categories } from "@/mocks/categories";

/**
 * Kategorien-Mega-Menu im Header.
 * - Hover/Focus öffnet ein full-width Panel mit allen Kategorien
 * - Esc + Click-Outside schließen das Panel
 * - Booking-Style: keine versteckten Inhalte, alles 1 Klick entfernt
 */
export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ESC schließt
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Click outside schließt
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full h-9 px-3.5 font-ui text-[13px] font-medium transition-colors",
          open
            ? "bg-cream text-dark"
            : "text-mid hover:bg-cream hover:text-dark",
        )}
      >
        Kategorien
        <ChevronDown
          size={14}
          className={cn(
            "transition-transform",
            open ? "rotate-180 text-brand-dark" : "text-soft",
          )}
        />
      </button>

      {/* Panel — überdeckt full-width unter dem Header */}
      {open && (
        <div
          className="fixed left-0 right-0 top-20 z-50 border-y border-border bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.15)] animate-mega"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="container mx-auto px-6 lg:px-10 py-8 lg:py-10">
            <div className="grid lg:grid-cols-[1fr_2.5fr] gap-10">
              {/* Linker Intro-Block */}
              <div className="space-y-3">
                <div className="font-ui text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
                  Verzeichnis
                </div>
                <h3 className="font-serif text-[26px] font-bold leading-[1.15] text-dark">
                  Sechs Kategorien.<br />Volle Tiefe.
                </h3>
                <p className="font-sans text-[13px] leading-[1.6] text-mid">
                  Jede Kategorie wird redaktionell betreut — mit Einordnung
                  aus Behördenperspektive, ehrlichen Empfehlungen und
                  Alternativen.
                </p>
                <Link
                  href="/kategorien"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1 font-ui text-[12px] font-semibold text-brand hover:underline pt-2"
                >
                  Alle Kategorien ansehen →
                </Link>
              </div>

              {/* Grid mit Kategorien */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/kategorien/${c.slug}`}
                    onClick={() => setOpen(false)}
                    className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-cream"
                  >
                    <span
                      aria-hidden
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-base"
                      style={{
                        background: `${c.accentColor || "#009460"}14`,
                        color: c.accentColor || "#009460",
                      }}
                    >
                      {c.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="font-ui text-[13px] font-semibold text-dark group-hover:text-brand-dark transition-colors">
                        {c.name}
                      </div>
                      <div className="font-ui text-[11px] text-soft leading-snug mt-0.5 line-clamp-2">
                        {c.tagline}
                      </div>
                      <div className="font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-soft mt-1.5">
                        {c.toolCount} Tools
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <style>{`
            @keyframes mega-in {
              from { opacity: 0; transform: translateY(-6px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-mega {
              animation: mega-in 0.18s ease-out forwards;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
