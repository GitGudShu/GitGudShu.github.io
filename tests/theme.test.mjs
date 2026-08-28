import test from 'node:test';
import assert from 'node:assert/strict';
import { THEMES, STORAGE_KEY, resolveTheme, nextTheme } from '../js/theme.js';

test('exposes exactly the two supported themes', () => {
  assert.deepEqual(THEMES, ['light', 'dark']);
});

test('storage key is stable', () => {
  assert.equal(STORAGE_KEY, 'tc-theme');
});

test('an explicitly stored theme always wins over the system preference', () => {
  assert.equal(resolveTheme('light', true), 'light');
  assert.equal(resolveTheme('dark', false), 'dark');
});

test('falls back to the system preference when nothing is stored', () => {
  assert.equal(resolveTheme(null, true), 'dark');
  assert.equal(resolveTheme(null, false), 'light');
});

test('an unrecognised stored value is ignored, not trusted', () => {
  assert.equal(resolveTheme('banana', true), 'dark');
  assert.equal(resolveTheme('', false), 'light');
});

test('nextTheme flips, and treats anything unknown as light so the first click goes dark', () => {
  assert.equal(nextTheme('light'), 'dark');
  assert.equal(nextTheme('dark'), 'light');
  assert.equal(nextTheme('banana'), 'dark');
});
