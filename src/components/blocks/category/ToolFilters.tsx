"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";

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

type SortKey = "editorial" | "az" | "za" | "random";

const SORT_OPTIONS: { key: SortKey; label: string; hint: string }[] = [
  { key: "editorial", label: "Redaktionell", hint: "Reihenfolge der Amtshelden-Redaktion" },
  { key: "az", label: "A–Z", hint: "Alphabetisch" },
  { key: "za", label: "Z–A", hint: "Alphabetisch absteigend" },
  { key: "random", label: "Zufällig", hint: "Pro Sitzung gleich" },
];

/**
 * Kompakte Listen-Ansicht (2-Zeilen-Rows, ~80px Höhe).
 * Default-Sortierung: Redaktionell (Reihenfolge im Verzeichnis).
 * Filter links · Suche + Sortier-Dropdown oben · Listenzeilen darunter.
 *
 * Bewusst gegen Ranking-Anmutung:
 * - Einheitliche Zeilenhöhe (keine Größenvorteile)
 * - Verified-Status nur als kleines ✓-Pill, nicht als Größen-Hierarchie
 * - Sortier-Default ist transparent „Redaktionell" — User kann auf A-Z/Zufall wechseln
 */
export function ToolFilters({ tools }: ToolFiltersProps) {
  const [operations, setOperations] = useState<string[]>([]);
  const [tiers, setTiers] = useState<string[]>([]);
  const [compliance, setCompliance] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("editorial");
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  // Random-Seed bleibt während der Sitzung konstant (kein Re-Shuffle bei jedem Render)
  const [randomSeed] = useState(() => Math.random());

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let result = tools.filter((tool) => {
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

    // Sortierung
    if (sort === "az") {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name, "de", { sensitivity: "base" }),
      );
    } else if (sort === "za") {
      result = [...result].sort((a, b) =>
        b.name.localeCompare(a.name, "de", { sensitivity: "base" }),
      );
    } else if (sort === "random") {
      // Deterministischer Pseudo-Shuffle basierend auf randomSeed
      result = [...result]
        .map((t, i) => ({
          t,
          k: Math.abs(Math.sin((i + 1) * (randomSeed + 1) * 100)),
        }))
        .sort((a, b) => a.k - b.k)
        .map((x) => x.t);
    }
    // "editorial" = Reihenfolge wie im Array (unverändert)

    return result;
  }, [tools, operations, tiers, compliance, search, sort, randomSeed]);

  function toggle(set: string[], setter: (v: string[]) => void, value: string) {
    setter(
      set.includes(value) ? set.filter((v) => v !== value) : [...set, value],
    );
  }

  function resetAll() {
    setOperations([]);
    setTiers([]);
    setCompliance([]);
    setSearch("");
    setSort("editorial");
  }

  const totalFilters =
    operations.length + tiers.length + compliance.length + (search ? 1 : 0);
  const currentSortLabel =
    SORT_OPTIONS.find((s) => s.key === sort)?.label || "Redaktionell";

  return (
    <div className="grid lg:grid-cols-[240px_1fr] gap-6 lg:gap-12">
      {/* ── Sidebar Filters (Mobile: kollabierbar, Desktop: sticky) ── */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        {/* Mobile-Toggle */}
        <button
          type="button"
          onClick={() => setFiltersExpanded((v) => !v)}
          aria-expanded={filtersExpanded}
          aria-controls="filter-panel"
          className="lg:hidden w-full flex items-center justify-between rounded-full border border-border bg-white px-5 py-3 font-ui text-[13px] font-semibold text-dark transition-colors hover:bg-cream"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal size={14} aria-hidden />
            Filter
            {totalFilters > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-brand text-white font-ui text-[10px] font-bold">
                {totalFilters}
              </span>
            )}
          </span>
          <ChevronDown
            size={14}
            className={cn(
              "transition-transform text-soft",
              filtersExpanded && "rotate-180",
            )}
            aria-hidden
          />
        </button>

        {/* Filter-Panel */}
        <div
          id="filter-panel"
          className={cn(
            "space-y-6 lg:!block lg:!opacity-100",
            !filtersExpanded && "hidden lg:block",
            filtersExpanded && "block mt-4 lg:mt-0 animate-filters-in",
          )}
        >
          <div className="hidden lg:flex items-center justify-between">
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

          {totalFilters > 0 && (
            <button
              type="button"
              onClick={resetAll}
              className="lg:hidden inline-flex items-center font-ui text-[12px] text-brand hover:underline"
            >
              Alle Filter zurücksetzen
            </button>
          )}

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
        </div>
      </aside>

      {/* ── Main: Search + Sort + List ── */}
      <div className="min-w-0 space-y-5">
        {/* Toolbar: Suche links, Sortierung + Counter rechts */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pb-3 border-b border-border">
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

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 font-ui text-[12px] text-soft">
              <span className="hidden md:inline">Sortieren:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="sort-select font-ui text-[12.5px] font-medium text-dark"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            <span className="font-ui text-[12px] text-mid whitespace-nowrap">
              <strong className="text-dark">{filtered.length}</strong>{" "}
              {filtered.length === 1 ? "Tool" : "Tools"}
            </span>
          </div>
        </div>

        {/* Listen-Ansicht */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-cream p-12 text-center">
            <p className="font-serif text-[20px] font-semibold text-dark">
              Keine Tools für diese Auswahl.
            </p>
            <p className="font-sans text-[14px] text-soft mt-2">
              Andere Filter probieren oder zurücksetzen.
            </p>
          </div>
        ) : (
          <div className="border-t border-border">
            {filtered.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} variant="row" />
            ))}
            {sort === "editorial" && (
              <p className="font-ui italic text-[11px] text-soft mt-5 pl-2">
                Reihenfolge: {currentSortLabel} — kuratiert von der Amtshelden-
                Redaktion, kein Ranking, kein Pay-to-Top.
              </p>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes filters-in {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-filters-in { animation: filters-in 0.18s ease-out forwards; }

        .sort-select {
          background: transparent;
          border: 1px solid var(--color-border);
          border-radius: 999px;
          padding: 0.4rem 2rem 0.4rem 0.85rem;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23777' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.85rem center;
          cursor: pointer;
          transition: border-color 0.15s;
        }
        .sort-select:focus {
          outline: none;
          border-color: var(--color-brand);
          box-shadow: 0 0 0 3px rgba(0, 148, 96, 0.15);
        }
      `}</style>
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
