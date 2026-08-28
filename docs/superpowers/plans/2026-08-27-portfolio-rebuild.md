# Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the entire `GitGudShu.github.io` portfolio — visual language, information architecture and code — with a bilingual, responsive, multi-page static site presenting Thomas Chu as a pragmatic data scientist / AI engineer.

**Architecture:** A no-build static site. Native ES modules for behaviour, layered CSS with a single custom-property token system driving both themes, and per-page i18n dictionaries applied to `data-i18n`-annotated markup. Pure logic (language resolution, theme resolution, dictionary parity, particle maths, SVG cover rendering) lives in dependency-free modules unit-tested with Node's built-in test runner; everything DOM-facing is verified manually against an explicit checklist.

**Tech Stack:** HTML5, CSS (custom properties, `clamp()`, `color-mix`, `backdrop-filter`), vanilla JS ES modules, Google Fonts (Fraunces / Manrope / JetBrains Mono), Node 24 `node --test` for unit tests, Python 3.11 + Pillow for the one-off image crop. No runtime dependencies, no bundler, no npm installs.

**Spec:** `docs/superpowers/specs/2026-08-27-portfolio-rebuild-design.md`

## Global Constraints

Every task's requirements implicitly include this section.

- **No runtime dependencies.** No bundler, no framework, no `npm install`. `package.json` exists only to set `"type": "module"` for Node's test runner and to hold zero-dependency scripts.
- **Colour comes only from tokens.** No hardcoded colour value may appear outside `css/tokens.css`. Grep gate: `grep -rEn '#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(' css/ --include='*.css' | grep -v '^css/tokens.css'` must return nothing.
- **WCAG AA.** 4.5:1 for body text, 3:1 for large text (≥24px). Enforced by `tools/check-contrast.mjs`.
- **Bilingual parity is absolute.** Every key in `en` must exist in `fr` and vice versa, for every dictionary. Enforced by `tools/check-i18n.mjs`.
- **Zero horizontal overflow** at every width from 320px to 1920px.
- **`prefers-reduced-motion: reduce`** disables the particle canvas entirely and reduces all transitions to opacity-only at `--dur-fast`.
- **Touch targets ≥ 44×44px.**
- **Every `<img>`** carries intrinsic `width` and `height` attributes and a translated `alt`; below-fold images carry `loading="lazy"`.
- **Decorative SVG** carries `aria-hidden="true"` and `focusable="false"`.
- **No inline `style` attributes** in markup, with one exception: `--i` custom properties used for reveal stagger indices.
- **Exactly one inline `<script>`** in the whole project: the theme-flash preventer in `<head>` (Task 4).
- **All `localStorage` access** wrapped in `try/catch`; the site must render correctly when storage throws or is empty.
- **Confidentiality (OptimOps / KPI Engine / Predictops / ARS):** architecture, patterns, round-number scale and engineering trade-offs are permitted. Real intervention counts, CIS or department names, client figures and production screenshots are forbidden. Describe systems, never criticise people.
- **Voice:** no competency codes, no semester numbers, no "this project enabled me to develop…". Each project page answers: what was the problem, what did he build, what did he decide and why, what happened.
- **Commit after every task.** Conventional commit prefixes (`feat:`, `test:`, `chore:`, `docs:`, `refactor:`).

## Fixed Facts (use verbatim)

| Fact | Value |
|---|---|
| Name | Thomas Chu |
| Title | Data Scientist · AI Engineer |
| Employer / lab | FEMTO-ST, **AIMOS** team |
| Apprenticeship host school | **UTBM**, Belfort (2024 – present) |
| Previous school | IUT Nord Franche-Comté, Belfort (2021 – 2024, completed) |
| Emails | `ml.thomaschu@gmail.com`, `thomas.chu@edu.univ-fcomte.fr` |
| Location string | Franche-Comté, France · open to relocation |
| GitHub | `https://github.com/GitGudShu` |
| LinkedIn | `https://www.linkedin.com/in/thomas-chu-259702235/` |
| CV | `CV-FR.pdf` |
| Positioning line (EN) | "I build decision-support systems where the hard part is the data, not the dashboard." |
| Positioning line (FR) | « Je construis des systèmes d'aide à la décision où la difficulté est la donnée, pas le tableau de bord. » |

**Never publish:** phone number, street address, Google Maps link.

## French Terminology Table

Use these renderings consistently across all French copy. French copy is a faithful adaptation written for a French recruiter — not a literal machine translation. Use « » guillemets with non-breaking spaces, and French spacing before `:` `;` `?` `!`.

| English | French |
|---|---|
| decision-support system | système d'aide à la décision |
| data pipeline | chaîne de traitement des données |
| star schema | modèle en étoile |
| fire & rescue service | service d'incendie et de secours |
| coverage analysis | analyse de couverture |
| scenario simulation | simulation de scénarios |
| optimizer | optimiseur |
| dashboard | tableau de bord |
| widget registry | registre de composants |
| regression harness | harnais de non-régression |
| fail-fast | rejet immédiat |
| proof of concept | preuve de concept |
| machine learning model | modèle d'apprentissage automatique |
| fine-tuning | ajustement fin |
| experiment tracking | suivi d'expériences |
| forecasting | prévision |
| Bachelor coursework | projets académiques du BUT |
| Writing in progress | Rédaction en cours |
| Beyond the work | En dehors du travail |
| Download CV | Télécharger le CV |
| View my work | Voir mes projets |
| Back to work | Retour aux projets |

## File Structure

**Created:**

| Path | Responsibility |
|---|---|
| `package.json` | `"type": "module"` + zero-dependency scripts. Not a build step. |
| `tools/check-contrast.mjs` | Parses `css/tokens.css`, asserts every declared pair meets AA. |
| `tools/check-i18n.mjs` | Asserts key parity across all dictionaries. |
| `tools/crop-portrait.py` | One-off Pillow crop of `hero.jpg` → `portrait.jpg`. |
| `tests/*.test.mjs` | Node unit tests for pure modules. |
| `css/tokens.css` | Every colour, type, space, radius, shadow and motion token; both themes. **Sole home of colour literals.** |
| `css/base.css` | Reset, base typography, focus-visible, selection, scrollbars. |
| `css/layout.css` | Container rail, sections, topbar, footer, page grids. |
| `css/components.css` | Buttons, chips, cards, timeline, hobby panels, toggles, nav panel. |
| `css/pages.css` | Hero, project-detail and archive specifics. |
| `js/storage.js` | Safe `localStorage` read/write. |
| `js/theme.js` | Theme resolution, persistence, view-transition toggle. |
| `js/i18n/index.js` | i18n engine — resolution, merge, parity, DOM application. |
| `js/i18n/common.js` | Nav, footer, toggles, shared strings. |
| `js/i18n/home.js` | Homepage dictionary. |
| `js/i18n/projects.js` | All five project-page dictionaries. |
| `js/i18n/archive.js` | Archive page dictionary. |
| `js/nav.js` | Sticky state, active-section tracking, collapsed panel. |
| `js/reveal.js` | IntersectionObserver scroll reveal. |
| `js/particles.js` | Background particle field + pure maths helpers. |
| `js/covers.js` | Inline SVG cover motifs. |
| `js/icons.js` | Social and UI icons, defined once. |
| `js/data/projects.js` | Card metadata: slug, href, cover id, i18n key, tags. |
| `js/main.js` | Per-page entry point wiring the modules. |
| `index.html` | Homepage (replaces the existing file). |
| `projects/optimops.html` … `ars.html` | Five flagship project pages. |
| `archive.html` | Curated Bachelor coursework. |
| `404.html` | Not-found page. |
| `assets/portrait.jpg` | 720×720 crop of `hero.jpg`. |
| `README.md` | Local preview instructions, structure, verification commands. |

**Deleted (Task 15):** `css/style.css`, `js/script.js`, `pages/BUT/home.html`, `pages/BUT/pages/*.html` (11 files), `assets/images/Logo_dark.png`, `assets/images/Logo_light.png`, `assets/images/Thumbs.db`, `assets/images/but/Optimops_DBv1.mwb`.

**Retained untouched:** `pages/BUT/rapports/*`, `CV-FR.pdf`, `assets/hero.jpg`, `assets/images/profile.png`, `favicon.svg`.

---

### Task 1: Test harness, package manifest and design tokens

**Files:**
- Create: `package.json`
- Create: `tools/check-contrast.mjs`
- Create: `css/tokens.css`
- Create: `.gitignore`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `tools/check-contrast.mjs` exports `srgbToLinear(channel: number): number`, `relativeLuminance(hex: string): number`, `contrastRatio(hexA: string, hexB: string): number`, `parseTokens(css: string): { light: Record<string,string>, dark: Record<string,string> }`, and `REQUIRED_PAIRS: Array<{fg: string, bg: string, min: number}>`.
  - `css/tokens.css` defines every token named in this plan on `:root` and under both dark selectors.
  - `npm test` runs `node --test tests/`; `npm run check` runs both checkers.

- [x] **Step 1: Create the package manifest**

`package.json`:

```json
{
  "name": "gitgudshu-portfolio",
  "version": "2.0.0",
  "private": true,
  "type": "module",
  "description": "Personal portfolio of Thomas Chu. No build step, no runtime dependencies.",
  "scripts": {
    "test": "node --test tests/",
    "check:i18n": "node tools/check-i18n.mjs",
    "check:contrast": "node tools/check-contrast.mjs",
    "check": "npm run check:contrast && npm run check:i18n",
    "verify": "npm run check && npm test",
    "serve": "python -m http.server 8000"
  }
}
```

`.gitignore`:

```
node_modules/
.DS_Store
Thumbs.db
*.log
```

- [x] **Step 2: Write the failing contrast test**

`tests/contrast.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  contrastRatio,
  relativeLuminance,
  parseTokens,
  REQUIRED_PAIRS,
} from '../tools/check-contrast.mjs';
import { readFile } from 'node:fs/promises';

test('relativeLuminance matches known anchors', () => {
  assert.equal(relativeLuminance('#ffffff'), 1);
  assert.equal(relativeLuminance('#000000'), 0);
});

test('contrastRatio is symmetric and matches the known black/white maximum', () => {
  assert.equal(contrastRatio('#000000', '#ffffff'), 21);
  assert.equal(contrastRatio('#ffffff', '#000000'), 21);
});

test('contrastRatio accepts shorthand hex', () => {
  assert.equal(contrastRatio('#fff', '#000'), 21);
});

test('parseTokens extracts both theme blocks', async () => {
  const css = await readFile(new URL('../css/tokens.css', import.meta.url), 'utf8');
  const { light, dark } = parseTokens(css);
  assert.equal(light['--bg'], '#E9E4F0');
  assert.equal(dark['--bg'], '#100D16');
  assert.equal(light['--text-faint'], '#6B6379');
  assert.equal(dark['--text-faint'], '#857C95');
});

test('every required pair meets its AA threshold in both themes', async () => {
  const css = await readFile(new URL('../css/tokens.css', import.meta.url), 'utf8');
  const themes = parseTokens(css);
  for (const themeName of ['light', 'dark']) {
    const tokens = themes[themeName];
    for (const { fg, bg, min } of REQUIRED_PAIRS) {
      const ratio = contrastRatio(tokens[fg], tokens[bg]);
      assert.ok(
        ratio >= min,
        `${themeName}: ${fg} on ${bg} is ${ratio.toFixed(2)}:1, needs ${min}:1`,
      );
    }
  }
});
```

- [x] **Step 3: Run the test to verify it fails**

Run: `node --test tests/contrast.test.mjs`
Expected: FAIL — `Cannot find module '../tools/check-contrast.mjs'`.

- [x] **Step 4: Implement the contrast checker**

`tools/check-contrast.mjs`:

```js
#!/usr/bin/env node
/**
 * Verifies every text/background token pair in css/tokens.css meets WCAG AA.
 * Zero dependencies. Exits non-zero on the first failing theme.
 */
import { readFile } from 'node:fs/promises';

/** Pairs that must pass, expressed as token names. min: 4.5 body, 3 large text. */
export const REQUIRED_PAIRS = [
  { fg: '--text', bg: '--bg', min: 4.5 },
  { fg: '--text', bg: '--surface', min: 4.5 },
  { fg: '--text', bg: '--surface-raised', min: 4.5 },
  { fg: '--text-muted', bg: '--bg', min: 4.5 },
  { fg: '--text-muted', bg: '--surface', min: 4.5 },
  { fg: '--text-faint', bg: '--bg', min: 4.5 },
  { fg: '--text-faint', bg: '--surface', min: 4.5 },
  { fg: '--accent', bg: '--bg', min: 4.5 },
  { fg: '--accent', bg: '--surface', min: 4.5 },
  { fg: '--accent-contrast', bg: '--accent', min: 4.5 },
  { fg: '--border-strong', bg: '--bg', min: 3 },
];

export function srgbToLinear(channel) {
  return channel <= 0.04045
    ? channel / 12.92
    : Math.pow((channel + 0.055) / 1.055, 2.4);
}

function expand(hex) {
  const raw = hex.trim().replace(/^#/, '');
  if (raw.length === 3) return raw.split('').map((c) => c + c).join('');
  return raw.slice(0, 6);
}

export function relativeLuminance(hex) {
  const full = expand(hex);
  const [r, g, b] = [0, 2, 4].map((i) =>
    srgbToLinear(parseInt(full.slice(i, i + 2), 16) / 255),
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(hexA, hexB) {
  const a = relativeLuminance(hexA);
  const b = relativeLuminance(hexB);
  const [hi, lo] = a >= b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Extracts the light block (`:root {`) and the dark block
 * (`[data-theme="dark"] {`) as flat token maps. Only hex values are captured;
 * derived tokens such as shadows and gradients are ignored.
 */
export function parseTokens(css) {
  const grab = (selector) => {
    const start = css.indexOf(selector);
    if (start === -1) throw new Error(`Selector not found in tokens.css: ${selector}`);
    const open = css.indexOf('{', start);
    const close = css.indexOf('}', open);
    const body = css.slice(open + 1, close);
    const map = {};
    for (const line of body.split('\n')) {
      const m = line.match(/^\s*(--[a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\s*;/);
      if (m) map[m[1]] = m[2];
    }
    return map;
  };
  return { light: grab(':root {'), dark: grab('[data-theme="dark"] {') };
}

async function main() {
  const css = await readFile(new URL('../css/tokens.css', import.meta.url), 'utf8');
  const themes = parseTokens(css);
  let failures = 0;
  for (const themeName of ['light', 'dark']) {
    const tokens = themes[themeName];
    for (const { fg, bg, min } of REQUIRED_PAIRS) {
      if (!tokens[fg] || !tokens[bg]) {
        console.error(`MISSING ${themeName}: ${fg} or ${bg} is not defined`);
        failures += 1;
        continue;
      }
      const ratio = contrastRatio(tokens[fg], tokens[bg]);
      const ok = ratio >= min;
      if (!ok) failures += 1;
      console.log(
        `${ok ? 'PASS' : 'FAIL'}  ${themeName.padEnd(5)} ${fg} on ${bg}  ` +
        `${ratio.toFixed(2)}:1 (min ${min}:1)`,
      );
    }
  }
  if (failures > 0) {
    console.error(`\n${failures} contrast failure(s).`);
    process.exit(1);
  }
  console.log('\nAll contrast pairs pass WCAG AA.');
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('check-contrast.mjs')) {
  await main();
}
```

- [x] **Step 5: Write the token stylesheet**

`css/tokens.css`. Note the two `--text-faint` values were derived to clear 4.5:1 against `--bg` (light `#6B6379` = 4.56:1, dark `#857C95` = 4.87:1). Do not "tidy" them back toward the greys in the spec's first draft.

```css
/* ==========================================================================
   tokens.css — the single source of truth for colour, type, space and motion.
   No other stylesheet may contain a colour literal.
   ========================================================================== */

:root {
  color-scheme: light;

  /* ---- Colour: dusk (light theme) ---- */
  --bg: #E9E4F0;
  --surface: #F2EEF7;
  --surface-raised: #F8F5FB;
  --border: #D3CADF;
  --border-strong: #BCAFCE;
  --text: #262029;
  --text-muted: #5B5366;
  --text-faint: #6B6379;
  --accent: #5F4EB8;
  --accent-strong: #4B3B9E;
  --accent-contrast: #FFFFFF;

  /* ---- Derived surfaces ---- */
  --nav-bg: color-mix(in oklab, var(--bg) 72%, transparent);
  --nav-bg-scrolled: color-mix(in oklab, var(--bg) 88%, transparent);
  --shadow-card: 0 1px 2px color-mix(in oklab, var(--text) 8%, transparent),
                 0 8px 24px color-mix(in oklab, var(--text) 6%, transparent);
  --shadow-card-hover: 0 2px 4px color-mix(in oklab, var(--text) 10%, transparent),
                       0 16px 40px color-mix(in oklab, var(--text) 10%, transparent);
  --shadow-nav: 0 1px 24px color-mix(in oklab, var(--text) 8%, transparent);
  --glow-accent: 0 0 60px color-mix(in oklab, var(--accent) 22%, transparent);
  --particle-color: var(--accent);

  /* ---- Typography ---- */
  --font-display: Fraunces, "Iowan Old Style", Georgia, serif;
  --font-body: Manrope, "Segoe UI", system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "Cascadia Code", Consolas, monospace;

  --fs-display: clamp(2.6rem, 1.6rem + 4.4vw, 5rem);
  --fs-h1: clamp(2.1rem, 1.5rem + 2.6vw, 3.4rem);
  --fs-h2: clamp(1.6rem, 1.3rem + 1.4vw, 2.3rem);
  --fs-h3: clamp(1.15rem, 1.05rem + .5vw, 1.45rem);
  --fs-body: clamp(.95rem, .92rem + .18vw, 1.05rem);
  --fs-small: .875rem;
  --fs-mono: .78rem;

  --lh-tight: 1.12;
  --lh-body: 1.65;
  --tracking-mono: .06em;
  --measure: 65ch;

  /* ---- Space ---- */
  --space-1: .25rem;
  --space-2: .5rem;
  --space-3: .75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
  --section-gap: clamp(3.5rem, 2rem + 6vw, 6rem);
  --rail: 1100px;
  --rail-prose: 720px;
  --rail-pad: clamp(1.15rem, .6rem + 2.4vw, 2.5rem);

  /* ---- Radii ---- */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --radius-full: 999px;

  /* ---- Motion ---- */
  --ease: cubic-bezier(.22, 1, .36, 1);
  --dur-fast: 160ms;
  --dur: 320ms;
  --dur-slow: 520ms;

  /* ---- Chrome ---- */
  --nav-h: 60px;
  --z-nav: 50;
  --z-panel: 60;
  --z-skip: 70;
}

[data-theme="dark"] {
  color-scheme: dark;

  --bg: #100D16;
  --surface: #17131F;
  --surface-raised: #1E1929;
  --border: #2C2438;
  --border-strong: #3D3350;
  --text: #E8E3F0;
  --text-muted: #A79FB8;
  --text-faint: #857C95;
  --accent: #B9A5FF;
  --accent-strong: #CDBCFF;
  --accent-contrast: #1B1330;

  --shadow-card: 0 1px 2px color-mix(in oklab, #000000 40%, transparent),
                 0 8px 28px color-mix(in oklab, #000000 32%, transparent);
  --shadow-card-hover: 0 2px 6px color-mix(in oklab, #000000 50%, transparent),
                       0 18px 48px color-mix(in oklab, #000000 42%, transparent);
  --shadow-nav: 0 1px 28px color-mix(in oklab, #000000 45%, transparent);
  --glow-accent: 0 0 70px color-mix(in oklab, var(--accent) 18%, transparent);
}

/* System preference, honoured only when the visitor has not chosen explicitly. */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;

    --bg: #100D16;
    --surface: #17131F;
    --surface-raised: #1E1929;
    --border: #2C2438;
    --border-strong: #3D3350;
    --text: #E8E3F0;
    --text-muted: #A79FB8;
    --text-faint: #857C95;
    --accent: #B9A5FF;
    --accent-strong: #CDBCFF;
    --accent-contrast: #1B1330;

    --shadow-card: 0 1px 2px color-mix(in oklab, #000000 40%, transparent),
                   0 8px 28px color-mix(in oklab, #000000 32%, transparent);
    --shadow-card-hover: 0 2px 6px color-mix(in oklab, #000000 50%, transparent),
                         0 18px 48px color-mix(in oklab, #000000 42%, transparent);
    --shadow-nav: 0 1px 28px color-mix(in oklab, #000000 45%, transparent);
    --glow-accent: 0 0 70px color-mix(in oklab, var(--accent) 18%, transparent);
  }
}

@media (max-width: 599px) {
  :root { --nav-h: 56px; }
}
```

- [x] **Step 6: Run the tests to verify they pass**

Run: `node --test tests/contrast.test.mjs`
Expected: PASS, 5/5.

Run: `node tools/check-contrast.mjs`
Expected: every line `PASS`, final line `All contrast pairs pass WCAG AA.`, exit 0.

- [x] **Step 7: Verify the colour-literal gate passes**

Run: `grep -rEn '#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(' css/ --include='*.css' | grep -v '^css/tokens.css'`
Expected: no output. (`css/style.css` still exists at this point and will match — that is expected; it is deleted in Task 15. Confirm the only matches are from `css/style.css`.)

- [x] **Step 8: Commit**

```bash
git add package.json .gitignore tools/check-contrast.mjs tests/contrast.test.mjs css/tokens.css
git commit -m "feat: add design token system with AA contrast verification"
```

---

### Task 2: Safe storage and theme module

**Files:**
- Create: `js/storage.js`
- Create: `js/theme.js`
- Test: `tests/theme.test.mjs`

**Interfaces:**
- Consumes: `css/tokens.css` token names from Task 1.
- Produces:
  - `js/storage.js` exports `readStored(key: string): string | null` and `writeStored(key: string, value: string): boolean`. Both swallow every exception; `readStored` returns `null` on failure, `writeStored` returns `false`.
  - `js/theme.js` exports `THEMES: ['light','dark']`, `STORAGE_KEY: 'tc-theme'`, `resolveTheme(stored: string|null, prefersDark: boolean): 'light'|'dark'`, `nextTheme(current: string): 'light'|'dark'`, `applyTheme(theme: string, root?: HTMLElement): void`, and `initTheme({ button }: { button: HTMLElement }): { getTheme(): string, setTheme(t: string): void, toggle(): void }`.

- [x] **Step 1: Write the failing theme test**

`tests/theme.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { THEMES, STORAGE_KEY, resolveTheme, nextTheme } from '../js/theme.js';

test('exposes exactly the two supported themes', () => {
  assert.deepEqual(THEMES, ['light', 'dark']);
});

test('storage key is stable', () => {
  assert.equal(STORAGE_KEY, 'tc-theme');
});

test('an explicitly stored theme always wins over the system preference', () => {
  assert.equal(resolveTheme('light', true), 'light');
  assert.equal(resolveTheme('dark', false), 'dark');
});

test('falls back to the system preference when nothing is stored', () => {
  assert.equal(resolveTheme(null, true), 'dark');
  assert.equal(resolveTheme(null, false), 'light');
});

test('an unrecognised stored value is ignored, not trusted', () => {
  assert.equal(resolveTheme('banana', true), 'dark');
  assert.equal(resolveTheme('', false), 'light');
});

test('nextTheme flips, and treats anything unknown as light so the first click goes dark', () => {
  assert.equal(nextTheme('light'), 'dark');
  assert.equal(nextTheme('dark'), 'light');
  assert.equal(nextTheme('banana'), 'dark');
});
```

- [x] **Step 2: Run the test to verify it fails**

Run: `node --test tests/theme.test.mjs`
Expected: FAIL — `Cannot find module '../js/theme.js'`.

- [x] **Step 3: Implement safe storage**

`js/storage.js`:

```js
/**
 * localStorage access that never throws.
 *
 * Private-mode Safari, blocked site data and quota errors all raise on access.
 * The site must render correctly with no stored preference, so every failure
 * degrades to "nothing stored" rather than propagating.
 */

export function readStored(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStored(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}
```

- [x] **Step 4: Implement the theme module**

`js/theme.js`:

```js
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

  function commit(theme) {
    current = theme;
    applyTheme(current, root);
    writeStored(STORAGE_KEY, current);
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
    commit(event.matches ? 'dark' : 'light');
  });

  return {
    getTheme: () => current,
    setTheme,
    toggle: () => setTheme(nextTheme(current)),
  };
}
```

- [x] **Step 5: Run the test to verify it passes**

Run: `node --test tests/theme.test.mjs`
Expected: PASS, 6/6.

- [x] **Step 6: Commit**

```bash
git add js/storage.js js/theme.js tests/theme.test.mjs
git commit -m "feat: add theme module with safe storage and view-transition toggle"
```

---

### Task 3: i18n engine, shared dictionary and parity checker

**Files:**
- Create: `js/i18n/index.js`
- Create: `js/i18n/common.js`
- Create: `tools/check-i18n.mjs`
- Test: `tests/i18n.test.mjs`

**Interfaces:**
- Consumes: `readStored` / `writeStored` from `js/storage.js` (Task 2).
- Produces:
  - `js/i18n/index.js` exports `LANGS: ['en','fr']`, `DEFAULT_LANG: 'en'`, `STORAGE_KEY: 'tc-lang'`, `resolveLang(stored, preferred, langs?, fallback?): 'en'|'fr'`, `mergeDicts(...dicts): {en:object, fr:object}`, `parityReport(dict): { missingInEn: string[], missingInFr: string[] }`, `translate(dict, lang, key): string`, `applyDict(dict, lang, root?): void`, `initI18n({ dict, buttons }): { getLang(), setLang(l), toggle() }`.
  - `js/i18n/common.js` exports `common: { en: {...}, fr: {...} }`.
  - Dictionary shape: flat objects keyed by dotted string ids, e.g. `'nav.work'`.

- [x] **Step 1: Write the failing i18n test**

`tests/i18n.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LANGS,
  DEFAULT_LANG,
  STORAGE_KEY,
  resolveLang,
  mergeDicts,
  parityReport,
  translate,
} from '../js/i18n/index.js';
import { common } from '../js/i18n/common.js';

test('exposes exactly the two supported languages, English first', () => {
  assert.deepEqual(LANGS, ['en', 'fr']);
  assert.equal(DEFAULT_LANG, 'en');
  assert.equal(STORAGE_KEY, 'tc-lang');
});

test('an explicitly stored language wins over browser preferences', () => {
  assert.equal(resolveLang('fr', ['en-GB', 'en']), 'fr');
  assert.equal(resolveLang('en', ['fr-FR']), 'en');
});

test('falls back to a browser preference when nothing is stored', () => {
  assert.equal(resolveLang(null, ['fr-FR', 'fr']), 'fr');
  assert.equal(resolveLang(null, ['fr']), 'fr');
});

test('falls back to English for unsupported or absent preferences', () => {
  assert.equal(resolveLang(null, ['de-DE', 'es']), 'en');
  assert.equal(resolveLang(null, []), 'en');
  assert.equal(resolveLang('klingon', []), 'en');
});

test('mergeDicts combines per-language namespaces without cross-contamination', () => {
  const a = { en: { 'x.a': 'A' }, fr: { 'x.a': 'A-fr' } };
  const b = { en: { 'x.b': 'B' }, fr: { 'x.b': 'B-fr' } };
  const merged = mergeDicts(a, b);
  assert.deepEqual(merged.en, { 'x.a': 'A', 'x.b': 'B' });
  assert.deepEqual(merged.fr, { 'x.a': 'A-fr', 'x.b': 'B-fr' });
});

test('parityReport names the keys missing from each side', () => {
  const report = parityReport({ en: { a: '1', b: '2' }, fr: { a: '1', c: '3' } });
  assert.deepEqual(report.missingInFr, ['b']);
  assert.deepEqual(report.missingInEn, ['c']);
});

test('the shared dictionary is already at full parity', () => {
  const report = parityReport(common);
  assert.deepEqual(report.missingInEn, []);
  assert.deepEqual(report.missingInFr, []);
});

test('the shared dictionary has no empty strings in either language', () => {
  for (const lang of LANGS) {
    for (const [key, value] of Object.entries(common[lang])) {
      assert.ok(
        typeof value === 'string' && value.trim().length > 0,
        `common.${lang}.${key} is empty`,
      );
    }
  }
});

test('translate falls back to English, then to the key itself', () => {
  const dict = { en: { a: 'Alpha' }, fr: {} };
  assert.equal(translate(dict, 'fr', 'a'), 'Alpha');
  assert.equal(translate(dict, 'fr', 'missing'), 'missing');
  assert.equal(translate(dict, 'en', 'a'), 'Alpha');
});
```

- [x] **Step 2: Run the test to verify it fails**

Run: `node --test tests/i18n.test.mjs`
Expected: FAIL — `Cannot find module '../js/i18n/index.js'`.

- [x] **Step 3: Implement the i18n engine**

`js/i18n/index.js`:

```js
import { readStored, writeStored } from '../storage.js';

export const LANGS = ['en', 'fr'];
export const DEFAULT_LANG = 'en';
export const STORAGE_KEY = 'tc-lang';

/**
 * Stored choice wins; otherwise the first browser preference whose base tag is
 * supported; otherwise English.
 */
export function resolveLang(stored, preferred = [], langs = LANGS, fallback = DEFAULT_LANG) {
  if (langs.includes(stored)) return stored;
  for (const tag of preferred) {
    const base = String(tag).toLowerCase().split('-')[0];
    if (langs.includes(base)) return base;
  }
  return fallback;
}

export function mergeDicts(...dicts) {
  const out = {};
  for (const lang of LANGS) out[lang] = {};
  for (const dict of dicts) {
    if (!dict) continue;
    for (const lang of LANGS) Object.assign(out[lang], dict[lang] ?? {});
  }
  return out;
}

export function parityReport(dict) {
  const en = Object.keys(dict.en ?? {});
  const fr = Object.keys(dict.fr ?? {});
  return {
    missingInFr: en.filter((k) => !fr.includes(k)),
    missingInEn: fr.filter((k) => !en.includes(k)),
  };
}

export function translate(dict, lang, key) {
  return dict[lang]?.[key] ?? dict[DEFAULT_LANG]?.[key] ?? key;
}

/**
 * Applies a dictionary to the DOM.
 *
 * `data-i18n="key"`                        -> textContent
 * `data-i18n-html="key"`                   -> innerHTML (only for strings this
 *                                             project authors, never user input)
 * `data-i18n-attr="alt:key,aria-label:key" -> attributes
 */
export function applyDict(dict, lang, root = document) {
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = translate(dict, lang, el.dataset.i18n);
  });

  root.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = translate(dict, lang, el.dataset.i18nHtml);
  });

  root.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    for (const pair of el.dataset.i18nAttr.split(',')) {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      if (attr && key) el.setAttribute(attr, translate(dict, lang, key));
    }
  });

  const title = translate(dict, lang, 'meta.title');
  if (title !== 'meta.title') document.title = title;

  const description = document.querySelector('meta[name="description"]');
  const descText = translate(dict, lang, 'meta.description');
  if (description && descText !== 'meta.description') description.content = descText;

  document.documentElement.lang = lang;
}

