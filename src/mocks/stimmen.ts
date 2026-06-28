/**
 * Persona-Stimmen aus dem Verwaltungsalltag — typische Ausgangslagen.
 *
 * ⚠️ PLATZHALTER: Die Stadtwappen sind echt (Wikipedia/Commons), die Zitate
 * und die Zuordnung zur jeweiligen Stadt sind aber FIKTIV — nur fürs Layout.
 * Vor dem Livegang durch echte, freigegebene Referenz-Cases (echtes Logo +
 * echtes Zitat + echte Stadt) ersetzen.
 */

import type { BrandIconName } from "@/components/icons/BrandIcon";

export interface Stimme {
  /** Problem in der Ich-Form (Persona-Stimme) */
  quote: string;
  /** Rolle der Persona */
  role: string;
  /** Stadt (Platzhalter, passend zum Wappen) */
  context: string;
  /** Stadtwappen (echtes Hoheitszeichen — Platzhalter, später echte Referenz) */
  wappen: string;
  /** Repräsentatives Stadtbild (Commons — Platzhalter) */
  stadtbild: string;
  /** Passendes Themenfeld (Verlinkung + Icon) */
  themenfeld: { slug: string; name: string; icon: BrandIconName };
}

export const stimmen: Stimme[] = [
  {
    quote:
      "Bei einer Hochwasserlage müssen wir in Minuten über fünf Kanäle informieren — und haben kein Werkzeug, das das koordiniert.",
    role: "Pressestelle",
    context: "Stadt Passau",
    wappen: "/brand/wappen/passau.png",    stadtbild: "/brand/staedte/passau.jpg",
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
    context: "Stadt Münster",
    wappen: "/brand/wappen/muenster.png",    stadtbild: "/brand/staedte/muenster.jpg",
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
    context: "Stadt Heidelberg",
    wappen: "/brand/wappen/heidelberg.png",    stadtbild: "/brand/staedte/heidelberg.jpg",
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
    context: "Stadt Konstanz",
    wappen: "/brand/wappen/konstanz.png",    stadtbild: "/brand/staedte/konstanz.jpg",
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
    context: "Stadt Freiburg",
    wappen: "/brand/wappen/freiburg.png",    stadtbild: "/brand/staedte/freiburg.jpg",
    themenfeld: {
      slug: "transformation-ki",
      name: "Transformation & KI",
      icon: "sparkles",
    },
  },
];
