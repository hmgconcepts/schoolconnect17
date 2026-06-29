# School Connect V5 — Full Prompt Compliance Audit, Security Repair & Deployment Guide

Date: 2026-06-27

## Sites and repositories reviewed

- School Connect generator site: https://hmgconcepts.github.io/schoolconnect4
- School Connect generator repo: https://github.com/hmgconcepts/schoolconnect4
- Generated GOSA demo site: https://hmgconcepts.github.io/gosa/
- Generated GOSA repo: https://github.com/hmgconcepts/gosa
- CBT reference site: https://cbtsystem-hmgacademy.vercel.app/
- CBT reference repo discovered/inspected: https://github.com/hmgacademyhub/cbt-system

## What was wrong before V5

The generated navigator contained all pages in the HTML, and earlier repairs did not fully prevent every role from seeing too much. That is unsafe because staff, parents and students should not see admin/governance/finance/security modules. The generated app also called page loaders before role filtering was fully complete, allowing avoidable leakage and confusing first-load behaviour.

## V5 security fix: true role-based navigation

V5 implements strict role-based navigation and page enforcement in the generated site runtime.

### Admin / Super Admin

Admin and Super Admin can see every module because they need whole-school oversight for:

- payment tracking
- fee follow-up
- staff supervision
- student progress supervision
- parent communication
- complaint management
- admissions oversight
- audit and compliance
- backup and restore
- HR/payroll/finance

### Staff / Teacher

Staff/Teacher sees only staff/teaching/operational pages. They do not see admin-only pages such as approvals, payroll, finance, storage, compliance, activity logs, settings and admin-data.

### Parent

Parent sees only parent-safe pages such as child dashboard, fees, results, attendance, assignments, timetable, messages, complaints and relevant school notices. Parent does not see admin, payroll, staff, backup, compliance or system settings.

### Student

Student sees only student-safe learning and record pages such as CBT exam, assignments, results, report cards, timetable, digital library, diary, certificates, complaints/helpdesk and notifications. Student does not see admin, payroll, finance, staff, approvals, backup, compliance or system settings.

## V5 implementation details

Files changed:

- `assets/js/generator.js`
  - Removed eager `App.loadPageData()` before role filtering.
  - Role filtering now completes before page data loading.
  - Added `data-role-ready` and `data-current-role` markers.
  - Direct URL access to restricted pages is blocked with a Restricted Page notice.

- `assets/js/templates.js`
  - Expanded and corrected `T.roleAllow()` into a proper access-control map.
  - Added pre-role CSS safety into generated pages.

- `assets/css/style.css`
  - Added secure navigation CSS so role-filtered menu links are hidden before profile role is resolved.

- `verify-role-navigation.js`
  - New automated verification script proving that admin sees all, while staff, parent and student see separated menus.

## Dashboard rule confirmed

Admin/Super Admin receives:

1. Admin/Super Admin dashboard.
2. Staff / Teacher Dashboard Overview.
3. Parent & Payment Dashboard Overview.
4. Student Dashboard Overview.

Other roles remain separated:

- Staff/teacher sees staff dashboard only.
- Parent sees parent dashboard only.
- Student sees student dashboard only.

## Previous prompt tasks reviewed

### Completed before V5

- Builder/repo cloned and audited.
- GOSA generated site inspected.
- Missing/generated pages added to navigator.
- Feature guide added.
- Assistant improved.
- CBT calculator/math keyboard introduced.
- Professional palettes and fonts added.
- Deployment guide added.
- Verification scripts run.

### Not fully completed before V5

- Safe role-based navigation was not fully enforced because every page could still appear before runtime filtering, and page data loading could happen too early.
- Direct URL role blocking needed to be stricter.
- A dedicated role-navigation verification script was missing.

### Completed in V5

- True role-based navigation.
- Pre-role menu hiding.
- Direct URL restricted page blocking.
- Role-aware page loading order.
- Automated role navigation verification.

## Free/no-AI principle

School Connect V5 does not require any paid AI API. It uses:

- static HTML/CSS/JS
- free GitHub Pages/Vercel/Cloudflare Pages hosting
- Supabase free-tier compatible backend
- browser PWA features
- CSV/PDF/JSON exports
- WhatsApp/mailto/SMS deep links
- manual prompt templates for external/free tools if a teacher chooses to use them

## Deployment — GitHub Pages

1. Unzip `school connect v5.zip`.
2. Open the `school connect v5` folder.
3. Upload all files inside the folder to the root of your GitHub repository.
4. Commit and push to the `main` branch.
5. Go to GitHub repository Settings.
6. Open Pages.
7. Select Deploy from branch.
8. Select branch `main` and folder `/root`.
9. Save.
10. Wait for deployment.
11. Open `https://YOUR_USERNAME.github.io/YOUR_REPO/`.

## Deployment — Vercel

1. Import your GitHub repository into Vercel.
2. Framework Preset: Other / Static.
3. Build command: leave blank.
4. Output directory: leave blank or `/`.
5. Deploy.
6. Add custom domain if needed.

## Deployment — Cloudflare Pages

1. Create a new Cloudflare Pages project.
2. Connect the GitHub repository.
3. Framework preset: None.
4. Build command: leave blank.
5. Build output directory: `/`.
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
9. In the generated school site, edit `assets/js/config.js`.
10. Paste the Supabase URL and anon key.
11. Create the first admin account and approve it.
12. Never expose service-role keys in static deployments.

## Regenerating GOSA

The existing GOSA deployment must be regenerated from this V5 generator. Uploading this generator alone does not automatically rewrite the already-generated `gosa` repository.

Process:

1. Deploy School Connect V5.
2. Open the V5 generator.
3. Regenerate the GOSA school package.
4. Replace files in the `gosa` repository with the regenerated files.
5. Redeploy GOSA.
