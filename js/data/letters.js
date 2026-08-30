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
 *      and there is no honest way around it. Most soundtrack labels block it,
 *      so a `watch` link is the fallback: the letter then offers a way out to
 *      YouTube instead of pretending it can play the track.
 * ──────────────────────────────────────────────────────────────────────────
 */
import { parseVideoId } from './tracks.js';

export const LETTERS = [
  { id: 'call', composer: 'Evan Call', video: '' },
  { id: 'fujisawa', composer: 'Yoshiaki Fujisawa', video: '' },
  { id: 'hayashi', composer: 'Yuki Hayashi', video: '', watch: 'https://www.youtube.com/watch?v=V8ps2Pe3IoQ' },
  { id: 'kajiura', composer: 'Yuki Kajiura', video: 'https://www.youtube.com/watch?v=3II5pBTePLQ' },
  { id: 'oshima', composer: 'Michiru Ōshima', video: 'https://www.youtube.com/watch?v=XIvlOkmn-P8' },
  { id: 'kitamura', composer: 'Yuka Kitamura', video: '', watch: 'https://www.youtube.com/watch?v=tt6xLzRZKXY', scene: 'cottage' },
  { id: 'haneoka', composer: 'Kei Haneoka', video: 'https://www.youtube.com/watch?v=u5LDoMHlqHw' },
  { id: 'nishiki', composer: 'Yasunori Nishiki', video: 'https://www.youtube.com/watch?v=XvymAXxAa60' },
  { id: 'takanashi', composer: 'Yasuharu Takanashi', video: '', watch: 'https://www.youtube.com/watch?v=ZAnKeEh4jkY' },
  { id: 'kato', composer: 'Tatsuya Katō', video: 'https://www.youtube.com/watch?v=4o9f1jLCc9g' },
  { id: 'penkin', composer: 'Kevin Penkin', video: 'https://www.youtube.com/watch?v=WRtf10SxYlA' },
  { id: 'shimomura', composer: 'Yoko Shimomura', video: '', watch: 'https://www.youtube.com/watch?v=UIPMy49YFBI' },
  { id: 'mayuko', composer: 'MAYUKO', video: '', watch: 'https://www.youtube.com/watch?v=4CJgP6KFSew' },
  { id: 'muramatsu', composer: 'Takatsugu Muramatsu', video: 'https://www.youtube.com/watch?v=LGTId5EdZ7U' },
  { id: 'yokoyama', composer: 'Masaru Yokoyama', video: '', watch: 'https://www.youtube.com/watch?v=beiJJAxwKjg' },
  { id: 'powell', composer: 'John Powell', video: '', watch: 'https://www.youtube.com/watch?v=m0q4NoycbjA' },
  { id: 'pasekpaul', composer: 'Pasek and Paul', video: 'https://www.youtube.com/watch?v=6F69YV-wNtY' },
  { id: 'wallerbridge', composer: 'Isobel Waller-Bridge', video: '', watch: 'https://www.youtube.com/watch?v=uqxkwceo6Ws' },
  { id: 'bowers', composer: 'Kris Bowers', video: '', watch: 'https://www.youtube.com/watch?v=6eAYg4InHdY' },
  { id: 'britell', composer: 'Nicholas Britell', video: 'https://www.youtube.com/watch?v=6t9K1ofXaWI' },
  { id: 'coker', composer: 'Gareth Coker', video: 'https://www.youtube.com/watch?v=t6vWDz5NzOY' },
  { id: 'larkin', composer: 'Christopher Larkin', video: 'https://www.youtube.com/watch?v=9Vdv01LsnQM' },
  { id: 'park', composer: 'Park Chan Young', video: 'https://www.youtube.com/watch?v=hdZqMVzALzk' },
  { id: 'almond', composer: 'almond', video: '' },
  { id: 'mizusato', composer: 'Mizusato', video: '' },
  { id: 'judah', composer: 'Judah Earl', video: 'https://www.youtube.com/watch?v=oyNl6AEaJJM' },
];

export function letterVideoId(letter) {
  return parseVideoId(letter?.video ?? '');
}

export function letterHasVideo(letter) {
  return letterVideoId(letter).length > 0;
}
