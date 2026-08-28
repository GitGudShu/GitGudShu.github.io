/**
 * The music the page talks about, played through YouTube's own embedded player.
 *
 * ── PICKING A TRACK ───────────────────────────────────────────────────────
 * The id is the 11 characters after v= :
 *     https://www.youtube.com/watch?v=dQw4w9WgXcQ  ->  'dQw4w9WgXcQ'
 * A whole pasted link works too, in any of YouTube's shapes.
 *
 * Two things are worth checking before adding one, because neither is
 * visible from the link:
 *
 *   1. It must be the rightsholder's own upload. A fan re-upload is the one
 *      case where embedding stops being protected, and "- Topic" channels
 *      carrying "Originally Performed By" in the title are karaoke covers,
 *      not the record they appear to be.
 *   2. It must allow off-site playback. Many labels switch this off, and the
 *      embed then fails with error 150 no matter what we do. There is no way
 *      around it that is not a circumvention, so the answer is another
 *      upload, not another player.
 * ──────────────────────────────────────────────────────────────────────────
 */

/** Pulls the 11-character id out of whatever shape of link was pasted. */
export function parseVideoId(input) {
  if (typeof input !== 'string') return '';
  const value = input.trim();
  if (/^[\w-]{11}$/.test(value)) return value;
  const match = value.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match ? match[1] : '';
}

const art = (body) =>
  '<svg viewBox="0 0 200 200" class="art" aria-hidden="true" focusable="false" ' +
  'fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
  body +
  '</svg>';

/** A melodic contour holding itself up. */
function melodyArt() {
  const pts = [22, 38, 30, 52, 66, 54, 44, 60, 78, 92, 74, 58];
  const path = pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${20 + i * 14.5} ${150 - v}`).join(' ');
  const rules = [0, 1, 2, 3, 4]
    .map((i) => `<path d="M18 ${86 + i * 16}H182" stroke-width="1" opacity=".16"/>`)
    .join('');
  return art(rules + `<path d="${path}" stroke-width="2.4" opacity=".95"/>` +
    pts.map((v, i) => `<circle cx="${20 + i * 14.5}" cy="${150 - v}" r="2.4" stroke-width="1.4" opacity=".55"/>`).join(''));
}

/** One held note underneath, everything else drifting over the top. */
function pedalArt() {
  const arcs = [0, 1, 2, 3]
    .map((i) => `<path d="M${28 + i * 8} ${118 - i * 22}q${72 - i * 8} ${-30 + i * 6} ${144 - i * 16} 0" ` +
      `stroke-width="1.6" opacity="${0.8 - i * 0.16}"/>`)
    .join('');
  return art(arcs +
    '<path d="M22 152H178" stroke-width="5" opacity=".95"/>' +
    '<circle cx="22" cy="152" r="6" stroke-width="2" opacity=".95"/>');
}

/** A stack of three notes. One of them drops by a semitone. */
function borrowedArt() {
  const stack = (x, drop, opacity) =>
    [0, 1, 2]
      .map((i) => `<circle cx="${x}" cy="${138 - i * 30 + (i === 1 ? drop : 0)}" r="11" ` +
        `stroke-width="2" opacity="${opacity}"/>`)
      .join('') + `<path d="M${x} 158v-100" stroke-width="1" opacity=".18"/>`;
  return art(stack(66, 0, '.5') + stack(134, 16, '.95') +
    '<path d="M134 96v-14" stroke-width="1.6" opacity=".8"/>' +
    '<path d="M129 90l5 6 5-6" stroke-width="1.6" opacity=".8"/>');
}

const ART = { melody: melodyArt, pedal: pedalArt, borrowed: borrowedArt };

const COMMONS = 'https://upload.wikimedia.org/wikipedia/commons/thumb';
const FILE = 'https://commons.wikimedia.org/wiki/File';

export const TRACKS = [
  {
    id: 'film-suite', videoId: '8wiibGgXmVU', art: 'melody',
    photo: {
      src: `${COMMONS}/a/ac/John_Powell_with_his_Score_%28cropped%2C_denoised%29.jpg/960px-John_Powell_with_his_Score_%28cropped%2C_denoised%29.jpg`,
      author: 'MCSBasPJF',
      licence: 'CC BY-SA 4.0',
      href: `${FILE}:John_Powell_with_his_Score_(cropped,_denoised).jpg`,
    },
  },
  {
    id: 'violet-evergarden', videoId: '8QrpzphrQ7s', art: 'pedal',
    photo: {
      src: `${COMMONS}/4/47/Evan_Call_at_MCM_Comic_Con_London_22_May_2026_01_%28cropped%29.jpg/960px-Evan_Call_at_MCM_Comic_Con_London_22_May_2026_01_%28cropped%29.jpg`,
      author: 'DavidPMaynard',
      licence: 'CC BY-SA 4.0',
      href: `${FILE}:Evan_Call_at_MCM_Comic_Con_London_22_May_2026_01_(cropped).jpg`,
    },
  },
  { id: 'blessings', videoId: '2lmPm_yZ9Ow', art: 'borrowed' },
  // ロキシーからの贈り物
  { id: 'gift-from-roxy', videoId: 'CCLGUHut90A', art: 'melody' },
  // 猫の爪
  { id: 'cats-claw', videoId: 'ud6nGuolrAs', art: 'pedal' },
  {
    id: 'you-will-be-found', videoId: 'mSfH2AuhXfw', art: 'melody',
    photo: {
      src: `${COMMONS}/0/04/Pasek_and_Paul_-_Benj_Pasek_and_Justin_Paul.JPG/960px-Pasek_and_Paul_-_Benj_Pasek_and_Justin_Paul.JPG`,
      author: 'Kerry Long',
      licence: 'CC BY-SA 3.0',
      href: `${FILE}:Pasek_and_Paul_-_Benj_Pasek_and_Justin_Paul.JPG`,
    },
  },
  // 彼方
  {
    id: 'kanata', videoId: 'BDUItFbK_U4', art: 'borrowed',
    photo: {
      src: `${COMMONS}/8/81/Yuki_Kajiura_at_Anime_Expo_2012.jpg/960px-Yuki_Kajiura_at_Anime_Expo_2012.jpg`,
      author: 'Erika Rodriguez',
      licence: 'CC BY-SA 2.0',
      href: `${FILE}:Yuki_Kajiura_at_Anime_Expo_2012.jpg`,
    },
  },
];

/**
 * The cover shown before anyone presses play.
 *
 * A photograph of the composer where Wikimedia Commons has a freely-licensed
 * one, linked from Commons rather than copied here, with the credit its
 * licence asks for. Otherwise the video's own thumbnail. Either way the file
 * stays on somebody else's server and we only point at it.
 */
export function coverFor(track) {
  const id = videoIdFor(track);
  const thumb = id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : '';
  const backup = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : '';

  if (track?.photo) return { kind: 'photo', ...track.photo, fallback: thumb || backup };
  if (id) return { kind: 'thumb', src: thumb, fallback: backup };
  return { kind: 'motif' };
}

/** The id a track will actually play, or '' when it is missing or unparseable. */
export function videoIdFor(track) {
  return parseVideoId(track?.videoId ?? '');
}

export function hasVideo(track) {
  return videoIdFor(track).length > 0;
}

export function renderTrackArt(id) {
  const track = TRACKS.find((entry) => entry.id === id);
  const build = ART[track?.art];
  if (!build) throw new Error(`Unknown track art: ${id}`);
  return build();
}
