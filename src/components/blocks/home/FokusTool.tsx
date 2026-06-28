import Link from "next/link";
import { ArrowUpRight, BadgeCheck, ExternalLink, Info } from "lucide-react";

import { GeprueftBadge } from "@/components/ui/GeprueftBadge";
import { publicPitch } from "@/lib/crawler-content";
import {
  crawlerToolCardPreview,
  crawlerToolLogoPreview,
} from "@/mocks/tools/crawler-preview";

interface FokusToolProps {
  eyebrow: string;
  title: string;
  /** Slug des hervorgehobenen (echten) Crawler-Tools */
  slug: string;
  /** Belegbare Kurzbeschreibung: Was ist das Tool? */
  was: string;
  /** Belegbare Behörden-Relevanz (Kontext, KEIN redaktionelles Urteil) */
  einordnung: string;
}

function SignalPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-brand/15 bg-brand-light/60 px-2.5 py-1 font-ui text-[11px] font-medium text-brand-dark">
      <BadgeCheck size={12} aria-hidden />
      {children}
    </span>
  );
}

/**
 * Tool im Fokus — EIN echtes, freigegebenes Crawler-Tool prominent.
 *
 * Ehrlich: zeigt nur belegbare Daten (Pitch, Compliance, Quelle) und eine
 * faktische Einordnung der Behörden-Relevanz — KEIN erfundenes redaktionelles
 * Urteil. Klar als „Crawler-Freigabe, Prüfung läuft" markiert.
 */
export function FokusTool({
  eyebrow,
  title,
  slug,
  was,
  einordnung,
}: FokusToolProps) {
  const tool = crawlerToolCardPreview.find((t) => t.slug === slug);
  if (!tool) return null;

  const logo = crawlerToolLogoPreview[slug];
  const pitch = publicPitch(tool.pitch);

  return (
    <section className="bg-cream py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          {/* Links: faktische Einordnung */}
          <div data-reveal className="space-y-5 lg:sticky lg:top-24">
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              {eyebrow}
            </div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-normal leading-[1.05] tracking-tight text-dark">
              {title}
            </h2>
            <p className="font-sans text-[16px] leading-[1.7] text-mid">{was}</p>
            <div className="border-l-2 border-brand py-1 pl-5">
              <div className="mb-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
                Einordnung
              </div>
              <p className="font-serif text-[18px] italic leading-[1.5] text-dark">
                {einordnung}
              </p>
            </div>
          </div>

          {/* Rechts: echtes Tool */}
          <div
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-6 lg:p-8"
          >
            <div className="flex items-start gap-4">
              <span
                className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border"
                style={{
                  background:
                    logo?.backgroundColor || tool.markBg || "var(--color-brand)",
                }}
              >
                {logo?.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logo.logoUrl}
                    alt={`${tool.name} Logo`}
                    className="h-11 w-11 rounded-lg object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="font-ui text-[16px] font-extrabold text-white">
                    {tool.mark}
                  </span>
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-serif text-[24px] font-normal text-dark">
                    {tool.name}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent-ink">
                    Crawler-Freigabe
                  </span>
                </div>
                <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-soft">
                  {tool.provider}
                </div>
              </div>
            </div>

            {pitch && (
              <p className="mt-5 font-sans text-[15px] leading-[1.6] text-mid">
                {pitch}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-1.5">
              {tool.compliance.dsgvo && <SignalPill>DSGVO</SignalPill>}
              {tool.compliance.serverDe && <SignalPill>Server DE</SignalPill>}
              {tool.compliance.bsi && <SignalPill>BSI</SignalPill>}
              {tool.compliance.vergabe && <SignalPill>Vergabe</SignalPill>}
            </div>

            {tool.lastCheckedAt && (
              <div className="mt-5">
                <GeprueftBadge date={tool.lastCheckedAt} label="Crawler-Stand" />
              </div>
            )}
            <p className="mt-3 flex items-start gap-2 font-ui text-[12px] leading-[1.5] text-soft">
              <Info size={14} className="mt-0.5 flex-shrink-0" aria-hidden />
              Automatisch erfasste Signale aus dem Crawler-Lauf — die vollständige
              redaktionelle Prüfung steht noch aus.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
              <Link
                href={`/tools/${tool.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand-dark px-5 py-2.5 font-ui text-[13px] font-semibold text-white transition-colors hover:bg-brand"
              >
                Vollständiges Profil
                <ArrowUpRight size={15} aria-hidden />
              </Link>
              {logo?.website && (
                <a
                  href={logo.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-5 py-2.5 font-ui text-[13px] font-semibold text-dark transition-colors hover:border-brand hover:text-brand-dark"
                >
                  Anbieter-Website
                  <ExternalLink size={14} aria-hidden />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
