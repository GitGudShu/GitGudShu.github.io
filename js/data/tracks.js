/**
 * The three demo sketches on the music page, and their cover art.
 *
 * The audio is original and synthesised by tools/build-audio.py. Each one exists
 * to make a single device audible, nothing more.
 */

const art = (body) =>
  '<svg viewBox="0 0 200 200" class="art" aria-hidden="true" focusable="false" ' +
  'fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
  body +
  '</svg>';

/** A melodic contour, alone on the page, holding itself up. */
function melodyArt() {
  const pts = [22, 38, 30, 52, 66, 54, 44, 60, 78, 92, 74, 58];
  const path = pts
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${20 + i * 14.5} ${150 - v}`)
    .join(' ');
  const rules = [0, 1, 2, 3, 4]
    .map((i) => `<path d="M18 ${86 + i * 16}H182" stroke-width="1" opacity=".16"/>`)
    .join('');
  return art(`${rules}<path d="${path}" stroke-width="2.4" opacity=".95"/>` +
    pts.map((v, i) => `<circle cx="${20 + i * 14.5}" cy="${150 - v}" r="2.4" stroke-width="1.4" opacity=".55"/>`).join(''));
}

/** One held note underneath, everything else drifting over the top. */
function pedalArt() {
  const arcs = [0, 1, 2, 3]
    .map((i) => `<path d="M${28 + i * 8} ${118 - i * 22}q${72 - i * 8} ${-30 + i * 6} ${144 - i * 16} 0" ` +
      `stroke-width="1.6" opacity="${0.8 - i * 0.16}"/>`)
    .join('');
  return art(
    arcs +
    '<path d="M22 152H178" stroke-width="5" opacity=".95"/>' +
    '<circle cx="22" cy="152" r="6" stroke-width="2" opacity=".95"/>',
  );
}

/** A stack of three notes. One of them drops by a semitone. */
function borrowedArt() {
  const stack = (x, drop, opacity) =>
    [0, 1, 2]
      .map((i) => {
        const y = 138 - i * 30 + (i === 1 ? drop : 0);
        return `<circle cx="${x}" cy="${y}" r="11" stroke-width="2" opacity="${opacity}"/>`;
      })
      .join('') + `<path d="M${x} 158v-${100 + (drop ? 0 : 0)}" stroke-width="1" opacity=".18"/>`;
  return art(
    stack(66, 0, '.5') +
    stack(134, 16, '.95') +
    '<path d="M134 96v-14" stroke-width="1.6" opacity=".8"/>' +
    '<path d="M129 90l5 6 5-6" stroke-width="1.6" opacity=".8"/>',
  );
}

const ART = { 'melody-first': melodyArt, 'pedal-point': pedalArt, 'borrowed-iv': borrowedArt };

export const TRACKS = [
  { id: 'melody-first', src: 'assets/audio/melody-first.mp3', duration: 23 },
  { id: 'pedal-point', src: 'assets/audio/pedal-point.mp3', duration: 13 },
  { id: 'borrowed-iv', src: 'assets/audio/borrowed-iv.mp3', duration: 13 },
];

export function renderTrackArt(id) {
  const build = ART[id];
  if (!build) throw new Error(`Unknown track art: ${id}`);
  return build();
}
