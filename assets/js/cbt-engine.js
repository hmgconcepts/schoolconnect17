/* School Connect v1 — FINAL HARDENED CBT Engine */
const CBT = {
  init() {
    if (document.getElementById('exam-container') || location.pathname.includes('cbt')) {
      this.bindExamTools();
    }
  },

  showCreateExamModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h3>📝 Create New Exam / Test</h3>
        <form id="create-exam-form">
          <input name="title" placeholder="Exam Title" required style="width:100%;padding:10px;margin:8px 0">
          <input name="subject" placeholder="Subject" required style="width:100%;padding:10px;margin:8px 0">
          <button type="submit" class="btn btn-primary" style="width:100%">Create Exam</button>
        </form>
      </div>`;
    document.body.appendChild(modal);

    modal.querySelector('#create-exam-form').onsubmit = function(e) {
      e.preventDefault();
      alert('✅ Exam created successfully! (Demo)');
      modal.remove();
    };
  },

  bindExamTools() {
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9999;display:flex;gap:8px';
    container.innerHTML = `
      <button onclick="CBT.toggleCalculator()" class="btn btn-sm">🧮 Calculator</button>
      <button onclick="CBT.toggleMathKeyboard()" class="btn btn-sm">⌨️ Math Keyboard</button>
    `;
    document.body.appendChild(container);
  },

  toggleCalculator() {
    const calc = document.createElement('div');
    calc.style.cssText = 'position:fixed;bottom:90px;right:20px;background:white;border:2px solid #333;border-radius:12px;padding:12px;box-shadow:0 10px 30px rgba(0,0,0,0.3);z-index:10000;width:260px';
    calc.innerHTML = `
      <div style="display:flex;justify-content:space-between;margin-bottom:8px">
        <strong>Calculator</strong>
        <span onclick="this.parentElement.parentElement.remove()" style="cursor:pointer;font-size:20px">×</span>
      </div>
      <input id="calc-display" style="width:100%;font-size:22px;padding:8px;text-align:right;margin-bottom:8px" readonly>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px">
        ${['7','8','9','÷','4','5','6','×','1','2','3','-','0','.','=','+'].map(b => 
          `<button onclick="CBT.calcPress('${b}')" style="padding:12px;font-size:18px">${b}</button>`
        ).join('')}
      </div>`;
    document.body.appendChild(calc);
  },

  calcPress(val) {
    const display = document.getElementById('calc-display');
    if (val === '=') {
      try { display.value = eval(display.value.replace('÷','/').replace('×','*')); } 
      catch { display.value = 'Error'; }
    } else {
      display.value += val;
    }
  },

  toggleMathKeyboard() {
    const kb = document.createElement('div');
    kb.style.cssText = 'position:fixed;bottom:160px;right:20px;background:#f8fafc;border:2px solid #334155;border-radius:12px;padding:12px;z-index:10000';
    kb.innerHTML = `
      <strong>Math Keyboard</strong><br>
      ${['π','√','²','³','sin','cos','tan','log','ln'].map(s => 
        `<button onclick="CBT.insertSymbol('${s}')" style="margin:3px;padding:8px 12px">${s}</button>`
      ).join('')}`;
    document.body.appendChild(kb);
  },

  insertSymbol(sym) {
    const active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
      const pos = active.selectionStart || active.value.length;
      active.value = active.value.slice(0, pos) + sym + active.value.slice(pos);
      active.focus();
      active.selectionStart = active.selectionEnd = pos + sym.length;
    } else {
      alert('Click inside an answer field first');
    }
  }
};

window.CBT = CBT;
document.addEventListener('DOMContentLoaded', () => CBT.init());
