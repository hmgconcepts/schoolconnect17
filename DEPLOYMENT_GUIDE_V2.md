# School Connect v2 — Detailed Deployment Guide

This guide is the current recommended deployment process for School Connect v2.

## Part A — Deploy the generator
1. Create a GitHub repository.
2. Upload all files from `school connect v2`.
3. Preserve the exact folder structure, including:
   - `assets/`
   - `database/`
   - root HTML files
   - `.nojekyll`
   - `manifest.json`
   - `sw.js`
4. Deploy via:
   - GitHub Pages, or
   - Vercel static deployment, or
   - Netlify / Cloudflare Pages static deployment.
5. No build command is required.
6. Test:
   - `index.html`
   - `builder.html`
   - `guide.html`
   - `cbt.html`
   - `notifications.html`

## Part B — Generate a school portal
1. Open the deployed generator.
2. Complete the wizard carefully.
3. Download the generated ZIP.
4. Extract the ZIP locally.
5. Confirm all folders/files are present.

## Part C — Create free Supabase backend
1. Go to Supabase.
2. Create a new project.
3. Save project password.
4. Wait for project to finish provisioning.
5. Open SQL Editor.
6. Run the required schema file(s) in documented order.

## Part D — Configure the generated portal
1. Open the generated portal's `assets/js/config.js`.
2. Paste:
   - Project URL
   - anon public key
3. Save the file.
4. Upload the generated portal to GitHub Pages, Vercel, Netlify, or Cloudflare Pages.

## Part E — Create first admin and test roles
1. Use sign-up/request-access.
2. Approve or elevate the first admin account from Supabase or admin flow.
3. Create and test at least these accounts:
   - admin
   - staff/teacher
   - parent
   - student
4. Verify all role dashboards and permissions.

## Part F — Mandatory pre-client QA
- admin can manage operational modules
- staff can manage academic modules
- parent can read child-linked records
- student can read self-linked records
- CBT manager works
- student exam page works
- calculator works in typed-answer exam flow
- symbol keyboard works in typed-answer exam flow
- messaging/complaints work
- results/report cards scope correctly

## Free-stack note
School Connect v2 is designed for:
- static hosting
- Supabase free tier
- no paid AI API
- no mandatory paid backend services
