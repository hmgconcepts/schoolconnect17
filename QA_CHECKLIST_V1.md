# School Connect v1 — QA Checklist

Use this before any client delivery.

## A. Generator QA
- [ ] `index.html` loads
- [ ] `builder.html` loads
- [ ] preview works
- [ ] ZIP generation completes
- [ ] downloaded package keeps folder structure
- [ ] no duplicate route names
- [ ] no missing referenced local assets
- [ ] docs included

## B. Public page QA
- [ ] homepage loads
- [ ] about page loads
- [ ] guide page loads
- [ ] gallery loads
- [ ] notifications page loads
- [ ] install page loads
- [ ] metadata/social assets are present

## C. Authentication QA
- [ ] sign-up works
- [ ] sign-in works
- [ ] sign-out works
- [ ] pending users are blocked appropriately
- [ ] approved users can enter dashboard

## D. Role QA
### Admin
- [ ] sees admin dashboard only
- [ ] can access admin-only pages
- [ ] can approve users
- [ ] can manage setup pages

### Staff/Teacher
- [ ] sees staff dashboard only
- [ ] can manage attendance/results/report cards/CBT
- [ ] cannot use admin-only governance pages unless intentionally allowed

### Parent
- [ ] sees parent dashboard only
- [ ] sees only linked-child records
- [ ] cannot manage admin/staff academic records

### Student
- [ ] sees student dashboard only
- [ ] can access self-learning pages
- [ ] cannot access admin/staff write pages

## E. CBT QA
- [ ] exam can be created
- [ ] exam code generated
- [ ] exam can be opened
- [ ] student can start exam from `cbt-exam.html`
- [ ] question navigation works
- [ ] timer works
- [ ] radio answers work
- [ ] typed answer works
- [ ] calculator buttons are clickable
- [ ] symbol keyboard buttons are clickable
- [ ] inserted symbols go into active answer field
- [ ] submit works
- [ ] score saves
- [ ] result appears where expected

## F. Academic QA
- [ ] attendance entries save
- [ ] results save
- [ ] report-card columns work
- [ ] parent/student read-only views are correctly scoped

## G. PWA / Notifications QA
- [ ] service worker registers
- [ ] manifest loads
- [ ] install banner behaves correctly
- [ ] notifications page works without crashing

## H. Final packaging QA
- [ ] README is current
- [ ] deployment guide is current
- [ ] feature guide is current
- [ ] no false claims in docs
- [ ] ZIP is ready for GitHub upload
