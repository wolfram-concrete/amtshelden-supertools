"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** Stärke des Magneteffekts (Anteil der Cursor-Distanz). */
  strength?: number;
  /** Maximaler Versatz in px. */
  max?: number;
}

/**
 * Leichter Magnet-Hover: das Element folgt dem Cursor minimal. `transform` nur
 * via CSS-Variablen (`--mx`/`--my`, siehe `.magnetic` in globals.css), damit es
 * bei `prefers-reduced-motion` und auf Touch unverändert bleibt. Als
 * `display: inline-flex`-Wrapper gedacht, um Buttons/Links zu umschließen.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
  max = 7,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const mx = Math.max(-max, Math.min(max, dx * strength));
    const my = Math.max(-max, Math.min(max, dy * strength));
    el.style.setProperty("--mx", `${mx}px`);
    el.style.setProperty("--my", `${my}px`);
  }

  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
  }

  return (
    <span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn("magnetic inline-flex", className)}
    >
      {children}
    </span>
  );
}
