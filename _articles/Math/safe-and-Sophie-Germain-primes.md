---
layout: page
title: Safe and Sophie Germain Primes
date: 2026-03-04
last_updated: 2026-03-04
label: "prime"
tags: [prime]
---

## Definition

若 $q$ 為質數且 $p=2q+1$ 也同樣是質數，則稱 $q$ 為 **Sophie Germain prime**，而對應的 $p=2q+1$ 稱為 **safe prime**。

反之，若 $p$ 為 **safe prime**，則必存在質數 $q$ 使得 $p=2q+1$，且此 $q$ 可由

$$
q=\frac{p-1}{2}
$$

唯一決定。因此，$q$ 是 **Sophie Germain prime** 當且僅當 $p=2q+1$ 是 **safe prime**。

## OEIS

- [A005384](https://oeis.org/A005384): **Sophie Germain primes** $q$: $2q+1$ is also prime.
  - Sophie Germain 質數 $q$：$2q+1$ 也為質數

  <details>
  <summary>A005384 展開</summary>

  2, 3, 5, 11, 23, 29, 41, 53, 83, 89, 113, 131, 173, 179, 191, 233, 239, 251, 281, 293, 359, 419, 431, 443, 491, 509, 593, 641, 653, 659, 683, 719, 743, 761, 809, 911, 953, 1013, 1019, 1031, 1049, 1103, 1223, 1229, 1289, 1409, 1439, 1451, 1481, 1499, 1511, 1559

  </details>

- [A005385](https://oeis.org/A005385): **Safe primes** $p$: $\dfrac{p-1}{2}$ is also prime.
  - Safe 質數 $p$：$\dfrac{p-1}{2}$ 也為質數（等價地，存在質數 $q$ 使 $p=2q+1$）

  <details>
  <summary>A005385 展開</summary>

  5, 7, 11, 23, 47, 59, 83, 107, 167, 179, 227, 263, 347, 359, 383, 467, 479, 503, 563, 587, 719, 839, 863, 887, 983, 1019, 1187, 1283, 1307, 1319, 1367, 1439, 1487, 1523, 1619, 1823, 1907, 2027, 2039, 2063, 2099, 2207, 2447, 2459, 2579, 2819, 2879, 2903, 2963

  </details>

### Examples

| $q$（Sophie Germain） | $p=2q+1$（Safe） |
| :-: | :-: |
| 2 | 5 |
| 3 | 7 |
| 5 | 11 |
| 11 | 23 |
| 23 | 47 |
| 29 | 59 |

## Conjecture

**Sophie Germain Prime Conjecture** 主張：存在**無限多** Sophie Germain 質數 $q$。由於每個 Sophie Germain 質數 $q$ 都對應到一個 safe prime $p=2q+1$（反之亦然），因此此猜想等價於：存在**無限多** safe primes $p$ 使得 $p=2q+1$。目前此猜想**仍未被證明或否證**，屬於數論中的公開問題。

> The Sophie Germain prime conjecture states that there are infinitely many primes $q$ such that $2q+1$ is also prime. This conjecture remains unproven.

## References

- [Safe and Sophie Germain primes](https://en.wikipedia.org/wiki/Safe_and_Sophie_Germain_primes)
- [索菲·熱爾曼質數](https://zh.wikipedia.org/wiki/%E7%B4%A2%E8%8F%B2%C2%B7%E7%86%B1%E7%88%BE%E6%9B%BC%E8%B3%AA%E6%95%B8)
- [安全質數](https://zh.wikipedia.org/wiki/%E5%AE%89%E5%85%A8%E7%B4%A0%E6%95%B0)
- [OEIS A005384](https://oeis.org/A005384)
- [OEIS A005385](https://oeis.org/A005385)
