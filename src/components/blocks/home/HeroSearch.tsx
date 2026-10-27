"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, FileText, MessageSquare, Search, Users } from "lucide-react";

/** Glas-Sprechblase im Logo-Balken-Stil (grün, Zacken nach unten), über Köpfen.
 *  Zacken-Seite (`tail`) zeigt zur jeweiligen Person. */
function Bubble({
  icon: Icon,
  label,
  className,
  tail = "left",
}: {
  icon: typeof Search;
  label: string;
  className?: string;
  tail?: "left" | "right";
}) {
  return (
    <div className={`absolute z-20 hidden lg:block ${className ?? ""}`}>
      <div className="relative inline-flex items-center gap-2 rounded-xl bg-[rgba(0,148,96,0.86)] px-3.5 py-2 text-white shadow-[0_16px_34px_-16px_rgba(0,0,0,0.65)] ring-1 ring-white/25 backdrop-blur-md">
        <Icon size={14} className="flex-shrink-0 text-white/90" aria-hidden />
        <span className="whitespace-nowrap font-sans text-[12.5px] font-semibold">
          {label}
        </span>
        <span
          aria-hidden
          className={`absolute -bottom-[7px] h-0 w-0 border-l-[7px] border-r-[7px] border-t-[8px] border-l-transparent border-r-transparent ${
            tail === "right" ? "right-6" : "left-6"
          }`}
          style={{ borderTopColor: "rgba(0,148,96,0.86)" }}
        />
      </div>
    </div>
  );
}

// Sprechblasen-Variante (A/B): true zeigt die Glas-Bubbles über den Köpfen.
const SHOW_BUBBLES = true;

/**
 * Hero als Schaltpult: großflächiges, voll aufgezogenes AMS-Verwaltungsmotiv,
 * dunkler entsättigter Tannengrün-Film darüber, die Suche mittelachsig als das
 * eine zentrale Instrument. Text maximal komprimiert (CONCRETE / Wolfram 26.10.).
 */
const HAEUFIGE_SUCHEN = [
  "Projektmanagement",
  "Social Media",
  "Protokollierung",
  "Mitarbeiter-App",
  "Recruiting",
  "Bürgerdialog",
];

// Realfoto-Motiv (Wolfram 27.10., Magnific, 2048×1536): echtes Großraumbüro
// einer Verwaltung, stehendes Paar mit Tablet links, Dreiergruppe am Laptop
// rechts, ruhige freie Bildmitte für Headline + Suche. Desktop zeigt das volle
// Band; mobil fokussiert object-position die arbeitende Dreiergruppe rechts
// statt leerer Wand. Die früheren KI-Fassungen (hero-verwaltung-quadrat.jpg /
// hero-verwaltung.jpg) liegen als Reserve bereit.
const HERO_IMAGE = "/brand/generated/hero-verwaltung-foto.jpg";

// Grüner Headline-Balken im Logo-Trägerstil, mit feiner entsättigter Grain-
// Textur über einem leichten Grün-Verlauf (soft-light), für etwas Leben.
const GREEN_BAR =
  "box-decoration-clone inline-block rounded-xl px-5 py-2.5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_14px_30px_-16px_rgba(0,0,0,0.5)]";
const GREEN_BAR_STYLE: React.CSSProperties = {
  // Flaches Mastergrün #009460 (= Suchen-Button), KEIN Gradient/Verlauf im
  // Container; nur eine feine entsättigte Körnung. Die glossy Kante kommt über
  // den inset-Highlight im Shadow.
  backgroundColor: "#009460",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
  backgroundBlendMode: "soft-light",
};

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/suche?q=${encodeURIComponent(term)}` : "/suche");
  }

  return (
    <section className="relative -mt-20 flex min-h-[100svh] w-full items-center justify-center overflow-hidden rounded-b-[2.5rem] pt-20">
      {/* Bild-Bühne voll aufgezogen — quadratischer Master trägt beide
          Richtungen: Desktop zeigt das horizontale Band (Menschen links + rechts,
          ruhige Wandmitte), Mobil den vertikalen Anschnitt mit Menschen. */}
      <Image
        src={HERO_IMAGE}
        alt="Blick in eine moderne Verwaltung bei der Arbeit"
        fill
        sizes="100vw"
        className="object-cover object-[76%_center] md:object-center"
        priority
      />

      {/* Weicher Verlauf nur am oberen Rand — hält die weiße Navi + das Logo
          über dem hellen Fensterlicht lesbar, ohne das Realfoto zu verfilmen. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-36 bg-gradient-to-b from-black/35 to-transparent"
      />

      {SHOW_BUBBLES && (
        <>
          {/* stehendes Paar mit Tablet (links) */}
          <Bubble
            icon={Users}
            label="Fachverfahren vergleichen"
            className="left-[11%] top-[14%]"
            tail="left"
          />
          {/* Frau vorne am Monitor (links unten) */}
          <Bubble
            icon={FileText}
            label="E-Akte vergleichen"
            className="left-[2%] top-[47%]"
            tail="left"
          />
          {/* Dreiergruppe am Laptop (rechts) */}
          <Bubble
            icon={MessageSquare}
            label="Chatbot für Bürgerdialog"
            className="right-[6%] top-[20%]"
            tail="right"
          />
        </>
      )}

      {/* Schaltpult, mittelachsig */}
      <div className="relative z-10 w-full max-w-3xl px-6 text-center">
        {/* Headline auf grünen Balken, Zeile für Zeile — angelehnt an das
            Logo-Trägerelement (abgerundet, kleine Lücke), ohne Sprechblasenzacken.
            Feine Grain-/Verlaufs-Textur im Grün für etwas Leben. */}
        <h1
          style={{ fontStretch: "110%" }}
          className="font-display flex flex-col items-center gap-2.5 text-[clamp(27px,4.5vw,53px)] leading-[1.06]"
        >
          <span className={GREEN_BAR} style={GREEN_BAR_STYLE}>
            Welche Software passt
          </span>
          <span className={GREEN_BAR} style={GREEN_BAR_STYLE}>
            zu Ihrer Verwaltung?
          </span>
        </h1>

        <form
          onSubmit={submit}
          className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-xl bg-white p-2 shadow-[0_30px_70px_-26px_rgba(0,0,0,0.7)] transition focus-within:ring-4 focus-within:ring-white/30"
        >
          <Search size={22} className="ml-4 flex-shrink-0 text-soft" aria-hidden />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="z. B. Projektmanagement, Chatbot, E-Akte"
            aria-label="Software suchen"
            className="min-w-0 flex-1 bg-transparent py-3 font-sans text-[16px] text-dark placeholder:text-soft outline-none"
          />
          <button
            type="submit"
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-sans text-[15px] font-bold text-white transition-colors hover:bg-brand-dark"
          >
            Suchen
            <ArrowRight size={17} aria-hidden />
          </button>
        </form>

        <div className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-2">
          {HAEUFIGE_SUCHEN.map((term) => (
            <Link
              key={term}
              href={`/suche?q=${encodeURIComponent(term)}`}
              className="inline-flex items-center rounded-xl border border-white/25 bg-white/10 px-3.5 py-1.5 font-sans text-[13px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
