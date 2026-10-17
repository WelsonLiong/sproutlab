import {isMiniGame,renderMiniGame,bindMiniGame,cleanupMiniGame} from './quiz-minigames.js?v=1';
export {cleanupMiniGame as cleanupQuiz};
import {icon,title,next,state,save,complete,chime,cast,escapeHTML} from './app.js?v=8';

export const questChallenges=[
 {type:'sequence',standard:'4.2.1',title:'Give Sprout a superpower',prompt:'What does photosynthesis mean?',instruction:'Tap the word pieces to build the meaning. Tap a filled space to undo.',pieces:[['food','their own food'],['soil','eat soil'],['plants','Plants'],['make','make']],answer:['plants','make','food'],why:'Photosynthesis is the process where plants make their own food.',review:'story'},
 {type:'collect',standard:'4.2.2',title:'Pack the leaf’s toolkit',prompt:'Collect the four needs of photosynthesis.',instruction:'Tap four supplies to put them in the leaf’s kit. Tap again to put one back.',pieces:[['sun','Sunlight','sun'],['oxygen','Oxygen','wind'],['water','Water','drop'],['chlorophyll','Chlorophyll','leaf'],['starch','Starch','book'],['co2','Carbon dioxide','wind']],answer:['sun','water','chlorophyll','co2'],why:'The four needs are sunlight, water, carbon dioxide and chlorophyll. Starch and oxygen are products.',review:'lab'},
 {type:'scene',standard:'4.2.2',title:'Power up the leaf',prompt:'Where does the energy for photosynthesis come from?',instruction:'Tap the energy source in the garden.',pieces:[['soil','Soil','sprout','Soil can supply minerals.'],['sun','Sunlight','sun','Light energy reaches the leaves.'],['water','Water','drop','Roots absorb water.']],answer:'sun',why:'Sunlight supplies energy. Chlorophyll absorbs the light energy used in photosynthesis.',review:'story'},
 {type:'match',standard:'4.2.2',title:'Deliver the ingredients',prompt:'Where do water and carbon dioxide enter?',instruction:'Tap an ingredient, then its entry point. Tap a completed route to change it.',pieces:[['water','Water','drop'],['co2','Carbon dioxide','wind']],targets:[['roots','Through the roots'],['leaves','Into the leaves']],answer:{water:'roots',co2:'leaves'},why:'Roots absorb water. Carbon dioxide is a gas in the air that enters the leaves.',review:'factory'},
 {type:'scene',standard:'4.2.2',title:'Find the green helper',prompt:'Which helper is chlorophyll?',instruction:'Find the green substance that absorbs sunlight.',pieces:[['water','Water in the roots','drop','A raw material for making food.'],['chlorophyll','Green pigment in the leaf','leaf','The leaf’s light-catching helper.'],['oxygen','Oxygen in the air','wind','A gas released by photosynthesis.']],answer:'chlorophyll',why:'Chlorophyll is the green substance in plants that absorbs sunlight.',review:'story'},
 {type:'collect',standard:'4.2.3',title:'Open the leaf’s treasure chest',prompt:'Collect the two products named in the DSKP.',instruction:'Observe Sprout’s food-and-air clues. Tap two products.',clue:'The leaf makes glucose. Some becomes stored starch. Oxygen leaves the leaf.',pieces:[['starch','Starch: stored food','book'],['water','Water','drop'],['oxygen','Oxygen','wind'],['co2','Carbon dioxide','wind']],answer:['starch','oxygen'],why:'The DSKP names starch and oxygen. The textbook explains that glucose made in photosynthesis can be stored as starch.',review:'story'},
 {type:'sort',standard:'4.2.2 / 4.2.3',title:'Run the leaf workshop',prompt:'Sort what the leaf needs and what it produces.',instruction:'Tap a supply, then tap its destination. You can move it again.',pieces:[['water','Water','drop'],['oxygen','Oxygen','wind'],['starch','Starch','book'],['co2','Carbon dioxide','wind']],targets:[['needs','Needs: going in'],['products','Products: coming out']],answer:{water:'needs',oxygen:'products',starch:'products',co2:'needs'},why:'Water and carbon dioxide are needs. Starch is stored food, and oxygen is released: these are products.',review:'lab'},
 {type:'sequence',standard:'4.2.4',title:'Follow the food trail',prompt:'How does food made by a plant reach a bird?',instruction:'Build this food chain, starting with the food-maker. The caterpillar eats the plant; the bird eats the caterpillar.',pieces:[['bird','Bird'],['plant','Green plant'],['caterpillar','Caterpillar']],answer:['plant','caterpillar','bird'],why:'Photosynthesis makes food in the green plant. A caterpillar eats the plant, and a bird eats the caterpillar. The food supports other living things.',review:'story'},
 {type:'match',standard:'4.2.4',title:'Keep the air moving',prompt:'Which way do the gases move during photosynthesis?',instruction:'Tap each gas, then choose its route. Think about how plants help the air around us.',pieces:[['oxygen','Oxygen','wind'],['co2','Carbon dioxide','wind']],targets:[['in','From the air into the leaf'],['out','From the leaf into the air']],answer:{oxygen:'out',co2:'in'},why:'Photosynthesis uses carbon dioxide and releases oxygen for breathing. This helps maintain the balance of gases in the air. Plants also respire day and night.',review:'story'},
 {type:'scene',standard:'4.2.4',title:'Save a little green space',prompt:'Why is protecting this garden good for living things?',instruction:'Choose the explanation that connects photosynthesis to life.',pieces:[['food-only','Only because plants look pretty','leaf','Their colour is the only benefit.'],['life','Plants provide food and oxygen','sprout','Photosynthesis supplies food and oxygen for breathing, helping living things survive.'],['water','Plants turn water straight into animal food','drop','Water alone is all a plant needs.']],answer:'life',why:'Photosynthesis supplies food and oxygen for living things and uses carbon dioxide. Those are reasons why it matters, not just facts to memorise.',review:'story'}
];
const gameBriefs={
 1:['Run a tiny leaf factory','Make and store three batches of food.','Pump water and CO₂ into the leaf, switch on chlorophyll and clear the cloud. Then run the leaf. Supplies are used up each time.'],
 2:['The sunbeam trail','Guide light energy from the Sun to the leaf.','Tap a game mirror to turn it. The beam changes direction immediately. Get it to the leaf to win.'],
 3:['Root-runner maze','Get the water drop to the roots.','Use the arrow keys or movement buttons. Find an open path through the underground channels.'],
 5:['The starch store','Store the leaf’s food and watch oxygen escape.','You are the warehouse cart. Push each G crate into a STORE spot to turn glucose into stored starch. Walk around crates to push from another side.'],
 6:['Conveyor chaos','Keep the leaf workshop running.','Switch the gate, then send each supply along the belt. Route needs into the leaf and products out. Deliver all six.'],
 7:['The food-energy railway','Carry food energy from a plant to a bird.','Turn the track pieces. Your packet must pass through the caterpillar before reaching the bird. Then send the food energy.'],
 8:['Leaf bubble patrol','Let carbon dioxide in and leave oxygen in the air.','Catch the five CO₂ bubbles. Each one lets the leaf release oxygen. You can pause the bubbles whenever you like.']
};
for(const [i,brief] of Object.entries(gameBriefs))Object.assign(questChallenges[i],{type:'game',title:brief[0],prompt:brief[1],instruction:brief[2]});

