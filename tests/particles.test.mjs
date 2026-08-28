import test from 'node:test';
import assert from 'node:assert/strict';
import { particleCount, wrapPosition, repulsion } from '../js/particles.js';

test('particle count halves on small screens and is capped on large ones', () => {
  assert.equal(particleCount(1920), 60);
  assert.equal(particleCount(1280), 60);
  assert.equal(particleCount(768), 60);
  assert.equal(particleCount(767), 30);
  assert.equal(particleCount(320), 30);
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
