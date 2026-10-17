# Persistent bottom progression — 16 October 2026

Replaces the previous top-bar placement at the owner’s request. The same activity navigation is now fixed to the bottom of the viewport from initial page load through scrolling. Each onward control has a closed lock before its label while unavailable and an open lock when ready. Disabled behavior and validation remain unchanged.

The bottom bar accounts for safe-area insets. Its measured height reserves body space and scroll padding so final page content stays reachable. Toast messages sit above the bar. The bar remains in the document’s logical navigation order at the end of the activity; resizing and route cleanup retain the existing observer lifecycle.

Verification: all eight learning routes, initial and scrolled bottom anchoring, visible locked links and blocked navigation, closed-to-open lock changes, picture notes, detective missions, all quiz questions, both creek rescues, demonstration progression, experiment completion and reflection. Desktop 1440×1000 and phone 390×844 and 320×844 layouts passed. Desktop and mobile screenshots were inspected. JavaScript syntax and changed-file whitespace checks passed.

## Single forward action refinement

The bar now reuses one forward button. Labels are explicit: Next mission, Next level, Next question, Next picture or Next step, followed by Next adventure only on the activity’s final stage. Factory transitions name their destination (cartoon, demonstration, your turn), and the final journal action is Next: my journal. The closed/open lock and disabled behavior follow the currently represented action. Earlier adventure links remain suppressed while an internal stage is pending.

Verified exactly one visible forward control across all eight learning routes; both detective mission handoffs and final privacy gate; all five quiz questions and results; both creek rescues; all picture notes; cartoon-to-demonstration progression; disabled click protection; lock icon changes; and desktop/390 px/320 px layouts. Screenshots were inspected.
