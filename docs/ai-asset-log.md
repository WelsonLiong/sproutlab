# AI and asset log

Dates: 7–8 October 2026. Status: implementation record; student review and lecturer declaration still required.

## OpenAI Codex
Purpose: translate the user's task brief into an English Year 4 learning environment, author code and activity copy, map pedagogy, and prepare supporting documentation.
Prompt source: the original user request in this chat, including the three supplied assignment/game documents, cheerful child-first learning, photosynthesis Year 4 Unit 4, RPH-style flow, genuine games, maximum two conventional quiz activities, and deferral of the third-person game. Follow-up: English; code-first with visual review. On 8 October, the user requested a complete child-focused redesign with less text and more cartoons, without continuing the Impeccable workflow.
Outputs: dist/index.html, app.js, activities.js, resources.js, styles.css, activity.css, offline.html and private supporting documentation.
Fact-check: supplied Science Year 4, printed pp. 76–81; four needs, two products, importance to living things; NASA carbon-cycle educational page; official KPM circular page and indexed guide text for domain names.
Corrections during creation: include chlorophyll; water is not food; glucose may be stored as starch; plants respire day and night; label simulation and time assumptions; do not treat the supplied Year 2 DSKP as Year 4 authority.
Human improvement record: pending student/lecturer review and the two adult usability tests. Automated checks are recorded separately and are not human evidence.

## OpenAI image generation
Purpose: original friendly botanical map art with central space for semantic learning controls.
The initial garden (illustration-prompt.txt) was superseded after user feedback. Current assets: dist/assets/world.webp, a cartoon garden game map (exact prompt: docs/world-prompt.txt); dist/assets/cast.webp, a transparent four-character atlas containing rooted Sprout, Beep the robot, a sun and a droplet (exact prompt: docs/cast-prompt.txt). Original PNGs remain in parent-workspace tmp/art-v2. One generation request per current asset, converted to WebP without changing content. Characters and faces are fictional decoration; labels carry the scientific meaning.
No third-party character reference or provided 3D asset was used. No additional external image license is claimed.

## Typeface
Nunito variable font, downloaded from Google Fonts' official github.com/google/fonts repository (ofl/nunito). SIL Open Font License retained in dist/assets/OFL-Nunito.txt. Self-hosted; no Google Fonts browser request.

## Other media
Original SVG icons and instructional diagrams, CSS animation and Web Audio tones. Browser speech synthesis provides optional narration; device voice availability varies. The complete story text is present on screen and in its transcript.
Optional NASA extension is linked, not embedded or downloaded. Textbook content is paraphrased; no textbook pages are publicly distributed.

## Excluded supplied assets
The character, nature pack, tree model and game prompt remain in the user's original games folder. Licenses have not been accepted or audited for future distribution. None is included in this website or its backup.

## Known source access limitation
The official KPM guide download redirected to the portal homepage during retrieval. The official circular page and indexed KPM guide text confirm the four domains, including Pengajaran dan Pembelajaran and Etika AI. Verify the lecturer's copy for exact domain/subdomain wording before the final submission.

## User-requested redesign, 8 October 2026
Replaced the persistent sidebar and dense adult-oriented panels with an illustrated garden map, cartoon scene layouts, bold touch targets and a three-stage AI mission. Added evidence objects, sentence-building tiles and privacy shields. Kept science details and pedagogy in the teacher corner. Technical browser checks are in docs/verification.md; they do not substitute for two real adult usability tests.

## Teaching alternative — 11 October 2026
Codex drafted and implemented the agreed cartoon opening and playable leaf factory. Existing character artwork is reused. New sandwich, soil pot, cutaway leaf, roots, stem and factory elements are original SVG/CSS geometry, with browser animation and optional device speech. No new raster image generation or external media download. The science distinguishes raw materials from energy; simplified counts and speed and the imaginary machine are labelled. Original picture notes remain available.

## Illustrated leaf hideout revision — 11 October 2026
The user rejected the flat factory diagram as presentation-like. Replaced it with a richly illustrated leaf interior and in-scene character controls. Two images were made with the built-in image-generation tool: landscape and portrait, stored as `dist/assets/leaf-hideout.webp` and `dist/assets/leaf-hideout-mobile.webp`. Exact prompts are in `docs/leaf-hideout-prompts.txt`. The PNG originals remain in the Codex generated-images folder; WebP conversion only optimises file format. The room, smiling green pods and moving material characters are expressly imaginary representations of real photosynthesis, not literal leaf anatomy. No machinery remains in the scene.

## SVG science correction — 11 October 2026
The generated leaf hideout was rejected because its imaginary anatomy and floating water obscured the science. All raster characters and environment art in the #factory teaching alternative have been replaced by original SVG geometry in dist/factory-art.js. This includes the opening cartoon and caption portraits. The rest of the site's garden and general character atlas remain separate assets.

Water follows a single shared SVG path inside a root, stem, petiole and leaf vein. The separate enlarged leaf slice shows water leaving the vein towards cells; carbon dioxide and oxygen pass through a visible gap in the lower surface. Green ovals represent chloroplasts containing chlorophyll. Quantities, cell layout and timing are simplified teaching representations. Repeated equal material counts were removed; tracing each input is a learning action, not a chemical ratio. Any nonzero light setting can enable the simplified process; it does not model actual reaction rates.

Science references consulted online: Royal Horticultural Society, “How plants absorb water” (https://www.rhs.org.uk/advice/understanding-plants/how-plants-absorb-water) and “How plants breathe” (https://www.rhs.org.uk/advice/understanding-plants/how-plants-breathe). The drawings are newly authored, not copied or downloaded from these sources. Archived rejected illustrations and their original prompts are retained as a development record under docs/retired-art/ and docs/leaf-hideout-prompts.txt, outside published assets.
Additional pigment-location cross-check: RHS, “How plants use light to grow”, https://www.rhs.org.uk/advice/understanding-plants/how-plants-use-light-to-grow. This source confirms chloroplasts contain light-absorbing pigments, including chlorophyll. Linked in the lesson transcript and site credits.
