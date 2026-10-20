# Nico and the Dying Forest — revised game plan

This plan supersedes the ten-discovery quiz and laboratory sequence. The first milestone was the Lost Stream water-routing slice. The playable route now includes the prologue, sunlight nursery, creek, canopy, pond, pantry and return to Sprout. The owner chose to omit the travelling companion. The chapter descriptions below remain design intent; the implementation status is recorded after them.

## Existing game and what can be reused

- `dist/grove.js` already has a third-person Nico, camera-relative movement, touch controls, terrain height and collision helpers, pointer raycasting, a creek gate, three visible water routes, a wooden channel, Sprout, audio, animation, pause and restart.
- The existing gate practice can become Chapter 2's first environmental puzzle. Its current handle pickup and route selection need more physical steps and clear water feedback. In particular, pressing E on the channel currently cycles to the next route, and pressing E on the gate releases water even if the channel is blocked.
- `dist/grove-quest.js` and `dist/grove-challenges.js` are a ten-question scored sequence. Some props move, but the sequence still contains answer choices, laboratory apparatus, molecules used as draggable tokens, and instant success cards. It should be replaced chapter by chapter after the slice proves the new interaction model.
- Existing tree, rock, pebble, fern and Nico models in `dist/assets/grove/` fit the low-poly style. The owner chose to omit the travelling companion.
- `dist/grove-progress.js` stores learner profiles and immutable first-answer marks. Preserve old attempts as legacy records. Introduce a separately versioned story save when the new campaign replaces the assessed sequence; do not reinterpret old marks as new chapter completion.

## Core controls and rules

Nico walks with WASD, arrows or touch pad and turns the camera by dragging open scenery. Nearby objects show a short E prompt. Mouse or touch drags move suitable objects in the world. Keyboard players use E to grab, walk while carrying or pushing, and E to release. Movement and physical changes are free; observations come from the world. A wrong configuration changes the world and can be corrected. Hints first name the visible problem, then suggest an action if the player remains stuck. No science concept is represented as a collectible token.

## Prologue — Save Sprout

- **Story and map:** Start in Sprout's rooted clearing after a storm. Sprout is wilted; the nearby soil is dry, a fallen canopy blocks part of the light, and water is audible farther away. Nico initially looks for food to give Sprout.
- **Actions and mechanics:** Walk around Sprout, inspect roots, leaves and surroundings, move one small branch from the path, follow the dry channel to the stream. The branch introduces grabbing and release without completing the rescue.
- **Puzzle and feedback:** Different clues point to missing growing conditions. Inspecting soil shows dryness; looking at leaves shows pale, drooping foliage. Giving food is not a solution. No single inspection advances the whole chapter.
- **Success, failure and science:** The player identifies a practical route to the stream. There is no hard failure; a wrong assumption leads to a visual clue that roots absorb water while plants make their own food. Sprout stays rooted and wilted.
- **Characters and transition:** Sprout motivates the rescue through short lines. A reachable path leads toward the sunless nursery and damaged stream.

## Chapter 1 — The Sunless Woods

- **Story and map:** In a shaded nursery, storm-fallen branches and a tipped screen cast shadows across young plants. One route is blocked; another climbs a low bank overlooking the clearing.
- **Actions and mechanics:** Navigate around the debris, push two branches into clear ground, rotate or reposition the fallen screen, and inspect shade from the bank. Nico can stand in the shadow and move objects again.
- **Puzzle and feedback:** The sun's direction is fixed. Shadows update as the screen moves. Light reaches the nursery only when both the obstruction and screen placement leave a clear path. A light patch moves across soil continuously; plants respond over a passage-of-days view.
- **Success, failure and science:** Incorrect positions leave part of the bed shaded and can be retried. Completion demonstrates that sunlight provides energy for photosynthesis. It does not make plants grow instantly.
- **Characters and transition:** Sprout remains in the starting clearing. An opened nursery path reaches the Lost Stream.

## Chapter 2 — The Lost Stream

