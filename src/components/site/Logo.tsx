import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type LogoVariant = "default" | "inverse";

interface LogoProps {
  /** "default" für helle Hintergründe, "inverse" für dunkle. */
  variant?: LogoVariant;
  /** Linkt das Logo auf die Startseite (Default: true). */
  link?: boolean;
  /** Höhe in Pixeln — Logo skaliert proportional (AR ~3:1). */
  height?: number;
  /** Priority-Loading (für above-the-fold im Header). */
  priority?: boolean;
  className?: string;
}

const LOGO_SOURCES: Record<LogoVariant, string> = {
  default: "/brand/amtshelden-supertools-logo.png",
  inverse: "/brand/amtshelden-supertools-logo-inverse.png",
};

/**
 * Amtshelden Supertools Logo.
 *
 * Quellen:
 *  - public/brand/amtshelden-supertools-logo.png         (default — helle BG)
 *  - public/brand/amtshelden-supertools-logo-inverse.png (inverse — dunkle BG)
 *
 * Original: 5778 × 1933 (AR ≈ 2.99:1)
 */
export function Logo({
  variant = "default",
  link = true,
  height = 36,
  priority = false,
  className,
}: LogoProps) {
  // AR 2.99:1 — width = height × 2.99 (gerundet)
  const width = Math.round(height * 2.99);

  const img = (
    <Image
      src={LOGO_SOURCES[variant]}
      alt="Amtshelden Supertools"
      width={width}
      height={height}
      priority={priority}
      sizes={`${width}px`}
      className={cn("h-auto w-auto", className)}
      style={{ height: `${height}px` }}
    />
  );

  if (!link) return img;

  return (
    <Link
      href="/"
      aria-label="Amtshelden Supertools – Startseite"
      className="inline-flex items-center transition-opacity hover:opacity-80"
    >
      {img}
    </Link>
  );
}
