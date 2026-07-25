import shutil
from pathlib import Path

try:
    from PIL import Image

    Image.MAX_IMAGE_PIXELS = None
except ImportError:
    Image = None

MAX_BYTES = 5 * 1024 * 1024
src_root = Path(r"I:\2026-6 个人网站\project\Rhymarc 24 7")
dst_root = Path(r"e:\portfolio-site\assets\projects\rhymarc")
gallery = dst_root / "gallery"
design = gallery / "design"

dst_root.mkdir(parents=True, exist_ok=True)
gallery.mkdir(parents=True, exist_ok=True)
design.mkdir(parents=True, exist_ok=True)


def compress_if_needed(path: Path) -> None:
    if not path.exists():
        return
    if path.stat().st_size <= MAX_BYTES or Image is None:
        print(f"ok  {path.relative_to(dst_root)}: {path.stat().st_size // 1024} KB")
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
            print(f"jpg {out.relative_to(dst_root)}: {out.stat().st_size // 1024} KB")
            return

    print(f"warn {path.name}: still large")


cover_src = src_root / "pictures" / "fengmian.png"
cover_dst = dst_root / "cover.png"
shutil.copy2(cover_src, cover_dst)
compress_if_needed(cover_dst)

for i in range(1, 12):
    src = src_root / "design process" / f"pic{i}.png"
    dst = design / f"pic{i}.png"
    if not src.exists():
        print(f"missing pic{i}")
        continue
    shutil.copy2(src, dst)
    compress_if_needed(dst)

print("done")
