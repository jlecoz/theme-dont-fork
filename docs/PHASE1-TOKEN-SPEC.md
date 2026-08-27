# Phase 1 — Token Architecture Spec: theme-dont-fork

## Source-of-truth decision
No design tool sits behind this project — there's no Figma file, no Tokens Studio export. It's a single hand-authored `index.html`. So the reconciliation Phase 1 normally forces is trivial here by construction: **the codebase is the sole source of truth**, because it's the only one that exists. Worth stating explicitly rather than leaving it implicit — Phase 2's contract layer will document this plainly for whichever agent reads it next.

## Changes made (verified, not assumed)

**1. Fixed the real AA failure from Phase 0.**
`--semantic-text-soft` pointed at `neutral-400` (#8A9A9D) — measured at 2.69–2.92:1 against its actual usage backgrounds, against a 4.5:1 requirement. Now points at `neutral-700` (#33403F) — re-verified at 9.96–10.79:1. Comfortably clears AA, clears AAA too.

**2. Added the two missing feedback tokens.**
Only `success` (#138000) and `error` (#D0421B) existed. Added `warning` (#8A5A00) and `info` (#1D5FA8) — both chosen and verified to the same standard as the existing pair: AA-safe even if used as text, not just as a border or dot (5.93:1 and 6.45:1 on white, versus the existing pair's 5.10:1 and 4.69:1). All four feedback tokens now sit at a consistent contrast bar. This unblocks Phase 4 — the Toast can now genuinely support all four variants.

**3. Documented the motion tokens as an intentional 4th category, not a naming gap.**
`--dur-*`, `--ease-*`, `--dist-*`, `--stagger`, `--seq` don't fit the brand/semantic/alias/primitive taxonomy because they were never meant to — motion doesn't vary by brand in this system. Rather than force a rename that would misrepresent what they are, added a banner comment stating this explicitly. An agent (or a new contributor) reading the CSS now gets the reasoning, not just the pattern.

## Verification

Every number above was recomputed after the edit, not just asserted — see `phase1-changes.patch` for the literal diff. This is the same standard Phase 0 was held to.

## Files delivered
- `theme-dont-fork-index.html` — the patched file, ready to replace the one in the repo
- `phase1-changes.patch` — the diff, if you'd rather `git apply` it than replace the whole file

## What's next
Phase 2 — the Legibility Layer. The token layer is now clean enough to write a real component contract against. That's structured, machine-parseable metadata for the components the Toast work will touch — not documentation for a human, a contract for an agent.
