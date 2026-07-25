import shutil
from pathlib import Path

try:
    from PIL import Image

    Image.MAX_IMAGE_PIXELS = None
except ImportError:
    Image = None

MAX_BYTES = 5 * 1024 * 1024
src_root = Path(r"I:\2026-6 个人网站\project\AquaSense")
dst_root = Path(r"e:\portfolio-site\assets\projects\aquasense")
gallery = dst_root / "gallery"
design = gallery / "design"

dst_root.mkdir(parents=True, exist_ok=True)
gallery.mkdir(parents=True, exist_ok=True)
design.mkdir(parents=True, exist_ok=True)

design_files = [
    ("design process/pic1.png", design / "pic1.png"),
    ("design process/pic2.png", design / "pic2.png"),
    ("design process/pic3.png", design / "pic3.png"),
    ("design process/pic4.png", design / "pic4.png"),
    ("design process/pic5.jpg", design / "pic5.jpg"),
    ("design process/pic6.png", design / "pic6.png"),
]

picture_files = [(f"pictures/pic{i}.png", gallery / f"pic{i}.png") for i in range(7, 14)]


def compress_if_needed(path: Path) -> str:
    if not path.exists():
        return ""

    if path.stat().st_size <= MAX_BYTES or Image is None:
        print(f"ok  {path.name}: {path.stat().st_size // 1024} KB")
        return path.name

    img = Image.open(path)
    if img.mode in ("RGBA", "P"):
        bg = Image.new("RGB", img.size, (0, 0, 0))
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


cover_src = src_root / "pictures" / "fengmian.png"
cover_dst = dst_root / "cover.png"
shutil.copy2(cover_src, cover_dst)
compress_if_needed(cover_dst)

for rel, dst in design_files + picture_files:
    src = src_root / rel
    if not src.exists():
        print(f"missing {rel}")
        continue
    shutil.copy2(src, dst)
    compress_if_needed(dst)

print("done")
