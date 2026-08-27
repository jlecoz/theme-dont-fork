#!/usr/bin/env node
/**
 * TOKEN GUARDRAIL — theme-dont-fork
 *
 * Enforces the core contract rule: the COMPONENT LIBRARY consumes tokens, never raw values.
 * This is what makes "zero overrides, by construction" true rather than aspirational.
 *
 * The boundary between the token-governed system and the demo harness is declared in
 * CONTRACT.json -> boundary. This script reads that boundary rather than guessing —
 * the architectural decision lives in the contract, the script only enforces it.
 *
 * Raw hex is LEGAL in: token definitions (:root, [data-brand]) and the demo harness.
 * Raw hex is BANNED in: component-library rules. That is the line that maps to the claim.
 */

import { readFileSync } from 'node:fs';

const contract = JSON.parse(readFileSync(new URL('../CONTRACT.json', import.meta.url), 'utf8'));
const SYSTEM = contract.boundary.systemSelectorPrefixes;
const HARNESS = contract.boundary.harnessSelectorPrefixes;

const HTML = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const styleMatch = HTML.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) { console.error('✖ No <style> block found.'); process.exit(1); }
const css = styleMatch[1];

const HEX_RE = /#[0-9A-Fa-f]{3,8}\b/g;
const ruleRe = /([^{}]+)\{([^{}]*)\}/g;

// A rule is IN the governed system only if its selector matches a system prefix
// AND does not match a harness prefix (harness wins ties — it's the explicit exemption).
const matchesAny = (sel, prefixes) => prefixes.some(p => sel.includes(p));
const isGoverned = (sel) => matchesAny(sel, SYSTEM) && !matchesAny(sel, HARNESS);

const violations = [];
let m;
while ((m = ruleRe.exec(css)) !== null) {
  const selector = m[1].trim();
  const body = m[2];
  if (selector.startsWith('@') || selector.includes('@keyframes')) continue;
  if (selector === ':root' || selector.startsWith('[data-brand')) continue; // token defs
  if (!isGoverned(selector)) continue; // harness / scaffold — exempt by contract

  const hexHits = body.match(HEX_RE);
  if (hexHits) {
    violations.push({
      selector: selector.slice(0, 60),
      found: [...new Set(hexHits)].join(', ')
    });
  }
}

if (violations.length === 0) {
  console.log('✔ Token guardrail passed.');
  console.log('  Component library uses only tokens — 0 raw colour values in governed rules.');
  console.log('  (Token definitions and the demo harness are exempt by CONTRACT.json -> boundary.)');
  process.exit(0);
}

console.error(`✖ Token guardrail FAILED — ${violations.length} violation(s) in the component library:\n`);
for (const v of violations) {
  console.error(`  ${v.selector}\n    raw colour: ${v.found} — must resolve through a --semantic-* / --alias-* token\n`);
}
process.exit(1);
