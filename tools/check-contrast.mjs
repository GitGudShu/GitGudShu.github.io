#!/usr/bin/env node
/**
 * Verifies every text/background token pair in css/tokens.css meets WCAG AA.
 * Zero dependencies. Exits non-zero on the first failing theme.
 */
import { readFile } from 'node:fs/promises';

/** Pairs that must pass, expressed as token names. min: 4.5 body, 3 large text. */
export const REQUIRED_PAIRS = [
  { fg: '--text', bg: '--bg', min: 4.5 },
  { fg: '--text', bg: '--surface', min: 4.5 },
  { fg: '--text', bg: '--surface-raised', min: 4.5 },
  { fg: '--text-muted', bg: '--bg', min: 4.5 },
  { fg: '--text-muted', bg: '--surface', min: 4.5 },
  { fg: '--text-faint', bg: '--bg', min: 4.5 },
  { fg: '--text-faint', bg: '--surface', min: 4.5 },
  { fg: '--accent', bg: '--bg', min: 4.5 },
  { fg: '--accent', bg: '--surface', min: 4.5 },
  { fg: '--accent-contrast', bg: '--accent', min: 4.5 },
  { fg: '--border-strong', bg: '--bg', min: 3 },
];

export function srgbToLinear(channel) {
  return channel <= 0.04045
    ? channel / 12.92
    : Math.pow((channel + 0.055) / 1.055, 2.4);
}

function expand(hex) {
  const raw = hex.trim().replace(/^#/, '');
  if (raw.length === 3) return raw.split('').map((c) => c + c).join('');
  return raw.slice(0, 6);
}

export function relativeLuminance(hex) {
  const full = expand(hex);
  const [r, g, b] = [0, 2, 4].map((i) =>
    srgbToLinear(parseInt(full.slice(i, i + 2), 16) / 255),
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(hexA, hexB) {
  const a = relativeLuminance(hexA);
  const b = relativeLuminance(hexB);
  const [hi, lo] = a >= b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Extracts the light block (`:root {`) and the dark block
 * (`[data-theme="dark"] {`) as flat token maps. Only hex values are captured;
 * derived tokens such as shadows and gradients are ignored.
 */
export function parseTokens(css) {
  const grab = (selector) => {
    const start = css.indexOf(selector);
    if (start === -1) throw new Error(`Selector not found in tokens.css: ${selector}`);
    const open = css.indexOf('{', start);
    const close = css.indexOf('}', open);
    const body = css.slice(open + 1, close);
    const map = {};
    for (const line of body.split('\n')) {
      const m = line.match(/^\s*(--[a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\s*;/);
      if (m) map[m[1]] = m[2];
    }
    return map;
  };
  return { light: grab(':root {'), dark: grab('[data-theme="dark"] {') };
}

async function main() {
  const css = await readFile(new URL('../css/tokens.css', import.meta.url), 'utf8');
  const themes = parseTokens(css);
  let failures = 0;
  for (const themeName of ['light', 'dark']) {
    const tokens = themes[themeName];
    for (const { fg, bg, min } of REQUIRED_PAIRS) {
      if (!tokens[fg] || !tokens[bg]) {
        console.error(`MISSING ${themeName}: ${fg} or ${bg} is not defined`);
        failures += 1;
        continue;
      }
      const ratio = contrastRatio(tokens[fg], tokens[bg]);
      const ok = ratio >= min;
      if (!ok) failures += 1;
      console.log(
        `${ok ? 'PASS' : 'FAIL'}  ${themeName.padEnd(5)} ${fg} on ${bg}  ` +
        `${ratio.toFixed(2)}:1 (min ${min}:1)`,
      );
    }
  }
  if (failures > 0) {
    console.error(`\n${failures} contrast failure(s).`);
    process.exit(1);
  }
  console.log('\nAll contrast pairs pass WCAG AA.');
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('check-contrast.mjs')) {
  await main();
}
