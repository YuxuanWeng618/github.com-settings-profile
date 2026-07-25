import re
import zipfile
from pathlib import Path

docx = Path(r"I:\2026-6 个人网站\project\My Naked Soul\video\video.docx")
with zipfile.ZipFile(docx) as z:
    xml = z.read("word/document.xml").decode("utf-8", errors="ignore")
text = re.sub(r"<[^>]+>", " ", xml)
text = " ".join(text.split())
urls = re.findall(r"https?://[^\s\"<>]+", text)
print("URLs:", urls)
print("TEXT:", text[:800])
