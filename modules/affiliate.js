/* modules/affiliate.js — Produk Afiliasi Module */
const AFFILIATE_MODULE = {
  id:'affiliate', title:'Produk Afiliasi', svgIcon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  desc:'Generate pose & prompt untuk foto/video produk afiliasi',
  tag:'Prompt Image + Video', tagColor:'#818cf8',
  iconBg:'rgba(129,140,248,.15)', iconColor:'#818cf8',
  cardAccent:'linear-gradient(135deg,#818cf8,#c084fc)',
  outputType:'prompt',
  promptCards:[
    {id:'img',label:'Prompt Gambar (Midjourney / DALL-E)',colorClass:'card-color-image'},
    {id:'vid',label:'Prompt Video (Meta AI / Runway)',colorClass:'card-color-video'},
    {id:'neg',label:'Negative Prompt (Wajib Disalin)',colorClass:'card-color-negative',small:true},
  ],
  step1: (container) => {
    container.innerHTML = `
      <div class="form-grid">
        <label class="upload-area" for="face-upload">
          <input type="file" id="face-upload" accept="image/*" hidden/>
          <div id="upload-placeholder" class="upload-placeholder">
            <div class="upload-icon-wrap"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
            <h3>Unggah Wajah (Opsional)</h3><p>JPG, PNG, WebP</p><div class="upload-btn-fake">Pilih File</div>
          </div>
          <div id="upload-preview" class="upload-preview hidden"><img id="preview-img" src="" alt="Preview"/><div class="preview-overlay"><div class="preview-badge"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Terpilih</div><button id="btn-remove-img" class="btn-remove-img" type="button">Hapus</button></div></div>
        </label>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div class="form-group"><label>Kategori <span class="required">*</span></label>
            <div class="select-wrap"><select id="f-category"><option value="">— Pilih —</option><option>Pakaian (Baju/Celana)</option><option>Jilbab / Hijab</option><option>Sepatu / Alas Kaki</option><option>Makanan / Minuman</option><option>Skincare / Kosmetik</option><option>Aksesoris</option></select><svg class="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></div></div>
          <div class="form-group"><label>Detail Produk <span class="required">*</span></label><input type="text" id="f-product" placeholder="Cth: Kemeja flanel merah kotak-kotak"/></div>
          <div class="form-group"><label>Target Platform</label>
            <div class="select-wrap"><select id="f-platform"><option>TikTok / Reels (9:16)</option><option>Feed Instagram (4:5)</option><option>Landscape (16:9)</option><option>Square (1:1)</option></select><svg class="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></div></div>
          <div class="form-group"><label>Gaya Konten</label><div id="f-style-chips" class="chips-row"></div></div>
        </div>
      </div>`;
  },
  step2: (container, data) => {
    container.innerHTML = `
      <div class="ai-message"><div class="ai-avatar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
        <p>Produk: <strong>${data.product||''}</strong> (${data.category||''}). Butuh sedikit konteks visual lagi:</p></div>
      <div style="display:flex;flex-direction:column;gap:18px">
        <div class="form-group"><label>Setting / Latar</label><span class="field-hint">Pilih atau ketik manual:</span><div id="f-setting-chips" class="chips-row"></div><input type="text" id="f-setting" placeholder="Ketik setting custom..."/></div>
        <div class="form-group"><label>Vibe / Mood</label><span class="field-hint">Pilih atau ketik manual:</span><div id="f-vibe-chips" class="chips-row"></div><input type="text" id="f-vibe" placeholder="Ketik vibe custom..."/></div>
        <div class="form-group"><label>Warna Merek (Opsional)</label><input type="text" id="f-color" placeholder="Cth: Earthy tone, pastel pink"/></div>
        <div class="form-group"><label>Bahasa Output</label><div id="f-lang-chips" class="chips-row"></div></div>
      </div>`;
  },
  validate1: () => {const c=document.getElementById('f-category');const p=document.getElementById('f-product');return c&&p&&c.value&&p.value.trim()},
  validate2: () => { const s=window._activeSetting||document.getElementById('f-setting')?.value||''; const v=window._activeVibe||document.getElementById('f-vibe')?.value||''; return s.trim()&&v.trim(); },
  collectStep1: () => ({category:document.getElementById('f-category').value,product:document.getElementById('f-product').value,platform:document.getElementById('f-platform').value,style:window._activeStyle||'UGC Casual',faceImage:window._faceImage||null}),
  collectStep2: () => ({setting:window._activeSetting||document.getElementById('f-setting').value,vibe:window._activeVibe||document.getElementById('f-vibe').value,color:document.getElementById('f-color').value,lang:window._activeLang||'Indonesia'}),
  buildPrompt: (d) => `Kamu ahli fotografi produk afiliasi. Buatkan 5 variasi pose foto/video untuk produk afiliasi.
Kategori: ${d.category}, Produk: ${d.product}, Setting: ${d.setting}, Vibe: ${d.vibe}, Platform: ${d.platform}, Gaya: ${d.style}${d.color?', Warna Brand: '+d.color:''}${d.faceImage?', Ada referensi wajah.':''}
PENTING: Gunakan bahasa ${d.lang} untuk merespons bagian 'name' dan 'description'. Nilai untuk 'imagePrompt' HARUS SELALU dalam bahasa Inggris agar kompatibel dengan sistem Midjourney.
ATURAN: Jika BAJU→fokus kain/potongan. SEPATU→low-angle/kaki. HIJAB→draping/framing wajah. MAKANAN→interaksi makan. SKINCARE→aplikasi/glow. AKSESORIS→detail/refleksi.
FORMAT JSON MURNI (tanpa markdown): [{"name":"...","description":"deskripsi ID","imagePrompt":"Photorealistic portrait of Indonesian character. ${d.faceImage?'(Use attached face reference) ':''}[pose detail]. Set in ${d.setting}. ${d.vibe}. Aspect ${(d.platform.match(/\(([^)]+)\)/)||['','9:16'])[1]}. 8k, cinematic lighting, photorealism, 35mm lens.${d.color?' Color grading: '+d.color+'.':''}","videoPrompt":"Cinematic short video in ${d.setting}. [action]. ${d.vibe}. Aspect ${(d.platform.match(/\(([^)]+)\)/)||['','9:16'])[1]}. High quality, steady camera."}] Berikan tepat 5 objek.`,
};
