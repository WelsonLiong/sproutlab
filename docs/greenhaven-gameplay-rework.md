# Greenhaven gameplay rework

Mode: Experience. Extend the approved forest and current three chapters; retain ten assessed decisions and existing per-attempt marks/certificates.

## Direction contract

THESIS: The forest gives each action a science purpose. The pupil repairs a light route, carries water to roots and uses an observable leaf apparatus, rather than opening ten discovery stones.

OWN-WORLD: Preserve Nico, imported nature, elevated camera, warm directional light, botanical greens, turquoise water, timber, stone and quiet parchment controls. New low-poly apparatus uses the same materials; no additional downloaded models are required.

STORY: A storm damaged the creek gate. Sprout asks Nico to restore water, investigate the leaf workshop and explain how plants support the forest. Dialogue introduces the mission before movement. Ten deliberate tests record first-answer marks; observation and rearrangement remain free.

FIRST VIEWPORT: The accepted forest remains behind a short, pupil-paced character conversation. During missions, a compact right-hand workbench exposes the current task immediately and leaves the main world open for direct object interaction. E operates nearby equipment or delivers a held object; it does not open a generic discovery panel.

FORM: The approved continuous 3D world and seed c3676cd0 remain in force. The signature interaction is a water-plant gas collector: bubbles enter a fixed inverted tube, a glowing splint relights, and the pupil identifies the observed gas. No moving cart or circular answer selector.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Support surfaces use one height registry for collision and placement. Nico's posed boot vertices are seated above the supporting surface; low-poly props are seated by their bounds. Retakes keep previous attempts and certificates.

## Implemented behavior and evidence

The three story beats introduce the broken creek gate, leaf workshop and forest connections before play. Direct equipment actions replace the discovery-stone gate; two short Sprout/Beep reasoning conversations remain within the ten assessed missions. The gas cart is removed. The fixed water-plant collector shows rising bubbles, collected gas and a relighting glowing splint before identification. Food samples use visible vessels instead of closed crates. The shelter model shares open air rather than a fabricated oxygen pipe.

The leaf clearing is at [5,-6.6], separated from Sprout's original rooted bed at [6,-1]. Platform tops feed the same height registry used by movement; steep equipment surfaces block walking through them. Rotated timber channels and their rails are also registered. Posed boot samples use current ancestor and skin matrices before correction each animation frame. In the isolated browser test, the measured lowest boot vertices stayed 0.015 world units above the tested support surfaces; tested seated props matched their support tops within floating-point error. A separate check on the rotated timber floor measured its top at 0.08 and the lowest boot at 0.095. Direct ray clicks on the actual CO₂ molecule and E at the nearest oxygen molecule both changed the configuration without opening a menu. This verifies the sampled poses/locations, not every possible animation or device.

Science support for the virtual gas observation: [RSC Education: preparation and properties of oxygen](https://edu.rsc.org/experiments/the-preparation-and-properties-of-oxygen/396.article) describes identification using a glowing splint. It supports an observation of oxygen production under DSKP 4.2.3; the simulation does not assess laboratory technique, purity, reaction rate or DSKP 4.2.5.

Verification: workspace tmp/verify-mission-rework.cjs and tmp/mission-rework-report.json cover the three-beat prologue, all ten missions, observed-gas gate, carried-sample resume, two corrected mistakes retaining 8/10, certificate download, boot/prop contacts and route cleanup with zero JavaScript errors. Desktop and mobile captures are in .impeccable/review/mission-rework/. One detector run produced advisory token differences only. The fresh finish reviewer requested four fixes; its follow-up disposition was ship, with all four scored fixes resolved: non-overlapping mobile gas controls, complete mobile apparatus framing, separate Sprout/workshop silhouettes and current DESIGN.md layout guidance.
