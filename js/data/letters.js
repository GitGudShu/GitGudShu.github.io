/**
 * One entry per composer on the colour page. Nobody gets merged with anybody
 * else, however often they turn up in the same sentence.
 *
 * ── PASTE LINKS HERE ──────────────────────────────────────────────────────
 * `video` takes a YouTube link in any shape, or the bare 11-character id.
 * Leave it empty and the letter simply renders without a player, which is a
 * perfectly good state to ship in while you hunt down the right upload.
 *
 * Same two rules as the music page, for the same reasons:
 *   1. The rightsholder's own upload. A fan re-upload is the one case where
 *      embedding stops being protected.
 *   2. It has to allow off-site playback, or the embed fails with error 150
 *      and there is no honest way around it.
 * ──────────────────────────────────────────────────────────────────────────
 */
import { parseVideoId } from './tracks.js';

export const LETTERS = [
  { id: 'call', composer: 'Evan Call', video: '' },
  { id: 'fujisawa', composer: 'Yoshiaki Fujisawa', video: '' },
  { id: 'hayashi', composer: 'Yuki Hayashi', video: '' },
  { id: 'kajiura', composer: 'Yuki Kajiura', video: '' },
  { id: 'oshima', composer: 'Michiru Ōshima', video: '' },
  { id: 'kitamura', composer: 'Yuka Kitamura', video: '', scene: 'cottage' },
  { id: 'haneoka', composer: 'Kei Haneoka', video: '' },
  { id: 'nishiki', composer: 'Yasunori Nishiki', video: '' },
  { id: 'takanashi', composer: 'Yasuharu Takanashi', video: '' },
  { id: 'kato', composer: 'Tatsuya Katō', video: '' },
  { id: 'penkin', composer: 'Kevin Penkin', video: '' },
  { id: 'shimomura', composer: 'Yoko Shimomura', video: '' },
  { id: 'mayuko', composer: 'MAYUKO', video: '' },
  { id: 'muramatsu', composer: 'Takatsugu Muramatsu', video: '' },
  { id: 'yokoyama', composer: 'Masaru Yokoyama', video: '' },
  { id: 'powell', composer: 'John Powell', video: '' },
  { id: 'pasekpaul', composer: 'Pasek and Paul', video: '' },
  { id: 'wallerbridge', composer: 'Isobel Waller-Bridge', video: '' },
  { id: 'bowers', composer: 'Kris Bowers', video: '' },
  { id: 'britell', composer: 'Nicholas Britell', video: '' },
  { id: 'coker', composer: 'Gareth Coker', video: '' },
  { id: 'larkin', composer: 'Christopher Larkin', video: '' },
  { id: 'park', composer: 'Park Chan Young', video: '' },
  { id: 'almond', composer: 'almond', video: '' },
  { id: 'mizusato', composer: 'Mizusato', video: '' },
  { id: 'judah', composer: 'Judah Earl', video: '' },
];

export function letterVideoId(letter) {
  return parseVideoId(letter?.video ?? '');
}

export function letterHasVideo(letter) {
  return letterVideoId(letter).length > 0;
}
