# School Connect V4 — Expert Audit, Security Repair, CBT Enhancement & Deployment Guide

Date: 2026-06-27

## Repositories/sites audited

- Generator site: https://hmgconcepts.github.io/schoolconnect3
- Generator repo: https://github.com/hmgconcepts/schoolconnect3
- Demo site: https://hmgconcepts.github.io/gosa/
- Demo repo: https://github.com/hmgconcepts/gosa
- CBT reference site: https://cbtsystem-hmgacademy.vercel.app/
- CBT reference repo discovered as: https://github.com/hmgacademyhub/cbt-system

## Most important V4 correction: secure role-based navigation

The previous repair kept all modules visible and marked some as locked. That was not safe enough because staff, parents and students could still see the full feature map.

V4 changes the generated runtime so navigation is truly role-filtered:

- Admin/Super Admin can see all modules because they need whole-school oversight.
- Staff/Teacher sees only staff/teaching/operational pages.
- Parent sees only child, fees, results, communication and parent-safe pages.
- Student sees only learning, exam, timetable, results and student-safe pages.
- Direct URL access to a hidden page is blocked with a Restricted Page message.

This is implemented in:

- `assets/js/generator.js` — generated `App.applyRoleNav()`, role-set logic and direct-page enforcement.
- `assets/js/templates.js` — stronger `T.roleAllow()` access map.

## Admin/Super Admin dashboard rule implemented

Admin/Super Admin now sees:

1. Admin/Super Admin Command Centre.
2. Staff / Teacher Dashboard Overview.
3. Parent & Payment Dashboard Overview.
4. Student Dashboard Overview.
5. Role Separation Rule card.

This gives admin oversight for payment tracking, fee follow-up, staff supervision, student progress, safeguarding, parent communication, complaints, admissions and audit duties.

Other users remain separated:

- Staff/Teacher sees staff dashboard only.
- Parent sees parent dashboard only.
- Student sees student dashboard only.

## CBT features studied and implemented from HMG Academy CBT Pro

The CBT reference platform includes exam codes/links, no-account student access, autosave, anti-cheat logging, flagged questions, scientific calculator, math/science keyboard, read-aloud, keyboard shortcuts, direct WhatsApp sharing, structured prompts, 17 question types, certificates and detailed guides.

V4 brings key free-browser features into School Connect:

- On-screen scientific calculator in `cbt-exam.html`.
- On-screen mathematics/science symbol keyboard.
- Symbol insertion into typed answers.
- Read-aloud button for questions/options.
- Fullscreen button.
- Keyboard shortcuts: A-D, N/right, P/left, R, S.
- Draft restore if a previous local autosave exists.
- Richer CBT prompt master structure based on HMG CBT Pro prompt patterns.

No paid AI API is used. Prompt pages are for manual copy/paste into free external tools or for human question setters.

## Assistant and page explanation improvements

- The assistant now introduces itself as a first-time-user guide.
- It explains what a feature means, who uses it, how to use it, security/role rules and benefits.
- A role-based navigation/security answer was added.
- Page descriptions now include richer fallback explanations even where a module did not have a custom guide.
- `feature-guide.html` remains the full generated documentation page.

## Professional visual improvements

- Replaced the first theme set with professional palettes such as Executive Navy & Gold, Royal Blue & Emerald, Oxford Indigo & Sky, Charcoal & Teal, Burgundy & Champagne, Forest & Brass.
- Added premium-grade free Google fonts: Plus Jakarta Sans, Manrope and Sora.
- Added V4 professional UI CSS: calmer surfaces, better contrast, enterprise cards, improved buttons, stronger focus rings and refined table styling.

## Free enterprise enhancements retained/enhanced

- Supabase free-tier compatible database and authentication.
- Static hosting support: GitHub Pages, Vercel and Cloudflare Pages.
- PWA install support.
- No paid AI API.
- Free WhatsApp/email/SMS deep-link communication options.
- CSV/PDF/JSON exports.
- RLS-first security approach.
- Role-based dashboards and navigation.
- Audit log and admin data backup.
- CBT, report cards, timetable, QR check-in, admissions, payroll, finance, ID cards, certificates and feature guide.

## Deployment steps — GitHub Pages

1. Unzip `school connect v4.zip`.
2. Open the `school connect v4` folder.
3. Upload all files in that folder to the root of your GitHub repository.
4. Commit and push to `main`.
5. Open GitHub repository Settings.
6. Go to Pages.
7. Choose Deploy from branch.
8. Select `main` branch and `/root` folder.
9. Save.
10. Wait for GitHub Pages to build.
11. Visit `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/`.

## Deployment steps — Vercel

1. Import the GitHub repo into Vercel.
2. Framework preset: Other / Static.
3. Build command: leave empty.
4. Output directory: leave empty or `/`.
5. Deploy.
6. Add custom domain if needed.

## Deployment steps — Cloudflare Pages

1. Create a Cloudflare Pages project.
2. Connect the GitHub repo.
3. Framework preset: None.
4. Build command: leave empty.
5. Output directory: `/`.
6. Deploy.

## Supabase setup

1. Create a free Supabase project.
2. Open SQL Editor.
3. Run `database/schema.sql` first.
4. Run `database/voting-schema.sql`.
5. Run `database/cbt-schema.sql`.
6. Run `database/reportcard-schema.sql`.
7. Run `database/enterprise-schema.sql`.
8. Run update SQL files if needed.
9. In generated school site, open `assets/js/config.js`.
10. Paste your Supabase URL and anon key.
11. Create first admin account and approve it.
12. Do not expose service-role keys in static hosting.

## GOSA update instruction

The current GOSA deployment will not receive these fixes until it is regenerated from the V4 generator. After deploying this V4 generator, regenerate GOSA and replace the existing GOSA repo contents with the new generated files.
