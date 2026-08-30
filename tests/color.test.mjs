import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
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

const SCENES = ['floor', 'glass', 'gymnast', 'whiteboard', 'cottage', 'piano'];
const asset = (name) => new URL(`../assets/gifs/${name}`, import.meta.url);

test('every gif on the page is a real gif that exists on disk', async () => {
  for (const id of SCENES) {
    const gif = await readFile(asset(`${id}.gif`));
    assert.equal(gif.subarray(0, 6).toString('latin1').slice(0, 3), 'GIF', `${id}.gif is not a gif`);
    // 239321 bytes is Giphy's "content is not available" placeholder.
    assert.notEqual(gif.length, 239321, `${id}.gif is a Giphy placeholder, not the real thing`);
    assert.ok(gif.length > 20000, `${id}.gif looks truncated`);
  }
});

test('every gif has a still frame for reduced motion', async () => {
  const html = await page();
  for (const id of SCENES) {
    const png = await readFile(asset(`${id}.png`));
    assert.equal(png.subarray(1, 4).toString('latin1'), 'PNG', `${id}.png is not a png`);
    assert.ok(
      html.includes(`<source media="(prefers-reduced-motion: reduce)" srcset="assets/gifs/${id}.png">`),
      `${id} has no reduced-motion source`);
  }
});

test('every gif is placed once, declares its size, and loads lazily', async () => {
  const html = await page();
  for (const id of SCENES) {
    const tags = [...html.matchAll(new RegExp(`<img class="scene__art" src="assets/gifs/${id}\.gif"[^>]*>`, 'g'))];
    assert.equal(tags.length, 1, `${id}.gif should appear exactly once`);
    const tag = tags[0][0];
    assert.match(tag, /width="\d+" height="\d+"/, `${id} has no intrinsic size`);
    assert.match(tag, /loading="lazy"/, `${id} is not lazy`);
    assert.match(tag, /alt=""/, `${id} should be decorative`);
  }
});

test('the borrowed cats are credited', async () => {
  const html = await page();
  assert.match(html, /data-i18n="c\.gifs"/, 'no credit line on the page');
  for (const lang of LANGS) {
    const credit = translate(color, lang, 'c.gifs');
    assert.notEqual(credit, 'c.gifs', `missing ${lang} credit`);
    assert.match(credit, /Giphy/, `${lang} credit should name the source`);
  }
});

test('the map is gone and the page ends on the letters', async () => {
  const html = await page();
  assert.doesNotMatch(html, /strand--spec/, 'the map section should be removed');
  for (const lang of LANGS) {
    for (const key of ['c.spec.title', 'c.spec.body', 'c.end']) {
      assert.equal(translate(color, lang, key), key, `${key} should no longer exist`);
    }
    assert.notEqual(translate(color, lang, 'c.coda'), 'c.coda', `${lang} is missing the close`);
  }
  const body = html.slice(html.indexOf('</ol>'));
  assert.ok(body.indexOf('c.coda') < body.indexOf('c.wish'), 'the close comes before the wish');
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

test('every link is an official upload written as a full watch url', () => {
  for (const letter of LETTERS) {
    for (const url of [letter.video, letter.watch]) {
      if (!url) continue;
      assert.match(url, /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/,
        `${letter.id}: ${url}`);
    }
    // A letter is either playable in the page or a way out, never both.
    assert.ok(!(letterHasVideo(letter) && letter.watch), `${letter.id} has two links`);
  }
  const ids = LETTERS.flatMap((l) => [l.video, l.watch]).filter(Boolean);
  assert.equal(new Set(ids).size, ids.length, 'the same video is used twice');
});

test('a letter with no embeddable upload still offers a way out', async () => {
  const js = await readFile(new URL('../js/letters.js', import.meta.url), 'utf8');
  assert.match(js, /letter\.watch/, 'the renderer ignores the watch link');
  assert.match(js, /rel="noopener noreferrer"/, 'an outbound link needs rel=noopener');
  for (const lang of LANGS) {
    assert.notEqual(translate(color, lang, 'c.player.out'), 'c.player.out', `missing ${lang}`);
  }
  const linksOut = LETTERS.filter((l) => !letterHasVideo(l) && l.watch);
  assert.ok(linksOut.length > 0, 'nothing links out, so the fallback is untested');
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
