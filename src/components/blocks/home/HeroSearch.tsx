"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";

/**
 * Funktionale Such-Maske als Startseiten-Hero.
 * Neuer plakativer Ansatz (Christian-Call 30.09.2026, Airbnb-DNA): weißer Grund,
 * fette Sans-Headline statt Editorial-Serif, große Such-Maske, keine Fotos, keine
 * Ablenkung. Die Maske führt sofort in den Nutzen: suchen → /suche.
 */
const HAEUFIGE_SUCHEN = [
  "Projektmanagement",
  "Social Media",
  "Protokollierung",
  "Mitarbeiter-App",
  "Recruiting",
  "Bürgerdialog",
];

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/suche?q=${encodeURIComponent(term)}` : "/suche");
  }

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-12 lg:pt-28 lg:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-sans font-bold text-[clamp(40px,6.5vw,76px)] leading-[1.02] tracking-[-0.03em] text-dark">
            Welche Software passt zu Ihrer Verwaltung?
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-[18px] lg:text-[20px] leading-[1.5] text-mid">
            Ein Suchfeld, klare Bereiche, ehrliche Angaben — in Sekunden zum
            passenden Tool.
          </p>

          <form
            onSubmit={submit}
            className="mx-auto mt-10 flex max-w-2xl items-center gap-2 rounded-full border border-border bg-white p-2 shadow-[0_14px_34px_-20px_rgba(0,0,0,0.45)] transition-colors focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10"
          >
            <Search
              size={22}
              className="ml-4 flex-shrink-0 text-soft"
              aria-hidden
            />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="z. B. Projektmanagement, Chatbot, E-Akte"
              aria-label="Software suchen"
              className="min-w-0 flex-1 bg-transparent py-3.5 font-sans text-[16px] text-dark placeholder:text-soft outline-none"
            />
            <button
              type="submit"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-sans text-[15px] font-bold text-white transition-colors hover:bg-brand-dark"
            >
              Suchen
              <ArrowRight size={17} aria-hidden />
            </button>
          </form>

          <div className="mx-auto mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-2">
            <span className="font-sans text-[14px] font-medium text-soft">
              Häufig gesucht:
            </span>
            {HAEUFIGE_SUCHEN.map((term) => (
              <Link
                key={term}
                href={`/suche?q=${encodeURIComponent(term)}`}
                className="inline-flex items-center rounded-full bg-cream px-4 py-2 font-sans text-[14px] font-semibold text-mid transition-colors hover:bg-brand-light hover:text-brand-dark"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
