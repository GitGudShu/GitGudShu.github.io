import test from 'node:test';
import assert from 'node:assert/strict';
import { activeSectionId } from '../js/nav.js';

const SECTIONS = [
  { id: 'about', top: 800 },
  { id: 'work', top: 1600 },
  { id: 'beyond', top: 2600 },
  { id: 'resume', top: 3400 },
  { id: 'contact', top: 4200 },
];

test('returns null while above the first section', () => {
  assert.equal(activeSectionId(SECTIONS, 0, 68), null);
});

test('activates a section once its top crosses the nav offset', () => {
  assert.equal(activeSectionId(SECTIONS, 740, 68), 'about');
  assert.equal(activeSectionId(SECTIONS, 1540, 68), 'work');
});

test('keeps the last crossed section active between boundaries', () => {
  assert.equal(activeSectionId(SECTIONS, 2000, 68), 'work');
  // 3331 + 68 = 3399, one pixel short of resume's top at 3400.
  assert.equal(activeSectionId(SECTIONS, 3331, 68), 'beyond');
});

test('activates the final section at the bottom of the page', () => {
  assert.equal(activeSectionId(SECTIONS, 9999, 68), 'contact');
});

test('an empty section list never throws', () => {
  assert.equal(activeSectionId([], 500, 68), null);
});
