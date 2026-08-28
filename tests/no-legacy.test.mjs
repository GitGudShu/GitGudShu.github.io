import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const GONE = [
  'css/style.css',
  'js/script.js',
  'pages/BUT/home.html',
  'assets/images/Logo_dark.png',
  'assets/images/Logo_light.png',
  'assets/images/Thumbs.db',
  'assets/images/but/Optimops_DBv1.mwb',
];

const KEPT = [
  'CV-FR.pdf',
  'favicon.svg',
  'assets/hero.jpg',
  'assets/portrait.jpg',
  'assets/images/profile.png',
];

const exists = async (path) => {
  try {
    await access(new URL(`../${path}`, import.meta.url));
    return true;
  } catch {
    return false;
  }
};

test('every legacy file is gone', async () => {
  for (const path of GONE) {
    assert.equal(await exists(path), false, `${path} should have been deleted`);
  }
});

test('the old per-project BUT pages are gone', async () => {
  assert.equal(await exists('pages/BUT/pages'), false, 'pages/BUT/pages should be deleted');
});

test('every retained asset survived', async () => {
  for (const path of KEPT) {
    assert.equal(await exists(path), true, `${path} must not be deleted`);
  }
});

test('all bachelor reports survived', async () => {
  const files = await readdir(new URL('../pages/BUT/rapports', import.meta.url));
  assert.ok(files.length >= 18, `expected the full report set, found ${files.length}`);
});

test('no stylesheet outside tokens.css contains a colour literal', async () => {
  const files = await readdir(new URL('../css', import.meta.url));
  for (const file of files) {
    if (file === 'tokens.css') continue;
    const css = await readFile(new URL(`../css/${file}`, import.meta.url), 'utf8');
    const literals = css.match(/#[0-9a-fA-F]{3,8}\b|\brgba?\([^)]*\)|\bhsla?\([^)]*\)/g) ?? [];
    // color-mix() with #000000 for dark shadows is confined to tokens.css.
    assert.deepEqual(literals, [], `${file} contains colour literals: ${literals.join(', ')}`);
  }
});
