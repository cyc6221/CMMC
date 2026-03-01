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

```python
def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)
```

## Extended GCD

Extended GCD 會回傳 `g, x, y`，使得：

$$
a*x + b*y = \gcd(a, b)
$$

### 手算流程

用輾轉相除法得到 `gcd` 後，再一步一步回推即可得到係數

e.g. `a = 48, b = 18`

```=
  2 |48|18| 1
    |36|12| 
    -------
  2 |12| 6|
    |12|  |
    -------
    | 0|  |
```

得到 `gcd=6`

$$
gcd = 6 = 18 * 1 - 12 * 1 = 18 * 1 - (48 - 36) * 1 = 18 * 3 - 48 * 1
$$

由 `a = 48, b = 18` 得到 `x = -1, y = 3`

### Python

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
