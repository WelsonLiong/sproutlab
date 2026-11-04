// The two-screen illustrated preview. The remaining lessons retain their own UI.
import {learnerLine} from './learner-voice.js';
export function welcome({state, stations, icon, escapeHTML, explorerFields}) {
  const current = stations.find(s => !state.done.includes(s[0]));
  const currentIndex = stations.indexOf(current);
  const hasProgress = stations.some(s => state.done.includes(s[0]));
  const route = id => id === 'story' ? 'factory' : id;
  return `<section class="adventure-cover" aria-labelledby="adventure-title">
    <img class="cover-art" src="assets/adventure-cover.webp" alt="Sprout and Beep investigate a sunny garden filled with oversized flowers." fetchpriority="high" width="1536" height="1024">
    <div class="cover-copy"><h1 id="adventure-title">Little leaves.<br>Big ideas.</h1>
      <p>Discover how plants make food.</p>
      <div class="explorer-entry"><form id="explorer-form" class="explorer-welcome">${explorerFields('explorer',escapeHTML,state.learnerName)}<button class="adventure-button" type="submit">Let’s grow! ${icon('arrow')}</button><button class="guest-entry" id="guest-entry" type="button">Explore as a guest</button></form></div>
    </div>
    <span class="character-hello">Meet Sprout & Beep!</span>
  </section>
  <section class="discovery-trail" aria-labelledby="trail-title">
    <div class="trail-heading"><h2 id="trail-title">Your discovery trail</h2><p id="trail-instructions">Follow steps 1–${stations.length} in order. You can revisit any step.</p></div>
    <div class="trail-next">${current ? `<p>${hasProgress ? 'Ready for your next discovery?' : 'Start with Sprout & Beep’s short video, then explore three chapters.'}</p><a href="#${route(current[0])}">${hasProgress ? 'Continue' : 'Start'} at step ${currentIndex+1} ${icon('arrow')}</a>` : `<p>All ${stations.length} discoveries complete! Pick a step to explore again.</p><a href="#journal">Open my journal ${icon('book')}</a>`}</div>
    <ol aria-describedby="trail-instructions">${stations.map((s,i) => `<li class="${state.done.includes(s[0]) ? 'trail-done' : ''} ${current?.[0]===s[0]?'trail-current':''}"><a href="#${route(s[0])}" ${current?.[0]===s[0]?'aria-current="step"':''}><img class="activity-preview preview-${s[0]}" src="assets/${['photosynthesis-video-thumbnail','mystery-garden','adventure-cover','mystery-garden','world','greenhouse-investigation','canopy-kart','world'][i]}.webp" alt="" width="1536" height="1024" loading="lazy"><span class="trail-step"><span>Step ${i+1}</span>${current?.[0]===s[0]?`<span class="trail-step-cue">${hasProgress?'Next step':'Start here'}</span>`:''}</span><span class="trail-marker" aria-hidden="true">${icon(state.done.includes(s[0])?'check':s[2])}</span><strong>${s[0]==='check'?'Nico’s forest':s[1]}</strong><small>${state.done.includes(s[0])?'Discovered!':s[3]}</small></a></li>`).join('')}</ol>
    <details class="trail-goals"><summary>What will I discover?</summary><p>Learn what photosynthesis means, name at least two of its four needs, and identify at least one product: starch or oxygen. Practise each chapter with a game. Nico’s forest is a bonus adventure for fun.</p></details>
  </section>`;
}

export function openingMystery({icon, escapeHTML}) {
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
      </div>
    </div>
    <section id="learning-goals" class="mystery-goals" aria-labelledby="learning-goals-title" hidden>
      <h2 id="learning-goals-title" tabindex="-1">What you will learn</h2>
      <p>Follow the leaf to explore these four goals. At the end, use the “I can” statements to check your learning.</p>
      <ol class="mystery-goal-list">
        <li><h3>Explain photosynthesis</h3><p>I can say that photosynthesis is the process by which plants make their own food.</p></li>
        <li><h3>Identify what plants need</h3><p>I can name all four needs for photosynthesis: sunlight, water, carbon dioxide and chlorophyll.</p></li>
        <li><h3>Identify what plants produce</h3><p>I can identify starch (stored food) and oxygen in the leaf animation or model.</p></li>
        <li><h3>Explain why photosynthesis matters</h3><p>I can explain how photosynthesis provides food and oxygen for living things, and helps balance carbon dioxide and oxygen in the air.</p></li>
      </ol>
      <p class="mystery-goals-next">Ready to investigate? Choose Next adventure below.</p>
    </section>
  </section>`;
}
