#!/usr/bin/env python3
"""Build an internal Supertools software master list from crawler runs."""

from __future__ import annotations

import argparse
import csv
import json
import re
from pathlib import Path
from typing import Any

from export_crawler_toolcards_preview import public_summary, slugify


DEFAULT_SCREENSHOT_ROOT = "public/brand/screenshots"
DEFAULT_OUT = "data/crawler/master/software-master.json"
SHEET_HEADERS = [
    "list_bucket",
    "master_status",
    "master_status_reason",
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
    "availability_confidence",
    "availability_needs_review",
    "availability_evidence",
    "public_sector",
    "privacy_dsgvo",
    "hosting_serverstandort",
    "security_zertifizierung",
    "accessibility",
    "operation",
    "references",
    "missing_info",
    "body_copy",
    "screenshots",
    "evidence_urls",
    "content_piece_count",
    "last_checked_at",
]

AVAILABILITY_SCOPE_LABELS = {
    "nationwide": "bundesweit",
    "federal_state": "bundeslandspezifisch",
    "regional": "regional",
    "unknown": "unklar",
}

FEDERAL_STATE_ALIASES = {
    "Baden-Wuerttemberg": ["baden-wuerttemberg", "baden-württemberg"],
    "Bayern": ["bayern", "bavaria"],
    "Berlin": ["berlin"],
    "Brandenburg": ["brandenburg"],
    "Bremen": ["bremen"],
    "Hamburg": ["hamburg"],
    "Hessen": ["hessen"],
    "Mecklenburg-Vorpommern": ["mecklenburg-vorpommern", "mecklenburg vorpommern"],
    "Niedersachsen": ["niedersachsen"],
    "Nordrhein-Westfalen": ["nordrhein-westfalen", "nordrhein westfalen", "nrw"],
    "Rheinland-Pfalz": ["rheinland-pfalz", "rheinland pfalz"],
    "Saarland": ["saarland"],
    "Sachsen": ["sachsen"],
    "Sachsen-Anhalt": ["sachsen-anhalt", "sachsen anhalt"],
    "Schleswig-Holstein": ["schleswig-holstein", "schleswig holstein"],
    "Thueringen": ["thueringen", "thüringen"],
}

NATIONWIDE_TERMS = [
    "bundesweit",
    "deutschlandweit",
    "in ganz deutschland",
    "fuer alle bundeslaender",
    "für alle bundesländer",
    "alle bundeslaender",
    "alle bundesländer",
]

REGIONAL_TERMS = [
    "regional",
    "regionale",
    "regionaler",
    "vor ort",
    "im umkreis",
    "in der region",
]

STATE_CONTEXT_TERMS = [
    "kommunen",
    "kommune",
    "behoerden",
    "behörden",
    "verwaltung",
    "verwaltungen",
    "landesverwaltung",
    "landesloesung",
    "landeslösung",
    "oeffentlicher sektor",
    "öffentlicher sektor",
]

STATE_RESTRICTION_TERMS = [
    "nur",
    "ausschliesslich",
    "ausschließlich",
    "derzeit",
    "aktuell",
    "verfuegbar",
    "verfügbar",
    "begleiten",
    "betreuen",
]


def screenshot_paths(slug: str, root: Path) -> list[str]:
    folder = root / slug
    if not folder.exists():
        return []
    paths = []
    for file in sorted(folder.glob("shot-*.jpg")):
        paths.append(f"/brand/screenshots/{slug}/{file.name}")
    return paths


def signal_bool(item: dict[str, Any], key: str) -> bool:
    return bool(item.get("signals", {}).get(key))


