"use client";

import { useEffect, useRef, useState } from "react";
import { Info, X } from "lucide-react";

interface InfoPopoverProps {
  /** aria-label des Buttons */
  label: string;
  title: string;
  text: string;
}

/**
 * Kleiner Info-Button (i) mit Popover — z. B. hinter einer Eyebrow/Badge.
 * Klick öffnet ein Fenster mit Erklärung. Esc + Klick-außerhalb schließen.
 */
export function InfoPopover({ label, title, text }: InfoPopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.addEventListener("mousedown", onClick);
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <span ref={ref} className="relative inline-flex">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-5 w-5 items-center justify-center rounded-full border border-border text-soft transition-colors hover:border-brand hover:text-brand-dark"
      >
        <Info size={12} aria-hidden />
      </button>

      {open && (
        <div
          role="dialog"
          className="absolute left-0 top-7 z-30 w-72 rounded-xl border border-border bg-white p-4 text-left shadow-[0_20px_50px_-20px_rgba(17,17,17,0.35)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="font-sans text-[13px] font-semibold text-dark">
              {title}
            </div>
            <button
              type="button"
              aria-label="Schließen"
              onClick={() => setOpen(false)}
              className="flex-shrink-0 text-soft transition-colors hover:text-dark"
            >
              <X size={14} aria-hidden />
            </button>
          </div>
          <p className="mt-1.5 font-sans text-[12.5px] leading-[1.6] text-mid">
            {text}
          </p>
        </div>
      )}
    </span>
  );
}
