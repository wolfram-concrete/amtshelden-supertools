import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  /** Linkt das Logo auf die Startseite (Default: true). */
  link?: boolean;
  /** Höhe in Pixeln — Logo skaliert proportional (AR ~3:1). */
  height?: number;
  /** Priority-Loading (für above-the-fold im Header). */
  priority?: boolean;
  className?: string;
}

/**
 * Amtshelden Supertools Logo.
 *
 * Quelle: public/brand/amtshelden-supertools-logo.png
 * Original: 5778 × 1933 (AR ≈ 2.99:1)
 *
 * Hinweis: Auf dunklen Hintergründen problematisch (schwarze "HELDEN"-Bubble
 * verschwindet). Bis eine inverse Variante existiert, dort lieber als
 * Wortmarke oder „ST"-Signet darstellen.
 */
export function Logo({
  link = true,
  height = 36,
  priority = false,
  className,
}: LogoProps) {
  // AR 2.99:1 — width = height × 2.99 (gerundet)
  const width = Math.round(height * 2.99);

  const img = (
    <Image
      src="/brand/amtshelden-supertools-logo.png"
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
