# Fix Plan for Generator Hardening

## Priority 1 — Role and permission hardening
- normalize role groups
- define per-module allowed roles clearly
- separate read/write UI actions from read-only views
- block non-admin roles from admin workflows at page level
- ensure parent/student dashboards remain distinct from staff/admin dashboards

## Priority 2 — Generated route consistency
- enforce underscore naming convention consistently
- avoid generating duplicate aliases
- validate route uniqueness before ZIP output

## Priority 3 — Asset integrity
- ensure required images exist
- ensure metadata references valid assets
- avoid broken social preview image references in generated outputs

## Priority 4 — CBT path clarity
- explain teacher page vs student exam page clearly
- validate generated exam pathing
- add QA rules for calculator and symbol keyboard behavior

## Priority 5 — Documentation integrity
- reduce stale overlapping claims
- keep one current deployment guide and one current feature guide
- include explicit free-tool policy and no-AI-API policy
