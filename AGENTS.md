<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Supertools crawler and qualification rules

- Before changing crawler, discovery, master-list, review, export, or website-integration behavior, read `docs/status-quo-2026-08-14/systemlogik-qualifizierung.md` and the relevant file under `Crawler/`.
- The crawler is a research assistant, not an auto-publisher. Preserve explicit human review between collected evidence and website publication.
- Do not treat technical states such as `qualified` or membership in the master/watchlist as editorial approval. Only an explicit review decision may authorize a reviewed or publication-bound export; any unreviewed export must remain clearly marked as a technical preview.
- Keep public claims source-backed. Preserve evidence URLs, visible unknowns, and the distinction between an automated signal and a verified editorial statement.
- When pipeline behavior, status rules, data flow, or ownership changes, update the system-logic documentation in the same change.
