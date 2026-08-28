import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECTS, renderProjectCard } from '../js/data/projects.js';
import { COVER_IDS } from '../js/covers.js';
import { home } from '../js/i18n/home.js';
import { LANGS, translate } from '../js/i18n/index.js';

test('ships exactly six cards: five flagships plus the placeholder', () => {
  assert.equal(PROJECTS.length, 6);
  assert.equal(PROJECTS.filter((p) => p.placeholder).length, 1);
});

test('the flagship order matches the intended narrative', () => {
  assert.deepEqual(
    PROJECTS.map((p) => p.id),
    ['optimops', 'kpi-engine', 'emotion-recognition', 'predictops', 'ars', 'wip'],
  );
});

test('every project points at a cover that actually exists', () => {
  for (const project of PROJECTS) {
    assert.ok(COVER_IDS.includes(project.cover), `${project.id}: unknown cover "${project.cover}"`);
  }
});

test('every flagship links to its page; the placeholder links nowhere', () => {
  for (const project of PROJECTS) {
    if (project.placeholder) {
      assert.equal(project.href, null, `${project.id} should not be a link`);
    } else {
      assert.equal(project.href, `projects/${project.id}.html`);
    }
  }
});

test('every project has at least three tags', () => {
  for (const project of PROJECTS) {
    if (project.placeholder) continue;
    assert.ok(project.tags.length >= 3, `${project.id} has too few tags`);
  }
});

test('the home dictionary defines all four card keys for every project, in both languages', () => {
  for (const project of PROJECTS) {
    for (const field of ['role', 'year', 'title', 'summary']) {
      const key = `work.${project.id}.${field}`;
      for (const lang of LANGS) {
        assert.notEqual(
          translate(home, lang, key), key,
          `missing ${lang} string for ${key}`,
        );
      }
    }
  }
});

test('a flagship card renders as one anchor with its cover, title and tags', () => {
  const optimops = PROJECTS[0];
  const html = renderProjectCard(optimops, home, 'en');
  assert.match(html, /^<a /, 'flagship card must be a single anchor');
  assert.match(html, /href="projects\/optimops\.html"/);
  assert.match(html, /<svg/, 'cover motif missing');
  assert.match(html, /Python/, 'tags missing');
  assert.doesNotMatch(html, /aria-disabled/);
});

test('the placeholder renders as a non-link article marked aria-disabled', () => {
  const wip = PROJECTS.at(-1);
  const html = renderProjectCard(wip, home, 'en');
  assert.match(html, /^<article /);
  assert.match(html, /aria-disabled="true"/);
  assert.doesNotMatch(html, /<a /, 'placeholder must not contain a link');
});

test('rendering escapes nothing unexpected — no raw undefined leaks into markup', () => {
  for (const lang of LANGS) {
    for (const project of PROJECTS) {
      const html = renderProjectCard(project, home, lang);
      assert.doesNotMatch(html, /undefined/, `${project.id}/${lang} leaked undefined`);
    }
  }
});
