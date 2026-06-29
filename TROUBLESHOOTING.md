# School Connect Troubleshooting

## Menu flashes during load, then disappears

Cause: older generated builds hid navigation links after role/profile loading. If the Supabase profile was incomplete, pending, or had a lower role, the sidebar could become empty.

Fix in this repo: generated menus now stay visible. Restricted items are marked with a lock style instead of being removed.

If an already-deployed school site still has the bug, regenerate the school ZIP from this fixed builder or replace the generated site's `assets/js/app.js` with a fresh one produced by this version.

## Protected page redirects to login

This is normal when Supabase is configured and no user session exists. Sign in first, or leave Supabase URL/key blank for a pure demo-only build.

## Supabase configured but first admin is pending

Use the `approvals.html` page from an approved admin account, or update the first admin profile directly in Supabase:

```sql
update profiles
set role = 'admin', status = 'active'
where email = 'YOUR_ADMIN_EMAIL';
```

## Logo not showing

The generator now accepts common image formats and writes the correct extension. If a logo still fails, confirm the generated `assets/img/logo.*` file exists and that `window.SCHOOL.logoExt` in `assets/js/config.js` matches it.

## Offline/PWA cache shows old files

After redeploying, hard-refresh the browser and unregister the old service worker from DevTools > Application > Service Workers, or change the cache name in `sw.js`.
