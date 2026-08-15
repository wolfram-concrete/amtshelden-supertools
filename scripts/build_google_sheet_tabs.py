#!/usr/bin/env python3
"""Build CSV tab exports for the central Supertools Google Sheet."""

import csv
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "data/crawler/master/google-sheet-tabs"


def write_csv(path: Path, rows: list[dict], headers: list[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=headers, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def clean_pitch(value: str) -> str:
    value = value or ""
    value = re.sub(r"\s*Crawler-Hinweis:\s*", " Hinweis: ", value)
    return re.sub(r"\s+", " ", value).strip()


def load_frontend_data() -> dict:
    script = r"""
const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const vm = require("vm");
const root = process.cwd();

function loadTs(rel) {
  const source = fs.readFileSync(path.join(root, rel), "utf8");
  const js = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText;
  const module = { exports: {} };
  const context = {
    module,
    exports: module.exports,
    require: (name) => {
      if (name === "@/types/content") return {};
      throw new Error(`Unsupported require ${name}`);
    },
  };
  vm.runInNewContext(js, context, { filename: rel });
  return module.exports;
}

const crawler = loadTs("src/mocks/tools/crawler-preview.ts");
const master = loadTs("src/data/software-master.ts");
console.log(JSON.stringify({
  crawlerToolCardPreview: crawler.crawlerToolCardPreview,
  crawlerToolLogoPreview: crawler.crawlerToolLogoPreview || {},
  crawlerToolScreenshotPreview: crawler.crawlerToolScreenshotPreview || {},
  crawlerToolSummaryPreview: crawler.crawlerToolSummaryPreview || {},
  masterToolCards: master.masterToolCards,
  masterToolLogoPreview: master.masterToolLogoPreview || {},
  masterToolScreenshotPreview: master.masterToolScreenshotPreview || {},
  masterToolSummaryPreview: master.masterToolSummaryPreview || {},
  masterToolAvailability: master.masterToolAvailability || {},
  masterToolEvidence: master.masterToolEvidence || {},
  masterToolSignals: master.masterToolSignals || {},
}));
"""
    result = subprocess.run(
        ["node", "-e", script],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(result.stdout)


def build_website_portfolio(frontend: dict) -> list[dict]:
    rows: list[dict] = []

    def add_rows(source_layer: str, cards: list[dict], logos: dict, shots: dict, summaries: dict) -> None:
        for card in cards:
            slug = card.get("slug", "")
            logo = logos.get(slug, {})
            rows.append(
                {
                    "source_layer": source_layer,
                    "slug": slug,
                    "name": card.get("name", ""),
                    "provider": card.get("provider", ""),
                    "category": card.get("categoryLabel", ""),
                    "category_slug": card.get("categorySlug", ""),
                    "pitch": clean_pitch(card.get("pitch", "")),
                    "tier": card.get("tier", ""),
                    "last_checked_at": card.get("lastCheckedAt", ""),
                    "logo_url": logo.get("logoUrl", ""),
                    "logo_domain": logo.get("domain", ""),
                    "screenshot_paths": "\n".join(shots.get(slug, [])),
                    "body_copy": summaries.get(slug, ""),
                }
            )

    add_rows(
        "website_preview_broad",
        frontend.get("crawlerToolCardPreview", []),
        frontend.get("crawlerToolLogoPreview", {}),
        frontend.get("crawlerToolScreenshotPreview", {}),
        frontend.get("crawlerToolSummaryPreview", {}),
    )
    add_rows(
        "master_watchlist",
        frontend.get("masterToolCards", []),
        frontend.get("masterToolLogoPreview", {}),
        frontend.get("masterToolScreenshotPreview", {}),
        frontend.get("masterToolSummaryPreview", {}),
    )
    return rows


def build_master_and_history() -> tuple[list[dict], list[dict]]:
    data = json.loads((ROOT / "data/crawler/master/software-master.json").read_text(encoding="utf-8"))

    def row(t: dict, bucket: str) -> dict:
        availability = t.get("availability", {})
        criteria = t.get("criteria", {})
        return {
            "list_bucket": bucket,
            "master_status": t.get("master_status", ""),
            "slug": t.get("slug", ""),
            "name": t.get("name", ""),
            "provider": t.get("provider", ""),
            "website": t.get("website", ""),
            "cluster": t.get("cluster", ""),
            "branch": t.get("branch", ""),
            "source_bucket": t.get("source_bucket", ""),
            "review_confidence": t.get("review_confidence", ""),
            "availability_scope": availability.get("scope", ""),
            "availability_label": availability.get("label", ""),
            "availability_regions": ", ".join(availability.get("regions", [])),
            "public_sector": "ja" if criteria.get("public_sector") else "nein",
            "privacy": "ja" if criteria.get("privacy") else "nein",
            "hosting": "ja" if criteria.get("hosting") else "nein",
            "security": "ja" if criteria.get("security") else "nein",
            "accessibility": "ja" if criteria.get("accessibility") else "nein",
            "operation": "ja" if criteria.get("operation") else "nein",
            "references": "ja" if criteria.get("references") else "nein",
            "missing_info": "\n".join(t.get("missing_info", [])),
            "body_copy": t.get("body_copy", ""),
            "screenshots": "\n".join(t.get("screenshots", [])),
            "evidence_urls": "\n".join(t.get("evidence_urls", [])),
            "last_checked_at": t.get("last_checked_at", ""),
        }

    return (
        [row(t, "master_watchlist") for t in data.get("tools", [])],
        [row(t, "research_rejected_blocked") for t in data.get("rejected_or_blocked", [])],
    )


def build_discovery_inbox() -> list[dict]:
    data = json.loads((ROOT / "data/crawler/discovery/curation-seeds.json").read_text(encoding="utf-8"))
    rows = []
    for entry in data.get("entries", []):
        rows.append(
            {
                "status": entry.get("status", ""),
                "crawl_action": entry.get("crawl_action", ""),
                "name": entry.get("name", ""),
                "website": entry.get("website", ""),
                "cluster": entry.get("cluster", ""),
                "branch": entry.get("branch", ""),
                "source_bucket": entry.get("source_bucket", ""),
                "source_note": entry.get("source_note", ""),
                "priority": entry.get("priority", ""),
                "rank": entry.get("rank", ""),
                "discovered_from": entry.get("discovered_from", ""),
                "notes": entry.get("notes", ""),
            }
        )
    return rows


def build_multipliers() -> list[dict]:
    data = json.loads((ROOT / "data/crawler/discovery/multiplier-sources.json").read_text(encoding="utf-8"))
    rows = []
    for entry in data.get("entries", []):
        editions = entry.get("editions", [])
        rows.append(
            {
                "name": entry.get("name", ""),
                "source_type": entry.get("source_type", ""),
                "url": entry.get("url", ""),
                "public_sector_fit": entry.get("public_sector_fit", ""),
                "priority": entry.get("priority", ""),
                "cadence": entry.get("cadence", ""),
                "active_status": entry.get("active_status", ""),
                "crawl_status": entry.get("crawl_status", ""),
                "last_checked_at": entry.get("last_checked_at", ""),
                "editions": "\n".join(
                    f"{e.get('year', '')}: {e.get('url', '')}" for e in editions if isinstance(e, dict)
                ),
                "notes": entry.get("notes", ""),
            }
        )
    return rows


def build_legend() -> list[dict]:
    return [
        {
            "tab": "01_Fuellhoerner",
            "was_ist_das": "Fundorte und Suchraeume: Messen, Konferenzen, Plattformen, Verbaende, Suchbegriffe und Jahrgaenge.",
            "was_passiert_damit": "Hier beginnt die breite Discovery. Aus diesen Quellen werden moegliche Anbieter gefunden.",
        },
        {
            "tab": "02_Discovery_Inbox",
            "was_ist_das": "Konkrete Anbieter-Kandidaten, die aus Fuellhoernern, Empfehlungen oder manuellen Hinweisen stammen.",
            "was_passiert_damit": "Diese Kandidaten werden dedupliziert, leicht vorqualifiziert und fuer gezielten Anbieter-Crawl priorisiert.",
        },
        {
            "tab": "03_Master_Qualifizierung",
            "was_ist_das": "Enger gepruefte Kandidaten mit Kriterien, Quellen, Verfuegbarkeit, Bodycopy und Screenshot-Pfaden.",
            "was_passiert_damit": "Aus dieser Liste entstehen bessere Profile, Nachrecherche-Aufgaben und spaetere Website-/CMS-Freigaben.",
        },
        {
            "tab": "04_Review_Historie",
            "was_ist_das": "Kandidaten, die abgelehnt, unsicher oder technisch blockiert sind.",
            "was_passiert_damit": "Diese Eintraege dienen als Begruendung, Warnliste und spaetere Re-Check-Liste.",
        },
        {
            "tab": "05_Website_Datenbasis",
            "was_ist_das": "Alle Tools, die aktuell als breite Website-Datenbasis fuer Prototyp, Verzeichnis und Darstellung dienen.",
            "was_passiert_damit": "Keine finale Qualitaetsfreigabe, sondern aktuelle Ausspielungs-/Datenbasis fuer die Website.",
        },
    ]


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for stale_csv in OUT_DIR.glob("*.csv"):
        stale_csv.unlink()

    frontend = load_frontend_data()
    portfolio = build_website_portfolio(frontend)
    master, history = build_master_and_history()
    inbox = build_discovery_inbox()
    multipliers = build_multipliers()
    legend = build_legend()

    write_csv(
        OUT_DIR / "00_legende.csv",
        legend,
        ["tab", "was_ist_das", "was_passiert_damit"],
    )
    write_csv(
        OUT_DIR / "01_fuellhoerner.csv",
        multipliers,
        [
            "name",
            "source_type",
            "url",
            "public_sector_fit",
            "priority",
            "cadence",
            "active_status",
            "crawl_status",
            "last_checked_at",
            "editions",
            "notes",
        ],
    )
    write_csv(
        OUT_DIR / "02_discovery_inbox.csv",
        inbox,
        [
            "status",
            "crawl_action",
            "name",
            "website",
            "cluster",
            "branch",
            "source_bucket",
            "source_note",
            "priority",
            "rank",
            "discovered_from",
            "notes",
        ],
    )
    common_headers = [
        "list_bucket",
        "master_status",
        "slug",
        "name",
        "provider",
        "website",
        "cluster",
        "branch",
        "source_bucket",
        "review_confidence",
        "availability_scope",
        "availability_label",
        "availability_regions",
        "public_sector",
        "privacy",
        "hosting",
        "security",
        "accessibility",
        "operation",
        "references",
        "missing_info",
        "body_copy",
        "screenshots",
        "evidence_urls",
        "last_checked_at",
    ]
    write_csv(OUT_DIR / "03_master_qualifizierung.csv", master, common_headers)
    write_csv(OUT_DIR / "04_review_historie.csv", history, common_headers)
    write_csv(
        OUT_DIR / "05_website_datenbasis.csv",
        portfolio,
        [
            "source_layer",
            "slug",
            "name",
            "provider",
            "category",
            "category_slug",
            "pitch",
            "tier",
            "last_checked_at",
            "logo_url",
            "logo_domain",
            "screenshot_paths",
            "body_copy",
        ],
    )

    print(f"00_Legende: {len(legend)}")
    print(f"01_Fuellhoerner: {len(multipliers)}")
    print(f"02_Discovery_Inbox: {len(inbox)}")
    print(f"03_Master_Qualifizierung: {len(master)}")
    print(f"04_Review_Historie: {len(history)}")
    print(f"05_Website_Datenbasis: {len(portfolio)}")
    print(f"CSV dir: {OUT_DIR}")


if __name__ == "__main__":
    main()
