"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";
import type { CategoryDefinition } from "@/types/content";

interface QuickFinderProps {
  categories: CategoryDefinition[];
  className?: string;
}

const SIZE_OPTIONS = [
  { value: "small", label: "bis 10.000 EW" },
  { value: "mid", label: "10.000–50.000 EW" },
  { value: "large", label: "über 50.000 EW" },
  { value: "any", label: "Egal" },
] as const;

const OPS_OPTIONS = [
  { value: "Cloud", label: "Cloud (SaaS)" },
  { value: "OnPremise", label: "On-Premise" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "any", label: "Egal" },
] as const;

/**
 * Geführter 3-Frage-Selektor im Hero — kein Suchfeld.
 * Submit navigiert zur entsprechenden Kategorie-Seite mit Filter-Hint
 * via URL-Hash (Filter werden dort manuell gesetzt — Filter-Routing
 * über Query-Params kommt in einem späteren Schritt).
 */
export function QuickFinder({ categories, className }: QuickFinderProps) {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [size, setSize] = useState<string>("any");
  const [ops, setOps] = useState<string>("any");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!category) return;
    const params = new URLSearchParams();
    if (size !== "any") params.set("size", size);
    if (ops !== "any") params.set("ops", ops);
    const query = params.toString();
    router.push(`/kategorien/${category}${query ? `?${query}` : ""}`);
  }

  return (
    <aside
      className={cn(
        "rounded-3xl border border-border bg-white p-6 lg:p-8 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.18)]",
        className,
      )}
    >
      <div className="space-y-1.5 mb-6">
        <div className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
          Tool-Finder
        </div>
        <h2 className="font-serif text-[26px] font-bold leading-tight text-dark">
          Welches Tool passt zu deiner Behörde?
        </h2>
        <p className="font-sans text-[13px] text-soft leading-relaxed">
          Drei Fragen — und du landest in der passenden Kategorie.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Was suchst du?">
          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="finder-select"
          >
            <option value="">Kategorie wählen …</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.icon ? `${c.icon}  ` : ""}
                {c.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Wie groß ist deine Behörde?">
          <RadioGroup
            name="size"
            options={SIZE_OPTIONS}
            value={size}
            onChange={setSize}
          />
        </Field>

        <Field label="Wo soll's laufen?">
          <RadioGroup
            name="ops"
            options={OPS_OPTIONS}
            value={ops}
            onChange={setOps}
          />
        </Field>

        <button
          type="submit"
          disabled={!category}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-ui text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Tools anzeigen
          <span aria-hidden>→</span>
        </button>

        <p className="font-ui text-[10px] text-soft text-center leading-relaxed pt-1">
          Kein Login, keine Nachverfolgung. Du landest direkt in der gefilterten Liste.
        </p>
      </form>

      <style>{`
        .finder-select {
          width: 100%;
          background: var(--color-white, #fff);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          padding: 0.65rem 0.85rem;
          font-family: var(--font-ui);
          font-size: 13px;
          font-weight: 500;
          color: var(--color-dark);
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23777' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.85rem center;
          padding-right: 2.25rem;
          transition: border-color 0.15s;
        }
        .finder-select:focus {
          outline: none;
          border-color: var(--color-brand);
          box-shadow: 0 0 0 3px rgba(0, 148, 96, 0.15);
        }
      `}</style>
    </aside>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="font-ui text-[11px] font-bold uppercase tracking-[0.14em] text-soft">
        {label}
      </span>
      {children}
    </label>
  );
}

function RadioGroup<T extends { value: string; label: string }>({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: readonly T[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {options.map((opt) => {
        const checked = value === opt.value;
        return (
          <label
            key={opt.value}
            className={cn(
              "flex items-center justify-center text-center rounded-lg border px-2.5 py-2 cursor-pointer transition-colors font-ui text-[12px] font-medium",
              checked
                ? "bg-brand text-white border-brand"
                : "bg-white text-mid border-border hover:border-brand/50 hover:text-dark",
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={checked}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            {opt.label}
          </label>
        );
      })}
    </div>
  );
}
