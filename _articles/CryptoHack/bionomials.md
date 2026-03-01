---
layout: page
title: "Modular Arithmetic - Modular Binomials"
date: 2026-03-01
last_updated: 2026-03-01
tags: [CryptoHack, Modular Arithmetic]
---

## 題目敘述

[題目連結](https://cryptohack.org/courses/modular/bionomials/)

### 英文敘述

Rearrange the following equation to get the primes $p, q$.

$$
\begin{aligned}
N &= p \cdot q \\
c_1 &\equiv (2 \cdot p + 3 \cdot q)^{e_1} \pmod N \\
c_2 &\equiv (5 \cdot p + 7 \cdot q)^{e_2} \pmod N
\end{aligned}
$$

### 中文敘述

給定下列關係式，請由已知的 $N, c_1, c_2, e_1, e_2$ 推導並求出未知質數 $p, q$：

- $N = p \cdot q$，其中 $p, q$ 為未知的質數。
- $c_1 \equiv (2p + 3q)^{e_1} \pmod{N}$
- $c_2 \equiv (5p + 7q)^{e_2} \pmod{N}$

## 解題思路

已知：

$$
\begin{aligned}
N &= pq \\
c_1 &\equiv (2p+3q)^{e_1} \pmod N \\
c_2 &\equiv (5p+7q)^{e_2} \pmod N
\end{aligned}
$$

### Step 1

取

$$
E = e_1e_2
$$

利用模冪性質：

$$
c_1^{e_2} \equiv \big((2p+3q)^{e_1}\big)^{e_2} \equiv (2p+3q)^{E}\pmod N
$$
$$
c_2^{e_1} \equiv \big((5p+7q)^{e_2}\big)^{e_1} \equiv (5p+7q)^{E}\pmod N
$$

因此可得：

$$
(2p+3q)^E \equiv c_1^{e_2}\pmod N,\quad (5p+7q)^E \equiv c_2^{e_1}\pmod N
$$

### Step 2

因為 $N=pq$，所以在 $\bmod p$ 下有 $p\equiv 0$。

$$
2p+3q \equiv 3q \pmod p
,\quad
5p+7q \equiv 7q \pmod p
$$

在 $\bmod p$ 下：

$$
3(5p+7q) - 7(2p+3q) \equiv 3\cdot 7q - 7\cdot 3q \equiv 0 \pmod p
$$

因此：

$$
p \mid \big(3(5p+7q)-7(2p+3q)\big)
$$

### Step 3

由於我們手上有的是 $(2p+3q)^E, (5p+7q)^E$，改寫為指數形式：

$$
2p+3q \equiv 3q \pmod p \Rightarrow (2p+3q)^E \equiv 3^E q^E \pmod p
$$

$$
5p+7q \equiv 7q \pmod p \Rightarrow (5p+7q)^E \equiv 7^E q^E \pmod p
$$

計算：

$$
3^E(5p+7q)^E - 7^E(2p+3q)^E
\equiv 3^E(7^E q^E) - 7^E(3^E q^E)
\equiv 0 \pmod p
$$

所以：

$$
p \mid \left(3^E(5p+7q)^E - 7^E(2p+3q)^E\right)
$$

### Step 4

令：

$$
X \equiv 3^E\cdot c_2^{e_1} - 7^E\cdot c_1^{e_2}\pmod N
$$

因此可計算：

$$
p=\gcd(X,N)
$$

得到 $p$ 後即可計算 $q$：

$$
q = \frac{N}{p}
$$

### 結論

實作時用已知的 $c_1, c_2$ 代替對應的模冪：

$$
(2p+3q)^E \equiv c_1^{e_2}\pmod N,\quad (5p+7q)^E \equiv c_2^{e_1}\pmod N
$$

最後計算：

$$
X \equiv 3^E\cdot c_2^{e_1} - 7^E\cdot c_1^{e_2}\pmod N
$$

$$
p = \gcd(X, N),\quad q = \frac{N}{p}
$$

## 參考程式碼

```python
from math import gcd

# 將 data.txt 給的值填入
N  = ...
e1 = ...
e2 = ...
c1 = ...
c2 = ...

E = e1 * e2

aE = pow(c1, e2, N)   # (2p+3q)^(e1*e2) mod N
bE = pow(c2, e1, N)   # (5p+7q)^(e1*e2) mod N

X = (pow(3, E, N) * bE - pow(7, E, N) * aE) % N

p = gcd(X, N)
q = N // p

print(f"crypto{{{p},{q}}}")
```
