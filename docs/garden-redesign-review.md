# Whole-site botanical redesign · 28 October 2026

The owner's request was to make the complete website feel less bland and more inviting for children. Their clarification was plants and flowers as decoration, with only light adventure framing. The scope includes the welcome, mystery, cartoon and guided leaf lesson, picture notes, lab, creek puzzle, AI detective, reflection, journal, teacher resources, sources, certificate and offline page, plus the forest game's menus.

Taste Skill v2 was loaded from the already-installed file at `C:/Users/Welson/Documents/Codex/2026-10-28/is-the-3d-game-finished-can/.agents/skills/design-taste-frontend/SKILL.md`. It was used in place without installing another copy. Its direction draw selected **One motif**, seed **1033123606**, keeping the established typography and brand assets. No foreign stock photographs were used. The subject inventory was Sprout's paired leaves, rooted growth, Beep, sunlight, water, the chlorophyll lesson, the creek, the local field journal, the seven activities and the existing painted garden scenes.

**Idea:** Sprout's leaf becomes the shape and botanical framing of a friendly science garden. **Live thing:** children change the plant's conditions in the existing working leaf lab and see the science model respond; the site also keeps each explorer's discoveries locally.

The user explicitly requested botanical decoration and a child-friendly visual world. This takes precedence over Taste's generic restrictions intended for marketing pages and business dashboards. The actual learning interfaces keep their established actions, content, readable sequencing and scientific diagrams.

## Before and after

| Finding | Change |
| --- | --- |
| Cream background and thin outlines flattened the activity pages. | Mint ground, forest ink, sky and yellow activity areas, leaf-shaped surfaces and illustrated characters. |
| The experience leaned heavily on adventure terminology. | The main navigation names the garden; the welcome invites curiosity and experimentation. |
| The welcome put a form over a busy picture and inherited large phone spacing. | Live copy and form sit beside the illustration, stack explicitly on phones, and keep a two-line headline. |
| Activities were a row of small, similar stop markers. | Seven illustrated links have their own visible image and separate text; the first suggestion is emphasized. |
| A bare external video frame could remain blank while loading. | A local illustrated play cover loads the original privacy-enhanced YouTube embed on request; a direct link remains available. |
| Supporting pages did not carry the same visual personality. | Journal, reflection, teacher material, sources, certificate and offline page use the garden palette and controls. |

## Verification

- Baseline captures: 12 routes at 1440, 768 and 390 pixels, 36 screenshots. No baseline JavaScript errors or horizontal overflow were observed.
- Whole-site browser review: the same 36 route/viewport combinations after implementation, plus forest-menu views, the guided lesson in progress, larger-text/reduced-motion state and offline page. No JavaScript errors or horizontal overflow in the 36 route captures.
- Taste v2 `inspect.mjs`: welcome, cartoon lesson and leaf lab at all three widths. Final result: **0 FAIL** for all nine inspected screens. Supporting warnings remain intentional and are explained below.
- Taste v2 source lint: **0 FAIL, 0 WARN** on the new interface CSS, shared interface module and welcome module. The native modal's legitimate elevation is documented in its source.
- JavaScript syntax checks pass on changed modules. Diff whitespace check uses `cr-at-eol` to preserve this Windows repository's existing line endings.
- Interaction checks cover selecting a prediction; requesting the original video; Start, Next and finishing the guided lesson; testing all four plant needs and then removing light; completing both clues, sentence repair and privacy protection in AI detective; saving a reflection; journal persistence after reload and downloading it; accessibility toggles and low-data decoration removal; offline print controls; and eight main routes at 320px width.
- The separate creek check passed both rescues, continuation through the visible Next control, success focus, reset, failed-route feedback, and 390/320px layouts. Its older test needed an adapter because it targeted the hidden internal next button rather than the established persistent navigation control.
- The forest's intro loads at desktop, tablet and phone widths. Its existing 3D campaign mechanics were not changed. A complete replay of the forest campaign is outside this visual-change verification.

The tests use isolated browser profiles and synthetic reflection text. No real pupil record or production progress was changed. The YouTube URL and loading action were checked; third-party playback availability remains dependent on the device and network.

The inspector allowances are narrow and documented in `tools/review-garden.cjs`: `eyebrow` on the welcome corresponds to the real keyboard accessibility skip link; `mixed-font-headline` is the established logo with its small tagline; `icon-chips` on learning screens corresponds to recognizable sound, settings and discovery controls, rather than dashboard KPI decorations. No overflow, broken-image or covered-text rule is disabled.

