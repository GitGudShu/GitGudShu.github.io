import { initTheme } from './theme.js';
import { initI18n, mergeDicts, applyDict } from './i18n/index.js';
import { common } from './i18n/common.js';
import { initNav } from './nav.js';
import { PROJECTS, renderProjectCard } from './data/projects.js';
import { renderIcon } from './icons.js';
import { renderCover } from './covers.js';
import { renderDiagram } from './diagrams.js';
import { renderScene } from './scenes.js';
import { initReveal } from './reveal.js';
import { initParticles } from './particles.js';

function renderWork(dict) {
  const grid = document.getElementById('work-grid');
  if (!grid) return;

  const arrowSlot = document.querySelector('.archive-rule__arrow');
  if (arrowSlot) arrowSlot.innerHTML = renderIcon('arrow');

  const paint = (lang) => {
    // A repaint replaces the cards wholesale. Card order is PROJECTS order, so
    // index maps one-to-one: carry the revealed state over, or a language swap
    // would fade already-seen cards back out.
    const wasVisible = [...grid.children].map((card) => card.classList.contains('is-visible'));

    grid.innerHTML = PROJECTS.map((project) => renderProjectCard(project, dict, lang)).join('');
    grid.querySelectorAll('.card').forEach((card, i) => {
      card.classList.add('reveal');
      if (wasVisible[i]) card.classList.add('is-visible');
      card.style.setProperty('--i', String(i % 3));
    });
    document.dispatchEvent(new CustomEvent('content:rendered'));
  };

  paint(document.documentElement.lang || 'en');
  document.addEventListener('lang:changed', (event) => paint(event.detail.lang));
}

function paintGraphics() {
  document.querySelectorAll('[data-icon]').forEach((slot) => {
    slot.innerHTML = renderIcon(slot.dataset.icon);
  });
  document.querySelectorAll('[data-cover]').forEach((slot) => {
    slot.innerHTML = renderCover(slot.dataset.cover);
  });
  document.querySelectorAll('[data-diagram]').forEach((slot) => {
    slot.innerHTML = renderDiagram(slot.dataset.diagram);
  });
  document.querySelectorAll('[data-scene]').forEach((slot) => {
    slot.innerHTML = renderScene(slot.dataset.scene);
  });
}

async function pageDict() {
  const page = document.body.dataset.page;
  if (page === 'home') return (await import('./i18n/home.js')).home;
  if (page === 'archive') return (await import('./i18n/archive.js')).archive;
  if (page === 'music') return (await import('./i18n/music.js')).music;
  if (page === 'color') return (await import('./i18n/color.js')).color;
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
  paintGraphics();

  initReveal();
  initParticles({ canvas: document.getElementById('particles') });

  const player = document.getElementById('player');
  if (player) {
    const { initPlayer } = await import('./player.js');
    initPlayer({ root: player, dict, getLang: i18n.getLang });
  }

  if (document.querySelector('[data-letter]')) {
    const { initLetters } = await import('./letters.js');
    initLetters({ dict, getLang: i18n.getLang });
  }

  const secret = document.getElementById('secret');
  if (secret) {
    const { initSecret } = await import('./secret.js');
    initSecret({
      root: secret,
      sentinel: document.querySelector('[data-secret-sentinel]'),
      dict,
      getLang: i18n.getLang,
    });
  }

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
