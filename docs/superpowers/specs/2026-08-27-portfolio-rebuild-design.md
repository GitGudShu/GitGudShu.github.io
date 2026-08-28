# Portfolio Rebuild — Design Spec

- **Date:** 2026-08-27
- **Repo:** `GitGudShu.github.io` (GitHub Pages, served from `main` root)
- **Status:** Approved for planning

## 1. Goal

Replace the existing portfolio entirely — visual language, information
architecture and code — with a site that presents Thomas Chu as a pragmatic
data scientist / AI engineer. The only things carried over are the subject
matter (rewritten) and the lavender-twilight colour identity (re-tuned).

The current site fails on four counts:

1. **Hidden content.** Projects, Résumé and Contact live behind tabs, so two
   thirds of the site is invisible to anyone who does not click.
2. **Academic voice.** Project write-ups were authored to satisfy a Bachelor
   jury — exhaustive descriptions with named competency codes. They read as
   coursework, not as evidence of employability.
3. **Sloppy markup.** A single 416-line `index.html` with inline `style`
   attributes, duplicated inline SVG, `alt="HTML5"` on every skill icon, a
   commented-out form, and an empty `<p>` in the footer.
4. **Inconsistent assets.** `assets/images/` mixes 3840×2160 screenshots,
   500×500 mascots, unrelated `.svg` logos, a `.mwb` MySQL Workbench file and
   a `Thumbs.db`.

## 2. Decisions taken

| Question | Decision |
|---|---|
| Site structure | Multi-page: homepage hub + one page per flagship project + archive |
| Homepage navigation | Single scrolling page with sticky anchor nav — **tabs removed** |
| Flagship projects | OptimOps Neo, KPI Engine, Emotion Recognition, Predictops, ARS |
| OptimOps confidentiality | Technical detail (architecture, scale, decisions); **no client data**, no real figures, no production screenshots |
| Project imagery | Hand-authored abstract SVG covers in theme tokens |
| Build tooling | No build step. HTML + CSS + vanilla JS, modularised |
| Bilingual scope | Full FR/EN parity on every page; **EN default** |
| Typography | Fraunces (display) + Manrope (body/UI) + JetBrains Mono (chips/figures) |
| Hobbies | Three-panel section on the homepage |
| Light theme | "Dusk" — noticeably dimmer than white |
| Contact privacy | Email + city + socials. **No phone, no street address** |
| Bachelor archive | Quiet rule-and-link below the project grid |
| Navbar | Frosted glass — semi-transparent + backdrop blur, opaque fallback |
| Responsive | Fluid, verified 320px → 1920px |

## 3. Visual system

### 3.1 Colour tokens

Defined once in `css/tokens.css` on `:root` (light) and overridden under both
`[data-theme="dark"]` and `@media (prefers-color-scheme: dark)` guarded by
`:root:not([data-theme="light"])`, so a visitor's system preference works
before JS runs and the explicit toggle wins in both directions.

**Dark — the primary identity:**

| Token | Value | Role |
|---|---|---|
| `--bg` | `#100D16` | page |
| `--surface` | `#17131F` | cards |
| `--surface-raised` | `#1E1929` | hovered cards, nav panel |
| `--border` | `#2C2438` | hairlines |
| `--border-strong` | `#3D3350` | hover/focus borders |
| `--text` | `#E8E3F0` | body |
| `--text-muted` | `#A79FB8` | secondary |
| `--text-faint` | `#857C95` | eyebrows, meta |
| `--accent` | `#B9A5FF` | links, accents |
| `--accent-strong` | `#CDBCFF` | hover |
| `--accent-contrast` | `#1B1330` | text on accent fills |

**Light — "dusk":**

