// Greenhaven: free creek practice, then three chapters and ten assessed decisions.
import {createCharacterMotion} from './grove-animation.js';
import {NICO_MODEL} from './nico-version.js';
import {createSurfaces,createFootContact} from './grove-surfaces.js';
import {learnerLine} from './learner-voice.js';
import * as THREE from './vendor/three/three.module.js';
import {GLTFLoader} from './vendor/three/GLTFLoader.js';
import {icon, state, save, escapeHTML,adoptExplorer} from './app.js?v=8';

import {explorerFields,bindExplorerFields,ensureAttempt,persist} from './grove-progress.js';
import {createForestQuest} from './grove-quest.js';

let disposeScene;
export function cleanupGrove(){disposeScene?.();disposeScene=null}
const svg = name => icon(name);
export function grove(){
 return `<section class="grove" aria-label="Greenhaven 3D forest adventure">
  <div id="grove-view" role="region" aria-label="Playable forest. Use WASD or arrow keys to walk, E to interact, Escape to pause." tabindex="0"></div>
  <div class="grove-shade" aria-hidden="true"></div>
  <header class="grove-top"><a href="#map" class="grove-brand" aria-label="Back to Sprout Lab">${svg('sprout')}<span>sprout<span>lab</span></span></a><div class="grove-tools"><button id="grove-quality" aria-label="Use lighter graphics" aria-pressed="false">${svg('leaf')}<span>Full detail</span></button><button id="grove-sound" aria-label="Turn game sounds on" aria-pressed="false">${svg('volume')}</button><button id="grove-pause" aria-label="Pause adventure">${svg('settings')}</button></div></header>
  <div class="grove-mission" hidden><h1 id="grove-goal">Find the missing handle</h1><p id="grove-instruction">Follow the golden glimmer beside the path.</p><div class="grove-milestones" aria-label="Rescue progress"><span data-milestone="0">Find</span><i></i><span data-milestone="1">Fit</span><i></i><span data-milestone="2">Flow</span></div></div>
  <div class="grove-compass" aria-label="Your destination"><span>${svg('drop')}</span><b id="grove-distance">Creek rescue</b><small id="grove-direction">Follow the glimmer</small></div>
  <div id="grove-marker" class="grove-marker" aria-hidden="true"><span>${svg('search')}</span></div>
  <div id="grove-context" class="grove-context" hidden><button id="grove-interact"><kbd>E</kbd><span id="grove-context-label">Pick up handle</span></button></div>
  <div id="grove-message" class="grove-message" role="status" aria-live="polite"></div>
  <div class="grove-controls" hidden><span><kbd>W A S D</kbd> / <kbd>↑ ← ↓ →</kbd> Walk</span><span><kbd>Shift</kbd> Run</span><span><kbd>E</kbd> Interact</span><span><kbd>Esc</kbd> Pause</span></div>
  <div class="grove-touch" aria-label="Movement controls" hidden><button data-walk="up" aria-label="Walk forward">${svg('arrow')}</button><button data-walk="left" aria-label="Walk left">${svg('arrow')}</button><button data-walk="down" aria-label="Walk backward">${svg('arrow')}</button><button data-walk="right" aria-label="Walk right">${svg('arrow')}</button></div>
  <div class="grove-bottom" hidden><span id="grove-bottom-note">First rescue · practice without marks</span><button id="grove-next" disabled>${svg('lock')}<span>Next: discovery</span>${svg('arrow')}</button></div>
  <section class="grove-intro" aria-labelledby="grove-title"><div class="grove-intro-copy"><h1 id="grove-title">Little roots.<br><em>Big adventure.</em></h1><p>A quiet creek. A thirsty little plant.<br>Welcome to Greenhaven, explorer.</p><form id="grove-start-form"><div class="grove-name-row">${explorerFields('grove',escapeHTML,state.learnerName)}<button id="grove-begin" disabled>Preparing forest…</button></div><small>A nickname is enough. It stays on this computer.</small></form><p class="grove-intro-controls">${svg('game')} Walk with WASD or arrow keys. Press E to explore.</p></div><div class="grove-loading"><span id="grove-load-label">Growing your little corner of the forest…</span><progress id="grove-load" max="100" value="0" aria-label="Loading forest"></progress></div></section>
  <section id="grove-story" class="grove-story" aria-labelledby="grove-story-title" hidden><div id="grove-story-face"></div><div><span id="grove-story-speaker"></span><h2 id="grove-story-title" tabindex="-1"></h2><p id="grove-story-copy"></p><span id="grove-story-count"></span></div><button id="grove-story-next">Next ${svg('arrow')}</button></section>
  <section id="grove-gate-panel" class="grove-gate-panel" aria-labelledby="gate-title" hidden><div><h2 id="gate-title">Where should the water go?</h2><p>Turn the channel. Then lift the gate to test your route.</p></div><div class="grove-gate-actions"><button id="grove-turn-left" aria-label="Turn channel left">${svg('arrow')}</button><span id="grove-outlet">Toward the pond</span><button id="grove-turn-right" aria-label="Turn channel right">${svg('arrow')}</button><button id="grove-release">${svg('drop')} Let it flow</button><button id="grove-leave">Back to exploring</button></div></section>
  <section id="grove-success" class="grove-success" aria-labelledby="grove-success-title" hidden><div class="grove-earned">${svg('check')}</div><div><h2 id="grove-success-title">Water restored!</h2><p id="grove-success-copy">You brought water to Sprout’s roots.</p><span>Creek rescue complete · ungraded practice</span></div></section>
  <section id="grove-discovery" class="grove-discovery" aria-labelledby="grove-discovery-title" hidden><div class="grove-discovery-art">${svg('sprout')}</div><h2 id="grove-discovery-title">A drink for the roots.</h2><p>Roots absorb water. It travels through the stem to the leaves.</p><p>Water is only one need for photosynthesis. Sprout also needs <strong>sunlight, carbon dioxide and chlorophyll</strong> to make its own food.</p><div class="grove-needs"><span class="restored">${svg('drop')} Water restored</span><span>${svg('sun')} Sunlight</span><span>${svg('wind')} Carbon dioxide</span><span>${svg('leaf')} Chlorophyll</span></div><p class="grove-prototype-note">Next: ten science discoveries in three forest clearings. Each correct first test earns one mark. You can correct mistakes and finish. Moving, collecting and changing your plan are free. There is no timer.</p><button id="grove-replay">${svg('play')} Play this rescue again</button></section>
  <dialog id="grove-pause-dialog"><h2>A little breather?</h2><p>Your explorer will wait right here.</p><button id="grove-resume">${svg('play')} Keep exploring</button><button id="grove-restart">Start this rescue again</button><a href="#map">Back to the adventure map</a></dialog>
  <div id="grove-failure" class="grove-failure" role="alert" hidden><h2>The forest couldn’t open.</h2><p id="grove-failure-copy">Try a browser with WebGL 2 enabled, such as an up-to-date Edge or Chrome.</p><button id="grove-retry">Try loading again</button><a href="#factory">Explore the illustrated leaf story</a></div>
 </section>`;
}

