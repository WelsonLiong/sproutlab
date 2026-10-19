# Nico animation refresh — 18 October 2026

The supplied source GLB was replaced together with its JSON/Markdown notes. Its actual animation list is Idle, Jumping, Picking Up, Putting Down, Running, Victory and Walking. Picking Up is 3.291667 seconds; Putting Down is 2.875 seconds. The browser previously used a separately prepared six-clip model and did not load source-folder replacements automatically. The former per-frame Idle transition also interrupted interaction animations.

`tools/prepare-grove-assets.py --nico-only` now refreshes the optimized Nico without recopying nature assets. All seven clip definitions and all four non-image buffer payloads are retained exactly. Textures are resized for browser delivery. The 28.74 MiB source becomes a 1.70 MiB browser model. `dist/assets/grove/nico-manifest.json` records source/browser hashes and clip names; `dist/nico-version.js` supplies a source-fingerprinted model URL so a refreshed page requests the replacement model. The supplied source files are never edited.

`grove-animation.js` owns locomotion and one-shot interactions. Picking Up and Putting Down play once, suppress locomotion interruption and return to Idle at the clip's actual duration. Item-transfer callbacks follow animation time and pause with the game. Reduced motion preserves the transfer/end state without the spatial sequence. Route cleanup and reset cancel pending callbacks.

The creek handle uses Picking Up when collected and Putting Down when fitted. Water and food-storage samples use Picking Up when taken and Putting Down when delivered or returned before choosing another sample. Nico approaches distant samples before beginning the action. Carried props follow the posed right hand rather than a fixed chest offset. Delivery scoring and completion occur after placement finishes; repeated E during the action cannot create additional attempts. Existing platform/boot correction remains active through the new poses.

Verification: workspace `tmp/verify-nico-interactions.cjs` and `tmp/nico-interactions-report.json` exercise both clips on the handle, water and starch, movement-input resistance, pause/resume, timed transfers, repeated E, delivery scoring, foot contact and route cleanup with zero JavaScript errors. The prepared GLB's animation definitions and non-image payloads were compared with the supplied source and matched exactly. Captures are in `.impeccable/review/nico-interactions/`.

## Resume visibility fix

The missing Nico in Discovery 6 was reproduced with a legacy save carrying starch: the mission camera looked at the leaf workshop, but the character always spawned at the forest entrance, over 360 pixels beyond the left edge at 1440 × 900. This was a location/camera mismatch, not a missing model.

Attempts now keep an optional `playerPosition` containing chapter, x and z. Movement checkpoints save at most once per game second, with a final checkpoint on route cleanup or page hide. Valid positions are restored; older saves and chapter changes enter the current clearing at a clear standing position. Selected samples and first-answer marks stay intact. Retakes reset the clearing reference so they start in Chapter 1.

The apparatus camera now pans when Nico reaches the play area's edge, reserving space for his body and carried item outside the task panel, footer and movement controls. The desktop and mobile apparatus framing otherwise stays in place. Surface contact and pickup/placement timelines are unchanged.

`tmp/verify-nico-visibility.cjs` reproduces the original legacy save and verifies visible character bounds on resume, four distant roaming positions, mobile layout, position restoration after route navigation, preserved cargo/marks, delivery and the next discovery. Report: `tmp/nico-visibility-report.json`; captures: `.impeccable/review/nico-visibility/`. The ten-discovery regression also passed with the expected 8/10 certificate and no JavaScript errors.
