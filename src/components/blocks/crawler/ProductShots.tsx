import { ImageIcon } from "lucide-react";

interface ProductShotsProps {
  /** Domain für die angedeutete Browser-Adressleiste */
  domain?: string;
  /** Freigegebene Screenshot-URLs (sobald vorhanden) */
  shots?: string[];
  /** Anzahl Platzhalter-Frames, wenn (noch) keine Screenshots da sind */
  placeholders?: number;
  className?: string;
}

/**
 * Produkt-Einblick — Browser-gerahmte Software-Screenshots als Scroll-Snap-
 * Galerie. Zeigt echte, freigegebene Screenshots (`shots`); solange keine da
 * sind, gerahmte Platzhalter mit Interface-Andeutung.
 *
 * Bildquelle: lokale Headless-Screenshots aus dem Crawler-Review-Export.
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
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item, i) => (
          <figure
            key={i}
            data-reveal="float"
            style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            className="w-[86%] flex-shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-white sm:w-[420px]"
          >
            {/* Browser-Chrome */}
            <div className="flex items-center gap-1.5 border-b border-border bg-cream/70 px-3 py-2">
              <span aria-hidden className="h-2 w-2 rounded-full bg-border" />
              <span aria-hidden className="h-2 w-2 rounded-full bg-border" />
              <span aria-hidden className="h-2 w-2 rounded-full bg-border" />
              {domain && (
                <span className="ml-2 truncate rounded bg-white px-2 py-0.5 font-mono text-[10px] text-soft">
                  {domain}
                </span>
              )}
            </div>

            <div className="relative aspect-[16/10] bg-gradient-to-br from-cream to-stone/30">
              {item.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.url}
                  alt="Produkt-Interface"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  loading="lazy"
                />
              ) : (
                <>
                  {/* angedeutetes Interface-Layout */}
                  <div aria-hidden className="absolute inset-3 flex gap-2">
                    <div className="w-8 rounded border border-border bg-white/70" />
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="h-1/3 rounded border border-border bg-white/70" />
                      <div className="grid flex-1 grid-cols-2 gap-2">
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
                </>
              )}
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
