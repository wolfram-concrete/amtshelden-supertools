/**
 * Persona-Stimmen aus dem Verwaltungsalltag — typische Ausgangslagen.
 *
 * Bewusst ROLLENBASIERT (keine erfundenen Namens-Testimonials): jede Stimme
 * ist eine repräsentative Behörden-Persona mit ihrem konkreten Problemfall.
 * Zweck: Relevanz + Vertrauen — „hier wurde für Menschen wie mich gedacht".
 */

import type { BrandIconName } from "@/components/icons/BrandIcon";

export interface Stimme {
  /** Problem in der Ich-Form (Persona-Stimme) */
  quote: string;
  /** Rolle der Persona */
  role: string;
  /** Behördentyp + Größe */
  context: string;
  /** Passendes Themenfeld (Verlinkung + Icon) */
  themenfeld: { slug: string; name: string; icon: BrandIconName };
}

export const stimmen: Stimme[] = [
  {
    quote:
      "Bei einer Hochwasserlage müssen wir in Minuten über fünf Kanäle informieren — und haben kein Werkzeug, das das koordiniert.",
    role: "Pressestelle",
    context: "Landkreis · ~120.000 Einwohner",
    themenfeld: {
      slug: "kommunikation-krise",
      name: "Kommunikation & Krise",
      icon: "alert",
    },
  },
  {
    quote:
      "Wir verlieren Bewerber, weil unser Verfahren vier Wochen dauert und sich zwischendurch niemand meldet.",
    role: "Hauptamt",
    context: "Kommune · ~18.000 Einwohner",
    themenfeld: {
      slug: "smartes-personalmanagement",
      name: "Smartes Personalmanagement",
      icon: "user-plus",
    },
  },
  {
    quote:
      "Die E-Akte ist eingeführt — aber die Hälfte der Kolleginnen druckt weiter aus. Woran liegt das, und was hilft wirklich?",
    role: "Digitalisierungsbeauftragte",
    context: "Stadt · ~60.000 Einwohner",
    themenfeld: {
      slug: "transformation-ki",
      name: "Transformation & KI",
      icon: "sparkles",
    },
  },
  {
    quote:
      "Ich soll den Haushalt steuern, sehe die entscheidenden Zahlen aber erst, wenn das Quartal längst vorbei ist.",
    role: "Kämmerei",
    context: "Gemeinde · ~9.000 Einwohner",
    themenfeld: {
      slug: "moderne-fuehrung",
      name: "Moderne Führung",
      icon: "target",
    },
  },
  {
    quote:
      "Bürger erwarten Online-Anträge. Unsere Fachverfahren sprechen aber nicht miteinander — jede Schnittstelle ist ein Projekt.",
    role: "IT-Leitung",
    context: "Stadt · ~45.000 Einwohner",
    themenfeld: {
      slug: "transformation-ki",
      name: "Transformation & KI",
      icon: "sparkles",
    },
  },
];