| Token | Value | Role |
|---|---|---|
| `--bg` | `#E9E4F0` | page |
| `--surface` | `#F2EEF7` | cards |
| `--surface-raised` | `#F8F5FB` | hovered cards |
| `--border` | `#D3CADF` | hairlines |
| `--border-strong` | `#BCAFCE` | hover/focus borders |
| `--text` | `#262029` | body |
| `--text-muted` | `#5B5366` | secondary |
| `--text-faint` | `#6B6379` | eyebrows, meta |
| `--accent` | `#5F4EB8` | links, accents |
| `--accent-strong` | `#4B3B9E` | hover |
| `--accent-contrast` | `#FFFFFF` | text on accent fills |

**Contrast requirement:** every text/background pair used in the build must
meet WCAG AA (4.5:1 body, 3:1 for large text ≥24px). `--text-faint` on `--bg`
is the tightest pair in both themes and must be checked explicitly; if it
fails, darken/lighten `--text-faint` rather than enlarging the type.

Additional tokens: `--radius-sm: 8px`, `--radius-md: 14px`, `--radius-lg: 22px`,
`--radius-full: 999px`; `--shadow-card`, `--shadow-nav`, `--glow-accent`;
motion tokens `--ease: cubic-bezier(.22,1,.36,1)`, `--dur-fast: 160ms`,
`--dur: 320ms`, `--dur-slow: 520ms`.

### 3.2 Typography

Loaded from Google Fonts with `preconnect` and `display=swap`:

- **Fraunces** — variable, axes `opsz 9..144, wght 400..700, SOFT 0..100,
  WONK 0..1`. Used at `SOFT 40, WONK 0`: soft optical serif without the quirk.
  Headings only.
- **Manrope** — 400/500/700. Body, UI, buttons, nav.
- **JetBrains Mono** — 400/500. Tech chips, dates, eyebrows, figures, the
  hero stack strip.

Every family gets a real fallback stack (`Fraunces, "Iowan Old Style", Georgia,
serif` / `Manrope, "Segoe UI", system-ui, sans-serif` / `"JetBrains Mono",
ui-monospace, "Cascadia Code", monospace`).

Scale is fluid via `clamp()`, not fixed breakpoint jumps:

| Token | Value |
|---|---|
| `--fs-display` | `clamp(2.6rem, 1.6rem + 4.4vw, 5rem)` |
| `--fs-h1` | `clamp(2.1rem, 1.5rem + 2.6vw, 3.4rem)` |
| `--fs-h2` | `clamp(1.6rem, 1.3rem + 1.4vw, 2.3rem)` |
| `--fs-h3` | `clamp(1.15rem, 1.05rem + .5vw, 1.45rem)` |
| `--fs-body` | `clamp(.95rem, .92rem + .18vw, 1.05rem)` |
| `--fs-small` | `.875rem` |
| `--fs-mono` | `.78rem` (`letter-spacing: .06em`, `text-transform: uppercase` for eyebrows) |

Line lengths capped at `65ch` for prose. Headings `line-height: 1.12`, body `1.65`.

### 3.3 Spacing and rail

8px base grid. Section spacing `clamp(3.5rem, 2rem + 6vw, 6rem)`. Content rail
`max-width: 1100px` with `padding-inline: clamp(1.15rem, .6rem + 2.4vw, 2.5rem)`.
Project-page prose rail narrows to `720px`.

### 3.4 Logo

`assets/images/Logo_dark.png` and `Logo_light.png` are removed. Replaced by an
inline SVG monogram (`TC` lockup in Fraunces outlines) plus a wordmark, both
using `currentColor` so a single markup path serves both themes and stays sharp
at any density.

## 4. Information architecture

```
index.html          Hero · About · Work · Beyond the work · Résumé · Contact
projects/
  optimops.html
  kpi-engine.html
  emotion-recognition.html
  predictops.html
  ars.html
archive.html        Bachelor coursework, curated
404.html
```

Sticky top bar on every page: monogram → anchor/page nav → `EN | FR` → theme
toggle. On project and archive pages the anchor nav is replaced by a single
"← Back to work" affordance plus the same two toggles.

