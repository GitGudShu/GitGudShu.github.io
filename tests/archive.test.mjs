import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { archive } from '../js/i18n/archive.js';
import { parityReport, LANGS, translate } from '../js/i18n/index.js';

const ENTRIES = ['kamisado', 'covid', 'ecommerce', 'token', 'network', 'management'];

test('the archive dictionary is at full FR/EN parity', () => {
  const report = parityReport(archive);
  assert.deepEqual(report.missingInEn, []);
  assert.deepEqual(report.missingInFr, []);
});

test('every curated entry has a title and a description in both languages', () => {
  for (const entry of ENTRIES) {
    for (const field of ['title', 'text']) {
      for (const lang of LANGS) {
        const key = `arch.${entry}.${field}`;
        assert.notEqual(translate(archive, lang, key), key, `missing ${lang}: ${key}`);
      }
    }
  }
});

test('archive copy carries no competency codes or semester numbers', () => {
  for (const lang of LANGS) {
    for (const [key, value] of Object.entries(archive[lang])) {
      assert.doesNotMatch(value, /\bS[1-6]\.\d/, `${lang}.${key} has a semester code`);
      assert.doesNotMatch(value, /\bC[1-6]\.\d/, `${lang}.${key} has a competency code`);
      assert.doesNotMatch(value, /\bSAE\b/i, `${lang}.${key} uses academic jargon`);
    }
  }
});

test('the page is wired to the archive dictionary and links home', async () => {
  const html = await readFile(new URL('../archive.html', import.meta.url), 'utf8');
  assert.match(html, /data-page="archive"/);
  assert.match(html, /href="index\.html#work"/);
});

test('every PDF the page links to exists on disk', async () => {
  const html = await readFile(new URL('../archive.html', import.meta.url), 'utf8');
  const hrefs = [...html.matchAll(/href="(pages\/BUT\/rapports\/[^"]+)"/g)].map((m) => m[1]);
  assert.ok(hrefs.length >= 6, `expected several report links, found ${hrefs.length}`);
  for (const href of hrefs) {
    const decoded = decodeURIComponent(href);
    await access(new URL(`../${decoded}`, import.meta.url));
  }
});
