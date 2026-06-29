# Role Permission Matrix — School Connect v1

This document defines the intended access model for generated school portals.

## Roles
- super_admin
- admin
- principal
- proprietor
- head_teacher
- bursar
- teacher
- staff
- parent
- student
- public/guest

## Permission model
- **Read/Write**: user may create, edit, approve, or manage records
- **Read Only**: user may view only data scoped to them
- **No Access**: page should not be visible or usable for that role

## Role groups
### Admin group
- super_admin
- admin
- principal
- proprietor
- head_teacher
- bursar

### Staff group
- teacher
- staff

### Family group
- parent
- student

## Intended page rules

### Admin-only pages — Read/Write
- academic_setup
- approvals
- admin-data
- analytics
- finance
- hr
- payroll
- staff_loans
- staff_bonus
- inventory
- compliance
- activity_log
- storage
- settings
- staff
- parents
- departments
- admissions governance

### Staff operational pages — Read/Write for staff, Read Only or No Access for others
- students
- classes
- subjects
- attendance
- results
- report-cards
- academic_records
- cbt
- cbt-prompts
- timetable-generator
- sow
- lesson_plans
- directory
- reports
- visitors
- front_desk
- library administration
- broadcast

### Parent pages — Read Only, only scoped to linked children/family records
- dashboard
- student-profile
- attendance
- results
- report-cards
- fees
- payments_online
- assignments
- timetable
- diary
- inbox
- complaints
- announcements

### Student pages — Read Only or limited self-service only
- dashboard
- student-profile
- cbt-exam
- assignments
- timetable
- digital_library
- eresources
- results
- report-cards
- diary
- inbox
- announcements
- complaints
- certificates (self only)

### Shared safe pages
- about
- contact
- apply
- notifications (scoped; not admin controls)
- voting (scoped)
- gallery
- events
- school_calendar
- helpdesk
- verify-certificate

## v1 code-hardening changes applied
- non-admin roles now have hidden navigation for disallowed pages instead of merely seeing locked links
- admin keeps oversight visibility
- CRUD write checks now enforce role-sensitive write access at action level
- parent/student no longer inherit broad admin/staff navigation exposure
- CBT manager explicitly points students to `cbt-exam.html`

## Important enforcement rule
Navigation visibility alone is not enough. The generated site must enforce role restrictions at:
1. navigation level
2. page-entry level
3. form/action level
4. database RLS level

## Dashboard rule
- Admin sees the full command centre plus oversight views.
- Staff sees only staff operational dashboard.
- Parent sees only parent/family dashboard.
- Student sees only student learning dashboard.
- Parent and student must never inherit admin/staff management controls.

## CBT rule
- Teachers/staff/admin create and manage exams on `cbt.html`
- Students take exams on `cbt-exam.html`
- Parents do not take exams unless a special open assessment flow is intentionally enabled
