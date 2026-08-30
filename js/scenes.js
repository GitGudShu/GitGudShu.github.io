/**
 * The little looping scenes on the colour page. Line art in currentColor, so
 * they take the theme with them, and animated from css/color.css so a visitor
 * who asked for less motion gets a still drawing instead of a flipbook.
 */

const svg = (body) =>
  '<svg viewBox="0 0 320 200" class="scene__art" aria-hidden="true" focusable="false" ' +
  'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
  'stroke-linejoin="round">' + body + '</svg>';

/** Rug fringe: a row of little tassels. */
const fringe = (y, from, to, step = 9) => {
  let out = '';
  for (let x = from; x <= to; x += step) out += `<path d="M${x} ${y}v7" stroke-width="1.4" opacity=".45"/>`;
  return out;
};

/** A cat, face down on the carpet, declining to participate. */
function floorCat() {
  return svg(`
    <path d="M40 158h240" stroke-width="1.6" opacity=".5"/>
    ${fringe(158, 46, 274)}
    <ellipse cx="168" cy="140" rx="74" ry="19" opacity=".95"/>
    <path class="cat-ear" d="M112 128l-9-19 20 7" opacity=".95"/>
    <path class="cat-ear cat-ear--b" d="M141 122l4-21 15 14" opacity=".95"/>
    <path d="M104 133q-14 4-22 0" opacity=".9"/>
    <path d="M108 141q-16 2-24 6" opacity=".7"/>
    <path d="M107 137h-26" stroke-width="1.2" opacity=".5"/>
    <path d="M117 138q6 3 13 0" stroke-width="1.5" opacity=".8"/>
    <g class="cat-tail">
      <path d="M242 138q26-6 30-26" opacity=".95"/>
    </g>
    <path d="M186 152q10 6 20 0" stroke-width="1.5" opacity=".55"/>
    <g class="cat-zzz" opacity=".7">
      <path d="M196 96h16l-16 15h17" stroke-width="1.6"/>
    </g>
  `);
}

/** A paw, a glass, and gravity. The caption does the rest. */
function glassCat() {
  return svg(`
    <path d="M28 150h264" stroke-width="1.8"/>
    <path d="M62 150v34M258 150v34" stroke-width="1.6" opacity=".7"/>
    <g class="paw">
      <path d="M92 96q0-18 16-18t16 18v26q0 10-16 10t-16-10z" opacity=".95"/>
      <path d="M96 96q4-9 12-9t12 9" stroke-width="1.3" opacity=".6"/>
      <path d="M100 72v-9M110 69v-11M120 72v-9" stroke-width="1.5" opacity=".8"/>
    </g>
    <g class="glass">
      <path d="M150 106h34l-5 42h-24z" opacity=".95"/>
      <path d="M152 120h30" stroke-width="1.3" opacity=".55"/>
    </g>
    <g class="shatter" opacity="0">
      <path d="M206 150l-9 16M218 150l2 18M230 150l10 15" stroke-width="1.5"/>
      <path d="M198 172h46" stroke-width="1.3" opacity=".6"/>
    </g>
  `);
}

/** A landing, then the sort of impact that sells a shonen cold open. */
function gymnast() {
  return svg(`
    <path d="M24 168h272" stroke-width="1.6" opacity=".5"/>
    <g class="tumbler">
      <circle cx="96" cy="96" r="12" opacity=".95"/>
      <path d="M96 108v30" opacity=".95"/>
      <path d="M96 138l-16 30M96 138l16 30" opacity=".95"/>
      <path d="M96 116l-24-10M96 116l24-10" opacity=".95"/>
    </g>
    <g class="impact" opacity="0">
      <path d="M228 100l10-26 9 26 26-9-19 20 19 20-26-9-9 26-10-26-26 9 19-20-19-20z" stroke-width="2.2"/>
      <path d="M186 60l-12-12M282 60l12-12M186 148l-12 12M282 148l12 12" stroke-width="1.6" opacity=".7"/>
    </g>
  `);
}

