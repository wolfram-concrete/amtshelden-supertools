/**
 * Echte Anwendung — Praxis-Cases (Beispielstädte).
 *
 * ⚠️ BEISPIEL / PLATZHALTER: Die Städte sind real (Foto + Wappen aus
 * öffentlichen Quellen, als Beispielmotiv). Die geschilderten Abläufe,
 * Personen, Zahlen und Zitate sind exemplarisch zusammengestellt und NICHT von
 * den genannten Städten freigegeben. Sie zeigen, wie eine echte, abgestimmte
 * Referenz aufgebaut wäre. Vor dem Livegang durch nachprüfbare, freigegebene
 * Praxisfälle ersetzen (AGENTS.md: Quellenbindung, Trennung von Signal und
 * redaktioneller Aussage). Wappen-Attribution vor Produktion sicherstellen.
 *
 * Die geprüften Tools sind, wo möglich, echte Verzeichnis-Einträge
 * (VivioAkte, OZG-Portal), damit der Case zurück in den Katalog führt.
 */

import type { CaseStudy, CaseSummary } from "@/types/content";

export const cases: CaseStudy[] = [
  // ============================================================
  // 1 — E-Akte / VivioAkte · Beispielstadt Münster
  // ============================================================
  {
    slug: "muenster-e-akte-vivioakte",
    exemplary: true,
    eyebrow: "E-Akte & Dokumentenmanagement",
    title: "Münster: die E-Akte erst geprüft, dann Schritt für Schritt eingeführt.",
    lead: "Die Stadt Münster wollte raus aus der Papierakte, ohne den laufenden Betrieb zu gefährden. Katrin Vogts beschreibt, wie ihr Team VivioAkte ausgewählt, in zwei Ämtern erprobt und über Monate ausgerollt hat.",
    kommune: "Münster",
    kommuneTyp: "Kreisfreie Stadt, Nordrhein-Westfalen · 320.000 Einwohner",
    person: {
      name: "Katrin Vogts",
      role: "Leiterin Organisation und zentrale Dienste",
    },
    tool: {
      name: "VivioAkte",
      categoryLabel: "E-Akte & Dokumentenmanagement",
      slug: "vivioakte",
    },
    cover: {
      url: "/brand/staedte/muenster.jpg",
      alt: "Stadtansicht von Münster",
      width: 1600,
      height: 1067,
    },
    wappen: "/brand/wappen/muenster.png",
    readingTime: 6,
    publishedAt: "2026-09-18",
    facts: [
      { label: "Auswahlphase", value: "4 Monate" },
      { label: "Pilot", value: "2 Ämter, 24 Arbeitsplätze" },
      { label: "Rollout", value: "schrittweise über Ämter" },
      { label: "Betrieb", value: "Cloud, Rechenzentrum in Deutschland" },
      { label: "Im Einsatz seit", value: "Frühjahr 2025" },
    ],
    quote: {
      text: "Wir haben die E-Akte nicht als IT-Projekt behandelt, sondern als Organisationsprojekt. Das war im Rückblick die wichtigste Entscheidung.",
      source: "Katrin Vogts, Leiterin Organisation und zentrale Dienste",
    },
    body: [
      { kind: "heading", text: "Ausgangslage" },
      {
        kind: "paragraph",
        text: "Ein großer Teil der Vorgänge lag auf Papier. Akten wanderten per Hauspost zwischen den Ämtern, parallel entstanden digitale Zwischenstände in E-Mail-Postfächern und auf Netzlaufwerken. Wer eine Akte suchte, fragte oft erst drei Kolleginnen, bevor er sie fand. Mit der Pflicht zur E-Akte und dem Umzug einzelner Bereiche in sanierte Gebäude ohne klassische Aktenkeller wurde aus dem Wunsch eine Notwendigkeit.",
      },
      { kind: "heading", text: "Die Prüfung" },
      {
        kind: "paragraph",
        text: "Bevor Angebote eingeholt wurden, schrieb das Team auf, was die Lösung können musste. Die Liste war bewusst kurz und an den eigenen Abläufen orientiert, nicht am Marktstandard.",
      },
      {
        kind: "list",
        items: [
          "Nachweisbare DSGVO-Konformität und Datenhaltung in einem deutschen Rechenzentrum",
          "Vergaberechtssichere Beschaffung, möglichst über einen bestehenden Rahmenvertrag",
          "Standardschnittstellen zu den eingesetzten Fachverfahren und zum Ratsinformationssystem",
          "Ein nachvollziehbares Rechte- und Rollenkonzept über mehrere Tausend Beschäftigte und mehr als 20 Ämter",
          "Migration der Alt- und Hybridakten ohne Doppelerfassung",
        ],
      },
      {
        kind: "paragraph",
        text: "Drei Anbieter kamen in die engere Wahl. Die Stadt richtete eine sechswöchige Teststellung ein, in der zwei Fachämter echte Vorgänge im System abbildeten, und besuchte zwei vergleichbare Kommunen, die bereits produktiv arbeiteten. Entscheidend war weniger der Funktionsumfang auf dem Papier als die Frage, wie gut sich die Software an die vorhandenen Abläufe anpassen ließ.",
      },
      { kind: "heading", text: "Warum es passte" },
      {
        kind: "paragraph",
        text: "VivioAkte überzeugte nicht durch die längste Funktionsliste, sondern durch die Passung zum Ist-Zustand. Die vorhandenen Fachverfahren ließen sich über Standardschnittstellen anbinden, das Rollenkonzept bildete die Ämterstruktur ab, und die Oberfläche kam den Beschäftigten entgegen, die bisher kaum mit Dokumentenmanagement gearbeitet hatten. Dass der Anbieter über einen bestehenden Rahmenvertrag beschaffbar war, verkürzte die Vergabe deutlich.",
      },
      { kind: "heading", text: "Die Einführung" },
      {
        kind: "paragraph",
        text: "Eingeführt wurde nicht alles auf einmal. Den Anfang machten zwei Ämter mit 24 Arbeitsplätzen als Pilot.",
      },
      {
        kind: "list",
        items: [
          "Pilotbetrieb in zwei Ämtern, bevor weitere Bereiche folgten",
          "Key-User je Amt, früh geschult und als erste Anlaufstelle vor Ort",
          "Schrittweise Migration: Altakten blieben im Zugriff, neue Vorgänge entstanden nur noch digital",
          "Schulungen in kleinen Gruppen statt einer einmaligen Großveranstaltung",
        ],
      },
      {
        kind: "paragraph",
        text: "Der Rollout auf die übrigen Ämter zog sich über Monate. Länger wurde es überall dort, wo Prozesse vor der Digitalisierung erst neu beschrieben werden mussten. Vogts beschreibt das im Rückblick nicht als Fehler, sondern als den eigentlichen Kern des Projekts.",
      },
      {
        kind: "quote",
        text: "Die Technik war selten das Problem. Schwierig war, einen Prozess ehrlich aufzuschreiben, den über Jahre jeder ein bisschen anders gemacht hat.",
        source: "Katrin Vogts",
      },
      { kind: "heading", text: "Betrieb und Betreuung" },
      {
        kind: "paragraph",
        text: "Seit Frühjahr 2025 ist die E-Akte in den ersten Bereichen im Regelbetrieb. Der laufende Support läuft über ein Ticketsystem mit vereinbarten Reaktionszeiten, einmal im Monat gibt es einen Jour fixe mit dem Anbieter zu offenen Punkten, Updates und neuen Anforderungen. Intern tragen die Key-User die Lösung weiter: Sie schulen neue Beschäftigte, sammeln Verbesserungswünsche und entscheiden mit, welche Anpassungen Vorrang haben. Updates werden zuerst in einer Testumgebung geprüft, bevor sie produktiv gehen.",
      },
      {
        kind: "callout",
        calloutVariant: "info",
        text: "Beispiel-Case: Die Stadt und ihr Motiv sind real, die geschilderten Abläufe, Personen und Zitate sind exemplarisch und nicht von der Stadt freigegeben. Sobald eine Verwaltung einen abgestimmten Praxisfall freigibt, ersetzen wir das Beispiel.",
      },
    ],
    related: ["konstanz-ozg-portal", "freiburg-dialog-assistent"],
  },

  // ============================================================
  // 2 — Bürgerservice / OZG-Portal · Beispielstadt Konstanz
  // ============================================================
  {
    slug: "konstanz-ozg-portal",
    exemplary: true,
    eyebrow: "Bürgerservice & Fachverfahren",
    title: "Konstanz bringt Online-Anträge bis ins Fachverfahren.",
    lead: "In Konstanz endeten digitale Anträge bisher am Drucker. Markus Thiel erklärt, wie die Verwaltung mit dem OZG-Portal die Antragsstrecken durchgängig gemacht hat, von der Eingabe bis in die Sachbearbeitung.",
    kommune: "Konstanz",
    kommuneTyp: "Große Kreisstadt, Baden-Württemberg · 85.000 Einwohner",
    person: {
      name: "Markus Thiel",
      role: "Fachbereichsleiter Bürgerdienste",
    },
    tool: {
      name: "OZG-Portal",
      categoryLabel: "Bürgerservice & Fachverfahren",
      slug: "ozg-portal",
    },
    cover: {
      url: "/brand/staedte/konstanz.jpg",
      alt: "Stadtansicht von Konstanz",
      width: 1600,
      height: 1067,
    },
    wappen: "/brand/wappen/konstanz.png",
    readingTime: 5,
    publishedAt: "2026-08-26",
    facts: [
      { label: "Auswahlphase", value: "3 Monate" },
      { label: "Start", value: "6 Online-Dienste" },
      { label: "Einführung", value: "Go-live nach 5 Monaten" },
      { label: "Betrieb", value: "SaaS, FIM-konform, Server in Deutschland" },
      { label: "Im Einsatz seit", value: "Herbst 2024" },
    ],
    quote: {
      text: "Ein Online-Antrag, der am Amtsdrucker landet, ist kein digitaler Antrag. Diesen Bruch wollten wir schließen.",
      source: "Markus Thiel, Fachbereichsleiter Bürgerdienste",
    },
    body: [
      { kind: "heading", text: "Ausgangslage" },
      {
        kind: "paragraph",
        text: "Einige Leistungen waren online erreichbar, doch der Antrag wurde nach dem Absenden ausgedruckt und per Hand weiterbearbeitet. Daten mussten ein zweites Mal ins Fachverfahren getippt werden, Rückfragen liefen per Telefon, und die Durchlaufzeiten schwankten stark. Der digitale Eindruck endete an der Amtstür.",
      },
      { kind: "heading", text: "Die Prüfung" },
      {
        kind: "paragraph",
        text: "Für den Fachbereich zählte nicht nur, was eine Lösung kann, sondern auch, wie viel Betrieb sie verlangt. Geprüft wurde entlang weniger, klarer Kriterien.",
      },
      {
        kind: "list",
        items: [
          "Durchgängige Antragsstrecken nach FIM-Standard, nicht nur PDF-Formulare",
          "Standardanbindung an das eingesetzte Einwohner-Fachverfahren",
          "Anbindung an Servicekonto und BundID sowie an eine Bezahlfunktion",
          "Betrieb als SaaS, ohne zusätzliche eigene Serverlandschaft und mit Hosting in Deutschland",
          "Vertretbarer Pflegeaufwand im laufenden Fachbereichsbetrieb",
        ],
      },
      {
        kind: "paragraph",
        text: "Die Stadt ließ sich einen Demo-Mandanten einrichten und spielte zwei reale Leistungen vollständig durch, von der Eingabe bis in die Sachbearbeitung. Ergänzend tauschte sich Thiel mit einer Nachbarkommune aus, die dieselbe Lösung bereits nutzte. Wichtiger als die Zahl der verfügbaren Leistungen war, ob die sechs wichtigsten sauber liefen.",
      },
      { kind: "heading", text: "Warum es passte" },
      {
        kind: "paragraph",
        text: "Das OZG-Portal bildete die Antragsstrecken durchgängig nach FIM ab und brachte die Anbindung an das Einwohner-Fachverfahren als Standard mit. Der Betrieb als SaaS passte zur Lage: keine zusätzliche Serverlandschaft, Updates durch den Anbieter, klare Zuständigkeit. Servicekonto und BundID waren bereits angebunden, sodass sich der Fachbereich auf die eigentliche Arbeit konzentrieren konnte, nämlich die Prozesse hinter den Anträgen.",
      },
      { kind: "heading", text: "Die Einführung" },
      {
        kind: "paragraph",
        text: "Zum Start gingen sechs Leistungen mit hohem Aufkommen live, darunter Meldebescheinigung, Bewohnerparkausweis und Gewerbeanmeldung. Entscheidend war die Vorarbeit: Jeder Prozess hinter einem Antrag wurde einmal sauber beschrieben, bevor er ins Portal kam.",
      },
      {
        kind: "list",
        items: [
          "Start mit sechs häufig genutzten Leistungen statt des gesamten Katalogs",
          "FIM-Prozesse hinter jedem Antrag vorab mit den Sachbearbeitenden definiert",
          "Die bearbeitenden Kolleginnen und Kollegen von Beginn an eingebunden",
          "Erweiterung des Angebots erst nach stabilem Betrieb der ersten Dienste",
        ],
      },
      {
        kind: "quote",
        text: "Das Portal war schnell eingerichtet. Die Arbeit steckte darin, die Abläufe dahinter zu klären. Wer das überspringt, digitalisiert nur das Chaos.",
        source: "Markus Thiel",
      },
      { kind: "heading", text: "Betrieb und Betreuung" },
      {
        kind: "paragraph",
        text: "Seit Herbst 2024 ist das Portal im Betrieb, das Angebot wurde seither schrittweise erweitert. Der Anbieter stellt Updates und neue Leistungszuschnitte bereit, die Stadt beobachtet die Durchlaufzeiten je Dienst und greift ein, wo es hakt. Hilfreich ist der Austausch mit anderen Kommunen, die dieselbe Lösung nutzen: Vieles, was eine Verwaltung erarbeitet, lässt sich übernehmen.",
      },
      {
        kind: "callout",
        calloutVariant: "info",
        text: "Beispiel-Case: Die Stadt und ihr Motiv sind real, die geschilderten Abläufe, Personen und Zitate sind exemplarisch und nicht von der Stadt freigegeben. Sobald eine Verwaltung einen abgestimmten Praxisfall freigibt, ersetzen wir das Beispiel.",
      },
    ],
    related: ["muenster-e-akte-vivioakte", "freiburg-dialog-assistent"],
  },

  // ============================================================
  // 3 — KI-Chatbot / Bürgerdialog · Beispielstadt Freiburg
  // ============================================================
  {
    slug: "freiburg-dialog-assistent",
    exemplary: true,
    eyebrow: "Bürgerservice & Fachverfahren",
    title: "Freiburg testet einen KI-Assistenten für den Bürgerdialog, vorsichtig.",
    lead: "Freiburg wollte die Servicehotline entlasten, ohne Bürgerinnen und Bürger an eine unausgereifte KI zu verweisen. Dr. Nadine Bergmann schildert, wie die Stadt einen Dialog-Assistenten geprüft, eng begrenzt eingeführt und unter Beobachtung hält.",
    kommune: "Freiburg",
    kommuneTyp: "Stadtkreis, Baden-Württemberg · 230.000 Einwohner",
    person: {
      name: "Dr. Nadine Bergmann",
      role: "Stabsstelle Digitalisierung",
    },
    tool: {
      name: "Dialog-Assistent",
      categoryLabel: "Bürgerservice & Fachverfahren",
    },
    cover: {
      url: "/brand/staedte/freiburg.jpg",
      alt: "Stadtansicht von Freiburg",
      width: 1600,
      height: 1067,
    },
    wappen: "/brand/wappen/freiburg.png",
    readingTime: 6,
    publishedAt: "2026-10-02",
    facts: [
      { label: "Auswahlphase", value: "5 Monate, inkl. Datenschutz-Folgenabschätzung" },
      { label: "Pilot", value: "20 häufige Anliegen, 1 Fachbereich" },
      { label: "Betrieb", value: "Server in Deutschland, keine Weitergabe an Dritte" },
      { label: "Eskalation", value: "Übergabe an Mitarbeitende jederzeit" },
      { label: "Im Pilot seit", value: "Anfang 2026" },
    ],
    quote: {
      text: "Wir wollten keine KI, die alles beantwortet. Wir wollten eine, die weiß, wann sie an einen Menschen übergibt.",
      source: "Dr. Nadine Bergmann, Stabsstelle Digitalisierung",
    },
    body: [
      { kind: "heading", text: "Ausgangslage" },
      {
        kind: "paragraph",
        text: "Die Servicehotline beantwortete über den Tag immer wieder dieselben Fragen: Abfuhrtermine, Öffnungszeiten, welches Formular wohin gehört, wie ein Termin zu buchen ist. In Stoßzeiten stiegen die Wartezeiten, und qualifizierte Beschäftigte verbrachten viel Zeit mit Auskünften, die auch vorab beantwortbar gewesen wären. Die Idee eines Assistenten lag nahe, die Skepsis war groß.",
      },
      { kind: "heading", text: "Die Prüfung" },
      {
        kind: "paragraph",
        text: "Die Stadt ging an die Auswahl nicht über den Funktionsumfang, sondern über die Grenzen. Die zentrale Frage lautete, was passiert, wenn der Assistent etwas nicht weiß, und wo die Daten bleiben.",
      },
      {
        kind: "list",
        items: [
          "Datenhaltung in Deutschland, keine Nutzung der Bürgeranfragen für Modelltraining",
          "Antworten strikt gebunden an geprüfte städtische Inhalte, keine freie Texterzeugung",
          "Datenschutz-Folgenabschätzung vor dem Pilot, Personalrat von Anfang an einbezogen",
          "Jederzeit nachvollziehbare Protokolle und eine klare Eskalation an Mitarbeitende",
          "Barrierefreie Nutzung und eine deutliche Kennzeichnung als Assistent, nicht als Mensch",
        ],
      },
      {
        kind: "paragraph",
        text: "Der Pilot lief sechs Wochen mit einem bewusst engen Themenbereich. Der zuständige Fachbereich las die Antworten des Assistenten gegen und meldete zurück, wo sie unscharf oder falsch waren. Erst danach entschied die Stadt über einen begrenzten Echtbetrieb.",
      },
      { kind: "heading", text: "Warum es passte" },
      {
        kind: "paragraph",
        text: "Ausschlaggebend war, dass die Antworten an geprüfte Inhalte gebunden blieben, statt frei formuliert zu werden. Der Assistent gibt zu, wenn er etwas nicht sicher weiß, und übergibt dann an einen Menschen. Der Betrieb in Deutschland und die klaren Protokolle machten die Datenschutz-Folgenabschätzung handhabbar. Die Stadt verstand die Lösung von Anfang an als Ergänzung der Hotline, nicht als deren Ersatz.",
      },
      { kind: "heading", text: "Die Einführung" },
      {
        kind: "paragraph",
        text: "Der Echtbetrieb startete klein: 20 der häufigsten Anliegen, ein Fachbereich, deutlich sichtbar als Assistent gekennzeichnet. Wer tiefer gehende Fragen hat oder lieber mit einer Person spricht, wird ohne Umweg weitergeleitet.",
      },
      {
        kind: "quote",
        text: "Hätten wir mit hundert Themen gestartet, wären wir an der Pflege gescheitert. Zwanzig gut gepflegte Antworten sind mehr wert als hundert halbgare.",
        source: "Dr. Nadine Bergmann",
      },
      { kind: "heading", text: "Betrieb und Betreuung" },
      {
        kind: "paragraph",
        text: "In den ersten Monaten sah der Fachbereich jede Woche die geführten Dialoge durch, pflegte die Wissensbasis nach und beobachtete, wie oft der Assistent danebenlag. Eine Ausweitung auf weitere Themen ist geplant, aber an Freigaben geknüpft: Jeder neue Bereich wird erst geprüft, bevor der Assistent ihn beantwortet. Ob und wie weit ausgeweitet wird, ist eine bewusste Entscheidung, die noch offen ist.",
      },
      {
        kind: "callout",
        calloutVariant: "info",
        text: "Beispiel-Case: Die Stadt und ihr Motiv sind real, die geschilderten Abläufe, Personen und Zitate sind exemplarisch und nicht von der Stadt freigegeben. Sobald eine Verwaltung einen abgestimmten Praxisfall freigibt, ersetzen wir das Beispiel.",
      },
    ],
    related: ["muenster-e-akte-vivioakte", "konstanz-ozg-portal"],
  },
];

export const caseSummaries: CaseSummary[] = cases.map(
  ({ facts: _facts, quote: _quote, body: _body, related: _related, ...summary }) =>
    summary,
);

export const caseRegistry: Record<string, CaseStudy> = Object.fromEntries(
  cases.map((c) => [c.slug, c]),
);
