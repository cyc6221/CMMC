---
layout: page
title: Partial Key Exposure Attacks
date: 2026-02-06
last_updated: 2026-02-06
tags: [RSA, partial-key-exposure]
---

**Partial Key Exposure Attacks（部分私鑰洩漏攻擊）** 描述一種「私鑰只部分洩漏」的情境：攻擊者僅取得 private key 的部分位元（例如 MSB/LSB、某段連續 bits、或分散的若干 bits），仍可能藉由數論結構與演算法技巧重建完整私鑰，進而造成系統的 **total break**。

<!-- --- -->

## Partial Exposure of the MSBs of the RSA Decryption Exponent

[Partial Exposure of the MSBs of the RSA Decryption Exponent]({{ "/articles/CryptoAnIntro/MSBs-of-decryption-exponent/" | relative_url }})

## Partial Exposure of the some bits of the RSA Prime Factors

[Partial Exposure of the some bits of the RSA Prime Factors]({{ "/articles/CryptoAnIntro/some-bits-of-prime-factors/" | relative_url }})

## Partial Exposure of the LSBs of the RSA Decryption Exponent

[Partial Exposure of the LSBs of the RSA Decryption Exponent]({{ "/articles/CryptoAnIntro/LSBs-of-decryption-exponent/" | relative_url }})
