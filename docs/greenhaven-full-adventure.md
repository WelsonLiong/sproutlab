# Greenhaven: full adventure

The owner approved the first 3D creek scene and requested expansion on 17 October 2026. This extends the approved live forest and elevated camera. The supplied optional Word prompt remains background reference, not instructions. The existing illustrated teaching activities, demonstration, experiment and AI detective remain available.

## Experience and visual contract

Mode: Experience. One character, one forest, three connected clearings. The renderer, imported nature, Nico animation, rooted Sprout, lighting, parchment HUD, local Nunito/Lilita and single persistent bottom forward action are inherited from the approved scene. No new art-direction round or generic quiz-card collection. The original design seed is c3676cd0, corroborated in docs/greenhaven-direction-seed.txt; the owner explicitly pinned the Zelda-inspired environmental exploration direction and then approved the implementation. The full-stage work extends that contract rather than rerolling it.

A three-beat storm conversation explains why Sprout needs Nico to repair the creek and investigate the leaf workshop. An ungraded creek rescue introduces movement, pickup, repair and routing. Then ten assessed discoveries use eight world interactions and two short dialogue choices. Each mission opens directly. The child clicks the actual equipment or walks up and presses E to use it, changes objects and explicitly tests an idea. Deliveries are tested by carrying an object to the marked destination and pressing E. The world remains visible above the controls. Food-chain figures and other new puzzle props are authored procedural 3D geometry, not downloaded models attributed to the student.

## Exact assessment coverage

| # | Clearing / standard | Science decision | Interaction |
| --- | --- | --- | --- |
| 1 | Sunlit meadow / 4.2.1 | Plants make their own food | Short Sprout dialogue |
| 2 | Sunlit meadow / 4.2.2 | Sunlight supplies energy | Rotate two mirrors to route a visible beam to a leaf |
| 3 | Sunlit meadow / 4.2.2 | Water is required; roots absorb it | Pick up water, soil or food; carry and deliver to a soil bed |
| 4 | Sunlit meadow / 4.2.2 | Carbon dioxide enters leaves from air | Select and route a gas molecule into the leaf opening |
| 5 | Sunlit meadow / 4.2.2 | Chlorophyll in green areas absorbs light | Compare green/white leaf areas with the other conditions held equal |
| 6 | Leaf clearing / 4.2.3 | Some glucose is stored as starch | Carry an open food-storage sample vessel to the store |
| 7 | Leaf clearing / 4.2.3 | Photosynthesis releases oxygen | Collect bubbles from a water plant, observe a glowing splint relight, then identify the released gas |
| 8 | Living grove / 4.2.4 | Photosynthesis supplies food through living things | Arrange plant, rabbit and fox figures into a food chain |
| 9 | Living grove / 4.2.4 | Photosynthesis adds oxygen used in breathing | Choose a planted patch beside the shelter that adds oxygen to the shared air |
| 10 | Living grove / 4.2.4 | Photosynthesis helps maintain gas balance | Reason about less oxygen added and less carbon dioxide used if photosynthesis stops |

Primary content: supplied DSKP Science Year 4, printed page 54 (PDF page 66); supplied textbook printed pages 76–81. Products distinguish glucose production from starch storage, as in the prior curriculum review. 4.2.5 is excluded at the owner's request. Air movement is not taught as a requirement. Water alone does not produce food. The breathing model is a connection over time, not an instant oxygen meter. Plants respire during day and night. The activity does not award a formal DSKP performance level.

## Marks and attempts

Each discovery awards one mark for a correct first committed test. Moving, picking up, rearranging, resetting an unsolved puzzle, and leaving/reopening controls do not submit answers. A test deliberately commits a science configuration; for the two deliveries, E at the destination explicitly tests that delivery. Incorrect tests provide a reason and allow correction. A correction completes the discovery and unlocks Next, but preserves the original zero. A solved record cannot be overwritten by later tests. Progress cannot advance before correction succeeds.

Every new attempt has its own ID, start/completion dates, ten first-answer records, configurations and current discovery. Retakes do not merge marks or take a best score. Completed attempt scores are derived from their ten records. An interrupted attempt resumes with its committed marks and selected configuration. The final journal reports the latest completed assessment; the certificate selector lists separate completed attempts.

## Learners and persistence

