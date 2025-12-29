#!/usr/bin/env python3
"""Check RunBook files contain required sections.

Checks:
- For English runbooks under `.docs-ai-agent/runbooks/**.md`, verify presence of "Impact scope" and "Test scope" (case-insensitive).
- For Japanese runbooks under `.docs-human-ja/runbooks/**.ja.md`, verify presence of "影響範囲" and "テスト範囲".
- Skips `000-runbook-template.md` since it's the template.

Exit status: 0 if all pass, 1 if any file is missing required sections.
"""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
EN_RUNBOOKS = ROOT / ".docs-ai-agent" / "runbooks"
JA_RUNBOOKS = ROOT / ".docs-human-ja" / "runbooks"

missing = []

def check_file(path: Path, required_patterns):
    text = path.read_text(encoding="utf-8")
    missing_keys = []
    for key, pattern in required_patterns.items():
        if not re.search(pattern, text, flags=re.IGNORECASE | re.MULTILINE):
            missing_keys.append(key)
    return missing_keys

# English runbooks
if EN_RUNBOOKS.exists():
    for p in EN_RUNBOOKS.rglob("*.md"):
        if p.name == "000-runbook-template.md":
            continue
        reqs = {
            "Impact scope": r"\bImpact scope\b",
            "Test scope": r"\bTest scope\b",
        }
        miss = check_file(p, reqs)
        if miss:
            missing.append((str(p.relative_to(ROOT)), miss))

# Japanese runbooks
if JA_RUNBOOKS.exists():
    for p in JA_RUNBOOKS.rglob("*.md"):
        if p.name == "000-runbook-template.ja.md":
            continue
        reqs = {
            "影響範囲": r"影響範囲",
            "テスト範囲": r"テスト範囲",
        }
        miss = check_file(p, reqs)
        if miss:
            missing.append((str(p.relative_to(ROOT)), miss))

if missing:
    print("ERROR: Some RunBook files are missing required sections:")
    for f, keys in missing:
        print(f"  - {f}: missing {', '.join(keys)}")
    print("\nPlease add the missing sections (Impact scope / Test scope or 影響範囲 / テスト範囲) to the listed RunBooks.")
    sys.exit(1)

print("All RunBook files contain required sections.")
sys.exit(0)
