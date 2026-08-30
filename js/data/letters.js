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
  { id: 'call', composer: 'Evan Call', video: 'https://youtu.be/n0dvvfOSdS0?list=RDn0dvvfOSdS0' },
  { id: 'fujisawa', composer: 'Yoshiaki Fujisawa', video: 'https://youtu.be/ctKMwngcKB0' },
  { id: 'hayashi', composer: 'Yuki Hayashi', video: 'https://youtu.be/V8ps2Pe3IoQ' },
  { id: 'kajiura', composer: 'Yuki Kajiura', video: 'https://www.youtube.com/watch?v=3II5pBTePLQ' },
  { id: 'oshima', composer: 'Michiru Ōshima', video: 'https://youtu.be/OTyvafQEg6k' },
  { id: 'kitamura1', composer: 'Yuka Kitamura', video: 'https://youtu.be/x0euNw-4YOo', scene: 'cottage' },
  { id: 'kitamura2', composer: 'Yuka Kitamura', video: 'https://youtu.be/G-8C8Zy3OrY?list=RDG-8C8Zy3OrY', scene: 'cottage' },
  { id: 'haneoka', composer: 'Kei Haneoka', video: 'https://youtu.be/O30pW_3npn8' },
  { id: 'nishiki', composer: 'Yasunori Nishiki', video: 'https://www.youtube.com/watch?v=XvymAXxAa60' },
  { id: 'takanashi', composer: 'Yasuharu Takanashi', video: 'https://youtu.be/6rHPqHN4kKc' },
  { id: 'kato', composer: 'Tatsuya Katō', video: 'https://youtu.be/3jThJGRbFbI' },
  { id: 'penkin', composer: 'Kevin Penkin', video: 'https://www.youtube.com/watch?v=WRtf10SxYlA' },
  { id: 'shimomura', composer: 'Yoko Shimomura', video: 'https://youtu.be/ZzipTmFOStg' },
  { id: 'mayuko', composer: 'MAYUKO', video: 'https://www.youtube.com/watch?v=4CJgP6KFSew' },
  { id: 'muramatsu', composer: 'Takatsugu Muramatsu', video: 'https://www.youtube.com/watch?v=LGTId5EdZ7U' },
  { id: 'yokoyama', composer: 'Masaru Yokoyama', video: 'https://youtu.be/2I6g2q_B9d4' },
  { id: 'powell', composer: 'John Powell', video: 'https://www.youtube.com/watch?v=m0q4NoycbjA' },
  { id: 'pasekpaul', composer: 'Pasek and Paul', video: 'https://youtu.be/0c37iAQ1f4s' },
  { id: 'wallerbridge', composer: 'Isobel Waller-Bridge', video: 'https://www.youtube.com/watch?v=uqxkwceo6Ws' },
  { id: 'bowers', composer: 'Kris Bowers', video: 'https://www.youtube.com/watch?v=6eAYg4InHdY' },
  { id: 'britell', composer: 'Nicholas Britell', video: 'https://www.youtube.com/watch?v=6t9K1ofXaWI' },
  { id: 'coker', composer: 'Gareth Coker', video: 'https://www.youtube.com/watch?v=t6vWDz5NzOY' },
  { id: 'larkin', composer: 'Christopher Larkin', video: 'https://youtu.be/zRs58D34OLY' },
  { id: 'park', composer: 'Park Chan Young', video: 'https://www.youtube.com/watch?v=hdZqMVzALzk' },
  { id: 'almond', composer: 'almond', video: 'https://youtu.be/pk_6EahWWXk' },
  { id: 'mizusato', composer: 'Mizusato', video: 'https://youtu.be/9CS1r7HGIA4' },
  { id: 'judah', composer: 'Judah Earl', video: 'https://www.youtube.com/watch?v=oyNl6AEaJJM' },
];

export function letterVideoId(letter) {
  return parseVideoId(letter?.video ?? '');
}

export function letterHasVideo(letter) {
  return letterVideoId(letter).length > 0;
}
