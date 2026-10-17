# Greenhaven: first playable scene (review history)

The owner has since approved this scene and the full expansion is implemented. Current scope and verification: docs/greenhaven-full-adventure.md. The first-scene decisions and evidence below are retained as review history.

Approved direction, 17 October 2026: a computer-first, compact 3D forest adventure inspired by Zelda's readable exploration and environmental puzzles. The owner approved building one finished scene before expanding to three chapters, ten assessed science challenges and a certificate. The optional GAME DEVELOPMENT PROMPT.docx is reference material, not a requirements document.

## Shipped slice

`#grove` opens a live WebGL 2 forest using the supplied nature models and animated Nico. The welcome cover asks for a first name/nickname and links to this scene; the illustrated teaching trail remains accessible. The name is stored in the existing device-local save. Direct visitors can also choose a name on the forest introduction. Empty names become Explorer; names are limited to 24 characters, escaped on HTML insertion, and displayed with textContent in feedback. No pupil information is transmitted.

The rescue is ungraded practice. Walk with WASD/arrows, hold Shift to run, click the ground to walk, or use touch movement controls. E/interact picks up the missing handle, fits it to the creek gate, and opens the route controls. Turn the channel and release water. Sending water to the pond or stump provides corrective feedback and leaves progression locked. Water must reach the roots before the in-world celebration and unlocked Next button appear. The discovery explains root uptake and all four photosynthesis needs; it does not claim watering alone produces food or instant growth.

Persistent bottom navigation has one forward action: locked Next: discovery, unlocked Next: discovery, then Back to adventures. Pause, restart, replay, reduced motion, optional sound cues and light graphics are supported. Sustained slow frames automatically choose light graphics. The scene disposes its animation loop, listeners, geometries, materials, textures and WebGL context on navigation.

## Visual contract

Mode: Experience. The live forest occupies the viewport. There is no quiz board, question-card grid or decorative game screenshot. An elevated camera frames Nico, the path and the current interaction. Sunlit green terrain, warm timber, stone channels, turquoise water, red accent foliage and creamy parchment controls form the scene. Sprout stays rooted in a soil bed. The scene's small close-up Sprout is procedural 3D geometry; imported nature models keep the visual detail consistent. The existing illustrated site keeps its established visual system outside this route.

FORM: the approved desktop/Zelda forest direction is pinned by the user. The design skill's actual printed concept seed key is `c3676cd0` (direction scope, Experience mode, assigned index 7, API-approved pool `c3b204a1eed6`). Reproducible printed evidence is saved in `docs/greenhaven-direction-seed.txt`. This design seed is unrelated to the numeric vegetation-placement seed in the runtime. The user's explicit direction overrides the roll. Ambition here is camera clarity, physically visible feedback, coherent material treatment and a complete interaction, rather than another art-direction selection round.

## Asset preparation and provenance

- `tools/prepare-grove-assets.py` copies 17 selected glTF nature models with their dependencies and creates a browser-specific Nico GLB. It never edits supplied originals.
- Nature: Quaternius Stylized Nature MegaKit Standard, CC0; included license: `dist/assets/grove/nature-license.txt`.
- Nico: supplied third-party character; the supplied folder does not identify the creator, original download page or license. Provenance remains to be completed before publication. This does not prevent local scene review.
- Nico's embedded textures are reduced to 1024 pixels; its skeleton, mesh and all six animation clips are retained. Source 28.68 MiB, prepared 1.63 MiB. Nature color/alpha maps are capped at 1024 pixels and normal maps at 512. Entire prepared asset folder: 11.65 MiB.
- Three.js 0.180.0, GLTFLoader and BufferGeometryUtils are vendored locally with their MIT license. There is no runtime CDN request, package installation or build step. The two addon import paths are patched to local files; upstream functionality is otherwise unchanged.
- The separate `tree.glb` is not used or redistributed in this scene.

## Expansion after review

Keep one adventure and three connected chapters. The proposed ten assessed decisions cover 4.2.1 meaning (1), 4.2.2 four needs (4), 4.2.3 products (2), 4.2.4 importance (3). Exclude 4.2.5. Practice and movement do not earn or lose science marks. The assessment will record the first committed science answer, permit corrections, and store complete attempts separately. A certificate will use one completed attempt's name, mark out of ten, percentage and completion date; do not combine marks across attempts or award a formal DSKP performance level.

Not implemented in this slice: remaining chapters, replacement of the ten existing prototype assessment games, per-learner profiles on shared computers, final attempt scoring or certificate generation. Existing quiz progress is not modified by the practice scene. These are deliberate staging boundaries, not claims of completion.

## Verification

Automated checks and review captures are generated by `tmp/verify-grove-flow.cjs`. They exercise actual keyboard, pointer and button interactions, an incorrect route before the correct route, loading, nickname persistence, pause, replay, lock state, responsive layout and cleanup. The test uses an isolated Edge profile with local request fulfillment and software WebGL, not the owner's open browser. Software rendering does not establish frame rates on classroom hardware. A real school-computer play test and pupil/adult usability review remain necessary for that evidence.

17 October 2026 verification outcome: the complete rescue test passed with zero JavaScript errors. `tmp/confirm-grove-preview.cjs` also passed against the actual local HTTP server with all optimized models/textures, desktop 1440×900, mobile 390×844 and 320×720, no horizontal overflow, loading complete, initial Next disabled and canvas disposed on return to the map. Review evidence is under `.impeccable/review/grove/`. The detector reported zero primary findings and 121 advisory token-documentation findings; it was not rerun. A fresh finish reviewer requested seed corroboration, removal of two eyebrow labels and consistent SVG touch arrows; its verdict pass scored all three resolved and returned `ship` for that fix list. The documenter added scoped Greenhaven tokens to DESIGN.md and the existing design sidecar without changing the illustrated lessons. No classroom-hardware or pupil-usability approval is claimed.
