/**
 * Sticky header behaviour: scrolled state, active-section tracking, and the
 * collapsed menu panel below 860px.
 */

/**
 * Pure: which section is active for a given scroll position.
 * A section becomes active once its top passes `scrollY + offset`.
 */
export function activeSectionId(entries, scrollY, offset) {
  const line = scrollY + offset;
  let active = null;
  for (const entry of entries) {
    if (entry.top <= line) active = entry.id;
  }
  return active;
}

export function initNav({ header, toggle, panel, links, sections, threshold = 24 }) {
  const navHeight = () =>
    parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 60;

  let ticking = false;
  let lastActive = null;

  const measure = () =>
    sections.map((el) => ({ id: el.id, top: el.getBoundingClientRect().top + window.scrollY }));

  let measured = measure();

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      header.classList.toggle('is-scrolled', window.scrollY > threshold);

      const active = activeSectionId(measured, window.scrollY, navHeight() + 8);
      if (active !== lastActive) {
        lastActive = active;
        for (const link of links) {
          const isActive = link.getAttribute('href') === `#${active}`;
          link.classList.toggle('is-active', isActive);
          if (isActive) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        }
      }
      ticking = false;
    });
  }

  const onResize = () => { measured = measure(); onScroll(); };

  // ---- Collapsed panel ----
  let open = false;
  const focusableInPanel = () =>
    panel ? [...panel.querySelectorAll('a[href], button:not([disabled])')] : [];

  function setOpen(next) {
    if (!panel || !toggle) return;
    open = next;
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('data-i18n-attr', `aria-label:${open ? 'nav.menu.close' : 'nav.menu.open'}`);
    document.body.classList.toggle('has-panel-open', open);
    // The label above is a key, not a string; main.js re-applies the dictionary.
    document.dispatchEvent(new CustomEvent('nav:toggled', { detail: { open } }));
    if (open) focusableInPanel()[0]?.focus();
  }

  function onKeydown(event) {
    if (!open) return;
    if (event.key === 'Escape') { setOpen(false); toggle.focus(); return; }
    if (event.key !== 'Tab') return;

    // Focus trap.
    const items = focusableInPanel();
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function onPointerDown(event) {
    if (!open) return;
    if (panel.contains(event.target) || toggle.contains(event.target)) return;
    setOpen(false);
  }

  toggle?.addEventListener('click', () => setOpen(!open));
  panel?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', onKeydown);
  document.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);

  // Close the panel if the viewport grows past the collapse breakpoint.
  const wide = window.matchMedia('(min-width: 860px)');
  wide.addEventListener('change', (event) => { if (event.matches) setOpen(false); });

  if (panel && toggle) setOpen(false);
  onScroll();

  return {
    destroy() {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('keydown', onKeydown);
      document.removeEventListener('pointerdown', onPointerDown);
    },
  };
}
