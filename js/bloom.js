/**
 * A small flower opens wherever you tap the empty parts of the page.
 *
 * It is deliberately fussy about where it fires. Anything you could click for a
 * reason is off limits, so pressing play or following a link never throws
 * petals at you, and neither does selecting a sentence. What is left is the
 * background, which is exactly the bit nobody usually rewards you for touching.
 */

/** Anything with a job. A click on one of these is not a click on nothing. */
const INTERACTIVE = 'a, button, input, textarea, select, label, summary, details, ' +
  'iframe, video, audio, canvas, [role="button"], [role="link"], [contenteditable], [tabindex]';

export const PETALS = 5;
const LIFETIME = 900;
const MAX_LIVE = 14;

/** Is this a click on the page itself, rather than on something that does a thing? */
export function isBareSpot(target, root = document.body) {
  if (typeof target?.closest !== 'function') return false;   // text nodes, window
  if (!root.contains(target)) return false;
  return target.closest(INTERACTIVE) === null;
}

/** Petals fan out evenly, then get nudged so no two blooms look like twins. */
export function petalAngles(count = PETALS, jitter = () => Math.random()) {
  const step = 360 / count;
  return Array.from({ length: count }, (_, i) =>
    Math.round(i * step + (jitter() - 0.5) * step * 0.5));
}

export function initBloom({ root = document.body, reduced = false } = {}) {
  if (reduced) return { destroy() {} };

  const live = new Set();

  function bloom(x, y) {
    // Old blooms give way rather than piling up if somebody gets excited.
    while (live.size >= MAX_LIVE) {
      const oldest = live.values().next().value;
      oldest.remove();
      live.delete(oldest);
    }

    const flower = document.createElement('span');
    flower.className = 'bloom';
    flower.setAttribute('aria-hidden', 'true');
    flower.style.setProperty('--x', `${x}px`);
    flower.style.setProperty('--y', `${y}px`);
    flower.style.setProperty('--tilt', `${Math.round(Math.random() * 360)}deg`);

    for (const angle of petalAngles()) {
      const petal = document.createElement('span');
      petal.className = 'bloom__petal';
      petal.style.setProperty('--a', `${angle}deg`);
      flower.appendChild(petal);
    }
    const heart = document.createElement('span');
    heart.className = 'bloom__heart';
    flower.appendChild(heart);

    root.appendChild(flower);
    live.add(flower);
    setTimeout(() => {
      flower.remove();
      live.delete(flower);
    }, LIFETIME);
  }

  function onClick(event) {
    if (event.button !== 0) return;                    // left button only
    if (event.detail > 1) return;                      // not on a double click
    if (!isBareSpot(event.target, root)) return;
    // Finishing a text selection is not a tap.
    if (String(window.getSelection?.() ?? '').length) return;
    bloom(event.clientX, event.clientY);
  }

  root.addEventListener('click', onClick);
  return { destroy() { root.removeEventListener('click', onClick); } };
}
