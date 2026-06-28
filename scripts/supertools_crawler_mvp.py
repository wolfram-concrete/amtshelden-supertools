#!/usr/bin/env python3
"""Weekly Supertools crawler MVP.

Reads the partner Excel seed list, crawls public provider pages with Crawl4AI,
extracts editorial review signals, and writes a human-in-the-loop report.
"""

from __future__ import annotations

import argparse
import asyncio
import dataclasses
import datetime as dt
import hashlib
import json
import re
from pathlib import Path
from typing import Any
from urllib.parse import urljoin, urlparse

from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler, BrowserConfig, CacheMode, CrawlerRunConfig
from openpyxl import load_workbook


DEFAULT_EXCEL = "Amtshelden_Zielkundenliste_Sponsoring_2026 (1).xlsx"
DEFAULT_STATE = "data/crawler/state/products.json"
DEFAULT_RUNS = "data/crawler/runs"

PRIORITY_LINK_TERMS = [
    "datenschutz",
    "privacy",
    "impressum",
    "security",
    "sicherheit",
    "compliance",
    "dsgvo",
    "gdpr",
    "referenz",
    "referenzen",
    "kunden",
    "case",
    "cases",
    "public",
    "verwaltung",
    "behoerde",
    "behorde",
    "kommun",
    "produkt",
    "loesung",
    "lösung",
]

SIGNAL_TERMS = {
    "public_sector": [
        "fuer behoerden",
        "für behörden",
        "behoerden und verwaltungen",
        "behörden und verwaltungen",
        "oeffentliche verwaltung",
        "öffentliche verwaltung",
        "oeffentlichen verwaltung",
        "öffentlichen verwaltung",
        "kommunen",
        "kommunalverwaltung",
        "landkreis",
        "ministerium",
        "oeffentlicher dienst",
        "öffentlicher dienst",
        "oeffentlicher sektor",
        "öffentlicher sektor",
        "egovernment",
        "e-government",
        "ozg",
    ],
    "privacy": [
        "dsgvo",
        "gdpr",
        "datenschutz",
        "auftragsverarbeitung",
        "avv",
        "tom",
        "technische und organisatorische massnahmen",
        "technische und organisatorische maßnahmen",
    ],
    "hosting": [
        "serverstandort",
        "rechenzentrum",
        "all data is stored securely in germany",
        "data is stored securely in germany",
        "stored securely in germany",
        "hosting in deutschland",
        "in deutschland gehostet",
        "daten in deutschland",
        "deutsches rechenzentrum",
        "deutschem rechenzentrum",
        "standort deutschland",
        "deutsche cloud",
        "hosting in der eu",
        "daten in der eu",
        "eu-rechenzentrum",
        "eu rechenzentrum",
        "europaeische union",
        "europäische union",
        "hosting",
        "souveraene cloud",
        "souveräne cloud",
    ],
    "security": [
        "iso 27001",
        "iso/iec 27001",
        "bsi c5",
        "c5 testat",
        "c5-typ",
        "bsi",
        "tisax",
        "it-grundschutz",
        "verschluesselung",
        "verschlüsselung",
        "zero trust",
    ],
    "accessibility": [
        "barrierefrei",
        "barrierefreiheit",
        "bitv",
        "bfsg",
        "wcag",
        "inklusion",
        "accessibility",
    ],
    "operation": [
        "saas",
        "cloud-software",
        "cloud software",
        "cloud-plattform",
        "cloud plattform",
        "cloud-lösung",
        "cloud lösung",
        "cloud solution",
        "on-premise",
        "on premise",
        "onpremise",
        "hybrid",
        "private cloud",
    ],
    "references": [
        "referenz",
        "referenzen",
        "kunden",
        "kundenlogo",
        "kundenstimme",
        "case study",
        "fallstudie",
        "erfolgsgeschichte",
        "stadt ",
        "landkreis ",
        "ministerium",
    ],
}

SIGNAL_LABELS = {
    "public_sector": "Behoerden-/Verwaltungsbezug",
    "privacy": "DSGVO/Datenschutz",
    "hosting": "Hosting/Serverstandort",
    "security": "Sicherheit/Zertifizierung",
    "accessibility": "Barrierefreiheit",
    "operation": "Betriebsmodell",
    "references": "Referenzen/Cases",
}

