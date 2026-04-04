/* ============================================================
   MODULES.JS — Module Definitions & Prompt Builders
   ============================================================ */
const MODULES = {
  affiliate: {
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
        </div>`;
    },
    validate1: () => {const c=document.getElementById('f-category');const p=document.getElementById('f-product');return c&&p&&c.value&&p.value.trim()},
    validate2: () => { const s=window._activeSetting||document.getElementById('f-setting')?.value||''; const v=window._activeVibe||document.getElementById('f-vibe')?.value||''; return s.trim()&&v.trim(); },
    collectStep1: () => ({category:document.getElementById('f-category').value,product:document.getElementById('f-product').value,platform:document.getElementById('f-platform').value,style:window._activeStyle||'UGC Casual',faceImage:window._faceImage||null}),
    collectStep2: () => ({setting:window._activeSetting||document.getElementById('f-setting').value,vibe:window._activeVibe||document.getElementById('f-vibe').value,color:document.getElementById('f-color').value}),
    buildPrompt: (d) => `Kamu ahli fotografi produk afiliasi. Buatkan 5 variasi pose foto/video untuk produk afiliasi.
Kategori: ${d.category}, Produk: ${d.product}, Setting: ${d.setting}, Vibe: ${d.vibe}, Platform: ${d.platform}, Gaya: ${d.style}${d.color?', Warna Brand: '+d.color:''}${d.faceImage?', Ada referensi wajah.':''}
ATURAN: Jika BAJU→fokus kain/potongan. SEPATU→low-angle/kaki. HIJAB→draping/framing wajah. MAKANAN→interaksi makan. SKINCARE→aplikasi/glow. AKSESORIS→detail/refleksi.
FORMAT JSON MURNI (tanpa markdown): [{"name":"...","description":"deskripsi ID","imagePrompt":"Photorealistic portrait of Indonesian character. ${d.faceImage?'(Use attached face reference) ':''}[pose detail]. Set in ${d.setting}. ${d.vibe}. Aspect ${(d.platform.match(/\(([^)]+)\)/)||['','9:16'])[1]}. 8k, cinematic lighting, photorealism, 35mm lens.${d.color?' Color grading: '+d.color+'.':''}","videoPrompt":"Cinematic short video in ${d.setting}. [action]. ${d.vibe}. Aspect ${(d.platform.match(/\(([^)]+)\)/)||['','9:16'])[1]}. High quality, steady camera."}] Berikan tepat 5 objek.`,
  },

  faceless: {
    id:'faceless', title:'Faceless Video Creator', svgIcon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
    desc:'Prompt scene visual untuk konten tanpa wajah (storytelling, fakta, motivasi)',
    tag:'Tanpa Wajah', tagColor:'#38bdf8',
    iconBg:'rgba(56,189,248,.15)', iconColor:'#38bdf8',
    cardAccent:'linear-gradient(135deg,#38bdf8,#818cf8)',
    outputType:'prompt',
    promptCards:[
      {id:'img',label:'Prompt Background Image',colorClass:'card-color-image'},
      {id:'vid',label:'Prompt Background Video',colorClass:'card-color-video'},
    ],
    step1: (c) => {c.innerHTML=`<div class="form-grid">
      <label class="upload-area" for="fl-ref-upload">
        <input type="file" id="fl-ref-upload" accept="image/*" hidden/>
        <div id="fl-upload-placeholder" class="upload-placeholder">
          <div class="upload-icon-wrap"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
          <h3>Referensi Visual (Opsional)</h3><p>JPG, PNG, WebP</p><div class="upload-btn-fake">Pilih File</div>
        </div>
        <div id="fl-upload-preview" class="upload-preview hidden"><img id="fl-preview-img" src="" alt="Preview"/><div class="preview-overlay"><div class="preview-badge"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Terpilih</div><button id="fl-btn-remove-img" class="btn-remove-img" type="button">Hapus</button></div></div>
      </label>
      <div style="display:flex;flex-direction:column;gap:14px">
        <div class="form-group"><label>Topik / Niche Video <span class="required">*</span></label><input type="text" id="f-topic" placeholder="Cth: Cerita Horor Jepang, Fakta Luar Angkasa, Motivasi Bisnis"/></div>
        <div class="form-group"><label>Judul/Narasi Video <span class="required">*</span></label><input type="text" id="f-narration" placeholder="Cth: 5 Tempat Paling Misterius di Dunia"/></div>
        <div class="form-group"><label>Platform</label><div class="select-wrap"><select id="f-platform2"><option>TikTok / Reels (9:16)</option><option>YouTube Shorts (9:16)</option><option>YouTube (16:9)</option></select><svg class="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></div></div>
      </div>
    </div>`;},
    step2: (c) => {c.innerHTML=`<div style="display:flex;flex-direction:column;gap:18px">
      <div class="form-group"><label>Gaya Visual</label><div id="f-vis-chips" class="chips-row"></div></div>
      <div class="form-group"><label>Mood / Atmosphere</label><div id="f-mood-chips" class="chips-row"></div></div>
      <div class="form-group"><label>Detail Tambahan (Opsional)</label><input type="text" id="f-extra" placeholder="Cth: Ada kabut tebal, cahaya kemerahan..."/></div></div>`;},
    validate1: () => document.getElementById('f-topic')?.value.trim()&&document.getElementById('f-narration')?.value.trim(),
    validate2: () => (window._activeVisual||'').trim()&&(window._activeMood||'').trim(),
    collectStep1: () => ({topic:document.getElementById('f-topic').value,narration:document.getElementById('f-narration').value,platform:document.getElementById('f-platform2').value,refImage:window._facelessRefImage||null}),
    collectStep2: () => ({visual:window._activeVisual||'',mood:window._activeMood||'',extra:document.getElementById('f-extra')?.value||''}),
    buildPrompt: (d) => `Kamu pembuat prompt visual untuk konten faceless/tanpa wajah. Buatkan 5 variasi background scene.
Topik: ${d.topic}, Narasi: ${d.narration}, Gaya Visual: ${d.visual}, Mood: ${d.mood}${d.extra?', Detail: '+d.extra:''}${d.refImage?', Ada referensi visual dari user.':''}
ATURAN: TIDAK BOLEH ada manusia/orang dalam scene. Fokus pada environment, atmosphere, lighting. Sangat sinematik.
FORMAT JSON MURNI: [{"name":"Scene Name","description":"deskripsi ID","imagePrompt":"${d.refImage?'(Use attached visual reference for style/mood) ':''}[scene detail tanpa manusia]. ${d.mood}. 8k, cinematic, photorealistic, detailed environment.","videoPrompt":"Slow cinematic camera movement through [scene]. ${d.mood}. No people. High quality, atmospheric."}] Tepat 5.`,
  },

  uiux: {
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
      <div class="form-group"><label>Warna Brand (Opsional)</label><input type="text" id="f-uibrand" placeholder="Cth: Biru Navy, Hijau Emerald"/></div></div>`;},
    validate1: () => document.getElementById('f-apptype')?.value.trim()&&document.getElementById('f-feature')?.value.trim(),
    validate2: () => (window._activeUIColor||'').trim()&&(window._activeUIStyle||'').trim(),
    collectStep1: () => ({appType:document.getElementById('f-apptype').value,device:document.getElementById('f-device').value,feature:document.getElementById('f-feature').value}),
    collectStep2: () => ({uiColor:window._activeUIColor||'',uiStyle:window._activeUIStyle||'',brand:document.getElementById('f-uibrand')?.value||''}),
    buildPrompt: (d) => `Kamu ahli UI/UX design. Buatkan 5 variasi mockup desain untuk:
Jenis: ${d.appType}, Device: ${d.device}, Fitur: ${d.feature}, Tema: ${d.uiColor}, Gaya: ${d.uiStyle}${d.brand?', Warna Brand: '+d.brand:''}
FORMAT JSON MURNI: [{"name":"Mockup Name","description":"deskripsi ID","imagePrompt":"Dribbble-style UI/UX mockup for ${d.appType}. ${d.device} view. Showing ${d.feature}. ${d.uiStyle} design style. ${d.uiColor} color scheme.${d.brand?' Primary color: '+d.brand+'.':''} Clean layout, modern typography, pixel-perfect, 4K resolution, professional UI design.","videoPrompt":""}] Tepat 5.`,
  },

  diagram: {
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
      <div class="form-group"><label>Bahasa Label</label><div id="f-diaglang-chips" class="chips-row"></div></div></div>`;},
    validate1: () => document.getElementById('f-sql')?.value.trim(),
    validate2: () => true,
    collectStep1: () => ({diagType:document.getElementById('f-diagtype').value,sql:document.getElementById('f-sql').value}),
    collectStep2: () => ({extra:document.getElementById('f-diagextra')?.value||'',lang:window._activeDiagLang||'Indonesia'}),
    buildPrompt: (d) => `Kamu ahli software engineering. Buatkan kode Mermaid.js untuk ${d.diagType} berdasarkan input berikut.

INPUT SQL/DESKRIPSI:
${d.sql}

${d.extra?'Detail tambahan: '+d.extra:''}
Bahasa label: ${d.lang}

ATURAN PENTING:
- Output HANYA kode Mermaid.js VALID, tanpa backtick, tanpa markdown, tanpa penjelasan.
- Mulai langsung dengan keyword diagram (${d.diagType}).
- Pastikan syntax Mermaid.js benar dan bisa di-render.
- Gunakan label yang jelas dan deskriptif.
- Untuk Use Case, gunakan flowchart LR dengan aktor di kiri.
- Jangan gunakan karakter khusus yang bisa merusak syntax.`,
  },

  logo: {
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
      <div class="form-group"><label>Referensi Brand Lain (Opsional)</label><input type="text" id="f-logoref" placeholder="Cth: Mirip gaya Starbucks, Apple, Nike"/></div></div>`;},
    validate1: () => document.getElementById('f-brand')?.value.trim()&&document.getElementById('f-industry')?.value.trim(),
    validate2: () => (window._activeLogoColor||'').trim(),
    collectStep1: () => ({brand:document.getElementById('f-brand').value,industry:document.getElementById('f-industry').value,logoStyle:window._activeLogoStyle||'Minimalis'}),
    collectStep2: () => ({logoColor:window._activeLogoColor||'',symbol:document.getElementById('f-symbol')?.value||'',logoRef:document.getElementById('f-logoref')?.value||''}),
    buildPrompt: (d) => `Kamu ahli desain logo. Buatkan 5 variasi prompt logo untuk:
Brand: ${d.brand}, Industri: ${d.industry}, Gaya: ${d.logoStyle}, Warna: ${d.logoColor}${d.symbol?', Simbol: '+d.symbol:''}${d.logoRef?', Referensi: '+d.logoRef:''}
ATURAN: Logo HARUS flat/vector style. Background PUTIH BERSIH. TIDAK ADA teks/tulisan dalam logo. Clean lines.
FORMAT JSON MURNI: [{"name":"Logo Variant Name","description":"deskripsi ID","imagePrompt":"Professional ${d.logoStyle} logo design for ${d.brand}, a ${d.industry} brand. ${d.logoColor} color palette.${d.symbol?' Incorporating '+d.symbol+' symbol.':''} Vector flat design, white background, no text, clean lines, minimalist, professional branding, 4K.${d.logoRef?' Inspired by '+d.logoRef+' style.':''}","videoPrompt":""}] Tepat 5.`,
  },

  interior: {
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
      <div class="form-group"><label>Elemen Khusus (Opsional)</label><input type="text" id="f-intelement" placeholder="Cth: Tanaman hias, rak buku besar, perapian"/></div></div>`;},
    validate1: () => (window._activeIntStyle||'').trim(),
    validate2: () => (window._activeLighting||'').trim(),
    collectStep1: () => ({room:document.getElementById('f-room').value,intStyle:window._activeIntStyle||'',size:document.getElementById('f-size').value,refImage:window._interiorRefImage||null}),
    collectStep2: () => ({lighting:window._activeLighting||'',intColor:document.getElementById('f-intcolor')?.value||'',element:document.getElementById('f-intelement')?.value||''}),
    buildPrompt: (d) => `Kamu ahli desain interior & arsitektur. Buatkan 5 variasi render interior untuk:
Ruangan: ${d.room}, Gaya: ${d.intStyle}, Ukuran: ${d.size}, Cahaya: ${d.lighting}${d.intColor?', Warna: '+d.intColor:''}${d.element?', Elemen: '+d.element:''}${d.refImage?', Ada referensi visual desain dari user.':''}
FORMAT JSON MURNI: [{"name":"Design Name","description":"deskripsi ID","imagePrompt":"${d.refImage?'(Use attached design reference for style inspiration) ':''}Photorealistic interior design render of a ${d.size} ${d.room}. ${d.intStyle} style. ${d.lighting} lighting.${d.intColor?' '+d.intColor+' color palette.':''}${d.element?' Featuring '+d.element+'.':''} Octane render, Unreal Engine 5, architectural visualization, 8K resolution, hyperrealistic, professional interior photography.","videoPrompt":""}] Tepat 5.`,
  },
};

// Chip options for each module's step2
const CHIP_OPTIONS = {
  styles: ['UGC Casual','Editorial Magazine','Studio Catalog','Street Style','Cinematic Film','Soft Aesthetic'],
  settings: ['Studio Minimalis','Kafe Estetik','Kamar Cozy','Jalanan Kota','Taman/Alam','Rooftop Senja','Pantai Tropis','Mall'],
  vibes: ['Cinematic','Edgy & Bold','Fun & Ceria','Elegan','Casual','Dreamy','Warm & Cozy','Dark & Mysterious'],
  visuals: ['Cinematic Realism','Dark & Moody','Fantasy/Surreal','Anime Style','Vintage Film','Neon Glow'],
  moods: ['Horror / Seram','Misterius','Epik / Heroik','Tenang / Damai','Sedih / Melankolis','Futuristik'],
  uiColors: ['Dark Mode','Light Mode','Gradient Colorful','Monokrom','Pastel Soft','Neon / Vibrant'],
  uiStyles: ['Glassmorphism','Flat / Material','Neumorphism','Brutalist','Minimalis Clean','Skeuomorphism'],
  logoStyles: ['Minimalis','Maskot / Karakter','Emblem / Badge','Lettermark','Abstract','Vintage / Retro'],
  logoColors: ['Biru','Merah','Hijau','Hitam & Emas','Gradient Multi','Monokrom','Earth Tone','Pastel'],
  intStyles: ['Japandi','Industrial','Scandinavian','Modern Minimalis','Bohemian','Art Deco','Rustic','Mediterranean'],
  lightings: ['Pagi Cerah (Natural Light)','Siang Hari','Golden Hour / Senja','Malam Hari (Warm Lamp)','Dramatis (Spotlight)'],
  diagLangs: ['Indonesia','English'],
};
