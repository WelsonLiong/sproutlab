# Game controllers

Connect a controller, open a game and press a controller button to make it available to the browser. Both games use the browser standard gamepad mapping. Keyboard and touch controls remain available.

| Action | Kart Cup | Nico’s forest |
| --- | --- | --- |
| Left stick / D-pad | Steer | Walk; turn equipment while holding it |
| Right stick | — | Camera |
| A / Cross | Drift; confirm menus | Interact, grab/release; confirm menus |
| X / Square | Drift | — |
| B / Circle | Brake | Back / close inspection / resume from pause |
| LT / L2 | Brake | — |
| LB / L1 or left-stick click | — | Run |
| Menu / Options | Start, pause, resume | Pause, resume |
| Y / Triangle | Toggle fullscreen | — |

In menus, D-pad up/down moves focus and A/Cross selects. D-pad left/right adjusts a focused inspection slider. In the creek gate panel, left/right turns the channel, A/Cross releases water and B/Circle returns to exploring. The explorer nickname can be entered using the keyboard before starting.

Stick input has an 18% deadzone and proportional movement. Unplugging an active controller pauses gameplay; reconnect and resume explicitly. Input is ignored while the page is hidden or unfocused. Unsupported mappings and unavailable/blocked browser gamepad access leave existing controls usable.

Implementation: `dist/gamepad-controls.js`, `dist/kart-race.js`, `dist/grove.js`. Uses the [browser Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API). Browser integration verification uses a simulated standard gamepad; no physical-controller test was performed.