## 5. Homepage anatomy

### 5.1 Hero

Asymmetric two-column at ≥900px, stacked below.

- **Left:** mono eyebrow `DATA SCIENTIST · AI ENGINEER`; name in `--fs-display`
  Fraunces; positioning line — *"I build decision-support systems where the hard
  part is the data, not the dashboard."*; a short paragraph naming the
  apprenticeship (UTBM) and the lab team (AIMOS, FEMTO-ST); then two chips
  (email, location) and two buttons (`View my work`, `Download CV`).
- **Right:** `assets/portrait.jpg` — a square crop of `assets/hero.jpg` framed at
  `--radius-lg` with a lavender gradient ring and a soft accent glow.
- **Below both:** a thin mono strip listing the core stack.

**Portrait crop:** `assets/hero.jpg` is 1024×683. Crop the box
`(125, 75) → (705, 655)` — 580×580 — which frames the subject's face, hands and
the full guitar body including the neck, and excludes the two other musicians.
Resample to 720×720 with Lanczos, save as `assets/portrait.jpg` quality 88,
progressive. The original `hero.jpg` is retained untouched.

### 5.2 About

Two columns at ≥760px: prose left, a facts list right (location, current role,
current focus). Prose rewritten from scratch — pragmatic, first person, no
mascot references, no "aspiring" hedging.

### 5.3 Work

Responsive grid of six cards:

| # | Project | Cover motif |
|---|---|---|
| 1 | OptimOps Neo | Hex coverage grid, cells pulsing at different phases |
| 2 | KPI Engine | Star-schema — central fact node, radiating dimension nodes |
| 3 | Emotion Recognition | Layered waveform over a spectrum band |
| 4 | Predictops | Forecast line with a confidence band and drop glyphs |
| 5 | ARS | Region contour with an indicator pulse |
| 6 | Writing in progress | `assets/images/profile.png` (takodachi) inside a dotted frame |

Card anatomy: cover → mono eyebrow (`role · year`) → title → one-line summary →
tech chips. Whole card is one link (a single `<a>` wrapping the content, not the
old `.state-layer` overlay-anchor trick, which broke text selection and gave
screen readers an unlabelled link).

Card 6 is not a link; it is presented as a placeholder with `aria-disabled`.

Below the grid, a hairline rule then the archive line:

```
2021–2024 · Bachelor coursework
Selected academic projects                              →
```

Muted colour, no card treatment, no hover lift — only the arrow and an
underline animate.

### 5.4 Beyond the work

Three panels — Composing, Game dev, Martial arts — each with a custom SVG motif
(staff + waveform / pixel-grid controller / kamae silhouette), a heading and two
lines. Each panel markup includes an optional link slot, unused for now, so a
SoundCloud or itch.io URL can be dropped in later without restructuring.

### 5.5 Résumé

Vertical timeline on a thin accent rail with node dots.

**Experience**
- Data Scientist — FEMTO-ST, **AIMOS team** · 2023 – present
- Research Assistant Intern — University of Portsmouth · 2023

**Education**
- Engineering Degree in Computer Science — **UTBM**, Belfort · 2024 – present *(apprenticeship)*
- Bachelor of Computer Science (BUT) — IUT Nord Franche-Comté, Belfort · 2021 – 2024
- CPGE — Lycée Victor Hugo, Besançon · 2019 – 2021
- Scientific Baccalaureate — Lycée Georges Colomb, Lure · 2016 – 2019

**Skills** — the arbitrary logo grid is removed (VS Code and GitHub are not
skills). Replaced by four categorised groups of mono chips: *Data & ML*,
*Backend*, *Frontend*, *Data engineering & Ops*.

CV download links `CV-FR.pdf`. The markup includes a second, commented-out slot
for `CV-EN.pdf` so it can be enabled by uncommenting when that file exists.

### 5.6 Contact

