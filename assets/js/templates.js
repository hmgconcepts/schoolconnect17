/* ====================================================================
   templates.js — School Connect Gen v8
   Page template generators for the school sites produced by the wizard.
   Each generator returns a string of HTML.
   Fixes D-06 (every onclick now has a matching handler),
         D-07 (purpose-built forms per type),
         D-12 (currentSession auto),
         D-13 (all modules in nav),
         D-17 (role-based UI gating),
         D-18 (mobile drawer),
         D-19 (notifications bell),
         D-20 (dark mode).
   ==================================================================== */

const T = {

  /* Shared head & layout */
  head(config, title) {
    const fontLink = (config.font && config.font !== 'system' && config.font.css)
      ? `<link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(config.font.css)}&display=swap" rel="stylesheet">`
      : '';
    const theme = (window.SC.THEMES.find(t => t.id === config.themeId) || window.SC.THEMES[0]);
    const logoExt = config.logoExt || 'svg';
    const iconType = logoExt === 'svg' ? 'image/svg+xml' : 'image/' + (logoExt === 'jpg' ? 'jpeg' : logoExt);
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${T.esc(title)} • ${T.esc(config.schoolName)}</title>
<meta name="description" content="${T.esc(config.schoolName || 'School')} — ${T.esc(title)}. Free school management platform by HMG Concepts.">
<meta name="keywords" content="${T.esc(config.schoolName || 'School')}, school management, ${T.esc(config.shortName || '')}, HMG Concepts">
<meta name="theme-color" content="${theme.primary}">
<link rel="icon" type="${iconType}" href="assets/img/logo.${logoExt}">
<link rel="manifest" href="manifest.json">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fontLink}
<meta property="og:title" content="${T.esc(title)} • ${T.esc(config.schoolName)}">
<meta property="og:description" content="${T.esc(config.schoolName)} — Free school management by HMG Concepts">
<meta property="og:image" content="assets/img/logo.png">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="assets/css/style.css">
<style>
/* === Critical app-shell CSS (inlined as a safety net) ===
   Final UI/UX repair: stable, professional navigation for every layout.
   Prevents scattered icons/labels, fixes unsupported layout IDs, and keeps
   large module lists readable on desktop and mobile. */
:root{--primary:${config.themePrimary || theme.primary};--primary-dark:${config.themePrimary || theme.primary};--primary-light:${config.themeAccent || theme.accent};--accent:${config.themeAccent || theme.accent};--gradient:linear-gradient(135deg,${config.themePrimary || theme.primary},${config.themeAccent || theme.accent});--gradient-dark:linear-gradient(135deg,${config.themePrimary || theme.primary},${config.themeAccent || theme.accent});--font:'${T.esc((config.font && config.font.family) || config.fontFamily || 'Inter')}',system-ui,sans-serif;--sc-primary:${config.themePrimary || theme.primary};--sc-accent:${config.themeAccent || theme.accent}}
body{font-family:var(--font)!important;background:#f8fafc}
.app-layout{display:flex;min-height:100vh;background:#f8fafc;color:#0f172a}
.app-sidebar{width:286px;flex-shrink:0;background:rgba(255,255,255,.98);border-right:1px solid #e2e8f0;display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow:hidden;z-index:40;box-shadow:0 10px 25px rgba(15,23,42,.04)}
.app-brand{display:flex;align-items:center;gap:12px;padding:18px 16px;border-bottom:1px solid #e2e8f0;min-height:78px}
.app-brand img{width:44px;height:44px;border-radius:12px;object-fit:contain;flex-shrink:0;background:#f8fafc;border:1px solid #e2e8f0}
.app-brand strong{display:block;font-size:.98rem;font-weight:900;color:#0f172a;line-height:1.2;max-width:190px;white-space:normal}
.app-nav{display:flex;flex-direction:column;gap:4px;padding:12px 10px 18px;flex:1;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin}
.app-nav a{display:grid;grid-template-columns:32px minmax(0,1fr);align-items:center;gap:10px;min-height:42px;padding:8px 10px;border-radius:12px;color:#475569;text-decoration:none;font-size:.875rem;font-weight:700;line-height:1.2;white-space:normal;word-break:normal;transition:background .18s ease,color .18s ease,transform .18s ease}
.app-nav a:hover{background:#f1f5f9;color:var(--primary);transform:translateX(2px)}
.app-nav a.active{background:var(--gradient);color:#fff;box-shadow:0 8px 20px rgba(79,70,229,.22)}
body:not([data-role-ready="1"]) .app-nav a[data-role-allow]{display:none!important}.app-nav a[style*="display: none"]{display:none!important}
.app-nav a.nav-locked{opacity:.62}.app-nav a.nav-locked .app-nav-icon{filter:grayscale(.35)}.app-nav a.nav-locked::after{content:'🔒';font-size:.72rem;opacity:.65;justify-self:end}.app-nav a.nav-locked.active{opacity:1}
.app-nav-icon{width:32px;height:32px;min-width:32px;display:inline-flex;align-items:center;justify-content:center;font-size:1.05rem;line-height:1;border-radius:10px;background:rgba(79,70,229,.09);color:var(--primary);flex-shrink:0;overflow:hidden}
.app-nav a.active .app-nav-icon{background:rgba(255,255,255,.22);color:#fff}
.app-nav a span:last-child{overflow:hidden;text-overflow:ellipsis;display:block}
.app-main{flex:1;min-width:0;display:flex;flex-direction:column}
.app-topbar{display:flex;align-items:center;gap:14px;padding:13px 22px;background:rgba(255,255,255,.96);backdrop-filter:blur(10px);border-bottom:1px solid #e2e8f0;position:sticky;top:0;z-index:30;box-shadow:0 4px 18px rgba(15,23,42,.035)}
.app-page-title{font-size:1.2rem;font-weight:900;color:#0f172a;margin:0;letter-spacing:-.01em}
.app-content{padding:24px;flex:1;max-width:1400px;width:100%;margin:0 auto}
.card{border-radius:18px!important;border:1px solid #e2e8f0!important;box-shadow:0 8px 24px rgba(15,23,42,.06)!important}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-bottom:18px}.stat-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:18px;box-shadow:0 6px 18px rgba(15,23,42,.05)}.stat-value{font-size:1.8rem;font-weight:900;color:var(--primary)}.stat-label{font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:#64748b;font-weight:800}
/* Stable variants for all builder layout choices. Unsupported visual ideas are
   expressed as professional variations, not broken experimental layouts. */
.app-layout.topnav,.app-layout.cardhub,.app-layout.mega-menu,.app-layout.tabbed,.app-layout.dashboard-pro{flex-direction:column}
.app-layout.topnav .app-sidebar,.app-layout.cardhub .app-sidebar,.app-layout.mega-menu .app-sidebar,.app-layout.tabbed .app-sidebar,.app-layout.dashboard-pro .app-sidebar{width:100%;height:auto;max-height:210px;position:sticky;top:0;flex-direction:row;align-items:stretch;overflow:hidden;border-right:none;border-bottom:1px solid #e2e8f0}
.app-layout.topnav .app-brand,.app-layout.cardhub .app-brand,.app-layout.mega-menu .app-brand,.app-layout.tabbed .app-brand,.app-layout.dashboard-pro .app-brand{width:260px;min-width:260px;border-bottom:none;border-right:1px solid #e2e8f0}
.app-layout.topnav .app-nav,.app-layout.cardhub .app-nav,.app-layout.mega-menu .app-nav,.app-layout.tabbed .app-nav,.app-layout.dashboard-pro .app-nav{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(116px,150px);overflow-x:auto;overflow-y:hidden;padding:10px;align-items:center}
.app-layout.topnav .app-nav a,.app-layout.cardhub .app-nav a,.app-layout.mega-menu .app-nav a,.app-layout.tabbed .app-nav a,.app-layout.dashboard-pro .app-nav a{grid-template-columns:1fr;text-align:center;justify-items:center;gap:4px;min-height:68px;padding:8px 10px;font-size:.75rem}
.app-layout.topnav .app-nav-icon,.app-layout.cardhub .app-nav-icon,.app-layout.mega-menu .app-nav-icon,.app-layout.tabbed .app-nav-icon,.app-layout.dashboard-pro .app-nav-icon{margin:auto}
.app-layout.compact .app-sidebar,.app-layout.dock .app-sidebar{width:224px}.app-layout.compact .app-nav a,.app-layout.dock .app-nav a{font-size:.8rem;grid-template-columns:28px minmax(0,1fr)}.app-layout.compact .app-nav-icon,.app-layout.dock .app-nav-icon{width:28px;height:28px;min-width:28px}
.app-layout.expanded .app-sidebar{width:330px}.app-layout.minimalist .app-sidebar{box-shadow:none}.app-layout.floating .app-sidebar{margin:14px;border-radius:22px;height:calc(100vh - 28px);border:1px solid #e2e8f0}.app-layout.split-view .app-content,.app-layout.grid-master .app-content,.app-layout.masonry .app-content{max-width:1500px}
@media(max-width:900px){.app-sidebar,.app-layout.floating .app-sidebar{position:fixed!important;left:0;top:0;bottom:0;width:min(86vw,310px)!important;height:100vh!important;margin:0!important;border-radius:0!important;transform:translateX(-100%);transition:transform .25s ease;box-shadow:0 20px 40px rgba(0,0,0,.22);z-index:100}.app-sidebar.open{transform:translateX(0)}.app-layout.topnav .app-sidebar,.app-layout.cardhub .app-sidebar,.app-layout.mega-menu .app-sidebar,.app-layout.tabbed .app-sidebar,.app-layout.dashboard-pro .app-sidebar{flex-direction:column;align-items:stretch}.app-layout.topnav .app-brand,.app-layout.cardhub .app-brand,.app-layout.mega-menu .app-brand,.app-layout.tabbed .app-brand,.app-layout.dashboard-pro .app-brand{width:auto;min-width:0;border-right:none;border-bottom:1px solid #e2e8f0}.app-layout.topnav .app-nav,.app-layout.cardhub .app-nav,.app-layout.mega-menu .app-nav,.app-layout.tabbed .app-nav,.app-layout.dashboard-pro .app-nav{display:flex;flex-direction:column;overflow-y:auto;overflow-x:hidden}.app-layout.topnav .app-nav a,.app-layout.cardhub .app-nav a,.app-layout.mega-menu .app-nav a,.app-layout.tabbed .app-nav a,.app-layout.dashboard-pro .app-nav a{display:grid;grid-template-columns:32px minmax(0,1fr);justify-items:stretch;text-align:left;min-height:42px;font-size:.875rem}.app-content{padding:16px}.app-topbar{padding:12px 14px;gap:10px}.app-topbar .mobile-toggle{display:inline-flex;align-items:center;justify-content:center;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:10px;width:40px;height:40px;font-size:1.2rem;cursor:pointer}.user-chip{max-width:150px;overflow:hidden}.user-chip strong{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}}
@media(min-width:901px){.app-topbar .mobile-toggle{display:none}}
</style>
</head>
<body data-theme="${T.esc(config.themeId)}" data-school="${T.esc(config.schoolName)}" data-font="${T.esc(config.fontId || 'inter')}">`;
  },

  /* Top notification bell + install banner (always shown) */
  bellAndBanner(config) {
    const logoExt = (config && config.logoExt) || 'svg';
    return `
<div id="notif-bell" class="notif-bell" title="Notifications" data-chatbot>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
  <span id="notif-badge" class="notif-badge" style="display:none">0</span>
  <div id="notif-dropdown" class="notif-dropdown">
    <div style="padding:16px 20px;border-bottom:1px solid var(--gray-200);display:flex;justify-content:space-between;align-items:center">
      <strong style="color:var(--dark)">Notifications</strong>
      <button class="btn btn-sm btn-outline" onclick="Notifications.markAllRead()">Mark all read</button>
    </div>
    <div id="notif-list"><div class="toast-msg" style="padding:24px;text-align:center">Loading…</div></div>
  </div>
</div>

<div id="pwa-install-banner" class="pwa-install">
  <div class="pwa-install-header">
    <img src="assets/img/logo.${logoExt}" alt="" class="pwa-install-icon">
    <div style="flex:1">
      <div class="pwa-install-title">📲 Install School Connect</div>
      <div class="pwa-install-msg">Get push notifications for messages, broadcasts, polls and result slips — even when the app is closed.</div>
    </div>
    <button class="modal-close" data-pwa-action="dismiss" title="Dismiss">×</button>
  </div>
  <div class="pwa-install-actions">
    <button class="btn btn-outline btn-sm" data-pwa-action="never">Not now</button>
    <button class="btn btn-primary btn-sm" data-pwa-action="install">Install App</button>
  </div>
</div>

<div id="toast-container" class="toast-container"></div>`;
  },

  /* Modal markup */
  modal() {
    return `<div id="modal-backdrop" class="modal-backdrop" onclick="if(event.target===this)closeModal()">
  <div class="modal" onclick="event.stopPropagation()">
    <div class="modal-header">
      <h2 id="modal-title">Modal</h2>
      <button class="modal-close" onclick="closeModal()">×</button>
    </div>
    <div id="modal-body" class="modal-body"></div>
    <div id="modal-footer" class="modal-footer"></div>
  </div>
</div>`;
  },

  /* Login page */
  loginPage(config) {
    const theme = window.SC.THEMES.find(t => t.id === config.themeId) || window.SC.THEMES[0];
    return `${T.head(config, 'Sign in')}
${T.bellAndBanner(config)}
${T.modal()}
<div class="login-shell" style="min-height:100vh;background:var(--gradient);display:flex;align-items:center;justify-content:center;padding:40px 20px">
  <div class="login-card" style="background:white;padding:40px;border-radius:24px;box-shadow:var(--shadow-xl);max-width:440px;width:100%">
    <div style="text-align:center;margin-bottom:32px">
      <img src="assets/img/logo.${config.logoExt || 'svg'}" alt="${T.esc(config.schoolName)} logo" style="width:64px;height:64px;margin:0 auto 16px;border-radius:14px;object-fit:contain">
      <h1 style="font-size:1.8rem;font-weight:900;color:var(--dark);margin-bottom:4px">${T.esc(config.schoolName)}</h1>
      <p style="color:var(--gray-600);font-size:0.95rem">${T.esc(config.schoolMotto || 'School Management Portal')}</p>
    </div>
    <div id="auth-tabs" style="display:flex;gap:8px;background:var(--gray-100);padding:4px;border-radius:12px;margin-bottom:24px">
      <button class="btn btn-primary" id="tab-signin" onclick="App.switchAuthTab('signin')" style="flex:1">Sign in</button>
      <button class="btn btn-outline" id="tab-signup" onclick="App.switchAuthTab('signup')" style="flex:1">Request access</button>
    </div>
    <form id="signin-form" onsubmit="App.handleSignIn(event)" class="form">
      <div class="form-group"><label>Email</label><input class="form-input" type="email" name="email" required></div>
      <div class="form-group"><label>Password</label><input class="form-input" type="password" name="password" required minlength="8"></div>
      <button type="submit" class="btn btn-primary" style="width:100%">Sign in</button>
    </form>
    <form id="signup-form" onsubmit="App.handleSignUp(event)" class="form" style="display:none">
      <div class="form-group"><label>Full name</label><input class="form-input" name="full_name" required></div>
      <div class="form-group"><label>Email</label><input class="form-input" type="email" name="email" required></div>
      <div class="form-group"><label>Phone</label><input class="form-input" name="phone"></div>
      <div class="form-group"><label>Password (min 8 chars)</label><input class="form-input" type="password" name="password" required minlength="8"></div>
      <div class="form-group"><label>Role</label>
        <select class="form-select" name="role">
          <option value="parent">Parent</option>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary" style="width:100%">Request access</button>
      <p style="margin-top:12px;font-size:0.82rem;color:var(--gray-500);text-align:center">Your account will be reviewed by the school admin before sign-in is enabled.</p>
    </form>
    <p style="margin-top:24px;text-align:center;font-size:0.78rem;color:var(--gray-400)">
      Powered by <a href="${T.esc(config.hmgLink || 'https://hmgconcepts.pages.dev/')}" target="_blank" rel="noopener" style="color:var(--primary);font-weight:600">HMG Concepts</a>
    </p>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="assets/js/config.js"></script>
<script src="assets/js/notifications.js"></script>
<script src="assets/js/pwa-install.js"></script>
<script src="assets/js/site-help.js"></script>
<script src="assets/js/super.js"></script>
<script src="assets/js/enterprise.js"></script>
<script src="assets/js/crud.js"></script>
<script src="assets/js/app.js"></script>
<script>
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
  if (window.PWAInstall) PWAInstall.init();
  if (window.Super) Super.init(sb, window.SCHOOL);
  if (window.Enterprise) Enterprise.init(sb);
  if (window.CRUD) CRUD.init(sb);
  // App.init() (in app.js) already shows the Sign-in tab on public pages.
</script>
</body></html>`;
  },

  /* Builder-preview-only tab switcher. The GENERATED site uses App.switchAuthTab
     (in app.js) because templates.js is never shipped to the school site. */
  switchAuthTab(tab) {
    const s = document.getElementById('signin-form'); const u = document.getElementById('signup-form');
    const ts = document.getElementById('tab-signin'); const tu = document.getElementById('tab-signup');
    if (!s || !u) return;
    if (tab === 'signin') { s.style.display='block'; u.style.display='none'; if(ts)ts.className='btn btn-primary'; if(tu)tu.className='btn btn-outline'; }
    else                  { s.style.display='none';  u.style.display='block'; if(tu)tu.className='btn btn-primary'; if(ts)ts.className='btn btn-outline'; }
  },

  /* Standard page shell */
  shell(config, page, content, opts = {}) {
    const theme = window.SC.THEMES.find(t => t.id === config.themeId) || window.SC.THEMES[0];
    const navItems = T.allModules(config).map(m => ({ id: m.id, label: T.labelFor(m.id, m.name), href: m.id + '.html', icon: T.iconFor(m.id) }));
    const isLogin = opts.noShell;
    if (isLogin) return content;
    const layout = T.layoutClass(config.layout || 'sidebar');
    const roleAttr = opts.requireRole ? `data-require-role="${T.esc(opts.requireRole)}"` : '';
    return `${T.head(config, page)}
${T.bellAndBanner(config)}
${T.modal()}
<div class="app-layout ${T.esc(layout)}" ${roleAttr}>
  ${T.renderNav(config, navItems, page)}
  <main class="app-main">
    <header class="app-topbar">
      <button class="mobile-toggle" onclick="App.toggleSidebar()" title="Menu">☰</button>
      <h1 class="app-page-title">${T.esc(page)}</h1>
      <div style="margin-left:auto;display:flex;align-items:center;gap:12px">
        ${config.campuses && config.campuses.length > 1 ? T.campusSwitcher(config) : ''}
        <button class="btn btn-sm btn-outline" onclick="if(window.Super)Super.chatbot.explainPage()" title="About this page">ℹ️ Help</button>
        <div class="user-chip" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border:1px solid var(--gray-200);border-radius:999px;background:var(--white)"><span>👤</span><span><strong id="user-display-name">Guest</strong><small id="user-display-role" style="display:block;color:var(--gray-500);line-height:1">not signed in</small></span></div>
        <button class="btn btn-sm btn-outline" onclick="App.toggleDarkMode()" title="Toggle theme">🌙</button>
        <button class="btn btn-sm btn-outline" onclick="App.signOut()" data-signout style="display:none">Sign out</button>
      </div>
    </header>
    <div class="app-content">
      ${content}
    </div>
    <footer style="padding:20px 28px;border-top:1px solid var(--gray-200);font-size:0.82rem;color:var(--gray-500);text-align:center">
      © ${new Date().getFullYear()} ${T.esc(config.schoolName)} · Built by <a href="https://cssadewale.pages.dev" target="_blank" rel="noopener">Adewale Samson Adeagbo</a> · Powered by <a href="${T.esc(config.hmgLink || 'https://hmgconcepts.pages.dev/')}" target="_blank" rel="noopener">HMG Concepts</a> · <a href="developer.html">About the developer</a>
    </footer>
  </main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="assets/js/config.js"></script>
<script src="assets/js/notifications.js"></script>
<script src="assets/js/voting.js"></script>
<script src="assets/js/pwa-install.js"></script>
<script src="assets/js/site-help.js"></script>
<script src="assets/js/super.js"></script>
<script src="assets/js/enterprise.js"></script>
<script src="assets/js/crud.js"></script>
<script src="assets/js/app.js"></script>
<script>
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').then(reg => { Notifications.init(sb, reg); Voting.init(sb); });
  else { Notifications.init(sb); Voting.init(sb); }
  PWAInstall.init();
  if (window.Super) Super.init(sb, window.SCHOOL);
  if (window.Enterprise) Enterprise.init(sb);
  if (window.CRUD) CRUD.init(sb);
</script>
</body></html>`;
  },

  /* Campus switcher dropdown */
  campusSwitcher(config) {
    return `<select class="form-select" style="padding:6px 12px;font-size:0.85rem" onchange="App.switchCampus(this.value)">
      ${config.campuses.map(c => `<option value="${T.esc(c)}">${T.esc(c)}</option>`).join('')}
    </select>`;
  },

  /* Sidebar nav */
  renderNav(config, items, current) {
    return `<aside class="app-sidebar" id="app-sidebar">
      <div class="app-brand">
        <img src="assets/img/logo.${config.logoExt || 'svg'}" alt="${T.esc(config.schoolName)}" style="object-fit:contain" onerror="this.onerror=null;this.replaceWith(Object.assign(document.createElement('div'),{textContent:('${T.esc((config.shortName||config.schoolName||'S')[0])}'),style:'width:40px;height:40px;border-radius:10px;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900'}))">
        <div>
          <strong>${T.esc(config.schoolName)}</strong>
          <div style="font-size:0.7rem;color:var(--gray-500)">${T.esc(config.shortName || '')}</div>
        </div>
      </div>
      <nav class="app-nav">
        ${items.map(i => `<a href="${T.esc(i.href)}" data-module-id="${T.esc(i.id)}" data-role-allow="${T.esc(T.roleAllow(i.id))}" class="${i.href === (current || '').toLowerCase() + '.html' ? 'active' : ''}">
          <span class="app-nav-icon">${i.icon}</span>
          <span>${T.esc(i.label)}</span>
        </a>`).join('')}
      </nav>
      <div style="margin-top:auto;padding:16px;border-top:1px solid var(--gray-200);font-size:0.78rem;color:var(--gray-500)">
        Powered by <a href="${T.esc(config.hmgLink || 'https://hmgconcepts.pages.dev/')}" target="_blank" rel="noopener">HMG Concepts</a>
      </div>
    </aside>`;
  },

  layoutClass(layout) {
    const map = {
      layout0:'sidebar', sidebar:'sidebar',
      layout1:'topnav', topnav:'topnav',
      layout2:'cardhub', layout3:'bottomnav', layout4:'dual-sidebar', layout5:'mega-menu',
      layout6:'minimalist', layout7:'split-view', layout8:'tabbed', layout9:'masonry',
      layout10:'dashboard-pro', layout11:'compact', layout12:'expanded', layout13:'floating',
      layout14:'dock', layout15:'vertical-hub', layout16:'grid-master'
    };
    return map[layout] || layout || 'sidebar';
  },

  roleAllow(id) {
    const admin = 'super_admin admin principal proprietor head_teacher bursar';
    const staff = admin + ' staff teacher';
    const parent = 'parent';
    const learner = 'student';
    const allUsers = admin + ' staff teacher parent student';
    const publicPages = 'any all public ' + allUsers;
    const map = {
      // Safe common pages
      dashboard: allUsers, notifications: allUsers, inbox: allUsers, 'verify-certificate': publicPages, 'teacher-overview': admin, 'feature-guide': allUsers, about: publicPages, contact: publicPages, apply: publicPages,
      announcements: allUsers, events: allUsers, school_calendar: allUsers, voting: allUsers, gallery: allUsers, eresources: staff + ' ' + parent + ' ' + learner, lost_found: allUsers, helpdesk: allUsers,

      // Admin-only governance, finance, HR, security and school-control pages
      academic_setup: admin, staff: admin, departments: admin, parents: admin, admissions: admin, approvals: admin, admin_data: admin, 'admin-data': admin,
      analytics: admin, finance: admin, hr: admin, payroll: admin, staff_loans: admin, staff_bonus: admin, appraisals: admin, inventory: admin, compliance: admin,
      activity_log: admin, storage: admin, settings: admin, promotion: admin, alumni: admin, financial_aid: admin + ' ' + parent, donations: admin + ' ' + parent,

      // Staff/teacher operational pages
      students: admin + ' ' + staff, classes: admin + ' ' + staff, subjects: admin + ' ' + staff, academic_records: admin + ' ' + staff, 'academic-records': admin + ' ' + staff, cbt: admin + ' ' + staff, 'cbt-prompts': admin + ' ' + staff, entrance: admin + ' ' + staff,
      'timetable-generator': admin + ' ' + staff, sow: admin + ' ' + staff, lesson_plans: admin + ' ' + staff, messages: allUsers, broadcast: admin + ' ' + staff, reports: admin + ' ' + staff, directory: admin + ' ' + staff, leave: admin + ' ' + staff, visitors: admin + ' ' + staff,
      front_desk: admin + ' ' + staff, document_builder: admin + ' ' + staff, fleet_tracking: admin + ' ' + staff, facility_booking: admin + ' ' + staff, rubrics: admin + ' ' + staff, substitutions: admin + ' ' + staff, book_request: admin + ' ' + staff + ' ' + learner,

      // Shared pages, still data-scoped by RLS and page logic
      attendance: admin + ' ' + staff + ' ' + parent + ' ' + learner, results: admin + ' ' + staff + ' ' + parent + ' ' + learner, 'report-cards': admin + ' ' + staff + ' ' + parent + ' ' + learner,
      'student-profile': admin + ' ' + staff + ' ' + parent + ' ' + learner, fees: admin + ' ' + parent, payments_online: admin + ' ' + parent,
      timetable: allUsers, assignments: admin + ' ' + staff + ' ' + parent + ' ' + learner, digital_library: admin + ' ' + staff + ' ' + parent + ' ' + learner,
      lms: admin + ' ' + staff + ' ' + learner, gamification: admin + ' ' + staff + ' ' + learner, conduct: admin + ' ' + staff + ' ' + parent,
      behaviour: admin + ' ' + staff + ' ' + parent + ' ' + learner, support_plans: admin + ' ' + staff + ' ' + parent + ' ' + learner, counselling: admin + ' ' + staff + ' ' + parent + ' ' + learner,
      health: admin + ' ' + staff + ' ' + parent, transport: admin + ' ' + staff + ' ' + parent + ' ' + learner, hostel: admin + ' ' + staff + ' ' + parent + ' ' + learner,
      library: admin + ' ' + staff, menu: admin + ' ' + staff + ' ' + parent + ' ' + learner, cafeteria: admin + ' ' + staff + ' ' + parent + ' ' + learner,
      parent_meeting: admin + ' ' + staff + ' ' + parent, complaints: admin + ' ' + staff + ' ' + parent + ' ' + learner, idcards: admin + ' ' + staff + ' ' + parent + ' ' + learner,
      certificates: admin + ' ' + staff + ' ' + learner, transcripts: admin + ' ' + staff + ' ' + parent + ' ' + learner, transfer_cert: admin + ' ' + staff, checkin: admin + ' ' + staff + ' ' + learner,
      diary: admin + ' ' + staff + ' ' + parent + ' ' + learner, surveys: admin + ' ' + staff + ' ' + parent + ' ' + learner, career_counseling: admin + ' ' + staff + ' ' + learner,
      'cbt-exam': publicPages, developer: allUsers
    };
    return map[id] || staff;
  },

  iconFor(id) {
    const map = {
      dashboard:'🏠', about:'🏫', contact:'☎️', apply:'📝', 'feature-guide':'📘', 'verify-certificate':'🔎', 'teacher-overview':'👨‍🏫', 'cbt-exam':'🧪', 'academic-records':'📄', academic_setup:'⚙️', students:'👨‍🎓', staff:'👨‍🏫', classes:'📚', attendance:'📋', results:'📊',
      timetable:'🗓️', sow:'📋', cbt:'💻', assignments:'📝', library:'📖', conduct:'⚖️', health:'🩺',
      promotion:'🎓', fees:'💰', finance:'💵', leave:'🏖️', visitors:'🚪', transport:'🚌',
      announcements:'📢', events:'🎭', messages:'📱', inbox:'💬', complaints:'📨', broadcast:'📨',
      voting:'🗳️', gallery:'🖼️', eresources:'📁', birthdays:'🎂', idcards:'🪪', reports:'📈',
      directory:'🔍', departments:'🏢', parents:'👨‍👩‍👧', admissions:'📝', hr:'💼', hostel:'🛏️',
      alumni:'🤝', inventory:'📦', certificates:'📜', analytics:'📊',
      school_calendar:'📅', lost_found:'🔍', parent_meeting:'👥', book_request:'📖',
      lms:'🎓', gamification:'🏅', cafeteria:'🍽️', financial_aid:'🎗️', front_desk:'🛎️',
      career_counseling:'🧭', document_builder:'🧾', fleet_tracking:'🛰️', facility_booking:'🏟️', compliance:'✅',
      activity_log:'🧮', lesson_plans:'🗒️', behaviour:'🏅', support_plans:'🧩',
      donations:'💝', substitutions:'🔁', helpdesk:'🆘', payments_online:'💳', notifications:'🔔',
      'report-cards':'🧾', 'admin-data':'🗄️', flyer:'📰', approvals:'✅', 'timetable-generator':'🗓️', checkin:'📲', diary:'📔', surveys:'🗒️', menu:'🍽️', settings:'⚙️',
      digital_library:'📚', 'cbt-prompts':'🧩', entrance:'🎯', storage:'🗄️', developer:'👨‍💻',
      payroll:'🧾', staff_loans:'🏦', staff_bonus:'🎁', appraisals:'⭐', 'student-profile':'👤', academic_records:'📄',
      rubrics:'📐', transcripts:'🎓', transfer_cert:'📄', counselling:'💬'
    };
    return map[id] || '◦';
  },

  /* Clean, UNIQUE short nav labels (fixes duplicate "Results/Timetable/School"
     collisions caused by name.split(' ')[0]). Falls back to the module name. */
  labelFor(id, fallbackName) {
    const map = {
      dashboard:'Dashboard', about:'About', contact:'Contact', apply:'Apply', 'feature-guide':'Feature Guide', 'verify-certificate':'Verify Certificate', 'teacher-overview':'Teacher Overview', 'cbt-exam':'Take Exam', 'student-profile':'Student Profile', 'academic-records':'Academic Records', academic_setup:'Academic Setup', students:'Students', staff:'Staff', classes:'Classes',
      attendance:'Attendance', results:'Results', timetable:'Timetable',
      'timetable-generator':'Auto-Timetable', sow:'Scheme', cbt:'CBT', assignments:'Assignments',
      library:'Library', conduct:'Conduct', health:'Health', promotion:'Promotion',
      fees:'Fees', finance:'Finance', leave:'Leave', visitors:'Visitors', transport:'Transport',
      announcements:'Announcements', events:'Events', messages:'Messaging', inbox:'Inbox',
      complaints:'Complaints', broadcast:'Result Broadcast', voting:'Voting', notifications:'Notifications', gallery:'Gallery',
      eresources:'E-Resources', birthdays:'Birthdays', idcards:'ID Cards', reports:'Reports',
      directory:'Directory', departments:'Departments', parents:'Parent–Child', admissions:'Admissions',
      hr:'HR & Payroll', hostel:'Hostel', alumni:'Alumni', inventory:'Inventory',
      certificates:'Certificates', analytics:'Analytics', school_calendar:'Calendar',
      lost_found:'Lost & Found', parent_meeting:'PTA Meeting', book_request:'Book Request',
      lms:'LMS', gamification:'Gamification', cafeteria:'Cafeteria', financial_aid:'Financial Aid',
      front_desk:'Front Desk', career_counseling:'Career', document_builder:'Documents',
      fleet_tracking:'Fleet', facility_booking:'Facilities', compliance:'Compliance',
      activity_log:'Activity Log', lesson_plans:'Lesson Plans', behaviour:'Behaviour',
      support_plans:'Support Plans', donations:'Donations', substitutions:'Substitutions',
      helpdesk:'Help Desk', payments_online:'Online Pay', 'report-cards':'Report Cards',
      'admin-data':'Admin Data', approvals:'Approvals', flyer:'Flyer', checkin:'QR Check-in', diary:'Diary',
      surveys:'Surveys', menu:'Menu', academic_records:'Records'
    };
    return map[id] || fallbackName || id;
  },

  /* Get list of all pages/modules for this school.
     Repair v2: generated school sites ship many dedicated pages outside the
     chosen module list (student profile, CBT exam, apply/contact/about, etc.).
     The navigator must therefore be a complete portal map, not only a copy of
     config.modules. */
  allModules(config) {
    const byId = id => (window.SC.MODULES || []).find(m => m.id === id) || { id, name: T.labelFor(id, id) };
    const base = ['dashboard'];
    const catalogIds = (window.SC.MODULES || []).map(m => m.id);
    const selected = Array.isArray(config.modules) ? config.modules.slice() : [];
    const dedicatedPages = ['student-profile','cbt-exam','verify-certificate','teacher-overview','feature-guide','about','contact','apply','notifications'];
    const ids = [...new Set(base.concat(selected, catalogIds, dedicatedPages))].filter(Boolean);
    return ids.map(id => byId(id));
  },

  /* ---------- Dashboard ---------- */
  dashboard(config) {
    const adminLinks = [
      ['Academic Setup','academic_setup.html'],['Approvals','approvals.html'],['Students','students.html'],['Staff','staff.html'],['Parents','parents.html'],['Classes','classes.html'],['Subjects','subjects.html'],['Departments','departments.html'],
      ['Admissions','admissions.html'],['Finance','finance.html'],['Fees','fees.html'],['Payroll','payroll.html'],['Staff Loans','staff_loans.html'],['Staff Bonus','staff_bonus.html'],['Appraisals','appraisals.html'],
      ['Analytics','analytics.html'],['Admin Data','admin-data.html'],['Storage','storage.html'],['Compliance','compliance.html'],['Activity Log','activity_log.html'],['Settings','settings.html'],
      ['Timetable Generator','timetable-generator.html'],['QR Check-in','checkin.html'],['Surveys','surveys.html'],['Menu Planner','menu.html'],['Fleet','fleet_tracking.html'],['Facilities','facility_booking.html'],['Inventory','inventory.html'],['Documents','document_builder.html'],
      ['ID Cards','idcards.html'],['Certificates','certificates.html'],['Flyer','flyer.html'],['Broadcast','broadcast.html'],['Announcements','announcements.html'],['Voting','voting.html']
    ];
    const staffLinks = [
      ['Attendance','attendance.html'],['Results','results.html'],['CBT Manager','cbt.html'],['CBT Prompts','cbt-prompts.html'],['Report Cards','report-cards.html'],['Academic Records','academic_records.html'],['Assignments','assignments.html'],['Scheme of Work','sow.html'],['Lesson Plans','lesson_plans.html'],['Timetable','timetable.html'],['Digital Library','digital_library.html'],['Library','library.html'],['Behaviour','behaviour.html'],['Support Plans','support_plans.html'],['Diary','diary.html'],['Messages','messages.html'],['Inbox','inbox.html'],['Students','students.html']
    ];
    const parentLinks = [
      ['Child Dashboard','student-profile.html'],['Fees / Balance','fees.html'],['Results','results.html'],['Report Cards','report-cards.html'],['Attendance','attendance.html'],['Assignments','assignments.html'],['Diary','diary.html'],['Timetable','timetable.html'],['Messages','inbox.html'],['Announcements','announcements.html'],['Complaint','complaints.html'],['Apply / Admissions','apply.html']
    ];
    const studentLinks = [
      ['Take CBT','cbt-exam.html'],['Assignments','assignments.html'],['Digital Library','digital_library.html'],['E-Resources','eresources.html'],['Timetable','timetable.html'],['Results','results.html'],['Report Cards','report-cards.html'],['My Profile','student-profile.html'],['Diary','diary.html'],['Announcements','announcements.html'],['Inbox','inbox.html'],['Complaints','complaints.html'],['Certificates','certificates.html']
    ];
    const buttons = arr => arr.map(x => `<a class="btn btn-outline btn-sm" href="${x[1]}">${T.esc(x[0])}</a>`).join('');
    return T.shell(config, 'Dashboard', `
      <div class="card" style="margin-bottom:18px;background:var(--gradient);color:#fff">
        <h2 style="margin:0;color:#fff">Welcome, <span id="dash-user-name">User</span></h2>
        <p style="margin:4px 0 0;opacity:.9">Role: <strong id="dash-user-role">—</strong>. This dashboard is role-specific; your quick actions are separated from other users' tools.</p>
        <div id="dash-quick-links" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px"></div>
      </div>

      <section id="dash-sec-admin" data-dash-role="super_admin admin" style="display:none">
        <div class="card" style="margin-bottom:18px;background:#f8fafc;border:1px solid #e2e8f0">
          <h3 style="margin-top:0">👁️ Admin Portal Oversight & Switching</h3>
          <p style="color:var(--gray-600);margin-bottom:12px">Instantly view and inspect the live portal experience for any user role (Staff, Parent, Student) right from your admin console.</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            <button class="btn btn-primary btn-sm" onclick="['dash-sec-admin','dash-sec-staff','dash-sec-parent','dash-sec-student'].forEach(id=>{var e=document.getElementById(id);if(e)e.style.display='none';});document.getElementById('dash-sec-admin').style.display='block';">🏛️ Main Admin Command Centre</button>
            <button class="btn btn-outline btn-sm" onclick="['dash-sec-admin','dash-sec-staff','dash-sec-parent','dash-sec-student'].forEach(id=>{var e=document.getElementById(id);if(e)e.style.display='none';});document.getElementById('dash-sec-staff').style.display='block';">👨‍🏫 Inspect Staff/Teacher Portal</button>
            <button class="btn btn-outline btn-sm" onclick="['dash-sec-admin','dash-sec-staff','dash-sec-parent','dash-sec-student'].forEach(id=>{var e=document.getElementById(id);if(e)e.style.display='none';});document.getElementById('dash-sec-parent').style.display='block';">👨‍👩‍👧 Inspect Parent Portal</button>
            <button class="btn btn-outline btn-sm" onclick="['dash-sec-admin','dash-sec-staff','dash-sec-parent','dash-sec-student'].forEach(id=>{var e=document.getElementById(id);if(e)e.style.display='none';});document.getElementById('dash-sec-student').style.display='block';">🎓 Inspect Student Portal</button>
          </div>
        </div>
        <div class="stats-grid">
          <div class="stat-card"><div class="stat-value" id="stat-students">—</div><div class="stat-label">Students</div></div>
          <div class="stat-card"><div class="stat-value" id="stat-staff">—</div><div class="stat-label">Staff</div></div>
          <div class="stat-card"><div class="stat-value" id="stat-fees">—</div><div class="stat-label">Fees Paid</div></div>
          <div class="stat-card"><div class="stat-value" id="stat-announcements">—</div><div class="stat-label">Notices</div></div>
        </div>
        <div class="grid grid-2">
          <div class="card"><h3>🏛️ Admin / Super Admin Command Centre</h3><p>Full school-control dashboard: setup, users, approvals, academics, finance, HR, compliance, records, backups and communications.</p><div style="display:flex;gap:8px;flex-wrap:wrap">${buttons(adminLinks)}</div></div>
          <div class="card"><h3>📊 Executive Analytics</h3><p style="color:var(--gray-600);margin-bottom:10px">Whole-school KPIs for proprietor/principal oversight.</p><canvas id="dash-chart" style="margin-top:12px;max-height:240px"></canvas></div>
          <div class="card"><h3>⚙️ Setup & Governance</h3><p>Start here for sessions, terms, classes, subjects, departments, user approvals, roles, settings and audit logs.</p><div style="display:flex;gap:8px;flex-wrap:wrap">${buttons(adminLinks.slice(0,8).concat(adminLinks.slice(18,22)))}</div></div>
          <div class="card"><h3>💰 Finance, HR & Operations</h3><p>Track payments, fee balances, payroll, loans, bonuses, inventory, transport, facilities, compliance and storage.</p><div class="stats-grid" style="margin:12px 0"><div class="stat-card"><div class="stat-value" id="ov-parent-fees">—</div><div class="stat-label">Fee Payments</div></div><div class="stat-card"><div class="stat-value" id="ov-payroll">—</div><div class="stat-label">Payroll Rows</div></div><div class="stat-card"><div class="stat-value" id="ov-inventory">—</div><div class="stat-label">Inventory Items</div></div></div><div style="display:flex;gap:8px;flex-wrap:wrap">${buttons(adminLinks.slice(9,18).concat(adminLinks.slice(22,28)))}</div></div>
          <div class="card"><h3>👨‍🏫 Staff / Teacher Dashboard Overview</h3><p><strong>Admin oversight view:</strong> supervise teacher work without turning the admin into a staff user. Track attendance coverage, result entry, CBT activity, lesson plans, scheme-of-work progress, messages and class records.</p><div class="stats-grid" style="margin:12px 0"><div class="stat-card"><div class="stat-value" id="ov-staff-count">—</div><div class="stat-label">Staff</div></div><div class="stat-card"><div class="stat-value" id="ov-attendance">—</div><div class="stat-label">Attendance Rows</div></div><div class="stat-card"><div class="stat-value" id="ov-cbt-open">—</div><div class="stat-label">CBT Exams</div></div><div class="stat-card"><div class="stat-value" id="ov-results">—</div><div class="stat-label">Results Rows</div></div></div><div style="display:flex;gap:8px;flex-wrap:wrap">${buttons(staffLinks)}</div></div>
          <div class="card"><h3>👨‍👩‍👧 Parent & Payment Dashboard Overview</h3><p><strong>Admin oversight view:</strong> monitor linked children, fee tracking, parent complaints, admissions, payment follow-up, messages and parent communication without exposing this management view to parents.</p><div class="stats-grid" style="margin:12px 0"><div class="stat-card"><div class="stat-value" id="ov-parents">—</div><div class="stat-label">Parent Links</div></div><div class="stat-card"><div class="stat-value" id="ov-complaints">—</div><div class="stat-label">Complaints</div></div><div class="stat-card"><div class="stat-value" id="ov-applications">—</div><div class="stat-label">Applications</div></div><div class="stat-card"><div class="stat-value" id="ov-messages">—</div><div class="stat-label">Messages</div></div></div><div style="display:flex;gap:8px;flex-wrap:wrap">${buttons(parentLinks.concat([['All Parents','parents.html'],['Finance Summary','finance.html'],['Approvals','approvals.html'],['Free WhatsApp Follow-up','messages.html']]))}</div></div>
          <div class="card"><h3>🎓 Student Dashboard Overview</h3><p><strong>Admin oversight view:</strong> inspect the student experience for learning supervision, safeguarding and intervention: resources, assignments, timetable, results, report cards, profiles, certificates, diaries and support needs.</p><div class="stats-grid" style="margin:12px 0"><div class="stat-card"><div class="stat-value" id="ov-assignments">—</div><div class="stat-label">Assignments</div></div><div class="stat-card"><div class="stat-value" id="ov-behaviour">—</div><div class="stat-label">Behaviour Rows</div></div><div class="stat-card"><div class="stat-value" id="ov-support">—</div><div class="stat-label">Support Plans</div></div><div class="stat-card"><div class="stat-value" id="ov-library">—</div><div class="stat-label">Library Items</div></div></div><div style="display:flex;gap:8px;flex-wrap:wrap">${buttons(studentLinks.concat([['All Students','students.html'],['Promotion','promotion.html'],['Behaviour','behaviour.html'],['Support Plans','support_plans.html'],['Health','health.html']]))}</div></div>
          <div class="card"><h3>🧭 Role Separation Rule</h3><p><strong>Implemented:</strong> Staff/teacher see staff dashboard only. Parent sees parent dashboard only. Student sees student dashboard only. Admin/Super Admin see the admin dashboard plus overview cards of staff, parent/payment and student dashboards for management, supervision, fee tracking, safeguarding and accountability.</p><div style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn btn-outline btn-sm" href="analytics.html">Analytics</a><a class="btn btn-outline btn-sm" href="activity_log.html">Audit Trail</a><a class="btn btn-outline btn-sm" href="student-profile.html">Open Student Profile</a><a class="btn btn-outline btn-sm" href="fees.html">Track Payments</a></div></div>
        </div>
      </section>

      <section id="dash-sec-staff" data-dash-role="staff" style="display:none">
        <div class="card" data-admin-only style="margin-bottom:16px;background:#fef3c7;border-color:#f59e0b"><h3 style="margin:0">👁️ Admin Oversight Mode (Staff Portal)</h3><p style="margin:4px 0 10px;color:#92400e">You are inspecting the Staff/Teacher portal as an Admin.</p><button class="btn btn-primary btn-sm" onclick="['dash-sec-admin','dash-sec-staff','dash-sec-parent','dash-sec-student'].forEach(id=>{var e=document.getElementById(id);if(e)e.style.display='none';});document.getElementById('dash-sec-admin').style.display='block';">← Return to Admin Command Centre</button></div>
        <div class="stats-grid"><div class="stat-card"><div class="stat-value" id="stat-my-classes">—</div><div class="stat-label">My Classes</div></div><div class="stat-card"><div class="stat-value" id="stat-open-cbt">—</div><div class="stat-label">Open CBT</div></div><div class="stat-card"><div class="stat-value" id="stat-attendance-today">—</div><div class="stat-label">Attendance Today</div></div></div>
        <div class="grid grid-2"><div class="card"><h3>👨‍🏫 Staff / Teacher Workspace</h3><p>Academic and classroom operations only — no proprietor finance, HR payroll, storage, compliance or system-backup tools.</p><div style="display:flex;gap:8px;flex-wrap:wrap">${buttons(staffLinks)}</div></div><div class="card"><h3>📢 Staff Notices</h3><div id="dash-announcements"><span class="pulse">Loading…</span></div></div></div>
      </section>

      <section id="dash-sec-parent" data-dash-role="parent" style="display:none">
        <div class="card" data-admin-only style="margin-bottom:16px;background:#fef3c7;border-color:#f59e0b"><h3 style="margin:0">👁️ Admin Oversight Mode (Parent Portal)</h3><p style="margin:4px 0 10px;color:#92400e">You are inspecting the Parent portal as an Admin.</p><button class="btn btn-primary btn-sm" onclick="['dash-sec-admin','dash-sec-staff','dash-sec-parent','dash-sec-student'].forEach(id=>{var e=document.getElementById(id);if(e)e.style.display='none';});document.getElementById('dash-sec-admin').style.display='block';">← Return to Admin Command Centre</button></div>
        <div class="grid grid-2"><div class="card"><h3>👨‍👩‍👧 Parent Portal</h3><p>Parents focus on linked children only: fees, attendance, results, assignments, messages and complaints. Admin and teacher controls are excluded.</p><div style="display:flex;gap:8px;flex-wrap:wrap">${buttons(parentLinks)}</div></div><div class="card"><h3>📢 Parent Notices</h3><div id="dash-announcements"><span class="pulse">Loading…</span></div></div></div>
      </section>

      <section id="dash-sec-student" data-dash-role="student" style="display:none">
        <div class="card" data-admin-only style="margin-bottom:16px;background:#fef3c7;border-color:#f59e0b"><h3 style="margin:0">👁️ Admin Oversight Mode (Student Portal)</h3><p style="margin:4px 0 10px;color:#92400e">You are inspecting the Student portal as an Admin.</p><button class="btn btn-primary btn-sm" onclick="['dash-sec-admin','dash-sec-staff','dash-sec-parent','dash-sec-student'].forEach(id=>{var e=document.getElementById(id);if(e)e.style.display='none';});document.getElementById('dash-sec-admin').style.display='block';">← Return to Admin Command Centre</button></div>
        <div class="grid grid-2"><div class="card"><h3>🎓 Student Portal</h3><p>Students see learning and personal academic tools only. Finance administration, staff management, payroll, backups and approvals are excluded.</p><div style="display:flex;gap:8px;flex-wrap:wrap">${buttons(studentLinks)}</div></div><div class="card"><h3>📢 Student Notices</h3><div id="dash-announcements"><span class="pulse">Loading…</span></div></div></div>
      </section>`);
  },

  /* ---------- Voting page (NEW blueprint feature) ---------- */
  voting(config) {
    return T.shell(config, 'Voting & Polls', `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <p style="color:var(--gray-600);margin:0">Cast your vote in class elections, head-boy/girl contests and staff polls. Live results update in real time.</p>
        <button class="btn btn-primary" data-vote-action="create" data-admin-only>+ New Poll</button>
      </div>
      <div id="polls-list"><span class="pulse">Loading polls…</span></div>`, { requireRole: 'any' });
  },

  /* ---------- Notifications page (NEW) ---------- */
  notifications(config) {
    return T.shell(config, 'Notifications', `
      <p style="color:var(--gray-600)">All your announcements, broadcasts, poll results and message alerts — in one place.</p>
      <div style="display:flex;gap:12px;margin:16px 0;flex-wrap:wrap">
        <button class="btn btn-primary" onclick="Notifications.requestPermission()">🔔 Enable Push</button>
        <button class="btn btn-outline" onclick="Notifications.refreshUnreadCount()">↻ Refresh</button>
        <button class="btn btn-outline" onclick="Notifications.markAllRead()">Mark all read</button>
      </div>
      <div id="notif-page-list"><span class="pulse">Loading…</span></div>`, { requireRole: 'any' });
  },

  /* ---------- Generic module page (students / staff / fees / …) ---------- */
  /* Detailed, first-timer-friendly page guides (issue 2). Each has a one-line
     "what it is", who uses it, and step-by-step "how to use". Shown in a
     collapsible panel at the top of every module page AND used by the assistant. */
  PAGE_GUIDE: {
    students:    { what:'Your complete student register — every learner enrolled in the school.', who:'Admin & staff add/edit; parents see only their own children.', steps:['Click <b>+ Add new</b> to enroll a student (the <b>Admission No is auto-generated</b> — never type it).','Pick the <b>Class</b> from the dropdown so the student is grouped correctly.','Use <b>Import CSV</b> to register many students at once (download the template first).','Every other page (results, fees, attendance…) pulls student names from here, so there is no re-typing.'] },
    staff:       { what:'The directory of all teaching and non-teaching staff.', who:'Admin/HR maintain it; approved staff sign-ups appear here automatically.', steps:['Click <b>+ Add new</b>; choose <b>Teaching</b> or <b>Non-teaching</b>.','For teachers, pick the <b>Subject taught</b> from the dropdown.','For privacy, date of birth is captured as <b>day & month only</b>.','A <b>Staff No is auto-generated</b> on save.'] },
    classes:     { what:'Defines each class/arm the school runs (e.g. JSS1 A).', who:'Admin sets these up at the start of the session.', steps:['Click <b>+ Add new</b>; type the class name and arm.','Pick the <b>Class teacher</b> from the staff dropdown (only teaching staff appear).','Set the level and capacity.','These classes then appear as dropdown options everywhere a class is needed.'] },
    subjects:    { what:'The list of every subject the school offers.', who:'Admin/HOD register subjects once per session.', steps:['Click <b>+ Add new</b>; type the subject, code, department and level.','Map it to a <b>Subject teacher</b> from the staff dropdown.','Subjects then appear in results, scheme of work, assignments and the timetable.'] },
    attendance:  { what:'Daily/class attendance — who was present, absent, late or excused.', who:'Class teachers record it; parents view their own children.', steps:['Click <b>+ Add new</b>, pick the student (class auto-fills), set the status and time.','Or click <b>📲 Pull from QR Check-in</b> to mark a whole class present in one click from today\'s scans.','Export to CSV/PDF for records.'] },
    results:     { what:'Raw CA + exam scores per student, subject, term and session.', who:'Subject teachers enter scores; they feed report cards & promotion.', steps:['Click <b>+ Add new</b>; pick the student, subject, class, term and session (all dropdowns).','Enter CA1/CA2/CA3 and Exam; the grade is auto-suggested.','These scores roll up into Report Cards and drive Automated Promotion.'] },
    'report-cards':{ what:'Builds termly report cards, broadsheets and scoresheets.', who:'Teachers/admin generate them at term end.', steps:['Define assessment columns (CA1, CA2, Assignment, Exam…) and their max marks.','Enter or auto-pull scores (CBT and Digital-Library marks can flow in automatically).','Generate each student\'s report card, the class broadsheet, or the teacher scoresheet — print or save as PDF.'] },
    fees:        { what:'Records school-fee payments and shows balances per student.', who:'Bursar/admin record payments; parents see their own.', steps:['Click <b>+ Add new</b>, pick the student, enter the amount, method and reference.','Each payment appears in the student\'s <b>payment history</b> on their dashboard.','Export statements to CSV/PDF.'] },
    sow:         { what:'The Scheme of Work — each teacher\'s termly topic plan.', who:'Teachers fill it at term start; admin monitors coverage.', steps:['Add a row per week: subject, class, week number and topic.','Each week, tick <b>“Taught this week (confirm)”</b> as you cover a topic.','Admin can see covered vs uncovered topics at a glance.'] },
    promotion:   { what:'Moves students to the next class — automatically, by exam result.', who:'Admin/proprietor run it at session end.', steps:['Click <b>⚙ Auto-promote (by exam)</b>; set a pass benchmark and the graduating class.','The system drafts promote / repeat / graduate decisions from each student\'s term average.','Review & edit any row, then click <b>✅ Apply promotions</b>. Nothing changes until you apply.'] },
    birthdays:   { what:'Celebrates student & staff birthdays, grouped by birth month.', who:'Everyone can view; staff manage.', steps:['Click <b>🎂 Import student birthdays</b> to pull dates from the student register.','Birthdays are grouped by month, showing each student\'s name and class.','Use it to plan celebrations and shout-outs.'] },
    gamification:{ what:'Reward points & badges for good behaviour and effort (PBIS).', who:'Teachers award points; students/parents see them.', steps:['Click <b>+ Add new</b>, pick the student, enter points and a reason.','Points are logged transparently and can appear on the student dashboard.','Use badges to reinforce positive behaviour.'] },
    library:     { what:'The physical book catalogue and lending records.', who:'Librarian/staff manage; everyone can browse.', steps:['Click <b>+ Add new</b> to catalogue a book (title, author, copies).','Track how many are lent out.','For online reading + quizzes that count toward grades, use <b>Digital Library</b>.'] },
    activity_log:{ what:'A tamper-evident audit trail of every important action.', who:'Admin/super-admin only — read-only.', steps:['Every create, update, delete, import and login is recorded here automatically.','You cannot add rows manually — the system writes them.','Filter/export for accountability and security reviews.'] },
    announcements:{ what:'Post notices to the whole school or a chosen audience.', who:'Staff post; everyone receives.', steps:['Click <b>+ Add new</b>; write the title and body.','Choose the <b>audience</b> (all / students / parents / staff / a class) from the dropdown.','Pin urgent notices to the top.'] },
    hr:          { what:'Run staff salaries and print professional payslips.', who:'Bursar / HR / proprietor.', steps:['Click <b>+ Add new</b>; pick the staff member from the list.','Enter basic, allowances, bonus, overtime and any deductions (tax, pension, loan).','Leave <b>Net pay</b> blank — it is calculated automatically.','Click <b>Payslip</b> on any row to print a branded payslip.'], advantages:['Automatic net-pay calculation','Professional, printable payslips','Pick staff from a list — no typing errors'], benefit:'Accurate, on-time salaries that boost morale and keep you compliant.' },
    payroll:     { what:'The full monthly salary register for all staff.', who:'Bursar / HR / proprietor.', steps:['Add a salary record per staff per month (net pay auto-computes).','Approve and mark as paid.','Print individual or bulk payslips.'], advantages:['One register for the whole school','Auto net-pay','Audit-friendly'], benefit:'A single source of truth for staff pay and budgeting.' },
    staff_loans: { what:'Track staff loans & salary advances with repayment schedules.', who:'Bursar / HR.', steps:['Click <b>+ Add new</b>; pick the staff member and enter the amount borrowed.','Set the monthly repayment (EMI) and number of months.','Update <b>amount repaid</b> over time and the status.'], advantages:['EMI repayment tracking','Live outstanding balance','Status: active / completed / defaulted'], benefit:'Controlled, transparent staff lending with no missed repayments.' },
    staff_bonus: { what:'Record performance & special bonuses per staff member.', who:'HR / proprietor.', steps:['Click <b>+ Add new</b>; pick the staff member and bonus type.','Enter the amount and a citation/reason.','Set the pay status.'], advantages:['Categorised bonuses','Documented citations','Feeds payroll'], benefit:'Fair, documented rewards that motivate your best staff.' },
    appraisals:  { what:'Structured staff performance appraisals with scoring.', who:'HODs / principal / proprietor.', steps:['Click <b>+ Add new</b>; pick the staff member and period.','Score each criterion 1–10 (punctuality, teaching quality, results, teamwork, conduct).','The <b>total score & band</b> are computed automatically; add a recommendation.'], advantages:['Objective weighted scoring','Auto grade band','Clear recommendation'], benefit:'Evidence-based staff development and promotion decisions.' },
    parents:     { what:'Link parents/guardians to their children.', who:'Admin / office staff.', steps:['Click <b>+ Add new</b>.','Pick the <b>parent</b> from the dropdown (registered parent accounts).','Pick the <b>student</b> from the class-grouped, searchable list and set the relationship.'], advantages:['Both parent and student chosen from lists — no typing IDs','Searchable pickers','Powers the parent portal'], benefit:'Accurate family links so parents see exactly their own children.' },
    idcards:     { what:'Generate professional digital ID cards (students & staff).', who:'Admin / office staff.', steps:['Choose a card type (student or staff) and a professional template.','Pick the person; the photo and details fill in.','Print one card or <b>Print ALL</b>.'], advantages:['Several international-standard templates','Full school contact details + QR','Bulk printing'], benefit:'Smart, secure ID cards that look world-class — printed in-house for free.' },
    flyer:       { what:'Design professional marketing flyers to international standards.', who:'Admin / marketing.', steps:['Pick a premium template, size and colour palette.','Edit the headline, bullets and call-to-action.','Print or save as PDF/image for print and social media.'], advantages:['Premium templates & palettes','Print and social sizes','Full text control'], benefit:'Eye-catching admissions marketing produced in-house, saving design fees.' }
  ,
    "eresources":{what:"Curriculum document and past paper repository. A secure digital filing system allowing teachers to share class study materials, revision guides, and exam syllabi via direct web links or Google Drive URLs without consuming database storage.",who:"Teachers upload; Students/Parents view.",steps:["Click Add new.","Enter title, subject, class, and term.","Paste direct resource or Drive URL.","Save to publish to student portals."]},
    "reports":{what:"Custom administrative and departmental summaries. A flexible reporting log where heads of department and administrators file official termly summaries, inspection notes, and executive status briefs for institutional governance.",who:"Staff and Admin.",steps:["Click Add new.","Enter report title and category.","Input summary notes and dates.","Export PDF for administrative archives."]},
    "directory":{what:"Searchable contact registry for staff and students. Aggregates active database profiles into a searchable, read-only contact directory. Displays full names, institutional email addresses, phone contacts, roles, and current academic standing.",who:"Staff and Admin.",steps:["Use global search bar to locate profiles.","Filter by user role or status.","Verify contact credentials for outreach."]},
    "departments":{what:"Academic faculty and HOD structure setup. Defines the institutional academic architecture by establishing distinct academic departments (e.g., Sciences, Arts, Languages) and assigning official Heads of Department (HOD) for faculty governance.",who:"Admin and Super Admin.",steps:["Click Add new.","Input department title.","Assign official HOD from staff registry.","Verify departmental structure in academic setup."]},
    "rubrics":{what:"Standardized student conduct evaluation matrices. Provides standardized grading criteria for evaluating student affective traits and behavioral conduct. Establishes uniform benchmarks for punctuality, respect, neatness, and teamwork across all class arms.",who:"Staff and Admin.",steps:["Define behavioral evaluation criteria.","Establish scoring weightages.","Apply rubrics across termly student report cards."]},
    "transcripts":{what:"Comprehensive multi-term academic record synthesis. Compiles student continuous assessments and examination results across multiple academic terms and sessions into official, printable academic transcripts suitable for university applications and transfers.",who:"Admin and Staff.",steps:["Select student profile.","Specify academic terms and sessions to include.","Generate comprehensive transcript grid.","Click Print/Save PDF for official watermarked export."]},
    "transfer_cert":{what:"Official student departure and clearance documentation. Generates official school leaving certificates and clearance documentation for departing students. Records academic standing, final attendance summaries, conduct ratings, and official release authorization.",who:"Admin and Staff.",steps:["Select departing student.","Verify fee payment clearance.","Verify academic standing and conduct.","Print/Save official Transfer Certificate."]},
    "counselling":{what:"Confidential academic and psychological guidance tracking. A secure logging facility where school guidance counsellors record confidential student guidance sessions, psychological intervention notes, university placement advice, and career action plans.",who:"Staff and Admin.",steps:["Click Add new.","Select student profile.","Record guidance discussion notes.","Set follow-up review dates."]},
    "hostel":{what:"Student accommodation and dormitory wing management. Manages residential student housing by tracking dormitory wings, specific room numbers, bed allocations, and supervising boarding housemasters/mistresses.",who:"Staff and Admin.",steps:["Click Add new.","Select boarding student.","Assign specific dormitory wing and room number.","Record emergency boarding contacts."]},
    "alumni":{what:"Past student tracking and institutional network archiving. Preserves the institutional heritage by maintaining an active database of graduated students. Records graduation cohorts, higher education placements, career achievements, and alumni association contact details.",who:"Admin and Super Admin.",steps:["Migrate graduated student cohorts.","Update higher education and career placement notes.","Filter alumni registry by graduation session."]},
    "inventory":{what:"Asset tracking and physical facility logging. A dedicated physical asset ledger tracking institutional equipment, laboratory apparatus, classroom furniture, and maintenance supplies. Records initial quantities, unit valuations, storage locations, and current asset conditions.",who:"Admin and Super Admin.",steps:["Click Add new.","Input asset description and serial number.","Log physical quantity and storage location.","Perform regular asset condition audits."]},
    "lms":{what:"Structured digital courseware and video lesson delivery. A complete digital courseware hub where teachers structure academic lessons, embed instructional lecture videos, upload study notes, and assign interactive assignments for self-paced student learning.",who:"Teachers upload; Students learn.",steps:["Click Add new.","Select subject and target class arm.","Input lesson title and study instructions.","Embed direct lecture video or Drive URL."]},
    "cafeteria":{what:"Weekly school meal menus and allergen tracking. Manages the institutional cafeteria by publishing daily and weekly student dining menus. Captures meal descriptions, nutritional notes, and mandatory allergen warnings to ensure student dining safety.",who:"Staff manage; Students/Parents view.",steps:["Click Add new.","Specify day of the week and meal category.","Describe dining menu items.","Flag mandatory allergen warnings (e.g., Nuts, Dairy)."]},
    "financial_aid":{what:"Fee waiver tracking and student sponsorship logging. Maintains official records of institutional scholarships, fee discounts, bursaries, and corporate sponsorships awarded to deserving students. Interconnects with the fee management engine for accurate balance calculations.",who:"Admin and Bursar.",steps:["Click Add new.","Select student profile.","Input scholarship title and fee waiver percentage.","Verify active sponsorship status."]},
    "front_desk":{what:"Gatekeeper logging for walk-ins, dispatches, and calls. A comprehensive administrative reception ledger tracking institutional visitors, daily package dispatches, walk-in inquiries, and official phone logs to enforce rigorous campus security.",who:"Staff and Admin.",steps:["Click Add new.","Select inquiry type (Call, Walk-in, Dispatch).","Record visitor identity and purpose.","Timestamp arrival and departure metrics."]},
    "career_counseling":{what:"Higher education tracking and career placement logs. Maintains longitudinal tracking of senior student higher education applications, university admission offers, aptitude test results, and professional career placement milestones.",who:"Staff and Admin.",steps:["Click Add new.","Select senior student profile.","Record university application progress.","Attach official scholarship and admission offer notes."]},
    "document_builder":{what:"Custom administrative certificate and letter publishing. A dynamic publishing engine allowing administrators to format and print official school correspondence, bonafide certificates, examination hall passes, and custom testimonials instantly.",who:"Staff and Admin.",steps:["Select document format preset.","Customize letterhead and body text.","Input recipient profile data.","Click Print/Save PDF for watermarked export."]},
    "fleet_tracking":{what:"Bus route logistics, driver tracking, and maintenance logs. Manages institutional transportation logistics by maintaining active ledgers of school bus routes, assigned transport vehicles, authorized drivers, daily pick-up schedules, and scheduled fleet maintenance.",who:"Staff and Admin.",steps:["Click Add new.","Input bus vehicle registration and route name.","Assign authorized transport driver.","Log daily route schedules and maintenance notes."]},
    "facility_booking":{what:"Resource reservation for auditoriums, labs, and grounds. A scheduling console for reserving shared campus infrastructure such as science laboratories, auditoriums, sports grounds, and conference rooms. Prevents double-booking via conflict checking.",who:"Staff and Admin.",steps:["Click Add new.","Select campus facility.","Reserve specific calendar date and time blocks.","Authorize reservation approval status."]},
    "compliance":{what:"Institutional certification and government regulation tracking. An executive governance dashboard tracking mandatory government accreditations, ministry inspection timelines, safety audit certificates, and statutory operational compliance milestones.",who:"Admin and Super Admin.",steps:["Click Add new.","Input statutory certification title.","Record official approval dates and issuing ministry.","Set automatic renewal warning dates."]},
    "lesson_plans":{what:"Structured instructional planning and HOD vetting. Provides a structured digital template where teachers author daily and weekly lesson plans, establishing core learning objectives, teaching methodologies, and assessment strategies for HOD vetting.",who:"Teachers author; HODs vet.",steps:["Click Add new.","Select subject, class arm, and date.","Establish core instructional objectives.","Submit lesson plan for official HOD review."]},
    "behaviour":{what:"Behavioral tracking and disciplinary action recording. A specialized pastoral care ledger for tracking student behavioral milestones, positive conduct citations, disciplinary infractions, and administrative intervention measures.",who:"Staff and Admin.",steps:["Click Add new.","Select student profile.","Select conduct category (Positive vs Infraction).","Record detailed behavioral notes and actions taken."]},
    "support_plans":{what:"Individualized Education Plans and academic interventions. Manages Individualized Education Plans (IEP) and specialized learning accommodations for students requiring academic remediation, specialized therapy, or behavioral support.",who:"Staff and Admin.",steps:["Click Add new.","Select student profile.","Define specific learning accommodations and goals.","Log regular intervention review notes."]},
    "donations":{what:"Philanthropic endowment tracking and benefactor logging. A secure financial ledger maintaining comprehensive records of institutional endowments, alumni donations, corporate grants, and charitable contributions complete with benefactor metadata.",who:"Admin and Super Admin.",steps:["Click Add new.","Input benefactor identity and grant title.","Log financial donation amount and date.","Allocate funds to specific school projects."]},
    "substitutions":{what:"Emergency class cover and absentee teacher replacement. Maintains operational continuity by managing emergency teacher substitutions. Reassigns available teaching staff to cover classes for absent colleagues based on active availability rosters.",who:"Staff and Admin.",steps:["Click Add new.","Select absent teacher and affected class arm.","Assign available substitute teacher.","Notify substitute staff member via portal alerts."]},
    "helpdesk":{what:"Institutional ticketing for repairs, IT, and maintenance. A complete institutional service desk where staff and students lodge repair tickets for broken campus hardware, IT network issues, plumbing faults, and physical facility maintenance.",who:"All users submit; Admin resolves.",steps:["Click Add new.","Select issue category (IT, Maintenance, Facilities).","Describe specific repair requirements.","Track ticket status through to resolution."]},
    "payments_online":{what:"Digital payment tracking and secure fee gateways. Integrates electronic fee transactions, digital bank transfers, and online payment gateway logs into the master school financial dashboard, generating verified instant e-receipts.",who:"Admin manage; Parents/Students pay.",steps:["Initialize secure online fee payment links.","Verify electronic transaction logs.","Generate automated instant e-receipts."]},
    "school_calendar":{what:"Master academic event schedule and holiday tracking. The definitive institutional calendar displaying term start dates, examination timeframes, public holidays, sports events, and parent-teacher meeting schedules for the entire school community.",who:"Staff manage; All users view.",steps:["Click Add new.","Specify calendar event title and exact dates.","Categorize event (Exam, Holiday, Term-start).","Publish to master institutional dashboard."]},
    "lost_found":{what:"Campus property logging for lost items and claims. A campus property ledger where staff and students log found personal items, textbooks, and electronic devices. Records item descriptions, finding locations, and successful property claims.",who:"All users view; Staff manage.",steps:["Click Add new.","Log item description and finding location.","Categorize status (Lost vs Found).","Update record status once claimed by owner."]},
    "parent_meeting":{what:"PTA assembly logging, scheduling, and official minutes. Manages institutional Parent-Teacher Association (PTA) assemblies, individual teacher consultation schedules, official meeting agendas, and published assembly minutes.",who:"Staff manage; Parents view.",steps:["Click Add new.","Schedule PTA assembly date, time, and venue.","Publish official meeting agenda topics.","Attach comprehensive post-meeting assembly minutes."]},
    "book_request":{what:"Student book reservation and lending requests. A dedicated library service portal where students and staff request physical book reservations, track lending availability, and lodge requests for new curriculum textbooks.",who:"Students/Staff request; Librarian manages.",steps:["Click Add new.","Specify book title and author name.","Submit reservation request.","Track reservation status (Requested, Reserved, Issued)."]}},

  guideHTML(moduleId, mod) {
    const g = T.PAGE_GUIDE[moduleId];
    if (!g) {
      const roles = T.roleAllow(moduleId).replace(/_/g,' ').replace(/\b(super admin|admin|staff|teacher|parent|student|public|any|all)\b/g, m => m.charAt(0).toUpperCase()+m.slice(1));
      return `<div class="card" style="margin-bottom:16px;background:#eef2ff;border-color:#c7d2fe">
        <h3 style="margin-top:0">ℹ️ What is this page?</h3>
        <p style="color:var(--gray-700);line-height:1.75;margin:0 0 8px"><strong>${T.esc(T.labelFor(moduleId, mod.name))}</strong> is part of the School Connect portal. ${T.esc(mod.desc || 'It helps the school manage this area in a structured, searchable and printable way.')}</p>
        <p style="color:var(--gray-700);line-height:1.75;margin:0 0 8px"><strong>Who should use it:</strong> ${T.esc(roles)}. Admin/Super Admin may see management overviews, while non-admin roles only see pages relevant to their duties.</p>
        <ol style="margin:8px 0 0 20px;color:var(--gray-700);line-height:1.75">
          <li>Read this guide first so you understand the purpose of the page.</li>
          <li>Use <strong>+ Add new</strong> only if your role is allowed to create records.</li>
          <li>Use <strong>Refresh</strong>, <strong>Export CSV</strong> or <strong>Export PDF</strong> for records and reporting.</li>
          <li>Ask the 💬 assistant, or open <a href="feature-guide.html">Feature Guide</a>, for a fuller explanation.</li>
        </ol>
      </div>`;
    }
    return `<div class="card" style="margin-bottom:16px;background:#eef2ff;border-color:#c7d2fe">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;cursor:pointer" onclick="var b=document.getElementById('pg-more');b.style.display=b.style.display==='none'?'block':'none'">
        <div><strong>ℹ️ What is this page?</strong> <span style="color:var(--gray-700)">${T.esc(g.what)}</span></div>
        <span style="color:var(--primary)">▼</span>
      </div>
      <div id="pg-more" style="display:none;margin-top:10px">
        <p style="margin:4px 0;color:var(--gray-700)"><strong>Who uses it:</strong> ${T.esc(g.who)}</p>
        <p style="margin:8px 0 4px;color:var(--gray-700)"><strong>How to use it:</strong></p>
        <ol style="margin:0;padding-left:20px;color:var(--gray-700);line-height:1.7">${g.steps.map(s => '<li>' + s + '</li>').join('')}</ol>
        ${g.advantages ? `<p style="margin:8px 0 4px;color:var(--gray-700)"><strong>Advantages:</strong></p><ul style="margin:0;padding-left:20px;color:var(--gray-700);line-height:1.7">${g.advantages.map(s => '<li>' + s + '</li>').join('')}</ul>` : ''}
        ${g.benefit ? `<p style="margin:8px 0 0;color:var(--gray-700)"><strong>Benefit to the school:</strong> ${T.esc(g.benefit)}</p>` : ''}
        <p style="margin:10px 0 0;font-size:.85rem;color:var(--gray-500)">Tip: click the <strong>ℹ️ Help</strong> button in the top bar, or the 💬 assistant, for the full explanation of any page.</p>
      </div></div>`;
  },

  modulePage(config, moduleId, opts = {}) {
    const mod = window.SC.MODULES.find(m => m.id === moduleId) || { id: moduleId, name: moduleId };
    const def = (window.CRUD && CRUD.def) ? CRUD.def(moduleId) : null;
    const readOnly = def && def.readOnly;
    const studentParentAdd = ['complaints','messages','inbox','parent_meeting','lost_found','helpdesk','book_request','donations','payments_online'];
    const adminStaffWrite = ['students','staff','classes','subjects','results','attendance','report-cards','academic_records','timetable','cbt','announcements','events','gallery','library','digital_library','assignments','parents','departments','broadcast','leave','visitors','hostel','transport','finance','inventory','promotion','directory','certificates','sow','lesson_plans'];
    const familyWrite = ['complaints','messages','inbox'];
    const writeAttr = familyWrite.includes(moduleId) ? 'data-family-only' : (adminStaffWrite.includes(moduleId) ? 'data-staff-only' : (!studentParentAdd.includes(moduleId) ? 'data-staff-only' : ''));
    const addBtn = readOnly ? '' : `<button class="btn btn-primary" onclick="CRUD.openForm('${T.esc(moduleId)}')" ${writeAttr}>+ Add new</button>`;
    const importBtn = readOnly ? '' : `<button class="btn btn-outline" onclick="CRUD.importCSV('${T.esc(moduleId)}')" data-admin-only>⬆ Import CSV</button>`;
    return T.shell(config, mod.name, `
      ${T.guideHTML(moduleId, mod)}
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px">
        ${addBtn}
        <button class="btn btn-outline" onclick="CRUD.renderList('${T.esc(moduleId)}')">↻ Refresh</button>
        <button class="btn btn-outline" onclick="CRUD.exportCSV('${T.esc(moduleId)}')" data-staff-only>⬇ Export CSV</button>
        <button class="btn btn-outline" onclick="CRUD.exportPDF('${T.esc(moduleId)}')" data-staff-only>📄 Export PDF</button>
        ${importBtn}
        ${moduleId === 'students' ? '<a class="btn btn-outline" href="students_import_template.csv" download data-admin-only>📋 CSV template</a>' : ''}
        ${moduleId === 'birthdays' ? '<button class="btn btn-outline" onclick="CRUD.importBirthdays()" data-staff-only>🎂 Import student birthdays</button> <button class="btn btn-outline" onclick="CRUD.renderBirthdaysByMonth && CRUD.renderBirthdaysByMonth()" data-staff-only>📅 Group by month</button>' : ''}
        ${moduleId === 'attendance' ? '<button class="btn btn-outline" onclick="CRUD.importAttendanceFromCheckin && CRUD.importAttendanceFromCheckin()" data-staff-only>📲 Pull from QR Check-in</button>' : ''}
        ${moduleId === 'promotion' ? '<button class="btn btn-primary" onclick="PromoUI && PromoUI.open()" data-admin-only>⚙ Auto-promote (by exam)</button> <button class="btn btn-outline" onclick="CRUD.applyPromotions()" data-admin-only>✅ Apply promotions</button>' : ''}
        ${moduleId === 'results' ? '<button class="btn btn-outline" onclick="CRUD.pullReadingScoresToResults &amp;&amp; CRUD.pullReadingScoresToResults({column:&quot;ca3&quot;,caMax:10})" data-staff-only>📚 Pull reading scores (Digital Library)</button>' : ''}
      </div>
      ${moduleId === 'birthdays' ? '<div id="birthdays-bymonth"></div>' : ''}
      <div class="table-wrap"><table id="${T.esc(moduleId)}-table"><thead><tr><th>Loading…</th></tr></thead><tbody><tr><td><span class="pulse">Loading…</span></td></tr></tbody></table></div>
      <script>document.addEventListener('DOMContentLoaded',function(){ if(window.CRUD) CRUD.renderList('${T.esc(moduleId)}'); });</script>`,
      { requireRole: opts.requireRole || 'staff' });
  },

  /* ---------- Helpers ---------- */
  esc(s) { return window.SC.esc(s); },
  jsStr(s) { return window.SC.jsStr(s); },
  slugify(s) { return window.SC.slugify(s); }
};

window.T = T;

console.log('%c[School Connect Gen v8] templates loaded.', 'color:#4f46e5');
