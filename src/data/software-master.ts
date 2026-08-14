// AUTO-GENERIERT von scripts/build_software_master.py — nicht von Hand editieren.
// Quelle: data/crawler/master/software-master.json (intern kuratierte Supertools-Datenbasis).
// Nur redaktionell freigegebene Datensätze. Keine „Crawler"-Formulierungen im Frontend.

import type { ToolCardSummary } from "@/types/content";

export interface SoftwareAvailability {
  /** Anzeige-Label: bundeslandspezifisch | regional | bundesweit | in Prüfung */
  label: string;
  /** Konkrete Regionen/Bundesländer, falls belegt */
  regions: string[];
  /** Noch in redaktioneller Prüfung */
  needsReview: boolean;
  /** Optionaler Hinweis */
  note: string;
}

export const masterToolCards: ToolCardSummary[] = [
  {
    "slug": "speechmind",
    "name": "SpeechMind",
    "provider": "SpeechMind",
    "categorySlug": "kommunikation-zusammenarbeit",
    "categoryLabel": "Kommunikation & Zusammenarbeit",
    "pitch": "KI-gestützte Protokollierung für kommunale Sitzungen.",
    "tier": "basis",
    "facts": {},
    "compliance": {
      "dsgvo": false,
      "serverDe": false
    },
    "mark": "SP",
    "markBg": "var(--color-brand)",
    "lastCheckedAt": "2026-08-14"
  },
  {
    "slug": "scriba",
    "name": "Scriba",
    "provider": "Scriba",
    "categorySlug": "kommunikation-zusammenarbeit",
    "categoryLabel": "Kommunikation & Zusammenarbeit",
    "pitch": "KI-Sitzungsprotokollierung für die öffentliche Verwaltung.",
    "tier": "basis",
    "facts": {},
    "compliance": {
      "dsgvo": false,
      "serverDe": false
    },
    "mark": "SC",
    "markBg": "var(--color-brand)",
    "lastCheckedAt": "2026-08-14"
  },
  {
    "slug": "convaise",
    "name": "Convaise",
    "provider": "Convaise",
    "categorySlug": "buergerservice-fachverfahren",
    "categoryLabel": "Bürgerservice & Fachverfahren",
    "pitch": "KI-Verwaltungslotse für den Bürgerdialog.",
    "tier": "basis",
    "facts": {},
    "compliance": {
      "dsgvo": false,
      "serverDe": false
    },
    "mark": "CO",
    "markBg": "var(--color-brand)",
    "lastCheckedAt": "2026-08-14"
  },
  {
    "slug": "splitbot-kosmo",
    "name": "Splitbot / KOSMO",
    "provider": "Splitbot / KOSMO",
    "categorySlug": "kommunikation-zusammenarbeit",
    "categoryLabel": "Kommunikation & Zusammenarbeit",
    "pitch": "Interner KI-Assistent und Wissensbot für Verwaltungen.",
    "tier": "basis",
    "facts": {},
    "compliance": {
      "dsgvo": false,
      "serverDe": false
    },
    "mark": "SK",
    "markBg": "var(--color-brand)",
    "lastCheckedAt": "2026-08-14"
  },
  {
    "slug": "findus-one",
    "name": "Findus One",
    "provider": "Findus One",
    "categorySlug": "kommunikation-zusammenarbeit",
    "categoryLabel": "Kommunikation & Zusammenarbeit",
    "pitch": "KI-Plattform für den öffentlichen Bereich.",
    "tier": "basis",
    "facts": {},
    "compliance": {
      "dsgvo": false,
      "serverDe": false
    },
    "mark": "FO",
    "markBg": "var(--color-brand)",
    "lastCheckedAt": "2026-08-14"
  },
  {
    "slug": "intrakommuna",
    "name": "Intrakommuna",
    "provider": "Intrakommuna",
    "categorySlug": "kommunikation-zusammenarbeit",
    "categoryLabel": "Kommunikation & Zusammenarbeit",
    "pitch": "Kommunikations- und Wissensplattform für Verwaltungen und Kommunen.",
    "tier": "basis",
    "facts": {},
    "compliance": {
      "dsgvo": false,
      "serverDe": false
    },
    "mark": "IN",
    "markBg": "var(--color-brand)",
    "lastCheckedAt": "2026-08-14"
  },
  {
    "slug": "opendesk",
    "name": "openDesk",
    "provider": "openDesk",
    "categorySlug": "kommunikation-zusammenarbeit",
    "categoryLabel": "Kommunikation & Zusammenarbeit",
    "pitch": "Souveräne Office- und Kollaborationssuite für die öffentliche Verwaltung.",
    "tier": "basis",
    "facts": {},
    "compliance": {
      "dsgvo": false,
      "serverDe": false
    },
    "mark": "OP",
    "markBg": "var(--color-brand)",
    "lastCheckedAt": "2026-08-14"
  },
  {
    "slug": "ceyoniq",
    "name": "Ceyoniq",
    "provider": "Ceyoniq",
    "categorySlug": "e-akte-dokumentenmanagement",
    "categoryLabel": "E-Akte & Dokumentenmanagement",
    "pitch": "ECM und Dokumentenmanagement für die kommunale Digitalisierung.",
    "tier": "basis",
    "facts": {},
    "compliance": {
      "dsgvo": false,
      "serverDe": false
    },
    "mark": "CE",
    "markBg": "var(--color-brand)",
    "lastCheckedAt": "2026-08-14"
  },
  {
    "slug": "inixmedia",
    "name": "Inixmedia",
    "provider": "Inixmedia",
    "categorySlug": "kommunikation-zusammenarbeit",
    "categoryLabel": "Kommunikation & Zusammenarbeit",
    "pitch": "Öffentlichkeitsarbeit und Bürgerservice für Kommunen.",
    "tier": "basis",
    "facts": {},
    "compliance": {
      "dsgvo": false,
      "serverDe": false
    },
    "mark": "IN",
    "markBg": "var(--color-brand)",
    "lastCheckedAt": "2026-08-14"
  },
  {
    "slug": "nolis",
    "name": "Nolis",
    "provider": "Nolis",
    "categorySlug": "buergerservice-fachverfahren",
    "categoryLabel": "Bürgerservice & Fachverfahren",
    "pitch": "Kommunale Fachsoftware und Digitalisierungslösungen.",
    "tier": "basis",
    "facts": {},
    "compliance": {
      "dsgvo": false,
      "serverDe": false
    },
    "mark": "NO",
    "markBg": "var(--color-brand)",
    "lastCheckedAt": "2026-08-14"
  },
  {
    "slug": "govdigital",
    "name": "govdigital",
    "provider": "govdigital",
    "categorySlug": "kommunikation-zusammenarbeit",
    "categoryLabel": "Kommunikation & Zusammenarbeit",
    "pitch": "Souveräne Verwaltungscloud und digitale Infrastruktur für die öffentliche Verwaltung.",
    "tier": "basis",
    "facts": {},
    "compliance": {
      "dsgvo": false,
      "serverDe": false
    },
    "mark": "GO",
    "markBg": "var(--color-brand)",
    "lastCheckedAt": "2026-08-14"
  },
  {
    "slug": "itc-ag",
    "name": "ITC AG",
    "provider": "ITC AG",
    "categorySlug": "kommunikation-zusammenarbeit",
    "categoryLabel": "Kommunikation & Zusammenarbeit",
    "pitch": "Portale und Kundenkommunikation für kommunale Energie- und Versorgungsunternehmen.",
    "tier": "basis",
    "facts": {},
    "compliance": {
      "dsgvo": false,
      "serverDe": false
    },
    "mark": "IA",
    "markBg": "var(--color-brand)",
    "lastCheckedAt": "2026-08-14"
  },
  {
    "slug": "empolis",
    "name": "Empolis",
    "provider": "Empolis",
    "categorySlug": "kommunikation-zusammenarbeit",
    "categoryLabel": "Kommunikation & Zusammenarbeit",
    "pitch": "Wissensmanagement für Kommunen und öffentliche Organisationen.",
    "tier": "basis",
    "facts": {},
    "compliance": {
      "dsgvo": false,
      "serverDe": false
    },
    "mark": "EM",
    "markBg": "var(--color-brand)",
    "lastCheckedAt": "2026-08-14"
  }
];

