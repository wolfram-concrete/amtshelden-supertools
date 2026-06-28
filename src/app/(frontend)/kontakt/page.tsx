import type { Metadata } from "next";

import { KontaktForm } from "@/components/blocks/KontaktForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Anfragen, Anbieter-Anliegen, Korrekturen, Themenvorschläge — wir antworten persönlich über Amtshelden.",
};

export default async function KontaktPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;

  return (
    <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            Kontakt
          </div>
          <h1 className="font-serif text-[clamp(34px,4.4vw,56px)] font-normal leading-[1.05] tracking-tight text-dark">
            Schreiben Sie uns.
          </h1>
          <p className="font-sans text-[17px] leading-[1.7] text-mid">
            Anfragen, Anbieter-Anliegen, Korrekturen, Themenvorschläge — Ihre
            Nachricht läuft über Amtshelden, wir antworten persönlich. Kein
            anonymes Ticketsystem.
          </p>
          <p className="font-ui text-[14px] text-mid">
            Direkt:{" "}
            <a
              href="mailto:kontakt@amtshelden.de"
              className="text-brand-dark underline underline-offset-2 hover:text-brand"
            >
              kontakt@amtshelden.de
            </a>{" "}
            · +49 69 87003372
          </p>
        </div>

        <div>
          <KontaktForm initialTopic={topic} />
        </div>
      </div>
    </div>
  );
}
