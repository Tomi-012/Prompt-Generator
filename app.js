/* ============================================================
   APP.JS — AI Creative Studio Core Engine
   Dashboard, Wizard, Multi-Provider AI API, Mermaid, History
   ============================================================ */
(function(){
'use strict';

// ===================== PROVIDER CONFIGS =====================
const PROVIDERS = {
  gemini: {
    name: 'Google Gemini',
    url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    linkText: 'Google AI Studio',
    linkUrl: 'https://aistudio.google.com/apikey',
    type: 'gemini',
  },
  alibaba: {
    name: 'Alibaba Cloud (Qwen)',
    url: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions',
    model: 'qwen-plus',
    linkText: 'Alibaba Model Studio',
    linkUrl: 'https://modelstudio.console.alibabacloud.com/',
    type: 'openai',
  },
  glm: {
    name: 'GLM Z.AI',
    url: 'https://api.z.ai/api/coding/paas/v4/chat/completions',
    model: 'glm-4-flash',
    linkText: 'Z.AI (International)',
    linkUrl: 'https://z.ai/model-api',
    type: 'openai',
  },
  openrouter: {
    name: 'OpenRouter',
    url: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'meta-llama/llama-3.3-70b-instruct:free',
    linkText: 'OpenRouter.ai',
    linkUrl: 'https://openrouter.ai/keys',
    type: 'openai',
  },
  groq: {
    name: 'Groq',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.3-70b-versatile',
    linkText: 'Groq Console',
    linkUrl: 'https://console.groq.com/keys',
    type: 'openai',
  },
  sambanova: {
    name: 'SambaNova',
    url: 'https://api.sambanova.ai/v1/chat/completions',
    model: 'Meta-Llama-3.3-70B-Instruct',
    linkText: 'SambaNova Cloud',
    linkUrl: 'https://cloud.sambanova.ai/apis',
    type: 'openai',
  },
};

// ===================== STATE =====================
const state = {activeModule:null,step:0,data:{},results:[],mermaidCode:'',usedAI:false,apiKey:'',activeTab:0,provider:'gemini'};
const API_KEY_STORAGE='acs_api_key', PROVIDER_STORAGE='acs_provider', HISTORY_STORAGE='acs_history';
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

// ===================== INIT =====================
mermaid.initialize({startOnLoad:false,theme:'dark',themeVariables:{
  primaryColor:'#818cf8',primaryTextColor:'#e8e8f0',primaryBorderColor:'#818cf8',
  lineColor:'#9294b0',secondaryColor:'#c084fc',tertiaryColor:'#1e1e3f',
  noteBkgColor:'#1e1e3f',noteTextColor:'#e8e8f0',actorBkg:'#818cf8',actorTextColor:'#fff',
  actorLineColor:'#9294b0',signalColor:'#e8e8f0',labelBoxBkgColor:'#101028',labelTextColor:'#e8e8f0'
}});

// Load saved provider
const savedProvider=localStorage.getItem(PROVIDER_STORAGE);
if(savedProvider && PROVIDERS[savedProvider]){state.provider=savedProvider;$('#api-provider-select').value=savedProvider;}
updateProviderUI();

// Load API Key (per-provider)
loadAPIKeyForProvider();

function getKeyStorageId(){return API_KEY_STORAGE+'_'+state.provider;}

function loadAPIKeyForProvider(){
  const key=localStorage.getItem(getKeyStorageId())||'';
  state.apiKey=key;
  $('#api-key-input').value=key;
  if(key){$('#api-status').textContent='Key tersimpan';$('#api-status').className='api-status success';}
  else{$('#api-status').textContent='';$('#api-status').className='api-status';}
}

function updateProviderUI(){
  const p=PROVIDERS[state.provider];if(!p)return;
  const linkEl=$('#api-link-href');
  if(linkEl){linkEl.textContent=p.linkText;linkEl.href=p.linkUrl;}
}

// Provider change
$('#api-provider-select').addEventListener('change',e=>{
  state.provider=e.target.value;
  localStorage.setItem(PROVIDER_STORAGE,state.provider);
  updateProviderUI();
  loadAPIKeyForProvider();
});

function saveAPIKey() {
  state.apiKey=$('#api-key-input').value.trim();
  if(state.apiKey){
    localStorage.setItem(getKeyStorageId(),state.apiKey);
    $('#api-status').textContent='Key tersimpan';
    $('#api-status').className='api-status success';
    showToast('API Key Berhasil Disimpan!');
  } else {
    localStorage.removeItem(getKeyStorageId());
    $('#api-status').textContent='';
    $('#api-status').className='api-status';
  }
}

$('#api-key-input').addEventListener('blur', saveAPIKey);
if ($('#btn-save-key')) $('#btn-save-key').addEventListener('click', saveAPIKey);
$('#btn-toggle-key').addEventListener('click',()=>{const i=$('#api-key-input');i.type=i.type==='password'?'text':'password';});

// ===================== DASHBOARD =====================
function renderDashboard(){
  const grid=$('#module-grid');grid.innerHTML='';
  Object.values(MODULES).forEach(m=>{
    const card=document.createElement('div');
    card.className='module-card';
    card.style.setProperty('--card-accent',m.cardAccent);
    card.style.setProperty('--icon-bg',m.iconBg);
    card.style.setProperty('--icon-color',m.iconColor);
    card.style.setProperty('--tag-bg',m.iconBg);
    card.style.setProperty('--tag-color',m.iconColor);
    card.innerHTML=`<div class="module-card-icon">${m.svgIcon}</div><h3>${m.title}</h3><p>${m.desc}</p><span class="module-card-tag">${m.tag}</span>`;
    card.addEventListener('click',()=>openModule(m.id));
    grid.appendChild(card);
  });
}

function openModule(id){
  const m=MODULES[id];if(!m)return;
  state.activeModule=id;state.step=1;state.data={};state.results=[];state.mermaidCode='';state.activeTab=0;
  window._faceImage=null;window._activeStyle='UGC Casual';
  window._activeSetting='';window._activeVibe='';
  window._activeVisual='';window._activeMood='';
  window._activeUIColor='';window._activeUIStyle='';
  window._activeLogoStyle='Minimalis';window._activeLogoColor='';
  window._activeIntStyle='';window._activeLighting='';
  window._activeDiagLang='Indonesia';

  $('#home-screen').classList.add('hidden');
  $('#wizard-screen').classList.remove('hidden');
  $('#wizard-module-icon').innerHTML=m.svgIcon;
  $('#wizard-module-title').textContent=m.title;
  $('#wizard-module-desc').textContent=m.desc;
  $('#btn-generate-text').textContent=m.outputType==='diagram'?'Generate Diagram':'Generate 5 Opsi';

  renderStep(1);
}

$('#btn-back-home').addEventListener('click',()=>{
  $('#wizard-screen').classList.add('hidden');
  $('#home-screen').classList.remove('hidden');
  state.activeModule=null;
});

// ===================== STEP MANAGEMENT =====================
function renderStep(n){
  state.step=n;
  $$('.step-panel').forEach(p=>p.classList.remove('active'));
  const panel=$(`#step-${n}`);if(panel)panel.classList.add('active');
  const pct=((n-1)/2)*100;
  $('#progress-fill').style.width=pct+'%';
  $$('.progress-step').forEach(s=>{
    const sn=+s.dataset.step;s.classList.remove('active','completed');
    if(sn<n)s.classList.add('completed');else if(sn===n)s.classList.add('active');
  });

  const m=MODULES[state.activeModule];if(!m)return;

  if(n===1){
    m.step1($('#step1-body'));
    setupStep1Interactivity(m);
    $('#btn-next-1').disabled=true;
    validateCurrentStep();
  }
  if(n===2){
    Object.assign(state.data,m.collectStep1());
    m.step2($('#step2-body'),state.data);
    setupStep2Interactivity(m);
    $('#btn-generate').disabled=true;
    validateCurrentStep();
  }
  window.scrollTo({top:0,behavior:'smooth'});
}

function validateCurrentStep(){
  const m=MODULES[state.activeModule];if(!m)return;
  if(state.step===1){$('#btn-next-1').disabled=!m.validate1();}
  if(state.step===2){$('#btn-generate').disabled=!m.validate2(state.data);}
}

// ===================== STEP 1 INTERACTIVITY =====================
function setupStep1Interactivity(m){
  if(m.id==='affiliate'){
    const fu=$('#face-upload');const rm=$('#btn-remove-img');
    fu?.addEventListener('change',e=>{
      const f=e.target.files[0];if(!f)return;
      window._faceImage=URL.createObjectURL(f);
      $('#preview-img').src=window._faceImage;
      $('#upload-placeholder').classList.add('hidden');
      $('#upload-preview').classList.remove('hidden');
    });
    rm?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();window._faceImage=null;fu.value='';$('#upload-placeholder').classList.remove('hidden');$('#upload-preview').classList.add('hidden');});
    bindInput('f-category','change');bindInput('f-product','input');
    renderChipGroup('f-style-chips',CHIP_OPTIONS.styles,'_activeStyle','UGC Casual');
  }
  if(m.id==='faceless'){bindInput('f-topic','input');bindInput('f-narration','input');}
  if(m.id==='uiux'){bindInput('f-apptype','input');bindInput('f-feature','input');}
  if(m.id==='diagram'){bindInput('f-sql','input');}
  if(m.id==='logo'){
    bindInput('f-brand','input');bindInput('f-industry','input');
    renderChipGroup('f-logostyle-chips',CHIP_OPTIONS.logoStyles,'_activeLogoStyle','Minimalis');
  }
  if(m.id==='interior'){
    renderChipGroup('f-intstyle-chips',CHIP_OPTIONS.intStyles,'_activeIntStyle','');
  }
}

