/**
 * Abstract cover motifs, one per project. Every motif is 16:9, drawn only in
 * currentColor, and decorative — the card's text carries all the meaning.
 */

const wrap = (body) =>
  '<svg viewBox="0 0 480 270" class="cover__art" aria-hidden="true" focusable="false" ' +
  `fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

const n = (value) => Number(value).toFixed(1);

/** Hexagonal coverage grid — a few cells pulsing out of phase. */
function optimops() {
  const cells = [];
  const w = 46;
  const h = 40;
  for (let row = 0; row < 5; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const x = 60 + col * w + (row % 2 ? w / 2 : 0);
      const y = 45 + row * (h * 0.78);
      const points = [
        [x, y - h / 2], [x + w / 2.3, y - h / 4], [x + w / 2.3, y + h / 4],
        [x, y + h / 2], [x - w / 2.3, y + h / 4], [x - w / 2.3, y - h / 4],
      ].map(([px, py]) => `${n(px)},${n(py)}`).join(' ');

      const index = row * 8 + col;
      const lit = index % 7 === 0;
      cells.push(
        `<polygon points="${points}" stroke-width="1" opacity="${lit ? '.85' : '.22'}"` +
        (lit ? ` class="cover__pulse" style="--d:${n((index % 5) * 0.4)}s"` : '') +
        '/>',
      );
    }
  }
  return wrap(cells.join(''));
}

/** Star schema — one fact table, radiating dimension tables. */
function kpiEngine() {
  const cx = 240;
  const cy = 135;
  const dims = [[90, 55], [390, 55], [70, 200], [410, 200], [240, 32], [240, 238]];

  // Spokes start on the fact table's edge rather than its centre, so they do
  // not draw an X through the box they are supposed to radiate from.
  const edge = (x, y) => {
    const dx = x - cx;
    const dy = y - cy;
    const t = Math.min(dx ? 42 / Math.abs(dx) : Infinity, dy ? 24 / Math.abs(dy) : Infinity);
    return [cx + dx * t, cy + dy * t];
  };

  const spokes = dims
    .map(([x, y]) => {
      const [sx, sy] = edge(x, y);
      return `<line x1="${n(sx)}" y1="${n(sy)}" x2="${x}" y2="${y}" stroke-width="1" opacity=".35"/>`;
    })
    .join('');

  const nodes = dims
    .map(([x, y], i) =>
      `<rect x="${x - 26}" y="${y - 14}" width="52" height="28" rx="6" stroke-width="1.2" ` +
      `opacity=".75" class="cover__pulse" style="--d:${n(i * 0.35)}s"/>`)
    .join('');

  return wrap(
    spokes + nodes +
    `<rect x="${cx - 40}" y="${cy - 22}" width="80" height="44" rx="8" stroke-width="1.8" opacity=".95"/>` +
    `<line x1="${cx - 24}" y1="${cy - 6}" x2="${cx + 24}" y2="${cy - 6}" stroke-width="1" opacity=".5"/>` +
    `<line x1="${cx - 24}" y1="${cy + 6}" x2="${cx + 10}" y2="${cy + 6}" stroke-width="1" opacity=".5"/>`,
  );
}

/** Layered waveform over a spectrum band. */
function emotion() {
  const wave = (amp, phase, opacity, width) => {
    const points = [];
    for (let x = 20; x <= 460; x += 8) {
      const t = (x - 20) / 440;
      const y = 130 + Math.sin(t * Math.PI * 4 + phase) * amp * Math.sin(t * Math.PI);
      points.push(`${x},${n(y)}`);
    }
    return `<polyline points="${points.join(' ')}" stroke-width="${width}" opacity="${opacity}"/>`;
  };

  const bars = [];
  for (let i = 0; i < 44; i += 1) {
    const x = 20 + i * 10;
    const barHeight = 6 + Math.abs(Math.sin(i * 0.7)) * 34;
    bars.push(`<line x1="${x}" y1="${n(238 - barHeight)}" x2="${x}" y2="238" stroke-width="2.5" opacity=".2"/>`);
  }

  return wrap(bars.join('') + wave(48, 0, '.9', 1.8) + wave(34, 1.2, '.45', 1.2) + wave(22, 2.4, '.25', 1));
}

/** Forecast line: observed solid, predicted dashed, confidence band behind. */
function predictops() {
  const points = [];
  const upper = [];
  const lower = [];
  for (let i = 0; i <= 22; i += 1) {
    const x = 30 + i * 19;
    const base = 170 - Math.sin(i * 0.55) * 42 - i * 1.6;
    points.push({ x, y: base });
    const spread = i > 12 ? (i - 12) * 3.4 : 3;
    upper.push(`${x},${n(base - spread)}`);
    lower.unshift(`${x},${n(base + spread)}`);
  }

  const toStr = (list) => list.map((p) => `${p.x},${n(p.y)}`).join(' ');
  const solid = toStr(points.slice(0, 13));
  const dashed = toStr(points.slice(12));
  const joint = points[12];

  return wrap(
    `<polygon points="${upper.join(' ')} ${lower.join(' ')}" fill="currentColor" opacity=".12" stroke="none"/>` +
    '<line x1="30" y1="238" x2="450" y2="238" stroke-width="1" opacity=".3"/>' +
    `<polyline points="${solid}" stroke-width="2" opacity=".9"/>` +
    `<polyline points="${dashed}" stroke-width="2" stroke-dasharray="5 6" opacity=".6"/>` +
    `<circle cx="${joint.x}" cy="${n(joint.y)}" r="4" stroke-width="1.6" class="cover__pulse"/>`,
  );
}

/** Region contour with indicator pulses. */
function ars() {
  const contour =
    'M120 62 L188 44 L262 58 L326 40 L378 74 L396 132 L368 190 L306 224 ' +
    'L232 232 L166 210 L118 166 L102 110 Z';
  const inner = 'M170 96 L232 84 L288 104 L300 152 L258 190 L196 182 L162 146 Z';

  const dots = [[186, 120], [268, 128], [224, 172], [318, 96]]
    .map(([x, y], i) =>
      `<circle cx="${x}" cy="${y}" r="5" stroke-width="1.4" opacity=".8" ` +
      `class="cover__pulse" style="--d:${n(i * 0.5)}s"/>`)
    .join('');

  return wrap(
    `<path d="${contour}" stroke-width="1.6" opacity=".7"/>` +
    `<path d="${inner}" stroke-width="1" opacity=".3"/>` +
    dots,
  );
}

/** Writing in progress — a dotted frame; the takodachi image sits above it. */
function wip() {
  return wrap(
    '<rect x="24" y="20" width="432" height="230" rx="18" stroke-width="1.6" stroke-dasharray="6 9" opacity=".5"/>' +
    '<line x1="150" y1="204" x2="330" y2="204" stroke-width="1" opacity=".3"/>' +
    '<line x1="182" y1="220" x2="298" y2="220" stroke-width="1" opacity=".2"/>',
  );
}

const COVERS = { optimops, kpiEngine, emotion, predictops, ars, wip };

export const COVER_IDS = Object.keys(COVERS);

export function renderCover(id) {
  const build = COVERS[id];
  if (!build) throw new Error(`Unknown cover: ${id}`);
  return build();
}
