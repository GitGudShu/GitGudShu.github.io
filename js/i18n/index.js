import { readStored, writeStored } from '../storage.js';

export const LANGS = ['en', 'fr'];
export const DEFAULT_LANG = 'en';
export const STORAGE_KEY = 'tc-lang';

/**
 * Stored choice wins; otherwise the first browser preference whose base tag is
 * supported; otherwise English.
 */
export function resolveLang(stored, preferred = [], langs = LANGS, fallback = DEFAULT_LANG) {
  if (langs.includes(stored)) return stored;
  for (const tag of preferred) {
    const base = String(tag).toLowerCase().split('-')[0];
    if (langs.includes(base)) return base;
  }
  return fallback;
}

export function mergeDicts(...dicts) {
  const out = {};
  for (const lang of LANGS) out[lang] = {};
  for (const dict of dicts) {
    if (!dict) continue;
    for (const lang of LANGS) Object.assign(out[lang], dict[lang] ?? {});
  }
  return out;
}

export function parityReport(dict) {
  const en = Object.keys(dict.en ?? {});
  const fr = Object.keys(dict.fr ?? {});
  return {
    missingInFr: en.filter((k) => !fr.includes(k)),
    missingInEn: fr.filter((k) => !en.includes(k)),
  };
}

export function translate(dict, lang, key) {
  return dict[lang]?.[key] ?? dict[DEFAULT_LANG]?.[key] ?? key;
}

/**
 * Applies a dictionary to the DOM.
 *
 * `data-i18n="key"`                        -> textContent
 * `data-i18n-html="key"`                   -> innerHTML (only for strings this
 *                                             project authors, never user input)
 * `data-i18n-attr="alt:key,aria-label:key" -> attributes
 */
export function applyDict(dict, lang, root = document) {
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = translate(dict, lang, el.dataset.i18n);
  });

  root.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = translate(dict, lang, el.dataset.i18nHtml);
  });

  root.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    for (const pair of el.dataset.i18nAttr.split(',')) {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      if (attr && key) el.setAttribute(attr, translate(dict, lang, key));
    }
  });

  const title = translate(dict, lang, 'meta.title');
  if (title !== 'meta.title') document.title = title;

  const description = document.querySelector('meta[name="description"]');
  const descText = translate(dict, lang, 'meta.description');
  if (description && descText !== 'meta.description') description.content = descText;

  document.documentElement.lang = lang;
}

export function initI18n({ dict, buttons = [] }) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = resolveLang(readStored(STORAGE_KEY), navigator.languages ?? []);

  applyDict(dict, current);
  syncButtons();

  function syncButtons() {
    for (const button of buttons) {
      const isActive = button.dataset.lang === current;
      button.setAttribute('aria-pressed', String(isActive));
      button.classList.toggle('is-active', isActive);
    }
    document.dispatchEvent(new CustomEvent('lang:changed', { detail: { lang: current } }));
  }

  function commit(lang) {
    current = lang;
    applyDict(dict, current);
    writeStored(STORAGE_KEY, current);
    syncButtons();
  }

  function setLang(lang) {
    if (!LANGS.includes(lang) || lang === current) return;
    if (reduced) { commit(lang); return; }

    // Brief blur-fade so differing string lengths do not pop.
    const main = document.querySelector('main');
    if (!main) { commit(lang); return; }
    main.classList.add('is-swapping');
    window.setTimeout(() => {
      commit(lang);
      window.requestAnimationFrame(() => main.classList.remove('is-swapping'));
    }, 120);
  }

  for (const button of buttons) {
    button.addEventListener('click', () => setLang(button.dataset.lang));
  }

  return {
    getLang: () => current,
    setLang,
    toggle: () => setLang(current === 'en' ? 'fr' : 'en'),
  };
}