// ===================== STEP 2 INTERACTIVITY =====================
function setupStep2Interactivity(m){
  if(m.id==='affiliate'){
    renderChipGroup('f-setting-chips',CHIP_OPTIONS.settings,'_activeSetting','',true,'f-setting');
    renderChipGroup('f-vibe-chips',CHIP_OPTIONS.vibes,'_activeVibe','',true,'f-vibe');
    bindInput('f-setting','input',v=>{window._activeSetting=v;deselectChips('f-setting-chips');});
    bindInput('f-vibe','input',v=>{window._activeVibe=v;deselectChips('f-vibe-chips');});
    bindInput('f-color','input');
  }
  if(m.id==='faceless'){
    renderChipGroup('f-vis-chips',CHIP_OPTIONS.visuals,'_activeVisual','');
    renderChipGroup('f-mood-chips',CHIP_OPTIONS.moods,'_activeMood','');
    bindInput('f-extra','input');
  }
  if(m.id==='uiux'){
    renderChipGroup('f-uicolor-chips',CHIP_OPTIONS.uiColors,'_activeUIColor','');
    renderChipGroup('f-uistyle-chips',CHIP_OPTIONS.uiStyles,'_activeUIStyle','');
    bindInput('f-uibrand','input');
  }
  if(m.id==='diagram'){
    renderChipGroup('f-diaglang-chips',CHIP_OPTIONS.diagLangs,'_activeDiagLang','Indonesia');
    bindInput('f-diagextra','input');
  }
  if(m.id==='logo'){
    renderChipGroup('f-logocolor-chips',CHIP_OPTIONS.logoColors,'_activeLogoColor','');
    bindInput('f-symbol','input');bindInput('f-logoref','input');
  }
  if(m.id==='interior'){
    renderChipGroup('f-lighting-chips',CHIP_OPTIONS.lightings,'_activeLighting','');
    bindInput('f-intcolor','input');bindInput('f-intelement','input');
  }
}

