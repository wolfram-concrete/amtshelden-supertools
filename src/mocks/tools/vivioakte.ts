/**
 * Mock-Daten: VivioAkte (fiktiver Software-Anbieter)
 *
 * Quelle: legacy/supertools_profil_beispiel.html (v0.3.0)
 * 1:1 portiert für Phase 2 — Profil-Seite.
 *
 * Bilder = Unsplash-Platzhalter. Vor Produktion durch KI-Bilder
 * ersetzen (Vorgaben siehe README Kap. 28).
 */

import type { ToolProfile } from "@/types/profile";

export const vivioakte: ToolProfile = {
  slug: "vivioakte",
  name: "VivioAkte",
  categorySlug: "e-akte-dokumentenmanagement",
  tier: "verified",
  lastCheckedAt: "2026-06-12",

  // ----------------------------------------------------------
  // ZONE 1 — HERO
  // ----------------------------------------------------------
  hero: {
    categoryLabel: "E-Akte & Dokumentenmanagement",
    title:
      "VivioAkte — digitale Aktenführung, die sich für Kommunen wirklich eignet",
    lead: "Eine E-Akte ist kein Selbstzweck. Sie soll Verwaltungsarbeit einfacher machen — nicht komplizierter. VivioAkte wurde von Grund auf für Kommunen entwickelt, die nicht über eine eigene IT-Abteilung verfügen.",
    byline: {
      editor: "Amtshelden Redaktion",
      updatedAt: "März 2026",
      avatar: {
        url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=68&h=68&fit=crop&q=80",
        alt: "Amtshelden Redaktion",
        width: 68,
        height: 68,
      },
    },
    verified: true,
    heroImage: {
      url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&h=900&fit=crop&q=85",
      alt: "Verwaltungsmitarbeiterinnen bei der Einführung neuer Software",
      width: 1600,
      height: 900,
    },
    heroCaption:
      "Gemeinsam entscheiden: Verwaltungsmitarbeiterinnen bei der Einführung neuer Software",
    company: {
      mark: "VA",
      name: "VivioAkte",
      type: "Software GmbH · Hamburg",
    },
    urteil:
      "VivioAkte ist unsere Empfehlung für Kommunen bis 50.000 Einwohner, die *zum ersten Mal digitalisieren* wollen — ohne sich dabei zu verlieren. Der Support spricht Verwaltungssprache. Das macht den Unterschied.",
    pullQuote: {
      text: "Kein einziger Mitarbeiter will zurück zur Papierakte. Das sagt eigentlich alles.",
      source:
        "Sandra M. · Leiterin Bürgerservice · Gemeindeverwaltung Altholm · 12.400 Einwohner",
    },
    body: [
      "Was macht eine E-Akte-Lösung für kleine und mittlere Kommunen wirklich tauglich? Nicht die Anzahl der Features — sondern wie schnell Mitarbeitende damit klarkommen, wie gut der Support erreichbar ist, und ob die Lösung DSGVO-konform auf deutschen Servern läuft. VivioAkte erfüllt alle drei Kriterien.",
      "Das System läuft vollständig im Browser, benötigt keine lokale Installation und wird in einem deutschen Rechenzentrum (Frankfurt) betrieben. Für die Einführung braucht die Behörde **einen internen Ansprechpartner, 3–5 Stunden pro Woche, und kein IT-Fachwissen**. Das ist der Ausgangspunkt — nicht die Ausnahme.",
    ],
  },

  // ----------------------------------------------------------
  // ZONE 2 — PASS DAS ZU UNS
  // ----------------------------------------------------------
  passDas: {
    body: "VivioAkte wurde nicht für jeden gebaut — und das ist eine Stärke. Das System ist auf Kommunen zwischen 5.000 und 50.000 Einwohnern ausgelegt, die ihre Aktenführung erstmals vollständig digitalisieren wollen. Besonders stark ist es überall dort, wo Bürgerinnen und Bürger direkten Kontakt zur Verwaltung haben.",
    fitTags: [
      { label: "Kommunen 5k–50k EW" },
      { label: "Bürgerservice" },
      { label: "Ordnungsamt" },
      { label: "Kämmerei" },
      { label: "Standesamt" },
      { label: "Cloud · Browser-basiert", neutral: true },
    ],
    notFit: {
      label: "Für komplexere Anforderungen führen wir Sie weiter",
      text: "Wenn Ihre Behörde ämterübergreifende Workflows mit vielen Schnittstellen benötigt oder zwingend on-premise betreiben muss — dann sind DoxBox Kommunal oder Fabasoft eGov die bessere Wahl. Wir beschreiben den Unterschied weiter unten ehrlich.",
      alternativeLinks: [
        { text: "DoxBox Kommunal", url: "#alternativen" },
        { text: "Fabasoft eGov", url: "#alternativen" },
      ],
    },
  },

  // ----------------------------------------------------------
  // ZONE 3 — IMPLEMENTIERUNG
  // ----------------------------------------------------------
  implementierung: {
    intro:
      "Die größte Sorge bei jeder Softwareeinführung: Was passiert wenn es nicht klappt? Wir haben Kommunen befragt die VivioAkte bereits eingeführt haben — und fragen dabei ausdrücklich nach dem was schwierig war, nicht nur nach dem was gut lief.",
    tiles: [
      {
        icon: "📅",
        label: "Einführungsdauer",
        value: "8–14 Wo.",
        description: "Kick-off bis produktiver Einsatz im ersten Amt.",
      },
      {
        icon: "👥",
        label: "Ihr Aufwand",
        value: "3–5 Std./Wo.",
        description: "1 Ansprechpartner intern. Kein IT-Fachwissen nötig.",
      },
      {
        icon: "💶",
        label: "Kostenrahmen",
        value: "ab 8.000 €",
        description: "Pro Jahr. Ausschreibungsfähig nach UVgO/VOL-A.",
      },
    ],
    solutionsHeading: "Typische Herausforderungen — und wie sie gelöst wurden",
    solutions: [
      {
        challenge:
          "Datenmigration aus dem Altsystem dauerte länger als geplant.",
        solution:
          "VivioAkte stellt ein dediziertes Migrations-Team. Empfehlung: Datenstruktur vorab gemeinsam prüfen lassen — das ist im Onboarding-Paket enthalten.",
        context: "Erfahrung aus Gemeindeverwaltung Wiesenfeld (6.200 EW, Bayern)",
        status: "gelöst",
      },
      {
        challenge: "Mitarbeitende nahmen das System anfangs nicht an.",
        solution:
          'Zwei engagierte Kolleginnen wurden vorab als „Superuser" intensiv geschult und übernahmen die interne Multiplikatorrolle — mit großem Erfolg.',
        context:
          "Erfahrung aus Gemeindeverwaltung Altholm (12.400 EW, Schleswig-Holstein)",
        status: "gelöst",
      },
      {
        challenge: "Betriebsrat wollte Mitbestimmungsrechte einbringen.",
        solution:
          "VivioAkte liefert eine fertige Betriebsvereinbarungs-Vorlage für kommunale E-Akte-Einführungen — das beschleunigt den Abstimmungsprozess erheblich.",
        context: "Auf Anfrage verfügbar für alle Kommunen",
        status: "gelöst",
      },
    ],
  },

  // ----------------------------------------------------------
  // ZONE 4 — CASES (Placeholder)
  // ----------------------------------------------------------
  cases: {
    enabled: false,
    placeholderText:
      "Supertools dokumentiert wie Software in realen Behörden eingeführt wurde — mit konkreten Erfahrungen, Zeitrahmen und Learnings. Dieser Bereich wird laufend ergänzt.",
  },

  // ----------------------------------------------------------
  // ZONE 6 — KONTAKT
  // ----------------------------------------------------------
  kontakt: {
    intro:
      "Anfragen laufen über Amtshelden — wir leiten sie direkt an VivioAkte weiter. Kein anonymes Ticketsystem, kein Spam.",
    links: {
      website: "https://vivioakte.de",
      email: "kontakt@vivioakte.de",
      phone: "040 123 456",
    },
  },

  // ----------------------------------------------------------
  // ZONE 7 — ALTERNATIVEN
  // ----------------------------------------------------------
  alternativen: {
    intro:
      "Supertools empfiehlt nur was wirklich passt. Wenn Ihre Anforderungen über das hinausgehen was VivioAkte leistet, führen wir Sie zu den Alternativen — ohne Umwege.",
    alternatives: [
      {
        mark: "DB",
        markBg: "#2563EB",
        name: "DoxBox Kommunal",
        why: "Für komplexe Querschnittslösungen mit ämterübergreifenden Workflows und längerem Einführungsaufwand.",
        href: "/tools/doxbox-kommunal",
      },
      {
        mark: "FE",
        markBg: "#7C3AED",
        name: "Fabasoft eGov",
        why: "Wenn On-Premise-Betrieb oder enge SAP-Integration zwingend erforderlich ist.",
        href: "/tools/fabasoft-egov",
      },
      {
        mark: "NK",
        markBg: "#059669",
        name: "NordKom Digital",
        why: "Speziell für norddeutsche Gemeinden — stark bei Standesamt und Einwohnermeldewesen.",
        href: "/tools/nordkom-digital",
      },
    ],
  },

  // ----------------------------------------------------------
  // ZONE 8 — CTA
  // ----------------------------------------------------------
  cta: {
    eyebrow: "Nächster Schritt",
    title: "Unverbindlich anfragen.\nWir melden uns persönlich.",
    subtitle:
      "Keine automatisierten Antworten. Amtshelden stellt den Kontakt her und stellt sicher dass Ihre Anfrage beim richtigen Menschen landet.",
    primaryCta: {
      text: "Jetzt anfragen über Amtshelden",
      url: "/anfrage?tool=vivioakte",
    },
    secondaryCta: {
      text: "Ähnliche Tools ansehen",
      url: "/kategorien/e-akte-dokumentenmanagement",
    },
    note: "Kein Spam, keine automatisierten Folge-Mails.\nOder direkt: m.keller@vivioakte.de · 040 123 456",
  },

  // ----------------------------------------------------------
  // SIDEBAR
  // ----------------------------------------------------------
  sidebar: {
    complianceWidgets: [
      {
        icon: "🔒",
        name: "DSGVO",
        value: "✓ Konform",
        detail:
          "Vollständig DSGVO-konform nach Art. 5. AVV wird standardmäßig mitgeliefert.",
        positive: true,
      },
      {
        icon: "🇩🇪",
        name: "Server",
        value: "✓ Deutschland",
        detail:
          "Alle Daten in Frankfurt am Main. Kein Datenabfluss in Drittstaaten.",
        positive: true,
      },
      {
        icon: "🏛",
        name: "BSI C5",
        value: "✓ Typ 2",
        detail:
          "BSI C5 Typ 2 Zertifizierung. Prüfbericht auf Anfrage erhältlich.",
        positive: true,
      },
      {
        icon: "📋",
        name: "Vergabe",
        value: "✓ Möglich",
        detail:
          "Ausschreibungsfähig nach VOL/A und UVgO. Referenzausschreibung auf Anfrage.",
        positive: true,
      },
    ],
    quickFacts: [
      { key: "Preis", value: "ab 8.000 €/Jahr" },
      { key: "Einführung", value: "8–14 Wochen" },
      { key: "Betrieb", value: "Cloud (SaaS)" },
      { key: "Support", value: "Mo–Fr 8–18 Uhr" },
      { key: "Nutzer", value: "unbegrenzt" },
    ],
    ctaLabel: "Unverbindlich anfragen",
    ctaHref: "#anfrage",
    whyEntries: [
      {
        title: "Kein eigener IT-Betrieb nötig",
        description:
          "Läuft vollständig im Browser — keine Installation, keine eigene Serverinfrastruktur.",
      },
      {
        title: "Speziell für Kommunen gebaut",
        description:
          "Nicht für Konzerne umgerüstet — von Anfang an auf kommunale Verwaltungsabläufe ausgelegt.",
      },
      {
        title: "DSGVO & Vergabe abgesichert",
        description:
          "Alle Daten in Deutschland. Ausschreibungsfähig nach UVgO — keine rechtlichen Risiken.",
      },
    ],
    relatedLinks: [
      {
        icon: "📖",
        title: "Wie läuft eine E-Akte-Einführung ab?",
        meta: "Supertools Wissen · 5 Min.",
        href: "/wissen/e-akte-einfuehrung",
      },
      {
        icon: "⚖️",
        title: "OZG & E-Akte: Was Kommunen jetzt wissen müssen",
        meta: "Supertools Magazin · März 2026",
        href: "/wissen/ozg-e-akte",
      },
      {
        icon: "🗂️",
        title: "Alle Tools: E-Akte & Dokumentenmanagement",
        meta: "Kategorie-Übersicht · 14 Tools",
        href: "/kategorien/e-akte-dokumentenmanagement",
      },
    ],
  },

  compliance: {
    dsgvo: "konform",
    serverLocation: "deutschland",
    bsiZertifizierung: true,
    vergabeEignung: "ja",
  },
};

// ============================================================
// Tool-Registry — wird in Phase 4 erweitert (Kategorie-Seiten)
// ============================================================

export const toolRegistry: Record<string, ToolProfile> = {
  vivioakte,
};
