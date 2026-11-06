// Shared garden identity. Learning controls and saved progress remain owned by each activity.
const topics = [['induction','Start · video','play'],['meaning','1 · Meaning','sprout'],['meaning-game','Meaning game','game'],['factory','2 · Needs','leaf'],['needs-game','Collect & avoid','game'],['products','3 · Products','flask'],['products-game','Kart cup','game'],['journal','My discoveries','book'],['grove','Forest · for fun','game']];
let arrivalObserver;
export function gardenNavigation(route,icon,done){
 if(route==='grove')return '';
 return `<nav class="garden-topics" aria-label="Science activities">${topics.map(([id,label,glyph])=>`<a href="#${id}" ${id===route||(id==='factory'&&route==='story')?'aria-current="page"':''}>${icon(glyph)}<span>${label}</span>${done.includes(id==='factory'?'story':id==='grove'?'check':id)?'<span class="topic-done" aria-label="completed">'+icon('check')+'</span>':''}</a>`).join('')}</nav>`;
}
export function decorateGarden(route,icon,state){
 arrivalObserver?.disconnect();
 const main=document.querySelector('main');
 main.querySelector('.garden-topics')?.remove();
 if(route!=='map'&&route!=='grove')main.insertAdjacentHTML('afterbegin',gardenNavigation(route,icon,state.done));
 const topicsNav=main.querySelector('.garden-topics');
 const currentTopic=topicsNav?.querySelector('[aria-current]');
 if(topicsNav&&currentTopic)topicsNav.scrollLeft=currentTopic.offsetLeft-topicsNav.clientWidth/2+currentTopic.offsetWidth/2;
 const heading=main.querySelector('.lesson-heading,.page-heading,.opening-mystery>h1');
 if(!['products','products-game'].includes(route)&&heading&&!heading.querySelector('.heading-botany')){
  const character=route==='creek'?'drop':'sprout';
  heading.insertAdjacentHTML('beforeend',`<span class="heading-botany" aria-hidden="true"><span class="cast cast-${character}"></span></span>`);
 }
 document.querySelectorAll('.garden-footer-wordmark').forEach(e=>e.remove());
 const footer=document.querySelector('.site-footer');
 if(route==='map')footer?.insertAdjacentHTML('afterbegin','<div class="garden-footer-wordmark" aria-hidden="true">Let curiosity grow.</div>');
 if(route==='map'){
  arrivalObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('garden-arrive');arrivalObserver.unobserve(entry.target)}}),{threshold:.15});
  main.querySelectorAll('.cover-copy>h1,.cover-copy>p,.explorer-entry,.discovery-trail li').forEach(el=>arrivalObserver.observe(el));
 }
}
