#!/usr/bin/env python3
"""Find and download product-image candidates for editorial review.

This script never writes to ``public/`` and never changes frontend data. It
turns image URLs already collected by the Supertools research crawl into an
internal review package under ``data/crawler/``. A human must explicitly
approve and promote an image before it can be used on the website.
"""

from __future__ import annotations

import argparse
import html
from io import BytesIO
import json
from pathlib import Path
import re
from typing import Any
from urllib.parse import quote, urlsplit, urlunsplit
from urllib.request import Request, urlopen

from PIL import Image, ImageOps, ImageStat


POSITIVE_TERMS = {
    "dashboard": 12,
    "screenshot": 12,
    "software": 8,
    "platform": 8,
    "plattform": 8,
    "interface": 8,
    "workspace": 7,
    "workflow": 7,
    "cockpit": 7,
    "portal": 6,
    "product": 5,
    "produkt": 5,
    "app": 5,
    "ui": 5,
    "screen": 5,
}

NEGATIVE_TERMS = {
    "logo": -14,
    "icon": -12,
    "favicon": -14,
    "avatar": -12,
    "portrait": -10,
    "team": -9,
    "people": -8,
    "person": -8,
    "webinar": -8,
    "event": -7,
    "award": -10,
    "badge": -10,
    "partner": -8,
    "customer": -7,
    "kunde": -7,
    "social": -10,
    "instagram": -12,
    "linkedin": -12,
    "hero": -3,
}

RAW_PAGE_RE = re.compile(r"^## (https?://\S+)\s*$")
EMBEDDED_DIMENSION_RE = re.compile(r"(?<!\d)(\d{3,5})x(\d{3,5})(?!\d)")
NOISY_IMAGE_HOSTS = {
    "bat.bing.com",
    "verifi.pdscrb.com",
    "www.google-analytics.com",
    "googleads.g.doubleclick.net",
    "connect.facebook.net",
}


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def save_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def normalize_markdown_url(target: str) -> str:
    target = target.strip()
    title_match = re.match(r'^(https?://\S+?)\s+["\'].*["\']$', target)
    if title_match:
        target = title_match.group(1)
    target = html.unescape(target)
    target = target.replace(r"\(", "(").replace(r"\)", ")")
    target = target.replace(r"\_", "_").replace(r"\-", "-")
    parts = urlsplit(target)
    return urlunsplit(
        (
            parts.scheme,
            parts.netloc,
            quote(parts.path, safe="/%:@!$&'()*+,;=-._~"),
            quote(parts.query, safe="=&?/%:@!$'()*+,;=-._~"),
            "",
        )
    )


def score_candidate(url: str, alt: str, source_url: str) -> tuple[int, list[str]]:
    haystack = f"{url} {alt}".lower()
    score = 0
    reasons: list[str] = []
    for term, weight in POSITIVE_TERMS.items():
        if re.search(rf"(?<![a-z0-9]){re.escape(term)}(?![a-z0-9])", haystack):
            score += weight
            reasons.append(f"+{weight}:{term}")
    for term, weight in NEGATIVE_TERMS.items():
        if term in haystack:
            score += weight
            reasons.append(f"{weight}:{term}")

    dimension_match = EMBEDDED_DIMENSION_RE.search(url)
    if dimension_match:
        width, height = map(int, dimension_match.groups())
        if width >= 1000 and height >= 500:
            score += 6
            reasons.append("+6:grosse-quelldatei")
        elif width <= 360 or height <= 260:
            score -= 10
            reasons.append("-10:kleine-quelldatei")

    if any(term in source_url.lower() for term in ["produkt", "product", "plattform", "platform", "feature"]):
        score += 4
        reasons.append("+4:produktseite")
    return score, reasons


def iter_markdown_images(line: str):
    cursor = 0
    while True:
        start = line.find("![", cursor)
        if start < 0:
            return
        alt_end = line.find("](", start + 2)
        if alt_end < 0:
            return
        end = alt_end + 2
        while end < len(line):
            if line[end] == ")" and (end == 0 or line[end - 1] != "\\"):
                break
            end += 1
        if end >= len(line):
            return
        yield line[start + 2 : alt_end], line[alt_end + 2 : end]
        cursor = end + 1


