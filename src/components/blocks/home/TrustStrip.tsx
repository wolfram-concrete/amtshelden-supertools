import type { TrustStat } from "@/mocks/stats";

interface TrustStripProps {
  stats: TrustStat[];
}

/**
 * Zahlen-Band unter Hero — vermittelt Vertrauen auf den ersten Blick.
 * Editorial: keine Sterne, nur Fakten.
 */
export function TrustStrip({ stats }: TrustStripProps) {
  return (
    <section className="border-y border-border bg-cream/40">
      <div className="container mx-auto px-6 lg:px-10 py-7 lg:py-9">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center lg:text-left space-y-0.5"
            >
              <dt className="font-serif text-[clamp(28px,3vw,40px)] font-normal leading-none text-dark">
                {stat.value}
              </dt>
              <dd className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                {stat.label}
              </dd>
              {stat.hint && (
                <p className="font-ui text-[11px] text-soft leading-snug pt-1 hidden lg:block">
                  {stat.hint}
                </p>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
