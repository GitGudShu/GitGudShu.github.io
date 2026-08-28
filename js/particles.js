/**
 * Background motes the pointer pushes aside. Fixed and behind everything, so it
 * cannot shift layout. Removed entirely for coarse pointers and reduced motion.
 */

const MARGIN = 10;
const POINTER_RADIUS = 120;
const MAX_DPR = 2;

/** Half the field on small screens. */
export function particleCount(width, base = 60) {
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

  function readAccent() {
    // Canvas cannot read a CSS variable, so resolve it per theme.
    const probe = document.createElement('span');
    probe.style.color = 'var(--accent)';
    probe.style.display = 'none';
    document.body.appendChild(probe);
    const rgb = getComputedStyle(probe).color.match(/\d+/g);
    probe.remove();
    if (rgb && rgb.length >= 3) accent = rgb.slice(0, 3).join(', ');
  }

  function seed() {
    const count = particleCount(width);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1 + Math.random() * 1.5,
      vy: 0.08 + Math.random() * 0.22,
      vx: (Math.random() - 0.5) * 0.12,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.06 + Math.random() * 0.06,
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
      p.y += p.vy;
      p.x += p.vx + Math.sin(p.phase) * 0.14;

      const { dx, dy, strength } = repulsion(p.x, p.y, pointer.x, pointer.y, POINTER_RADIUS);
      p.ox += (dx * 26 - p.ox) * 0.08;
      p.oy += (dy * 26 - p.oy) * 0.08;

      p.x = wrapPosition(p.x, width);
      p.y = wrapPosition(p.y, height);

      ctx.beginPath();
      ctx.arc(p.x + p.ox, p.y + p.oy, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${accent}, ${(p.alpha + strength * 0.14).toFixed(3)})`;
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

  readAccent();
  resize();
  start();

  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('pointerleave', onPointerLeave);
  document.addEventListener('visibilitychange', onVisibility);
  document.addEventListener('theme:changed', readAccent);
  reducedMotion.addEventListener('change', onReducedMotionChange);

  return {
    destroy() {
      stop();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('theme:changed', readAccent);
      reducedMotion.removeEventListener('change', onReducedMotionChange);
    },
  };
}
