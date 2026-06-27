import Link from "next/link";

import { cn, formatDateDE } from "@/lib/utils";
import type { ProfilSidebarData } from "@/types/profile";

interface ProfilSidebarProps extends ProfilSidebarData {
  /** ISO-Datum der letzten Prüfung — zeigt „Stand"-Indikator ganz unten */
  lastCheckedAt?: string;
  className?: string;
}

/**
 * Sticky Sidebar im Tool-Profil — enthält:
 * - Compliance-Widgets (DSGVO, Server, BSI, Vergabe)
 * - Quick-Facts ("Auf einen Blick")
 * - Sticky CTA-Button
 * - "Warum dieses Tool?" Mini-Card
 * - "Weiterführende Inhalte" — 3 Link-Cards
 */
export function ProfilSidebar({
  complianceWidgets,
  quickFacts,
  ctaLabel,
  ctaHref,
  whyEntries,
  relatedLinks,
  lastCheckedAt,
  className,
}: ProfilSidebarProps) {
  return (
    <aside
      className={cn(
        "space-y-4 lg:sticky lg:top-24 lg:self-start",
        className,
      )}
    >
      {/* ── Compliance-Widgets ── */}
      <div className="space-y-2">
        <SidebarLabel>Compliance auf einen Blick</SidebarLabel>
        {complianceWidgets?.map((w, idx) => (
          <details
            key={`${w.name}-${idx}`}
            className="group rounded-lg border border-border bg-white overflow-hidden transition-colors hover:border-brand/50"
          >
            <summary className="flex items-center gap-2.5 px-3.5 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <span className="text-base" aria-hidden>
                {w.icon}
              </span>
              <span className="font-ui text-[12px] font-semibold text-dark flex-1">
                {w.name}
              </span>
              <span
                className={cn(
                  "font-ui text-[11px] font-bold",
                  w.positive ? "text-brand-dark" : "text-soft",
                )}
              >
                {w.value}
              </span>
            </summary>
            <div className="border-t border-border bg-cream/40 px-3.5 py-2.5 font-ui text-[11px] leading-[1.55] text-soft">
              {w.detail}
            </div>
          </details>
        ))}
      </div>

      {/* ── Auf einen Blick ── */}
      {quickFacts?.length > 0 && (
        <div className="rounded-lg border border-border bg-white p-4 space-y-2.5">
          <SidebarLabel className="mb-1">Auf einen Blick</SidebarLabel>
          {quickFacts.map((f, idx) => (
            <div
              key={`${f.key}-${idx}`}
              className="flex items-center justify-between gap-3 text-[12px] font-ui"
            >
              <span className="text-soft">{f.key}</span>
              <span className="font-semibold text-dark text-right">
                {f.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Sticky CTA ── */}
      <Link
        href={ctaHref}
        className="flex items-center justify-between gap-2 rounded-lg bg-brand px-4 py-3 font-ui text-[13px] font-bold text-white transition-colors hover:bg-brand-dark"
      >
        {ctaLabel}
        <span aria-hidden>→</span>
      </Link>

      {/* ── Warum dieses Tool? ── */}
      {whyEntries?.length > 0 && (
        <div className="pt-2">
          <SidebarLabel>Warum dieses Tool?</SidebarLabel>
          <div className="mt-2 rounded-lg border border-border bg-white overflow-hidden">
            {whyEntries.map((entry, idx) => (
              <div
                key={`${entry.title}-${idx}`}
                className={cn(
                  "px-3.5 py-3 space-y-1",
                  idx < whyEntries.length - 1 && "border-b border-border/70",
                )}
              >
                <div className="font-ui text-[12px] font-semibold text-dark">
                  {entry.title}
                </div>
                <p className="font-ui text-[11px] leading-[1.55] text-soft">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Weiterführende Inhalte ── */}
      {relatedLinks?.length > 0 && (
        <div className="pt-2">
          <SidebarLabel>Weiterführende Inhalte</SidebarLabel>
          <div className="mt-2 space-y-2">
            {relatedLinks.map((link, idx) => (
              <Link
                key={`${link.href}-${idx}`}
                href={link.href}
                className="flex items-start gap-2.5 rounded-lg border border-border bg-white px-3.5 py-3 transition-colors hover:border-brand"
              >
                <span
                  className="text-sm flex-shrink-0 mt-0.5"
                  aria-hidden
                >
                  {link.icon}
                </span>
                <div className="min-w-0">
                  <div className="font-ui text-[12px] font-semibold leading-[1.35] text-dark">
                    {link.title}
                  </div>
                  <div className="font-ui text-[10px] text-soft mt-0.5">
                    {link.meta}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Stand / Aktualität ── */}
      {lastCheckedAt && (
        <div className="pt-2 px-1">
          <div className="rounded-lg border border-dashed border-border bg-white px-3.5 py-3">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-soft">
              Stand der Prüfung
            </div>
            <div className="font-ui text-[12px] font-semibold text-dark mt-1">
              {formatDateDE(lastCheckedAt)}
            </div>
            <p className="font-ui text-[10.5px] leading-[1.55] text-soft mt-1.5">
              Profile werden quartalsweise von der Amtshelden-Redaktion
              gegengeprüft. Angaben veraltet?{" "}
              <Link
                href="#korrektur"
                className="text-brand-dark hover:underline"
              >
                Korrektur melden
              </Link>
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}

function SidebarLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-soft px-1",
        className,
      )}
    >
      {children}
    </div>
  );
}
