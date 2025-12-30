#!/usr/bin/env python3
"""Docs parity/length checker.

Usage: python3 scripts/check_docs_sync.py

Rules:
- English Markdown files live anywhere in the repo (except excluded dirs) and are the source of truth.
- Japanese translations MUST live under `.docs-human-ja/` mirroring the path from the repo root and use `.ja.md` suffix.
    Example: `docs/guides/foo.md` → `.docs-human-ja/docs/guides/foo.ja.md`.
- English files >300 lines are errors; >250 lines are warnings.

Exit code: 0 if OK (only warnings), 1 if any errors.
"""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
JA_DIR = ROOT / ".docs-human-ja"

# Directories to skip when searching for English Markdown files
EXCLUDE_DIRS = {
    ".git",
    ".docs-human-ja",
    "node_modules",
    "dist",
    "build",
    "coverage",
    ".turbo",
    ".next",
    ".vscode",
    ".idea",
    "tmp",
    "temp",
    "storybook-static",
    "src",
    "scripts",
    "specs",
    ".specify",
}

errors = []
warnings = []

if not JA_DIR.exists():
    errors.append(f"Missing directory: {JA_DIR}")


def _should_skip(rel_path: Path) -> bool:
    return any(part in EXCLUDE_DIRS for part in rel_path.parts)


for en_path in ROOT.rglob("*.md"):
    rel = en_path.relative_to(ROOT)

    if rel.parts and rel.parts[0] == ".docs-human-ja":
        continue
    if en_path.name.endswith(".ja.md"):
        continue
    if _should_skip(rel):
        continue

    ja_rel = rel.with_suffix(".ja.md")
    ja_path = JA_DIR / ja_rel

    if not ja_path.exists():
        errors.append(f"Missing translation: {ja_path} for {en_path}")

    with en_path.open("r", encoding="utf-8") as f:
        lines = f.readlines()
    n = len(lines)
    if n > 300:
        errors.append(f"Too many lines ({n}) in {en_path} (max 300) — split recommended")
    elif n > 250:
        warnings.append(f"Warning: {n} lines in {en_path} (consider splitting >250)")

# Report
if warnings:
    print("WARNINGS:")
    for w in warnings:
        print("  -", w)

if errors:
    print("ERRORS:")
    for e in errors:
        print("  -", e)
    print("\nPlease add missing translations and/or split large docs.")
    sys.exit(1)

print("All checks passed (no errors). Warnings may be present.")
sys.exit(0)
