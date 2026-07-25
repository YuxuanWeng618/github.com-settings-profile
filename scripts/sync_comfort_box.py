import shutil
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    Image = None

MAX_BYTES = 5 * 1024 * 1024
src_root = Path(r"I:\2026-6 个人网站\project\舒适盒\pictures")
dst_root = Path(r"e:\portfolio-site\assets\projects\comfort-box")
gallery = dst_root / "gallery"

dst_root.mkdir(parents=True, exist_ok=True)
gallery.mkdir(parents=True, exist_ok=True)


def compress_if_needed(path: Path) -> None:
    if not path.exists():
        return
    if path.stat().st_size <= MAX_BYTES or Image is None:
        print(f"ok  {path.name}: {path.stat().st_size // 1024} KB")
        return

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
            return

    print(f"warn {path.name}: still large")


shutil.copy2(src_root / "fengmian.png", dst_root / "cover.png")
compress_if_needed(dst_root / "cover.png")

for name in ["pic1.png", "pic2.png", "pic3.png"]:
    src = src_root / name
    dst = gallery / name
    if src.exists():
        shutil.copy2(src, dst)
        compress_if_needed(dst)

print("done")
