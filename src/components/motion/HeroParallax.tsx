"use client";

import { useEffect, useRef } from "react";

interface HeroParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Anteil des Scrollwegs, um den der Inhalt dem Hintergrund nachläuft. */
  amount?: number;
  /** Maximaler Versatz in px (geclamped), damit nichts wegdriftet. */
  max?: number;
}

/**
 * Dezenter Hero-Parallax: der umschlossene Inhalt (Headline, Copy-Karte …) läuft
 * beim Scrollen etwas langsamer als das Hintergrundmotiv — klassischer
 * Foreground-Lag, nur `transform`. Kein Scroll-Hijack, kompatibel mit dem
 * Next-App-Router. Aus bei `prefers-reduced-motion` und auf Touch/Mobile.
 */
export function HeroParallax({
  children,
  className,
  amount = 0.16,
  max = 130,
}: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 767px)").matches
    ) {
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const t = Math.min(window.scrollY * amount, max);
      el.style.transform = `translate3d(0, ${t}px, 0)`;
    };
    const onScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [amount, max]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
