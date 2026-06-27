"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { categoriesByThemenfeld } from "@/mocks/categories";
import { themenfelder } from "@/mocks/themenfelder";

/**
 * Themenfelder-Mega-Menu im Header.
 * - Hover/Focus öffnet ein full-width Panel mit den 4 Themenfeldern
 *   und den jeweils enthaltenen Kategorien.
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
        Themenfelder
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
            <div className="flex items-center justify-between mb-6">
              <div className="font-ui text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
                Vier Themenfelder
              </div>
              <Link
                href="/themenfelder"
                onClick={() => setOpen(false)}
                className="font-ui text-[12px] font-semibold text-brand hover:underline"
              >
                Alle Themenfelder ansehen →
              </Link>
            </div>

            {/* 4 Themenfeld-Spalten mit Kategorien */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
              {themenfelder.map((tf) => {
                const cats = categoriesByThemenfeld[tf.slug] || [];
                return (
                  <div key={tf.slug}>
                    <Link
                      href={`/themenfelder/${tf.slug}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-2.5 pb-3 mb-3 border-b border-border"
                    >
                      <span
                        aria-hidden
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-base"
                        style={{
                          background: `${tf.accentColor || "#009460"}14`,
                          color: tf.accentColor || "#009460",
                        }}
                      >
                        {tf.icon}
                      </span>
                      <span className="font-serif text-[16px] font-bold leading-[1.1] text-dark group-hover:text-brand-dark transition-colors">
                        {tf.name}
                      </span>
                    </Link>
                    <ul className="space-y-px">
                      {cats.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/kategorien/${c.slug}`}
                            onClick={() => setOpen(false)}
                            className="group flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-cream"
                          >
                            <span aria-hidden className="text-sm">
                              {c.icon}
                            </span>
                            <span className="flex-1 font-ui text-[12.5px] text-dark group-hover:text-brand-dark transition-colors">
                              {c.name}
                            </span>
                            <span className="font-ui text-[10px] text-soft">
                              {c.toolCount}
                            </span>
                          </Link>
                        </li>
                      ))}
                      {cats.length === 0 && (
                        <li className="px-2 py-1.5 font-ui text-[11px] italic text-soft">
                          in Vorbereitung
                        </li>
                      )}
                    </ul>
                  </div>
                );
              })}
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