// ===================== HELPERS =====================
function bindInput(id,evt,cb){
  const el=document.getElementById(id);if(!el)return;
  el.addEventListener(evt,()=>{if(cb)cb(el.value);validateCurrentStep();});
}

function renderChipGroup(containerId,options,globalVar,defaultVal,clearInput,inputId){
  const container=document.getElementById(containerId);if(!container)return;
  if(defaultVal)window[globalVar]=defaultVal;
  container.innerHTML='';
  options.forEach(opt=>{
    const chip=document.createElement('button');
    chip.className='chip'+(window[globalVar]===opt?' active':'');
    chip.type='button';chip.textContent=opt;
    chip.addEventListener('click',()=>{
      window[globalVar]=opt;
      container.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
      chip.classList.add('active');
      if(clearInput&&inputId){const inp=document.getElementById(inputId);if(inp)inp.value='';}
      validateCurrentStep();
    });
    container.appendChild(chip);
  });
}

function deselectChips(containerId){
  const c=document.getElementById(containerId);if(c)c.querySelectorAll('.chip').forEach(ch=>ch.classList.remove('active'));
}

// ===================== NAVIGATION =====================
$('#btn-next-1').addEventListener('click',()=>{if(!$('#btn-next-1').disabled)renderStep(2);});
$('#btn-back-2').addEventListener('click',()=>renderStep(1));
$('#btn-generate').addEventListener('click',()=>{if(!$('#btn-generate').disabled)startGeneration();});
$('#btn-retry').addEventListener('click',()=>startGeneration());
$('#btn-reset').addEventListener('click',()=>openModule(state.activeModule));
$('#btn-diagram-reset').addEventListener('click',()=>openModule(state.activeModule));

