# Two-screen preview verification — 15 October 2026

- Changed routes: welcome / adventure trail (`#map`) and plant mystery (`#mystery`). Later lesson markup and styles retained.
- Local preview: http://127.0.0.1:4175/#map, server bound to loopback only.
- Browser inspected at desktop 1440px and phone 390px. Screenshots in `.impeccable/review/`: welcome-desktop, mystery-desktop, welcome-mobile, mystery-mobile.
- No phone horizontal overflow (document scroll width = 390px).
- Selecting a prediction updates pressed state and feedback, increments discoveries once, and reveals Follow the leaf. The link successfully opens the existing factory cartoon.
- Confirmed Low-data mode hides new artwork, and resetting settings restores it. Cleared only the test progress created on the new preview origin and left the welcome screen ready to use.
- Browser error log was empty during the primary flow. JavaScript syntax checks and Git whitespace check passed.
- Mechanical design detector on new CSS/JS returned no findings.
- Independent visual reviewer accepted all four captures, requested one copy-placement change, then scored it resolved with disposition `ship` after reviewing fresh desktop/mobile mystery captures.
- Fonts and artwork served locally; exact built-in imagegen prompts, WebP provenance sidecars and font licenses retained. Browser speech availability still depends on installed voices, as before.
- This is a local UI preview for user feedback, not a published release.