export function initI18n({ dict, buttons = [] }) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = resolveLang(readStored(STORAGE_KEY), navigator.languages ?? []);

  applyDict(dict, current);
  syncButtons();

  function syncButtons() {
    for (const button of buttons) {
      const isActive = button.dataset.lang === current;
      button.setAttribute('aria-pressed', String(isActive));
      button.classList.toggle('is-active', isActive);
    }
    document.dispatchEvent(new CustomEvent('lang:changed', { detail: { lang: current } }));
  }

  function commit(lang) {
    current = lang;
    applyDict(dict, current);
    writeStored(STORAGE_KEY, current);
    syncButtons();
  }

  function setLang(lang) {
    if (!LANGS.includes(lang) || lang === current) return;
    if (reduced) { commit(lang); return; }

    // Brief blur-fade so differing string lengths do not pop.
    const main = document.querySelector('main');
    if (!main) { commit(lang); return; }
    main.classList.add('is-swapping');
    window.setTimeout(() => {
      commit(lang);
      window.requestAnimationFrame(() => main.classList.remove('is-swapping'));
    }, 120);
  }

  for (const button of buttons) {
    button.addEventListener('click', () => setLang(button.dataset.lang));
  }

  return {
    getLang: () => current,
    setLang,
    toggle: () => setLang(current === 'en' ? 'fr' : 'en'),
  };
}
```

- [x] **Step 4: Write the shared dictionary**

`js/i18n/common.js`:

```js
/** Strings shared by every page: navigation, toggles, footer. */
export const common = {
  en: {
    'skip.link': 'Skip to content',
    'nav.about': 'About',
    'nav.work': 'Work',
    'nav.beyond': 'Beyond the work',
    'nav.resume': 'Résumé',
    'nav.contact': 'Contact',
    'nav.back': 'Back to work',
    'nav.menu.open': 'Open menu',
    'nav.menu.close': 'Close menu',
    'nav.home': 'Thomas Chu — home',
    'theme.toDark': 'Switch to dark theme',
    'theme.toLight': 'Switch to light theme',
    'lang.en': 'EN',
    'lang.fr': 'FR',
    'lang.toEn': 'Read this site in English',
    'lang.toFr': 'Lire ce site en français',
    'footer.built': 'Built from scratch — no framework, no tracking.',
    'footer.source': 'Source on GitHub',
    'social.github': 'GitHub profile',
    'social.linkedin': 'LinkedIn profile',
  },
  fr: {
    'skip.link': 'Aller au contenu',
    'nav.about': 'À propos',
    'nav.work': 'Projets',
    'nav.beyond': 'En dehors du travail',
    'nav.resume': 'Parcours',
    'nav.contact': 'Contact',
    'nav.back': 'Retour aux projets',
    'nav.menu.open': 'Ouvrir le menu',
    'nav.menu.close': 'Fermer le menu',
    'nav.home': 'Thomas Chu — accueil',
    'theme.toDark': 'Passer au thème sombre',
    'theme.toLight': 'Passer au thème clair',
    'lang.en': 'EN',
    'lang.fr': 'FR',
    'lang.toEn': 'Read this site in English',
    'lang.toFr': 'Lire ce site en français',
    'footer.built': 'Réalisé de zéro — sans framework, sans traceur.',
    'footer.source': 'Code source sur GitHub',
    'social.github': 'Profil GitHub',
    'social.linkedin': 'Profil LinkedIn',
  },
};
```

- [x] **Step 5: Implement the parity checker**

`tools/check-i18n.mjs`:

```js
#!/usr/bin/env node
/**
 * Asserts FR/EN key parity across every dictionary, and that no string is
 * empty. Run before every commit that touches copy.
 */
import { parityReport, LANGS } from '../js/i18n/index.js';

const DICTS = [
  ['common', () => import('../js/i18n/common.js').then((m) => m.common)],
  ['home', () => import('../js/i18n/home.js').then((m) => m.home).catch(() => null)],
  ['projects', () => import('../js/i18n/projects.js').then((m) => m.projects).catch(() => null)],
  ['archive', () => import('../js/i18n/archive.js').then((m) => m.archive).catch(() => null)],
];

let failures = 0;

for (const [name, load] of DICTS) {
  const dict = await load();
  if (!dict) {
    console.log(`SKIP  ${name} (not created yet)`);
    continue;
  }

  const { missingInEn, missingInFr } = parityReport(dict);
  for (const key of missingInFr) {
    console.error(`FAIL  ${name}: "${key}" exists in en but not fr`);
    failures += 1;
  }
  for (const key of missingInEn) {
    console.error(`FAIL  ${name}: "${key}" exists in fr but not en`);
    failures += 1;
  }

  for (const lang of LANGS) {
    for (const [key, value] of Object.entries(dict[lang] ?? {})) {
      if (typeof value !== 'string' || value.trim() === '') {
        console.error(`FAIL  ${name}.${lang}: "${key}" is empty`);
        failures += 1;
      }
    }
  }

  if (missingInEn.length === 0 && missingInFr.length === 0) {
    const count = Object.keys(dict.en).length;
    console.log(`PASS  ${name} — ${count} keys at full parity`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} i18n failure(s).`);
  process.exit(1);
}
console.log('\nAll dictionaries at full FR/EN parity.');
```

- [x] **Step 6: Run the tests to verify they pass**

Run: `node --test tests/i18n.test.mjs`
Expected: PASS, 9/9.

Run: `node tools/check-i18n.mjs`
Expected: `PASS  common — 21 keys at full parity`, three `SKIP` lines, exit 0.

- [x] **Step 7: Commit**

```bash
git add js/i18n/index.js js/i18n/common.js tools/check-i18n.mjs tests/i18n.test.mjs
git commit -m "feat: add i18n engine, shared dictionary and parity checker"
```

---

### Task 4: Base stylesheets, site shell and sticky navigation

**Files:**
- Create: `css/base.css`, `css/layout.css`, `css/components.css`, `css/pages.css`
- Create: `js/nav.js`, `js/main.js`, `js/i18n/home.js`
- Create: `index.html` (shell only — sections land in Tasks 5, 7, 8, 9)
- Test: `tests/nav.test.mjs`

**Interfaces:**
- Consumes: tokens from `css/tokens.css` (Task 1); `initTheme` from `js/theme.js` (Task 2); `initI18n`, `mergeDicts` from `js/i18n/index.js` and `common` from `js/i18n/common.js` (Task 3).
- Produces:
  - `js/nav.js` exports `activeSectionId(entries: Array<{id: string, top: number}>, scrollY: number, offset: number): string | null` (pure) and `initNav({ header, toggle, panel, links, sections, threshold? }): { destroy(): void }`.
  - `js/i18n/home.js` exports `home: { en, fr }`.
  - `index.html` provides the shell later tasks append into: `header#top`, `main#content`, `footer`, and `<section>` landmarks with ids `about`, `work`, `beyond`, `resume`, `contact`. `<body data-page="home">`.
  - CSS class contract used by later tasks: `.rail`, `.rail--prose`, `.section`, `.section__head`, `.section__title`, `.eyebrow`, `.btn`, `.btn--primary`, `.btn--ghost`, `.chip`, `.chip-row`, `.icon-btn`, `.reveal`.

- [x] **Step 1: Write the failing nav test**

`tests/nav.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { activeSectionId } from '../js/nav.js';

const SECTIONS = [
  { id: 'about', top: 800 },
  { id: 'work', top: 1600 },
  { id: 'beyond', top: 2600 },
  { id: 'resume', top: 3400 },
  { id: 'contact', top: 4200 },
];

test('returns null while above the first section', () => {
  assert.equal(activeSectionId(SECTIONS, 0, 68), null);
});

test('activates a section once its top crosses the nav offset', () => {
  assert.equal(activeSectionId(SECTIONS, 740, 68), 'about');
  assert.equal(activeSectionId(SECTIONS, 1540, 68), 'work');
});

test('keeps the last crossed section active between boundaries', () => {
  assert.equal(activeSectionId(SECTIONS, 2000, 68), 'work');
  assert.equal(activeSectionId(SECTIONS, 3399, 68), 'beyond');
});

test('activates the final section at the bottom of the page', () => {
  assert.equal(activeSectionId(SECTIONS, 9999, 68), 'contact');
});

test('an empty section list never throws', () => {
  assert.equal(activeSectionId([], 500, 68), null);
});
```

- [x] **Step 2: Run the test to verify it fails**

Run: `node --test tests/nav.test.mjs`
Expected: FAIL — `Cannot find module '../js/nav.js'`.

- [x] **Step 3: Implement the nav module**

`js/nav.js`:

```js
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
```

- [x] **Step 4: Run the test to verify it passes**

Run: `node --test tests/nav.test.mjs`
Expected: PASS, 5/5.

- [x] **Step 5: Write `css/base.css`**

```css
/* ==========================================================================
   base.css — reset, document defaults, focus, selection.
   ========================================================================== */

*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }

html {
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}

body {
  min-height: 100svh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
  transition: background-color var(--dur) var(--ease), color var(--dur) var(--ease);
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-variation-settings: "SOFT" 40, "WONK" 0;
  font-weight: 600;
  line-height: var(--lh-tight);
  letter-spacing: -.015em;
  text-wrap: balance;
}

p { text-wrap: pretty; }
p, li { max-width: var(--measure); }

a { color: var(--accent); text-decoration-thickness: 1px; text-underline-offset: .2em; }
a:hover { color: var(--accent-strong); }

img, svg, canvas { display: block; max-width: 100%; }
img { height: auto; }

button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }

ul, ol { padding: 0; list-style: none; }

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}
:focus:not(:focus-visible) { outline: none; }

::selection { background: color-mix(in oklab, var(--accent) 32%, transparent); color: var(--text); }

* { scrollbar-color: var(--border-strong) transparent; scrollbar-width: thin; }

.eyebrow {
  font-family: var(--font-mono);
  font-size: var(--fs-mono);
  font-weight: 500;
  letter-spacing: var(--tracking-mono);
  text-transform: uppercase;
  color: var(--text-faint);
}

.visually-hidden {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.skip-link {
  position: absolute;
  inset-block-start: var(--space-2);
  inset-inline-start: var(--space-2);
  z-index: var(--z-skip);
  padding: var(--space-3) var(--space-4);
  background: var(--surface-raised);
  color: var(--text);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  text-decoration: none;
  transform: translateY(-200%);
  transition: transform var(--dur-fast) var(--ease);
}
.skip-link:focus-visible { transform: translateY(0); }

/* Language swap blur-fade (js/i18n/index.js toggles .is-swapping). */
main { transition: opacity var(--dur-fast) var(--ease), filter var(--dur-fast) var(--ease); }
main.is-swapping { opacity: 0; filter: blur(4px); }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: var(--dur-fast) !important;
    transition-property: opacity !important;
    scroll-behavior: auto !important;
  }
}
```

- [x] **Step 6: Write `css/layout.css`**

```css
/* ==========================================================================
   layout.css — rail, sections, header, footer, background canvas.
   ========================================================================== */

.rail {
  width: 100%;
  max-width: var(--rail);
  margin-inline: auto;
  padding-inline: max(var(--rail-pad), env(safe-area-inset-left));
}
.rail--prose { max-width: var(--rail-prose); }

.section { padding-block: var(--section-gap); }
.section + .section { padding-block-start: 0; }
.section__head { margin-block-end: var(--space-6); }
.section__title { font-size: var(--fs-h2); margin-block-start: var(--space-2); }

/* ---- Header ---- */
.site-header {
  position: sticky;
  inset-block-start: 0;
  z-index: var(--z-nav);
  block-size: var(--nav-h);
  padding-block-start: env(safe-area-inset-top);
  display: flex;
  align-items: center;
  background: var(--nav-bg);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  backdrop-filter: blur(14px) saturate(140%);
  border-block-end: 1px solid transparent;
  transition: background-color var(--dur) var(--ease),
              border-color var(--dur) var(--ease),
              box-shadow var(--dur) var(--ease);
}
.site-header.is-scrolled {
  background: var(--nav-bg-scrolled);
  border-block-end-color: var(--border);
  box-shadow: var(--shadow-nav);
}

/* Without backdrop-filter the bar must be opaque, never unreadable. */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .site-header { background: color-mix(in oklab, var(--bg) 97%, transparent); }
  .site-header.is-scrolled { background: var(--bg); }
}

.site-header__inner {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  inline-size: 100%;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--text);
  text-decoration: none;
  font-family: var(--font-display);
  font-variation-settings: "SOFT" 40, "WONK" 0;
  font-weight: 600;
  font-size: 1.05rem;
  letter-spacing: -.01em;
  margin-inline-end: auto;
}
.brand__mark { inline-size: 26px; block-size: 26px; color: var(--accent); flex: none; }

.nav-links { display: flex; align-items: center; gap: var(--space-1); }
.nav-links a {
  position: relative;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  font-size: var(--fs-small);
  font-weight: 500;
  text-decoration: none;
  transition: color var(--dur-fast) var(--ease), background-color var(--dur-fast) var(--ease);
}
.nav-links a:hover { color: var(--text); background: color-mix(in oklab, var(--accent) 10%, transparent); }
.nav-links a.is-active { color: var(--accent); }
.nav-links a.is-active::after {
  content: "";
  position: absolute;
  inset-inline: var(--space-3);
  inset-block-end: 2px;
  block-size: 2px;
  border-radius: var(--radius-full);
  background: var(--accent);
}

.nav-tools { display: flex; align-items: center; gap: var(--space-2); flex: none; }

/* ---- Collapsed panel ---- */
.nav-toggle { display: none; }

.nav-panel {
  position: fixed;
  inset-block-start: calc(var(--nav-h) + env(safe-area-inset-top));
  inset-inline: 0;
  z-index: var(--z-panel);
  padding: var(--space-4) max(var(--rail-pad), env(safe-area-inset-left)) var(--space-6);
  background: var(--surface-raised);
  border-block-end: 1px solid var(--border);
  box-shadow: var(--shadow-nav);
  animation: panel-in var(--dur) var(--ease);
}
.nav-panel[hidden] { display: none; }
.nav-panel a {
  display: flex;
  align-items: center;
  min-block-size: 44px;
  padding: var(--space-3) var(--space-2);
  color: var(--text);
  font-size: 1.05rem;
  font-weight: 500;
  text-decoration: none;
  border-block-end: 1px solid var(--border);
}
.nav-panel a:last-child { border-block-end: 0; }

@keyframes panel-in {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

body.has-panel-open { overflow: hidden; }

@media (max-width: 859px) {
  .nav-links { display: none; }
  .nav-toggle { display: inline-flex; }
}
@media (min-width: 860px) {
  .nav-panel { display: none !important; }
}

/* Anchored sections must clear the sticky header. */
:target, section[id] { scroll-margin-top: calc(var(--nav-h) + 8px); }

/* ---- Footer ---- */
.site-footer {
  margin-block-start: var(--section-gap);
  padding-block: var(--space-6);
  padding-block-end: max(var(--space-6), env(safe-area-inset-bottom));
  border-block-start: 1px solid var(--border);
  color: var(--text-faint);
  font-size: var(--fs-small);
}
.site-footer__inner {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  align-items: center;
  justify-content: space-between;
}

/* ---- Background canvas ---- */
#particles {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}
```

- [x] **Step 7: Write `css/components.css`**

Cards, timeline and hobby panels are appended by Tasks 7–9. This step creates the file with buttons, chips, icon buttons, the language toggle and the reveal primitive.

```css
/* ==========================================================================
   components.css — reusable UI pieces.
   ========================================================================== */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-block-size: 44px;
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-full);
  font-size: var(--fs-small);
  font-weight: 600;
  text-decoration: none;
  border: 1px solid transparent;
  transition: transform var(--dur-fast) var(--ease),
              background-color var(--dur-fast) var(--ease),
              border-color var(--dur-fast) var(--ease),
              color var(--dur-fast) var(--ease),
              box-shadow var(--dur-fast) var(--ease);
}
.btn:active { transform: translateY(1px); }

.btn--primary { background: var(--accent); color: var(--accent-contrast); }
.btn--primary:hover { background: var(--accent-strong); color: var(--accent-contrast); box-shadow: var(--glow-accent); }

.btn--ghost { border-color: var(--border-strong); color: var(--text); }
.btn--ghost:hover { border-color: var(--accent); color: var(--accent); background: color-mix(in oklab, var(--accent) 8%, transparent); }

.chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  background: var(--surface);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fs-mono);
  letter-spacing: var(--tracking-mono);
  text-decoration: none;
  transition: border-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease);
}
.chip svg { inline-size: 15px; block-size: 15px; flex: none; }
a.chip { min-block-size: 44px; }
a.chip:hover { border-color: var(--accent); color: var(--accent); }

.chip-row { display: flex; flex-wrap: wrap; gap: var(--space-2); }

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 44px;
  block-size: 44px;
  border-radius: var(--radius-full);
  color: var(--text-muted);
  transition: color var(--dur-fast) var(--ease), background-color var(--dur-fast) var(--ease);
}
.icon-btn:hover { color: var(--accent); background: color-mix(in oklab, var(--accent) 10%, transparent); }
.icon-btn svg { inline-size: 20px; block-size: 20px; }

.lang-toggle {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  overflow: hidden;
}
.lang-toggle button {
  min-inline-size: 44px;
  min-block-size: 38px;
  padding-inline: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--fs-mono);
  font-weight: 500;
  letter-spacing: var(--tracking-mono);
  color: var(--text-faint);
  transition: color var(--dur-fast) var(--ease), background-color var(--dur-fast) var(--ease);
}
.lang-toggle button:hover { color: var(--text); }
.lang-toggle button.is-active { background: var(--accent); color: var(--accent-contrast); }

/* Scroll reveal — opacity and transform only, never layout. */
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity var(--dur-slow) var(--ease), transform var(--dur-slow) var(--ease);
  transition-delay: calc(var(--i, 0) * 60ms);
}
.reveal.is-visible { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; }
}
```

- [x] **Step 8: Create `css/pages.css` as a stub**

```css
/* ==========================================================================
   pages.css — hero, project-detail and archive specifics.
   Populated by Tasks 5, 11 and 13.
   ========================================================================== */
```

- [x] **Step 9: Write the `index.html` shell**

Section bodies are appended by later tasks; the landmarks and headings exist now so the nav has something to track.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

<!-- The only inline script in the project: prevents a flash of the wrong theme. -->
<script>
  try {
    var t = localStorage.getItem('tc-theme');
    if (t !== 'light' && t !== 'dark') {
      t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.dataset.theme = t;
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
</script>

<title>Thomas Chu — Data Scientist &amp; AI Engineer</title>
<meta name="description" content="Data scientist and AI engineer building decision-support systems. Apprentice at UTBM, working in the AIMOS team at FEMTO-ST.">
<meta name="theme-color" content="#100D16">
<link rel="canonical" href="https://gitgudshu.github.io/">
<link rel="icon" href="favicon.svg" type="image/svg+xml">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;700&display=swap">

<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/pages.css">
</head>

<body data-page="home">
<a class="skip-link" href="#content" data-i18n="skip.link">Skip to content</a>

<canvas id="particles" aria-hidden="true"></canvas>

<header class="site-header" id="top">
  <div class="rail site-header__inner">
    <a class="brand" href="#top" data-i18n-attr="aria-label:nav.home">
      <svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor">
        <rect x="1" y="1" width="30" height="30" rx="9" stroke-width="1.5"/>
        <path d="M8 11h8M12 11v11" stroke-width="2" stroke-linecap="round"/>
        <path d="M24 12.5a4.5 4.5 0 1 0 0 7" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <span>Thomas Chu</span>
    </a>

    <nav class="nav-links" aria-label="Primary">
      <a href="#about" data-i18n="nav.about">About</a>
      <a href="#work" data-i18n="nav.work">Work</a>
      <a href="#beyond" data-i18n="nav.beyond">Beyond the work</a>
      <a href="#resume" data-i18n="nav.resume">Résumé</a>
      <a href="#contact" data-i18n="nav.contact">Contact</a>
    </nav>

    <div class="nav-tools">
      <div class="lang-toggle" role="group" aria-label="Language">
        <button type="button" data-lang="en" data-i18n="lang.en" data-i18n-attr="title:lang.toEn">EN</button>
        <button type="button" data-lang="fr" data-i18n="lang.fr" data-i18n-attr="title:lang.toFr">FR</button>
      </div>

      <button type="button" class="icon-btn" id="theme-btn" data-i18n-attr="aria-label:theme.toDark">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <circle cx="12" cy="12" r="4.2"/>
          <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6"/>
        </svg>
      </button>

      <button type="button" class="icon-btn nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-panel" data-i18n-attr="aria-label:nav.menu.open">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <path d="M4 7h16M4 12h16M4 17h16"/>
        </svg>
      </button>
    </div>
  </div>
</header>

<nav class="nav-panel" id="nav-panel" aria-label="Primary mobile" hidden>
  <a href="#about" data-i18n="nav.about">About</a>
  <a href="#work" data-i18n="nav.work">Work</a>
  <a href="#beyond" data-i18n="nav.beyond">Beyond the work</a>
  <a href="#resume" data-i18n="nav.resume">Résumé</a>
  <a href="#contact" data-i18n="nav.contact">Contact</a>
</nav>

<main id="content">
  <!-- Task 5 inserts the hero here -->

  <section class="section" id="about" aria-labelledby="about-title">
    <div class="rail"><h2 class="section__title" id="about-title" data-i18n="about.title">About</h2></div>
  </section>

  <section class="section" id="work" aria-labelledby="work-title">
    <div class="rail"><h2 class="section__title" id="work-title" data-i18n="work.title">Selected work</h2></div>
  </section>

  <section class="section" id="beyond" aria-labelledby="beyond-title">
    <div class="rail"><h2 class="section__title" id="beyond-title" data-i18n="beyond.title">Beyond the work</h2></div>
  </section>

  <section class="section" id="resume" aria-labelledby="resume-title">
    <div class="rail"><h2 class="section__title" id="resume-title" data-i18n="resume.title">Résumé</h2></div>
  </section>

  <section class="section" id="contact" aria-labelledby="contact-title">
    <div class="rail"><h2 class="section__title" id="contact-title" data-i18n="contact.title">Contact</h2></div>
  </section>
</main>

<footer class="site-footer">
  <div class="rail site-footer__inner">
    <p data-i18n="footer.built">Built from scratch — no framework, no tracking.</p>
    <a href="https://github.com/GitGudShu/GitGudShu.github.io" data-i18n="footer.source">Source on GitHub</a>
  </div>
</footer>

<script type="module" src="js/main.js"></script>
</body>
</html>
```

- [x] **Step 10: Write `js/main.js`**

Later tasks extend this file; reveal and particle wiring arrives in Task 10.

```js
import { initTheme } from './theme.js';
import { initI18n, mergeDicts } from './i18n/index.js';
import { common } from './i18n/common.js';
import { initNav } from './nav.js';

async function pageDict() {
  const page = document.body.dataset.page;
  if (page === 'home') return (await import('./i18n/home.js')).home;
  if (page === 'archive') return (await import('./i18n/archive.js')).archive;
  if (page === 'project') {
    const { projects } = await import('./i18n/projects.js');
    return projects[document.body.dataset.project] ?? null;
  }
  return null;
}

async function boot() {
  initTheme({ button: document.getElementById('theme-btn') });

  const dict = mergeDicts(common, await pageDict());
  initI18n({ dict, buttons: [...document.querySelectorAll('[data-lang]')] });

  const header = document.querySelector('.site-header');
  if (header) {
    initNav({
      header,
      toggle: document.getElementById('nav-toggle'),
      panel: document.getElementById('nav-panel'),
      links: [...document.querySelectorAll('.nav-links a[href^="#"]')],
      sections: [...document.querySelectorAll('main section[id]')],
    });
  }
}

boot();
```

- [x] **Step 11: Write the initial home dictionary**

`js/i18n/home.js` — created now so `main.js` resolves; extended by Tasks 5, 7, 8, 9.

```js
export const home = {
  en: {
    'meta.title': 'Thomas Chu — Data Scientist & AI Engineer',
    'meta.description': 'Data scientist and AI engineer building decision-support systems. Apprentice at UTBM, working in the AIMOS team at FEMTO-ST.',
    'about.title': 'About',
    'work.title': 'Selected work',
    'beyond.title': 'Beyond the work',
    'resume.title': 'Résumé',
    'contact.title': 'Contact',
  },
  fr: {
    'meta.title': 'Thomas Chu — Data Scientist & Ingénieur IA',
    'meta.description': "Data scientist et ingénieur IA, je construis des systèmes d'aide à la décision. Apprenti à l'UTBM, au sein de l'équipe AIMOS de FEMTO-ST.",
    'about.title': 'À propos',
    'work.title': 'Projets sélectionnés',
    'beyond.title': 'En dehors du travail',
    'resume.title': 'Parcours',
    'contact.title': 'Contact',
  },
};
```

- [x] **Step 12: Verify in the browser**

Run: `python -m http.server 8000`, open `http://localhost:8000/`.

Confirm, in order:
1. No console errors.
2. The header is frosted and translucent; scrolling past 24px adds a border and shadow.
3. Nav links highlight as each section scrolls under the header.
4. Below 860px the links collapse into a menu button; the panel opens, traps `Tab`, and closes on `Escape` (returning focus to the button), on outside click, and on link click. `EN|FR` and the theme button stay in the bar.
5. The theme button toggles with a circular wipe (Chrome/Edge) or a cross-fade (Firefox/Safari); the choice survives a reload.
6. `EN|FR` swaps the five section headings and `<html lang>`; the choice survives a reload.
7. Clicking a nav anchor does not leave the heading hidden under the header.

- [x] **Step 13: Verify no horizontal overflow**

In the console, with the viewport at 320px:

```js
document.documentElement.scrollWidth <= window.innerWidth
```

Expected: `true`.

- [x] **Step 14: Run the full check suite**

Run: `npm run verify`
Expected: contrast PASS, i18n PASS (`common` and `home` at parity, `projects`/`archive` SKIP), all unit tests PASS.

- [x] **Step 15: Commit**

```bash
git add css/base.css css/layout.css css/components.css css/pages.css \
        js/nav.js js/main.js js/i18n/home.js tests/nav.test.mjs index.html
git commit -m "feat: add base styles, frosted sticky header and site shell"
```

---

### Task 5: Portrait crop and hero section

**Files:**
- Create: `tools/crop-portrait.py`, `assets/portrait.jpg`
- Modify: `index.html` (insert the hero before `#about`)
- Modify: `css/pages.css` (append hero styles)
- Modify: `js/i18n/home.js` (add `hero.*` keys)

**Interfaces:**
- Consumes: `.rail`, `.eyebrow`, `.btn`, `.btn--primary`, `.btn--ghost`, `.chip`, `.chip-row`, `.reveal` from Task 4.
- Produces: `.hero`, `.hero__inner`, `.hero__content`, `.hero__name`, `.hero__tagline`, `.hero__intro`, `.hero__actions`, `.hero__portrait`, `.hero__stack`, `.hero__stack-list`; home dictionary keys prefixed `hero.`; the file `assets/portrait.jpg` at 720×720.

- [ ] **Step 1: Write the crop script**

`tools/crop-portrait.py`:

```python
"""One-off: crop assets/hero.jpg to a square portrait.

The source is 1024x683 and contains three musicians. The box below frames the
subject on the left — face, hands and the full guitar including the neck — and
excludes the other two. Run once; assets/hero.jpg is never modified.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "hero.jpg"
DST = ROOT / "assets" / "portrait.jpg"

BOX = (125, 75, 705, 655)  # left, upper, right, lower -> 580x580
SIZE = (720, 720)
BUDGET_KB = 120


def main() -> None:
    with Image.open(SRC) as im:
        if im.size != (1024, 683):
            raise SystemExit(f"Unexpected source size {im.size}; expected (1024, 683)")
        out = im.convert("RGB").crop(BOX).resize(SIZE, Image.LANCZOS)
        out.save(DST, "JPEG", quality=88, optimize=True, progressive=True)

    kb = DST.stat().st_size / 1024
    print(f"Wrote {DST.relative_to(ROOT)} {SIZE[0]}x{SIZE[1]} ({kb:.0f} KB)")
    if kb > BUDGET_KB:
        raise SystemExit(f"Portrait is {kb:.0f} KB; budget is {BUDGET_KB} KB. Lower quality and rerun.")


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Run the crop and inspect the result**

Run: `python tools/crop-portrait.py`
Expected: `Wrote assets/portrait.jpg 720x720 (NN KB)` with NN ≤ 120, exit 0.

Open `assets/portrait.jpg` and confirm the subject's face and the full guitar are in frame and the other two musicians are excluded. If the framing is off, adjust `BOX` and rerun — do not ship a bad crop.

- [ ] **Step 3: Add the hero keys to `js/i18n/home.js`**

Merge into the `en` object:

```js
    'hero.eyebrow': 'Data Scientist · AI Engineer',
    'hero.name': 'Thomas Chu',
    'hero.tagline': 'I build decision-support systems where the hard part is the data, not the dashboard.',
    'hero.intro': "I'm a data science apprentice at UTBM, working in the AIMOS team at FEMTO-ST. My work sits where data engineering meets operational research — turning messy institutional data into something a decision-maker can actually act on.",
    'hero.cta.work': 'View my work',
    'hero.cta.cv': 'Download CV',
    'hero.chip.location': 'Franche-Comté, France',
    'hero.portrait.alt': 'Thomas Chu playing classical guitar',
    'hero.stack.label': 'Working with',
```

Merge into the `fr` object:

```js
    'hero.eyebrow': 'Data Scientist · Ingénieur IA',
    'hero.name': 'Thomas Chu',
    'hero.tagline': "Je construis des systèmes d'aide à la décision où la difficulté est la donnée, pas le tableau de bord.",
    'hero.intro': "Apprenti en data science à l'UTBM, je travaille au sein de l'équipe AIMOS de FEMTO-ST. Mon travail se situe à la rencontre de l'ingénierie des données et de la recherche opérationnelle — transformer des données institutionnelles désordonnées en quelque chose sur quoi un décideur peut réellement agir.",
    'hero.cta.work': 'Voir mes projets',
    'hero.cta.cv': 'Télécharger le CV',
    'hero.chip.location': 'Franche-Comté, France',
    'hero.portrait.alt': 'Thomas Chu jouant de la guitare classique',
    'hero.stack.label': 'Je travaille avec',
```

- [ ] **Step 4: Insert the hero markup into `index.html`**

Immediately after `<main id="content">` and before `<section class="section" id="about"…>`:

```html
  <section class="hero" aria-labelledby="hero-name">
    <div class="rail hero__inner">
      <div class="hero__content">
        <p class="eyebrow reveal" style="--i:0" data-i18n="hero.eyebrow">Data Scientist · AI Engineer</p>
        <h1 class="hero__name reveal" id="hero-name" style="--i:1" data-i18n="hero.name">Thomas Chu</h1>
        <p class="hero__tagline reveal" style="--i:2" data-i18n="hero.tagline">I build decision-support systems where the hard part is the data, not the dashboard.</p>
        <p class="hero__intro reveal" style="--i:3" data-i18n="hero.intro">I'm a data science apprentice at UTBM, working in the AIMOS team at FEMTO-ST.</p>

        <div class="chip-row reveal" style="--i:4">
          <a class="chip" href="mailto:ml.thomaschu@gmail.com">ml.thomaschu@gmail.com</a>
          <span class="chip" data-i18n="hero.chip.location">Franche-Comté, France</span>
        </div>

        <div class="hero__actions reveal" style="--i:5">
          <a class="btn btn--primary" href="#work" data-i18n="hero.cta.work">View my work</a>
          <a class="btn btn--ghost" href="CV-FR.pdf" download data-i18n="hero.cta.cv">Download CV</a>
          <!-- When CV-EN.pdf exists, duplicate the line above with href="CV-EN.pdf". -->
        </div>
      </div>

      <figure class="hero__portrait reveal" style="--i:2">
        <img src="assets/portrait.jpg" width="720" height="720"
             data-i18n-attr="alt:hero.portrait.alt"
             alt="Thomas Chu playing classical guitar">
      </figure>
    </div>

    <div class="rail hero__stack reveal" style="--i:6">
      <span class="eyebrow" data-i18n="hero.stack.label">Working with</span>
      <ul class="hero__stack-list">
        <li>Python</li><li>FastAPI</li><li>Pandas</li><li>Parquet</li>
        <li>PyTorch</li><li>Vue 3</li><li>Quasar</li><li>MongoDB</li><li>Docker</li>
      </ul>
    </div>
  </section>
```

- [ ] **Step 5: Append hero styles to `css/pages.css`**

```css
/* ---- Hero ---- */
.hero { padding-block: clamp(2.5rem, 1.5rem + 5vw, 5.5rem) var(--section-gap); }

.hero__inner {
  display: grid;
  gap: clamp(2rem, 1rem + 4vw, 4rem);
  align-items: center;
}

.hero__name {
  font-size: var(--fs-display);
  font-weight: 600;
  margin-block: var(--space-3) var(--space-4);
}

.hero__tagline {
  font-family: var(--font-display);
  font-variation-settings: "SOFT" 40, "WONK" 0;
  font-size: var(--fs-h3);
  font-weight: 400;
  font-style: italic;
  color: var(--accent);
  max-width: 34ch;
  margin-block-end: var(--space-4);
}

.hero__intro { color: var(--text-muted); margin-block-end: var(--space-5); }

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-block-start: var(--space-5);
}

.hero__portrait {
  position: relative;
  justify-self: center;
  max-inline-size: 340px;
  inline-size: 100%;
}
.hero__portrait img {
  inline-size: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
}
/* Gradient ring, drawn as a masked border so it never clips the photo. */
.hero__portrait::after {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: var(--radius-lg);
  padding: 1px;
  background: linear-gradient(150deg,
    color-mix(in oklab, var(--accent) 70%, transparent),
    transparent 55%,
    color-mix(in oklab, var(--accent) 35%, transparent));
  -webkit-mask: linear-gradient(black 0 0) content-box, linear-gradient(black 0 0);
          mask: linear-gradient(black 0 0) content-box, linear-gradient(black 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  pointer-events: none;
}
.hero__portrait::before {
  content: "";
  position: absolute;
  inset: 12%;
  border-radius: var(--radius-lg);
  box-shadow: var(--glow-accent);
  z-index: -1;
}

.hero__stack {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  margin-block-start: clamp(2rem, 1rem + 3vw, 3.5rem);
  padding-block-start: var(--space-5);
  border-block-start: 1px solid var(--border);
}
.hero__stack-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-4);
  font-family: var(--font-mono);
  font-size: var(--fs-mono);
  color: var(--text-muted);
}
.hero__stack-list li { max-width: none; }
.hero__stack-list li::before { content: "· "; color: var(--text-faint); }
.hero__stack-list li:first-child::before { content: none; }

@media (min-width: 900px) {
  .hero__inner { grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr); }
  .hero__portrait { justify-self: end; max-inline-size: 380px; }
}
```

Note the `.hero__stack` border and the `.hero__stack-list li { max-width: none; }` override — `base.css` caps `li` at `--measure`, which would otherwise break the inline strip.

- [ ] **Step 6: Verify in the browser**

At 1920, 1440, 1024, 900, 899, 834, 768, 414, 360 and 320px confirm:
1. Two columns at ≥900px, stacked at ≤899px.
2. The portrait holds a 1:1 aspect; the gradient ring and glow are visible in **both** themes.
3. `document.documentElement.scrollWidth <= window.innerWidth` is `true` at every width.
4. At 320px the display type sits at the bottom of its clamp and the two buttons wrap rather than overflow.
5. In landscape phone (740×360) the hero does not exceed one viewport height.
6. `EN|FR` swaps the eyebrow, tagline, intro, both buttons, the location chip and the portrait `alt` (inspect the `alt` attribute directly).

- [ ] **Step 7: Run the check suite**

Run: `npm run verify`
Expected: all PASS, `home` reported at parity with the new key count.

- [ ] **Step 8: Commit**

```bash
git add tools/crop-portrait.py assets/portrait.jpg index.html css/pages.css js/i18n/home.js
git commit -m "feat: add hero section with cropped portrait"
```

---

### Task 6: SVG cover motifs and shared icons

**Files:**
- Create: `js/covers.js`, `js/icons.js`
- Test: `tests/covers.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `js/covers.js` exports `COVER_IDS: string[]` and `renderCover(id: string): string`. Valid ids: `optimops`, `kpiEngine`, `emotion`, `predictops`, `ars`, `wip`. Unknown ids throw `Unknown cover: <id>`.
  - `js/icons.js` exports `ICONS: Record<string,string>` (keys `github`, `linkedin`, `mail`, `location`, `arrow`, `external`) and `renderIcon(name: string): string`. Unknown names throw `Unknown icon: <name>`.
  - Every returned SVG is 16:9 `viewBox="0 0 480 270"` (covers) or `0 0 24 24` (icons), uses `currentColor` only, and carries `aria-hidden="true" focusable="false"`.

- [ ] **Step 1: Write the failing test**

`tests/covers.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { COVER_IDS, renderCover } from '../js/covers.js';
import { ICONS, renderIcon } from '../js/icons.js';

test('exposes exactly the six cover ids the project needs', () => {
  assert.deepEqual(
    [...COVER_IDS].sort(),
    ['ars', 'emotion', 'kpiEngine', 'optimops', 'predictops', 'wip'],
  );
});

test('every cover renders a well-formed, decorative, 16:9 svg', () => {
  for (const id of COVER_IDS) {
    const svg = renderCover(id);
    assert.match(svg, /^<svg[\s>]/, `${id} does not start with <svg`);
    assert.match(svg, /<\/svg>$/, `${id} does not end with </svg>`);
    assert.match(svg, /viewBox="0 0 480 270"/, `${id} is not 16:9`);
    assert.match(svg, /aria-hidden="true"/, `${id} is not aria-hidden`);
    assert.match(svg, /focusable="false"/, `${id} is focusable`);
  }
});

test('covers contain no colour literals — theme tokens only', () => {
  for (const id of COVER_IDS) {
    const svg = renderCover(id);
    assert.doesNotMatch(svg, /#[0-9a-fA-F]{3,8}\b/, `${id} contains a hex colour`);
    assert.doesNotMatch(svg, /\brgba?\(/, `${id} contains an rgb() colour`);
    assert.doesNotMatch(svg, /\bhsla?\(/, `${id} contains an hsl() colour`);
  }
});

test('covers emit no NaN coordinates', () => {
  for (const id of COVER_IDS) {
    assert.doesNotMatch(renderCover(id), /NaN/, `${id} emitted NaN`);
  }
});

test('an unknown cover id throws rather than rendering an empty box', () => {
  assert.throws(() => renderCover('nope'), /Unknown cover/);
});

test('every icon renders decorative svg without colour literals', () => {
  for (const name of Object.keys(ICONS)) {
    const svg = renderIcon(name);
    assert.match(svg, /^<svg[\s>]/, `${name} does not start with <svg`);
    assert.match(svg, /aria-hidden="true"/, `${name} is not aria-hidden`);
    assert.match(svg, /focusable="false"/, `${name} is focusable`);
    assert.doesNotMatch(svg, /#[0-9a-fA-F]{3,8}\b/, `${name} contains a hex colour`);
  }
});

test('the icon set covers every use in the build', () => {
  for (const name of ['github', 'linkedin', 'mail', 'location', 'arrow', 'external']) {
    assert.ok(ICONS[name], `missing icon: ${name}`);
  }
});

test('an unknown icon name throws', () => {
  assert.throws(() => renderIcon('nope'), /Unknown icon/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/covers.test.mjs`
Expected: FAIL — `Cannot find module '../js/covers.js'`.

- [ ] **Step 3: Implement `js/covers.js`**

Each motif is 480×270, stroked in `currentColor` so the card controls the hue. The `cover__pulse` class is animated by CSS in Task 7; `--d` staggers each cell's phase.

```js
/**
 * Abstract cover motifs, one per project. Every motif is 16:9, drawn only in
 * currentColor, and decorative — the card's text carries all the meaning.
 */

const wrap = (body) =>
  '<svg viewBox="0 0 480 270" class="cover__art" aria-hidden="true" focusable="false" ' +
  `fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

const n = (value) => Number(value).toFixed(1);

/** Hexagonal coverage grid — a few cells pulsing out of phase. */
function optimops() {
  const cells = [];
  const w = 46;
  const h = 40;
  for (let row = 0; row < 5; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const x = 60 + col * w + (row % 2 ? w / 2 : 0);
      const y = 45 + row * (h * 0.78);
      const points = [
        [x, y - h / 2], [x + w / 2.3, y - h / 4], [x + w / 2.3, y + h / 4],
        [x, y + h / 2], [x - w / 2.3, y + h / 4], [x - w / 2.3, y - h / 4],
      ].map(([px, py]) => `${n(px)},${n(py)}`).join(' ');

      const index = row * 8 + col;
      const lit = index % 7 === 0;
      cells.push(
        `<polygon points="${points}" stroke-width="1" opacity="${lit ? '.85' : '.22'}"` +
        (lit ? ` class="cover__pulse" style="--d:${n((index % 5) * 0.4)}s"` : '') +
        '/>',
      );
    }
  }
  return wrap(cells.join(''));
}

