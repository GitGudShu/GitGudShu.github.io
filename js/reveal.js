/**
 * Scroll reveal. Adds .is-visible once an element enters the viewport, then
 * stops observing it — reveals never replay, and never re-run on language swap.
 */
export function initReveal({ selector = '.reveal', root = document } = {}) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    root.querySelectorAll(selector).forEach((el) => el.classList.add('is-visible'));
    return { observe() {}, destroy() {} };
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  );

  const observe = (el) => {
    if (el.classList.contains('is-visible')) return;
    observer.observe(el);
  };

  const observeAll = () => root.querySelectorAll(selector).forEach(observe);

  observeAll();
  // Cards injected by renderWork() announce themselves.
  document.addEventListener('content:rendered', observeAll);

  return {
    observe,
    destroy() {
      observer.disconnect();
      document.removeEventListener('content:rendered', observeAll);
    },
  };
}
