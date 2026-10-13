# SproutLab design options — 14 October 2026

Status: three preview concepts; none selected. Do not implement or treat generated pixels as finished teaching content.

The user confirmed SproutLab is the redesign target. The thermometer website is a comparison illustrating unwanted visual similarity.

## Preview concepts
- A — Science Playground: cobalt shell, large diagram, explicit next instruction. Strong task clarity; more familiar educational interface.
- B — Living Garden: immersive full-scene plant experiment. Strong atmosphere; requires more custom artwork and responsive scene planning.
- C — Comic Quest: coral narrative strip, yellow navigation, expressive ink, large working diagram. Strongest stylistic departure; simplify labels and keep the central task visually calm.

Generated with the built-in image_gen tool. Each PNG has a prompt sidecar containing the exact prompt. These are proposed active learning screens, not landing pages or production screenshots.

## Design principles held across the options
- English, Year 4, age 10, photosynthesis and existing seven-stop learning journey.
- Bring the activity into the first viewport.
- Preserve the story, demonstration, playable model, picture notes, optional narration, text equivalents, progress and accessible controls.
- Keep a whole rooted plant, water flow inside the plant and a clearly labeled enlarged leaf view.
- Keep the real lesson routes, station names and state logic. Generated labels are exploratory and must not silently replace actual app content.
- Do not copy inaccurate model details from these images: confirm gas arrows, leaf-opening anatomy, chloroplast labels and active/completed states when building.
- On B, use singular “stoma” or plain “tiny opening” for one opening. Clarify that light provides energy.
- On A, do not replace the existing seven stations with the image's invented navigation labels.
- On C, align the completed Water state with the primary control label; use “Replay water route” after completion.
- Preserve the existing code-drawn diagram constraint unless the user deliberately changes the production asset approach. A generated preview does not by itself approve shipping generated science artwork.
- No live code was changed.

## Next deliverable after the user chooses
Write a detailed handoff for Luna with the selected direction, exact file changes, layout measurements, tokens, responsive rules, asset specifications, state behavior, accessible HTML/CSS/JS snippets, ordered implementation steps and bounded acceptance checks.

Verified source locations: dist/app.js; dist/index.html; dist/styles.css; dist/activity.css; dist/factory.js; dist/factory-art.js; dist/factory.css; dist/leaf-world.css. The site is dependency-free HTML/CSS/JavaScript ES modules with no build step. Read the actual current source before drafting snippets. Preserve existing learning and persistence behavior.

The handoff is intentionally not yet written because the user requested choosing the visual direction first.

