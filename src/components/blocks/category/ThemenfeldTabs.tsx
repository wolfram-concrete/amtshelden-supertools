"use client";

import { useState } from "react";

import { ToolCard } from "@/components/cards/ToolCard";
import { BrandIcon, type BrandIconName } from "@/components/icons/BrandIcon";
import { cn } from "@/lib/utils";
import type { CategoryDefinition, ToolCardSummary } from "@/types/content";

interface ThemenfeldTabsProps {
  categories: CategoryDefinition[];
  toolsByCategory: Record<string, ToolCardSummary[]>;
}

/**
 * Themenfeld-Direkteinstieg: man landet sofort auf den Tools des ganzen
 * Themenfelds. Eine Reiter-/Subnav oben filtert optional auf eine Kategorie —
 * keine vorgeschaltete Auswahlseite mehr.
 */
export function ThemenfeldTabs({
  categories,
  toolsByCategory,
}: ThemenfeldTabsProps) {
  const [active, setActive] = useState<string>("alle");

  const allTools = categories.flatMap((c) => toolsByCategory[c.slug] || []);
  const tools = active === "alle" ? allTools : toolsByCategory[active] || [];

  const tabs: { slug: string; name: string; icon?: BrandIconName; count: number }[] =
    [
      { slug: "alle", name: "Alle Tools", count: allTools.length },
      ...categories.map((c) => ({
        slug: c.slug,
        name: c.name,
        icon: c.icon,
        count: (toolsByCategory[c.slug] || []).length,
      })),
    ];

  return (
    <div>
      {/* Reiter-/Subnav */}
      <div
        role="tablist"
        aria-label="Bereich wählen"
        className="flex flex-wrap items-center gap-2 border-b border-border pb-5"
      >
        {tabs.map((t) => {
          const isActive = active === t.slug;
          return (
            <button
              key={t.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.slug)}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-full px-4 font-ui text-[13px] font-medium transition-colors",
                isActive
                  ? "bg-brand text-white"
                  : "bg-white text-mid hover:bg-cream hover:text-dark",
              )}
            >
              {t.icon && (
                <BrandIcon
                  name={t.icon}
                  size={15}
                  className={isActive ? "text-white" : "text-brand-dark"}
                />
              )}
              {t.name}
              <span
                className={cn(
                  "font-mono text-[11px]",
                  isActive ? "text-white/70" : "text-soft",
                )}
              >
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tool-Liste */}
      {tools.length > 0 ? (
        <div className="mt-6 space-y-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} variant="row" />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-border bg-cream p-12 text-center">
          <p className="font-serif text-[20px] font-normal text-dark">
            Tools in Vorbereitung
          </p>
          <p className="mt-2 font-sans text-[14px] text-soft">
            Für diesen Bereich kuratieren wir gerade die passenden Tools.
          </p>
        </div>
      )}
    </div>
  );
}
