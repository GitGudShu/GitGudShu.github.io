/** Inline SVG diagrams. currentColor only, decorative. */

const svg = (viewBox, body) =>
  `<svg viewBox="${viewBox}" class="diagram__art" aria-hidden="true" focusable="false" ` +
  'fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
  body +
  '</svg>';

const label = (x, y, text, size = 11) =>
  `<text x="${x}" y="${y}" fill="currentColor" stroke="none" font-size="${size}" ` +
  `font-family="ui-monospace, monospace" text-anchor="middle">${text}</text>`;

const box = (x, y, w, h, opacity = '.7') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" stroke-width="1.3" opacity="${opacity}"/>`;

/** Registry, data sources, layout builder: the widget pattern. */
function widgets() {
  const cols = [
    { x: 26, title: 'REGISTRY', rows: ['widget types', 'presets', 'rules'] },
    { x: 186, title: 'DATA SOURCE', rows: ['fetch', 'transform', 'bind'] },
    { x: 346, title: 'LAYOUT', rows: ['user picks', 'arranges', 'saves'] },
  ];

  const arrow = (x1, y, x2) =>
    `<path d="M${x1} ${y}H${x2}" stroke-width="1.2" opacity=".45"/>` +
    `<path d="M${x2 - 6} ${y - 4}l6 4-6 4" stroke-width="1.2" opacity=".45"/>`;

  const body = cols
    .map(({ x, title, rows }) => {
      const inner = rows
        .map((r, i) => box(x + 14, 108 + i * 34, 80, 24, '.4') + label(x + 54, 124 + i * 34, r, 9))
        .join('');
      return box(x, 60, 108, 160, '.85') + label(x + 54, 86, title, 11) + inner;
    })
    .join('');

  return svg('0 0 480 270', body + arrow(134, 140, 186) + arrow(294, 140, 346));
}

/**
 * The OptimOps indicator model: fact tables on the left, the two hubs they all
 * join through in the middle, and the conformed dimensions hanging off them.
 */
function optimopsStar() {
  const FACT_W = 246;
  const DIM_W = 186;
  const H = 30;

  const facts = [
    ['FAIT_ENGAGEMENT_ENGIN', 40],
    ['FAIT_ENGAGEMENT_AGENT', 130],
    ['FAIT_DISPONIBILITE_DECLAREE', 220],
    ['FAIT_QUALIFICATION_AGENT', 310],
    ['FAIT_FLOTTE_ENGINS', 400],
  ];
  const hubs = [['DIM_INTERVENTION', 85], ['DIM_CENTRE', 265], ['DIM_ROLE_AGENT', 400]];
  const dims = [
    ['DIM_TYPE_INTERVENTION', 30],
    ['DIM_MOTIF', 100],
    ['DIM_ZONE', 170],
    ['DIM_COMPAGNIE', 265],
    ['DIM_DEPARTEMENT', 345],
  ];

  const FX = 26;
  const HX = 350;
  const DX = 620;

  const node = (x, y, w, text, opacity, size) =>
    box(x, y, w, H, opacity) + label(x + w / 2, y + 19, text, size);

  const link = (x1, y1, x2, y2) =>
    `<path d="M${x1} ${y1}C${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}" ` +
    'stroke-width="1.1" opacity=".38"/>';

  const mid = (y) => y + H / 2;

  const body = [
    facts.map(([t, y]) => node(FX, y, FACT_W, t, '.9', 10)).join(''),
    hubs.map(([t, y]) => node(HX, y, DIM_W, t, '.95', 10)).join(''),
    dims.map(([t, y]) => node(DX, y, DIM_W, t, '.6', 10)).join(''),

    // facts -> hubs
    link(FX + FACT_W, mid(40), HX, mid(85)),
    link(FX + FACT_W, mid(130), HX, mid(85)),
    link(FX + FACT_W, mid(40), HX, mid(265)),
    link(FX + FACT_W, mid(130), HX, mid(265)),
    link(FX + FACT_W, mid(220), HX, mid(265)),
    link(FX + FACT_W, mid(400), HX, mid(265)),
    link(FX + FACT_W, mid(130), HX, mid(400)),
    link(FX + FACT_W, mid(310), HX, mid(400)),

    // hubs -> dimensions, and the snowflake arm
    link(HX + DIM_W, mid(85), DX, mid(30)),
    link(HX + DIM_W, mid(85), DX, mid(100)),
    link(HX + DIM_W, mid(85), DX, mid(170)),
    link(HX + DIM_W, mid(265), DX, mid(265)),
    link(DX + DIM_W / 2, 265 + H, DX + DIM_W / 2, 345),
  ].join('');

  return svg('0 0 850 460', body);
}

const DIAGRAMS = { widgets, optimopsStar };

export function renderDiagram(id) {
  const build = DIAGRAMS[id];
  if (!build) throw new Error(`Unknown diagram: ${id}`);
  return build();
}

export const DIAGRAM_IDS = Object.keys(DIAGRAMS);
