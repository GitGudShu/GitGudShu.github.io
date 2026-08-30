/**
 * One entry per composer on the colour page. Nobody gets merged with anybody
 * else, however often they turn up in the same sentence.
 *
 * ── TO ADD OR CHANGE A TRACK ──────────────────────────────────────────────
 * Paste a YouTube link into `video`. Any shape works:
 *
 *     https://www.youtube.com/watch?v=3II5pBTePLQ
 *     https://youtu.be/3II5pBTePLQ
 *     3II5pBTePLQ
 *
 * That is the whole job. You do not need to know whether the video allows
 * playing outside YouTube: the letter tries, and if it is refused it turns
 * itself into a "Listen on YouTube" link instead. Leave `video` empty and the
 * letter simply renders without a player.
 *
 * One rule worth keeping: link the rightsholder's own upload, not a fan
 * re-upload. Embedding somebody else's copy is the one case where it stops
 * being protected. Look for the composer's channel, an "- Topic" channel, or
 * the label's.
 * ──────────────────────────────────────────────────────────────────────────
 */
import { parseVideoId } from './tracks.js';

export const LETTERS = [
  { id: 'call', composer: 'Evan Call', video: '' },
  { id: 'fujisawa', composer: 'Yoshiaki Fujisawa', video: '' },
  { id: 'hayashi', composer: 'Yuki Hayashi', video: 'https://www.youtube.com/watch?v=V8ps2Pe3IoQ' },
  { id: 'kajiura', composer: 'Yuki Kajiura', video: 'https://www.youtube.com/watch?v=3II5pBTePLQ' },
  { id: 'oshima', composer: 'Michiru Ōshima', video: 'https://www.youtube.com/watch?v=XIvlOkmn-P8' },
  { id: 'kitamura', composer: 'Yuka Kitamura', video: 'https://www.youtube.com/watch?v=tt6xLzRZKXY', scene: 'cottage' },
  { id: 'haneoka', composer: 'Kei Haneoka', video: 'https://www.youtube.com/watch?v=u5LDoMHlqHw' },
  { id: 'nishiki', composer: 'Yasunori Nishiki', video: 'https://www.youtube.com/watch?v=XvymAXxAa60' },
  { id: 'takanashi', composer: 'Yasuharu Takanashi', video: 'https://www.youtube.com/watch?v=ZAnKeEh4jkY' },
  { id: 'kato', composer: 'Tatsuya Katō', video: 'https://www.youtube.com/watch?v=4o9f1jLCc9g' },
  { id: 'penkin', composer: 'Kevin Penkin', video: 'https://www.youtube.com/watch?v=WRtf10SxYlA' },
  { id: 'shimomura', composer: 'Yoko Shimomura', video: 'https://www.youtube.com/watch?v=UIPMy49YFBI' },
  { id: 'mayuko', composer: 'MAYUKO', video: 'https://www.youtube.com/watch?v=4CJgP6KFSew' },
  { id: 'muramatsu', composer: 'Takatsugu Muramatsu', video: 'https://www.youtube.com/watch?v=LGTId5EdZ7U' },
  { id: 'yokoyama', composer: 'Masaru Yokoyama', video: 'https://www.youtube.com/watch?v=beiJJAxwKjg' },
  { id: 'powell', composer: 'John Powell', video: 'https://www.youtube.com/watch?v=m0q4NoycbjA' },
  { id: 'pasekpaul', composer: 'Pasek and Paul', video: 'https://www.youtube.com/watch?v=6F69YV-wNtY' },
  { id: 'wallerbridge', composer: 'Isobel Waller-Bridge', video: 'https://www.youtube.com/watch?v=uqxkwceo6Ws' },
  { id: 'bowers', composer: 'Kris Bowers', video: 'https://www.youtube.com/watch?v=6eAYg4InHdY' },
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
