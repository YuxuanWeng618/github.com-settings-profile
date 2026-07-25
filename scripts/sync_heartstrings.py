import shutil
from pathlib import Path

try:
    from PIL import Image

    Image.MAX_IMAGE_PIXELS = None
except ImportError:
    Image = None

MAX_BYTES = 5 * 1024 * 1024
src_root = Path(r"I:\2026-6 个人网站\project\安宁疗护\pictures")
dst_root = Path(r"e:\portfolio-site\assets\projects\heartstrings")
gallery = dst_root / "gallery"

dst_root.mkdir(parents=True, exist_ok=True)
gallery.mkdir(parents=True, exist_ok=True)

files = [
    ("fengmian.png", dst_root / "cover.png"),
    ("pic1.png", gallery / "pic1.png"),
    ("pic8-01.jpg", gallery / "pic8-01.jpg"),
]


def compress_if_needed(path: Path) -> str:
    if not path.exists():
        return ""
    if path.stat().st_size <= MAX_BYTES or Image is None:
        print(f"ok  {path.name}: {path.stat().st_size // 1024} KB")
        return path.name

    img = Image.open(path)
    if img.mode in ("RGBA", "P"):
        bg = Image.new("RGB", img.size, (255, 255, 255))
        if img.mode == "P":
            img = img.convert("RGBA")
        bg.paste(img, mask=img.split()[-1] if img.mode == "RGBA" else None)
        img = bg
    elif img.mode != "RGB":
        img = img.convert("RGB")

    out = path.with_suffix(".jpg")
    for quality in range(85, 34, -5):
        img.save(out, "JPEG", quality=quality, optimize=True)
        if out.stat().st_size <= MAX_BYTES:
            if path != out:
                path.unlink(missing_ok=True)
            print(f"jpg {out.name}: {out.stat().st_size // 1024} KB")
            return out.name

    print(f"warn {path.name}: still large")
    return path.name


for src_name, dst in files:
    src = src_root / src_name
    if not src.exists():
        print(f"missing {src_name}")
        continue
    shutil.copy2(src, dst)
    compress_if_needed(dst)

print("done")
