---
layout: page
title: Shor's Algorithm and Grover's Algorithm
date: 2026-04-15
last_updated: 2026-05-06
label:
tags: [CryptoHack, Quantum Computing, Shor's Algorithm, Grover's Algorithm]
---

> [CryptoHack aes1: Resisting Bruteforce](https://cryptohack.org/courses/symmetric/aes1/)

## Shor's Algorithm

`Shor's algorithm` 是量子密碼學中最常被提到的演算法之一，因為它可以有效率地進行大整數分解與離散對數計算。若未來實用的大規模量子電腦真的成熟，像 `RSA` 與 `ECC` 這類依賴相關數學難題的公開金鑰系統，都會直接受到威脅。

## Grover's Algorithm

`Grover's algorithm` 不會像 `Shor's algorithm` 那樣直接摧毀對稱式密碼系統，但它可以把暴力搜尋加速到平方根等級。實務上這代表一個 `k-bit` 的對稱式金鑰，在理想量子攻擊者面前，安全強度可能會更接近 `k/2-bit`。這也是為什麼很多人在討論量子時代的對稱式加密時，會偏向選擇 `AES-256`，因為即使考慮 `Grover's algorithm` 的影響，仍可保有大約 `128-bit` 的安全強度。

## References

- [Wikipedia: Shor's algorithm](https://en.wikipedia.org/wiki/Shor%27s_algorithm)
- [Wikipedia: Grover's algorithm](https://en.wikipedia.org/wiki/Grover%27s_algorithm)
