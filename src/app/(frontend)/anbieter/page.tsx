import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const metadata: Metadata = {
  title: "Anbieter werden",
  description: "Wie Software-Anbieter ein Profil bei Supertools anlegen.",
};

export default function AnbieterPage() {
  return (
    <PlaceholderPage
      eyebrow="Für Anbieter"
      title="So wird dein Tool Teil von Supertools."
      description="Wir kuratieren handverlesen — Supertools ist kein Self-Service-Verzeichnis. Verifiziertes Listing, Mediadaten und Anbieter-Onboarding kommen in Kürze. Bis dahin: kontakt@amtshelden.de."
      breadcrumb={[{ label: "Supertools", href: "/" }, { label: "Für Anbieter" }]}
    />
  );
}
