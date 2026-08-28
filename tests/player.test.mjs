import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { formatTime, clampVolume, nextIndex, VOLUME_KEY } from '../js/player.js';
import { TRACKS, renderTrackArt } from '../js/data/tracks.js';
import { music } from '../js/i18n/music.js';
import { LANGS, translate } from '../js/i18n/index.js';

test('formatTime renders m:ss and never shows NaN', () => {
  assert.equal(formatTime(0), '0:00');
  assert.equal(formatTime(7), '0:07');
  assert.equal(formatTime(23.7), '0:23');
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
  assert.equal(nextIndex(2, 3), 0);
  assert.equal(nextIndex(0, 0), 0);
});

test('the volume key is stable', () => {
  assert.equal(VOLUME_KEY, 'tc-volume');
});

test('every track has audio on disk and art that renders', async () => {
  assert.equal(TRACKS.length, 3);
  for (const track of TRACKS) {
    await access(new URL(`../${track.src}`, import.meta.url));
    const svg = renderTrackArt(track.id);
    assert.match(svg, /^<svg[\s>]/);
    assert.match(svg, /aria-hidden="true"/);
    assert.doesNotMatch(svg, /#[0-9a-fA-F]{3,8}\b/, `${track.id} contains a colour literal`);
    assert.doesNotMatch(svg, /NaN/, `${track.id} emitted NaN`);
  }
});

test('an unknown track id throws rather than rendering nothing', () => {
  assert.throws(() => renderTrackArt('nope'), /Unknown track art/);
});

test('every track has a title and a note in both languages', () => {
  for (const track of TRACKS) {
    for (const field of ['title', 'note']) {
      for (const lang of LANGS) {
        const key = `track.${track.id}.${field}`;
        assert.notEqual(translate(music, lang, key), key, `missing ${lang}: ${key}`);
      }
    }
  }
});

test('the page wires the player, the tracklist and the cue buttons', async () => {
  const html = await readFile(new URL('../music.html', import.meta.url), 'utf8');
  assert.match(html, /data-page="music"/);
  for (const hook of ['data-player-art', 'data-player-play', 'data-player-seek',
                      'data-player-volume', 'data-player-time', 'data-tracklist']) {
    assert.match(html, new RegExp(hook), `missing ${hook}`);
  }
  for (const track of TRACKS) {
    assert.match(html, new RegExp(`data-track="${track.id}"`), `${track.id} missing from the tracklist`);
    assert.match(html, new RegExp(`data-play="${track.id}"`), `${track.id} has no cue button`);
  }
});

test('the audio is only ever served from our own assets', async () => {
  const html = await readFile(new URL('../music.html', import.meta.url), 'utf8');
  assert.doesNotMatch(html, /<audio[^>]+src="https?:/, 'no remote audio');
  for (const track of TRACKS) {
    assert.ok(track.src.startsWith('assets/audio/'), `${track.id} is not a local asset`);
  }
});