// ===================== MULTI-PROVIDER AI API =====================
async function callAI(prompt, isDiagram){
  const provider = PROVIDERS[state.provider];
  if(!provider) throw new Error('Provider tidak ditemukan.');

  if(provider.type === 'gemini'){
    // Google Gemini format
    const res = await fetch(`${provider.url}?key=${state.apiKey}`,{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        contents:[{parts:[{text:prompt}]}],
        generationConfig:{temperature:0.85,topP:0.95,maxOutputTokens:4096,
          ...(!isDiagram?{responseMimeType:'application/json'}:{})}
      })
    });
    if(!res.ok){const e=await res.json().catch(()=>({}));throw new Error(e?.error?.message||`HTTP ${res.status}`);}
    const data=await res.json();
    const text=data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if(!text) throw new Error('Respon kosong dari Gemini.');
    return text;
  } else {
    // OpenAI-compatible format (Alibaba, GLM, OpenRouter, Groq, SambaNova)
    const headers = {
      'Content-Type':'application/json',
      'Authorization':`Bearer ${state.apiKey}`,
    };
    // OpenRouter requires extra headers
    if(state.provider==='openrouter'){
      headers['HTTP-Referer'] = window.location.href;
      headers['X-Title'] = 'AI Creative Studio';
    }

    const body = {
      model: provider.model,
      messages: [
        {role:'system', content:'Kamu adalah AI assistant yang ahli dan sangat membantu. Jawab selalu dalam format yang diminta user.'},
        {role:'user', content: prompt}
      ],
      temperature: 0.85,
      max_tokens: 4096,
    };

    const res = await fetch(provider.url, {
      method:'POST', headers, body: JSON.stringify(body)
    });

    if(!res.ok){
      const e = await res.json().catch(()=>({}));
      const msg = e?.error?.message || e?.message || `HTTP ${res.status}`;
      throw new Error(msg);
    }

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    if(!text) throw new Error(`Respon kosong dari ${provider.name}.`);
    return text;
  }
}

