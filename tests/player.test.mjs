import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { formatTime, clampVolume, nextIndex, VOLUME_KEY } from '../js/player.js';
import { TRACKS, hasVideo, videoIdFor, parseVideoId, renderTrackArt } from '../js/data/tracks.js';
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
  assert.equal(hasVideo({ link: 'https://youtu.be/dQw4w9WgXcQ' }), true);
  assert.equal(videoIdFor({ link: 'https://youtu.be/dQw4w9WgXcQ' }), 'dQw4w9WgXcQ');
  assert.equal(hasVideo({ link: '' }), false);
  assert.equal(hasVideo({ link: 'https://example.com/nope' }), false);
  assert.equal(hasVideo({}), false);
  assert.equal(hasVideo(undefined), false);
});

test('every track has art, a title and a credit in both languages', () => {
  assert.equal(TRACKS.length, 6);
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
  for (const id of ['forbidden-friendship', 'violet-evergarden', 'be-still-my-soul']) {
    assert.match(html, new RegExp(`data-play="${id}"`), `${id} has no cue button`);
  }
});

test('no third-party audio or video is embedded until the visitor asks for it', async () => {
  const html = await page();
  assert.doesNotMatch(html, /<iframe/, 'the page must ship without an iframe');
  assert.doesNotMatch(html, /<audio/, 'no audio element');
  assert.doesNotMatch(html, /youtube\.com|youtu\.be|ytimg\.com/,
    'nothing may reference Google before a click');
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
