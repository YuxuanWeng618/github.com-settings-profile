import shutil
from pathlib import Path

try:
    from PIL import Image

    Image.MAX_IMAGE_PIXELS = None
except ImportError:
    Image = None

MAX_BYTES = 5 * 1024 * 1024
src_root = Path(r"I:\2026-6 个人网站\project\My Naked Soul\pictures")
dst_root = Path(r"e:\portfolio-site\assets\projects\my-naked-soul")
gallery = dst_root / "gallery"

dst_root.mkdir(parents=True, exist_ok=True)
gallery.mkdir(parents=True, exist_ok=True)


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


def pic_sort_key(path: Path) -> tuple:
    stem = path.stem
    if stem == "fengmian":
        return (-1, stem)
    if stem.startswith("pic"):
        try:
            return (0, int(stem[3:]))
        except ValueError:
            return (1, stem)
    return (1, stem)


cover_src = src_root / "fengmian.png"
if cover_src.exists():
    shutil.copy2(cover_src, dst_root / "cover.png")
    compress_if_needed(dst_root / "cover.png")

synced_names: set[str] = set()
for src in sorted(src_root.glob("pic*.*"), key=pic_sort_key):
    if src.name == "fengmian.png":
        continue
    dst = gallery / src.name
    shutil.copy2(src, dst)
    final_name = compress_if_needed(dst)
    synced_names.add(final_name or dst.name)
    print(f"sync {src.name} -> {final_name or dst.name}")

for stale in gallery.iterdir():
    if stale.is_file() and stale.name not in synced_names:
        stale.unlink()
        print(f"removed stale {stale.name}")

print("gallery:", ", ".join(sorted(synced_names, key=lambda n: pic_sort_key(Path(n)))))
print("done")