MISSING_RULES = {
    "privacy": "Keine belastbare DSGVO-/Datenschutz-Aussage gefunden.",
    "hosting": "Kein Serverstandort oder Hosting-Ort oeffentlich auffindbar.",
    "operation": "Kein klares Betriebsmodell (Cloud/On-Premise/Hybrid) gefunden.",
    "public_sector": "Keine klare Behoerden- oder Verwaltungsreferenz gefunden.",
}

CONTENT_KEYWORDS = {
    "use_case": ["use-case", "use case", "anwendungsfall", "loesung/", "lösung/"],
    "case_study": [
        "case study",
        "case-study",
        "case",
        "fallstudie",
        "erfolgsgeschichte",
        "referenzbericht",
        "customer story",
        "kundengeschichte",
    ],
    "webinar": ["webinar", "webinare", "seminar", "online-seminar", "event", "events"],
    "whitepaper": ["whitepaper", "white paper", "ebook", "e-book", "guide", "leitfaden"],
    "blog_article": ["blog", "magazin", "artikel", "insights", "wissen", "news"],
    "video": ["video", "vimeo"],
    "download": [".pdf", "download", "broschuere", "broschüre", "factsheet", "datenblatt"],
}

NOISY_CONTENT_SOURCE_TERMS = [
    "datenschutz",
    "privacy",
    "data-protection",
    "impressum",
    "legal",
    "terms",
    "cookie",
    "newsletter",
]

NOISY_CONTENT_DOMAINS = {
    "facebook.com",
    "de-de.facebook.com",
    "linkedin.com",
    "instagram.com",
    "twitter.com",
    "x.com",
    "developers.facebook.com",
}


@dataclasses.dataclass
class Seed:
    rank: int | None
    company: str
    website: str
    branch: str
    cluster: str
    relevance_score: int | None
    city: str
    employees: str
    phone: str
    email: str
    note: str


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = value.replace("ä", "ae").replace("ö", "oe").replace("ü", "ue")
    value = value.replace("ß", "ss")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "anbieter"


def normalize_url(value: str) -> str:
    value = str(value or "").strip()
    if not value:
        return value
    if not value.startswith(("http://", "https://")):
        value = f"https://{value}"
    return value.rstrip("/")


def read_seeds(path: Path, cluster: str | None, score_min: int | None) -> list[Seed]:
    wb = load_workbook(path, read_only=True, data_only=True)
    ws = wb["Zielkunden"]
    rows = list(ws.iter_rows(values_only=True))
    headers = [str(cell).strip() if cell is not None else "" for cell in rows[0]]
    seeds: list[Seed] = []

    for raw in rows[1:]:
        item = dict(zip(headers, raw))
        if not item.get("Firma") or not item.get("Website"):
            continue
        item_cluster = str(item.get("Topic-Cluster") or "").strip()
        item_score = item.get("Relevanz-Score (1-5)")
        if cluster and item_cluster.upper() != cluster.upper():
            continue
        if score_min and (not item_score or int(item_score) < score_min):
            continue
        seeds.append(
            Seed(
                rank=int(item["Rang"]) if item.get("Rang") else None,
                company=str(item.get("Firma") or "").strip(),
                website=normalize_url(str(item.get("Website") or "")),
                branch=str(item.get("Branche") or "").strip(),
                cluster=item_cluster,
                relevance_score=int(item_score) if item_score else None,
                city=str(item.get("Hauptsitz") or "").strip(),
                employees=str(item.get("Mitarbeiter") or "").strip(),
                phone=str(item.get("Telefon (Zentrale)") or "").strip(),
                email=str(item.get("E-Mail (Unternehmen)") or "").strip(),
                note=str(item.get("Begründung / Notiz") or "").strip(),
            )
        )
    return seeds


def load_state(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {"products": {}}
    return json.loads(path.read_text(encoding="utf-8"))


def save_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2), encoding="utf-8")


def same_host(url: str, candidate: str) -> bool:
    base = urlparse(url).netloc.replace("www.", "")
    host = urlparse(candidate).netloc.replace("www.", "")
    return bool(host) and (host == base or host.endswith("." + base))


def link_priority(link: str, text: str) -> int:
    haystack = f"{link} {text}".lower()
    for index, term in enumerate(PRIORITY_LINK_TERMS):
        if term in haystack:
            return len(PRIORITY_LINK_TERMS) - index
    return 0