export const masterToolLogoPreview: Record<string, { website: string; domain: string; logoUrl: string; backgroundColor: string }> = {
  "speechmind": {
    "website": "https://www.speechmind.com/use-cases/public-sector",
    "domain": "speechmind.com",
    "logoUrl": "https://www.google.com/s2/favicons?domain=speechmind.com&sz=128",
    "backgroundColor": "#ffffff"
  },
  "scriba": {
    "website": "https://www.govconnect.de/Produkte/Partnerl%C3%B6sungen/Scriba/index.php",
    "domain": "govconnect.de",
    "logoUrl": "https://www.google.com/s2/favicons?domain=govconnect.de&sz=128",
    "backgroundColor": "#ffffff"
  },
  "convaise": {
    "website": "https://www.convaise.com/behoerden",
    "domain": "convaise.com",
    "logoUrl": "https://www.google.com/s2/favicons?domain=convaise.com&sz=128",
    "backgroundColor": "#ffffff"
  },
  "splitbot-kosmo": {
    "website": "https://splitbot.ai",
    "domain": "splitbot.ai",
    "logoUrl": "https://www.google.com/s2/favicons?domain=splitbot.ai&sz=128",
    "backgroundColor": "#ffffff"
  },
  "findus-one": {
    "website": "https://www.findus-one.de",
    "domain": "findus-one.de",
    "logoUrl": "https://www.google.com/s2/favicons?domain=findus-one.de&sz=128",
    "backgroundColor": "#ffffff"
  },
  "intrakommuna": {
    "website": "https://www.intrakommuna.de",
    "domain": "intrakommuna.de",
    "logoUrl": "https://www.google.com/s2/favicons?domain=intrakommuna.de&sz=128",
    "backgroundColor": "#ffffff"
  },
  "opendesk": {
    "website": "https://www.opendesk.eu/de",
    "domain": "opendesk.eu",
    "logoUrl": "https://www.google.com/s2/favicons?domain=opendesk.eu&sz=128",
    "backgroundColor": "#ffffff"
  },
  "ceyoniq": {
    "website": "https://ceyoniq.com",
    "domain": "ceyoniq.com",
    "logoUrl": "https://www.google.com/s2/favicons?domain=ceyoniq.com&sz=128",
    "backgroundColor": "#ffffff"
  },
  "inixmedia": {
    "website": "https://www.inixmedia.de",
    "domain": "inixmedia.de",
    "logoUrl": "https://www.google.com/s2/favicons?domain=inixmedia.de&sz=128",
    "backgroundColor": "#ffffff"
  },
  "nolis": {
    "website": "https://www.nolis.de",
    "domain": "nolis.de",
    "logoUrl": "https://www.google.com/s2/favicons?domain=nolis.de&sz=128",
    "backgroundColor": "#ffffff"
  },
  "govdigital": {
    "website": "https://govdigital.de",
    "domain": "govdigital.de",
    "logoUrl": "https://www.google.com/s2/favicons?domain=govdigital.de&sz=128",
    "backgroundColor": "#ffffff"
  },
  "itc-ag": {
    "website": "https://www.itc-ag.com",
    "domain": "itc-ag.com",
    "logoUrl": "https://www.google.com/s2/favicons?domain=itc-ag.com&sz=128",
    "backgroundColor": "#ffffff"
  },
  "empolis": {
    "website": "https://empolis.com/de/wissensmanagement-fuer-kommunen",
    "domain": "empolis.com",
    "logoUrl": "https://www.google.com/s2/favicons?domain=empolis.com&sz=128",
    "backgroundColor": "#ffffff"
  }
};

