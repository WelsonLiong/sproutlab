import {LoopOnce,LoopRepeat} from './vendor/three/three.module.js';

// Locomotion never interrupts an authored interaction. Contact and completion
// follow mixer time, so pausing the game also pauses item transfer.
export function createCharacterMotion(mixer,clips){
 const actions=Object.fromEntries(clips.map(clip=>[clip.name,mixer.clipAction(clip)]));
 let current=null,pending=null;
 function transition(name,once=false){const action=actions[name];if(!action)return null;if(action!==current){current?.fadeOut(.16);action.reset().fadeIn(.16);current=action}else action.reset();action.setLoop(once?LoopOnce:LoopRepeat,once?1:Infinity);action.clampWhenFinished=once;action.enabled=true;action.setEffectiveTimeScale(1).setEffectiveWeight(1).play();return action}
 function locomotion(name){if(pending)return;if(current===actions[name])return;transition(name)}
 function playOnce(name,{contact=.5,onContact=()=>{},onComplete=()=>{},reduced=false}={}){
  if(pending||!actions[name])return false;
  if(reduced){onContact();onComplete();return true}
  const action=transition(name,true),duration=action.getClip().duration;
  pending={name,action,duration,elapsed:0,contact,onContact,onComplete,transferred:false};return true;
 }
 function update(delta){if(!pending)return;const sequence=pending;sequence.elapsed+=delta;
  if(!sequence.transferred&&sequence.elapsed>=sequence.duration*sequence.contact){sequence.transferred=true;sequence.onContact()}
  if(pending===sequence&&sequence.elapsed>=sequence.duration){pending=null;transition('Idle');sequence.onComplete()}
 }
 function cancel(){pending=null;transition('Idle')}
 locomotion('Idle');
 return{locomotion,playOnce,update,cancel,get busy(){return !!pending},get current(){return current?.getClip().name},get phase(){return pending?{name:pending.name,elapsed:pending.elapsed,duration:pending.duration,transferred:pending.transferred}:null}};
}
