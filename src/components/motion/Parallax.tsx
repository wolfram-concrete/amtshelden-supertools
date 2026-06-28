"use client";

import { useEffect, useRef } from "react";

interface ParallaxProps {
  children: React.ReactNode;
  /** Bewegungsstärke; 0.1–0.2 ist dezent. */
  speed?: number;
  className?: string;
}

/**
 * Leichter Parallax-Layer — verschiebt den Inhalt abhängig von der Scroll-
 * Position des eigenen Containers. rAF-gedrosselt, passiv, und bei
 * `prefers-reduced-motion: reduce` komplett inaktiv.
 *
 * Hinweis: Der Container sollte etwas Überstand haben (z. B. -inset-y) und der
 * Elternknoten `overflow-hidden`, damit beim Verschieben keine Kante zeigt.
 */
export function Parallax({ children, speed = 0.14, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const center = rect.top + rect.height / 2;
      const progress = (center - viewport / 2) / viewport; // ~ -1 … 1
      const shift = -progress * speed * 100;
      el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
