/** Inline SVG diagrams. currentColor only, decorative, 16:9. */

const wrap = (body) =>
  '<svg viewBox="0 0 480 270" class="diagram__art" aria-hidden="true" focusable="false" ' +
  'fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
  body +
  '</svg>';

const label = (x, y, text, size = 11) =>
  `<text x="${x}" y="${y}" fill="currentColor" stroke="none" font-size="${size}" ` +
  `font-family="ui-monospace, monospace" text-anchor="middle">${text}</text>`;

const box = (x, y, w, h, opacity = '.7') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" stroke-width="1.3" opacity="${opacity}"/>`;

const arrow = (x1, y, x2) =>
  `<path d="M${x1} ${y}H${x2}" stroke-width="1.2" opacity=".45"/>` +
  `<path d="M${x2 - 6} ${y - 4}l6 4-6 4" stroke-width="1.2" opacity=".45"/>`;

/** Registry, data sources, layout builder: the widget pattern. */
function widgets() {
  const cols = [
    { x: 26, title: 'REGISTRY', rows: ['widget types', 'presets', 'rules'] },
    { x: 186, title: 'DATA SOURCE', rows: ['fetch', 'transform', 'bind'] },
    { x: 346, title: 'LAYOUT', rows: ['user picks', 'arranges', 'saves'] },
  ];

  const body = cols
    .map(({ x, title, rows }) => {
      const inner = rows
        .map((r, i) => box(x + 14, 108 + i * 34, 80, 24, '.4') + label(x + 54, 124 + i * 34, r, 9))
        .join('');
      return box(x, 60, 108, 160, '.85') + label(x + 54, 86, title, 11) + inner;
    })
    .join('');

  return wrap(body + arrow(134, 140, 186) + arrow(294, 140, 346));
}

const DIAGRAMS = { widgets };

export function renderDiagram(id) {
  const build = DIAGRAMS[id];
  if (!build) throw new Error(`Unknown diagram: ${id}`);
  return build();
}

export const DIAGRAM_IDS = Object.keys(DIAGRAMS);
