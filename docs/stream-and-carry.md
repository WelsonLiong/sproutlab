# Stream and object handling · 2 November 2026

The creek now starts in a visible rock-lined woodland spring. Its shallow ribbon follows the terrain instead of using a raised tube, and the artificial stream collision wall is removed. A scrolling current texture and foam travel downstream. Clearing each obstruction advances the wet reach gradually to the next blockage; the gate and root-delivery puzzle still control the downstream route.

Movable creek objects and campaign branches/vines rise to waist level while held and fall under gravity when released. The existing Release prompt remains visible while holding. Pointer dragging also lifts movable objects. Reduced movement snaps the lift and disables current-texture scrolling. Object positions continue to save as ground coordinates, without introducing a new save format.

Implementation: `dist/grove-water.js`, `dist/grove.js`, and `dist/grove-campaign.js`.

Isolated browser checks passed for E pickup/release, rock lift of approximately 0.9 world units, landing at terrain height, wet-front movement from 0.535 to the next obstruction at 0.71, crossing from one bank through the stream, campaign branch pickup/release and landing, and a 390px layout without horizontal overflow. No browser script errors occurred. Desktop carry/source and mobile screenshots are in ignored `.taste-skill/`. Syntax and whitespace checks pass. These checks do not constitute a replay of every campaign chapter.

## Water depth and carry-height correction

The creek is recessed into the terrain with an uneven bed and irregular banks. Water uses a deeper centre colour, shallow edge colour, animated surface geometry and moving ripple normals that catch scene lighting. Foam is scattered across the flow rather than placed in a dotted line. No water collision surface was added.

Carry height now accounts for each object’s visible bounding-box centre. The target is 0.68 world units above the ground, matching Nico’s cartoon waist rather than raising the object base. The browser check measures the rock centre around 0.71 units (including its ground offset), verifies campaign branches at 0.68, confirms ground landing, progressive flow and stream crossing, and reports no script errors. Reduced movement disables animated ripples and snaps the carry transition.
