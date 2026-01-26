---
layout: page
title: Wiener's Attack on RSA
date: 2026-01-26
last_updated: 2026-01-26
tags: [attack, RSA]
---

在 RSA 中，通常會選擇較小的 public exponent $e$ (常見：$e=3, 17, 65537$)。Sometimes 有人會想要更快的 private key operations，這時候他們會選擇把 private exponent $d$ 也選小一點。

但是如果 $d$ 選得太小，這會導致

1. 對應的 $e \equiv d^{-1} \pmod{\varphi(N)}$ 通常不再是常見的小值（如 65537），而會落在 $[1,\varphi(N))$ 中的某個較大值。
2. $d$ 太小會不安全，除了 **暴力搜尋 exhaustive search** 可以破解，還可以使用 **連分數 continued fractions** 方式攻擊 。

這種使用連分數的攻擊，稱作 Wiener's Attack。

<div class="remark">

<strong> Note. </strong>

Wiener’s attack shows that RSA is insecure if the private exponent is too small. <br>
In particular, if \(d < \tfrac{1}{3}N^{1/4}\) (under standard RSA assumptions), then \(d\) can be recovered efficiently using continued fractions. <br>
Hence, one should avoid choosing such small \(d\). <br>

</div>

## 連分數（continued fractions）

### continued fraction expansion

給定一個實數 $\alpha \in \mathbb{R}$，令

* $\alpha_0 = \alpha$
* $a_0 = \lfloor \alpha_0 \rfloor$（$\alpha$ 的整數部分）

接著對每個 $i \ge 0$，定義：
$$
a_i = \lfloor \alpha_i \rfloor,\qquad
\alpha_{i+1} = \frac{1}{\alpha_i-a_i}.
$$

* $a_i$ 是 $\alpha_i$ 的整數部分
* $\alpha_i - a_i$ 是 $\alpha_i$ 的小數部分
* 把小數部分取倒數，遞迴下去，得到一串整數 $a_0,a_1,a_2,\dots$

這串整數 $a_0,a_1,a_2,\dots$ 就叫做 $\alpha$ 的 **continued fraction expansion**。

### convergents

定義兩個整數序列 $p_i, q_i$ 來生成一連串分數 $\frac{p_i}{q_i}$，稱為 **convergents**。

初始化：

* $p_0 = a_0, q_0 = 1$
* $p_1 = a_0 a_1 +1, q_1 = a_1$
* For $i\ge 2$,

$$
p_i=a_i p_{i-1}+p_{i-2},\qquad
q_i=a_i q_{i-1}+q_{i-2}.
$$

<div class="definition">

<strong> Definition. </strong>

The integers $a_0, a_1, a_2, \dots$ are called the continued fraction expansion of $\alpha$ and the fractions $\frac{p_i}{q_i}$ are called the convergents.

</div>

### Fact 1: $\gcd(p_i,q_i)=1$

每個 convergent $\frac{p_i}{q_i}$ 都是**最簡分數**（分子分母互質）：
$$
\gcd(p_i,q_i)=1\quad \forall i.
$$

### Fact 2: 分母 $q_i$ 成長很快

$$
q_i=a_i q_{i-1}+q_{i-2} \ge q_{i-1} +q_{i-2}
$$
因此 $q_i$ 至少以 Fibonacci 速度成長（近似指數成長）。分母越來越大，所以 convergents 的近似也越來越精細。

### 重要結果

若 $p, q$ 是整數且滿足
$$
\left|\alpha - \frac{p}{q}\right|\le \frac{1}{2q^2},
$$
那麼 $\frac{p}{q}$ 一定是 $\alpha$ 的某個 convergent（出現在連分數展開的收斂子序列中）。

<div class="remark">

If $p$ and $q$ are two integers with
$$
\left|\alpha - \frac{p}{q}\right|\le \frac{1}{2q^2},
$$
then $\frac{p}{q}$ is a convergent of the continued fraction expansion of $\alpha$.

</div>

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 17. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
