/**
 * Echte Anwendung — Software-Referenzen.
 *
 * Nicht aus Städte-Sicht (eine Kommune bestätigt einen Erfolg), weil Verwaltungen
 * so eine Auskunft selten freigeben. Stattdessen aus Software-Sicht: was eine
 * Lösung konkret leistet, welches Behördenproblem sie adressiert, für wen sie
 * passt und wo ihre Grenzen liegen.
 *
 * ⚠️ MVP-PLATZHALTER: Die drei Software-Referenzen sind demo-Katalog-Einträge
 * (VivioAkte, OZG-Portal, Dialog-Assistent). Die Leistungsbeschreibungen sind
 * auf Fähigkeits-Ebene gehalten (was die Software kann), KEINE erfundenen
 * Behörden-Zitate oder benannten Personen. Vor dem öffentlichen Livegang durch
 * quellenbelegte, mit dem Anbieter abgestimmte Referenzen ersetzen (AGENTS.md:
 * Quellenbindung, Trennung von Signal und redaktioneller Aussage). Der Demo-
 * Status steht im Projektgedächtnis, nicht auf der Seite.
 */

import type { CaseStudy, CaseSummary } from "@/types/content";

export const cases: CaseStudy[] = [
  // ============================================================
  // 1 — VivioAkte · E-Akte & Dokumentenmanagement
  // ============================================================
  {
    slug: "vivioakte-e-akte",
    eyebrow: "E-Akte & Dokumentenmanagement",
    title: "VivioAkte: E-Akte, die sich an die Verwaltung anpasst.",
    lead: "Dokumentenmanagement, das die vorhandene Ämterstruktur abbildet, statt sie umzukrempeln. Standardschnittstellen zu Fachverfahren, ein Rollenkonzept über viele Ämter, Betrieb im deutschen Rechenzentrum.",
    tool: {
      name: "VivioAkte",
      categoryLabel: "E-Akte & Dokumentenmanagement",
      slug: "vivioakte",
    },
    nutzen: [
      "Passt sich an bestehende Abläufe an",
      "Rollen und Rechte über viele Ämter",
      "Cloud im deutschen Rechenzentrum",
    ],
    cover: {
      url: "/brand/generated/bereich-e-akte.jpg",
      alt: "Sachbearbeitung mit Aktenordnern am Bildschirm",
      width: 1600,
      height: 900,
    },
    readingTime: 4,
    publishedAt: "2026-09-18",
    facts: [
      { label: "Betrieb", value: "Cloud, Rechenzentrum in Deutschland" },
      { label: "Einführung", value: "schrittweise, Pilot möglich" },
      { label: "Schnittstellen", value: "Fachverfahren, Ratsinformationssystem" },
      { label: "Eignung", value: "Kommunen mit vielen Ämtern" },
      { label: "Beschaffung", value: "über Rahmenvertrag möglich" },
    ],
    body: [
      { kind: "heading", text: "Was sie leistet" },
      {
        kind: "paragraph",
        text: "VivioAkte führt Dokumente, Vorgänge und Akten an einem Ort zusammen und bildet dabei die vorhandene Ämterstruktur ab. Die Verwaltung muss sich nicht an eine Standardsoftware anpassen, die Lösung lässt sich an die bestehenden Abläufe anpassen.",
      },
      {
        kind: "list",
        items: [
          "Rollen- und Rechtekonzept über viele Ämter und Beschäftigte",
          "Standardschnittstellen zu Fachverfahren und zum Ratsinformationssystem",
          "Schrittweise Migration von Alt- und Hybridakten ohne Doppelerfassung",
          "Aktenplan und Fristen nach den Vorgaben der Verwaltung",
        ],
      },
      { kind: "heading", text: "Das Problem, das sie adressiert" },
      {
        kind: "paragraph",
        text: "Papierakten wandern per Hauspost zwischen den Ämtern, digitale Zwischenstände liegen parallel in Postfächern und auf Netzlaufwerken. Wer eine Akte sucht, fragt oft erst mehrere Kolleginnen. Mit der Pflicht zur E-Akte und Umzügen in Gebäude ohne Aktenkeller wird aus dem Wunsch eine Notwendigkeit.",
      },
      { kind: "heading", text: "Für welche Behörde" },
      {
        kind: "paragraph",
        text: "Vor allem für Kommunen mit vielen Ämtern, die ihre Abläufe nicht komplett neu aufsetzen, sondern geordnet digitalisieren wollen. Über bestehende Rahmenverträge verkürzt sich die Beschaffung oft deutlich.",
      },
      { kind: "heading", text: "Voraussetzungen und Grenzen" },
      {
        kind: "list",
        items: [
          "Die eigentliche Arbeit liegt im sauberen Beschreiben der Prozesse, nicht in der Technik",
          "Key-User je Amt und Schulungen in kleinen Gruppen tragen die Einführung",
          "Updates werden zuerst in einer Testumgebung geprüft, bevor sie produktiv gehen",
        ],
      },
    ],
    related: ["ozg-portal-buergerservice", "dialog-assistent-ki"],
  },

  // ============================================================
  // 2 — OZG-Portal · Bürgerservice & Fachverfahren
  // ============================================================
  {
    slug: "ozg-portal-buergerservice",
    eyebrow: "Bürgerservice & Fachverfahren",
    title: "OZG-Portal: Online-Anträge, die bis in die Sachbearbeitung durchlaufen.",
    lead: "Durchgängige Antragsstrecken nach FIM, nicht nur PDF-Formulare. Anbindung an das Einwohner-Fachverfahren, an Servicekonto und BundID, Betrieb als SaaS mit Hosting in Deutschland.",
    tool: {
      name: "OZG-Portal",
      categoryLabel: "Bürgerservice & Fachverfahren",
      slug: "ozg-portal",
    },
    nutzen: [
      "Durchgängig bis in die Sachbearbeitung",
      "FIM, BundID und Servicekonto angebunden",
      "SaaS, Hosting in Deutschland",
    ],
    cover: {
      url: "/brand/generated/bereich-buergerservice.jpg",
      alt: "Beratungsgespräch am Schreibtisch in der Verwaltung",
      width: 1600,
      height: 900,
    },
    readingTime: 4,
    publishedAt: "2026-08-26",
    facts: [
      { label: "Betrieb", value: "SaaS, Hosting in Deutschland" },
      { label: "Standard", value: "FIM-konform" },
      { label: "Anbindung", value: "Fachverfahren, BundID, Bezahlung" },
      { label: "Start", value: "wenige Dienste, erweiterbar" },
      { label: "Eignung", value: "Kommunen mit OZG-Druck" },
    ],
    body: [
      { kind: "heading", text: "Was sie leistet" },
      {
        kind: "paragraph",
        text: "Das OZG-Portal macht Antragsstrecken durchgängig: von der Online-Eingabe bis in die Sachbearbeitung, nach dem FIM-Standard und nicht nur als PDF-Formular zum Ausdrucken.",
      },
      {
        kind: "list",
        items: [
          "Anbindung an das eingesetzte Einwohner-Fachverfahren",
          "Servicekonto, BundID und eine Bezahlfunktion angebunden",
          "Betrieb als SaaS, Updates durch den Anbieter, Hosting in Deutschland",
          "Start mit wenigen Leistungen, erweiterbar nach stabilem Betrieb",
        ],
      },
      { kind: "heading", text: "Das Problem, das sie adressiert" },
      {
        kind: "paragraph",
        text: "Viele Online-Anträge enden am Amtsdrucker. Daten werden ein zweites Mal ins Fachverfahren getippt, Rückfragen laufen per Telefon, die Durchlaufzeiten schwanken. Der digitale Eindruck endet an der Amtstür.",
      },
      { kind: "heading", text: "Für welche Behörde" },
      {
        kind: "paragraph",
        text: "Für Kommunen unter OZG-Druck, denen weniger die Zahl der Leistungen hilft als der saubere Durchlauf der wichtigsten. Wer die zehn meistgenutzten Anträge durchgängig abbildet, erreicht die meisten Menschen.",
      },
      { kind: "heading", text: "Voraussetzungen und Grenzen" },
      {
        kind: "list",
        items: [
          "Der Aufwand steckt im Beschreiben der FIM-Prozesse hinter jedem Antrag",
          "Die bearbeitenden Kolleginnen und Kollegen von Beginn an einbinden",
          "Erst stabil betreiben, dann das Angebot erweitern",
        ],
      },
    ],
    related: ["vivioakte-e-akte", "dialog-assistent-ki"],
  },

  // ============================================================
  // 3 — Dialog-Assistent · KI für den Bürgerdialog
  // ============================================================
  {
    slug: "dialog-assistent-ki",
    eyebrow: "Bürgerservice & Fachverfahren",
    title: "Dialog-Assistent: KI für den Bürgerdialog, die ihre Grenzen kennt.",
    lead: "Antworten strikt an geprüfte städtische Inhalte gebunden, keine freie Texterzeugung. Jederzeit Übergabe an Mitarbeitende, Betrieb in Deutschland, keine Nutzung der Anfragen für Modelltraining.",
    tool: {
      name: "Dialog-Assistent",
      categoryLabel: "Bürgerservice & Fachverfahren",
    },
    nutzen: [
      "Antworten nur aus geprüften Inhalten",
      "Übergabe an Menschen jederzeit",
      "Server in Deutschland, kein Training mit Anfragen",
    ],
    cover: {
      url: "/brand/generated/bereich-kommunikation.jpg",
      alt: "Team einer Verwaltung in einer Besprechung",
      width: 1600,
      height: 900,
    },
    readingTime: 4,
    publishedAt: "2026-10-02",
    facts: [
      { label: "Betrieb", value: "Server in Deutschland" },
      { label: "Antwortquelle", value: "nur geprüfte Inhalte" },
      { label: "Eskalation", value: "an Mitarbeitende jederzeit" },
      { label: "Start", value: "enger Themenbereich" },
      { label: "Datenschutz", value: "DSFA empfohlen" },
    ],
    body: [
      { kind: "heading", text: "Was sie leistet" },
      {
        kind: "paragraph",
        text: "Der Dialog-Assistent beantwortet häufige Bürgeranliegen, bleibt dabei aber strikt an geprüfte städtische Inhalte gebunden. Er erzeugt keine freien Texte und übergibt an Mitarbeitende, sobald er unsicher ist.",
      },
      {
        kind: "list",
        items: [
          "Antworten nur aus freigegebenen Inhalten, keine freie Texterzeugung",
          "Jederzeit nachvollziehbare Protokolle und klare Eskalation an Mitarbeitende",
          "Deutlich als Assistent gekennzeichnet, barrierefrei nutzbar",
          "Server in Deutschland, keine Nutzung der Anfragen für Modelltraining",
        ],
      },
      { kind: "heading", text: "Das Problem, das sie adressiert" },
      {
        kind: "paragraph",
        text: "Die Servicehotline beantwortet über den Tag immer wieder dieselben Fragen: Abfuhrtermine, Öffnungszeiten, welches Formular wohin gehört. In Stoßzeiten steigen die Wartezeiten, und qualifizierte Beschäftigte binden Zeit mit Auskünften, die auch vorab beantwortbar gewesen wären.",
      },
      { kind: "heading", text: "Für welche Behörde" },
      {
        kind: "paragraph",
        text: "Für Verwaltungen, die die Hotline entlasten wollen, ohne Bürgerinnen und Bürger an eine unausgereifte KI zu verweisen. Der Assistent ergänzt die Hotline, er ersetzt sie nicht.",
      },
      { kind: "heading", text: "Voraussetzungen und Grenzen" },
      {
        kind: "list",
        items: [
          "Datenschutz-Folgenabschätzung vor dem Start, Personalrat von Anfang an einbeziehen",
          "Eng beginnen: wenige, gut gepflegte Themen schlagen viele halbgare",
          "Jeder neue Themenbereich wird vor der Freischaltung geprüft",
        ],
      },
    ],
    related: ["vivioakte-e-akte", "ozg-portal-buergerservice"],
  },
];

export const caseSummaries: CaseSummary[] = cases.map(
  ({ facts: _facts, body: _body, related: _related, ...summary }) => summary,
);

export const caseRegistry: Record<string, CaseStudy> = Object.fromEntries(
  cases.map((c) => [c.slug, c]),
);
