import test from 'node:test';
import assert from 'node:assert/strict';
import { particleCount, wrapPosition, repulsion, driftFor } from '../js/particles.js';

test('particle count halves on small screens and is capped on large ones', () => {
  assert.equal(particleCount(1920), 260);
  assert.equal(particleCount(1280), 260);
  assert.equal(particleCount(768), 260);
  assert.equal(particleCount(767), 130);
  assert.equal(particleCount(320), 130);
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

test('night is far slower than day, and only night breathes', () => {
  const day = driftFor(false);
  const night = driftFor(true);

  assert.ok(night.speed < day.speed / 10, 'night must be an order of magnitude slower');
  assert.ok(night.sway < day.sway / 4, 'stars should barely drift sideways');
  assert.equal(day.twinkle, 0, 'daylight motes must not pulse');
  assert.ok(night.twinkle > 0 && night.twinkle < 1, 'a star dims, it never goes out');
  assert.equal(day.halo, false);
  assert.equal(night.halo, true);
});

test('a star stays put long enough to read as sky, not weather', () => {
  const { speed } = driftFor(true);
  // Slowest and fastest seeded fall speeds, at 60 frames a second.
  const perMinute = (v) => v * speed * 60 * 60;
  assert.ok(perMinute(0.30) < 120, 'the quickest star should crawl, not fall');
  assert.ok(perMinute(0.08) > 5, 'but the field must not be frozen either');
});
