/**
 * Mock-Profil: OZG-Portal (Govman Digital, Berlin) — Prototyp.
 *
 * Bürgerservice-Portal mit Antragsstrecken nach FIM-Standard. Struktur
 * gespiegelt aus VivioAkte; Inhalte sind Beispiel-/Prototyp-Daten.
 */

import type { ToolProfile } from "@/types/profile";

export const ozgPortal: ToolProfile = {
  slug: "ozg-portal",
  name: "OZG-Portal",
  categorySlug: "buergerservice-fachverfahren",
  tier: "partner",
  lastCheckedAt: "2026-06-12",

  hero: {
    categoryLabel: "Bürgerservice & Fachverfahren",
    title:
      "OZG-Portal — Antragsstrecken, die Bürger zu Ende bringen und Ämter entlasten",
    lead: "Ein Bürgerservice-Portal ist nur so gut wie die Anträge, die tatsächlich digital ankommen. OZG-Portal bildet Antragsstrecken nach FIM-Standard ab — und ist in über 80 Kommunen produktiv im Einsatz.",
    byline: {
      editor: "Amtshelden Redaktion",
      updatedAt: "Juni 2026",
      avatar: {
        url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=68&h=68&fit=crop&q=80",
        alt: "Amtshelden Redaktion",
        width: 68,
        height: 68,
      },
    },
    verified: true,
    heroImage: {
      url: "/brand/Images/magnific_prompt-4-mobile-verwaltun_VdZpYA7MMU.jpg",
      alt: "Mitarbeiterin im Bürgerservice einer Stadtverwaltung",
      width: 2000,
      height: 1116,
    },
    heroCaption:
      "Bürgerservice im Alltag: digitale Antragsstrecken statt Papierformulare",
    company: {
      mark: "OZ",
      name: "Govman Digital",
      type: "GmbH · Berlin",
    },
    urteil:
      "OZG-Portal ist unsere Empfehlung für Kommunen und Landkreise, die *messbar mehr Anträge digital abschließen* wollen — mit sauberer FIM-Anbindung und einem Anbieter, der die Vergabe-Realität kennt.",
    pullQuote: {
      text: "Zum ersten Mal kommen Anträge vollständig digital an — und nicht halb ausgefüllt auf Papier.",
      source:
        "Thomas R. · Leiter Bürgeramt · Kreisstadt · ~38.000 Einwohner",
    },
    body: [
      "Was entscheidet, ob ein Bürgerservice-Portal in der Verwaltung ankommt? Nicht die Zahl der angebotenen Leistungen — sondern ob die Antragsstrecken sauber zu den Fachverfahren passen und ob sie rechtssicher nach FIM-Standard aufgebaut sind. Genau hier setzt OZG-Portal an.",
      "Das Portal läuft als **Cloud-Lösung (SaaS)** in einem deutschen Rechenzentrum, bindet bestehende Fachverfahren über Schnittstellen an und ist **ausschreibungsfähig nach UVgO**. Für die Einführung braucht die Behörde einen fachlichen Ansprechpartner und Abstimmung mit der IT — kein eigenes Entwicklungsteam.",
    ],
  },

  passDas: {
    body: "OZG-Portal richtet sich an Kommunen, Kreisstädte und Landkreise, die ihren Bürgerservice spürbar digitalisieren wollen — besonders dort, wo viele standardisierbare Anträge anfallen (Meldewesen, Gewerbe, Ordnungsamt, Soziales).",
    fitTags: [
      { label: "Kommunen ab 15k EW" },
      { label: "Landkreise" },
      { label: "Bürgeramt" },
      { label: "Ordnungsamt" },
      { label: "FIM-Standard" },
      { label: "Cloud · SaaS", neutral: true },
    ],
    notFit: {
      label: "Wenn Sie etwas anderes brauchen",
      text: "Wenn Sie ausschließlich eine reine Formular-Engine ohne Portal-Unterbau suchen oder zwingend On-Premise betreiben müssen, sind spezialisiertere Lösungen passender — wir zeigen die Unterschiede ehrlich.",
      alternativeLinks: [
        { text: "Form-Solutions", url: "#alternativen" },
        { text: "cit intelliForm", url: "#alternativen" },
      ],
    },
  },

  implementierung: {
    intro:
      "Die häufigste Sorge bei Portal-Projekten: Es bleibt bei der Schaufenster-Lösung, hinten kommt nichts an. Wir haben Kommunen befragt, die OZG-Portal eingeführt haben — und ausdrücklich nach den Stolpersteinen gefragt.",
    tiles: [
      {
        icon: "📅",
        label: "Einführungsdauer",
        value: "12–18 Wo.",
        description: "Kick-off bis zur ersten produktiven Antragsstrecke.",
      },
      {
        icon: "👥",
        label: "Ihr Aufwand",
        value: "Fachbereich + IT",
        description: "1 fachlicher Ansprechpartner, Abstimmung mit der IT.",
      },
      {
        icon: "💶",
        label: "Kostenrahmen",
        value: "ab 14.500 €",
        description: "Pro Jahr. Ausschreibungsfähig nach UVgO.",
      },
    ],
    solutionsHeading: "Typische Herausforderungen — und wie sie gelöst wurden",
    solutions: [
      {
        challenge:
          "Die Anbindung ans Fachverfahren verzögerte den Go-live.",
        solution:
          'Govman Digital priorisiert im Onboarding zwei bis drei „Leuchtturm“-Antragsstrecken mit gesicherter Schnittstelle — der Rest folgt iterativ statt als Big Bang.',
        context: "Erfahrung aus einer Kreisstadt (~38.000 EW)",
        status: "gelöst",
      },
      {
        challenge: "Bürger brachen Anträge mittendrin ab.",
        solution:
          "Strecken wurden nach FIM gekürzt und mit Zwischenspeichern versehen — die Abschlussquote stieg deutlich.",
        context: "Erfahrung aus einer Mittelstadt im Rheinland",
        status: "gelöst",
      },
      {
        challenge: "Unklarheit über Vergabe und Datenschutz.",
        solution:
          "Es liegen eine UVgO-fähige Referenzausschreibung sowie ein vorbereiteter AVV vor — das verkürzt die Beschaffung.",
        context: "Auf Anfrage für alle Kommunen verfügbar",
        status: "gelöst",
      },
    ],
  },

  cases: {
    enabled: false,
    placeholderText:
      "Supertools dokumentiert, wie Software in realen Behörden eingeführt wurde — mit Erfahrungen, Zeitrahmen und Learnings. Dieser Bereich wird laufend ergänzt.",
  },

  kontakt: {
    intro:
      "Anfragen laufen über Amtshelden — wir leiten sie direkt an Govman Digital weiter. Kein anonymes Ticketsystem, kein Spam.",
    links: {
      website: "https://govman.digital",
      email: "kontakt@govman.digital",
      phone: "030 123 456",
    },
  },

  alternativen: {
    intro:
      "Supertools empfiehlt nur, was wirklich passt. Wenn Ihre Anforderungen anders gelagert sind, führen wir Sie ohne Umwege zu den Alternativen.",
    alternatives: [
      {
        mark: "FS",
        markBg: "#2563EB",
        name: "Form-Solutions",
        why: "Wenn der Fokus auf einer reinen, sehr breiten OZG-Formularbibliothek liegt.",
        href: "/tools/form-solutions",
      },
      {
        mark: "CI",
        markBg: "#7C3AED",
        name: "cit intelliForm",
        why: "Für tiefe Formular-Logik und enge Integration in bestehende Fachverfahren.",
        href: "/tools/cit-intelliform",
      },
      {
        mark: "PP",
        markBg: "#059669",
        name: "Publicplan",
        why: "Wenn Sie eine offene GovTech-Plattform mit individueller Entwicklung bevorzugen.",
        href: "/tools/publicplan",
      },
    ],
  },

  cta: {
    eyebrow: "Nächster Schritt",
    title: "Unverbindlich anfragen.\nWir melden uns persönlich.",
    subtitle:
      "Keine automatisierten Antworten. Amtshelden stellt den Kontakt her und sorgt dafür, dass Ihre Anfrage beim richtigen Menschen landet.",
    primaryCta: {
      text: "Jetzt anfragen über Amtshelden",
      url: "/anfrage?tool=ozg-portal",
    },
    secondaryCta: {
      text: "Ähnliche Tools ansehen",
      url: "/kategorien/buergerservice-fachverfahren",
    },
    note: "Kein Spam, keine automatisierten Folge-Mails.\nOder direkt: kontakt@govman.digital · 030 123 456",
  },

  sidebar: {
    complianceWidgets: [
      {
        icon: "🔒",
        name: "DSGVO",
        value: "✓ Konform",
        detail:
          "DSGVO-konform, AVV nach Art. 28 wird standardmäßig mitgeliefert.",
        positive: true,
      },
      {
        icon: "🇩🇪",
        name: "Server",
        value: "✓ Deutschland",
        detail: "Betrieb in einem deutschen Rechenzentrum. Kein Drittstaaten-Transfer.",
        positive: true,
      },
      {
        icon: "🏛",
        name: "BSI C5",
        value: "✓ Vorhanden",
        detail: "BSI-C5-Testat des Rechenzentrumsbetriebs auf Anfrage.",
        positive: true,
      },
      {
        icon: "📋",
        name: "Vergabe",
        value: "✓ UVgO",
        detail: "Ausschreibungsfähig nach UVgO. Referenzausschreibung verfügbar.",
        positive: true,
      },
    ],
    quickFacts: [
      { key: "Preis", value: "ab 14.500 €/Jahr" },
      { key: "Einführung", value: "12–18 Wochen" },
      { key: "Betrieb", value: "Cloud (SaaS)" },
      { key: "Standard", value: "FIM" },
      { key: "Referenzen", value: "80+ Kommunen" },
    ],
    ctaLabel: "Unverbindlich anfragen",
    ctaHref: "#anfrage",
    whyEntries: [
      {
        title: "Antragsstrecken nach FIM",
        description:
          "Rechtssicher modelliert — und anschlussfähig an Land/Bund-Vorgaben.",
      },
      {
        title: "Bewährt in 80+ Kommunen",
        description:
          "Keine Pilot-Wette: produktiver Einsatz in der Breite.",
      },
      {
        title: "Vergabe & Datenschutz vorbereitet",
        description:
          "UVgO-Referenzausschreibung und AVV verkürzen die Beschaffung.",
      },
    ],
    relatedLinks: [
      {
        icon: "⚖️",
        title: "OZG & E-Akte: Was Kommunen jetzt wissen müssen",
        meta: "Supertools Magazin · März 2026",
        href: "/wissen/ozg-e-akte",
      },
      {
        icon: "📖",
        title: "Software-Vergabe nach UVgO",
        meta: "Supertools Wissen",
        href: "/wissen/vergabe-software",
      },
      {
        icon: "🗂️",
        title: "Alle Tools: Bürgerservice & Fachverfahren",
        meta: "Kategorie-Übersicht",
        href: "/kategorien/buergerservice-fachverfahren",
      },
    ],
  },

  transparency: {
    missingInfo: [
      "Keine öffentlich auffindbare Angabe zur Barrierefreiheit (BITV 2.0) der Antragsstrecken.",
      "Konkrete Liste der unterstützten Fachverfahren-Schnittstellen nicht vollständig öffentlich dokumentiert.",
    ],
    sourceNote: "Quelle: Anbieterangaben Govman Digital, geprüft am 12. Juni 2026",
  },

  compliance: {
    dsgvo: "konform",
    serverLocation: "deutschland",
    bsiZertifizierung: true,
    vergabeEignung: "ja",
  },
};
