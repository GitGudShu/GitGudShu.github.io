import { renderCover } from '../covers.js';
import { renderIcon } from '../icons.js';
import { translate } from '../i18n/index.js';

/**
 * Card order is the narrative order: the flagship platform, the engine beneath
 * it, the research work, the forecasting work, the second platform, then the
 * placeholder. `id` doubles as the page slug and the i18n key namespace.
 */
export const PROJECTS = [
  {
    id: 'optimops',
    href: 'projects/optimops.html',
    cover: 'optimops',
    tags: ['Python', 'FastAPI', 'Vue 3', 'Quasar', 'Parquet'],
  },
  {
    id: 'kpi-engine',
    href: 'projects/kpi-engine.html',
    cover: 'kpiEngine',
    tags: ['Python', 'Pandas', 'Parquet', 'pytest'],
  },
  {
    id: 'emotion-recognition',
    href: 'projects/emotion-recognition.html',
    cover: 'emotion',
    tags: ['PyTorch', 'DeBERTa', 'Transformers', 'W&B'],
  },
  {
    id: 'predictops',
    href: 'projects/predictops.html',
    cover: 'predictops',
    tags: ['Python', 'scikit-learn', 'Vue 3', 'Quasar'],
  },
  {
    id: 'ars',
    href: 'projects/ars.html',
    cover: 'ars',
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

function cardInner(project, dict, lang) {
  const t = (field) => translate(dict, lang, `work.${project.id}.${field}`);

  const cover = project.placeholder
    ? `<div class="card__cover card__cover--placeholder">${renderCover(project.cover)}` +
      '<img src="assets/images/profile.png" width="500" height="500" alt="" loading="lazy" class="card__mascot">' +
      '</div>'
    : `<div class="card__cover">${renderCover(project.cover)}</div>`;

  const tags = project.tags.length
    ? `<ul class="card__tags">${project.tags.map((tag) => `<li>${tag}</li>`).join('')}</ul>`
    : '';

  const arrow = project.placeholder ? '' : `<span class="card__arrow">${renderIcon('arrow')}</span>`;

  return (
    cover +
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

  // One anchor wraps the whole card: a single labelled link for screen readers,
  // and text stays selectable — unlike the old absolute-overlay approach.
  return `<a class="card" href="${project.href}">${inner}</a>`;
}
