"use client";

import { useMemo, useState } from "react";

import { ToolCard } from "@/components/cards/ToolCard";
import { cn } from "@/lib/utils";
import type { ToolCardSummary } from "@/types/content";

interface ToolFiltersProps {
  tools: ToolCardSummary[];
}

const OPERATION_OPTIONS = ["Cloud", "OnPremise", "Hybrid"] as const;
const TIER_OPTIONS = ["basis", "verified", "partner"] as const;
const COMPLIANCE_OPTIONS = [
  { key: "dsgvo", label: "DSGVO" },
  { key: "serverDe", label: "Server Deutschland" },
  { key: "bsi", label: "BSI C5" },
  { key: "vergabe", label: "UVgO/VOL-A" },
] as const;

/**
 * Client Component: Filtert die Tool-Liste auf der Kategorie-Seite.
 * Filter sind oben rechts in der Sidebar — Liste rendert sich live.
 */
export function ToolFilters({ tools }: ToolFiltersProps) {
  const [operations, setOperations] = useState<string[]>([]);
  const [tiers, setTiers] = useState<string[]>([]);
  const [compliance, setCompliance] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return tools.filter((tool) => {
      if (
        operations.length > 0 &&
        !operations.some((op) =>
          tool.facts.operation?.toLowerCase().includes(op.toLowerCase()),
        )
      ) {
        return false;
      }
      if (tiers.length > 0 && !tiers.includes(tool.tier)) {
        return false;
      }
      if (
        compliance.length > 0 &&
        !compliance.every(
          (c) =>
            tool.compliance[c as keyof typeof tool.compliance] === true,
        )
      ) {
        return false;
      }
      return true;
    });
  }, [tools, operations, tiers, compliance]);

  function toggle(
    set: string[],
    setter: (v: string[]) => void,
    value: string,
  ) {
    setter(
      set.includes(value) ? set.filter((v) => v !== value) : [...set, value],
    );
  }

  const totalFilters = operations.length + tiers.length + compliance.length;

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-10 lg:gap-14">
      {/* ── Sidebar Filters ── */}
      <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-soft">
            Filter
          </h2>
          {totalFilters > 0 && (
            <button
              type="button"
              onClick={() => {
                setOperations([]);
                setTiers([]);
                setCompliance([]);
              }}
              className="font-ui text-[11px] text-brand hover:underline"
            >
              Zurücksetzen
            </button>
          )}
        </div>

        <FilterGroup label="Betrieb">
          {OPERATION_OPTIONS.map((op) => (
            <FilterCheck
              key={op}
              label={op}
              checked={operations.includes(op)}
              onChange={() => toggle(operations, setOperations, op)}
            />
          ))}
        </FilterGroup>

        <FilterGroup label="Profil-Stufe">
          {TIER_OPTIONS.map((t) => (
            <FilterCheck
              key={t}
              label={t.charAt(0).toUpperCase() + t.slice(1)}
              checked={tiers.includes(t)}
              onChange={() => toggle(tiers, setTiers, t)}
            />
          ))}
        </FilterGroup>

        <FilterGroup label="Compliance">
          {COMPLIANCE_OPTIONS.map((c) => (
            <FilterCheck
              key={c.key}
              label={c.label}
              checked={compliance.includes(c.key)}
              onChange={() => toggle(compliance, setCompliance, c.key)}
            />
          ))}
        </FilterGroup>
      </aside>

      {/* ── Tool List ── */}
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <p className="font-ui text-[13px] text-mid">
            <strong className="text-dark">{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "Tool" : "Tools"} gefunden
            {totalFilters > 0 && (
              <span className="text-soft"> · {totalFilters} Filter aktiv</span>
            )}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-cream p-12 text-center">
            <p className="font-serif text-[20px] font-bold text-dark">
              Keine Tools mit dieser Filterkombination.
            </p>
            <p className="font-sans text-[14px] text-soft mt-2">
              Versuche eine andere Auswahl oder setze die Filter zurück.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} variant="list" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <div className="font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-soft">
        {label}
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function FilterCheck({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={cn(
        "flex items-center gap-2.5 cursor-pointer group select-none",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        aria-hidden
        className={cn(
          "h-4 w-4 flex-shrink-0 rounded border transition-colors flex items-center justify-center",
          checked
            ? "bg-brand border-brand text-white"
            : "border-border bg-white group-hover:border-brand/60",
        )}
      >
        {checked && <span className="text-[10px] font-bold">✓</span>}
      </span>
      <span
        className={cn(
          "font-ui text-[13px] transition-colors",
          checked ? "text-dark font-medium" : "text-mid group-hover:text-dark",
        )}
      >
        {label}
      </span>
    </label>
  );
}
