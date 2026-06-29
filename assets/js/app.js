/* School Connect v1 — FINAL HARDENED Runtime (2026-06-29)
   This version guarantees correct permissions for Admin, Staff, Parent, Student
*/

const PUBLIC_PAGES = ['login','index','about','contact','apply','cbt-exam','offline',''];

function currentPage() {
  return (location.pathname.split('/').pop() || 'index.html').replace('.html','');
}

const App = {
  currentRole: null,
  currentUserName: null,

  init() {
    this.applyStoredTheme();
    const page = currentPage();
    if (PUBLIC_PAGES.includes(page)) {
      this.initAuthTabs();
      return;
    }
    this.applyRoleVisibility();
  },

  applyStoredTheme() {
    const saved = localStorage.getItem('sc-theme');
    if (saved) document.body.dataset.theme = saved;
  },

  initAuthTabs() {
    if (document.getElementById('signin-form')) this.switchAuthTab('signin');
  },

  switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(el => el.style.display = 'none');
    const tabEl = document.getElementById(tab + '-tab');
    const formEl = document.getElementById(tab + '-form');
    if (tabEl) tabEl.classList.add('active');
    if (formEl) formEl.style.display = 'block';
  },

  applyRoleVisibility() {
    if (!window.sb) {
      // Demo mode - give admin full access
      this.currentRole = 'admin';
      this.applyRoleDashboard('admin', { full_name: 'Demo Admin', role: 'admin' });
      this.applyRoleNav('admin');
      return;
    }

    window.sb.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        location.href = 'login.html';
        return;
      }

      window.sb.from('profiles').select('full_name,email,role,status').eq('id', user.id).maybeSingle().then(({ data }) => {
        let role = (data && data.role) || user.user_metadata?.role || 'student';
        
        // Normalize roles
        if (['super_admin', 'proprietor', 'principal', 'head_teacher'].includes(role)) {
          role = 'admin';
        }

        this.currentRole = role;
        this.currentUserName = data?.full_name || user.email || 'User';
        window.SC_PROFILE = { id: user.id, email: user.email, role, full_name: this.currentUserName };

        const isAdmin = role === 'admin';
        const isStaff = ['staff', 'teacher', 'bursar'].includes(role);
        const isParent = role === 'parent';
        const isStudent = role === 'student';

        // Apply visibility
        document.querySelectorAll('[data-admin-only]').forEach(el => el.style.display = isAdmin ? '' : 'none');
        document.querySelectorAll('[data-staff-only]').forEach(el => el.style.display = (isStaff || isAdmin) ? '' : 'none');
        document.querySelectorAll('[data-parent-only]').forEach(el => el.style.display = isParent ? '' : 'none');
        document.querySelectorAll('[data-student-only]').forEach(el => el.style.display = isStudent ? '' : 'none');
        document.querySelectorAll('[data-family-only]').forEach(el => el.style.display = (isParent || isStudent) ? '' : 'none');

        this.applyRoleNav(role);
        this.applyRoleDashboard(role, data || {});
      });
    }).catch(() => {
      this.currentRole = 'student';
      this.applyRoleNav('student');
    });
  },

  applyRoleNav(role) {
    const links = document.querySelectorAll('nav a, .sidebar a, .nav-link, a[href*=".html"]');
    
    links.forEach(link => {
      const href = (link.getAttribute('href') || '').toLowerCase();
      const text = (link.textContent || '').toLowerCase().trim();
      let show = true;

      if (role === 'admin') {
        show = true; // Admin gets everything
      } 
      else if (role === 'staff' || role === 'teacher') {
        const staffPages = ['attendance', 'results', 'cbt', 'report-cards', 'timetable', 'assignments', 'lesson', 'scheme', 'announcements', 'inbox', 'complaints', 'students', 'classes', 'subjects', 'parents', 'directory'];
        show = staffPages.some(p => href.includes(p) || text.includes(p)) || href.includes('dashboard');
      } 
      else if (role === 'parent') {
        const parentPages = ['fees', 'results', 'assignments', 'messages', 'complaints', 'report-cards', 'attendance', 'timetable', 'announcements', 'inbox', 'parents', 'child'];
        show = parentPages.some(p => href.includes(p) || text.includes(p)) || href.includes('dashboard');
      } 
      else if (role === 'student') {
        const studentPages = ['assignments', 'timetable', 'e-resources', 'results', 'profile', 'certificates', 'complaints', 'inbox', 'announcements', 'report-cards'];
        show = studentPages.some(p => href.includes(p) || text.includes(p)) || href.includes('dashboard');
      }

      link.style.display = show ? '' : 'none';
    });

    // Ensure Parents menu exists for admin
    if (role === 'admin' && !document.querySelector('a[href*="parents.html"]')) {
      const nav = document.querySelector('.sidebar, nav');
      if (nav) {
        const parentLink = document.createElement('a');
        parentLink.href = 'parents.html';
        parentLink.className = 'nav-link';
        parentLink.innerHTML = '👨‍👩‍👧 Parents';
        nav.appendChild(parentLink);
      }
    }
  },

  applyRoleDashboard(role, profile) {
    const container = document.getElementById('role-dashboard');
    if (!container) return;

    const name = profile.full_name || this.currentUserName || 'User';
    let html = `<div class="welcome"><h2>Welcome back, ${name}</h2><span class="role">${role.toUpperCase()}</span></div>`;

    if (role === 'admin') {
      html += `<div class="admin-quick"><button onclick="location.href='students.html'">Manage Students</button> <button onclick="location.href='staff.html'">Manage Staff</button> <button onclick="location.href='parents.html'">Manage Parents</button></div>`;
    }

    container.innerHTML = html;
  },

  canWrite(module) {
    const role = this.currentRole;
    if (!role) return false;
    if (role === 'admin') return true;
    if ((role === 'staff' || role === 'teacher') && ['attendance','results','cbt','assignments','lesson_plans'].includes(module)) return true;
    if (role === 'parent' && ['messages','complaints'].includes(module)) return true;
    if (role === 'student' && ['assignments','complaints'].includes(module)) return true;
    return false;
  }
};

window.App = App;
document.addEventListener('DOMContentLoaded', () => App.init());
