import Image from "next/image";

import { HeroParallax } from "@/components/motion/HeroParallax";

/**
 * Bild-Header für Innenseiten (Variante 2, Wolfram 13.11.): Foto full-size im
 * Above-Scroll. Die grüne Headline sitzt oben links auf dem Bild, Copy und
 * Aktionen liegen gegenüber in einer cremefarbenen Karte rechts auf dem Bild.
 * Über dem Scroll nur Headline, Intro-Copy und CTA; alles Weitere folgt darunter.
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
  /** Optionale Aktionen (Buttons) in der Cream-Karte unter der Copy */
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
    <section className="relative -mt-20 bg-cream">
      {/* Vollbild-Band im Above-Scroll */}
      <div className="relative h-[100svh] min-h-[600px] w-full overflow-hidden rounded-b-[2.5rem]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="hero-media object-cover"
          style={{ objectPosition }}
          priority
        />
        {/* Verlauf oben für die transparente weiße Navi */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 bg-gradient-to-b from-black/40 to-transparent"
        />

        {/* Inhalt über dem Bild: Headline oben links. Die Cream-Karte dockt in
            den Winkel zwischen erster und zweiter Headline-Zeile — ihre Oberkante
            liegt bündig auf der Oberlänge des zweiten grünen Balkens, weil sie
            mit der letzten Zeile in einer Flex-Reihe steht (kein Magic-Offset). */}
        <div className="absolute inset-0 z-10">
          <HeroParallax className="container mx-auto px-6 pt-28 lg:px-10 lg:pt-32">
            {/* Semantische Überschrift für Screenreader; die Balken sind dekorativ */}
            <h1 className="sr-only">{lines.join(" ")}</h1>
            <div
              aria-hidden
              style={{ fontStretch: "110%" }}
              className="flex flex-col items-start gap-2.5 font-display text-[clamp(36px,5.5vw,67px)] leading-[1.04]"
            >
              {lines.slice(0, -1).map((line, i) => (
                <span
                  key={line}
                  className={`${GREEN_BAR} hero-anim`}
                  style={
                    {
                      ...GREEN_BAR_STYLE,
                      "--hero-delay": `${i * 90}ms`,
                    } as React.CSSProperties
                  }
                >
                  {line}
                </span>
              ))}

              <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:items-start lg:gap-6">
                <span
                  className={`${GREEN_BAR} hero-anim lg:shrink-0 lg:whitespace-nowrap`}
                  style={
                    {
                      ...GREEN_BAR_STYLE,
                      "--hero-delay": `${(lines.length - 1) * 90}ms`,
                    } as React.CSSProperties
                  }
                >
                  {lines[lines.length - 1]}
                </span>

                <div
                  aria-hidden={false}
                  className="hero-anim w-full rounded-2xl bg-cream p-6 font-sans shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)] lg:w-auto lg:min-w-0 lg:flex-1 lg:max-w-[34rem] lg:p-7"
                  style={
                    {
                      fontStretch: "normal",
                      "--hero-delay": `${lines.length * 90 + 140}ms`,
                    } as React.CSSProperties
                  }
                >
                  <p className="font-sans text-[16px] font-normal leading-[1.6] tracking-normal text-mid lg:text-[17px]">
                    {copy}
                  </p>
                  {children && (
                    <div className="mt-6 flex flex-wrap gap-3">{children}</div>
                  )}
                </div>
              </div>
            </div>
          </HeroParallax>
        </div>
      </div>
    </section>
  );
}
