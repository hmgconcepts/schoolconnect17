# CBT Audit Report

Date: 2026-06-27

## Scope

Reviewed CBT-related generator output, shared CBT engine, report-card integration and SQL support files.

## Findings

- `assets/js/cbt-engine.js` parses and is bundled into generated school ZIP files.
- `database/cbt-schema.sql` is present.
- `database/reportcard-schema.sql` is present.
- CBT pages are emitted by the generator:
  - `cbt.html`
  - `cbt-exam.html`
  - `cbt-prompts.html`
  - `entrance.html`
- CBT marks can be mapped into report-card columns through the included report-card flow.
- Anonymous entrance/assessment mode is retained.

## Repairs confirmed

- No JavaScript syntax errors in CBT-related assets.
- Generated app shell now keeps the CBT menu visible after role/profile load.
- Student-facing CBT links remain visible for student/parent roles.

## Deployment note

Run the SQL files in Supabase before enabling live CBT. For a static demo without Supabase, CBT pages render but live persistence is unavailable.
