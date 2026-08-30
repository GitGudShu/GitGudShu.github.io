import { readStored, writeStored } from './storage.js';
import { translate } from './i18n/index.js';

export const FOUND_KEY = 'tc-colour-found';
export const TO_CAT = 10;
export const TO_OPEN = 20;
export const DESTINATION = 'the-color-i-was-chasing.html';

/** What the button is at a given number of clicks. */
export function stageFor(clicks) {
  if (clicks >= TO_OPEN) return 'open';
  if (clicks >= TO_CAT) return 'cat';
  return 'dot';
}

/** Purrs get longer the more you scratch. Capped, because so does patience. */
export function purrLength(clicks) {
  const past = Math.max(0, clicks - TO_CAT);
  return Math.min(6, 2 + past);
}

const DOT = '<svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" fill="none" ' +
  'stroke="currentColor" stroke-width="2"><circle cx="20" cy="20" r="6"/></svg>';

const CAT = '<svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" fill="none" ' +
  'stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' +
  '<path d="M11 17l-2-8 8 4M29 17l2-8-8 4"/>' +
  '<circle cx="20" cy="22" r="10"/>' +
  '<path class="secret__eye" d="M16 20.5v1.5M24 20.5v1.5"/>' +
  '<path d="M18.5 25.5q1.5 1.4 3 0"/>' +
  '<path d="M8 23h5M27 23h5" opacity=".55"/>' +
  '</svg>';

/**
 * A very small button that only turns up once you have read to the end, and
 * only opens if you keep bothering it. Twenty clicks. Ten to find the cat, ten
 * more because the cat is nice.
 */
export function initSecret({ root, sentinel, dict, getLang }) {
  if (!root) return { destroy() {} };

  const t = (key) => translate(dict, getLang(), key);
  const already = readStored(FOUND_KEY) === '1';
  let clicks = already ? TO_OPEN : 0;
  let purrTimer = 0;

  function label() {
    const stage = stageFor(clicks);
    const key = stage === 'open' ? 'm.secret.open' : stage === 'cat' ? 'm.secret.cat' : 'm.secret.dot';
    root.setAttribute('aria-label', t(key));
    root.setAttribute('data-i18n-attr', `aria-label:${key}`);
  }

  function paint() {
    const stage = stageFor(clicks);
    root.dataset.stage = stage;
    root.innerHTML = stage === 'dot' ? DOT : CAT;
    if (stage === 'open') root.href = DESTINATION;
    label();
  }

  function reveal() {
    if (root.classList.contains('is-here')) return;
    root.classList.add('is-here');
    root.removeAttribute('tabindex');
    root.setAttribute('aria-hidden', 'false');
  }

  root.addEventListener('click', (event) => {
    if (stageFor(clicks) === 'open') return;    // it is a real link now, let it be
    event.preventDefault();

    clicks += 1;
    const stage = stageFor(clicks);

    if (stage === 'open') {
      writeStored(FOUND_KEY, '1');
      paint();
      root.classList.add('is-opening');
      // Long enough to see the door swing, short enough not to feel broken.
      setTimeout(() => { window.location.href = DESTINATION; }, 620);
      return;
    }

    if (clicks === TO_CAT) {
      paint();
      root.classList.add('is-becoming');
      setTimeout(() => root.classList.remove('is-becoming'), 700);
      return;
    }

    if (stage === 'cat') {
      root.classList.remove('is-purring');
      void root.offsetWidth;                    // restart the animation
      root.style.setProperty('--purr', String(purrLength(clicks)));
      root.classList.add('is-purring');
      clearTimeout(purrTimer);
      purrTimer = setTimeout(() => root.classList.remove('is-purring'), 1400);
      navigator.vibrate?.([18, 40, 18, 40, 18]);
      return;
    }

    root.classList.remove('is-nudged');
    void root.offsetWidth;
    root.classList.add('is-nudged');
    navigator.vibrate?.(12);
  });

  if (sentinel && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        reveal();
        io.disconnect();
      }
    }, { rootMargin: '0px 0px -40px 0px' });
    io.observe(sentinel);
  } else {
    reveal();
  }

  document.addEventListener('lang:changed', label);
  paint();

  return { destroy() { clearTimeout(purrTimer); } };
}