def extract_from_raw(raw_path: Path) -> list[dict[str, Any]]:
    source_url = ""
    candidates: dict[str, dict[str, Any]] = {}
    for line in raw_path.read_text(encoding="utf-8", errors="replace").splitlines():
        page_match = RAW_PAGE_RE.match(line)
        if page_match:
            source_url = page_match.group(1)
            continue
        if not source_url:
            continue
        for alt, target in iter_markdown_images(line.strip()):
            url = normalize_markdown_url(target)
            parsed = urlsplit(url)
            if parsed.scheme not in {"http", "https"}:
                continue
            if parsed.netloc.lower() in NOISY_IMAGE_HOSTS:
                continue
            if parsed.path.lower().endswith((".svg", ".gif")):
                continue
            alt = alt.strip()
            score, reasons = score_candidate(url, alt, source_url)
            candidate = {
                "url": url,
                "source_url": source_url,
                "alt": alt,
                "initial_score": score,
                "reasons": reasons,
            }
            previous = candidates.get(url)
            if previous is None or score > previous["initial_score"]:
                candidates[url] = candidate
    return sorted(
        candidates.values(),
        key=lambda item: (-item["initial_score"], item["url"]),
    )


def approved_slugs(decisions_path: Path | None) -> set[str] | None:
    if decisions_path is None:
        return None
    decisions = load_json(decisions_path)
    return {
        slug
        for slug, decision in decisions.get("tools", {}).items()
        if decision.get("status") == "approved"
    }


def fetch_image(url: str, timeout: int, max_mb: int) -> tuple[bytes, str]:
    request = Request(
        url,
        headers={
            "User-Agent": "SupertoolsProductImageResearch/1.0 (+https://amtshelden.de)",
            "Accept": "image/avif,image/webp,image/png,image/jpeg;q=0.9,*/*;q=0.2",
        },
    )
    with urlopen(request, timeout=timeout) as response:
        content_type = response.headers.get_content_type()
        if not content_type.startswith("image/"):
            raise ValueError(f"kein Bild-Content-Type: {content_type}")
        data = response.read(max_mb * 1024 * 1024 + 1)
        if len(data) > max_mb * 1024 * 1024:
            raise ValueError(f"Bild groesser als {max_mb} MB")
        return data, content_type


def inspect_image(data: bytes) -> tuple[Image.Image, int, int, str]:
    image = Image.open(BytesIO(data))
    image.load()
    width, height = image.size
    return image, width, height, (image.format or "unknown").lower()


def dimension_score(width: int, height: int) -> tuple[int, list[str]]:
    score = 0
    reasons: list[str] = []
    if width >= 1200 and height >= 600:
        score += 8
        reasons.append("+8:hohe-aufloesung")
    elif width >= 800 and height >= 420:
        score += 5
        reasons.append("+5:brauchbare-aufloesung")
    else:
        score -= 16
        reasons.append("-16:zu-klein")

    ratio = width / max(1, height)
    if 1.25 <= ratio <= 2.4:
        score += 6
        reasons.append("+6:produktbild-format")
    elif ratio < 0.9 or ratio > 3.2:
        score -= 8
        reasons.append("-8:ungeeignetes-format")
    return score, reasons


def flatten_to_rgb(image: Image.Image) -> Image.Image:
    image = ImageOps.exif_transpose(image)
    if image.mode in {"RGBA", "LA"}:
        background = Image.new("RGB", image.size, "white")
        alpha = image.getchannel("A")
        background.paste(image.convert("RGB"), mask=alpha)
        return background
    return image.convert("RGB")


def visual_variance(image: Image.Image) -> float:
    sample = ImageOps.grayscale(flatten_to_rgb(image))
    sample.thumbnail((240, 240))
    return float(ImageStat.Stat(sample).stddev[0])


def save_preview(image: Image.Image, target: Path, max_width: int = 1600) -> None:
    image = flatten_to_rgb(image)
    if image.width > max_width:
        height = round(image.height * (max_width / image.width))
        image = image.resize((max_width, height), Image.Resampling.LANCZOS)
    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target, format="JPEG", quality=86, optimize=True, progressive=True)


