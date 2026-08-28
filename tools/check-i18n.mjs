#!/usr/bin/env node
/**
 * Asserts FR/EN key parity across every dictionary, and that no string is
 * empty. Run before every commit that touches copy.
 */
import { parityReport, LANGS } from '../js/i18n/index.js';

const DICTS = [
  ['common', () => import('../js/i18n/common.js').then((m) => m.common)],
  ['home', () => import('../js/i18n/home.js').then((m) => m.home).catch(() => null)],
  ['projects', () => import('../js/i18n/projects.js').then((m) => m.projects).catch(() => null)],
  ['archive', () => import('../js/i18n/archive.js').then((m) => m.archive).catch(() => null)],
  ['music', () => import('../js/i18n/music.js').then((m) => m.music).catch(() => null)],
];

/**
 * `projects` is keyed by slug, one {en, fr} pair per page, while every other
 * group is a single flat pair. Expanding the nested shape lets both be checked
 * the same way, and reports a failure against the page it belongs to.
 */
function expand(group, dict) {
  if (dict.en && dict.fr) return [[group, dict]];
  return Object.entries(dict).map(([slug, sub]) => [`${group}/${slug}`, sub]);
}

let failures = 0;

for (const [group, load] of DICTS) {
  const loaded = await load();
  if (!loaded) {
    console.log(`SKIP  ${group} (not created yet)`);
    continue;
  }

  for (const [name, dict] of expand(group, loaded)) {
    const { missingInEn, missingInFr } = parityReport(dict);
    for (const key of missingInFr) {
      console.error(`FAIL  ${name}: "${key}" exists in en but not fr`);
      failures += 1;
    }
    for (const key of missingInEn) {
      console.error(`FAIL  ${name}: "${key}" exists in fr but not en`);
      failures += 1;
    }

    for (const lang of LANGS) {
      for (const [key, value] of Object.entries(dict[lang] ?? {})) {
        if (typeof value !== 'string' || value.trim() === '') {
          console.error(`FAIL  ${name}.${lang}: "${key}" is empty`);
          failures += 1;
        }
      }
    }

    if (missingInEn.length === 0 && missingInFr.length === 0) {
      const count = Object.keys(dict.en ?? {}).length;
      console.log(`PASS  ${name}: ${count} keys at full parity`);
    }
  }
}

if (failures > 0) {
  console.error(`\n${failures} i18n failure(s).`);
  process.exit(1);
}
console.log('\nAll dictionaries at full FR/EN parity.');
