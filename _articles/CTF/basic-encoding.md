---
layout: page
title: Basic Encoding (Python)
date: 2026-01-28
last_updated: 2026-01-28
tags: [CTF, Encoding, Python]
---

- Hex ⇄ Bytes
  - Hex → Bytes: `bytes.fromhex(hex_str)`
  - Bytes → Hex: `b.hex()`

- Base64
  - Encode: `base64.b64encode(data)`
  - Decode: `base64.b64decode(b64_str)`
  - Encode to string: `base64.b64encode(data).decode()`

- ASCII / Bytes / String
  - int → char: `chr(n)`
  - char → int: `ord(c)`
  - bytes → string: `b.decode()`
  - string → bytes: `s.encode()`

- XOR (pure Python)
  - two byte strings: `bytes([a ^ b for a, b in zip(b1, b2)])`
  - single-byte key: `bytes([x ^ k for x in data])`

- XOR (pwntools)
  - import: `from pwn import xor`
  - `xor(b1, b2)`
  - `xor(data, key)`

- Bytes ⇄ Integer (PyCryptodome)
  - import: `from Crypto.Util.number import bytes_to_long, long_to_bytes`
  - bytes → int: `bytes_to_long(b)`
  - int → bytes: `long_to_bytes(n)`
