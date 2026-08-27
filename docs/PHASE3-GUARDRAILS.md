# Phase 3 — Guardrails: theme-dont-fork
**Date:** 2026-08-27 · **Status:** built and verified (pass path AND fail path both proven)

## What was built
1. `package.json` — minimal Node scaffold (one dev dependency), turning the static repo into one with a runnable guard step. No framework, no build — the demo stays a static HTML file.
2. `scripts/check-tokens.mjs` — the token guardrail. Enforces that the **component library** consumes tokens only, never raw colour. Reads the system/harness boundary from `CONTRACT.json` rather than guessing.
3. `scripts/check-a11y.mjs` — the accessibility guardrail. Computes WCAG contrast on all 13 text pairings across the three brands; fails below AA (4.5:1).
4. `.github/workflows/guardrails.yml` — runs both on every push and PR to main, identically whether a human or an AI agent opened the change.
5. `CONTRACT.json` → new `boundary` block — the declared, explicit line between the token-governed **system** and the exempt demo **harness**. The architectural decision, documented in the contract.

## What the guardrail found (and why that's the point)
The first run flagged 36 rules. Triaged honestly, they split three ways — and only some were real:
- **Most were false positives** from a crude first draft that couldn't tell the component library from the demo's own scaffolding (browser-chrome mockup, token inspector, stage labels). Fixed by declaring the boundary in the contract and having the guard read it — dropped to 4 real flags.
- **Two were genuine tokenisation gaps:** the per-brand SVG artwork base fills (`#EAF6F8`, `#FFFFFF`) were hardcoded while every sibling fill in the same rule used tokens. Fixed with a new `--semantic-art-base` token.
- **One was a genuine component gap:** the toast checkmark used `#fff`. Pointed at `--primitive-neutral-0`.
- **One was a boundary mis-file:** `.atom h4` is a demo-tile caption (harness), not a system component. Moved to the harness list — a correction to my Phase 2 boundary, not a code change.

Separately, Phase 3 fixed a **real accessibility failure** the token work surfaced: `#5A6866` shell labels measured 2.71–3.26:1 on the dark panels (below AA). Swapped to `#7E8E90` (4.63:1 worst-case), verified. This lives in the harness, so the token guard exempts it — but leaving a sub-3:1 contrast on an accessibility-led demo page was the wrong look, so it was fixed regardless.

**Note the discipline:** the guardrail reached "0 violations" by fixing three real inconsistencies in the code, not by loosening the rule until it fell silent. That distinction is the whole value.

## How it was verified
- Both guards pass on the real code (exit 0).
- **The fail path was proven, not assumed:** a raw `#ff0000` was injected into a real `.btn-primary` rule; the token guard caught it and failed (exit 1); after revert it passed again. A guard that's never failed could be silently broken — this one demonstrably works.
- The a11y guard would have **caught the original Phase 0 bug**: had `text-soft` still been `neutral-400`, that pair fails here and blocks the merge. The gate catches the real historical defect.

## What this proves for the pitch
This is the concrete answer to "when the system generates the product, who guarantees quality?" — the quality is guaranteed *by construction*: a token violation or contrast regression cannot merge, human- or agent-authored. The next phase (Phase 4) points an actual agent at this system and logs whether the guardrails hold against real generated output.
