# School Connect V3 — Expert Audit, Enhancements & Deployment Guide

Date: 2026-06-27

## Sites and repositories audited

- Generator site: https://hmgconcepts.github.io/schoolconnect3
- Generator repository: https://github.com/hmgconcepts/schoolconnect3
- Generated demo site: https://hmgconcepts.github.io/gosa/
- Generated demo repository: https://github.com/hmgconcepts/gosa

## Non-negotiable dashboard rule implemented

Admin/Super Admin now sees:

1. The full Admin/Super Admin command dashboard.
2. Staff / Teacher Dashboard Overview for supervision of staff work.
3. Parent & Payment Dashboard Overview for fee tracking, complaints, admissions and parent follow-up.
4. Student Dashboard Overview for learning, records, safeguarding and support supervision.

Strict separation remains for other users:

- Staff/teacher sees staff dashboard only.
- Parent sees parent dashboard only.
- Student sees student dashboard only.

This is implemented inside the generator template, so every regenerated school site receives the corrected dashboard structure.

## Bugs diagnosed and fixed

### Navigator omitted generated pages

The navigator previously relied too heavily on selected modules. It could omit dedicated pages such as student profile, CBT exam, apply, about, contact and guide pages.

Fix: the navigator now includes selected modules, full catalog modules and dedicated pages.

### Public CBT/entrance exam route

The CBT exam page is intended to support anonymous/entrance exams. It is included in public routes so candidates are not forced into login unexpectedly.

### Dashboard data fragility

The dashboard loader previously allowed one failing table query to break all dashboard KPIs. V3 uses safe count/row helpers so missing optional tables do not crash the whole dashboard.

### Missing feature explanations

Generated school sites now include `feature-guide.html`, which explains every module and page in plain language. It is free, static and does not require any AI API.

### Stray placeholder files

Removed stray placeholder files such as `assets/js/A`, `database/a`, `tools/a`, etc.

## Competitive feature research used

Free/open-source and commercial school platforms commonly advertise SIS, admissions, attendance, gradebook, exams, timetable, fees, parent/student portals, LMS/classroom, HR/payroll, library, transport, analytics, communications, multi-campus reporting, audit/security and mobile/PWA support. V3 preserves existing School Connect features and improves enterprise usability around those areas without paid AI APIs.

## V3 enterprise/free enhancements

- Admin/Super Admin oversight dashboard with separate staff, parent/payment and student overview panels.
- Full feature guide generated inside each school site.
- Safer dashboard KPI loading.
- More complete navigator.
- Free communication approach: browser push, email links, WhatsApp share links/templates instead of paid messaging APIs.
- Continued Supabase Row Level Security support.
- Continued static hosting compatibility for GitHub Pages, Vercel and Cloudflare Pages.

## Deployment steps — GitHub Pages

1. Unzip `school connect v3.zip`.
2. Open the `school connect v3` folder.
3. Upload all files to your GitHub repository root.
4. Commit and push.
5. In GitHub, open Settings → Pages.
6. Set Source to Deploy from branch.
7. Select branch `main` and folder `/root`.
8. Save and wait for deployment.
9. Visit `https://YOUR_USERNAME.github.io/YOUR_REPO/`.
10. Open the builder, regenerate GOSA, and redeploy the generated files to the `gosa` repository.

## Deployment steps — Vercel

1. Import the GitHub repository into Vercel.
2. Framework preset: Other / Static.
3. Build command: leave empty.
4. Output directory: leave empty or use `/`.
5. Deploy.
6. Add your custom domain if needed.

## Deployment steps — Cloudflare Pages

1. Create a Pages project.
2. Connect the GitHub repo.
3. Framework preset: None.
4. Build command: leave empty.
5. Build output directory: `/`.
6. Deploy.

## Supabase setup summary

1. Create a free Supabase project.
2. Open SQL Editor.
3. Run `database/schema.sql`.
4. Run voting, CBT, report-card, enterprise and update SQL files if you need those modules.
5. Copy Supabase URL and anon key into generated school `assets/js/config.js`.
6. Create/approve the first admin profile.

## Important note

Existing `gosa` files will not change until the demo is regenerated from this fixed V3 generator.