def discover_priority_links(base_url: str, html: str, max_pages: int) -> list[str]:
    soup = BeautifulSoup(html or "", "html.parser")
    scored: dict[str, int] = {}
    for anchor in soup.find_all("a", href=True):
        href = str(anchor.get("href") or "").strip()
        if not href or href.startswith(("mailto:", "tel:", "#", "javascript:")):
            continue
        absolute = urljoin(base_url + "/", href).split("#", 1)[0].rstrip("/")
        if not same_host(base_url, absolute):
            continue
        priority = link_priority(absolute, anchor.get_text(" ", strip=True))
        if priority:
            scored[absolute] = max(scored.get(absolute, 0), priority)

    fallback_paths = [
        "/datenschutz",
        "/impressum",
        "/security",
        "/sicherheit",
        "/compliance",
        "/referenzen",
        "/kunden",
    ]
    for path in fallback_paths:
        absolute = urljoin(base_url + "/", path.lstrip("/"))
        scored.setdefault(absolute.rstrip("/"), link_priority(absolute, ""))

    ordered = sorted(scored.items(), key=lambda item: (-item[1], item[0]))
    return [url for url, _ in ordered[: max(0, max_pages - 1)]]


async def crawl_url(crawler: AsyncWebCrawler, url: str) -> dict[str, Any]:
    config = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS,
        check_robots_txt=True,
        wait_for="body",
        wait_until="domcontentloaded",
        delay_before_return_html=1.0,
        page_timeout=45000,
        remove_overlay_elements=True,
        remove_consent_popups=True,
        scan_full_page=False,
        verbose=False,
    )
    try:
        result = await crawler.arun(url=url, config=config)
        return {
            "url": url,
            "success": bool(result.success),
            "status_code": getattr(result, "status_code", None),
            "ok_status": bool(result.success) and (getattr(result, "status_code", 0) or 0) < 400,
            "error": getattr(result, "error_message", "") or "",
            "markdown": str(getattr(result, "markdown", "") or ""),
            "html": str(getattr(result, "html", "") or ""),
        }
    except Exception as exc:
        return {
            "url": url,
            "success": False,
            "status_code": None,
            "ok_status": False,
            "error": str(exc),
            "markdown": "",
            "html": "",
        }


def clean_text(value: str, max_chars: int = 180000) -> str:
    value = re.sub(r"\s+", " ", value or "").strip()
    return value[:max_chars]


def find_snippets(text: str, terms: list[str], limit: int = 5) -> list[str]:
    snippets: list[str] = []
    seen: set[str] = set()
    for term in terms:
        pattern = re.escape(term)
        if term == "kunden":
            pattern = r"(?<![a-zäöüß])kunden(?![a-zäöüß])"
        match = re.search(pattern, text, flags=re.IGNORECASE)
        if not match:
            continue
        start = match.start()
        left = max(0, start - 140)
        right = min(len(text), start + 260)
        snippet = text[left:right].strip()
        snippet = re.sub(r"\s+", " ", snippet)
        key = snippet[:100].lower()
        if key not in seen:
            snippets.append(snippet)
            seen.add(key)
        if len(snippets) >= limit:
            break
    return snippets


def find_snippet_details(page: dict[str, Any], terms: list[str], limit: int = 3) -> list[dict[str, str]]:
    text = clean_text(page.get("markdown") or "")
    details: list[dict[str, str]] = []
    seen: set[str] = set()
    for term in terms:
        pattern = re.escape(term)
        if term == "kunden":
            pattern = r"(?<![a-zäöüß])kunden(?![a-zäöüß])"
        match = re.search(pattern, text, flags=re.IGNORECASE)
        if not match:
            continue
        start = match.start()
        left = max(0, start - 120)
        right = min(len(text), start + 260)
        snippet = re.sub(r"\s+", " ", text[left:right].strip())
        key = f"{page['url']}:{snippet[:100].lower()}"
        if key not in seen:
            details.append({"url": page["url"], "term": term, "snippet": snippet})
            seen.add(key)
        if len(details) >= limit:
            break
    return details


def infer_operation(text: str) -> list[str]:
    found = []
    checks = {
        "Cloud/SaaS": [
            "saas",
            "cloud-software",
            "cloud software",
            "cloud-plattform",
            "cloud plattform",
            "cloud-lösung",
            "cloud lösung",
            "cloud solution",
        ],
        "On-Premise": ["on-premise", "on premise", "onpremise"],
        "Hybrid": ["hybrid"],
        "Private Cloud": ["private cloud"],
    }
    lower = text.lower()
    for label, terms in checks.items():
        if any(term in lower for term in terms):
            found.append(label)
    return found


