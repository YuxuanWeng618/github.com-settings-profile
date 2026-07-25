import shutil
from pathlib import Path

src_root = Path(r"I:\2026-6 个人网站\project\ShadowGesture\pictures")
dst_root = Path(r"e:\portfolio-site\assets\projects\shadowgesture")
gallery = dst_root / "gallery"

dst_root.mkdir(parents=True, exist_ok=True)
gallery.mkdir(parents=True, exist_ok=True)

shutil.copy2(src_root / "fengmian.png", dst_root / "cover.png")

for name in ["fig1.png", "fig2.png", "fig3.jpg", "pic4.png", "pic5.png"]:
    src = src_root / name
    if src.exists():
        shutil.copy2(src, gallery / name)
        print(f"copied {name} ({src.stat().st_size // 1024} KB)")

print("done")
