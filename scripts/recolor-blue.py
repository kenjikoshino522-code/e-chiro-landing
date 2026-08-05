"""Shift a specific background blue (#142CE4) toward the brand blue (#1E00DC).

Uses a tolerance-based per-pixel shift so anti-aliased edges (logo strokes,
text) blend smoothly instead of banding.
"""
import sys
from PIL import Image

OLD = (0x14, 0x2C, 0xE4)
NEW = (0x1E, 0x00, 0xDC)
TOLERANCE = 60  # max per-channel distance from OLD to still be treated as background


def close_to(px, target, tol):
    return all(abs(px[i] - target[i]) <= tol for i in range(3))


def recolor(path):
    img = Image.open(path).convert("RGB")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            if close_to((r, g, b), OLD, TOLERANCE):
                # proportional shift so partial/blended pixels stay smooth
                nr = NEW[0] + (r - OLD[0])
                ng = NEW[1] + (g - OLD[1])
                nb = NEW[2] + (b - OLD[2])
                px[x, y] = (
                    max(0, min(255, nr)),
                    max(0, min(255, ng)),
                    max(0, min(255, nb)),
                )
    img.save(path, quality=95)
    print(f"recolored: {path}")


if __name__ == "__main__":
    for p in sys.argv[1:]:
        recolor(p)
