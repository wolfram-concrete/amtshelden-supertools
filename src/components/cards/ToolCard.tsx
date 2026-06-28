import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn, formatDateDEShort } from "@/lib/utils";
import type { ToolCardSummary } from "@/types/content";

interface ToolCardProps {
  tool: ToolCardSummary;
  className?: string;
  /**
   * - "row"     = kompakte 2-Zeilen-Listenzeile (Kategorie-Seite, ~80-90px Höhe)
   * - "tile"    = quadratisches 3-Spalten-Grid-Item (alternative Listenform)
   * - "list"    = breite Vertikal-Card (Sidebar / Featured-Side)
   * - "feature" = großes Spotlight (Startseite Featured Tool)
   */
  variant?: "row" | "list" | "feature" | "tile";
}

export function ToolCard({ tool, className, variant = "list" }: ToolCardProps) {
  if (variant === "row") {
    return <RowItem tool={tool} className={className} />;
  }
  if (variant === "tile") {
    return <TileCard tool={tool} className={className} />;
  }
  return <ExtendedCard tool={tool} className={className} variant={variant} />;
}

// ============================================================
// ROW — Kompakte Listenzeile für die Kategorie-Tool-Übersicht
// Two-Line-Layout: Mark · Hauptinfo · Meta-Spalte rechts · Chevron
// ============================================================
function RowItem({
  tool,
  className,
}: {
  tool: ToolCardSummary;
  className?: string;
}) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        "group flex flex-col gap-5 rounded-2xl bg-white p-5 transition-shadow hover:shadow-[0_22px_55px_-30px_rgba(17,17,17,0.28)] sm:flex-row sm:items-center sm:gap-6 lg:p-6",
        className,
      )}
    >
      {/* Mark + Hauptinfo */}
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <span
          aria-hidden
          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-white font-ui text-[16px] font-extrabold tracking-tight"
          style={{ background: tool.markBg || "var(--color-brand)" }}
        >
          {tool.mark}
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="font-serif text-[22px] font-normal leading-tight text-dark transition-colors group-hover:text-brand-dark lg:text-[25px]">
              {tool.name}
            </h3>
            {tool.verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-light px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-brand-dark">
                ✓ Verifiziert
              </span>
            )}
          </div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-soft">
            {tool.provider}
          </div>
          <p className="mt-2.5 font-sans text-[15px] leading-[1.6] text-mid line-clamp-2 max-w-2xl">
            {tool.pitch}
          </p>
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {tool.compliance.dsgvo && <RowPill>DSGVO</RowPill>}
            {tool.compliance.serverDe && <RowPill>Server DE</RowPill>}
            {tool.compliance.bsi && <RowPill>BSI</RowPill>}
            {tool.compliance.vergabe && <RowPill>Vergabe</RowPill>}
          </div>
        </div>
      </div>

      {/* Facts + CTA */}
      <div className="flex flex-shrink-0 items-end justify-between gap-4 border-t border-border pt-4 sm:w-[220px] sm:flex-col sm:items-end sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
        <div className="sm:text-right">
          <div className="font-serif text-[20px] font-normal leading-none text-dark">
            {tool.facts.price || "auf Anfrage"}
          </div>
          <div className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-soft">
            {[tool.facts.operation, tool.facts.setup]
              .filter(Boolean)
              .join(" · ")}
          </div>
          {tool.lastCheckedAt && (
            <div className="mt-1.5 font-ui text-[11px] italic text-soft">
              geprüft {formatDateDEShort(tool.lastCheckedAt)}
            </div>
          )}
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-cream px-4 py-2.5 font-ui text-[13px] font-semibold text-brand-dark transition-colors group-hover:bg-brand-light">
          Profil
          <ChevronRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}

function RowPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-brand/15 bg-brand-light/50 px-2 py-0.5 font-ui text-[10.5px] font-medium text-brand-dark">
      ✓ {children}
    </span>
  );
}

