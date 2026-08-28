/**
 * The music the page talks about, played through YouTube's own embedded player.
 *
 * ── VIDEO IDS ─────────────────────────────────────────────────────────────
 * The id is the 11 characters after v= :
 *     https://www.youtube.com/watch?v=dQw4w9WgXcQ  ->  'dQw4w9WgXcQ'
 * A whole pasted link works too, in any of YouTube's shapes, so it does not
 * matter which one you happen to have on the clipboard.
 *
 * Use an official upload: the label, the composer's own channel, or the
 * auto-generated "Topic" channel. Embedding a fan re-upload is the one case
 * where it stops being protected, because you are knowingly framing an
 * unauthorised copy. A track left empty renders as "link not set" and stays
 * silent rather than breaking the page.
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

export const TRACKS = [
  { id: 'goodnight-sweet-possums', videoId: 'lx-DZk19byY', art: 'melody' },
  { id: 'song-for-the-beyond', videoId: 'GaO-5XB285E', art: 'pedal' },
  { id: 'blessings', videoId: '2lmPm_yZ9Ow', art: 'borrowed' },
  // ロキシーからの贈り物
  { id: 'gift-from-roxy', videoId: 'CCLGUHut90A', art: 'melody' },
  // Composed by Yuki Hayashi and Asami Tachibana
  { id: 'above', videoId: 'QHRcpLQhE0Q', art: 'pedal' },
  // Written by Pasek and Paul, sung by Grant Gustin
  { id: 'running-home-to-you', videoId: 'f4a1vf7l-jI', art: 'melody' },
  // Composed by Yuki Kajiura
  { id: 'in-the-city-of-flowers', videoId: 'ugKa1EibcEQ', art: 'borrowed' },
];

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