export async function bindGrove(){
 cleanupGrove();
 const $=s=>document.querySelector(s), host=$('#grove-view');
 const life=new AbortController(), events={signal:life.signal};
 let motion,approach=null,rightHand,seatNico=()=>{},storyStep=0,storyAttempt,quest,markerId="", dead=false, raf=0, renderer, world, camera, mixer, nico, audioContext;
 let stage='intro', handleFound=false, handleFitted=false, won=false, flowing=false, outlet=0, flowStart=0, wonTime=0, time=0, target=null, messageTimeout;
 let low=!!state.settings.low, muted=!state.settings.sound, paused=false, inputKeys=new Set(), pointerTarget=null, slowFrames=0, qualityAdjusted=false;
 const reduced=()=>state.settings.motion||matchMedia('(prefers-reduced-motion: reduce)').matches;
 const assets=new Map(), disposables=new Set(), colliders=[], interactables=[], plants=[], motes=[], waterSurfaces=[];
 const player=new THREE.Group(), focus=new THREE.Vector3(-1,0,0), cameraGoal=new THREE.Vector3(), lookGoal=new THREE.Vector3();
 const dummy=new THREE.Object3D(), raycaster=new THREE.Raycaster(), ndc=new THREE.Vector2();
 const listener=(el,type,fn)=>el.addEventListener(type,fn,events);
 const tell=text=>{const box=$('#grove-message');box.textContent=text;box.classList.add('visible');clearTimeout(messageTimeout);messageTimeout=setTimeout(()=>box.classList.remove('visible'),6500)};
 const show=(s,on)=>{$(s).hidden=!on};
 const tone=(success=false)=>{if(muted)return;try{audioContext ||= new (window.AudioContext||window.webkitAudioContext)();audioContext.resume();(success?[523,659,784,1047]:[440,660]).forEach((f,i)=>{const o=audioContext.createOscillator(),g=audioContext.createGain();o.type='sine';o.frequency.value=f;o.connect(g);g.connect(audioContext.destination);const t=audioContext.currentTime+i*.13;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.045,t+.025);g.gain.exponentialRampToValueAtTime(.0001,t+.45);o.start(t);o.stop(t+.5)})}catch{}};
 const isInteractionBusy=()=>!!approach||!!motion?.busy;
 const setAction=name=>{if(['Picking Up','Putting Down','Victory','Jumping'].includes(name))return motion?.playOnce(name,{reduced:reduced()});motion?.locomotion(name)};
 function cancelInteraction(){approach?.onCancel?.();approach=null;pointerTarget=null;motion?.cancel();inputKeys.clear()}
 function performAt(x,z,name,{onContact=()=>{},onComplete=()=>{},onCancel=()=>{}}={}){
  if(dead||isInteractionBusy())return false;
  inputKeys.clear();pointerTarget=null;
  const begin=()=>{player.rotation.y=Math.atan2(x-player.position.x,z-player.position.z);return motion.playOnce(name,{contact:name==='Picking Up'?.48:.52,onContact,onComplete,reduced:reduced()})};
  if(Math.hypot(player.position.x-x,player.position.z-z)>1.5){approach={begin,onCancel};pointerTarget=new THREE.Vector3(x,0,z+.95)}else begin();
  return true;
 }
 function carryPoint(out=new THREE.Vector3()){
  if(rightHand){rightHand.updateWorldMatrix(true,false);rightHand.getWorldPosition(out);out.y-=.36;out.x+=Math.sin(player.rotation.y)*.12;out.z+=Math.cos(player.rotation.y)*.12}
  else out.copy(player.position).add(new THREE.Vector3(.55,1,0));return out;
 }
 const materials=new Map();
 const mat=(color,options={})=>{const k=color+JSON.stringify(options);if(!materials.has(k))materials.set(k,new THREE.MeshStandardMaterial({color,roughness:.88,...options}));return materials.get(k)};
 const mesh=(geo,material,parent=world)=>{const m=new THREE.Mesh(geo,material);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m};
 const cube=(x,y,z,w,h,d,color,parent=world)=>{const m=mesh(new THREE.BoxGeometry(w,h,d),mat(color),parent);m.position.set(x,y,z);return m};
 const cylinder=(x,y,z,r,h,color,parent=world)=>{const m=mesh(new THREE.CylinderGeometry(r,r,h,12),mat(color),parent);m.position.set(x,y,z);return m};
 const groundHeight=(x,z)=> -.12+Math.sin(x*.24)*Math.cos(z*.2)*.15 + Math.max(0,-z-9)*.14;
 const surfaces=createSurfaces(groundHeight);
 const inClearing=(x,z)=>[[-4,2],[5,-6.6],[1,5]].some(([a,b])=>Math.hypot(x-a,z-b)<4.7);
 const normalize=(object,height)=>{const box=new THREE.Box3().setFromObject(object), size=box.getSize(new THREE.Vector3());object.scale.multiplyScalar(height/Math.max(size.y,.001));const b=new THREE.Box3().setFromObject(object);object.position.y-=b.min.y;return object};
 const place=(name,x,z,height,rotation=0,parent=world)=>{const object=normalize(assets.get(name).scene.clone(true),height);const root=new THREE.Group();root.add(object);root.position.set(x,groundHeight(x,z),z);root.rotation.y=rotation;parent.add(root);return root};
 const sign=(label,position,width=2.1)=>{const c=document.createElement('canvas');c.width=512;c.height=128;const ctx=c.getContext('2d');ctx.fillStyle='#fff7dc';ctx.beginPath();ctx.roundRect(5,5,502,118,28);ctx.fill();ctx.strokeStyle='#756b44';ctx.lineWidth=5;ctx.stroke();ctx.font='bold 48px Nunito, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#2d4533';ctx.fillText(label,256,64);const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,depthTest:false}));sprite.position.copy(position);sprite.scale.set(width,width/4,1);world.add(sprite);return sprite};
 const curve=(points)=>new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(p[0],p[1],p[2])));
 const pathMesh=(points,radius,material)=>{const m=mesh(new THREE.TubeGeometry(curve(points),60,radius,8,false),material);m.castShadow=false;return m};
 let stream, channel, wheel, gate, handle, roots, sprout, routeWater, heldHandle, destination, targetHalo, flowBeads=[], rootRipple, ground;
 const sourcePoints=[[-18,-.05,-3],[-14,-.05,-3.2],[-10,-.05,-2.8],[-6,-.05,-2],[-3,-.05,-1]];
 const routePoints=[
  [[-3,-.03,-1],[-.2,-.03,0],[2,-.03,3],[2,-.03,6]],
  [[-3,-.03,-1],[0,-.03,-1],[3,-.03,-1],[5.8,-.03,-1]],
  [[-3,-.03,-1],[-1,-.03,-3],[1,-.03,-5],[1,-.03,-7]]
 ];
 function makeWater(points,radius=.38){const material=new THREE.MeshStandardMaterial({color:0x62cbd2,roughness:.24,metalness:.12,transparent:true,opacity:.91});waterSurfaces.push(material);const m=pathMesh(points,radius,material);m.scale.y=.26;return m}
 function updateRoute(){
  if(routeWater){world.remove(routeWater);routeWater.geometry.dispose();routeWater.material.dispose()}
  routeWater=makeWater(routePoints[outlet],.29);routeWater.visible=false;
  channel.rotation.y=[-.62,0,.7][outlet];
  surfaces.remove('creek-channel');const angle=channel.rotation.y,c=Math.cos(angle),n=Math.sin(angle);
  surfaces.box('creek-channel',-2.2+.3*c,-1-.3*n,2.5,.9,.08,angle);
  for(const side of [-1,1])surfaces.box('creek-channel',-2.2+.3*c+side*.39*n,-1-.3*n+side*.39*c,2.5,.15,.3,angle);
  $('#grove-outlet').textContent=['Toward the pond','Toward Sprout’s roots','Toward the old stump'][outlet];
  $('#grove-gate-panel').dataset.outlet=String(outlet);
 }
 function refreshMilestones(){document.querySelectorAll('[data-milestone]').forEach((el,i)=>el.classList.toggle('done',i===0?handleFound:i===1?handleFitted:won))}
 function updateObjective(){
  const goal=$('#grove-goal'), instruction=$('#grove-instruction');
  if(won){goal.textContent='A drink for Sprout!';instruction.textContent='Follow the water to the roots.'}
  else if(handleFitted){goal.textContent='Bring water to the roots';instruction.textContent='Turn the channel at the creek gate.'}
  else if(handleFound){goal.textContent='Repair the creek gate';instruction.textContent='Carry the handle to the wooden sluice.'}
  else{goal.textContent='Find the missing handle';instruction.textContent='Follow the golden glimmer beside the path.'}
  refreshMilestones();
 }
 function interact(){
  if(isInteractionBusy())return;
  if(quest?.active){if(!paused)quest.interact();return}
  if(paused||flowing||stage!=='explore'||!target)return;
  if(target.id==='handle'){
   performAt(-8,3,'Picking Up',{onContact:()=>{handleFound=true;handle.visible=false;heldHandle.visible=true;tone();updateObjective()},onComplete:()=>tell('Found it! Take the handle to the wooden creek gate.')});
  }else if(target.id==='gate'){
   if(!handleFound){tell('The gate is missing its handle. Look for a golden glimmer beside the path.');return}
   const openGate=()=>{stage='gate';inputKeys.clear();pointerTarget=null;show('#grove-gate-panel',true);show('#grove-context',false);$('#grove-turn-right').focus({preventScroll:true})};
   if(!handleFitted){performAt(-3.7,-1,'Putting Down',{onContact:()=>{handleFitted=true;wheel.visible=true;heldHandle.visible=false;tone();updateObjective()},onComplete:()=>{tell('Handle fitted! Turn the channel, then lift the gate.');openGate()}})}else openGate();
  }else if(target.id==='sprout'){
   tell(won?'Water is reaching the roots. Open your discovery below to find out what happens next.':'Sprout’s roots are dry. Can you bring water from the creek?')
  }
 }
 function release(){
  if(flowing||won||stage!=='gate')return;
  flowing=true;flowStart=time;routeWater.visible=true;routeWater.geometry.setDrawRange(0,0);gate.userData.open=true;$('#grove-release').disabled=true;$('#grove-turn-left').disabled=true;$('#grove-turn-right').disabled=true;tone();
 }
 function win(){
  won=true;wonTime=time;stage='success';show('#grove-gate-panel',false);show('#grove-success',true);show('#grove-context',false);updateObjective();setAction('Victory');tone(true);
  $('#grove-success-copy').textContent=`Well done, ${state.learnerName||'Explorer'}! Water is reaching Sprout’s roots.`;
  const next=$('#grove-next');next.disabled=false;next.innerHTML=`${svg('unlock')}<span>Next: discovery</span>${svg('arrow')}`;$('#grove-bottom-note').textContent='Creek rescue complete · open your discovery';
  heldHandle.visible=false;
 }
 function restart(){
  cancelInteraction();
  if(quest?.active){quest.resetCurrent();$('#grove-pause-dialog').close();paused=false;host.focus({preventScroll:true});return}
  handleFound=handleFitted=won=flowing=false;stage='explore';handle.visible=true;heldHandle.visible=false;wheel.visible=false;gate.userData.open=false;outlet=0;updateRoute();player.position.set(-6,0,6);player.rotation.y=Math.PI;pointerTarget=null;inputKeys.clear();show('#grove-success',false);show('#grove-discovery',false);show('#grove-gate-panel',false);$('#grove-pause-dialog').close();paused=false;$('#grove-next').disabled=true;$('#grove-next').innerHTML=`${svg('lock')}<span>Next: discovery</span>${svg('arrow')}`;$('#grove-bottom-note').textContent='First rescue · practice without marks';$('#grove-release').disabled=false;$('#grove-turn-left').disabled=false;$('#grove-turn-right').disabled=false;rootRipple.visible=false;updateObjective();setAction('Idle');host.focus({preventScroll:true});
 }
 function pause(){if(paused||stage==='intro'||stage==='loading'||stage==='discovery')return;paused=true;inputKeys.clear();pointerTarget=null;$('#grove-pause-dialog').showModal();$('#grove-resume').focus()}
 function resume(){paused=false;$('#grove-pause-dialog').close();host.focus({preventScroll:true})}
 listener($('#grove-resume'),'click',resume);listener($('#grove-restart'),'click',restart);listener($('#grove-pause'),'click',pause);
 listener($('#grove-pause-dialog'),'cancel',e=>{e.preventDefault();resume()});
 listener($('#grove-replay'),'click',restart);
 listener($('#grove-next'),'click',()=>{if(quest?.active){quest.next();return}if(!won)return;if(stage==='discovery'){quest.start();return}stage='discovery';show('#grove-success',false);show('#grove-discovery',true);$('#grove-next').innerHTML=`${svg('unlock')}<span>Begin 10 discoveries</span>${svg('arrow')}`;$('#grove-bottom-note').textContent='Practice complete · your marked adventure starts next';$('#grove-discovery-title').tabIndex=-1;$('#grove-discovery-title').focus({preventScroll:true})});
 const chooseExplorer=bindExplorerFields('grove');
 const storyBeats=[
  ['Sprout','The storm at Greenhaven',()=>learnerLine('{name}, the storm knocked our creek gate loose. My roots are dry. Will you help Nico bring the water back?','The storm knocked our creek gate loose. My roots are dry. Will you help Nico bring the water back?')],
  ['Beep','A leaf workshop to restore','Water is only the beginning. Plants make food in their leaves. After the creek rescue, help Nico repair the sunlight route and investigate what goes into and comes out of a leaf.'],
  ['Sprout','Find out how the forest stays alive','Then rebuild the forest model to see how plants support animals and the air we share. Use the actual equipment and observe what changes. You can keep trying; there is no timer.']
 ];
 function continueAdventure(){stage='explore';show('#grove-story',false);show('.grove-mission',true);show('.grove-controls',true);show('.grove-bottom',true);show('.grove-touch',true);host.focus({preventScroll:true});if(storyAttempt.practiceDone){quest.start();return}tell(learnerLine('Ready, {name}? Find the missing gate handle beside the path.','Find the missing gate handle beside the path.'));updateObjective()}
 function showStory(){stage='briefing';inputKeys.clear();pointerTarget=null;show('#grove-story',true);show('.grove-mission',false);show('.grove-controls',false);show('.grove-bottom',false);show('.grove-touch',false);const [speaker,title,copy]=storyBeats[storyStep];$('#grove-story-face').innerHTML=svg(speaker==='Beep'?'search':'sprout');$('#grove-story-speaker').textContent=speaker;$('#grove-story-title').textContent=title;$('#grove-story-copy').textContent=typeof copy==='function'?copy():copy;$('#grove-story-count').textContent=`${storyStep+1} of ${storyBeats.length}`;$('#grove-story-next').innerHTML=`${storyStep===storyBeats.length-1?'Let’s help Nico':'Next'} ${svg('arrow')}`;$('#grove-story-title').focus({preventScroll:true})}
 listener($('#grove-story-next'),'click',()=>{if(storyStep<storyBeats.length-1){storyStep++;showStory()}else{storyAttempt.storySeen=true;persist();continueAdventure()}});
 listener($('#grove-start-form'),'submit',e=>{e.preventDefault();if(!nico)return;adoptExplorer(chooseExplorer());storyAttempt=ensureAttempt();show('.grove-intro',false);if(!storyAttempt.storySeen&&!storyAttempt.completedAt){storyStep=0;showStory()}else continueAdventure()});
 listener($('#grove-leave'),'click',()=>{stage='explore';show('#grove-gate-panel',false);host.focus({preventScroll:true})});
 listener($('#grove-turn-left'),'click',()=>{if(flowing)return;outlet=(outlet+2)%3;updateRoute();tone()});
 listener($('#grove-turn-right'),'click',()=>{if(flowing)return;outlet=(outlet+1)%3;updateRoute();tone()});
 listener($('#grove-release'),'click',release);listener($('#grove-interact'),'click',interact);
 listener($('#grove-retry'),'click',()=>location.reload());
 listener($('#grove-sound'),'click',()=>{muted=!muted;$('#grove-sound').setAttribute('aria-pressed',String(!muted));$('#grove-sound').setAttribute('aria-label',muted?'Turn game sounds on':'Turn game sounds off');state.settings.sound=!muted;save();tone()});
 function quality(){renderer?.setPixelRatio(Math.min(devicePixelRatio,low?1:1.4));if(renderer)renderer.shadowMap.enabled=!low;$('#grove-quality').setAttribute('aria-pressed',String(low));$('#grove-quality').setAttribute('aria-label',low?'Use full graphics':'Use lighter graphics');$('#grove-quality span').textContent=low?'Light detail':'Full detail';}
 listener($('#grove-quality'),'click',()=>{qualityAdjusted=true;low=!low;quality()});
 listener(window,'keydown',e=>{if(e.target.matches('input,textarea,select'))return;if(e.key==='Escape'){if($('#grove-pause-dialog').open)return;e.preventDefault();pause();return}if(paused)return;const key=e.key.toLowerCase();if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright','shift','e'].includes(key)){e.preventDefault();if(stage==='explore'||stage==='quest')inputKeys.add(key);if(key==='e'&&!e.repeat)interact()}});
 listener(window,'keyup',e=>inputKeys.delete(e.key.toLowerCase()));listener(window,'blur',()=>inputKeys.clear());
 listener(document,'visibilitychange',()=>{inputKeys.clear();if(document.hidden&&['explore','gate','success','quest'].includes(stage))pause()});
 document.querySelectorAll('[data-walk]').forEach(button=>{const key={up:'w',down:'s',left:'a',right:'d'}[button.dataset.walk];listener(button,'pointerdown',e=>{e.preventDefault();button.setPointerCapture(e.pointerId);if(!paused)inputKeys.add(key)});for(const type of ['pointerup','pointercancel','lostpointercapture'])listener(button,type,()=>inputKeys.delete(key))});
 listener(host,'pointerdown',e=>{if(!['explore','quest'].includes(stage)||paused||motion?.busy)return;if(approach){approach.onCancel?.();approach=null;pointerTarget=null}const rect=host.getBoundingClientRect();ndc.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(ndc,camera);if(quest?.pick(raycaster))return;const plane=new THREE.Plane(new THREE.Vector3(0,1,0),0),point=new THREE.Vector3();if(raycaster.ray.intersectPlane(plane,point)){pointerTarget=point;host.focus({preventScroll:true})}});

 disposeScene=()=>{dead=true;cancelInteraction();quest?.cleanup();life.abort();cancelAnimationFrame(raf);clearTimeout(messageTimeout);inputKeys.clear();audioContext?.close();if(world)world.traverse(object=>{if(object.geometry)disposables.add(object.geometry);const list=object.material?Array.isArray(object.material)?object.material:[object.material]:[];for(const m of list){disposables.add(m);for(const value of Object.values(m))if(value?.isTexture)disposables.add(value)}});for(const d of disposables)d.dispose?.();mixer?.stopAllAction();renderer?.dispose();renderer?.forceContextLoss();renderer?.domElement.remove()};
 try{
  renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setClearColor(0xbcd8cb);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.02;renderer.shadowMap.type=THREE.PCFSoftShadowMap;host.append(renderer.domElement);renderer.domElement.setAttribute('aria-label','Greenhaven forest with Nico, a creek gate and Sprout');
  listener(renderer.domElement,'webglcontextlost',e=>{if(dead)return;e.preventDefault();paused=true;show('#grove-failure',true);$('#grove-failure-copy').textContent='The graphics connection paused. Try loading again, or use the illustrated leaf story.'});
  world=new THREE.Scene();world.background=new THREE.Color(0xb9d3c4);world.fog=new THREE.FogExp2(0xb9d3c4,.01);
  camera=new THREE.PerspectiveCamera(43,1,.1,150);camera.position.set(17,23,28);camera.lookAt(focus);
  const hemi=new THREE.HemisphereLight(0xe5f7ee,0x5f7951,1.35);world.add(hemi);
  const sun=new THREE.DirectionalLight(0xffe1a0,2.5);sun.position.set(-10,24,8);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-26;sun.shadow.camera.right=26;sun.shadow.camera.top=24;sun.shadow.camera.bottom=-24;sun.shadow.camera.far=70;sun.shadow.normalBias=.06;sun.shadow.bias=-.0002;sun.shadow.radius=3;world.add(sun);world.add(sun.target);quality();
  const manager=new THREE.LoadingManager();manager.onProgress=(url,loaded,total)=>{if(dead)return;$('#grove-load').value=loaded/Math.max(total,1)*100};
  const loader=new GLTFLoader(manager), names=['CommonTree_1','CommonTree_3','CommonTree_5','Pine_1','TwistedTree_1','DeadTree_1','Rock_Medium_1','Rock_Medium_2','Pebble_Round_1','RockPath_Round_Small_1','Bush_Common','Bush_Common_Flowers','Grass_Common_Short','Fern_1','Flower_3_Group','Flower_4_Group','Plant_1'];
  await Promise.all([...names.map(async name=>{const model=await loader.loadAsync(`assets/grove/${name}.gltf`);assets.set(name,model)}),(async()=>assets.set('Nico',await loader.loadAsync(NICO_MODEL)))()]);
  if(dead){for(const a of assets.values())a.scene.traverse(o=>{o.geometry?.dispose();const ms=o.material?Array.isArray(o.material)?o.material:[o.material]:[];ms.forEach(m=>{for(const v of Object.values(m))if(v?.isTexture)v.dispose();m.dispose()})});return}
  for(const a of assets.values())a.scene.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;const ms=Array.isArray(o.material)?o.material:[o.material];ms.forEach(m=>{m.roughness=.92;m.metalness=0;if(m.map)m.map.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);if(m.name?.toLowerCase().includes('leav')){m.side=THREE.DoubleSide;m.alphaTest=.35}})}});
  // Sculpted meadow, with a pale path painted into the ground rather than a board.
  const geo=new THREE.PlaneGeometry(90,90,100,100);geo.rotateX(-Math.PI/2);const positions=geo.attributes.position,colors=[];const green=new THREE.Color(), c1=new THREE.Color(0x548342), c2=new THREE.Color(0x8eac52), pathColor=new THREE.Color(0xc8b781);
  for(let i=0;i<positions.count;i++){const x=positions.getX(i),z=positions.getZ(i);positions.setY(i,groundHeight(x,z));const noise=(Math.sin(x*1.24+z*.8)+Math.sin(z*2.1-x*.3))*.08+.48;green.copy(c1).lerp(c2,noise);const nearPath=Math.abs(z-(3+Math.sin(x*.22)*1.3));if(nearPath<1.5&&x>-12&&x<8)green.lerp(pathColor,Math.max(0,1-nearPath/1.5)*.9);colors.push(green.r,green.g,green.b)}geo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geo.computeVertexNormals();ground=mesh(geo,new THREE.MeshStandardMaterial({vertexColors:true,roughness:1}));ground.castShadow=false;
  // Rock-edged creek begins outside the view and continues through the gate.
  const creekBed=pathMesh(sourcePoints.map(p=>[p[0],-.19,p[2]]),.95,mat(0x8a9d82));creekBed.scale.y=.3;creekBed.position.y=-.23;stream=makeWater(sourcePoints,.73);
  for(let j=0;j<3;j++){const p=routePoints[j],route=curve(p),bed=pathMesh(p.map(v=>[v[0],-.05,v[2]]),.48,mat(0xa7a17e));bed.scale.y=.32;bed.position.y=-.15;for(let i=0;i<14;i++){const t=i/13,point=route.getPoint(t),tangent=route.getTangent(t);for(const side of [-1,1]){const peb=place('Pebble_Round_1',point.x-tangent.z*side*.53,point.z+tangent.x*side*.53,.16+(i%3)*.025,side+i);peb.scale.x=1.2;}}}
  const pond=mesh(new THREE.CircleGeometry(1.65,48),mat(0x67b9bc,{roughness:.25,metalness:.1}));pond.rotation.x=-Math.PI/2;pond.position.set(2,-.025,6);
  // Reproducible planting avoids loading a unique asset for every tuft.
  let seed=472;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
  const trees=[[-16,-10,8],[-12,-12,10],[-7,-13,9],[-2,-14,11],[4,-13,8],[10,-12,10],[16,-10,9],[18,-4,8],[17,3,8],[14,9,8],[-17,7,8],[-15,12,7],[-19,1,9],[-18,-5,9],[10,-8,6],[-10,-8,6],[13,0,6],[-13,5,5]];
  trees.forEach(([x,z,h],i)=>{const tr=place(['CommonTree_1','CommonTree_3','CommonTree_5','Pine_1','TwistedTree_1'][i%5],x,z,h,rand()*6.28);colliders.push({x,z,r:h*.085});tr.userData.tree=true});
  for(let i=0;i<20;i++){const angle=rand()*6.28,r=22+rand()*10,x=Math.cos(angle)*r,z=Math.sin(angle)*r;place(i%3===0?'Pine_1':'CommonTree_3',x,z,7+rand()*6,rand()*6.28)}
  for(let i=0;i<30;i++){const x=rand()*32-16,z=rand()*25-13;if(inClearing(x,z)||Math.abs(z)<2&&x<7)continue;if(Math.hypot(x+5,z-3)<3)continue;place(i%3?'Rock_Medium_1':'Rock_Medium_2',x,z,.3+rand()*.9,rand()*6.28)}
  for(let i=0;i<30;i++){const x=rand()*30-15,z=rand()*22-11;if(inClearing(x,z)||Math.abs(z+1)<1.5||Math.hypot(x-2,z-6)<2||Math.hypot(x+6,z-6)<2.6||Math.hypot(x+8,z-3)<2.2)continue;place(i%3?'Bush_Common':'Bush_Common_Flowers',x,z,.5+rand()*.6,rand()*6.28)}
  const vegetation=[['Grass_Common_Short',1100,.42],['Flower_3_Group',72,.48],['Flower_4_Group',60,.45],['Fern_1',35,.65]];
  for(const[name,count,height]of vegetation){const model=normalize(assets.get(name).scene.clone(true),height);model.updateMatrixWorld(true);model.traverse(o=>{if(!o.isMesh)return;const inst=new THREE.InstancedMesh(o.geometry,o.material,count);inst.receiveShadow=true;inst.castShadow=false;let j=0;while(j<count){const x=rand()*36-18,z=rand()*28-14;if(inClearing(x,z)||(Math.abs(z+1)<1.25&&x>-15&&x<8)||Math.hypot(x-2,z-6)<2||Math.hypot(x+8,z-3)<1.7)continue;dummy.position.set(x,groundHeight(x,z),z);dummy.rotation.set(0,rand()*6.28,0);dummy.scale.setScalar(.7+rand()*.8);dummy.updateMatrix();inst.setMatrixAt(j++,dummy.matrix.clone().multiply(o.matrixWorld))}world.add(inst);plants.push(inst)})}
  // Creek gate: timber posts, a sliding gate, and a wheel fitted by the player.
  for(const z of [-2.05,.05]){cube(-3.7,.65,z,.25,1.7,.25,0x66513b);cylinder(-3.7,1.55,z,.21,.15,0xd2b572)}
  cube(-3.7,1.45,-1, .32,.22,2.4,0x796141);gate=cube(-3.7,.4,-1,.18,.9,1.8,0x967a51);gate.userData.open=false;
  for(let i=0;i<5;i++)cube(-3.82,.4,-1.72+i*.36,.06,.8,.055,0x66513b,world);
  wheel=new THREE.Group();wheel.position.set(-3.7,1.9,-1);const ring=mesh(new THREE.TorusGeometry(.4,.075,8,24),mat(0x9a7140),wheel);ring.rotation.y=Math.PI/2;for(let i=0;i<4;i++){const spoke=cube(0,0,0,.1,.8,.1,0xc5a76a,wheel);spoke.rotation.x=i*Math.PI/4}wheel.visible=false;world.add(wheel);
  channel=new THREE.Group();channel.position.set(-2.2,.05,-1);cube(.3,.1,-.39,2.5,.3,.15,0xa88a55,channel);cube(.3,.1,.39,2.5,.3,.15,0xa88a55,channel);cube(.3,-.03,0,2.5,.12,.9,0xc3aa75,channel);world.add(channel);updateRoute();
  handle=new THREE.Group();handle.position.set(-8,groundHeight(-8,3)+.5,3);const hr=mesh(new THREE.TorusGeometry(.36,.075,8,24),mat(0xe4c778,{metalness:.35,roughness:.45}),handle);hr.rotation.x=.3;cube(0,-.3,0,.12,.7,.12,0x7f6141,handle);world.add(handle);
  heldHandle=handle.clone();heldHandle.scale.setScalar(.6);heldHandle.position.set(.6,1,0);heldHandle.visible=false;player.add(heldHandle);
  const haloGeo=new THREE.RingGeometry(.55,.65,48),haloMat=new THREE.MeshBasicMaterial({color:0xffe196,transparent:true,opacity:.8,side:THREE.DoubleSide,depthWrite:false});targetHalo=mesh(haloGeo,haloMat);targetHalo.rotation.x=-Math.PI/2;targetHalo.position.set(-8,.12,3);targetHalo.castShadow=false;
  // Sprout stays attached to a visible soil bed, stem and roots.
  const bed=cylinder(6,.05,-1,1.25,.2,0x806548);bed.scale.z=.85;surfaces.disc('sprout-bed',6,-1,1.15,.15);
  sprout=new THREE.Group();sprout.position.set(6,.15,-1);world.add(sprout);const stem=mesh(new THREE.CylinderGeometry(.065,.09,.85,10),mat(0x5b8a40),sprout);stem.position.y=.48;
  const leafShape=new THREE.Shape();leafShape.moveTo(0,0);leafShape.bezierCurveTo(-.55,.2,-.55,1.05,0,1.3);leafShape.bezierCurveTo(.55,1.05,.55,.2,0,0);
  for(const side of [-1,1]){const leaf=mesh(new THREE.ExtrudeGeometry(leafShape,{depth:.045,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.035,bevelThickness:.035}),mat(side===1?0x8cba46:0x74a83d),sprout);leaf.position.set(side*.02,.75,0);leaf.rotation.set(-.2,side*.35,side*-.78);const vein=mesh(new THREE.CylinderGeometry(.012,.017,.95,6),mat(0xcde18c),leaf);vein.position.set(0,.65,.08)}
  const face=mesh(new THREE.SphereGeometry(.24,20,16),mat(0xb0c85c),sprout);face.position.set(0,.75,.12);for(const x of [-.085,.085]){const eye=mesh(new THREE.SphereGeometry(.028,10,10),mat(0x263d2c),sprout);eye.position.set(x,.8,.338)}
  roots=new THREE.Group();world.add(roots);for(let i=0;i<6;i++){const a=i/6*Math.PI*2;pathMesh([[6,.18,-1],[6+Math.cos(a)*.35,.1,-1+Math.sin(a)*.35],[6+Math.cos(a)*.8,.09,-1+Math.sin(a)*.8]],.035,mat(0xd1ae76)).castShadow=false}
  rootRipple=mesh(new THREE.RingGeometry(.8,.85,48),new THREE.MeshBasicMaterial({color:0xb3f1e1,transparent:true,opacity:.7,side:THREE.DoubleSide}));rootRipple.rotation.x=-Math.PI/2;rootRipple.position.set(6,.23,-1);rootRipple.visible=false;rootRipple.castShadow=false;
  sign('SPROUT',new THREE.Vector3(6,2.5,-1),1.7);sign('CREEK GATE',new THREE.Vector3(-3.7,3,-1),2.4);
  place('DeadTree_1',1,-7,3.2,.6);
  // A low fence makes the safe play space legible without invisible corridors.
  for(let i=0;i<7;i++){const x=-10+i*2.2;cylinder(x,.4,9,.08,1,0x998458);if(i<6){const rail=cube(x+1.1,.55,9,2.25,.1,.12,0xc1a77b);rail.rotation.z=.04*Math.sin(i)}}
  // Fireflies and creek highlights are small 3D elements, not screen confetti.
  for(let i=0;i<32;i++){const m=mesh(new THREE.SphereGeometry(.025+rand()*.02,6,6),new THREE.MeshBasicMaterial({color:i%2?0xffeaaa:0xe6fac4,transparent:true,opacity:.7}));m.position.set(rand()*26-13,.5+rand()*4,rand()*20-10);m.castShadow=false;m.userData.phase=rand()*6.28;motes.push(m)}
  for(let i=0;i<22;i++){const m=mesh(new THREE.SphereGeometry(.055,7,7),new THREE.MeshBasicMaterial({color:0xc2fbef,transparent:true,opacity:.8}));m.castShadow=false;flowBeads.push(m)}
  nico=assets.get('Nico').scene;normalize(nico,2.05);player.add(nico);player.position.set(-6,0,6);player.rotation.y=Math.PI;world.add(player);mixer=new THREE.AnimationMixer(nico);motion=createCharacterMotion(mixer,assets.get('Nico').animations);nico.traverse(o=>{if(o.isBone&&/RightHand$/.test(o.name))rightHand=o});mixer.update(0);seatNico=createFootContact(THREE,nico);
  interactables.push({id:'handle',x:-8,z:3,label:'Pick up handle',radius:2.1},{id:'gate',x:-4.1,z:-1,label:'Fit the handle',radius:2.6},{id:'sprout',x:6,z:-1,label:'Look at Sprout',radius:2.5});
  const shadow=mesh(new THREE.CircleGeometry(.42,24),new THREE.MeshBasicMaterial({color:0x344b2d,transparent:true,opacity:.19,depthWrite:false}),player);shadow.rotation.x=-Math.PI/2;shadow.position.y=.025;shadow.castShadow=false;
  const resize=()=>{const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.fov=w/h<1?57:43;camera.updateProjectionMatrix()};listener(window,'resize',resize);resize();
  quest=createForestQuest({world,player,tell,tone,setAction,surfaces,groundHeight,performAt,isInteractionBusy,cancelInteraction,carryPoint,focusPlayer:()=>host.focus({preventScroll:true}),setStage:value=>{stage=value;inputKeys.clear();pointerTarget=null},hidePractice:()=>{won=true;handleFound=true;handleFitted=true;handle.visible=false;heldHandle.visible=false;wheel.visible=true;outlet=1;updateRoute();rootRipple.visible=true;show('#grove-discovery',false);show('#grove-success',false);show('#grove-gate-panel',false);show('#grove-restart',true);$('#grove-restart').textContent='Reset this puzzle';gate.userData.open=true;routeWater.visible=true;routeWater.geometry.setDrawRange(0,Infinity);},restoreForest:level=>{sprout.scale.setScalar(1+level*.2);sun.intensity=2.5+level*.12;hemi.intensity=1.35+level*.15;}});

  $('#grove-load').value=100;$('#grove-load-label').textContent='Your forest is ready.';$('#grove-begin').disabled=false;$('#grove-begin').innerHTML=`Enter the forest ${svg('arrow')}`;
  $('#grove-sound').setAttribute('aria-pressed',String(!muted));
  const beadCurves=[curve(sourcePoints),...routePoints.map(p=>curve(sourcePoints.concat(p.slice(1))))];
  let last=performance.now();
  function frame(now){
   if(dead)return;raf=requestAnimationFrame(frame);const elapsed=Math.max(0,(now-last)/1000),delta=Math.min(elapsed,.08);last=now;if(document.hidden)return;
   if(!low&&!qualityAdjusted&&!paused){slowFrames=elapsed>.14?slowFrames+1:Math.max(0,slowFrames-1);if(slowFrames>=12){qualityAdjusted=true;low=true;quality();if(stage!=='intro')tell('Using lighter graphics to keep your forest moving smoothly.')}}
   if(!paused){time+=delta;
    if(stage==='explore'||stage==='quest'){
     let dx=(inputKeys.has('d')||inputKeys.has('arrowright')?1:0)-(inputKeys.has('a')||inputKeys.has('arrowleft')?1:0),dz=(inputKeys.has('s')||inputKeys.has('arrowdown')?1:0)-(inputKeys.has('w')||inputKeys.has('arrowup')?1:0);
     // Screen-relative movement matches the fixed elevated camera.
     let movement=new THREE.Vector3(dx,0,dz);movement.applyAxisAngle(new THREE.Vector3(0,1,0),.55);
     if((dx||dz)&&approach){approach.onCancel?.();approach=null;pointerTarget=null}
     if(motion?.busy){movement.set(0,0,0);pointerTarget=null}
     if(pointerTarget&&!dx&&!dz){movement.copy(pointerTarget).sub(player.position);movement.y=0;if(movement.length()<.22){pointerTarget=null;movement.set(0,0,0);if(approach){const job=approach;approach=null;job.begin()}}}else if(dx||dz)pointerTarget=null;
     const moving=movement.lengthSq()>.001;if(moving){movement.normalize();const step=movement.multiplyScalar(delta*(inputKeys.has('shift')?5.7:3.4));const nx=THREE.MathUtils.clamp(player.position.x+step.x,-12,11),nz=THREE.MathUtils.clamp(player.position.z+step.z,-9,8.5);const block=(x,z)=>surfaces.heightAt(x,z)-player.position.y>.48||colliders.some(c=>Math.hypot(x-c.x,z-c.z)<c.r+.35)||(x<-4.5&&Math.abs(z+3)<.65);if(!block(nx,player.position.z))player.position.x=nx;if(!block(player.position.x,nz))player.position.z=nz;const angle=Math.atan2(step.x,step.z);player.rotation.y+=Math.atan2(Math.sin(angle-player.rotation.y),Math.cos(angle-player.rotation.y))*Math.min(1,delta*12);setAction(inputKeys.has('shift')?'Running':'Walking')}else setAction('Idle');
     player.position.y=surfaces.heightAt(player.position.x,player.position.z);
     const available=quest?.active?[quest.desired()].filter(Boolean):interactables;target=available.filter(t=>!(t.id==='handle'&&handleFound)).map(t=>({...t,d:Math.hypot(player.position.x-t.x,player.position.z-t.z)})).filter(t=>t.d<t.radius).sort((a,b)=>a.d-b.d)[0]||null;
     show('#grove-context',!!target);if(target)$('#grove-context-label').textContent=quest?.active?target.label:target.id==='gate'?(handleFitted?'Turn the channel':handleFound?'Fit the handle':'Inspect creek gate'):target.label;
    }else show('#grove-context',false);
    mixer.update(delta);motion.update(delta);player.position.y=surfaces.heightAt(player.position.x,player.position.z);seatNico(player.position.y);if(heldHandle.visible){player.updateWorldMatrix(true,true);heldHandle.position.copy(player.worldToLocal(carryPoint()))}quest?.update(delta,time,reduced());
    const desired=(quest?.active?quest.desired():null)||(!handleFound?interactables[0]:!won?interactables[1]:interactables[2]);destination=new THREE.Vector3(desired.x,1.25,desired.z);targetHalo.position.set(desired.x,surfaces.heightAt(desired.x,desired.z)+.025,desired.z);targetHalo.visible=(stage==='explore'||stage==='quest')&&!quest?.finished;if(!reduced())targetHalo.scale.setScalar(1+Math.sin(time*2.5)*.09);
    const projected=destination.clone().project(camera);const px=(projected.x*.5+.5)*host.clientWidth,py=(-projected.y*.5+.5)*host.clientHeight;$('#grove-marker').style.transform=`translate(${Math.max(25,Math.min(host.clientWidth-40,px))}px,${Math.max(120,Math.min(host.clientHeight-170,py))}px)`;$('#grove-marker').hidden=!['explore','quest'].includes(stage)||!!quest?.finished;if(markerId!==desired.id){markerId=desired.id;$('#grove-marker').innerHTML=`<span>${svg(desired.icon||(desired.id==='handle'?'search':desired.id==='gate'?'drop':'sprout'))}</span>`;}
    const distance=Math.hypot(player.position.x-desired.x,player.position.z-desired.z);$('#grove-distance').textContent=`${quest?.active?(desired.id==='delivery'?'Delivery':desired.label||'Equipment'):desired.id==='handle'?'Lost handle':desired.id==='gate'?'Creek gate':'Sprout'} · ${Math.round(distance)} m`;$('#grove-direction').textContent=distance<2.6?'You’re close. Press E.':'Follow the golden marker';
    if(!reduced()){handle.rotation.y=time*.65;handle.position.y=groundHeight(-8,3)+.65+Math.sin(time*2)*.06;motes.forEach(m=>{m.position.y+=Math.sin(time*.7+m.userData.phase)*delta*.08;m.material.opacity=.25+(Math.sin(time+m.userData.phase)+1)*.22});}
    const openTarget=gate.userData.open?1.2:.4;gate.position.y=THREE.MathUtils.lerp(gate.position.y,openTarget,delta*3);wheel.rotation.x=handleFitted&&flowing?time*.8:0;
    if(flowing){const progress=Math.min((time-flowStart)/3,1);routeWater.geometry.setDrawRange(0,Math.floor(routeWater.geometry.index.count*progress/3)*3);if(progress>=1){flowing=false;if(outlet===1){rootRipple.visible=true;win()}else{gate.userData.open=false;$('#grove-release').disabled=false;$('#grove-turn-left').disabled=false;$('#grove-turn-right').disabled=false;tell(outlet===0?'The pond has water, but Sprout’s roots are still dry. Turn the channel and try another route.':'The water went toward the old stump. Sprout’s roots are in the other soil bed. Try another route.')}}}
    flowBeads.forEach((m,i)=>{const t=(time*.14+i/flowBeads.length)%1;const p=beadCurves[won||flowing?outlet+1:0].getPoint(t);m.position.copy(p);m.position.y=.055;m.scale.set(1.7,.35,.7)});
    if(won){if(!reduced()){rootRipple.scale.setScalar(1+(time-wonTime)%2*.4);rootRipple.material.opacity=.65*(1-((time-wonTime)%2)/2)}if(stage==='success'&&time-wonTime>2.2){stage='explore';setAction('Idle')}}
   }
   // Calm auto-framing. The whole puzzle stays in view, with a closer gate view.
   const questCamera=quest?.camera();
   if(questCamera){lookGoal.set(...questCamera.look);cameraGoal.set(...questCamera.position)}
   else if(stage==='gate'){lookGoal.set(0,0,-.4);cameraGoal.set(7,14,15)}
   else if(stage==='success'||stage==='discovery'){lookGoal.set(3,0,-1);cameraGoal.set(14,17,21)}
   else if(stage==='briefing'){const points=[[-3.7,-1],[6,-1],[1,5]],p=points[storyStep];lookGoal.set(p[0],.5,p[1]);cameraGoal.set(p[0]+10,15,p[1]+17)}
   else if(stage==='intro'){lookGoal.set(-1,0,-1);cameraGoal.set(13,18,22)}
   else{lookGoal.set(player.position.x*.45,0,player.position.z*.4-1);cameraGoal.set(11+player.position.x*.45,13.5,17+player.position.z*.4)}
   const easing=reduced()?1:1-Math.exp(-delta*2.1);camera.position.lerp(cameraGoal,easing);focus.lerp(lookGoal,easing);camera.lookAt(focus);renderer.render(world,camera);
  }
  raf=requestAnimationFrame(frame);
 }catch(error){
  if(dead)return;console.error('Greenhaven loading failed:',error);show('#grove-failure',true);$('.grove-intro').hidden=true;$('#grove-failure-copy').textContent=renderer?'A forest file could not load. Try loading again, or use the illustrated leaf story.':'This browser could not start WebGL 2. Try Edge or Chrome with graphics acceleration enabled, or open the illustrated leaf story.';
 }
}

