---
layout: page
title: LLL reduction
date: 2026-02-02
last_updated: 2026-02-03
tags: [Lattice, lattice-cryptography, LA, SVP, Algorithm]
---

## Definition

<div class="definition">

<strong>Definition (LLL-reduced basis).</strong>

Let $L \subset \mathbb{R}^n$ be a lattice, and let $B = {b_1, \dots, b_m}$ be an ordered basis of $L$.

Let ${b_1^*, \dots, b_m^*}$ be the associated <em>Gram–Schmidt orthogonalization</em> (GSO) of $B$, defined by

$$
b_i^* = b_i - \sum_{j=1}^{i-1} \mu_{i,j} b_j^*,
\quad (1\le i\le m),
$$

where the <em>Gram–Schmidt coefficients</em> are

$$
\mu_{i,j} = \frac{\langle b_i, b_j^* \rangle}{\langle b_j^*, b_j^* \rangle},
\quad (1 \le j < i \le m).
$$

The basis $B$ is called <em>LLL-reduced</em> (with parameter $\delta=\tfrac{3}{4}$) if it satisfies:

<strong>(A) Size reduction:</strong>

$$
\forall \ 1 \le j < i \le m, \quad
| \mu_{i,j} | \le \frac{1}{2}.
$$

<strong>(B) Lovász condition:</strong>

$$
\forall \ 1 < i \le m, \quad
\| b_i^* \|^2 \ge \left( \frac{3}{4} - \mu_{i,i-1}^2 \right) \| b_{i-1}^* \|^2.
$$

</div>

### The importance of LLL-reduced basis

* LLL algorithm 可以在 **polynomial time** 內把任意 lattice basis reduce 成 LLL-reduced basis

* LLL reduce 後的第一個向量 $b_1$ 通常會變得很短，並在長度上接近 **shortest non-zero vector**

  * LLL 可視為一種對 **SVP approximation** 具有明確理論保證的演算法
  * $2^{(m-1)/2}$ 是 **worst-case bound**
  * 實務上，對許多「合理維度」的 lattice，LLL 跑完後的 $b_1$ 常常會非常接近、甚至剛好等於最短向量（作者：經驗談）

$$
\forall \ x \in L, \quad x \ne 0, \quad
\| b_1 \| \le 2^{(m-1)/2} \| x \|.
$$

* 若令 $\Delta = \det(L)$，則 LLL 保證能找到一個長度至多為 $2^{m/4} \Delta ^{1/m}$ 的第一向量，也就是其大小不會偏離 lattice 的「平均尺度」 $\Delta^{1/m}$ 太多（僅差一個指數因子）。

$$
\| b_1 \| \le 2^{m/4} \Delta^{1/m}.
$$

## LLL algorithm

<div class="algorithm">

<strong> Setup </strong>

LLL algorithm 會同時維護：

<ul>
    <li>目前的 lattice basis $B = \{ b_1, \dots, b_m \}$</li>
    <li>對應的 <em>Gram–Schmidt orthogonalization (GSO)</em> 向量 $B^* = \{ b_1^*, \dots, b_m^* \}$</li>
    <li>指標 $k$ ：用來檢查與修正第 $k$ 個向量，從 $k=2$ 開始</li>
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
        |\mu_{k,j}| \le \frac12.
        $$
        目的：把 $b_k$ 在前面方向上的投影縮小，避免係數過大造成向量冗長。
    </li>
    <li>
        <strong> Lovász condition check </strong>
        檢查相鄰兩個向量（第 $k-1$ 與第 $k$）是否滿足條件 (B)：
        $$
        \|b_k^*\|^2 \ge \left(\frac34-\mu_{k,k-1}^2\right)\,\|b_{k-1}^*\|^2.
        $$
        <ul>
            <li> 若不滿足：swap 兩個向量 $b_k \leftrightarrow b_{k-1}$, 並令 $k \leftarrow \max(k-1, 2)$. </li>
            <li> 若滿足：令 $k \leftarrow k+1$. </li>
        </ul>
    </li>
</ol>

<strong>Termination</strong>

當 $k=m$ 且後續不再觸發 swap 時，演算法終止。

<strong>Note.</strong>

