#!/usr/bin/env python3
"""Export crawler candidates into a non-live ToolCardSummary preview file."""

from __future__ import annotations

import argparse
import hashlib
from io import BytesIO
import json
import re
from pathlib import Path
from typing import Any
from urllib.parse import urlparse
from urllib.request import Request, urlopen

from PIL import Image


CATEGORY_BY_CLUSTER = {
    "KOM": ("kommunikation-zusammenarbeit", "Kommunikation & Zusammenarbeit"),
    "HR": ("personal-organisation", "Personal & Organisation"),
    "CROSS": ("kommunikation-zusammenarbeit", "Kommunikation & Zusammenarbeit"),
    "ORG": ("buergerservice-fachverfahren", "Bürgerservice & Fachverfahren"),
    "IT": ("e-akte-dokumentenmanagement", "E-Akte & Dokumentenmanagement"),
}

def slugify(value: str) -> str:
    value = value.strip().lower()
    value = value.replace("ä", "ae").replace("ö", "oe").replace("ü", "ue")
    value = value.replace("ß", "ss")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "tool"


def initials(name: str) -> str:
    cleaned = re.sub(r"\([^)]*\)", "", name)
    words = re.findall(r"[A-Za-zÄÖÜäöüß0-9]+", cleaned)
    if not words:
        return "ST"
    if len(words) == 1:
        return words[0][:2].upper()
    return (words[0][0] + words[1][0]).upper()


def ts_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def ts_value(value: Any, indent: int = 0) -> str:
    space = " " * indent
    next_space = " " * (indent + 2)
    if isinstance(value, dict):
        if not value:
            return "{}"
        lines = ["{"]
        for key, child in value.items():
            rendered_key = key if re.fullmatch(r"[A-Za-z_$][A-Za-z0-9_$]*", str(key)) else ts_string(str(key))
            lines.append(f"{next_space}{rendered_key}: {ts_value(child, indent + 2)},")
        lines.append(f"{space}}}")
        return "\n".join(lines)
    if isinstance(value, list):
        if not value:
            return "[]"
        lines = ["["]
        for child in value:
            lines.append(f"{next_space}{ts_value(child, indent + 2)},")
        lines.append(f"{space}]")
        return "\n".join(lines)
    if isinstance(value, bool):
        return str(value).lower()
    if value is None:
        return "null"
    if isinstance(value, (int, float)):
        return str(value)
    return ts_string(str(value))


def sentence(value: str) -> str:
    value = re.sub(r"\s+", " ", value or "").strip()
    if not value:
        return ""
    return value if value.endswith((".", "!", "?")) else value + "."


def public_summary(item: dict[str, Any]) -> str:
    seed = item["seed"]
    card = card_from_item(item)
    name = card["name"]
    branch = seed.get("branch") or "Softwarelösung"
    signals = item.get("signals", {})
    content_kinds = sorted({piece.get("kind") for piece in item.get("content_pieces", []) if piece.get("kind")})

    sentences = [
        sentence(f"{name} ist ein Anbieter bzw. Produkt im Bereich {branch}"),
    ]

    operation_models = signals.get("operation_models") or []
    if operation_models:
        sentences.append(sentence(f"Öffentlich auffindbare Inhalte deuten auf ein Betriebsmodell als {', '.join(operation_models[:2])} hin"))

    if signals.get("public_sector"):
        sentences.append(
            "In den ausgewerteten Anbieterinhalten finden sich Hinweise auf Einsatzfelder im öffentlichen Sektor, in Verwaltungen oder bei kommunalen Organisationen."
        )
    else:
        sentences.append(
            "Ein konkreter Behörden- oder Verwaltungsbezug sollte redaktionell noch gesondert geprüft werden."
        )

    evidence_topics = []
    if signals.get("privacy"):
        evidence_topics.append("Datenschutz")
    if signals.get("hosting"):
        evidence_topics.append("Hosting oder Datenstandort")
    if signals.get("security"):
        evidence_topics.append("Sicherheit")
    if signals.get("accessibility"):
        evidence_topics.append("Barrierefreiheit")
    if signals.get("references"):
        evidence_topics.append("Referenzen")
    if evidence_topics:
        sentences.append(sentence(f"Als prüfbare Themen tauchen öffentlich Hinweise zu {', '.join(evidence_topics[:4])} auf"))

    if content_kinds:
        label_by_kind = {
            "youtube": "Videos",
            "video": "Videos",
            "webinar": "Webinare",
            "case_study": "Praxisbeispiele",
            "use_case": "Anwendungsfälle",
            "whitepaper": "Whitepaper",
            "blog_article": "Fachartikel",
            "download": "Downloads",
        }
        labels = [label_by_kind.get(kind, str(kind)) for kind in content_kinds[:3]]
        sentences.append(sentence(f"Ergänzend wurden öffentliche Materialien wie {', '.join(labels)} gefunden"))

    return " ".join(sentences[:5])


