"""Crop the freely-licensed composer photos used on the music page.

Only photos under a licence that permits republication go in here, and each one
carries the attribution its licence requires, shown on the page next to the
player. Everything else on that page falls back to the video's own thumbnail,
served by YouTube, so we never hold a copy of it.

Sources are downloaded by hand into tools/_photos/ and are not committed.
Run from the repo root: python tools/build-composers.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "tools" / "_photos"
DST = ROOT / "assets" / "composers"
SIZE = (960, 540)

PHOTOS = [
    {
        "src": "kajiura.jpg",
        "out": "kajiura.jpg",
        # https://commons.wikimedia.org/wiki/File:Yuki_Kajiura_at_Anime_Expo_2012.jpg
        "author": "Erika Rodriguez",
        "licence": "CC BY-SA 2.0",
        "crop": (0, 20, 1778, 1020),
    },
    {
        "src": "pasekpaul.jpg",
        "out": "pasek-paul.jpg",
        # https://commons.wikimedia.org/wiki/File:Pasek_and_Paul_-_Benj_Pasek_and_Justin_Paul.JPG
        "author": "Kerry Long",
        "licence": "CC BY-SA 3.0",
        "crop": (0, 100, 3504, 2071),
    },
]


def main():
    DST.mkdir(parents=True, exist_ok=True)
    for photo in PHOTOS:
        source = SRC / photo["src"]
        if not source.exists():
            print(f"skip {photo['out']}: {photo['src']} not present")
            continue

        im = Image.open(source).convert("RGB").crop(photo["crop"]).resize(SIZE, Image.LANCZOS)
        out = DST / photo["out"]
        im.save(out, "JPEG", quality=82, optimize=True, progressive=True)
        print(f"{out.relative_to(ROOT)}  {SIZE[0]}x{SIZE[1]}  "
              f"{out.stat().st_size // 1024} KB  {photo['author']}, {photo['licence']}")


if __name__ == "__main__":
    main()
