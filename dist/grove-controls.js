// A reference for the actual keyboard, pointer and standard-gamepad bindings.
const glyph=name=>{
 const shapes={keyboard:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M5 9h1m3 0h1m3 0h1m3 0h1M5 13h1m3 0h1m3 0h1m3 0h1M7 16h10"/>',touch:'<path d="M8 12V5a2 2 0 0 1 4 0v6l2-1 5 3v5l-3 3h-6l-6-7a2 2 0 0 1 3-2l3 3"/>',controller:'<path d="M7 7h10c3 0 5 9 4 11s-4-1-6-3H9c-2 2-5 5-6 3S4 7 7 7Z"/><path d="M6 10v4m-2-2h4m8-1h.01m3 2h.01"/>',stick:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',arrows:'<path d="M12 2v20M2 12h20M9 5l3-3 3 3M9 19l3 3 3-3M5 9l-3 3 3 3m14-6 3 3-3 3"/>',mouse:'<rect x="6" y="2" width="12" height="20" rx="6"/><path d="M6 10h12m-6-8v8"/>',menu:'<path d="M5 6h14M5 12h14M5 18h14"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="m9 3 1-1h4l1 3 3 1 3 3-1 3 1 3-3 3-3 1-1 3h-4l-1-3-3-1-3-3 1-3-1-3 3-3 3-1Z"/>',cross:'<path d="m7 7 10 10M17 7 7 17"/>',circle:'<circle cx="12" cy="12" r="7"/>'};
 return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name]}</svg>`;
};
const cap=(content,label)=>`<kbd${label?` aria-label="${label}"`:''}>${content}</kbd>`;
export function groveControlGuide(){
 const row=(keys,label)=>`<div class="grove-control-row"><div>${keys}</div><span>${label}</span></div>`;
 const pair=(a,b)=>a+'<small>/</small>'+b;
 return `<section class="grove-control-guide" aria-labelledby="grove-controls-title"><h3 id="grove-controls-title">How to play</h3><div class="grove-device-tabs" role="tablist" aria-label="Choose your controls">${['keyboard','touch','controller'].map((device,i)=>`<button type="button" role="tab" id="grove-tab-${device}" aria-controls="grove-guide-${device}" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-grove-device="${device}">${glyph(device)}<span>${device[0].toUpperCase()+device.slice(1)}</span></button>`).join('')}</div>
 <div id="grove-guide-keyboard" class="grove-control-panel" role="tabpanel" aria-labelledby="grove-tab-keyboard">
 ${row(pair(cap('W A S D'),cap(glyph('arrows'),'Arrow keys')),'Walk')}
 ${row(cap('Shift'),'Hold while walking to run')}
 ${row(cap('E'),'Inspect, grab or release nearby objects')}
 ${row(glyph('mouse'),'Drag objects to move them; drag scenery to look around')}
 ${row(pair(cap('A'),cap('D')),'Turn equipment after grabbing it with E')}
 ${row(cap('Esc'),'Pause / resume')}
 </div><div id="grove-guide-touch" class="grove-control-panel" role="tabpanel" aria-labelledby="grove-tab-touch" hidden>
 ${row(glyph('arrows'),'Hold the on-screen arrows to walk')}
 ${row(glyph('touch'),'Drag objects to move or turn them')}
 ${row(glyph('touch'),'Drag open scenery to look around')}
 ${row(cap('E'),'Tap the action button near an object to inspect, grab or release')}
 ${row(glyph('settings'),'Tap the settings button to pause')}
 </div><div id="grove-guide-controller" class="grove-control-panel" role="tabpanel" aria-labelledby="grove-tab-controller" hidden>
 ${row(pair(cap(glyph('stick'),'Left stick'),cap(glyph('arrows'),'D-pad')),'Left stick / D-pad: walk')}
 ${row(cap(glyph('stick'),'Right stick'),'Right stick: look around')}
 ${row(pair(cap('A','Xbox A'),cap(glyph('cross'),'PlayStation Cross')),'Inspect, grab or release nearby objects')}
 ${row(pair(cap('LB'),cap('L1')),'Hold while walking to run')}
 ${row(cap(glyph('stick'),'Left stick'),'Move left stick sideways to turn grabbed equipment')}
 ${row(cap(glyph('menu'),'Menu or Options'),'Menu / Options: pause / resume')}
 ${row(pair(cap('B','Xbox B'),cap(glyph('circle'),'PlayStation Circle')),'Back / close a panel')}
 </div><p class="grove-controls-tip">Walk close to an object first. Open settings whenever you need a reminder.</p></section>`;
}
export function bindGroveControlGuide(root,events){
 root.addEventListener('focusin',event=>event.target.scrollIntoView({block:'nearest'}),events);
 const tabs=[...root.querySelectorAll('[data-grove-device]')];
 function select(tab){for(const button of tabs){const active=button===tab;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;root.querySelector('#'+button.getAttribute('aria-controls')).hidden=!active}}
 for(const tab of tabs){
  tab.addEventListener('click',()=>select(tab),events);
  tab.addEventListener('keydown',event=>{
   let index=tabs.indexOf(tab);
   if(event.key==='ArrowRight')index=(index+1)%tabs.length;
   else if(event.key==='ArrowLeft')index=(index+tabs.length-1)%tabs.length;
   else if(event.key==='Home')index=0;
   else if(event.key==='End')index=tabs.length-1;
   else return;
   event.preventDefault();select(tabs[index]);tabs[index].focus();
  },events);
 }
 select(tabs[matchMedia('(pointer: coarse)').matches?1:0]);
}
