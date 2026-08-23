/**
 * Trust-Stats für TrustStrip (unter Hero) und Sidebar-Widget.
 * Werden später automatisch aus der DB berechnet — aktuell hartkodiert.
 */

export interface TrustStat {
  value: string;
  label: string;
  hint?: string;
}

export const trustStats: TrustStat[] = [
  {
    value: "8",
    label: "Tools im Verzeichnis",
    hint: "Wir wachsen handverlesen, nicht automatisch.",
  },
  {
    value: "6",
    label: "Kategorien",
    hint: "Von E-Akte bis Personalmanagement.",
  },
  {
    value: "7",
    label: "Magazin-Beiträge",
    hint: "Redaktionell, ohne PR-Phrasen.",
  },
  {
    value: "100 %",
    label: "DSGVO-geprüft",
    hint: "Server­standort, AVV, Vergabe­eignung pro Tool.",
  },
];

/**
 * Profilstufen — statt eines Über-Prüfversprechens für jedes Tool machen wir die
 * Tiefe transparent. Jede Stufe ist am Profil klar gekennzeichnet (Christian-
 * Feedback 1.4/4.3). Nicht jedes Profil ist gleich tief — aber jede Tiefe ehrlich.
 */
export interface MethodStep {
  number: string;
  title: string;
  body: string;
}

export const methodSteps: MethodStep[] = [
  {
    number: "01",
    title: "Basis-Profil",
    body: "Aus öffentlich auffindbaren Quellen erstellt: Anbieter, Kategorie, Kurzbeschreibung, Compliance-Hinweise. Keine Empfehlung, keine tiefe Prüfung.",
  },
  {
    number: "02",
    title: "Anbieter-geprüft",
    body: "Der Anbieter hat Angaben ergänzt oder bestätigt — sichtbar gekennzeichnet. Weiterhin keine Empfehlung, keine bessere Bewertung.",
  },
  {
    number: "03",
    title: "Redaktionell vertieft",
    body: "Wir prüfen die Angaben strukturiert, benennen offene Punkte und formulieren Einsatzgrenzen — für wen geeignet, für wen eher nicht.",
  },
  {
    number: "04",
    title: "Praxis-Profil",
    body: "Es gibt einen konkreten Praxisfall oder ein Gespräch mit einer Verwaltung, die das Tool tatsächlich einsetzt — nachvollziehbar gekennzeichnet.",
  },
];