let index=0,records=[],selection=[],routes={},pending='',submitted=false;
const $=s=>document.querySelector(s);
const art=(id,name)=>{
 if(id==='sun'||id==='water')return cast(id==='sun'?'sun':'drop');
 if(id==='life'||id==='soil')return cast('sprout');
 if(id==='co2'||id==='oxygen')return `<span class="quest-gas-symbol">${id==='co2'?'CO₂':'O₂'}</span>`;
 if(id==='starch')return `<svg class="quest-science-symbol" viewBox="0 0 64 64" aria-hidden="true"><path d="M9 17h46v36H9Z" fill="#ffefb9" stroke="#285745" stroke-width="3"/><path d="M9 17h46" stroke="#285745" stroke-width="5"/><g fill="#e0b452" stroke="#8a6723" stroke-width="1.5"><ellipse cx="23" cy="30" rx="7" ry="5"/><ellipse cx="41" cy="30" rx="7" ry="5"/><ellipse cx="23" cy="44" rx="7" ry="5"/><ellipse cx="41" cy="44" rx="7" ry="5"/></g></svg>`;
 if(id==='chlorophyll')return `<svg class="quest-science-symbol" viewBox="0 0 64 64" aria-hidden="true"><rect x="5" y="7" width="54" height="50" rx="15" fill="#e3efd2" stroke="#285745" stroke-width="3"/><g fill="#56a94f" stroke="#285745" stroke-width="2"><ellipse cx="21" cy="23" rx="9" ry="5" transform="rotate(-25 21 23)"/><ellipse cx="44" cy="24" rx="8" ry="5"/><ellipse cx="27" cy="43" rx="9" ry="5"/><ellipse cx="46" cy="43" rx="6" ry="4"/></g></svg>`;
 return icon(name||'leaf');
};
const token=(piece)=>`<button class="quest-token" data-piece="${piece[0]}" aria-pressed="false"><span class="quest-token-art" aria-hidden="true">${art(piece[0],piece[2])}</span><span>${escapeHTML(piece[1])}</span></button>`;
export function quiz(){index=0;records=[];return title('check','Sprout’s garden quest','7 mini-games + 3 quick science checks. Play, experiment and discover at your own pace.')+`<section class="garden-quest" aria-label="Ten photosynthesis challenges"><div class="quest-trail" aria-label="Challenge progress"></div><div id="quiz-body"></div></section>`+next('check','Next adventure',true)}
export function quizQuestion(){
 cleanupMiniGame();setNextVisibleLocal(false);selection=[];routes={};pending='';submitted=false;
 const q=questChallenges[index];
 $('.quest-trail').innerHTML=`<b id="quiz-count">Challenge ${index+1} of 10</b><div class="quest-seeds">${questChallenges.map((_,i)=>`<span class="${i<index?'done':i===index?'current':''}" aria-label="Challenge ${i+1}${i<index?' complete':i===index?' current':''}">${i<index?icon('check'):icon('leaf')}</span>`).join('')}</div>`;
 $('#quiz-body').innerHTML=`<div class="quest-heading"><div><h2 tabindex="-1">${q.title}</h2><p class="quest-question">${q.prompt}</p><p id="quest-instruction">${q.instruction}</p></div><div class="quest-sprout">${cast('sprout')}</div></div><div class="quest-play quest-${q.type==='scene'?'scene-board':q.type}">${isMiniGame(index)?renderMiniGame(index):interaction(q)}</div><div class="quest-response"><button id="quest-check" class="btn yellow" ${q.type==='scene'||q.type==='game'?'hidden':'disabled'}>${icon('check')} ${q.type==='sequence'?'Test my trail':q.type==='collect'?'Check my collection':q.type==='sort'?'Check my workshop':'Test my routes'}</button><div id="quiz-feedback" class="quest-feedback" role="status"></div></div><button id="quiz-next" class="btn progression-source" disabled>${index===9?'See my results':'Next challenge'}</button>`;
 $('#quiz-next').onclick=()=>{index++;if(index<10)quizQuestion();else quizResults()};
 if(isMiniGame(index)){
  bindMiniGame(index,()=>{
   if(submitted)return;submitted=true;if(!records[index])records[index]={firstCorrect:true,attempts:1};
   $('#quiz-feedback').innerHTML=`<strong>Game complete!</strong><p>${q.why}</p>`;$('#quiz-next').disabled=false;chime();
  },()=>{if(!records[index])records[index]={firstCorrect:false,attempts:1};else records[index].firstCorrect=false});
  if(index>0){$('#quiz-body h2').focus({preventScroll:true});$('#quiz-body').scrollIntoView({block:'start',behavior:'instant'})}
  return;
 }
 document.querySelectorAll('[data-piece]').forEach(b=>b.onclick=()=>{
  if(submitted)return;const key=b.dataset.piece;
  if(q.type==='scene'){selection=[key];evaluate();return}
  if(q.type==='collect')selection=selection.includes(key)?selection.filter(x=>x!==key):selection.length<q.answer.length?[...selection,key]:selection;
  if(q.type==='sequence'&&!selection.includes(key)&&selection.length<q.answer.length)selection.push(key);
  if(q.type==='match'||q.type==='sort')pending=key;
  draw(q);
 });
 document.querySelectorAll('[data-target]').forEach(b=>b.onclick=()=>{if(submitted||!pending)return;routes[pending]=b.dataset.target;pending='';draw(q)});
 $('#quest-check').onclick=evaluate;draw(q);
 if(index>0){$('#quiz-body h2').focus({preventScroll:true});$('#quiz-body').scrollIntoView({block:'start',behavior:'instant'})}
}
function interaction(q){
 if(q.type==='scene')return `<div class="quest-scenes">${q.pieces.map(p=>`<button class="quest-scene" data-piece="${p[0]}"><span class="quest-scene-art" aria-hidden="true">${art(p[0],p[2])}</span><strong>${p[1]}</strong><span>${p[3]}</span></button>`).join('')}</div>`;
 const rack=`<div class="quest-rack" role="group" aria-label="${q.type==='sequence'?'Word pieces':'Supplies'}">${q.pieces.map(token).join('')}</div>`;
 if(q.type==='collect')return `${q.clue?`<p class="quest-observation">${icon('search')} ${q.clue}</p>`:''}<div class="quest-pocket"><span>${icon('leaf')} ${index===5?'Products from the leaf':'The leaf’s kit'}</span><div id="quest-collection"></div></div>${rack}`;
 if(q.type==='sequence')return `<div id="quest-trail-slots" class="quest-trail-slots" aria-label="Your sequence"></div>${rack}`;
 return `${rack}<p class="quest-routing-help" id="quest-pending">Choose a supply first, then its destination.</p><div class="quest-destinations">${q.targets.map(t=>`<button class="quest-destination" data-target="${t[0]}"><strong>${icon('arrow')} ${t[1]}</strong><span data-route-list="${t[0]}">Nothing delivered yet</span></button>`).join('')}</div>`;
}
function draw(q){
 document.querySelectorAll('[data-piece]').forEach(b=>{const key=b.dataset.piece,chosen=q.type==='match'||q.type==='sort'?pending===key:selection.includes(key);b.classList.toggle('chosen',chosen);b.setAttribute('aria-pressed',String(chosen));b.disabled=submitted||(q.type==='sequence'&&selection.includes(key))});
 const name=key=>q.pieces.find(p=>p[0]===key)[1];
 if(q.type==='collect')$('#quest-collection').innerHTML=selection.length?selection.map(key=>`<span>${escapeHTML(name(key))}</span>`).join(''):`<small>0 / ${q.answer.length} collected · tap supplies below</small>`;
 if(q.type==='sequence'){
  $('#quest-trail-slots').innerHTML=q.answer.map((_,i)=>`<button data-slot="${i}" ${!selection[i]||submitted?'disabled':''} aria-label="${selection[i]?'Remove '+escapeHTML(name(selection[i])):'Empty space '+(i+1)}"><small>${i+1}</small><b>${selection[i]?escapeHTML(name(selection[i])):'Tap a piece'}</b></button>`).join('');
  document.querySelectorAll('[data-slot]').forEach(b=>b.onclick=()=>{selection.splice(Number(b.dataset.slot),1);draw(q)});
 }
 if(q.type==='match'||q.type==='sort'){
  $('#quest-pending').textContent=pending?`Now choose a destination for ${name(pending)}.`:'Tap a supply, then its destination. Tap a supply again to change its route.';
  document.querySelectorAll('[data-target]').forEach(b=>{b.disabled=submitted||!pending;const keys=Object.keys(routes).filter(key=>routes[key]===b.dataset.target);b.querySelector('[data-route-list]').textContent=keys.length?keys.map(name).join(' + '):'Nothing delivered yet'});
 }
 $('#quest-check').disabled=submitted||((q.type==='match'||q.type==='sort')?Object.keys(routes).length!==q.pieces.length:selection.length!==q.answer.length);
}
function evaluate(){
 if(submitted)return;const q=questChallenges[index];
 const ok=q.type==='scene'?selection[0]===q.answer:q.type==='collect'?selection.length===q.answer.length&&q.answer.every(x=>selection.includes(x)):q.type==='sequence'?selection.every((x,i)=>x===q.answer[i])&&selection.length===q.answer.length:Object.entries(q.answer).every(([key,value])=>routes[key]===value);
 if(!records[index])records[index]={firstCorrect:ok,attempts:0};records[index].attempts++;
 const f=$('#quiz-feedback');f.classList.toggle('needs-retry',!ok);f.innerHTML=`<strong>${ok?'Discovery made!':'Give it another go.'}</strong><p>${q.why}</p>${ok?'':'<p>Change your choices and try again. Your Next button unlocks when this challenge is complete.</p>'}`;
 if(ok){submitted=true;$('#quiz-next').disabled=false;draw(q);chime();f.focus?.({preventScroll:true})}
 else if(q.type==='scene')document.querySelectorAll('[data-piece]').forEach(b=>b.classList.toggle('missed',b.dataset.piece===selection[0]));
}
function quizResults(){
 cleanupMiniGame();
 const score=records.filter(r=>r?.firstCorrect).length;
 if(state.quizVersion!==3){state.score=0;state.quizVersion=3}state.score=Math.max(state.score,score);state.quizTotal=10;save();complete('check');
 $('.quest-trail').innerHTML='<b id="quiz-count">10 garden discoveries complete</b>';
 $('#quiz-body').innerHTML=`<div class="quest-results">${cast('sprout')}<div><h2 tabindex="-1">Your garden of discoveries!</h2><p>You completed all 10 challenges.</p><p><strong>${score} / 10 before science hints</strong> · Puzzle moves and restarts do not cost points.</p><p>Your result is saved in your journal. Revisit an idea or play again whenever you like.</p><button id="quiz-retry" class="btn yellow">${icon('play')} Play the quest again</button></div></div><details class="quest-review"><summary>Open my discovery notebook</summary>${questChallenges.map((q,i)=>`<div class="quest-review-row"><b>${i+1}. ${q.title}</b><p>${q.why}</p><a href="#${q.review}">Explore this idea again ${icon('arrow')}</a></div>`).join('')}</details>`;
 $('#quiz-retry').onclick=()=>{index=0;records=[];quizQuestion()};$('#quiz-body h2').focus({preventScroll:true});$('#quiz-body').scrollIntoView({block:'start',behavior:'instant'});
}
function setNextVisibleLocal(visible){document.querySelectorAll('[data-next-for="check"]').forEach(b=>{b.hidden=false;b.setAttribute('aria-disabled',String(!visible));if(visible)b.removeAttribute('tabindex');else b.setAttribute('tabindex','-1')})}
