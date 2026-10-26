"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";

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

const HERO_IMAGE = "/brand/generated/hero-verwaltung.jpg";

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/suche?q=${encodeURIComponent(term)}` : "/suche");
  }

  return (
    <section className="relative -mt-20 flex min-h-[640px] w-full items-center justify-center overflow-hidden pt-20 lg:min-h-[800px]">
      {/* Bild-Bühne voll aufgezogen */}
      <Image
        src={HERO_IMAGE}
        alt="Blick in eine moderne Verwaltung bei der Arbeit"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      {/* Entsättigter Tannengrün-Film, mittig stärker für zentrierte Lesbarkeit */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 46%, rgba(9,26,18,0.60) 0%, rgba(9,26,18,0.74) 55%, rgba(9,26,18,0.88) 100%)",
        }}
      />

      {/* Schaltpult, mittelachsig */}
      <div className="relative z-10 w-full max-w-2xl px-6 text-center">
        <h1 className="mx-auto font-sans font-bold text-[clamp(32px,5vw,58px)] leading-[1.05] tracking-[-0.03em] text-white text-balance">
          Welche Software passt zu Ihrer Verwaltung?
        </h1>

        <form
          onSubmit={submit}
          className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-full bg-white p-2 shadow-[0_30px_70px_-26px_rgba(0,0,0,0.7)] transition focus-within:ring-4 focus-within:ring-white/30"
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
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-sans text-[15px] font-bold text-white transition-colors hover:bg-brand-dark"
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
              className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 font-sans text-[13px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
