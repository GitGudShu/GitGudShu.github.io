/**
 * Background motes the pointer pushes aside, with the occasional petal turning
 * over as it falls. Fixed and behind everything, so it cannot shift layout.
 * Removed entirely for coarse pointers and reduced motion.
 */

const MARGIN = 10;
const POINTER_RADIUS = 120;
const MAX_DPR = 2;

/** Roughly one petal for every eleven motes: noticed, never counted. */
export const PETAL_SHARE = 0.085;

/** Deterministic so the mix cannot clump differently on every reseed. */
export function isPetal(index, share = PETAL_SHARE) {
  if (share <= 0) return false;
  const every = Math.round(1 / share);
  return index % every === 0;
}

/** Half the field on small screens. */
export function particleCount(width, base = 170) {
  return width < 768 ? Math.round(base / 2) : base;
}

/** Wrap with a margin so motes never pop at an edge. */
export function wrapPosition(value, max) {
  if (value > max + MARGIN) return -MARGIN;
  if (value < -MARGIN) return max + MARGIN;
  return value;
}

/** Direction away from the pointer, scaled by a strength decaying to 0 at radius. */
export function repulsion(px, py, mx, my, radius) {
  const vx = px - mx;
  const vy = py - my;
  const distance = Math.hypot(vx, vy);

  if (distance >= radius) return { dx: 0, dy: 0, strength: 0 };
  if (distance === 0) return { dx: 0, dy: 0, strength: 1 };

  const strength = 1 - distance / radius;
  return { dx: (vx / distance) * strength, dy: (vy / distance) * strength, strength };
}

export function initParticles({ canvas }) {
  if (!canvas) return { destroy() {} };

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');

  if (reducedMotion.matches || !finePointer.matches) {
    canvas.remove();
    return { destroy() {} };
  }

  const ctx = canvas.getContext('2d');
  let particles = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let frame = 0;
  let running = false;
  const pointer = { x: -9999, y: -9999 };
  let accent = '185, 165, 255';
  let petalColor = '196, 112, 122';
  let alphaScale = 1;

  const resolve = (value) => {
    // Canvas cannot read a CSS variable, so resolve it per theme.
    const probe = document.createElement('span');
    probe.style.color = value;
    probe.style.display = 'none';
    document.body.appendChild(probe);
    const rgb = getComputedStyle(probe).color.match(/\d+/g);
    probe.remove();
    return rgb && rgb.length >= 3 ? rgb.slice(0, 3).map(Number) : null;
  };

  function readTheme() {
    const rgb = resolve('var(--accent)');
    if (rgb) accent = rgb.join(', ');

    const petalRgb = resolve('var(--petal)');
    if (petalRgb) petalColor = petalRgb.join(', ');

    // Dark motes on a light ground read heavier than light ones on a dark one.
    const bg = resolve('var(--bg)');
    if (bg) {
      const lum = (0.2126 * bg[0] + 0.7152 * bg[1] + 0.0722 * bg[2]) / 255;
      alphaScale = lum > 0.5 ? 0.6 : 1;
    }
  }

  function seed() {
    const count = particleCount(width);
    particles = Array.from({ length: count }, (_, i) => {
      const petal = isPetal(i);
      return {
        petal,
        x: Math.random() * width,
        y: Math.random() * height,
        // Petals are broader and fall slower, the way something with surface does.
        r: petal ? 3.4 + Math.random() * 2.6 : 1.1 + Math.random() * 1.7,
        vy: petal ? 0.05 + Math.random() * 0.13 : 0.08 + Math.random() * 0.22,
        vx: (Math.random() - 0.5) * (petal ? 0.2 : 0.12),
        phase: Math.random() * Math.PI * 2,
        sway: petal ? 0.42 : 0.14,
        spin: Math.random() * Math.PI,
        spinRate: (Math.random() - 0.5) * 0.012,
        flutter: Math.random() * Math.PI * 2,
        alpha: petal ? 0.13 + Math.random() * 0.13 : 0.14 + Math.random() * 0.16,
        ox: 0,
        oy: 0,
      };
    });
  }

  /** A lens of two arcs, turning edge-on and back as it falls. */
  function drawPetal(p, alpha) {
    const w = p.r * 1.9;
    const h = p.r * 0.95;
    ctx.save();
    ctx.translate(p.x + p.ox, p.y + p.oy);
    ctx.rotate(p.spin);
    ctx.scale(0.45 + Math.abs(Math.cos(p.flutter)) * 0.55, 1);
    ctx.beginPath();
    ctx.moveTo(-w, 0);
    ctx.quadraticCurveTo(0, -h, w, 0);
    ctx.quadraticCurveTo(0, h, -w, 0);
    ctx.closePath();
    ctx.fillStyle = `rgba(${petalColor}, ${alpha})`;
    ctx.fill();
    ctx.restore();
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function step() {
    if (!running) return;
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.phase += p.petal ? 0.004 : 0.006;
      p.y += p.vy;
      p.x += p.vx + Math.sin(p.phase) * p.sway;

      if (p.petal) {
        p.spin += p.spinRate;
        p.flutter += 0.011;
      }

      const { dx, dy, strength } = repulsion(p.x, p.y, pointer.x, pointer.y, POINTER_RADIUS);
      p.ox += (dx * 26 - p.ox) * 0.08;
      p.oy += (dy * 26 - p.oy) * 0.08;

      p.x = wrapPosition(p.x, width);
      p.y = wrapPosition(p.y, height);

      // A petal spreads its colour over far more pixels than a mote, so the
      // light-theme knockdown is only half applied or it disappears entirely.
      const scale = p.petal ? alphaScale * 0.5 + 0.5 : alphaScale;
      const alpha = ((p.alpha + strength * 0.14) * scale).toFixed(3);
      if (p.petal) {
        drawPetal(p, alpha);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x + p.ox, p.y + p.oy, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${accent}, ${alpha})`;
      ctx.fill();
    }

    frame = window.requestAnimationFrame(step);
  }

  function start() {
    if (running) return;
    running = true;
    frame = window.requestAnimationFrame(step);
  }

  function stop() {
    running = false;
    window.cancelAnimationFrame(frame);
  }

  const onPointerMove = (event) => { pointer.x = event.clientX; pointer.y = event.clientY; };
  const onPointerLeave = () => { pointer.x = -9999; pointer.y = -9999; };
  const onVisibility = () => (document.hidden ? stop() : start());

  function onReducedMotionChange(event) {
    if (event.matches) { stop(); canvas.remove(); }
  }

  readTheme();
  resize();
  start();

  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('pointerleave', onPointerLeave);
  document.addEventListener('visibilitychange', onVisibility);
  document.addEventListener('theme:changed', readTheme);
  reducedMotion.addEventListener('change', onReducedMotionChange);

  return {
    destroy() {
      stop();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('theme:changed', readTheme);
      reducedMotion.removeEventListener('change', onReducedMotionChange);
    },
  };
}