def build_report(manifest: dict[str, Any]) -> str:
    lines = [
        "# Produktbild-Kandidaten — interner Review",
        "",
        "> Technische Recherche, keine Veröffentlichungsfreigabe. Nur Bilder mit",
        "> einer expliziten redaktionellen Entscheidung dürfen später nach",
        "> `public/brand/screenshots/<slug>/shot-N.jpg` übernommen werden.",
        "",
        f"- Tools geprüft: {manifest['summary']['tools_checked']}",
        f"- Tools mit Kandidaten: {manifest['summary']['tools_with_candidates']}",
        f"- heruntergeladene Kandidaten: {manifest['summary']['downloaded_candidates']}",
        "",
    ]
    for tool in manifest["tools"]:
        lines.extend([f"## {tool['company']}", ""])
        if not tool["candidates"]:
            lines.extend(["Keine ausreichend großen Bildkandidaten gefunden.", ""])
            continue
        for candidate in tool["candidates"]:
            lines.extend(
                [
                    f"### Kandidat {candidate['rank']} — Score {candidate['score']}",
                    "",
                    f"![{candidate['alt'] or tool['company']}]({candidate['local_path']})",
                    "",
                    f"- Bildquelle: {candidate['url']}",
                    f"- Fundstelle: {candidate['source_url']}",
                    f"- Format: {candidate['width']} × {candidate['height']} px · {candidate['format']}",
                    f"- Gründe: {', '.join(candidate['reasons']) or 'keine starken Textsignale'}",
                    "- Review: `needs_review` — zeigt das Bild wirklich die Software-Oberfläche?",
                    "",
                ]
            )
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("run_dir")
    parser.add_argument("--out", required=True)
    parser.add_argument("--decisions")
    parser.add_argument("--only", help="Kommagetrennte Slugs")
    parser.add_argument("--offset", type=int, default=0)
    parser.add_argument("--limit-tools", type=int)
    parser.add_argument("--probe-per-tool", type=int, default=18)
    parser.add_argument("--keep-per-tool", type=int, default=5)
    parser.add_argument("--timeout", type=int, default=15)
    parser.add_argument("--max-mb", type=int, default=12)
    parser.add_argument("--min-score", type=int, default=8)
    args = parser.parse_args()

    run_dir = Path(args.run_dir)
    out_dir = Path(args.out)
    items = load_json(run_dir / "product-candidates.json")
    allowed = approved_slugs(Path(args.decisions) if args.decisions else None)
    only = {slug.strip() for slug in (args.only or "").split(",") if slug.strip()}
    if allowed is not None:
        items = [item for item in items if item.get("slug") in allowed]
    if only:
        items = [item for item in items if item.get("slug") in only]
    items = items[args.offset :]
    if args.limit_tools is not None:
        items = items[: args.limit_tools]

    manifest_tools: list[dict[str, Any]] = []
    downloaded_total = 0
    for index, item in enumerate(items, start=1):
        slug = item["slug"]
        company = item.get("seed", {}).get("company") or slug
        print(f"[{index}/{len(items)}] Produktbilder: {company}")
        raw_path = run_dir / "raw" / f"{slug}.md"
        raw_candidates = extract_from_raw(raw_path) if raw_path.exists() else []
        accepted: list[dict[str, Any]] = []
        for candidate in raw_candidates[: args.probe_per_tool]:
            try:
                data, content_type = fetch_image(candidate["url"], args.timeout, args.max_mb)
                image, width, height, image_format = inspect_image(data)
                variance = visual_variance(image)
                if variance < 6:
                    continue
                extra_score, extra_reasons = dimension_score(width, height)
                score = candidate["initial_score"] + extra_score
                if width < 700 or height < 360 or score < args.min_score:
                    continue
                rank = len(accepted) + 1
                local_path = f"{slug}/candidate-{rank:02d}.jpg"
                save_preview(image, out_dir / local_path)
                accepted.append(
                    {
                        **candidate,
                        "rank": rank,
                        "score": score,
                        "reasons": [*candidate["reasons"], *extra_reasons],
                        "content_type": content_type,
                        "format": image_format,
                        "width": width,
                        "height": height,
                        "visual_variance": round(variance, 2),
                        "local_path": local_path,
                        "review_status": "needs_review",
                    }
                )
                if len(accepted) >= args.keep_per_tool:
                    break
            except Exception as exc:
                print(f"  uebersprungen: {candidate['url']} ({exc})")
        downloaded_total += len(accepted)
        manifest_tools.append(
            {
                "slug": slug,
                "company": company,
                "candidates": accepted,
            }
        )

    manifest = {
        "status": "technical_preview_needs_editorial_review",
        "source_run": str(run_dir),
        "summary": {
            "tools_checked": len(manifest_tools),
            "tools_with_candidates": sum(bool(tool["candidates"]) for tool in manifest_tools),
            "downloaded_candidates": downloaded_total,
        },
        "tools": manifest_tools,
    }
    save_json(out_dir / "manifest.json", manifest)
    (out_dir / "review-report.md").write_text(build_report(manifest), encoding="utf-8")
    save_json(
        out_dir / "review-decisions.template.json",
        {
            "status": "editorial_image_review_required",
            "tools": {
                tool["slug"]: {
                    "images": [
                        {
                            "candidate": candidate["local_path"],
                            "source_url": candidate["url"],
                            "status": "needs_review",
                        }
                        for candidate in tool["candidates"]
                    ]
                }
                for tool in manifest_tools
                if tool["candidates"]
            },
        },
    )
    print(f"Wrote {out_dir / 'review-report.md'}")
    print(f"Wrote {out_dir / 'manifest.json'}")
    print(f"Downloaded {downloaded_total} review candidates")


if __name__ == "__main__":
    main()
