#!/usr/bin/env python3
"""Create or update the editorial review decision file for crawler runs."""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
from pathlib import Path
from typing import Any


STATUS_OPTIONS = ["approved", "needs_review", "needs_research", "contact_vendor", "rejected"]
CONTENT_SURFACE_OPTIONS = ["card", "profile"]


def content_piece_key(piece: dict[str, Any]) -> str:
    if piece.get("video_id"):
        return f"{piece.get('kind')}:video:{piece['video_id']}"
    digest = hashlib.sha1(str(piece.get("url") or "").encode("utf-8")).hexdigest()[:12]
    return f"{piece.get('kind', 'content')}:{digest}"


def load_json(path: Path, fallback: Any) -> Any:
    if not path.exists():
        return fallback
    return json.loads(path.read_text(encoding="utf-8"))


def default_tool_status(item: dict[str, Any]) -> str:
    if item.get("crawl", {}).get("successful_pages", 0) == 0:
        return "needs_research"
    return "needs_review"


def merge_decisions(candidates: list[dict[str, Any]], existing: dict[str, Any]) -> dict[str, Any]:
    now = dt.datetime.now(dt.timezone.utc).isoformat()
    result = {
        "schema_version": 1,
        "updated_at": now,
        "instructions": {
            "tool_status_options": STATUS_OPTIONS,
            "content_status_options": STATUS_OPTIONS,
            "content_surface_options": CONTENT_SURFACE_OPTIONS,
            "workflow": (
                "Set tools.<slug>.status to approved only after editorial review. "
                "Set individual content_pieces.<key>.status to approved before they appear in exports."
            ),
        },
        "tools": existing.get("tools", {}),
    }

    for item in candidates:
        slug = item["slug"]
        seed = item["seed"]
        previous_tool = result["tools"].get(slug, {})
        tool_entry = {
            "name": previous_tool.get("name", seed["company"]),
            "website": previous_tool.get("website", seed.get("website")),
            "status": previous_tool.get("status", default_tool_status(item)),
            "editorial_note": previous_tool.get("editorial_note", ""),
            "card_badges": previous_tool.get("card_badges", []),
            "profile_content_limit": previous_tool.get("profile_content_limit", 6),
            "content_pieces": previous_tool.get("content_pieces", {}),
        }

        for piece in item.get("content_pieces", []):
            key = content_piece_key(piece)
            previous_piece = tool_entry["content_pieces"].get(key, {})
            tool_entry["content_pieces"][key] = {
                "kind": previous_piece.get("kind", piece.get("kind")),
                "title": previous_piece.get("title", piece.get("title")),
                "url": previous_piece.get("url", piece.get("url")),
                "source_url": previous_piece.get("source_url", piece.get("source_url")),
                "status": previous_piece.get("status", "needs_review"),
                "surface": previous_piece.get("surface", ["profile"]),
                "title_override": previous_piece.get("title_override", ""),
                "editorial_note": previous_piece.get("editorial_note", ""),
            }
            if piece.get("video_id"):
                tool_entry["content_pieces"][key]["video_id"] = previous_piece.get("video_id", piece.get("video_id"))
            if piece.get("thumbnail_url"):
                tool_entry["content_pieces"][key]["thumbnail_url"] = previous_piece.get(
                    "thumbnail_url", piece.get("thumbnail_url")
                )

        result["tools"][slug] = tool_entry

    return result


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("candidates_json")
    parser.add_argument("--out", default="data/crawler/review-decisions.json")
    args = parser.parse_args()

    source = Path(args.candidates_json)
    output = Path(args.out)
    candidates = json.loads(source.read_text(encoding="utf-8"))
    existing = load_json(output, {"tools": {}})
    decisions = merge_decisions(candidates, existing)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(decisions, ensure_ascii=False, indent=2), encoding="utf-8")

    tool_count = len(decisions.get("tools", {}))
    content_count = sum(len(tool.get("content_pieces", {})) for tool in decisions.get("tools", {}).values())
    print(f"Wrote {output}")
    print(f"Tracked tools: {tool_count}")
    print(f"Tracked content pieces: {content_count}")


if __name__ == "__main__":
    main()
