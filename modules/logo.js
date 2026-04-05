/* modules/logo.js — Logo & Brand Identity Module */
const LOGO_MODULE = {
  id:'logo', title:'Logo & Brand Identity', svgIcon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
  desc:'Generate prompt desain logo berkualitas tinggi untuk brand Anda',
  tag:'Logo Design', tagColor:'#f472b6',
  iconBg:'rgba(244,114,182,.15)', iconColor:'#f472b6',
  cardAccent:'linear-gradient(135deg,#f472b6,#fb923c)',
  outputType:'prompt',
  promptCards:[{id:'img',label:'Prompt Logo Design',colorClass:'card-color-prompt'}],
  step1: (c) => {c.innerHTML=`<div class="form-grid single-col">
    <div class="form-group"><label>Nama Brand <span class="required">*</span></label><input type="text" id="f-brand" placeholder="Cth: KopiBrew, TechVault, SariRasa"/></div>
    <div class="form-group"><label>Industri / Bidang <span class="required">*</span></label><input type="text" id="f-industry" placeholder="Cth: Kafe, Teknologi, Fashion, Bengkel Motor"/></div>
    <div class="form-group"><label>Gaya Logo</label><div id="f-logostyle-chips" class="chips-row"></div></div></div>`;},
  step2: (c) => {c.innerHTML=`<div style="display:flex;flex-direction:column;gap:18px">
    <div class="form-group"><label>Warna Utama</label><div id="f-logocolor-chips" class="chips-row"></div></div>
    <div class="form-group"><label>Elemen / Simbol (Opsional)</label><input type="text" id="f-symbol" placeholder="Cth: Cangkir kopi, Roda gigi, Daun"/></div>
    <div class="form-group"><label>Referensi Brand Lain (Opsional)</label><input type="text" id="f-logoref" placeholder="Cth: Mirip gaya Starbucks, Apple, Nike"/></div>
    <div class="form-group"><label>Bahasa Output</label><div id="f-lang-chips" class="chips-row"></div></div></div>`;},
  validate1: () => document.getElementById('f-brand')?.value.trim()&&document.getElementById('f-industry')?.value.trim(),
  validate2: () => (window._activeLogoColor||'').trim(),
  collectStep1: () => ({brand:document.getElementById('f-brand').value,industry:document.getElementById('f-industry').value,logoStyle:window._activeLogoStyle||'Minimalis'}),
  collectStep2: () => ({logoColor:window._activeLogoColor||'',symbol:document.getElementById('f-symbol')?.value||'',logoRef:document.getElementById('f-logoref')?.value||'',lang:window._activeLang||'Indonesia'}),
  buildPrompt: (d) => `Kamu ahli desain logo. Buatkan 5 variasi prompt logo untuk:
Brand: ${d.brand}, Industri: ${d.industry}, Gaya: ${d.logoStyle}, Warna: ${d.logoColor}${d.symbol?', Simbol: '+d.symbol:''}${d.logoRef?', Referensi: '+d.logoRef:''}
PENTING: Gunakan bahasa ${d.lang} untuk merespons bagian 'name' dan 'description'. Nilai untuk 'imagePrompt' HARUS SELALU dalam bahasa Inggris agar kompatibel dengan sistem Midjourney.
ATURAN: Logo HARUS flat/vector style. Background PUTIH BERSIH. TIDAK ADA teks/tulisan dalam logo. Clean lines.
FORMAT JSON MURNI: [{"name":"Logo Variant Name","description":"deskripsi ID","imagePrompt":"Professional ${d.logoStyle} logo design for ${d.brand}, a ${d.industry} brand. ${d.logoColor} color palette.${d.symbol?' Incorporating '+d.symbol+' symbol.':''} Vector flat design, white background, no text, clean lines, minimalist, professional branding, 4K.${d.logoRef?' Inspired by '+d.logoRef+' style.':''}","videoPrompt":""}] Tepat 5.`,
};