def master_status(item: dict[str, Any]) -> tuple[str, str]:
    successful = int(item.get("crawl", {}).get("successful_pages") or 0)
    missing = item.get("missing_info") or []
    confidence = item.get("confidence")
    public = signal_bool(item, "public_sector")
    privacy = signal_bool(item, "privacy")
    hosting = signal_bool(item, "hosting")
    security = signal_bool(item, "security")

    if successful == 0:
        return "blocked_recrawl", "Crawler konnte keine verwertbare Anbieter-Seite lesen."
    if confidence == "hoch" and not missing:
        return "qualified", "Erfuellt die MVP-Kriterien im automatischen Signalcheck."
    if confidence == "hoch" and public and privacy and (hosting or security):
        return "qualified_needs_review", "Starker Fit, aber mindestens eine Pflichtinformation muss redaktionell nachgeprueft werden."
    if public and privacy and security:
        return "watchlist_needs_research", "Fachlich relevant, aber Datenlage ist noch nicht vollstaendig genug."
    return "research_or_reject", "Zu wenige belastbare Signale fuer die Masterliste."


def source_bucket(item: dict[str, Any]) -> str:
    note = item.get("seed", {}).get("note") or ""
    marker = "Quelle: "
    if marker in note:
        return note.split(marker, 1)[1].split("|", 1)[0].strip()
    return item.get("seed", {}).get("source") or "crawler"


def evidence_urls(item: dict[str, Any]) -> list[str]:
    urls = []
    for page in item.get("crawl", {}).get("urls", []):
        if page.get("ok_status") and page.get("url"):
            urls.append(page["url"])
    return urls


def unique_preserve(values: list[str]) -> list[str]:
    seen: set[str] = set()
    result = []
    for value in values:
        if value not in seen:
            result.append(value)
            seen.add(value)
    return result


def availability_text_fragments(item: dict[str, Any]) -> list[dict[str, str]]:
    fragments: list[dict[str, str]] = []
    for details in item.get("signal_sources", {}).values():
        for detail in details:
            if detail.get("snippet"):
                fragments.append(
                    {
                        "url": detail.get("url", ""),
                        "term": detail.get("term", ""),
                        "snippet": detail.get("snippet", ""),
                    }
                )
    for snippets in item.get("signals", {}).values():
        if not isinstance(snippets, list):
            continue
        for snippet in snippets:
            if isinstance(snippet, str):
                fragments.append({"url": "", "term": "", "snippet": snippet})
    return fragments


def infer_availability_from_item(item: dict[str, Any]) -> dict[str, Any]:
    existing = item.get("availability")
    if isinstance(existing, dict) and existing.get("scope"):
        return existing

    nationwide = []
    state_based = []
    regional = []
    for fragment in availability_text_fragments(item):
        snippet = fragment["snippet"]
        lower = snippet.lower()
        if any(term in lower for term in NATIONWIDE_TERMS):
            nationwide.append(fragment)
        if any(term in lower for term in REGIONAL_TERMS):
            regional.append(fragment)
        for state, aliases in FEDERAL_STATE_ALIASES.items():
            if not any(alias in lower for alias in aliases):
                continue
            has_context = any(term in lower for term in STATE_CONTEXT_TERMS)
            has_restriction = any(term in lower for term in STATE_RESTRICTION_TERMS)
            has_state_offer_pattern = any(
                re.search(
                    rf"(fuer|für)\s+(kommunen|behoerden|behörden|verwaltungen?).{{0,80}}\b{re.escape(alias)}\b",
                    lower,
                )
                for alias in aliases
            )
            if has_state_offer_pattern or (has_context and has_restriction):
                enriched = dict(fragment)
                enriched["region"] = state
                state_based.append(enriched)

    if nationwide:
        return {
            "scope": "nationwide",
            "label": AVAILABILITY_SCOPE_LABELS["nationwide"],
            "regions": [],
            "confidence": "mittel",
            "needs_review": False,
            "evidence": nationwide[:4],
        }
    if state_based:
        return {
            "scope": "federal_state",
            "label": AVAILABILITY_SCOPE_LABELS["federal_state"],
            "regions": unique_preserve([entry["region"] for entry in state_based if entry.get("region")]),
            "confidence": "niedrig",
            "needs_review": True,
            "evidence": state_based[:4],
        }
    if regional:
        return {
            "scope": "regional",
            "label": AVAILABILITY_SCOPE_LABELS["regional"],
            "regions": [],
            "confidence": "niedrig",
            "needs_review": True,
            "evidence": regional[:4],
        }
    return {
        "scope": "unknown",
        "label": AVAILABILITY_SCOPE_LABELS["unknown"],
        "regions": [],
        "confidence": "offen",
        "needs_review": True,
        "evidence": [],
    }