/** Star schema — one fact table, radiating dimension tables. */
function kpiEngine() {
  const cx = 240;
  const cy = 135;
  const dims = [[90, 55], [390, 55], [70, 200], [410, 200], [240, 32], [240, 238]];

  const spokes = dims
    .map(([x, y]) => `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke-width="1" opacity=".35"/>`)
    .join('');

  const nodes = dims
    .map(([x, y], i) =>
      `<rect x="${x - 26}" y="${y - 14}" width="52" height="28" rx="6" stroke-width="1.2" ` +
      `opacity=".75" class="cover__pulse" style="--d:${n(i * 0.35)}s"/>`)
    .join('');

  return wrap(
    spokes + nodes +
    `<rect x="${cx - 40}" y="${cy - 22}" width="80" height="44" rx="8" stroke-width="1.8" opacity=".95"/>` +
    `<line x1="${cx - 24}" y1="${cy - 6}" x2="${cx + 24}" y2="${cy - 6}" stroke-width="1" opacity=".5"/>` +
    `<line x1="${cx - 24}" y1="${cy + 6}" x2="${cx + 10}" y2="${cy + 6}" stroke-width="1" opacity=".5"/>`,
  );
}

/** Layered waveform over a spectrum band. */
function emotion() {
  const wave = (amp, phase, opacity, width) => {
    const points = [];
    for (let x = 20; x <= 460; x += 8) {
      const t = (x - 20) / 440;
      const y = 130 + Math.sin(t * Math.PI * 4 + phase) * amp * Math.sin(t * Math.PI);
      points.push(`${x},${n(y)}`);
    }
    return `<polyline points="${points.join(' ')}" stroke-width="${width}" opacity="${opacity}"/>`;
  };

  const bars = [];
  for (let i = 0; i < 44; i += 1) {
    const x = 20 + i * 10;
    const barHeight = 6 + Math.abs(Math.sin(i * 0.7)) * 34;
    bars.push(`<line x1="${x}" y1="${n(238 - barHeight)}" x2="${x}" y2="238" stroke-width="2.5" opacity=".2"/>`);
  }

  return wrap(bars.join('') + wave(48, 0, '.9', 1.8) + wave(34, 1.2, '.45', 1.2) + wave(22, 2.4, '.25', 1));
}

/** Forecast line: observed solid, predicted dashed, confidence band behind. */
function predictops() {
  const points = [];
  const upper = [];
  const lower = [];
  for (let i = 0; i <= 22; i += 1) {
    const x = 30 + i * 19;
    const base = 170 - Math.sin(i * 0.55) * 42 - i * 1.6;
    points.push({ x, y: base });
    const spread = i > 12 ? (i - 12) * 3.4 : 3;
    upper.push(`${x},${n(base - spread)}`);
    lower.unshift(`${x},${n(base + spread)}`);
  }

  const toStr = (list) => list.map((p) => `${p.x},${n(p.y)}`).join(' ');
  const solid = toStr(points.slice(0, 13));
  const dashed = toStr(points.slice(12));
  const joint = points[12];

  return wrap(
    `<polygon points="${upper.join(' ')} ${lower.join(' ')}" fill="currentColor" opacity=".12" stroke="none"/>` +
    '<line x1="30" y1="238" x2="450" y2="238" stroke-width="1" opacity=".3"/>' +
    `<polyline points="${solid}" stroke-width="2" opacity=".9"/>` +
    `<polyline points="${dashed}" stroke-width="2" stroke-dasharray="5 6" opacity=".6"/>` +
    `<circle cx="${joint.x}" cy="${n(joint.y)}" r="4" stroke-width="1.6" class="cover__pulse"/>`,
  );
}

/** Region contour with indicator pulses. */
function ars() {
  const contour =
    'M120 62 L188 44 L262 58 L326 40 L378 74 L396 132 L368 190 L306 224 ' +
    'L232 232 L166 210 L118 166 L102 110 Z';
  const inner = 'M170 96 L232 84 L288 104 L300 152 L258 190 L196 182 L162 146 Z';

  const dots = [[186, 120], [268, 128], [224, 172], [318, 96]]
    .map(([x, y], i) =>
      `<circle cx="${x}" cy="${y}" r="5" stroke-width="1.4" opacity=".8" ` +
      `class="cover__pulse" style="--d:${n(i * 0.5)}s"/>`)
    .join('');

  return wrap(
    `<path d="${contour}" stroke-width="1.6" opacity=".7"/>` +
    `<path d="${inner}" stroke-width="1" opacity=".3"/>` +
    dots,
  );
}

/** Writing in progress — a dotted frame; the takodachi image sits above it. */
function wip() {
  return wrap(
    '<rect x="24" y="20" width="432" height="230" rx="18" stroke-width="1.6" stroke-dasharray="6 9" opacity=".5"/>' +
    '<line x1="150" y1="204" x2="330" y2="204" stroke-width="1" opacity=".3"/>' +
    '<line x1="182" y1="220" x2="298" y2="220" stroke-width="1" opacity=".2"/>',
  );
}

const COVERS = { optimops, kpiEngine, emotion, predictops, ars, wip };

export const COVER_IDS = Object.keys(COVERS);

export function renderCover(id) {
  const build = COVERS[id];
  if (!build) throw new Error(`Unknown cover: ${id}`);
  return build();
}
```

- [ ] **Step 4: Implement `js/icons.js`**

```js
/** Icons defined once. All decorative, all currentColor. */

const svg = (body, extra) =>
  `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" ${extra}>${body}</svg>`;

const filled = (body) => svg(body, 'fill="currentColor"');

