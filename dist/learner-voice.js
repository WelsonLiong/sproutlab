import {activeProfile} from './grove-progress.js';

// Return plain text. HTML renderers must escape it at their output boundary.
export function learnerLine(named,generic){
 const profile=activeProfile();
 return profile&&!profile.guest?named.replaceAll('{name}',profile.name):generic;
}

export function learnerPrompt(text){
 const sentence=/^(Sprout|Beep|Nico|I\b)/.test(text)?text:text.charAt(0).toLowerCase()+text.slice(1);
 return learnerLine('{name}, '+sentence,text);
}