Email (both addresses), city + "open to relocation", GitHub, LinkedIn. The
phone number, street address and Google Maps link are **removed**. The two
social SVGs are extracted from inline markup into `js/icons.js` so they are
defined once.

## 6. Project page template

One template, five instances. Order:

1. Mono eyebrow — `role · year · status`
2. Title (Fraunces `--fs-h1`)
3. One-paragraph framing
4. Facts rail — Role / Stack / Scope / Status (4 columns → 2 → 1)
5. **Context** — the real-world problem
6. **What I built** — scope and surface
7. **Engineering decisions** — the trade-offs, the part that gets him hired
8. **Outcome** — what changed
9. Prev/next project footer nav

Prose rail `720px`. The full-bleed SVG cover motif sits between the title block
and the facts rail.

### 6.1 Content boundaries per project

**OptimOps Neo** — Full-stack decision-support platform for a French fire &
rescue service. FastAPI backend serving a Parquet-backed in-process KPI cache;
Vue 3 / Quasar SPA with a configurable widget/dashboard system (registry,
context rules, per-widget datasources); scenario simulation; a background-threaded
optimizer with SQLite-persisted task state polled from the front end; an interim
header-based RBAC layer with a documented Keycloak migration seam.
*Permitted:* architecture, patterns, scale in round terms, engineering
trade-offs. *Forbidden:* real intervention counts, CIS or department names,
screenshots of production data, any figure sourced from client data.

**KPI Engine** — The rebuilt indicator engine. Frame around the audit narrative:
a legacy engine whose data path hopped through four formats, ~152 catalogued
transformations with one sweep-line pattern reimplemented roughly nine times,
divergent nomenclatures, and no test asserting a single KPI value. The rebuild
is a star-schema engine with a validated Parquet input contract, fail-fast
loading, a single formalised publish step, and a regression harness that runs
the legacy engine as an external black box to produce comparison references.
*Same forbidden list as above.* Written as an engineering account, not as a
critique of colleagues — describe the system, not the people.

**Emotion Recognition** — Portsmouth research internship. Multimodal emotion
recognition across video, text, audio and images; fine-tuning DeBERTa and an
OpenAI model; Weights & Biases for experiment tracking; a live transcription tool
for real-time analysis.

**Predictops** — Geolocated intervention forecasting combining historical
operational data with weather signals, surfaced through a Quasar dashboard.
Frame the forecasting and dataviz work and the integration with OptimOps.

**ARS** — Proof-of-concept regional health-surveillance dashboard. Flask +
MongoDB API with JWT auth, an admin layer and transactional email; Vue/Quasar
front with Leaflet maps and regional contours, emergency and hospitalisation
indicators, age-band breakdowns and an external weather API. The point of the
page is that it reuses the same configurable-widget architecture as OptimOps,
showing the pattern transfers across domains. **Explicitly labelled
proof-of-concept** — no claim of production use.

### 6.2 Voice

Rewrite everything. No competency codes, no "this project enabled me to
develop…", no semester numbers. Each page must answer, for a hiring manager:
what was the problem, what did he build, what did he decide and why, what
happened.

## 7. Archive page

`archive.html` — a short intro framing it as coursework, then a curated list of
six entries, each one line of portfolio-voice description plus links to the
retained PDF reports:

1. **Kamisado** — Java / JavaFX board game, MVC, two AI strategies, unit tested
2. **Covid-19 dashboard** — Vue + European API ingestion, filtering and charting
3. **E-commerce platform** — requirements → MCD → SQL → Flask implementation
4. **The missing-token game** — algorithms, two AI strategies, performance analysis
5. **Network services** — provisioning and deploying the hosting stack for a web app
6. **Project management** — specification, costing, Gantt and PERT for the e-commerce build

The eleven `pages/BUT/pages/*.html` files and `pages/BUT/home.html` are deleted;
`pages/BUT/rapports/*` (all PDFs and Gantt files) is retained and linked.

## 8. Motion