export const masterToolScreenshotPreview: Record<string, string[]> = {
  "speechmind": [
    "/brand/screenshots/speechmind/shot-1.jpg"
  ],
  "scriba": [
    "/brand/screenshots/scriba/shot-1.jpg"
  ],
  "convaise": [
    "/brand/screenshots/convaise/shot-1.jpg"
  ],
  "splitbot-kosmo": [
    "/brand/screenshots/splitbot-kosmo/shot-1.jpg"
  ],
  "findus-one": [
    "/brand/screenshots/findus-one/shot-1.jpg"
  ],
  "intrakommuna": [
    "/brand/screenshots/intrakommuna/shot-1.jpg"
  ],
  "opendesk": [
    "/brand/screenshots/opendesk/shot-1.jpg"
  ],
  "ceyoniq": [
    "/brand/screenshots/ceyoniq/shot-1.jpg"
  ],
  "inixmedia": [
    "/brand/screenshots/inixmedia/shot-1.jpg"
  ],
  "nolis": [
    "/brand/screenshots/nolis/shot-1.jpg"
  ],
  "govdigital": [
    "/brand/screenshots/govdigital/shot-1.jpg"
  ],
  "itc-ag": [
    "/brand/screenshots/itc-ag/shot-1.jpg"
  ],
  "empolis": [
    "/brand/screenshots/empolis/shot-1.jpg"
  ]
};