def availability_evidence_cell(availability: dict[str, Any]) -> str:
    lines = []
    for entry in availability.get("evidence", [])[:4]:
        region = f" [{entry.get('region')}]" if entry.get("region") else ""
        source = entry.get("url") or "Quelle im Crawl"
        snippet = str(entry.get("snippet") or "").replace("\n", " ")
        lines.append(f"{source}{region}: {snippet[:260]}")
    return "\n".join(lines)


def record_from_item(item: dict[str, Any], screenshot_root: Path) -> dict[str, Any]:
    seed = item["seed"]
    slug = item.get("slug") or slugify(seed["company"])
    status, reason = master_status(item)
    signals = item.get("signals", {})
    availability = infer_availability_from_item(item)
    return {
        "slug": slug,
        "name": seed.get("company"),
        "website": seed.get("website"),
        "provider": seed.get("company"),
        "branch": seed.get("branch"),
        "cluster": seed.get("cluster"),
        "source_bucket": source_bucket(item),
        "master_status": status,
        "master_status_reason": reason,
        "review_confidence": item.get("confidence"),
        "availability": availability,
        "last_checked_at": item.get("last_checked_at"),
        "body_copy": public_summary(item),
        "screenshots": screenshot_paths(slug, screenshot_root),
        "criteria": {
            "public_sector": bool(signals.get("public_sector")),
            "privacy": bool(signals.get("privacy")),
            "hosting": bool(signals.get("hosting")),
            "security": bool(signals.get("security")),
            "accessibility": bool(signals.get("accessibility")),
            "operation": bool(signals.get("operation") or signals.get("operation_models")),
            "references": bool(signals.get("references")),
        },
        "operation_models": signals.get("operation_models", []),
        "missing_info": item.get("missing_info", []),
        "content_piece_count": len(item.get("content_pieces", [])),
        "evidence_urls": evidence_urls(item),
    }


def markdown_report(meta: dict[str, Any], records: list[dict[str, Any]], rejected: list[dict[str, Any]]) -> str:
    lines = [
        "# Supertools Software-Masterliste",
        "",
        f"Stand: {meta['updated_at']}",
        "",
        "Diese Liste ist intern. Sie trennt qualifizierte Master-Kandidaten von Recherche- und Ausschlussfaellen.",
        "",
        "## Zusammenfassung",
        "",
        f"- Master-/Watchlist-Eintraege: {len(records)}",
        f"- Ausgesiebt oder blockiert: {len(rejected)}",
        f"- Screenshots vorhanden: {sum(1 for record in records if record['screenshots'])}",
        "",
        "## Master-/Watchlist",
        "",
        "| Status | Anbieter | Quelle | Verfuegbarkeit | Kriterien | Screenshots |",
        "| --- | --- | --- | --- | --- | ---: |",
    ]
    for record in records:
        criteria = ", ".join(key for key, value in record["criteria"].items() if value) or "keine"
        availability = record["availability"]
        regions = ", ".join(availability.get("regions", []))
        availability_label = availability.get("label", "unklar")
        if regions:
            availability_label = f"{availability_label}: {regions}"
        lines.append(
            f"| `{record['master_status']}` | {record['name']} | {record['source_bucket']} | {availability_label} | {criteria} | {len(record['screenshots'])} |"
        )
    lines.extend(["", "## Nicht uebernommen", "", "| Status | Anbieter | Grund |", "| --- | --- | --- |"])
    for record in rejected:
        lines.append(f"| `{record['master_status']}` | {record['name']} | {record['master_status_reason']} |")
    return "\n".join(lines) + "\n"


