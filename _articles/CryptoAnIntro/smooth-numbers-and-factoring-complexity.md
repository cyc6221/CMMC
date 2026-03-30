---
layout: page
title: Smooth Numbers and Factoring Complexity
date: 2026-03-30
last_updated: 2026-03-30
tags: [smooth-numbers, factoring-complexity, sub-exponential-time, dickman-de-bruijn-function, power-smooth]
---

Smooth numbers 在整數分解演算法中扮演核心角色。許多現代 factoring methods 並不是直接對目標整數 $N$ 做分解，而是先尋找一些與 $N$ 有關的輔助數值，並希望這些數值能夠完全分解成小質數的乘積。只要這樣的數值出現得夠多，就能把它們轉化為 relations，再透過線性代數進一步構造出平方同餘。

## Smooth Numbers

<div class="definition">
<div><strong>Definition 12.2 (Smooth Number).</strong></div>
Let $B$ be an integer. An integer $N$ is called $B$-smooth if every prime factor $p$ of $N$ is less than $B$.
</div>

若一個整數的所有質因數都很小，則它在 factoring algorithms 中就比較容易處理。因為這表示它可以完全分解到某個有限的小質數集合，也就是 factor base 上。

例如
$$
N = 2^{78}\cdot 3^{89}\cdot 11^3
$$
是 $12$-smooth，因為它的所有質因數都小於 $12$。

在分解演算法中，smoothness bound $B$ 的選擇非常重要。若 $B$ 太小，雖然 factor base 比較短，但符合條件的 smooth numbers 很少；若 $B$ 太大，smooth number 的數量會增加，但每一個 relation 的處理成本也會隨之上升。因此演算法通常需要在這兩者之間做平衡。

## Counting Smooth Numbers

若要分析 factoring algorithm 的效率，就需要知道在某個範圍內，smooth numbers 大約有多少。常用的記號是 $\psi(x,y)$，表示所有不超過 $x$ 的 $y$-smooth integers 的個數。

令
$$
u=\frac{\log x}{\log y}.
$$
則 $\psi(x,y)$ 的行為可用 Dickman--de Bruijn function $\rho(u)$ 近似描述。

<div class="definition">
<div><strong>Definition.</strong></div>
The Dickman--de Bruijn function $\rho$ is defined as the function which satisfies
$$
u\rho'(u)+\rho(u-1)=0
$$
for $u>1$.
</div>

實際分析時，常使用它的漸近近似
$$
\rho(u)\approx u^{-u}
\qquad (u\to\infty).
$$
因此有
$$
\psi(x,y)\approx x\rho(u).
$$

這個式子的意義是：若 $u$ 變大，也就是 $y$ 相對於 $x$ 變小，那麼 $y$-smooth numbers 的密度會快速下降。也就是說，要求一個大數只由很小的質數組成，機率通常非常低。

## Smoothness Proportion

在 factoring complexity 的分析中，常用下列敘述來估計 smooth numbers 的比例。

<div class="theorem">
<div><strong>Theorem 12.3.</strong></div>
The proportion of integers less than $x$, which are $x^{1/u}$-smooth, is asymptotically equal to $u^{-u}$.
</div>

這表示：若考慮所有不超過 $x$ 的整數，其中屬於 $x^{1/u}$-smooth 的比例大約是 $u^{-u}$。因此 smoothness 不是一個局部現象，而是可以用明確的漸近公式來估計的統計現象。

這個結果對 factoring algorithms 特別重要，因為這些演算法往往就是在大量候選數中搜尋 smooth values。若知道 smooth values 的出現比例，就能估計平均需要搜尋多少候選值，才能收集到足夠多的 relations。

## Smoothness and $L_N(\alpha,\beta)$

描述 factoring algorithms 的複雜度時，常使用
$$
L_N(\alpha,\beta)=\exp\!\Big((\beta+o(1))(\log N)^\alpha(\log\log N)^{1-\alpha}\Big).
$$
若把 smoothness bound 選成
$$
y=L_N(\alpha,\beta),
$$
則
$$
u=\frac{\log N}{\log y}
=\frac{1}{\beta}\left(\frac{\log N}{\log\log N}\right)^{1-\alpha}.
$$

將這個量代入 smooth number 的估計後，可得到
$$
\frac{1}{N}\psi(N,y)\approx u^{-u}
\approx \frac{1}{L_N(1-\alpha,\gamma)}
$$
其中 $\gamma$ 是某個常數。

