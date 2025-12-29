# .docs-ai-agent — Development Documentation (English)

This directory stores English development documentation for the AI agent. Japanese translations live under `.docs-human-ja` and should mirror these files.

- **Important:** Author all agent thinking, design notes, internal memos, and development docs in English. Japanese files are translations and must not replace the English originals.
- **Important:** Manage development docs in `.docs-ai-agent` (English) with matching translations in `.docs-human-ja/.docs-ai-agent`. speckit feature documents belong in `.docs-ai-agent/spaces/[###-feature-name]/`, with Japanese counterparts in `.docs-human-ja/.docs-ai-agent/spaces/[###-feature-name]/` using the same structure and `.ja.md` suffix.

**Mandatory rules:**

- Place translations under `.docs-human-ja/.docs-ai-agent` using the same path structure as English files, with filenames ending in `.ja.md` (e.g., `.docs-ai-agent/guides/setup.md` → `.docs-human-ja/.docs-ai-agent/guides/setup.ja.md`).
- Keep English as the source of truth; whenever English changes, update the Japanese translation to preserve meaning and nuance.
- Target ~300 lines per English file; consider splitting once a file exceeds ~250 lines (no hard limit on Japanese length).

**Recommended workflow:**

1) Update the English document in `.docs-ai-agent`.
2) Update the Japanese translation in `.docs-human-ja` to match the change.
3) Update any referenced documents as needed.

**Recommended automated checks:**

- Verify each English file under `.docs-ai-agent` has a corresponding translation under `.docs-human-ja`.
- Warn if an English file exceeds 250 lines; error if it exceeds 300 lines.

---

_Last updated: 2025-12-30_
