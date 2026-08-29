import test from 'node:test';
import assert from 'node:assert/strict';
import { particleCount, wrapPosition, repulsion, isPetal, kindFor,
         PETAL_SHARE, LEAF_SHARE } from '../js/particles.js';

test('particle count halves on small screens and is capped on large ones', () => {
  assert.equal(particleCount(1920), 170);
  assert.equal(particleCount(1280), 170);
  assert.equal(particleCount(768), 170);
  assert.equal(particleCount(767), 85);
  assert.equal(particleCount(320), 85);
});

test('particle count respects a custom base', () => {
  assert.equal(particleCount(1280, 40), 40);
  assert.equal(particleCount(500, 40), 20);
});

test('wrapPosition wraps past either edge with a margin, never clamping', () => {
  assert.equal(wrapPosition(50, 100), 50);
  assert.equal(wrapPosition(112, 100), -10);
  assert.equal(wrapPosition(-12, 100), 110);
});

test('a pointer outside the radius exerts no force', () => {
  const { dx, dy, strength } = repulsion(10, 10, 400, 400, 120);
  assert.equal(strength, 0);
  assert.equal(dx, 0);
  assert.equal(dy, 0);
});

test('a pointer inside the radius pushes the particle directly away', () => {
  // Pointer to the left of the particle -> the particle is pushed right.
  const { dx, dy, strength } = repulsion(100, 100, 60, 100, 120);
  assert.ok(strength > 0 && strength <= 1);
  assert.ok(dx > 0, 'expected a rightward push');
  assert.equal(Math.round(dy), 0);
});

test('repulsion is strongest at the pointer and falls to zero at the radius', () => {
  const near = repulsion(100, 100, 98, 100, 120).strength;
  const far = repulsion(100, 100, 100 + 119, 100, 120).strength;
  assert.ok(near > far, 'force should decay with distance');
  assert.ok(far >= 0 && far < 0.05, 'force should be ~0 at the edge');
});

test('a pointer exactly on the particle does not produce NaN', () => {
  const { dx, dy, strength } = repulsion(100, 100, 100, 100, 120);
  assert.ok(Number.isFinite(dx) && Number.isFinite(dy) && Number.isFinite(strength));
});

test('the field stays mostly snow, with petals and rarer leaves through it', () => {
  const field = particleCount(1920);
  const seen = { mote: 0, petal: 0, leaf: 0 };
  for (let i = 0; i < field; i++) seen[kindFor(i)] += 1;

  assert.equal(seen.mote + seen.petal + seen.leaf, field, 'every particle needs a kind');
  assert.ok(seen.mote / field > 0.85, 'snow must stay the bulk of the field');
  assert.ok(seen.petal > 0 && seen.petal / field < 0.12, `petals should stay rare, got ${seen.petal}`);
  assert.ok(seen.leaf > 0 && seen.leaf < seen.petal, 'leaves should be rarer than petals');
});

test('the petal and leaf shares are evenly spread, never clumped', () => {
  for (const share of [PETAL_SHARE, LEAF_SHARE]) {
    const hits = Array.from({ length: 200 }, (_, i) => i).filter((i) => isPetal(i, share));
    const gaps = hits.slice(1).map((v, i) => v - hits[i]);
    assert.ok(gaps.length > 2, 'the share should recur across the field');
    assert.ok(gaps.every((g) => g === gaps[0]), `share ${share} clumps instead of spreading`);
  }
  assert.equal(isPetal(0, 0), false, 'a zero share means none at all');
});