All motion is defined with the shared `--ease` / `--dur*` tokens and every
effect below is disabled or reduced under `@media (prefers-reduced-motion: reduce)`.

| Effect | Behaviour |
|---|---|
| Background particles | Fixed full-viewport `<canvas>` at `z-index: -1`. ~60 motes (30 below 768px), 1–2.5px, `--accent` at 6–12% alpha, slow downward drift with horizontal wander. Pointer within 120px applies a soft radial repulsion and raises alpha. `requestAnimationFrame` loop paused on `visibilitychange` and when the canvas is off-screen. Disabled entirely for coarse pointers and reduced-motion. |
| Scroll reveal | `IntersectionObserver` (`threshold: .15`, `rootMargin: "0px 0px -8% 0px"`), 12px rise + fade, 60ms stagger within a group, `--dur-slow`. Observer disconnects per element after firing. |
| Theme toggle | View Transitions API circular wipe originating at the button where `document.startViewTransition` exists; plain token cross-fade otherwise. |
| Card hover | 2px translate, border → `--border-strong`, `--shadow-card` deepens, cover motif drifts/scales subtly. Pointer-fine only. |
| Language toggle | 120ms blur-fade out, swap text, fade in — prevents layout pop when string lengths differ. |
| Nav | Backdrop and border fade in past 24px scroll; active-section indicator slides between anchors. |
| Page load | Single 240ms fade-in on `<main>`. |

**Correctness constraint:** particles and reveal must not cause layout shift.
The canvas is `position: fixed` and out of flow; revealed elements reserve their
final space (`opacity` + `transform` only — never `height`, `display` or `margin`).

## 9. Navbar

- Default state: `background: color-mix(in oklab, var(--bg) 72%, transparent)`
  with `backdrop-filter: blur(14px) saturate(140%)`, 1px bottom border in
  `--border` at reduced alpha.
- Scrolled state (`.is-scrolled`, past 24px): background rises to ~88%,
  border reaches full `--border`, `--shadow-nav` applies.
- **Fallback:** inside `@supports not ((backdrop-filter: blur(1px)) or
  (-webkit-backdrop-filter: blur(1px)))`, the background becomes an opaque
  `var(--bg)` at 97%. The bar must never render as unreadable transparent text.
- `-webkit-backdrop-filter` included for Safari.
- Height: 60px desktop, 56px mobile. `position: sticky; top: 0; z-index: 50`.
- Anchor links use `scroll-margin-top` equal to nav height plus 8px so anchored
  sections are not hidden underneath.

## 10. Responsive

Fluid-first: `clamp()` on type, spacing and the rail, so the layout adapts
continuously rather than snapping. Breakpoints exist only where the *structure*
must change.

| Width | Behaviour |
|---|---|
| ≥1280px | Full layout; work grid 3 columns |
| 1024–1279px | Work grid 3 columns, tighter rail |
| 860–1023px | Work grid 2 columns; hero still 2 columns from 900px |
| 768–859px | Nav collapses to a menu button + slide-down panel; hero stacks |
| 600–767px | Work grid 1 column; about stacks; hobbies 1 column; facts rail 2 columns |
| <600px | Single column throughout; facts rail 1 column; reduced particle count |
| <380px | Display type at the bottom of its clamp; chips wrap; timeline rail narrows |

**Collapsed nav:** below 860px the anchor list moves into a slide-down panel
toggled by a button. `EN | FR` and the theme toggle remain visible in the bar at
all widths — they are never buried in the menu. The panel traps focus while
open, closes on `Escape`, on outside click, and on anchor selection.

**Hard requirements**
- No horizontal overflow at any width from 320px to 1920px. Wide content
  (tech-chip rows, tables, code) scrolls inside its own `overflow-x: auto`
  container; the page body never scrolls sideways.
- Interactive targets ≥44×44px on touch.
- `padding-inline` respects `env(safe-area-inset-left/right)`; the sticky nav
  respects `env(safe-area-inset-top)`.
