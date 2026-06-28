import Image from "next/image";
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
 * geprüften Tool. Plakativ: Serif-Fragen, grünes „Geprüft"-Eckmodul, grüne
 * Aktions-Kachel, „Was fehlt noch?" gelb (Ehrlichkeit als USP).
 */
export function DecisionShortcut({
  eyebrow,
  title,
  lead,
}: DecisionShortcutProps) {
  const ex = decisionExample;

  return (
    <section className="bg-cream py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <header data-reveal className="max-w-5xl space-y-4 mb-8 lg:mb-11">
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(30px,3.8vw,46px)] font-normal leading-[1.04] tracking-tight text-dark">
            {title}
          </h2>
          {lead && (
            <p className="max-w-2xl font-sans text-[16px] leading-[1.6] text-mid">
              {lead}
            </p>
          )}
        </header>

        {/* Entscheidungs-Karte */}
        <div
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          className="relative overflow-hidden rounded-[2rem] border border-border bg-white"
        >
          {/* Geprüft am — grünes Eckmodul (in die Radien geschmiegt) */}
          <div className="absolute right-0 top-0 z-10 flex flex-col items-end rounded-bl-2xl bg-brand px-4 py-2.5 text-white sm:px-5 sm:py-3">
            <span className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white/85">
              <BadgeCheck size={12} aria-hidden /> Geprüft am
            </span>
            <span className="font-ui text-[15px] font-bold leading-tight sm:text-[17px]">
              {ex.lastChecked}
            </span>
          </div>

          {/* Tool-Kopf */}
          <div className="flex items-center gap-4 border-b border-border px-6 py-6 pr-32 sm:pr-44 lg:px-8">
            {ex.logoUrl ? (
              <span className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-2xl border border-border bg-white">
                <Image
                  src={ex.logoUrl}
                  alt={ex.toolName}
                  fill
                  sizes="56px"
                  className="object-contain p-1.5"
                />
              </span>
            ) : (
              <span
                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl font-ui text-[18px] font-semibold text-white"
                style={{ background: ex.markBg || "var(--color-brand)" }}
              >
                {ex.toolMark}
              </span>
            )}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-serif text-[24px] font-normal leading-none text-dark">
                  {ex.toolName}
                </span>
                {ex.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-0.5 font-ui text-[11px] font-semibold text-brand-dark">
                    <BadgeCheck size={13} aria-hidden />
                    Verifiziert
                  </span>
                )}
              </div>
              <div className="mt-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-soft">
                {ex.category}
              </div>
            </div>
          </div>

          <div className="px-6 py-7 lg:px-8 lg:py-8">
            {/* Ausgangslage */}
            <p className="mb-6 flex items-start gap-2.5 font-sans text-[15px] leading-[1.5] text-mid">
              <MapPin
                size={18}
                aria-hidden
                className="mt-0.5 flex-shrink-0 text-brand"
              />
              <span>
                <span className="font-semibold text-dark">Ausgangslage:</span>{" "}
                {ex.scenario}
              </span>
            </p>

            {/* 6 Fragen */}
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {ex.questions.map((q) => {
                const Icon = iconMap[q.icon] ?? Target;
                const isGap = q.tone === "gap";
                const isNext = q.tone === "next";
                return (
                  <div
                    key={q.num}
                    className={cn(
                      "flex flex-col rounded-2xl p-5",
                      isNext
                        ? "bg-brand-dark text-white"
                        : isGap
                          ? "bg-accent/15 ring-1 ring-inset ring-accent/40"
                          : "bg-cream",
                    )}
                  >
                    <div className="mb-2.5 flex items-center gap-2">
                      <Icon
                        size={18}
                        aria-hidden
                        className={
                          isNext
                            ? "text-accent"
                            : isGap
                              ? "text-accent-ink"
                              : "text-brand"
                        }
                      />
                      <span
                        className={cn(
                          "font-mono text-[11px] font-bold uppercase tracking-[0.1em]",
                          isNext
                            ? "text-white/65"
                            : isGap
                              ? "text-accent-ink/70"
                              : "text-soft",
                        )}
                      >
                        {q.num}
                      </span>
                    </div>
                    <h3
                      className={cn(
                        "mb-2 font-serif text-[19px] font-normal leading-[1.12]",
                        isNext ? "text-white" : "text-dark",
                      )}
                    >
                      {q.label}
                    </h3>
                    <p
                      className={cn(
                        "font-sans text-[14.5px] leading-[1.55]",
                        isNext
                          ? "text-white/85"
                          : isGap
                            ? "text-dark"
                            : "text-mid",
                      )}
                    >
                      {q.answer}
                    </p>
                    {isNext && (
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="font-ui text-[16px] font-bold text-white">
                          {ex.price}
                        </span>
                        <Link
                          href={ex.ctaHref}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 font-ui text-[12.5px] font-semibold text-brand-dark transition-colors hover:bg-cream"
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
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
              <span className="font-sans text-[13px] text-soft">
                So ist jedes Profil aufgebaut — kein Ranking, keine Sterne.
              </span>
              <Link
                href={`/tools/${ex.toolSlug}`}
                className="inline-flex items-center gap-1.5 font-ui text-[13px] font-semibold text-brand-dark transition-colors hover:text-brand"
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