const stroked = (body) =>
  svg(body, 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"');

export const ICONS = {
  github: filled(
    '<path d="M12 1.7a10.3 10.3 0 0 0-3.26 20.07c.52.1.71-.22.71-.5v-1.75c-2.87.62-3.48-1.38-3.48-1.38-.47-1.2-1.15-1.52-1.15-1.52-.94-.64.07-.63.07-.63 1.04.07 1.58 1.07 1.58 1.07.92 1.58 2.42 1.12 3.01.86.09-.67.36-1.13.66-1.39-2.29-.26-4.7-1.15-4.7-5.1 0-1.13.4-2.05 1.06-2.77-.1-.26-.46-1.31.1-2.73 0 0 .87-.28 2.85 1.06a9.9 9.9 0 0 1 5.19 0c1.98-1.34 2.85-1.06 2.85-1.06.56 1.42.21 2.47.1 2.73.66.72 1.06 1.64 1.06 2.77 0 3.96-2.42 4.83-4.72 5.09.37.32.7.95.7 1.92v2.85c0 .28.19.61.72.5A10.3 10.3 0 0 0 12 1.7Z"/>',
  ),
  linkedin: filled(
    '<path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.75h4V20.5H3V9.75Zm6.5 0h3.83v1.47h.05a4.2 4.2 0 0 1 3.78-2.08c4.04 0 4.79 2.66 4.79 6.12v5.24h-4v-4.65c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73h-4V9.75Z"/>',
  ),
  mail: stroked('<rect x="2.8" y="4.8" width="18.4" height="14.4" rx="2.4"/><path d="m3.4 6.6 8.6 6 8.6-6"/>'),
  location: stroked('<path d="M12 21.2s6.6-5.2 6.6-10.2a6.6 6.6 0 1 0-13.2 0c0 5 6.6 10.2 6.6 10.2Z"/><circle cx="12" cy="11" r="2.4"/>'),
  arrow: stroked('<path d="M4.8 12h14.4M13.6 6.4 19.2 12l-5.6 5.6"/>'),
  external: stroked('<path d="M14 4.8h5.2V10M19.2 4.8 11 13M18 14v4.4a1.8 1.8 0 0 1-1.8 1.8H5.6a1.8 1.8 0 0 1-1.8-1.8V7.8A1.8 1.8 0 0 1 5.6 6H10"/>'),
};

export function renderIcon(name) {
  const markup = ICONS[name];
  if (!markup) throw new Error(`Unknown icon: ${name}`);
  return markup;
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `node --test tests/covers.test.mjs`
Expected: PASS, 8/8.

- [ ] **Step 6: Eyeball every motif before trusting it**

The tests prove the markup is well-formed, not that the drawing looks right. Write a throwaway preview at `tools/preview-covers.html`, open it, confirm all six motifs read clearly at card size (roughly 380×214) in both themes, then **delete the file** — it is not part of the site.

```html
<!DOCTYPE html>
<html data-theme="dark">
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="../css/tokens.css">
<style>
  body { background: var(--bg); display: grid; gap: 24px; padding: 24px;
         grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); }
  figure { margin: 0; background: var(--surface); border: 1px solid var(--border);
           border-radius: var(--radius-md); padding: 12px; color: var(--accent); }
  figcaption { color: var(--text-muted); font: 12px monospace; margin-top: 8px; }
</style>
</head>
<body>
<script type="module">
  import { COVER_IDS, renderCover } from '../js/covers.js';
  document.body.innerHTML += COVER_IDS
    .map((id) => `<figure>${renderCover(id)}<figcaption>${id}</figcaption></figure>`)
    .join('');
</script>
</body>
</html>
```

Toggle `data-theme="light"` on the `<html>` element and confirm the motifs still read.

- [ ] **Step 7: Delete the preview and commit**

```bash
rm tools/preview-covers.html
git add js/covers.js js/icons.js tests/covers.test.mjs
git commit -m "feat: add abstract SVG cover motifs and shared icon set"
```

---

### Task 7: Project metadata, work grid and the archive rule

**Files:**
- Create: `js/data/projects.js`
- Modify: `index.html` (`#work` body)
- Modify: `css/components.css` (append card and archive styles)
- Modify: `js/i18n/home.js` (add `work.*` keys)
- Modify: `js/main.js` (render the grid)
- Test: `tests/projects.test.mjs`

**Interfaces:**
- Consumes: `renderCover`, `COVER_IDS` from `js/covers.js`; `renderIcon` from `js/icons.js` (Task 6); `translate` from `js/i18n/index.js` (Task 3).
- Produces:
  - `js/data/projects.js` exports `PROJECTS: Array<{ id: string, href: string|null, cover: string, tags: string[], placeholder?: boolean }>` and `renderProjectCard(project, dict, lang): string`.
  - Card i18n key convention: for a project with `id: "optimops"` the dictionary must define `work.optimops.role`, `work.optimops.year`, `work.optimops.title`, `work.optimops.summary`.
  - CSS classes `.work-grid`, `.card`, `.card__cover`, `.cover__art`, `.cover__pulse`, `.card__body`, `.card__meta`, `.card__title`, `.card__summary`, `.card__tags`, `.card--placeholder`, `.archive-rule`.

- [ ] **Step 1: Write the failing projects test**

`tests/projects.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECTS, renderProjectCard } from '../js/data/projects.js';
import { COVER_IDS } from '../js/covers.js';
import { home } from '../js/i18n/home.js';
import { LANGS, translate } from '../js/i18n/index.js';

test('ships exactly six cards: five flagships plus the placeholder', () => {
  assert.equal(PROJECTS.length, 6);
  assert.equal(PROJECTS.filter((p) => p.placeholder).length, 1);
});

test('the flagship order matches the intended narrative', () => {
  assert.deepEqual(
    PROJECTS.map((p) => p.id),
    ['optimops', 'kpi-engine', 'emotion-recognition', 'predictops', 'ars', 'wip'],
  );
});

test('every project points at a cover that actually exists', () => {
  for (const project of PROJECTS) {
    assert.ok(COVER_IDS.includes(project.cover), `${project.id}: unknown cover "${project.cover}"`);
  }
});

test('every flagship links to its page; the placeholder links nowhere', () => {
  for (const project of PROJECTS) {
    if (project.placeholder) {
      assert.equal(project.href, null, `${project.id} should not be a link`);
    } else {
      assert.equal(project.href, `projects/${project.id}.html`);
    }
  }
});

test('every project has at least three tags', () => {
  for (const project of PROJECTS) {
    if (project.placeholder) continue;
    assert.ok(project.tags.length >= 3, `${project.id} has too few tags`);
  }
});

test('the home dictionary defines all four card keys for every project, in both languages', () => {
  for (const project of PROJECTS) {
    for (const field of ['role', 'year', 'title', 'summary']) {
      const key = `work.${project.id}.${field}`;
      for (const lang of LANGS) {
        assert.notEqual(
          translate(home, lang, key), key,
          `missing ${lang} string for ${key}`,
        );
      }
    }
  }
});

test('a flagship card renders as one anchor with its cover, title and tags', () => {
  const optimops = PROJECTS[0];
  const html = renderProjectCard(optimops, home, 'en');
  assert.match(html, /^<a /, 'flagship card must be a single anchor');
  assert.match(html, /href="projects\/optimops\.html"/);
  assert.match(html, /<svg/, 'cover motif missing');
  assert.match(html, /Python/, 'tags missing');
  assert.doesNotMatch(html, /aria-disabled/);
});

test('the placeholder renders as a non-link article marked aria-disabled', () => {
  const wip = PROJECTS.at(-1);
  const html = renderProjectCard(wip, home, 'en');
  assert.match(html, /^<article /);
  assert.match(html, /aria-disabled="true"/);
  assert.doesNotMatch(html, /<a /, 'placeholder must not contain a link');
});

test('rendering escapes nothing unexpected — no raw undefined leaks into markup', () => {
  for (const lang of LANGS) {
    for (const project of PROJECTS) {
      const html = renderProjectCard(project, home, lang);
      assert.doesNotMatch(html, /undefined/, `${project.id}/${lang} leaked undefined`);
    }
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/projects.test.mjs`
Expected: FAIL — `Cannot find module '../js/data/projects.js'`.

- [ ] **Step 3: Implement `js/data/projects.js`**

```js
import { renderCover } from '../covers.js';
import { renderIcon } from '../icons.js';
import { translate } from '../i18n/index.js';

/**
 * Card order is the narrative order: the flagship platform, the engine beneath
 * it, the research work, the forecasting work, the second platform, then the
 * placeholder. `id` doubles as the page slug and the i18n key namespace.
 */
export const PROJECTS = [
  {
    id: 'optimops',
    href: 'projects/optimops.html',
    cover: 'optimops',
    tags: ['Python', 'FastAPI', 'Vue 3', 'Quasar', 'Parquet'],
  },
  {
    id: 'kpi-engine',
    href: 'projects/kpi-engine.html',
    cover: 'kpiEngine',
    tags: ['Python', 'Pandas', 'Parquet', 'pytest'],
  },
  {
    id: 'emotion-recognition',
    href: 'projects/emotion-recognition.html',
    cover: 'emotion',
    tags: ['PyTorch', 'DeBERTa', 'Transformers', 'W&B'],
  },
  {
    id: 'predictops',
    href: 'projects/predictops.html',
    cover: 'predictops',
    tags: ['Python', 'scikit-learn', 'Vue 3', 'Quasar'],
  },
  {
    id: 'ars',
    href: 'projects/ars.html',
    cover: 'ars',
    tags: ['Flask', 'MongoDB', 'Vue 3', 'Leaflet'],
  },
  {
    id: 'wip',
    href: null,
    cover: 'wip',
    tags: [],
    placeholder: true,
  },
];

function cardInner(project, dict, lang) {
  const t = (field) => translate(dict, lang, `work.${project.id}.${field}`);

  const cover = project.placeholder
    ? `<div class="card__cover card__cover--placeholder">${renderCover(project.cover)}` +
      '<img src="assets/images/profile.png" width="500" height="500" alt="" loading="lazy" class="card__mascot">' +
      '</div>'
    : `<div class="card__cover">${renderCover(project.cover)}</div>`;

  const tags = project.tags.length
    ? `<ul class="card__tags">${project.tags.map((tag) => `<li>${tag}</li>`).join('')}</ul>`
    : '';

  const arrow = project.placeholder ? '' : `<span class="card__arrow">${renderIcon('arrow')}</span>`;

  return (
    cover +
    '<div class="card__body">' +
      `<p class="eyebrow card__meta"><span>${t('role')}</span><span>${t('year')}</span></p>` +
      `<h3 class="card__title">${t('title')}</h3>` +
      `<p class="card__summary">${t('summary')}</p>` +
      tags +
      arrow +
    '</div>'
  );
}

export function renderProjectCard(project, dict, lang) {
  const inner = cardInner(project, dict, lang);

  if (project.placeholder) {
    return `<article class="card card--placeholder" aria-disabled="true">${inner}</article>`;
  }

  // One anchor wraps the whole card: a single labelled link for screen readers,
  // and text stays selectable — unlike the old absolute-overlay approach.
  return `<a class="card" href="${project.href}">${inner}</a>`;
}
```

- [ ] **Step 4: Add the work keys to `js/i18n/home.js`**

Merge into `en`:

```js
    'work.lead': 'Five projects that show how I work. Each one has a page of its own.',
    'work.optimops.role': 'Full-stack · decision support',
    'work.optimops.year': '2023 — present',
    'work.optimops.title': 'OptimOps Neo',
    'work.optimops.summary': 'A decision-support platform for a French fire & rescue service: coverage analysis, scenario simulation and resource optimization, served from a Parquet-backed API into a dashboard users configure themselves.',
    'work.kpi-engine.role': 'Data architecture',
    'work.kpi-engine.year': '2025 — present',
    'work.kpi-engine.title': 'KPI Engine',
    'work.kpi-engine.summary': 'A ground-up rebuild of the indicator engine behind OptimOps — a validated input contract, a star-schema core, and a regression harness that checks every number against the engine it replaces.',
    'work.emotion-recognition.role': 'Research internship',
    'work.emotion-recognition.year': '2023',
    'work.emotion-recognition.title': 'Multimodal Emotion Recognition',
    'work.emotion-recognition.summary': 'Emotion recognition across video, text, audio and images at the University of Portsmouth — fine-tuning DeBERTa and an OpenAI model, with a live transcription tool for real-time analysis.',
    'work.predictops.role': 'Forecasting · dataviz',
    'work.predictops.year': '2023 — 2024',
    'work.predictops.title': 'Predictops',
    'work.predictops.summary': 'Geolocated forecasting of emergency interventions, combining historical operational data with weather signals and surfacing the result where operators actually look.',
    'work.ars.role': 'Proof of concept',
    'work.ars.year': '2024',
    'work.ars.title': 'ARS Health Dashboard',
    'work.ars.summary': 'A regional health-surveillance dashboard — emergency and hospitalisation indicators on an interactive map, built on the same configurable-widget architecture as OptimOps to prove the pattern transfers.',
    'work.wip.role': 'In progress',
    'work.wip.year': 'Soon',
    'work.wip.title': 'Writing in progress',
    'work.wip.summary': "There's more work than there are finished pages. New write-ups land here as I get to them.",
    'work.archive.period': '2021 — 2024 · Bachelor coursework',
    'work.archive.label': 'Selected academic projects',
```

Merge into `fr`:

```js
    'work.lead': 'Cinq projets qui montrent ma façon de travailler. Chacun a sa propre page.',
    'work.optimops.role': 'Full-stack · aide à la décision',
    'work.optimops.year': '2023 — aujourd’hui',
    'work.optimops.title': 'OptimOps Neo',
    'work.optimops.summary': "Une plateforme d'aide à la décision pour un service d'incendie et de secours français : analyse de couverture, simulation de scénarios et optimisation des ressources, servies par une API adossée à des fichiers Parquet vers un tableau de bord que les utilisateurs configurent eux-mêmes.",
    'work.kpi-engine.role': 'Architecture de données',
    'work.kpi-engine.year': '2025 — aujourd’hui',
    'work.kpi-engine.title': 'Moteur d’indicateurs',
    'work.kpi-engine.summary': "Une reconstruction complète du moteur d'indicateurs d'OptimOps — un contrat d'entrée validé, un cœur en modèle en étoile, et un harnais de non-régression qui vérifie chaque valeur face au moteur qu'il remplace.",
    'work.emotion-recognition.role': 'Stage de recherche',
    'work.emotion-recognition.year': '2023',
    'work.emotion-recognition.title': 'Reconnaissance multimodale des émotions',
    'work.emotion-recognition.summary': "Reconnaissance des émotions sur vidéo, texte, audio et images à l'université de Portsmouth — ajustement fin de DeBERTa et d'un modèle OpenAI, avec un outil de transcription en direct pour l'analyse temps réel.",
    'work.predictops.role': 'Prévision · dataviz',
    'work.predictops.year': '2023 — 2024',
    'work.predictops.title': 'Predictops',
    'work.predictops.summary': "Prévision géolocalisée des interventions de secours, en combinant données opérationnelles historiques et signaux météo, restituée là où les opérateurs regardent vraiment.",
    'work.ars.role': 'Preuve de concept',
    'work.ars.year': '2024',
    'work.ars.title': 'Tableau de bord santé ARS',
    'work.ars.summary': "Un tableau de bord de veille sanitaire régionale — indicateurs d'urgences et d'hospitalisations sur une carte interactive, bâti sur le même registre de composants qu'OptimOps pour prouver que le motif se transpose.",
    'work.wip.role': 'En cours',
    'work.wip.year': 'Bientôt',
    'work.wip.title': 'Rédaction en cours',
    'work.wip.summary': "Il y a plus de travaux que de pages terminées. De nouveaux articles arrivent au fil de l'eau.",
    'work.archive.period': '2021 — 2024 · Projets académiques du BUT',
    'work.archive.label': 'Une sélection de projets universitaires',
```

- [ ] **Step 5: Replace the `#work` section body in `index.html`**

```html
  <section class="section" id="work" aria-labelledby="work-title">
    <div class="rail">
      <div class="section__head reveal">
        <p class="eyebrow" data-i18n="nav.work">Work</p>
        <h2 class="section__title" id="work-title" data-i18n="work.title">Selected work</h2>
        <p class="section__lead" data-i18n="work.lead">Five projects that show how I work.</p>
      </div>

      <div class="work-grid" id="work-grid"></div>

      <a class="archive-rule reveal" href="archive.html">
        <span class="eyebrow" data-i18n="work.archive.period">2021 — 2024 · Bachelor coursework</span>
        <span class="archive-rule__label" data-i18n="work.archive.label">Selected academic projects</span>
        <span class="archive-rule__arrow" aria-hidden="true"></span>
      </a>
    </div>
  </section>
```

- [ ] **Step 6: Render the grid from `js/main.js`**

Add the imports at the top:

```js
import { PROJECTS, renderProjectCard } from './data/projects.js';
import { renderIcon } from './icons.js';
```

Add this function, and call `renderWork(dict)` inside `boot()` immediately after `initI18n(...)`. The reveal class and the stagger index are applied after insertion rather than baked into the markup string, so `renderProjectCard` stays a pure, testable function:

```js
function renderWork(dict) {
  const grid = document.getElementById('work-grid');
  if (!grid) return;

  const arrowSlot = document.querySelector('.archive-rule__arrow');
  if (arrowSlot) arrowSlot.innerHTML = renderIcon('arrow');

  const paint = (lang) => {
    grid.innerHTML = PROJECTS.map((project) => renderProjectCard(project, dict, lang)).join('');
    grid.querySelectorAll('.card').forEach((card, i) => {
      card.classList.add('reveal');
      card.style.setProperty('--i', String(i % 3));
    });
    document.dispatchEvent(new CustomEvent('content:rendered'));
  };

  paint(document.documentElement.lang || 'en');
  document.addEventListener('lang:changed', (event) => paint(event.detail.lang));
}
```

The `content:rendered` event is what Task 10's reveal observer listens for, so freshly injected cards get observed.

- [ ] **Step 7: Append card and archive styles to `css/components.css`**

```css
/* ---- Section lead ---- */
.section__lead {
  color: var(--text-muted);
  margin-block-start: var(--space-3);
  max-width: 58ch;
}

/* ---- Work grid ---- */
.work-grid {
  display: grid;
  gap: clamp(1rem, .6rem + 1.4vw, 1.75rem);
  grid-template-columns: 1fr;
}

@media (min-width: 600px) { .work-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1024px) { .work-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }

/* ---- Card ---- */
.card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: inherit;
  text-decoration: none;
  box-shadow: var(--shadow-card);
  transition: transform var(--dur) var(--ease),
              border-color var(--dur) var(--ease),
              background-color var(--dur) var(--ease),
              box-shadow var(--dur) var(--ease);
}

@media (hover: hover) and (pointer: fine) {
  .card:not(.card--placeholder):hover {
    transform: translateY(-2px);
    border-color: var(--border-strong);
    background: var(--surface-raised);
    box-shadow: var(--shadow-card-hover);
  }
  .card:not(.card--placeholder):hover .cover__art { transform: scale(1.03); }
  .card:not(.card--placeholder):hover .card__arrow { transform: translateX(4px); opacity: 1; }
}

.card__cover {
  position: relative;
  aspect-ratio: 16 / 9;
  display: grid;
  place-items: center;
  background: color-mix(in oklab, var(--accent) 6%, var(--surface));
  border-block-end: 1px solid var(--border);
  color: var(--accent);
  overflow: hidden;
}
.cover__art {
  inline-size: 100%;
  block-size: 100%;
  transition: transform var(--dur-slow) var(--ease);
}

.card__cover--placeholder { color: var(--text-faint); }
.card__mascot {
  position: absolute;
  inline-size: 34%;
  max-inline-size: 110px;
  block-size: auto;
  opacity: .85;
}

.card__body {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  flex: 1;
  padding: var(--space-5);
}

.card__meta { display: flex; flex-wrap: wrap; gap: var(--space-1) var(--space-3); }
.card__meta span + span::before { content: "· "; }

.card__title { font-size: var(--fs-h3); }

.card__summary {
  color: var(--text-muted);
  font-size: var(--fs-small);
  flex: 1;
  max-width: none;
}

.card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1) var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--fs-mono);
  color: var(--text-faint);
}
.card__tags li { max-width: none; }

.card__arrow {
  display: inline-flex;
  color: var(--accent);
  opacity: .6;
  transition: transform var(--dur) var(--ease), opacity var(--dur) var(--ease);
}
.card__arrow svg { inline-size: 18px; block-size: 18px; }

.card--placeholder {
  border-style: dashed;
  box-shadow: none;
  cursor: default;
}
.card--placeholder .card__title { color: var(--text-muted); }

/* Cover motif pulse — the only looping animation in the project. */
.cover__pulse {
  animation: cover-pulse 4.5s var(--ease) infinite;
  animation-delay: var(--d, 0s);
}
@keyframes cover-pulse {
  0%, 100% { opacity: .25; }
  50% { opacity: .95; }
}
@media (prefers-reduced-motion: reduce) {
  .cover__pulse { animation: none; opacity: .6; }
}

/* ---- Archive rule ---- */
.archive-rule {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-2) var(--space-4);
  margin-block-start: clamp(2rem, 1rem + 3vw, 3.5rem);
  padding-block-start: var(--space-5);
  border-block-start: 1px solid var(--border);
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--dur-fast) var(--ease);
}
.archive-rule:hover { color: var(--text); }
.archive-rule__label {
  position: relative;
  font-size: var(--fs-small);
  margin-inline-end: auto;
}
.archive-rule__label::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  inset-block-end: -3px;
  block-size: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur) var(--ease);
}
.archive-rule:hover .archive-rule__label::after { transform: scaleX(1); }
.archive-rule__arrow {
  display: inline-flex;
  color: var(--accent);
  transition: transform var(--dur) var(--ease);
}
.archive-rule__arrow svg { inline-size: 18px; block-size: 18px; }
.archive-rule:hover .archive-rule__arrow { transform: translateX(4px); }
```

- [ ] **Step 8: Run the tests to verify they pass**

Run: `node --test tests/projects.test.mjs`
Expected: PASS, 9/9.

Run: `npm run verify`
Expected: all PASS; `home` reports full parity with the new work keys.

- [ ] **Step 9: Verify in the browser**

At 1440, 1024, 900, 768, 600, 599, 414 and 320px confirm:
1. The grid is 3 columns at ≥1024px, 2 at ≥600px, 1 below.
2. Cards hover-lift only with a fine pointer — nothing sticks on touch.
3. Each cover motif reads clearly and pulses subtly; the placeholder shows the takodachi over a dashed frame.
4. The placeholder is **not** a link and is not reachable by `Tab`.
5. The archive rule sits below the grid as a quiet line, with the underline and arrow animating on hover only.
6. `EN|FR` re-renders all six cards; card text is selectable with the mouse.
7. Emulate `prefers-reduced-motion: reduce`: the cover pulse stops.
8. `document.documentElement.scrollWidth <= window.innerWidth` is `true` at every width.

- [ ] **Step 10: Commit**

```bash
git add js/data/projects.js js/main.js js/i18n/home.js css/components.css \
        index.html tests/projects.test.mjs
git commit -m "feat: add project metadata, work grid and archive rule"
```

---

### Task 8: About section and the hobbies band

**Files:**
- Modify: `index.html` (`#about` and `#beyond` bodies)
- Modify: `css/components.css` (append about and hobby styles)
- Modify: `js/i18n/home.js` (add `about.*` and `beyond.*` keys)
- Modify: `js/icons.js` (add three hobby motifs)
- Modify: `tests/covers.test.mjs` (extend the icon-coverage assertion)

**Interfaces:**
- Consumes: `.rail`, `.section__head`, `.eyebrow`, `.reveal`, `.chip` from Task 4; `renderIcon` from Task 6.
- Produces: `ICONS.note`, `ICONS.controller`, `ICONS.kamae` added to `js/icons.js`; CSS classes `.about`, `.about__prose`, `.about__facts`, `.fact`, `.hobbies`, `.hobby`, `.hobby__motif`.

- [ ] **Step 1: Extend the icon test to cover the three hobby motifs**

In `tests/covers.test.mjs`, replace the `'the icon set covers every use in the build'` test body with:

```js
test('the icon set covers every use in the build', () => {
  for (const name of [
    'github', 'linkedin', 'mail', 'location', 'arrow', 'external',
    'note', 'controller', 'kamae',
  ]) {
    assert.ok(ICONS[name], `missing icon: ${name}`);
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/covers.test.mjs`
Expected: FAIL — `missing icon: note`.

- [ ] **Step 3: Add the three hobby motifs to `js/icons.js`**

Insert into the `ICONS` object, after `external`:

```js
  // Hobby motifs — larger, more illustrative than the UI icons above.
  note: stroked('<path d="M9 18.2V5.4l10-2v12.4"/><ellipse cx="6.6" cy="18.4" rx="2.6" ry="2.2"/><ellipse cx="16.6" cy="16.2" rx="2.6" ry="2.2"/>'),
  controller: stroked('<rect x="2.4" y="7.4" width="19.2" height="10.4" rx="4.2"/><path d="M7 11v3.2M5.4 12.6h3.2"/><circle cx="16" cy="12" r=".9"/><circle cx="18.4" cy="14.2" r=".9"/>'),
  kamae: stroked('<circle cx="12" cy="4.8" r="2.2"/><path d="M12 7.4v6.2M12 13.6 8 20M12 13.6 16 20M5.6 10.4 12 9.2l6.4 1.2"/>'),
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/covers.test.mjs`
Expected: PASS, 8/8.

- [ ] **Step 5: Add the about and beyond keys to `js/i18n/home.js`**

Merge into `en`:

```js
    'about.eyebrow': 'About',
    'about.p1': "I work on systems that help people make operational decisions under pressure. Most of that work is not modelling — it's getting institutional data into a shape where a model, or a human, can be trusted with it. Broken nomenclatures, undocumented provenance, numbers nobody has ever checked: that's where the real problems live, and that's the part I like.",
    'about.p2': "I'm finishing an engineering degree at UTBM as an apprentice, which means I've spent the last few years shipping into production rather than writing coursework. I care about systems that can be verified — a pipeline that fails loudly beats one that quietly returns a plausible wrong number.",
    'about.p3': "I'm most interested in roles where data engineering, machine learning and decision-making meet. If that sounds like your team, get in touch.",
    'about.fact.role.label': 'Currently',
    'about.fact.role.value': 'Data science apprentice, AIMOS team — FEMTO-ST',
    'about.fact.school.label': 'Studying',
    'about.fact.school.value': 'Engineering degree in computer science, UTBM',
    'about.fact.where.label': 'Based in',
    'about.fact.where.value': 'Franche-Comté, France · open to relocation',
    'about.fact.focus.label': 'Focused on',
    'about.fact.focus.value': 'Data pipelines, applied ML, decision-support systems',

    'beyond.lead': "Three things I keep coming back to when I close the laptop.",
    'beyond.music.title': 'Composing',
    'beyond.music.text': "I write and arrange music, mostly for classical guitar and small ensembles. It's the one thing I do that has no deadline and no stakeholder — which is exactly the point.",
    'beyond.games.title': 'Game development',
    'beyond.games.text': "I build small games in my own time. It's where I get to do the parts of engineering that production work leaves no room for: physics, procedural generation, and finding out how something feels rather than whether it scales.",
    'beyond.martial.title': 'Martial arts',
    'beyond.martial.text': "Training has taught me more about deliberate practice than any course did — how to break something down, drill the part you're worst at, and be patient with slow progress.",
```

Merge into `fr`:

```js
    'about.eyebrow': 'À propos',
    'about.p1': "Je travaille sur des systèmes qui aident à décider en situation opérationnelle. L'essentiel de ce travail n'est pas la modélisation : c'est amener des données institutionnelles à un état où un modèle — ou un humain — peut leur faire confiance. Nomenclatures divergentes, provenance non documentée, valeurs que personne n'a jamais vérifiées : c'est là que sont les vrais problèmes, et c'est la partie qui me plaît.",
    'about.p2': "Je termine un diplôme d'ingénieur à l'UTBM en apprentissage, ce qui signifie que j'ai passé ces dernières années à livrer en production plutôt qu'à rendre des devoirs. Je tiens aux systèmes vérifiables : une chaîne de traitement qui échoue bruyamment vaut mieux qu'une chaîne qui renvoie discrètement un résultat plausible mais faux.",
    'about.p3': "Je cherche avant tout des postes à la rencontre de l'ingénierie des données, de l'apprentissage automatique et de la décision. Si cela ressemble à votre équipe, écrivez-moi.",
    'about.fact.role.label': 'Actuellement',
    'about.fact.role.value': 'Apprenti data scientist, équipe AIMOS — FEMTO-ST',
    'about.fact.school.label': 'Formation',
    'about.fact.school.value': "Diplôme d'ingénieur en informatique, UTBM",
    'about.fact.where.label': 'Basé en',
    'about.fact.where.value': 'Franche-Comté, France · mobile',
    'about.fact.focus.label': 'Centres d’intérêt',
    'about.fact.focus.value': "Chaînes de traitement des données, IA appliquée, systèmes d'aide à la décision",

    'beyond.lead': "Trois choses vers lesquelles je reviens toujours, une fois l'ordinateur fermé.",
    'beyond.music.title': 'Composition',
    'beyond.music.text': "J'écris et j'arrange de la musique, surtout pour guitare classique et petits ensembles. C'est la seule chose que je fais sans échéance et sans commanditaire — et c'est précisément l'intérêt.",
    'beyond.games.title': 'Développement de jeux',
    'beyond.games.text': "Je développe de petits jeux sur mon temps libre. C'est là que je fais les parties de l'ingénierie que le travail en production ne permet pas : physique, génération procédurale, et chercher ce qu'une mécanique procure plutôt que si elle passe à l'échelle.",
    'beyond.martial.title': 'Arts martiaux',
    'beyond.martial.text': "L'entraînement m'a plus appris sur la pratique délibérée que n'importe quel cours : décomposer un geste, répéter ce qu'on fait le moins bien, et accepter la lenteur des progrès.",
```

- [ ] **Step 6: Replace the `#about` section body in `index.html`**

```html
  <section class="section" id="about" aria-labelledby="about-title">
    <div class="rail">
      <div class="section__head reveal">
        <p class="eyebrow" data-i18n="about.eyebrow">About</p>
        <h2 class="section__title" id="about-title" data-i18n="about.title">About</h2>
      </div>

      <div class="about">
        <div class="about__prose reveal" style="--i:1">
          <p data-i18n="about.p1">I work on systems that help people make operational decisions under pressure.</p>
          <p data-i18n="about.p2">I'm finishing an engineering degree at UTBM as an apprentice.</p>
          <p data-i18n="about.p3">I'm most interested in roles where data engineering, machine learning and decision-making meet.</p>
        </div>

        <dl class="about__facts reveal" style="--i:2">
          <div class="fact">
            <dt class="eyebrow" data-i18n="about.fact.role.label">Currently</dt>
            <dd data-i18n="about.fact.role.value">Data science apprentice, AIMOS team — FEMTO-ST</dd>
          </div>
          <div class="fact">
            <dt class="eyebrow" data-i18n="about.fact.school.label">Studying</dt>
            <dd data-i18n="about.fact.school.value">Engineering degree in computer science, UTBM</dd>
          </div>
          <div class="fact">
            <dt class="eyebrow" data-i18n="about.fact.where.label">Based in</dt>
            <dd data-i18n="about.fact.where.value">Franche-Comté, France · open to relocation</dd>
          </div>
          <div class="fact">
            <dt class="eyebrow" data-i18n="about.fact.focus.label">Focused on</dt>
            <dd data-i18n="about.fact.focus.value">Data pipelines, applied ML, decision-support systems</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
```

- [ ] **Step 7: Replace the `#beyond` section body in `index.html`**

```html
  <section class="section" id="beyond" aria-labelledby="beyond-title">
    <div class="rail">
      <div class="section__head reveal">
        <p class="eyebrow" data-i18n="nav.beyond">Beyond the work</p>
        <h2 class="section__title" id="beyond-title" data-i18n="beyond.title">Beyond the work</h2>
        <p class="section__lead" data-i18n="beyond.lead">Three things I keep coming back to.</p>
      </div>

      <ul class="hobbies">
        <li class="hobby reveal" style="--i:0">
          <span class="hobby__motif" data-icon="note" aria-hidden="true"></span>
          <h3 class="hobby__title" data-i18n="beyond.music.title">Composing</h3>
          <p class="hobby__text" data-i18n="beyond.music.text">I write and arrange music.</p>
          <!-- Link slot: when a SoundCloud/Bandcamp page exists, add
               <a class="hobby__link" href="…">…</a> here. -->
        </li>
        <li class="hobby reveal" style="--i:1">
          <span class="hobby__motif" data-icon="controller" aria-hidden="true"></span>
          <h3 class="hobby__title" data-i18n="beyond.games.title">Game development</h3>
          <p class="hobby__text" data-i18n="beyond.games.text">I build small games in my own time.</p>
          <!-- Link slot: itch.io page goes here. -->
        </li>
        <li class="hobby reveal" style="--i:2">
          <span class="hobby__motif" data-icon="kamae" aria-hidden="true"></span>
          <h3 class="hobby__title" data-i18n="beyond.martial.title">Martial arts</h3>
          <p class="hobby__text" data-i18n="beyond.martial.text">Training has taught me about deliberate practice.</p>
        </li>
      </ul>
    </div>
  </section>
```

- [ ] **Step 8: Paint the `data-icon` slots from `js/main.js`**

Add this function and call it from `boot()` after `renderWork(dict)`:

```js
function paintIcons() {
  document.querySelectorAll('[data-icon]').forEach((slot) => {
    slot.innerHTML = renderIcon(slot.dataset.icon);
  });
}
```

- [ ] **Step 9: Append about and hobby styles to `css/components.css`**

```css
/* ---- About ---- */
.about {
  display: grid;
  gap: clamp(2rem, 1rem + 3vw, 3.5rem);
  align-items: start;
}
.about__prose { display: flex; flex-direction: column; gap: var(--space-4); }
.about__prose p { color: var(--text-muted); }
.about__prose p:first-child { color: var(--text); }

.about__facts {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-5);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}
.fact dd {
  margin: var(--space-1) 0 0;
  font-size: var(--fs-small);
  font-weight: 500;
}

@media (min-width: 760px) {
  .about { grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); }
}

/* ---- Hobbies ---- */
.hobbies {
  display: grid;
  gap: clamp(1rem, .6rem + 1.4vw, 1.75rem);
  grid-template-columns: 1fr;
}
@media (min-width: 820px) {
  .hobbies { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

.hobby {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  max-width: none;
  padding: var(--space-5);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: border-color var(--dur) var(--ease), background-color var(--dur) var(--ease);
}
@media (hover: hover) and (pointer: fine) {
  .hobby:hover { border-color: var(--border-strong); background: var(--surface-raised); }
  .hobby:hover .hobby__motif { transform: translateY(-2px); }
}

.hobby__motif {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 42px;
  block-size: 42px;
  border-radius: var(--radius-full);
  background: color-mix(in oklab, var(--accent) 12%, transparent);
  color: var(--accent);
  transition: transform var(--dur) var(--ease);
}
.hobby__motif svg { inline-size: 22px; block-size: 22px; }

.hobby__title { font-size: var(--fs-h3); }
.hobby__text { color: var(--text-muted); font-size: var(--fs-small); max-width: none; }

.hobby__link {
  margin-block-start: auto;
  font-family: var(--font-mono);
  font-size: var(--fs-mono);
  letter-spacing: var(--tracking-mono);
}
```

- [ ] **Step 10: Verify in the browser**

At 1440, 1024, 820, 819, 760, 759, 600, 414 and 320px confirm:
1. About is two columns at ≥760px, stacked below; the facts card never squeezes the prose below a readable measure.
2. Hobbies are three columns at ≥820px, one column below.
3. All three hobby motifs render; none is a raw empty circle.
4. `EN|FR` swaps every paragraph, every fact label and value, and all three hobby blocks.
5. `document.documentElement.scrollWidth <= window.innerWidth` is `true` at every width.
6. Both themes: the facts card and hobby panels separate visibly from the page background.

- [ ] **Step 11: Run the check suite**

Run: `npm run verify`
Expected: all PASS.

- [ ] **Step 12: Commit**

```bash
git add index.html css/components.css js/i18n/home.js js/icons.js js/main.js tests/covers.test.mjs
git commit -m "feat: add about section and hobbies band"
```

---

### Task 9: Résumé timeline and contact section

**Files:**
- Modify: `index.html` (`#resume` and `#contact` bodies)
- Modify: `css/components.css` (append timeline, skills and contact styles)
- Modify: `js/i18n/home.js` (add `resume.*` and `contact.*` keys)

**Interfaces:**
- Consumes: `.rail`, `.section__head`, `.eyebrow`, `.chip`, `.chip-row`, `.reveal`, `.icon-btn` from Task 4; `renderIcon` and the `data-icon` painter from Tasks 6 and 8.
- Produces: CSS classes `.timeline`, `.timeline__item`, `.timeline__dot`, `.timeline__role`, `.timeline__meta`, `.timeline__text`, `.skills`, `.skill-group`, `.contact`, `.contact__list`, `.contact__item`, `.socials`.

- [ ] **Step 1: Add the résumé and contact keys to `js/i18n/home.js`**

Merge into `en`:

```js
    'resume.experience': 'Experience',
    'resume.education': 'Education',
    'resume.skills': 'Skills',
    'resume.cta': 'Download CV',

    'resume.exp1.role': 'Data Scientist — FEMTO-ST, AIMOS team',
    'resume.exp1.meta': '2023 — present · Belfort, France',
    'resume.exp1.text': 'Building a decision-support platform for a French fire & rescue service, and rebuilding the indicator engine underneath it. Full-stack: data contract, computation engine, API and dashboard.',
    'resume.exp2.role': 'Research Assistant Intern — University of Portsmouth',
    'resume.exp2.meta': '2023 · Portsmouth, United Kingdom',
    'resume.exp2.text': 'Multimodal emotion recognition: fine-tuning transformer models across text, audio, video and images, with experiment tracking and a real-time transcription tool.',

    'resume.edu1.role': 'Engineering Degree in Computer Science — UTBM',
    'resume.edu1.meta': '2024 — present · Belfort, France · apprenticeship',
    'resume.edu2.role': 'Bachelor of Computer Science (BUT) — IUT Nord Franche-Comté',
    'resume.edu2.meta': '2021 — 2024 · Belfort, France',
    'resume.edu3.role': 'Preparatory classes for the Grandes Écoles (CPGE) — Lycée Victor Hugo',
    'resume.edu3.meta': '2019 — 2021 · Besançon, France',
    'resume.edu4.role': 'Scientific Baccalaureate — Lycée Georges Colomb',
    'resume.edu4.meta': '2016 — 2019 · Lure, France',

    'resume.skills.data': 'Data & ML',
    'resume.skills.backend': 'Backend',
    'resume.skills.frontend': 'Frontend',
    'resume.skills.ops': 'Data engineering & Ops',
```

Merge into `fr`:

```js
    'resume.experience': 'Expérience',
    'resume.education': 'Formation',
    'resume.skills': 'Compétences',
    'resume.cta': 'Télécharger le CV',

    'resume.exp1.role': 'Data Scientist — FEMTO-ST, équipe AIMOS',
    'resume.exp1.meta': "2023 — aujourd’hui · Belfort, France",
    'resume.exp1.text': "Développement d'une plateforme d'aide à la décision pour un service d'incendie et de secours français, et reconstruction du moteur d'indicateurs sous-jacent. Full-stack : contrat de données, moteur de calcul, API et tableau de bord.",
    'resume.exp2.role': 'Stagiaire assistant de recherche — université de Portsmouth',
    'resume.exp2.meta': '2023 · Portsmouth, Royaume-Uni',
    'resume.exp2.text': "Reconnaissance multimodale des émotions : ajustement fin de modèles transformeurs sur texte, audio, vidéo et images, avec suivi d'expériences et un outil de transcription temps réel.",

    'resume.edu1.role': "Diplôme d'ingénieur en informatique — UTBM",
    'resume.edu1.meta': "2024 — aujourd’hui · Belfort, France · apprentissage",
    'resume.edu2.role': 'BUT Informatique — IUT Nord Franche-Comté',
    'resume.edu2.meta': '2021 — 2024 · Belfort, France',
    'resume.edu3.role': 'CPGE — Lycée Victor Hugo',
    'resume.edu3.meta': '2019 — 2021 · Besançon, France',
    'resume.edu4.role': 'Baccalauréat scientifique — Lycée Georges Colomb',
    'resume.edu4.meta': '2016 — 2019 · Lure, France',

    'resume.skills.data': 'Données & IA',
    'resume.skills.backend': 'Backend',
    'resume.skills.frontend': 'Frontend',
    'resume.skills.ops': 'Ingénierie des données & Ops',
```

Also merge into `en`:

```js
    'contact.lead': "The fastest way to reach me is email. I read everything, and I answer.",
    'contact.email.label': 'Email',
    'contact.location.label': 'Location',
    'contact.location.value': 'Franche-Comté, France · open to relocation',
    'contact.social.label': 'Elsewhere',
```

and into `fr`:

```js
    'contact.lead': "Le plus rapide reste l'e-mail. Je lis tout, et je réponds.",
    'contact.email.label': 'E-mail',
    'contact.location.label': 'Localisation',
    'contact.location.value': 'Franche-Comté, France · mobile',
    'contact.social.label': 'Ailleurs',
```

- [ ] **Step 2: Replace the `#resume` section body in `index.html`**

Note there is deliberately **no phone number and no street address** anywhere in this markup.

```html
  <section class="section" id="resume" aria-labelledby="resume-title">
    <div class="rail">
      <div class="section__head reveal">
        <p class="eyebrow" data-i18n="nav.resume">Résumé</p>
        <h2 class="section__title" id="resume-title" data-i18n="resume.title">Résumé</h2>
      </div>

      <h3 class="eyebrow reveal" data-i18n="resume.experience">Experience</h3>
      <ol class="timeline reveal" style="--i:1">
        <li class="timeline__item">
          <span class="timeline__dot" aria-hidden="true"></span>
          <p class="timeline__role" data-i18n="resume.exp1.role">Data Scientist — FEMTO-ST, AIMOS team</p>
          <p class="timeline__meta" data-i18n="resume.exp1.meta">2023 — present · Belfort, France</p>
          <p class="timeline__text" data-i18n="resume.exp1.text">Building a decision-support platform.</p>
        </li>
        <li class="timeline__item">
          <span class="timeline__dot" aria-hidden="true"></span>
          <p class="timeline__role" data-i18n="resume.exp2.role">Research Assistant Intern — University of Portsmouth</p>
          <p class="timeline__meta" data-i18n="resume.exp2.meta">2023 · Portsmouth, United Kingdom</p>
          <p class="timeline__text" data-i18n="resume.exp2.text">Multimodal emotion recognition.</p>
        </li>
      </ol>

      <h3 class="eyebrow reveal" data-i18n="resume.education">Education</h3>
      <ol class="timeline reveal" style="--i:1">
        <li class="timeline__item">
          <span class="timeline__dot" aria-hidden="true"></span>
          <p class="timeline__role" data-i18n="resume.edu1.role">Engineering Degree in Computer Science — UTBM</p>
          <p class="timeline__meta" data-i18n="resume.edu1.meta">2024 — present · Belfort, France · apprenticeship</p>
        </li>
        <li class="timeline__item">
          <span class="timeline__dot" aria-hidden="true"></span>
          <p class="timeline__role" data-i18n="resume.edu2.role">Bachelor of Computer Science (BUT) — IUT Nord Franche-Comté</p>
          <p class="timeline__meta" data-i18n="resume.edu2.meta">2021 — 2024 · Belfort, France</p>
        </li>
        <li class="timeline__item">
          <span class="timeline__dot" aria-hidden="true"></span>
          <p class="timeline__role" data-i18n="resume.edu3.role">Preparatory classes for the Grandes Écoles (CPGE) — Lycée Victor Hugo</p>
          <p class="timeline__meta" data-i18n="resume.edu3.meta">2019 — 2021 · Besançon, France</p>
        </li>
        <li class="timeline__item">
          <span class="timeline__dot" aria-hidden="true"></span>
          <p class="timeline__role" data-i18n="resume.edu4.role">Scientific Baccalaureate — Lycée Georges Colomb</p>
          <p class="timeline__meta" data-i18n="resume.edu4.meta">2016 — 2019 · Lure, France</p>
        </li>
      </ol>

      <h3 class="eyebrow reveal" data-i18n="resume.skills">Skills</h3>
      <div class="skills reveal" style="--i:1">
        <div class="skill-group">
          <p class="eyebrow" data-i18n="resume.skills.data">Data &amp; ML</p>
          <ul class="chip-row">
            <li class="chip">Python</li><li class="chip">Pandas</li><li class="chip">NumPy</li>
            <li class="chip">scikit-learn</li><li class="chip">PyTorch</li>
            <li class="chip">Transformers</li><li class="chip">Jupyter</li><li class="chip">W&amp;B</li>
          </ul>
        </div>
        <div class="skill-group">
          <p class="eyebrow" data-i18n="resume.skills.backend">Backend</p>
          <ul class="chip-row">
            <li class="chip">FastAPI</li><li class="chip">Flask</li><li class="chip">REST</li>
            <li class="chip">SQL</li><li class="chip">MongoDB</li><li class="chip">Node.js</li>
          </ul>
        </div>
        <div class="skill-group">
          <p class="eyebrow" data-i18n="resume.skills.frontend">Frontend</p>
          <ul class="chip-row">
            <li class="chip">Vue 3</li><li class="chip">Quasar</li><li class="chip">JavaScript</li>
            <li class="chip">ECharts</li><li class="chip">Leaflet</li><li class="chip">HTML &amp; CSS</li>
          </ul>
        </div>
        <div class="skill-group">
          <p class="eyebrow" data-i18n="resume.skills.ops">Data engineering &amp; Ops</p>
          <ul class="chip-row">
            <li class="chip">Parquet</li><li class="chip">Star schema</li><li class="chip">pytest</li>
            <li class="chip">Git</li><li class="chip">Docker</li><li class="chip">Linux</li>
          </ul>
        </div>
      </div>

      <p class="reveal" style="--i:2">
        <a class="btn btn--ghost" href="CV-FR.pdf" download data-i18n="resume.cta">Download CV</a>
      </p>
    </div>
  </section>
```

- [ ] **Step 3: Replace the `#contact` section body in `index.html`**

```html
  <section class="section" id="contact" aria-labelledby="contact-title">
    <div class="rail">
      <div class="section__head reveal">
        <p class="eyebrow" data-i18n="nav.contact">Contact</p>
        <h2 class="section__title" id="contact-title" data-i18n="contact.title">Contact</h2>
        <p class="section__lead" data-i18n="contact.lead">The fastest way to reach me is email.</p>
      </div>

      <div class="contact reveal" style="--i:1">
        <ul class="contact__list">
          <li class="contact__item">
            <span class="contact__icon" data-icon="mail" aria-hidden="true"></span>
            <div>
              <p class="eyebrow" data-i18n="contact.email.label">Email</p>
              <a href="mailto:ml.thomaschu@gmail.com">ml.thomaschu@gmail.com</a>
              <a href="mailto:thomas.chu@edu.univ-fcomte.fr">thomas.chu@edu.univ-fcomte.fr</a>
            </div>
          </li>
          <li class="contact__item">
            <span class="contact__icon" data-icon="location" aria-hidden="true"></span>
            <div>
              <p class="eyebrow" data-i18n="contact.location.label">Location</p>
              <p data-i18n="contact.location.value">Franche-Comté, France · open to relocation</p>
            </div>
          </li>
        </ul>

        <div>
          <p class="eyebrow" data-i18n="contact.social.label">Elsewhere</p>
          <div class="socials">
            <a class="icon-btn" href="https://github.com/GitGudShu"
               data-icon="github" data-i18n-attr="aria-label:social.github"
               aria-label="GitHub profile" rel="me noopener"></a>
            <a class="icon-btn" href="https://www.linkedin.com/in/thomas-chu-259702235/"
               data-icon="linkedin" data-i18n-attr="aria-label:social.linkedin"
               aria-label="LinkedIn profile" rel="me noopener"></a>
          </div>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 4: Append timeline, skills and contact styles to `css/components.css`**

```css
/* ---- Timeline ---- */
.timeline {
  position: relative;
  margin-block: var(--space-4) var(--space-7);
  padding-inline-start: var(--space-6);
}
.timeline::before {
  content: "";
  position: absolute;
  inset-block: 6px 6px;
  inset-inline-start: 5px;
  inline-size: 1px;
  background: linear-gradient(
    to bottom,
    var(--accent),
    color-mix(in oklab, var(--border) 100%, transparent)
  );
}

.timeline__item { position: relative; padding-block-end: var(--space-5); max-width: none; }
.timeline__item:last-child { padding-block-end: 0; }

.timeline__dot {
  position: absolute;
  inset-inline-start: calc(var(--space-6) * -1);
  inset-block-start: 7px;
  inline-size: 11px;
  block-size: 11px;
  border-radius: var(--radius-full);
  background: var(--bg);
  border: 2px solid var(--accent);
}

.timeline__role { font-weight: 600; }
.timeline__meta {
  margin-block-start: var(--space-1);
  font-family: var(--font-mono);
  font-size: var(--fs-mono);
  letter-spacing: var(--tracking-mono);
  color: var(--text-faint);
}
.timeline__text { margin-block-start: var(--space-2); color: var(--text-muted); font-size: var(--fs-small); }

/* ---- Skills ---- */
.skills {
  display: grid;
  gap: var(--space-5);
  margin-block: var(--space-4) var(--space-6);
  grid-template-columns: 1fr;
}
@media (min-width: 700px) { .skills { grid-template-columns: repeat(2, minmax(0, 1fr)); } }

.skill-group .chip-row { margin-block-start: var(--space-3); }
.skill-group .chip { cursor: default; }

/* ---- Contact ---- */
.contact {
  display: grid;
  gap: clamp(1.5rem, 1rem + 2vw, 3rem);
  padding: var(--space-6);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}
@media (min-width: 700px) { .contact { grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); } }

.contact__list { display: flex; flex-direction: column; gap: var(--space-5); }
.contact__item { display: flex; gap: var(--space-4); align-items: flex-start; max-width: none; }
.contact__icon {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  inline-size: 38px;
  block-size: 38px;
  border-radius: var(--radius-full);
  background: color-mix(in oklab, var(--accent) 12%, transparent);
  color: var(--accent);
}
.contact__icon svg { inline-size: 19px; block-size: 19px; }
.contact__item a { display: block; font-size: var(--fs-small); }
.contact__item p:not(.eyebrow) { font-size: var(--fs-small); color: var(--text-muted); }
.contact__item > div > .eyebrow { margin-block-end: var(--space-2); }

.socials { display: flex; gap: var(--space-2); margin-block-start: var(--space-3); }
.socials .icon-btn { border: 1px solid var(--border); }
.socials .icon-btn:hover { border-color: var(--accent); }
```

- [ ] **Step 5: Verify no forbidden personal data survives anywhere**

Run:

```bash
grep -rniE '0628561781|06 28 56|impasse|marie richard|70200|google\.[a-z.]*/maps' \
  index.html css/ js/ archive.html projects/ 2>/dev/null
```

Expected: **no output.** Any hit is a privacy failure and must be removed before committing. (`projects/` and `archive.html` do not exist yet; the `2>/dev/null` suppresses that.)

- [ ] **Step 6: Verify in the browser**

At 1440, 1024, 768, 700, 699, 414 and 320px confirm:
1. The timeline rail runs behind all dots with no gap at the top or bottom; dots align with each role line.
2. Skills are two columns at ≥700px, one below; chips wrap without overflowing.
3. Contact is two columns at ≥700px, stacked below; both mail icons render.
4. Both social links have a visible focus ring and an `aria-label` that changes with the language.
5. `EN|FR` swaps every résumé role, meta line, skill-group heading and contact label.
6. `document.documentElement.scrollWidth <= window.innerWidth` is `true` at every width.
7. `CV-FR.pdf` downloads from both the hero and the résumé button.

- [ ] **Step 7: Run the check suite**

Run: `npm run verify`
Expected: all PASS.

- [ ] **Step 8: Commit**

```bash
git add index.html css/components.css js/i18n/home.js
git commit -m "feat: add resume timeline and contact section"
```

---

### Task 10: Scroll reveal and the background particle field

**Files:**
- Create: `js/reveal.js`, `js/particles.js`
- Modify: `js/main.js` (wire both)
- Test: `tests/particles.test.mjs`

**Interfaces:**
- Consumes: the `.reveal` / `.is-visible` CSS contract from Task 4; the `content:rendered` event dispatched by `renderWork` in Task 7; the `#particles` canvas in `index.html` (Task 4).
- Produces:
  - `js/reveal.js` exports `initReveal({ selector?, root? }): { observe(el): void, destroy(): void }`.
  - `js/particles.js` exports the pure helpers `particleCount(width: number, base?: number): number`, `wrapPosition(value: number, max: number): number`, `repulsion(px, py, mx, my, radius): { dx: number, dy: number, strength: number }`, and `initParticles({ canvas }): { destroy(): void }`.

- [ ] **Step 1: Write the failing particles test**

`tests/particles.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/particles.test.mjs`
Expected: FAIL — `Cannot find module '../js/particles.js'`.

- [ ] **Step 3: Implement `js/particles.js`**

```js
/**
 * A discreet background particle field: slow-drifting motes that the pointer
 * pushes gently aside. Fixed, out of flow, and behind everything — it can never
 * cause layout shift.
 *
 * Disabled entirely for coarse pointers and for prefers-reduced-motion.
 */

const MARGIN = 10;
const POINTER_RADIUS = 120;
const MAX_DPR = 2;

/** Half the field on small screens; the base count otherwise. */
export function particleCount(width, base = 60) {
  return width < 768 ? Math.round(base / 2) : base;
}

/** Wrap around the viewport with a small margin, so motes never pop at an edge. */
export function wrapPosition(value, max) {
  if (value > max + MARGIN) return -MARGIN;
  if (value < -MARGIN) return max + MARGIN;
  return value;
}

/**
 * Radial repulsion from the pointer. Returns a unit-ish direction scaled by a
 * strength that decays linearly to zero at `radius`.
 */
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

  // No hover on touch, and no motion for people who asked for none.
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
    // The canvas cannot use a CSS variable directly, so resolve it per theme.
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
      // Ease toward the pushed offset, then ease back when the pointer leaves.
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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/particles.test.mjs`
Expected: PASS, 7/7.

- [ ] **Step 5: Implement `js/reveal.js`**

```js
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
```

- [ ] **Step 6: Wire both into `js/main.js`**

Add the imports:

```js
import { initReveal } from './reveal.js';
import { initParticles } from './particles.js';
```

Add these two lines at the end of `boot()`, after `paintIcons()`:

```js
  initReveal();
  initParticles({ canvas: document.getElementById('particles') });
```

- [ ] **Step 7: Verify the motion in the browser**

Confirm:
1. Sections fade and rise once as you scroll; scrolling back up does **not** replay them.
2. Cards injected by `renderWork` reveal correctly, including after an `EN|FR` swap.
3. Particles drift slowly and are barely noticeable — if they draw the eye, lower `alpha` in `seed()`.
4. Moving the pointer pushes nearby motes aside and brightens them slightly; they ease back when it leaves.
5. Toggling the theme re-reads the accent — motes change hue rather than staying the old colour.
6. Switching to another browser tab and back does not produce a visible jump (the loop stopped while hidden).
7. Resizing the window re-seeds the field without stretching or blurring it.

- [ ] **Step 8: Verify the reduced-motion and touch paths**

In DevTools, emulate `prefers-reduced-motion: reduce` and reload. Confirm:
- `document.getElementById('particles')` returns `null` — the canvas was removed, not merely paused.
- All `.reveal` elements are visible immediately.

In device emulation (a touch profile, coarse pointer), reload and confirm `document.getElementById('particles')` is `null`.

- [ ] **Step 9: Verify there is no layout shift**

With the Performance panel recording a full scroll of the homepage, confirm Cumulative Layout Shift is `0`. The canvas is `position: fixed` and reveals animate only `opacity`/`transform`, so any non-zero CLS means something else is wrong — fix it before committing.

- [ ] **Step 10: Run the check suite**

Run: `npm run verify`
Expected: all PASS.

- [ ] **Step 11: Commit**

```bash
git add js/reveal.js js/particles.js js/main.js tests/particles.test.mjs
git commit -m "feat: add scroll reveal and pointer-reactive particle field"
```

---

### Task 11: Project page template — OptimOps Neo and KPI Engine

**Files:**
- Create: `js/i18n/projects.js`
- Create: `projects/optimops.html`, `projects/kpi-engine.html`
- Modify: `css/pages.css` (append project-detail styles)
- Test: `tests/project-pages.test.mjs`

**Interfaces:**
- Consumes: `PROJECTS` from `js/data/projects.js` (Task 7); `renderCover` (Task 6); the `pageDict()` switch in `js/main.js` (Task 4), which reads `document.body.dataset.project`.
- Produces:
  - `js/i18n/projects.js` exports `projects: Record<slug, { en: object, fr: object }>` keyed by the same slugs as `PROJECTS` (`optimops`, `kpi-engine`, `emotion-recognition`, `predictops`, `ars`). Task 12 fills the remaining three.
  - Per-page key contract, identical for every project page:
    `meta.title`, `meta.description`, `p.eyebrow`, `p.title`, `p.lead`,
    `p.facts.role.label/.value`, `p.facts.stack.label/.value`,
    `p.facts.scope.label/.value`, `p.facts.status.label/.value`,
    `p.context.title/.body`, `p.built.title/.body`,
    `p.decisions.title/.body`, `p.outcome.title/.body`,
    `p.nav.prev`, `p.nav.next`.
  - CSS classes `.project`, `.project__head`, `.project__title`, `.project__lead`, `.project__cover`, `.project__facts`, `.project__body`, `.project__nav`.

**Note on the repeated shell:** with no build step, each project page repeats the `<head>`, header and footer markup. That is the accepted cost of the no-build decision. Copy the shell from `index.html` verbatim and change only: the `<title>`/`<meta>` defaults, the `canonical`, the asset paths (`../` prefix), `<body data-page="project" data-project="<slug>">`, and the nav (a single back link instead of the anchor list).

- [ ] **Step 1: Write the failing project-pages test**

`tests/project-pages.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { projects } from '../js/i18n/projects.js';
import { PROJECTS } from '../js/data/projects.js';
import { parityReport, LANGS, translate } from '../js/i18n/index.js';

/** Slugs whose pages exist at this point. Task 12 extends this list. */
const BUILT = ['optimops', 'kpi-engine'];

const REQUIRED_KEYS = [
  'meta.title', 'meta.description',
  'p.eyebrow', 'p.title', 'p.lead',
  'p.facts.role.label', 'p.facts.role.value',
  'p.facts.stack.label', 'p.facts.stack.value',
  'p.facts.scope.label', 'p.facts.scope.value',
  'p.facts.status.label', 'p.facts.status.value',
  'p.context.title', 'p.context.body',
  'p.built.title', 'p.built.body',
  'p.decisions.title', 'p.decisions.body',
  'p.outcome.title', 'p.outcome.body',
  'p.nav.prev', 'p.nav.next',
];

test('every built page has a dictionary keyed by its slug', () => {
  for (const slug of BUILT) {
    assert.ok(projects[slug], `no dictionary for ${slug}`);
  }
});

test('dictionary slugs are a subset of the project slugs on the homepage', () => {
  const known = PROJECTS.filter((p) => !p.placeholder).map((p) => p.id);
  for (const slug of Object.keys(projects)) {
    assert.ok(known.includes(slug), `${slug} has a dictionary but no card`);
  }
});

test('every built dictionary defines the full key contract in both languages', () => {
  for (const slug of BUILT) {
    for (const key of REQUIRED_KEYS) {
      for (const lang of LANGS) {
        assert.notEqual(
          translate(projects[slug], lang, key), key,
          `${slug}: missing ${lang} string for ${key}`,
        );
      }
    }
  }
});

test('every built dictionary is at full FR/EN parity', () => {
  for (const slug of BUILT) {
    const report = parityReport(projects[slug]);
    assert.deepEqual(report.missingInEn, [], `${slug}: keys missing from en`);
    assert.deepEqual(report.missingInFr, [], `${slug}: keys missing from fr`);
  }
});

test('confidential terms never appear in any project copy', () => {
  // Client identity and real figures must not leak. Bare "SDIS" is forbidden;
  // the generic "fire & rescue service" framing is what pages use instead.
  const forbidden = [/\bSDIS\b/i, /\bDoubs\b/i, /\bSDIS\s*25\b/i, /\bCIS\s+[A-ZÉÈ][a-zéèê]+/];
  for (const [slug, dict] of Object.entries(projects)) {
    for (const lang of LANGS) {
      for (const [key, value] of Object.entries(dict[lang])) {
        for (const pattern of forbidden) {
          assert.doesNotMatch(value, pattern, `${slug}.${lang}.${key} leaks "${pattern}"`);
        }
      }
    }
  }
});

test('project copy carries no academic competency codes or semester numbers', () => {
  for (const [slug, dict] of Object.entries(projects)) {
    for (const lang of LANGS) {
      for (const [key, value] of Object.entries(dict[lang])) {
        assert.doesNotMatch(value, /\bS[1-6]\.\d/, `${slug}.${lang}.${key} has a semester code`);
        assert.doesNotMatch(value, /\bC[1-6]\.\d/, `${slug}.${lang}.${key} has a competency code`);
      }
    }
  }
});

test('each built page wires the right slug and page type, and links back home', async () => {
  for (const slug of BUILT) {
    const html = await readFile(new URL(`../projects/${slug}.html`, import.meta.url), 'utf8');
    assert.match(html, /data-page="project"/, `${slug}: missing data-page`);
    assert.match(html, new RegExp(`data-project="${slug}"`), `${slug}: wrong data-project`);
    assert.match(html, /href="\.\.\/index\.html#work"/, `${slug}: missing back link`);
    assert.match(html, /href="\.\.\/css\/tokens\.css"/, `${slug}: asset paths not relative`);
    assert.match(html, /type="module" src="\.\.\/js\/main\.js"/, `${slug}: script path wrong`);
  }
});

test('no built page contains an inline style attribute except reveal stagger', async () => {
  for (const slug of BUILT) {
    const html = await readFile(new URL(`../projects/${slug}.html`, import.meta.url), 'utf8');
    const styles = html.match(/style="[^"]*"/g) ?? [];
    for (const style of styles) {
      assert.match(style, /^style="--i:\d+"$/, `${slug}: disallowed inline style ${style}`);
    }
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/project-pages.test.mjs`
Expected: FAIL — `Cannot find module '../js/i18n/projects.js'`.

- [ ] **Step 3: Create `js/i18n/projects.js` with the OptimOps entry**

Multi-paragraph bodies use `data-i18n-html` in the markup, so they carry `<p>` tags. These strings are authored here — never user input.

```js
/**
 * One dictionary per project page, keyed by slug. Every entry must define the
 * key contract asserted in tests/project-pages.test.mjs.
 *
 * Confidentiality: architecture, patterns and round-number scale are fine.
 * No client identity, no real operational figures, no production screenshots.
 */
export const projects = {
  optimops: {
    en: {
      'meta.title': 'OptimOps Neo — Thomas Chu',
      'meta.description': 'A full-stack decision-support platform for a French fire & rescue service: coverage analysis, scenario simulation and resource optimization.',

      'p.eyebrow': 'Full-stack · decision support · 2023 — present',
      'p.title': 'OptimOps Neo',
      'p.lead': 'A decision-support platform that lets a fire & rescue service ask what would happen if it moved a vehicle, changed a shift pattern, or lost a station for a day — and get an answer grounded in its own operational history rather than in intuition.',

      'p.facts.role.label': 'Role',
      'p.facts.role.value': 'Data scientist — data contract, API, dashboard architecture',
      'p.facts.stack.label': 'Stack',
      'p.facts.stack.value': 'Python · FastAPI · Pandas · Parquet · Vue 3 · Quasar · ECharts · Leaflet',
      'p.facts.scope.label': 'Scope',
      'p.facts.scope.value': 'Backend, frontend and the data layer between them',
      'p.facts.status.label': 'Status',
      'p.facts.status.value': 'In production, actively developed',

      'p.context.title': 'Context',
      'p.context.body': '<p>A fire &amp; rescue service makes resource decisions constantly: where to station a vehicle, how many crews to roster for a given night, whether a coverage gap is acceptable. Those decisions have historically been made on experience and on aggregate reports that take days to produce and answer only the question they were built for.</p><p>The service already held years of operational history — every intervention, every vehicle dispatch, every availability window. What it did not have was a way to interrogate that history quickly enough for it to inform a decision, or to ask a hypothetical question of it at all.</p>',

      'p.built.title': 'What I built',
      'p.built.body': '<p>A platform in three layers. A computation layer turns raw operational tables into roughly three dozen indicator tables covering response delays, vehicle unavailability, operational load, coverage gaps and regulatory compliance. A FastAPI backend serves those tables from an in-process cache, loaded once at startup, with one router per domain. A Vue 3 / Quasar frontend puts them in front of users.</p><p>The frontend is not a fixed set of pages. It is a widget system: a registry describes every available widget type and the data source it binds to, a rules layer adjusts which properties are available depending on the navigation context, and each widget declares how to fetch and transform its own data. Users compose their own dashboards from that catalogue rather than waiting on a developer to build a new view.</p><p>On top of the reporting sit two heavier features: a scenario simulator that replays historical interventions against a modified configuration, and an optimizer that searches for better vehicle and staffing allocations.</p>',

      'p.decisions.title': 'Engineering decisions',
      'p.decisions.body': '<p><strong>Columnar files instead of a database for reads.</strong> The indicator tables are written once by a batch pipeline and read constantly, never updated in place. Serving them as Parquet, loaded into an in-process cache at startup, removed an entire service from the deployment: no database to provision, tune, back up or keep in sync. Deployment became copying a directory.</p><p><strong>Long jobs never block a request.</strong> Optimization runs take between thirty seconds and two minutes. They execute on background threads, with task state persisted to a small on-disk store so that every worker process sees the same task registry; the frontend submits a run and polls for status. Without shared persistence, a poll landing on a different worker than the one holding the job would have reported it missing.</p><p><strong>Saved scenarios live on the server, not in the browser.</strong> Storing them in local storage would have made every user\'s scenario library invisible to their colleagues. A shared server-side store made the library collaborative, and a one-time migration lifted anything already saved locally into it.</p><p><strong>Access control has one honest seam.</strong> There is no identity provider yet, so the current permission layer is explicitly interim and documented as insecure by design: role checks funnel through a single resolver so that when a real identity provider arrives, one function changes and every route inherits it. The alternative — scattering ad-hoc checks and calling it security — would have been harder to remove than to write.</p>',

      'p.outcome.title': 'Outcome',
      'p.outcome.body': '<p>Questions that used to require a bespoke report now take a few clicks, and users build their own views instead of queuing for one. More importantly, the platform changed the kind of question that gets asked: from "what happened last year" to "what would happen if we changed this".</p><p>The work also exposed how much of the difficulty sat upstream, in the data path rather than the application — which is what led directly to the engine rebuild described in the next project.</p>',

      'p.nav.prev': 'Back to work',
      'p.nav.next': 'Next: KPI Engine',
    },
    fr: {
      'meta.title': 'OptimOps Neo — Thomas Chu',
      'meta.description': "Une plateforme full-stack d'aide à la décision pour un service d'incendie et de secours français : analyse de couverture, simulation de scénarios et optimisation des ressources.",

      'p.eyebrow': "Full-stack · aide à la décision · 2023 — aujourd’hui",
      'p.title': 'OptimOps Neo',
      'p.lead': "Une plateforme d'aide à la décision qui permet à un service d'incendie et de secours de savoir ce qui se passerait s'il déplaçait un engin, modifiait un régime de garde ou perdait un centre pendant une journée — avec une réponse fondée sur son propre historique opérationnel plutôt que sur l'intuition.",

      'p.facts.role.label': 'Rôle',
      'p.facts.role.value': "Data scientist — contrat de données, API, architecture du tableau de bord",
      'p.facts.stack.label': 'Technologies',
      'p.facts.stack.value': 'Python · FastAPI · Pandas · Parquet · Vue 3 · Quasar · ECharts · Leaflet',
      'p.facts.scope.label': 'Périmètre',
      'p.facts.scope.value': "Backend, frontend et la couche de données entre les deux",
      'p.facts.status.label': 'Statut',
      'p.facts.status.value': 'En production, développement actif',

      'p.context.title': 'Contexte',
      'p.context.body': "<p>Un service d'incendie et de secours arbitre en permanence : où stationner un engin, combien d'équipes armer pour une nuit donnée, si un défaut de couverture est acceptable. Ces décisions se prenaient historiquement sur l'expérience et sur des rapports agrégés qui demandent plusieurs jours de production et ne répondent qu'à la question pour laquelle ils ont été conçus.</p><p>Le service disposait déjà de plusieurs années d'historique opérationnel — chaque intervention, chaque engagement d'engin, chaque fenêtre de disponibilité. Ce qui manquait, c'était un moyen d'interroger cet historique assez vite pour éclairer une décision, et surtout de lui poser une question hypothétique.</p>",

      'p.built.title': "Ce que j'ai construit",
      'p.built.body': "<p>Une plateforme en trois couches. Une couche de calcul transforme les tables opérationnelles brutes en une trentaine de tables d'indicateurs : délais d'intervention, indisponibilité des engins, charge opérationnelle, défauts de couverture et conformité réglementaire. Un backend FastAPI sert ces tables depuis un cache en mémoire chargé une fois au démarrage, avec un routeur par domaine. Un frontend Vue 3 / Quasar les met devant les utilisateurs.</p><p>Le frontend n'est pas un ensemble figé de pages, mais un système de composants : un registre décrit chaque type de composant et la source de données à laquelle il se rattache, une couche de règles ajuste les propriétés disponibles selon le contexte de navigation, et chaque composant déclare comment récupérer et transformer ses propres données. Les utilisateurs composent eux-mêmes leurs tableaux de bord au lieu d'attendre qu'un développeur crée une nouvelle vue.</p><p>Au-dessus du reporting, deux fonctionnalités plus lourdes : un simulateur qui rejoue les interventions historiques sur une configuration modifiée, et un optimiseur qui recherche de meilleures affectations d'engins et d'effectifs.</p>",

      'p.decisions.title': 'Décisions techniques',
      'p.decisions.body': "<p><strong>Des fichiers colonnaires plutôt qu'une base de données en lecture.</strong> Les tables d'indicateurs sont écrites une fois par une chaîne de traitement par lots puis lues en permanence, jamais modifiées sur place. Les servir en Parquet, chargées dans un cache en mémoire au démarrage, a supprimé un service entier du déploiement : plus de base à provisionner, régler, sauvegarder ou synchroniser. Déployer revient à copier un répertoire.</p><p><strong>Les traitements longs ne bloquent jamais une requête.</strong> Une optimisation prend de trente secondes à deux minutes. Elle s'exécute sur un fil d'exécution en arrière-plan, l'état de la tâche étant persisté dans un petit magasin sur disque pour que tous les processus de travail voient le même registre ; le frontend soumet un calcul puis interroge son statut. Sans cette persistance partagée, une requête de statut arrivant sur un autre processus que celui qui porte la tâche l'aurait déclarée introuvable.</p><p><strong>Les scénarios enregistrés vivent sur le serveur, pas dans le navigateur.</strong> Les stocker côté navigateur aurait rendu la bibliothèque de scénarios de chacun invisible à ses collègues. Un magasin partagé côté serveur l'a rendue collaborative, et une migration unique a remonté ce qui était déjà enregistré localement.</p><p><strong>Le contrôle d'accès a une seule couture assumée.</strong> Il n'existe pas encore de fournisseur d'identité : la couche de permissions actuelle est explicitement provisoire et documentée comme non sécurisée par construction. Les vérifications de rôle passent toutes par un unique résolveur, de sorte que le jour où un vrai fournisseur d'identité arrivera, une seule fonction changera et toutes les routes en hériteront. L'alternative — disséminer des vérifications ad hoc et appeler cela de la sécurité — aurait été plus difficile à retirer qu'à écrire.</p>",

      'p.outcome.title': 'Résultat',
      'p.outcome.body': "<p>Des questions qui exigeaient auparavant un rapport sur mesure se règlent en quelques clics, et les utilisateurs construisent leurs propres vues au lieu d'en faire la demande. Plus important : la plateforme a changé la nature des questions posées, passant de « qu'est-il arrivé l'an dernier » à « que se passerait-il si nous changions ceci ».</p><p>Ce travail a aussi révélé à quel point la difficulté se situait en amont, dans le chemin de données plutôt que dans l'application — ce qui a directement conduit à la reconstruction du moteur décrite dans le projet suivant.</p>",

      'p.nav.prev': 'Retour aux projets',
      'p.nav.next': "Suivant : Moteur d'indicateurs",
    },
  },
};
```

- [ ] **Step 4: Add the KPI Engine entry to `js/i18n/projects.js`**

Append inside the same exported object, after `optimops`. Note the framing constraint: this describes a **system**, never the people who built the previous one.

```js
  'kpi-engine': {
    en: {
      'meta.title': 'KPI Engine — Thomas Chu',
      'meta.description': 'A ground-up rebuild of an operational indicator engine: a validated input contract, a star-schema core, and a regression harness checking every value against the engine it replaces.',

      'p.eyebrow': 'Data architecture · 2025 — present',
      'p.title': 'KPI Engine',
      'p.lead': 'The indicator engine underneath OptimOps, rebuilt from first principles — because the fastest way to lose trust in a dashboard is to be unable to explain where one of its numbers came from.',

      'p.facts.role.label': 'Role',
      'p.facts.role.value': 'Architecture, audit and implementation',
      'p.facts.stack.label': 'Stack',
      'p.facts.stack.value': 'Python · Pandas · Parquet · pytest',
      'p.facts.scope.label': 'Scope',
      'p.facts.scope.value': 'Input contract, computation core, publication step, regression harness',
      'p.facts.status.label': 'Status',
      'p.facts.status.value': 'In development, running alongside the engine it replaces',

      'p.context.title': 'Context',
      'p.context.body': '<p>The engine computing OptimOps\' indicators had grown organically over several years. Before proposing to replace it I audited it in four parts, and wrote up what I found rather than trusting my impression of it.</p><p>The data path crossed four formats between the source system and a computed value, with no stage that clearly owned validation. I catalogued around a hundred and fifty distinct data transformations, among which one sweep-line pattern — walking a timeline of start and end events to compute overlap — had been independently reimplemented close to a dozen times, with at least two of those copies carrying documented numerical bugs. Vocabulary diverged: one vehicle category resolved to three different classifications depending on which module you asked. Several reference tables had no traceable provenance. And no test anywhere in the chain asserted the value of a single indicator.</p><p>Individually these are ordinary symptoms of a system that grew faster than its scaffolding. Together they meant a wrong number could not be traced to a cause — which is what makes a decision-support tool stop being used.</p>',

      'p.built.title': 'What I built',
      'p.built.body': '<p>A new engine with a deliberately shorter data path. Inputs arrive as a typed, denormalised Parquet contract rather than being read from a shared operational database, and are validated at load time: a missing or malformed column fails the run immediately instead of being quietly dropped and surfacing later as an unexplained blank in a chart.</p><p>The core is a star schema — one fact table per grain, shared dimension tables — so the roughly three dozen indicators are expressed as queries over a common model instead of as three dozen bespoke pipelines. The sweep-line logic that had been reimplemented repeatedly exists once, tested directly against hand-computed expected values.</p><p>Publication is a single formal step. The engine writes its results atomically, file by file, and aborts on the first error, so a run either publishes a complete, consistent set of outputs or publishes nothing. There is no state in which half the indicators are new and half are stale.</p><p>Finally, a regression harness runs the previous engine as an external black-box process and compares its outputs against the new one, indicator by indicator. Any divergence is either a bug I introduced or a bug I fixed — and the harness forces me to decide which, in writing, before moving on.</p>',

      'p.decisions.title': 'Engineering decisions',
      'p.decisions.body': '<p><strong>Audit before rewrite.</strong> A rewrite justified by "the old one is messy" is a rewrite that reproduces the same mistakes in new syntax. Writing the audit down first meant each design choice in the new engine answers a specific, documented finding — and it made the case for the rebuild something a stakeholder could evaluate rather than take on faith.</p><p><strong>Fail loudly at the boundary.</strong> The original engine tolerated missing columns and unknown categories, which pushed the discovery of a data problem downstream to whoever noticed a strange chart weeks later. The new one validates at load and refuses to run. Failing at ingestion is inconvenient; failing silently is expensive.</p><p><strong>Separate computation from plumbing.</strong> The previous engine both fetched data and computed on it, so a change to storage risked changing a result. Splitting the input contract from the computation core means the two can be reasoned about — and tested — independently.</p><p><strong>Keep the old engine as the reference, not as the target.</strong> The harness exists to explain differences, not to reproduce them. Where the old engine was wrong, the new one is allowed to disagree — but only deliberately, with the reason recorded.</p>',

      'p.outcome.title': 'Outcome',
      'p.outcome.body': '<p>The engine is not yet the one in production; it runs beside the existing one while the regression harness works through the indicator set. That is the intended sequence — a replacement that cannot demonstrate where it differs is not ready to replace anything.</p><p>What has already changed is the ability to answer "why is this number what it is". Every indicator now has a traceable path from a validated input to a tested transformation, which is the property the original system was missing.</p>',

      'p.nav.prev': 'Previous: OptimOps Neo',
      'p.nav.next': 'Next: Multimodal Emotion Recognition',
    },
    fr: {
      'meta.title': "Moteur d'indicateurs — Thomas Chu",
      'meta.description': "Reconstruction complète d'un moteur d'indicateurs opérationnels : contrat d'entrée validé, cœur en modèle en étoile, et harnais de non-régression vérifiant chaque valeur face au moteur remplacé.",

      'p.eyebrow': "Architecture de données · 2025 — aujourd’hui",
      'p.title': "Moteur d'indicateurs",
      'p.lead': "Le moteur d'indicateurs sous OptimOps, reconstruit depuis les fondations — parce que le moyen le plus rapide de perdre confiance dans un tableau de bord est de ne pas pouvoir expliquer d'où vient l'un de ses chiffres.",

      'p.facts.role.label': 'Rôle',
      'p.facts.role.value': 'Architecture, audit et implémentation',
      'p.facts.stack.label': 'Technologies',
      'p.facts.stack.value': 'Python · Pandas · Parquet · pytest',
      'p.facts.scope.label': 'Périmètre',
      'p.facts.scope.value': "Contrat d'entrée, cœur de calcul, étape de publication, harnais de non-régression",
      'p.facts.status.label': 'Statut',
      'p.facts.status.value': "En développement, exécuté en parallèle du moteur qu'il remplace",

      'p.context.title': 'Contexte',
      'p.context.body': "<p>Le moteur qui calculait les indicateurs d'OptimOps avait grandi de façon organique sur plusieurs années. Avant de proposer de le remplacer, je l'ai audité en quatre volets et j'ai consigné mes constats plutôt que de me fier à mon impression.</p><p>Le chemin de données traversait quatre formats entre le système source et une valeur calculée, sans étape qui porte clairement la validation. J'ai recensé environ cent cinquante transformations distinctes, parmi lesquelles un même motif de balayage temporel — parcourir une chronologie d'événements de début et de fin pour calculer un recouvrement — avait été réimplémenté indépendamment près d'une dizaine de fois, dont au moins deux copies portaient des erreurs numériques documentées. Le vocabulaire divergeait : une même catégorie d'engin se résolvait en trois classifications différentes selon le module interrogé. Plusieurs référentiels n'avaient pas de provenance traçable. Et aucun test, nulle part dans la chaîne, ne vérifiait la valeur d'un seul indicateur.</p><p>Pris isolément, ce sont des symptômes ordinaires d'un système qui a grandi plus vite que ses garde-fous. Ensemble, ils signifiaient qu'un chiffre erroné ne pouvait pas être rattaché à une cause — ce qui est précisément ce qui fait cesser d'utiliser un outil d'aide à la décision.</p>",

      'p.built.title': "Ce que j'ai construit",
      'p.built.body': "<p>Un nouveau moteur au chemin de données volontairement plus court. Les entrées arrivent sous forme d'un contrat Parquet typé et dénormalisé plutôt que d'être lues dans une base opérationnelle partagée, et sont validées au chargement : une colonne absente ou mal formée fait échouer le traitement immédiatement, au lieu d'être silencieusement ignorée puis de ressortir plus tard en case vide inexpliquée dans un graphique.</p><p>Le cœur est un modèle en étoile — une table de faits par grain, des tables de dimensions partagées — de sorte que la trentaine d'indicateurs s'exprime comme des requêtes sur un modèle commun plutôt que comme une trentaine de chaînes sur mesure. La logique de balayage temporel, jusque-là dupliquée, n'existe plus qu'une fois, testée directement contre des valeurs attendues calculées à la main.</p><p>La publication est une étape unique et formalisée. Le moteur écrit ses résultats de façon atomique, fichier par fichier, et s'interrompt à la première erreur : un traitement publie soit un ensemble complet et cohérent, soit rien. Il n'existe pas d'état où la moitié des indicateurs seraient à jour et l'autre périmée.</p><p>Enfin, un harnais de non-régression exécute l'ancien moteur comme un processus externe en boîte noire et compare ses sorties à celles du nouveau, indicateur par indicateur. Tout écart est soit une erreur que j'ai introduite, soit une erreur que j'ai corrigée — et le harnais m'oblige à trancher, par écrit, avant de poursuivre.</p>",

      'p.decisions.title': 'Décisions techniques',
      'p.decisions.body': "<p><strong>Auditer avant de réécrire.</strong> Une réécriture justifiée par « l'ancien est en désordre » est une réécriture qui reproduit les mêmes erreurs dans une autre syntaxe. Consigner l'audit d'abord a fait que chaque choix de conception répond à un constat précis et documenté — et a rendu la décision de reconstruire évaluable par un décideur, au lieu d'être prise sur parole.</p><p><strong>Échouer bruyamment à la frontière.</strong> Le moteur d'origine tolérait les colonnes manquantes et les catégories inconnues, ce qui reportait la découverte d'un défaut de données sur la personne qui remarquerait un graphique étrange des semaines plus tard. Le nouveau valide au chargement et refuse de s'exécuter. Échouer à l'ingestion est gênant ; échouer en silence coûte cher.</p><p><strong>Séparer le calcul de la plomberie.</strong> Le moteur précédent allait chercher les données et calculait dessus, si bien qu'un changement de stockage risquait de changer un résultat. Séparer le contrat d'entrée du cœur de calcul permet de raisonner — et de tester — les deux indépendamment.</p><p><strong>Garder l'ancien moteur comme référence, pas comme cible.</strong> Le harnais existe pour expliquer les écarts, pas pour les reproduire. Là où l'ancien moteur se trompait, le nouveau a le droit de diverger — mais délibérément, et avec la raison consignée.</p>",

      'p.outcome.title': 'Résultat',
      'p.outcome.body': "<p>Le moteur n'est pas encore celui en production : il tourne à côté de l'existant pendant que le harnais parcourt l'ensemble des indicateurs. C'est la séquence voulue — un remplaçant incapable de démontrer en quoi il diffère n'est pas prêt à remplacer quoi que ce soit.</p><p>Ce qui a déjà changé, c'est la capacité à répondre à « pourquoi ce chiffre vaut-il cela ». Chaque indicateur dispose désormais d'un chemin traçable, d'une entrée validée jusqu'à une transformation testée — la propriété qui manquait au système d'origine.</p>",

      'p.nav.prev': 'Précédent : OptimOps Neo',
      'p.nav.next': 'Suivant : Reconnaissance multimodale des émotions',
    },
  },
```

- [ ] **Step 5: Append project-detail styles to `css/pages.css`**

```css
/* ---- Project detail ---- */
.project { padding-block: clamp(2rem, 1.2rem + 3vw, 3.5rem) 0; }

.project__head { margin-block-end: var(--space-6); }
.project__title { font-size: var(--fs-h1); margin-block: var(--space-3) var(--space-4); }
.project__lead {
  font-size: clamp(1.05rem, 1rem + .35vw, 1.25rem);
  color: var(--text-muted);
  max-width: 58ch;
}

.project__cover {
  aspect-ratio: 16 / 9;
  display: grid;
  place-items: center;
  margin-block-end: var(--space-6);
  background: color-mix(in oklab, var(--accent) 6%, var(--surface));
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--accent);
  overflow: hidden;
}

.project__facts {
  display: grid;
  gap: var(--space-4);
  margin-block-end: var(--space-7);
  padding-block: var(--space-5);
  border-block: 1px solid var(--border);
  grid-template-columns: 1fr;
}
.project__facts dd {
  margin: var(--space-1) 0 0;
  font-size: var(--fs-small);
  font-weight: 500;
}
@media (min-width: 600px) { .project__facts { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1024px) { .project__facts { grid-template-columns: repeat(4, minmax(0, 1fr)); } }

.project__body { display: flex; flex-direction: column; gap: var(--space-7); }
.project__body h2 { font-size: var(--fs-h2); margin-block-end: var(--space-4); }
.project__body p { color: var(--text-muted); }
.project__body p + p { margin-block-start: var(--space-4); }
.project__body strong { color: var(--text); font-weight: 600; }

.project__nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  justify-content: space-between;
  margin-block-start: var(--section-gap);
  padding-block-start: var(--space-5);
  border-block-start: 1px solid var(--border);
  font-size: var(--fs-small);
}
.project__nav a { text-decoration: none; }
.project__nav a:hover { text-decoration: underline; }

/* Wide content inside prose must scroll itself, never the page. */
.project__body pre,
.project__body table { display: block; overflow-x: auto; max-width: 100%; }
```

- [ ] **Step 6: Write `projects/optimops.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

<script>
  try {
    var t = localStorage.getItem('tc-theme');
    if (t !== 'light' && t !== 'dark') {
      t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.dataset.theme = t;
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
</script>

<title>OptimOps Neo — Thomas Chu</title>
<meta name="description" content="A full-stack decision-support platform for a French fire &amp; rescue service: coverage analysis, scenario simulation and resource optimization.">
<meta name="theme-color" content="#100D16">
<link rel="canonical" href="https://gitgudshu.github.io/projects/optimops.html">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;700&display=swap">

<link rel="stylesheet" href="../css/tokens.css">
<link rel="stylesheet" href="../css/base.css">
<link rel="stylesheet" href="../css/layout.css">
<link rel="stylesheet" href="../css/components.css">
<link rel="stylesheet" href="../css/pages.css">
</head>

<body data-page="project" data-project="optimops">
<a class="skip-link" href="#content" data-i18n="skip.link">Skip to content</a>

<canvas id="particles" aria-hidden="true"></canvas>

<header class="site-header" id="top">
  <div class="rail site-header__inner">
    <a class="brand" href="../index.html" data-i18n-attr="aria-label:nav.home">
      <svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor">
        <rect x="1" y="1" width="30" height="30" rx="9" stroke-width="1.5"/>
        <path d="M8 11h8M12 11v11" stroke-width="2" stroke-linecap="round"/>
        <path d="M24 12.5a4.5 4.5 0 1 0 0 7" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <span>Thomas Chu</span>
    </a>

    <nav class="nav-links" aria-label="Primary">
      <a href="../index.html#work" data-i18n="nav.back">Back to work</a>
    </nav>

    <div class="nav-tools">
      <div class="lang-toggle" role="group" aria-label="Language">
        <button type="button" data-lang="en" data-i18n="lang.en" data-i18n-attr="title:lang.toEn">EN</button>
        <button type="button" data-lang="fr" data-i18n="lang.fr" data-i18n-attr="title:lang.toFr">FR</button>
      </div>

      <button type="button" class="icon-btn" id="theme-btn" data-i18n-attr="aria-label:theme.toDark">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <circle cx="12" cy="12" r="4.2"/>
          <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6"/>
        </svg>
      </button>
    </div>
  </div>
</header>

<main id="content">
  <article class="project">
    <div class="rail rail--prose">
      <header class="project__head reveal">
        <p class="eyebrow" data-i18n="p.eyebrow">Full-stack · decision support · 2023 — present</p>
        <h1 class="project__title" data-i18n="p.title">OptimOps Neo</h1>
        <p class="project__lead" data-i18n="p.lead">A decision-support platform for a fire &amp; rescue service.</p>
      </header>

      <div class="project__cover reveal" style="--i:1" data-cover="optimops" aria-hidden="true"></div>

      <dl class="project__facts reveal" style="--i:1">
        <div>
          <dt class="eyebrow" data-i18n="p.facts.role.label">Role</dt>
          <dd data-i18n="p.facts.role.value">Data scientist</dd>
        </div>
        <div>
          <dt class="eyebrow" data-i18n="p.facts.stack.label">Stack</dt>
          <dd data-i18n="p.facts.stack.value">Python · FastAPI · Vue 3</dd>
        </div>
        <div>
          <dt class="eyebrow" data-i18n="p.facts.scope.label">Scope</dt>
          <dd data-i18n="p.facts.scope.value">Backend, frontend and the data layer</dd>
        </div>
        <div>
          <dt class="eyebrow" data-i18n="p.facts.status.label">Status</dt>
          <dd data-i18n="p.facts.status.value">In production</dd>
        </div>
      </dl>

      <div class="project__body">
        <section class="reveal">
          <h2 data-i18n="p.context.title">Context</h2>
          <div data-i18n-html="p.context.body"></div>
        </section>
        <section class="reveal">
          <h2 data-i18n="p.built.title">What I built</h2>
          <div data-i18n-html="p.built.body"></div>
        </section>
        <section class="reveal">
          <h2 data-i18n="p.decisions.title">Engineering decisions</h2>
          <div data-i18n-html="p.decisions.body"></div>
        </section>
        <section class="reveal">
          <h2 data-i18n="p.outcome.title">Outcome</h2>
          <div data-i18n-html="p.outcome.body"></div>
        </section>
      </div>

      <nav class="project__nav" aria-label="Project navigation">
        <a href="../index.html#work" data-i18n="p.nav.prev">Back to work</a>
        <a href="kpi-engine.html" data-i18n="p.nav.next">Next: KPI Engine</a>
      </nav>
    </div>
  </article>
</main>

<footer class="site-footer">
  <div class="rail site-footer__inner">
    <p data-i18n="footer.built">Built from scratch — no framework, no tracking.</p>
    <a href="https://github.com/GitGudShu/GitGudShu.github.io" data-i18n="footer.source">Source on GitHub</a>
  </div>
</footer>

<script type="module" src="../js/main.js"></script>
</body>
</html>
```

- [ ] **Step 7: Paint `data-cover` slots from `js/main.js`**

Add the import:

```js
import { renderCover } from './covers.js';
```

Add this to `paintIcons()` — rename it `paintGraphics()` and update its call site in `boot()`:

```js
function paintGraphics() {
  document.querySelectorAll('[data-icon]').forEach((slot) => {
    slot.innerHTML = renderIcon(slot.dataset.icon);
  });
  document.querySelectorAll('[data-cover]').forEach((slot) => {
    slot.innerHTML = renderCover(slot.dataset.cover);
  });
}
```

- [ ] **Step 8: Write `projects/kpi-engine.html`**

Copy `projects/optimops.html` verbatim, then change exactly seven things:

1. `<title>` → `KPI Engine — Thomas Chu`
2. `<meta name="description">` → the English `meta.description` from the `kpi-engine` dictionary
3. `<link rel="canonical">` → `https://gitgudshu.github.io/projects/kpi-engine.html`
4. `data-project="optimops"` → `data-project="kpi-engine"`
5. `data-cover="optimops"` → `data-cover="kpiEngine"`
6. The static fallback text inside each `data-i18n` element → the corresponding English string (these are replaced by JS, but must not read "OptimOps" if JS fails)
7. `project__nav`: first link `href="optimops.html"` with `data-i18n="p.nav.prev"`, second link `href="emotion-recognition.html"` with `data-i18n="p.nav.next"`

- [ ] **Step 9: Run the tests to verify they pass**

Run: `node --test tests/project-pages.test.mjs`
Expected: PASS, 8/8.

Run: `npm run verify`
Expected: all PASS; `projects` no longer reports SKIP.

- [ ] **Step 10: Verify in the browser**

Open `http://localhost:8000/projects/optimops.html` and `kpi-engine.html`. Confirm:
1. No console errors; the cover motif renders on both pages and matches the card.
2. The facts rail is 4 columns at ≥1024px, 2 at ≥600px, 1 below.
3. `EN|FR` swaps the lead, all four facts, all four section bodies and both nav links; the choice carries over when navigating between the two pages and back to the homepage.
4. The theme choice also carries across pages.
5. The header shows a single "Back to work" link, plus `EN|FR` and the theme toggle.
6. Prev/next links resolve. `kpi-engine.html` → next points at `emotion-recognition.html`, which does not exist yet — expected, and fixed in Task 12.
7. `document.documentElement.scrollWidth <= window.innerWidth` is `true` at 320, 414, 768, 1024 and 1440px.
8. Prose measures roughly 65–70 characters per line at desktop width.

- [ ] **Step 11: Verify the confidentiality gate by hand**

Read both rendered pages in full, in both languages. Confirm no client name, no department name, no station name, and no real operational figure appears. The automated test catches known patterns; only reading catches the rest.

- [ ] **Step 12: Commit**

```bash
git add js/i18n/projects.js js/main.js css/pages.css \
        projects/optimops.html projects/kpi-engine.html tests/project-pages.test.mjs
git commit -m "feat: add project page template with OptimOps and KPI Engine"
```

---

### Task 12: Emotion Recognition, Predictops and ARS pages

**Files:**
- Modify: `js/i18n/projects.js` (add three dictionaries)
- Create: `projects/emotion-recognition.html`, `projects/predictops.html`, `projects/ars.html`
- Modify: `tests/project-pages.test.mjs` (extend `BUILT`)

**Interfaces:**
- Consumes: the page template, key contract and CSS from Task 11.
- Produces: all five project dictionaries complete; every prev/next link in the chain resolves.

The prev/next chain, once this task is done:

```
optimops  ->  kpi-engine  ->  emotion-recognition  ->  predictops  ->  ars  ->  (back to work)
```

- [ ] **Step 1: Extend the test to cover all five pages**

In `tests/project-pages.test.mjs`, change the `BUILT` constant:

```js
const BUILT = ['optimops', 'kpi-engine', 'emotion-recognition', 'predictops', 'ars'];
```

Add this test at the end of the file:

```js
test('the prev/next chain is complete and every target exists', async () => {
  const chain = ['optimops', 'kpi-engine', 'emotion-recognition', 'predictops', 'ars'];
  for (const [i, slug] of chain.entries()) {
    const html = await readFile(new URL(`../projects/${slug}.html`, import.meta.url), 'utf8');
    const prev = i === 0 ? '../index.html#work' : `${chain[i - 1]}.html`;
    const next = i === chain.length - 1 ? '../index.html#work' : `${chain[i + 1]}.html`;
    assert.match(html, new RegExp(`href="${prev.replace(/[.#/]/g, '\\$&')}"`), `${slug}: bad prev link`);
    assert.match(html, new RegExp(`href="${next.replace(/[.#/]/g, '\\$&')}"`), `${slug}: bad next link`);
  }
});

test('every project card on the homepage has a page that exists', async () => {
  for (const project of PROJECTS) {
    if (project.placeholder) continue;
    const html = await readFile(new URL(`../${project.href}`, import.meta.url), 'utf8');
    assert.ok(html.length > 0, `${project.href} is empty`);
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/project-pages.test.mjs`
Expected: FAIL — `no dictionary for emotion-recognition`.

- [ ] **Step 3: Add the Emotion Recognition dictionary**

Append inside the exported `projects` object in `js/i18n/projects.js`:

```js
  'emotion-recognition': {
    en: {
      'meta.title': 'Multimodal Emotion Recognition — Thomas Chu',
      'meta.description': 'A research internship at the University of Portsmouth: recognising emotion across video, text, audio and images by fine-tuning transformer models.',

      'p.eyebrow': 'Research internship · 2023',
      'p.title': 'Multimodal Emotion Recognition',
      'p.lead': 'A research internship at the University of Portsmouth, working on models that infer emotional state from whichever signals are available — what someone wrote, how they said it, and how they looked while saying it.',

      'p.facts.role.label': 'Role',
      'p.facts.role.value': 'Research assistant intern',
      'p.facts.stack.label': 'Stack',
      'p.facts.stack.value': 'Python · PyTorch · Transformers · DeBERTa · OpenAI fine-tuning · Weights & Biases',
      'p.facts.scope.label': 'Scope',
      'p.facts.scope.value': 'Model fine-tuning, experiment tracking, a real-time transcription tool',
      'p.facts.status.label': 'Status',
      'p.facts.status.value': 'Completed — internship, 2023',

      'p.context.title': 'Context',
      'p.context.body': '<p>The research group was studying how emotional state could be inferred from recordings of students, with the eventual aim of spotting disengagement early enough to do something about it. Emotion is a genuinely multimodal signal: text carries the content, audio carries the delivery, and video carries the expression, and each of the three is unreliable on its own.</p><p>The practical problem was less about model architecture than about iteration. Runs were being launched, tuned and compared informally, which made it hard to say whether a change had helped or whether the difference was noise.</p>',

      'p.built.title': 'What I built',
      'p.built.body': '<p>I worked on the text branch, fine-tuning a DeBERTa model on the group\'s labelled data, and separately fine-tuned an OpenAI model as a comparison point so the team had a reference for what a general-purpose model achieved on the same task without domain training.</p><p>To fix the iteration problem I introduced Weights &amp; Biases across the group\'s experiments — every run logging its hyperparameters, metrics and artefacts automatically. Comparing two runs became reading a chart instead of reconstructing what had been changed from memory.</p><p>I also built a live transcription tool that captured audio, transcribed it as it arrived, and pushed each segment through the emotion model, so the pipeline could be demonstrated end to end on a live speaker rather than only on a prepared dataset.</p>',

      'p.decisions.title': 'Engineering decisions',
      'p.decisions.body': '<p><strong>Track experiments before tuning them.</strong> Adding experiment tracking was not the assignment, but without it no result was reproducible and no comparison was trustworthy. Fixing that first made every subsequent measurement meaningful — an early lesson that infrastructure debt shows up as unreliable conclusions, not just as slow work.</p><p><strong>Fine-tune a general model as a baseline, not as a competitor.</strong> The OpenAI fine-tune existed to answer "how much does domain-specific training actually buy us here?". A specialised model that cannot beat a general one is worth knowing about early.</p><p><strong>Demonstrate on live input.</strong> A model that only ever runs on a clean, pre-segmented dataset hides its practical failure modes. Wiring the pipeline to live audio surfaced latency and segmentation problems that offline evaluation never would have shown.</p>',

      'p.outcome.title': 'Outcome',
      'p.outcome.body': '<p>The group came away with a tracked, reproducible experiment setup, a fine-tuned text model with a documented baseline to compare against, and a demonstrable live pipeline.</p><p>For me it was the project that shifted my interest from models toward the systems around them — a pattern that has held in everything I have worked on since.</p>',

      'p.nav.prev': 'Previous: KPI Engine',
      'p.nav.next': 'Next: Predictops',
    },
    fr: {
      'meta.title': 'Reconnaissance multimodale des émotions — Thomas Chu',
      'meta.description': "Un stage de recherche à l'université de Portsmouth : reconnaître l'émotion sur vidéo, texte, audio et images par ajustement fin de modèles transformeurs.",

      'p.eyebrow': 'Stage de recherche · 2023',
      'p.title': 'Reconnaissance multimodale des émotions',
      'p.lead': "Un stage de recherche à l'université de Portsmouth, sur des modèles qui infèrent un état émotionnel à partir des signaux disponibles — ce qu'une personne a écrit, la façon dont elle l'a dit, et son expression au moment de le dire.",

      'p.facts.role.label': 'Rôle',
      'p.facts.role.value': 'Stagiaire assistant de recherche',
      'p.facts.stack.label': 'Technologies',
      'p.facts.stack.value': 'Python · PyTorch · Transformers · DeBERTa · ajustement fin OpenAI · Weights & Biases',
      'p.facts.scope.label': 'Périmètre',
      'p.facts.scope.value': "Ajustement fin de modèles, suivi d'expériences, outil de transcription temps réel",
      'p.facts.status.label': 'Statut',
      'p.facts.status.value': 'Terminé — stage, 2023',

      'p.context.title': 'Contexte',
      'p.context.body': "<p>L'équipe de recherche étudiait comment inférer un état émotionnel à partir d'enregistrements d'étudiants, avec pour objectif de repérer un décrochage assez tôt pour y répondre. L'émotion est un signal réellement multimodal : le texte porte le contenu, l'audio la manière, la vidéo l'expression — et aucun des trois n'est fiable isolément.</p><p>Le problème pratique tenait moins à l'architecture des modèles qu'à l'itération. Les entraînements étaient lancés, réglés et comparés de façon informelle, ce qui rendait difficile de dire si un changement avait aidé ou si l'écart relevait du bruit.</p>",

      'p.built.title': "Ce que j'ai construit",
      'p.built.body': "<p>J'ai travaillé sur la branche texte, en ajustant finement un modèle DeBERTa sur les données annotées de l'équipe, et j'ai par ailleurs ajusté un modèle OpenAI comme point de comparaison, afin que l'équipe dispose d'une référence sur ce qu'obtient un modèle généraliste sur la même tâche sans entraînement métier.</p><p>Pour régler le problème d'itération, j'ai introduit Weights &amp; Biases sur l'ensemble des expériences : chaque entraînement journalise automatiquement ses hyperparamètres, ses métriques et ses artefacts. Comparer deux entraînements est devenu lire un graphique au lieu de reconstituer de mémoire ce qui avait changé.</p><p>J'ai également développé un outil de transcription en direct qui capte l'audio, le transcrit au fil de l'eau et fait passer chaque segment dans le modèle d'émotion, afin de démontrer la chaîne de bout en bout sur un locuteur réel et non seulement sur un jeu de données préparé.</p>",

      'p.decisions.title': 'Décisions techniques',
      'p.decisions.body': "<p><strong>Tracer les expériences avant de les régler.</strong> Mettre en place le suivi d'expériences n'était pas la mission, mais sans lui aucun résultat n'était reproductible et aucune comparaison fiable. Corriger cela d'abord a donné du sens à toutes les mesures suivantes — une leçon précoce : la dette d'outillage se manifeste par des conclusions peu fiables, pas seulement par de la lenteur.</p><p><strong>Ajuster un modèle généraliste comme référence, pas comme concurrent.</strong> L'ajustement OpenAI existait pour répondre à « qu'apporte réellement un entraînement spécifique au domaine ? ». Un modèle spécialisé incapable de battre un généraliste, il vaut mieux le savoir tôt.</p><p><strong>Démontrer sur des entrées réelles.</strong> Un modèle qui ne tourne que sur un jeu de données propre et pré-segmenté masque ses vrais modes de défaillance. Brancher la chaîne sur de l'audio en direct a révélé des problèmes de latence et de segmentation qu'une évaluation hors ligne n'aurait jamais montrés.</p>",

      'p.outcome.title': 'Résultat',
      'p.outcome.body': "<p>L'équipe est repartie avec un dispositif d'expérimentation tracé et reproductible, un modèle texte ajusté accompagné d'une référence documentée, et une chaîne démontrable en direct.</p><p>Pour moi, c'est le projet qui a déplacé mon intérêt des modèles vers les systèmes qui les entourent — une constante dans tout ce sur quoi j'ai travaillé depuis.</p>",

      'p.nav.prev': "Précédent : Moteur d'indicateurs",
      'p.nav.next': 'Suivant : Predictops',
    },
  },
```

- [ ] **Step 4: Add the Predictops dictionary**

```js
  predictops: {
    en: {
      'meta.title': 'Predictops — Thomas Chu',
      'meta.description': 'Geolocated forecasting of emergency interventions, combining historical operational data with weather signals in an operational dashboard.',

      'p.eyebrow': 'Forecasting · dataviz · 2023 — 2024',
      'p.title': 'Predictops',
      'p.lead': 'Forecasting where and when emergency interventions are likely to occur, so that a service can position resources ahead of demand rather than reacting to it.',

      'p.facts.role.label': 'Role',
      'p.facts.role.value': 'Development support and integration with OptimOps',
      'p.facts.stack.label': 'Stack',
      'p.facts.stack.value': 'Python · scikit-learn · Pandas · Vue 3 · Quasar · ECharts',
      'p.facts.scope.label': 'Scope',
      'p.facts.scope.value': 'Feature engineering, forecast surfacing, dashboard integration',
      'p.facts.status.label': 'Status',
      'p.facts.status.value': 'Delivered — superseded by the OptimOps platform',

      'p.context.title': 'Context',
      'p.context.body': '<p>Emergency demand is not uniform. It clusters in space, in time, and around conditions — weather in particular moves several categories of intervention in ways that are visible in the historical record. A service that can anticipate that shift, even roughly, can pre-position crews instead of dispatching from wherever they happen to be.</p><p>The forecast on its own is not the deliverable. A prediction that lives in a notebook changes nothing; it has to arrive where the decision is actually made.</p>',

      'p.built.title': 'What I built',
      'p.built.body': '<p>I contributed to the forecasting side — assembling features from historical intervention records and joining them against weather data so the model could learn the relationship between conditions and demand, geographically resolved rather than aggregated over a whole territory.</p><p>The larger part of my contribution was surfacing: building the views that put forecasts in front of operators, and connecting Predictops to OptimOps so that a projection could feed the same interface where coverage and resource decisions were already being made.</p>',

      'p.decisions.title': 'Engineering decisions',
      'p.decisions.body': '<p><strong>Forecast at a geographic grain, not a territorial average.</strong> A single number for a whole territory is accurate and useless — demand concentrates, and the value of the forecast is entirely in knowing where. Keeping the geographic resolution cost accuracy per cell but made the output actionable.</p><p><strong>Treat weather as an input signal, not a special case.</strong> Weather was joined into the same feature pipeline as everything else rather than bolted on as a separate correction. It made the model easier to reason about and made it straightforward to add further external signals later.</p><p><strong>Integrate rather than stand alone.</strong> Connecting Predictops to OptimOps mattered more than any accuracy gain: operators already had a tool they opened daily, and a forecast that appears there gets used, while one behind a separate login does not.</p>',

      'p.outcome.title': 'Outcome',
      'p.outcome.body': '<p>Predictops demonstrated that geolocated demand forecasting was viable on the available operational history, and the integration work established the pattern that OptimOps later generalised — predictions and indicators sharing one interface rather than living in separate tools.</p><p>The platform itself has since been superseded by OptimOps, which absorbed its role.</p>',

      'p.nav.prev': 'Previous: Multimodal Emotion Recognition',
      'p.nav.next': 'Next: ARS Health Dashboard',
    },
    fr: {
      'meta.title': 'Predictops — Thomas Chu',
      'meta.description': "Prévision géolocalisée des interventions de secours, combinant données opérationnelles historiques et signaux météo dans un tableau de bord opérationnel.",

      'p.eyebrow': 'Prévision · dataviz · 2023 — 2024',
      'p.title': 'Predictops',
      'p.lead': "Prévoir où et quand les interventions de secours sont susceptibles de survenir, pour qu'un service puisse positionner ses moyens en amont de la demande plutôt que d'y réagir.",

      'p.facts.role.label': 'Rôle',
      'p.facts.role.value': "Appui au développement et intégration avec OptimOps",
      'p.facts.stack.label': 'Technologies',
      'p.facts.stack.value': 'Python · scikit-learn · Pandas · Vue 3 · Quasar · ECharts',
      'p.facts.scope.label': 'Périmètre',
      'p.facts.scope.value': "Ingénierie des variables, restitution des prévisions, intégration au tableau de bord",
      'p.facts.status.label': 'Statut',
      'p.facts.status.value': 'Livré — remplacé par la plateforme OptimOps',

      'p.context.title': 'Contexte',
      'p.context.body': "<p>La demande de secours n'est pas uniforme. Elle se concentre dans l'espace, dans le temps, et autour de certaines conditions — la météo en particulier déplace plusieurs catégories d'intervention de façon visible dans l'historique. Un service capable d'anticiper ce déplacement, même grossièrement, peut prépositionner ses équipes au lieu de les engager depuis là où elles se trouvent.</p><p>La prévision seule n'est pas le livrable. Une prédiction qui reste dans un carnet de calcul ne change rien : elle doit arriver là où la décision se prend.</p>",

      'p.built.title': "Ce que j'ai construit",
      'p.built.body': "<p>J'ai contribué au volet prévision — construction de variables à partir des historiques d'intervention et jointure avec les données météo, afin que le modèle apprenne la relation entre conditions et demande, à une résolution géographique plutôt qu'agrégée sur tout un territoire.</p><p>L'essentiel de ma contribution portait sur la restitution : construire les vues qui mettent les prévisions devant les opérateurs, et relier Predictops à OptimOps pour qu'une projection alimente l'interface où les décisions de couverture et de moyens se prenaient déjà.</p>",

      'p.decisions.title': 'Décisions techniques',
      'p.decisions.body': "<p><strong>Prévoir à une maille géographique, pas en moyenne territoriale.</strong> Un chiffre unique pour tout un territoire est exact et inutile : la demande se concentre, et toute la valeur de la prévision tient à savoir où. Conserver la résolution géographique a coûté en précision par maille mais a rendu le résultat exploitable.</p><p><strong>Traiter la météo comme un signal d'entrée, pas comme un cas particulier.</strong> La météo a été jointe dans la même chaîne de variables que le reste plutôt qu'ajoutée en correction séparée. Le modèle en est plus lisible, et l'ajout ultérieur d'autres signaux externes en devient direct.</p><p><strong>Intégrer plutôt qu'exister à côté.</strong> Relier Predictops à OptimOps comptait davantage que n'importe quel gain de précision : les opérateurs disposaient déjà d'un outil ouvert quotidiennement, et une prévision qui y apparaît est utilisée, contrairement à une prévision derrière une autre authentification.</p>",

      'p.outcome.title': 'Résultat',
      'p.outcome.body': "<p>Predictops a démontré que la prévision géolocalisée de la demande était viable sur l'historique opérationnel disponible, et le travail d'intégration a établi le motif qu'OptimOps a ensuite généralisé : prévisions et indicateurs partageant une même interface plutôt que vivant dans des outils séparés.</p><p>La plateforme a depuis été remplacée par OptimOps, qui en a absorbé le rôle.</p>",

      'p.nav.prev': 'Précédent : Reconnaissance multimodale des émotions',
      'p.nav.next': 'Suivant : Tableau de bord santé ARS',
    },
  },
```

- [ ] **Step 5: Add the ARS dictionary**

Note the status framing: this is a **proof of concept**, and the copy must not imply production use.

```js
  ars: {
    en: {
      'meta.title': 'ARS Health Dashboard — Thomas Chu',
      'meta.description': 'A proof-of-concept regional health-surveillance dashboard: emergency and hospitalisation indicators on an interactive map, built on a configurable widget architecture.',

      'p.eyebrow': 'Proof of concept · 2024',
      'p.title': 'ARS Health Dashboard',
      'p.lead': 'A proof of concept for regional health surveillance — and a deliberate test of whether the dashboard architecture built for emergency services would transfer to an entirely different domain.',

      'p.facts.role.label': 'Role',
      'p.facts.role.value': 'Full-stack — API, authentication, dashboard system',
      'p.facts.stack.label': 'Stack',
      'p.facts.stack.value': 'Python · Flask · MongoDB · JWT · Vue 3 · Quasar · Leaflet',
      'p.facts.scope.label': 'Scope',
      'p.facts.scope.value': 'Backend API, access control, map and indicator widgets, layout builder',
      'p.facts.status.label': 'Status',
      'p.facts.status.value': 'Proof of concept — not deployed to production',

      'p.context.title': 'Context',
      'p.context.body': '<p>Regional health authorities monitor indicators that behave much like operational emergency data: counts that vary by geography, by time and by population band, watched for the moment they depart from normal. The surface is different — emergency-room attendance and hospital admissions rather than vehicle dispatches — but the shape of the question is the same.</p><p>That similarity was the actual point of the project. The widget architecture built for OptimOps was a substantial investment, and an architecture is only worth what it is worth on the second problem.</p>',

      'p.built.title': 'What I built',
      'p.built.body': '<p>A Flask API backed by MongoDB, with token-based authentication, an administration layer for managing users, and transactional email for account flows. Indicator endpoints serve emergency attendance, hospital admissions and age-band breakdowns, with an external weather API joined in as a correlating signal.</p><p>On the frontend, a Vue 3 / Quasar application with Leaflet maps showing regional contours and per-area indicators, and the same three-part widget system as OptimOps: a registry of widget types and presets, per-widget data sources declaring how to fetch and transform their own payload, and a layout builder letting a user assemble a dashboard from the catalogue.</p>',

      'p.decisions.title': 'Engineering decisions',
      'p.decisions.body': '<p><strong>Port the architecture, not the code.</strong> Copying OptimOps\' implementation would have proved nothing except that copying works. Rebuilding on the same three-part pattern — registry, data sources, layout builder — against a different backend and a different domain vocabulary tested whether the *pattern* was sound, which is the only thing worth knowing.</p><p><strong>A different backend on purpose.</strong> OptimOps serves precomputed columnar files; this needed document storage and per-user state, so it uses Flask and MongoDB. Keeping the frontend architecture constant while changing the backend isolated the thing under test.</p><p><strong>Real authentication from the start.</strong> Unlike the interim role layer in OptimOps, health data justified token-based authentication and an admin layer up front, even in a proof of concept — the cost of adding it later is always higher than it looks.</p><p><strong>Stop at proof of concept.</strong> The project answered its question. Carrying it further would have meant committing to a product nobody had asked for, so it is presented as what it is.</p>',

      'p.outcome.title': 'Outcome',
      'p.outcome.body': '<p>The widget architecture transferred cleanly. Building a second dashboard on it took a fraction of the time the first had, and the friction that did appear was in domain vocabulary rather than in the pattern itself — which is the result I was hoping for.</p><p>It remains a proof of concept and was never deployed to production. Its value was the confirmation that the architecture generalises, which directly informed how the OptimOps widget system was structured afterwards.</p>',

      'p.nav.prev': 'Previous: Predictops',
      'p.nav.next': 'Back to work',
    },
    fr: {
      'meta.title': 'Tableau de bord santé ARS — Thomas Chu',
      'meta.description': "Une preuve de concept de veille sanitaire régionale : indicateurs d'urgences et d'hospitalisations sur une carte interactive, sur une architecture de composants configurables.",

      'p.eyebrow': 'Preuve de concept · 2024',
      'p.title': 'Tableau de bord santé ARS',
      'p.lead': "Une preuve de concept pour la veille sanitaire régionale — et un test délibéré : l'architecture de tableau de bord conçue pour les services de secours se transpose-t-elle à un domaine entièrement différent ?",

      'p.facts.role.label': 'Rôle',
      'p.facts.role.value': 'Full-stack — API, authentification, système de tableau de bord',
      'p.facts.stack.label': 'Technologies',
      'p.facts.stack.value': 'Python · Flask · MongoDB · JWT · Vue 3 · Quasar · Leaflet',
      'p.facts.scope.label': 'Périmètre',
      'p.facts.scope.value': "API backend, contrôle d'accès, composants carte et indicateurs, éditeur de disposition",
      'p.facts.status.label': 'Statut',
      'p.facts.status.value': 'Preuve de concept — non déployé en production',

      'p.context.title': 'Contexte',
      'p.context.body': "<p>Les agences régionales de santé suivent des indicateurs qui se comportent comme des données opérationnelles de secours : des effectifs qui varient selon la géographie, le temps et la tranche d'âge, surveillés pour le moment où ils s'écartent de la normale. La surface diffère — passages aux urgences et hospitalisations plutôt qu'engagements d'engins — mais la forme de la question est la même.</p><p>Cette similarité était le véritable objet du projet. Le registre de composants bâti pour OptimOps représentait un investissement conséquent, et une architecture ne vaut que ce qu'elle vaut sur le deuxième problème.</p>",

      'p.built.title': "Ce que j'ai construit",
      'p.built.body': "<p>Une API Flask adossée à MongoDB, avec authentification par jeton, une couche d'administration pour la gestion des comptes et l'envoi d'e-mails transactionnels. Les points d'entrée servent les passages aux urgences, les hospitalisations et les répartitions par tranche d'âge, avec une API météo externe jointe comme signal de corrélation.</p><p>Côté frontend, une application Vue 3 / Quasar avec des cartes Leaflet affichant les contours régionaux et les indicateurs par zone, et le même système de composants en trois parties qu'OptimOps : un registre des types et préréglages, des sources de données déclarant chacune comment récupérer et transformer sa charge utile, et un éditeur de disposition permettant à l'utilisateur de composer son tableau de bord à partir du catalogue.</p>",

      'p.decisions.title': 'Décisions techniques',
      'p.decisions.body': "<p><strong>Transposer l'architecture, pas le code.</strong> Copier l'implémentation d'OptimOps n'aurait prouvé que l'efficacité du copier-coller. Reconstruire sur le même motif en trois parties — registre, sources de données, éditeur de disposition — face à un autre backend et à un autre vocabulaire métier testait la solidité du <em>motif</em>, seule chose qu'il valait la peine de savoir.</p><p><strong>Un backend différent, volontairement.</strong> OptimOps sert des fichiers colonnaires précalculés ; ce projet demandait un stockage documentaire et un état par utilisateur, d'où Flask et MongoDB. Garder l'architecture frontend constante en changeant le backend isolait l'objet du test.</p><p><strong>Une vraie authentification dès le départ.</strong> Contrairement à la couche de rôles provisoire d'OptimOps, des données de santé justifiaient une authentification par jeton et une couche d'administration d'emblée, même en preuve de concept — le coût de l'ajouter plus tard est toujours plus élevé qu'il n'y paraît.</p><p><strong>S'arrêter à la preuve de concept.</strong> Le projet a répondu à sa question. Aller plus loin aurait signifié s'engager sur un produit que personne n'avait demandé : il est donc présenté pour ce qu'il est.</p>",

      'p.outcome.title': 'Résultat',
      'p.outcome.body': "<p>L'architecture de composants s'est transposée sans heurt. Construire un second tableau de bord dessus a demandé une fraction du temps du premier, et les frictions rencontrées venaient du vocabulaire métier et non du motif lui-même — c'est le résultat que j'espérais.</p><p>Le projet reste une preuve de concept et n'a jamais été déployé en production. Sa valeur tient à la confirmation que l'architecture se généralise, ce qui a directement orienté la structuration ultérieure du système de composants d'OptimOps.</p>",

      'p.nav.prev': 'Précédent : Predictops',
      'p.nav.next': 'Retour aux projets',
    },
  },
```

- [ ] **Step 6: Create the three HTML pages**

For each of `emotion-recognition`, `predictops` and `ars`: copy `projects/optimops.html` and change exactly these seven things.

| Page | `<title>` | canonical | `data-project` | `data-cover` | prev link | next link |
|---|---|---|---|---|---|---|
| `emotion-recognition.html` | `Multimodal Emotion Recognition — Thomas Chu` | `…/projects/emotion-recognition.html` | `emotion-recognition` | `emotion` | `kpi-engine.html` | `predictops.html` |
| `predictops.html` | `Predictops — Thomas Chu` | `…/projects/predictops.html` | `predictops` | `predictops` | `emotion-recognition.html` | `ars.html` |
| `ars.html` | `ARS Health Dashboard — Thomas Chu` | `…/projects/ars.html` | `ars` | `ars` | `predictops.html` | `../index.html#work` |

Also, on every page, set `<meta name="description">` to that page's English `meta.description`, and replace the static fallback text inside each `data-i18n` element with that page's English string. The fallback text is what a visitor sees if the module fails to load — it must never read "OptimOps" on the Predictops page.

- [ ] **Step 7: Run the tests to verify they pass**

Run: `node --test tests/project-pages.test.mjs`
Expected: PASS, 10/10.

Run: `npm run verify`
Expected: all PASS.

- [ ] **Step 8: Walk the whole chain in the browser**

From the homepage, click into each of the five cards, then walk the chain forward from `optimops` through to `ars` and back. Confirm on every page:
1. The cover motif matches the card that led there.
2. Both nav links resolve — no 404s anywhere in the chain.
3. `EN|FR` and the theme both persist across every navigation.
4. Static fallback text matches the page (disable JavaScript and reload one page to check this properly).
5. `document.documentElement.scrollWidth <= window.innerWidth` at 320, 768 and 1440px.

- [ ] **Step 9: Read all five pages in both languages**

The automated confidentiality test only catches known patterns. Read every page end to end in EN and FR and confirm: no client identity, no department or station name, no real operational figure, no academic voice, and no claim that ARS reached production.

- [ ] **Step 10: Commit**

```bash
git add js/i18n/projects.js projects/ tests/project-pages.test.mjs
git commit -m "feat: add emotion recognition, predictops and ars project pages"
```

---

### Task 13: Bachelor archive page

**Files:**
- Create: `js/i18n/archive.js`, `archive.html`
- Modify: `css/pages.css` (append archive styles)
- Test: `tests/archive.test.mjs`

**Interfaces:**
- Consumes: the page shell, `.rail--prose`, `.eyebrow`, `.reveal` from Task 4; `renderIcon` (Task 6); the `pageDict()` switch reading `data-page="archive"` (Task 4).
- Produces: `js/i18n/archive.js` exporting `archive: { en, fr }`; CSS classes `.archive-list`, `.archive-entry`, `.archive-entry__title`, `.archive-entry__text`, `.archive-entry__links`.
- Reports: `pages/BUT/rapports/*` is linked from here and must survive Task 15's deletions.

The six curated entries and the reports each links to:

| Entry | Reports linked |
|---|---|
| Kamisado | `SAE2.126final.gan`, `descriptionAlgo.pdf` |
| Covid-19 dashboard | `General_Report_CHU_Thomas_S4C1.pdf`, `Technical_Report_CHU_Thomas_S4C1.pdf` |
| E-commerce platform | `11_CDC.pdf`, `21_Analyse.pdf`, `21_Architecture.pdf` |
| Missing-token game | `descriptionAlgo.pdf` |
| Network services | `sae204_n°11.pdf` |
| Project management | `11_Gantt.pdf`, `11_PERT.pdf`, `11_Rapport_Economique.pdf` |

- [ ] **Step 1: Confirm every report file actually exists before linking it**

Run:

```bash
cd pages/BUT/rapports && ls -1 && cd -
```

Cross-check each filename in the table above against the listing. If a name differs (accents, case, spacing), use the real filename — a link to a file that does not exist is worse than no link. `sae204_n°11.pdf` contains a non-ASCII character; URL-encode it in the `href` as `sae204_n%C2%B011.pdf` and verify it resolves in the browser.

- [ ] **Step 2: Write the failing archive test**

`tests/archive.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { archive } from '../js/i18n/archive.js';
import { parityReport, LANGS, translate } from '../js/i18n/index.js';

const ENTRIES = ['kamisado', 'covid', 'ecommerce', 'token', 'network', 'management'];

test('the archive dictionary is at full FR/EN parity', () => {
  const report = parityReport(archive);
  assert.deepEqual(report.missingInEn, []);
  assert.deepEqual(report.missingInFr, []);
});

test('every curated entry has a title and a description in both languages', () => {
  for (const entry of ENTRIES) {
    for (const field of ['title', 'text']) {
      for (const lang of LANGS) {
        const key = `arch.${entry}.${field}`;
        assert.notEqual(translate(archive, lang, key), key, `missing ${lang}: ${key}`);
      }
    }
  }
});

test('archive copy carries no competency codes or semester numbers', () => {
  for (const lang of LANGS) {
    for (const [key, value] of Object.entries(archive[lang])) {
      assert.doesNotMatch(value, /\bS[1-6]\.\d/, `${lang}.${key} has a semester code`);
      assert.doesNotMatch(value, /\bC[1-6]\.\d/, `${lang}.${key} has a competency code`);
      assert.doesNotMatch(value, /\bSAE\b/i, `${lang}.${key} uses academic jargon`);
    }
  }
});

test('the page is wired to the archive dictionary and links home', async () => {
  const html = await readFile(new URL('../archive.html', import.meta.url), 'utf8');
  assert.match(html, /data-page="archive"/);
  assert.match(html, /href="index\.html#work"/);
});

test('every PDF the page links to exists on disk', async () => {
  const html = await readFile(new URL('../archive.html', import.meta.url), 'utf8');
  const hrefs = [...html.matchAll(/href="(pages\/BUT\/rapports\/[^"]+)"/g)].map((m) => m[1]);
  assert.ok(hrefs.length >= 6, `expected several report links, found ${hrefs.length}`);
  for (const href of hrefs) {
    const decoded = decodeURIComponent(href);
    await access(new URL(`../${decoded}`, import.meta.url));
  }
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `node --test tests/archive.test.mjs`
Expected: FAIL — `Cannot find module '../js/i18n/archive.js'`.

- [ ] **Step 4: Write `js/i18n/archive.js`**

The framing is honest and unapologetic: this is coursework, shown because some of it is interesting, not because it is headline work.

```js
export const archive = {
  en: {
    'meta.title': 'Bachelor coursework — Thomas Chu',
    'meta.description': 'A short selection of academic projects from a computer science bachelor, 2021–2024, with the original reports.',

    'arch.eyebrow': '2021 — 2024 · Bachelor coursework',
    'arch.title': 'Academic projects',
    'arch.lead': 'These are university projects from my computer science bachelor. They were built to a brief rather than to a need, and I have kept only the ones I still find interesting. The original reports are attached where they exist — several were written in French.',

    'arch.kamisado.title': 'Kamisado — a board game and its AI',
    'arch.kamisado.text': 'A full implementation of the board game Kamisado in Java and JavaFX on an MVC structure, playable between two humans or against the computer. The interesting part was the opponent: two distinct strategies, one greedy and one looking further ahead, which made the difference between search depth and playing strength concrete rather than theoretical.',

    'arch.covid.title': 'Covid-19 surveillance dashboard',
    'arch.covid.text': 'A dashboard pulling epidemiological data from a European API, processing it in Python and presenting it through a Vue interface with filtering, search and charts. My first encounter with the problem that has followed me since: the visualisation is quick, and the data cleaning is the project.',

    'arch.ecommerce.title': 'E-commerce platform — from requirements to database',
    'arch.ecommerce.text': 'Starting from a client brief, working through requirements analysis to a conceptual data model, then to SQL, then to a working Flask application. Doing the whole chain in order — rather than designing a schema and hoping it matched the need — is a discipline I still use.',

    'arch.token.title': 'The missing-token game',
    'arch.token.text': 'A terminal game with a unit-tested core and two AI algorithms, plus a performance comparison between them. Small, but it was where I learned that "which algorithm is faster" is a question you measure rather than argue about.',

    'arch.network.title': 'Network services and deployment',
    'arch.network.text': 'Provisioning and configuring the network services needed to deploy and host a web application, ending in an actual production deployment. Unglamorous, and the first time I understood how much of software delivery happens after the code is written.',

    'arch.management.title': 'Project management for the e-commerce build',
    'arch.management.text': 'The planning side of the same e-commerce project: specification, cost analysis, Gantt and PERT scheduling. Not engineering, but it made me considerably better at estimating how wrong my estimates are.',

    'arch.reports': 'Reports',
    'arch.back': 'Back to work',
    'arch.fr-note': 'French',
  },
  fr: {
    'meta.title': 'Projets académiques du BUT — Thomas Chu',
    'meta.description': "Une courte sélection de projets académiques d'un BUT informatique, 2021-2024, avec les rapports d'origine.",

    'arch.eyebrow': '2021 — 2024 · Projets académiques du BUT',
    'arch.title': 'Projets universitaires',
    'arch.lead': "Ce sont des projets universitaires issus de mon BUT informatique. Ils répondaient à un sujet imposé plutôt qu'à un besoin, et je n'ai gardé que ceux qui m'intéressent encore. Les rapports d'origine sont joints lorsqu'ils existent.",

    'arch.kamisado.title': 'Kamisado — un jeu de plateau et son IA',
    'arch.kamisado.text': "Une implémentation complète du jeu Kamisado en Java et JavaFX sur une structure MVC, jouable à deux ou contre l'ordinateur. L'intérêt était l'adversaire : deux stratégies distinctes, l'une gloutonne et l'autre anticipant davantage, ce qui a rendu concret — et non théorique — le rapport entre profondeur de recherche et niveau de jeu.",

    'arch.covid.title': 'Tableau de bord de veille Covid-19',
    'arch.covid.text': "Un tableau de bord récupérant des données épidémiologiques depuis une API européenne, les traitant en Python et les restituant dans une interface Vue avec filtrage, recherche et graphiques. Ma première rencontre avec le problème qui me suit depuis : la visualisation est rapide, et c'est le nettoyage des données qui constitue le projet.",

    'arch.ecommerce.title': "Plateforme e-commerce — du besoin à la base de données",
    'arch.ecommerce.text': "Partant d'un cahier des charges client, passer par l'analyse des besoins, un modèle conceptuel de données, puis le SQL, puis une application Flask fonctionnelle. Dérouler toute la chaîne dans l'ordre — plutôt que concevoir un schéma en espérant qu'il corresponde au besoin — est une discipline que j'applique encore.",

    'arch.token.title': 'Le jeu du jeton manquant',
    'arch.token.text': "Un jeu en terminal avec un cœur couvert par des tests unitaires et deux algorithmes d'IA, accompagnés d'une comparaison de performances. Modeste, mais c'est là que j'ai appris que « quel algorithme est le plus rapide » est une question qui se mesure plutôt qu'elle ne se discute.",

    'arch.network.title': 'Services réseau et déploiement',
    'arch.network.text': "Installation et configuration des services réseau nécessaires au déploiement et à l'hébergement d'une application web, jusqu'à une mise en production réelle. Ingrat, et première occasion de comprendre à quel point la livraison logicielle se joue après l'écriture du code.",

    'arch.management.title': "Gestion du projet e-commerce",
    'arch.management.text': "Le volet planification du même projet e-commerce : cahier des charges, analyse des coûts, planning Gantt et PERT. Ce n'est pas de l'ingénierie, mais cela m'a rendu bien meilleur pour estimer à quel point mes estimations sont fausses.",

    'arch.reports': 'Rapports',
    'arch.back': 'Retour aux projets',
    'arch.fr-note': 'Français',
  },
};
```

- [ ] **Step 5: Write `archive.html`**

Copy the shell from `index.html` (paths stay at the root level — no `../` prefix), set `<body data-page="archive">`, replace the anchor nav with a single back link, and use this `<main>`:

```html
<main id="content">
  <article class="project">
    <div class="rail rail--prose">
      <header class="project__head reveal">
        <p class="eyebrow" data-i18n="arch.eyebrow">2021 — 2024 · Bachelor coursework</p>
        <h1 class="project__title" data-i18n="arch.title">Academic projects</h1>
        <p class="project__lead" data-i18n="arch.lead">These are university projects from my computer science bachelor.</p>
      </header>

      <ol class="archive-list">
        <li class="archive-entry reveal">
          <h2 class="archive-entry__title" data-i18n="arch.kamisado.title">Kamisado — a board game and its AI</h2>
          <p class="archive-entry__text" data-i18n="arch.kamisado.text">A full implementation of Kamisado in Java and JavaFX.</p>
          <p class="archive-entry__links">
            <span class="eyebrow" data-i18n="arch.reports">Reports</span>
            <a href="pages/BUT/rapports/descriptionAlgo.pdf">descriptionAlgo.pdf</a>
            <a href="pages/BUT/rapports/SAE2.126final.gan">SAE2.126final.gan</a>
          </p>
        </li>

        <li class="archive-entry reveal">
          <h2 class="archive-entry__title" data-i18n="arch.covid.title">Covid-19 surveillance dashboard</h2>
          <p class="archive-entry__text" data-i18n="arch.covid.text">A dashboard pulling epidemiological data from a European API.</p>
          <p class="archive-entry__links">
            <span class="eyebrow" data-i18n="arch.reports">Reports</span>
            <a href="pages/BUT/rapports/General_Report_CHU_Thomas_S4C1.pdf">General report</a>
            <a href="pages/BUT/rapports/Technical_Report_CHU_Thomas_S4C1.pdf">Technical report</a>
          </p>
        </li>

        <li class="archive-entry reveal">
          <h2 class="archive-entry__title" data-i18n="arch.ecommerce.title">E-commerce platform — from requirements to database</h2>
          <p class="archive-entry__text" data-i18n="arch.ecommerce.text">From a client brief through to a working Flask application.</p>
          <p class="archive-entry__links">
            <span class="eyebrow" data-i18n="arch.reports">Reports</span>
            <a href="pages/BUT/rapports/11_CDC.pdf">11_CDC.pdf</a>
            <a href="pages/BUT/rapports/21_Analyse.pdf">21_Analyse.pdf</a>
            <a href="pages/BUT/rapports/21_Architecture.pdf">21_Architecture.pdf</a>
          </p>
        </li>

        <li class="archive-entry reveal">
          <h2 class="archive-entry__title" data-i18n="arch.token.title">The missing-token game</h2>
          <p class="archive-entry__text" data-i18n="arch.token.text">A terminal game with a unit-tested core and two AI algorithms.</p>
          <p class="archive-entry__links">
            <span class="eyebrow" data-i18n="arch.reports">Reports</span>
            <a href="pages/BUT/rapports/descriptionAlgo.pdf">descriptionAlgo.pdf</a>
          </p>
        </li>

        <li class="archive-entry reveal">
          <h2 class="archive-entry__title" data-i18n="arch.network.title">Network services and deployment</h2>
          <p class="archive-entry__text" data-i18n="arch.network.text">Provisioning the services needed to deploy and host a web application.</p>
          <p class="archive-entry__links">
            <span class="eyebrow" data-i18n="arch.reports">Reports</span>
            <a href="pages/BUT/rapports/sae204_n%C2%B011.pdf">sae204_n°11.pdf</a>
          </p>
        </li>

        <li class="archive-entry reveal">
          <h2 class="archive-entry__title" data-i18n="arch.management.title">Project management for the e-commerce build</h2>
          <p class="archive-entry__text" data-i18n="arch.management.text">Specification, cost analysis, Gantt and PERT scheduling.</p>
          <p class="archive-entry__links">
            <span class="eyebrow" data-i18n="arch.reports">Reports</span>
            <a href="pages/BUT/rapports/11_Gantt.pdf">11_Gantt.pdf</a>
            <a href="pages/BUT/rapports/11_PERT.pdf">11_PERT.pdf</a>
            <a href="pages/BUT/rapports/11_Rapport_Economique.pdf">11_Rapport_Economique.pdf</a>
          </p>
        </li>
      </ol>

      <nav class="project__nav" aria-label="Page navigation">
        <a href="index.html#work" data-i18n="arch.back">Back to work</a>
      </nav>
    </div>
  </article>
</main>
```

- [ ] **Step 6: Append archive styles to `css/pages.css`**

```css
/* ---- Archive ---- */
.archive-list { display: flex; flex-direction: column; gap: var(--space-6); }

.archive-entry {
  max-width: none;
  padding-block-end: var(--space-6);
  border-block-end: 1px solid var(--border);
}
.archive-entry:last-child { border-block-end: 0; padding-block-end: 0; }

.archive-entry__title { font-size: var(--fs-h3); margin-block-end: var(--space-3); }
.archive-entry__text { color: var(--text-muted); }

.archive-entry__links {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-2) var(--space-4);
  margin-block-start: var(--space-4);
  max-width: none;
  font-size: var(--fs-small);
}
.archive-entry__links a { font-family: var(--font-mono); font-size: var(--fs-mono); }
```

- [ ] **Step 7: Run the tests to verify they pass**

Run: `node --test tests/archive.test.mjs`
Expected: PASS, 5/5.

Run: `npm run verify`
Expected: all PASS; `archive` no longer reports SKIP.

- [ ] **Step 8: Verify in the browser**

Open `http://localhost:8000/archive.html`. Confirm:
1. The archive rule at the bottom of the homepage's work section reaches it.
2. Every report link opens the PDF — click **all** of them, including the accented `sae204_n°11.pdf`.
3. `EN|FR` swaps all six entries and the lead paragraph.
4. Reading it, nothing sounds like coursework prose — no competency codes, no semester numbers.
5. `document.documentElement.scrollWidth <= window.innerWidth` at 320, 768 and 1440px.

