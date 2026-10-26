---
layout: page
title: Riemann Hypothesis
date: 2026-10-26
last_updated: 2026-10-27
---

**Riemann Hypothesis (RH)**，黎曼猜想：Riemann zeta function 所有非平凡零點的實部都是 $\frac12$。這個猜想等價於 $\pi(x)$ 與 $\operatorname{Li}(x)$ 之間的誤差界，也是 Clay Millennium Prize Problems 之一。

## Riemann Zeta Function

<div class="definition">
<strong>Definition.</strong>
當 $\operatorname{Re}(s)>1$ 時，
$$
\zeta(s)=\sum_{n=1}^{\infty}\frac{1}{n^s}.
$$
</div>

這個級數在 $\operatorname{Re}(s)>1$ 絕對收斂，且可以解析延拓到整個複平面，只在 $s=1$ 有一個簡單極點。

### Euler Product

<div class="theorem">
<strong>Theorem (Euler product).</strong>
For $\operatorname{Re}(s)>1$,
$$
\zeta(s)=\prod_{p\text{ prime}}\frac{1}{1-p^{-s}}.
$$
</div>

這個乘積式把 $\zeta(s)$ 與質數連在一起。質數分布的資訊，因此可以轉成 $\zeta(s)$ 的解析性質，特別是零點的位置。

### Functional Equation

<div class="theorem">
<strong>Theorem (Functional equation).</strong>
$$
\zeta(s)=2^s\pi^{s-1}\sin\!\left(\frac{\pi s}{2}\right)\Gamma(1-s)\,\zeta(1-s).
$$
</div>

函數方程把 $s$ 與 $1-s$ 兩側的值連起來，對稱中心是 $\operatorname{Re}(s)=\frac12$。

## Zeros of the Zeta Function

### Trivial Zeros

從函數方程可以看出，$\sin\!\left(\frac{\pi s}{2}\right)$ 在 $s=-2,-4,-6,\dots$ 為零，而此時 $\Gamma(1-s)\zeta(1-s)$ 沒有極點抵消，因此這些點是 $\zeta(s)$ 的零點，稱為 **trivial zeros**。

### Non-trivial Zeros

其餘的零點稱為 **non-trivial zeros**，它們全部落在 **critical strip**
$$
0<\operatorname{Re}(s)<1
$$
之內。若 $\rho$ 是 non-trivial zero，則 $\bar\rho$、$1-\rho$、$1-\bar\rho$ 也都是零點。因此零點對實軸與直線 $\operatorname{Re}(s)=\frac12$ 都對稱。

直線 $\operatorname{Re}(s)=\frac12$ 稱為 **critical line**。

<div class="example">
<strong>Example.</strong>
最小虛部的 non-trivial zeros 為 $\frac12\pm 14.1347\dots i$，它們落在 critical line 上。
</div>

## Statement of the Hypothesis

<div class="theorem">
<strong>Conjecture (Riemann Hypothesis).</strong>
Every non-trivial zero $\rho$ of $\zeta(s)$ satisfies $\operatorname{Re}(\rho)=\frac12$.
</div>

換句話說，所有 non-trivial zeros 都排在 critical line 上。已知它們在 critical strip 內，所以 RH 要排除的是 strip 中 critical line 以外的零點。

## Connection to Primes

質數的資訊透過 Chebyshev 函數
$$
\psi(x)=\sum_{n\le x}\Lambda(n)
$$
與零點連結，其中 $\Lambda(n)=\log p$ 當 $n=p^k$，其餘為 $0$。

<div class="theorem">
<strong>Theorem (Explicit formula, von Mangoldt).</strong>
For $x>1$ not a prime power,
$$
\psi(x)=x-\sum_{\rho}\frac{x^{\rho}}{\rho}-\log(2\pi)-\frac12\log\!\left(1-x^{-2}\right),
$$
where $\rho$ runs over the non-trivial zeros of $\zeta(s)$ (summed symmetrically).
</div>

每個 non-trivial zero $\rho$ 對應一個 $x^{\rho}$ 項，而 $|x^{\rho}|=x^{\operatorname{Re}(\rho)}$。所以零點的實部決定該項的大小。

<div class="theorem">
<strong>Theorem (von Koch, 1901).</strong>
The Riemann Hypothesis is equivalent to
$$
\pi(x)=\operatorname{Li}(x)+O\!\left(\sqrt{x}\,\log x\right).
$$
</div>

[Prime Number Theorem]({{ '/articles/Math/prime-number/prime-number-theorem/' | relative_url }}) 只需要 $\zeta(1+it)\neq 0$，也就是零點不在 $\operatorname{Re}(s)=1$ 上，得到的是 $\pi(x)\sim\frac{x}{\log x}$。

## Known Results

<div class="theorem">
<strong>Theorem (Hardy, 1914).</strong>
$\zeta(s)$ has infinitely many zeros on the critical line $\operatorname{Re}(s)=\frac12$.
</div>

<div class="theorem">
<strong>Theorem (Hadamard, de la Vallée Poussin, 1896).</strong>
$\zeta(1+it)\neq 0$ for all real $t$.
</div>

## Videos

### 李永乐老师

- [【李永乐老师】黎曼猜想（一）为什么全体自然数的和等于-1/12](https://www.youtube.com/watch?v=lsBcU-IrmpE)
- [【李永乐老师】黎曼猜想（二）什么是质数？质数的分布有什么规律？](https://www.youtube.com/watch?v=IVn3mKCTjI0)
- [【李永乐老师】黎曼猜想（三）世界上最难赚的100万美元](https://www.youtube.com/watch?v=e-w1gZP2zfE)

<div class="video-window">
  <div class="video-window__title">NOW PLAYING: 【李永乐老师】黎曼猜想（一）为什么全体自然数的和等于-1/12</div>
  <div class="video-window__body">
    <iframe
      src="https://www.youtube.com/embed/lsBcU-IrmpE"
      title="【李永乐老师】黎曼猜想（一）为什么全体自然数的和等于-1/12"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen>
    </iframe>
  </div>
</div>

### 黎曼猜想（二）什麼是質數？質數的分布有什麼規律？

<div class="video-window">
  <div class="video-window__title">NOW PLAYING: 【李永乐老师】黎曼猜想（二）什么是质数？质数的分布有什么规律？</div>
  <div class="video-window__body">
    <iframe
      src="https://www.youtube.com/embed/IVn3mKCTjI0"
      title="【李永乐老师】黎曼猜想（二）什么是质数？质数的分布有什么规律？"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen>
    </iframe>
  </div>
</div>

### 黎曼猜想（三）世界上最難賺的 100 萬美元

<div class="video-window">
  <div class="video-window__title">NOW PLAYING: 【李永乐老师】黎曼猜想（三）世界上最难赚的100万美元</div>
  <div class="video-window__body">
    <iframe
      src="https://www.youtube.com/embed/e-w1gZP2zfE"
      title="【李永乐老师】黎曼猜想（三）世界上最难赚的100万美元"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen>
    </iframe>
  </div>
</div>

## References

- [Riemann hypothesis](https://en.wikipedia.org/wiki/Riemann_hypothesis)
- [黎曼猜想](https://zh.wikipedia.org/wiki/%E9%BB%8E%E6%9B%BC%E7%8C%9C%E6%83%B3)
- [Riemann zeta function](https://en.wikipedia.org/wiki/Riemann_zeta_function)
- [Clay Mathematics Institute: Riemann Hypothesis](https://www.claymath.org/millennium/riemann-hypothesis/)
