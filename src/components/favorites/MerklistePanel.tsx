"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowUpRight, Bookmark, X } from "lucide-react";

import { ToolLogo } from "@/components/ui/ToolLogo";
import { cn } from "@/lib/utils";
import { useFavorites } from "./FavoritesProvider";

/**
 * Merklisten-Panel: Slide-in von rechts mit den gemerkten Tools. Bewusst
 * schlicht — aufrufen und entfernen, kein Formular, kein Kauf. Liegt einmal
 * global im Frontend-Layout.
 */
export function MerklistePanel() {
  const { items, count, open, setOpen, remove, clear, ready } = useFavorites();

  // Scroll-Lock + ESC, solange offen
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-50 bg-dark/40 backdrop-blur-[2px] transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Merkliste"
        className={cn(
          "fixed right-0 top-0 bottom-0 z-[60] flex w-[88%] max-w-sm flex-col bg-white shadow-2xl",
          "transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "pointer-events-none translate-x-full",
        )}
      >
        {/* Kopf */}
        <div className="flex h-20 flex-shrink-0 items-center justify-between border-b border-border px-5">
          <div className="flex items-center gap-2.5">
            <Bookmark size={18} className="text-brand" aria-hidden />
            <span className="font-sans text-[18px] font-normal text-dark">
              Merkliste
            </span>
            {ready && count > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-light px-1.5 font-ui text-[11px] font-bold text-brand-dark">
                {count}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Merkliste schließen"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-soft transition-colors hover:bg-cream hover:text-dark"
          >
            <X size={20} aria-hidden />
          </button>
        </div>

        {/* Inhalt */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {!ready || count === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-8 text-center">
              <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cream text-soft">
                <Bookmark size={24} aria-hidden />
              </span>
              <p className="font-sans text-[16px] text-dark">
                Noch nichts gemerkt.
              </p>
              <p className="mt-2 font-ui text-[13px] leading-[1.6] text-soft">
                Tippen Sie bei einem Tool auf das Lesezeichen, um es hier zu
                sammeln. Die Merkliste bleibt in diesem Browser gespeichert.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={item.slug}>
                  <div className="flex items-center gap-3 px-4 py-3.5">
                    <ToolLogo
                      name={item.name}
                      slug={item.slug}
                      size={38}
                    />
                    <Link
                      href={`/tools/${item.slug}`}
                      onClick={() => setOpen(false)}
                      className="group min-w-0 flex-1"
                    >
                      <div className="truncate font-sans text-[15px] text-dark transition-colors group-hover:text-brand-dark">
                        {item.name}
                      </div>
                      <div className="truncate font-ui text-[11.5px] text-soft">
                        {item.categoryLabel}
                      </div>
                    </Link>
                    <Link
                      href={`/tools/${item.slug}`}
                      onClick={() => setOpen(false)}
                      aria-label={`Profil von ${item.name} öffnen`}
                      className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-soft transition-colors hover:bg-cream hover:text-brand-dark"
                    >
                      <ArrowUpRight size={16} aria-hidden />
                    </Link>
                    <button
                      type="button"
                      onClick={() => remove(item.slug)}
                      aria-label={`${item.name} aus der Merkliste entfernen`}
                      className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-soft transition-colors hover:bg-cream hover:text-dark"
                    >
                      <X size={16} aria-hidden />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Fuß */}
        {ready && count > 0 && (
          <div className="flex-shrink-0 border-t border-border px-5 py-4">
            <button
              type="button"
              onClick={clear}
              className="font-ui text-[12.5px] font-medium text-soft transition-colors hover:text-dark"
            >
              Merkliste leeren
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
