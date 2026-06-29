# Master Bug Audit — School Connect v1

This is the consolidated deep audit after source review, packaging review, role review, CBT review, and documentation review.

## Executive summary
School Connect has a strong architecture for a free static + Supabase school portal generator, but it previously suffered from four major defect classes:
1. role/permission overexposure
2. generated output consistency problems
3. CBT user-path ambiguity and interaction fragility
4. documentation and deployment ambiguity

This v1 package applies real source-level hardening and provides a truthful release baseline.

---

## A. Confirmed bugs and weaknesses found

### A1. Role navigation overexposure
**Problem:** non-admin roles could still see pages beyond their true responsibility because the UI often used lock styling instead of strict hiding/blocking.
**Risk:** students/parents/staff could see pages intended solely for admins or staff.
**Status:** fixed in source by changing non-admin nav behavior to hidden-disallowed and strengthening page-entry blocking.

### A2. Weak role inheritance model
**Problem:** admin role inheritance behavior was too broad conceptually and increased role leakage risk.
**Status:** hardened in source.

### A3. Page token visibility incomplete
**Problem:** page fragments relied on `data-admin-only` and `data-staff-only`, but broader role token enforcement was incomplete.
**Status:** expanded with role-specific visibility enforcement in runtime.

### A4. CRUD write controls were too permissive at UI action level
**Problem:** generic CRUD engine did not strongly enforce per-module write restrictions at the action layer.
**Status:** hardened with `canWrite()` checks for open/save/delete paths and action-column suppression.

### A5. Duplicate generated route risk
**Problem:** generator previously emitted both `academic_records.html` and `academic-records.html`.
**Status:** fixed in source by standardizing on underscore route output.

### A6. Missing social preview asset strategy
**Problem:** generated outputs previously referenced an OG asset that may not always be packaged.
**Status:** improved by switching template OG image reference to a guaranteed local logo asset strategy.

### A7. Public-page helper initialization gap
**Problem:** public pages skipped auth gating correctly, but helper initialization needed to be more resilient.
**Status:** improved in runtime initialization.

### A8. CBT teacher/student path confusion
**Problem:** users could open `cbt.html` and assume students should take the test there.
**Status:** improved by explicitly linking and messaging student path `cbt-exam.html` from teacher CBT manager page.

### A9. CBT calculator/symbol keyboard discoverability and focus fragility
**Problem:** tools existed, but user interaction could appear broken if a typed-answer field was not active or if users did not understand how to invoke them.
**Status:** improved by adding explicit exam-page tool buttons, focus helper, and fallback message.

### A10. Documentation overlap / stale assertions
**Problem:** multiple historical docs could create confusion and false confidence.
**Status:** corrected by shipping fresh v1 docs for current usage.

---

## B. Potential bugs and risks still requiring live QA
These are not falsely claimed fixed without runtime proof.

### B1. Real-data RLS scoping verification
Needs live Supabase testing for:
- parent-child isolation
- student self-only views
- staff subject/class-limited edit behavior

### B2. CBT end-to-end runtime under real exam data
Needs live testing for:
- exam creation
- exam opening
- student exam start
- save draft
- anti-cheat behavior
- scoring
- submission persistence
- report-card mapping

### B3. Browser/device-specific PWA behavior
Needs testing across:
- Chrome desktop
- Android Chrome
- Safari iOS
- Microsoft Edge

### B4. Notifications and service worker behavior
Needs live permission and subscription flow testing.

---

## C. Fixes applied in this release
1. standard route output normalized to underscore style
2. stricter non-admin navigation hiding
3. stronger role token enforcement on page fragments
4. stronger page-entry restriction behavior
5. CRUD action-level write restriction checks
6. safer OG image reference strategy
7. better public-page initialization behavior
8. clearer CBT teacher vs student pathing
9. improved CBT calculator/symbol-keyboard usability
10. refreshed authoritative docs and QA guides
11. generator-side duplicate-path validation hook

---

## D. Enterprise enhancement direction retained
The package still preserves and enhances the enterprise direction of the platform:
- admin command centre
- staff academic operations
- parent tracking and communication
- student learning access
- finance/HR/compliance/inventory
- CBT / report-card / analytics integration
- no paid AI API dependency
- free hosting compatibility

---

## E. Honest release conclusion
This package is substantially improved and more defensible than the earlier state, but the phrase “error free” should only be used after live role-by-role QA against a configured Supabase test project using real accounts.
