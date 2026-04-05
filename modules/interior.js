/* modules/interior.js — Interior & Architecture Module */
const INTERIOR_MODULE = {
  id:'interior', title:'Interior & Architecture', svgIcon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  desc:'Visualisasi desain interior & arsitektur ruangan impian Anda',
  tag:'3D Render', tagColor:'#fb923c',
  iconBg:'rgba(251,146,60,.15)', iconColor:'#fb923c',
  cardAccent:'linear-gradient(135deg,#fb923c,#fbbf24)',
  outputType:'prompt',
  promptCards:[{id:'img',label:'Prompt Interior/Architecture Render',colorClass:'card-color-prompt'}],
  step1: (c) => {c.innerHTML=`<div class="form-grid">
    <label class="upload-area" for="int-ref-upload">
      <input type="file" id="int-ref-upload" accept="image/*" hidden/>
      <div id="int-upload-placeholder" class="upload-placeholder">
        <div class="upload-icon-wrap"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
        <h3>Referensi Desain (Opsional)</h3><p>JPG, PNG, WebP</p><div class="upload-btn-fake">Pilih File</div>
      </div>
      <div id="int-upload-preview" class="upload-preview hidden"><img id="int-preview-img" src="" alt="Preview"/><div class="preview-overlay"><div class="preview-badge"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Terpilih</div><button id="int-btn-remove-img" class="btn-remove-img" type="button">Hapus</button></div></div>
    </label>
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="form-group"><label>Jenis Ruangan <span class="required">*</span></label>
        <div class="select-wrap"><select id="f-room"><option>Kamar Tidur</option><option>Ruang Tamu</option><option>Dapur</option><option>Kamar Mandi</option><option>Ruang Kerja / Home Office</option><option>Kafe / Restoran</option><option>Lobby Hotel</option><option>Eksterior Rumah</option></select><svg class="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></div></div>
      <div class="form-group"><label>Gaya Desain <span class="required">*</span></label><div id="f-intstyle-chips" class="chips-row"></div></div>
      <div class="form-group"><label>Ukuran Ruangan</label>
        <div class="select-wrap"><select id="f-size"><option>Kecil (< 20m²)</option><option>Sedang (20-40m²)</option><option>Besar (> 40m²)</option></select><svg class="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></div></div>
    </div>
  </div>`;},
  step2: (c) => {c.innerHTML=`<div style="display:flex;flex-direction:column;gap:18px">
    <div class="form-group"><label>Waktu / Pencahayaan</label><div id="f-lighting-chips" class="chips-row"></div></div>
    <div class="form-group"><label>Palet Warna</label><input type="text" id="f-intcolor" placeholder="Cth: Earth tone, Monokrom putih-abu"/></div>
    <div class="form-group"><label>Elemen Khusus (Opsional)</label><input type="text" id="f-intelement" placeholder="Cth: Tanaman hias, rak buku besar, perapian"/></div>
    <div class="form-group"><label>Bahasa Output</label><div id="f-lang-chips" class="chips-row"></div></div></div>`;},
  validate1: () => (window._activeIntStyle||'').trim(),
  validate2: () => (window._activeLighting||'').trim(),
  collectStep1: () => ({room:document.getElementById('f-room').value,intStyle:window._activeIntStyle||'',size:document.getElementById('f-size').value,refImage:window._interiorRefImage||null}),
  collectStep2: () => ({lighting:window._activeLighting||'',intColor:document.getElementById('f-intcolor')?.value||'',element:document.getElementById('f-intelement')?.value||'',lang:window._activeLang||'Indonesia'}),
  buildPrompt: (d) => `Kamu ahli desain interior & arsitektur. Buatkan 5 variasi render interior untuk:
Ruangan: ${d.room}, Gaya: ${d.intStyle}, Ukuran: ${d.size}, Cahaya: ${d.lighting}${d.intColor?', Warna: '+d.intColor:''}${d.element?', Elemen: '+d.element:''}${d.refImage?', Ada referensi visual desain dari user.':''}
PENTING: Gunakan bahasa ${d.lang} untuk merespons bagian 'name' dan 'description'. Nilai untuk 'imagePrompt' HARUS SELALU dalam bahasa Inggris agar kompatibel dengan sistem Midjourney.
FORMAT JSON MURNI: [{"name":"Design Name","description":"deskripsi ID","imagePrompt":"${d.refImage?'(Use attached design reference for style inspiration) ':''}Photorealistic interior design render of a ${d.size} ${d.room}. ${d.intStyle} style. ${d.lighting} lighting.${d.intColor?' '+d.intColor+' color palette.':''}${d.element?' Featuring '+d.element+'.':''} Octane render, Unreal Engine 5, architectural visualization, 8K resolution, hyperrealistic, professional interior photography.","videoPrompt":""}] Tepat 5.`,
};