- [ ] **Step 9: Commit**

```bash
git add js/i18n/archive.js archive.html css/pages.css tests/archive.test.mjs
git commit -m "feat: add curated bachelor coursework archive"
```

---

### Task 14: Metadata, 404 page and README

**Files:**
- Create: `404.html`, `README.md`
- Modify: all seven HTML pages (Open Graph, Twitter, `theme-color` pair)
- Modify: `index.html` (JSON-LD `Person`)
- Test: `tests/metadata.test.mjs`

**Interfaces:**
- Consumes: every page created in Tasks 4, 11, 12, 13.
- Produces: `404.html`; `README.md` documenting local preview and the verification commands.

- [ ] **Step 1: Write the failing metadata test**

`tests/metadata.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const PAGES = [
  'index.html',
  'archive.html',
  '404.html',
  'projects/optimops.html',
  'projects/kpi-engine.html',
  'projects/emotion-recognition.html',
  'projects/predictops.html',
  'projects/ars.html',
];

const read = (page) => readFile(new URL(`../${page}`, import.meta.url), 'utf8');

test('every page has a unique title and description', async () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const page of PAGES) {
    const html = await read(page);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert.ok(title, `${page}: no <title>`);
    assert.ok(description, `${page}: no description`);
    assert.ok(!titles.has(title), `${page}: duplicate title "${title}"`);
    assert.ok(!descriptions.has(description), `${page}: duplicate description`);
    titles.add(title);
    descriptions.add(description);
  }
});

test('every page declares canonical, Open Graph and both theme colours', async () => {
  for (const page of PAGES) {
    const html = await read(page);
    assert.match(html, /<link rel="canonical" href="https:\/\/gitgudshu\.github\.io\//, `${page}: canonical`);
    assert.match(html, /property="og:title"/, `${page}: og:title`);
    assert.match(html, /property="og:description"/, `${page}: og:description`);
    assert.match(html, /property="og:url"/, `${page}: og:url`);
    assert.match(html, /name="twitter:card"/, `${page}: twitter:card`);
    assert.match(html, /media="\(prefers-color-scheme: light\)"/, `${page}: light theme-color`);
    assert.match(html, /media="\(prefers-color-scheme: dark\)"/, `${page}: dark theme-color`);
  }
});

test('every page carries the theme-flash script and exactly one inline script', async () => {
  for (const page of PAGES) {
    const html = await read(page);
    const inline = html.match(/<script(?![^>]*\bsrc=)[^>]*>/g) ?? [];
    const ld = html.match(/<script type="application\/ld\+json">/g) ?? [];
    assert.equal(
      inline.length - ld.length, 1,
      `${page}: expected exactly one non-JSON-LD inline script, found ${inline.length - ld.length}`,
    );
    assert.match(html, /localStorage\.getItem\('tc-theme'\)/, `${page}: no theme-flash guard`);
  }
});

test('the homepage carries a JSON-LD Person block with no contact details', async () => {
  const html = await read('index.html');
  const block = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(block, 'no JSON-LD block');
  const data = JSON.parse(block);
  assert.equal(data['@type'], 'Person');
  assert.equal(data.name, 'Thomas Chu');
  assert.ok(Array.isArray(data.sameAs) && data.sameAs.length === 2);
  const serialised = JSON.stringify(data);
  assert.doesNotMatch(serialised, /@gmail|@edu\.univ|0628561781|Impasse/, 'contact details leaked into structured data');
});

test('the 404 page links home and is not indexed', async () => {
  const html = await read('404.html');
  assert.match(html, /href="\/index\.html"|href="\/"/);
  assert.match(html, /name="robots" content="noindex"/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/metadata.test.mjs`