可以證明 swap 次數有上界，因此演算法一定會 terminate。終止時得到的 basis 同時滿足條件 (A) 與 (B)，因此必然是 <em>LLL-reduced basis</em>。

</div>

<div class="example">

<strong>Example.</strong>

<ol>
<li>
    <strong>給定 lattice basis</strong>
    $$
    b_1=\begin{pmatrix}2\\0\end{pmatrix},\quad
    b_2=\begin{pmatrix}1\\1\end{pmatrix}.
    $$
</li>

<li>
    <strong>計算 Gram–Schmidt orthogonalization (GSO)</strong>
    $$
    b_1^* = b_1=\begin{pmatrix}2\\0\end{pmatrix},\quad
    \|b_1^*\|^2=4.
    $$
    $$
    \mu_{2,1}=\frac{\langle b_2,b_1^*\rangle}{\|b_1^*\|^2}
    =\frac{2}{4}=\frac12.
    $$
    $$
    b_2^* = b_2-\mu_{2,1}b_1^*
    =\begin{pmatrix}1\\1\end{pmatrix}-\frac12\begin{pmatrix}2\\0\end{pmatrix}
    =\begin{pmatrix}0\\1\end{pmatrix},\quad
    \|b_2^*\|^2=1.
    $$
</li>

<li>
    <strong>檢查 Lovász condition（失敗 → swap）</strong>
    檢查
    $$
    \|b_2^*\|^2 \ge \left(\frac34-\mu_{2,1}^2\right)\|b_1^*\|^2.
    $$
    右邊：
    $$
    \left(\frac34-\left(\frac12\right)^2\right)\cdot 4
    =\left(\frac34-\frac14\right)\cdot 4
    =\frac12\cdot 4
    =2,
    $$
    左邊：
    $$
    \|b_2^*\|^2=1 < 2,
    $$
    所以失敗，需要 swap：
    $$
    (b_1,b_2)\leftarrow\left(\begin{pmatrix}1\\1\end{pmatrix},\begin{pmatrix}2\\0\end{pmatrix}\right).
    $$
</li>

<li>
    <strong>重新計算 GSO（swap 後）</strong>
    $$
    b_1^*=\begin{pmatrix}1\\1\end{pmatrix},\quad
    \|b_1^*\|^2=2.
    $$
    $$
    \mu_{2,1}=\frac{\langle b_2,b_1^*\rangle}{\|b_1^*\|^2}
    =\frac{2}{2}=1.
    $$
    $$
    b_2^*=b_2-\mu_{2,1}b_1^*
    =\begin{pmatrix}2\\0\end{pmatrix}-1\cdot\begin{pmatrix}1\\1\end{pmatrix}
    =\begin{pmatrix}1\\-1\end{pmatrix}.
    $$
</li>

<li>
    <strong>Size reduction（修正 $|\mu_{2,1}|\le \tfrac12$）</strong>
    因為 $\mu_{2,1}=1$ 違反 size reduction，所以做
    $$
    b_2 \leftarrow b_2 - 1\cdot b_1
    =\begin{pmatrix}2\\0\end{pmatrix}-\begin{pmatrix}1\\1\end{pmatrix}
    =\begin{pmatrix}1\\-1\end{pmatrix}.
    $$
    此時
    $$
    \mu_{2,1}=0,\quad
    b_1^*=\begin{pmatrix}1\\1\end{pmatrix},\quad
    b_2^*=\begin{pmatrix}1\\-1\end{pmatrix}.
    $$
</li>

<li>
    <strong>再次檢查 Lovász condition（成功）</strong>
    右邊：
    $$
    \left(\frac34-\mu_{2,1}^2\right)\|b_1^*\|^2
    =\left(\frac34-0\right)\cdot 2
    =\frac32.
    $$
    左邊：
    $$
    \|b_2^*\|^2=2 \ge \frac32
    $$
    成立。
</li>

<li>
    <strong>Conclusion</strong>
    We conclude that
    $$
    b_1=\begin{pmatrix}1\\1\end{pmatrix},\quad
    b_2=\begin{pmatrix}1\\-1\end{pmatrix}.
    $$
    is a LLL-reduced basis of the given lattice.
</li>
</ol>

</div>
