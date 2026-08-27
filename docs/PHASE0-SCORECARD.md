# Phase 0 — Maturity Scorecard: theme-dont-fork
**Baseline date:** 2026-08-27 · **Method:** direct repo audit (cloned, inspected, and computed — not inferred from the README)

| Dimension | Score (1–5) | Evidence |
|---|---|---|
| Token coverage | **4** | Verified real 4-layer architecture in code (brand → semantic → alias → primitive), ~65 custom properties spanning colour, shape, geometry, pattern, typography, motion |
| Naming consistency | **3** | Alias/primitive/semantic naming is clean throughout — except 7 tokens (`--dist-*`, `--dur-*`, `--ease-*`, `--n`, `--scrolled`, `--seq`, `--stagger`) sit outside the taxonomy entirely, added ad hoc |
| Documentation machine-readability | **1** | README is genuinely strong for a human reader. Zero structured, machine-parseable metadata exists — no component contract, no JSON/YAML prop schema. This is Phase 2's whole job. |
| Governance clarity | **1** | No CONTRIBUTING, no CODEOWNERS, no defined process for adding a token or component |
| AI-tool exposure | **1** | No `CLAUDE.md`, no agent context file. No agent has ever been deliberately pointed at this codebase with contract awareness. |
| Accessibility (spot-checked, not assumed) | **3** | Structural a11y is genuinely strong and verified real: `focus-visible` throughout, correct `aria-pressed`/`aria-checked` usage, `prefers-reduced-motion` properly honoured. **But:** `--semantic-text-soft` fails WCAG AA contrast — 2.69–2.92:1 against its card backgrounds, needs 4.5:1. Real, unfixed defect. |

## Other findings worth carrying into Phase 1–4

- **A Toast already exists** — but as a single hardcoded success-state instance, no variant classes, wired to nothing beyond the shared brand-switch mechanism. Only 2 of the 4 needed feedback tokens exist in the semantic layer (`success`, `error` — `warning` and `info` are missing entirely).
- **No prior AI-agent-authored contributions exist** — this pilot will produce the first such data point, not extend an existing failure log.
- Everything above was verified by cloning the repo and reading the actual code (`git clone`, `grep`, and a real WCAG contrast calculation on the token values) — not inferred from the README's claims.

## What this means for scope

Phase 4's test case is now sharper: **extend the existing single-variant Toast into a real 4-variant component**, not build one from zero — genuinely faster, and a more honest claim than "built from scratch." Phase 1 has one concrete, real task before anything else: add the missing `warning`/`info` feedback tokens and fix `text-soft`'s contrast failure. Fixing a real, pre-existing accessibility bug as part of this pilot is a stronger case-study beat than a system that had nothing to catch.