- **Story and map:** Upstream water is stopped by a storm log and a loose rock. A repaired gate feeds a three-way wooden channel: pond, Sprout's root bed or old stump. All destinations are visible from the bank.
- **Actions and mechanics:** Walk to the creek, move the log and rock out of the waterway by dragging or grabbing and walking, recover and fit the gate handle, turn the channel in the world, then operate the gate. The player can close the gate, reposition parts and try again.
- **Puzzle and feedback:** Water reaches the gate only after both obstructions leave the stream corridor. With an obstruction present, opening the gate shows water backing up upstream. With a clear stream but wrong channel angle, water visibly follows the selected route while Sprout's bed stays dry. A correct configuration sends water to the roots and moistens the soil.
- **Success, failure and science:** Success requires a clear upstream path, fitted handle, channel aimed at roots and gate opened. Every wrong route is reversible. Water travels through roots and stem; water alone does not complete photosynthesis or instantly restore Sprout.
- **Characters and transition:** Sprout shows a small, gradual improvement after a short passage-of-time beat, then remains vulnerable. The upstream bank leads toward the leaf canopy.

## Chapter 3 — The Secret of Green Leaves

- **Story and map:** Fallen trunks make a short traversal route into an overgrown canopy. Green leaves in light contrast with pale shoots that grew in darkness.
- **Actions and mechanics:** Traverse low natural supports, shift a fallen branch, and guide an existing vine along two support points to open a sunlit route. Inspect green and pale leaves up close, then control a layered leaf visualization by moving a light shutter and opening cross sections. No chlorophyll or carbon dioxide is collected.
- **Puzzle and feedback:** Vine placement affects traversal and light access. The close-up shows chlorophyll absorbing light, atmospheric CO₂ entering through openings, water arriving from roots, glucose forming and oxygen leaving. Each flow animates only when the corresponding real condition is present. The player can compare illuminated green tissue with pale tissue.
- **Success, failure and science:** Wrong support or shade leaves the route inaccessible or tissue unlit and is reversible. Completion explains all four needs and glucose production. Longer-term change is shown with a days-passing transition.
- **Characters and transition:** Nico links the observed process to Sprout's condition. The canopy exit leads to the pond and pantry.

## Chapter 4 — The Forest's Hidden Gifts

### Breathing Pond

- **Story and map:** The stream enters a pond with fallen branches across the bank and aquatic plants beneath a shaded patch.
- **Actions and mechanics:** Navigate the bank, clear two branches, reopen a short stream branch and reposition a natural screen so light reaches the water plants. Observe small oxygen bubbles in daylight and a short leaf/pond cross section.
- **Puzzle and feedback:** Bubbles appear only when the represented plant receives light and water. Water and sunlight changes remain visible before the observation. No fish is instantly revived and no glowing-splint laboratory appears.
- **Success, failure and science:** Incorrect routing or shade keeps bubbles sparse; every object can be moved again. The observation explains oxygen release and its contribution to the air living things use.

### Woodland Pantry

- **Story and map:** Animal tracks lead from a damaged plant bed to a blocked habitat route, seed-bearing plants and a caterpillar/bird area.
- **Actions and mechanics:** Follow tracks, move a log from the route, restore light and water to plants, and inspect seeds or storage tissue. A spatial observation traces plant → caterpillar → bird without ordering figures on a quiz board.
- **Puzzle and feedback:** The route opens when the log is moved. Over a passage of days the restored plants provide food and the animals return gradually. A nature-inspection view shows that plants make glucose and can convert some into stored starch.
- **Success, failure and science:** Unrestored plants or route keep the habitat sparse; repairs can be revised. The chapter connects plant food to food chains and photosynthesis to the balance of CO₂ use and oxygen release.
- **Characters and transition:** Nico carries the observations back toward Sprout. No animal is presented as instantly cured by one action.

## Chapter 5 — A New Leaf for Sprout

