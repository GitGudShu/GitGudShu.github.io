import { translate } from './i18n/index.js';
import { LETTERS, letterVideoId, letterHasVideo } from './data/letters.js';

const HOST = 'https://www.youtube-nocookie.com';

/**
 * Each love letter gets its own small player beside it. Same bargain as the
 * music page: our own artwork sits there until somebody presses play, and only
 * then does an iframe appear, pointed at the no-cookie host. Twenty-six of
 * these on one page and not one request goes out unasked.
 */
export function initLetters({ dict, getLang }) {
  const slots = [...document.querySelectorAll('[data-letter]')];
  if (slots.length === 0) return;

  const t = (key) => translate(dict, getLang(), key);
  const byId = new Map(LETTERS.map((letter) => [letter.id, letter]));

  const paint = () => {
    for (const slot of slots) {
      const letter = byId.get(slot.dataset.letter);
      if (!letter) continue;

      if (slot.querySelector('iframe')) continue;      // already playing, leave it

      const sleeve = '<span class="letter__sleeve" aria-hidden="true">' +
        '<span class="letter__grooves"></span></span>';

      if (!letterHasVideo(letter)) {
        // Plenty of labels put their catalogue on YouTube but forbid off-site
        // play. Sending the reader out beats a box that does nothing.
        slot.classList.add('is-pending');
        slot.innerHTML = sleeve + (letter.watch
          ? `<a class="letter__out" href="${letter.watch}" target="_blank" rel="noopener noreferrer">` +
            `${t('c.player.out')}</a>`
          : `<p class="letter__pending">${t('c.player.pending')}</p>`);
        continue;
      }

      slot.classList.remove('is-pending');
      slot.innerHTML =
        `<button type="button" class="letter__play" aria-label="${t('c.player.play')} ${letter.composer}">` +
        sleeve +
        '<span class="letter__badge" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" focusable="false" fill="currentColor"><path d="M8 5.6v12.8l10-6.4z"/></svg>' +
        '</span>' +
        `<span class="letter__cta">${t('c.player.play')}</span>` +
        '</button>';
    }
  };

  document.addEventListener('click', (event) => {
    const button = event.target.closest('.letter__play');
    if (!button) return;
    const slot = button.closest('[data-letter]');
    const letter = byId.get(slot?.dataset.letter);
    if (!letter) return;

    const frame = document.createElement('iframe');
    frame.src = `${HOST}/embed/${letterVideoId(letter)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    frame.title = letter.composer;
    frame.loading = 'lazy';
    frame.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
    frame.allowFullscreen = true;
    slot.replaceChildren(frame);
    slot.classList.add('is-live');
  });

  document.addEventListener('lang:changed', paint);
  paint();
}
