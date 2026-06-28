"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import { BrandIcon } from "@/components/icons/BrandIcon";
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
interface MegaMenuProps {
  /** Darstellung auf grünem Hintergrund (Floating-Pill-Navi) */
  onDark?: boolean;
  /** Aktive Seite (Themenfeld/Kategorie) → Trigger bleibt hervorgehoben */
  active?: boolean;
}

export function MegaMenu({ onDark = false, active = false }: MegaMenuProps) {
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
    closeTimer.current = setTimeout(() => setOpen(false), 220);
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
          "inline-flex items-center gap-1.5 rounded-xl h-9 px-3.5 font-ui text-[13px] font-medium transition-colors",
          onDark
            ? open || active
              ? "bg-white/15 text-white"
              : "text-white/90 hover:bg-white/10 hover:text-white"
            : open || active
              ? "bg-cream text-dark"
              : "text-mid hover:bg-cream hover:text-dark",
        )}
      >
        Themenfelder
        <ChevronDown
          size={14}
          className={cn(
            "transition-transform",
            onDark
              ? open
                ? "rotate-180 text-white"
                : "text-white/70"
              : open
                ? "rotate-180 text-brand-dark"
                : "text-soft",
          )}
        />
      </button>

      {/* Panel — überdeckt full-width unter dem Header */}
      {open && (
        <div className="fixed inset-x-0 top-[5.25rem] z-50 pointer-events-none">
          <div className="container mx-auto flex justify-end px-4 sm:px-6 lg:px-10">
            <div
              className="pointer-events-auto w-full sm:max-w-2xl lg:max-w-3xl rounded-2xl bg-logo shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)] p-3 animate-mega"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <div className="grid sm:grid-cols-2 gap-3">
                {themenfelder.map((tf) => {
                  const cats = categoriesByThemenfeld[tf.slug] || [];
                  return (
                    <div
                      key={tf.slug}
                      className="group rounded-2xl bg-cream p-5 transition-colors hover:bg-white"
                    >
                      <div className="flex items-start justify-between">
                        <span
                          aria-hidden
                          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand-dark"
                        >
                          {tf.icon && <BrandIcon name={tf.icon} size={20} />}
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="text-soft transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-dark"
                          aria-hidden
                        />
                      </div>
                      <Link
                        href={`/themenfelder/${tf.slug}`}
                        onClick={() => setOpen(false)}
                        className="mt-3 block"
                      >
                        <h4 className="font-serif text-[17px] font-normal leading-[1.15] text-dark transition-colors">
                          {tf.name}
                        </h4>
                        <p className="font-ui text-[11.5px] leading-[1.5] text-mid mt-1 line-clamp-2">
                          {tf.tagline}
                        </p>
                      </Link>
                      {cats.length > 0 ? (
                        <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-1.5">
                          {cats.map((c) => (
                            <Link
                              key={c.slug}
                              href={`/kategorien/${c.slug}`}
                              onClick={() => setOpen(false)}
                              className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 font-ui text-[11px] font-medium text-mid transition-colors hover:bg-brand/10 hover:text-brand-dark"
                            >
                              {c.icon && (
                                <BrandIcon
                                  name={c.icon}
                                  size={12}
                                  className="text-brand"
                                />
                              )}
                              {c.name}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="mt-3 pt-3 border-t border-border font-ui text-[11px] italic text-soft">
                          Kategorien in Vorbereitung
                        </div>
                      )}
                    </div>
                  );
                })}
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
