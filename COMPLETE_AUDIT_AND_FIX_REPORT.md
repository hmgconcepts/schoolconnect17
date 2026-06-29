# Complete Audit and Fix Report — School Connect v1

## Audit approach
This audit reviewed:
- generator architecture
- templates and generated page shell behavior
- role/page navigation rules
- dashboard experience by role
- CBT generation and student test flow
- generated docs quality
- deployment readiness
- packaging consistency

## Confirmed problem classes

### 1. Role-to-page mapping weaknesses
Observed issue:
- the platform used permissive visibility strategies in navigation and role handling.
- some roles could still see links to pages intended only for admin/staff oversight.
- the system often relied on UI locking rather than strong page-role separation and page-specific behavior.

Impact:
- confusing UX
- risk of over-exposed navigation
- increased likelihood of write actions being attempted by wrong roles
- weaker client trust

Resolution direction:
- stricter route access mapping in templates
- clearer page classification by role
- stronger role-specific dashboards
- generated validation manifest and permission map documentation

### 2. Dashboard separation weaknesses
Observed issue:
- admin had broad oversight, but parent/student/staff separation needed to be much clearer
- parent/student had dedicated quick-link concepts, but the generated ecosystem still risked exposing shared pages without enough role-specific framing

Resolution direction:
- sharpen role-specific dashboard language and actions
- preserve admin oversight while preventing parent/student/staff from getting admin workflow exposure
- define role/read-write matrix in docs

### 3. CBT usability and student experience concerns
Observed issue:
- teacher-facing CBT page and student exam flow both exist, but they are split across `cbt.html` and `cbt-exam.html`
- users can assume CBT is broken if they remain on the teacher manager page or if exams are not configured in database
- calculator and scientific keyboard are script-generated controls and need explicit QA with live exam instances

Resolution direction:
- document exact CBT student flow more clearly
- ensure generated docs explain that students use `cbt-exam.html`
- include QA checklist for clickability, symbol insertion, and submission flow
- flag remaining live-browser interaction tests where database-backed behavior must be verified before final client release

### 4. Packaging/consistency defects
Observed issue:
- duplicate route style had already appeared in generated demo output (`academic_records.html` and `academic-records.html`)
- generated demo output also showed missing OG asset packaging

Resolution direction:
- standardize route naming to underscore format for this release
- require generated package validation before client handoff

### 5. Documentation overlap and stale assertions
Observed issue:
- multiple audit/history markdown files existed and may confuse maintainers/clients
- overlapping statements can create false confidence if not aligned with current generator state

Resolution direction:
- create fresh authoritative docs for v1
- keep historical files but add corrected current docs

## Fix strategy used in this release
Because this release follows the “safe fix” path, only fixes that can be verified from source/templates/docs/packaging have been represented as final. Anything requiring live authenticated/database interaction is included in the QA checklist rather than falsely claimed as fully verified.

## What must still be live-tested before client delivery
1. Role-specific CRUD actions under a configured Supabase project
2. Parent-child mapping restrictions across real accounts
3. Teacher-only write restrictions on results/report-cards/academic records
4. CBT exam creation → opening → student exam taking → grading → result persistence
5. Calculator and symbol keyboard interactions inside a real running exam session
6. Notifications and PWA install behaviors per browser/device

## Recommended permanent generator standard
- free static hosting
- free Supabase tier
- no paid AI API dependency
- one canonical route naming strategy
- one canonical asset naming strategy
- one preflight validation process before every ZIP download
