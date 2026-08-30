import { translate } from './i18n/index.js';
import { loadApi } from './player.js';
import { LETTERS, letterVideoId, letterHasVideo } from './data/letters.js';

const HOST = 'https://www.youtube-nocookie.com';

/**
 * Each love letter gets its own small player beside it. Same bargain as the
 * music page: our own artwork sits there until somebody presses play, and only
 * then does anything reach YouTube. Twenty-six of these on one page and not one
 * request goes out unasked.
 *
 * Plenty of soundtrack labels put their catalogue on YouTube and then forbid
 * playing it anywhere else, which the player reports as error 150. There is no
 * way to know that before trying, so the letter tries: if the embed is refused
 * it turns into a link to YouTube rather than a box that does nothing. That is
 * why a letter only ever needs one link, whatever kind it turns out to be.
 */
export function initLetters({ dict, getLang }) {
  const slots = [...document.querySelectorAll('[data-letter]')];
  if (slots.length === 0) return;

  const t = (key) => translate(dict, getLang(), key);
  const byId = new Map(LETTERS.map((letter) => [letter.id, letter]));
  const refused = new Set();          // ids YouTube has already turned down

  const sleeve = '<span class="letter__sleeve" aria-hidden="true">' +
    '<span class="letter__grooves"></span></span>';

  /**
   * Our own copy of the video's thumbnail, fetched by tools/build-thumbs.py.
   * Serving it from here rather than i.ytimg.com is what keeps the promise that
   * nothing reaches YouTube until somebody presses play.
   */
  const art = (letter) =>
    `<img class="letter__thumb" src="assets/thumbs/${letter.id}.jpg" alt="" ` +
    'loading="lazy" decoding="async" width="1000" height="562">';

  const outLink = (letter) =>
    `<a class="letter__out" href="https://www.youtube.com/watch?v=${letterVideoId(letter)}" ` +
    `target="_blank" rel="noopener noreferrer">${t('c.player.out')}</a>`;

  function paint() {
    for (const slot of slots) {
      const letter = byId.get(slot.dataset.letter);
      if (!letter) continue;
      if (slot.classList.contains('is-live')) continue;   // playing, leave it

      if (!letterHasVideo(letter)) {
        slot.classList.add('is-pending');
        slot.innerHTML = `${sleeve}<p class="letter__pending">${t('c.player.pending')}</p>`;
        continue;
      }

      if (refused.has(letter.id)) {
        slot.classList.add('is-pending');
        slot.innerHTML = art(letter) + outLink(letter);
        continue;
      }

      slot.classList.remove('is-pending');
      slot.innerHTML =
        `<button type="button" class="letter__play" aria-label="${t('c.player.play')} ${letter.composer}">` +
        art(letter) +
        '<span class="letter__badge" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" focusable="false" fill="currentColor"><path d="M8 5.6v12.8l10-6.4z"/></svg>' +
        '</span>' +
        `<span class="letter__cta">${t('c.player.play')}</span>` +
        '</button>';
    }
  }

  /** The embed was refused, or the API never arrived. Offer the door out. */
  function giveUp(slot, letter) {
    refused.add(letter.id);
    slot.classList.remove('is-live');
    slot.classList.add('is-pending');
    slot.innerHTML = art(letter) + outLink(letter);
  }

  async function play(slot, letter) {
    slot.classList.remove('is-pending');
    slot.classList.add('is-live');
    slot.replaceChildren();

    let YT;
    try {
      YT = await loadApi();
    } catch {
      giveUp(slot, letter);
      return;
    }

    const host = document.createElement('div');
    slot.appendChild(host);

    new YT.Player(host, {
      host: HOST,
      videoId: letterVideoId(letter),
      playerVars: { rel: 0, modestbranding: 1, playsinline: 1, autoplay: 1 },
      events: {
        onReady: (event) => event.target.playVideo(),
        // 101 and 150 both mean "not allowed off site". 2 and 100 mean the id
        // is wrong or the video is gone, which deserves the same honest exit.
        onError: () => giveUp(slot, letter),
      },
    });
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest('.letter__play');
    if (!button) return;
    const slot = button.closest('[data-letter]');
    const letter = byId.get(slot?.dataset.letter);
    if (letter) play(slot, letter);
  });

  document.addEventListener('lang:changed', paint);
  paint();
}
