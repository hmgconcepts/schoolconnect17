# School Connect v2 — Release Notes

## Focus of v2
This release directly addresses deployed-site role mapping failures discovered during real use:
- admin pages incorrectly read-only
- staff academic pages incorrectly blocked
- parent read pages incorrectly blocked
- student read pages incorrectly blocked
- family communication pages incorrectly blocked
- CBT usability confusion and action failures

## Major corrections in v2
1. Expanded module write mapping so admins can manage operational school pages, not just governance pages.
2. Restored admin write access for students, staff, classes, subjects, results, timetable, CBT, announcements, events, gallery, library, assignments, parent-child mapping, directory, departments, result broadcast, complaints, leave, visitors, hostel, transport, alumni-facing administration, promotion, finance, inventory, and related modules.
3. Restored staff access to academic pages such as attendance, results, CBT, report cards, broadsheets, lesson plans, scheme of work, timetable, announcements, inbox, complaints, certificates, and more.
4. Restored parent read access to fees, results, assignments, messages, complaints, report cards, attendance, timetable, and announcements.
5. Restored student read access to assignments, timetable, e-resources, results, report cards, certificates, complaints, inbox, and announcements.
6. Improved role visibility tokens for parent/student/family page actions.
7. Preserved the free-tool architecture and no-AI-API policy.

## Remaining reality-based note
This package is substantially improved, but final sign-off should still include live role-by-role QA against a configured Supabase test project.
