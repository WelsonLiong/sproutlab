# Set induction restored

The short Sprout & Beep YouTube cartoon (DJnnWQehI50) is restored at #induction before Chapter 1. It is the first trail stop; #mystery also opens it. The video loads only on Play and has a direct YouTube fallback link. A short observation prompt leads into the meaning chapter. The pathway now has eight stops, with existing chapter completion retained and totals calculated from the station list. The three chapters, games and forest implementation are unchanged.

# Photosynthesis chapter pathway · 2 November 2026

This revision implements the owner’s three-chapter scope, superseding the older mixed learning pathway. Nico forest source and campaign data structures are untouched.

| Chapter | Learning | Practice | Success criterion |
| --- | --- | --- | --- |
| 1 · Meaning | Plants make their own food through photosynthesis | Build the Meaning: select sentence pieces in order, with retry feedback | State the meaning correctly |
| 2 · Needs | Four guided steps in the existing whole-plant and enlarged-leaf model: water, carbon dioxide, sunlight, chlorophyll | Collect & Avoid: move Sprout, collect need badges for points, answer a needs question after a distraction collision | Independently name at least two of four needs |
| 3 · Products | Observe a food-storage model and an oxygen-release model; brief glucose-to-starch bridge | Product Post Office: deliver starch and oxygen to PRODUCT, water and sunlight to NEED | Independently identify and state at least one product |

LS 4.2.1, 4.2.2 and 4.2.3 only. Source checked: Docs/Science_Year_4.pdf, PDF pages 8–10 / printed pages 76–78. The textbook defines photosynthesis as plants making their own food, lists the four needs, and explains glucose stored as starch and oxygen released through leaves. The needs chapter contains no food/product symbols or output step. No gas-balance, food-chain or AI-detective lesson is required in the new pathway.

The final trail destination is Nico’s forest, clearly described as bonus play. The existing forest remains unchanged and may still contain earlier science content; its historical scores, certificates and campaign saves are not used to assess the revised chapters.

## Behaviour

- Numbered seven-stop trail: learn → play, repeated for three chapters → bonus forest.
- Learners can revisit any stop. Next unlocks after the current interaction; corrected answers are accepted with specific feedback.
- New chapter storage key: sprout-chapters-v1. Explorer legacy entries carry chapterVersion: 1, preventing previous pathway completion from silently skipping new lessons. Existing forest campaign fields and source files are unchanged.
- Collect & Avoid supports arrow keys/A/D, pointer/touch position, tap direction buttons, pause, replay and a calm selection alternative. No countdown; missing a need costs one of three hearts, and losing all three ends the game. Four distinct need badges complete the game. Repeated catches earn points but do not substitute for distinct needs.
- Chlorophyll badges are symbolic; the game explains that chlorophyll is already inside leaves. Distractions are toys, snacks and books, avoiding the misconception that oxygen or soil are generally useless to a plant.
- Practice completions are not a formal LO rubric or official performance-level grade. Teacher guidance asks for independent spoken or written responses to SC1–SC3.
- The field journal is now a three-objective recap with an optional saved note. Teacher and offline pages follow the same scope.

## Implementation and checks

New chapters.js and chapters.css own the learning screens and games. factory.js retains the detailed SVG diagram and four need animations. Shared factory-art.js and all grove modules were left unchanged by this revision. app.js routes old mystery/lab/creek/detective links to their new chapter equivalents; story opens the needs lesson.

Browser checks: 1440px and 390px layouts for all chapter routes; completion gates; wrong-answer retries; four needs and no product symbols in the enlarged-leaf lesson; both product observations; product sorting; calm-mode collection; saved reflection and resume. Additional live collection checks cover real collisions, rescue questions, scoring and replay, with final narrow-screen checks at 320px. Generated review images and scripts are in workspace tmp/chapter-review and tmp/verify-chapters.cjs / tmp/verify-collect-live.cjs.
