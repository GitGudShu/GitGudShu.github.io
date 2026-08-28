import { renderCover } from '../covers.js';
import { renderDiagram } from '../diagrams.js';
import { renderIcon } from '../icons.js';
import { translate } from '../i18n/index.js';

/**
 * Card order is the narrative order. `id` doubles as the page slug and the
 * i18n key namespace. The card cover is a redacted screenshot where one exists,
 * a diagram where it does not, and the SVG motif as a last resort.
 */
export const PROJECTS = [
  {
    id: 'optimops',
    href: 'projects/optimops.html',
    cover: 'optimops',
    shot: { src: 'assets/screens/optimops-coverage.jpg', w: 1098, h: 531, alt: 'work.shot.optimops' },
    tags: ['Python', 'FastAPI', 'Vue 3', 'Quasar', 'Parquet'],
  },
  {
    id: 'emotion-recognition',
    href: 'projects/emotion-recognition.html',
    cover: 'emotion',
    shot: { src: 'assets/screens/emotion-sweep.jpg', w: 1200, h: 458, alt: 'work.shot.emotion' },
    tags: ['PyTorch', 'DeBERTa', 'Transformers', 'W&B'],
  },
  {
    id: 'predictops',
    href: 'projects/predictops.html',
    cover: 'predictops',
    shot: { src: 'assets/screens/predictops-weather.jpg', w: 1200, h: 780, alt: 'work.shot.predictops' },
    tags: ['Python', 'scikit-learn', 'Vue 3', 'Quasar'],
  },
  {
    id: 'ars',
    href: 'projects/ars.html',
    cover: 'ars',
    diagram: 'widgets',
    tags: ['Flask', 'MongoDB', 'Vue 3', 'Leaflet'],
  },
  {
    id: 'wip',
    href: null,
    cover: 'wip',
    tags: [],
    placeholder: true,
  },
];

function renderCoverArea(project, dict, lang) {
  if (project.placeholder) {
    return `<div class="card__cover card__cover--placeholder">${renderCover(project.cover)}` +
      '<img src="assets/images/profile.png" width="500" height="500" alt="" loading="lazy" class="card__mascot">' +
      '</div>';
  }
  if (project.diagram) {
    return `<div class="card__cover card__cover--diagram">${renderDiagram(project.diagram)}</div>`;
  }
  if (project.shot) {
    const { src, w, h, alt } = project.shot;
    return '<div class="card__cover card__cover--shot">' +
      `<img src="${src}" width="${w}" height="${h}" loading="lazy" ` +
      `alt="${translate(dict, lang, alt)}">` +
      '</div>';
  }
  return `<div class="card__cover">${renderCover(project.cover)}</div>`;
}

function cardInner(project, dict, lang) {
  const t = (field) => translate(dict, lang, `work.${project.id}.${field}`);

  const tags = project.tags.length
    ? `<ul class="card__tags">${project.tags.map((tag) => `<li>${tag}</li>`).join('')}</ul>`
    : '';
  const arrow = project.placeholder ? '' : `<span class="card__arrow">${renderIcon('arrow')}</span>`;

  return (
    renderCoverArea(project, dict, lang) +
    '<div class="card__body">' +
      `<p class="eyebrow card__meta"><span>${t('role')}</span><span>${t('year')}</span></p>` +
      `<h3 class="card__title">${t('title')}</h3>` +
      `<p class="card__summary">${t('summary')}</p>` +
      tags +
      arrow +
    '</div>'
  );
}

export function renderProjectCard(project, dict, lang) {
  const inner = cardInner(project, dict, lang);

  if (project.placeholder) {
    return `<article class="card card--placeholder" aria-disabled="true">${inner}</article>`;
  }
  // One anchor wraps the card: a single labelled link, and text stays selectable.
  return `<a class="card" href="${project.href}">${inner}</a>`;
}
