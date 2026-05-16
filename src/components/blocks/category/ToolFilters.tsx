"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

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
 * Kategorie-Seite: Tools als alphabetisch sortiertes 3-Spalten-Grid mit
 * Buchstaben-Ankern. Filter-Sidebar links, Suche oben rechts.
 * Bewusst SIMPEL: keine Sub-Cluster, kein A-Z-Sticky, keine Sortier-Optionen —
 * alphabetisch ist neutral, Filter und Suche genügen für die Reduzierung
 * auf große Listen.
 */
export function ToolFilters({ tools }: ToolFiltersProps) {
  const [operations, setOperations] = useState<string[]>([]);
  const [tiers, setTiers] = useState<string[]>([]);
  const [compliance, setCompliance] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tools.filter((tool) => {
      if (
        operations.length > 0 &&
        !operations.some((op) =>
          tool.facts.operation?.toLowerCase().includes(op.toLowerCase()),
        )
      ) {
        return false;
      }
      if (tiers.length > 0 && !tiers.includes(tool.tier)) return false;
      if (
        compliance.length > 0 &&
        !compliance.every(
          (c) => tool.compliance[c as keyof typeof tool.compliance] === true,
        )
      ) {
        return false;
      }
      if (q) {
        const haystack = [tool.name, tool.provider, tool.pitch]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [tools, operations, tiers, compliance, search]);

  // Alphabetische Sortierung + Gruppierung nach Anfangsbuchstaben
  const grouped = useMemo(() => {
    const sorted = [...filtered].sort((a, b) =>
      a.name.localeCompare(b.name, "de", { sensitivity: "base" }),
    );
    const groups = new Map<string, ToolCardSummary[]>();
    sorted.forEach((t) => {
      const letter = t.name.charAt(0).toUpperCase();
      const key = /[A-Z]/.test(letter) ? letter : "#";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(t);
    });
    return Array.from(groups.entries());
  }, [filtered]);

  function toggle(
    set: string[],
    setter: (v: string[]) => void,
    value: string,
  ) {
    setter(
      set.includes(value) ? set.filter((v) => v !== value) : [...set, value],
    );
  }

  function resetAll() {
    setOperations([]);
    setTiers([]);
    setCompliance([]);
    setSearch("");
  }

  const totalFilters =
    operations.length + tiers.length + compliance.length + (search ? 1 : 0);

  return (
    <div className="grid lg:grid-cols-[240px_1fr] gap-10 lg:gap-12">
      {/* ── Sidebar Filters ── */}
      <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-soft">
            Filter
          </h2>
          {totalFilters > 0 && (
            <button
              type="button"
              onClick={resetAll}
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
              label={op === "OnPremise" ? "On-Premise" : op}
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

      {/* ── Main: Search + Grid ── */}
      <div className="min-w-0 space-y-6">
        {/* Suche + Counter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-soft pointer-events-none"
              aria-hidden
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tool, Anbieter oder Stichwort suchen …"
              className="w-full rounded-full border border-border bg-white pl-10 pr-10 py-2.5 font-ui text-[13px] text-dark placeholder:text-soft outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Suche löschen"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-soft hover:text-dark transition-colors"
              >
                <X size={14} aria-hidden />
              </button>
            )}
          </div>
          <p className="font-ui text-[12.5px] text-mid whitespace-nowrap">
            <strong className="text-dark">{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "Tool" : "Tools"}
            <span className="font-serif italic text-soft ml-1.5">
              · alphabetisch
            </span>
          </p>
        </div>

        {/* Grid mit Buchstaben-Ankern */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-cream p-12 text-center">
            <p className="font-serif text-[20px] font-bold text-dark">
              Keine Tools für diese Auswahl.
            </p>
            <p className="font-sans text-[14px] text-soft mt-2">
              Andere Filter probieren oder zurücksetzen.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {grouped.map(([letter, items]) => (
              <section key={letter} aria-labelledby={`letter-${letter}`}>
                <h3
                  id={`letter-${letter}`}
                  className="font-serif text-[28px] font-bold leading-none text-dark border-b border-border pb-3 mb-5"
                >
                  <span className="text-soft font-medium">{letter}</span>
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {items.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} variant="tile" />
                  ))}
                </div>
              </section>
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
    <label className="flex items-center gap-2.5 cursor-pointer group select-none">
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
