import shutil
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    Image = None

MAX_BYTES = 5 * 1024 * 1024
src_pictures = Path(r"I:\2026-6 个人网站\project\KAIA\pictures")
src_demo = Path(r"I:\2026-6 个人网站\project\KAIA\demo\KAIA.exe")
dst_root = Path(r"e:\portfolio-site\assets\projects\kaia")
gallery = dst_root / "gallery"
demo_dir = dst_root / "demo"

dst_root.mkdir(parents=True, exist_ok=True)
gallery.mkdir(parents=True, exist_ok=True)
demo_dir.mkdir(parents=True, exist_ok=True)

overlap = [f"pic{i}.png" for i in range(1, 7)]
overall = [
    "pic7.png",
    "pic10.png",
    "pic11.png",
    "pic12.png",
    "pic13.png",
    "pic14.png",
    "pic15.png",
    "pic16.png",
    "pic17.png",
    "pic18.png",
    "pic19.png",
    "pic20.png",
]


def compress_if_needed(path: Path) -> None:
    if path.stat().st_size <= MAX_BYTES or Image is None:
        print(f"ok  {path.name}: {path.stat().st_size // 1024} KB")
        return

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
                out.rename(path.with_suffix(".jpg"))
            print(f"jpg {path.stem}.jpg: {out.stat().st_size // 1024} KB")
            return

    print(f"warn {path.name}: still large")


for name in overlap + overall:
    src = src_pictures / name
    if not src.exists():
        print(f"missing {name}")
        continue
    dst = gallery / name
    shutil.copy2(src, dst)
    compress_if_needed(dst)

shutil.copy2(src_pictures / "pic9.png", dst_root / "cover.png")
if src_demo.exists():
    shutil.copy2(src_demo, demo_dir / "KAIA.exe")
    print(f"demo: {src_demo.stat().st_size // 1024} KB")

print("done")
