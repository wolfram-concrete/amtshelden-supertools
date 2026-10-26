import type { Metadata } from "next";
import { Archivo, Fragment_Mono } from "next/font/google";

import "./d3-thesis.css";

// Display + Text: Archivo (heavy, leicht breitlaufend, Versal) — D3-Haltung.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--d3t-display",
  display: "swap",
});

// Labels / Meta: Fragment Mono (uppercase, getrackt) — D3-System-Schrift.
const fragment = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--d3t-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Designthese B (D3) — Amtshelden Supertools",
  description:
    "Visuelle These B: Supertools-Startseite in der Formsprache des D3-Designsystems — flach, editorial, Bone + Gelb, kondensierte Versalien.",
  robots: { index: false, follow: false },
};

export default function D3ThesisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`d3t ${archivo.variable} ${fragment.variable}`}>
      {children}
    </div>
  );
}
