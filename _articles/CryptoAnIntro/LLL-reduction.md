---
layout: page
title: LLL reduction
date: 2026-02-02
last_updated: 2026-02-02
tags: [Lattice, math, algorithms]
---

## Definition

<div class="definition">

<strong>Definition (LLL-reduced basis).</strong>

Let $L \subset \mathbb{R}^n$ be a lattice, and let $B={b_1,\dots,b_m}$ be an ordered basis of $L$.

Let ${b_1^*,\dots,b_m^*}$ be the associated <em>Gram–Schmidt orthogonalization</em> (GSO) of $B$, defined by

$$
b_i^* ;=; b_i ;-; \sum_{j=1}^{i-1}\mu_{i,j} b_j^*, \quad (1\le i\le m),
$$

where the <em>Gram–Schmidt coefficients</em> are

$$
\mu_{i,j} ;=; \frac{\langle b_i,, b_j^*\rangle}{\langle b_j^*,, b_j^*\rangle}, \quad (1\le j<i\le m).
$$

The basis $B$ is called <em>LLL-reduced</em> (with parameter $\delta=\tfrac{3}{4}$) if it satisfies:

<strong>(A) Size reduction:</strong> for all $1\le j<i\le m$,

$$
|\mu_{i,j}|\le \frac{1}{2}.
$$

<strong>(B) Lovász condition:</strong> for all $2\le i\le m$,

$$
|b_i^*|^2 ;\ge; \left(\frac{3}{4}-\mu_{i,i-1}^2\right),|b_{i-1}^*|^2.
$$

</div>

### The importance of LLL-reduced basis

* LLL algorithm 可以在 **polynomial time** 內把任意 lattice basis 約化成 LLL-reduced basis（效率可保證）。
* 約化後的第一個向量 $b_1$ 會很短，且接近 **shortest non-zero vector**（最短非零向量）的長度：對所有非零 $x\in L$，
  $$
  |b_1|\le 2^{(m-1)/2},|x|.
  $$
  這代表 LLL 提供一個對 **SVP approximation**（Shortest Vector Problem 的近似）有理論保證的解。
* 另外也有一個用 lattice 的 **determinant**（體積）表示的界。若 $\Delta=\det(L)$，則
  $$
  |b_1|\le 2^{m/4},\Delta^{1/m}.
  $$
  直覺上 $\Delta^{1/m}$ 是 lattice 的「平均尺度」，而 LLL 保證找到的第一向量不會離這個尺度太遠（乘上一個指數因子）。

### Worst-case vs. practice

上面界中的常數 $2^{(m-1)/2}$ 是 **worst-case bound**。實務上對很多「合理維度」的 lattice，跑完 LLL 之後，第一個向量 $b_1$ 經常會非常接近甚至等於 lattice 的最短向量（但這不是理論必然，只是經驗現象）。

## LLL algorithm

<div class="algorithm">

LLL algorithm 會同時維護：

<ul>
    <li>目前的 lattice basis $B=\{b_1,\dots,b_m\}$</li>
    <li>對應的 <strong>Gram–Schmidt orthogonalization (GSO)</strong> 向量 $B^*=\{b_1^*,\dots,b_m^*\}$</li>
    <li>一個指標 $k$（從 $k=2$ 開始）用來檢查與修正第 $k$ 個向量</li>
</ul>

<strong> Initialize </strong>
設定 $k=2$，並計算目前 basis 的 GSO（得到 $B^*$ 與係數 $\mu_{i,j}$）。

<strong> Steps </strong>

<ol>
    <li>
        <strong> Size reduction for 條件 (A) </strong>
        固定欄位 $k$，若存在某個 $j$（$1\le j<k$）使得
        $$
        |\mu_{k,j}|>\frac12,
        $$
        就對 basis 做整數線性調整（等價於把 $b_k$ 減去合適的整數倍 $b_j$），直到對所有 $j < k$ 都滿足
        $$
        |\mu_{k,j}|\le \frac12.
        $$
        目的：把 $b_k$ 在前面方向上的投影縮小，避免係數過大造成向量冗長。
    </li>
    <li>
        <strong> Lovász condition check for 條件 (B) </strong>
        檢查相鄰兩個向量（第 $k-1$ 與第 $k$）是否滿足
        $$
        \|b_k^*\|^2 \;\ge\; \left(\frac34-\mu_{k,k-1}^2\right)\,\|b_{k-1}^*\|^2.
        $$
        <ul>
        <li>
            若不滿足：swap 兩個向量
            $$
            b_k \leftrightarrow b_{k-1},
            $$
            並令
            $$
            k \leftarrow \max(k-1,\,2).
            $$
        </li>
        <li>
            若滿足：令
            $$
            k \leftarrow k+1.
            $$
        </li>
        </ul>
    </li>
</ol>

<strong>Termination</strong>
當 $k=m$ 且後續不再觸發 swap 時，演算法終止。可以證明 swap 次數有上界，因此演算法一定會 terminate。終止時得到的 basis 同時滿足條件 (A) 與 (B)，因此必然是 <em>LLL-reduced basis</em>。

</div>
