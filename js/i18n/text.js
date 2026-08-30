/**
 * Writing helpers for the dictionaries.
 *
 * Prose is easier to edit when it looks like prose, so the dictionaries are
 * written in indented blocks and turned into markup here. Where you put your
 * line breaks is your business: only a blank line means anything.
 *
 *     'c.open': p`
 *       I have written three pieces of music. Three. They are, technically
 *       speaking, correct.
 *
 *       They are also boring in a way that makes me want to lie down.
 *     `,
 *
 * becomes two <p> elements. Wrap the lines wherever they read best, add or
 * remove line breaks freely, and the page does not change. Add a blank line
 * and you get a new paragraph.
 *
 *   p    several paragraphs, for data-i18n-html
 *   one  a single run of text, for data-i18n and attributes
 *
 * Inline markup is passed straight through, so <em>, <strong> and
 * <span class="kao">(◕‿◕)</span> all work as you would expect. Because these
 * are template literals rather than quoted strings, apostrophes need no
 * escaping: write it isn't, not it isn\'t.
 */

/** Joins the template back together and removes the shared left margin. */
function dedent(strings, values) {
  let raw = '';
  strings.forEach((chunk, i) => {
    raw += chunk + (i < values.length ? values[i] : '');
  });

  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();

  const indents = lines
    .filter((line) => line.trim())
    .map((line) => line.match(/^[ \t]*/)[0].length);
  const margin = indents.length ? Math.min(...indents) : 0;

  return lines.map((line) => line.slice(margin)).join('\n');
}

/** One paragraph's worth of lines, folded back into a single run of text. */
const fold = (block) =>
  block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ');

/** Blank-line-separated blocks become paragraphs. */
export function p(strings, ...values) {
  return dedent(strings, values)
    .split(/\n[ \t]*\n/)
    .map(fold)
    .filter(Boolean)
    .map((block) => `<p>${block}</p>`)
    .join('');
}

/** Everything on one line, however it was written. */
export function one(strings, ...values) {
  return fold(dedent(strings, values));
}
