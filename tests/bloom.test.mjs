import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { isBareSpot, petalAngles, PETALS } from '../js/bloom.js';

/** The smallest DOM this module needs: closest(), contains(), instanceof. */
function fakeTree() {
  const make = (tag, attrs = {}) => {
    const el = {
      tag,
      attrs,
      parent: null,
      children: [],
      matches(sel) {
        return sel.split(',').some((raw) => {
          const s = raw.trim();
          if (s.startsWith('[')) return s.slice(1, -1).split('=')[0] in this.attrs;
          return s === this.tag;
        });
      },
      closest(sel) {
        let node = this;
        while (node) {
          if (node.matches(sel)) return node;
          node = node.parent;
        }
        return null;
      },
      contains(other) {
        let node = other;
        while (node) {
          if (node === this) return true;
          node = node.parent;
        }
        return false;
      },
      append(child) {
        child.parent = this;
        this.children.push(child);
        return child;
      },
    };
    return el;
  };
  const body = make('body');
  return { body, make };
}

test('a click on the page itself opens a flower', () => {
  const { body, make } = fakeTree();
  const paragraph = body.append(make('p'));
  const span = paragraph.append(make('span'));
  assert.equal(isBareSpot(paragraph, body), true);
  assert.equal(isBareSpot(span, body), true);
  assert.equal(isBareSpot(body, body), true);
});

test('a click on anything with a job does not', () => {
  const { body, make } = fakeTree();
  for (const tag of ['a', 'button', 'input', 'select', 'textarea', 'iframe', 'summary', 'label']) {
    const el = body.append(make(tag));
    assert.equal(isBareSpot(el, body), false, `${tag} should be left alone`);
  }
  // Including when the click lands on something inside the control.
  const button = body.append(make('button'));
  const icon = button.append(make('span'));
  assert.equal(isBareSpot(icon, body), false, 'a span inside a button is still a button');

  // And anything the author made focusable or gave a role to.
  const roled = body.append(make('div', { role: 'button' }));
  assert.equal(isBareSpot(roled, body), false);
  const focusable = body.append(make('div', { tabindex: '0' }));
  assert.equal(isBareSpot(focusable, body), false);
});

test('a click outside the watched root is ignored', () => {
  const { body, make } = fakeTree();
  const orphan = make('p');
  assert.equal(isBareSpot(orphan, body), false);
  assert.equal(isBareSpot(null, body), false);
  assert.equal(isBareSpot('not an element', body), false);
});

test('petals fan out all the way round, and no two blooms match', () => {
  const even = petalAngles(PETALS, () => 0.5);
  assert.equal(even.length, PETALS);
  assert.deepEqual(even, [0, 72, 144, 216, 288]);

  // The jitter stays inside its own slice, so petals never cross over.
  for (const seed of [0, 1]) {
    for (const [i, angle] of petalAngles(PETALS, () => seed).entries()) {
      const drift = Math.abs(angle - i * (360 / PETALS));
      assert.ok(drift <= 360 / PETALS / 4 + 1, `petal ${i} drifted ${drift} degrees`);
    }
  }
});

test('it stays out of the way of reduced motion and of pointers', async () => {
  const css = await readFile(new URL('../css/components.css', import.meta.url), 'utf8');
  const block = css.slice(css.indexOf('.bloom {'));
  assert.match(block, /pointer-events: none/, 'a bloom must never swallow a click');
  assert.match(block, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.bloom \{ display: none/,
    'reduced motion should get no bloom at all');

  const js = await readFile(new URL('../js/bloom.js', import.meta.url), 'utf8');
  assert.match(js, /if \(reduced\) return/, 'reduced motion should not even listen');
  assert.match(js, /getSelection/, 'finishing a text selection is not a tap');
  assert.match(js, /event\.button !== 0/, 'only the left button blooms');
});

test('only the two playful pages get it', async () => {
  const main = await readFile(new URL('../js/main.js', import.meta.url), 'utf8');
  assert.match(main, /\['music', 'color'\]\.includes\(document\.body\.dataset\.page\)/,
    'the bloom should be scoped to the music and colour pages');
});
