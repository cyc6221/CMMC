---
layout: page
title: Safe and Sophie Germain Primes
date: 2026-03-04
last_updated: 2026-03-04
redirect_from:
  - /articles/Math/prime-number/safe-and-Sophie-Germain-primes/
---

## Definition

若 $q$ 為質數且 $p=2q+1$ 也同樣是質數，則稱 $q$ 為 **Sophie Germain prime**，而對應的 $p=2q+1$ 稱為 **safe prime**。

反之，若 $p$ 為 **safe prime**，則必存在質數 $q$ 使得 $p=2q+1$，且此 $q$ 可由

$$
q=\frac{p-1}{2}
$$

唯一決定。因此，$q$ 是 **Sophie Germain prime** 當且僅當 $p=2q+1$ 是 **safe prime**。

## OEIS

{% include oeis-card.html id="A005384" %}

{% include oeis-card.html id="A005385" %}

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
