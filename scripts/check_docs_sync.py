#!/usr/bin/env python3
"""Simple checker for docs parity and length.

Usage: python3 scripts/check_docs_sync.py

Checks:
- Every `.docs-ai-agent/**/*.md` has a corresponding `.docs-human-ja/<same path>.ja.md`.
- English files longer than 300 lines are errors.
- English files longer than 250 lines are warnings.

Exit code: 0 if OK (only warnings), 1 if any errors found.
"""

from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
EN_DIR = ROOT / ".docs-ai-agent"
JA_DIR = ROOT / ".docs-human-ja"

errors = []
warnings = []

if not EN_DIR.exists():
    errors.append(f"Missing directory: {EN_DIR}")

for en_path in EN_DIR.rglob("*.md"):
    rel = en_path.relative_to(EN_DIR)
    ja_path = JA_DIR / rel.parent / (en_path.stem + ".ja.md")

    # Check existence
    if not ja_path.exists():
        errors.append(f"Missing translation: {ja_path} for {en_path}")

    # Check length
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