export const masterToolSummaryPreview: Record<string, string> = {
  "speechmind": "SpeechMind ist ein Anbieter bzw. Produkt im Bereich KI-Protokollierung fuer kommunale Sitzungen. In den ausgewerteten Anbieterinhalten finden sich Hinweise auf Einsatzfelder im öffentlichen Sektor, in Verwaltungen oder bei kommunalen Organisationen. Als prüfbare Themen tauchen öffentlich Hinweise zu Datenschutz, Hosting oder Datenstandort, Sicherheit auf. Ergänzend wurden öffentliche Materialien wie Fachartikel, Downloads, Webinare gefunden.",
  "scriba": "Scriba ist ein Anbieter bzw. Produkt im Bereich KI-Sitzungsprotokollierung fuer oeffentliche Verwaltung. In den ausgewerteten Anbieterinhalten finden sich Hinweise auf Einsatzfelder im öffentlichen Sektor, in Verwaltungen oder bei kommunalen Organisationen. Als prüfbare Themen tauchen öffentlich Hinweise zu Datenschutz, Sicherheit, Referenzen auf. Ergänzend wurden öffentliche Materialien wie Fachartikel, Downloads gefunden.",
  "convaise": "Convaise ist ein Anbieter bzw. Produkt im Bereich KI-Verwaltungslotse / Buergerdialog. In den ausgewerteten Anbieterinhalten finden sich Hinweise auf Einsatzfelder im öffentlichen Sektor, in Verwaltungen oder bei kommunalen Organisationen. Als prüfbare Themen tauchen öffentlich Hinweise zu Datenschutz, Hosting oder Datenstandort, Sicherheit, Barrierefreiheit auf. Ergänzend wurden öffentliche Materialien wie Fachartikel gefunden.",
  "splitbot-kosmo": "Splitbot / KOSMO ist ein Anbieter bzw. Produkt im Bereich KI-Wissensbot / interner KI-Assistent. Öffentlich auffindbare Inhalte deuten auf ein Betriebsmodell als Cloud/SaaS, On-Premise hin. In den ausgewerteten Anbieterinhalten finden sich Hinweise auf Einsatzfelder im öffentlichen Sektor, in Verwaltungen oder bei kommunalen Organisationen. Als prüfbare Themen tauchen öffentlich Hinweise zu Datenschutz, Hosting oder Datenstandort, Sicherheit, Referenzen auf. Ergänzend wurden öffentliche Materialien wie Fachartikel gefunden.",
  "findus-one": "Findus One ist ein Anbieter bzw. Produkt im Bereich KI-Plattform fuer oeffentlichen Bereich. Öffentlich auffindbare Inhalte deuten auf ein Betriebsmodell als On-Premise hin. In den ausgewerteten Anbieterinhalten finden sich Hinweise auf Einsatzfelder im öffentlichen Sektor, in Verwaltungen oder bei kommunalen Organisationen. Als prüfbare Themen tauchen öffentlich Hinweise zu Datenschutz, Hosting oder Datenstandort, Sicherheit, Referenzen auf.",
  "intrakommuna": "Intrakommuna ist ein Anbieter bzw. Produkt im Bereich Kommunikationsplattform / Wissensmanagement fuer Verwaltungen und Kommunen. Öffentlich auffindbare Inhalte deuten auf ein Betriebsmodell als Cloud/SaaS hin. In den ausgewerteten Anbieterinhalten finden sich Hinweise auf Einsatzfelder im öffentlichen Sektor, in Verwaltungen oder bei kommunalen Organisationen. Als prüfbare Themen tauchen öffentlich Hinweise zu Datenschutz, Hosting oder Datenstandort, Sicherheit, Referenzen auf.",
  "opendesk": "openDesk ist ein Anbieter bzw. Produkt im Bereich Office- und Kollaborationssuite fuer oeffentliche Verwaltung. In den ausgewerteten Anbieterinhalten finden sich Hinweise auf Einsatzfelder im öffentlichen Sektor, in Verwaltungen oder bei kommunalen Organisationen. Als prüfbare Themen tauchen öffentlich Hinweise zu Datenschutz, Hosting oder Datenstandort, Sicherheit, Barrierefreiheit auf. Ergänzend wurden öffentliche Materialien wie Fachartikel, Videos gefunden.",
  "ceyoniq": "Ceyoniq ist ein Anbieter bzw. Produkt im Bereich kommunale Digitalisierung / Software / Plattformen. In den ausgewerteten Anbieterinhalten finden sich Hinweise auf Einsatzfelder im öffentlichen Sektor, in Verwaltungen oder bei kommunalen Organisationen. Als prüfbare Themen tauchen öffentlich Hinweise zu Datenschutz, Sicherheit, Referenzen auf. Ergänzend wurden öffentliche Materialien wie Fachartikel, Videos gefunden.",
  "inixmedia": "Inixmedia ist ein Anbieter bzw. Produkt im Bereich kommunale Digitalisierung / Software / Plattformen. In den ausgewerteten Anbieterinhalten finden sich Hinweise auf Einsatzfelder im öffentlichen Sektor, in Verwaltungen oder bei kommunalen Organisationen. Als prüfbare Themen tauchen öffentlich Hinweise zu Datenschutz, Hosting oder Datenstandort, Sicherheit, Barrierefreiheit auf. Ergänzend wurden öffentliche Materialien wie Fachartikel, Downloads gefunden.",
  "nolis": "Nolis ist ein Anbieter bzw. Produkt im Bereich kommunale Digitalisierung / Software / Plattformen. In den ausgewerteten Anbieterinhalten finden sich Hinweise auf Einsatzfelder im öffentlichen Sektor, in Verwaltungen oder bei kommunalen Organisationen. Als prüfbare Themen tauchen öffentlich Hinweise zu Datenschutz, Sicherheit, Barrierefreiheit, Referenzen auf. Ergänzend wurden öffentliche Materialien wie Fachartikel, Webinare gefunden.",
  "govdigital": "govdigital ist ein Anbieter bzw. Produkt im Bereich Souveraene Verwaltungscloud / digitale Infrastruktur. Öffentlich auffindbare Inhalte deuten auf ein Betriebsmodell als On-Premise, Hybrid hin. In den ausgewerteten Anbieterinhalten finden sich Hinweise auf Einsatzfelder im öffentlichen Sektor, in Verwaltungen oder bei kommunalen Organisationen. Als prüfbare Themen tauchen öffentlich Hinweise zu Datenschutz, Sicherheit, Referenzen auf. Ergänzend wurden öffentliche Materialien wie Fachartikel gefunden.",
  "itc-ag": "ITC AG ist ein Anbieter bzw. Produkt im Bereich Portale / Kundenkommunikation fuer Energie und Versorger. In den ausgewerteten Anbieterinhalten finden sich Hinweise auf Einsatzfelder im öffentlichen Sektor, in Verwaltungen oder bei kommunalen Organisationen. Als prüfbare Themen tauchen öffentlich Hinweise zu Datenschutz, Sicherheit, Referenzen auf. Ergänzend wurden öffentliche Materialien wie Fachartikel, Downloads, Webinare gefunden.",
  "empolis": "Empolis ist ein Anbieter bzw. Produkt im Bereich Wissensmanagement fuer Kommunen. In den ausgewerteten Anbieterinhalten finden sich Hinweise auf Einsatzfelder im öffentlichen Sektor, in Verwaltungen oder bei kommunalen Organisationen. Als prüfbare Themen tauchen öffentlich Hinweise zu Datenschutz, Sicherheit, Referenzen auf. Ergänzend wurden öffentliche Materialien wie Fachartikel, Webinare, Whitepaper gefunden."
};

