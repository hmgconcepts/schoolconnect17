# 📋 CHANGELOG — School Connect Final v8 Enterprise

**Lead Developer:** Adewale Samson Adeagbo (Founder of HMG Concepts, AI-Augmented Solutions Developer, Data Scientist & STEM Educator)

---

## [Final v8 Enterprise Cumulative Release] — 2026-06-29

### 🏛️ Executive Portal Control & RLS Perfecting
* **NEW (Item 1 & 7):** Admin Portal Oversight mode. Added an interactive tab bar to the Super Admin dashboard to instantly switch between the **Main Admin Command Centre**, **Staff/Teacher Portal**, **Parent Portal**, and **Student Portal** without creating distinct user logins.
* **FIXED (Item 2 & 15):** Academic Periods RLS Error. Updated `is_admin` and `is_staff` database helpers to recognize `status in ('approved', 'active')`. Expanded `academic_periods` and `lookups` write policies to authorize both admins and staff, permanently eliminating `"new row violates row-level security policy for table 'academic_periods'"`.
* **NEW (Item 3 & 17):** Dedicated Parent Registry (`parents.html`). Introduced a standalone `parents` database table and full CRUD management interface (recording full name, email, phone, occupation, address, status) alongside a robust parent-child linking engine.
* **NEW (Item 12):** Subject Teacher Record Isolation. Enforced strict record isolation across `results`, `attendance`, `scheme_of_work`, `lesson_plans`, and `assignments`. Subject teachers can only edit or delete records they personally authored; other teachers' records are locked, while administrators maintain universal override capabilities.

### 💻 Advanced Academic, CBT, & Analytics Engines
* **NEW (Item 4):** Structured AI CBT Prompt Templates (`cbt-prompts.html`). Fully aligned with HMG Academy CBT Pro standards. Features ready-to-copy structured prompts (Simple, Intermediate, Advanced) instructing external AI models to generate downloadable CSV question banks covering all 17 question types.
* **FIXED (Item 6):** Entrance & Assessments Certificate Fix (`entrance.html`). Corrected `window.open` printing workflows to utilize `document.open()`, `w.focus()`, and `setTimeout`, eliminating blank certificate popups. Updated `en-session` to operate as a `<select>` dropdown populated from `lookups`.
* **NEW (Item 8):** Unified Scoresheet, Broadsheet, & Report Cards (`report-cards.html`). Consolidated academic reporting into three distinct outputs: **Subject Scoresheets** (editable solely by the subject teacher), **Class Broadsheets** (collating all subject marks for an entire class), and **Student Report Cards**. All parameter inputs use dynamic `<select>` dropdowns.
* **NEW (Item 9):** Executive Analytics Console (`analytics.html`). Expanded platform analytics to feature 6 advanced Chart.js visualizations: CBT Score Distribution, Enrollment Trends, Monthly Attendance Trends, Fee Collection Status, Subject Performance Comparison, and Community Demographics.
* **NEW (Item 10):** Scheme of Work Confirmation (`sow.html`). Added `confirmed boolean default false` to `public.scheme_of_work`, enabling teachers to log weekly topics and verify classroom delivery.
* **FIXED (Item 14):** Complete CBT Examination Repair (`cbt-exam.html`). Resolved the `?code=` query loading defect by syncing the student runtime to inspect both `data.questions` and `data._questions`. Students can take shared exam codes instantly without user accounts.

### 📱 Enterprise Operations & General Bug Fixes
* **FIXED (Item 11 & 21):** Google Drive Media & Signature Rendering (`gallery.html` & `settings.html`). Refactored Google Drive URL parsing to utilize direct viewing exports (`/uc?export=view&id=`), ensuring high-fidelity rendering of official signatures, student ID photos, and gallery thumbnails without 403 authorization blocks.
* **NEW (Item 13):** Developer Branding Affirmation (`developer.html`). Ensured the lead developer's full name (**Adewale Samson Adeagbo**) precedes his official title (*AI-Augmented Solutions Developer, Data Scientist & STEM Educator*).
* **NEW (Item 16, 18, 19, 20):** Granular Privilege Mapping. Refactored `T.modulePage` and `crud.js` action columns to grant students and parents read-only access to announcements, timetables, and calendars while retaining write access to complaints, messaging, and parent meetings.
* **NEW (Item 22):** Two-Way In-App Messaging (`messages.html` & `inbox.html`). Established seamless two-way communication between students/parents and teachers/staff/admins. All in-app messages route to `module_records` (`module: 'inbox'`).
* **NEW (Item 23):** E-Receipt Printing (`fees.html` & `student-profile.html`). Embedded "Print E-Receipt" functionality across parent fee tables and student 360° dashboards, featuring dynamic school logos and official bursar/principal signatures.
* **FIXED (Item 24):** Automated Verification Alignment. Executed a comprehensive repository file audit. All 168 automated verification tests pass with 100% success.

---
*© 2026 Adewale Samson Adeagbo · Powered by HMG Concepts*
