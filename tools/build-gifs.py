"""Keeps assets/gifs and the colour page in step.

Drop a new gif into assets/gifs/ under one of the existing names, run this,
and it will:

  * rebuild the still first frame (the .png beside it) that readers who asked
    for reduced motion get instead of the animation,
  * write the real width and height back into the page, so nothing jumps
    around while the gif is still loading.

    python tools/build-gifs.py

Add --check to report without writing anything, which is what CI wants.

Needs Pillow:  pip install pillow
"""
import pathlib
import re
import struct
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
GIFS = ROOT / 'assets' / 'gifs'
PAGE = ROOT / 'the-color-i-was-chasing.html'
CHECK = '--check' in sys.argv


def gif_size(path):
    """Logical screen size, straight out of the GIF header."""
    with path.open('rb') as fh:
        head = fh.read(10)
    if head[:3] != b'GIF':
        raise SystemExit(f'{path.name} is not a gif')
    return struct.unpack('<HH', head[6:10])


def still(path):
    """Save the first frame beside the gif, quantised to keep it small."""
    from PIL import Image
    out = path.with_suffix('.png')
    with Image.open(path) as im:
        im.seek(0)
        frame = im.convert('RGB').quantize(colors=128, method=Image.MEDIANCUT)
    # A gif's transparency index rides along in .info and confuses the PNG
    # writer, which expects an int. The frame is already flattened, so drop it.
    frame.info.pop('transparency', None)
    if CHECK:
        return out, out.exists()
    frame.save(out, optimize=True)
    return out, True


def main():
    gifs = sorted(GIFS.glob('*.gif'))
    if not gifs:
        raise SystemExit(f'no gifs in {GIFS}')

    html = PAGE.read_text(encoding='utf-8')
    problems = []

    for gif in gifs:
        name = gif.stem
        width, height = gif_size(gif)
        out, ok = still(gif)
        if not ok:
            problems.append(f'{out.name} is missing')

        # Only the two size attributes move; the rest of the tag is left alone.
        pattern = re.compile(
            r'(<img class="scene__art" src="assets/gifs/' + re.escape(name) + r'\.gif" alt="" )'
            r'width="\d+" height="\d+"')
        patched, n = pattern.subn(rf'\g<1>width="{width}" height="{height}"', html)
        if n == 0:
            problems.append(f'{name}.gif is not used on the page')
        elif patched != html:
            problems.append(f'{name}: page said the wrong size, now {width}x{height}')
            html = patched

        print(f'  {name:12} {width:>4}x{height:<4} {gif.stat().st_size // 1024:>5} KB'
              f'   still: {out.name}')

    if not CHECK:
        PAGE.write_text(html, encoding='utf-8')

    if problems:
        print('\n' + '\n'.join('  ' + p for p in problems))
        if CHECK:
            raise SystemExit(1)
    print('\nDone. Run `npm run verify` to confirm.' if not CHECK else '\nUp to date.')


if __name__ == '__main__':
    main()