export const masterToolAvailability: Record<string, SoftwareAvailability> = {
  "speechmind": {
    "label": "in Prüfung",
    "regions": [],
    "needsReview": true,
    "note": "Wird redaktionell geprüft."
  },
  "scriba": {
    "label": "bundeslandspezifisch",
    "regions": [
      "Niedersachsen"
    ],
    "needsReview": true,
    "note": "Wird redaktionell geprüft."
  },
  "convaise": {
    "label": "in Prüfung",
    "regions": [],
    "needsReview": true,
    "note": "Wird redaktionell geprüft."
  },
  "splitbot-kosmo": {
    "label": "in Prüfung",
    "regions": [],
    "needsReview": true,
    "note": "Wird redaktionell geprüft."
  },
  "findus-one": {
    "label": "in Prüfung",
    "regions": [],
    "needsReview": true,
    "note": "Wird redaktionell geprüft."
  },
  "intrakommuna": {
    "label": "in Prüfung",
    "regions": [],
    "needsReview": true,
    "note": "Wird redaktionell geprüft."
  },
  "opendesk": {
    "label": "in Prüfung",
    "regions": [],
    "needsReview": true,
    "note": "Wird redaktionell geprüft."
  },
  "ceyoniq": {
    "label": "in Prüfung",
    "regions": [],
    "needsReview": true,
    "note": "Wird redaktionell geprüft."
  },
  "inixmedia": {
    "label": "regional",
    "regions": [],
    "needsReview": true,
    "note": "Wird redaktionell geprüft."
  },
  "nolis": {
    "label": "in Prüfung",
    "regions": [],
    "needsReview": true,
    "note": "Wird redaktionell geprüft."
  },
  "govdigital": {
    "label": "bundesweit",
    "regions": [],
    "needsReview": false,
    "note": ""
  },
  "itc-ag": {
    "label": "regional",
    "regions": [],
    "needsReview": true,
    "note": "Wird redaktionell geprüft."
  },
  "empolis": {
    "label": "in Prüfung",
    "regions": [],
    "needsReview": true,
    "note": "Wird redaktionell geprüft."
  }
};