Expected: FAIL — `ENOENT` on `404.html`.

- [ ] **Step 3: Add the metadata block to every page**

In each of the eight pages, replace the single `<meta name="theme-color">` line with this block, substituting that page's own title, description and URL:

```html
<meta name="theme-color" content="#E9E4F0" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#100D16" media="(prefers-color-scheme: dark)">

<meta property="og:type" content="website">
<meta property="og:site_name" content="Thomas Chu">
<meta property="og:title" content="PAGE TITLE HERE">
<meta property="og:description" content="PAGE DESCRIPTION HERE">
<meta property="og:url" content="https://gitgudshu.github.io/PAGE-PATH-HERE">
<meta property="og:image" content="https://gitgudshu.github.io/assets/portrait.jpg">
<meta property="og:image:alt" content="Thomas Chu">
<meta name="twitter:card" content="summary">
```

These are the only two hardcoded colour values outside `css/tokens.css`. That is unavoidable — `theme-color` cannot read a custom property. Keep them in sync with `--bg` in both themes; if a token changes, these change too.

- [ ] **Step 4: Add JSON-LD to `index.html`**

Immediately before `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Thomas Chu",
  "jobTitle": "Data Scientist & AI Engineer",
  "url": "https://gitgudshu.github.io/",
  "image": "https://gitgudshu.github.io/assets/portrait.jpg",
  "affiliation": { "@type": "Organization", "name": "FEMTO-ST" },
  "alumniOf": { "@type": "CollegeOrUniversity", "name": "UTBM" },
  "knowsLanguage": ["en", "fr"],
  "sameAs": [
    "https://github.com/GitGudShu",
    "https://www.linkedin.com/in/thomas-chu-259702235/"
  ]
}
</script>
```

