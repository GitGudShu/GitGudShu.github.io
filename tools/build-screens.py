"""Build the published screenshot set from the raw captures.

Client identity is redacted before publication: station and department names,
the client crest, and the names of colleagues. Anonymous values and the layout
are kept, since those are what the screenshots are there to show.

The raw captures are deliberately not committed, so this script is a record of
what was masked rather than something CI runs. Drop them back into
assets/images/but/ to re-derive assets/screens/.

Regions are (left, top, right, bottom) in the source image's own pixels.
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "images" / "but"
DST = ROOT / "assets" / "screens"

MAX_WIDTH = 1200
JPEG_QUALITY = 82


def pixelate(im, box, block=14):
    """Replace a region with a coarse mosaic. Deliberate, and not reversible."""
    region = im.crop(box)
    w, h = region.size
    if w < block or h < block:
        return
    small = region.resize((max(1, w // block), max(1, h // block)), Image.BILINEAR)
    im.paste(small.resize((w, h), Image.NEAREST), box)


SCREENS = [
    {"src": "synthese-heatmap.png", "out": "optimops-overview.jpg", "redact": []},
    {
        "src": "interventions-time-series.png",
        "out": "optimops-interventions.jpg",
        "redact": [(24, 92, 98, 320)],  # y-axis: real monthly intervention counts
    },
    {"src": "armement-editeur.png", "out": "optimops-arming.jpg", "redact": []},
    {
        "src": "coverage-real-example.png",
        "out": "optimops-coverage.jpg",
        "redact": [
            (553, 26, 795, 64),      # company name in the title
            (462, 610, 655, 646),    # three town labels on the map
            (486, 718, 845, 754),
            (718, 808, 930, 844),
        ],
    },
    {
        "src": "meteo_s6.png",
        "out": "predictops-weather.jpg",
        "redact": [
            (762, 258, 915, 298),    # department selector
            (14, 840, 88, 902),      # client crest
        ],
    },
    {
        "src": "pred_s5.png",
        "out": "predictops-synthesis.jpg",
        "redact": [
            (270, 800, 1080, 927),   # command chain: colleagues' names
            (80, 830, 170, 927),     # client crest
        ],
    },
    {
        "src": "emotion-analysis.png",
        "out": "emotion-sweep.jpg",
        "redact": [],
    },
    {"src": "kamisado_full.png", "out": "archive-kamisado.jpg", "redact": []},
    {"src": "jeton-whole.png", "out": "archive-token.jpg", "redact": []},
    {"src": "boutique_s1.png", "out": "archive-ecommerce.jpg", "redact": []},
]


def build(spec):
    im = Image.open(SRC / spec["src"]).convert("RGB")
    if crop := spec.get("crop"):
        im = im.crop(crop)
    for box in spec["redact"]:
        pixelate(im, box)
    if im.width > MAX_WIDTH:
        im = im.resize((MAX_WIDTH, round(im.height * MAX_WIDTH / im.width)), Image.LANCZOS)

    out = DST / spec["out"]
    if out.suffix == ".png":
        # Line art: a small adaptive palette is a fraction of the size of
        # truecolour and visually identical.
        im.convert("P", palette=Image.ADAPTIVE, colors=64).save(out, "PNG", optimize=True)
    else:
        im.save(out, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
    return out, im.size


def main():
    DST.mkdir(parents=True, exist_ok=True)
    for spec in SCREENS:
        if not (SRC / spec["src"]).exists():
            print(f"skip {spec['out']}: {spec['src']} not present")
            continue
        out, size = build(spec)
        print(f"{out.relative_to(ROOT)}  {size[0]}x{size[1]}  {out.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
