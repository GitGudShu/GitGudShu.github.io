import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { projects } from '../js/i18n/projects.js';
import { PROJECTS } from '../js/data/projects.js';
import { parityReport, LANGS, translate } from '../js/i18n/index.js';

/** Slugs whose pages exist at this point. Task 12 extends this list. */
const BUILT = ['optimops', 'kpi-engine'];

const REQUIRED_KEYS = [
  'meta.title', 'meta.description',
  'p.eyebrow', 'p.title', 'p.lead',
  'p.facts.role.label', 'p.facts.role.value',
  'p.facts.stack.label', 'p.facts.stack.value',
  'p.facts.scope.label', 'p.facts.scope.value',
  'p.facts.status.label', 'p.facts.status.value',
  'p.context.title', 'p.context.body',
  'p.built.title', 'p.built.body',
  'p.decisions.title', 'p.decisions.body',
  'p.outcome.title', 'p.outcome.body',
  'p.nav.prev', 'p.nav.next',
];

test('every built page has a dictionary keyed by its slug', () => {
  for (const slug of BUILT) {
    assert.ok(projects[slug], `no dictionary for ${slug}`);
  }
});

test('dictionary slugs are a subset of the project slugs on the homepage', () => {
  const known = PROJECTS.filter((p) => !p.placeholder).map((p) => p.id);
  for (const slug of Object.keys(projects)) {
    assert.ok(known.includes(slug), `${slug} has a dictionary but no card`);
  }
});

test('every built dictionary defines the full key contract in both languages', () => {
  for (const slug of BUILT) {
    for (const key of REQUIRED_KEYS) {
      for (const lang of LANGS) {
        assert.notEqual(
          translate(projects[slug], lang, key), key,
          `${slug}: missing ${lang} string for ${key}`,
        );
      }
    }
  }
});

test('every built dictionary is at full FR/EN parity', () => {
  for (const slug of BUILT) {
    const report = parityReport(projects[slug]);
    assert.deepEqual(report.missingInEn, [], `${slug}: keys missing from en`);
    assert.deepEqual(report.missingInFr, [], `${slug}: keys missing from fr`);
  }
});

test('confidential terms never appear in any project copy', () => {
  // Client identity and real figures must not leak. Bare "SDIS" is forbidden;
  // the generic "fire & rescue service" framing is what pages use instead.
  const forbidden = [/\bSDIS\b/i, /\bDoubs\b/i, /\bSDIS\s*25\b/i, /\bCIS\s+[A-ZÉÈ][a-zéèê]+/];
  for (const [slug, dict] of Object.entries(projects)) {
    for (const lang of LANGS) {
      for (const [key, value] of Object.entries(dict[lang])) {
        for (const pattern of forbidden) {
          assert.doesNotMatch(value, pattern, `${slug}.${lang}.${key} leaks "${pattern}"`);
        }
      }
    }
  }
});

test('project copy carries no academic competency codes or semester numbers', () => {
  for (const [slug, dict] of Object.entries(projects)) {
    for (const lang of LANGS) {
      for (const [key, value] of Object.entries(dict[lang])) {
        assert.doesNotMatch(value, /\bS[1-6]\.\d/, `${slug}.${lang}.${key} has a semester code`);
        assert.doesNotMatch(value, /\bC[1-6]\.\d/, `${slug}.${lang}.${key} has a competency code`);
      }
    }
  }
});

test('each built page wires the right slug and page type, and links back home', async () => {
  for (const slug of BUILT) {
    const html = await readFile(new URL(`../projects/${slug}.html`, import.meta.url), 'utf8');
    assert.match(html, /data-page="project"/, `${slug}: missing data-page`);
    assert.match(html, new RegExp(`data-project="${slug}"`), `${slug}: wrong data-project`);
    assert.match(html, /href="\.\.\/index\.html#work"/, `${slug}: missing back link`);
    assert.match(html, /href="\.\.\/css\/tokens\.css"/, `${slug}: asset paths not relative`);
    assert.match(html, /type="module" src="\.\.\/js\/main\.js"/, `${slug}: script path wrong`);
  }
});

test('no built page contains an inline style attribute except reveal stagger', async () => {
  for (const slug of BUILT) {
    const html = await readFile(new URL(`../projects/${slug}.html`, import.meta.url), 'utf8');
    const styles = html.match(/style="[^"]*"/g) ?? [];
    for (const style of styles) {
      assert.match(style, /^style="--i:\d+"$/, `${slug}: disallowed inline style ${style}`);
    }
  }
});