async function startGeneration(){
  const m=MODULES[state.activeModule];if(!m)return;
  Object.assign(state.data,m.collectStep2());
  const providerName = PROVIDERS[state.provider]?.name || 'AI';

  $$('.step-panel').forEach(p=>p.classList.remove('active'));
  $('#step-loading').classList.add('active');
  $('#loading-title').textContent=`${providerName} sedang bekerja...`;
  $('#loading-subtitle').textContent=m.outputType==='diagram'?'Menganalisis SQL & membuat diagram...':'Meracik 5 variasi kreatif...';

  if(!state.apiKey){
    $$('.step-panel').forEach(p=>p.classList.remove('active'));
    $('#step-error').classList.add('active');
    $('#error-message').textContent='API Key belum diisi. Silakan isi dan simpan API Key di bagian atas.';
    return;
  }

  try{
    const prompt=m.buildPrompt(state.data);
    const text = await callAI(prompt, m.outputType==='diagram');

    state.usedAI=true;

    if(m.outputType==='diagram'){
      let code=text.replace(/```mermaid\n?/g,'').replace(/```\n?/g,'').trim();
      state.mermaidCode=code;
      showDiagramResult();
    } else {
      let poses;
      try{poses=JSON.parse(text);}catch{const match=text.match(/\[[\s\S]*\]/);if(match)poses=JSON.parse(match[0]);else throw new Error('Gagal parsing JSON.');}
      if(!Array.isArray(poses)||!poses.length)throw new Error('Format tidak valid.');
      state.results=poses.slice(0,5).map(p=>({name:p.name||'Untitled',description:p.description||'',imagePrompt:p.imagePrompt||'',videoPrompt:p.videoPrompt||''}));
      state.activeTab=0;renderStep(3);renderResults();
    }
    saveToHistory();
  }catch(err){
    console.error('AI Error:',err);
    $$('.step-panel').forEach(p=>p.classList.remove('active'));
    $('#step-error').classList.add('active');
    $('#error-message').textContent=err.message;
  }
}

// ===================== RESULTS (Prompt-based) =====================
function renderResults(){
  const m=MODULES[state.activeModule];if(!m)return;
  const providerName = PROVIDERS[state.provider]?.name || 'AI';

  $('#sidebar-title').textContent=m.title+' — Hasil';
  $('#sidebar-desc').innerHTML=`<strong>${state.data.product||state.data.topic||state.data.appType||state.data.brand||state.data.room||''}</strong> — ${state.usedAI?'AI: '+providerName:'Template'}`;

  const list=$('#pose-list');list.innerHTML='';
  state.results.forEach((r,i)=>{
    const btn=document.createElement('button');
    btn.className='pose-item'+(i===state.activeTab?' active':'');
    btn.innerHTML=`<div class="pose-item-top"><span class="pose-item-label">Opsi ${i+1}</span><svg class="pose-item-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div><div class="pose-item-name">${r.name}</div><div class="pose-item-desc">${r.description}</div>`;
    btn.addEventListener('click',()=>{state.activeTab=i;renderActiveResult();$$('.pose-item').forEach((p,j)=>p.classList.toggle('active',j===i));});
    list.appendChild(btn);
  });

  const container=$('#prompt-cards-container');container.innerHTML='';
  const cards=m.promptCards||[{id:'img',label:'Prompt',colorClass:'card-color-prompt'}];
  cards.forEach(card=>{
    const div=document.createElement('div');
    div.className=`prompt-card`;
    div.innerHTML=`<div class="prompt-card-header"><div class="prompt-card-title ${card.colorClass}">${card.label}</div>
      <button class="btn-copy" data-target="prompt-${card.id}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Salin</button></div>
      <textarea id="prompt-${card.id}" class="prompt-textarea${card.small?' prompt-textarea-sm':''}" readonly></textarea>`;
    container.appendChild(div);
  });

  container.querySelectorAll('.btn-copy').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const ta=$(`#${btn.dataset.target}`);if(!ta)return;
      navigator.clipboard.writeText(ta.value).then(()=>{
        btn.classList.add('copied');const orig=btn.innerHTML;
        btn.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Tersalin!';
        showToast('Prompt berhasil disalin!');
        setTimeout(()=>{btn.classList.remove('copied');btn.innerHTML=orig;},2000);
      });
    });
  });

  renderActiveResult();
}

