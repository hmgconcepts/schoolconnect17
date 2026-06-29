# School Connect V6 — Client-Site Generator Repair Report

Date: 2026-06-28

## Sites audited

- Generator: https://hmgconcepts.github.io/schoolconnect5/
- Generator repo: https://github.com/hmgconcepts/schoolconnect5
- Demo: https://hmgconcepts.github.io/gosa/
- Demo repo: https://github.com/hmgconcepts/gosa
- CBT reference: https://cbtsystem-hmgacademy.vercel.app/
- CBT repo inspected: https://github.com/hmgacademyhub/cbt-system

## Main repairs in this build

1. **Admin dashboard oversight**
   - Admin/Super Admin dashboard keeps the admin command centre and overview cards for staff/teacher, parent/payment and student dashboards.
   - Added a dedicated `teacher-overview.html` page so admin can inspect a staff/teacher operational dashboard from the Staff page.

2. **Role and privilege mapping**
   - Navigation remains role-filtered.
   - Staff/teacher can write operational records such as attendance/results, while parents/students remain read-only where appropriate.
   - CRUD action buttons are staff-gated instead of admin-only, so teachers can actually do permitted work.
   - Result editing/deleting is tightened by teacher ownership in SQL policy.

3. **Scores into student records**
   - Academic Records now includes a button to pull scores from CBT and Digital Library into the `results` academic record table.
   - Results now include `student_name`, `assessment_source`, and `assessment_ref` for traceability and safe upserts.

4. **Certificate verification**
   - Added public `verify-certificate.html`.
   - Added `verify_certificate(p_code text)` Supabase RPC to verify normal certificates and CBT certificate codes.

5. **Academic period RLS bug**
   - Added RLS policies for `academic_periods` and `lookups` so authenticated users can read and admins can write.
   - This addresses: `new row violate row-level security policy for table academic_periods`.

6. **Dedicated Parents page**
   - Added `parents.html` as a dedicated admin page for parent records and parent-child mapping.
   - Because this is a static site, secure password creation still happens through Supabase Auth signup/request access; the page generates/copies parent invitation instructions.

7. **CBT prompt structure**
   - Improved CBT prompt language to require **DOWNLOADABLE CSV ONLY** output.
   - Prompt guide now follows HMG CBT Pro-style structure: role, assessment context, output format, supported types, quality rules, type rules, and final CSV self-check.

8. **Entrance certificate blank page**
   - Removed the blank certificate call and added a direct printable certificate HTML generator for Entrance & Assessments.

9. **Score sheet and broadsheet**
   - Academic Records continues to provide subject broadsheet, class broadsheet and student record card.
   - It now also includes assessment-score pulling from CBT/Digital Library into academic records.

10. **Analytics**
   - Analytics page remains KPI-rich with students, staff, CBT exams/submissions, attendance, fees, donations, polls, complaints, admissions, assignments, library, events, announcements, check-ins, leave, visitors and help tickets, plus charts.

11. **Published timetable view**
   - Added dedicated `timetable.html` view showing the generated/published timetable in a weekly grid.
   - Auto-Timetable output can now be viewed by everyone through the Timetable page.

12. **CBT anti-cheat settings**
   - CBT creation modal now exposes anti-cheat controls learned from HMG CBT Pro:
     - tab/app switching
     - window blur/focus loss
     - copy/cut/paste/select-all blocking
     - right-click blocking
     - fullscreen monitoring
     - devtools/print/source shortcut detection
     - violation limit
     - math/science keyboard toggle

13. **Scheme of work**
   - Scheme of Work already supports weekly topic/content and a teacher confirmation checkbox. This is retained and documented.

14. **WA/Email/SMS messaging**
   - Added dedicated `messages.html` centre.
   - Staff choose audience/recipient, compose a message, then send using free WhatsApp, email or SMS deep links.
   - Messages are also logged in `module_records`.

15. **Gallery thumbnails**
   - Existing thumbnail rendering for gallery/media links is retained. Image/video links render as thumbnails when possible.

16. **Teacher record ownership**
   - New result rows receive `teacher_id` from the signed-in profile.
   - SQL policy allows result update/delete only by admin or the owning teacher.

17. **Developer page**
   - Developer page contains Adewale Samson Adeagbo’s name and complete HMG ecosystem information.

18. **Student/staff login details**
   - After adding student/staff with email, the system generates/copies safe login invitation instructions.
   - Static hosting cannot securely create passwords directly without a server-side service-role key; signup + admin approval remains the safe free approach.

19. **In-app inbox and messaging**
   - Messaging is now clarified through `messages.html`.
   - In-app inbox remains a read/reply/internal-message area; broadcast/outbound WA/email/SMS is handled through Messaging.

20. **Take Exam / CBT**
   - CBT exam page retains public code/link access, calculator, math keyboard, read-aloud, fullscreen and local autosave.
   - CBT creation now exposes anti-cheat settings.

21. **Dropdowns for registered data**
   - CBT exam creation now selects Subject, Class, Term and Session from registered Subjects/Classes/Lookups instead of typing them.
   - Other CRUD pages already use registered dropdowns where definitions exist.

22. **Role privilege checks**
   - Staff can write operational pages.
   - Parents/students remain read-only on shared pages.
   - Admin has full oversight.

23. **Parent-child dashboard mapping**
   - Parent dashboard now attempts to load the first child linked in `parent_child` when the signed-in user is a parent.
   - If no child is linked, it shows a clear message telling the parent to ask admin to link the child.

24. **Feature/privilege bug audit**
   - Added `verify-role-navigation.js` earlier and continued validating role visibility.
   - `bash verify.sh`, `node verify-generated-output.js`, and role checks pass.

25. **Read-only public school information**
   - Announcements and timetable are readable by all approved users; editing is staff/admin gated.

26. **Teacher attendance write**
   - CRUD action buttons now use staff gating, so teachers can create/edit allowed operational records such as attendance.

## Validation commands run

```bash
node --check assets/js/generator.js
node --check assets/js/templates.js
node --check assets/js/crud.js
for f in assets/js/*.js tools/*.js verify-generated-output.js verify-role-navigation.js; do node --check "$f"; done
bash verify.sh
node verify-generated-output.js
node verify-role-navigation.js
```

Result:

- `verify.sh`: Passed 168, Failed 0
- `verify-generated-output.js`: no failures
- `verify-role-navigation.js`: passed
- local HTML asset audit: 0 missing assets

## Deployment steps

### GitHub Pages

1. Unzip the supplied ZIP.
2. Open the generated folder.
3. Upload all files inside it to the GitHub repository root.
4. Commit and push to `main`.
5. Go to Settings → Pages.
6. Select Deploy from branch.
7. Select `main` and `/root`.
8. Save and wait for deployment.

### Vercel

1. Import the repo.
2. Framework: Other/Static.
3. Build command: empty.
4. Output directory: `/` or empty.
5. Deploy.

### Cloudflare Pages

1. Create Pages project.
2. Connect repo.
3. Framework: None.
4. Build command: empty.
5. Output directory: `/`.
6. Deploy.

### Supabase

1. Create free Supabase project.
2. Run SQL files in order:
   - `database/schema.sql`
   - `database/voting-schema.sql`
   - `database/cbt-schema.sql`
   - `database/reportcard-schema.sql`
   - `database/enterprise-schema.sql`
   - update SQL files if needed
3. Paste Supabase URL and anon key into generated `assets/js/config.js`.
4. Create first admin account through login/signup.
5. Approve admin/profile status in Supabase if necessary.

## Important

The existing GOSA site will not receive these fixes until you regenerate GOSA from this updated generator and redeploy the regenerated GOSA files.
