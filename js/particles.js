/**
 * The background field, fixed behind everything so it cannot shift layout and
 * removed outright for coarse pointers and reduced motion.
 *
 * One set of particles with two temperaments. By day they drift down like
 * motes in a sunbeam. At night they slow to almost nothing, stop drifting
 * sideways, and breathe on their own cycles, which reads as a sky rather than
 * as weather. The pointer pushes them aside in both.
 */

const MARGIN = 10;
const POINTER_RADIUS = 120;
const MAX_DPR = 2;

/** Halved on small screens, where the same count reads as noise. */
export function particleCount(width, base = 260) {
  return width < 768 ? Math.round(base / 2) : base;
}

/**
 * How the field behaves under each theme. Night is slow enough that a point
 * crosses the screen in about an hour, so the motion is felt rather than
 * watched.
 */
export function driftFor(night) {
  return night
    ? { speed: 0.07, sway: 0.02, twinkle: 0.45, halo: true }
    : { speed: 1, sway: 0.14, twinkle: 0, halo: false };
}

/** Wrap with a margin so particles never pop at an edge. */
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
  let accent = '198, 169, 236';
  let alphaScale = 1;
  let drift = driftFor(false);

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
    const rgb = resolve('var(--particle-color)');
    if (rgb) accent = rgb.join(', ');

    // Dark points on a light ground read heavier than light ones on a dark one,
    // and the same luminance tells us which temperament the field should have.
    const bg = resolve('var(--bg)');
    if (bg) {
      const lum = (0.2126 * bg[0] + 0.7152 * bg[1] + 0.0722 * bg[2]) / 255;
      alphaScale = lum > 0.5 ? 0.6 : 1;
      drift = driftFor(lum <= 0.5);
    }
  }

  function seed() {
    const count = particleCount(width);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1 + Math.random() * 1.7,
      vy: 0.08 + Math.random() * 0.22,
      vx: (Math.random() - 0.5) * 0.12,
      phase: Math.random() * Math.PI * 2,
      // Every point breathes on its own cycle, or they would pulse in unison.
      tw: Math.random() * Math.PI * 2,
      twRate: 0.004 + Math.random() * 0.009,
      alpha: 0.14 + Math.random() * 0.16,
      ox: 0,
      oy: 0,
    }));
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
      p.phase += 0.006;
      p.tw += p.twRate;
      p.y += p.vy * drift.speed;
      p.x += (p.vx + Math.sin(p.phase) * drift.sway) * drift.speed;

      const { dx, dy, strength } = repulsion(p.x, p.y, pointer.x, pointer.y, POINTER_RADIUS);
      p.ox += (dx * 26 - p.ox) * 0.08;
      p.oy += (dy * 26 - p.oy) * 0.08;

      p.x = wrapPosition(p.x, width);
      p.y = wrapPosition(p.y, height);

      const breathe = 1 - drift.twinkle * (0.5 + 0.5 * Math.sin(p.tw));
      const alpha = (p.alpha + strength * 0.14) * alphaScale * breathe;
      const x = p.x + p.ox;
      const y = p.y + p.oy;

      // The larger points carry a halo at night, which is what separates a
      // star from a speck without drawing anything sharper.
      if (drift.halo && p.r > 2.2) {
        ctx.beginPath();
        ctx.arc(x, y, p.r * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent}, ${(alpha * 0.16).toFixed(3)})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(x, y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${accent}, ${alpha.toFixed(3)})`;
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