function renderActiveResult(){
  const r=state.results[state.activeTab];if(!r)return;
  $('#result-pose-name').textContent=r.name;
  $('#result-pose-desc').textContent=r.description;

  const imgTA=$('#prompt-img');if(imgTA)imgTA.value=r.imagePrompt||'';
  const vidTA=$('#prompt-vid');if(vidTA)vidTA.value=r.videoPrompt||'';
  const negTA=$('#prompt-neg');
  if(negTA){
    negTA.value='text, watermark, logo, ugly, deformed, bad anatomy, bad hands, extra fingers, missing fingers, extra limbs, fused fingers, long neck, cross-eyed, mutated, disfigured, blurry, out of focus, low quality, jpeg artifacts, signature';
  }
}

// ===================== DIAGRAM RESULTS =====================
async function showDiagramResult(){
  $$('.step-panel').forEach(p=>p.classList.remove('active'));
  $('#step-3-diagram').classList.add('active');

  const pct=100;$('#progress-fill').style.width=pct+'%';
  $$('.progress-step').forEach(s=>{const sn=+s.dataset.step;s.classList.remove('active','completed');if(sn<3)s.classList.add('completed');else if(sn===3)s.classList.add('active');});

  const providerName = PROVIDERS[state.provider]?.name || 'AI';
  $('#diagram-result-title').textContent=`${state.data.diagType||'Diagram'} — ${state.usedAI?providerName:'Fallback'}`;
  $('#diagram-code-output').textContent=state.mermaidCode;

  const renderArea=$('#diagram-render-area');
  renderArea.innerHTML='<div style="color:var(--text-muted);font-size:13px;">Rendering diagram...</div>';

  try{
    const id='mermaid-'+Date.now();
    const{svg}=await mermaid.render(id,state.mermaidCode);
    renderArea.innerHTML=svg;
  }catch(err){
    console.error('Mermaid render error:',err);
    renderArea.innerHTML=`<div style="text-align:center;padding:40px;color:var(--color-danger)">
      <p style="font-weight:700;margin-bottom:8px">Gagal merender diagram</p>
      <p style="font-size:12px;color:var(--text-muted)">${err.message||'Syntax Mermaid tidak valid.'}</p>
      <p style="font-size:11px;color:var(--text-muted);margin-top:12px">Kode Mermaid tersedia di bawah untuk di-copy manual.</p></div>`;
  }
}

$('#btn-copy-mermaid').addEventListener('click',()=>{
  navigator.clipboard.writeText(state.mermaidCode).then(()=>showToast('Kode Mermaid berhasil disalin!'));
});

