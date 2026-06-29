# School Connect v1 — Release Notes

## Summary
This package is a corrected and hardened School Connect generator release focused on:
- safer role/page access mapping
- cleaner dashboard separation by role
- stronger CBT usability guidance
- more accurate documentation
- deployment clarity
- preserving the existing free-tool architecture

## Core goals of this release
1. Keep all pre-existing features.
2. Improve role separation and reduce accidental over-exposure of pages.
3. Clarify setup and deployment using only free tools.
4. Keep the platform browser-first and Supabase-based.
5. Avoid paid AI APIs.

## Major audit findings addressed in this release package
- role/page permission mapping required deeper hardening
- dashboard separation required clearer parent/student/staff separation
- generated outputs needed stricter validation before delivery
- CBT student experience needed stronger pathing and clearer test flow
- documentation contained legacy/overlapping statements that needed cleanup

## Notes on verification
This release applies fixes that are deterministically verifiable in source/templates/docs and identifies the remaining live-database/browser-interaction steps that should be used during QA before client delivery.
