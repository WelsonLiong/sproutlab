// Device-local learner profiles and immutable first-answer marks.
export const QUEST_VERSION=1;
export const QUEST_IDS=['meaning','sunlight','water','carbon','chlorophyll','starch','oxygen','food','breathing','balance'];
const KEY='sprout-greenhaven-v1';
let storageOK=true,db={version:1,activeProfileId:null,profiles:[]};
const copy=v=>JSON.parse(JSON.stringify(v));
const id=()=>globalThis.crypto?.randomUUID?.()||`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,11)}`;
export const cleanName=value=>String(value||'').replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,40)||'Explorer';
try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved?.version===1&&Array.isArray(saved.profiles)){db={version:1,activeProfileId:saved.activeProfileId,profiles:saved.profiles.filter(p=>p&&typeof p.id==='string'&&typeof p.name==='string'&&Array.isArray(p.attempts))};for(const p of db.profiles)p.name=cleanName(p.name)}}catch{storageOK=false}
export function persist(){try{localStorage.setItem(KEY,JSON.stringify(db));storageOK=true}catch{storageOK=false}return storageOK}
export const canSave=()=>storageOK;
export const profiles=()=>db.profiles;
const profileLabel=profile=>db.profiles.filter(p=>p.name.toLocaleLowerCase()===profile.name.toLocaleLowerCase()).length>1?`${profile.name} (Explorer ${db.profiles.indexOf(profile)+1})`:profile.name;
export const activeProfile=()=>db.profiles.find(p=>p.id===db.activeProfileId)||null;
export function selectProfile(profileId,name){
 let profile=db.profiles.find(p=>p.id===profileId);
 if(!profile){profile={id:id(),name:cleanName(name),attempts:[],legacy:{}};db.profiles.push(profile)}
 db.activeProfileId=profile.id;persist();return profile;
}
export function selectGuestProfile(){
 let profile=db.profiles.find(p=>p.guest===true);
 if(!profile){profile={id:id(),name:'Guest',guest:true,attempts:[],legacy:{}};db.profiles.push(profile)}
 db.activeProfileId=profile.id;persist();return profile;
}
export function saveLegacy(legacy){const profile=activeProfile();if(profile){profile.legacy=copy(legacy);persist()}}
export function newAttempt(profile=activeProfile(),practiceDone=false){
 if(!profile)throw Error('Choose an explorer first.');
 const attempt={id:id(),version:QUEST_VERSION,name:profile.name,startedAt:new Date().toISOString(),completedAt:null,index:0,practiceDone,records:{},configs:{}};
 profile.attempts.push(attempt);persist();return attempt;
}
export function currentAttempt(profile=activeProfile()){if(!profile)return null;return profile.attempts.filter(a=>a.version===QUEST_VERSION).at(-1)||null}
export function ensureAttempt(){return currentAttempt()||newAttempt()}
export function configFor(attempt,qid,initial){if(!attempt.configs[qid]){attempt.configs[qid]=copy(initial);persist()}return attempt.configs[qid]}
export function commitAnswer(attempt,qid,correct){
 if(attempt.completedAt||QUEST_IDS[attempt.index]!==qid)return null;
 const record=attempt.records[qid];if(record?.solved)return record;
 if(!record)attempt.records[qid]={firstCorrect:!!correct,tries:1,solved:!!correct,firstTestAt:new Date().toISOString()};
 else{record.tries++;record.solved=!!correct}
 persist();return attempt.records[qid];
}
export function attemptScore(attempt){return QUEST_IDS.reduce((total,key)=>total+(attempt.records[key]?.firstCorrect===true?1:0),0)}
export function advanceAttempt(attempt){
 if(attempt.completedAt)return false;
 if(!attempt.records[QUEST_IDS[attempt.index]]?.solved)return false;
 if(attempt.index<9)attempt.index++;
 else{if(!QUEST_IDS.every(key=>attempt.records[key]?.solved))return false;attempt.completedAt=new Date().toISOString();attempt.score=attemptScore(attempt)}
 persist();return true;
}
export function explorerFields(prefix,escapeHTML,fallback=''){
 const profile=activeProfile();
 return `${db.profiles.length?`<label for="${prefix}-profile">Who’s exploring?</label><select id="${prefix}-profile" aria-label="Choose an explorer"><option value="new" ${!profile?'selected':''}>＋ Add a new profile</option>${db.profiles.map(p=>`<option value="${escapeHTML(p.id)}" ${p.id===profile?.id?'selected':''}>${escapeHTML(profileLabel(p))} · continue</option>`).join('')}</select>`:`<input type="hidden" id="${prefix}-profile" value="new">`}<div id="${prefix}-name-wrap" ${profile?'hidden':''}><label for="${prefix}-name">What should Sprout call you?</label><input id="${prefix}-name" maxlength="40" ${profile?'': 'required'} pattern=".*\\S.*" autocomplete="off" placeholder="Your name or nickname" value="${escapeHTML(profile?.name||fallback)}"></div>`;
}
export function bindExplorerFields(prefix){
 const picker=document.getElementById(`${prefix}-profile`),field=document.getElementById(`${prefix}-name`),wrap=document.getElementById(`${prefix}-name-wrap`);
 const change=()=>{const p=db.profiles.find(p=>p.id===picker.value);wrap.hidden=!!p;field.required=!p;field.value=p?.name||'';if(!p)field.focus({preventScroll:true})};
 picker?.addEventListener('change',change);
 return()=>selectProfile(picker?.value,field?.value);
}
