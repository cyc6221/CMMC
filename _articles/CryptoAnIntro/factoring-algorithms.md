---
layout: page
title: Factoring Algorithms
date: 2026-03-30
last_updated: 2026-03-30
tags: [factoring, integer-factorization, sub-exponential-time, trial-division, factoring-methods]
---

整數分解問題的目標是：給定一個合數 $N$，找出它的非平凡因數。若 $N=pq$，其中 $p,q$ 是大質數，則從 $N$ 回推出 $p,q$ 在一般情況下並不容易。這也是 RSA 等公鑰密碼系統安全性的重要背景之一。

分解演算法通常可分成兩大類。較早期的方法包括 trial division、$p-1$ method、$p+1$ method 與 Pollard rho method；現代方法則包括 Continued Fraction Method (CFRAC)、Quadratic Sieve (QS)、Elliptic Curve Method (ECM) 與 Number Field Sieve (NFS)。不同方法之間的差異，主要在於如何構造足夠有效的關係式來導出因數。

## Complexity of Factoring

現代分解法的時間複雜度通常不是 polynomial time，也不像最直接的方法那樣達到完全 exponential time，而是落在兩者之間，稱為 sub-exponential time。描述這一類複雜度時，常使用 $L_N(\alpha,\beta)$ 這個記號。

<div class="definition">
<div><strong>Definition.</strong></div>
For $N$ a positive integer, define
$$
L_N(\alpha,\beta)=\exp\!\Big((\beta+o(1))(\log N)^\alpha(\log\log N)^{1-\alpha}\Big).
$$
</div>

這個函數可視為 polynomial time 與 exponential time 之間的插值尺度。當 $\alpha=0$ 時，複雜度接近 $(\log N)^{\beta+o(1)}$，屬於 polynomial-time 的型態；當 $\alpha=1$ 時，則接近 $N^{\beta+o(1)}$，屬於 exponential-time 的型態。因此，當 $\alpha$ 介於 $0$ 與 $1$ 之間時，就對應到 sub-exponential 的複雜度。

常見分解演算法的量級可用這個函數表達如下：

- trial division：$L_N(1,1/2)$
- Quadratic Sieve：$L_N(1/2,c)$
- Number Field Sieve：$L_N(1/3,c)$

這些表示法反映出：越先進的演算法，其 $\alpha$ 越小，代表成長速度越慢，對大整數越有利。

## Trial Division

Trial division 是最直接的分解方法。做法是從小到大檢查每個整數 $p$ 是否整除 $N$。若 $p\mid N$，就持續除下去直到不能再除，並記錄該因數的指數。

<div class="algorithm">
<div><strong>Algorithm.</strong></div>
For $p=2,3,\dots,\lfloor\sqrt{N}\rfloor$:
<ul>
  <li>If $p\mid N$, repeatedly divide $N$ by $p$.</li>
  <li>Output the factor $p$ together with its exponent.</li>
</ul>
</div>

這個方法的最壞情況時間約為
$$
O(\sqrt{N}).
$$
若輸入大小以 $\log_2 N$ 衡量，則這樣的時間複雜度是 exponential 的，因此不適合處理很大的整數。不過在數值很小的情況下，trial division 仍然是最自然也最實用的方法之一。

## Dark Age Methods and Modern Methods

分解演算法的發展歷程中，常會把方法區分成較早期的方法與現代方法。前者通常依賴較直接的數論性質，例如某個因數的 $p-1$ 或 $p+1$ 是否具有特殊結構；後者則會利用 smoother 的輔助數值、篩法、關係式蒐集以及線性代數等技巧。

<div class="remark">
<div><strong>Remark.</strong></div>
Factoring methods are usually divided into Dark Age methods such as trial division, $p-1$ method, $p+1$ method, and Pollard rho method, and modern methods such as CFRAC, QS, ECM, and NFS.
</div>

較早期的方法有時在特定型態的整數上表現很好，但通常不是通用且穩定的最佳選擇。現代方法則更偏向 general-purpose factoring，也就是對沒有特殊結構的合數仍能有效工作。

## General Role of Modern Factoring Algorithms

現代分解法雖然名稱與技術細節不同，但核心方向相當一致：都希望把分解問題轉成蒐集大量 relations，再透過這些 relations 合成一個有用的 congruence，最後導出非平凡因數。

這類方法之所以有效，是因為直接找因數通常太困難，但若能先找到大量容易處理的結構，再把它們整合起來，就有機會把原本困難的問題轉換成較可控制的線性代數問題。

## Difference of Two Squares as the Central Theme

許多分解演算法最後都會歸結到同一個核心想法：找出兩個整數 $x,y$，使得
$$
x^2 \equiv y^2 \pmod N.
$$
若找到這樣的 $x,y$，則有
$$
x^2-y^2=(x-y)(x+y)\equiv 0 \pmod N.
$$
這表示 $N$ 整除 $(x-y)(x+y)$。若 $N=pq$，則有機會讓某個因數落在 $x-y$ 中，另一個因數落在 $x+y$ 中，於是便可藉由
$$
\gcd(x-y,N)
$$
取出一個非平凡因數。

這個思路說明了：分解問題往往不是直接從 $N$ 本身下手，而是轉而尋找某種平方同餘，再由平方同餘反推出因數。

## Why Factoring Is Still Hard in Practice

雖然存在許多分解演算法，但對足夠大的整數而言，分解仍然非常困難。困難不只在理論複雜度，也在實作成本。即使是目前最快的通用方法 Number Field Sieve，也需要大量 relation collection、龐大的記憶體，以及高成本的線性代數運算。

<div class="remark">
<div><strong>Remark.</strong></div>
Modern factoring algorithms lie somewhere between polynomial and exponential time, in an area called sub-exponential time.
</div>

這也說明了為什麼在密碼學中，只要模數大小選得足夠大，整數分解問題仍能作為可信的計算困難性來源。

## Practical Viewpoint

從實務角度來看，分解演算法通常不是單看理論複雜度就能判斷效能。不同方法在不同型態的整數上有不同優勢。例如，若某些質因數附近具有特殊結構，專門方法可能很快成功；若沒有特殊結構，則往往要依靠 QS 或 NFS 這類通用方法。

因此，在理解 factoring algorithms 時，重點不只是記住有哪些方法，而是掌握以下幾個核心觀念：

- trial division 是最基本但成長太快的方法；
- 現代方法大多屬於 sub-exponential time；
- 很多方法最終都依賴 difference of two squares；
- 不同演算法的主要差別，在於 relation 是如何被找到的。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 12. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
