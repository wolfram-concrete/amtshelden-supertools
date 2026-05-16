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
 * Schritte „So prüfen wir Software" — redaktionelle Methodik
 * (QuickGuide-Block).
 */
export interface MethodStep {
  number: string;
  title: string;
  body: string;
}

export const methodSteps: MethodStep[] = [
  {
    number: "01",
    title: "Hersteller-Gespräch",
    body: "Wir sprechen mit dem Anbieter — über Stärken UND Grenzen. Wer nicht ehrlich über Schwächen redet, kommt nicht ins Verzeichnis.",
  },
  {
    number: "02",
    title: "Drei Referenz-Behörden",
    body: "Mindestens drei Verwaltungen, die das Tool produktiv nutzen, geben uns Einblick in den realen Einsatz — auch in das, was schiefgelaufen ist.",
  },
  {
    number: "03",
    title: "Compliance-Audit",
    body: "DSGVO-Status, Serverstandort, BSI-Zertifizierungen, Vergabeeignung — schriftlich nachgewiesen, nicht nur behauptet.",
  },
  {
    number: "04",
    title: "Redaktionelles Urteil",
    body: 'Erst dann schreibt unsere Redaktion das Profil — aus Behördenperspektive, mit ehrlicher „Für wen geeignet"- und „Für wen nicht"-Einordnung.',
  },
];
