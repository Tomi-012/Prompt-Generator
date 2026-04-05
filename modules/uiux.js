/* modules/uiux.js — UI/UX & Web Mockup Module */
const UIUX_MODULE = {
  id:'uiux', title:'UI/UX & Web Mockup', svgIcon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  desc:'Generate prompt mockup desain aplikasi, website, atau dashboard',
  tag:'Design Mockup', tagColor:'#c084fc',
  iconBg:'rgba(192,132,252,.15)', iconColor:'#c084fc',
  cardAccent:'linear-gradient(135deg,#c084fc,#f472b6)',
  outputType:'prompt',
  promptCards:[{id:'img',label:'Prompt UI/UX Mockup',colorClass:'card-color-prompt'}],
  step1: (c) => {c.innerHTML=`<div class="form-grid single-col">
    <div class="form-group"><label>Jenis Aplikasi <span class="required">*</span></label><input type="text" id="f-apptype" placeholder="Cth: Aplikasi Kasir Cafe, Dashboard Analytics, E-commerce Fashion"/></div>
    <div class="form-group"><label>Target Device</label><div class="select-wrap"><select id="f-device"><option>Mobile App (iOS/Android)</option><option>Web Dashboard (Desktop)</option><option>Tablet App</option><option>Landing Page</option></select><svg class="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></div></div>
    <div class="form-group"><label>Fitur/Halaman Utama <span class="required">*</span></label><input type="text" id="f-feature" placeholder="Cth: Halaman login, dashboard penjualan, menu makanan"/></div></div>`;},
  step2: (c) => {c.innerHTML=`<div style="display:flex;flex-direction:column;gap:18px">
    <div class="form-group"><label>Tema Warna</label><div id="f-uicolor-chips" class="chips-row"></div></div>
    <div class="form-group"><label>Gaya Desain</label><div id="f-uistyle-chips" class="chips-row"></div></div>
    <div class="form-group"><label>Warna Brand (Opsional)</label><input type="text" id="f-uibrand" placeholder="Cth: Biru Navy, Hijau Emerald"/></div>
    <div class="form-group"><label>Bahasa Output</label><div id="f-lang-chips" class="chips-row"></div></div></div>`;},
  validate1: () => document.getElementById('f-apptype')?.value.trim()&&document.getElementById('f-feature')?.value.trim(),
  validate2: () => (window._activeUIColor||'').trim()&&(window._activeUIStyle||'').trim(),
  collectStep1: () => ({appType:document.getElementById('f-apptype').value,device:document.getElementById('f-device').value,feature:document.getElementById('f-feature').value}),
  collectStep2: () => ({uiColor:window._activeUIColor||'',uiStyle:window._activeUIStyle||'',brand:document.getElementById('f-uibrand')?.value||'',lang:window._activeLang||'Indonesia'}),
  buildPrompt: (d) => `Kamu ahli UI/UX design. Buatkan 5 variasi mockup desain untuk:
Jenis: ${d.appType}, Device: ${d.device}, Fitur: ${d.feature}, Tema: ${d.uiColor}, Gaya: ${d.uiStyle}${d.brand?', Warna Brand: '+d.brand:''}
PENTING: Gunakan bahasa ${d.lang} untuk merespons bagian 'name' dan 'description'. Nilai untuk 'imagePrompt' HARUS SELALU dalam bahasa Inggris agar kompatibel dengan sistem Midjourney.
FORMAT JSON MURNI: [{"name":"Mockup Name","description":"deskripsi ID","imagePrompt":"Dribbble-style UI/UX mockup for ${d.appType}. ${d.device} view. Showing ${d.feature}. ${d.uiStyle} design style. ${d.uiColor} color scheme.${d.brand?' Primary color: '+d.brand+'.':''} Clean layout, modern typography, pixel-perfect, 4K resolution, professional UI design.","videoPrompt":""}] Tepat 5.`,
};
