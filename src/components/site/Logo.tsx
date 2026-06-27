import Link from "next/link";

import { cn } from "@/lib/utils";

export type LogoVariant = "default" | "inverse";

interface LogoProps {
  /** "default" für helle Hintergründe, "inverse" für dunkle / grüne. */
  variant?: LogoVariant;
  /** Linkt das Logo auf die Startseite (Default: true). */
  link?: boolean;
  /** Höhe in Pixeln — Logo skaliert proportional (AR ≈ 2.895:1). */
  height?: number;
  /** Priority-Loading (für above-the-fold im Header). */
  priority?: boolean;
  className?: string;
}

const LOGO_SOURCES: Record<LogoVariant, string> = {
  default: "/brand/supertools-logo.svg",
  inverse: "/brand/supertools-logo-inverse.svg",
};

/**
 * Supertools Logo (Stand 27.06.2026, Brand-Refresh).
 *
 * Quellen:
 *  - public/brand/supertools-logo.svg          (default — helle BG)
 *  - public/brand/supertools-logo-inverse.svg  (inverse — dunkle/grüne BG)
 *
 * SVG-Original: 2458.98 × 849.31 (AR ≈ 2.895)
 * PNG-Fallbacks unter gleichem Basisnamen (`.png`) für OG-Images / E-Mail.
 *
 * Bewusst `<img>` statt `next/image` — SVG braucht keine Bildoptimierung,
 * skaliert nativ scharf und vermeidet Konfigurations-Overhead.
 */
export function Logo({
  variant = "default",
  link = true,
  height = 36,
  priority = false,
  className,
}: LogoProps) {
  // AR 2.895:1
  const width = Math.round(height * 2.895);

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SOURCES[variant]}
      alt="Supertools"
      width={width}
      height={height}
      decoding={priority ? "sync" : "async"}
      loading={priority ? "eager" : "lazy"}
      className={cn("block", className)}
      style={{ height: `${height}px`, width: `${width}px` }}
    />
  );

  if (!link) return img;

  return (
    <Link
      href="/"
      aria-label="Supertools – Startseite"
      className="inline-flex items-center transition-opacity hover:opacity-80"
    >
      {img}
    </Link>
  );
}