No email, no phone, no address — structured data is machine-harvested first and read by humans second.

- [ ] **Step 5: Write `404.html`**

Copy the `archive.html` shell (root-level paths), set `<body data-page="404">`, add `<meta name="robots" content="noindex">`, and use:

```html
<main id="content">
  <section class="section">
    <div class="rail rail--prose">
      <p class="eyebrow">404</p>
      <h1 class="project__title">This page doesn't exist</h1>
      <p class="project__lead">The link may be out of date, or I may have moved something. The work is all still here.</p>
      <p>
        <a class="btn btn--primary" href="/index.html#work">Back to work</a>
      </p>
    </div>
  </section>
</main>
```

`404.html` stays English-only and needs no dictionary — `pageDict()` returns `null` for an unrecognised `data-page`, so only the shared `common` strings apply, which is correct.

- [ ] **Step 6: Write `README.md`**

````markdown
# GitGudShu.github.io

Personal portfolio of Thomas Chu — data scientist and AI engineer.

Static site: HTML, CSS and vanilla JavaScript ES modules. No build step, no
bundler, no runtime dependencies. Deploys by pushing to `main`.

## Local preview

ES modules do not load over `file://`, so **opening `index.html` by
double-clicking will not work** — the page will render without styling or
behaviour. Serve it over HTTP instead:

