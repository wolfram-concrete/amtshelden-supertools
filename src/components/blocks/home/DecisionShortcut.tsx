import Link from "next/link";
import {
  Target,
  UsersRound,
  ClipboardCheck,
  Zap,
  TriangleAlert,
  Mail,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { decisionExample } from "@/mocks/decision";

const iconMap: Record<string, LucideIcon> = {
  Target,
  UsersRound,
  ClipboardCheck,
  Zap,
  TriangleAlert,
  Mail,
};

interface DecisionShortcutProps {
  eyebrow: string;
  title: string;
  lead?: string;
}

/**
 * Die Entscheidungsabkürzung — beantwortet die 6 Entscheidungsfragen an einem
 * konkreten, geprüften Tool. Macht den Kernnutzen sichtbar: schneller
 * einschätzen, statt Anbieter sammeln. „Was fehlt noch?" gelb hervorgehoben
 * (Ehrlichkeit als USP).
 */
export function DecisionShortcut({ eyebrow, title, lead }: DecisionShortcutProps) {
  const ex = decisionExample;

  return (
    <section className="bg-cream py-10 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <header className="max-w-2xl space-y-3 mb-7 lg:mb-9">
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(28px,3.4vw,42px)] font-normal leading-[1.05] tracking-tight text-dark">
            {title}
          </h2>
          {lead && (
            <p className="font-sans text-[15px] leading-[1.65] text-mid">{lead}</p>
          )}
        </header>

        {/* Entscheidungs-Karte */}
        <div className="overflow-hidden rounded-[2rem] border border-border bg-white">
          {/* Tool-Kopf */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-border px-6 py-5 lg:px-8">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-dark font-ui text-[14px] font-semibold text-white">
              {ex.toolMark}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-serif text-[20px] font-normal text-dark">
                  {ex.toolName}
                </span>
                {ex.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-0.5 font-ui text-[11px] font-semibold text-brand-dark">
                    <BadgeCheck size={13} aria-hidden />
                    Verifiziert
                  </span>
                )}
              </div>
              <div className="mt-0.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.08em] text-soft">
                {ex.category}
              </div>
            </div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-soft text-right leading-tight">
              geprüft am
              <br />
              {ex.lastChecked}
            </div>
          </div>

          <div className="px-6 py-6 lg:px-8 lg:py-7">
            {/* Szenario */}
            <p className="mb-5 flex items-center gap-2 font-sans text-[13.5px] text-mid">
              <MapPin size={15} aria-hidden className="flex-shrink-0 text-soft" />
              {ex.scenario}
            </p>

            {/* 6 Fragen */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ex.questions.map((q) => {
                const Icon = iconMap[q.icon] ?? Target;
                const isGap = q.tone === "gap";
                const isNext = q.tone === "next";
                return (
                  <div
                    key={q.num}
                    className={cn(
                      "flex flex-col rounded-2xl p-4",
                      isGap
                        ? "bg-accent/10 ring-1 ring-inset ring-accent/40"
                        : "bg-cream",
                    )}
                  >
                    <div
                      className={cn(
                        "mb-2 flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.07em]",
                        isGap ? "text-accent-ink" : "text-mid",
                      )}
                    >
                      <Icon
                        size={14}
                        aria-hidden
                        className={isGap ? "text-accent-ink" : "text-brand"}
                      />
                      {q.num} · {q.label}
                    </div>
                    <p className="font-sans text-[13.5px] leading-[1.5] text-dark">
                      {q.answer}
                    </p>
                    {isNext && (
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <span className="font-ui text-[13px] font-semibold text-dark">
                          {ex.price}
                        </span>
                        <Link
                          href={ex.ctaHref}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-dark px-3.5 py-2 font-ui text-[12.5px] font-semibold text-white transition-colors hover:bg-brand"
                        >
                          Unverbindlich anfragen
                          <ArrowRight size={14} aria-hidden />
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Fußzeile */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
              <span className="font-sans text-[12.5px] text-soft">
                So ist jedes Profil aufgebaut — kein Ranking, keine Sterne.
              </span>
              <Link
                href={`/tools/${ex.toolSlug}`}
                className="inline-flex items-center gap-1.5 font-ui text-[12.5px] font-semibold text-brand-dark transition-colors hover:text-brand"
              >
                Vollständiges Profil ansehen
                <ArrowUpRight size={14} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