這說明了非常重要的一點：若想找小於 $N$ 且 $L_N(\alpha,\beta)$-smooth 的數，其成功機率大約會落在
$$
\frac{1}{L_N(1-\alpha,\gamma)}
$$
這個量級。也就是說，smoothness bound 的指數參數 $\alpha$，會與找到 smooth number 的機率形成某種互補關係。

## Why $\alpha=\frac12$ Naturally Appears

許多 factoring methods 的複雜度會落在
$$
L_N(1/2,c)
$$
附近，這並不是偶然。原因在於：若 smoothness bound 選得太小，smooth numbers 太稀少；若選得太大，雖然 smoothness 機率提高，但 factor base 與 relation processing 的成本也會升高。

在這兩個方向之間做平衡時，常自然導出
$$
\alpha=\frac12.
$$
這也是為什麼許多經典方法，例如 Quadratic Sieve，其複雜度落在
$$
L_N(1/2,c)
$$
的型態。

更先進的方法，例如 Number Field Sieve，之所以能突破這個界線，是因為它不再只是單純依賴整數上的 smoothness，而是利用更深層的代數結構，在 relation collection 上取得更好的 asymptotic behavior。

## Power Smooth

有些分解方法不只要求所有質因數都小，還要求所有出現的 prime powers 也受到控制。這會導向 power smooth 的概念。

<div class="definition">
<div><strong>Definition 12.4 (Power Smooth).</strong></div>
A number is said to be $B$-power smooth if every prime power dividing $N$ is less than $B$.
</div>

例如
$$
N=2^5\cdot 3^3
$$
是 $33$-power smooth，因為所有整除它的 prime powers 都不超過 $33$。

這個概念比一般 smooth 更強。因為一般的 $B$-smooth 只要求每個 prime factor 小於 $B$，但不限制高次冪的大小；而 $B$-power smooth 則連 $p^e$ 這種 prime power 的大小也一併限制。

## Why Power Smoothness Matters

Power smooth 的條件在某些 specialized factoring algorithms 中非常重要，尤其是像 Pollard's $P-1$ method 這類會用到某個因數 $p$ 的群階 $p-1$ 的方法。

若 $p-1$ 是 $B$-power smooth，則 $p-1$ 的所有 prime powers 都不超過 $B$，這意味著它很可能整除某個像 $B!$ 這樣的整數。如此一來，就能利用模 $p$ 的乘法群結構把 $p$ 從 $N$ 中分離出來。

因此，smooth 與 power smooth 雖然都是描述因數「小不小」的條件，但它們在演算法中的角色不同：

- smooth 常用於 relation collection；
- power smooth 常用於利用群階結構的 specialized methods。

## Smooth Numbers and Relation Collection

在許多現代 factoring methods 中，relation collection 的目標，就是找出一些可以完全分解到 factor base 上的數值。例如在 sieve-based methods 中，會尋找許多候選整數，使它們的值是 $B$-smooth。只要找到的 relations 數量多於 factor base 的大小，就可以開始用線性代數組合出平方。

因此，smooth numbers 的分布直接決定了 factoring methods 的效率。若 smooth numbers 太罕見，relation collection 就會花費極大成本；若 smoothness bound 選得適當，relations 的蒐集速度就會顯著提升。

<div class="remark">
<div><strong>Remark.</strong></div>
Suppose we are looking for numbers less than $N$ which are $L_N(\alpha,\beta)$-smooth. The probability that any number less than $N$ is actually $L_N(\alpha,\beta)$-smooth is given by $1/L_N(1-\alpha,\gamma)$.
</div>

這個估計正是現代 factoring complexity 分析中的基礎之一。它把「smooth numbers 的稀有程度」直接轉換成「relation collection 所需工作量」的量級。

## Smoothness as a Design Constraint

在 factoring algorithms 中，smoothness 並不只是分析工具，也是一種設計約束。演算法在構造候選值時，通常都會刻意讓這些值的大小、分布或代數結構更有利於 smoothness。換句話說，演算法本身的設計，往往就是在提高找到 smooth values 的機率。

因此，理解 smooth numbers 不只是為了知道某個定義，而是為了掌握整數分解演算法中最核心的概率現象之一。很多 factoring method 的差異，最終都可以理解成：它們是如何以不同方式去提高找到 smooth relations 的效率。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 12. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
