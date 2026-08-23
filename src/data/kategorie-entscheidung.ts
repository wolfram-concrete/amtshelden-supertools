// Kategorie-Entscheidungslogik (Christian-Feedback 2.2 + 3.2).
// Redaktionelle, behördenbezogene Einordnung je Kategorie — KEINE erfundenen
// Produkt-/Anbieterfakten, sondern allgemeingültige Entscheidungshilfe. Speist
// die Kategorie-Entscheidungsseiten UND die Profil-Bausteine (Fragen an Anbieter,
// Voraussetzungen, typische Nutzer).

export interface KategorieEntscheidung {
  /** 1–2 Sätze: worum geht es in dieser Kategorie? */
  worumGehtEs: string;
  /** Typische Verwaltungsprobleme, die hierher passen */
  verwaltungsProbleme: string[];
  /** Welche Tool-Arten gibt es? */
  toolArten: string[];
  /** Wann Software wirklich hilft */
  wannSoftwareHilft: string;
  /** Wann Software NICHT die Lösung ist */
  wannSoftwareNichtHilft: string;
  /** Voraussetzungen, die vorab geklärt sein sollten */
  voraussetzungen: string[];
  /** Typische Nutzer/Beteiligte in der Behörde */
  typischeNutzer: string[];
  /** Fragen, die man Anbietern vor einer Entscheidung stellen sollte */
  fragenAnAnbieter: string[];
}

