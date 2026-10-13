// Original SVG drawings. Diagram paths share coordinates with their animations.
const face=(x,y)=>`<g fill="#254f42"><ellipse cx="${x-12}" cy="${y}" rx="4" ry="6"/><ellipse cx="${x+12}" cy="${y}" rx="4" ry="6"/><path d="M${x-8} ${y+13}q8 10 16 0" fill="none" stroke="#254f42" stroke-width="3" stroke-linecap="round"/></g>`;
export function cartoonCast(kind='sprout'){
  const shapes={
    sprout:`<ellipse cx="100" cy="179" rx="66" ry="10" fill="#31584018"/><path d="M100 174V98" stroke="#315e42" stroke-width="13" stroke-linecap="round"/><path d="M100 118C27 126 24 61 29 40c64-3 88 38 71 78Z" fill="#82cc61" stroke="#315e42" stroke-width="5"/><path d="M100 111c-13-59 24-93 76-91 9 66-22 99-76 91Z" fill="#acd974" stroke="#315e42" stroke-width="5"/><path d="m51 66 50 53 50-68" fill="none" stroke="#4c9858" stroke-width="4"/><ellipse cx="100" cy="130" rx="35" ry="29" fill="#b9e58b" stroke="#315e42" stroke-width="4"/>${face(100,122)}<path d="m100 169-30 13m30-13 24 16m-24-16-4 20" stroke="#94684c" stroke-width="5" stroke-linecap="round"/>`,
    robot:`<ellipse cx="100" cy="185" rx="66" ry="9" fill="#31584018"/><path d="M64 140v29m72-29v29M54 104l-23 19m115-19 20-20M100 37V20" stroke="#31545b" stroke-width="10" stroke-linecap="round"/><circle cx="100" cy="16" r="9" fill="#ffd66c" stroke="#31545b" stroke-width="4"/><rect x="42" y="39" width="116" height="110" rx="28" fill="#87d9e2" stroke="#31545b" stroke-width="5"/><rect x="57" y="57" width="86" height="54" rx="16" fill="#fff9df" stroke="#31545b" stroke-width="4"/>${face(100,77)}<circle cx="100" cy="131" r="7" fill="#ffd66c"/><path d="M57 177h23m40 0h23" stroke="#31545b" stroke-width="12" stroke-linecap="round"/>`,
    drop:`<path d="M100 20C79 58 45 83 45 119a55 55 0 0 0 110 0c0-36-34-61-55-99Z" fill="#7dd2ed" stroke="#28637b" stroke-width="5"/><path d="M71 98q-12 18-8 29" fill="none" stroke="#e0faff" stroke-width="9" stroke-linecap="round"/>${face(104,118)}`,
    sun:`<g stroke="#b1842f" stroke-width="6" stroke-linecap="round">${Array.from({length:12},(_,i)=>{let a=i*Math.PI/6;return `<path d="M${100+Math.cos(a)*69} ${100+Math.sin(a)*69}l${Math.cos(a)*16} ${Math.sin(a)*16}"/>`}).join('')}</g><circle cx="100" cy="100" r="56" fill="#ffdb67" stroke="#b1842f" stroke-width="5"/>${face(100,91)}`
  };
  return `<span class="cartoon-cast" aria-hidden="true"><svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${shapes[kind]||shapes.sprout}</svg></span>`;
}

