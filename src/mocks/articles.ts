/**
 * Mock-Artikel — Wissensbereich + Pulse.
 * 5 redaktionelle Beiträge mit Long-Form-Body.
 */

import type { Article, ArticleSummary, Author } from "@/types/content";

const authors: Record<string, Author> = {
  redaktion: {
    name: "Amtshelden Redaktion",
    role: "Redaktionsteam",
    avatar: {
      url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&q=80",
      alt: "Amtshelden Redaktion",
      width: 120,
      height: 120,
    },
    bio: "Wir prüfen Software aus Behördenperspektive — handverlesen, transparent, ehrlich.",
  },
  schmid: {
    name: "Dr. Anna Schmid",
    role: "Senior Editor · OZG/Vergaberecht",
    avatar: {
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&q=80",
      alt: "Dr. Anna Schmid",
      width: 120,
      height: 120,
    },
    bio: "Volljuristin, früher Stadt Frankfurt, schreibt über OZG, Vergaberecht und DSGVO in der Verwaltung.",
  },
  beck: {
    name: "Markus Beck",
    role: "Editor · IT-Architektur",
    avatar: {
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80",
      alt: "Markus Beck",
      width: 120,
      height: 120,
    },
    bio: "Ehemaliger CIO einer Mittelstadt. Schreibt über kommunale IT-Architektur und Cloud-Strategien.",
  },
};

