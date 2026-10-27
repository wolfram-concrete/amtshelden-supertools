import { directoryToolLogos } from "@/data/directory";

interface ToolLogoProps {
  name: string;
  /** Verzeichnis-Slug — zieht das echte Logo, falls vorhanden */
  slug?: string;
  size?: number;
}

/**
 * Software-Logo-Kachel für Cases und Teaser. Zeigt das echte Logo aus dem
 * Verzeichnis, sonst eine Letter-Mark auf Markengrün (gleiche Logik wie die
 * Home-Cases). Es werden keine Logos erfunden.
 */
export function ToolLogo({ name, slug, size = 36 }: ToolLogoProps) {
  const logo = slug ? directoryToolLogos[slug] : undefined;
  const initials = name
    .split(/[\s/]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <span
      className="inline-flex flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border"
      style={{
        width: size,
        height: size,
        background: logo?.backgroundColor || "var(--color-brand)",
      }}
    >
      {logo?.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo.logoUrl}
          alt={`${name} Logo`}
          className="rounded object-contain"
          style={{ width: size * 0.78, height: size * 0.78 }}
          loading="lazy"
        />
      ) : (
        <span
          className="font-ui font-extrabold text-white"
          style={{ fontSize: Math.round(size * 0.3) }}
        >
          {initials}
        </span>
      )}
    </span>
  );
}