def has_signal(item: dict[str, Any], key: str) -> bool:
    return bool(item.get("signals", {}).get(key))


def server_de(item: dict[str, Any]) -> bool:
    snippets = " ".join(item.get("signals", {}).get("hosting", []))
    return any(term in snippets.lower() for term in ["germany", "deutschland", "hetzner", "deutsches"])


def operation(item: dict[str, Any]) -> str | None:
    models = item.get("signals", {}).get("operation_models") or []
    if models:
        return models[0]
    if has_signal(item, "operation"):
        return "Cloud / SaaS"
    return None


def content_piece_key(piece: dict[str, Any]) -> str:
    if piece.get("video_id"):
        return f"{piece.get('kind')}:video:{piece['video_id']}"
    digest = hashlib.sha1(str(piece.get("url") or "").encode("utf-8")).hexdigest()[:12]
    return f"{piece.get('kind', 'content')}:{digest}"


def load_decisions(path: str | None) -> dict[str, Any] | None:
    if not path:
        return None
    return json.loads(Path(path).read_text(encoding="utf-8"))


def decision_for_item(decisions: dict[str, Any] | None, item: dict[str, Any]) -> dict[str, Any] | None:
    if not decisions:
        return None
    return decisions.get("tools", {}).get(item["slug"])


def approved_by_decision(decisions: dict[str, Any] | None, item: dict[str, Any]) -> bool:
    decision = decision_for_item(decisions, item)
    if decisions is None:
        return True
    return bool(decision and decision.get("status") == "approved")


def approved_content_pieces(item: dict[str, Any], decision: dict[str, Any] | None) -> list[dict[str, Any]]:
    if not decision:
        return []
    decision_pieces = decision.get("content_pieces", {})
    approved: list[dict[str, Any]] = []
    for piece in item.get("content_pieces", []):
        key = content_piece_key(piece)
        piece_decision = decision_pieces.get(key)
        if not piece_decision or piece_decision.get("status") != "approved":
            continue
        title = piece_decision.get("title_override") or piece_decision.get("title") or piece.get("title")
        approved.append(
            {
                "key": key,
                "kind": piece.get("kind"),
                "title": title,
                "url": piece.get("url"),
                "sourceUrl": piece.get("source_url"),
                "surface": piece_decision.get("surface", ["profile"]),
                "videoId": piece.get("video_id"),
                "thumbnailUrl": piece.get("thumbnail_url"),
                "reviewed": True,
            }
        )
    return approved[: int(decision.get("profile_content_limit", 6))]


def pitch(item: dict[str, Any]) -> str:
    seed = item["seed"]
    base = seed.get("branch") or "Softwarelösung"
    note = seed.get("note") or ""
    if note:
        return f"{base}. Crawler-Hinweis: {note}"
    return f"{base}. Vorqualifiziert aus öffentlichen Quellen, redaktionell zu prüfen."


def card_from_item(item: dict[str, Any]) -> dict[str, Any]:
    seed = item["seed"]
    category_slug, category_label = CATEGORY_BY_CLUSTER.get(
        seed.get("cluster"), ("kommunikation-zusammenarbeit", "Kommunikation & Zusammenarbeit")
    )
    return {
        "slug": slugify(seed["company"]),
        "name": re.sub(r"\s*\([^)]*\)", "", seed["company"]).strip(),
        "provider": " · ".join(part for part in [seed["company"], seed.get("city")] if part),
        "categorySlug": category_slug,
        "categoryLabel": category_label,
        "pitch": pitch(item),
        "tier": "basis",
        "facts": {
            "price": "auf Anfrage",
            "setup": None,
            "operation": operation(item),
        },
        "compliance": {
            "dsgvo": has_signal(item, "privacy"),
            "serverDe": server_de(item),
            "bsi": has_signal(item, "security"),
            "vergabe": False,
        },
        "mark": initials(seed["company"]),
        "markBg": "#009460",
        "lastCheckedAt": item.get("last_checked_at"),
        "reviewStatus": item.get("review_status", "needs_review"),
        "missingInfo": item.get("missing_info", []),
    }


