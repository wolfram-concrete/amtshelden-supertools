import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "So erreichst du die Amtshelden-Redaktion.",
};

export default function KontaktPage() {
  return (
    <PlaceholderPage
      eyebrow="Kontakt"
      title="Schreib uns."
      description="Anfragen, Themenvorschläge, Korrekturen, Anbieter-Anliegen — wir antworten persönlich. Das Kontaktformular folgt; bis dahin erreichst du uns über kontakt@amtshelden.de."
      breadcrumb={[{ label: "Supertools", href: "/" }, { label: "Kontakt" }]}
    />
  );
}