- Landscape phones (e.g. 740×360) must not have the hero consume more than one
  viewport height — hero uses `min-height: auto`, never `100vh`.
- Images: `max-width: 100%`, intrinsic `width`/`height` attributes on every
  `<img>` to reserve space, `loading="lazy"` on everything below the fold.

**Verification widths:** 320, 360, 390, 414, 480, 600, 768, 834, 1024, 1280,
1440, 1920.

## 11. Bilingual system

`js/i18n/` contains an engine plus one dictionary per page.

- Markup carries `data-i18n="key"` for text content and
  `data-i18n-attr="alt:key,aria-label:key"` for attributes.
- Dictionaries are plain JS objects: `export const home = { en: {...}, fr: {...} }`.
- Engine responsibilities: resolve the active language (localStorage →
  `navigator.language` → `en`), apply a dictionary to the DOM, set
  `document.documentElement.lang`, persist changes, and expose `setLang()`.
- Toggling never reloads the page.
- **Parity is a hard requirement:** every key present in `en` must exist in `fr`
  and vice versa. A missing key falls back to English and logs a warning in
  development rather than rendering the raw key.
- Language-specific document `<title>` and `<meta name="description">` are also
  swapped.

Coverage: nav, hero, about, all cards, hobbies, résumé, contact, the archive
page, and the full body of all five project pages.

## 12. Code architecture

```
index.html
projects/{optimops,kpi-engine,emotion-recognition,predictops,ars}.html
archive.html
404.html
css/
  tokens.css        colour, type scale, spacing, radii, shadows, motion; both themes
  base.css          reset, base typography, focus-visible, selection, scrollbars
  layout.css        container, sections, grids, topbar, footer
  components.css    buttons, chips, cards, timeline, hobby panels, toggles, nav panel
  pages.css         hero, project-detail, archive specifics
js/
  main.js           entry — wires modules per page
  theme.js          theme resolution, persistence, view-transition toggle
  i18n/
    index.js        engine
    common.js       nav, footer, shared strings
    home.js
    archive.js
    projects.js     all five project pages
  particles.js
  reveal.js
  nav.js            sticky state, active section, collapsed panel
  covers.js         inline SVG motif templates
  icons.js          social and UI icons, defined once
  data/projects.js  card metadata: slug, i18n keys, tags, cover id
assets/
  portrait.jpg      new square crop
  hero.jpg          original, retained
  images/           existing, pruned
docs/superpowers/specs/
CV-FR.pdf
favicon.svg
```

**Module strategy:** native ES modules (`<script type="module">`). No bundler,
no npm, deploys by pushing.

**Known trade-off, accepted:** ES modules do not load over `file://`. Opening
`index.html` by double-clicking will render an unstyled/inert page. Local
preview requires a static server. A `README.md` section documents
`python -m http.server 8000` and notes that GitHub Pages serves modules
correctly. This is the single accepted cost of the no-build decision.

**Theme flash prevention:** a small inline `<script>` in `<head>` (before
stylesheets) reads the persisted theme and sets `data-theme` on
`<html>` synchronously, so no flash of the wrong theme occurs. This is the only
inline script in the project.

**Storage:** `localStorage` (not the current `sessionStorage`) for both theme
and language, so preferences survive across visits. All reads and writes are
wrapped in `try/catch` — private mode and blocked site data must not break the
page; the site renders correctly with no stored value.

## 13. Accessibility

- Skip-to-content link, visible on focus.
- Semantic landmarks: `header`, `nav`, `main`, `section` with `aria-labelledby`, `footer`.
- Visible `:focus-visible` ring on every interactive element, in `--accent`,
  with sufficient offset — never `outline: none` without a replacement.
- Theme and language toggles are real `<button>`s with `aria-label` and
  `aria-pressed` (or `aria-current` for the language pair), both translated.
