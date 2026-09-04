# theme, don't fork

A live demonstration of multi-brand theming through design tokens. One set of components, three brands, **zero component overrides** — switch the brand and colour, shape, background pattern and artwork all resolve from the token layer.

**[Open the demo →](https://theme-dont-fork.vercel.app)** · press `1` `2` `3` to switch brands

---

## What this proves

A design system's job isn't speed. It's quality by construction.

Most multi-brand systems theme colour and stop there. When a brand needs a different corner radius, a different background device, or different artwork, someone forks a component — and from that point the system is decorative rather than structural.

This demo shows the alternative: **brand lives in exactly one layer, and everything above it is untouched.**

Switching brand remaps **alias → primitive**. Nothing else moves. Every component reads semantic tokens and has no knowledge that brands exist.

## The architecture

```
BRAND MODE      aurora · ember · deg (DGE)          ← the only thing that changes
    ↓
SEMANTIC        color.surface.hero              ← purpose. never brand-aware
    ↓
ALIAS           brand.700 · brand.shape.cta     ← the remap surface
    ↓
PRIMITIVE       raw values, ramp steps          ← values only
    ↓
COMPONENTS      Image Hero · CTA Section · Product Card · atoms
    ↓
PATTERNS        composed flows
```

## What to inspect

Open the CSS — it's ordered exactly as the architecture, with a banner per layer.

- **`[data-brand="…"]` blocks** — the entire brand definition. Three of them, ~8 lines each. That's what a brand *is* in this system.
- **The semantic layer** — every token names a purpose. No brand names, no values.
- **The components** — search for `brand.` inside any component rule. There are none. That's the "zero overrides" claim, and it's structural rather than disciplined: a component *cannot* reference a brand value, so it can't drift.
- **`--alias-device-angle`, `--alias-radius-cta`, `--alias-pattern-name`** — non-colour tokens. Geometry, shape language and the background device theme too, not just palette.

## What it themes

| | |
|---|---|
| **Colour** | surfaces, text, actions, feedback |
| **Shape** | corner radii differ per brand — pill, squared, soft |
| **Geometry** | the hero's background device skews to a per-brand angle |
| **Pattern** | each brand has its own background device — plus-grid, diagonal dash, gov-frame |
| **Assets** | the hero artwork itself swaps per brand |

The token inspector on the right shows each chain resolving live as you switch.

## Notes

**Aurora** and **Ember** are invented demo brands. **DGE** maps Department of Government Enablement tokens (Deep Sapphire + Flamingo) to prove a real entity can sit on the same zero-override stack.

Single file, no build step, no dependencies. Fonts load from Google Fonts; everything else is inline.

Accessibility: visible focus rings throughout, `aria-pressed` on the toggles, and `prefers-reduced-motion` honoured.

---

**Jonathan Le Coz** — Experience Design Leader
[jonny.socialdynamix.co](https://jonny.socialdynamix.co)
