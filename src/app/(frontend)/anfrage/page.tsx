import type { Metadata } from "next";

import { KontaktForm } from "@/components/blocks/KontaktForm";
import { RevealHeading } from "@/components/motion/RevealHeading";

export const metadata: Metadata = {
  title: "Tool unverbindlich anfragen",
  description:
    "Unverbindliche Anfrage zu einem Tool — Amtshelden stellt den Kontakt zum Anbieter her. Keine automatisierten Antworten.",
};

export default async function AnfragePage({
  searchParams,
}: {
  searchParams: Promise<{ tool?: string }>;
}) {
  const { tool } = await searchParams;

  return (
    <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div
            data-reveal
            className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-brand"
          >
            Unverbindlich anfragen
          </div>
          <RevealHeading
            as="h1"
            text="Wir melden uns persönlich."
            baseDelay={120}
            className="font-serif text-[clamp(34px,4.4vw,56px)] font-normal leading-[1.05] tracking-tight text-dark"
          />
          <p
            data-reveal
            style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            className="font-sans text-[17px] leading-[1.7] text-mid"
          >
            Keine automatisierten Antworten. Amtshelden nimmt Ihre Anfrage auf,
            ordnet sie ein und stellt den Kontakt zum richtigen Ansprechpartner
            beim Anbieter her — ohne dass Sie Ihre Daten breit streuen.
          </p>
          <p className="font-ui text-[13px] text-soft">
            Kein Spam, keine automatisierten Folge-Mails. DSGVO-konform.
          </p>
        </div>

        <div>
          <KontaktForm initialTopic="tool-anfrage" initialTool={tool} />
        </div>
      </div>
    </div>
  );
}
