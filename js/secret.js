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

const DOT = '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
  '<circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".45"/>' +
  '<circle cx="32" cy="32" r="6" fill="currentColor"/>' +
  '</svg>';

/* A cat sitting with its tail curled round its feet, drawn as solid shapes so
   it still reads as a cat at thumbnail size. */
const CAT = '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" fill="currentColor">' +
  '<path class="secret__tail" d="M45.5 57.5c6.6.4 11.4-3.3 12.6-9 1.2-5.6-1.6-11-6.2-12.9a2.6 2.6 0 0 0-2 4.8c2.6 1.1 4.2 4.2 3.5 7.5-.7 3.2-3.4 5.2-7.6 4.9a2.35 2.35 0 0 0-.3 4.7z"/>' +
  '<path d="M19.6 21.4 17.2 8.9a1.5 1.5 0 0 1 2.3-1.5l9.8 6.6a20 20 0 0 1 5.4 0l9.8-6.6a1.5 1.5 0 0 1 2.3 1.5l-2.4 12.5z"/>' +
  '<ellipse cx="32" cy="28.5" rx="14.2" ry="12"/>' +
  '<path d="M32 37.8c9.4 0 16 8.2 16 16.4 0 3.1-1.7 4.8-4.6 4.8H20.6c-2.9 0-4.6-1.7-4.6-4.8 0-8.2 6.6-16.4 16-16.4z"/>' +
  '<g class="secret__face">' +
  '<ellipse class="secret__eye" cx="26.4" cy="27.4" rx="2.1" ry="2.7" fill="var(--bg)"/>' +
  '<ellipse class="secret__eye" cx="37.6" cy="27.4" rx="2.1" ry="2.7" fill="var(--bg)"/>' +
  '<path d="M32 32.2l-2.1 1.9h4.2z" fill="var(--bg)"/>' +
  '</g>' +
  '<path d="M8.5 26.5h8M8.9 31.6l7.7-1.4M55.5 26.5h-8M55.1 31.6l-7.7-1.4" fill="none" ' +
  'stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>' +
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
