import { cn } from "@/lib/utils";

/**
 * Supertools Brand-Icon-Serie.
 *
 * Custom monoline-SVGs in der Formsprache des Logos: geometrisch, rounded
 * Joins, einheitliche Strichstärke, flach. Ersetzt die zuvor verwendeten
 * Emoji-Icons (inkonsistent, off-brand, für BITV-Barrierefreiheit ungeeignet).
 *
 * Farbe wird über `currentColor` gesteuert — Einsatz typischerweise in Brand-Grün.
 *
 * Verwendung:
 *   <BrandIcon name="folder" className="text-brand-dark" size={20} />
 */

export type BrandIconName =
  | "bubble"
  | "chat"
  | "hash"
  | "users"
  | "user"
  | "user-plus"
  | "sparkles"
  | "target"
  | "folder"
  | "building"
  | "coins"
  | "map"
  | "alert";

interface BrandIconProps {
  name: BrandIconName;
  size?: number;
  className?: string;
  /** Strichstärke — Default 1.8 (zur geometrisch-ruhigen Logo-Anmutung) */
  strokeWidth?: number;
}

const PATHS: Record<BrandIconName, React.ReactNode> = {
  // Sprechblase — die Logo-Signatur (rounded Tag + Tail)
  bubble: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="4" />
      <path d="M8 17v4l5-4" />
    </>
  ),
  // Chat — Sprechblase mit drei Punkten
  chat: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="4" />
      <path d="M8 17v4l5-4" />
      <circle cx="8.5" cy="10.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="10.5" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  // Hash — Social Media
  hash: (
    <>
      <path d="M9.5 4 7.5 20" />
      <path d="M16.5 4 14.5 20" />
      <path d="M4 9h16" />
      <path d="M3.5 15h16" />
    </>
  ),
  // Personen — Personalmanagement
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 5.6" />
      <path d="M16.5 14.2A5.5 5.5 0 0 1 20.5 19" />
    </>
  ),
  // Einzelperson
  user: (
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
    </>
  ),
  // Person + Plus — Recruiting
  "user-plus": (
    <>
      <circle cx="10" cy="8" r="3.2" />
      <path d="M4 19a6 6 0 0 1 12 0" />
      <path d="M18.5 6v5" />
      <path d="M16 8.5h5" />
    </>
  ),
  // Funke — Transformation & KI
  sparkles: (
    <>
      <path d="M12 3.5 13.7 10.3 20.5 12 13.7 13.7 12 20.5 10.3 13.7 3.5 12 10.3 10.3Z" />
      <path d="M18.5 4.5 19 6.5 21 7 19 7.5 18.5 9.5 18 7.5 16 7 18 6.5Z" />
    </>
  ),
  // Zielscheibe — Moderne Führung
  target: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  // Akte / Ordner — E-Akte & DMS
  folder: (
    <path d="M3 7.5A2 2 0 0 1 5 5.5h3.6a2 2 0 0 1 1.4.6l1.4 1.4H19a2 2 0 0 1 2 2v6.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
  ),
  // Behörde / Gebäude — Bürgerservice
  building: (
    <>
      <path d="M3.5 9 12 4l8.5 5" />
      <path d="M5 9v10" />
      <path d="M19 9v10" />
      <path d="M9.5 9.5v9.5" />
      <path d="M14.5 9.5v9.5" />
      <path d="M3 19.5h18" />
    </>
  ),
  // Euro-Münze — Finanzen
  coins: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M15 9.2a3.8 3.8 0 1 0 0 5.6" />
      <path d="M7.5 11h5.5" />
      <path d="M7.5 13.2h4.5" />
    </>
  ),
  // Gefaltete Karte — Geo, Bauen & Umwelt
  map: (
    <>
      <path d="M9 4 3.5 6v14l5.5-2 6 2 5.5-2V4l-5.5 2Z" />
      <path d="M9 4v14" />
      <path d="M15 6v14" />
    </>
  ),
  // Warndreieck — Krise
  alert: (
    <>
      <path d="M12 4.5a1.4 1.4 0 0 1 1.2.7l7.3 12.6a1.4 1.4 0 0 1-1.2 2.1H4.7a1.4 1.4 0 0 1-1.2-2.1l7.3-12.6a1.4 1.4 0 0 1 1.2-.7Z" />
      <path d="M12 10v4" />
      <circle cx="12" cy="17" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
};

export function BrandIcon({
  name,
  size = 24,
  className,
  strokeWidth = 1.8,
}: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("inline-block", className)}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
