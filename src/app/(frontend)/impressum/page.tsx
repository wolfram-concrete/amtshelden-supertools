import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung gemäß § 5 DDG.",
};

export default function ImpressumPage() {
  return (
    <PlaceholderPage
      eyebrow="Impressum"
      title="Anbieterkennzeichnung folgt."
      description="Das vollständige Impressum nach § 5 DDG wird mit dem nächsten Update veröffentlicht."
      breadcrumb={[{ label: "Supertools", href: "/" }, { label: "Impressum" }]}
    />
  );
}
