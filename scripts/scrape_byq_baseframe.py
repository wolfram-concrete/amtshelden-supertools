#!/usr/bin/env python3
"""Scrape BYQ Baseframe template design references with Crawl4AI."""

from __future__ import annotations

import argparse
import asyncio
import base64
import datetime as dt
import re
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse

import requests
from crawl4ai import AsyncWebCrawler, BrowserConfig, CacheMode, CrawlerRunConfig


SOURCE_URL = "https://app.byq.supply/styles/baseframe"


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "asset"


def strip_noise(markdown: str) -> str:
    lines = markdown.splitlines()
    kept: list[str] = []
    started = False

    for line in lines:
        if line.startswith("## Baseframe"):
            started = True
        if not started:
            continue
        if line.startswith("## Command menu"):
            break
        if line.strip() in {"# ...", "Overview "}:
            continue
        kept.append(line.rstrip())

    cleaned = "\n".join(kept).strip() + "\n"
    cleaned = cleaned.replace(
        "DESIGN.mdtokens.jsontheme.cssvariables.css\n\n```\n# Design System Guide",
        "# Design System Guide",
    )
    cleaned = cleaned.replace(
        "\n\n```\n\nUnlock the full style guide",
        "\n\nUnlock the full style guide",
    )
    return cleaned


def extract_headings(markdown: str) -> list[str]:
    headings = []
    for line in markdown.splitlines():
        if re.match(r"^#{1,6}\s", line):
            headings.append(line.strip())
    return headings


def extract_between(markdown: str, start: str, end: str) -> str:
    start_index = markdown.find(start)
    if start_index == -1:
        return ""
    end_index = markdown.find(end, start_index)
    if end_index == -1:
        end_index = len(markdown)
    return markdown[start_index:end_index].strip()


def extract_image_urls(markdown: str) -> list[tuple[str, str]]:
    matches = re.findall(r"!\[([^\]]*)\]\(([^)]+)\)", markdown)
    seen: set[str] = set()
    images: list[tuple[str, str]] = []
    for alt, url in matches:
        if url in seen:
            continue
        seen.add(url)
        images.append((alt or "image", url))
    return images


def filename_from_url(index: int, alt: str, url: str) -> str:
    parsed = urlparse(url)
    source_path = parsed.path
    if parsed.path.endswith("/_next/image"):
        nested = parse_qs(parsed.query).get("url", [""])[0]
        source_path = unquote(nested)

    suffix = Path(source_path).suffix.lower()
    if suffix not in {".jpg", ".jpeg", ".png", ".webp", ".svg"}:
        suffix = ".webp"

    return f"{index:02d}-{slugify(alt)}{suffix}"


def download_images(images: list[tuple[str, str]], output_dir: Path) -> list[str]:
    output_dir.mkdir(parents=True, exist_ok=True)
    saved: list[str] = []
    headers = {"User-Agent": "Mozilla/5.0 (compatible; Crawl4AI design archive)"}

    for index, (alt, url) in enumerate(images, start=1):
        filename = filename_from_url(index, alt, url)
        target = output_dir / filename
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        target.write_bytes(response.content)
        saved.append(f"- {alt}: `images/{filename}`")

    return saved


def save_screenshot(screenshot: str | None, output_path: Path) -> None:
    if not screenshot:
        return
    data = screenshot
    if "," in data and data.lstrip().startswith("data:"):
        data = data.split(",", 1)[1]
    output_path.write_bytes(base64.b64decode(data))


def make_design_rules(markdown: str, image_manifest: list[str], source_url: str) -> str:
    date = dt.datetime.now(dt.timezone.utc).astimezone().isoformat(timespec="seconds")
    headings = "\n".join(f"- {heading}" for heading in extract_headings(markdown))

    public_tokens = extract_between(markdown, "### Colors", "# Design System Guide")
    locked_preview = extract_between(markdown, "# Design System Guide", "Unlock the full style guide")

    return f"""# Baseframe Design Rules

Source: {source_url}
Scraped: {date}
Tooling: Crawl4AI 0.9.0 with Chromium rendering.

## Claude Code Build Brief

Rebuild the template as a premium consultancy/advisory website. The visual system should feel calm, structured, editorial, and trustworthy. Prefer hierarchy, whitespace, and restrained grids over decorative effects.

## Core Identity

- Positioning: premium consultancy template for advisory firms and service-driven businesses.
- Mood: calm authority, legibility, mature structure, long-lived editorial polish.
- Key message: complexity made legible.
- CTA behavior: use one sharp accent color sparingly for actions, section markers, and small moments of emphasis.
- Motion: smooth translate-Y entrance animations; movement should support clarity rather than spectacle.

## Visual System

- Palette: dual mode with warm off-white/parchment light sections and deep charcoal-brown dark hero/CTA zones.
- Accent: Sun Yellow for CTAs and small markers.
- Typography: IBM Plex Serif for headings, IBM Plex Sans for body text, IBM Plex Mono for uppercase labels, code-like metadata, and compact tabular content.
- Layout: generous section padding, restrained bento grids, service cards, tabbed content, hero sections with strong image hierarchy, and structured footer/navigation.
- Shape: conservative radius and clean card surfaces; avoid playful pill-heavy treatment.

## Public Design Tokens

These values were visible without unlocking the paid template:

{public_tokens}

## Locked DESIGN.md Area

The on-page `DESIGN.md` tab is intentionally locked. Crawl4AI captured the preview, but BYQ masks the full token file with `#xxxxxx` placeholders:

{locked_preview}

## Component Inventory

Use these scraped section names as implementation targets:

{headings}

## Scraped Image Assets

{chr(10).join(image_manifest) if image_manifest else "- No image assets found."}

## Raw Scrape

The normalized Crawl4AI markdown is stored next to this file as `baseframe.raw.md`. Use it for exact section copy and image references.
"""


async def crawl(url: str) -> tuple[str, str | None]:
    browser_config = BrowserConfig(
        headless=True,
        viewport_width=1920,
        viewport_height=1200,
        text_mode=False,
    )
    run_config = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS,
        wait_for="body",
        delay_before_return_html=5,
        screenshot=True,
        scan_full_page=True,
    )
    async with AsyncWebCrawler(config=browser_config) as crawler:
        result = await crawler.arun(url=url, config=run_config)
        if not result.success:
            raise RuntimeError(result.error_message or f"Crawl failed for {url}")
        return result.markdown or "", result.screenshot


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default=SOURCE_URL)
    parser.add_argument("--out", default="docs/scrapes/baseframe")
    args = parser.parse_args()

    output_dir = Path(args.out)
    output_dir.mkdir(parents=True, exist_ok=True)

    markdown, screenshot = await crawl(args.url)
    normalized = strip_noise(markdown)

    (output_dir / "baseframe.raw.md").write_text(normalized, encoding="utf-8")
    save_screenshot(screenshot, output_dir / "baseframe.screenshot.png")

    images = extract_image_urls(normalized)
    image_manifest = download_images(images, output_dir / "images")

    design_rules = make_design_rules(normalized, image_manifest, args.url)
    (output_dir / "design-rules.md").write_text(design_rules, encoding="utf-8")

    print(f"Wrote {output_dir / 'design-rules.md'}")
    print(f"Wrote {output_dir / 'baseframe.raw.md'}")
    print(f"Wrote {output_dir / 'baseframe.screenshot.png'}")
    print(f"Downloaded {len(image_manifest)} images")


if __name__ == "__main__":
    asyncio.run(main())
