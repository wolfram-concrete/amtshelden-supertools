import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung nach DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <PlaceholderPage
      eyebrow="Datenschutz"
      title="Datenschutzerklärung folgt."
      description="Die vollständige Datenschutzerklärung nach Art. 13 DSGVO wird mit dem nächsten Update veröffentlicht."
      breadcrumb={[{ label: "Supertools", href: "/" }, { label: "Datenschutz" }]}
    />
  );
}