def join_cell(value: Any) -> str:
    if isinstance(value, list):
        return "\n".join(str(item) for item in value)
    if value is None:
        return ""
    return str(value)


def bool_cell(value: Any) -> str:
    return "ja" if value else "nein"


def sheet_row(record: dict[str, Any], bucket: str) -> list[Any]:
    criteria = record.get("criteria", {})
    availability = record.get("availability", {})
    return [
        bucket,
        record.get("master_status", ""),
        record.get("master_status_reason", ""),
        record.get("slug", ""),
        record.get("name", ""),
        record.get("provider", ""),
        record.get("website", ""),
        record.get("cluster", ""),
        record.get("branch", ""),
        record.get("source_bucket", ""),
        record.get("review_confidence", ""),
        availability.get("scope", "unknown"),
        availability.get("label", "unklar"),
        join_cell(availability.get("regions", [])),
        availability.get("confidence", "offen"),
        bool_cell(availability.get("needs_review", True)),
        availability_evidence_cell(availability),
        bool_cell(criteria.get("public_sector")),
        bool_cell(criteria.get("privacy")),
        bool_cell(criteria.get("hosting")),
        bool_cell(criteria.get("security")),
        bool_cell(criteria.get("accessibility")),
        bool_cell(criteria.get("operation")),
        bool_cell(criteria.get("references")),
        join_cell(record.get("missing_info", [])),
        record.get("body_copy", ""),
        join_cell(record.get("screenshots", [])),
        join_cell(record.get("evidence_urls", [])),
        record.get("content_piece_count", 0),
        record.get("last_checked_at", ""),
    ]


def write_google_sheet_csv(path: Path, master: list[dict[str, Any]], rejected: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(SHEET_HEADERS)
        for record in master:
            writer.writerow(sheet_row(record, "master_watchlist"))
        for record in rejected:
            writer.writerow(sheet_row(record, "research_rejected_blocked"))


def run(args: argparse.Namespace) -> None:
    items: list[dict[str, Any]] = []
    for path in args.candidates:
        items.extend(json.loads(Path(path).read_text(encoding="utf-8")))

    screenshot_root = Path(args.screenshot_root)
    records = [record_from_item(item, screenshot_root) for item in items]
    master = [
        record
        for record in records
        if record["master_status"] in {"qualified", "qualified_needs_review", "watchlist_needs_research"}
    ]
    rejected = [record for record in records if record not in master]

    meta = {
        "schema_version": 1,
        "updated_at": args.updated_at,
        "source_candidate_files": args.candidates,
        "policy": "Internal master list. Only records with qualified/watchlist status should be considered for editorial review; no automatic website publish.",
    }
    payload = {"meta": meta, "tools": master, "rejected_or_blocked": rejected}

    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    report_path = out.with_suffix(".md")
    report_path.write_text(markdown_report(meta, master, rejected), encoding="utf-8")
    csv_path = Path(args.sheet_csv_out) if args.sheet_csv_out else out.with_name(f"{out.stem}-google-sheet.csv")
    write_google_sheet_csv(csv_path, master, rejected)

    print(f"Wrote {out}")
    print(f"Wrote {report_path}")
    print(f"Wrote {csv_path}")
    print(f"Master/watchlist: {len(master)}")
    print(f"Rejected/blocked: {len(rejected)}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("candidates", nargs="+")
    parser.add_argument("--screenshot-root", default=DEFAULT_SCREENSHOT_ROOT)
    parser.add_argument("--out", default=DEFAULT_OUT)
    parser.add_argument("--sheet-csv-out")
    parser.add_argument("--updated-at", default="2026-08-14")
    return parser.parse_args()


if __name__ == "__main__":
    run(parse_args())
