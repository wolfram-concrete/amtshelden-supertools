"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Globales Scroll-Reveal — beobachtet alle Elemente mit `data-reveal` und
 * blendet sie beim Eintritt in den Viewport sanft ein (CSS in globals.css).
 *
 * Progressive Enhancement: Ohne JS/IntersectionObserver oder bei
 * `prefers-reduced-motion: reduce` bleibt alles sofort sichtbar — die
 * `.reveal-ready`-Klasse (die das Verstecken aktiviert) wird nur dann gesetzt,
 * wenn wirklich animiert wird. Läuft nach jeder Client-Navigation neu.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"),
    );
    if (els.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
