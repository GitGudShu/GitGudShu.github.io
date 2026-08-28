import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const PAGES = [
  'index.html',
  'archive.html',
  'music.html',
  '404.html',
  'projects/optimops.html',
  'projects/emotion-recognition.html',
  'projects/predictops.html',
  'projects/ars.html',
];

const read = (page) => readFile(new URL(`../${page}`, import.meta.url), 'utf8');

test('every page has a unique title and description', async () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const page of PAGES) {
    const html = await read(page);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert.ok(title, `${page}: no <title>`);
    assert.ok(description, `${page}: no description`);
    assert.ok(!titles.has(title), `${page}: duplicate title "${title}"`);
    assert.ok(!descriptions.has(description), `${page}: duplicate description`);
    titles.add(title);
    descriptions.add(description);
  }
});

test('every page declares canonical, Open Graph and both theme colours', async () => {
  for (const page of PAGES) {
    const html = await read(page);
    assert.match(html, /<link rel="canonical" href="https:\/\/gitgudshu\.github\.io\//, `${page}: canonical`);
    assert.match(html, /property="og:title"/, `${page}: og:title`);
    assert.match(html, /property="og:description"/, `${page}: og:description`);
    assert.match(html, /property="og:url"/, `${page}: og:url`);
    assert.match(html, /name="twitter:card"/, `${page}: twitter:card`);
    assert.match(html, /media="\(prefers-color-scheme: light\)"/, `${page}: light theme-color`);
    assert.match(html, /media="\(prefers-color-scheme: dark\)"/, `${page}: dark theme-color`);
  }
});

test('every page carries the theme-flash script and exactly one inline script', async () => {
  for (const page of PAGES) {
    const html = await read(page);
    const inline = html.match(/<script(?![^>]*\bsrc=)[^>]*>/g) ?? [];
    const ld = html.match(/<script type="application\/ld\+json">/g) ?? [];
    assert.equal(
      inline.length - ld.length, 1,
      `${page}: expected exactly one non-JSON-LD inline script, found ${inline.length - ld.length}`,
    );
    assert.match(html, /localStorage\.getItem\('tc-theme'\)/, `${page}: no theme-flash guard`);
  }
});

test('the homepage carries a JSON-LD Person block with no contact details', async () => {
  const html = await read('index.html');
  const block = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(block, 'no JSON-LD block');
  const data = JSON.parse(block);
  assert.equal(data['@type'], 'Person');
  assert.equal(data.name, 'Thomas Chu');
  assert.ok(Array.isArray(data.sameAs) && data.sameAs.length === 2);
  const serialised = JSON.stringify(data);
  assert.doesNotMatch(serialised, /@gmail|@edu\.univ|0628561781|Impasse/, 'contact details leaked into structured data');
});

test('the 404 page links home and is not indexed', async () => {
  const html = await read('404.html');
  assert.match(html, /href="\/index\.html"|href="\/"/);
  assert.match(html, /name="robots" content="noindex"/);
});
