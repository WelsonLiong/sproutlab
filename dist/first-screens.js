// The two-screen illustrated preview. The remaining lessons retain their own UI.
import {learnerLine} from './learner-voice.js';
export function welcome({state, stations, icon, escapeHTML, explorerFields}) {
  const current = stations.find(s => !state.done.includes(s[0])) || stations[0];
  const route = id => id === 'story' ? 'factory' : id;
  return `<section class="adventure-cover" aria-labelledby="adventure-title">
    <img class="cover-art" src="assets/adventure-cover.webp" alt="Sprout and Beep investigate a sunny garden filled with oversized flowers." fetchpriority="high" width="1536" height="1024">
    <div class="cover-copy"><h1 id="adventure-title">Little leaf.<br><span>Big adventure.</span></h1>
      <div class="explorer-entry"><form id="explorer-form" class="explorer-welcome">${explorerFields('explorer',escapeHTML,state.learnerName)}<button class="adventure-button" type="submit">Enter the adventure ${icon('arrow')}</button><button class="guest-entry" id="guest-entry" type="button">Enter as a guest instead</button></form></div>
    </div>
    <span class="character-hello">Meet Sprout & Beep!</span>
  </section>
  <section class="discovery-trail" aria-labelledby="trail-title">
    <div class="trail-heading"><h2 id="trail-title">Your trail of discoveries</h2><p>7 stops · explore at your own pace</p></div>
    <ol>${stations.map((s,i) => `<li class="${state.done.includes(s[0]) ? 'trail-done' : ''} ${current[0]===s[0]?'trail-current':''}"><a href="#${route(s[0])}" ${current[0]===s[0]?'aria-current="step"':''}><span class="trail-marker">${state.done.includes(s[0]) ? icon('check') : i+1}</span><strong>${s[1]}</strong><small>${state.done.includes(s[0])?'Discovered!':s[3]}</small></a></li>`).join('')}</ol>
    <details class="trail-goals"><summary>What will I discover?</summary><p>Find out how plants make food, experiment with the four needs of photosynthesis, and help Beep check an AI claim. Try things, collect discoveries, and change your mind!</p></details>
  </section>`;
}

export function openingMystery({icon, audio, escapeHTML}) {
  return `<section class="opening-mystery" aria-labelledby="mystery-title">
    <div class="comic-heading"><a href="#map">${icon('arrow')} Back to the trail</a><span>Discovery 1 of 7 · 2 min</span></div>
    <h1 id="mystery-title">A leafy little <span>mystery.</span></h1>
    <div class="mystery-spread">
      <div class="comic-panel">
        <img src="assets/mystery-garden.webp" alt="Sprout grows in the soil with roots below. Beep peeks through the flowers, holding a lunchbox." width="1536" height="1024" fetchpriority="high">
        <blockquote class="sprout-question">“I don’t eat lunch.<br>I can’t walk around.<br><strong>So how do I grow?”</strong><cite>— Sprout</cite></blockquote>
        <span class="comic-caption">It all started with a very hungry question…</span>
      </div>
      <div class="mystery-investigation">
        <h2>Where does Sprout’s <br>food come from?</h2>
        <p>${escapeHTML(learnerLine('Your turn, {name}! Pick your first idea.','Your turn, leaf detective! Pick your first idea.'))}<br>We’ll follow the clues together.</p>
        <div class="mystery-choices" role="group" aria-label="Your prediction">
          <button data-predict="soil" aria-pressed="false"><span class="answer-art">${icon('sprout')}</span><span>From the soil<small>Perhaps the roots find food?</small></span><span class="answer-check">${icon('check')}</span></button>
          <button data-predict="make" aria-pressed="false"><span class="answer-art">${icon('sun')}</span><span>Sprout makes it<small>A plant with a secret recipe?</small></span><span class="answer-check">${icon('check')}</span></button>
          <button data-predict="water" aria-pressed="false"><span class="answer-art">${icon('drop')}</span><span>Water is its food<small>Maybe a drink is all it needs?</small></span><span class="answer-check">${icon('check')}</span></button>
        </div>
        <div id="prediction-feedback" class="feedback" aria-live="polite"></div>
        <div class="mystery-continue"><a class="adventure-button" href="#factory" aria-disabled="true" tabindex="-1" data-next-for="mystery">Follow the leaf! ${icon('arrow')}</a><span class="prediction-nudge">No marks. Just a curious mind.</span></div>
        ${audio(learnerLine('{name}, I do not eat lunch, and I cannot move. So how do I grow? Where do you think my food comes from?','I do not eat lunch, and I cannot move. So how do I grow? Where do you think my food comes from?'))}
      </div>
    </div>
  </section>`;
}
