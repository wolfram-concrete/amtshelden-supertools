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
          <div className="container mx-auto px-6 lg:px-10 py-6 lg:py-7">
            <div className="grid lg:grid-cols-[0.85fr_2.15fr] gap-4">
              {/* Feature-Karte (grün) */}
              <Link
                href="/themenfelder"
                onClick={() => setOpen(false)}
                className="group relative overflow-hidden rounded-2xl bg-brand-dark text-white p-6 flex flex-col justify-between min-h-[210px] transition-colors hover:bg-brand"
              >
                <div>
                  <div className="font-ui text-[10px] font-bold uppercase tracking-[0.18em] text-white/75">
                    Verzeichnis
                  </div>
                  <h3 className="font-serif text-[24px] font-bold leading-[1.1] mt-2">
                    Vier Themenfelder.
                    <br />
                    Volle Tiefe.
                  </h3>
                  <p className="font-sans text-[13px] leading-[1.55] text-white/80 mt-2.5">
                    Kuratiert entlang der Felder, in denen Behörden Software
                    suchen.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 font-ui text-[13px] font-semibold mt-5">
                  Alle Themenfelder
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>

              {/* 2×2 Themenfeld-Bento */}
              <div className="grid sm:grid-cols-2 gap-4">
                {themenfelder.map((tf) => {
                  const cats = categoriesByThemenfeld[tf.slug] || [];
                  return (
                    <div
                      key={tf.slug}
                      className="group rounded-2xl border border-border bg-white p-5 transition-colors hover:border-brand/60"
                    >
                      <div className="flex items-start justify-between">
                        <span
                          aria-hidden
                          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand-dark"
                        >
                          {tf.icon && <BrandIcon name={tf.icon} size={20} />}
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="text-soft transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                          aria-hidden
                        />
                      </div>
                      <Link
                        href={`/themenfelder/${tf.slug}`}
                        onClick={() => setOpen(false)}
                        className="mt-3 block"
                      >
                        <h4 className="font-serif text-[17px] font-bold leading-[1.15] text-dark group-hover:text-brand-dark transition-colors">
                          {tf.name}
                        </h4>
                        <p className="font-ui text-[11.5px] leading-[1.5] text-soft mt-1 line-clamp-2">
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
                              className="inline-flex items-center gap-1 rounded-full bg-cream border border-border px-2.5 py-1 font-ui text-[11px] font-medium text-mid transition-colors hover:border-brand hover:text-brand-dark"
                            >
                              {c.icon && (
                                <BrandIcon
                                  name={c.icon}
                                  size={12}
                                  className="text-brand-dark"
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
