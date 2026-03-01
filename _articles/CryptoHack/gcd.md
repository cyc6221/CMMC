---
layout: page
title: GCD
date: 2026-03-01
last_updated: 2026-03-01
tags: [CryptoHack, Modular Arithmetic, GCD]
---

## GCD

```python
import math

print(math.gcd(48, 18))  # 6
```

## Extended GCD

Extended GCD 會回傳 `g, x, y`，使得：

$$
a*x + b*y = \gcd(a, b)
$$

```python
def extended_gcd(a, b):
    # 回傳 (g, x, y)，使得 a*x + b*y = g = gcd(a, b)
    if b == 0:
        return a, 1, 0

    g, x1, y1 = extended_gcd(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    return g, x, y

g, x, y = extended_gcd(48, 18)
print(g, x, y)          # gcd 與係數 (x, y)
print(48 * x + 18 * y)  # 會等於 g
```

## 題目

- [題目連結：GCD](https://cryptohack.org/courses/modular/gcd/)
- [題目連結：Extended GCD](https://cryptohack.org/courses/modular/egcd/)
