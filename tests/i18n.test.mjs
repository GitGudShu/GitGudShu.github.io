import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LANGS,
  DEFAULT_LANG,
  STORAGE_KEY,
  resolveLang,
  mergeDicts,
  parityReport,
  translate,
} from '../js/i18n/index.js';
import { common } from '../js/i18n/common.js';

test('exposes exactly the two supported languages, English first', () => {
  assert.deepEqual(LANGS, ['en', 'fr']);
  assert.equal(DEFAULT_LANG, 'en');
  assert.equal(STORAGE_KEY, 'tc-lang');
});

test('an explicitly stored language wins over browser preferences', () => {
  assert.equal(resolveLang('fr', ['en-GB', 'en']), 'fr');
  assert.equal(resolveLang('en', ['fr-FR']), 'en');
});

test('falls back to a browser preference when nothing is stored', () => {
  assert.equal(resolveLang(null, ['fr-FR', 'fr']), 'fr');
  assert.equal(resolveLang(null, ['fr']), 'fr');
});

test('falls back to English for unsupported or absent preferences', () => {
  assert.equal(resolveLang(null, ['de-DE', 'es']), 'en');
  assert.equal(resolveLang(null, []), 'en');
  assert.equal(resolveLang('klingon', []), 'en');
});

test('mergeDicts combines per-language namespaces without cross-contamination', () => {
  const a = { en: { 'x.a': 'A' }, fr: { 'x.a': 'A-fr' } };
  const b = { en: { 'x.b': 'B' }, fr: { 'x.b': 'B-fr' } };
  const merged = mergeDicts(a, b);
  assert.deepEqual(merged.en, { 'x.a': 'A', 'x.b': 'B' });
  assert.deepEqual(merged.fr, { 'x.a': 'A-fr', 'x.b': 'B-fr' });
});

test('parityReport names the keys missing from each side', () => {
  const report = parityReport({ en: { a: '1', b: '2' }, fr: { a: '1', c: '3' } });
  assert.deepEqual(report.missingInFr, ['b']);
  assert.deepEqual(report.missingInEn, ['c']);
});

test('the shared dictionary is already at full parity', () => {
  const report = parityReport(common);
  assert.deepEqual(report.missingInEn, []);
  assert.deepEqual(report.missingInFr, []);
});

test('the shared dictionary has no empty strings in either language', () => {
  for (const lang of LANGS) {
    for (const [key, value] of Object.entries(common[lang])) {
      assert.ok(
        typeof value === 'string' && value.trim().length > 0,
        `common.${lang}.${key} is empty`,
      );
    }
  }
});

test('translate falls back to English, then to the key itself', () => {
  const dict = { en: { a: 'Alpha' }, fr: {} };
  assert.equal(translate(dict, 'fr', 'a'), 'Alpha');
  assert.equal(translate(dict, 'fr', 'missing'), 'missing');
  assert.equal(translate(dict, 'en', 'a'), 'Alpha');
});
