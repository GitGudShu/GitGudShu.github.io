# GitGudShu.github.io

Personal portfolio of Thomas Chu, data scientist and AI engineer.

Static site: HTML, CSS and vanilla JavaScript ES modules. No build step, no
bundler, no runtime dependencies. Deploys by pushing to `main`.

## Local preview

ES modules do not load over `file://`, so **opening `index.html` by
double-clicking will not work**. The page renders without styling or
behaviour. Serve it over HTTP instead:

```bash
python -m http.server 8000
# then open http://localhost:8000/
```

GitHub Pages serves modules correctly, so this only affects local preview.

## Verification

Node 24+ is required for the test runner. There is nothing to install.

```bash
npm run verify         # everything below
npm test               # unit tests (node --test)
npm run check:i18n     # FR/EN key parity across all dictionaries
npm run check:contrast # WCAG AA on every token pair, both themes
```

## Structure

```
index.html            Hero · About · Work · Beyond the work · Résumé · Contact
projects/*.html       One page per flagship project
archive.html          Curated bachelor coursework
music.html            What I listen to, and an audio player for three sketches
404.html              Not found
assets/screens/       Published screenshots, already redacted
assets/audio/         The three demo sketches, rendered by tools/build-audio.py
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
  diagrams.js         Inline SVG diagrams
  player.js           Audio player for the music page
  data/projects.js    Project card metadata
  data/tracks.js      Demo sketches and their cover art
tools/                Checkers, the portrait crop, the screenshot redactor,
                      and the audio renderer
tests/                Unit tests for the pure modules
```

## Conventions

- **Colour lives only in `css/tokens.css`.** Everything else uses `var(--…)`.
  The two `theme-color` meta tags are the single documented exception:
  `theme-color` cannot read a custom property, so if `--bg` changes in either
  theme, those tags change too.
- **FR/EN parity is enforced.** Adding a string in one language without the
  other fails `npm run check:i18n`.
- **Motion respects `prefers-reduced-motion`.** The particle canvas is removed
  entirely, not merely paused.
- **No phone number and no street address** appear anywhere on the site.
- **Screenshots are redacted before publication.** `tools/build-screens.py`
  masks station and department names, the client crest and colleagues' names.
  The raw captures are gitignored and must never be committed.
- **No em dashes in copy.** Rephrase instead.
- **No third-party audio.** `assets/audio/` holds original sketches rendered by
  `tools/build-audio.py`, written only to demonstrate one device each. Replace
  them with real recordings, never with someone else's track.

## Adding a project

1. Add an entry to `js/data/projects.js`.
2. Add `work.<slug>.{role,year,title,summary}` to `js/i18n/home.js`, both languages.
3. Add a cover motif to `js/covers.js` (or reuse one).
4. Add a dictionary to `js/i18n/projects.js` with the full key contract.
5. Add a redacted screenshot under `assets/screens/`, and point the card at it
   with `shot: { src, w, h, alt }`. Without one the card falls back to a
   diagram, then to the SVG motif.
6. Copy an existing page in `projects/`, change the page-specific values:
   `<title>`, `<meta name="description">`, the `og:` tags, `canonical`,
   `data-project`, the static fallback text, and both nav links.
7. Fix the prev/next chain on the neighbouring pages.
8. `npm run verify`.
