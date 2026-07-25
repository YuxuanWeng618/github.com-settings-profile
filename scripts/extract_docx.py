import re
import zipfile
from pathlib import Path

links_dir = Path(r"I:\2026-6 个人网站\project\安宁疗护\links")
for docx in links_dir.glob("*.docx"):
    if docx.name.startswith("~"):
        continue
    print("FILE:", docx.name)
    with zipfile.ZipFile(docx) as z:
        xml = z.read("word/document.xml").decode("utf-8", errors="ignore")
    text = re.sub(r"<[^>]+>", " ", xml)
    text = " ".join(text.split())
    urls = re.findall(r"https?://[^\s\"<>]+", text)
    print("URLs:", urls)
    print("TEXT:", text[:800])
