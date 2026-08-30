"""Fetches the YouTube thumbnail for every letter and stores it locally.

The point of keeping copies rather than pointing at i.ytimg.com is that the
page then still contacts nobody until somebody presses play, which is the
whole bargain the letters make.

    python tools/build-thumbs.py           fetch anything missing
    python tools/build-thumbs.py --force   fetch everything again
    python tools/build-thumbs.py --check   report only, non-zero if stale

Run it after changing a link in js/data/letters.js.
"""
import json
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
LETTERS = ROOT / 'js' / 'data' / 'letters.js'
OUT = ROOT / 'assets' / 'thumbs'
UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/126.0 Safari/537.36')

FORCE = '--force' in sys.argv
CHECK = '--check' in sys.argv

# maxres is 1280x720 but only exists for HD sources. The 4:3 ones are cropped
# to fit by the page, and a cropped sd beats an upscaled mq. mq always exists.
SIZES = ('maxresdefault', 'sddefault', 'hqdefault', 'mqdefault')


def video_ids():
    """Reads the ids straight out of the data file, in page order."""
    source = LETTERS.read_text(encoding='utf-8')
    out = []
    for line in source.splitlines():
        m = re.search(r"\{\s*id:\s*'([^']+)'.*?video:\s*'([^']*)'", line)
        if not m:
            continue
        key, url = m.group(1), m.group(2)
        vid = ''
        if re.fullmatch(r'[\w-]{11}', url.strip()):
            vid = url.strip()
        else:
            hit = re.search(r'(?:v=|youtu\.be/|embed/|shorts/)([\w-]{11})', url)
            if hit:
                vid = hit.group(1)
        out.append((key, vid))
    return out


def shrink(body):
    """The player box is about 500px wide, so 1000 covers a retina screen."""
    from io import BytesIO
    from PIL import Image
    with Image.open(BytesIO(body)) as im:
        im = im.convert('RGB')
        if im.width <= 1000:
            return body
        height = round(im.height * 1000 / im.width)
        im = im.resize((1000, height), Image.LANCZOS)
        out = BytesIO()
        im.save(out, 'JPEG', quality=82, optimize=True, progressive=True)
    return out.getvalue()


def fetch(vid):
    """Returns the biggest thumbnail that exists, or None."""
    for size in SIZES:
        url = f'https://i.ytimg.com/vi/{vid}/{size}.jpg'
        r = subprocess.run(['curl', '-sL', '-A', UA, url], capture_output=True)
        body = r.stdout
        # A missing maxres comes back as a tiny grey placeholder or an error page.
        if body[:2] == b'\xff\xd8' and len(body) > 3000:
            return size, body
    return None


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    entries = video_ids()
    if not entries:
        raise SystemExit('no letters found; has js/data/letters.js moved?')

    missing, fetched, kept = [], 0, 0
    wanted = set()

    for key, vid in entries:
        target = OUT / f'{key}.jpg'
        if not vid:
            print(f'  {key:14} no link yet')
            if target.exists() and not CHECK:
                target.unlink()
            continue
        wanted.add(target.name)

        if target.exists() and not FORCE:
            kept += 1
            continue
        if CHECK:
            missing.append(key)
            continue

        got = fetch(vid)
        if not got:
            missing.append(key)
            print(f'  {key:14} {vid}  NO THUMBNAIL')
            continue
        size, body = got
        body = shrink(body)
        target.write_bytes(body)
        fetched += 1
        print(f'  {key:14} {vid}  {size:16} {len(body) // 1024:>4} KB')

    # Anything left over belongs to a letter that has gone.
    for stale in OUT.glob('*.jpg'):
        if stale.name not in wanted:
            print(f'  {stale.stem:14} no longer used, removing')
            if not CHECK:
                stale.unlink()

    print(f'\n{fetched} fetched, {kept} already present.')
    if missing:
        print('missing: ' + ', '.join(missing))
        if CHECK:
            raise SystemExit(1)
    if not CHECK:
        print('Run `npm run verify` to confirm.')


if __name__ == '__main__':
    main()
