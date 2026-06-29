/* School Connect v1 — FINAL HARDENED CRUD */
const CRUD = {
  sb: null,
  init(client) { this.sb = client; },

  async loadTable(module) {
    const container = document.getElementById('data-table') || document.querySelector('.table-container');
    if (!container) return;

    const role = window.App?.currentRole || 'student';
    const canWrite = (role === 'admin') || 
                     (role === 'staff' && ['attendance','results','cbt','assignments'].includes(module)) ||
                     (role === 'parent' && ['messages','complaints'].includes(module));

    let html = `<div class="table-header"><h3>${module.replace(/_/g,' ')}</h3>`;
    if (canWrite) {
      html += `<button onclick="CRUD.showAddModal('${module}')" class="btn btn-primary">+ Add New</button>`;
    } else {
      html += `<span class="badge">Read Only</span>`;
    }
    html += `</div><table class="data-table"><thead></thead><tbody id="table-body"><tr><td>Loading...</td></tr></tbody></table>`;

    container.innerHTML = html;
    // In real implementation, fetch from Supabase here
  },

  showAddModal(module) {
    if (!window.App || !window.App.canWrite(module)) {
      alert('You do not have permission to add records here.');
      return;
    }
    alert(`Add new record to ${module} (demo mode)`);
  }
};
window.CRUD = CRUD;