export const waterRoute='M150 472Q216 455 250 395L250 260L280 222L391 163';
export function plantDrawing(){return `<svg class="science-drawing plant-drawing" viewBox="0 0 520 540" role="img" aria-label="A plant with its roots below the soil. The blue water route stays inside a root, the stem, the leaf stalk and the leaf vein.">
  <defs><marker id="plant-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="m1 1 8 4-8 4" fill="none" stroke="#2685a5" stroke-width="2"/></marker></defs>
  <path d="M0 0h520v540H0Z" fill="#e5f6fa"/>
  <g fill="#fffdf1"><path d="M26 73q0-17 17-17 5-21 26-17 23 0 24 25 19-3 22 13H26Z"/><path d="M326 38q4-16 22-15 5-19 24-18 24 1 24 24 17-3 21 13H326Z"/></g>
  <g class="plant-sun" transform="translate(373 14) scale(.62)">${cartoonCast('sun').match(/<svg[^>]*>([\s\S]*)<\/svg>/)[1]}</g>
  <g class="energy-rays" fill="none" stroke="#eab944" stroke-width="7" stroke-linecap="round"><path d="m384 110-32 41"/><path d="m417 116-17 45"/><path d="m349 94-39 34"/></g>
  <g class="plant-cloud"><path d="M366 105q-10-29 20-34 6-30 33-24 24 3 22 29 28-5 28 22 1 16-24 16h-58q-20 0-21-9Z" fill="#fff" stroke="#8bafb8" stroke-width="3"/></g>
  <path d="M0 366Q117 350 236 368T520 361V540H0Z" fill="#dba779"/><path d="M0 367Q120 350 235 369T520 362" fill="none" stroke="#639750" stroke-width="12"/>
  <g fill="#b27e5b" opacity=".65"><ellipse cx="58" cy="409" rx="9" ry="4"/><ellipse cx="380" cy="471" rx="8" ry="5"/><ellipse cx="95" cy="518" rx="11" ry="4"/><ellipse cx="436" cy="400" rx="7" ry="4"/><ellipse cx="288" cy="505" rx="8" ry="4"/></g>
  <g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M250 369v26q-34 60-100 77m100-77q24 57 93 90m-93-90v116M214 441l-16 53m87-49 27 62m-73-52-15 37" stroke="#866144" stroke-width="19"/><path d="M250 369v26q-34 60-100 77m100-77q24 57 93 90m-93-90v116M214 441l-16 53m87-49 27 62m-73-52-15 37" stroke="#f5d7a0" stroke-width="12"/>
  <path d="m166 467-14-17m40 5-6-18m-26 35-9 17m53-25 13 14m115 2 15-12m-23 5 1 16" stroke="#f5d7a0" stroke-width="3"/>
  <path d="M250 383V185m0 75 30-38m-30 82-29-23" stroke="#315f43" stroke-width="30"/><path d="M250 382V185m0 75 30-38m-30 82-29-23" stroke="#8bbf60" stroke-width="21"/></g>
  <path d="M240 300C150 327 75 272 75 210c96-9 153 35 165 90Z" fill="#83c974" stroke="#315f43" stroke-width="5"/>
  <path d="M250 187c-62-45-41-91-30-117 64 37 79 72 30 117Z" fill="#a5d67a" stroke="#315f43" stroke-width="5"/>
  <path class="selected-leaf" d="M254 237c2-103 105-123 178-105-3 104-96 160-178 105Z" fill="#99d775" stroke="#315f43" stroke-width="5"/>
  <g fill="none" stroke="#4c9755" stroke-width="4" stroke-linecap="round"><path d="m99 229 141 71m-96-62 22 31m-17 20 47-6m33-187 21 91m13-42-17 20M280 222l111-59m-83 44-5-36m39 18 1-35m-31 50 39 9m-8-26 34 9"/></g>
  <path id="water-route" d="${waterRoute}" fill="none" stroke="#3286a4" stroke-width="7" stroke-linecap="round" opacity=".45"/>
  <path class="water-stream" d="${waterRoute}" fill="none" stroke="#edfaff" stroke-width="4" stroke-dasharray="5 15" stroke-linecap="round"/>
  <circle id="water-traveller" cx="0" cy="0" r="6" fill="#087fad" stroke="#fff" stroke-width="2" visibility="hidden"/>
  <g class="diagram-label"><path d="M85 330h103l40-18M393 284l-32-38M388 427h-49l-58-10"/><text x="59" y="323">Stem</text><text x="380" y="307">Leaf</text><text x="381" y="419">Roots</text></g>
  <g class="route-note"><rect x="22" y="109" width="165" height="66" rx="16" fill="#fffdf0" stroke="#8aac81" stroke-width="2"/><text x="36" y="134" class="svg-small">Water’s blue route</text><text x="36" y="157" class="svg-small">inside the plant</text></g>
  <g class="zoom-ring"><ellipse cx="345" cy="204" rx="104" ry="88" transform="rotate(-27 345 204)" fill="none" stroke="#ac78b7" stroke-width="3" stroke-dasharray="8 7"/><circle cx="443" cy="255" r="19" fill="#f4e4fa" stroke="#845493" stroke-width="3"/><path d="m455 270 12 15m-24-39v16m-8-8h16" stroke="#845493" stroke-width="4" stroke-linecap="round"/></g>
  <g fill="#b2e8f5" stroke="#3c87a0" stroke-width="2"><path d="M81 438q-18 23 0 23t0-23Z"/><path d="M114 467q-15 21 0 21t0-21Z"/></g>
  <text x="31" y="507" class="soil-label">Water in soil</text><text x="355" y="520" class="soil-label">Soil</text>
</svg>`}

