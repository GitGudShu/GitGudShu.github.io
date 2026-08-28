/** Icons defined once. All decorative, all currentColor. */

const svg = (body, extra) =>
  `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" ${extra}>${body}</svg>`;

const filled = (body) => svg(body, 'fill="currentColor"');

const stroked = (body) =>
  svg(body, 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"');

export const ICONS = {
  github: filled(
    '<path d="M12 1.7a10.3 10.3 0 0 0-3.26 20.07c.52.1.71-.22.71-.5v-1.75c-2.87.62-3.48-1.38-3.48-1.38-.47-1.2-1.15-1.52-1.15-1.52-.94-.64.07-.63.07-.63 1.04.07 1.58 1.07 1.58 1.07.92 1.58 2.42 1.12 3.01.86.09-.67.36-1.13.66-1.39-2.29-.26-4.7-1.15-4.7-5.1 0-1.13.4-2.05 1.06-2.77-.1-.26-.46-1.31.1-2.73 0 0 .87-.28 2.85 1.06a9.9 9.9 0 0 1 5.19 0c1.98-1.34 2.85-1.06 2.85-1.06.56 1.42.21 2.47.1 2.73.66.72 1.06 1.64 1.06 2.77 0 3.96-2.42 4.83-4.72 5.09.37.32.7.95.7 1.92v2.85c0 .28.19.61.72.5A10.3 10.3 0 0 0 12 1.7Z"/>',
  ),
  linkedin: filled(
    '<path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.75h4V20.5H3V9.75Zm6.5 0h3.83v1.47h.05a4.2 4.2 0 0 1 3.78-2.08c4.04 0 4.79 2.66 4.79 6.12v5.24h-4v-4.65c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73h-4V9.75Z"/>',
  ),
  mail: stroked('<rect x="2.8" y="4.8" width="18.4" height="14.4" rx="2.4"/><path d="m3.4 6.6 8.6 6 8.6-6"/>'),
  location: stroked('<path d="M12 21.2s6.6-5.2 6.6-10.2a6.6 6.6 0 1 0-13.2 0c0 5 6.6 10.2 6.6 10.2Z"/><circle cx="12" cy="11" r="2.4"/>'),
  arrow: stroked('<path d="M4.8 12h14.4M13.6 6.4 19.2 12l-5.6 5.6"/>'),
  external: stroked('<path d="M14 4.8h5.2V10M19.2 4.8 11 13M18 14v4.4a1.8 1.8 0 0 1-1.8 1.8H5.6a1.8 1.8 0 0 1-1.8-1.8V7.8A1.8 1.8 0 0 1 5.6 6H10"/>'),

  // Hobby motifs — larger, more illustrative than the UI icons above.
  note: stroked('<path d="M9 18.2V5.4l10-2v12.4"/><ellipse cx="6.6" cy="18.4" rx="2.6" ry="2.2"/><ellipse cx="16.6" cy="16.2" rx="2.6" ry="2.2"/>'),
  controller: stroked('<rect x="2.4" y="7.4" width="19.2" height="10.4" rx="4.2"/><path d="M7 11v3.2M5.4 12.6h3.2"/><circle cx="16" cy="12" r=".9"/><circle cx="18.4" cy="14.2" r=".9"/>'),
  kamae: stroked('<circle cx="12" cy="4.8" r="2.2"/><path d="M12 7.4v6.2M12 13.6 8 20M12 13.6 16 20M5.6 10.4 12 9.2l6.4 1.2"/>'),
};

export function renderIcon(name) {
  const markup = ICONS[name];
  if (!markup) throw new Error(`Unknown icon: ${name}`);
  return markup;
}
