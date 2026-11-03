# Current learning pathway · 2 November 2026

The owner’s revised scope supersedes the previous learning journey below: LS 4.2.1, 4.2.2 and 4.2.3 only. Three chapters teach meaning, needs and products, each immediately followed by a practice game. AI detective, creek puzzles and the mixed lab are removed from the pupil pathway. The existing Nico forest implementation remains unchanged, reached last as optional play, with no use of its records to assess these objectives.

LO1: State the meaning of photosynthesis. SC1: State it correctly.
LO2: List the needs of plants for photosynthesis. SC2: List at least two of sunlight, water, carbon dioxide and chlorophyll correctly.
LO3: State products based on observations using various media. SC3: Identify and state at least one of starch and oxygen correctly.

The needs chapter retains the enlarged leaf model but ends after the four needs. A separate products chapter uses food-storage and oxygen-release models, with one brief glucose-to-starch explanation. Textbook authority: Docs/Science_Year_4.pdf, PDF pages 8–10, printed pages 76–78. New chapter progress is versioned separately from the prior pathway; forest campaign storage and source modules are unchanged. See docs/chapter-pathway.md.

---

# Sprout Lab

The revised Nico and the Dying Forest plan in `docs/nico-dying-forest-revised-plan.md` supersedes the Greenhaven quiz and laboratory chapter design below. The current #grove campaign plays from the prologue through the Sunless Woods, Lost Stream, breathing pond, woodland pantry and return to Sprout. The ten-discovery assessment code and old marks remain stored as legacy records; they are not on the current campaign path. The user chose to omit the travelling companion.

Sprout Lab is an English Year 4 science learning website about photosynthesis and introductory AI literacy. It supports EDUP3133 Task 3 and the supplied Science Year 4 Unit 4 material, printed pages 76–81. Pupils are approximately ten years old; teachers and partners can assist with reading and discussion.

## Learner journey

The second stop opens the owner's embedded YouTube cartoon, followed by one six-step photosynthesis lesson. The first step waits for Start. Next sits beside Replay within this subsection and starts each following step immediately; captions and diagrams remain until the pupil continues. Separate automatic and try-it-yourself versions have been removed. See docs/guided-leaf-lesson.md for the current interaction contract.

Seven freely revisit-able stops invite the learner to predict where plant food comes from, explore a leaf, test a condition, route water to roots, investigate a fictional AI mistake, play garden activities and record a discovery. The cartoon/playable leaf factory and picture notes are alternative explanations at the same second stop. Lesson timing is flexible; the current Nico route is an unscored third-person forest campaign with direct object movement and environmental feedback. It targets DSKP 4.2.1–4.2.4; 4.2.5 is excluded at the owner’s request. Station badges record participation, not a formal mastery grade.

The science distinguishes water and minerals absorbed by roots from food made through photosynthesis. Four needs are sunlight, water, carbon dioxide and chlorophyll. Products are glucose and oxygen; some glucose is stored as starch. The simplified models do not simulate actual growth rates. Plants also respire during day and night.

## User experience

On 28 October 2026 the owner requested a richer, kid-friendly redesign of the entire website, explicitly asking for plants and other botanical decoration with only light adventure framing. The current interface is a living science garden: mint, sky, sunshine and reflection colours, illustrated foliage at the edges, readable activity surfaces, and the established Sprout and Beep cast. This direction takes precedence over the older adventure-heavy presentation. Activities, science content, device-local saves and the existing 3D forest mechanics remain in place.

The owner approved a playful, hand-painted picture-book direction for the welcome and mystery screens on 15 October 2026 and requested its extension across every screen. Sprout, a rooted plant, and Beep, a coral robot, guide the adventure. Large readable headings, clear interactive controls, illustrations and short captions support exploration. DESIGN.md records the implemented visual system.

## Boundaries and access

- Static HTML, CSS and JavaScript modules served from dist; no build required. The Greenhaven scene uses a locally vendored Three.js runtime.
- No pupil accounts, analytics, uploads, live chatbot or application backend. The AI response in the detective activity is fictional teaching material.
- Progress, preferences, an optional explorer nickname, older assessment results and reflections stay in browser-local storage. No full name or identifying details are required. The revised campaign has a separate versioned save per explorer and is unscored. Older ten-discovery marks and certificates remain available as historical records without being treated as new chapter completion.
- Keyboard and touch controls, optional browser narration, captions/transcripts, reduced motion, larger text and low-data settings are supported.
- Teacher guidance, source credits and a printable offline trail accompany the activities. External source links open separately.
- Browser voice availability varies. The interactive site requires HTTP hosting or a local web server; the printable trail can be opened directly.
- On 17 October 2026 the owner approved a desktop-first 3D forest direction and one finished practice scene before expansion. The supplied Nico and nature assets are used in #grove; docs/greenhaven-scene.md records scope and provenance. The former three-chapter scored sequence was implemented and is retained in source and prior saves. On 20 October the revised environmental campaign replaced its pupil-facing path in #grove and #check. The current game uses a following third person camera and direct world manipulation; see docs/nico-dying-forest-revised-plan.md.

## Verification and publication

Development checks are recorded in docs/full-site-verification.md. These do not replace the pending adult usability study and lecturer/student verification described in the original assignment materials. This redesign request authorizes local implementation and preview; publication has not been requested.

On 2 November 2026 the owner removed The Secret of Green Leaves mission, including vine threading, stump climbing and its separate leaf comparison. The restored stream leads directly to the Breathing Pond; existing saves in the removed mission migrate to the pond. The forest now has six playable stages before its completion scene.