export const articles: Article[] = [
  {
    slug: "e-akte-einfuehrung",
    type: "wissen",
    eyebrow: "Leitfaden · E-Akte",
    title:
      "Wie läuft eine E-Akte-Einführung ab? Ein realistischer Zeitplan in 6 Phasen",
    lead: "Eine E-Akte-Einführung scheitert selten an der Software. Sie scheitert daran, dass niemand vorher erklärt hat, was wirklich auf die Verwaltung zukommt. Dieser Leitfaden räumt damit auf.",
    readingTime: 9,
    publishedAt: "2026-04-22",
    cover: {
      url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&h=900&fit=crop&q=85",
      alt: "Aktenordner in einer Verwaltungsumgebung",
      width: 1600,
      height: 900,
    },
    author: authors.schmid,
    tags: ["E-Akte", "Einführung", "Projektplanung"],
    body: [
      {
        kind: "paragraph",
        text: "Die meisten Kommunen erleben die E-Akte-Einführung als Marathon: nicht weil das Projekt zu groß wäre — sondern weil unklare Erwartungen Energie kosten, die in der Sache fehlt. Wer einen realistischen Zeitplan kennt, kann besser steuern.",
      },
      {
        kind: "heading",
        text: "Phase 1 — Voranalyse (Wochen 1–3)",
      },
      {
        kind: "paragraph",
        text: "Bevor Software gekauft wird, muss klar sein, welche Akten überhaupt digitalisiert werden sollen. Eine Bestandsaufnahme der relevanten Vorgänge zeigt fast immer: Es sind weniger, als ursprünglich angenommen. Diese Phase wird oft übersprungen — und kommt später als doppelte Arbeit zurück.",
      },
      {
        kind: "callout",
        calloutVariant: "highlight",
        text: "Tipp: Wer hier zwei Wochen investiert, spart später drei Monate. Eine Bestandsaufnahme zeigt typischerweise, dass nur 60 % der vermuteten Aktenarten wirklich digitalisiert werden müssen.",
      },
      {
        kind: "heading",
        text: "Phase 2 — Anbieterauswahl (Wochen 4–8)",
      },
      {
        kind: "paragraph",
        text: "Die Anbieterauswahl ist nicht primär eine Featureliste. Es ist eine Vertrauensentscheidung. Wer das Angebot prüft, sollte zwei Dinge testen: Wie spricht der Anbieter mit anderen Behörden — und wie reagiert er, wenn etwas schiefläuft.",
      },
      {
        kind: "list",
        items: [
          "Mindestens 3 Referenz-Behörden direkt kontaktieren (nicht nur Marketing-Material lesen)",
          "Eine Live-Demo mit eigenen Daten (kein Sales-Pitch)",
          "Service-Level klären: Reaktionszeit, Eskalationspfad, Notfall",
          "Vergabe-Eignung schriftlich bestätigen lassen",
        ],
      },
      {
        kind: "heading",
        text: "Phase 3 — Vergabe (Wochen 9–14)",
      },
      {
        kind: "paragraph",
        text: "Die Vergabephase wird häufig unterschätzt. Selbst bei UVgO-konformen Vergaben braucht es typischerweise 6 Wochen, weil Rückfragen, interne Abstimmungen und der Vergabeausschuss eigene Rhythmen haben.",
      },
      {
        kind: "quote",
        text: "Wir haben den Fehler gemacht, die Vergabe in drei Wochen abwickeln zu wollen. Am Ende waren es fünf — und das war noch schnell.",
        source:
          "Hauptamtsleiter, Gemeinde mit 18.000 Einwohnern (Mittelhessen)",
      },
      {
        kind: "heading",
        text: "Phase 4 — Pilotamt (Wochen 15–22)",
      },
      {
        kind: "paragraph",
        text: "Niemand führt die E-Akte gleichzeitig in allen Ämtern ein. Das ist eine bewährte Regel — selbst dann, wenn der Druck von oben groß ist. Das Pilotamt sollte überschaubar sein, gleichzeitig aber repräsentativ. Bürgerservice oder Ordnungsamt eignen sich erfahrungsgemäß gut.",
      },
      {
        kind: "heading",
        text: "Phase 5 — Rollout (Wochen 23–40)",
      },
      {
        kind: "paragraph",
        text: "Sobald das Pilotamt produktiv läuft, folgen die anderen Ämter in kontrollierten Wellen. Jede Welle dauert typischerweise 4–6 Wochen. Wer das Pilotamt sauber dokumentiert hat, erlebt im Rollout deutlich weniger Reibung.",
      },
      {
        kind: "heading",
        text: "Phase 6 — Stabilisierung (Wochen 40+)",
      },
      {
        kind: "paragraph",
        text: "Nach dem Rollout beginnt die eigentliche Arbeit: Verwerfungen ausgleichen, Workflows feinjustieren, Reports etablieren. Hier zeigt sich die Qualität des Anbieters — denn jetzt sind nicht mehr die Pre-Sales-Leute da, sondern der Regelsupport.",
      },
      { kind: "divider" },
      {
        kind: "callout",
        calloutVariant: "info",
        text: "Die hier genannten Zeiträume sind Erfahrungswerte aus 14 dokumentierten Einführungen in Kommunen zwischen 5.000 und 80.000 Einwohnern. Großstädte und Landkreise haben deutlich längere Zyklen.",
      },
    ],
    related: ["ozg-e-akte", "vergabe-software"],
  },

  {
    slug: "ozg-e-akte",
    type: "pulse",
    eyebrow: "Pulse · März 2026",
    title:
      "OZG & E-Akte: Was Kommunen jetzt wissen müssen — und was die Gerichte zuletzt entschieden haben",
    lead: "Das OZG ist abgelaufen, aber die Pflichten nicht. Wir fassen zusammen, was Verwaltungen jetzt rechtssicher umsetzen müssen — und welche aktuellen Urteile dabei eine Rolle spielen.",
    readingTime: 6,
    publishedAt: "2026-03-15",
    cover: {
      url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&h=900&fit=crop&q=85",
      alt: "Justizgebäude Detail",
      width: 1600,
      height: 900,
    },
    author: authors.schmid,
    tags: ["OZG", "Recht", "DSGVO"],
    body: [
      {
        kind: "paragraph",
        text: "Mit dem Ende der OZG-Frist Anfang 2024 schien die Aufregung erstmal vorbei. Tatsächlich hat sich der Druck nur verlagert: Aus der Frist wurde eine Daueraufgabe — und die Anforderungen wachsen weiter.",
      },
      {
        kind: "heading",
        text: "Was sich 2025 geändert hat",
      },
      {
        kind: "list",
        items: [
          "OZG 2.0 verpflichtet zur durchgängigen elektronischen Aktenführung (§ 3 EGovG)",
          "Schriftformerfordernis wurde für viele Anträge reduziert",
          "Once-Only-Prinzip wird schrittweise eingeführt",
          "FIM-Standardisierung bekommt zusätzliches Gewicht",
        ],
      },
      {
        kind: "heading",
        text: "Aktuelle Rechtsprechung",
      },
      {
        kind: "paragraph",
        text: "Das VG Köln hat im November 2025 entschieden, dass Behörden Bürger:innen nicht auf rein digitale Antragswege beschränken dürfen, wenn keine zumutbare Alternative existiert. Das hat Konsequenzen für die Portal-Architektur: Hybride Antragsstrecken müssen mitgedacht werden.",
      },
      {
        kind: "callout",
        calloutVariant: "warning",
        text: "Wichtig: Wer die rein digitale Antragsstrecke implementiert, muss prüfen, ob die analoge Alternative weiterhin niederschwellig zugänglich ist. Andernfalls droht Verfahrensaufhebung.",
      },
    ],
    related: ["e-akte-einfuehrung", "vergabe-software"],
  },

  {
    slug: "vergabe-software",
    type: "leitfaden",
    eyebrow: "Leitfaden · Vergabe",
    title:
      "Software-Vergabe nach UVgO: Wie öffentliche Hand Cloud-Lösungen ausschreibungsfähig macht",
    lead: "Cloud-Software und Vergaberecht passten lange nicht zusammen. Das ändert sich — wenn die Verwaltung weiß, worauf sie achten muss.",
    readingTime: 7,
    publishedAt: "2026-02-08",
    cover: {
      url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&h=900&fit=crop&q=85",
      alt: "Aktenstapel mit Vergabe-Dokumenten",
      width: 1600,
      height: 900,
    },
    author: authors.beck,
    tags: ["Vergabe", "UVgO", "Cloud", "Recht"],
    body: [
      {
        kind: "paragraph",
        text: "Über 80 Prozent der kommunalen Software-Beschaffungen liegen unter den EU-Schwellenwerten. Damit gilt die Unterschwellenvergabeordnung (UVgO) — und die hat ihre Eigenheiten, wenn es um Cloud-Software geht.",
      },
      {
        kind: "heading",
        text: "Die wichtigsten Fallstricke",
      },
      {
        kind: "list",
        items: [
          "Beschränkter Markt: Bei Cloud-Spezialisten gibt es oft nur 2–3 ernsthafte Anbieter — Verhandlungsverfahren möglich",
          "Datenstandort: Klare Vorgaben in der Leistungsbeschreibung sind Pflicht",
          "Auftragsverarbeitungsverträge (AVV): müssen vor Zuschlag final sein, nicht erst danach",
          "Migration nach Vertragsende: explizit ausschreiben, sonst keine Verhandlungsmacht",
        ],
      },
      {
        kind: "quote",
        text: "Den größten Hebel haben wir, bevor der Zuschlag erteilt ist. Danach ist man im Tagesgeschäft.",
        source: "Kämmerin, mittelhessische Kommune (8.500 Einwohner)",
      },
    ],
  },

  {
    slug: "doppik-stolpersteine",
    type: "wissen",
    eyebrow: "Leitfaden · Finanzen",
    title:
      "Doppik in kleinen Kommunen: Die fünf häufigsten Stolpersteine — und wie sie sich vermeiden lassen",
    lead: "Doppik ist Pflicht, doch viele kleine Kämmereien fühlen sich mit ihren Lösungen alleingelassen. Wir haben mit 12 Kommunen gesprochen und die wiederkehrenden Probleme dokumentiert.",
    readingTime: 8,
    publishedAt: "2026-01-30",
    cover: {
      url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&h=900&fit=crop&q=85",
      alt: "Zahlenkolonnen auf einem Bildschirm",
      width: 1600,
      height: 900,
    },
    author: authors.redaktion,
    tags: ["Doppik", "Finanzen", "Kämmerei"],
    body: [
      {
        kind: "paragraph",
        text: "Wir haben zwischen September 2025 und Januar 2026 mit Kämmereien in 12 Kommunen gesprochen — überwiegend in Größenklassen zwischen 4.000 und 22.000 Einwohnern. Die meisten Probleme wiederholen sich. Hier die fünf wichtigsten.",
      },
      {
        kind: "heading",
        text: "1. Kontenrahmen ohne Beratung übernommen",
      },
      {
        kind: "paragraph",
        text: "Der Standardkontenrahmen passt nicht für jede Kommune. Wer ihn 1:1 übernimmt, bekommt später Probleme mit Berichten an Aufsichtsbehörden.",
      },
    ],
  },

  {
    slug: "digitalisierung-bund-2030",
    type: "wissen",
    eyebrow: "Schwerpunkt · Digitalisierung Deutschland",
    title:
      "Digitalisierungs-Strategie 2030: Was der Bund jetzt von Kommunen erwartet — und was nicht funktioniert",
    lead: "Mit der Digitalstrategie 2030 hat der Bund klare Erwartungen formuliert. Auf der kommunalen Ebene wirken sie oft realitätsfern. Wir analysieren, was umsetzbar ist — und welche Anforderungen vom Bund nochmal nachgeschärft werden müssten.",
    readingTime: 8,
    publishedAt: "2026-04-30",
    cover: {
      url: "https://images.unsplash.com/photo-1541872703-74c5e44368f1?w=1600&h=900&fit=crop&q=85",
      alt: "Bundestag in Berlin",
      width: 1600,
      height: 900,
    },
    author: authors.schmid,
    tags: ["Bund", "Strategie", "OZG", "Kommunen"],
    body: [
      {
        kind: "paragraph",
        text: "Die Digitalstrategie 2030 nennt 18 Hebelprojekte. Bei genauerem Hinsehen sind acht davon ohne kommunale Beteiligung nicht umsetzbar — und drei davon laufen ohne aktive Mitwirkung der Verwaltungen sehenden Auges in eine Wand.",
      },
      {
        kind: "heading",
        text: "Was funktioniert: Once-Only und FIM",
      },
      {
        kind: "paragraph",
        text: "Das Once-Only-Prinzip kommt langsam in der Fläche an. Erste Erfolge sehen wir bei der Wohnsitz-Anmeldung und der elektronischen Aufenthaltsbescheinigung. Voraussetzung: saubere FIM-Standardisierung — und genau hier liegt aktuell der größte Hebel.",
      },
      {
        kind: "heading",
        text: "Was nicht funktioniert: zentrale Plattformansätze",
      },
      {
        kind: "paragraph",
        text: "Die Idee, einzelne Bundes-Plattformen für ganze Themenfelder zu schaffen, hat sich in der Praxis als deutlich schwerer erwiesen als geplant. Heterogene Verfahrenslandschaften, unterschiedliche Reifegrade und vor allem die kommunale Selbstverwaltung machen Top-Down-Lösungen ineffizient.",
      },
      {
        kind: "callout",
        calloutVariant: "highlight",
        text: "Realistisch ist eine föderierte Architektur: Bund liefert Schemata und Schnittstellen, Länder und Kommunen wählen Lösungen, die zu ihren Strukturen passen.",
      },
    ],
    related: ["ozg-e-akte", "warum-kein-ranking"],
  },

  {
    slug: "kommunen-realer-stand",
    type: "wissen",
    eyebrow: "Schwerpunkt · Kommunen",
    title:
      "Wo Kommunen 2026 wirklich stehen — drei Realitäten, die Strategien gerne ausblenden",
    lead: "Eine ehrliche Bestandsaufnahme: nicht alle Kommunen können gleichermaßen digital. Wir haben mit Bürgermeisterinnen, Hauptamtsleitern und Kämmerern in 22 Verwaltungen gesprochen — und drei wiederkehrende Realitäten dokumentiert.",
    readingTime: 7,
    publishedAt: "2026-04-12",
    cover: {
      url: "https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=1600&h=900&fit=crop&q=85",
      alt: "Kommunalverwaltung in einer mittelhessischen Stadt",
      width: 1600,
      height: 900,
    },
    author: authors.beck,
    tags: ["Kommunen", "Realität", "Behörden", "Stand"],
    body: [
      {
        kind: "paragraph",
        text: "Wer Software-Strategien für die kommunale Ebene plant, sollte zuerst die Ausgangslage realistisch beschreiben. Wir haben das getan — und drei Realitäten herauskristallisiert, die in keiner Strategie auftauchen, aber jeden Implementierungserfolg bestimmen.",
      },
      {
        kind: "heading",
        text: "Realität 1: Personalmangel ist Software-Mangel",
      },
      {
        kind: "paragraph",
        text: "Wer keine IT-Stelle besetzen kann, hat keine Software-Strategie. So einfach. Knapp ein Drittel der von uns befragten Kommunen unter 10.000 Einwohnern hat aktuell keine besetzte IT-Stelle. Externe Dienstleister füllen die Lücke — aber nicht für strategische Entscheidungen.",
      },
      {
        kind: "heading",
        text: "Realität 2: Förderprogramme passen oft nicht zur Praxis",
      },
      {
        kind: "paragraph",
        text: 'Förderprogramme verlangen Co-Finanzierung, Eigenanteile und vorgegebene Berichtsformate. Für kleine Kommunen ist der administrative Aufwand oft höher als der Nutzen. Mehrere Bürgermeisterinnen sagten uns: „Wir verzichten lieber auf 50.000 Euro Förderung als auf 200 Stunden Verwaltungsarbeit."',
      },
      {
        kind: "heading",
        text: "Realität 3: Kollektive Lösungen scheitern an unterschiedlichen Reifegraden",
      },
      {
        kind: "paragraph",
        text: "Inter-kommunale Kooperationen sind gut gemeint, aber selten gut gemacht. Wenn eine Kommune bereits ein Fachverfahren etabliert hat und die Partner-Kommunen noch nicht, entstehen unauflösbare Migrations-Konflikte.",
      },
    ],
    related: ["digitalisierung-bund-2030", "doppik-stolpersteine"],
  },

  {
    slug: "warum-kein-ranking",
    type: "pulse",
    eyebrow: "Pulse · Mai 2026",
    title:
      "Warum Supertools keine Rankings macht — und das richtig so ist",
    lead: "Capterra, G2, OMR Reviews: alle vergeben Sterne. Wir nicht. Wir erklären, warum Rankings für Behörden-Software nicht funktionieren — und was wir stattdessen tun.",
    readingTime: 4,
    publishedAt: "2026-05-02",
    cover: {
      url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1600&h=900&fit=crop&q=85",
      alt: "Person am Schreibtisch denkt nach",
      width: 1600,
      height: 900,
    },
    author: authors.redaktion,
    tags: ["Editorial", "Methodik"],
    body: [
      {
        kind: "paragraph",
        text: '„Welche E-Akte ist die beste?" Diese Frage bekommen wir mehrmals pro Woche. Unsere Antwort frustriert manche Anfrager — bis sie sie verstanden haben: Es gibt keine beste E-Akte. Es gibt nur die, die zu deiner Verwaltung passt.',
      },
      {
        kind: "heading",
        text: "Was wir tun — und was nicht",
      },
      {
        kind: "list",
        items: [
          "Wir vergleichen Software nicht gegeneinander",
          "Wir vergeben keine Sterne oder Scores",
          "Wir ordnen aus Behördenperspektive ein — pro Tool, nicht relativ",
          "Wir zeigen ehrlich, für wen ein Tool nicht geeignet ist",
        ],
      },
      {
        kind: "callout",
        calloutVariant: "highlight",
        text: "Software ist kein Auto. Sie hat keinen Kofferraum, den man mit anderen vergleichen kann. Sie passt zu Strukturen, zu Menschen, zu Anforderungen — oder eben nicht.",
      },
    ],
  },
];

export const articleSummaries: ArticleSummary[] = articles.map(
  ({ body: _body, related: _related, ...summary }) => summary,
);

export const articleRegistry: Record<string, Article> = Object.fromEntries(
  articles.map((a) => [a.slug, a]),
);
