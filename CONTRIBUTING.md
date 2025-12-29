# Contributing — Docs workflow (Short)

This repository follows a strict pattern for development documentation used by the AI agent.

Key points:

- AI agent 'thinking' and all development documentation should be authored in English; Japanese files are translations that mirror the English originals.
- **All work should use a RunBook located at `.docs-ai-agent/runbooks`** — copy `000-runbook-template.md` from that directory and name runbooks with a 3-digit prefix and short hyphenated title (e.g., `001-database-migration.md`). Organize runbooks into 100-range directories such as `1-100/`, `101-200/`, etc. RunBooks also require matching translations under `.docs-human-ja/runbooks/`.
- Author development docs under `.docs-ai-agent` as `*.md` files.
- Keep each English doc around ~300 lines; split if the file exceeds 250 lines.
- Add a Japanese translation under `.docs-human-ja` that mirrors the English path and has the `.ja.md` suffix (e.g., `.docs-ai-agent/guides/foo.md` → `.docs-human-ja/guides/foo.ja.md`).
- **MANDATORY:** When updating documentation, you MUST update both the English and Japanese versions to ensure they convey the same meaning and intent. For larger or nuanced changes, include in the PR description which translation was updated and who verified it.

PR checklist (include before marking PR ready for review):

- [ ] I updated both the English and Japanese files and ensured they convey equivalent meaning (list updated file paths in PR description)
- [ ] I ran `python3 scripts/check_docs_sync.py` and fixed any reported issues
- [ ] I noted who verified the translation in the PR description (if applicable)

Scripts & checks:

- A docs parity/size checker is available at `scripts/check_docs_sync.py`.
- RunBook section presence is validated by `scripts/check_runbooks.py` (ensures `Impact scope` and `Test scope` exist in English runbooks, and `影響範囲` / `テスト範囲` in Japanese runbooks).
- The repository includes a GitHub Action (`.github/workflows/docs-check.yml`) which runs the docs and runbook checkers on pushes and pull requests affecting docs or scripts.

How to run locally:

```bash
python3 scripts/check_docs_sync.py
python3 scripts/check_runbooks.py
```

If the checker exits with a non-zero status, fix the reported issues before merging.

Thanks for keeping docs accurate and translated! 🎯
