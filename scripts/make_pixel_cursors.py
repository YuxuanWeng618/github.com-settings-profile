"""Generate the pixel-art cursor set used by css/main.css.

Art is authored on a 16x16 grid and upscaled 2x with nearest-neighbour so every
art pixel becomes a crisp 2x2 block. 32x32 is the largest size Windows renders
without resampling, so it is the safe ceiling for CSS `cursor: url()`.

Run:  python scripts/make_pixel_cursors.py [--preview]

--preview also writes scripts/_cursor_preview.png, an 8x blow-up of the art for
eyeballing shapes. It is a dev artifact and stays out of assets/.
"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw

GRID = 16
SCALE = 2
OUT_ROOT = Path(__file__).resolve().parent.parent / "assets" / "cursor"

# fill / outline per theme. Fill reads as the cursor body, outline keeps it
# legible against same-toned backgrounds and photographs.
THEMES = {
    "dark": {"fill": (255, 255, 255, 255), "outline": (0, 0, 0, 255)},
    "light": {"fill": (0, 0, 0, 255), "outline": (255, 255, 255, 255)},
}

TRANSPARENT = (0, 0, 0, 0)


def blank():
    return Image.new("RGBA", (GRID, GRID), TRANSPARENT)


def add_outline(img, outline):
    """Paint `outline` on every transparent pixel touching a solid pixel."""
    px = img.load()
    solid = {
        (x, y)
        for y in range(GRID)
        for x in range(GRID)
        if px[x, y][3] > 0
    }
    edge = set()
    for (x, y) in solid:
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                nx, ny = x + dx, y + dy
                if 0 <= nx < GRID and 0 <= ny < GRID and (nx, ny) not in solid:
                    edge.add((nx, ny))
    for (x, y) in edge:
        px[x, y] = outline
    return img


def from_ascii(rows, fill):
    """Build a silhouette from an ASCII grid ('#' = fill, anything else empty)."""
    img = blank()
    px = img.load()
    for y, row in enumerate(rows):
        for x, ch in enumerate(row):
            if ch == "#":
                px[x, y] = fill
    return img


def make_arrow(fill, outline):
    """Classic pointer: vertical left edge, diagonal right edge, kicked tail."""
    img = blank()
    ImageDraw.Draw(img).polygon(
        [(1, 1), (1, 12), (4, 9), (6, 14), (8, 13), (6, 9), (9, 9)],
        fill=fill,
    )
    return add_outline(img, outline)


ARROW_HOTSPOT = (1, 1)

HAND_ROWS = [
    "................",
    ".....##.........",
    ".....##.........",
    ".....##.........",
    ".....##.........",
    ".....##.........",
    ".....#####......",
    ".....########...",
    "..##.#########..",
    "..############..",
    "...###########..",
    "...###########..",
    "....##########..",
    "....#########...",
    ".....########...",
    "................",
]
HAND_HOTSPOT = (5, 1)


def make_hand(fill, outline):
    return add_outline(from_ascii(HAND_ROWS, fill), outline)


def make_zoom(fill, outline):
    """Magnifier: dark rim, light glass, dark plus sign — legible over photos."""
    img = blank()
    draw = ImageDraw.Draw(img)

    # Handle first so the lens paints over its inner end.
    draw.line([(9, 9), (13, 13)], fill=fill, width=3)

    # Glass, then rim drawn in the outline colour for a two-tone lens.
    draw.ellipse([1, 1, 11, 11], fill=fill, outline=fill)
    draw.ellipse([2, 2, 10, 10], fill=outline, outline=outline)
    draw.ellipse([3, 3, 9, 9], fill=fill, outline=fill)

    # Plus sign inside the glass.
    draw.line([(6, 4), (6, 8)], fill=outline, width=1)
    draw.line([(4, 6), (8, 6)], fill=outline, width=1)

    return add_outline(img, outline)


ZOOM_HOTSPOT = (6, 6)

CURSORS = {
    "cursor": (make_arrow, ARROW_HOTSPOT),
    "pointer": (make_hand, HAND_HOTSPOT),
    "zoom": (make_zoom, ZOOM_HOTSPOT),
}


def main():
    for theme, colors in THEMES.items():
        out_dir = OUT_ROOT / theme
        out_dir.mkdir(parents=True, exist_ok=True)
        for name, (builder, hotspot) in CURSORS.items():
            art = builder(colors["fill"], colors["outline"])
            art = art.resize((GRID * SCALE, GRID * SCALE), Image.NEAREST)
            path = out_dir / f"{name}.png"
            art.save(path, optimize=True)
            hx, hy = hotspot[0] * SCALE, hotspot[1] * SCALE
            print(f"{path.relative_to(OUT_ROOT.parent.parent)}  hotspot {hx} {hy}  {path.stat().st_size}B")

    if "--preview" not in sys.argv:
        return

    # Oversized contact sheet for eyeballing the art.
    sheet = Image.new("RGBA", (GRID * 3 * 8, GRID * 8 * 2), (128, 128, 128, 255))
    for row, theme in enumerate(THEMES):
        colors = THEMES[theme]
        for col, (name, (builder, _)) in enumerate(CURSORS.items()):
            art = builder(colors["fill"], colors["outline"]).resize(
                (GRID * 8, GRID * 8), Image.NEAREST
            )
            sheet.alpha_composite(art, (col * GRID * 8, row * GRID * 8))
    preview = Path(__file__).resolve().parent / "_cursor_preview.png"
    sheet.save(preview)
    print("preview:", preview)


if __name__ == "__main__":
    main()
