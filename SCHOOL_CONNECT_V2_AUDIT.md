# School Connect V2 Deep Audit & Repair Report

Date: 2026-06-27

## Repositories/sites reviewed

- Builder/site: https://hmgconcepts.github.io/schoolconnect2
- Builder repo: https://github.com/hmgconcepts/schoolconnect2
- Generated demo: https://hmgconcepts.github.io/gosa/
- Generated demo repo: https://github.com/hmgconcepts/gosa

## Critical findings

### 1. Navigator did not capture every generated page

In the generated `gosa` demo, the app contained more HTML pages than the sidebar navigator exposed. The generated dashboard nav had 88 links, while the generated repo had additional pages such as:

- `about.html`
- `contact.html`
- `apply.html`
- `cbt-exam.html`
- `student-profile.html`
- `academic-records.html`
- pages that existed but were omitted when not present in `config.modules`

Root cause: `T.allModules(config)` built navigation mainly from `config.modules` plus a small always-include list. Dedicated generated pages and full catalog pages were not guaranteed to appear.

Repair:

- `T.allModules(config)` now builds a complete portal map from:
  - dashboard
  - selected modules
  - the full module catalog
  - dedicated non-catalog pages: student profile, CBT exam, academic-records alias, about, contact, apply, notifications
- `Generator.build()` now emits every module page instead of only modules selected in `config.modules`.
- `digital_library.html` is now emitted unconditionally.

### 2. Dashboards overlapped between roles

Admin users could see student/parent/staff dashboard blocks because `App.applyRoleDashboard()` expanded admin roles to include staff, parent and student.

Root cause: the role map treated admin as a superset of every role for dashboard rendering.

Repair:

- Admin/proprietor/principal/head teacher/bursar now see the admin dashboard only.
- Staff/teacher now see the staff dashboard only.
- Parent now sees the parent dashboard only.
- Student now sees the student dashboard only.

### 3. Admin dashboard was incomplete

The admin dashboard only exposed a few controls: academic setup, approvals, students, staff, finance, analytics, backup and storage.

Repair:

The admin dashboard now includes a full command centre covering:

- academic setup
- approvals
- students
- staff
- parents
- classes
- subjects
- departments
- admissions
- finance
- fees
- payroll
- staff loans
- staff bonus
- appraisals
- analytics
- admin data
- storage
- compliance
- activity log
- settings
- timetable generator
- QR check-in
- surveys
- menu planner
- fleet
- facilities
- inventory
- document builder
- ID cards
- certificates
- flyer
- broadcast
- announcements
- voting

### 4. Public CBT exam page incorrectly required login

`cbt-exam.html` is used for anonymous/student assessment links but was not in `PUBLIC_PAGES`, so an unauthenticated exam taker could be redirected to login.

Repair:

- Added `cbt-exam` to `PUBLIC_PAGES`.
- Added `offline` to `PUBLIC_PAGES`.

### 5. Profile loading could fail and break dashboard/nav application

The generated `applyRoleVisibility()` had a catch path that referenced a block-scoped `role` variable outside its scope.

Repair:

- Switched profile query to `maybeSingle()`.
- Added a safe fallback role/name from user metadata or defaults.
- Ensured dashboard and nav still initialise even if the profile lookup fails.

### 6. Stray placeholder files existed again

Removed stray placeholder files from the repo:

- `assets/css/a` / `assets/css/A`
- `assets/js/a` / `assets/js/A`
- `assets/img/a` / `assets/img/A`
- `database/a` / `database/A`
- `tools/a` / `tools/A`

## Files changed

- `assets/js/templates.js`
- `assets/js/generator.js`
- removed placeholder files listed above
- added this report

## Validation run

```bash
node --check assets/js/templates.js
node --check assets/js/generator.js
bash verify.sh
node verify-generated-output.js
```

Result:

- `verify.sh`: Passed 168, Failed 0
- `verify-generated-output.js`: no failures

## Required next step

Existing generated school sites such as `gosa` must be regenerated from this fixed builder so their generated `assets/js/app.js`, dashboard HTML and navigation HTML are refreshed.

## Follow-up adjustment: Admin/Super Admin oversight model

A further governance correction was applied after review:

- Staff/teacher still see staff dashboard only.
- Parent still sees parent dashboard only.
- Student still sees student dashboard only.
- Admin/Super Admin now see the admin command dashboard **plus controlled overview cards** for staff, parent/payment and student-learning supervision.

This gives administrators the oversight needed for fee tracking, supervision, safeguarding, management and operational control without mixing the actual staff/parent/student dashboard experience for those users.