```bash
python -m http.server 8000
# then open http://localhost:8000/
```

GitHub Pages serves modules correctly, so this only affects local preview.

## Verification

Node 24+ is required for the test runner. There is nothing to install.

```bash
npm run verify        # everything below
npm test              # unit tests (node --test)
npm run check:i18n    # FR/EN key parity across all dictionaries
npm run check:contrast # WCAG AA on every token pair, both themes
```

## Structure

```
index.html            Hero · About · Work · Beyond the work · Résumé · Contact
projects/*.html       One page per flagship project
archive.html          Curated bachelor coursework
css/
  tokens.css          All colour, type, space and motion tokens. Both themes.
                      The ONLY file allowed to contain a colour literal.
  base.css            Reset, base typography, focus, reduced-motion
  layout.css          Rail, sections, header, footer
  components.css      Buttons, chips, cards, timeline, panels
  pages.css           Hero, project detail, archive
js/
  main.js             Per-page entry point
  theme.js            Theme resolution and the view-transition toggle
  i18n/               Engine plus one dictionary per page
  nav.js reveal.js particles.js
  covers.js icons.js  Inline SVG, all currentColor
  data/projects.js    Project card metadata
tools/                Zero-dependency checkers and the one-off portrait crop
tests/                Unit tests for the pure modules
```

## Conventions

- **Colour lives only in `css/tokens.css`.** Everything else uses `var(--…)`.
  The two `theme-color` meta tags are the single documented exception.
- **FR/EN parity is enforced.** Adding a string in one language without the
  other fails `npm run check:i18n`.
- **Motion respects `prefers-reduced-motion`.** The particle canvas is removed
  entirely, not merely paused.
- **No phone number and no street address** appear anywhere on the site.

## Adding a project

1. Add an entry to `js/data/projects.js`.
2. Add `work.<slug>.{role,year,title,summary}` to `js/i18n/home.js`, both languages.
3. Add a cover motif to `js/covers.js` (or reuse one).
4. Add a dictionary to `js/i18n/projects.js` with the full key contract.
5. Copy an existing page in `projects/`, change the seven page-specific values.
6. Fix the prev/next chain on the neighbouring pages.
7. `npm run verify`.
````

- [ ] **Step 7: Run the tests to verify they pass**

Run: `node --test tests/metadata.test.mjs`
Expected: PASS, 5/5.

Run: `npm run verify`
Expected: all PASS.

- [ ] **Step 8: Verify the social preview and the 404**

1. Paste a page's raw HTML into any Open Graph preview validator, or inspect the `og:` tags directly, and confirm the title, description and image resolve.
2. Visit `http://localhost:8000/does-not-exist` — the local server will not serve `404.html` automatically, so open `http://localhost:8000/404.html` directly and confirm it renders with the shell, correct theme, and a working back link. GitHub Pages serves it automatically for missing paths.

- [ ] **Step 9: Commit**

```bash
git add 404.html README.md index.html archive.html projects/ tests/metadata.test.mjs
git commit -m "feat: add metadata, 404 page and project README"
```

---

### Task 15: Remove the old site and run the full verification sweep

**Files:**
- Delete: `css/style.css`, `js/script.js`, `pages/BUT/home.html`, `pages/BUT/pages/*.html` (11 files), `assets/images/Logo_dark.png`, `assets/images/Logo_light.png`, `assets/images/Thumbs.db`, `assets/images/but/Optimops_DBv1.mwb`
- Create: `tests/no-legacy.test.mjs`

**Interfaces:**
- Consumes: everything built in Tasks 1–14.
- Produces: a clean tree and a signed-off verification record.

**Deletion is the last step for a reason:** every one of these files is referenced by the site being replaced. Removing them earlier would have broken intermediate states and made bisecting a regression harder.

- [ ] **Step 1: Confirm nothing still references the files about to be deleted**

Run:

```bash
grep -rniE 'style\.css|js/script\.js|Logo_dark|Logo_light|Thumbs\.db|Optimops_DBv1|BUT/home\.html|BUT/pages/' \
  index.html archive.html 404.html projects/ css/ js/ README.md
```

Expected: **no output.** Any hit must be fixed before deleting — deleting a file something still links to turns a working page into a 404.

- [ ] **Step 2: Write the failing regression guard**

`tests/no-legacy.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const GONE = [
  'css/style.css',
  'js/script.js',
  'pages/BUT/home.html',
  'assets/images/Logo_dark.png',
  'assets/images/Logo_light.png',
  'assets/images/Thumbs.db',
  'assets/images/but/Optimops_DBv1.mwb',
];

const KEPT = [
  'CV-FR.pdf',
  'favicon.svg',
  'assets/hero.jpg',
  'assets/portrait.jpg',
  'assets/images/profile.png',
];

const exists = async (path) => {
  try {
    await access(new URL(`../${path}`, import.meta.url));
    return true;
  } catch {
    return false;
  }
};

test('every legacy file is gone', async () => {
  for (const path of GONE) {
    assert.equal(await exists(path), false, `${path} should have been deleted`);
  }
});

test('the old per-project BUT pages are gone', async () => {
  assert.equal(await exists('pages/BUT/pages'), false, 'pages/BUT/pages should be deleted');
});

test('every retained asset survived', async () => {
  for (const path of KEPT) {
    assert.equal(await exists(path), true, `${path} must not be deleted`);
  }
});

test('all bachelor reports survived', async () => {
  const files = await readdir(new URL('../pages/BUT/rapports', import.meta.url));
  assert.ok(files.length >= 18, `expected the full report set, found ${files.length}`);
});

test('no stylesheet outside tokens.css contains a colour literal', async () => {
  const files = await readdir(new URL('../css', import.meta.url));
  for (const file of files) {
    if (file === 'tokens.css') continue;
    const css = await readFile(new URL(`../css/${file}`, import.meta.url), 'utf8');
    const literals = css.match(/#[0-9a-fA-F]{3,8}\b|\brgba?\([^)]*\)|\bhsla?\([^)]*\)/g) ?? [];
    // color-mix() with #000000 for dark shadows is confined to tokens.css.
    assert.deepEqual(literals, [], `${file} contains colour literals: ${literals.join(', ')}`);
  }
});
```

- [ ] **Step 3: Run the guard to verify it fails**

Run: `node --test tests/no-legacy.test.mjs`
Expected: FAIL — `css/style.css should have been deleted`.

- [ ] **Step 4: Delete the legacy files**

```bash
git rm css/style.css js/script.js
git rm pages/BUT/home.html
git rm -r pages/BUT/pages
git rm assets/images/Logo_dark.png assets/images/Logo_light.png
git rm assets/images/Thumbs.db
git rm assets/images/but/Optimops_DBv1.mwb
```

- [ ] **Step 5: Run the guard to verify it passes**

Run: `node --test tests/no-legacy.test.mjs`
Expected: PASS, 5/5.

Run: `npm run verify`
Expected: everything PASS.

- [ ] **Step 6: Confirm the report set is intact**

Run: `ls -1 pages/BUT/rapports | wc -l`
Expected: the same count as before Task 15 (18 files at the time of writing). If it dropped, restore with `git checkout HEAD -- pages/BUT/rapports`.

- [ ] **Step 7: Responsive sweep — all pages, all widths**

For each of the eight pages, at each of 320, 360, 390, 414, 480, 600, 768, 834, 1024, 1280, 1440 and 1920px, run in the console:

```js
console.log(window.innerWidth, document.documentElement.scrollWidth <= window.innerWidth);
```

Expected: `true` at every width on every page. Record any `false` and fix it before proceeding — this is the hard requirement from the spec, not a nice-to-have.

Also confirm at 740×360 (landscape phone) that the homepage hero fits within one viewport height.

- [ ] **Step 8: Theme sweep**

Load every page in both themes. Confirm no element renders with an obviously wrong colour, and in particular that the frosted navbar, card borders, the timeline rail, the portrait ring and every cover motif read correctly in **both**.

- [ ] **Step 9: Bilingual sweep**

Load every page in both languages. Confirm:
- No raw key (a string like `p.context.body`) is visible anywhere.
- No English text remains when FR is selected, and vice versa.
- `document.documentElement.lang` matches the selection on every page.
- The language choice persists across every navigation and a reload.

- [ ] **Step 10: Accessibility sweep**

On the homepage and one project page:
1. Tab from the top: the skip link appears first and works.
2. Every interactive element shows a visible focus ring.
3. The collapsed nav panel traps focus, closes on `Escape`, and returns focus to the toggle.
4. The placeholder card is not focusable.
5. Run an automated audit (Lighthouse or axe) — accessibility score 100, zero violations. Fix anything reported.

- [ ] **Step 11: Reduced-motion and touch sweep**

With `prefers-reduced-motion: reduce` emulated, load every page and confirm `document.getElementById('particles') === null` and that all content is visible without scrolling-triggered animation. Repeat under a touch device profile.

- [ ] **Step 12: Link sweep**

Click every link on every page: nav, cards, archive rule, all prev/next, every PDF in the archive, `CV-FR.pdf` from both places, GitHub and LinkedIn. Confirm zero 404s.

- [ ] **Step 13: Console sweep**

Load all eight pages in both languages and both themes. Expected: **zero errors and zero warnings** in the console. A warning is a defect here, not noise.

- [ ] **Step 14: Privacy sweep**

Run:

```bash
grep -rniE '0628561781|06 28 56|impasse|marie richard|70200|google\.[a-z.]*/maps' . \
  --exclude-dir=.git --exclude-dir=docs --exclude=*.pdf
```

Expected: **no output.** Anything found must be removed before this task is complete.

- [ ] **Step 15: Commit**

```bash
git add -A
git commit -m "chore: remove legacy site and add regression guards"
```

- [ ] **Step 16: Record the verification results**

Report the actual outcome of Steps 6–14 — not "all checks pass", but what each sweep returned, including anything that failed and had to be fixed. If any step was skipped, say which and why. Do not report the rebuild complete until every step above has actually been run.

---

## Notes for the executor

- **Do not push.** Every task commits locally. Pushing to `main` publishes to the live site and is the user's decision, not the plan's.
- **The site is broken between Task 4 and Task 15 in a specific way:** the old `index.html` is replaced in Task 4, so from that point until Task 15 the tree contains both the new site and orphaned legacy files. That is expected.
- **If a browser-verification step fails,** fix it inside that task rather than deferring — later tasks build on the assumption that earlier ones render correctly.
- **If a French string reads like machine translation,** rewrite it. The parity checker verifies that a string exists, not that it is good. A French recruiter reading stilted French is worse than a French recruiter reading English.