def youtube_id(url: str) -> str | None:
    parsed = urlparse(url)
    host = parsed.netloc.replace("www.", "")
    if host == "youtu.be":
        candidate = parsed.path.strip("/").split("/")[0]
        return candidate or None
    if host in {"youtube.com", "m.youtube.com"}:
        if parsed.path == "/watch":
            query = dict(part.split("=", 1) for part in parsed.query.split("&") if "=" in part)
            return query.get("v")
        parts = [part for part in parsed.path.split("/") if part]
        if len(parts) >= 2 and parts[0] in {"embed", "shorts", "live"}:
            return parts[1]
    if "youtube-nocookie.com" in host:
        parts = [part for part in parsed.path.split("/") if part]
        if len(parts) >= 2 and parts[0] == "embed":
            return parts[1]
    return None


def classify_content_piece(url: str, label: str) -> str | None:
    haystack = f"{url} {label}".lower()
    if youtube_id(url):
        return "youtube"
    if "youtube.com" in haystack or "youtu.be" in haystack:
        return None
    if "vimeo.com" in haystack and re.search(r"vimeo\.com/(?:video/)?\d+", haystack):
        return "video"
    for kind, keywords in CONTENT_KEYWORDS.items():
        if any(keyword in haystack for keyword in keywords):
            return kind
    return None


def normalize_link(base_url: str, href: str) -> str | None:
    href = str(href or "").strip()
    if not href or href.startswith(("mailto:", "tel:", "#", "javascript:")):
        return None
    return urljoin(base_url + "/", href).split("#", 1)[0]


def content_piece_key(piece: dict[str, Any]) -> str:
    if piece.get("video_id"):
        return f"{piece.get('kind')}:{piece.get('video_id')}"
    return f"{piece.get('kind')}:{piece.get('url')}"


def clean_content_title(title: str, url: str) -> str:
    title = truncate(title, 140)
    if len(title) >= 3 and not re.fullmatch(r"[\W_]+", title):
        return title
    filename = Path(urlparse(url).path).name
    if filename:
        return truncate(filename.replace("-", " ").replace("_", " "), 140)
    return url


def noisy_content_source(url: str) -> bool:
    parsed = urlparse(url)
    path = parsed.path.lower()
    return any(term in path for term in NOISY_CONTENT_SOURCE_TERMS)


def noisy_content_target(url: str) -> bool:
    parsed = urlparse(url)
    host = parsed.netloc.replace("www.", "").lower()
    if host in NOISY_CONTENT_DOMAINS:
        return True
    path = parsed.path.lower()
    if any(term in path for term in ["privacy", "datenschutz", "impressum", "legal", "terms", "cookie"]):
        return True
    return False


def extract_content_pieces(pages: list[dict[str, Any]], limit: int = 20) -> list[dict[str, Any]]:
    pieces: list[dict[str, Any]] = []
    seen: set[str] = set()

    for page in pages:
        if not page.get("ok_status"):
            continue
        source_url = page["url"]
        if noisy_content_source(source_url):
            continue
        soup = BeautifulSoup(page.get("html") or "", "html.parser")

        for frame in soup.find_all(["iframe", "embed"], src=True):
            url = normalize_link(source_url, frame.get("src"))
            if not url:
                continue
            if noisy_content_target(url):
                continue
            kind = classify_content_piece(url, frame.get("title") or "")
            if not kind:
                continue
            video_id = youtube_id(url)
            piece = {
                "kind": kind,
                "title": clean_content_title(frame.get("title") or "Eingebettetes Video", url),
                "url": url,
                "source_url": source_url,
                "platform": "youtube" if video_id else "embed",
                "video_id": video_id,
                "thumbnail_url": f"https://img.youtube.com/vi/{video_id}/hqdefault.jpg" if video_id else None,
            }
            key = content_piece_key(piece)
            if key not in seen:
                pieces.append(piece)
                seen.add(key)

        for anchor in soup.find_all("a", href=True):
            url = normalize_link(source_url, anchor.get("href"))
            if not url:
                continue
            if noisy_content_target(url):
                continue
            title = anchor.get_text(" ", strip=True) or anchor.get("title") or url
            kind = classify_content_piece(url, title)
            if not kind:
                continue
            video_id = youtube_id(url)
            piece = {
                "kind": kind,
                "title": clean_content_title(title, url),
                "url": url,
                "source_url": source_url,
                "platform": "youtube" if video_id else urlparse(url).netloc.replace("www.", ""),
                "video_id": video_id,
                "thumbnail_url": f"https://img.youtube.com/vi/{video_id}/hqdefault.jpg" if video_id else None,
            }
            key = content_piece_key(piece)
            if key not in seen:
                pieces.append(piece)
                seen.add(key)
            if len(pieces) >= limit:
                return pieces

    return pieces[:limit]


