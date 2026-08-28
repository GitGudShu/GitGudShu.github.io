import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { formatTime, clampVolume, nextIndex, VOLUME_KEY } from '../js/player.js';
import { TRACKS, hasVideo, videoIdFor, parseVideoId, coverFor, renderTrackArt } from '../js/data/tracks.js';
import { music } from '../js/i18n/music.js';
import { LANGS, translate } from '../js/i18n/index.js';

const page = () => readFile(new URL('../music.html', import.meta.url), 'utf8');

test('formatTime renders m:ss and never shows NaN', () => {
  assert.equal(formatTime(0), '0:00');
  assert.equal(formatTime(7), '0:07');
  assert.equal(formatTime(61), '1:01');
  assert.equal(formatTime(NaN), '0:00');
  assert.equal(formatTime(-4), '0:00');
  assert.equal(formatTime(Infinity), '0:00');
});

test('clampVolume stays inside 0..1 and survives junk', () => {
  assert.equal(clampVolume(0.5), 0.5);
  assert.equal(clampVolume(-2), 0);
  assert.equal(clampVolume(9), 1);
  assert.equal(clampVolume(NaN), 1);
});

test('nextIndex wraps and never divides by zero', () => {
  assert.equal(nextIndex(0, 3), 1);
  assert.equal(nextIndex(5, 6), 0);
  assert.equal(nextIndex(0, 0), 0);
});

test('the volume key is stable', () => {
  assert.equal(VOLUME_KEY, 'tc-volume');
});

test('parseVideoId accepts every shape of link YouTube hands out', () => {
  const ID = 'dQw4w9WgXcQ';
  for (const input of [
    ID,
    `  ${ID}  `,
    `https://www.youtube.com/watch?v=${ID}`,
    `http://youtube.com/watch?v=${ID}`,
    `https://www.youtube.com/watch?v=${ID}&t=42s`,
    `https://www.youtube.com/watch?app=desktop&v=${ID}`,
    `https://youtu.be/${ID}`,
    `https://youtu.be/${ID}?si=aBcDeFgHiJk`,
    `https://music.youtube.com/watch?v=${ID}`,
    `https://www.youtube.com/embed/${ID}`,
    `https://www.youtube-nocookie.com/embed/${ID}`,
    `https://www.youtube.com/shorts/${ID}`,
    `https://www.youtube.com/live/${ID}`,
  ]) {
    assert.equal(parseVideoId(input), ID, `failed on ${input}`);
  }
});

test('parseVideoId refuses anything that is not a YouTube video', () => {
  for (const input of ['', '   ', 'nonsense', 'https://vimeo.com/12345',
                       'https://www.youtube.com/@somechannel', undefined, null, 42]) {
    assert.equal(parseVideoId(input), '');
  }
});

test('an unset or unparseable link leaves the track silent rather than broken', () => {
  assert.equal(hasVideo({ videoId: 'dQw4w9WgXcQ' }), true);
  assert.equal(videoIdFor({ videoId: 'https://youtu.be/dQw4w9WgXcQ' }), 'dQw4w9WgXcQ');
  assert.equal(hasVideo({ videoId: '' }), false);
  assert.equal(hasVideo({ videoId: 'https://example.com/nope' }), false);
  assert.equal(hasVideo({}), false);
  assert.equal(hasVideo(undefined), false);
});

