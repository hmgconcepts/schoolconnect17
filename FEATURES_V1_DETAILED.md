# School Connect v1 — Detailed Features Guide

School Connect is a free, static, browser-first school management platform generator that produces complete school portals powered by Supabase.

## Core philosophy
- no monthly software fee for the platform itself
- no paid AI API dependency
- free hosting compatible
- free Supabase-compatible backend
- generated site is owned by the school
- modular structure so schools can enable only what they need

## Major feature groups

## 1. Public Website and School Identity
### Landing page
A branded homepage introducing the school, key benefits, and portal entry points.

### About page
Explains the school, values, mission, and public-facing profile.

### Contact / Apply pages
Supports admissions inquiries and public contact workflow.

### SEO packaging
Supports robots, sitemap, metadata, Open Graph/Twitter metadata structure, and public discoverability.

## 2. Authentication and Access Control
### Supabase authentication
Handles sign-up, sign-in, approval flow, and session management.

### Role-based portal experience
Different users should see different dashboards, navigation, and data access.

### Approval workflow
New accounts can be created and later approved by school administrators.

## 3. Dashboards
### Admin dashboard
For school-wide supervision, governance, approvals, setup, finance, analytics, and compliance.

### Staff dashboard
For teachers/staff to manage attendance, academic records, CBT, assignments, and student operations.

### Parent dashboard
For parents to see only linked-child information such as fees, attendance, report cards, messages, and complaints.

### Student dashboard
For students to access timetable, assignments, exam-taking, results, report cards, diaries, resources, and self-facing information.

## 4. Student Information System
### Student directory
Stores biodata, class placement, guardian data, contact information, and operational identity.

### Student profile / 360 dashboard
Aggregates personal profile, attendance, results, fee history, and linked academic records.

### Parent-child mapping
Restricts family-level access so each parent sees only their own child or children.

## 5. Staff and School Administration
### Staff management
Teacher/staff records, role classification, and deployment across duties.

### Departments and academic structure
Departments, classes, arms, subjects, and school organizational setup.

### Approvals
Approves pending users and governs access.

## 6. Academic Operations
### Attendance
Daily/class attendance with role-based viewing and management.

### Results
Subject or student result handling.

### Report cards
Term-based report structure with configurable assessment columns.

### Academic records / broadsheets
Wider class-level result records and performance summaries.

### Scheme of work and lesson plans
Teacher planning and academic supervision tools.

### Timetable and timetable generator
Published timetable plus a generator for structured scheduling.

## 7. CBT / Online Exams
### CBT manager (`cbt.html`)
Teacher/admin page for creating exams, importing question sets, sharing codes, and viewing results.

### Student exam page (`cbt-exam.html`)
Student-facing page for taking live CBT assessments.

### Question types
Supports multiple structured test question types, including typed answers.

### Anti-cheat controls
Includes browser-based integrity checks such as focus-loss monitoring and timing controls.

### Calculator and mathematics/scientific keyboard
Provides on-screen assistance for typed STEM answers.

### Automatic grading and result transfer
Supports automatic grading and possible report-card integration.

## 8. Communication and Engagement
### Notifications
In-app and browser notification scaffolding.

### Inbox / messaging
Private or operational communication workflows.

### Broadcasts
Mass communication to groups.

### Voting and polls
School elections, preference polls, and announcement-linked decisions.

## 9. Finance and Enterprise Features
### Fees and payment tracking
Tracks balances, records, and fee-related information.

### Finance ledger
Supports broader finance visibility.

### Payroll / HR
Enterprise-level staff compensation and HR operations.

### Inventory / assets
Tracks school assets and resources.

### Compliance / activity log / storage
Supports governance, operational traceability, and administrative control.

## 10. Learning Support and Welfare
### Digital library
Access to learning resources.

### E-resources
Extended digital academic resources.

### Behaviour / support plans / counselling / health
Student welfare, pastoral care, and structured support systems.

## 11. Additional Enterprise Modules
The system also includes a large set of optional modules such as:
- alumni
n- hostel
- transport
- visitors
- front desk
- cafeteria/menu
- facility booking
- donations
- financial aid
- lost & found
- helpdesk
- certificates
- ID cards
- transcripts
- transfer certificates
- events and calendar

## Feature design policy for v1
No existing feature should be removed unnecessarily. The generator should instead:
- make access rules safer
- improve packaging quality
- improve setup guidance
- improve deployment clarity
- improve generated output consistency
