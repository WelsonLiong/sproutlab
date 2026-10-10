# Technical verification — 8 October 2026

These are agent-operated technical checks, not adult usability-test evidence.

## Checked in the local browser

- Illustrated map, seven stations, navigation and local discovery count.
- Induction prediction and explanatory response to the soil misconception.
- Five-scene story: manual navigation, progressive content and completion.
- Leaf lab: prediction required; all needs available makes glucose and oxygen; sunlight removed stops new food production; contrasting trials complete the station.
- Creek: unsuccessful flow feedback; successful 3×3 and 4×4 routes; both levels required for completion.
- Beep mission: both evidence sources required; incorrect sentence feedback; removing and replacing tiles; correct sentence opens privacy mission; covering the science question produces corrective feedback; three private details protected completes the mission.
- Assessment: wrong-answer explanation, full sequence, retry, 5/5 result and best-score display.
- Closure: empty reflection validation; written reflection saved; journal survives reload.
- Journal download returned a text file containing the test progress and reflection.
- Larger text, reduced motion and low-data selections persist after reload; low-data removes background artwork.
- Keyboard Enter opens the textbook clue. All game tiles and controls use native buttons/inputs and visible focus styles.
- WebMCP read_learning_progress returned actual completion state; open_learning_station navigated without completing an activity.
- Mobile 390×844 and normal desktop layout visually inspected. Mobile map document width was 390px with no horizontal overflow. Desktop and mobile screenshots retained locally in docs/review-v2.
- Browser console returned no captured warnings or errors during the final check.
- Test progress was cleared through Settings after a journal copy was saved; shipped source contains no pupil records.

## Source and document checks

- JavaScript syntax checked with Node.
- Cartoon assets converted to WebP; combined character atlas and world background approximately 558 KB.
- Full textbook and supplied third-person game assets are excluded from distribution.
- Seven-page PDF rebuilt after the redesign and checked for overflow by its generator. Page renders reviewed separately.

## Limits and remaining human work

- No two-adult usability tests have been conducted or claimed. Use usability-test.md and replace the pending report section with genuine findings and improvements.
- The 19-minute duration is a design estimate, not a measured classroom duration.
- Device speech voices vary. This run did not evaluate narration with a real child or claim a formal screen-reader/accessibility audit.
- Confirm student details, lecturer acceptance of a custom website, exact KPM subdomain wording and sharing access before formal submission.
- The third-person game remains a future integration; the supplied assets are not loaded by the current site.

## Cartoon and playable leaf factory — 11 October 2026

- Watched the automatic cartoon transition into the worked demonstration, then into the pupil start prompt. Pause and resume checked.
- Completed water delivery, all three carbon dioxide bubbles and sunlight-slider interaction; production began automatically and both products opened their explanations.
- Replayed the factory and supplied gas and sunlight first: without water, the process did not start. No assessment question is added by this activity.
- Tested the alternative CO2 button and native keyboard operation of the water controls and sunlight slider.
- Checked mobile 390×844 layout (document width 390px); corrected root-label clipping, product-label overlap and cropped artwork.
- Checked larger-text, reduced-motion and low-data preferences; restored the original preferences without clearing the user’s discoveries.
- Verified that Picture notes still opens the original five-scene explanation and links back to the new experience. Both modes use the existing story completion badge.
- No captured browser console warnings or errors during the full new-experience run. Device voice quality is not assessed; captions remain available throughout.
- Updated teacher mapping and the seven-page documentation draft. This remains technical verification, not the required real-adult usability evidence.

### Illustrated hideout revision
Replaced the rejected flat SVG factory with two generated environment illustrations, character controls within the scene, animated water and gas characters, sunlight rays and animated product characters. The original story notes and the teaching sequence remain. The scientific model note now explicitly distinguishes the imaginary room and faces from real leaf anatomy.

- Completed the illustrated demonstration and pupil cycle on desktop: all water and gas deliveries, sunlight, glucose and oxygen explanations, completion and replay worked.
- Inspected the portrait illustration and active controls at 390×844. No horizontal overflow was observed; water, sunlight and carbon dioxide controls remained usable, including keyboard input.
- Saved desktop and phone screenshots in `docs/review-v2/`. No captured console warnings or errors in this revision.
- Checked the illustrated scene with reduced movement and low-data mode enabled, then restored the original preferences without clearing discoveries.
- Re-rendered and visually reviewed all seven documentation pages after the artwork record update.
