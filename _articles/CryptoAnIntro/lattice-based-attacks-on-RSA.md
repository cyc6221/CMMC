---
layout: page
title: Lattice Based Attacks on RSA
date: 2026-02-03
last_updated: 2026-02-04
tags: [RSA, Lattice, LLL, SVP, Coppersmith]
---

本頁作為筆記索引，整理 **lattice-based techniques** 在 **RSA** 攻擊中的通用框架：將 **side information** 建模為「在 mod $N$ 下尋找 **modular small root**」，並以 **Howgrave–Graham Lemma** 與 **Coppersmith Theorem** 作為工具基礎。

> Lattices can be used to attack certain RSA-related systems when appropriate side information is available.

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
\lvert x_0 \rvert < N^{1/d}.
$$

目標是有效率地找出 $x_0$。

### The Main Idea

構造 $h(x)\in\mathbb{Z}[x]$ 使得

$$
h(x_0)\equiv 0 \pmod N.
$$

並同時讓 $h(x)$ 的係數足夠小（LLL 會用到）。以係數向量的 Euclidean norm 量化：

$$
h(x) = \sum_{i=0}^{\deg(h)} h_i x^i,
\qquad
\lVert h \rVert^2 = \sum_{i=0}^{\deg(h)} h_i^2.
$$

若能找到滿足 Lemma 所需 norm bound 的 $h$，即可把 modular root 升級成 integer root，進而求出 $x_0$。之後會考慮 $h(xX)$：當 $\lvert x_0\rvert < X$ 時，透過控制 $\lVert h(xX)\rVert$ 來推得 $\lvert h(x_0)\rvert$ 的上界，進而套用 Lemma。

<!-- --- -->

## Howgrave–Graham Lemma

<div class="theorem">

<strong>Lemma.</strong>
Let $h(x) \in \mathbb{Z}[x]$ denote a polynomial of degree at most $n$ and let $X$ and $N$ be positive integers. Suppose

$$
\lVert h(xX) \rVert < \frac{N}{\sqrt{n}}.
$$

Then if $\lvert x_0 \rvert < X$ satisfies

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

<!-- ### Example -->

<div class="example">

<strong>Example.</strong>

假設目標多項式為

$$
f(x)=x^2+ax+b,
$$

我們希望找到一個 $x_0$ 使得

$$
f(x_0)\equiv 0 \pmod N.
$$

<strong>Step 1</strong>

取 $m=2$，計算 $g_{u,v}(xX)$：

$$
\begin{aligned}
g_{0,0}(xX) &= N^2 \\
g_{1,0}(xX) &= XN^2x \\
g_{0,1}(xX) &= bN+aXNx+NX^2x^2 \\
g_{1,1}(xX) &= bNXx+aNX^2x^2+NX^3x^3 \\
g_{0,2}(xX) &= b^2+2baXx+(a^2+2b)X^2x^2+2aX^3x^3+X^4x^4 \\
g_{1,2}(xX) &= b^2Xx+2baX^2x^2+(a^2+2b)X^3x^3+2aX^4x^4+X^5x^5
\end{aligned}
$$

目標是找出這些多項式的整數線性組合，使得所得多項式的係數盡可能小。

<strong>Step 2</strong>

考慮由下列矩陣的 columns 生成的 lattice：

$$
A=
\begin{pmatrix}
N^2 & 0 & bN & 0 & b^2 & 0\\
0 & XN^2 & aXN & bNX & 2abX & Xb^2\\
0 & 0 & NX^2 & aNX^2 & (a^2+2b)X^2 & 2abX^2\\
0 & 0 & 0 & NX^3 & 2aX^3 & (a^2+2b)X^3\\
0 & 0 & 0 & 0 & X^4 & 2aX^4\\
0 & 0 & 0 & 0 & 0 & X^5
\end{pmatrix}.
$$

此矩陣的 determinant 為

$$
\det(A)=N^6X^{15}.
$$

<strong>Step 3</strong>

對矩陣 $A$ 套用 LLL，得到新的 lattice basis $B$。令 $b_1$ 為 $B$ 的第一個向量，則滿足

$$
\lVert b_1\rVert \le 2^{6/4}\det(A)^{1/6}
=2^{3/2}NX^{5/2}.
$$

因為 $b_1$ 是原 lattice 的整數組合，存在整數向量 $u=(u_1,\dots,u_6)^t$ 使得

$$
b_1=A u.
$$

對應回多項式，我們得到

$$
h(x)=u_1g_{0,0}(x)+u_2g_{1,0}(x)+\cdots+u_6g_{1,2}(x),
$$

並且有

$$
\lVert h(xX)\rVert \le 2^{3/2}NX^{5/2}.
$$

<strong>Step 4</strong>

要套用 Lemma（此處維度 $n=6$，將 $N$ 替換成 $N^2$），需要

$$
2^{3/2}NX^{5/2} < \frac{N^2}{\sqrt{6}}.
$$

因此可取

$$
\lvert x_0 \rvert \le X = \frac{N^{2/5}}{48^{1/5}}.
$$

i.e., 只要 $\lvert x_0 \rvert \le X = \frac{N^{2/5}}{48^{1/5}}$, 我們就能透過求 $h(x)$ 的整數根來找出 $f(x)$ 在 modulo $N$ 下的 small root $x_0$。

當 $\lvert x_0 \rvert < N^{0.39}$ 時會成立。

</div>

<!-- --- -->

## Coppersmith's Theorem

類似的 lattice 技術也可以套用到任意 degree 為 $d$ 的 monic polynomial。以下引述 **Coppersmith's Theorem**（single-variable small root）。

<div class="theorem">

<strong>Theorem (Coppersmith).</strong>

Let $f \in \mathbb{Z}[x]$ be a monic polynomial of degree $d$ and $N$ an integer. If there is some root $x_0$ of $f$ modulo $N$ such that
$$
\lvert x_0 \rvert \le X = N^{1/d-\epsilon}
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

## Related Attacks

- [Håstad's attack]({{ "/articles/CryptoAnIntro/Hastad’s-attack/" | relative_url }})
<!-- 
- [Franklin–Reiter attack and Coppersmith's generalization]({{ "/articles/CryptoAnIntro/franklin-reiter/" | relative_url }})
- [Extension to Wiener's attack]({{ "/articles/CryptoAnIntro/wiener-extension/" | relative_url }}) -->

<!-- --- -->

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 17. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
