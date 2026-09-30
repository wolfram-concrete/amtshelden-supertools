"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";

/**
 * Funktionale Such-Maske als Startseiten-Hero (Christian-Call 30.09.2026:
 * Airbnb-Standard — rein funktional, keine großen Fotos, keine Ablenkung).
 * Die Maske führt sofort in den Nutzen: suchen → /suche. Darunter folgen
 * direkt die konkreten Kategorien.
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
    <section className="bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-14 pb-10 lg:pt-24 lg:pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-[clamp(34px,5vw,60px)] font-normal leading-[1.05] tracking-tight text-dark">
            Die passende Software für Ihre Verwaltung.
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-sans text-[16px] lg:text-[18px] leading-[1.6] text-mid">
            Suchen Sie nach Aufgabe, Tool-Art oder Anbieter. Wir zeigen passende
            Produkte und ordnen ein, was öffentlich auffindbar ist und was fehlt.
          </p>

          <form
            onSubmit={submit}
            className="mx-auto mt-8 flex max-w-2xl items-center gap-2 rounded-2xl border border-border bg-white p-2 shadow-[0_24px_60px_-34px_rgba(0,0,0,0.4)] transition-colors focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20"
          >
            <Search
              size={20}
              className="ml-3 flex-shrink-0 text-soft"
              aria-hidden
            />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Wonach suchen Sie? z. B. Projektmanagement, Chatbot, E-Akte"
              aria-label="Software suchen"
              className="min-w-0 flex-1 bg-transparent py-3 font-sans text-[15px] text-dark placeholder:text-soft outline-none"
            />
            <button
              type="submit"
              className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-xl bg-brand-dark px-5 py-3 font-ui text-[14px] font-semibold text-white transition-colors hover:bg-brand"
            >
              Suchen
              <ArrowRight size={16} aria-hidden />
            </button>
          </form>

          <div className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-1.5">
            <span className="font-sans text-[13px] text-soft">
              Häufig gesucht:
            </span>
            {HAEUFIGE_SUCHEN.map((term) => (
              <Link
                key={term}
                href={`/suche?q=${encodeURIComponent(term)}`}
                className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 font-ui text-[12.5px] font-medium text-mid transition-colors hover:border-brand hover:text-brand-dark"
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
