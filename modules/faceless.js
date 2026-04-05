/* modules/faceless.js — Faceless Video Creator Module */
const FACELESS_MODULE = {
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
    <div class="form-group"><label>Detail Tambahan (Opsional)</label><input type="text" id="f-extra" placeholder="Cth: Ada kabut tebal, cahaya kemerahan..."/></div>
    <div class="form-group"><label>Bahasa Output</label><div id="f-lang-chips" class="chips-row"></div></div></div>`;},
  validate1: () => document.getElementById('f-topic')?.value.trim()&&document.getElementById('f-narration')?.value.trim(),
  validate2: () => (window._activeVisual||'').trim()&&(window._activeMood||'').trim(),
  collectStep1: () => ({topic:document.getElementById('f-topic').value,narration:document.getElementById('f-narration').value,platform:document.getElementById('f-platform2').value,refImage:window._facelessRefImage||null}),
  collectStep2: () => ({visual:window._activeVisual||'',mood:window._activeMood||'',extra:document.getElementById('f-extra')?.value||'',lang:window._activeLang||'Indonesia'}),
  buildPrompt: (d) => `Kamu pembuat prompt visual untuk konten faceless/tanpa wajah. Buatkan 5 variasi background scene.
Topik: ${d.topic}, Narasi: ${d.narration}, Gaya Visual: ${d.visual}, Mood: ${d.mood}${d.extra?', Detail: '+d.extra:''}${d.refImage?', Ada referensi visual dari user.':''}
PENTING: Gunakan bahasa ${d.lang} untuk merespons bagian 'name' dan 'description'. Nilai untuk 'imagePrompt' HARUS SELALU dalam bahasa Inggris agar kompatibel dengan sistem Midjourney.
ATURAN: TIDAK BOLEH ada manusia/orang dalam scene. Fokus pada environment, atmosphere, lighting. Sangat sinematik.
FORMAT JSON MURNI: [{"name":"Scene Name","description":"deskripsi ID","imagePrompt":"${d.refImage?'(Use attached visual reference for style/mood) ':''}[scene detail tanpa manusia]. ${d.mood}. 8k, cinematic, photorealistic, detailed environment.","videoPrompt":"Slow cinematic camera movement through [scene]. ${d.mood}. No people. High quality, atmospheric."}] Tepat 5.`,
};
