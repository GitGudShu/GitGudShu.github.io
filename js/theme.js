import { readStored, writeStored } from './storage.js';

export const THEMES = ['light', 'dark'];
export const STORAGE_KEY = 'tc-theme';

/**
 * An explicit stored choice wins. Otherwise follow the OS. An unrecognised
 * stored value is discarded rather than written to the DOM.
 */
export function resolveTheme(stored, prefersDark) {
  if (THEMES.includes(stored)) return stored;
  return prefersDark ? 'dark' : 'light';
}

export function nextTheme(current) {
  return current === 'dark' ? 'light' : 'dark';
}

export function applyTheme(theme, root = document.documentElement) {
  root.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.content = getComputedStyle(root).getPropertyValue('--bg').trim();
  }
}

function labelFor(theme) {
  // The button announces the action it performs, not the current state.
  return theme === 'dark' ? 'theme.toLight' : 'theme.toDark';
}

export function initTheme({ button }) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  let current = resolveTheme(readStored(STORAGE_KEY), prefersDark.matches);

  applyTheme(current, root);
  syncButton();

  function syncButton() {
    if (!button) return;
    button.setAttribute('data-i18n-attr', `aria-label:${labelFor(current)}`);
    button.setAttribute('aria-pressed', String(current === 'dark'));
    document.dispatchEvent(new CustomEvent('theme:changed', { detail: { theme: current } }));
  }

  /**
   * `persist` is false when the OS preference changed under us: following the
   * system is not the visitor making a choice, so it must not become one.
   */
  function commit(theme, persist = true) {
    current = theme;
    applyTheme(current, root);
    if (persist) writeStored(STORAGE_KEY, current);
    syncButton();
  }

  function setTheme(theme) {
    if (!THEMES.includes(theme) || theme === current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || reduced) {
      commit(theme);
      return;
    }

    // Circular wipe originating at the toggle.
    const rect = button?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : 0;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => commit(theme));
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 520,
            easing: 'cubic-bezier(.22, 1, .36, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      })
      .catch(() => { /* the transition was skipped; the theme still committed */ });
  }

  button?.addEventListener('click', () => setTheme(nextTheme(current)));

  // Follow the OS only while the visitor has not chosen explicitly.
  prefersDark.addEventListener('change', (event) => {
    if (THEMES.includes(readStored(STORAGE_KEY))) return;
    commit(event.matches ? 'dark' : 'light', false);
  });

  return {
    getTheme: () => current,
    setTheme,
    toggle: () => setTheme(nextTheme(current)),
  };
}