export function leafDrawing(){return `<svg class="science-drawing leaf-drawing" viewBox="0 0 520 540" role="img" aria-label="An enlarged side-view slice through the same leaf. Water arrives through a vein inside the leaf. Carbon dioxide enters a tiny opening on the underside. Chlorophyll is in the green chloroplasts inside leaf cells. Oxygen exits into the air.">
 <defs><marker id="gas-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 10 5 0 10Z" fill="#8b5a9e"/></marker><marker id="oxygen-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 10 5 0 10Z" fill="#24829d"/></marker></defs>
 <path d="M0 0h520v540H0Z" fill="#f4f9dc"/>
 <g class="chlorophyll-callout"><text x="267" y="61" class="svg-title">Chlorophyll</text><text x="267" y="83" class="svg-small">Green pigment in chloroplasts</text><text x="267" y="103" class="svg-small">inside leaf cells.</text></g>
 <g class="energy-rays" stroke="#dba62c" stroke-width="5" stroke-linecap="round" fill="none"><path d="m107 53 14 28-13-1 14 32-12-1 15 35m44-93 14 28-13-1 14 32-12-1 15 35"/></g><text x="49" y="33" class="svg-small">Light energy ↓</text>
 <path d="M33 164Q250 132 487 164L487 355Q250 330 33 355Z" fill="#d4edb1" stroke="#4e7850" stroke-width="4"/>
 <path d="M33 164q220-34 454 0v19q-219-30-454 0Z" fill="#a3ce7c" stroke="#4e7850" stroke-width="3"/>
 <g class="leaf-cells" fill="#eef7c7" stroke="#7ea65e" stroke-width="2.5"><rect x="62" y="192" width="81" height="62" rx="24"/><rect x="156" y="184" width="77" height="72" rx="22"/><rect x="246" y="184" width="82" height="76" rx="25"/><rect x="342" y="188" width="108" height="72" rx="29"/><path d="M210 271q40-11 53 15t-17 34q-52 16-63-14t27-35Z"/><path d="M290 280q14-19 38 0t4 33q-34 12-47-6t5-27Z"/><path d="M380 273q56-16 68 20t-27 26q-53 9-58-17t17-29Z"/></g>
 <g class="chloroplasts" fill="#56a94f" stroke="#347c40" stroke-width="2"><ellipse cx="85" cy="219" rx="11" ry="7" transform="rotate(-30 85 219)"/><ellipse cx="120" cy="236" rx="11" ry="7"/><ellipse cx="179" cy="209" rx="11" ry="7"/><ellipse cx="209" cy="239" rx="11" ry="7"/><ellipse cx="270" cy="236" rx="11" ry="7"/><ellipse cx="303" cy="213" rx="13" ry="8" transform="rotate(-20 303 213)"/><ellipse cx="369" cy="221" rx="11" ry="7"/><ellipse cx="424" cy="238" rx="11" ry="7"/><ellipse cx="218" cy="298" rx="11" ry="7"/><ellipse cx="310" cy="294" rx="11" ry="7"/><ellipse cx="399" cy="299" rx="11" ry="7"/></g>
 <path d="M288 113 302 200" stroke="#477139" stroke-width="2" fill="none"/><circle cx="302" cy="200" r="3" fill="#477139"/>
 <path d="M33 266h128q19 0 19 17t-19 17H33Z" fill="#d5eced" stroke="#4e7850" stroke-width="3"/>
 <path d="M35 282H158" fill="none" stroke="#6ab7d2" stroke-width="9"/>
 <path class="leaf-water-stream" d="M35 282H158q18 0 26-13l12-15" fill="none" stroke="#278aac" stroke-width="4" stroke-dasharray="6 8"/>
 <g class="vein-label"><path d="m96 301-7 62H30" fill="none" stroke="#3f7e91" stroke-width="2"/><text x="29" y="388">Leaf vein</text><text x="29" y="409" class="svg-small">Water arrives here</text></g>
 <path d="M33 339q129-14 290-1v21q-158-16-290-4Zm368 4q43 4 86 12v-20q-43-8-86-9Z" fill="#a3ce7c" stroke="#4e7850" stroke-width="3"/>
 <path d="M344 333h33v40h-33Z" fill="#f4f9dc"/>
 <path d="M323 338q20-2 22 11t-22 10m78-16q-21-6-24 7t24 14" fill="#86bd6d" stroke="#4e7850" stroke-width="3"/>
 <path class="gas-route-base" d="M308 484q43-37 49-90l4-33q0-30-23-37" fill="none" stroke="#b7a2bf" stroke-width="3" stroke-dasharray="6 7"/>
 <path class="carbon-stream" d="M308 484q43-37 49-90l4-33q0-30-23-37" fill="none" stroke="#8b5a9e" stroke-width="5" stroke-dasharray="8 10" marker-end="url(#gas-arrow)"/>
 <path class="oxygen-stream" d="M359 302q26 23 16 57-7 40 78 80" fill="none" stroke="#24829d" stroke-width="5" stroke-dasharray="8 10" marker-end="url(#oxygen-arrow)"/>
 <path d="m353 370-37 62h-88" fill="none" stroke="#597850" stroke-width="2"/><text x="153" y="427" class="svg-small">Tiny opening</text><text x="153" y="448" class="svg-small">under the leaf</text>
 <g class="co2-symbol"><circle cx="287" cy="493" r="28" fill="#e5d2f3" stroke="#86599b" stroke-width="3"/><text x="287" y="499" text-anchor="middle">CO₂</text></g>
 <g class="oxygen-symbol"><circle cx="464" cy="462" r="25" fill="#c5edf6" stroke="#24829d" stroke-width="3"/><text x="464" y="469" text-anchor="middle">O₂</text><text x="464" y="507" text-anchor="middle" class="svg-small">into the air</text></g>
 <g class="food-symbol" transform="translate(286 243)"><path d="m0-17 16 9v18L0 19l-16-9V-8Z" fill="#ffe59d" stroke="#a27b2e" stroke-width="3"/><text x="0" y="6" text-anchor="middle" font-size="14">G</text></g>
 <text x="41" y="506" class="svg-small">Enlarged side view</text><text x="41" y="524" class="svg-small">of the same leaf</text>
</svg>`}
