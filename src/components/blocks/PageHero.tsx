import Image from "next/image";

/**
 * Vollflächiger Bild-Hero für Innenseiten (Echte Anwendung, Über …), analog
 * zur Startseite: großformatiges Realfoto, mittelachsige Headline auf grünen
 * Logo-Balken, knappe Copy. Der Header läuft transparent darüber (siehe
 * Header: isHero-Routen).
 */

// Grüner Headline-Balken im Logo-Trägerstil mit feiner Grain-Textur — identisch
// zur Home (HeroSearch), damit die Bildwelt eine Sprache spricht.
const GREEN_BAR =
  "box-decoration-clone inline-block rounded-xl px-4 py-2 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_14px_30px_-16px_rgba(0,0,0,0.5)]";
const GREEN_BAR_STYLE: React.CSSProperties = {
  backgroundColor: "#009460",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
  backgroundBlendMode: "soft-light",
};

interface PageHeroProps {
  image: string;
  imageAlt: string;
  /** CSS object-position, z.B. "50% 40%" */
  objectPosition?: string;
  eyebrow?: string;
  /** Headline-Zeilen, je Zeile ein grüner Balken */
  lines: string[];
  copy: string;
  /** Optionale Aktionen (Buttons) unter der Copy */
  children?: React.ReactNode;
}

export function PageHero({
  image,
  imageAlt,
  objectPosition = "50% center",
  eyebrow,
  lines,
  copy,
  children,
}: PageHeroProps) {
  return (
    <section className="relative -mt-20 flex min-h-[64vh] w-full items-center justify-center overflow-hidden rounded-b-[2.5rem] pt-20 lg:min-h-[72vh]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition }}
        priority
      />

      {/* Nur ein weicher Verlauf am oberen Rand für die weiße Navi — das Foto
          bleibt sonst unverfälscht hell. Die grünen Balken tragen die Headline,
          die Copy bekommt einen feinen Textschatten für Lesbarkeit. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-36 bg-gradient-to-b from-black/35 to-transparent"
      />

      <div className="relative z-10 w-full max-w-3xl px-6 text-center">
        {eyebrow && (
          <div
            className="mb-4 font-sans font-semibold text-white"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
          >
            {eyebrow}
          </div>
        )}
        <h1
          style={{ fontStretch: "110%" }}
          className="font-display flex flex-col items-center gap-2.5 text-[clamp(28px,4.6vw,54px)] leading-[1.06]"
        >
          {lines.map((line) => (
            <span key={line} className={GREEN_BAR} style={GREEN_BAR_STYLE}>
              {line}
            </span>
          ))}
        </h1>
        <p
          className="mx-auto mt-6 max-w-xl font-sans text-[16px] leading-[1.6] text-white lg:text-[18px]"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
        >
          {copy}
        </p>
        {children && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
