import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const metadata: Metadata = {
  title: "Über uns",
  description: "Wer hinter Amtshelden Supertools steht und warum wir tun, was wir tun.",
};

export default function UeberPage() {
  return (
    <PlaceholderPage
      eyebrow="Über Supertools"
      title="Wer wir sind und warum wir das tun."
      description="Amtshelden Supertools entsteht in Berlin — kuratiert von Menschen, die selbst aus der Verwaltung kommen oder lange mit ihr gearbeitet haben. Dieser Bereich wird in Kürze ausgebaut: Team, Methodik, redaktionelle Grundsätze."
      breadcrumb={[{ label: "Supertools", href: "/" }, { label: "Über uns" }]}
    />
  );
}
