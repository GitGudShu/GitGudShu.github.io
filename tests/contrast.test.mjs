import test from 'node:test';
import assert from 'node:assert/strict';
import {
  contrastRatio,
  relativeLuminance,
  parseTokens,
  REQUIRED_PAIRS,
} from '../tools/check-contrast.mjs';
import { readFile } from 'node:fs/promises';

test('relativeLuminance matches known anchors', () => {
  assert.equal(relativeLuminance('#ffffff'), 1);
  assert.equal(relativeLuminance('#000000'), 0);
});

test('contrastRatio is symmetric and matches the known black/white maximum', () => {
  assert.equal(contrastRatio('#000000', '#ffffff'), 21);
  assert.equal(contrastRatio('#ffffff', '#000000'), 21);
});

test('contrastRatio accepts shorthand hex', () => {
  assert.equal(contrastRatio('#fff', '#000'), 21);
});

test('parseTokens extracts both theme blocks', async () => {
  const css = await readFile(new URL('../css/tokens.css', import.meta.url), 'utf8');
  const { light, dark } = parseTokens(css);

  // Pinning the palette here would mean editing the test on every recolour, so
  // this checks the parser found two distinct themes the right way round.
  for (const key of ['--bg', '--text', '--text-faint', '--accent']) {
    for (const [name, theme] of [['light', light], ['dark', dark]]) {
      assert.match(theme[key] ?? '', /^#[0-9A-Fa-f]{3,8}$/, `${name} ${key} is not a hex colour`);
    }
    assert.notEqual(light[key], dark[key], `${key} is identical in both themes`);
  }

  const luminance = (hex) => parseInt(hex.slice(1, 3), 16) + parseInt(hex.slice(3, 5), 16)
    + parseInt(hex.slice(5, 7), 16);
  assert.ok(luminance(light['--bg']) > luminance(dark['--bg']), 'the light theme must be the lighter one');
});

test('every required pair meets its AA threshold in both themes', async () => {
  const css = await readFile(new URL('../css/tokens.css', import.meta.url), 'utf8');
  const themes = parseTokens(css);
  for (const themeName of ['light', 'dark']) {
    const tokens = themes[themeName];
    for (const { fg, bg, min } of REQUIRED_PAIRS) {
      const ratio = contrastRatio(tokens[fg], tokens[bg]);
      assert.ok(
        ratio >= min,
        `${themeName}: ${fg} on ${bg} is ${ratio.toFixed(2)}:1, needs ${min}:1`,
      );
    }
  }
});
