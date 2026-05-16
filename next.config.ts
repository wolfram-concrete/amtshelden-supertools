import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Solange wir keine eigenen Medien haben, nutzen wir Unsplash als
    // Platzhalter (Skill: Mock-Daten dürfen externe URLs verwenden).
    // Vor Produktion: durch eigene KI-Bilder ersetzen (README Kap. 28).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