def color_to_hex(rgb: tuple[int, int, int]) -> str:
    return "#" + "".join(f"{value:02x}" for value in rgb)


def luminance(rgb: tuple[int, int, int]) -> float:
    red, green, blue = [value / 255 for value in rgb]
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue


def saturation(rgb: tuple[int, int, int]) -> float:
    red, green, blue = [value / 255 for value in rgb]
    return max(red, green, blue) - min(red, green, blue)


def rounded_color(pixel: tuple[int, int, int, int]) -> tuple[int, int, int] | None:
    red, green, blue, alpha = pixel
    if alpha < 48:
        return None
    step = 16
    return (
        min(255, round(red / step) * step),
        min(255, round(green / step) * step),
        min(255, round(blue / step) * step),
    )


def detect_logo_background(logo_url: str) -> str:
    if not logo_url:
        return "#ffffff"
    try:
        request = Request(logo_url, headers={"User-Agent": "SupertoolsCrawlerPreview/1.0"})
        data = urlopen(request, timeout=5).read()
        image = Image.open(BytesIO(data)).convert("RGBA")
    except Exception:
        return "#ffffff"

    width, height = image.size
    corner_size = max(2, min(width, height) // 6)
    samples: list[tuple[int, int, int]] = []

    sample_boxes = [
        (0, 0, corner_size, corner_size),
        (width - corner_size, 0, width, corner_size),
        (0, height - corner_size, corner_size, height),
        (width - corner_size, height - corner_size, width, height),
    ]
    for left, top, right, bottom in sample_boxes:
        for y in range(top, bottom):
            for x in range(left, right):
                color = rounded_color(image.getpixel((x, y)))
                if color:
                    samples.append(color)

    if not samples:
        return "#ffffff"

    counts: dict[tuple[int, int, int], int] = {}
    for color in samples:
        counts[color] = counts.get(color, 0) + 1
    dominant = max(counts, key=counts.get)
    if saturation(dominant) > 0.18 and 0.18 < luminance(dominant) < 0.88:
        return "#ffffff"
    return color_to_hex(dominant)


def logo_from_item(item: dict[str, Any]) -> dict[str, str]:
    website = item["seed"].get("website") or ""
    host = re.sub(r"^www\.", "", urlparse(website).netloc)
    logo_url = f"https://www.google.com/s2/favicons?domain={host}&sz=128" if host else ""
    return {
        "website": website,
        "domain": host,
        "logoUrl": logo_url,
        "backgroundColor": detect_logo_background(logo_url),
    }


def load_image_decisions(path: str | None) -> dict[str, Any]:
    if not path:
        return {}
    return json.loads(Path(path).read_text(encoding="utf-8"))


def approved_screenshot_paths(
    item: dict[str, Any],
    decisions: dict[str, Any],
    screenshot_root: Path,
    limit: int,
) -> list[str]:
    slug = item["slug"]
    approved: list[str] = []
    for image in decisions.get("tools", {}).get(slug, {}).get("images", []):
        if image.get("status") != "approved":
            continue
        public_path = str(image.get("public_path") or "").strip()
        prefix = "/brand/screenshots/"
        if not public_path.startswith(prefix):
            continue
        relative = Path(public_path[len(prefix) :])
        if not relative.parts or relative.parts[0] != slug or ".." in relative.parts:
            continue
        if not (screenshot_root / relative).is_file():
            continue
        approved.append(public_path)
        if len(approved) >= limit:
            break
    return approved


def render_card(card: dict[str, Any]) -> str:
    facts = card["facts"]
    compliance = card["compliance"]
    lines = [
        "  {",
        f"    slug: {ts_string(card['slug'])},",
        f"    name: {ts_string(card['name'])},",
        f"    provider: {ts_string(card['provider'])},",
        f"    categorySlug: {ts_string(card['categorySlug'])},",
        f"    categoryLabel: {ts_string(card['categoryLabel'])},",
        "    pitch:",
        f"      {ts_string(card['pitch'])},",
        f"    tier: {ts_string(card['tier'])},",
        "    facts: {",
        f"      price: {ts_string(facts['price'])},",
    ]
    if facts.get("setup"):
        lines.append(f"      setup: {ts_string(facts['setup'])},")
    if facts.get("operation"):
        lines.append(f"      operation: {ts_string(facts['operation'])},")
    lines.extend(
        [
            "    },",
            (
                "    compliance: "
                + "{ "
                + f"dsgvo: {str(compliance['dsgvo']).lower()}, "
                + f"serverDe: {str(compliance['serverDe']).lower()}, "
                + f"bsi: {str(compliance['bsi']).lower()}, "
                + f"vergabe: {str(compliance['vergabe']).lower()} "
                + "},"
            ),
            f"    mark: {ts_string(card['mark'])},",
            f"    markBg: {ts_string(card['markBg'])},",
            f"    lastCheckedAt: {ts_string(card['lastCheckedAt'])},",
            "  },",
        ]
    )
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("candidates_json")
    parser.add_argument("--out")
    parser.add_argument("--decisions")
    parser.add_argument("--include-needs-research", action="store_true")
    parser.add_argument("--image-decisions")
    parser.add_argument("--screenshot-root", default="public/brand/screenshots")
    parser.add_argument("--screenshot-limit", type=int, default=3)
    args = parser.parse_args()

    source = Path(args.candidates_json)
    items = json.loads(source.read_text(encoding="utf-8"))
    decisions = load_decisions(args.decisions)
    if decisions is not None:
        items = [item for item in items if approved_by_decision(decisions, item)]
    elif not args.include_needs_research:
        items = [
            item
            for item in items
            if item.get("crawl", {}).get("successful_pages", 0) > 0
            and item.get("confidence") in {"hoch", "mittel"}
        ]

    cards = [card_from_item(item) for item in items]
    logos_by_tool = {item["slug"]: logo_from_item(item) for item in items}
    summaries_by_tool = {item["slug"]: public_summary(item) for item in items}
    screenshot_root = Path(args.screenshot_root)
    image_decisions = load_image_decisions(args.image_decisions)
    screenshots_by_tool = {
        item["slug"]: approved_screenshot_paths(
            item,
            image_decisions,
            screenshot_root,
            args.screenshot_limit,
        )
        for item in items
    }
    content_by_tool = {
        item["slug"]: approved_content_pieces(item, decision_for_item(decisions, item))
        for item in items
        if approved_content_pieces(item, decision_for_item(decisions, item))
    }
    output = Path(args.out) if args.out else source.with_name("toolcards.preview.ts")
    output.write_text(
        "\n".join(
            [
                "// AUTO-GENERATED PREVIEW ONLY. Do not import into the live site without editorial review.",
                'import type { ToolCardSummary } from "@/types/content";',
                "",
                "export type CrawlerToolContentPiece = {",
                "  key: string;",
                '  kind: "youtube" | "video" | "webinar" | "case_study" | "use_case" | "whitepaper" | "blog_article" | "download";',
                "  title: string;",
                "  url: string;",
                "  sourceUrl: string;",
                '  surface: ("card" | "profile")[];',
                "  videoId?: string | null;",
                "  thumbnailUrl?: string | null;",
                "  reviewed: boolean;",
                "};",
                "",
                "export const crawlerToolCardPreview: ToolCardSummary[] = [",
                *[render_card(card) for card in cards],
                "];",
                "",
                "export const crawlerToolLogoPreview: Record<string, { website: string; domain: string; logoUrl: string; backgroundColor: string }> = "
                + ts_value(logos_by_tool)
                + ";",
                "",
                "export const crawlerToolScreenshotPreview: Record<string, string[]> = "
                + ts_value(screenshots_by_tool)
                + ";",
                "",
                "export const crawlerToolSummaryPreview: Record<string, string> = "
                + ts_value(summaries_by_tool)
                + ";",
                "",
                "export const crawlerToolContentPreview: Record<string, CrawlerToolContentPiece[]> = "
                + ts_value(content_by_tool)
                + ";",
                "",
            ]
        ),
        encoding="utf-8",
    )
    print(f"Wrote {output}")
    print(f"Exported {len(cards)} preview cards")
    print(f"Exported {sum(len(paths) for paths in screenshots_by_tool.values())} local product screenshots")
    print(f"Exported {len(summaries_by_tool)} product summaries")
    print(f"Exported {sum(len(pieces) for pieces in content_by_tool.values())} approved content pieces")


if __name__ == "__main__":
    main()
