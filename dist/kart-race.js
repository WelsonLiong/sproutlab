import {createKartEffects} from './kart-audio.js';
import {createCatchMusic} from './catch-music.js';
import {state,save} from './app.js?v=10';
export function kartRace(){return `<section class="race-shell" aria-label="Canopy Kart Cup"><div class="race-toolbar"><span>CANOPY CIRCUIT <b>01</b></span><div><button id="race-mute" class="text-btn" aria-pressed="false">Mute sound</button><button id="race-pause" class="text-btn" disabled>Pause</button><button id="race-fullscreen" class="text-btn">Fullscreen</button></div></div><div class="race-stage"><canvas id="race-canvas" tabindex="0" aria-label="Kart racing track. Use arrow keys or A and D to steer. Hold Space while turning to drift. Down arrow brakes."></canvas><div class="race-hud"><div><strong id="race-place">4<span>/4</span></strong><small>POSITION</small></div><div class="race-distance"><span id="race-distance">START LINE</span><div><i id="race-progress"></i></div></div><div><strong id="race-state">RACING</strong><small id="race-state-note">FULL THROTTLE</small></div></div><div class="race-speedometer" id="race-speedometer" role="meter" aria-label="Speed in kilometres per hour" aria-valuemin="0" aria-valuemax="400" aria-valuenow="0"><svg viewBox="0 0 100 76" aria-hidden="true"><path d="M19 65a40 40 0 1 1 62 0" fill="none" stroke="#fffef845" stroke-width="6"/><path d="M19 65a40 40 0 1 1 62 0" fill="none" stroke="#ffdc66" stroke-width="3"/><g id="race-needle"><path d="M50 51V19" stroke="#fffef8" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="51" r="4" fill="#ffdc66"/></g><text x="12" y="74">0</text><text x="50" y="16">200</text><text x="88" y="74">400</text></svg><strong id="race-speed">0</strong><small>KM/H</small><span id="race-speed-mode" class="race-speed-mode">FULL THROTTLE</span></div><div id="race-speed-event" class="race-speed-event" hidden aria-hidden="true"><strong id="race-speed-event-title"></strong><span id="race-speed-change"></span></div><div id="race-callout" class="race-callout" hidden></div><div class="race-boost"><span id="race-boost-label">DRIFT TO CHARGE</span><div><i id="race-charge"></i></div></div><div id="race-overlay" class="race-overlay"><span class="race-meet">THE CANOPY KART CUP</span><h2>Own the corners.</h2><p>Three rivals. A winding circuit.<br>Each lane has an answer. Drive through a product of photosynthesis to get a speed boost. Barricade rows leave one lane open. Switch lanes quickly to stay in the race.</p><p class="race-how">Steer: ← → or A / D<br>Drift: hold Space while turning<br>Touch: drag on the track, or hold the steering buttons.</p><button id="race-start" class="btn yellow">Start your engines</button></div></div><div class="race-controls"><button id="race-left" aria-label="Steer left">←</button><button id="race-drift">Hold to drift</button><button id="race-right" aria-label="Steer right">→</button></div><p id="race-status" class="race-status" role="status" aria-live="polite">Product gates give a boost. Avoid barricades and keep your wheels on the road.</p></section>`}

