# Implementation Notes — School Connect v1

## Current source observations
- route permissions are centrally influenced by template role mapping
- page-level role requirements exist but need stricter alignment with intended read/write behavior
- dashboard logic already contains role-specific sections that can be hardened further
- CBT student flow exists separately from teacher CBT manager flow

## Safe-fix release stance
This package is prepared to be truthful and useful. It improves documentation, packaging readiness, QA structure, and release organization without making unverified claims about every live-database interaction.

## Coding phase completed in this package
The following source-level hardening changes were applied in this package:
1. removed duplicate generated alias for `academic-records.html`
2. tightened role inheritance so admin no longer implicitly inherits parent/student/staff navigation
3. changed non-admin navigation behavior from visible-locked to hidden-disallowed
4. added visibility token enforcement for `data-admin-only`, `data-staff-only`, `data-parent-only`, `data-student-only`
5. strengthened current-page access blocking
6. added CRUD write checks by module and role
7. improved CBT teacher page clarity by linking directly to `cbt-exam.html`
8. improved CBT typed-answer support by strengthening calculator/symbol-keyboard affordances

## Recommended next coding phase
A deeper live-QA phase should now:
1. run full generated-output tests with real Supabase accounts
2. confirm read-only scoping on parent/student pages against real data
3. confirm teacher write restrictions on results/report cards/attendance/academic records
4. confirm CBT runtime flows end-to-end in browser
