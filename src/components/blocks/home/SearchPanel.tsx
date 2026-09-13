"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { directoryCategories } from "@/data/directory";

/**
 * Suche-first-Panel für die Startseite (Christian-Briefing §5).
 * Großes Suchfeld vorne, darunter häufige Suchen (konkrete Tool-Arten) und
 * die Kategorien als schnelle Einstiege. Die Nutzerführung läuft über
 * konkrete Bedarfe, nicht über die großen Amtshelden-Themenfelder.
 */
const HAEUFIGE_SUCHEN = [
  "Projektmanagement",
  "Social Media",
  "Protokollierung",
  "Mitarbeiter-App",
  "Recruiting",
  "Bürgerdialog",
];

interface SearchPanelProps {
  className?: string;
}

export function SearchPanel({ className }: SearchPanelProps) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/suche?q=${encodeURIComponent(term)}` : "/suche");
  }

  return (
    <div
      className={cn(
        "rounded-2xl bg-white/95 p-6 backdrop-blur-lg ring-1 ring-black/5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)] lg:p-7",
        className,
      )}
    >
      <div className="mb-3 font-sans text-[14px] font-semibold text-brand">
        Software für Ihre Aufgabe finden
      </div>

      <form onSubmit={submit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-soft"
            aria-hidden
          />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Wonach suchen Sie? z. B. Projektmanagement, Chatbot, E-Akte"
            aria-label="Software suchen"
            className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-3 font-sans text-[14px] text-dark placeholder:text-soft outline-none focus:border-brand focus:ring-2 focus:ring-brand/25"
          />
        </div>
        <button
          type="submit"
          className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-xl bg-brand-dark px-4 py-3 font-ui text-[13px] font-semibold text-white transition-colors hover:bg-brand"
        >
          Suchen
          <ArrowRight size={15} aria-hidden />
        </button>
      </form>

      {/* Häufige Suchen — konkrete Tool-Arten */}
      <div className="mt-5">
        <div className="mb-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-soft">
          Häufig gesucht
        </div>
        <div className="flex flex-wrap gap-1.5">
          {HAEUFIGE_SUCHEN.map((term) => (
            <Link
              key={term}
              href={`/suche?q=${encodeURIComponent(term)}`}
              className="inline-flex items-center rounded-full border border-border bg-cream px-3 py-1.5 font-ui text-[12.5px] font-medium text-mid transition-colors hover:border-brand hover:text-brand-dark"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>

      {/* Kategorien */}
      <div className="mt-4 border-t border-border pt-4">
        <div className="mb-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-soft">
          Oder nach Kategorie
        </div>
        <div className="flex flex-wrap gap-1.5">
          {directoryCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/kategorien/${c.slug}`}
              className="inline-flex items-center rounded-full bg-brand-light/70 px-3 py-1.5 font-ui text-[12.5px] font-medium text-brand-dark transition-colors hover:bg-brand-light"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