$('#btn-download-svg').addEventListener('click',()=>{
  const svgEl=$('#diagram-render-area svg');
  if(!svgEl){showToast('Tidak ada diagram untuk didownload');return;}
  const svgData=new XMLSerializer().serializeToString(svgEl);
  const blob=new Blob([svgData],{type:'image/svg+xml'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=`diagram-${Date.now()}.svg`;a.click();
  URL.revokeObjectURL(url);
  showToast('SVG berhasil didownload!');
});

// ===================== HISTORY =====================
function loadHistory(){try{return JSON.parse(localStorage.getItem(HISTORY_STORAGE)||'[]');}catch{return[];}}
function saveToHistory(){
  const h=loadHistory();
  const newEntry={id:Date.now().toString(),timestamp:Date.now(),module:state.activeModule,title:MODULES[state.activeModule]?.title||'',
    label:state.data.product||state.data.topic||state.data.appType||state.data.brand||state.data.room||state.data.diagType||'',
    usedAI:state.usedAI,provider:state.provider,results:state.results,mermaidCode:state.mermaidCode,data:state.data};
  h.unshift(newEntry);
  localStorage.setItem(HISTORY_STORAGE,JSON.stringify(h));
  renderHistory();
}
function deleteHistoryItem(id){
  let h=loadHistory();
  h=h.filter(x=>x.id!==id);
  localStorage.setItem(HISTORY_STORAGE,JSON.stringify(h));
  renderHistory();
}
function renderHistory(){
  const h=loadHistory();$('#history-count').textContent=h.length;
  const list=$('#history-list');
  if(!h.length){list.innerHTML='<p class="history-empty">Belum ada riwayat.</p>';return;}
  list.innerHTML='';
  h.forEach((entry, i)=>{
    if (!entry.id) entry.id = entry.timestamp.toString() + i; // fallback old data
    const item=document.createElement('div');item.className='history-item';
    const d=new Date(entry.timestamp);
    const dateStr=d.toLocaleDateString('id-ID')+' '+d.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});
    const pName = PROVIDERS[entry.provider]?.name || 'Template';
    item.innerHTML=`<div class="history-item-info"><div class="history-item-title">${entry.label}</div><div class="history-item-meta">${entry.title} · ${dateStr}</div></div>
      <div style="display:flex; align-items:center; gap:6px;">
        <span class="history-item-badge ${entry.usedAI?'gemini':'template'}">${entry.usedAI?pName:'Template'}</span>
        <button class="btn-delete-history btn-icon-sm" data-id="${entry.id}" style="color:var(--color-danger);"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg></button>
      </div>`;
    item.querySelector('.history-item-info').addEventListener('click',()=>{
      state.activeModule=entry.module;state.results=entry.results||[];state.mermaidCode=entry.mermaidCode||'';
      state.usedAI=entry.usedAI;state.data=entry.data||{};state.activeTab=0;
      if(entry.provider){state.provider=entry.provider;$('#api-provider-select').value=entry.provider;updateProviderUI();loadAPIKeyForProvider();}
      $('#history-panel').classList.add('hidden');$('#btn-history-toggle').classList.remove('active');
      $('#home-screen').classList.add('hidden');$('#wizard-screen').classList.remove('hidden');
      const m=MODULES[entry.module];
      $('#wizard-module-icon').innerHTML=m?.svgIcon||'';$('#wizard-module-title').textContent=m?.title||'';$('#wizard-module-desc').textContent=m?.desc||'';
      if(m?.outputType==='diagram'){showDiagramResult();}
      else{renderStep(3);renderResults();}
    });
    item.querySelector('.btn-delete-history').addEventListener('click',(e)=>{
      e.stopPropagation();
      deleteHistoryItem(entry.id);
      showToast('Item riwayat dihapus');
    });
    list.appendChild(item);
  });
}

$('#btn-history-toggle').addEventListener('click',()=>{
  const hidden=$('#history-panel').classList.toggle('hidden');
  $('#btn-history-toggle').classList.toggle('active',!hidden);
});
$('#btn-clear-history').addEventListener('click',()=>{localStorage.removeItem(HISTORY_STORAGE);renderHistory();showToast('Riwayat dihapus');});

// ===================== TOAST =====================
function showToast(msg){
  $('#toast-message').textContent=msg;$('#toast').classList.remove('hidden');$('#toast').classList.add('visible');
  setTimeout(()=>{$('#toast').classList.remove('visible');setTimeout(()=>$('#toast').classList.add('hidden'),300);},2500);
}

// ===================== BOOT =====================
renderDashboard();
renderHistory();

})();