/** Conspiracy board. String, pins, and one cat who has worked it all out. */
function whiteboardCat() {
  return svg(`
    <rect x="26" y="22" width="200" height="132" rx="6" opacity=".9"/>
    ${[
      'M52 60L118 44', 'M118 44L104 116', 'M104 116L176 66',
      'M176 66L60 108', 'M60 108L182 128', 'M182 128L52 60',
    ].map((d, i) => `<path class="thread thread--${i}" d="${d}" stroke-width="1.4" opacity=".75"/>`).join('')}
    ${[[52, 60], [118, 44], [104, 116], [176, 66], [60, 108], [182, 128]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" stroke-width="1.6" opacity=".9"/>`).join('')}
    <g class="scholar">
      <ellipse cx="268" cy="140" rx="26" ry="20" opacity=".95"/>
      <circle cx="268" cy="102" r="20" opacity=".95"/>
      <path d="M252 88l-4-16 17 8M284 88l4-16-17 8" opacity=".95"/>
      <circle class="lens" cx="261" cy="102" r="7" stroke-width="1.6"/>
      <circle class="lens lens--b" cx="277" cy="102" r="7" stroke-width="1.6"/>
      <path d="M268 102h2" stroke-width="1.4"/>
      <path d="M256 114q12 6 24 0" stroke-width="1.5" opacity=".7"/>
    </g>
  `);
}

/** A health bar you have seen before, and then somewhere much nicer. */
function bossToCottage() {
  return svg(`
    <g class="boss">
      <rect x="46" y="88" width="228" height="16" rx="3" opacity=".9"/>
      <rect class="boss__fill" x="49" y="91" width="222" height="10" rx="2" fill="currentColor" stroke="none" opacity=".55"/>
      <path d="M46 118h60M214 118h60" stroke-width="1.4" opacity=".45"/>
    </g>
    <g class="cottage" opacity="0">
      <path d="M96 152h128v-46l-64-34-64 34z" opacity=".95"/>
      <rect x="146" y="112" width="28" height="40" rx="2" opacity=".9"/>
      <path d="M188 74v-22h16v32" opacity=".9"/>
      <path d="M112 152h96" stroke-width="1.4" opacity=".5"/>
      <g class="smoke">
        <path d="M196 46q-9-9 0-18t0-16" stroke-width="1.6" opacity=".8"/>
      </g>
    </g>
  `);
}

/** One key. Over and over. This is the correct approach and it is very funny. */
function pianoCat() {
  const whites = [0, 1, 2, 3, 4, 5, 6]
    .map((i) => `<rect x="${58 + i * 26}" y="118" width="26" height="60" rx="2" opacity=".9"/>`).join('');
  const blacks = [0, 1, 3, 4, 5]
    .map((i) => `<rect x="${74 + i * 26}" y="118" width="14" height="36" rx="2" fill="currentColor" stroke="none" opacity=".35"/>`).join('');
  return svg(`
    ${whites}${blacks}
    <rect class="key-hit" x="136" y="118" width="26" height="60" rx="2" fill="currentColor" stroke="none" opacity="0"/>
    <g class="pounce">
      <path d="M132 104q0-20 17-20t17 20v10q0 8-17 8t-17-8z" opacity=".95"/>
      <path d="M136 80v-10M149 76v-12M162 80v-10" stroke-width="1.5" opacity=".85"/>
    </g>
    <g class="note-up" opacity="0">
      <path d="M206 76v-34l20-6v34" stroke-width="1.8"/>
      <ellipse cx="200" cy="78" rx="7" ry="5" fill="currentColor" stroke="none"/>
      <ellipse cx="220" cy="72" rx="7" ry="5" fill="currentColor" stroke="none"/>
    </g>
  `);
}

const SCENES = {
  floor: floorCat,
  glass: glassCat,
  gymnast,
  whiteboard: whiteboardCat,
  cottage: bossToCottage,
  piano: pianoCat,
};

export const SCENE_IDS = Object.keys(SCENES);

export function renderScene(id) {
  const build = SCENES[id];
  if (!build) throw new Error(`Unknown scene: ${id}`);
  return build();
}