- **Story and map:** Return to the starting clearing. The water route, a shading branch and Sprout's green leaf are all in one navigable space.
- **Actions and mechanics:** Clear the shade, inspect the leaf to confirm chlorophyll and atmospheric CO₂, restore water flow using the learned routing controls, then examine an integrated leaf model. The player has to check the physical route, not press a Heal button.
- **Puzzle and feedback:** Sunlight and water are independently necessary. The model shows water from roots and CO₂ from air reaching a green leaf; light absorption drives glucose formation and oxygen release. Incorrect conditions leave the model incomplete and are reversible.
- **Success, failure and science:** After all conditions are present, a passage-of-days sequence gradually restores Sprout and the wider forest. The ending states that photosynthesis lets plants make their own food, produces glucose with some stored as starch, releases oxygen, supports food chains and contributes to atmospheric gas balance.
- **Characters and transition:** Sprout's appearance tracks recovery from prologue through finale. Wildlife returns before the Bloom Festival.

## First implementation milestone: Lost Stream vertical slice

Build on the existing creek clearing. Keep Nico's movement and model, the gate, handle, channel and three water routes. Add two movable obstructions with continuous positions and visible safe-bank destinations. Require the player to clear both, fit the handle, choose a route by manipulating the channel, and release water. A blocked stream must visibly stop flow; an incorrect route must send water elsewhere. Add a modest time-lapse response for Sprout. Keep this ungraded and replayable while old assessed content remains accessible as legacy content. Do not present the old quiz or laboratory chapter as the new campaign.

**Acceptance check:** A fresh player can finish using world controls only. One E press on the gate cannot complete the rescue. Water does not pass a remaining obstruction. Each wrong route is visible and retryable. The keyboard/touch paths can move both obstructions. Restart restores all positions. The slice has no console errors and works at desktop and phone widths. A 5–8-minute playtest with pupils is needed to validate duration and clarity; code alone cannot establish play time.

**Implemented and checked:** The creek slice now has a movable rock and log, a stream that stops at whichever obstruction remains, a repairable gate, continuous channel turning, visible pond/stump/root outcomes, and a gradual Sprout response. Automated browser play completed the keyboard grab-and-walk route, verified that a blocked gate and the pond route cannot win, reached the roots on the correct route, restarted with both obstructions restored, and dragged the rock by mouse. A separate phone-width browser run dragged the rock with touch input. Syntax, the legacy marks check, the legacy interaction check, and desktop/mobile overflow checks passed. The remaining acceptance item is a real 5–8-minute child playtest; no measured play time is claimed.

## Current implementation and validation

- `dist/grove-campaign.js` connects seven story stages across separated nursery, canopy, pond and pantry clearings in one walkable forest. The prologue requires distinct root and leaf observations and a branch moved out of the trail. The nursery checks whether the screen’s projected shadow misses the seedlings; the branches must leave the bed, and the plants recover over a short days-passing view. The Lost Stream remains the physically adjustable creek route. The canopy log blocks the stump path; the vine must pass the first support and stay connected to the second before the raised leaf can be reached. Leaf products appear only when world light and upstream water are present along with the model’s opened shade.
- The pond has a visible feeder from the creek, a movable inlet channel, two bank obstructions and a screen whose shadow is checked against the aquatic plants. Bubbles require both water and light. The pantry continues the feeder to seed plants, with its own water channel and shade screen; a log blocks the animal route, and wildlife returns over a short days-passing view after the plants and route recover. The finale makes Sprout’s branch shadow and final water conduit independently reversible before the leaf model and recovery sequence. Object positions from completed clearings are saved and rebuilt after reload.
- Campaign progress is versioned and saved per local explorer profile. Older campaign saves migrate into the expanded route. Old scored attempts, marks and certificates are preserved separately. The old laboratory and choice activities are not part of the new Nico route.
- Automated browser verification has reached the ending and reloaded the completed world without page errors. It checked wrong and corrected screen, inlet, vine, habitat and finale states; keyboard carrying and screen turning were exercised with game controls. The rest of the chapter progression test sets positions directly, so it establishes state logic rather than proving that a new pupil can solve every puzzle unaided. The canopy remains a low stump route and the wildlife models are deliberately simple. A real pupil playtest is still needed to validate clarity, enjoyment and play time.
