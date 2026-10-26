import type { Metadata } from "next";
import {
  Archivo,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Serif,
} from "next/font/google";
import "./globals.css";

// Hero-Display — schwere, eng laufende Grotesk (Haltung aus Designthese B/D3),
// gemischtschriftlich eingesetzt. Nur für die Hero-Headline.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

// Headlines — Baseframe-System: Editorial Serif, Regular-Schnitt (kein Bold)
const ibmSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-ibm-serif",
  display: "swap",
});

// Body + UI — Structural Sans
const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex",
  display: "swap",
});

// Labels, Tags, Metadata — Precision Mono (uppercase, wide tracking)
const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
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
