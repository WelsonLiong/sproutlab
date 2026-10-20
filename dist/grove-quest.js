import {learnerLine,learnerPrompt} from './learner-voice.js';
import * as THREE from './vendor/three/three.module.js';
import {icon,escapeHTML,state,save,complete} from './app.js?v=8';
import {challenges,chapters,correctConfiguration} from './grove-challenges.js';
import {ensureAttempt,newAttempt,configFor,commitAnswer,advanceAttempt,attemptScore,persist,canSave} from './grove-progress.js';
import {gasCollector} from './grove-apparatus.js';
import {mountCertificate} from './grove-certificate-ui.js';

// The assessment lives in the existing forest. Only the active clearing's props
// are added; the renderer, character, movement, camera and nature are shared.
export function createForestQuest(bridge){
 const {world,player,camera:sceneCamera,tell,tone,setAction,focusPlayer,hidePractice,restoreForest,surfaces,groundHeight,performAt,isInteractionBusy,cancelInteraction,carryPoint}=bridge;
 const $=s=>document.querySelector(s),events=new AbortController();
 let handling=false,active=false,attempt=null,q=null,config=null,root=null,area=null,panelOpen=false,finishMode=false,animation=0,delivery=null,certificateCleanup,selectionPoint=null,framing=null,positionClock=0,drag=null,filterOpening=null,bridgeTarget=null;
 const framingCamera=new THREE.PerspectiveCamera(),viewRight=new THREE.Vector3(),viewUp=new THREE.Vector3(),viewForward=new THREE.Vector3();
 const picks=[],floaters=[],animated=[],labels=[],ownedMaterials=new Set();
 const ui=document.createElement('div');ui.className='grove-quest';ui.hidden=true;ui.innerHTML=`<section id="forest-task" class="forest-task" aria-labelledby="forest-task-title" hidden><h2 id="forest-task-title"></h2><p id="forest-task-prompt"></p><div id="forest-task-controls"></div><div id="forest-task-feedback" role="status" aria-live="polite"></div><button id="forest-test">${icon('flask')} Test my idea</button><button id="forest-close">Back to exploring</button></section><section id="forest-results" class="forest-results" aria-labelledby="forest-results-title" hidden></section><section id="forest-certificate" class="forest-certificate" hidden></section>`;$('.grove').append(ui);
 const next=$('#grove-next'),note=$('#grove-bottom-note');
 const mat=(color,options={})=>{const m=new THREE.MeshStandardMaterial({color,roughness:.8,...options});ownedMaterials.add(m);return m};
 function mesh(geometry,material,parent=root){const m=new THREE.Mesh(geometry,material);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
 function box(x,y,z,w,h,d,color,parent=root){const m=mesh(new THREE.BoxGeometry(w,h,d),mat(color),parent);m.position.set(x,y,z);return m}
 function sphere(x,y,z,r,color,parent=root){const m=mesh(new THREE.SphereGeometry(r,20,14),mat(color),parent);m.position.set(x,y,z);return m}
 function disc(x,z,r,color,parent=root){const m=mesh(new THREE.CylinderGeometry(r,r,.16,36),mat(color),parent);m.position.set(x,.1,z);return m}
 function tube(points,color,r=.045,parent=root){const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));const m=mesh(new THREE.TubeGeometry(curve,28,r,7,false),new THREE.MeshBasicMaterial({color}),parent);m.castShadow=false;ownedMaterials.add(m.material);return m}
 function label(text,x,y,z,width=2.2,parent=root){const canvas=document.createElement('canvas');canvas.width=640;canvas.height=128;const c=canvas.getContext('2d');c.fillStyle='#fff9e8';c.beginPath();c.roundRect(6,6,628,116,25);c.fill();c.fillStyle='#2d4b35';c.font='850 40px Nunito, sans-serif';c.textAlign='center';c.textBaseline='middle';let n=40;while(c.measureText(text).width>580&&n>21){n--;c.font=`850 ${n}px Nunito, sans-serif`}c.fillText(text,320,65);const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;const m=new THREE.SpriteMaterial({map:tex,depthTest:true,depthWrite:false});ownedMaterials.add(m);const s=new THREE.Sprite(m);s.position.set(x,y,z);s.scale.set(width,width/5,1);parent.add(s);labels.push({sprite:s,width});return s}
 function clickable(object,action){object.userData.forestAction=action;picks.push(object);return object}
 function seat(object,top=.18){root.updateMatrixWorld(true);const bounds=new THREE.Box3().setFromObject(object,true),base=(object.parent||root).localToWorld(new THREE.Vector3(0,top,0)).y;object.position.y+=base-bounds.min.y;object.userData.supportTop=base;return object}
 function actionLabel(key){if(key==='collect')return 'Collect the leaf bubbles';if(key==='splint')return 'Try the glowing splint';if(q.type==='mirrors')return key==='near'?'Turn near mirror':'Turn far mirror';if(q.items)return q.items.find(i=>i[0]===key)?.[1]||key;if(q.type==='chain')return key==='swap0'?'Swap first two figures':'Swap last two figures';return 'Talk to Sprout'}
 function leaf(x,y,z,color=0x74a944,size=1,parent=root){const group=new THREE.Group();parent.add(group);group.position.set(x,y,z);group.scale.setScalar(size);const shape=new THREE.Shape();shape.moveTo(0,0);shape.bezierCurveTo(-1,.45,-1.2,1.75,0,2.55);shape.bezierCurveTo(1.2,1.75,1,.45,0,0);const blade=mesh(new THREE.ExtrudeGeometry(shape,{depth:.1,bevelEnabled:true,bevelSize:.07,bevelThickness:.07,bevelSegments:2,steps:1}),mat(color),group);blade.rotation.x=-.38;tube([[0,.1,.14],[0,1.1,-.25],[0,2.3,-.72]],0xd1dfa0,.025,group);if(y<=.25)seat(group);return group}
 function rabbit(x,z,parent=root){const g=new THREE.Group();g.position.set(x,0,z);parent.add(g);sphere(0,.6,0,.55,0xd7ccb4,g).scale.set(.8,1,1.1);sphere(0,1.08,.29,.4,0xeee3cd,g);for(const side of [-1,1]){const ear=sphere(side*.17,1.65,.22,.19,0xeee3cd,g);ear.scale.set(.65,2.3,.7);sphere(side*.13,1.15,.64,.035,0x253c2c,g);sphere(side*.29,.22,.35,.2,0xcabb9c,g).scale.set(1,.7,1.4)}sphere(0,.96,.69,.055,0xc38777,g);sphere(0,.57,-.48,.19,0xf4e9d4,g);seat(g);return g}
 function fox(x,z,parent=root){const g=new THREE.Group();g.position.set(x,0,z);parent.add(g);sphere(0,.62,0,.58,0xc57939,g).scale.set(.8,1,1.2);sphere(0,1.16,.3,.46,0xd68b43,g);const muzzle=sphere(0,1.02,.65,.26,0xf2e1ba,g);muzzle.scale.set(1,.6,.8);for(const side of [-1,1]){const ear=mesh(new THREE.ConeGeometry(.22,.48,4),mat(0xb66b31),g);ear.position.set(side*.26,1.6,.23);ear.rotation.y=Math.PI/4;sphere(side*.17,1.23,.68,.034,0x28352b,g);box(side*.26,.22,.2,.17,.4,.2,0x604a36,g)}sphere(0,1.07,.88,.05,0x28352b,g);const tail=sphere(.4,.6,-.6,.35,0xd68b43,g);tail.scale.set(.7,.8,1.9);tail.rotation.y=-.4;sphere(.64,.58,-1.04,.2,0xf2e1ba,g);seat(g);return g}
 function crate(key,x,z,parent=root){const colors={water:0x72b7c4,soil:0x90704d,food:0xd7ac63,sand:0xcbb276,starch:0xdeb86f};const g=new THREE.Group();g.position.set(x,.2,z);parent.add(g);if(key==='water'){const jug=mesh(new THREE.CylinderGeometry(.24,.32,.8,16),mat(colors[key]),g);jug.position.y=.5;const h=mesh(new THREE.TorusGeometry(.23,.045,8,18),mat(0xd7e5d3),g);h.position.set(.3,.62,0);h.rotation.y=Math.PI/2;box(0,.98,0,.3,.1,.3,0xd7e5d3,g)}else{const vessel=mesh(new THREE.CylinderGeometry(.38,.32,.65,18,1,true),mat(0xdacba2),g);vessel.position.y=.42;const contents=mesh(new THREE.CylinderGeometry(.32,.29,.2,18),mat(key==='starch'?0xf5e7b6:key==='sand'?0xc4a36d:0x806344),g);contents.position.y=.51;if(key==='starch')for(let i=0;i<8;i++)sphere(Math.sin(i*2.4)*.23,.68+Math.floor(i/4)*.09,Math.cos(i*2.4)*.23,.085,0xfff1cd,g);if(key==='food'){const bread=box(0,.73,0,.55,.2,.45,0xdeb369,g);bread.rotation.z=.1}}seat(g);return g}
 function clearRoot(){if(!root)return;surfaces.remove(root);world.remove(root);const geometries=new Set(),textures=new Set();root.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material?.map)textures.add(o.material.map)});geometries.forEach(g=>g.dispose());textures.forEach(t=>t.dispose());ownedMaterials.forEach(m=>m.dispose());ownedMaterials.clear();picks.length=0;floaters.length=0;animated.length=0;labels.length=0;root=null;selectionPoint=null;delivery=null;filterOpening=null;bridgeTarget=null;}
 const isSolved=()=>!!attempt?.records[q?.id]?.solved;
 const footer=(ready,label)=>{next.disabled=!ready;next.innerHTML=`${icon(ready?'unlock':'lock')}<span>${label}</span>${icon('arrow')}`;next.setAttribute('aria-label',`${label} — ${ready?'unlocked':'locked'}`)};
 function nextLabel(){return attempt.index===9?'Next: results':attempt.index===4?'Next: leaf workshop':attempt.index===6?'Next: living grove':'Next discovery'}
 function updateHud(){
  const chapter=chapters[q.chapter];$('#grove-goal').textContent=q.title;$('#grove-instruction').textContent=q.type==='carry'&&config.cargo&&!config.placed&&!isSolved()?'Carry your sample to the marked station. Press E to deliver it.':'Use the equipment in the clearing. Drag movable parts, or walk up and press E.';
  $('.grove-milestones').innerHTML=`<span class="forest-chapter-progress">Chapter ${q.chapter+1} / 3 · ${escapeHTML(chapter.name)}</span><b>Discovery ${attempt.index+1} / 10</b>`;
  note.textContent=canSave()?'Correct first test: 1 mark. Moves and changes are free.':'Saving unavailable · keep this page open';footer(isSolved(),nextLabel());
 }
 function button(action,text,selected=false){return `<button data-forest-action="${action}" ${isSolved()||handling?'disabled':''} aria-pressed="${selected}">${text}</button>`}
 function selectedValue(){if(q.type==='gaslab')return config.observed&&config.gas;if(q.type==='dialogue')return config.choice;if(q.type==='carry')return config.cargo;if(q.type==='filter')return config.gas;if(q.type==='leaves')return config.leaf;if(q.type==='bridge')return config.plot!==null;return true}
 function controls(){
  const focusAction=document.activeElement?.dataset.forestAction;
  $('#forest-task').dataset.type=q.type;$('#forest-task-title').textContent=q.title;$('#forest-task-prompt').textContent=learnerPrompt(q.type==='gaslab'&&config.observed?'The glowing splint relights. Which gas did the water plant release?':q.prompt);
  let html='';
  if(q.type==='dialogue')html=`<div class="forest-dialogue">${q.choices.map(([key,text])=>button(key,escapeHTML(text),config.choice===key)).join('')}</div>`;
  else if(q.type==='mirrors')html='<p class="forest-control-note">Drag each mirror left or right. Follow the beam to the leaf. Press E beside a mirror to turn it without dragging.</p>';
  else if(q.type==='carry')html=`<p class="forest-control-note">${config.cargo?`Carrying ${escapeHTML(q.items.find(i=>i[0]===config.cargo)?.[1]||'a supply')}. Walk to the ${q.id==='water'?'soil bed':'food store'} and press E to place it.`:'Walk to a sample and press E to pick it up, or touch the sample in the world.'}</p>`;
  else if(q.type==='filter')html='<p class="forest-control-note">Drag a molecule into the opening on the leaf. With a keyboard, pick one up with E, then walk to the opening and press E again.</p>';
  else if(q.type==='leaves')html=`<p class="forest-control-note">Use the lamp on both leaf areas. Observed: ${(config.seen||[]).length} / 2. Then test which area makes food.</p>`;
  else if(q.type==='gaslab')html=config.observed?`<div class="forest-object-controls forest-gas-choices">${q.items.map(([key,text])=>button(key,escapeHTML(text),config.gas===key)).join('')}</div>`:`<p class="forest-control-note">Touch the collector to trap bubbles. Then touch the glowing splint and watch what happens.</p>`;
  else if(q.type==='chain')html=`<p class="forest-control-note">Drag the animal and plant figures into food order. Current order: ${config.order.map(x=>({plant:'Plant',rabbit:'Rabbit',fox:'Fox'}[x])).join(' → ')}</p>`;
  else html='<p class="forest-control-note">Drag a patch to the rabbit shelter. With a keyboard, select a patch with E, then press E again beside the shelter.</p>';
  $('#forest-task-controls').innerHTML=html;
  const check=$('#forest-test');check.hidden=q.type==='carry'||q.type==='filter'||q.type==='bridge'||q.type==='gaslab'&&!config.observed;check.disabled=isSolved()||!selectedValue()||(q.type==='leaves'&&(config.seen||[]).length<2);check.innerHTML=`${icon(q.type==='gaslab'?'wind':'flask')} ${q.type==='gaslab'?'Identify the collected gas':q.type==='leaves'?'Compare the leaf areas':q.type==='mirrors'?'Try this light route':q.type==='chain'?'Check the food chain':q.id==='meaning'?'Tell Sprout':'Explain to Beep'}`;
  const rec=attempt.records[q.id];$('#forest-task-feedback').textContent=rec?`${rec.solved?'Discovery complete!':'Try another plan.'} ${q.why}${rec.solved?'':' Change the objects, then test again.'}`:'';$('#forest-task-feedback').classList.toggle('correct',!!rec?.solved);
  if(focusAction)$('#forest-task-controls').querySelector(`[data-forest-action="${focusAction}"]`)?.focus({preventScroll:true});
 }
 function drawProps(){
  clearRoot();root=new THREE.Group();const base=Math.max(...Array.from({length:12},(_,i)=>groundHeight(area.center[0]+Math.cos(i*Math.PI/6)*4.2,area.center[1]+Math.sin(i*Math.PI/6)*4.2)))+.04;root.position.set(area.center[0],base,area.center[1]);world.add(root);disc(0,0,4.2,0xb7b68b).userData.isFloor=true;surfaces.disc(root,area.center[0],area.center[1],4.2,base+.18);
  if(q.type==='dialogue'){
   leaf(0,.2,-.4,0x78a74b,1.25);for(let i=0;i<3;i++){const g=disc(-2.4+i*2.4,2.1,.7,config.choice===q.choices[i][0]?0xefd48a:0xd3caa3);clickable(g,q.choices[i][0]);label(String(i+1),-2.4+i*2.4,.7,2.1,.7)}
   if(q.id==='balance'){sphere(-2,1.6,-1,.35,0x8ab5c7);label('CO₂',-2,2.3,-1,1);sphere(2,1.6,-1,.35,0xd3e2b0);label('O₂',2,2.3,-1,1)}
  }else if(q.type==='mirrors'){
   const sun=sphere(-3.2,3,-1.8,.55,0xf4d678);sun.material.emissive=new THREE.Color(0xffd66b);sun.material.emissiveIntensity=.45;label('Sunlight',-3.2,4,-1.8,1.8);
   for(const[i,x,z,key]of [[0,-1,0,'near'],[1,1,-1,'far']]){disc(x,z,.65,0x9c9f81);box(x,.68,z,.14,1,.14,0x82744c);const mirror=box(x,1.3,z,1.1,1.2,.12,0xc5dfe4);mirror.material.metalness=.65;mirror.material.roughness=.15;mirror.rotation.y=(config[key]-1)*Math.PI/3;clickable(mirror,key);label(i===0?'Near mirror':'Far mirror',x,2.3,z,1.8)}
   leaf(3,.25,0,0x7baa47,.8);const first=[-1,1.3,0],second=config.near===1?[1,1.3,-1]:[-2,1.1,config.near===0?2.3:-2.6];tube([[-3.2,3,-1.8],first,second],0xffdf81,.06);if(config.near===1)tube([second,config.far===2?[3,1.4,-.3]:[2.8,1.3,config.far===0?-3:2.4]],0xffdf81,.06);
  }else if(q.type==='carry'){
   q.items.forEach(([key,text],i)=>{const x=-2.5+i*2.5;disc(x,-1,.65,config.cargo===key?0xe8c976:0xc4bd96);const object=crate(key,x,-1);object.visible=!(config.cargo===key&&!config.placed);clickable(object,key);label(text,x,1.7,-1,2.1)});
   const store=new THREE.Group();store.position.set(3.2,.2,2.5);root.add(store);if(q.id==='water'){disc(0,0,.85,0x8b704b,store);leaf(0,.1,0,0x7eaa47,.55,store);for(const side of [-1,1])tube([[0,.3,0],[side*.4,.1,.2],[side*.7,.08,.4]],0xc8ab76,.05,store);label('ROOTS',0,2.2,0,1.8,store)}else{box(0,.45,0,1.4,.9,1.1,0x9e8258,store);box(0,1,0,1.6,.2,1.25,0xc6ad79,store);label('FOOD STORE',0,2,0,2.1,store)}
   if(q.id==='water')surfaces.disc(root,area.center[0]+3.2,area.center[1]+2.5,.85,root.position.y+.38);else surfaces.box(root,area.center[0]+3.2,area.center[1]+2.5,1.6,1.25,root.position.y+1.3);
   delivery={x:area.center[0]+3.2,z:area.center[1]+2.5,label:q.id==='water'?'Deliver supply to the roots':'Pack the food store'};
   if(config.cargo&&!config.placed&&!isSolved()){const carried=crate(config.cargo,0,0);carried.scale.setScalar(.55);carried.userData.carried=true;animated.push(carried)}
   if(config.cargo&&config.placed){const placed=crate(config.cargo,3.2,3.2);placed.scale.setScalar(.55);seat(placed,q.id==='water'?.38:.18);if(q.id==='water'&&config.cargo==='water')tube([[3.2,.85,3.2],[3.05,.65,2.9],[3.1,.4,2.65]],0x72c2d0,.035)}
  }else if(q.type==='filter'){
   leaf(1,.15,-.4,0x78a74b,1.15);const opening=mesh(new THREE.TorusGeometry(.5,.1,10,28),mat(0x9eaf70));opening.position.set(1,1.15,.55);filterOpening=opening;label('Tiny opening',1,3.8,-.4,2);
   q.items.forEach(([key,text],i)=>{const x=-3+i*2;const g=new THREE.Group();g.position.set(x,1.2,1.8);root.add(g);sphere(0,0,0,.35,key==='co2'?0x9c8fb1:key==='oxygen'?0xaec8c0:0x81bfc7,g);if(key==='co2')for(const side of [-1,1])sphere(side*.43,0,0,.22,0xd9cbdf,g);label(key==='co2'?'CO₂':key==='oxygen'?'O₂':'Water vapour',0,.75,0,key==='water'?2:1.1,g);clickable(g,key);floaters.push({object:g,base:1.2,phase:i})});if(isSolved()){sphere(1,1.3,.2,.22,0xb39ac6);label('CO₂ enters the leaf',1,2.8,-.3,2.8)}if(config.gas){const index=q.items.findIndex(i=>i[0]===config.gas);tube([[-3+index*2,1.2,1.8],[0,1.3,1.3],[1,1.15,.55]],0xd5c2e1,.045)}
  }else if(q.type==='leaves'){
   const lamp=mesh(new THREE.ConeGeometry(.65,1.1,16),mat(0xe3bd61));lamp.rotation.x=Math.PI;lamp.position.set(config.leaf==='green'?2:-2,3.65,.2);sphere(lamp.position.x,3.08,.2,.2,0xffe394);label('Move the lamp to compare',0,4.6,-1,3.9);
   for(const [i,key,color]of [[0,'white',0xe8dfb6],[1,'green',0x79a44b]]){const x=-2+i*4;disc(x,0,1.25,config.leaf===key?0xe9ce83:0xb6b78d);const object=leaf(x,.2,0,color,1);clickable(object,key);label(key==='white'?'White area':'Green area',x,3.4,0,2);if(key==='green')for(let j=0;j<4;j++){const grain=sphere(x+(j%2)*.4-.2,.8+Math.floor(j/2)*.4,.24,.11,0x3f7d3f);grain.scale.x=1.4}}
   label('Same light · water · carbon dioxide',0,4.3,-1,4);
  }else if(q.type==='gaslab'){
   gasCollector({root,mesh,mat,box,sphere,tube,leaf,label,clickable,floaters,seat},config);surfaces.box(root,area.center[0],area.center[1]-.6,3.4,2.6,root.position.y+3.4);
  }else if(q.type==='chain'){
   for(let i=0;i<3;i++){const x=-2.5+i*2.5,key=config.order[i];disc(x,0,.85,0xc5bd93);const object=key==='plant'?leaf(x,.2,0,0x7da949,.75):key==='rabbit'?rabbit(x,0):fox(x,0);clickable(object,i===0?'swap0':'swap1');object.userData.forestIndex=i;label({plant:'Plant',rabbit:'Rabbit',fox:'Fox'}[key],x,2.55,0,1.6);if(i<2){tube([[x+.7,.35,.6],[x+1.8,.35,.6]],0xd2b15d,.07);const arrow=mesh(new THREE.ConeGeometry(.16,.4,5),mat(0xd2b15d));arrow.rotation.z=-Math.PI/2;arrow.position.set(x+1.75,.35,.6)}}
  }else{
   for(let i=0;i<2;i++){const x=-2.3+i*4.6,patch=new THREE.Group();patch.position.set(x,0,-.8);root.add(patch);disc(0,0,1.2,i?0x7c9f55:0xabaa8c,patch);if(i){for(const offset of [-.4,.4])leaf(offset,.2,0,0x77a547,.65,patch);label('Green plants in light',0,2.5,0,2.6,patch)}else{for(const offset of [-.35,.35]){const rock=mesh(new THREE.DodecahedronGeometry(.5,0),mat(0x959c86),patch);rock.position.set(offset,.5,0)}label('Bare rocks',0,2.5,0,2.2,patch)}clickable(patch,i?'plants':'rocks')}
   const target=disc(0,2.2,1.15,0xcbb887);target.userData.isFloor=true;bridgeTarget=target;label('PLANT HERE',0,.55,2.2,1.8);rabbit(0,3.55);box(0,.6,4.3,1.8,1.1,.12,0x9f8358);label('Rabbit shelter',0,2.5,4.3,2.1);if(isSolved()&&config.plot===1){for(let i=0;i<6;i++){const air=sphere(-1+i*.5,1.3+(i%2)*.2,.5,.09,0xc5dfcd);floaters.push({object:air,base:air.position.y,phase:i})}label('Oxygen added over time',0,3.2,0,3.7)}
  }
  root.updateMatrixWorld(true);framing=new THREE.Box3();root.traverse(object=>{if((object.isMesh||object.isSprite)&&!object.userData.isFloor)framing.expandByObject(object)});
  if(isSolved()){const ring=mesh(new THREE.TorusGeometry(3.85,.045,6,80),new THREE.MeshBasicMaterial({color:0xd9d58e}));ownedMaterials.add(ring.material);ring.rotation.x=Math.PI/2;ring.position.y=.23;}
 }
 function takeSample(key){
  if(config.cargo===key&&!config.placed)return;
  const done=()=>{handling=false;controls();updateHud()},cancelled=()=>{handling=false;controls()};
  const sourceX=k=>area.center[0]-2.5+q.items.findIndex(i=>i[0]===k)*2.5;
  if(config.cargo&&!config.placed){handling=true;controls();const old=config.cargo;tell('Nico is returning the sample before picking up another.');performAt(sourceX(old),area.center[1]-1,'Putting Down',{onContact:()=>{config.cargo=null;config.placed=false;persist();drawProps()},onComplete:()=>{done();takeSample(key)},onCancel:cancelled});return}
  handling=true;controls();tell('Nico is going to pick up the sample.');
  if(!performAt(sourceX(key),area.center[1]-1,'Picking Up',{onContact:()=>{config.cargo=key;config.placed=false;persist();drawProps();tone()},onComplete:()=>{done();tell(`Carrying ${q.items.find(i=>i[0]===key)[1]}. Bring it to the marked station and press E to put it down.`)},onCancel:cancelled}))cancelled();
 }
 function action(key){
  if(!active||finishMode||handling||isInteractionBusy())return;if(key==='open'){open();return}if(isSolved())return;
  if(q.type==='dialogue')config.choice=key;
  else if(q.type==='mirrors')config[key]=(config[key]+1)%3;
  else if(q.type==='carry'){takeSample(key);return}
  else if(q.type==='filter')config.gas=key;
  else if(q.type==='leaves'){config.leaf=key;config.seen||=[];if(!config.seen.includes(key))config.seen.push(key);tell(key==='green'?'The green area uses the same light to make food.':'The white area receives light, but this model shows no food made there.');}
  else if(q.type==='gaslab'){if(key==='collect'){config.collected=true;tell('Bubbles from the water plant are trapped in the inverted tube. Now try the glowing splint.')}else if(key==='splint'){if(!config.collected){tell('Collect the bubbles in the tube first.');return}config.observed=true;tell('The glowing splint relights inside the collected gas. Use that observation to identify the gas.')}else{if(!config.observed){tell('Observe the glowing splint before identifying the gas.');return}config.gas=key}}
  else if(q.type==='chain'){const a=key==='swap0'?0:1;[config.order[a],config.order[a+1]]=[config.order[a+1],config.order[a]]}
  else config.plot=key==='plants'?1:0;
  persist();drawProps();controls();tone();if(q.type==='carry'){panelOpen=true;$('#forest-task').hidden=false;$('#grove-context').hidden=true;$('#grove-marker').hidden=true;updateHud();focusPlayer()}
 }
 function open(){if(finishMode)return;panelOpen=true;$('#grove-message').classList.remove('visible');$('#forest-task').hidden=false;controls();updateHud();$('#forest-task-title').tabIndex=-1;$('#forest-task-title').focus({preventScroll:true})}
 function close(){focusPlayer()}
 function test(){
  if(!active||finishMode||handling||isInteractionBusy()||isSolved()||!selectedValue())return;
  if(q.type==='carry'&&(!delivery||Math.hypot(player.position.x-delivery.x,player.position.z-delivery.z)>2.8)){tell('Carry the supply to the marked destination, then press E to deliver it.');return}
  if(q.type==='bridge'&&Math.hypot(player.position.x-area.center[0],player.position.z-(area.center[1]+2.2))>2.8){tell('Take the patch to the shelter before restoring it.');return}
  if(q.type==='carry'){
   handling=true;controls();tell('Nico is putting the sample down.');
   if(!performAt(delivery.x,delivery.z,'Putting Down',{onContact:()=>{config.placed=true;persist();drawProps()},onComplete:()=>{handling=false;commitTest()},onCancel:()=>{handling=false;controls()}})){handling=false;controls()}
   return;
  }
  commitTest();
 }
 function commitTest(){
  const correct=correctConfiguration(q,config);commitAnswer(attempt,q.id,correct);animation=0;drawProps();controls();updateHud();
  if(correct){setAction('Victory');tone(true);$('#grove-success-title').textContent=q.id==='chlorophyll'?'The leaf is ready!':learnerLine('Discovery made, {name}!','Discovery made!');$('#grove-success-copy').textContent=q.id==='chlorophyll'?'Sunlight, water, carbon dioxide and chlorophyll: all four needs.':q.why;$('#grove-success span').textContent=`Discovery ${attempt.index+1} / 10 complete`;$('#grove-success').hidden=false;$('#forest-task').hidden=true;$('.grove-mission').hidden=true;if(q.chapter===0&&attempt.index===4)restoreForest(.45)}
  else{tone();tell(learnerLine('Good try, {name}. Your first test is recorded. Change your plan and try again.','Good try. Your first test is recorded. Change your plan and try again.'));if(q.type==='carry'){panelOpen=true;$('#forest-task').hidden=false}}
 }
 ui.addEventListener('click',event=>{const actionButton=event.target.closest('[data-forest-action]');if(actionButton)action(actionButton.dataset.forestAction)},{signal:events.signal});
 $('#forest-test').addEventListener('click',test,{signal:events.signal});$('#forest-close').addEventListener('click',close,{signal:events.signal});
 function loadCurrent(){
  handling=false;finishMode=false;panelOpen=true;certificateCleanup?.();certificateCleanup=null;$('#forest-certificate').hidden=true;$('#forest-results').hidden=true;$('#forest-task').hidden=true;$('#grove-success').hidden=true;$('#grove-discovery').hidden=true;$('#grove-context').hidden=true;$('#grove-marker').hidden=true;
  q=challenges[attempt.index];config=configFor(attempt,q.id,q.initial);const nextArea=chapters[q.chapter],entering=area!==nextArea;area=nextArea;drawProps();
  // Older saves kept the mission but lost Nico's location. Enter its clearing,
  // rather than restoring a carried sample at the distant forest entrance.
  if(entering){const saved=attempt.playerPosition,valid=saved?.chapter===q.chapter&&Number.isFinite(saved.x)&&Number.isFinite(saved.z)&&saved.x>=-12&&saved.x<=11&&saved.z>=-9&&saved.z<=8.5;cancelInteraction();player.position.set(valid?saved.x:area.center[0]-1.8,0,valid?saved.z:area.center[1]+2.5);player.position.y=surfaces.heightAt(player.position.x,player.position.z);savePosition()}
  controls();$('#forest-task').hidden=false;$('#forest-close').hidden=true;$('.grove-mission').hidden=false;updateHud();tell(`${area.place}: ${q.title}. Use the equipment in the clearing.`);
 }
 function savePosition(){
  positionClock=0;if(!active||!attempt||!q||finishMode)return;const saved=attempt.playerPosition;
  if(!saved||saved.chapter!==q.chapter||Math.hypot(saved.x-player.position.x,saved.z-player.position.z)>.01){attempt.playerPosition={chapter:q.chapter,x:player.position.x,z:player.position.z};persist()}
 }
 window.addEventListener('pagehide',savePosition,{signal:events.signal});
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
 function retake(){cancelInteraction();handling=false;area=null;attempt=newAttempt(undefined,true);bridge.setStage('quest');loadCurrent();focusPlayer()}
 function start(){active=true;ui.hidden=false;attempt=ensureAttempt();attempt.practiceDone=true;persist();hidePractice();bridge.setStage('quest');if(attempt.completedAt)results();else loadCurrent()}
 function nextStep(){if(!active)return false;if(finishMode){if(!$('#forest-certificate').hidden){location.hash='finish';return true}certificate();return true}if(!isSolved())return true;cancelInteraction();if(advanceAttempt(attempt)){if(attempt.completedAt)results();else loadCurrent()}return true}
 function desired(){
  if(!active||finishMode||isSolved())return null;
  if(q.type==='carry'&&config.cargo&&!config.placed&&!isSolved()&&delivery)return{id:'delivery',x:delivery.x,z:delivery.z,label:delivery.label,radius:2.8,icon:'drop'};
  if(q.type==='filter'&&config.gas)return{id:'delivery',x:area.center[0]+1,z:area.center[1]+.6,label:'Guide the molecule into the leaf',radius:2.8,icon:'wind'};
  if(q.type==='bridge'&&config.plot!==null)return{id:'delivery',x:area.center[0],z:area.center[1]+2.2,label:'Restore the shelter patch',radius:2.8,icon:'sprout'};
  root.updateMatrixWorld(true);const candidates=picks.filter(o=>{const key=o.userData.forestAction;return !(q.type==='gaslab'&&((key==='splint'&&!config.collected)||(q.items.some(i=>i[0]===key)&&!config.observed)))}).map(object=>{const p=object.getWorldPosition(new THREE.Vector3());return{object,p,d:Math.hypot(player.position.x-p.x,player.position.z-p.z)}}).sort((a,b)=>a.d-b.d);const item=candidates[0];return item?{id:'equipment',action:item.object.userData.forestAction,x:item.p.x,z:item.p.z,label:actionLabel(item.object.userData.forestAction),radius:2.5,icon:q.chapter===0?'sun':q.chapter===1?'leaf':'heart'}:null;
 }
 function interact(){if(finishMode)return;const d=desired();if(!d)return;if(Math.hypot(player.position.x-d.x,player.position.z-d.z)>d.radius)return;if(d.id==='delivery')test();else action(d.action)}
 function hitAction(raycaster){const hit=raycaster.intersectObjects(picks,true)[0];if(!hit)return null;let object=hit.object;while(object&&!object.userData.forestAction)object=object.parent;return object||null}
 function pointerDown(event,raycaster){
  if(!active||finishMode||isSolved())return false;const object=hitAction(raycaster);if(!object)return false;
  const key=object.userData.forestAction;
  if(q.type==='mirrors'||q.type==='filter'||q.type==='chain'||q.type==='bridge'){
   drag={id:event.pointerId,key,object,startX:event.clientX,startY:event.clientY,value:q.type==='mirrors'?config[key]:null,source:object.userData.forestIndex,moved:false};
  }else action(key);
  return true;
 }
 function dragPoint(raycaster,height){const point=new THREE.Vector3();return raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),-height),point)?point:null}
 function droppedOn(event,object){if(!object)return false;object.updateWorldMatrix(true,false);sceneCamera.updateMatrixWorld(true);const p=object.getWorldPosition(new THREE.Vector3()).project(sceneCamera),rect=$('#grove-view').getBoundingClientRect(),x=rect.left+(p.x+1)*rect.width/2,y=rect.top+(1-p.y)*rect.height/2;return p.z<1&&Math.hypot(event.clientX-x,event.clientY-y)<Math.max(65,Math.min(rect.width,rect.height)*.09)}
 function pointerMove(event,aim){
  if(!drag||drag.id!==event.pointerId)return false;drag.moved ||= Math.hypot(event.clientX-drag.startX,event.clientY-drag.startY)>8;
  if(!drag.moved)return true;
  if(q.type==='mirrors'){
   const value=THREE.MathUtils.clamp(drag.value+Math.round((event.clientX-drag.startX)/55),0,2);
   if(config[drag.key]!==value){config[drag.key]=value;persist();drawProps();controls();tone()}
  }else if(q.type==='filter'||q.type==='chain'||q.type==='bridge'){
   const point=dragPoint(aim(event),root.position.y+1.2);
   if(point&&drag.object.parent){drag.object.position.x=point.x-root.position.x;drag.object.position.z=point.z-root.position.z}
  }
  return true;
 }
 function pointerUp(event,aim){
  if(!drag||drag.id!==event.pointerId)return false;const held=drag;drag=null;
  if(event.type==='pointercancel'){drawProps();controls();return true}
  if(q.type==='mirrors'){if(!held.moved)action(held.key);else{drawProps();controls()}return true}
  if(!held.moved){action(held.key);return true}
  const point=dragPoint(aim(event),root.position.y+1.2);
  if(q.type==='filter'){
   if(droppedOn(event,filterOpening)){config.gas=held.key;persist();commitTest()}
   else{drawProps();tell('Bring the molecule to the leaf opening.')}return true;
  }
  if(q.type==='chain'){
   if(point){const index=THREE.MathUtils.clamp(Math.round(((point.x-area.center[0])+2.5)/2.5),0,2),source=held.source;[config.order[source],config.order[index]]=[config.order[index],config.order[source]];persist();tone()}
   drawProps();controls();return true;
  }
  if(q.type==='bridge'){
   if(droppedOn(event,bridgeTarget)){config.plot=held.key==='plants'?1:0;persist();commitTest()}
   else{drawProps();tell('Bring the patch to the marked shelter bed.')}return true;
  }
  return true;
 }
 function update(delta,time,reduced){
  if(!active)return;animation+=delta;positionClock+=delta;if(positionClock>=1)savePosition();
  const forward=sceneCamera.getWorldDirection(new THREE.Vector3()),origin=sceneCamera.getWorldPosition(new THREE.Vector3()),point=new THREE.Vector3(),limit=innerWidth<=760?120:180,tangent=Math.tan(THREE.MathUtils.degToRad(sceneCamera.fov/2));
  for(const {sprite,width} of labels){sprite.getWorldPosition(point);const depth=point.sub(origin).dot(forward);if(depth<=0){sprite.visible=false;continue}sprite.visible=true;const pixelScale=innerHeight/(2*tangent*depth),shownWidth=Math.min(width,limit/pixelScale);sprite.scale.set(shownWidth,shownWidth/5,1)}
  if(!finishMode){for(const f of floaters)if(!reduced)f.object.position.y=f.rise?f.base+((time*.6+f.phase)%1.85):f.base+Math.sin(time*1.2+f.phase)*.08;for(const o of animated)if(o.userData.carried){o.position.copy(carryPoint()).sub(root.position);o.rotation.y=player.rotation.y}
   if(isSolved()&&animation>3)setAction('Idle');
  }
 }
 function camera(){
  if(!active||finishMode)return null;
  if(innerWidth>760)return keepPlayerVisible({look:[area.center[0]+2.5,.6,area.center[1]+1.5],position:[area.center[0]+9,13.5,area.center[1]+15]});
  const bounds=framing||new THREE.Box3(new THREE.Vector3(area.center[0]-3,0,area.center[1]-2),new THREE.Vector3(area.center[0]+3,4,area.center[1]+3));
  const center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3());
  const direction=new THREE.Vector3(.4,.72,1).normalize(),right=new THREE.Vector3(1,0,-.4).normalize(),up=new THREE.Vector3().crossVectors(direction,right).normalize();
  const height=innerHeight,width=innerWidth,top=80,bottom=Math.max(top+130,$('#forest-task').getBoundingClientRect().top-18),fraction=(bottom-top)/height;
  const projectedWidth=Math.abs(right.x)*size.x+Math.abs(right.z)*size.z,projectedHeight=Math.abs(up.x)*size.x+Math.abs(up.y)*size.y+Math.abs(up.z)*size.z;
  const tangent=Math.tan(THREE.MathUtils.degToRad(57/2));
  const distance=Math.max(13,projectedWidth/(2*tangent*(width/height)*.82),projectedHeight/(2*tangent*fraction*.86));
  const position=center.clone().addScaledVector(direction,distance),target=center.clone().addScaledVector(up,-distance*tangent*(1-(top+bottom)/height));
  return keepPlayerVisible({look:target.toArray(),position:position.toArray()});
 }
 function keepPlayerVisible(view){
  // Preserve the apparatus view until Nico reaches its edge, then follow him.
  // The safe area excludes the task panel, footer and movement controls.
  const width=innerWidth,height=innerHeight,task=$('#forest-task').getBoundingClientRect(),mobile=width<=760;
  const left=mobile?18:45,right=mobile?width-18:task.left-30,top=mobile?85:120,bottom=mobile?task.top-18:$('.grove-bottom').getBoundingClientRect().top-115;
  const look=new THREE.Vector3(...view.look),position=new THREE.Vector3(...view.position),center=player.position.clone().add(new THREE.Vector3(0,1.1,0));
  viewForward.copy(look).sub(position).normalize();viewRight.crossVectors(viewForward,THREE.Object3D.DEFAULT_UP).normalize();viewUp.crossVectors(viewRight,viewForward).normalize();
  if(center.clone().sub(position).dot(viewForward)<3){const move=center.clone().sub(look);position.add(move);look.add(move)}
  framingCamera.fov=width/height<1?57:43;framingCamera.aspect=width/height;framingCamera.updateProjectionMatrix();
  const tangent=Math.tan(THREE.MathUtils.degToRad(framingCamera.fov/2));
  for(let pass=0;pass<3;pass++){
   framingCamera.position.copy(position);framingCamera.lookAt(look);framingCamera.updateMatrixWorld(true);
   let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity,depth=0;
   for(const x of [-.75,.75])for(const y of [0,2.4])for(const z of [-.75,.75]){const p=player.position.clone().add(new THREE.Vector3(x,y,z));depth=Math.max(depth,p.clone().sub(position).dot(viewForward));p.project(framingCamera);const sx=(p.x+1)*width/2,sy=(1-p.y)*height/2;minX=Math.min(minX,sx);maxX=Math.max(maxX,sx);minY=Math.min(minY,sy);maxY=Math.max(maxY,sy)}
   const dx=minX<left?left-minX:maxX>right?right-maxX:0,dy=minY<top?top-minY:maxY>bottom?bottom-maxY:0;if(!dx&&!dy)break;
   const move=viewRight.clone().multiplyScalar(-dx*2*depth*tangent*(width/height)/width).addScaledVector(viewUp,dy*2*depth*tangent/height);position.add(move);look.add(move);
  }
  return{look:look.toArray(),position:position.toArray()};
 }
 function resetCurrent(){cancelInteraction();handling=false;if(!active||finishMode){if(active)retake();return}if(isSolved()){tell('This discovery is complete. Use Next to continue, or start a fresh attempt from your results.');return}attempt.configs[q.id]=JSON.parse(JSON.stringify(q.initial));config=attempt.configs[q.id];persist();drawProps();controls();tell('Puzzle reset. Your first-answer mark stays with this attempt.')}
 function cleanup(){savePosition();active=false;drag=null;events.abort();certificateCleanup?.();clearRoot();ui.remove()}
 return{start,next:nextStep,desired,interact,pointerDown,pointerMove,pointerUp,update,camera,resetCurrent,cleanup,get active(){return active},get type(){return q?.type},get finished(){return finishMode},get attempt(){return attempt}};
}
