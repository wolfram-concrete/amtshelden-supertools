import type { Metadata } from "next";
import localFont from "next/font/local";

import "./d3-thesis.css";

// Selbst gehostete Fonts (woff2 in ../fonts) — kein Google-Fonts-CDN zur Buildzeit.

// Display + Text: Archivo (heavy, leicht breitlaufend, Versal) — D3-Haltung.
const archivo = localFont({
  src: [
    { path: "../fonts/archivo-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/archivo-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/archivo-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/archivo-700.woff2", weight: "700", style: "normal" },
    { path: "../fonts/archivo-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--d3t-display",
  display: "swap",
});

// Labels / Meta: Fragment Mono (uppercase, getrackt) — D3-System-Schrift.
const fragment = localFont({
  src: [{ path: "../fonts/fragment-mono-400.woff2", weight: "400", style: "normal" }],
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