export const masterToolEvidence: Record<string, string[]> = {
  "speechmind": [
    "https://www.speechmind.com/use-cases/public-sector",
    "https://www.speechmind.com/privacy",
    "https://www.speechmind.com/security"
  ],
  "scriba": [
    "https://www.govconnect.de/Produkte/Partnerl%C3%B6sungen/Scriba/index.php",
    "https://www.govconnect.de/Kurzmen%C3%BC/Datenschutz",
    "https://www.govconnect.de/Produkte/Partnerl%C3%B6sungen/Scriba/index.php/datenschutz",
    "https://www.govconnect.de/Kurzmen%C3%BC/Impressum"
  ],
  "convaise": [
    "https://www.convaise.com/behoerden",
    "https://www.convaise.com/datenschutz"
  ],
  "splitbot-kosmo": [
    "https://splitbot.ai",
    "https://splitbot.ai/anwendung",
    "https://splitbot.ai/datenschutz",
    "https://splitbot.ai/impressum"
  ],
  "findus-one": [
    "https://www.findus-one.de",
    "https://www.findus-one.de/datenschutz",
    "https://www.findus-one.de/impressum"
  ],
  "intrakommuna": [
    "https://www.intrakommuna.de",
    "https://www.intrakommuna.de/datenschutz",
    "https://www.intrakommuna.de/impressum"
  ],
  "opendesk": [
    "https://www.opendesk.eu/de",
    "https://www.opendesk.eu/de/datenschutz",
    "https://www.opendesk.eu/de/impressum"
  ],
  "ceyoniq": [
    "https://ceyoniq.com",
    "https://ceyoniq.com/datenschutz",
    "https://ceyoniq.com/datenschutzerklaerung",
    "https://ceyoniq.com/impressum"
  ],
  "inixmedia": [
    "https://www.inixmedia.de",
    "https://www.inixmedia.de/datenschutz",
    "https://www.inixmedia.de/impressum"
  ],
  "nolis": [
    "https://www.nolis.de",
    "https://www.nolis.de/datenschutz",
    "https://www.nolis.de/impressum"
  ],
  "govdigital": [
    "https://govdigital.de",
    "https://govdigital.de/datenschutz",
    "https://govdigital.de/datenschutzerklaerung",
    "https://govdigital.de/impressum"
  ],
  "itc-ag": [
    "https://www.itc-ag.com",
    "https://www.itc-ag.com/Datenschutzinformation.html",
    "https://www.itc-ag.com/datenschutz",
    "https://www.itc-ag.com/impressum"
  ],
  "empolis": [
    "https://empolis.com/de/wissensmanagement-fuer-kommunen",
    "https://empolis.com/de/datenschutz",
    "https://empolis.com/de/impressum"
  ]
};