def extract_signals(seed: Seed, pages: list[dict[str, Any]]) -> dict[str, Any]:
    ok_pages = [page for page in pages if page.get("ok_status")]
    combined = clean_text(" ".join(page["markdown"] for page in ok_pages))
    signals: dict[str, Any] = {}
    signal_sources: dict[str, list[dict[str, str]]] = {}
    for key, terms in SIGNAL_TERMS.items():
        details: list[dict[str, str]] = []
        for page in ok_pages:
            details.extend(find_snippet_details(page, terms, limit=2))
            if len(details) >= 4:
                break
        signal_sources[key] = details[:4]
        signals[key] = [detail["snippet"] for detail in signal_sources[key]]

    operation_models = infer_operation(combined)
    if operation_models:
        signals["operation_models"] = operation_models

    missing = [message for key, message in MISSING_RULES.items() if not signals.get(key)]
    evidence_count = sum(1 for key in ["public_sector", "privacy", "hosting"] if signals.get(key))
    confidence = "hoch" if evidence_count >= 3 else "mittel" if evidence_count >= 2 else "offen"
    signal_payload = {
        "signals": signals,
        "missing_info": missing,
        "confidence": confidence,
    }
    monitor_payload = {
        "signal_presence": {key: bool(signals.get(key)) for key in SIGNAL_TERMS},
        "operation_models": sorted(signals.get("operation_models", [])),
        "missing_info": missing,
        "confidence": confidence,
    }

    return {
        "seed": dataclasses.asdict(seed),
        "signals": signals,
        "signal_sources": signal_sources,
        "missing_info": missing,
        "confidence": confidence,
        "content_hash": hashlib.sha256(combined.encode("utf-8")).hexdigest(),
        "signal_hash": hashlib.sha256(
            json.dumps(signal_payload, ensure_ascii=False, sort_keys=True).encode("utf-8")
        ).hexdigest(),
        "monitor_hash": hashlib.sha256(
            json.dumps(monitor_payload, ensure_ascii=False, sort_keys=True).encode("utf-8")
        ).hexdigest(),
        "content_length": len(combined),
    }


