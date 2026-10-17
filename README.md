# Sprout Lab

English Year 4 Unit 4 photosynthesis and AI-literacy module for EDUP3133 Task 3. The seven learning stations use flexible timing; the ten-challenge Greenhaven assessment uses eight world interactions and two short reasoning checks across three connected forest clearings. Desktop, tablet and mobile layouts; no pupil accounts.

## Run locally

Serve the `dist` folder through an HTTP server, for example `python -m http.server 4174 --directory dist`, then visit `http://localhost:4174`. ES modules require HTTP; opening index.html with file:// is not supported. `dist/offline.html` can be opened directly or printed for disconnected use.

## Source

- `dist/app.js`: navigation, preferences, device-local persistence, icons and map.
- `dist/activities.js`: story, lab, two pipe puzzles, AI detective, assessment and reflection.
- `dist/resources.js`: teacher mapping, source attribution and safety.
- `dist/styles.css` and `dist/activity.css`: responsive interface and motion.
- `dist/assets`: original AI-generated cartoon garden and character atlas, self-hosted Nunito font and license.

There is no application backend, tracker, API key or externally hosted script. The 3D scene uses a locally vendored Three.js runtime. External resources are links only. Read-aloud uses the browser's available English voices and may not work on all devices. Hosting access controls are separate from the app's lack of pupil accounts.

## Submission work that requires the student

Complete the official cover template privately, obtain lecturer acceptance of a custom website if needed, test with at least two real adults, record observations and implemented improvements, and replace the pending section in the seven-page documentation draft. Do not invent evaluator feedback. Task 3 submission date in supplied TPB: 6 November 2026.

The first Greenhaven 3D practice scene is now included at #grove using selected supplied assets. The approved first scene has been expanded into all three chapters, ten assessed decisions and named downloadable PDF certificates. Separate local explorer profiles, resume and retakes are included. See docs/greenhaven-scene.md.

## October 8 redesign
The child-facing interface now uses cartoon scenes, a garden map, Beep’s three-stage evidence mission, word tiles and privacy shields. Technical verification is recorded in docs/verification.md. The website source is dependency-free ES modules; no build is required.

## October 11 teaching alternative
`#factory` adds a short cartoon, an automatic worked demonstration and a playable leaf model. `#story` preserves the original picture notes; both count as the same explanation stop. Implementation: `dist/factory.js`, `dist/factory-art.js`, `dist/factory.css` and `dist/leaf-world.css`. At introduction, this route used original SVG characters and scientific diagrams; the October 15 rollout replaces the decorative cast while retaining the live plant and leaf diagrams. Water follows an internal root/stem/vein route; gases cross a leaf opening. Browser voices are optional; captions, pause, replay, keyboard controls and reduced motion remain available. Rejected raster leaf interiors are preserved under `docs/retired-art/` and are not published.

## October 15 illustrated adventure
The user-approved picture-book design now covers every screen: story and experiment, creek rescues, detective, quiz, finale, journal, settings and supporting pages. Painted Sprout and coral Beep, bold Lilita One headings, Caveat character notes and a consistent ink/paper interface extend the approved opening screens. `dist/first-screens.css` carries the shared header and opening layouts; `dist/adventure.css` styles the remaining activities. Scientific paths and learning interactions remain live HTML/SVG. Exact illustration prompts and asset sidecars are retained. See `docs/full-site-direction.md`, `docs/full-site-verification.md` and `DESIGN.md`.


## October 16 curriculum and garden quest
The supplied Year 4 DSKP and textbook were reviewed against the complete site. The assessment targets 4.2.1–4.2.4; 4.2.5 is excluded. `dist/quiz-game.js` and `dist/quiz-game.css` replace the five-item quiz with ten challenges using collecting, sequencing, matching, sorting and scene decisions. One locked/unlocked bottom Next button remains. First-check accuracy is saved out of 10, with corrections required before advancing; scores do not award official DSKP performance levels. The teacher page and offline trail include the corrected curriculum mapping. See `docs/curriculum-alignment-review.md` for source pages, scope and verification.


## Actual mini-game revision
Seven of the ten quiz challenges now have playable world state and goal detection: a resource-consuming leaf factory, rotatable sunbeam mirrors, an arrow-controlled water maze, a glucose-to-starch box-pushing puzzle, a switching conveyor, a rotatable food-energy railway, and moving gas bubbles. Three focused knowledge checks remain. `dist/quiz-minigames.js` owns the game mechanics and cancellable transitions. Touch buttons, keyboard movement, reduced motion, optional hints and the single bottom Next control are retained. Science hints are distinguished from harmless puzzle moves and restarts. See `docs/mini-games-verification.md`.


## October 17 · Greenhaven first scene

The welcome page asks for an explorer nickname and links to #grove. Walk Nico through a live 3D forest, find and fit the creek handle, turn the channel and bring water to Sprout's roots. Incorrect routes remain retryable; success appears in the world and unlocks one bottom Next button. This slice is ungraded practice and does not replace existing quiz scores. Pause, replay, optional sound, reduced motion and light graphics are included. The original illustrated lessons remain available.

Source: dist/grove.js and dist/grove.css. Models, prepared textures and the nature license: dist/assets/grove. Three.js runtime and MIT license: dist/vendor/three. Reproduce browser assets with tools/prepare-grove-assets.py using Python and Pillow; supplied original files are untouched. Asset provenance and remaining scope are documented in docs/greenhaven-scene.md.


## October 17 · Full Greenhaven adventure

#grove and #check now open the same continuous forest. An ungraded creek rescue teaches the controls, followed by 10 assessed discoveries: meaning; sunlight, water, carbon dioxide, chlorophyll; starch, oxygen; food chains, oxygen for breathing and gas balance. Eight discoveries manipulate the world; two use short dialogue choices. Correct first committed answers earn one mark each. Corrections, resume and puzzle resets preserve that first result; new attempts remain separate. #certificate reopens the selected explorer’s completed certificates.

Profiles and attempts are stored locally under sprout-greenhaven-v1. A new explorer gets separate learning progress; no account or server is involved. Certificate names can be edited without changing recorded marks. The PDF is generated entirely in the browser as one A4-landscape image page, preserving browser-rendered Unicode names; it is printable but its text is not selectable.

Modules: dist/grove-quest.js, grove-challenges.js, grove-progress.js, grove-certificate.js, grove-certificate-ui.js and grove-adventure.css. Source assets and the approved forest renderer are retained. Verification: docs/greenhaven-full-adventure.md.
