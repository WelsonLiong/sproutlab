// Browser standard gamepad layout (Xbox / PlayStation via the browser mapping).
export function createGamepadControls(){
 let identity='',previous=new Set(),menuTime=0;
 const axis=v=>Math.abs(v||0)<.18?0:Math.sign(v)*Math.min(1,(Math.abs(v)-.18)/.82);
 return {
  poll(){
   let pads=[];try{pads=Array.from(navigator.getGamepads?.()||[])}catch{}
   const pad=pads.find(p=>p?.connected&&p.mapping==='standard');
   const id=pad?pad.index+':'+pad.id:'';const disconnected=!!identity&&!id;
   if(id!==identity){previous.clear();identity=id;menuTime=0}
   const buttons=new Set();if(pad)pad.buttons.forEach((b,i)=>{if(b.pressed||b.value>.5)buttons.add(i)});
   const focused=!document.hidden&&document.hasFocus();
   const pressed=new Set([...buttons].filter(b=>!previous.has(b)));previous=buttons;
   return {connected:!!pad,disconnected,active:!!pad&&focused,x:focused&&pad?axis(pad.axes[0]):0,y:focused&&pad?axis(pad.axes[1]):0,lookX:focused&&pad?axis(pad.axes[2]):0,lookY:focused&&pad?axis(pad.axes[3]):0,held:i=>focused&&buttons.has(i),press:i=>focused&&pressed.has(i)};
  },
  menu(root,pad,dt,defaultButton){
   if(!root||!pad.active)return;
   const choices=[...root.querySelectorAll('button:not(:disabled),a[href],input[type="range"],select')].filter(el=>el.getClientRects().length&&!el.closest('[hidden]')&&getComputedStyle(el).visibility!=='hidden');
   if(!choices.length)return;
   let current=choices.includes(document.activeElement)?document.activeElement:null;
   const dir=pad.held(13)||pad.y>.5?1:pad.held(12)||pad.y<-.5?-1:0;
   menuTime=Math.max(0,menuTime-dt);
   if(dir&&menuTime===0){current=choices[current?(choices.indexOf(current)+dir+choices.length)%choices.length:dir>0?0:choices.length-1];current.focus({preventScroll:true});menuTime=.22}else if(!dir)menuTime=0;
   if(current?.matches('input[type="range"]')){
    const change=pad.press(15)?1:pad.press(14)?-1:0;
    if(change){current.stepUp(change);current.dispatchEvent(new Event('input',{bubbles:true}))}
   }
   if(pad.press(0)){const target=current||defaultButton||choices[0];target.focus({preventScroll:true});if(target.matches('button,a'))target.click()}
  }
 };
}
