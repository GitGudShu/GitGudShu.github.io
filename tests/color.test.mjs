import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { SCENE_IDS, renderScene } from '../js/scenes.js';
import { LETTERS, letterHasVideo, letterVideoId } from '../js/data/letters.js';
import { stageFor, purrLength, TO_CAT, TO_OPEN, FOUND_KEY, DESTINATION } from '../js/secret.js';
import { color } from '../js/i18n/color.js';
import { music } from '../js/i18n/music.js';
import { LANGS, translate } from '../js/i18n/index.js';

const page = () => readFile(new URL('../the-color-i-was-chasing.html', import.meta.url), 'utf8');

test('the button only becomes a cat at ten, and only a door at twenty', () => {
  assert.equal(TO_CAT, 10);
  assert.equal(TO_OPEN, 20);
  for (let i = 0; i < 10; i += 1) assert.equal(stageFor(i), 'dot', `click ${i}`);
  for (let i = 10; i < 20; i += 1) assert.equal(stageFor(i), 'cat', `click ${i}`);
  for (const i of [20, 21, 99]) assert.equal(stageFor(i), 'open', `click ${i}`);
});

test('purrs grow with attention, then stop growing', () => {
  assert.equal(purrLength(10), 2);
  assert.equal(purrLength(13), 5);
  assert.ok(purrLength(19) <= 6);
  assert.ok(purrLength(999) <= 6);
  assert.equal(purrLength(0), 2);
});

test('the door and its memory key are stable', () => {
  assert.equal(DESTINATION, 'the-color-i-was-chasing.html');
  assert.equal(FOUND_KEY, 'tc-colour-found');
});

test('the button is labelled at every stage, in both languages', () => {
  for (const key of ['m.secret.dot', 'm.secret.cat', 'm.secret.open']) {
    for (const lang of LANGS) {
      assert.notEqual(translate(music, lang, key), key, `missing ${lang}: ${key}`);
    }
  }
});

test('every scene draws itself without colour literals or NaN', () => {
  assert.equal(SCENE_IDS.length, 6);
  for (const id of SCENE_IDS) {
    const svg = renderScene(id);
    assert.match(svg, /^<svg[\s>]/, `${id} is not an svg`);
    assert.match(svg, /<\/svg>$/, `${id} is unterminated`);
    assert.match(svg, /aria-hidden="true"/, `${id} is not decorative`);
    assert.doesNotMatch(svg, /#[0-9a-fA-F]{3,8}\b/, `${id} contains a colour literal`);
    assert.doesNotMatch(svg, /NaN|undefined/, `${id} emitted junk`);
  }
});

test('an unknown scene throws rather than rendering an empty box', () => {
  assert.throws(() => renderScene('nope'), /Unknown scene/);
});

test('every scene on the page exists, and every scene is used', async () => {
  const html = await page();
  const used = [...html.matchAll(/data-scene="([^"]+)"/g)].map((m) => m[1]);
  assert.ok(used.length, 'no scenes on the page');
  for (const id of used) assert.ok(SCENE_IDS.includes(id), `data-scene="${id}" matches nothing`);
  for (const id of SCENE_IDS) assert.ok(used.includes(id), `${id} is never placed`);
});

test('nobody is merged with anybody else', () => {
  assert.equal(LETTERS.length, 26);
  const ids = LETTERS.map((l) => l.id);
  assert.equal(new Set(ids).size, ids.length, 'a letter id is reused');
  // The pairs the journal talks about together still get a letter each.
  for (const pair of [['takanashi', 'kato'], ['coker', 'larkin'], ['almond', 'mizusato']]) {
    for (const id of pair) assert.ok(ids.includes(id), `${id} was folded into somebody else`);
  }
});

test('every letter has a name, a work and a body in both languages', async () => {
  const html = await page();
  for (const letter of LETTERS) {
    assert.match(html, new RegExp(`data-letter="${letter.id}"`), `${letter.id} has no player slot`);
    assert.ok(letter.composer.length > 1, `${letter.id} has no composer name`);
    for (const field of ['work', 'body']) {
      for (const lang of LANGS) {
        const key = `c.letters.${letter.id}.${field}`;
        assert.notEqual(translate(color, lang, key), key, `missing ${lang}: ${key}`);
      }
    }
  }
});

test('an unset link leaves the letter quiet rather than broken', () => {
  assert.equal(letterHasVideo({ video: '' }), false);
  assert.equal(letterHasVideo({}), false);
  assert.equal(letterHasVideo({ video: 'https://youtu.be/dQw4w9WgXcQ' }), true);
  assert.equal(letterVideoId({ video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }), 'dQw4w9WgXcQ');
});

test('the page ships with no embed and contacts nobody on load', async () => {
  const html = await page();
  assert.doesNotMatch(html, /<iframe/, 'no iframe before a click');
  assert.doesNotMatch(html, /youtube\.com|youtu\.be|ytimg\.com/, 'no third-party reference in the markup');
  const js = await readFile(new URL('../js/letters.js', import.meta.url), 'utf8');
  assert.match(js, /youtube-nocookie\.com/, 'the embed must use the no-cookie host');
});

test('the page is reachable by address but kept out of search', async () => {
  const html = await page();
  assert.match(html, /<meta name="robots" content="noindex">/);
  assert.match(html, /data-page="color"/);
  assert.match(html, /href="music\.html"/, 'it should lead back where it came from');
});

test('the music page hides the way in without hiding it from a reader of the source', async () => {
  const html = await readFile(new URL('../music.html', import.meta.url), 'utf8');
  assert.match(html, /data-secret-sentinel/, 'no sentinel to trip');
  assert.match(html, /id="secret"/, 'no button');
  assert.match(html, new RegExp(DESTINATION.replace('.', '\\.')), 'the address should be in the source');
  assert.match(html, /aria-hidden="true"/, 'it must start out of the tab order');
});

test('the essay keeps its own headings to itself', async () => {
  const html = await page();
  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  assert.equal(h1.length, 1, 'exactly one title');
  // Every other heading is a composer, the royal road, or the map. No "part two".
  assert.doesNotMatch(html, /Part (One|Two|Three)/i, 'no part numbering');
});

test('no em dash survives anywhere in the copy', () => {
  for (const lang of LANGS) {
    for (const [key, value] of Object.entries(color[lang])) {
      assert.ok(!value.includes('—'), `${lang}.${key} contains an em dash`);
    }
  }
});

test('the player sits to the right of every letter, never alternating', async () => {
  const html = await page();
  const css = await readFile(new URL('../css/color.css', import.meta.url), 'utf8');
  // Text first, player second, in every letter. Source order is the layout.
  const items = [...html.matchAll(/<li class="letter reveal"[\s\S]*?<\/li>/g)];
  assert.equal(items.length, LETTERS.length);
  for (const [item] of items) {
    assert.ok(item.indexOf('letter__text') < item.indexOf('data-letter'), 'the letter must come before its player');
  }
  const letterRules = css.slice(css.indexOf('.letters {'), css.indexOf('.letter__who'));
  assert.doesNotMatch(letterRules, /nth-child\(even\)/, 'letters must not swap sides');
  assert.doesNotMatch(letterRules, /order:/, 'letters must not be reordered');
});
