import Image from "next/image";

/**
 * Bild-Header für Innenseiten (Variante 1, Wolfram 12.11.): Foto als Band oben,
 * die grüne Headline überlappt die Bildkante, Copy und Aktionen stehen darunter
 * auf der Cream-Hintergrundfarbe. Text liegt nicht mehr auf dem Foto — das Motiv
 * braucht keine freie Mitte mehr. Der Header läuft transparent über das Band.
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
  /** CSS object-position, z.B. "50% 60%" */
  objectPosition?: string;
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
  lines,
  copy,
  children,
}: PageHeroProps) {
  return (
    <section className="bg-cream">
      {/* Bild-Band — läuft unter die transparente Navi (-mt-20) */}
      <div className="-mt-20 w-full overflow-hidden rounded-b-[2.5rem]">
        <div className="relative h-[46vh] min-h-[340px] w-full lg:h-[54vh]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition }}
            priority
          />
          {/* Weicher Verlauf oben für die weiße Navi */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-36 bg-gradient-to-b from-black/35 to-transparent"
          />
        </div>
      </div>

      {/* Textblock auf Cream — Headline überlappt die Bildkante */}
      <div className="container mx-auto px-6 lg:px-10">
        <div className="relative z-10 -mt-11 max-w-3xl pb-12 lg:-mt-16 lg:pb-16">
          <h1
            style={{ fontStretch: "110%" }}
            className="font-display flex flex-col items-start gap-2.5 text-[clamp(30px,4.6vw,56px)] leading-[1.04]"
          >
            {lines.map((line) => (
              <span key={line} className={GREEN_BAR} style={GREEN_BAR_STYLE}>
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-2xl font-sans text-[16px] leading-[1.6] text-mid lg:text-[18px]">
            {copy}
          </p>
          {children && (
            <div className="mt-7 flex flex-wrap gap-3">{children}</div>
          )}
        </div>
      </div>
    </section>
  );
}