// ============================================================
// TILE — Kompakte Card für 3-Spalten-Grid auf Kategorie-Seiten
// ============================================================
function TileCard({
  tool,
  className,
}: {
  tool: ToolCardSummary;
  className?: string;
}) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        "group flex h-full flex-col rounded-xl border border-border bg-white p-5 transition-colors hover:border-brand/60",
        className,
      )}
    >
      {/* Header: Mark + Name + Verified */}
      <div className="flex items-start gap-3">
        <div
          aria-hidden
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-white font-ui text-[12px] font-extrabold tracking-tight"
          style={{ background: tool.markBg || "var(--color-brand)" }}
        >
          {tool.mark}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-[17px] font-normal leading-[1.15] text-dark group-hover:text-brand-dark transition-colors">
              {tool.name}
            </h3>
            {tool.verified && (
              <Badge variant="verified" size="sm" className="flex-shrink-0">
                ✓
              </Badge>
            )}
          </div>
          <div className="font-ui text-[10.5px] text-soft truncate mt-0.5">
            {tool.provider}
          </div>
        </div>
      </div>

      {/* Pitch — fixed Height via line-clamp für einheitliche Cards */}
      <p className="mt-4 font-sans text-[13.5px] leading-[1.55] text-mid line-clamp-3 flex-1">
        {tool.pitch}
      </p>

      {/* Footer: 1 Zeile Quick-Facts + Compliance-Pills */}
      <div className="mt-4 pt-4 border-t border-border space-y-2.5">
        <div className="font-ui text-[11px] text-mid leading-tight">
          <span className="font-semibold text-dark">
            {tool.facts.price || "Preis auf Anfrage"}
          </span>
          {tool.facts.operation && (
            <>
              <span className="text-soft mx-1.5" aria-hidden>
                ·
              </span>
              <span>{tool.facts.operation}</span>
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          {tool.compliance.dsgvo && <TilePill>DSGVO</TilePill>}
          {tool.compliance.serverDe && <TilePill>Server DE</TilePill>}
          {tool.compliance.bsi && <TilePill>BSI C5</TilePill>}
          {tool.compliance.vergabe && <TilePill>Vergabe</TilePill>}
        </div>
      </div>
    </Link>
  );
}

function TilePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-0.5 rounded-full bg-brand-light/60 px-1.5 py-0.5 font-ui text-[9.5px] font-medium text-brand-dark border border-brand/15">
      <span aria-hidden>✓</span>
      {children}
    </span>
  );
}

// ============================================================
// EXTENDED — list / feature (bisheriges Layout)
// ============================================================
function ExtendedCard({
  tool,
  className,
  variant,
}: {
  tool: ToolCardSummary;
  className?: string;
  variant: "list" | "feature";
}) {
  const isFeature = variant === "feature";

  return (
    <article
      className={cn(
        "group rounded-2xl border border-border bg-white transition-colors hover:border-brand/60",
        isFeature ? "p-6 lg:p-8" : "p-5 lg:p-6",
        className,
      )}
    >
      <Link href={`/tools/${tool.slug}`} className="block">
        <div className="flex items-start gap-4">
          <div
            aria-hidden
            className={cn(
              "flex-shrink-0 rounded-xl flex items-center justify-center text-white font-ui font-extrabold tracking-tight",
              isFeature ? "h-14 w-14 text-base" : "h-11 w-11 text-sm",
            )}
            style={{ background: tool.markBg || "var(--color-brand)" }}
          >
            {tool.mark}
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                className={cn(
                  "font-serif font-normal leading-tight text-dark group-hover:text-brand-dark transition-colors",
                  isFeature ? "text-[26px]" : "text-[20px]",
                )}
              >
                {tool.name}
              </h3>
              {tool.verified && (
                <Badge variant="verified" size="sm">
                  ✓ Verifiziert
                </Badge>
              )}
            </div>
            <div className="font-ui text-[11px] text-soft">{tool.provider}</div>
          </div>
        </div>

        <p
          className={cn(
            "font-sans leading-[1.65] text-mid",
            isFeature ? "mt-5 text-[16px]" : "mt-4 text-[14px]",
          )}
        >
          {tool.pitch}
        </p>

        <dl className="mt-5 grid grid-cols-3 gap-4 pt-4 border-t border-border">
          {tool.facts.price && <Fact label="Preis" value={tool.facts.price} />}
          {tool.facts.setup && (
            <Fact label="Einführung" value={tool.facts.setup} />
          )}
          {tool.facts.operation && (
            <Fact label="Betrieb" value={tool.facts.operation} />
          )}
        </dl>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {tool.compliance.dsgvo && <CompliancePill>DSGVO</CompliancePill>}
          {tool.compliance.serverDe && (
            <CompliancePill>Server Deutschland</CompliancePill>
          )}
          {tool.compliance.bsi && <CompliancePill>BSI C5</CompliancePill>}
          {tool.compliance.vergabe && (
            <CompliancePill>UVgO/VOL-A</CompliancePill>
          )}
        </div>
      </Link>
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-soft">
        {label}
      </dt>
      <dd className="font-ui text-[12px] font-semibold text-dark mt-1 truncate">
        {value}
      </dd>
    </div>
  );
}

function CompliancePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-brand-light/60 px-2 py-0.5 font-ui text-[10px] font-medium text-brand-dark border border-brand/15">
      <span aria-hidden>✓</span>
      {children}
    </span>
  );
}