The remaining inspector warnings reflect deliberate choices: large readable child-facing headings; white reading surfaces within a mint page; cheerful colour rather than a business dashboard's low colour budget; the preserved logo's small tagline; and no autoplay footage on the welcome. The welcome has eleven small movement targets with reduced-motion support, rather than adding more movement to satisfy a marketing benchmark. Its footer and activity navigation have their own internal insets; the main content frame remains balanced.

## Visual critique

ROUND 1

Seen in one second: a friendly plant science garden, with Sprout and Beep as its hosts.

Idea (one sentence): Sprout's leaves frame the learning space, from the illustrated welcome to clear, colourful activity surfaces.

Live thing: the working photosynthesis lab, pupil-paced leaf lesson and local discovery journal.

Layout words by section: welcome=invitation beside garden / activities=illustrated collection / lesson=media and reading companion / lab=plant model beside controls / detective=evidence workbench / journal=collected discoveries / resources=readable documents.

Scores: design 7.5 · usability 8 · creativity 7 · content 8 → overall 7.6.

Caps applied: the rubric's photo-first and business-dashboard assumptions are superseded by the owner's illustrated children's brief. No unresolved rendered inspection failure remains in the three inspected routes.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. Initial full-width foliage crossed the activities heading (`after/map-1440.png`, first pass). Restrict it to outer margins and a footer planting strip.
2. Inherited mobile cover padding left a large empty space (`after/map-390.png`, second pass). Override the original high-specificity rule and use an explicit stacked composition.
3. The broad website footer overlaid the forest intro (`after/grove-390.png`, first and second passes). Keep the game's full-screen shell and explicitly hide the website header and footer while in the forest.

The final captures confirm these fixes. Remaining limitation: only a real pupil/adult usability session can establish whether children understand the activities and reading level in practice. No usability-study results are invented.

## Botanical artwork

Final runtime asset: `dist/assets/garden-border.webp`, 404,778 bytes, with transparency preserved. The generated PNG was optimized to WebP for the website, reducing its size from 2,131,669 bytes. The original generation remains in the tool's image library.

Created with the built-in image-generation tool, not the CLI. Prompt:

> Create a production website decorative botanical border asset for Sprout Lab, a playful photosynthesis science learning website for children aged 10. Landscape 3:2 composition, genuinely transparent background. Hand-painted children's picture-book gouache illustration, crisp clean organic cutout edges, beautiful lively greens mint jade and forest, little golden yellow daisies, small coral pink flowers, broad leaves, fern fronds, thin curling pea vines. Plants rooted along the bottom edge ONLY, arranged as a generous cluster at bottom left and bottom right with a few low connecting leaves along bottom. Side clusters reach 40 percent of image height at outer edges. Upper 55 percent of canvas and middle of image completely empty transparent. No people, animals, faces, pot, text, letters, signs, icons, frame, background or shadows. Illustrated botanical decorative foliage, restrained charming and beautifully crafted, varied leaf shapes and scale, vibrant garden plants. Output one single transparent PNG asset intended to sit across the bottom of a webpage.

Existing artwork retained: `adventure-cover.webp`, `mystery-garden.webp`, `creek-garden.webp`, `celebration-garden.webp`, `world.webp`, and `storybook-cast.webp`. These are the project's original AI-assisted illustrations, already credited in Sources & safety; no new external photo licences or placeholder artwork were added.

Review evidence and direction data live in ignored `.taste-skill/`. The review script uses the existing bundled Playwright only as a development check, without adding a runtime dependency. This change is implemented and previewed locally; it has not been published to Vercel.

## Continuation verification · 2 November 2026

Recovered the saved implementation and the owner's whole-site, plants-first brief from the interrupted chat. Retained the existing direction and artwork. The earlier full-site report records 36 desktop/tablet/phone views with zero script errors or horizontal overflow; its Taste inspector evidence is retained separately from this continuation's checks.

Re-ran `node tools/review-garden.cjs interactions` successfully against the saved files, including the lesson, lab, detective, reflection, journal persistence/download, accessibility settings, forest intro, offline print controls and eight routes at 320px. No page errors were reported. All 22 JavaScript modules pass syntax checks, the three Taste source targets report zero failures and warnings, and the repository diff passes its Windows whitespace check.

The additional Impeccable detector reports advisory design-token mismatches against the older metadata and sidecar. The current garden palette and shape treatment are recorded in the superseding garden section of DESIGN.md; refreshing the legacy metadata is separate from this redesign. No new runtime dependencies or publication were introduced.
