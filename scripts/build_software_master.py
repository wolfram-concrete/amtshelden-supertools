#!/usr/bin/env python3
"""
Generiert src/data/software-master.ts aus der intern kuratierten
Master-Datenbasis data/crawler/master/software-master.json.

Regeln (siehe docs / Memory):
- Keine „Crawler"-Formulierungen im Frontend. Interne Steuerfelder
  (master_status, review_confidence, missing_info) bleiben INTERN.
- criteria sind öffentliche Signale, KEINE Zertifikate -> ehrliche Labels,
  Compliance-Flags bleiben leer (kein Overclaim).
- body_copy = Zusammenfassung (redaktionell noch feinschleifbar).
- Kategorie-Zuordnung + kurzer Pitch = redaktionell (EDITORIAL unten).

Neu erzeugen: python3 scripts/build_software_master.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "data/crawler/master/software-master.json"
OUT = ROOT / "src/data/software-master.ts"

CATEGORY_LABELS = {
    "e-akte-dokumentenmanagement": "E-Akte & Dokumentenmanagement",
    "buergerservice-fachverfahren": "Bürgerservice & Fachverfahren",
    "finanzen-haushalt": "Finanzen & Haushalt",
    "personal-organisation": "Personal & Organisation",
    "geo-bauen-umwelt": "Geo, Bauen & Umwelt",
    "kommunikation-zusammenarbeit": "Kommunikation & Zusammenarbeit",
}

# Redaktionelle Zuordnung (Kategorie + kurzer, neutraler Pitch) — korrigierbar.
EDITORIAL = {
    "speechmind": ("kommunikation-zusammenarbeit", "KI-gestützte Protokollierung für kommunale Sitzungen."),
    "scriba": ("kommunikation-zusammenarbeit", "KI-Sitzungsprotokollierung für die öffentliche Verwaltung."),
    "convaise": ("buergerservice-fachverfahren", "KI-Verwaltungslotse für den Bürgerdialog."),
    "splitbot-kosmo": ("kommunikation-zusammenarbeit", "Interner KI-Assistent und Wissensbot für Verwaltungen."),
    "findus-one": ("kommunikation-zusammenarbeit", "KI-Plattform für den öffentlichen Bereich."),
    "intrakommuna": ("kommunikation-zusammenarbeit", "Kommunikations- und Wissensplattform für Verwaltungen und Kommunen."),
    "opendesk": ("kommunikation-zusammenarbeit", "Souveräne Office- und Kollaborationssuite für die öffentliche Verwaltung."),
    "ceyoniq": ("e-akte-dokumentenmanagement", "ECM und Dokumentenmanagement für die kommunale Digitalisierung."),
    "inixmedia": ("kommunikation-zusammenarbeit", "Öffentlichkeitsarbeit und Bürgerservice für Kommunen."),
    "nolis": ("buergerservice-fachverfahren", "Kommunale Fachsoftware und Digitalisierungslösungen."),
    "govdigital": ("kommunikation-zusammenarbeit", "Souveräne Verwaltungscloud und digitale Infrastruktur für die öffentliche Verwaltung."),
    "itc-ag": ("kommunikation-zusammenarbeit", "Portale und Kundenkommunikation für kommunale Energie- und Versorgungsunternehmen."),
    "empolis": ("kommunikation-zusammenarbeit", "Wissensmanagement für Kommunen und öffentliche Organisationen."),
}

# criteria-Key -> ehrliches Signal-Label (public_sector = Aufnahmekriterium, nicht gezeigt)
SIGNAL_LABELS = {
    "privacy": "Datenschutz-Hinweise",
    "hosting": "Hosting-Angaben",
    "security": "Security-Angaben",
    "accessibility": "Barrierefreiheit",
    "operation": "Betriebsmodell",
    "references": "Referenzen",
}

AVAIL_LABEL = {
    "federal_state": "bundeslandspezifisch",
    "regional": "regional",
    "nationwide": "bundesweit",
    "national": "bundesweit",
    "unknown": "in Prüfung",
}


def domain_of(url: str) -> str:
    return re.sub(r"^https?://(www\.)?", "", url).split("/")[0]


def mark_of(name: str) -> str:
    words = [w for w in re.split(r"[\s/]+", name) if w]
    if len(words) >= 2:
        return (words[0][0] + words[1][0]).upper()
    return name[:2].upper()


def main() -> None:
    data = json.loads(SRC.read_text(encoding="utf-8"))
    tools = data["tools"]

    cards = []
    logos = {}
    screenshots = {}
    summaries = {}
    availability = {}
    evidence = {}
    signals = {}

    for t in tools:
        slug = t["slug"]
        cat_slug, pitch = EDITORIAL[slug]
        dom = domain_of(t["website"])

        cards.append({
            "slug": slug,
            "name": t["name"],
            "provider": t["provider"],
            "categorySlug": cat_slug,
            "categoryLabel": CATEGORY_LABELS[cat_slug],
            "pitch": pitch,
            "tier": "basis",
            "facts": {},
            # Ehrlich: criteria sind Signale, keine Zertifikate -> keine Compliance-Claims
            "compliance": {"dsgvo": False, "serverDe": False},
            "mark": mark_of(t["name"]),
            "markBg": "var(--color-brand)",
            "lastCheckedAt": t["last_checked_at"],
        })

        logos[slug] = {
            "website": t["website"],
            "domain": dom,
            "logoUrl": f"https://www.google.com/s2/favicons?domain={dom}&sz=128",
            "backgroundColor": "#ffffff",
        }

        shots = [s for s in t.get("screenshots", []) if s]
        if shots:
            screenshots[slug] = shots

        if t.get("body_copy"):
            summaries[slug] = t["body_copy"]

        av = t.get("availability", {})
        scope = av.get("scope", "unknown")
        availability[slug] = {
            "label": AVAIL_LABEL.get(scope, "in Prüfung"),
            "regions": av.get("regions", []),
            "needsReview": bool(av.get("needs_review")),
            "note": "Wird redaktionell geprüft." if av.get("needs_review") else "",
        }

        ev = []
        for u in t.get("evidence_urls", []):
            if u and u not in ev:
                ev.append(u)
        if ev:
            evidence[slug] = ev

        crit = t.get("criteria", {})
        sig = [SIGNAL_LABELS[k] for k, v in crit.items() if v and k in SIGNAL_LABELS]
        if sig:
            signals[slug] = sig

    def js(obj):
        return json.dumps(obj, ensure_ascii=False, indent=2)

    header = (
        "// AUTO-GENERIERT von scripts/build_software_master.py — nicht von Hand editieren.\n"
        "// Quelle: data/crawler/master/software-master.json (intern kuratierte Supertools-Datenbasis).\n"
        "// Nur redaktionell freigegebene Datensätze. Keine „Crawler\"-Formulierungen im Frontend.\n\n"
        'import type { ToolCardSummary } from "@/types/content";\n\n'
        "export interface SoftwareAvailability {\n"
        "  /** Anzeige-Label: bundeslandspezifisch | regional | bundesweit | in Prüfung */\n"
        "  label: string;\n"
        "  /** Konkrete Regionen/Bundesländer, falls belegt */\n"
        "  regions: string[];\n"
        "  /** Noch in redaktioneller Prüfung */\n"
        "  needsReview: boolean;\n"
        "  /** Optionaler Hinweis */\n"
        "  note: string;\n"
        "}\n\n"
    )

    body = (
        f"export const masterToolCards: ToolCardSummary[] = {js(cards)};\n\n"
        f"export const masterToolLogoPreview: Record<string, {{ website: string; domain: string; logoUrl: string; backgroundColor: string }}> = {js(logos)};\n\n"
        f"export const masterToolScreenshotPreview: Record<string, string[]> = {js(screenshots)};\n\n"
        f"export const masterToolSummaryPreview: Record<string, string> = {js(summaries)};\n\n"
        f"export const masterToolAvailability: Record<string, SoftwareAvailability> = {js(availability)};\n\n"
        f"export const masterToolEvidence: Record<string, string[]> = {js(evidence)};\n\n"
        f"export const masterToolSignals: Record<string, string[]> = {js(signals)};\n"
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(header + body, encoding="utf-8")
    print(f"geschrieben: {OUT.relative_to(ROOT)}  ({len(cards)} Tools)")


if __name__ == "__main__":
    main()
