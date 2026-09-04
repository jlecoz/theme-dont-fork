# DGE resolve animation — Lottie brief

Drop the exported file here as **`dge-resolve.json`** (Bodymovin / LottieFiles).
The demo auto-loads it for the DGE hero and falls back to CSS if missing.

## Goal

One continuous SVG composition (not a crossfade of two assets):

1. **Token geometry** — nested square frames + flamingo rule (system mark)
2. **Combination unlock** — frames counter-rotate, then reshape toward the crest oval
3. **Resolve** — geometry morphs / merges into the official emblem silhouette
4. **Life** — eagle breathes (subtle wing weight / head settle), loop or hold

Render mode in-page: **SVG** (`renderer: 'svg'`).

## After Effects recipe (recommended)

1. Import `dge-emblem.svg` and **ungroup / release to layers** until you can isolate:
   - shield / red field
   - falcon body
   - left wing, right wing (or wing masses)
   - crossed arms
   - ribbon (optional)
2. Rebuild the opening as **Shape Layers** (squares / rounded rects / ellipses) using brand colours:
   - Deep Sapphire `#063360`
   - Flamingo `#EF3F43`
   - white / mid blue accents
3. Use **shape morphing** (path keyframes on the same shape group, or the Ae morph tools you already use) so square → rounded → oval → crest outer path feels like one stroke rewriting itself — not opacity dissolves.
4. Time the emblem detail (feathers, arms) as a **progressive reveal** parented to the resolved silhouette (trim paths / opacity / stroke reveal), so detail *arrives inside* the morph rather than popping on.
5. Eagle life: 2–4° wing rock or scaleY breathe on wing layers, 6–10s gentle loop after resolve.
6. Export with **Bodymovin** / LottieFiles plugin:
   - Glyphs as shapes (no document fonts)
   - Hidden layers off
   - Match name `dge-resolve.json`

## Why not CSS alone

CSS can rotate and crossfade. It cannot interpolate arbitrary SVG path networks into a heraldic crest. That interpolation is what Lottie (or Rive / GSAP MorphSVG with prepared paths) is for.

## Rive (optional later)

Use Rive if you need **interactive state machines** (hover to wake the eagle, scrub the unlock). For a linear resolve loop, Lottie is enough — and you already know the pipeline.
