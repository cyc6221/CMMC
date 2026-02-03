---
layout: page
title: Lattice Based Attacks on RSA
date: 2026-02-03
last_updated: 2026-02-03
tags: [RSA, Lattice, LLL, SVP, Coppersmith]
---

本頁作為筆記索引，整理 **lattice-based techniques** 在 **RSA** 攻擊中的通用框架：將 **side information** 建模為「在 mod $N$ 下尋找 **modular small root**」，並以 **Howgrave–Graham Lemma** 與 **Coppersmith Theorem** 作為工具基礎。

> Lattices can be used to attack certain RSA-related systems when appropriate side information is available.

<!-- 相關攻擊：

- [Håstad's attack]({{ "/articles/CryptoAnIntro/hastad/" | relative_url }})
- [Franklin–Reiter attack and Coppersmith's generalization]({{ "/articles/CryptoAnIntro/franklin-reiter/" | relative_url }})
- [Extension to Wiener's attack]({{ "/articles/CryptoAnIntro/wiener-extension/" | relative_url }}) -->

<!-- --- -->

## Finding a Modular Small Root

給定 monic polynomial $f(x)\in\mathbb{Z}[x]$

$$
f(x)= f_0 + f_1 x + \cdots + f_{d-1}x^{d-1} + x^d \in \mathbb{Z}[x].
$$

令 $\deg(f)=d$，並假設存在一個 **modular small root** $x_0$ 使得

$$
f(x_0)\equiv 0 \pmod N,
\quad
|x_0|<N^{1/d}.
$$

目標是有效率地找出 $x_0$。

### The Main Idea

構造 $h(x)\in\mathbb{Z}[x]$ 使得

$$
h(x_0)\equiv 0 \pmod N.
$$

並同時讓 $h(x)$ 的係數足夠小（LLL 會用到）。以係數向量的 Euclidean norm 量化：

$$
h(x)=\sum_{i=0}^{\deg(h)} h_i x^i,
\qquad
\|h\|^2=\sum_{i=0}^{\deg(h)} h_i^2.
$$

若能找到滿足 Lemma 所需 norm bound 的 $h$，即可把 modular root 升級成 integer root，進而求出 $x_0$。之後會考慮 $h(xX)$：當 $\lvert x_0\rvert < X$ 時，透過控制 $\lVert h(xX)\rVert$ 來推得 $\lvert h(x_0)\rvert$ 的上界，進而套用 Lemma。

<!-- --- -->

## Howgrave–Graham Lemma

<div class="theorem">

<strong>Lemma.</strong>
Let $h(x) \in \mathbb{Z}[x]$ denote a polynomial of degree at most $n$ and let $X$ and $N$ be positive integers. Suppose

$$
\|h(xX)\| < \frac{N}{\sqrt{n}}.
$$

Then if $|x_0|<X$ satisfies

$$
h(x_0)\equiv 0 \pmod N,
$$

then $h(x_0) = 0$ over the integers and not just modulo $N$.

</div>

<!-- --- -->

### Intuition Behind Lemma

若 $h(x_0)\equiv 0\pmod N$，則 $N\mid h(x_0)$。只要再保證 $\lvert h(x_0)\rvert < N$，則 $h(x_0)$ 只能等於 0（因為 $(-N,N)$ 內唯一的 $N$ 倍數是 0）。

Lemma 的條件 $\lVert h(xX)\rVert < N/\sqrt{n}$ 正是用來控制在 $\lvert x_0\rvert < X$ 時的 $\lvert h(x_0)\rvert$ 上界。

### From lower powers to higher powers

若 $f(x_0)\equiv 0\pmod N$，則對任意 $k\ge 1$ 也有

$$
f(x_0)^k \equiv 0 \pmod{N^k}.
$$

這讓我們能構造在 $x_0$ 代入後必定被 $N^m$ 整除的一族多項式。

### Constructing polynomials that vanish mod $N^m$

固定參數 $m$，定義

$$
g_{u,v}(x)=N^{m-v}x^u f(x)^v,
\qquad
0\le u<d,\; 0\le v\le m.
$$

則

$$
g_{u,v}(x_0)\equiv 0 \pmod{N^m}.
$$

因為 $f(x_0)^v\equiv 0\pmod{N^v}$，再乘上 $N^{m-v}$ 使整體至少含有 $N^m$ 因子。

### Building $h(x)$ via integer combinations

取整數係數 $a_{u,v}\in\mathbb{Z}$，令

$$
h(x)=\sum_{u=0}^{d-1}\sum_{v=0}^{m} a_{u,v}\, g_{u,v}(x).
$$

由此

$$
h(x_0)\equiv 0 \pmod{N^m}.
$$

接下來要選擇 $a_{u,v}$ 讓 $h(x)$ 的係數夠小，以便套用 Lemma（將模數取為 $N^m$）。

<div class="remark">

<strong> Why LLL shows up </strong>

將每個 $g_{u,v}(xX)$ 展開成 coefficient vector，這些向量張成一個 lattice；選擇整數 $a_{u,v}$ 對應到 lattice 中的整數線性組合。
<br>
用 LLL 在 lattice 中找到 short vector，即可得到「係數小」的 $h(x)$，再用 Lemma 將 $h(x_0)\equiv 0\pmod{N^m}$ 升級為 $h(x_0)=0$，最後解出 $x_0$。

</div>

<!-- --- -->

<!-- Example -->

<!-- --- -->

## Coppersmith's Theorem

類似的 lattice 技術也可以套用到任意 degree 為 $d$ 的 monic polynomial。以下引述 **Coppersmith's Theorem**（single-variable small root）。

<div class="theorem">

<strong>Theorem (Coppersmith).</strong>

Let $f \in \mathbb{Z}[x]$ be a monic polynomial of degree $d$ and $N$ an integer. If there is some root $x_0$ of $f$ modulo $N$ such that
$$
|x_0| \le X = N^{1/d-\epsilon}
$$
then one can find $x_0$ in time polynomial in $\log N$ and $1/\epsilon$, for fixed values of $d$.

</div>

### Two-variable Analogue Lemma

在 two-variable 的情況，下方這個 lemma 是上面 **Howgrave–Graham Lemma（single-variable）** 的類比版本。

<div class="theorem">

<strong>Lemma (Two-variable analogue).</strong>

Let $h(x,y) \in \mathbb{Z}[x,y]$ denote a sum of at most $w$ monomials and suppose

<ul>
  <li>
    $h(x_0,y_0) = 0 \pmod{N^e}$ for some positive integers $N$ and $e$ where the integers $x_0$ and $y_0$ satisfy $\lvert x_0 \rvert < X \ \text{and}\ \lvert y_0 \rvert < Y$,
  </li>
  <li>
    $\lVert h(xX,yY) \rVert < N^e/\sqrt{w}$
  </li>
</ul>

Then $h(x_0,y_0) = 0$ holds over the integers.

</div>

<!-- --- -->

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 17. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
