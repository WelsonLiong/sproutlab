# Sprout Lab

English Year 4 Unit 4 photosynthesis and AI-literacy module for EDUP3133 Task 3. The seven learning stations have a suggested total of 19 minutes. Desktop, tablet and mobile layouts; no pupil accounts.

## Run locally

Serve the `dist` folder through an HTTP server, for example `python -m http.server 4174 --directory dist`, then visit `http://localhost:4174`. ES modules require HTTP; opening index.html with file:// is not supported. `dist/offline.html` can be opened directly or printed for disconnected use.

## Source

- `dist/app.js`: navigation, preferences, device-local persistence, icons and map.
- `dist/activities.js`: story, lab, two pipe puzzles, AI detective, assessment and reflection.
- `dist/resources.js`: teacher mapping, source attribution and safety.
- `dist/styles.css` and `dist/activity.css`: responsive interface and motion.
- `dist/assets`: original AI-generated cartoon garden and character atlas, self-hosted Nunito font and license.

There are no application backend, trackers, API keys or third-party scripts. External resources are links only. Read-aloud uses the browser's available English voices and may not work on all devices. Hosting access controls are separate from the app's lack of pupil accounts.

## Submission work that requires the student

Complete the official cover template privately, obtain lecturer acceptance of a custom website if needed, test with at least two real adults, record observations and implemented improvements, and replace the pending section in the seven-page documentation draft. Do not invent evaluator feedback. Task 3 submission date in supplied TPB: 6 November 2026.

The future 3D game and provided game assets are intentionally excluded from this build and source backup. See docs/future-game.md.

## October 8 redesign
The child-facing interface now uses cartoon scenes, a garden map, Beep’s three-stage evidence mission, word tiles and privacy shields. Technical verification is recorded in docs/verification.md. The website source is dependency-free ES modules; no build is required.

## October 11 teaching alternative
`#factory` adds a short cartoon, an automatic worked demonstration and a playable leaf factory. `#story` preserves the original picture notes; both count as the same explanation stop. New implementation: `dist/factory.js` and `dist/factory.css`. The garden now opens the new mode, with both modes linked side by side. Browser voices are optional; captions, pause, replay, keyboard controls and reduced motion remain available.
