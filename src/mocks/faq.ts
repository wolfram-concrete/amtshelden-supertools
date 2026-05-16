/**
 * Häufige Fragen aus Behördensicht.
 * Verwendet im FaqBlock (Main) und in der Sidebar (Quicklinks).
 */

export interface FaqItem {
  question: string;
  /** Kurze Antwort für FAQ-Block (1-3 Sätze) */
  answer: string;
  /** Optional: vertieft im Wissensbereich */
  readMoreSlug?: string;
}

export const behoerdenFaqs: FaqItem[] = [
  {
    question: "Wie wählen Sie aus, welche Tools aufgenommen werden?",
    answer:
      "Wir kuratieren handverlesen. Ein Tool wird aufgenommen, wenn mindestens drei Behörden es im Produktivbetrieb nutzen und uns die Hersteller einen ehrlichen Einblick gewähren. Kein Pay-to-List.",
    readMoreSlug: "warum-kein-ranking",
  },
  {
    question: "Vergeben Sie Bewertungen oder Sterne?",
    answer:
      "Nein. Wir ordnen redaktionell ein — wer passt zu wem, unter welchen Bedingungen. Sterne suggerieren Vergleichbarkeit, die in der Behörden-Software-Welt nicht existiert.",
    readMoreSlug: "warum-kein-ranking",
  },
  {
    question: "Sind die gelisteten Tools DSGVO-konform?",
    answer:
      "Jedes Tool-Profil führt den DSGVO-Status separat. Wir prüfen Serverstandort, Auftragsverarbeitungsverträge und BSI-Zertifizierungen — aber die abschließende Prüfung liegt bei deinem Datenschutzbeauftragten.",
  },
  {
    question: "Kann ich über Supertools direkt eine Software kaufen?",
    answer:
      "Nein. Wir vermitteln den Erstkontakt zum Anbieter. Vergabe, Vertrag und Kauf laufen direkt zwischen Behörde und Hersteller — wie es das Vergaberecht verlangt.",
    readMoreSlug: "vergabe-software",
  },
  {
    question: "Sind die Tools ausschreibungsfähig?",
    answer:
      'Ob ein Tool nach UVgO oder VOL/A ausschreibungsfähig ist, vermerken wir im Profil unter „Vergabe". Bei Unsicherheit lassen Sie sich vom Anbieter eine Referenz-Ausschreibung zeigen.',
    readMoreSlug: "vergabe-software",
  },
  {
    question: "Wie lange dauert eine typische Software-Einführung?",
    answer:
      "Je nach Tool zwischen 6 Wochen (schmale Cloud-Lösung) und 9 Monaten (Querschnittssoftware). Jedes Profil nennt eine realistische Spanne — keine Marketing-Zahl.",
    readMoreSlug: "e-akte-einfuehrung",
  },
  {
    question: "Was kostet eine Listung für Software-Anbieter?",
    answer:
      "Das Basis-Profil ist kostenfrei (Crawler-basiert). Verified Listing 199–299 €/Mo. Add-ons (Ansprechpartner, Cases, Amtshelden-Urteil) einzeln buchbar. Kein Pay-to-Rank.",
  },
  {
    question: "Kann ich als Behörde Erfahrungen teilen?",
    answer:
      "Ja, sehr gerne. Wir freuen uns über Implementierungsberichte — ehrlich, mit Höhen und Stolpersteinen. Schreib uns an redaktion@amtshelden.de.",
  },
];
