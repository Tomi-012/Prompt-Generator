/* modules/diagram.js — Diagram Generator Module */
const DIAGRAM_MODULE = {
  id:'diagram', title:'Diagram Generator', svgIcon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="6" rx="1" ry="1"/><path d="M12 8v4"/><rect x="2" y="16" width="8" height="6" rx="1" ry="1"/><path d="M6 12v4"/><rect x="14" y="16" width="8" height="6" rx="1" ry="1"/><path d="M18 12v4"/><path d="M6 12h12"/></svg>',
  desc:'Buat Sequence, Activity, Use Case, Class, State Diagram dari SQL/deskripsi',
  tag:'Auto-Render Mermaid', tagColor:'#34d399',
  iconBg:'rgba(52,211,153,.15)', iconColor:'#34d399',
  cardAccent:'linear-gradient(135deg,#34d399,#38bdf8)',
  outputType:'diagram',
  step1: (c) => {c.innerHTML=`<div class="form-grid single-col">
    <div class="form-group"><label>Jenis Diagram <span class="required">*</span></label>
      <div class="select-wrap"><select id="f-diagtype"><option value="sequenceDiagram">Sequence Diagram</option><option value="flowchart">Activity Diagram (Flowchart)</option><option value="Use Case">Use Case Diagram</option><option value="classDiagram">Class Diagram</option><option value="stateDiagram-v2">State Diagram</option><option value="erDiagram">ER Diagram</option></select><svg class="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></div></div>
    <div class="form-group"><label>SQL Schema / Deskripsi Sistem <span class="required">*</span></label>
      <textarea id="f-sql" placeholder="Tempel SQL CREATE TABLE di sini, atau deskripsikan sistem Anda dalam bahasa natural...&#10;&#10;Contoh SQL:&#10;CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR, email VARCHAR);&#10;CREATE TABLE orders (id INT, user_id INT REFERENCES users(id), total DECIMAL);&#10;&#10;Atau deskripsi:&#10;Sistem e-commerce dengan user, produk, dan pesanan. User bisa login, melihat produk, menambah ke keranjang, dan checkout."></textarea></div>
    <div class="input-tips"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg><span>Anda bisa memasukkan SQL CREATE TABLE atau mendeskripsikan sistem dalam bahasa natural. Gemini akan menghasilkan kode Mermaid dan langsung di-render.</span></div></div>`;},
  step2: (c,data) => {c.innerHTML=`<div style="display:flex;flex-direction:column;gap:18px">
    <div class="ai-message"><div class="ai-avatar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
      <p>Saya akan membuat <strong>${data.diagType}</strong> dari input Anda. Ada pengaturan tambahan?</p></div>
    <div class="form-group"><label>Detail Tambahan (Opsional)</label><input type="text" id="f-diagextra" placeholder="Cth: Tambahkan relasi many-to-many, fokus pada flow checkout"/></div>
    <div class="form-group"><label>Bahasa Label/Output</label><div id="f-lang-chips" class="chips-row"></div></div></div>`;},
  validate1: () => document.getElementById('f-sql')?.value.trim(),
  validate2: () => true,
  collectStep1: () => ({diagType:document.getElementById('f-diagtype').value,sql:document.getElementById('f-sql').value}),
  collectStep2: () => ({extra:document.getElementById('f-diagextra')?.value||'',lang:window._activeLang||'Indonesia'}),
  buildPrompt: (d) => `Kamu ahli software engineering. Buatkan kode Mermaid.js untuk ${d.diagType} berdasarkan input berikut.

INPUT SQL/DESKRIPSI:
${d.sql}

${d.extra?'Detail tambahan: '+d.extra:''}
Bahasa label dan anotasi: ${d.lang}

ATURAN PENTING:
- Output HANYA kode Mermaid.js VALID, tanpa backtick, tanpa markdown, tanpa penjelasan.
- Mulai langsung dengan keyword diagram (${d.diagType}).
- Pastikan syntax Mermaid.js benar dan bisa di-render.
- Gunakan label yang jelas dan deskriptif.
- Untuk Use Case, gunakan flowchart LR dengan aktor di kiri.
- Jangan gunakan karakter khusus yang bisa merusak syntax.`,
};
