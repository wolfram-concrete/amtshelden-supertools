interface RevealHeadingProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  style?: React.CSSProperties;
  /** ms Verzögerung pro Wort */
  stagger?: number;
}

/**
 * Headline, die sich beim Reinscrollen wortweise aufbaut (Schrift-Animation).
 * Jedes Wort trägt `data-reveal="word"` + gestaffelte Delay — der globale
 * ScrollReveal-Observer schaltet sie sichtbar. Ohne JS / bei reduzierter
 * Bewegung bleibt der Text sofort da (Progressive Enhancement in globals.css).
 *
 * Kein "use client" nötig: rein deklaratives Markup, die Logik liegt im
 * globalen ScrollReveal.
 */
export function RevealHeading({
  text,
  className,
  as: Tag = "h2",
  style,
  stagger = 55,
}: RevealHeadingProps) {
  const words = text.split(" ");
  return (
    <Tag className={className} style={style}>
      {words.map((word, i) => (
        <span key={i}>
          <span
            data-reveal="word"
            style={{ "--reveal-delay": `${i * stagger}ms` } as React.CSSProperties}
            className="inline-block"
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
