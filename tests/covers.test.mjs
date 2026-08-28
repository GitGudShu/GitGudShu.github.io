import test from 'node:test';
import assert from 'node:assert/strict';
import { COVER_IDS, renderCover } from '../js/covers.js';
import { ICONS, renderIcon } from '../js/icons.js';

test('exposes exactly the six cover ids the project needs', () => {
  assert.deepEqual(
    [...COVER_IDS].sort(),
    ['ars', 'emotion', 'kpiEngine', 'optimops', 'predictops', 'wip'],
  );
});

test('every cover renders a well-formed, decorative, 16:9 svg', () => {
  for (const id of COVER_IDS) {
    const svg = renderCover(id);
    assert.match(svg, /^<svg[\s>]/, `${id} does not start with <svg`);
    assert.match(svg, /<\/svg>$/, `${id} does not end with </svg>`);
    assert.match(svg, /viewBox="0 0 480 270"/, `${id} is not 16:9`);
    assert.match(svg, /aria-hidden="true"/, `${id} is not aria-hidden`);
    assert.match(svg, /focusable="false"/, `${id} is focusable`);
  }
});

test('covers contain no colour literals — theme tokens only', () => {
  for (const id of COVER_IDS) {
    const svg = renderCover(id);
    assert.doesNotMatch(svg, /#[0-9a-fA-F]{3,8}\b/, `${id} contains a hex colour`);
    assert.doesNotMatch(svg, /\brgba?\(/, `${id} contains an rgb() colour`);
    assert.doesNotMatch(svg, /\bhsla?\(/, `${id} contains an hsl() colour`);
  }
});

test('covers emit no NaN coordinates', () => {
  for (const id of COVER_IDS) {
    assert.doesNotMatch(renderCover(id), /NaN/, `${id} emitted NaN`);
  }
});

test('an unknown cover id throws rather than rendering an empty box', () => {
  assert.throws(() => renderCover('nope'), /Unknown cover/);
});

test('every icon renders decorative svg without colour literals', () => {
  for (const name of Object.keys(ICONS)) {
    const svg = renderIcon(name);
    assert.match(svg, /^<svg[\s>]/, `${name} does not start with <svg`);
    assert.match(svg, /aria-hidden="true"/, `${name} is not aria-hidden`);
    assert.match(svg, /focusable="false"/, `${name} is focusable`);
    assert.doesNotMatch(svg, /#[0-9a-fA-F]{3,8}\b/, `${name} contains a hex colour`);
  }
});

test('the icon set covers every use in the build', () => {
  for (const name of ['github', 'linkedin', 'mail', 'location', 'arrow', 'external']) {
    assert.ok(ICONS[name], `missing icon: ${name}`);
  }
});

test('an unknown icon name throws', () => {
  assert.throws(() => renderIcon('nope'), /Unknown icon/);
});