test('every track has art, a title and a credit in both languages', () => {
  assert.equal(TRACKS.length, 7);
  for (const track of TRACKS) {
    const svg = renderTrackArt(track.id);
    assert.match(svg, /^<svg[\s>]/);
    assert.match(svg, /aria-hidden="true"/);
    assert.doesNotMatch(svg, /#[0-9a-fA-F]{3,8}\b/, `${track.id} contains a colour literal`);
    assert.doesNotMatch(svg, /NaN/, `${track.id} emitted NaN`);

    for (const field of ['title', 'credit']) {
      for (const lang of LANGS) {
        const key = `track.${track.id}.${field}`;
        assert.notEqual(translate(music, lang, key), key, `missing ${lang}: ${key}`);
      }
    }
  }
});

test('an unknown track id throws rather than rendering nothing', () => {
  assert.throws(() => renderTrackArt('nope'), /Unknown track art/);
});

test('the page wires the player, the tracklist and the cue buttons', async () => {
  const html = await page();
  assert.match(html, /data-page="music"/);
  for (const hook of ['data-player-stage', 'data-player-facade', 'data-player-play',
                      'data-player-seek', 'data-player-volume', 'data-player-status',
                      'data-tracklist']) {
    assert.match(html, new RegExp(hook), `missing ${hook}`);
  }
  for (const track of TRACKS) {
    assert.match(html, new RegExp(`data-track="${track.id}"`), `${track.id} missing from the tracklist`);
  }
  const cues = [...html.matchAll(/data-play="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(cues.length, 3, 'each analysed passage needs its own cue button');
});

test('the video player is never embedded until the visitor asks for it', async () => {
  const html = await page();
  assert.doesNotMatch(html, /<iframe/, 'the page must ship without an iframe');
  assert.doesNotMatch(html, /<audio/, 'no audio element');
  assert.doesNotMatch(html, /youtube\.com|youtu\.be/, 'no player embed before a click');
});

test('every cover is licensed to show, and points somewhere real', async () => {
  for (const track of TRACKS) {
    const cover = coverFor(track);
    assert.ok(['photo', 'thumb'].includes(cover.kind), `${track.id} has no cover`);

    if (cover.kind === 'photo') {
      // Showing somebody's photograph means naming them and their licence.
      assert.match(cover.src, /^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\//,
        `${track.id} photo is not linked from Commons`);
      assert.ok(cover.author?.length, `${track.id} photo has no author`);
      assert.match(cover.licence, /^(CC |Public domain)/, `${track.id} photo has no free licence`);
      assert.match(cover.href, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/,
        `${track.id} photo has no source page`);
    } else {
      assert.match(cover.src, /^https:\/\/i\.ytimg\.com\/vi\//);
    }

    // Whatever the cover is, something has to take over when it 404s.
    assert.match(cover.fallback, /^https:\/\/i\.ytimg\.com\/vi\//, `${track.id} has no fallback`);
  }
});

test('no cover image is copied into the repo', async () => {
  const js = await readFile(new URL('../js/data/tracks.js', import.meta.url), 'utf8');
  assert.doesNotMatch(js, /src:\s*[`'"]assets\//, 'covers are linked, never hosted');
  await assert.rejects(
    access(new URL('../assets/composers', import.meta.url)),
    'assets/composers should be gone: nothing is hosted any more',
  );
});

test('the page only ever cues tracks that exist', async () => {
  const html = await page();
  const ids = new Set(TRACKS.map((track) => track.id));
  for (const attr of ['data-play', 'data-track']) {
    const found = [...html.matchAll(new RegExp(`${attr}="([^"]+)"`, 'g'))].map((m) => m[1]);
    assert.ok(found.length, `no ${attr} in the page`);
    for (const id of found) assert.ok(ids.has(id), `${attr}="${id}" matches no track`);
  }
});

test('no two rows play the same recording', () => {
  const ids = TRACKS.map(videoIdFor);
  assert.equal(new Set(ids).size, ids.length, 'a video id is used twice');
});

test('the embed uses the privacy-enhanced host and is only built on demand', async () => {
  const js = await readFile(new URL('../js/player.js', import.meta.url), 'utf8');
  assert.match(js, /youtube-nocookie\.com/, 'must use the no-cookie host');
  assert.match(js, /async function mount/, 'the player is built in a function, not at load');
  assert.doesNotMatch(js, /\.mp3|\.m4a|\.webm/, 'we never serve the audio ourselves');
});

test('every track is credited to whoever wrote it', () => {
  for (const track of TRACKS) {
    const credit = translate(music, 'en', `track.${track.id}.credit`);
    assert.ok(credit.length > 3, `${track.id} has no real credit`);
  }
});

test('every track has a playable id, so nothing renders as unset', () => {
  for (const track of TRACKS) {
    assert.ok(hasVideo(track), `${track.id} has no usable video id`);
    assert.match(videoIdFor(track), /^[\w-]{11}$/, `${track.id} resolved to a bad id`);
  }
});
