"""Encrypt protected documents for the password-gated docs page.

Only the encrypted output is committed; the source files and the password stay local.

    python scripts/encrypt_docs.py <password> <source> <destination.enc>

Container layout: magic "CDOC1" | salt (16) | iv (12) | AES-256-GCM ciphertext.
The browser side in js/docs.js derives the same key with PBKDF2-SHA256.
"""

import os
import sys
from pathlib import Path

from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

MAGIC = b"CDOC1\x00"
ITERATIONS = 250_000


def derive_key(password: str, salt: bytes) -> bytes:
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=ITERATIONS,
    )
    return kdf.derive(password.encode("utf-8"))


def encrypt(password: str, source: Path, destination: Path) -> None:
    salt = os.urandom(16)
    iv = os.urandom(12)
    key = derive_key(password, salt)
    ciphertext = AESGCM(key).encrypt(iv, source.read_bytes(), None)

    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(MAGIC + salt + iv + ciphertext)
    print(f"{source.name} -> {destination} ({destination.stat().st_size} bytes)")


def main() -> int:
    if len(sys.argv) != 4:
        print(__doc__)
        return 1

    password, source, destination = sys.argv[1], Path(sys.argv[2]), Path(sys.argv[3])
    if not source.is_file():
        print(f"source not found: {source}")
        return 1

    encrypt(password, source, destination)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
