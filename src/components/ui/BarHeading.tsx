import { cn } from "@/lib/utils";

/**
 * Haptische Section-Headline im grünen Balken — dieselbe Materialsprache wie die
 * Hero-Headline (Logo-Trägerstil: Lichtkante oben, feines Korn, weicher
 * gerichteter Schatten), nur etwas ruhiger für die Flächen unter dem Hero.
 *
 * Bewusst selektiv einsetzen (eine tragende Section-Headline, nicht jede Karten-
 * oder Zwischenüberschrift), damit die Griffigkeit wirkt und nicht erschlägt.
 * `box-decoration-clone` sorgt dafür, dass mehrzeilige Headlines als verbundene
 * Balken umbrechen.
 */

const BAR_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")";

const BAR_STYLE: React.CSSProperties = {
  backgroundColor: "#009460",
  backgroundImage: BAR_GRAIN,
  backgroundBlendMode: "soft-light",
};

interface BarHeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Sanftes Scroll-Reveal über das vorhandene data-reveal-System. */
  reveal?: boolean;
}

export function BarHeading({
  children,
  as: Tag = "h2",
  className,
  reveal = true,
}: BarHeadingProps) {
  return (
    <Tag
      {...(reveal ? { "data-reveal": "" } : {})}
      className={cn(
        "font-display text-[clamp(26px,3.3vw,40px)] tracking-[-0.01em]",
        className,
      )}
      // line-height bewusst als Inline-Style: tailwind-merge würde ein
      // `leading-[…]` neben `text-[clamp(…)]` wegräumen. 1.6 bringt den Abstand
      // der box-decoration-clone-Balken am Desktop auf den Hero-Gap (~10px).
      style={{ fontStretch: "110%", lineHeight: 1.6 }}
    >
      <span
        className="box-decoration-clone rounded-xl px-3.5 py-1.5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.26),0_12px_26px_-16px_rgba(0,0,0,0.45)]"
        style={BAR_STYLE}
      >
        {children}
      </span>
    </Tag>
  );
}
