import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Software für die digitale Verwaltung — Supertools",
  description:
    "Handverlesene Software für Behörden. Kuratiert, ehrlich, aus Behördenperspektive eingeordnet. Das Gedächtnis der digitalen Verwaltung Deutschlands.",
};

/**
 * Startseite — Editorial-Frontpage (PLATZHALTER für Phase 2).
 * Die echten Blocks (Hero, Editorial-Intro, Magazin-Grid, etc.) kommen
 * als nächstes — siehe TODO-Liste.
 */
export default function HomePage() {
  return (
    <div className="container mx-auto px-6 lg:px-10 py-24 lg:py-32">
      {/* Provisorische Hero-Sektion */}
      <div className="max-w-3xl">
        <Badge variant="eyebrow" size="default" className="mb-6">
          Beta · Mai 2026 · Setup abgeschlossen
        </Badge>

        <h1 className="font-serif text-[clamp(40px,6vw,72px)] font-bold leading-[1.05] tracking-tight text-dark">
          Das Gedächtnis der digitalen{" "}
          <span className="italic text-brand-dark">Verwaltung</span>.
        </h1>

        <p className="mt-8 font-sans text-lg leading-relaxed text-mid max-w-2xl">
          Handverlesene Software für Behörden. Kuratiert, ehrlich, aus
          Behördenperspektive eingeordnet. Hier wurde für Menschen wie dich
          gedacht — mit deinen Ängsten, deiner Verantwortung, deinem Kontext.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button asChild>
            <Link href="/kategorien">Kategorien entdecken</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/wissen">Zum Wissensbereich</Link>
          </Button>
        </div>
      </div>

      {/* Status-Hinweis (nur während Aufbau) */}
      <div className="mt-24 border-t border-border pt-12 max-w-3xl">
        <h2 className="font-serif text-2xl font-bold text-dark">
          Status — Phase 1 ✓
        </h2>
        <p className="mt-3 font-sans text-sm text-soft">
          Next.js + Tailwind v4 + Editorial Design-System gesetzt.
          Cormorant Garamond · IBM Plex Sans · Inter Tight via{" "}
          <code className="font-ui text-xs">next/font</code>.
          BlockRenderer + Types vorbereitet. Header/Footer fertig.
        </p>
        <p className="mt-4 font-sans text-sm text-mid">
          <strong>Als nächstes:</strong> Profil-Seite (Port von{" "}
          <code className="font-ui text-xs">supertools_profil_beispiel.html</code>),
          Kategorie-Layout, Wissensartikel-Layout.
        </p>
      </div>
    </div>
  );
}
