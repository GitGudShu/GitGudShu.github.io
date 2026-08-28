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
  assert.equal(light['--bg'], '#E9E4F0');
  assert.equal(dark['--bg'], '#1E1A26');
  assert.equal(light['--text-faint'], '#6B6379');
  assert.equal(dark['--text-faint'], '#9691A6');
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
