// Short original racing effects, mixed separately from the background music.
export function createKartEffects(){
 let context,bus,noise,disposed=false;
 const voices=new Set();
 function unlock(){
  if(disposed)return;
  try{
   if(!context){
    context=new(window.AudioContext||window.webkitAudioContext)();
    bus=context.createGain();bus.gain.value=.32;bus.connect(context.destination);
    noise=context.createBuffer(1,context.sampleRate,context.sampleRate);
    const samples=noise.getChannelData(0);for(let i=0;i<samples.length;i++)samples[i]=Math.random()*2-1;
   }
   context.resume().catch(()=>{});
  }catch{}
 }
 function stop(){
  for(const source of voices){try{source.stop()}catch{}}
  voices.clear();
 }
 function play(kind){
  if(disposed)return;
  unlock();if(!context||!bus)return;
  stop();
  const now=context.currentTime,up=kind==='boost',duration=up?.72:.58;
  function voice(source,filter,volume){
   const gain=context.createGain();gain.gain.setValueAtTime(.0001,now);
   gain.gain.exponentialRampToValueAtTime(volume,now+.025);
   gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
   source.connect(filter);filter.connect(gain);gain.connect(bus);
   voices.add(source);source.onended=()=>{voices.delete(source);source.disconnect();filter.disconnect();gain.disconnect()};
   source.start(now);source.stop(now+duration+.03);
  }
  // Engine pitch sweeps up for acceleration and drops into a low rumble under braking.
  const engine=context.createOscillator(),engineFilter=context.createBiquadFilter();
  engine.type='sawtooth';engine.frequency.setValueAtTime(up?75:230,now);
  engine.frequency.exponentialRampToValueAtTime(up?310:42,now+duration*.85);
  engineFilter.type='lowpass';engineFilter.frequency.setValueAtTime(up?550:1300,now);
  engineFilter.frequency.exponentialRampToValueAtTime(up?2400:160,now+duration);
  voice(engine,engineFilter,.38);
  // Filtered air makes a boost whoosh; a narrower falling band gives braking its skid sound.
  const air=context.createBufferSource(),airFilter=context.createBiquadFilter();air.buffer=noise;
  airFilter.type=up?'highpass':'bandpass';airFilter.Q.value=up?.6:2.8;
  airFilter.frequency.setValueAtTime(up?650:2100,now);
  airFilter.frequency.exponentialRampToValueAtTime(up?3400:420,now+duration);
  voice(air,airFilter,up?.2:.32);
  if(up){
   const overtone=context.createOscillator(),toneFilter=context.createBiquadFilter();
   overtone.type='sine';overtone.frequency.setValueAtTime(330,now);
   overtone.frequency.exponentialRampToValueAtTime(990,now+.45);
   toneFilter.type='lowpass';toneFilter.frequency.value=1800;voice(overtone,toneFilter,.12);
  }
 }
 return {unlock,play,stop,dispose(){disposed=true;stop();if(context)context.close().catch(()=>{});context=null}};
}
