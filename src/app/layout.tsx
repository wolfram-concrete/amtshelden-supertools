import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Selbst gehostete Fonts (woff2 in ./fonts) — kein Google-Fonts-CDN zur Buildzeit
// (README Kap. 23), damit der Build nicht am next/font/google-Loader scheitert.

// Hero-Display — schwere, eng laufende Grotesk (Haltung aus Designthese B/D3),
// gemischtschriftlich eingesetzt. Nur für die Hero-Headline.
const archivo = localFont({
  src: [
    { path: "./fonts/archivo-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/archivo-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-archivo",
  display: "swap",
});

// Headlines — Baseframe-System: Editorial Serif, Regular-Schnitt (kein Bold)
const ibmSerif = localFont({
  src: [
    { path: "./fonts/ibm-plex-serif-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-serif-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/ibm-plex-serif-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-serif-500-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/ibm-plex-serif-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ibm-plex-serif-600-italic.woff2", weight: "600", style: "italic" },
  ],
  variable: "--font-ibm-serif",
  display: "swap",
});

// Body + UI — Structural Sans
const ibmPlex = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/ibm-plex-sans-300-italic.woff2", weight: "300", style: "italic" },
    { path: "./fonts/ibm-plex-sans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-sans-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/ibm-plex-sans-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-sans-500-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/ibm-plex-sans-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ibm-plex-sans-600-italic.woff2", weight: "600", style: "italic" },
  ],
  variable: "--font-ibm-plex",
  display: "swap",
});

// Labels, Tags, Metadata — Precision Mono (uppercase, wide tracking)
const ibmMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-ibm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Amtshelden Supertools — Software für die digitale Verwaltung",
    template: "%s — Supertools",
  },
  description:
    "Die passende Software für Ihre Verwaltung. Von Expert:innen kuratiert, ehrlich aus Behördenperspektive eingeordnet.",
  metadataBase: new URL("https://supertools.amtshelden.de"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${ibmSerif.variable} ${ibmPlex.variable} ${ibmMono.variable} ${archivo.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