The welcome cover and direct forest introduction ask for a nickname when creating an explorer. Existing pupils can select their local profile and continue. New explorer creates a new profile with separate learning progress, journal and forest attempts. Duplicate nicknames are distinguished by an Explorer number. The first matching learner can retain prior illustrated-site learning progress; new pupils receive empty learning progress. Preferences remain device-level.

Storage is local only: sprout-greenhaven-v1 stores profiles/attempts; sprout-lab-v1 retains the currently selected learner's teaching state for compatibility. No account, telemetry, pupil upload, remote PDF service or backend was added. When saving is unavailable, the game remains playable in memory and asks the pupil to keep the page open and download the certificate. Settings' fresh-adventure action starts a new attempt for the selected explorer and retains completed certificates.

Character prompts, lesson introductions, selected feedback and all ten assessed prompts address the active named explorer. Guest profiles retain generic wording. `learner-voice.js` returns plain text; HTML surfaces escape names, while world prompts use textContent. The mystery read-aloud follows the same named/guest distinction. Science answers and scoring stay identical for every learner.

## Certificate

After all ten corrected discoveries, the result screen reports the actual first-answer mark and percentage. Get my certificate opens a named certificate with the completion date, mark out of ten, percentage and attempt reference. Download and print actions appear above the large preview and remain available while scrolling. The name can be corrected without changing recorded marks. #certificate reopens completed certificates for the selected explorer only; an explorer with no completed attempt sees a waiting state.

PDF generation is entirely browser-local. A high-resolution 2380×1684 canvas preserves the browser's rendered names, including available Unicode glyphs. The file is one A4-landscape image page (842×595 PDF points), suitable for printing; PDF text is raster rather than selectable. The preview exposes the name, mark, percentage and date as accessible text. This is an activity certificate, with no invented school signature or official mastery award.

## Modules and preservation

- grove.js / grove.css: approved forest, practice scene and shared controls, extended for quest lifecycle.
- grove-challenges.js: fixed ten decisions, chapter layout, standards and explanations.
- grove-quest.js / grove-adventure.css: clearing props, world interactions, task controls, feedback, results and certificate shell.
- grove-progress.js: local profiles, configuration persistence, immutable first marks and separate attempts.
- grove-certificate.js / grove-certificate-ui.js: certificate rendering, PDF/download/print, attempt selector and saved-certificate route.
- app.js / first-screens.js: profiles, welcome and routing; #check now opens Greenhaven.
- Older quiz-game.js / quiz-minigames.js sources are preserved but no longer linked as the pupil-facing assessment.

The 17 nature assets and their licenses are unchanged. Nico was refreshed from the owner’s replacement on 18 October 2026; all seven supplied clips are retained and pickup/placement now use their matching animations. See docs/nico-animation-update.md. See docs/greenhaven-scene.md for original source/optimization/provenance. No more models were needed. No publishing was requested.

## Verification evidence

- tmp/test-grove-marks.mjs: ten fixed IDs/standards, advance gates, immutable first marks, correction counts, separate retakes, same-name learner IDs and valid configurations. Passed.
- tmp/verify-full-grove.cjs: actual interactions through all ten discoveries, wrong meaning/gas answers corrected to an 8/10 result, free mirror adjustment, carried-water reload/resume, desktop/390/320 layouts, actual PDF download, certificate name editing without mark changes, separate retake and Omar/Alya profile isolation. Passed with zero JavaScript or failed-response errors.
- The downloaded test PDF reopened with pypdf: one 842×595 page and one certificate image; rendered with PDFium and visually inspected for name, 8/10, 80%, date and unclipped borders. The sample uses a test name, not a real pupil's result.
- Capture set: .impeccable/review/full-grove/ including world puzzles, responsive leaf comparison, results and certificate.
- Fresh full-adventure design review: ship, with no material fixes. The supplied detector reported zero primary findings and 40 advisory token differences. The review sampled source and supplied captures; it did not establish classroom hardware performance or pupil usability.

Classroom hardware frame rates, pupil usability and teacher assessment judgment are not inferred from software-WebGL automation. Retain the existing adult/pupil verification process for classroom/submission evidence.

Current gameplay rework and review: docs/greenhaven-gameplay-rework.md. The arbitrary gas cart, discovery-stone gate and implied oxygen pipe are removed. The new apparatus uses self-authored low-poly geometry; no additional downloaded model is needed.
