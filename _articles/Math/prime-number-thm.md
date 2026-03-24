---
layout: page
title: Prime Number Theorem
date: 2026-03-25
last_updated: 2026-03-25
label: "prime"
tags: [prime]
---

## Overview

Prime Number Theorem（質數定理）描述的是：當整數愈來愈大時，質數在整數中的分布會如何變得稀疏。它的核心結論是，計算不超過 $x$ 的質數個數時，$\pi(x)$ 的成長速度與 $\frac{x}{\log x}$ 漸近相同。

<div class="definition">
<strong>Definition.</strong>
令
$$
\pi(x)=|\{p\le x : p \text{ is prime}\}|
$$
表示 **prime-counting function**，也就是不超過 $x$ 的質數個數。
</div>

例如：
$$
\pi(10)=4,\qquad \pi(20)=8,\qquad \pi(100)=25.
$$

因此，Prime Number Theorem 所回答的核心問題就是：當 $x$ 很大時，$\pi(x)$ 大約有多大。

## Statement of the Theorem

<div class="theorem">
<strong>Theorem (Prime Number Theorem).</strong>
當 $x\to\infty$ 時，
$$
\pi(x)\sim \frac{x}{\log x}.
$$
也就是說，
$$
\lim_{x\to\infty}\frac{\pi(x)}{x/\log x}=1.
$$
</div>

這裡的符號 $\sim$ 表示兩個函數 **asymptotically equivalent**，意思是它們的比值在極限下趨近於 $1$。因此，雖然 $\frac{x}{\log x}$ 不等於 $\pi(x)$，但當 $x$ 很大時，它是一個非常重要而且自然的近似。

同樣的敘述也可以寫成
$$
\pi(x)=\frac{x}{\log x}(1+o(1)).
$$

<div class="remark">
<strong>Remark.</strong>
Prime Number Theorem 提供的是一個 **漸近公式**，而不是精確公式。它描述的是質數整體分布的長期趨勢，而不是某個具體範圍內每一個質數的位置。
</div>

## Intuition

Prime Number Theorem 的直觀想法是：當數字變大時，質數會變得愈來愈少。在接近 $x$ 的位置附近，一個整數是質數的「密度」大約像是
$$
\frac{1}{\log x}.
$$

因此，從 $1$ 到 $x$ 的整體質數數量，便可以粗略理解為
$$
x\cdot \frac{1}{\log x}=\frac{x}{\log x}.
$$

這個推理本身不是嚴格證明，但它說明了為什麼 $\frac{x}{\log x}$ 會自然地出現在質數定理中。

<div class="remark">
<strong>Remark.</strong>
這裡的「像是 $\frac{1}{\log x}$」並不是指真正的機率模型，而是一種對質數密度的非正式理解。Prime Number Theorem 的真正證明需要更深的解析數論工具。
</div>

## Equivalent Forms

Prime Number Theorem 還可以寫成幾種等價形式。例如，
$$
\pi(x)\sim \frac{x}{\log x}
$$
等價於
$$
\frac{\pi(x)\log x}{x}\to 1.
$$

這些寫法表達的是同一件事：$\pi(x)$ 與 $\frac{x}{\log x}$ 的相對誤差會隨著 $x\to\infty$ 而趨近於 $0$。

<div class="remark">
<strong>Remark.</strong>
在漸近分析中，$\sim$ 比單純的同階估計更強。若 $f(x)\sim g(x)$，表示 $f(x)$ 與 $g(x)$ 不只是同樣大小，而是它們的比值真的收斂到 $1$。
</div>

## A Better Approximation

雖然 $\frac{x}{\log x}$ 已經抓到了主要趨勢，但更精細的近似通常是 logarithmic integral：
$$
\operatorname{Li}(x)=\int_2^x \frac{dt}{\log t}.
$$

在許多範圍內，$\operatorname{Li}(x)$ 會比 $\frac{x}{\log x}$ 更接近 $\pi(x)$。因此，$\frac{x}{\log x}$ 可以看成最基本的第一階近似，而 $\operatorname{Li}(x)$ 則是更自然的修正版本。

<div class="remark">
<strong>Remark.</strong>
Prime Number Theorem 的重點在於建立主項的漸近行為，也就是 $\frac{x}{\log x}$。至於更細緻的誤差分析，則會進一步連到 zeta function 與其零點分布。
</div>

## Historical Note

<div class="theorem">
<strong>Theorem.</strong>
Prime Number Theorem 由 Hadamard 與 de la Vallée Poussin 在 1896 年獨立證明。
</div>

他們的證明依賴 Riemann zeta function 的解析性質，特別是
$$
\zeta(s)\neq 0\qquad \text{for } \operatorname{Re}(s)=1.
$$

這個結果是解析數論中的重要里程碑，也顯示質數分布與複分析之間有非常深刻的聯繫。

## Why It Matters

Prime Number Theorem 很重要，因為它首次以精確的漸近形式描述了質數的整體分布。它說明了兩件基本事實：

第一，質數雖然無窮多，但它們在整數中的密度會逐漸下降。  
第二，在大尺度下，質數分布的主導項由 $\log x$ 所控制。

這使得 Prime Number Theorem 成為數論中的核心結果，也成為後續研究更細緻質數分布問題的重要起點。

<div class="remark">
<strong>Remark.</strong>
Prime Number Theorem 描述的是質數的 **global asymptotic distribution**，而不是局部間距的精細規律。它給出的是平均層次的整體行為，而不是每一段區間中的精確結構。
</div>

## Next

在理解 Prime Number Theorem 之後，通常可以進一步討論以下主題：

1. Chebyshev bounds  
2. logarithmic integral $\operatorname{Li}(x)$  
3. Riemann zeta function  
4. error term in the Prime Number Theorem  
5. primes in arithmetic progressions

## References

- [Prime Number Theorem](https://en.wikipedia.org/wiki/Prime_number_theorem)
- [質數定理](https://zh.wikipedia.org/wiki/%E8%B3%AA%E6%95%B8%E5%AE%9A%E7%90%86)
- [Prime-counting function](https://en.wikipedia.org/wiki/Prime-counting_function)
- [質數計算函數](https://zh.wikipedia.org/wiki/%E7%B4%A0%E6%95%B0%E8%AE%A1%E6%95%B0%E5%87%BD%E6%95%B0)
