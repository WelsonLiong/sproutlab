import {welcome} from './first-screens.js';
import {activeProfile,saveLegacy,explorerFields,bindExplorerFields,newAttempt,profiles,selectGuestProfile} from './grove-progress.js';
const icons={lock:'M7 10V7a5 5 0 0 1 10 0v3M5 10h14v12H5ZM12 15v3',unlock:'M7 10V7a5 5 0 0 1 9-3M5 10h14v12H5ZM12 15v3',sprout:'M12 22V11M12 16C3 17 2 9 2 9c9-1 11 4 10 7M12 11C12 3 21 2 21 2c1 8-5 11-9 9',map:'m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2ZM9 3v16M15 5v16',book:'M12 5C8 2 3 3 2 4v16c4-2 7-1 10 1 3-2 6-3 10-1V4c-4-2-7-1-10 1Zm0 0v16',sun:'M12 3V1M12 23v-2M3 12H1M23 12h-2M5 5 3 3M21 21l-2-2M5 19l-2 2M21 3l-2 2M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0',drop:'M12 2C10 6 4 11 4 16a8 8 0 0 0 16 0c0-5-6-10-8-14ZM8 16c0 2 1 3 3 3',leaf:'M20 3C6 1 1 9 6 16c7 7 16 2 14-13ZM4 21 16 8',search:'M16 16l6 6M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',flask:'M9 2h6M10 2v7L4 20c-.5 1 0 2 2 2h12c2 0 2.5-1 2-2L14 9V2M7 15h10',flag:'M4 22V3M4 3c7-4 9 4 16 0v11c-7 4-9-4-16 0',star:'m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z',arrow:'M4 12h16m-6-6 6 6-6 6',check:'m5 12 4 4L20 5',clock:'M12 8v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',shield:'M12 2 3 5v7c0 5 9 10 9 10s9-5 9-10V5ZM8 12l3 3 5-6',teacher:'m2 8 10-5 10 5-10 5ZM6 10v7c4 3 8 3 12 0v-7M22 8v9',volume:'m11 3-6 5H2v8h3l6 5ZM15 7c3 3 3 7 0 10M18 4c5 5 5 11 0 16',settings:'M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8ZM9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1Z',play:'m8 3 14 9-14 9Z',game:'M7 7h10c5 0 6 11 4 13-2 1-4-4-6-4H9c-2 0-4 5-6 4C1 18 2 7 7 7ZM8 10v6M5 13h6M16 11h.1M19 14h.1',wind:'M2 8h14a3 3 0 1 0-3-3M2 12h18a3 3 0 1 1-3 3M2 16h7a3 3 0 1 1-3 3',lightbulb:'M9 21h6M9 18v-3a7 7 0 1 1 6 0v3Z',heart:'M12 21S1 14 1 7c0-6 8-7 11-2 3-5 11-4 11 2 0 7-11 14-11 14',download:'M12 2v13m-5-5 5 5 5-5M3 16v6h18v-6'};
export const icon=(n)=>`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[n]||icons.leaf}"/></svg>`;
export const stations=[['mystery','The plant mystery','search','2 min','#f9d96c'],['story','Inside a leaf','leaf','3 min','#d7eca5'],['lab','The leaf lab','flask','3 min','#a9dcea'],['creek','Creek rescue','drop','3 min','#a9dcea'],['detective','AI detective','shield','3 min','#d9c7f1'],['check','Show what you know','star','Play at your pace','#f6b4a0'],['finish','My new discoveries','flag','2 min','#f9d96c']];
let saved={};try{saved=JSON.parse(localStorage.getItem('sprout-lab-v1')||'{}')||{}}catch{}
export const state={done:Array.isArray(saved.done)?saved.done.filter(x=>stations.some(s=>s[0]===x)):[],settings:saved.settings||{},learnerName:typeof saved.learnerName==='string'?saved.learnerName.slice(0,24):'',journal:typeof saved.journal==='string'?saved.journal:'',score:Number(saved.score)||0,quizVersion:Number(saved.quizVersion)||0,quizTotal:Number(saved.quizTotal)||5,labRuns:Array.isArray(saved.labRuns)?saved.labRuns:[],...{}};
export function save(){try{localStorage.setItem('sprout-lab-v1',JSON.stringify(state));saveLegacy({done:state.done,journal:state.journal,score:state.score,quizVersion:state.quizVersion,quizTotal:state.quizTotal,labRuns:state.labRuns})}catch{toast('Progress cannot be saved in this browser. You can still keep exploring.')}}
export function toast(text){const el=document.querySelector('#toast');el.textContent=text;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),3600)}
export function complete(id){if(!state.done.includes(id)){state.done.push(id);save();updateProgress();toast('A new discovery for your field journal!');chime()}setNextVisible(id,true)}
export function chime(){if(!state.settings.sound)return;try{const ctx=new (window.AudioContext||window.webkitAudioContext)();[523,659,784].forEach((n,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=n;g.gain.setValueAtTime(.08,ctx.currentTime+i*.12);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+i*.12+.22);o.start(ctx.currentTime+i*.12);o.stop(ctx.currentTime+i*.12+.23)});setTimeout(()=>ctx.close(),1000)}catch{}}
export function read(text){if(!('speechSynthesis'in window)){toast('Read-aloud is unavailable here. All narration is also written on screen.');return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-GB';u.rate=.88;speechSynthesis.speak(u)}
export const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function audio(text){return `<button class="audio-btn" data-read="${escapeHTML(text)}">${icon('volume')} Listen to this</button>`}
export function setNextVisible(id,visible){document.querySelectorAll(`[data-next-for="${id}"]`).forEach(button=>{button.hidden=false;button.setAttribute('aria-disabled',String(!visible));if(visible)button.removeAttribute('tabindex');else button.setAttribute('tabindex','-1')})}
export function next(id,label='Next discovery',gate=false){const index=stations.findIndex(s=>s[0]===id),gateAttr=gate?` aria-disabled="true" tabindex="-1" data-next-for="${id}"`:'';return `<div class="lesson-nav"><a href="#map">${icon('map')} Back to the garden</a><p>No rush. You can revisit any stop.</p>${index<6?`<a class="btn"${gateAttr} href="#${stations[index+1][0]==='story'?'factory':stations[index+1][0]}">${label} ${icon('arrow')}</a>`:`<a class="btn"${gateAttr} href="#journal">Open my journal ${icon('book')}</a>`}</div>`}
export function title(id,title,desc){const s=stations.find(s=>s[0]===id);return `<div class="lesson-top"><a href="#map">My adventure</a><span>/</span><span>Stop ${stations.indexOf(s)+1} of 7 · ${s?.[3]||''}</span></div><div class="lesson-heading"><h1>${title}</h1><p>${desc}</p></div>`}
function updateProgress(){document.querySelector('#progress-count').textContent=`${state.done.length} / 7`;highlight()}
export function cast(name,cls=''){return `<span class="cast cast-${name} ${cls}" aria-hidden="true"></span>`}
export function companion(text,name='sprout'){return `<div class="companion">${cast(name)}<div class="bubble">${text}</div></div>`}
function highlight(){const route=location.hash.slice(1)||'map';document.querySelectorAll('[data-nav]').forEach(a=>{a.classList.toggle('active',a.dataset.nav===route);if(a.dataset.nav===route)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})}
export function adoptExplorer(profile){
 if(!Object.keys(profile.legacy||{}).length&&profiles().length===1&&(!state.learnerName||state.learnerName===profile.name))profile.legacy={done:[...state.done],journal:state.journal,score:state.score,quizVersion:state.quizVersion,quizTotal:state.quizTotal,labRuns:[...state.labRuns]};
 const legacy=profile.legacy||{};state.learnerName=profile.name;state.done=Array.isArray(legacy.done)?legacy.done.filter(x=>stations.some(s=>s[0]===x)):[];state.journal=legacy.journal||'';state.score=Number(legacy.score)||0;state.quizVersion=Number(legacy.quizVersion)||0;state.quizTotal=Number(legacy.quizTotal)||10;state.labRuns=Array.isArray(legacy.labRuns)?legacy.labRuns:[];save();updateProgress();
}
function map(){return welcome({state,stations,icon,escapeHTML,explorerFields})}

function bindExplorerWelcome(){
 const form=document.querySelector('#explorer-form');if(!form)return;
 const enterAdventure=profile=>{adoptExplorer(profile);const stop=stations.find(s=>!state.done.includes(s[0]))?.[0]||'finish';location.hash=stop==='story'?'factory':stop};
 const choose=bindExplorerFields('explorer');form.onsubmit=e=>{e.preventDefault();enterAdventure(choose())};
 document.querySelector('#guest-entry')?.addEventListener('click',()=>enterAdventure(selectGuestProfile()));
}


// Keep progression in the persistent bottom bar. Stage buttons mirror the activity's own
// controls, so validation remains owned by that activity rather than navigation.
let journeyObserver,journeyResizeObserver;
function setJourneyLock(button,locked){
  let mark=button.querySelector(':scope > .journey-lock');
  if(!mark){mark=document.createElement('span');mark.className='journey-lock';mark.setAttribute('aria-hidden','true');button.prepend(mark)}
  const status=locked?'locked':'unlocked';
  if(mark.dataset.state!==status){mark.innerHTML=icon(locked?'lock':'unlock');mark.dataset.state=status}
  button.setAttribute('aria-label',`${button.textContent.trim()} — ${status}`);
}

function setupJourneyNavigation(route){
  const main=document.querySelector('main');
  let nav=main.querySelector('.lesson-nav');
  if(!nav&&route==='mystery'){
    const link=main.querySelector('[data-next-for="mystery"]');
    nav=document.createElement('div');nav.className='lesson-nav';
    nav.innerHTML=`<a href="#map">${icon('map')} Back to the garden</a><p></p>`;
    nav.append(link);link.className='btn';
  }
  if(!nav)return;
  nav.classList.add('journey-nav');nav.setAttribute('aria-label','Adventure controls');
  nav.setAttribute('role','navigation');main.append(nav);
  const nextLink=nav.querySelector('.btn');
  const actions=document.createElement('div');actions.className='journey-actions';
  // Reuse one visible control for the current step and the eventual adventure.
  // The source link keeps its original destination and completion gate.
  nextLink?.classList.add('progression-source');
  const forward=document.createElement('button');forward.type='button';forward.className='btn';forward.id='journey-step';forward.disabled=true;
  forward.innerHTML=`<span class="journey-label"></span>${icon('arrow')}`;
  actions.append(forward);nav.append(actions);
  let target;
  forward.onclick=()=>{if(target&&!forward.disabled)target.click()};
  const note=nav.querySelector('p');note.setAttribute('role','status');
  const sync=()=>{
    let source,label;
    if(route==='detective'){source=main.querySelector('#repair-next, #clues-next');label='Next mission'}
    if(route==='check'){source=main.querySelector('#quiz-next');label=source?.textContent.includes('results')?'Next: results':'Next challenge'}
    if(route==='creek'&&!main.querySelector('#puzzle-counter')?.textContent.includes('2 of 2')){source=main.querySelector('#next-puzzle');label='Next level'}
    if(route==='story'){const picture=main.querySelector('#story-next');if(picture&&!picture.hidden){source=picture;label='Next picture'}}
    if(route==='factory'){
      source=main.querySelector('#lesson-next');
      if(source)label=source.dataset.label||'Next step';
    }
    const localFactory=route==='factory'&&source?.dataset.localForward==='true';
    if(source)source.classList.toggle('progression-source',!localFactory);
    if(actions.hidden!==!!localFactory)actions.hidden=!!localFactory;
    target=source||nextLink;
    label=source?label:route==='finish'?'Next: my journal':'Next adventure';
    const disabled=!target||target.disabled||target.hidden||target.getAttribute('aria-disabled')==='true';
    if(forward.disabled!==disabled)forward.disabled=disabled;
    if(localFactory)setJourneyLock(source,disabled);
    const text=forward.querySelector('.journey-label');if(text.textContent!==label)text.textContent=label;
    setJourneyLock(forward,disabled);
    const message=localFactory?(disabled?'Press Start to begin the first step.':'Use Next step beside Replay to continue.'):disabled?`Finish this step to unlock “${label}”.`:`${label} is ready.`;
    if(note.textContent!==message)note.textContent=message;
    main.querySelector('#creek-continue')?.classList.add('progression-source');main.querySelector('.factory-finished a.btn')?.classList.add('progression-source');
  };
  sync();const measure=()=>document.documentElement.style.setProperty('--journey-nav-height',`${Math.ceil(nav.getBoundingClientRect().height)}px`);measure();journeyResizeObserver=new ResizeObserver(measure);journeyResizeObserver.observe(nav);journeyObserver=new MutationObserver(sync);
  journeyObserver.observe(main,{subtree:true,childList:true,attributes:true,attributeFilter:['disabled','hidden','aria-disabled']});
}
document.addEventListener('click',event=>{if(event.target.closest('[aria-disabled="true"]')){event.preventDefault();event.stopImmediatePropagation()}},true);

let activityModule,groveModule,certificateModule;
async function render(){journeyObserver?.disconnect();journeyResizeObserver?.disconnect();document.documentElement.style.setProperty('--journey-nav-height','0px');if('speechSynthesis'in window)speechSynthesis.cancel();if(activityModule?.cleanup)activityModule.cleanup();groveModule?.cleanupGrove();certificateModule?.cleanupCertificate();const requested=location.hash.slice(1)||'map',route=requested==='check'?'grove':requested;const main=document.querySelector('main');document.body.dataset.route=route;if(route==='map'){main.innerHTML=map();bindExplorerWelcome()}else if(route==='grove'){groveModule=await import('./grove.js?v=1');if((location.hash.slice(1)||'map')!==requested)return;main.innerHTML=groveModule.grove();groveModule.bindGrove()}else if(route==='certificate'){certificateModule=await import('./grove-certificate-ui.js');main.innerHTML=certificateModule.certificatePage();certificateModule.bindCertificatePage()}else{activityModule=await import('./activities.js?v=8');main.innerHTML=activityModule.render(route);activityModule.bind(route)}setupJourneyNavigation(route);document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));highlight();document.querySelectorAll('[data-read]').forEach(b=>b.onclick=()=>read(b.dataset.read));main.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});document.title=`${stations.find(s=>s[0]===route)?.[1]||({'grove':'Greenhaven forest adventure','certificate':'My discovery certificate','map':'Your adventure','journal':'My field journal','teacher':"Teacher’s corner",'credits':'Sources & safety','factory':'The playable leaf story'}[route]||'Explore')} · Sprout Lab`}
function settings(){for(const [id,key]of[['large-text','large'],['reduce-motion','motion'],['low-data','low']]){document.body.classList.toggle(id,!!state.settings[key]);document.getElementById(id).checked=!!state.settings[key]}document.querySelector('#sound').setAttribute('aria-pressed',!!state.settings.sound);document.querySelector('#sound').setAttribute('aria-label',state.settings.sound?'Turn sound off':'Turn sound on')}
document.querySelector('#sound').onclick=()=>{state.settings.sound=!state.settings.sound;save();settings();chime();toast(state.settings.sound?'Gentle sound effects are on.':'Sound effects are off.')};document.querySelector('#settings').onclick=()=>document.querySelector('dialog').showModal();document.querySelector('[data-close]').onclick=()=>document.querySelector('dialog').close();for(const[id,key]of[['large-text','large'],['reduce-motion','motion'],['low-data','low']])document.getElementById(id).onchange=e=>{state.settings[key]=e.target.checked;settings();save()};document.querySelector('#reset-progress').onclick=()=>document.querySelector('#reset-confirm').hidden=false;document.querySelector('#cancel-reset').onclick=()=>document.querySelector('#reset-confirm').hidden=true;document.querySelector('#confirm-reset').onclick=()=>{state.done=[];state.journal='';state.score=0;state.labRuns=[];if(activeProfile())newAttempt(activeProfile(),false);save();updateProgress();document.querySelector('#reset-confirm').hidden=true;document.querySelector('dialog').close();if(location.hash==='#map')render();else location.hash='map'};
window.addEventListener('hashchange',render);settings();if(activeProfile())adoptExplorer(activeProfile());updateProgress();render();
document.querySelector('.skip').onclick=e=>{e.preventDefault();document.querySelector('main').focus();document.querySelector('main').scrollIntoView({behavior:'instant'})};
try{if(document.modelContext?.registerTool){document.modelContext.registerTool({name:'read_learning_progress',description:'Read this browser’s Sprout Lab completed stations and assessment score; does not complete learning activities.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute:()=>({completed:[...state.done],total:7,score:state.score,quizTotal:state.quizTotal})});document.modelContext.registerTool({name:'open_learning_station',description:'Navigate to a Sprout Lab station without marking it complete.',inputSchema:{type:'object',properties:{station:{type:'string',enum:stations.map(s=>s[0])}},required:['station'],additionalProperties:false},execute:({station})=>{if(!stations.some(s=>s[0]===station))throw Error('Unknown station');location.hash=station;return{opened:station}}})}}catch{}
