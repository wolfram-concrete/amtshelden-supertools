import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ToolCardSummary } from "@/types/content";

interface ToolCardProps {
  tool: ToolCardSummary;
  className?: string;
  /** "list" = breite Vertikal-Card · "feature" = großes Spotlight · "tile" = kompaktes 3-Spalten-Grid */
  variant?: "list" | "feature" | "tile";
}

export function ToolCard({ tool, className, variant = "list" }: ToolCardProps) {
  if (variant === "tile") {
    return <TileCard tool={tool} className={className} />;
  }
  return <ExtendedCard tool={tool} className={className} variant={variant} />;
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
            <h3 className="font-serif text-[17px] font-bold leading-[1.15] text-dark group-hover:text-brand-dark transition-colors">
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
                  "font-serif font-bold leading-tight text-dark group-hover:text-brand-dark transition-colors",
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
      <dt className="font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-soft">
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
