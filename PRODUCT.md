# Sprout Lab

Sprout Lab is an English Year 4 science learning website about photosynthesis and introductory AI literacy. It supports EDUP3133 Task 3 and the supplied Science Year 4 Unit 4 material, printed pages 76–81. Pupils are approximately ten years old; teachers and partners can assist with reading and discussion.

## Learner journey

The second stop opens the owner's embedded YouTube cartoon, followed by one six-step photosynthesis lesson. The first step waits for Start. Next sits beside Replay within this subsection and starts each following step immediately; captions and diagrams remain until the pupil continues. Separate automatic and try-it-yourself versions have been removed. See docs/guided-leaf-lesson.md for the current interaction contract.

Seven freely revisit-able stops invite the learner to predict where plant food comes from, explore a leaf, test a condition, route water to roots, investigate a fictional AI mistake, play ten garden challenges and record a discovery. The cartoon/playable leaf factory and picture notes are alternative explanations at the same second stop. Lesson timing is flexible; the assessment is now one continuous Greenhaven 3D forest adventure with three clearings, eight world interactions and two short reasoning checks, with no timer. The assessment targets DSKP 4.2.1–4.2.4; 4.2.5 is excluded at the owner’s request. Station badges record participation, not a formal mastery grade.

The science distinguishes water and minerals absorbed by roots from food made through photosynthesis. Four needs are sunlight, water, carbon dioxide and chlorophyll. Products are glucose and oxygen; some glucose is stored as starch. The simplified models do not simulate actual growth rates. Plants also respire during day and night.

## User experience

The owner approved a playful, hand-painted picture-book direction for the welcome and mystery screens on 15 October 2026 and requested its extension across every screen. Sprout, a rooted plant, and Beep, a coral robot, guide the adventure. Large readable headings, clear interactive controls, illustrations and short captions support exploration. DESIGN.md records the implemented visual system.

## Boundaries and access

- Static HTML, CSS and JavaScript modules served from dist; no build required. The Greenhaven scene uses a locally vendored Three.js runtime.
- No pupil accounts, analytics, uploads, live chatbot or application backend. The AI response in the detective activity is fictional teaching material.
- Progress, preferences, an optional explorer nickname, assessment results and reflections stay in browser-local storage. No full name or identifying details are required. The introductory creek practice does not change assessment marks. The ten following discoveries award one mark per correct first committed answer; corrections allow completion but do not inflate the score. Each explorer and retake has separate device-local records, and completed attempts generate a named downloadable PDF certificate.
- Keyboard and touch controls, optional browser narration, captions/transcripts, reduced motion, larger text and low-data settings are supported.
- Teacher guidance, source credits and a printable offline trail accompany the activities. External source links open separately.
- Browser voice availability varies. The interactive site requires HTTP hosting or a local web server; the printable trail can be opened directly.
- On 17 October 2026 the owner approved a desktop-first 3D forest direction and one finished practice scene before expansion. The supplied Nico and nature assets are used in #grove; docs/greenhaven-scene.md records scope and provenance. The owner approved the scene and requested expansion; all three chapters, ten assessed discoveries, local explorer profiles, resume, separate retakes and named PDF certificates are implemented. #check opens this assessment in the approved forest. The older prototype quiz source remains preserved but is no longer the pupil-facing assessment.

## Verification and publication

Development checks are recorded in docs/full-site-verification.md. These do not replace the pending adult usability study and lecturer/student verification described in the original assignment materials. This redesign request authorizes local implementation and preview; publication has not been requested.
