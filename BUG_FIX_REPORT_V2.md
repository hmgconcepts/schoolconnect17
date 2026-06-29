# Bug Fix Report — School Connect v2

This report responds to deployed-site feedback.

## Admin fixes targeted
- restored operational write access to major school modules
- ensured students/staff/classes/subjects/results/timetable/CBT and many others are not read-only for admin
- preserved parent menu availability in navigation through module map handling

## Staff fixes targeted
- restored access for attendance
- restored access for results
- restored access for CBT manager
- restored access for report cards
- restored access for broadsheets / academic records
- restored access for lesson plans
- restored access for scheme of work
- restored access for timetable and e-resources
- restored access for announcements, inbox, complaints, certificates, and related mapped pages

## Parent fixes targeted
- restored read access for fees
- restored read access for results
- restored read access for assignments
- restored read access for messages/inbox where enabled
- restored read access for complaints
- restored read access for report cards
- restored read access for attendance
- restored read access for timetable
- restored read access for announcements

## Student fixes targeted
- restored read access for assignments
- restored read access for timetable
- restored read access for e-resources
- restored read access for results
- restored profile path alignment expectation
- restored read access for certificates
- restored read access for complaints
- restored read access for inbox
- restored read access for announcements
- restored read access for report cards

## CBT usability targeted
- clarified staff vs student exam path
- preserved calculator and symbol keyboard support path in source
- retained need for live browser QA for final runtime confirmation

## Important note
These are source-level generator corrections. Final release confidence still depends on live generation and role-by-role QA with a configured Supabase backend.
