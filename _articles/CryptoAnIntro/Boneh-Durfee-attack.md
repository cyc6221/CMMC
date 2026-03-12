---
layout: page
title: Boneh-Durfee Attack
date: 2026-03-11
last_updated: 2026-03-11
tags: [RSA, lattice, Coppersmith]
---

Boneh-Durfee attack 是針對 **RSA small private exponent** 的經典攻擊之一。它延伸了 Wiener’s attack 的研究方向，將可攻擊範圍從非常小的 $d$ 推進到更大的情形。相較於 Wiener’s attack 主要依賴 continued fractions，Boneh-Durfee attack 改以 **lattice reduction** 與 **Coppersmith-type small root techniques** 為核心工具。

在 balanced RSA setting 下，若 private exponent $d$ 滿足
$$
d < N^{0.292},
$$
則此方法可在特定條件下有效 recover $d$。其核心思想不是直接從 $\frac{e}{N}$ 的近似關係出發，而是先將 RSA 的 key equation 轉換成一個 modular polynomial equation，再將其化為 small root problem，最後以 lattice method 求解。

## Basic Setting

設 RSA modulus 為
$$
N = pq,
$$
其中 $p,q$ 為 large primes。public exponent 與 private exponent 分別為 $e,d$，滿足
$$
ed \equiv 1 \pmod{\varphi(N)}.
$$
因此存在整數 $k$ 使得
$$
ed - k\varphi(N) = 1.
$$

由於
$$
\varphi(N) = N - p - q + 1,
$$
上式可進一步改寫為與 $p+q$ 相關的形式。Boneh-Durfee 的關鍵做法，就是將這個關係轉成適合套用 Coppersmith method 的 polynomial congruence。

## From RSA Equation to Small Inverse Problem

由
$$
ed - k\varphi(N) = 1
$$
出發，將 $\varphi(N)$ 展開為
$$
\varphi(N)=N+1-(p+q).
$$
令
$$
A=\frac{N+1}{2}, \qquad s=-\frac{p+q}{2},
$$
則可將原式整理為
$$
ed + k(A+s) = 1
$$
的等價型態，進一步得到
$$
k(A+s) \equiv 1 \pmod e.
$$

因此問題可視為尋找小整數解 $(k,s)$ 使得
$$
f(k,s)=k(A+s)-1 \equiv 0 \pmod e.
$$

這類問題稱為 **small inverse problem**：找一個接近已知值 $A$ 的整數 $A+s$，使其模 $e$ 的 inverse 很小。

## Why the Variables Are Small

若假設
$$
d < N^\delta,
$$
則由
$$
ed-k\varphi(N)=1
$$
可知 $k$ 也會相對小。另一方面，因為 $p,q \approx \sqrt N$，所以
$$
p+q = O(N^{1/2}),
$$
因此
$$
s = O(N^{1/2}).
$$

這表示在 modular equation
$$
f(k,s)=k(A+s)-1 \equiv 0 \pmod e
$$
中，未知數 $k$ 與 $s$ 都落在相對較小的範圍內，這正是 small root method 可以發揮作用的原因。

## Core Idea of the Attack

Boneh-Durfee attack 的主軸可概括如下：

1. 從 RSA 的 key equation 建立二變數 polynomial congruence。
2. 利用未知量 $k,s$ 都很小的性質，將問題轉成 small root problem。
3. 建立一組由 shifted polynomials 構成的 lattice。
4. 對該 lattice 套用 LLL reduction。
5. 從 reduced basis 中提取出在整數上也成立的小根關係。
6. recover $(k,s)$，進而 recover $d$。

這個方法的本質是：雖然原始方程只是在模 $e$ 下成立，但透過 lattice reduction，可以構造出某些在整數上也為零的輔助多項式，最後將 small modular root 提升為 actual integer root。

## Boneh-Durfee Bound

Boneh-Durfee 的代表性結果指出，對 balanced RSA 而言，若
$$
d < N^{0.292},
$$
則此 lattice-based approach 可成功攻擊。

這比 Wiener’s bound
$$
d \le \frac{1}{3}N^{1/4}
$$
更強，因此 Boneh-Durfee attack 常被視為 **Extension to Wiener’s Attack** 的重要結果。不過兩者的方法本質不同：

- Wiener’s attack 使用 continued fractions；
- Boneh-Durfee attack 使用 lattice reduction 與 Coppersmith-type technique。

## Comparison with Wiener’s Attack

| Attack | Main Tool | Target Range |
|---|---|---|
| Wiener’s Attack | continued fractions | $d \le \frac{1}{3}N^{1/4}$ |
| Boneh-Durfee Attack | lattice / Coppersmith method | $d < N^{0.292}$ |

Wiener’s attack 較初等，推導也較直接；Boneh-Durfee 則更進階，依賴 small root theory 與 lattice-based arguments。

## Attack Outline

### Step 1. Start from the key equation

由
$$
ed-k\varphi(N)=1
$$
建立 $e,d,k,\varphi(N)$ 之間的整數關係。

### Step 2. Introduce auxiliary variables

將 $\varphi(N)$ 寫成
$$
N+1-(p+q),
$$
並引入
$$
A=\frac{N+1}{2}, \qquad s=-\frac{p+q}{2}.
$$

### Step 3. Obtain a bivariate modular polynomial

得到
$$
f(k,s)=k(A+s)-1 \equiv 0 \pmod e.
$$

### Step 4. Construct a lattice

對 $f(k,s)$ 的 shifted multiples 建立 lattice basis，使其編碼 small root structure。

### Step 5. Apply LLL reduction

透過 LLL 找到短向量，對應到新的 auxiliary polynomials。

### Step 6. Recover the small root

聯立這些 polynomial relations 求得 $(k,s)$，最後反推出 $d$。

## Remarks

<div class="remark" style="border-left:4px solid #4f46e5; background:#eef2ff; padding:12px 14px; border-radius:8px; margin:14px 0; line-height:1.6;">
<b>Remark.</b> Boneh-Durfee attack 的重點不在直接求 $\varphi(N)$ 或直接分解 $N$，而是在利用 RSA key equation 所隱含的 small-parameter structure。當 $d$ 足夠小時，相關變數會落在 small root method 可處理的範圍內，因此可透過 lattice reduction 間接 recover secret exponent。
</div>

<div class="remark" style="border-left:4px solid #4f46e5; background:#eef2ff; padding:12px 14px; border-radius:8px; margin:14px 0; line-height:1.6;">
<b>Remark.</b> 雖然它常被放在 “Extension to Wiener’s Attack” 的脈絡下介紹，但 Boneh-Durfee 與 Wiener’s attack 並不是同一種技巧的單純加強版。前者屬於 lattice-based attack，後者則是 continued-fraction attack。
</div>

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 17. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)

- CryptoHack, [*Boneh-Durfee Attack*](https://cryptohack.gitbook.io/cryptobook/untitled/low-private-component-attacks/boneh-durfee-attack).