export const kategorieEntscheidung: Record<string, KategorieEntscheidung> = {
  "kommunikation-zusammenarbeit": {
    worumGehtEs:
      "Software, mit der Verwaltungen intern zusammenarbeiten und nach außen kommunizieren — von Messenger und Intranet über Social-Media-Management bis zu Videokonferenz und kollaborativen Dokumenten.",
    verwaltungsProbleme: [
      "Mehrere Kanäle, aber keine zentrale Planung",
      "Freigaben laufen über E-Mail und werden nicht dokumentiert",
      "Bauhof, Kita und Außendienst sind über E-Mail kaum erreichbar",
      "Krisenkommunikation braucht Tempo, aber es ist kein Prozess vorbereitet",
    ],
    toolArten: [
      "Redaktions- und Social-Media-Planung",
      "Mitarbeiter-App / Intranet",
      "Messenger für die Verwaltung",
      "Videokonferenz & kollaborative Dokumente",
      "Monitoring & Community-Management",
    ],
    wannSoftwareHilft:
      "Wenn Zuständigkeiten und Freigaben grundsätzlich geklärt sind und es an Werkzeugen fehlt, um Planung, Freigabe und Veröffentlichung zusammenzuführen.",
    wannSoftwareNichtHilft:
      "Wenn niemand entscheidet, wer freigibt: Dann digitalisiert ein Freigabe-Tool nur den unklaren Prozess. Erst der Prozess, dann das Werkzeug.",
    voraussetzungen: [
      "Geklärte Rollen: Redaktion, Freigabe, Administration",
      "Datenschutzprüfung und ggf. AV-Vertrag",
      "Erreichbarkeit außerhalb des Büros geklärt (Bauhof, Feuerwehr, Außendienst)",
      "Vertretungs- und Archivierungsregeln",
      "Personalrat einbezogen",
    ],
    typischeNutzer: [
      "Pressestelle",
      "Hauptamt / Öffentlichkeitsarbeit",
      "IT / Digitalisierungsstelle",
      "Leitungsebene",
    ],
    fragenAnAnbieter: [
      "Können Freigabeprozesse mehrstufig abgebildet werden?",
      "Gibt es Rollen für Redaktion, Freigabe und Administration?",
      "Wo werden die Daten verarbeitet (Serverstandort)?",
      "Welche Schnittstellen zu bestehenden Systemen gibt es?",
      "Wie wird ein Krisenfall abgebildet?",
      "Werden Kommentare und Vorgänge dokumentiert und archiviert?",
      "Gibt es Referenzen aus vergleichbaren Kommunen?",
    ],
  },

  "buergerservice-fachverfahren": {
    worumGehtEs:
      "Software für den direkten Kontakt mit Bürgerinnen und Bürgern und für die fachliche Fallbearbeitung — Online-Anträge, Terminvergabe, Bürgerdialog/Chatbots und Fachverfahren.",
    verwaltungsProbleme: [
      "Anträge kommen digital an, werden aber mit Medienbruch weiterbearbeitet",
      "Lange Wartezeiten und überlastete Servicetelefone",
      "Fachverfahren und Portal sprechen nicht miteinander",
      "Wiederkehrende Standardanfragen binden Personal",
    ],
    toolArten: [
      "Online-Antrags- und Portallösungen (OZG/FIM)",
      "Terminvergabe",
      "Bürgerdialog / Chatbots",
      "Fachverfahren für konkrete Aufgabengebiete",
      "Bezahl- und Postfachanbindung",
    ],
    wannSoftwareHilft:
      "Wenn Prozesse und Zuständigkeiten definiert sind und es an einer durchgängigen digitalen Antrags- oder Bearbeitungsstrecke fehlt.",
    wannSoftwareNichtHilft:
      "Wenn hinter dem Portal kein durchgängiger Prozess steht: Ein schöner Antrag, der danach ausgedruckt wird, löst das Problem nicht.",
    voraussetzungen: [
      "Prozess- und Zuständigkeitsklärung je Leistung",
      "Anbindung an Fachverfahren und Register geklärt",
      "FIM-/Standardkonformität geprüft",
      "Datenschutz und Barrierefreiheit (BITV 2.0) geprüft",
      "Servicekonto-/Postfach-Anbindung",
    ],
    typischeNutzer: [
      "Bürgeramt / Servicecenter",
      "Fachabteilungen",
      "IT / Digitalisierungsstelle",
      "Organisationsamt",
    ],
    fragenAnAnbieter: [
      "Werden Antragsstrecken nach FIM-Standard modelliert?",
      "Welche Schnittstellen zu Fachverfahren und Registern bestehen?",
      "Wie werden Zahlungen und Postfach angebunden?",
      "Ist die Lösung barrierefrei (BITV 2.0)?",
      "Wo werden die Daten verarbeitet?",
      "Wie viele Kommunen setzen die Lösung produktiv ein?",
    ],
  },

  "e-akte-dokumentenmanagement": {
    worumGehtEs:
      "Software für die rechtssichere digitale Aktenführung — E-Akte, Dokumentenmanagement (DMS/ECM), Vorgangsbearbeitung und revisionssichere Archivierung.",
    verwaltungsProbleme: [
      "Akten liegen parallel in Papier und auf Netzlaufwerken",
      "Kein einheitlicher Aktenplan, Vorgänge sind schwer auffindbar",
      "Fristen und Wiedervorlagen werden manuell verwaltet",
      "Aufbewahrung und Aussonderung sind nicht revisionssicher",
    ],
    toolArten: [
      "E-Akte",
      "Dokumentenmanagement (DMS/ECM)",
      "Vorgangs-/Workflow-Bearbeitung",
      "revisionssichere Archivierung",
      "Scan-/Posteingangslösungen",
    ],
    wannSoftwareHilft:
      "Wenn Aktenplan und Organisationsstruktur stehen und die Ablage vereinheitlicht und rechtssicher werden soll.",
    wannSoftwareNichtHilft:
      "Wenn Aktenplan und Zuständigkeiten unklar sind: Ein DMS bildet die vorhandene Unordnung sonst nur digital ab.",
    voraussetzungen: [
      "Aktenplan und Organisationsmodell",
      "Rollen- und Rechtekonzept",
      "Schnittstellen zu Fachverfahren und E-Mail",
      "Migrationskonzept für Bestandsakten",
      "Personalrat und Datenschutz einbezogen",
    ],
    typischeNutzer: [
      "Hauptamt / Organisationsamt",
      "Registratur",
      "Fachabteilungen",
      "IT",
    ],
    fragenAnAnbieter: [
      "Ist die Lösung revisionssicher (Aufbewahrung, Aussonderung)?",
      "Welche Standards werden unterstützt (z. B. xdomea)?",
      "Welche Schnittstellen zu Fachverfahren bestehen?",
      "Wie läuft die Migration der Bestandsakten?",
      "Betrieb: Cloud, On-Premise oder Hybrid — und Serverstandort?",
      "Wie ist das Rollen- und Rechtemodell aufgebaut?",
    ],
  },

  "personal-organisation": {
    worumGehtEs:
      "Software für Personalgewinnung, -verwaltung und Organisation — Recruiting/Bewerbermanagement, Personalmanagement, Dienstplanung und Weiterbildung.",
    verwaltungsProbleme: [
      "Bewerbungen laufen per E-Mail, Rückmeldungen dauern zu lange",
      "Fachkräftemangel bei gleichzeitig unattraktiver Bewerbungsstrecke",
      "Dienst- und Schichtpläne werden in Tabellen gepflegt",
      "Weiterbildung ist nicht systematisch erfasst",
    ],
    toolArten: [
      "Recruiting / Bewerbermanagement",
      "Personalmanagement (HR)",
      "Dienst- und Schichtplanung",
      "Weiterbildungs-/Lernmanagement",
      "Onboarding",
    ],
    wannSoftwareHilft:
      "Wenn die Prozesse grundsätzlich definiert sind und Durchlaufzeiten, Transparenz oder Bewerbererlebnis verbessert werden sollen.",
    wannSoftwareNichtHilft:
      "Wenn tarifliche Vorgaben, Mitbestimmung und interne Abläufe ungeklärt sind — dann scheitert die Einführung an der Organisation, nicht am Tool.",
    voraussetzungen: [
      "Mitbestimmung: Personalrat frühzeitig einbeziehen",
      "Datenschutz für Beschäftigtendaten",
      "Tarif-/dienstrechtliche Vorgaben abgebildet",
      "Schnittstellen zu Abrechnung und Fachverfahren",
      "Rollen- und Rechtemodell",
    ],
    typischeNutzer: [
      "Personalabteilung",
      "Personalrat",
      "Fachbereichsleitungen",
      "Organisationsamt",
    ],
    fragenAnAnbieter: [
      "Können tarifliche und dienstrechtliche Vorgaben abgebildet werden?",
      "Wie werden Beschäftigtendaten geschützt und wo verarbeitet?",
      "Welche Rolle spielt der Personalrat bei Einführung und Betrieb?",
      "Welche Schnittstellen zu Abrechnung und Fachverfahren gibt es?",
      "Gibt es Referenzen aus dem öffentlichen Dienst?",
    ],
  },

  "finanzen-haushalt": {
    worumGehtEs:
      "Software für Haushalt, Kämmerei und Rechnungswesen — Haushaltsplanung, Doppik, Controlling, Rechnungsworkflow und Vergabe.",
    verwaltungsProbleme: [
      "Haushaltsplanung läuft über verteilte Tabellen",
      "Rechnungen werden manuell durch das Haus getragen",
      "Kein durchgängiges Controlling über Produkte und Kostenstellen",
      "Vergabeverfahren sind aufwendig und fehleranfällig",
    ],
    toolArten: [
      "Haushaltsplanung / Doppik",
      "Rechnungsworkflow (E-Rechnung)",
      "Controlling & Berichtswesen",
      "Vergabe-/Beschaffungssoftware",
      "Kassen-/Zahlungsverkehr",
    ],
    wannSoftwareHilft:
      "Wenn das Rechnungswesen (kameral oder doppisch) definiert ist und Medienbrüche, Transparenz oder Fristen verbessert werden sollen.",
    wannSoftwareNichtHilft:
      "Wenn Kontenrahmen, Produkte und Zuständigkeiten nicht geklärt sind — die Software schafft keine Ordnung, die organisatorisch fehlt.",
    voraussetzungen: [
      "Rechnungswesen-Modell (Doppik/Kameralistik) geklärt",
      "Schnittstellen zu HKR-/Fachverfahren",
      "E-Rechnungs-Standard (XRechnung) unterstützt",
      "Rollen, Freigabegrenzen und Vier-Augen-Prinzip",
      "Datenschutz und Revisionssicherheit",
    ],
    typischeNutzer: [
      "Kämmerei",
      "Finanzbuchhaltung",
      "Fachbereiche mit Budgetverantwortung",
      "Rechnungsprüfung",
    ],
    fragenAnAnbieter: [
      "Wird der E-Rechnungs-Standard (XRechnung) unterstützt?",
      "Welche Schnittstellen zum HKR-/Kassenverfahren bestehen?",
      "Wie werden Freigabegrenzen und Vier-Augen-Prinzip abgebildet?",
      "Ist der Rechnungsworkflow revisionssicher?",
      "Betrieb und Serverstandort?",
    ],
  },

  "geo-bauen-umwelt": {
    worumGehtEs:
      "Software für Geodaten, Bauen und Umwelt — GIS, digitaler Bauantrag und Bauleitplanung, Liegenschaften sowie Umwelt- und Bauhof-Anwendungen.",
    verwaltungsProbleme: [
      "Geodaten liegen in getrennten Systemen und Formaten",
      "Bauanträge werden weitgehend in Papier bearbeitet",
      "Kein gemeinsamer Raumbezug für Fachabteilungen",
      "Bauhof-Aufträge werden telefonisch koordiniert",
    ],
    toolArten: [
      "Geoinformationssysteme (GIS)",
      "Digitaler Bauantrag / Bauleitplanung",
      "Liegenschafts- und Kataster-Anwendungen",
      "Umwelt-/Fachkataster",
      "Bauhof-/Betriebshof-Software",
    ],
    wannSoftwareHilft:
      "Wenn Datengrundlagen und Zuständigkeiten vorhanden sind und Fachprozesse mit Raumbezug digitalisiert werden sollen.",
    wannSoftwareNichtHilft:
      "Wenn Datenqualität und Zuständigkeiten für die Pflege ungeklärt sind — ein GIS ohne gepflegte Daten erzeugt nur scheinbare Sicherheit.",
    voraussetzungen: [
      "Datengrundlage und Pflegezuständigkeit geklärt",
      "Standards und Schnittstellen (z. B. OGC, XPlanung)",
      "Anbindung an Kataster und Register",
      "Rollen- und Rechtemodell",
      "Datenschutz bei personenbezogenen Liegenschaftsdaten",
    ],
    typischeNutzer: [
      "Bauamt / Stadtplanung",
      "Vermessung / Kataster",
      "Umweltamt",
      "Bauhof",
      "IT / GDI",
    ],
    fragenAnAnbieter: [
      "Welche Geo-Standards werden unterstützt (z. B. OGC, XPlanung)?",
      "Wie erfolgt die Anbindung an Kataster und Register?",
      "Wie werden Bestandsdaten migriert und gepflegt?",
      "Betrieb, Serverstandort und Datenschutz?",
      "Gibt es kommunale Referenzen?",
    ],
  },
};

/** Fallback, falls eine Kategorie (noch) keine Entscheidungsdaten hat. */
export function getKategorieEntscheidung(
  slug: string,
): KategorieEntscheidung | undefined {
  return kategorieEntscheidung[slug];
}
