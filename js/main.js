import { initTheme } from './theme.js';
import { initI18n, mergeDicts, applyDict } from './i18n/index.js';
import { common } from './i18n/common.js';
import { initNav } from './nav.js';
import { PROJECTS, renderProjectCard } from './data/projects.js';
import { renderIcon } from './icons.js';

function renderWork(dict) {
  const grid = document.getElementById('work-grid');
  if (!grid) return;

  const arrowSlot = document.querySelector('.archive-rule__arrow');
  if (arrowSlot) arrowSlot.innerHTML = renderIcon('arrow');

  const paint = (lang) => {
    grid.innerHTML = PROJECTS.map((project) => renderProjectCard(project, dict, lang)).join('');
    grid.querySelectorAll('.card').forEach((card, i) => {
      card.classList.add('reveal');
      card.style.setProperty('--i', String(i % 3));
    });
    document.dispatchEvent(new CustomEvent('content:rendered'));
  };

  paint(document.documentElement.lang || 'en');
  document.addEventListener('lang:changed', (event) => paint(event.detail.lang));
}

async function pageDict() {
  const page = document.body.dataset.page;
  if (page === 'home') return (await import('./i18n/home.js')).home;
  if (page === 'archive') return (await import('./i18n/archive.js')).archive;
  if (page === 'project') {
    const { projects } = await import('./i18n/projects.js');
    return projects[document.body.dataset.project] ?? null;
  }
  return null;
}

async function boot() {
  initTheme({ button: document.getElementById('theme-btn') });

  const dict = mergeDicts(common, await pageDict());
  const i18n = initI18n({ dict, buttons: [...document.querySelectorAll('[data-lang]')] });

  // theme.js and nav.js rewrite their toggle's data-i18n-attr when state
  // changes. That attribute holds a key, so the visible label only updates
  // once the dictionary is applied again.
  const relabel = () => applyDict(dict, i18n.getLang());
  document.addEventListener('theme:changed', relabel);
  document.addEventListener('nav:toggled', relabel);

  renderWork(dict);

  const header = document.querySelector('.site-header');
  if (header) {
    initNav({
      header,
      toggle: document.getElementById('nav-toggle'),
      panel: document.getElementById('nav-panel'),
      links: [...document.querySelectorAll('.nav-links a[href^="#"]')],
      sections: [...document.querySelectorAll('main section[id]')],
    });
  }
}

boot();
