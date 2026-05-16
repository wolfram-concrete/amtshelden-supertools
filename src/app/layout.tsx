import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Sans, Inter_Tight } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Amtshelden Supertools — Software für die digitale Verwaltung",
    template: "%s — Supertools",
  },
  description:
    "Handverlesene Software für Behörden. Kuratiert, ehrlich, aus Behördenperspektive eingeordnet.",
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
      className={`${cormorant.variable} ${ibmPlex.variable} ${interTight.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
