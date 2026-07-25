import re
import sys
from pathlib import Path

data = Path(sys.argv[1]).read_bytes()

patterns = [
    re.compile(rb"https?://[\x20-\x7e]{10,200}"),
    re.compile(rb"(?:https?://(?:[\x20-\x7e]|(?:\x00[\x20-\x7e]))+){10,200}"),
]

found = set()
for pat in patterns:
    for m in pat.findall(data):
        text = m.decode("ascii", errors="ignore").replace("\x00", "")
        if text.startswith("http"):
            found.add(text.rstrip("\x00"))

# UTF-16 LE scan
for m in re.finditer(rb"(?:h\x00t\x00t\x00p\x00[s\x00]?\x00?:\x00/\x00/\x00)", data):
    chunk = data[m.start() : m.start() + 800]
    chars = []
    for i in range(0, len(chunk) - 1, 2):
        lo, hi = chunk[i], chunk[i + 1]
        if hi == 0 and 32 <= lo < 127:
            chars.append(chr(lo))
        else:
            break
    found.add("".join(chars))

# Plain text chunks
for chunk in re.findall(rb"[ -~]{12,}", data):
    s = chunk.decode("ascii", errors="ignore")
    if "http" in s or "youtube" in s.lower() or "youtu.be" in s.lower():
        found.add(s)

print("\n".join(sorted(found)) or "NO_URL_FOUND")
