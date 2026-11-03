// A quiet, original garden loop. Starts only after a player gesture.
export function createCatchMusic(){
 let context,bus,timer,playing=false,disposed=false,beat=0,next=0;
 const melody=[72,76,79,76,74,77,81,77,71,74,79,74,72,76,79,83,
  81,79,76,72,77,81,79,74,79,77,74,71,76,74,72,null];
 function note(midi,time,length,volume,type){
  const voice=context.createOscillator(),gain=context.createGain();
  voice.type=type;voice.frequency.value=440*2**((midi-69)/12);
  gain.gain.setValueAtTime(0,time);gain.gain.linearRampToValueAtTime(volume,time+.015);
  gain.gain.exponentialRampToValueAtTime(.0001,time+length);
  voice.connect(gain);gain.connect(bus);voice.start(time);voice.stop(time+length+.03);
  voice.onended=()=>{voice.disconnect();gain.disconnect()};
 }
 function schedule(){
  if(!context||disposed)return;
  if(next<context.currentTime)next=context.currentTime;
  while(next<context.currentTime+.15){
   const pitch=melody[beat%melody.length];
   if(pitch!==null)note(pitch,next,.24,.09,'sine');
   if(beat%2===0)note([48,53,55,48][Math.floor(beat/8)%4],next,.4,.05,'triangle');
   next+=.26;beat++;
  }
 }
 return {
  unlock(){
   if(disposed)return;
   try{
    if(!context){context=new(window.AudioContext||window.webkitAudioContext)();bus=context.createGain();bus.gain.value=0;bus.connect(context.destination);next=context.currentTime;timer=setInterval(schedule,80)}
    context.resume().catch(()=>{});
   }catch{}
  },
  setPlaying(value){
   if(value===playing)return;playing=value;
   if(bus){bus.gain.cancelScheduledValues(context.currentTime);bus.gain.setTargetAtTime(value?.65:0,context.currentTime,.04)}
  },
  dispose(){disposed=true;clearInterval(timer);if(context)context.close().catch(()=>{})}
 };
}