export function bindKartRace(onComplete){
 const $=s=>document.querySelector(s),shell=$('.race-shell'),canvas=$('#race-canvas'),ctx=canvas.getContext('2d'),overlay=$('#race-overlay'),music=createCatchMusic(),effects=createKartEffects();
 const scenery=new Image(),kart=new Image(),tree=new Image();scenery.src='assets/world.webp';kart.src='assets/canopy-kart.webp';tree.src='assets/canopy-race-tree.webp';
 const length=6000,view=1800,keys=new Set();
 // Rows force adjacent lane changes, with a clear approach to answer gates.
 const obstacleSpacing=190,gateClearance=200,cameraDepth=180,cruiseSpeed=132,boostSpeed=178;
 let distance=0,speed=0,x=0,boost=0,charge=0,phase='ready',beforePause='racing',countdown=3,last=performance.now(),raf=0,width=900,height=700,muted=!!state.settings.raceMuted,dead=false,pointer=null,targetX=null,correct=0,bumps=0,hitCooldown=0,notice='',noticeTime=0,elapsed=0,penalty=0,impact=0;
 let rivals=[],cones=[],gates=[],speedEvent=null,bumpVelocity=0;
 function fresh(){bumpVelocity=0;speedEvent=null;distance=0;speed=0;x=0;boost=0;charge=0;correct=0;bumps=0;elapsed=0;penalty=0;impact=0;hitCooldown=0;targetX=null;keys.clear();rivals=[{d:90,speed:132,x:-.65,hue:155,boost:0,slow:0},{d:155,speed:137,x:.65,hue:285,boost:0,slow:0},{d:220,speed:142,x:-.25,hue:35,boost:0,slow:0}];gates=[['Starch','Water','Sunlight'],['Sunlight','Oxygen','Water'],['Water','Carbon dioxide','Oxygen'],['Chlorophyll','Starch','Sunlight'],['Water','Sunlight','Starch'],['Oxygen','Chlorophyll','Carbon dioxide']].map((labels,i)=>({d:600+i*900,labels,passed:false}));cones=[];let row=0,previousSafe=1,previousRow=0;const slalom=[0,1,2,1];for(let d=240;d<length-180;d+=obstacleSpacing){if(gates.some(g=>Math.abs(d-g.d)<gateClearance))continue;const priorGate=gates.find(g=>g.d>previousRow&&g.d<d);if(priorGate)previousSafe=priorGate.labels.findIndex(label=>label==='Starch'||label==='Oxygen');let safe=slalom[row++%slalom.length];if(Math.abs(safe-previousSafe)>1)safe=1;const nextGate=gates.find(g=>g.d>d&&g.d-d<gateClearance+obstacleSpacing);if(nextGate&&Math.abs(safe-nextGate.labels.findIndex(label=>label==='Starch'||label==='Oxygen'))>1)safe=1;previousSafe=safe;previousRow=d;for(let lane=0;lane<3;lane++)if(lane!==safe)cones.push({d,lane,hit:false})}notice='';noticeTime=0;$('#race-progress').style.width='0%';$('#race-pause').disabled=false;$('#race-pause').textContent='Pause';canvas.focus({preventScroll:true})}
 function audio(){music.setPlaying(!muted&&(phase==='racing'||phase==='countdown'));if(muted||!['racing','countdown'].includes(phase))effects.stop()}
 function muteUI(){const b=$('#race-mute');b.textContent=muted?'Play sound':'Mute sound';b.setAttribute('aria-pressed',String(muted))}muteUI();$('#race-mute').onclick=()=>{muted=!muted;state.settings.raceMuted=muted;save();if(!muted)music.unlock();muteUI();audio()};
 function start(){fresh();music.unlock();effects.unlock();phase='countdown';countdown=3;overlay.hidden=true;audio();last=performance.now();canvas.scrollIntoView({block:'center',behavior:'instant'})}$('#race-start').onclick=start;
 function pause(){if(!['racing','countdown','paused'].includes(phase))return;if(phase==='paused'){phase=beforePause;overlay.hidden=true;$('#race-pause').textContent='Pause'}else{beforePause=phase;phase='paused';keys.clear();targetX=null;overlay.hidden=false;overlay.innerHTML='<span class="race-meet">PIT STOP</span><h2>Race paused.</h2><p>Your kart is waiting right here.</p><button id="race-resume" class="btn yellow">Back to the race</button>';$('#race-resume').onclick=pause;$('#race-pause').textContent='Resume'}audio();last=performance.now()}$('#race-pause').onclick=pause;
 function notify(text){notice=text;noticeTime=3;$('#race-status').textContent=text}
 function reducedMotion(){return matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('reduce-motion')}
 function impactSound(up=false){if(!muted)effects.play(up?'boost':'slow')}
 function speedFeedback(kind){
  speedEvent={kind,from:Math.round(speed*2),time:2.8};
  const gauge=$('#race-speedometer');
  gauge.getAnimations().forEach(a=>a.cancel());
  if(!reducedMotion()){
   gauge.animate([{transform:'scale(1)'},{transform:'scale(1.12)',offset:.25},{transform:'scale(1)'}],{duration:600,easing:'cubic-bezier(.16,1,.3,1)'});
  }
 }
 function slowDown(seconds,message,cone){speedFeedback('slow');penalty=Math.max(penalty,seconds);boost=0;charge=0;speed*=cone?.45:.62;impact=cone?.75:.4;bumps++;notify(message);impactSound()}
 function finish(){phase='done';audio();const place=1+rivals.filter(r=>r.d>distance).length;$('#race-pause').disabled=true;$('#race-callout').hidden=true;overlay.hidden=false;overlay.innerHTML=`<span class="race-meet">CHEQUERED FLAG</span><h2>${place===1?'First across the line!':place===2?'Second place!':place===3?'Third place!':'Race complete!'}</h2><p>${correct} product boost${correct===1?'':'s'} caught · ${Math.round(elapsed)} seconds</p><p class="race-how">Starch is stored food.<br>Oxygen is released into the air.</p><button id="race-again" class="btn yellow">Race again</button>`;$('#race-again').onclick=start;notify('Finished! Starch and oxygen are the products. Your next adventure is ready.');onComplete()}
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const laneCenter=lane=>-2/3+lane*2/3;
 const laneAt=lateral=>clamp(Math.floor((lateral+1)*1.5),0,2);
 const isProduct=label=>label==='Starch'||label==='Oxygen';
 function bend(d){return Math.sin(d/310)*.42+Math.sin(d/690)*.25}
 // Road position, lane width and sprite size share one perspective scale.
 function project(z,lateral=0){
  const scale=cameraDepth/(cameraDepth+Math.max(-100,z));
  return {x:width*(.5+(bend(distance+z)-bend(distance))*.3*scale+lateral*.455*scale),y:height*(.18+.76*scale),s:scale,half:width*.455*scale};
 }
 function polygon(points,color){ctx.fillStyle=color;ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fill()}
 // The board reaches the same lane boundaries used by collision detection.
 function barricade(z,lane){
  const p=project(z),left=p.x+p.half*(-1+lane*2/3),w=p.half*2/3,h=width*.055*p.s,top=p.y-h,boardH=h*.7;
  ctx.save();
  ctx.fillStyle='#17282d55';ctx.beginPath();ctx.ellipse(left+w/2,p.y,w*.52,h*.13,0,0,Math.PI*2);ctx.fill();
  for(const at of [.12,.88]){ctx.fillStyle='#263b40';ctx.fillRect(left+w*at-w*.025,top+boardH,w*.05,h-boardH);ctx.fillRect(left+w*at-w*.09,p.y-h*.08,w*.18,h*.08)}
  ctx.fillStyle='#ed9943';ctx.fillRect(left,top,w,boardH);
  ctx.save();ctx.beginPath();ctx.rect(left,top,w,boardH);ctx.clip();
  const stripe=w/7;
  for(let i=-1;i<8;i++)polygon([[left+i*stripe,top],[left+i*stripe+stripe*.5,top],[left+i*stripe+stripe*.5-boardH*.55,top+boardH],[left+i*stripe-boardH*.55,top+boardH]],'#fffef8');
  ctx.restore();
  ctx.strokeStyle='#263b40';ctx.lineWidth=Math.max(1,2*p.s);ctx.strokeRect(left,top,w,boardH);
  ctx.restore();
 }
 function vehicle(cx,cy,scale,hue=0,lean=0){const w=width*.13*scale,h=w*.95;ctx.save();ctx.translate(cx,cy);ctx.rotate(lean);ctx.fillStyle='#13392d45';ctx.beginPath();ctx.ellipse(0,-h*.08,w*.48,h*.10,0,0,Math.PI*2);ctx.fill();if(kart.complete&&kart.naturalWidth){ctx.filter=hue?`hue-rotate(${hue}deg)`:'none';ctx.drawImage(kart,-w/2,-h,w,h)}else{ctx.fillStyle='#17282d';ctx.fillRect(-w*.48,-h*.5,w*.22,h*.4);ctx.fillRect(w*.26,-h*.5,w*.22,h*.4);ctx.fillStyle=hue?'#e8796c':'#ffdc66';ctx.fillRect(-w*.33,-h*.8,w*.66,h*.7);ctx.fillStyle='#176349';ctx.beginPath();ctx.arc(0,-h*.78,w*.2,0,Math.PI*2);ctx.fill()}ctx.restore()}
 function drawRival(r){
  const p=project(r.d-distance,r.x),nearScale=width<600?1.45:1;
  vehicle(p.x,p.y,p.s*nearScale,r.hue,reducedMotion()?0:clamp(r.bumpVelocity||0,-1,1)*.12);
 }
 function bumpKart(r,index){
  // Resolve overlap immediately, then let both drivers slide and recover.
  const contact=width<600?.44:.31;
  const direction=Math.abs(x-r.x)>.015?Math.sign(x-r.x):(index%2?1:-1);
  const separation=Math.max(0,contact-Math.abs(x-r.x))*.5+.025;
  x=clamp(x+direction*separation,-1.28,1.28);
  r.x=clamp(r.x-direction*separation,-1.28,1.28);
  bumpVelocity=direction*1.15;r.bumpVelocity=-direction*1.15;
  r.bumpCooldown=.9;r.boost=0;r.slow=Math.max(r.slow,.7);
  slowDown(.7,'Kart bump! Both karts knocked sideways.',false);
 }
 function draw(){ctx.clearRect(0,0,width,height);ctx.fillStyle='#b9e6ec';ctx.fillRect(0,0,width,height);if(scenery.complete&&scenery.naturalWidth)ctx.drawImage(scenery,0,0,scenery.naturalWidth,scenery.naturalHeight*.65,0,0,width,height*.45);ctx.fillStyle='#76aa62';ctx.fillRect(0,height*.18,width,height*.82);
  const far=project(view);polygon([[width*.5,height*.18],[far.x-far.half,far.y],[far.x+far.half,far.y]],'#40575b');
  // Paint continuous asphalt; markings belong to track coordinates, not fixed screen strips.
  for(const [edge,color] of [[1.06,'#fff0b3'],[1,'#40575b']]){
   const left=[],right=[];
   for(let z=view;z>=-12;z-=12){const p=project(z);left.push([p.x-p.half*edge,p.y]);right.push([p.x+p.half*edge,p.y])}
   const bottom=project(-18);left.push([bottom.x-bottom.half*edge,bottom.y]);right.push([bottom.x+bottom.half*edge,bottom.y]);
   polygon([...left,...right.reverse()],color);
  }
  function ribbon(farZ,nearZ,left,right,color){
   for(let z=farZ;z>nearZ;z-=12){const a=project(z),b=project(Math.max(nearZ,z-12));polygon([[a.x+a.half*left,a.y],[a.x+a.half*right,a.y],[b.x+b.half*right,b.y+.3],[b.x+b.half*left,b.y+.3]],color)}
  }
  // Move the actual boundaries every frame, so a block travels instead of changing colour in place.
  for(let track=Math.floor((distance-18)/24)*24;track<distance+view;track+=24){
   if(Math.floor(track/24)%2===0)continue;
   const near=Math.max(-18,track-distance),far=Math.min(view,track+24-distance);
   if(far<=near)continue;
   ribbon(far,near,-1.06,-1,'#e88967');ribbon(far,near,1,1.06,'#e88967');
  }
  for(let track=Math.floor((distance-18)/64)*64;track<distance+view;track+=64){
   const near=Math.max(-18,track-distance),far=Math.min(view,track+28-distance);
   if(far<=near)continue;
   for(const lane of [-1/3,1/3])ribbon(far,near,lane-.0035,lane+.0035,'#f8f4dc');
  }
  // Sparse asphalt highlights provide grounded optical flow without flashing whole road bands.
  for(let track=Math.floor((distance-18)/92)*92;track<distance+650;track+=92){
   const near=Math.max(-18,track-distance),far=Math.min(view,track+16-distance);
   if(far<=near)continue;
   for(const side of [-.86,.86])ribbon(far,near,side-.0015,side+.0015,'#6c8282');
  }
  const roadside=Array.from({length:20},(_,i)=>({type:'tree',z:(Math.floor(distance/90)+i+1)*90-distance,side:(Math.floor(distance/90)+i+1)%2===0?-1:1}));
  const sprites=[...roadside,...rivals.map(r=>({type:'rival',z:r.d-distance,r})),...cones.filter(c=>!c.hit).map(c=>({type:'cone',z:c.d-distance,c})),...gates.filter(g=>!g.passed).map(g=>({type:'gate',z:g.d-distance,g}))].filter(o=>o.z>0&&o.z<view).sort((a,b)=>b.z-a.z);
  for(const o of sprites){if(o.type==='tree'){if(tree.complete&&tree.naturalWidth){const p=project(o.z,o.side*1.5),w=width*.3*p.s;ctx.drawImage(tree,p.x-w/2,p.y-w*1.2,w,w*1.2)}}else if(o.type==='rival'){drawRival(o.r)}else if(o.type==='cone'){barricade(o.z,o.c.lane)}else{const p=project(o.z);o.g.labels.forEach((label,i)=>{const q=project(o.z,laneCenter(i)),w=p.half*2/3*.94,h=Math.max(17,height*.065*p.s),top=p.y-height*.2*p.s;ctx.strokeStyle='#fff0b3';ctx.lineWidth=Math.max(2,6*p.s);ctx.beginPath();ctx.moveTo(q.x-w*.47,p.y);ctx.lineTo(q.x-w*.47,top);ctx.lineTo(q.x+w*.47,top);ctx.lineTo(q.x+w*.47,p.y);ctx.stroke();ctx.fillStyle='#fffef8';ctx.beginPath();ctx.roundRect(q.x-w/2,top-h*.2,w,h,5*p.s);ctx.fill();ctx.fillStyle='#163f32';ctx.font=`900 ${Math.max(9,Math.min(25,w/(label.length*.63)))}px Nunito,sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,q.x,top+h*.3,w*.94)})}}
  if(length-distance<view){const p=project(length-distance),stripe=p.half/8;for(let row=0;row<2;row++)for(let col=0;col<16;col++){ctx.fillStyle=(row+col)%2?'#fffef8':'#163f32';ctx.fillRect(p.x-p.half+col*stripe,p.y+row*stripe*.3,stripe+1,stripe*.3)}}
  const steering=(keys.has('ArrowRight')||keys.has('d')?1:0)-(keys.has('ArrowLeft')||keys.has('a')?1:0);if(speed>65&&!reducedMotion()){
   ctx.save();ctx.strokeStyle=boost>0?'#fff0b3b0':'#fffef840';ctx.lineWidth=boost>0?2:1;
   for(let i=0;i<(boost>0?16:8);i++){
    const t=(distance/110+i*.137)%1,side=i%2?-1:1;
    const sx=width*(.5+side*(.18+t*.4)),sy=height*(.38+t*.56);
    ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(sx+side*width*.045,sy+height*(boost>0?.10:.045));ctx.stroke();
   }
   if(boost>0){const cx=width*clamp(.5+x*.455,.04,.96),cy=height*.94,flame=height*(.035+.012*Math.sin(elapsed*40));
   polygon([[cx-width*.018,cy-height*.018],[cx,Math.min(height,cy+flame)],[cx+width*.018,cy-height*.018]],'#ffb347');
   polygon([[cx-width*.009,cy-height*.018],[cx,cy+flame*.65],[cx+width*.009,cy-height*.018]],'#fff0b3')}ctx.restore();
  }
  vehicle(width*clamp(.5+x*.455,.04,.96),height*.94,width<600?1.45:1,0,steering*(keys.has(' ')?-.13:.035)+(impact>0&&!reducedMotion()?Math.sin(elapsed*48)*impact*.3:0));
  rivals.filter(r=>r.d-distance<=0&&r.d-distance>-100).sort((a,b)=>b.d-a.d).forEach(drawRival);
  if(impact>0){const cx=width*clamp(.5+x*.455,.04,.96),cy=height*.89;ctx.strokeStyle='#ffdc66';ctx.lineWidth=3;for(let i=0;i<7;i++){const angle=i/7*Math.PI*2,r=width*.07;ctx.beginPath();ctx.moveTo(cx+Math.cos(angle)*r,cy+Math.sin(angle)*r);ctx.lineTo(cx+Math.cos(angle)*r*1.5,cy+Math.sin(angle)*r*1.5);ctx.stroke()}}
  if(phase==='countdown'){ctx.fillStyle='#fffef8';ctx.strokeStyle='#163f32';ctx.lineWidth=8;ctx.font=`900 ${width*.16}px Lilita One,sans-serif`;ctx.textAlign='center';ctx.strokeText(Math.ceil(countdown)||'GO!',width*.5,height*.5);ctx.fillText(Math.ceil(countdown)||'GO!',width*.5,height*.5)}
 }
 function update(dt){if(phase==='countdown'){countdown-=dt;if(countdown<=0){phase='racing';audio()}return}if(phase!=='racing')return;elapsed+=dt;if(speedEvent){speedEvent.time=Math.max(0,speedEvent.time-dt);if(!speedEvent.time)speedEvent=null}noticeTime=Math.max(0,noticeTime-dt);hitCooldown=Math.max(0,hitCooldown-dt);boost=Math.max(0,boost-dt);penalty=Math.max(0,penalty-dt);impact=Math.max(0,impact-dt);const steer=(keys.has('ArrowRight')||keys.has('d')?1:0)-(keys.has('ArrowLeft')||keys.has('a')?1:0);if(targetX!==null)x+=(targetX-x)*Math.min(1,dt*8);else x+=steer*dt*(keys.has(' ')?1.65:2.15);x+=bumpVelocity*dt;bumpVelocity*=Math.exp(-6*dt);x-=Math.cos(distance/310)*speed*dt*.0022;x=clamp(x,-1.28,1.28);const drifting=keys.has(' ')&&(steer!==0||targetX!==null);if(drifting&&penalty===0)charge=Math.min(1,charge+dt*.6);else if(charge>.75&&penalty===0){speedFeedback('boost');impactSound(true);boost=Math.max(boost,1.1);charge=0;notify('Drift boost!')}else charge=Math.max(0,charge-dt*.5);const offroad=Math.abs(x)>1;const desired=keys.has('ArrowDown')||keys.has('s')?30:offroad?40:penalty>0?42:boost>0?boostSpeed:cruiseSpeed;speed+=(desired-speed)*Math.min(1,dt*(penalty>0?7:3));const old=distance;distance+=speed*dt;
  rivals.forEach((r,i)=>{
   const previous=r.d;r.bumpCooldown=Math.max(0,(r.bumpCooldown||0)-dt);
   r.boost=Math.max(0,r.boost-dt);r.slow=Math.max(0,r.slow-dt);
   // Plan several seconds ahead and hold the chosen answer until fully through the gate.
   const gate=gates.find(g=>g.d+40>r.d&&g.d-r.d<500);
   const barrier=cones.find(c=>c.d+18>r.d&&c.d-r.d<400);
   let preferred=Math.sin(r.d/230+i*2)*.65,planning=false;
   if(gate&&(!barrier||gate.d<barrier.d)){
    if(r.gateTarget!==gate.d){
     r.gateTarget=gate.d;
     const right=gate.labels.findIndex(isProduct),wrong=[0,1,2].filter(l=>l!==right);
     r.answerLane=Math.random()<[.72,.82,.9][i]?right:wrong[Math.floor(Math.random()*wrong.length)];
    }
    preferred=laneCenter(r.answerLane);planning=true;
   }else if(barrier){
    if(r.barrierTarget!==barrier.d){
     r.barrierTarget=barrier.d;
     const blocked=cones.filter(c=>c.d===barrier.d).map(c=>c.lane);
     const clear=[0,1,2].filter(l=>!blocked.includes(l));
     const avoids=Math.random()<[.88,.94,.98][i];
     r.safeLane=avoids?clear.reduce((a,b)=>Math.abs(laneCenter(a)-r.x)<Math.abs(laneCenter(b)-r.x)?a:b):blocked[Math.floor(Math.random()*blocked.length)];
    }
    preferred=laneCenter(r.safeLane);planning=true;
   }
   if(!planning&&Math.abs(r.d-distance)<70&&Math.abs(preferred-x)<.34)preferred=x<=0?.67:-.67;
   r.x+=(preferred-r.x)*Math.min(1,dt*(r.bumpCooldown>0?.65:5));r.x=clamp(r.x+(r.bumpVelocity||0)*dt,-1.28,1.28);r.bumpVelocity=(r.bumpVelocity||0)*Math.exp(-6*dt);
   r.d+=(r.slow>0?42:r.boost>0?boostSpeed:r.speed+Math.sin(elapsed*.5+i)*3)*dt;
   // Judge the lane actually crossed, using the player's answer rules.
   for(const g of gates)if(g.d>previous&&g.d<=r.d){
    if(isProduct(g.labels[laneAt(r.x)])){r.slow=0;r.boost=2.8}else{r.boost=0;r.slow=2.3}
   }
   for(const c of cones)if(c.d>previous&&c.d<=r.d&&laneAt(r.x)===c.lane){r.boost=0;r.slow=1.7}
   if(r.bumpCooldown===0&&Math.abs(r.d-distance)<18&&Math.abs(r.x-x)<(width<600?.44:.31))bumpKart(r,i);
  });

  for(const c of cones)if(!c.hit&&c.d>=old-8&&c.d<distance+4&&x>=-1+c.lane*2/3&&x<=(c.lane===2?1:-1+(c.lane+1)*2/3)){c.hit=true;slowDown(1.7,'BARRICADE HIT! Speed lost — get back up to pace.',true);hitCooldown=1.0;}
  for(const g of gates)if(!g.passed&&distance>=g.d){g.passed=true;if(Math.abs(x)>1){notify('Gate missed. Stay on the road to catch the next one.');continue}const choice=g.labels[laneAt(x)];if(isProduct(choice)){speedFeedback('boost');impactSound(true);correct++;penalty=0;boost=2.8;speed=Math.max(speed,155);notify(choice==='Starch'?'Starch is stored food. PRODUCT BOOST!':'Oxygen is released into the air. PRODUCT BOOST!')}else{slowDown(2.3,`${choice} is a need, not a product. SLOWDOWN!`,false)}}
  if(distance>=length){distance=length;finish()}
 }
 function ui(){
  const active=phase==='racing',boosting=active&&boost>0&&penalty===0,slowed=active&&penalty>0;
  const stage=shell.querySelector('.race-stage');stage.classList.toggle('has-boost',boosting);stage.classList.toggle('has-slowdown',slowed);
  $('#race-speed-mode').textContent=slowed?'SLOWED · '+penalty.toFixed(1)+'s':boosting?'BOOST · '+boost.toFixed(1)+'s':'FULL THROTTLE';
  const event=$('#race-speed-event');event.hidden=!active||!speedEvent;
  if(speedEvent){event.classList.toggle('is-slowed',speedEvent.kind==='slow');$('#race-speed-event-title').textContent=speedEvent.kind==='slow'?'SPEED LOST':'SPEED BOOST!';$('#race-speed-change').textContent=speedEvent.from+' → '+Math.round(speed*2)+' KM/H'}
  const rank=1+rivals.filter(r=>r.d>distance).length;const place=$('#race-place');if(place.dataset.rank!==String(rank)){place.dataset.rank=rank;place.innerHTML=`${rank}<span>/4</span>`;}const speedText=String(Math.round(speed*2));const gauge=$('#race-speedometer');gauge.setAttribute('aria-valuenow',speedText);gauge.classList.toggle('is-boosting',boost>0&&penalty===0);gauge.classList.toggle('is-slowed',penalty>0);$('#race-needle').style.transform=`rotate(${-125+Math.min(speed*2/400,1)*250}deg)`;const mode=phase==='countdown'?'READY':phase==='paused'?'PAUSED':penalty>0?'SLOWED':boost>0?'BOOST':'RACING';if($('#race-state').textContent!==mode)$('#race-state').textContent=mode;const note=penalty>0?penalty.toFixed(1)+'s TO RECOVER':boost>0?boost.toFixed(1)+'s REMAINING':'FULL THROTTLE';if($('#race-state-note').textContent!==note)$('#race-state-note').textContent=note;shell.querySelector('.race-stage').style.setProperty('--impact-opacity',String(impact));if($('#race-speed').textContent!==speedText)$('#race-speed').textContent=speedText;const distanceText=phase==='ready'?'START LINE':Math.round(distance/length*100)+'% OF CIRCUIT';if($('#race-distance').textContent!==distanceText)$('#race-distance').textContent=distanceText;$('#race-progress').style.width=(distance/length*100)+'%';$('#race-charge').style.width=(penalty>0?penalty/2.3*100:boost>0?100:charge*100)+'%';shell.querySelector('.race-boost').classList.toggle('is-slowed',penalty>0);const boostText=penalty>0?'RECOVERING SPEED':boost>0?'BOOST!':charge>.75?'RELEASE TO BOOST':'DRIFT TO CHARGE';if($('#race-boost-label').textContent!==boostText)$('#race-boost-label').textContent=boostText;const callout=$('#race-callout');const message=noticeTime>0?notice:'';if(callout.textContent!==message)callout.textContent=message;callout.hidden=!message||phase==='ready'||phase==='done';}
 function tick(now){if(dead)return;const dt=Math.min((now-last)/1000,.04);last=now;update(dt);draw();ui();raf=requestAnimationFrame(tick)}
 const keydown=e=>{if(e.target.closest('input,textarea')||!['ArrowLeft','ArrowRight','ArrowDown','a','d','s',' '].includes(e.key))return;if(phase==='racing'||phase==='countdown'){e.preventDefault();keys.add(e.key)}};const keyup=e=>keys.delete(e.key);window.addEventListener('keydown',keydown);window.addEventListener('keyup',keyup);
 function hold(id,key){const button=$(id);button.onpointerdown=e=>{e.preventDefault();button.setPointerCapture(e.pointerId);keys.add(key)};button.onpointerup=button.onpointercancel=button.onlostpointercapture=()=>keys.delete(key)}hold('#race-left','ArrowLeft');hold('#race-right','ArrowRight');hold('#race-drift',' ');
 canvas.onpointerdown=e=>{if(phase!=='racing')return;pointer=e.pointerId;canvas.setPointerCapture(pointer);const r=canvas.getBoundingClientRect();targetX=clamp((e.clientX-r.left)/r.width*2.6-1.3,-1.1,1.1);e.preventDefault()};canvas.onpointermove=e=>{if(e.pointerId!==pointer)return;const r=canvas.getBoundingClientRect();targetX=clamp((e.clientX-r.left)/r.width*2.6-1.3,-1.1,1.1)};canvas.onpointerup=canvas.onpointercancel=canvas.onlostpointercapture=()=>{pointer=null;targetX=null};
 const blur=()=>{keys.clear();targetX=null;if(phase==='racing'||phase==='countdown')pause()};const visibility=()=>{if(document.hidden)blur()};window.addEventListener('blur',blur);document.addEventListener('visibilitychange',visibility);
 const fullscreenUI=()=>{$('#race-fullscreen').textContent=document.fullscreenElement===shell||shell.classList.contains('race-expanded')?'Exit fullscreen':'Fullscreen'};document.addEventListener('fullscreenchange',fullscreenUI);const leaveFullscreen=()=>{shell.classList.remove('race-expanded');document.body.classList.remove('race-lock');fullscreenUI()};$('#race-fullscreen').onclick=async()=>{if(document.fullscreenElement===shell){await document.exitFullscreen();return}if(shell.classList.contains('race-expanded')){leaveFullscreen();return}try{await shell.requestFullscreen()}catch{shell.classList.add('race-expanded');document.body.classList.add('race-lock')}fullscreenUI()};const escape=e=>{if(e.key==='Escape')leaveFullscreen()};window.addEventListener('keydown',escape);
 const resize=new ResizeObserver(()=>{const r=canvas.getBoundingClientRect();width=r.width;height=r.height;const ratio=Math.min(devicePixelRatio||1,2);canvas.width=width*ratio;canvas.height=height*ratio;ctx.setTransform(ratio,0,0,ratio,0,0);draw()});resize.observe(canvas);fresh();phase='ready';$('#race-pause').disabled=true;raf=requestAnimationFrame(tick);
 return ()=>{dead=true;cancelAnimationFrame(raf);resize.disconnect();music.dispose();effects.dispose();document.removeEventListener('fullscreenchange',fullscreenUI);window.removeEventListener('keydown',keydown);window.removeEventListener('keyup',keyup);window.removeEventListener('blur',blur);document.removeEventListener('visibilitychange',visibility);window.removeEventListener('keydown',escape);leaveFullscreen();if(document.fullscreenElement===shell)document.exitFullscreen().catch(()=>{})};
}
