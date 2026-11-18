// A sparse, original forest theme. Each phrase lasts five seconds.
const phrases = [
 [48, [60, 64, 67, 71]], [45, [57, 60, 64, 67]],
 [41, [57, 60, 65, 67]], [43, [55, 59, 62, 67]],
 [48, [60, 64, 69, 67]], [45, [57, 60, 64, 72]],
 [41, [57, 60, 67, 65]], [43, [55, 62, 59, 62]]
];
const cues = {
 discover: [[67, 0], [72, .13]],
 success: [[60, 0], [64, .13], [67, .26], [72, .44]],
 grab: [[45, 0]],
 release: [[40, 0]],
 fit: [[45, 0], [64, .075]],
 gate: [[38, 0], [45, .14]]
};

export function createGroveAudio() {
 let context, output, timer, nextPhrase, phrase = 0, lastCue = -Infinity, playing = false;

 function note(pitch, time, duration, volume, type = 'sine') {
  const oscillator = context.createOscillator();
  const envelope = context.createGain();
  oscillator.type = type;
  oscillator.frequency.value = 440 * 2 ** ((pitch - 69) / 12);
  envelope.gain.setValueAtTime(.0001, time);
  envelope.gain.linearRampToValueAtTime(volume, time + .035);
  envelope.gain.exponentialRampToValueAtTime(.0001, time + duration);
  oscillator.connect(envelope).connect(output);
  oscillator.start(time);
  oscillator.stop(time + duration);
 }

 function schedule() {
  if (context.state !== 'running') return;
  const now = context.currentTime;
  if (nextPhrase < now) nextPhrase = now + .06;
  if (nextPhrase > now + .25) return;
  const [bass, melody] = phrases[phrase++ % phrases.length];
  note(bass, nextPhrase, 2.5, .022);
  melody.forEach((pitch, index) => {
   note(pitch, nextPhrase + [.35, 1.2, 2.35, 3.4][index], 1.25, .026 - index * .003, 'triangle');
  });
  nextPhrase += 5;
 }

 function setPlaying(enabled) {
  if (enabled === playing) return;
  if (!enabled) {
   playing = false;
   clearInterval(timer);
   output.gain.setTargetAtTime(0, context.currentTime, .08);
   // Suspend after the fade. This also freezes the current musical phrase.
   timer = setTimeout(() => context?.suspend().catch(() => {}), 400);
   return;
  }
  try {
   if (!context) {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    context = new Audio();
    output = context.createGain();
    output.gain.value = 0;
    output.connect(context.destination);
    nextPhrase = context.currentTime + .2;
   }
   clearTimeout(timer);
   playing = true;
   output.gain.setTargetAtTime(.65, context.currentTime, .18);
   context.resume().catch(() => {});
   timer = setInterval(schedule, 180);
  } catch {}
 }

 function play(kind = 'discover') {
  if (!playing || context.state !== 'running') return;
  const now = context.currentTime;
  if (kind !== 'success' && kind !== 'fit' && now - lastCue < .35) return;
  lastCue = now;
  const discovery = kind === 'discover' || kind === 'success';
  for (const [pitch, delay] of cues[kind]) {
   note(pitch, now + delay, discovery ? .58 : .24, discovery ? .075 : .062, 'triangle');
  }
  if (kind !== 'gate') return;
  const length = context.sampleRate * 2;
  const water = context.createBuffer(1, length, context.sampleRate);
  const samples = water.getChannelData(0);
  for (let i = 0; i < length; i++) {
   const swell = Math.sin(Math.PI * i / length);
   samples[i] = (Math.random() * 2 - 1) * swell;
  }
  const stream = context.createBufferSource();
  stream.buffer = water;
  const filter = context.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 920;
  filter.Q.value = .6;
  const gain = context.createGain();
  gain.gain.value = .085;
  stream.connect(filter).connect(gain).connect(output);
  stream.start(now + .15);
 }

 return {setPlaying, play, dispose() {
  clearInterval(timer);
  clearTimeout(timer);
  context?.close().catch(() => {});
  context = null;
 }};
}
