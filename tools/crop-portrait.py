"""One-off: crop assets/hero.jpg to a square portrait.

The source is 1024x683 and contains three musicians. The box below frames the
subject on the left — face, hands and the full guitar including the headstock —
and stops short of the second player, whose hair enters the frame around x=620.
Run once; assets/hero.jpg is never modified.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "hero.jpg"
DST = ROOT / "assets" / "portrait.jpg"

BOX = (40, 83, 620, 663)  # left, upper, right, lower -> 580x580
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
