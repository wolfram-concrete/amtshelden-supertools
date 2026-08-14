import { ImageIcon } from "lucide-react";

interface ProductShotsProps {
  /** Domain als dezente Quellenangabe unter dem Shot */
  domain?: string;
  /** Freigegebene Screenshot-URLs (sobald vorhanden) */
  shots?: string[];
  /** Anzahl Platzhalter-Frames, wenn (noch) keine Screenshots da sind */
  placeholders?: number;
  className?: string;
}

/**
 * Produkt-Einblick — großformatige Close-ups der Software-Oberfläche als
 * Scroll-Snap-Galerie. Zeigt echte, freigegebene Screenshots (`shots`) in
 * voller Höhe (kein Browser-Rahmen, damit es als Produkt-Snapshot liest, nicht
 * als Website-Link); solange keine da sind, gerahmte Platzhalter.
 *
 * Bildquelle: lokale Produkt-Interface-Screenshots aus dem Crawler-Review-
 * Export — die eigentliche Oberfläche (Dashboard/App), NICHT die Startseite.
 * Keine fremden Asset-Dateien hotlinken; sichtbar werden nur freigegebene
 * Pfade aus `crawler-preview.ts`.
 */
export function ProductShots({
  domain,
  shots,
  placeholders = 2,
  className,
}: ProductShotsProps) {
  const items = shots?.length
    ? shots.map((url) => ({ url }))
    : Array.from({ length: placeholders }, () => ({ url: undefined }));

  return (
    <div className={className}>
      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item, i) => (
          <figure
            key={i}
            data-reveal="float"
            style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            className="group w-[92%] flex-shrink-0 snap-start self-start overflow-hidden rounded-2xl border border-border bg-white shadow-[0_26px_60px_-34px_rgba(17,17,17,0.3)] sm:w-[600px]"
          >
            {item.url ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt="Produkt-Oberfläche"
                  className="block w-full"
                  loading="lazy"
                />
                <figcaption className="flex items-center justify-between gap-3 border-t border-border bg-cream/50 px-4 py-2.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-brand-dark">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
                    Produkt-Oberfläche
                  </span>
                  {domain && (
                    <span className="truncate font-mono text-[10px] text-soft">
                      {domain}
                    </span>
                  )}
                </figcaption>
              </>
            ) : (
              <div className="relative aspect-[16/10] bg-gradient-to-br from-cream to-stone/30">
                {/* angedeutetes Interface-Layout */}
                <div aria-hidden className="absolute inset-4 flex gap-2.5">
                  <div className="w-10 rounded border border-border bg-white/70" />
                  <div className="flex flex-1 flex-col gap-2.5">
                    <div className="h-1/3 rounded border border-border bg-white/70" />
                    <div className="grid flex-1 grid-cols-2 gap-2.5">
                      <div className="rounded border border-border bg-white/70" />
                      <div className="rounded border border-border bg-white/70" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/85 px-3 py-1 font-ui text-[11px] font-medium text-soft backdrop-blur-sm">
                    <ImageIcon size={12} aria-hidden />
                    Produkt-Einblick folgt
                  </span>
                </div>
              </div>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