- Every meaningful `<img>` has a translated `alt`; decorative SVG motifs are
  `aria-hidden="true"` with `focusable="false"`.
- The collapsed nav panel manages focus, `aria-expanded` and `Escape`.
- Colour is never the sole carrier of meaning.
- `prefers-reduced-motion: reduce` disables particles and reduces all
  transitions to opacity-only at `--dur-fast`.

## 14. Metadata and SEO

Per page: unique `<title>` and `<meta name="description">` (both translated),
`<link rel="canonical">`, Open Graph and Twitter card tags, `theme-color` for
both schemes. `index.html` additionally carries a JSON-LD `Person` block
(name, job title, affiliation FEMTO-ST, `sameAs` GitHub + LinkedIn). No email or
phone in structured data.

## 15. Performance

- No frameworks, no runtime dependencies.
- Fonts: `preconnect` to both Google Fonts hosts; a single stylesheet request
  covering all three families with `display=swap`.
- Particle loop paused when the tab is hidden; capped at 60fps via `rAF`; no
  work when reduced-motion or coarse pointer.
- All below-fold images `loading="lazy"` with intrinsic dimensions.
- `assets/portrait.jpg` kept under 120KB.

## 16. Files removed

Deleted (recoverable through git history):

- `index.html` (replaced)
- `css/style.css`
- `js/script.js`
- `pages/BUT/home.html`
- `pages/BUT/pages/*.html` (11 files)
- `assets/images/Logo_dark.png`, `Logo_light.png`
- `assets/images/Thumbs.db`
- `assets/images/but/Optimops_DBv1.mwb`

Retained:

- `pages/BUT/rapports/*` — all PDFs and Gantt files, linked from `archive.html`
- `CV-FR.pdf`
- `assets/hero.jpg`
- `assets/images/profile.png` — used as the "writing in progress" placeholder
- `favicon.svg`
- All remaining `assets/images/**` — unused for now, pruned in a later pass
  rather than deleted speculatively

## 17. Content facts to update

| Fact | Old | New |
|---|---|---|
| Lab team | FEMTO-ST DISC **AND** | FEMTO-ST **AIMOS** |
| Apprenticeship host | IUT Nord Franche-Comté | **UTBM** |
| IUT NFC | current | Education history only (2021–2024, completed) |
| Title | "Data Scientist" | "Data Scientist · AI Engineer" |
| Hobbies | "aspiring music composer" | Composer, game dev, martial artist — three panels |
| Contact | email, phone, street address | email, city, socials |

The résumé's factual content is otherwise unchanged at the user's request — only
its presentation is rebuilt.

## 18. Verification

Because there is no test framework and no build step, verification is manual and
must be evidenced, not asserted:

1. **Responsive** — every page screenshotted at all twelve widths in §10; confirm
   zero horizontal overflow via `document.documentElement.scrollWidth <=
   window.innerWidth` at each width.
2. **Themes** — every page in both themes; confirm no element inherits a
   hardcoded colour.
3. **Bilingual parity** — a console assertion that the key sets of `en` and `fr`
   are identical for every dictionary; visual pass of both languages on every page.
4. **Reduced motion** — emulate `prefers-reduced-motion: reduce`; confirm the
   particle canvas is absent and transitions are opacity-only.
5. **No backdrop-filter** — confirm the navbar fallback renders opaque.
6. **Keyboard** — tab through every page; confirm skip link, focus rings, and the
   collapsed nav panel's focus handling and `Escape`.
7. **Links** — every internal link, every retained PDF, `CV-FR.pdf`, both social
   links resolve.
8. **Console** — zero errors, zero warnings on every page in both languages.
9. **Contrast** — programmatic AA check on every text/background token pair.

## 19. Out of scope

- Adding `CV-EN.pdf` (slot prepared, file not authored)
- A contact form or any backend
- Pruning the unused `assets/images/**` beyond the four files listed in §16
- Analytics
- A custom domain