def signal_hash_from_record(record: dict[str, Any]) -> str:
    payload = {
        "signals": record.get("signals", {}),
        "missing_info": record.get("missing_info", []),
        "confidence": record.get("confidence"),
    }
    return hashlib.sha256(json.dumps(payload, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()


def monitor_hash_from_record(record: dict[str, Any]) -> str:
    signals = record.get("signals", {})
    payload = {
        "signal_presence": {key: bool(signals.get(key)) for key in SIGNAL_TERMS},
        "operation_models": sorted(signals.get("operation_models", [])),
        "missing_info": record.get("missing_info", []),
        "confidence": record.get("confidence"),
    }
    return hashlib.sha256(json.dumps(payload, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()


def compare_state(slug: str, current: dict[str, Any], previous_state: dict[str, Any]) -> dict[str, Any]:
    previous = previous_state.get("products", {}).get(slug)
    if not previous:
        return {"status": "new", "changed_fields": ["first_seen"]}

    changed_fields: list[str] = []
    previous_monitor_hash = previous.get("monitor_hash") or monitor_hash_from_record(previous)
    if previous_monitor_hash != current.get("monitor_hash"):
        changed_fields.append("monitor_signals")
    if previous.get("confidence") != current.get("confidence"):
        changed_fields.append("confidence")
    if previous.get("missing_info") != current.get("missing_info"):
        changed_fields.append("missing_info")

    old_signals = previous.get("signals", {})
    new_signals = current.get("signals", {})
    for key in sorted(set(old_signals) | set(new_signals)):
        if bool(old_signals.get(key)) != bool(new_signals.get(key)):
            changed_fields.append(f"signal:{key}")

    return {
        "status": "changed" if changed_fields else "unchanged",
        "changed_fields": changed_fields,
    }


def suggested_decision(item: dict[str, Any]) -> str:
    if item["crawl"]["successful_pages"] == 0:
        return "Nachrecherche"
    if item["missing_info"]:
        return "Nachrecherche"
    if item["confidence"] == "hoch":
        return "Kandidat fuer Uebernahme"
    return "Pruefen"


def write_raw(raw_dir: Path, seed: Seed, pages: list[dict[str, Any]]) -> None:
    raw_dir.mkdir(parents=True, exist_ok=True)
    parts = [f"# {seed.company}", ""]
    for page in pages:
        parts.extend(
            [
                f"## {page['url']}",
                f"success: {page['success']}",
                f"status: {page.get('status_code')}",
                f"ok_status: {page.get('ok_status', False)}",
                f"error: {page.get('error') or ''}",
                "",
                (page.get("markdown") or "")[:60000],
                "",
            ]
        )
    (raw_dir / f"{slugify(seed.company)}.md").write_text("\n".join(parts), encoding="utf-8")


def truncate(value: str, length: int = 260) -> str:
    value = re.sub(r"\s+", " ", value or "").strip()
    if len(value) <= length:
        return value
    return value[: length - 1].rstrip() + "..."


def format_signal_sources(sources: list[dict[str, str]], limit: int = 2) -> list[str]:
    if not sources:
        return ["nicht gefunden"]
    lines = []
    for source in sources[:limit]:
        lines.append(f"{source['url']} - {truncate(source['snippet'])}")
    return lines


def yes_no(value: bool) -> str:
    return "ja" if value else "nein"


def format_snippets(snippets: list[str]) -> str:
    if not snippets:
        return "nicht gefunden"
    return "; ".join(truncate(snippet, 220) for snippet in snippets[:2])


def build_report(run_meta: dict[str, Any], candidates: list[dict[str, Any]], changes: dict[str, Any]) -> str:
    warnings = [
        item
        for item in candidates
        if item["crawl"]["successful_pages"] == 0 or item["missing_info"] or item["change"]["status"] == "changed"
    ]
    strong_candidates = [
        item
        for item in candidates
        if item["confidence"] == "hoch" and not item["missing_info"] and item["crawl"]["successful_pages"] > 0
    ]

    lines = [
        "# Supertools Crawler Review",
        "",
        f"Run: `{run_meta['run_id']}`",
        f"Zeit: {run_meta['started_at']}",
        f"Seed-Datei: `{run_meta['excel']}`",
        f"Anbieter im Lauf: {len(candidates)}",
        "",
        "## Zusammenfassung",
        "",
        f"- Neu: {changes['summary']['new']}",
        f"- Geaendert: {changes['summary']['changed']}",
        f"- Unveraendert: {changes['summary']['unchanged']}",
        f"- Fehlerhaft gecrawlt: {changes['summary']['failed']}",
        "",
        "## Entscheidungstabelle",
        "",
        "| Anbieter | Status | Vorschlag | Confidence | Seiten | Fehlende Infos / Content |",
        "| --- | --- | --- | --- | ---: | ---: |",
    ]

    for item in candidates:
        seed = item["seed"]
        lines.append(
            "| "
            + " | ".join(
                [
                    seed["company"].replace("|", "\\|"),
                    f"`{item['change']['status']}`",
                    suggested_decision(item),
                    f"`{item['confidence']}`",
                    f"{item['crawl']['successful_pages']}/{item['crawl']['attempted_pages']}",
                    f"{len(item['missing_info'])} / Content {len(item.get('content_pieces', []))}",
                ]
            )
            + " |"
        )

    lines.extend(["", "## Sofort Pruefen", ""])
    if warnings:
        for item in warnings:
            seed = item["seed"]
            reasons = []
            if item["crawl"]["successful_pages"] == 0:
                reasons.append("keine Seite erfolgreich gecrawlt")
            if item["missing_info"]:
                reasons.append(f"{len(item['missing_info'])} fehlende Pflichtinfos")
            if item["change"]["status"] == "changed":
                reasons.append("Monitoring-Signal geaendert")
            lines.append(f"- {seed['company']}: {', '.join(reasons)}")
    else:
        lines.append("- Keine harten Warnungen in diesem Lauf.")

    lines.extend(["", "## Gute Kandidaten fuer die naechste Qualifizierung", ""])
    if strong_candidates:
        for item in strong_candidates:
            seed = item["seed"]
            lines.append(f"- {seed['company']} ({seed['branch']})")
    else:
        lines.append("- Keine Kandidaten ohne MVP-Pflichtluecke.")

    lines.extend(["", "## Review-Liste", ""])

    for item in candidates:
        seed = item["seed"]
        signals = item["signals"]
        signal_sources = item.get("signal_sources", {})
        crawl = item["crawl"]
        content_pieces = item.get("content_pieces", [])
        status = item["change"]["status"]
        operation_summary = ", ".join(signals.get("operation_models", [])) or format_snippets(signals.get("operation", []))
        present = {key: bool(signals.get(key)) for key in SIGNAL_LABELS}
        source_urls = [entry["url"] for entry in crawl["urls"]]
        failed_urls = [entry for entry in crawl["urls"] if not entry.get("ok_status")]

        lines.extend(
            [
                f"### {seed['company']}",
                "",
                f"Vorschlag: **{suggested_decision(item)}**",
                "",
                "| Feld | Wert |",
                "| --- | --- |",
                f"| Status | `{status}` |",
                f"| Website | {seed['website']} |",
                f"| Cluster / interner Score | {seed['cluster']} / {seed['relevance_score']} |",
                f"| Branche | {seed['branch']} |",
                f"| Hauptsitz / Mitarbeiter | {seed['city'] or 'offen'} / {seed['employees'] or 'offen'} |",
                f"| Review-Confidence | `{item['confidence']}` |",
                f"| Crawling | {crawl['successful_pages']}/{crawl['attempted_pages']} Seiten erfolgreich |",
                f"| Betriebsmodell | {operation_summary} |",
                f"| Content Pieces | {len(content_pieces)} gefunden |",
                "",
                "**Signalampel**",
                "",
                "| Signal | Gefunden |",
                "| --- | --- |",
            ]
        )

        for key, label in SIGNAL_LABELS.items():
            lines.append(f"| {label} | {yes_no(present[key])} |")

        lines.extend(["", "**Gecrawlte Quellen**", ""])
        lines.extend(f"- {url}" for url in source_urls)

        if failed_urls:
            lines.extend(["", "**Crawl-Probleme**", ""])
            for entry in failed_urls:
                lines.append(
                    f"- {entry['url']} - Status {entry.get('status_code')}, {entry.get('error') or 'kein verwertbarer Inhalt'}"
                )

        lines.extend(["", "**Quellen-Signale**", ""])
        for key, label in SIGNAL_LABELS.items():
            lines.append(f"- {label}:")
            for detail in format_signal_sources(signal_sources.get(key, [])):
                lines.append(f"  - {detail}")

        lines.extend(["", "**Fehlende Informationen**", ""])
        if item["missing_info"]:
            lines.extend(f"- {entry}" for entry in item["missing_info"])
        else:
            lines.append("- Keine MVP-Pflichtluecke erkannt.")

        lines.extend(["", "**Gefundene Content Pieces**", ""])
        if content_pieces:
            for piece in content_pieces[:8]:
                meta = []
                if piece.get("platform"):
                    meta.append(str(piece["platform"]))
                if piece.get("video_id"):
                    meta.append(f"video_id={piece['video_id']}")
                lines.append(f"- `{piece['kind']}` {piece['title']} - {piece['url']}")
                lines.append(f"  - Quelle: {piece['source_url']}")
                if meta:
                    lines.append(f"  - Meta: {', '.join(meta)}")
                if piece.get("thumbnail_url"):
                    lines.append(f"  - Thumbnail: {piece['thumbnail_url']}")
        else:
            lines.append("- Keine passenden Videos, Webinare, Cases, Whitepaper, Blogartikel oder PDFs gefunden.")

        lines.extend(
            [
                "",
                "**Redaktionelle Entscheidung**",
                "",
                "- [ ] Uebernehmen",
                "- [ ] Nachrecherche",
                "- [ ] Anbieter kontaktieren",
                "- [ ] Ablehnen / ignorieren",
                "",
            ]
        )

    lines.extend(
        [
            "",
            "## Hinweise zur Nutzung",
            "",
            "- Dieser Report ist eine Vorqualifizierung, keine Veroeffentlichungsfreigabe.",
            "- Snippets muessen vor Uebernahme redaktionell gegengeprueft werden.",
            "- Fehlende Informationen sollen spaeter sichtbar gemacht oder beim Anbieter nachgefragt werden.",
        ]
    )

    return "\n".join(lines)


async def process_seed(crawler: AsyncWebCrawler, seed: Seed, max_pages: int) -> tuple[dict[str, Any], list[dict[str, Any]]]:
    homepage = await crawl_url(crawler, seed.website)
    urls = [seed.website]
    if homepage.get("ok_status"):
        urls.extend(discover_priority_links(seed.website, homepage["html"], max_pages))

    seen: set[str] = set()
    pages = []
    for url in urls[:max_pages]:
        if url in seen:
            continue
        seen.add(url)
        page = homepage if url == seed.website else await crawl_url(crawler, url)
        pages.append(page)

    extracted = extract_signals(seed, pages)
    extracted["content_pieces"] = extract_content_pieces(pages)
    extracted["crawl"] = {
        "attempted_pages": len(pages),
        "successful_pages": sum(1 for page in pages if page.get("ok_status")),
        "urls": [
            {
                "url": page["url"],
                "success": page["success"],
                "status_code": page.get("status_code"),
                "ok_status": page.get("ok_status", False),
                "error": page.get("error") or "",
            }
            for page in pages
        ],
    }
    return extracted, pages


async def run(args: argparse.Namespace) -> None:
    started = dt.datetime.now(dt.timezone.utc).astimezone()
    run_id = args.run_id or started.strftime("%Y%m%d-%H%M%S")
    output_dir = Path(args.out) / run_id
    raw_dir = output_dir / "raw"
    output_dir.mkdir(parents=True, exist_ok=True)

    seeds = read_seeds(Path(args.excel), args.cluster, args.score_min)
    seeds = seeds[args.offset : args.offset + args.limit]
    state_path = Path(args.state)
    state = load_state(state_path)
    new_state = json.loads(json.dumps(state))
    new_state.setdefault("products", {})

    browser_config = BrowserConfig(
        headless=True,
        viewport_width=1440,
        viewport_height=1000,
        text_mode=False,
        verbose=False,
    )

    candidates: list[dict[str, Any]] = []
    changes = {
        "summary": {"new": 0, "changed": 0, "unchanged": 0, "failed": 0},
        "items": [],
    }

    async with AsyncWebCrawler(config=browser_config) as crawler:
        for index, seed in enumerate(seeds, start=1):
            print(f"[{index}/{len(seeds)}] Crawling {seed.company} - {seed.website}")
            extracted, pages = await process_seed(crawler, seed, args.pages_per_company)
            slug = slugify(seed.company)
            change = compare_state(slug, extracted, state)
            extracted["slug"] = slug
            extracted["change"] = change
            extracted["review_status"] = "needs_review"
            extracted["last_checked_at"] = started.date().isoformat()
            candidates.append(extracted)
            write_raw(raw_dir, seed, pages)

            changes["summary"][change["status"]] += 1
            if not any(page.get("ok_status") for page in pages):
                changes["summary"]["failed"] += 1
            changes["items"].append(
                {
                    "slug": slug,
                    "company": seed.company,
                    "website": seed.website,
                    "status": change["status"],
                    "changed_fields": change["changed_fields"],
                    "successful_pages": extracted["crawl"]["successful_pages"],
                }
            )

            new_state["products"][slug] = {
                "company": seed.company,
                "website": seed.website,
                "last_checked_at": extracted["last_checked_at"],
                "content_hash": extracted["content_hash"],
                "signal_hash": extracted["signal_hash"],
                "monitor_hash": extracted["monitor_hash"],
                "confidence": extracted["confidence"],
                "missing_info": extracted["missing_info"],
                "signals": extracted["signals"],
                "crawl": extracted["crawl"],
            }

    run_meta = {
        "run_id": run_id,
        "started_at": started.isoformat(timespec="seconds"),
        "excel": args.excel,
        "limit": args.limit,
        "offset": args.offset,
        "cluster": args.cluster,
        "score_min": args.score_min,
        "pages_per_company": args.pages_per_company,
        "saved_state": not args.no_save_state,
    }
    save_json(output_dir / "run-meta.json", run_meta)
    save_json(output_dir / "product-candidates.json", candidates)
    save_json(output_dir / "changes.json", changes)
    (output_dir / "review-report.md").write_text(build_report(run_meta, candidates, changes), encoding="utf-8")

    if not args.no_save_state:
        save_json(state_path, new_state)

    print("")
    print(f"Wrote {output_dir / 'review-report.md'}")
    print(f"Wrote {output_dir / 'product-candidates.json'}")
    print(f"Wrote {output_dir / 'changes.json'}")
    print(f"State {'not updated' if args.no_save_state else 'updated'}: {state_path}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--excel", default=DEFAULT_EXCEL)
    parser.add_argument("--state", default=DEFAULT_STATE)
    parser.add_argument("--out", default=DEFAULT_RUNS)
    parser.add_argument("--run-id")
    parser.add_argument("--limit", type=int, default=10)
    parser.add_argument("--offset", type=int, default=0)
    parser.add_argument("--cluster")
    parser.add_argument("--score-min", type=int)
    parser.add_argument("--pages-per-company", type=int, default=4)
    parser.add_argument("--no-save-state", action="store_true")
    return parser.parse_args()


if __name__ == "__main__":
    asyncio.run(run(parse_args()))
