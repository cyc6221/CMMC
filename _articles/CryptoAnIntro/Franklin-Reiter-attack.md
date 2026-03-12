---
layout: page
title: Franklin–Reiter Attack
date: 2026-03-11
last_updated: 2026-03-11
tags: [RSA, Coppersmith, related-message-attack]
---

Franklin–Reiter attack 是 **textbook RSA** 上的經典 **related-message attack**。若兩個 plaintext 之間存在已知的公開關係，並且使用相同的 RSA public key $(N,e)$ 加密，則攻擊者可將 ciphertext 對應成 polynomial equation，利用共同 root 直接 recover plaintext。這個 attack 最典型的情況是兩個 message 滿足線性關係

$$
m_1 = f(m_2) \pmod N,
\qquad
f(x)=ax+b,
$$

且 public exponent 很小，特別是 $e=3$。其核心原因在於 textbook RSA 是 deterministic 的，沒有 padding 或 randomization，因此 plaintext 的 algebraic relation 會保留到 ciphertext 的結構中。Coppersmith 之後進一步將這種想法推廣到某些帶有簡單 padding 的情況，說明若 padding 仍保留可利用的 algebraic structure，RSA 依然可能不安全。

## Basic Setting

設 Alice 的 RSA public key 為 $(N,e)$，且 Bob 傳送兩個 related messages $m_1,m_2$，滿足

$$
m_1 = f(m_2) \pmod N.
$$

對應 ciphertext 為

$$
c_1 \equiv m_1^e \pmod N,
\qquad
c_2 \equiv m_2^e \pmod N.
$$

在最典型的情況下，

$$
f(x)=ax+b,
\qquad
e=3.
$$

### Polynomial Construction

攻擊者構造兩個 polynomial：

$$
g_1(x)=x^3-c_2,
$$

$$
g_2(x)=f(x)^3-c_1.
$$

由於

$$
c_2 \equiv m_2^3 \pmod N,
\qquad
c_1 \equiv f(m_2)^3 \pmod N,
$$

所以

$$
g_1(m_2)\equiv 0 \pmod N,
\qquad
g_2(m_2)\equiv 0 \pmod N.
$$

因此 $m_2$ 是 $g_1(x)$ 與 $g_2(x)$ 的共同 root，故線性因子

$$
x-m_2
$$

同時整除這兩個 polynomial。

### Recovering the Message

接著考慮 $g_1(x)$ 與 $g_2(x)$ 的 gcd。雖然 $\mathbb{Z}/N\mathbb{Z}[x]$ 一般不是 Euclidean ring，但在

$$
f(x)=ax+b,
\qquad
e=3
$$

的情況下，只要 gcd 存在，它必然是

$$
x-m_2.
$$

因此可直接 recover $m_2$，再由

$$
m_1=f(m_2)\pmod N
$$

得到 $m_1$。

<div class="remark" style="border-left:4px solid #2563eb; background:#eff6ff; padding:12px 14px; border-radius:8px; margin:14px 0; line-height:1.7;">
<b>Remark.</b>
若 Euclidean algorithm 在計算過程中失敗，這種失敗本身也可能洩漏 $N$ 的非平凡因數，因而導致 factorization of $N$。
</div>

### A Typical Special Case

若兩個 message 只差一個已知常數，則可寫成

$$
m_1 = m_2 + b \pmod N.
$$

此時令

$$
f(x)=x+b,
$$

則對應 polynomial 為

$$
g_1(x)=x^e-c_2,
\qquad
g_2(x)=(x+b)^e-c_1.
$$

當 $e$ 很小，特別是 $e=3$ 時，可直接套用 Franklin–Reiter attack。

## Coppersmith's Generalization

設 $N$ 為 $n$-bit RSA modulus，$m$ 為 $k$-bit message。若在 message 上附加長度為 $n-k$ 的 random bits，則可寫成

$$
m' = 2^{n-k}m + r.
$$

若同一個 message 被傳送兩次，則兩次對應的 messages 為

$$
m_1 = 2^{n-k}m + r_1,
$$

$$
m_2 = 2^{n-k}m + r_2,
$$

其中 $r_1,r_2$ 為不同的 random $(n-k)$-bit 數。

令

$$
y_0=r_2-r_1,
$$

並考慮

$$
g_1(x,y)=x^e-c_1,
$$

$$
g_2(x,y)=(x+y)^e-c_2.
$$

對變數 $x$ 取 resultant，可得到一個只含 $y$ 的 polynomial $h(y)$。此時

$$
y_0=r_2-r_1
$$

是 $h(y)$ 的 small root。利用 Coppersmith method 可 recover $r_2-r_1$，再回到 Franklin–Reiter 型的 related-message setting 求得原始 message。