export const masterToolSignals: Record<string, string[]> = {
  "speechmind": [
    "Datenschutz-Hinweise",
    "Hosting-Angaben",
    "Security-Angaben"
  ],
  "scriba": [
    "Datenschutz-Hinweise",
    "Security-Angaben",
    "Referenzen"
  ],
  "convaise": [
    "Datenschutz-Hinweise",
    "Hosting-Angaben",
    "Security-Angaben",
    "Barrierefreiheit",
    "Referenzen"
  ],
  "splitbot-kosmo": [
    "Datenschutz-Hinweise",
    "Hosting-Angaben",
    "Security-Angaben",
    "Betriebsmodell",
    "Referenzen"
  ],
  "findus-one": [
    "Datenschutz-Hinweise",
    "Hosting-Angaben",
    "Security-Angaben",
    "Betriebsmodell",
    "Referenzen"
  ],
  "intrakommuna": [
    "Datenschutz-Hinweise",
    "Hosting-Angaben",
    "Security-Angaben",
    "Betriebsmodell",
    "Referenzen"
  ],
  "opendesk": [
    "Datenschutz-Hinweise",
    "Hosting-Angaben",
    "Security-Angaben",
    "Barrierefreiheit",
    "Referenzen"
  ],
  "ceyoniq": [
    "Datenschutz-Hinweise",
    "Security-Angaben",
    "Referenzen"
  ],
  "inixmedia": [
    "Datenschutz-Hinweise",
    "Hosting-Angaben",
    "Security-Angaben",
    "Barrierefreiheit",
    "Referenzen"
  ],
  "nolis": [
    "Datenschutz-Hinweise",
    "Security-Angaben",
    "Barrierefreiheit",
    "Referenzen"
  ],
  "govdigital": [
    "Datenschutz-Hinweise",
    "Security-Angaben",
    "Betriebsmodell",
    "Referenzen"
  ],
  "itc-ag": [
    "Datenschutz-Hinweise",
    "Security-Angaben",
    "Referenzen"
  ],
  "empolis": [
    "Datenschutz-Hinweise",
    "Security-Angaben",
    "Referenzen"
  ]
};
