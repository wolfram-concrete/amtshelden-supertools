import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter_Tight, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
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
      className={`${sourceSerif.variable} ${ibmPlex.variable} ${interTight.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
