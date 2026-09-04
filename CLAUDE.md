# CLAUDE.md — theme-dont-fork

You are working in a design-token-driven multi-brand demo. Before writing any CSS or HTML, read `CONTRACT.json` in this same directory — it is the authoritative, machine-readable spec for this system. This file is the short version; `CONTRACT.json` is the one with teeth.

## What this system is

One component library, three brands (Aurora, Ember, DGE / Govt Enablement), zero component overrides. Brand lives in exactly one layer — switching `[data-brand]` remaps alias tokens to different primitives. Nothing above that layer knows brands exist.

## The rule that matters most

**Components consume `--semantic-*` or `--alias-*` tokens only. Never `--primitive-*` directly, never a brand name, never a hardcoded hex value.** This isn't a style preference — it's what makes "zero overrides" true by construction rather than by discipline. `CONTRACT.json` → `globalRules.never` has the full list. Read it before writing a single rule.

## Before you generate anything

1. Check `CONTRACT.json` → `components` for the component you're touching or extending. If it already has a `variants` object, follow that exact naming convention — don't invent a new one.
2. Check `CONTRACT.json` → `globalRules.always` for the accessibility and motion requirements every interactive element in this file already follows.
3. If your change needs a token that doesn't exist yet, add it to `CONTRACT.json` first, and compute its contrast ratio before using it. Don't ship an unverified colour.

## Current task context

See `CONTRACT.json` → `components.toast.phase4Task` for the live task spec. Do not read this as "build a toast component" in the abstract — a partial one already exists, and the task is to extend it correctly, matching the `.btn-primary`/`.btn-secondary` modifier-class precedent already in the codebase.

## What "done" looks like

Your output should pass the guardrail pipeline (Phase 3) without a human needing to fix a token violation, a missing focus state, or a contrast failure. If it doesn't pass on the first try, that's fine and expected — log why, don't quietly patch around the guardrail.
