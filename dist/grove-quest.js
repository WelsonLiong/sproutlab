import {learnerLine,learnerPrompt} from './learner-voice.js';
import * as THREE from './vendor/three/three.module.js';
import {icon,escapeHTML,state,save,complete} from './app.js?v=8';
import {challenges,chapters,correctConfiguration} from './grove-challenges.js';
import {ensureAttempt,newAttempt,configFor,commitAnswer,advanceAttempt,attemptScore,persist,canSave} from './grove-progress.js';
import {mountCertificate} from './grove-certificate-ui.js';

// The assessment lives in the existing forest. Only the active clearing's props
// are added; the renderer, character, movement, camera and nature are shared.
export function createForestQuest(bridge){
 const {world,player,tell,tone,setAction,focusPlayer,hidePractice,restoreForest}=bridge;
 const $=s=>document.querySelector(s),events=new AbortController();
 let active=false,attempt=null,q=null,config=null,root=null,area=null,panelOpen=false,finishMode=false,animation=0,delivery=null,certificateCleanup,selectionPoint=null;
 const picks=[],floaters=[],animated=[],ownedMaterials=new Set();
 const ui=document.createElement('div');ui.className='grove-quest';ui.hidden=true;ui.innerHTML=`<section id="forest-task" class="forest-task" aria-labelledby="forest-task-title" hidden><h2 id="forest-task-title"></h2><p id="forest-task-prompt"></p><div id="forest-task-controls"></div><div id="forest-task-feedback" role="status" aria-live="polite"></div><button id="forest-test">${icon('flask')} Test my idea</button><button id="forest-close">Back to exploring</button></section><section id="forest-results" class="forest-results" aria-labelledby="forest-results-title" hidden></section><section id="forest-certificate" class="forest-certificate" hidden></section>`;$('.grove').append(ui);
 const next=$('#grove-next'),note=$('#grove-bottom-note');
 const mat=(color,options={})=>{const m=new THREE.MeshStandardMaterial({color,roughness:.8,...options});ownedMaterials.add(m);return m};
 function mesh(geometry,material,parent=root){const m=new THREE.Mesh(geometry,material);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
 function box(x,y,z,w,h,d,color,parent=root){const m=mesh(new THREE.BoxGeometry(w,h,d),mat(color),parent);m.position.set(x,y,z);return m}
 function sphere(x,y,z,r,color,parent=root){const m=mesh(new THREE.SphereGeometry(r,20,14),mat(color),parent);m.position.set(x,y,z);return m}
 function disc(x,z,r,color,parent=root){const m=mesh(new THREE.CylinderGeometry(r,r,.16,36),mat(color),parent);m.position.set(x,.1,z);return m}
 function tube(points,color,r=.045,parent=root){const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));const m=mesh(new THREE.TubeGeometry(curve,28,r,7,false),new THREE.MeshBasicMaterial({color}),parent);m.castShadow=false;ownedMaterials.add(m.material);return m}
 function label(text,x,y,z,width=2.2,parent=root){const canvas=document.createElement('canvas');canvas.width=640;canvas.height=128;const c=canvas.getContext('2d');c.fillStyle='#fff9e8';c.beginPath();c.roundRect(6,6,628,116,25);c.fill();c.fillStyle='#2d4b35';c.font='850 40px Nunito, sans-serif';c.textAlign='center';c.textBaseline='middle';let n=40;while(c.measureText(text).width>580&&n>21){n--;c.font=`850 ${n}px Nunito, sans-serif`}c.fillText(text,320,65);const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;const m=new THREE.SpriteMaterial({map:tex,depthTest:false});ownedMaterials.add(m);const s=new THREE.Sprite(m);s.position.set(x,y,z);s.scale.set(width,width/5,1);parent.add(s);return s}
 function clickable(object,action){object.userData.forestAction=action;picks.push(object);return object}
 function leaf(x,y,z,color=0x74a944,size=1,parent=root){const group=new THREE.Group();parent.add(group);group.position.set(x,y,z);group.scale.setScalar(size);const shape=new THREE.Shape();shape.moveTo(0,0);shape.bezierCurveTo(-1,.45,-1.2,1.75,0,2.55);shape.bezierCurveTo(1.2,1.75,1,.45,0,0);const blade=mesh(new THREE.ExtrudeGeometry(shape,{depth:.1,bevelEnabled:true,bevelSize:.07,bevelThickness:.07,bevelSegments:2,steps:1}),mat(color),group);blade.rotation.x=-.38;tube([[0,.1,.14],[0,1.1,-.25],[0,2.3,-.72]],0xd1dfa0,.025,group);return group}
 function rabbit(x,z,parent=root){const g=new THREE.Group();g.position.set(x,0,z);parent.add(g);sphere(0,.6,0,.55,0xd7ccb4,g).scale.set(.8,1,1.1);sphere(0,1.08,.29,.4,0xeee3cd,g);for(const side of [-1,1]){const ear=sphere(side*.17,1.65,.22,.19,0xeee3cd,g);ear.scale.set(.65,2.3,.7);sphere(side*.13,1.15,.64,.035,0x253c2c,g);sphere(side*.29,.22,.35,.2,0xcabb9c,g).scale.set(1,.7,1.4)}sphere(0,.96,.69,.055,0xc38777,g);sphere(0,.57,-.48,.19,0xf4e9d4,g);return g}
 function fox(x,z,parent=root){const g=new THREE.Group();g.position.set(x,0,z);parent.add(g);sphere(0,.62,0,.58,0xc57939,g).scale.set(.8,1,1.2);sphere(0,1.16,.3,.46,0xd68b43,g);const muzzle=sphere(0,1.02,.65,.26,0xf2e1ba,g);muzzle.scale.set(1,.6,.8);for(const side of [-1,1]){const ear=mesh(new THREE.ConeGeometry(.22,.48,4),mat(0xb66b31),g);ear.position.set(side*.26,1.6,.23);ear.rotation.y=Math.PI/4;sphere(side*.17,1.23,.68,.034,0x28352b,g);box(side*.26,.22,.2,.17,.4,.2,0x604a36,g)}sphere(0,1.07,.88,.05,0x28352b,g);const tail=sphere(.4,.6,-.6,.35,0xd68b43,g);tail.scale.set(.7,.8,1.9);tail.rotation.y=-.4;sphere(.64,.58,-1.04,.2,0xf2e1ba,g);return g}
 function crate(key,x,z,parent=root){const colors={water:0x72b7c4,soil:0x90704d,food:0xd7ac63,sand:0xcbb276,starch:0xdeb86f};const g=new THREE.Group();g.position.set(x,.2,z);parent.add(g);if(key==='water'){const jug=mesh(new THREE.CylinderGeometry(.24,.32,.8,16),mat(colors[key]),g);jug.position.y=.5;const h=mesh(new THREE.TorusGeometry(.23,.045,8,18),mat(0xd7e5d3),g);h.position.set(.3,.62,0);h.rotation.y=Math.PI/2;box(0,.98,0,.3,.1,.3,0xd7e5d3,g)}else{box(0,.4,0,.75,.7,.7,colors[key]||0xd7ac63,g);for(const side of [-1,1])box(side*.32,.4,.36,.07,.72,.06,0x8e7049,g);box(0,.4,.37,.76,.08,.04,0x8e7049,g);if(key==='starch')for(let i=0;i<4;i++)sphere((i%2)*.25-.13,.8,Math.floor(i/2)*.22-.12,.12,0xfff0cd,g)}return g}
 function clearRoot(){if(!root)return;world.remove(root);const geometries=new Set(),textures=new Set();root.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material?.map)textures.add(o.material.map)});geometries.forEach(g=>g.dispose());textures.forEach(t=>t.dispose());ownedMaterials.forEach(m=>m.dispose());ownedMaterials.clear();picks.length=0;floaters.length=0;animated.length=0;root=null;selectionPoint=null;delivery=null;}
 const isSolved=()=>!!attempt?.records[q?.id]?.solved;
 const footer=(ready,label)=>{next.disabled=!ready;next.innerHTML=`${icon(ready?'unlock':'lock')}<span>${label}</span>${icon('arrow')}`;next.setAttribute('aria-label',`${label} — ${ready?'unlocked':'locked'}`)};
 function nextLabel(){return attempt.index===9?'Next: results':attempt.index===4?'Next: leaf workshop':attempt.index===6?'Next: living grove':'Next discovery'}
 function updateHud(){
  const chapter=chapters[q.chapter];$('#grove-goal').textContent=q.title;$('#grove-instruction').textContent=q.type==='carry'&&config.cargo&&!isSolved()?'Carry it to the marker. Press E to test your delivery.':panelOpen?'Work with the objects in the clearing.':'Follow the marker. Press E at the discovery stone.';
  $('.grove-milestones').innerHTML=`<span class="forest-chapter-progress">Chapter ${q.chapter+1} / 3 · ${escapeHTML(chapter.name)}</span><b>Discovery ${attempt.index+1} / 10</b>`;
  note.textContent=canSave()?'Correct first test: 1 mark. Moves and changes are free.':'Saving unavailable · keep this page open';footer(isSolved(),nextLabel());
 }
 function button(action,text,selected=false){return `<button data-forest-action="${action}" ${isSolved()?'disabled':''} aria-pressed="${selected}">${text}</button>`}
 function selectedValue(){if(q.type==='dialogue')return config.choice;if(q.type==='carry')return config.cargo;if(q.type==='filter')return config.gas;if(q.type==='leaves')return config.leaf;return true}
 function controls(){
  const focusAction=document.activeElement?.dataset.forestAction;
  $('#forest-task').dataset.type=q.type;$('#forest-task-title').textContent=q.title;$('#forest-task-prompt').textContent=learnerPrompt(q.prompt);
  let html='';
  if(q.type==='dialogue')html=`<div class="forest-dialogue">${q.choices.map(([key,text])=>button(key,escapeHTML(text),config.choice===key)).join('')}</div>`;
  else if(q.type==='mirrors')html=`<div class="forest-object-controls">${button('near',`${icon('sun')} Turn near mirror`)}${button('far',`${icon('sun')} Turn far mirror`)}</div><p class="forest-control-note">The gold beam shows where the light goes. Adjust freely, then test.</p>`;
  else if(q.type==='carry')html=`<div class="forest-object-controls">${q.items.map(([key,text,glyph])=>button(key,`${icon(glyph)} ${escapeHTML(text)}`,config.cargo===key)).join('')}</div><p class="forest-control-note">${config.cargo?`Carrying ${escapeHTML(q.items.find(i=>i[0]===config.cargo)?.[1]||'a supply')}. Walk to the ${q.id==='water'?'soil bed':'food store'} and press E to test your delivery.`:'Pick up an object here or click it in the world. A delivery is your committed answer.'}</p>`;
  else if(q.type==='filter'||q.type==='leaves')html=`<div class="forest-object-controls">${q.items.map(([key,text,glyph])=>button(key,`${icon(glyph)} ${escapeHTML(text)}`,selectedValue()===key)).join('')}</div>`;
  else if(q.type==='catcher')html=`<div class="forest-object-controls">${button('left',`${icon('arrow')} Move cart left`)}<strong>${escapeHTML(q.items[config.basket][1])}</strong>${button('right',`Move cart right ${icon('arrow')}`)}</div>`;
  else if(q.type==='chain')html=`<div class="forest-object-controls">${button('swap0','Swap first two figures')}${button('swap1','Swap last two figures')}</div><p class="forest-control-note">${config.order.map(x=>({plant:'Plant',rabbit:'Rabbit',fox:'Fox'}[x])).join(' → ')}</p>`;
  else html=`<div class="forest-object-controls">${q.items.map(([key,text,glyph],i)=>button(key,`${icon(glyph)} ${escapeHTML(text)}`,config.plot===i)).join('')}</div>`;
  $('#forest-task-controls').innerHTML=html;
  const check=$('#forest-test');check.hidden=q.type==='carry';check.disabled=isSolved()||!selectedValue();check.innerHTML=`${icon(q.type==='catcher'?'drop':'flask')} ${q.type==='catcher'?'Catch this product':q.type==='filter'?'Send gas into the leaf':q.type==='leaves'?'Test this leaf':'Test my idea'}`;
  const rec=attempt.records[q.id];$('#forest-task-feedback').textContent=rec?`${rec.solved?'Discovery complete!':'Try another plan.'} ${q.why}${rec.solved?'':' Change the objects, then test again.'}`:'';$('#forest-task-feedback').classList.toggle('correct',!!rec?.solved);
  if(focusAction)$('#forest-task-controls').querySelector(`[data-forest-action="${focusAction}"]`)?.focus({preventScroll:true});
 }
 function drawProps(){
  clearRoot();root=new THREE.Group();root.position.set(area.center[0],.1,area.center[1]);world.add(root);disc(0,0,4.2,0xb7b68b);const stone=box(-3,.4,2.3,.8,.65,.7,0xc5c1a0);label('DISCOVERY',-3,1.2,2.3,2);clickable(stone,'open');
  if(q.type==='dialogue'){
   leaf(0,.2,-.4,0x78a74b,1.25);for(let i=0;i<3;i++){const g=disc(-2.4+i*2.4,2.1,.7,config.choice===q.choices[i][0]?0xefd48a:0xd3caa3);clickable(g,q.choices[i][0]);label(String(i+1),-2.4+i*2.4,.7,2.1,.7)}
   if(q.id==='balance'){sphere(-2,1.6,-1,.35,0x8ab5c7);label('CO₂',-2,2.3,-1,1);sphere(2,1.6,-1,.35,0xd3e2b0);label('O₂',2,2.3,-1,1)}
  }else if(q.type==='mirrors'){
   const sun=sphere(-3.2,3,-1.8,.55,0xf4d678);sun.material.emissive=new THREE.Color(0xffd66b);sun.material.emissiveIntensity=.45;label('Sunlight',-3.2,4,-1.8,1.8);
   for(const[i,x,z,key]of [[0,-1,0,'near'],[1,1,-1,'far']]){disc(x,z,.65,0x9c9f81);box(x,.55,z,.14,1,.14,0x82744c);const mirror=box(x,1.3,z,1.1,1.2,.12,0xc5dfe4);mirror.material.metalness=.65;mirror.material.roughness=.15;mirror.rotation.y=(config[key]-1)*Math.PI/3;clickable(mirror,key);label(i===0?'Near mirror':'Far mirror',x,2.3,z,1.8)}
   leaf(3,.25,0,0x7baa47,.8);const first=[-1,1.3,0],second=config.near===1?[1,1.3,-1]:[-2,1.1,config.near===0?2.3:-2.6];tube([[-3.2,3,-1.8],first,second],0xffdf81,.06);if(config.near===1)tube([second,config.far===2?[3,1.4,-.3]:[2.8,1.3,config.far===0?-3:2.4]],0xffdf81,.06);
  }else if(q.type==='carry'){
   q.items.forEach(([key,text],i)=>{const x=-2.5+i*2.5;disc(x,-1,.65,config.cargo===key?0xe8c976:0xc4bd96);const object=crate(key,x,-1);clickable(object,key);label(text,x,1.7,-1,2.1)});
   const store=new THREE.Group();store.position.set(3.2,.2,2.5);root.add(store);if(q.id==='water'){disc(0,0,.85,0x8b704b,store);leaf(0,.1,0,0x7eaa47,.55,store);for(const side of [-1,1])tube([[0,.3,0],[side*.4,.1,.2],[side*.7,.08,.4]],0xc8ab76,.05,store);label('ROOTS',0,2.2,0,1.8,store)}else{box(0,.45,0,1.4,.9,1.1,0x9e8258,store);box(0,1,0,1.6,.2,1.25,0xc6ad79,store);label('FOOD STORE',0,2,0,2.1,store)}
   delivery={x:area.center[0]+3.2,z:area.center[1]+2.5,label:q.id==='water'?'Deliver supply to the roots':'Pack the food store'};
   if(config.cargo&&!isSolved()){const carried=crate(config.cargo,0,0);carried.scale.setScalar(.55);carried.userData.carried=true;animated.push(carried)}
  }else if(q.type==='filter'){
   leaf(1,.15,-.4,0x78a74b,1.15);const opening=mesh(new THREE.TorusGeometry(.5,.1,10,28),mat(0x9eaf70));opening.position.set(1,1.15,.55);label('Tiny opening',1,3.8,-.4,2);
   q.items.forEach(([key,text],i)=>{const x=-3+i*2;const g=new THREE.Group();g.position.set(x,1.2,1.8);root.add(g);sphere(0,0,0,.35,key==='co2'?0x9c8fb1:key==='oxygen'?0xaec8c0:0x81bfc7,g);if(key==='co2')for(const side of [-1,1])sphere(side*.43,0,0,.22,0xd9cbdf,g);label(key==='co2'?'CO₂':key==='oxygen'?'O₂':'Water vapour',0,.75,0,key==='water'?2:1.1,g);clickable(g,key);floaters.push({object:g,base:1.2,phase:i})});if(config.gas){const index=q.items.findIndex(i=>i[0]===config.gas);tube([[-3+index*2,1.2,1.8],[0,1.3,1.3],[1,1.15,.55]],0xd5c2e1,.045)}
  }else if(q.type==='leaves'){
   for(const [i,key,color]of [[0,'white',0xe8dfb6],[1,'green',0x79a44b]]){const x=-2+i*4;disc(x,0,1.25,config.leaf===key?0xe9ce83:0xb6b78d);const object=leaf(x,.2,0,color,1);clickable(object,key);label(key==='white'?'White area':'Green area',x,3.4,0,2);if(key==='green')for(let j=0;j<4;j++){const grain=sphere(x+(j%2)*.4-.2,.8+Math.floor(j/2)*.4,.24,.11,0x3f7d3f);grain.scale.x=1.4}}
   label('Same light · water · carbon dioxide',0,4.3,-1,4);
  }else if(q.type==='catcher'){
   leaf(0,.2,-1.6,0x76a74b,1);label('Gas released by the leaf',0,3.6,-1.6,3);
   for(let i=0;i<3;i++){disc(-2.5+i*2.5,1.7,.7,0xb9b692);label(q.items[i][1],-2.5+i*2.5,.65,2.4,2.3)}
   const cart=box(-2.5+config.basket*2.5,.5,1.5,.85,.7,.75,0x8cbec1);box(cart.position.x,.85,1.5,1,.15,.9,0xc6dcd2);for(const side of [-1,1]){const wh=mesh(new THREE.CylinderGeometry(.17,.17,.1,16),mat(0x74694b));wh.rotation.x=Math.PI/2;wh.position.set(cart.position.x+side*.3,.18,1.9)}
   for(let i=0;i<5;i++){const bubble=sphere(0,1+i*.3,-.7,.12,0xcbe6d5);bubble.material.transparent=true;bubble.material.opacity=.7;floaters.push({object:bubble,base:1+i*.3,phase:i*.7})}
   clickable(box(-2.5+config.basket*2.5,.65,1.4,.8,.3,.8,0xbad9d4),'right');
  }else if(q.type==='chain'){
   for(let i=0;i<3;i++){const x=-2.5+i*2.5,key=config.order[i];disc(x,0,.85,0xc5bd93);const object=key==='plant'?leaf(x,.2,0,0x7da949,.75):key==='rabbit'?rabbit(x,0):fox(x,0);clickable(object,i===0?'swap0':'swap1');label({plant:'Plant',rabbit:'Rabbit',fox:'Fox'}[key],x,2.55,0,1.6);if(i<2){tube([[x+.7,.35,.6],[x+1.8,.35,.6]],0xd2b15d,.07);const arrow=mesh(new THREE.ConeGeometry(.16,.4,5),mat(0xd2b15d));arrow.rotation.z=-Math.PI/2;arrow.position.set(x+1.75,.35,.6)}}
  }else{
   for(let i=0;i<2;i++){const x=-2.3+i*4.6;disc(x,-.8,1.2,i?0x7c9f55:0xabaa8c);if(i){for(const offset of [-.4,.4])leaf(x+offset,.2,-.8,0x77a547,.65);label('Green plants in light',x,2.5,-.8,2.6)}else{for(const offset of [-.35,.35]){const rock=mesh(new THREE.DodecahedronGeometry(.5,0),mat(0x959c86));rock.position.set(x+offset,.5,-.8)}label('Bare rocks',x,2.5,-.8,2.2)}clickable(disc(x,-.8,1.05,config.plot===i?0xd6c174:i?0x6f9552:0x9c9e82),i?'plants':'rocks')}
   rabbit(0,2.2);label('Rabbit shelter',0,2.5,2.2,2.1);const start=config.plot===1?2.3:-2.3;tube([[start,.55,-.4],[start/2,.55,1],[0,.55,1.8]],config.plot===1?0xb6d3c1:0xb5b8a6,.12);
  }
  if(isSolved()){const ring=mesh(new THREE.TorusGeometry(3.85,.045,6,80),new THREE.MeshBasicMaterial({color:0xd9d58e}));ownedMaterials.add(ring.material);ring.rotation.x=Math.PI/2;ring.position.y=.23;}
 }
 function action(key){
  if(!active||finishMode)return;if(key==='open'){open();return}if(isSolved())return;
  if(q.type==='dialogue')config.choice=key;
  else if(q.type==='mirrors')config[key]=(config[key]+1)%3;
  else if(q.type==='carry'){config.cargo=key;tell(`Picked up ${q.items.find(i=>i[0]===key)[1]}. Carry it to the ${q.id==='water'?'roots':'food store'} and press E to test.`)}
  else if(q.type==='filter')config.gas=key;
  else if(q.type==='leaves')config.leaf=key;
  else if(q.type==='catcher')config.basket=(config.basket+(key==='left'?2:1))%3;
  else if(q.type==='chain'){const a=key==='swap0'?0:1;[config.order[a],config.order[a+1]]=[config.order[a+1],config.order[a]]}
  else config.plot=key==='plants'?1:0;
  persist();drawProps();controls();tone();if(q.type==='carry'){panelOpen=false;$('#forest-task').hidden=true;$('#grove-context').hidden=true;$('#grove-marker').hidden=true;updateHud();focusPlayer()}
 }
 function open(){if(finishMode)return;panelOpen=true;$('#grove-message').classList.remove('visible');$('#forest-task').hidden=false;controls();updateHud();$('#forest-task-title').tabIndex=-1;$('#forest-task-title').focus({preventScroll:true})}
 function close(){panelOpen=false;$('#forest-task').hidden=true;updateHud();focusPlayer()}
 function test(){
  if(!active||finishMode||isSolved()||!selectedValue())return;
  if(q.type==='carry'&&(!delivery||Math.hypot(player.position.x-delivery.x,player.position.z-delivery.z)>2.8)){tell('Carry the supply to the marked destination, then press E to deliver it.');return}
  const correct=correctConfiguration(q,config);commitAnswer(attempt,q.id,correct);animation=0;drawProps();controls();updateHud();
  if(correct){setAction('Victory');tone(true);$('#grove-success-title').textContent=q.id==='chlorophyll'?'The leaf is ready!':learnerLine('Discovery made, {name}!','Discovery made!');$('#grove-success-copy').textContent=q.id==='chlorophyll'?'Sunlight, water, carbon dioxide and chlorophyll: all four needs.':q.why;$('#grove-success span').textContent=`Discovery ${attempt.index+1} / 10 complete`;$('#grove-success').hidden=false;if(q.chapter===0&&attempt.index===4)restoreForest(.45)}
  else{tone();tell(learnerLine('Good try, {name}. Your first test is recorded. Change your plan and try again.','Good try. Your first test is recorded. Change your plan and try again.'));if(q.type==='carry'){panelOpen=true;$('#forest-task').hidden=false}}
 }
 ui.addEventListener('click',event=>{const actionButton=event.target.closest('[data-forest-action]');if(actionButton)action(actionButton.dataset.forestAction)},{signal:events.signal});
 $('#forest-test').addEventListener('click',test,{signal:events.signal});$('#forest-close').addEventListener('click',close,{signal:events.signal});
 function loadCurrent(){
  finishMode=false;panelOpen=false;certificateCleanup?.();certificateCleanup=null;$('#forest-certificate').hidden=true;$('#forest-results').hidden=true;$('#forest-task').hidden=true;$('#grove-success').hidden=true;$('#grove-discovery').hidden=true;$('#grove-context').hidden=true;$('#grove-marker').hidden=true;
  q=challenges[attempt.index];config=configFor(attempt,q.id,q.initial);area=chapters[q.chapter];drawProps();updateHud();tell(`${area.place}: ${q.title}. Follow the discovery marker.`);
 }
 function results(){
  finishMode=true;panelOpen=false;$('#forest-task').hidden=true;$('#grove-success').hidden=true;$('#forest-results').hidden=false;clearRoot();restoreForest(1);
  const score=attemptScore(attempt);state.score=score;state.quizVersion=4;state.quizTotal=10;save();complete('check');
  $('#grove-goal').textContent='Greenhaven is awake!';$('#grove-instruction').textContent='Ten discoveries. One forest full of life.';$('.grove-milestones').innerHTML='<b>All 3 chapters complete · 10 / 10 discoveries</b>';
  $('#forest-results').innerHTML=`<div class="forest-results-medal">${icon('sprout')}</div><h2 id="forest-results-title" tabindex="-1">You brought the forest together.</h2><p>${escapeHTML(attempt.name)}, you completed all ten discoveries.</p><p class="forest-result-mark"><strong>${score} / 10</strong><span>${score*10}% · first committed answers</span></p><p>Every correction helped you finish. Your certificate keeps the mark from this attempt.</p><details><summary>Open my discovery journal</summary><ol>${challenges.map(item=>`<li><strong>${escapeHTML(item.title)}</strong><span>${attempt.records[item.id]?.firstCorrect?'1 / 1 · first test correct':'0 / 1 · completed after correction'}</span><p>${escapeHTML(item.why)}</p></li>`).join('')}</ol></details><button id="forest-retake">${icon('play')} Start a new attempt</button>`;
  $('#forest-retake').onclick=retake;footer(true,'Get my certificate');note.textContent='Your completed attempt is saved separately';$('#forest-results-title').focus({preventScroll:true});
 }
 function certificate(){
  $('#forest-results').hidden=true;$('#forest-certificate').hidden=false;certificateCleanup?.();certificateCleanup=mountCertificate($('#forest-certificate'),attempt,{onRetake:retake});footer(true,'Next: my discoveries');note.textContent='Download your PDF to keep a copy';
 }
 function retake(){attempt=newAttempt(undefined,true);bridge.setStage('quest');loadCurrent();focusPlayer()}
 function start(){active=true;ui.hidden=false;attempt=ensureAttempt();attempt.practiceDone=true;persist();hidePractice();bridge.setStage('quest');if(attempt.completedAt)results();else loadCurrent()}
 function nextStep(){if(!active)return false;if(finishMode){if(!$('#forest-certificate').hidden){location.hash='finish';return true}certificate();return true}if(!isSolved())return true;if(advanceAttempt(attempt)){if(attempt.completedAt)results();else loadCurrent()}return true}
 function desired(){
  if(!active||finishMode)return null;
  if(q.type==='carry'&&config.cargo&&!isSolved()&&delivery)return{id:'delivery',x:delivery.x,z:delivery.z,label:delivery.label,radius:2.8,icon:'drop'};
  return{id:'discovery',x:area.center[0]-3,z:area.center[1]+2.3,label:panelOpen?'Work at discovery stone':'Open this discovery',radius:3,icon:q.chapter===0?'sun':q.chapter===1?'leaf':'heart'};
 }
 function interact(){if(finishMode)return;const d=desired();if(!d)return;if(Math.hypot(player.position.x-d.x,player.position.z-d.z)>d.radius)return;if(d.id==='delivery')test();else open()}
 function pick(raycaster){if(!active||finishMode||!panelOpen)return false;const hit=raycaster.intersectObjects(picks,true)[0];if(!hit)return false;let object=hit.object;while(object&&!object.userData.forestAction)object=object.parent;if(object){action(object.userData.forestAction);return true}return false}
 function update(delta,time,reduced){
  if(!active)return;animation+=delta;
  if(!finishMode){for(const f of floaters)if(!reduced)f.object.position.y=f.base+Math.sin(time*1.2+f.phase)*.08;for(const o of animated)if(o.userData.carried){o.position.copy(player.position).sub(root.position);o.position.y+=1.15;o.rotation.y=player.rotation.y}
   if(isSolved()&&animation>3)setAction('Idle');
  }
 }
 function camera(){if(!active||finishMode)return null;if(panelOpen&&q.type!=='carry')return{look:[area.center[0],.5,area.center[1]+(q.type==='chain'?6:4.5)],position:[area.center[0]+7,13.5,area.center[1]+16]};return null}
 function resetCurrent(){if(!active||finishMode){if(active)retake();return}if(isSolved()){tell('This discovery is complete. Use Next to continue, or start a fresh attempt from your results.');return}attempt.configs[q.id]=JSON.parse(JSON.stringify(q.initial));config=attempt.configs[q.id];persist();drawProps();controls();tell('Puzzle reset. Your first-answer mark stays with this attempt.')}
 function cleanup(){active=false;events.abort();certificateCleanup?.();clearRoot();ui.remove()}
 return{start,next:nextStep,desired,interact,pick,update,camera,resetCurrent,cleanup,get active(){return active},get finished(){return finishMode},get attempt(){return attempt}};
}
