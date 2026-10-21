---
layout: page
title: 3SUM and APSP
date: 2026-10-21
last_updated: 2026-10-21
---

3SUM 與 APSP（all-pairs shortest paths）是 fine-grained complexity 中兩個核心問題，教科書演算法分別需要 $O(n^2)$ 與 $O(n^3)$ 時間，長期被假設無法再有 polynomial improvement。2026 年 10 月，這兩個問題首次同時被突破，核心演算法方向由 Anthropic 的 Claude research model 找到，其 Lean 4 形式化收錄於 [anthropics/formal-math](https://github.com/anthropics/formal-math/tree/main/3sum-apsp)。

## 問題

### 3SUM

<div class="definition">
<strong>3SUM</strong>
Given integers $x_1,\dots,x_n$, decide whether there exist distinct indices $i,j,k$ such that $x_i+x_j+x_k=0$.
</div>

先排序再用 two pointers 可在 $O(n^2)$ 時間解出。此前最好的演算法只省下 polylog 因子。

### APSP 與 $(\min,+)$-product

<div class="definition">
<strong>$(\min,+)$-product</strong>
Given $n\times n$ matrices $A$ and $B$, compute the matrix $C$ with $C_{ij}=\min_k (A_{ik}+B_{kj})$.
</div>

<div class="definition">
<strong>APSP</strong>
Given a weighted directed graph on $n$ vertices, compute the shortest-path distance between every pair of vertices.
</div>

Floyd–Warshall 在 $O(n^3)$ 時間內解出 APSP。此前最好的演算法只省下 subpolynomial 因子。APSP 與 $(\min,+)$-product 在 truly subcubic 時間的意義下等價，兩者的 exponent 相同。

<div class="remark">
<strong>Remark.</strong>
計算模型是 word RAM，word 長度為 $O(\log n)$ bits，輸入整數的絕對值為 $n^{O(1)}$。
</div>

### Fine-grained hypotheses

<div class="definition">
<strong>3SUM Hypothesis</strong>
There is no constant $\epsilon>0$ such that 3SUM can be solved in $O(n^{2-\epsilon})$ time.
</div>

<div class="definition">
<strong>APSP Hypothesis</strong>
There is no constant $\epsilon>0$ such that APSP can be solved in $O(n^{3-\epsilon})$ time.
</div>

大量 conditional lower bound 以這兩個 hypothesis 為前提：若某個問題有 truly subquadratic（或 subcubic）演算法，3SUM（或 APSP）也會有。

## Alman & Vassilevska Williams

### 時間界

2026 年 10 月 5 日，Alman 與 Vassilevska Williams 在 arXiv 公開（[arXiv:2610.06783](https://arxiv.org/abs/2610.06783)）這兩個問題的第一個 polynomial improvement：存在 $\epsilon>0$，使得 $\mathrm{3SUM}=O(n^{2-\epsilon})$ 且 $\mathrm{APSP}=O(n^{3-\epsilon})$，兩個演算法皆為 deterministic。具體的時間界為

- $\mathrm{3SUM}$：$O(n^{1.9992})$
- $(\min,+)$-product 與 $\mathrm{APSP}$：$O(n^{2.99942})$，摘要寫作 $O(n^{2.9995})$
- Exact Triangle：$O(n^{3-0.0017})$

作者指出 3SUM Hypothesis 與 APSP Hypothesis 因此不再成立，經由已知的 reduction，數個相關的 hypothesis 也一併被反駁。依賴它們的 conditional lower bound，證明本身沒有錯，但前提已不可信，需要重新理解。

### 方法

演算法不直接針對 3SUM 或 APSP 設計，而是先把問題轉換成 sparse lopsided graph 上的 triangle detection / exact triangle，再用 thin / selected-entry matrix multiplication 取得 polynomial improvement。整條歸約鏈為

$$
\begin{array}{c}
\mathrm{3SUM} \\
\downarrow \\
\text{Exact Triangle} \\
\downarrow \\
\text{Sparse Lopsided Triangle} \\
\downarrow \\
\text{Thin Matrix Multiplication}
\end{array}
$$

### AI 的貢獻

核心演算法方向最初由 Claude research model 找到。Alman 與 Vassilevska Williams 之後：

- 重新理解與檢查演算法
- 簡化與推廣證明
- 完成正式論文
- 對最終結果負責

這是 AI 直接參與新理論計算機科學研究的案例。

### Lean 形式化

主要的 deterministic 結果另外用 Lean 4 形式化，收錄於 [anthropics/formal-math](https://github.com/anthropics/formal-math/tree/main/3sum-apsp)：

- `EndStatement.lean` 只用 Lean core library，定義有九條指令的 word RAM 與各個問題，並陳述五個主要結果：Exact Triangle、3SUM、$(\min,+)$-product、APSP 與 zero-weight $k$-clique。
- `PaperStatements.lean` 使用 Mathlib，依論文編號陳述 25 個結果。
- 演算法先以小型 imperative language 寫成並驗證，再由 compiler 轉成 word RAM program，每一步至多增加常數倍的開銷。

形式化並未涵蓋所有結果。時間界中的常數與部分參數只證明存在而未算出，Theorem 17、21、33–35 等結果沒有針對 program 的敘述，不在驗證範圍內。細節見 [MACHINE.md](https://github.com/anthropics/formal-math/blob/main/3sum-apsp/docs/MACHINE.md)。

## Karingula & Lovett

2026 年 10 月 11 日，Karingula 與 Lovett 給出 polynomial improvement 的較簡單證明（[arXiv:2610.15663](https://arxiv.org/abs/2610.15663)，另見 [ECCC TR26-247](https://eccc.weizmann.ac.il/report/2026/247/)）。貢獻不在改善 exponent，而在簡化論證。核心工具是 selected-entry matrix multiplication，只計算兩個 dense rectangular matrix 乘積中指定的 entries。最終 exponent 比 Alman 與 Vassilevska Williams 的結果弱，但仍然得到 $\mathrm{3SUM}=n^{2-\epsilon}$ 與 $\mathrm{APSP}=n^{3-\epsilon}$。

核心論證因此由 Alman、Vassilevska Williams 與 Anthropic 以外的研究者重新建立。

## Majdoddin

2026 年 10 月 12 日，Ruhollah Majdoddin 進一步降低 exponent（[arXiv:2610.17420](https://arxiv.org/abs/2610.17420)），得到 $\mathrm{3SUM}=n^{1.99450+o(1)}$ 與 $\mathrm{APSP}=n^{2.99450+o(1)}$。

其中一項改進是 thin matrix product 適用的參數範圍，由先前的 $D\le N^{0.1204}$ 提升至 $D\le N^{\epsilon}$（任意 $\epsilon<0.172$），使用 Schönhage 的 five-term partial-product tensor。另一項是改善 reduction，使 matrix multiplication 取得的 exponent saving 在歸約過程中損失較少。

## 目前狀態

這些結果仍是 preprint，尚未通過 STOC、FOCS、SODA 或期刊的正式同行審查。目前已有的驗證包括：

- Alman 與 Vassilevska Williams 的人工檢查與重建
- Lean formal verification
- Karingula 與 Lovett 的獨立簡化證明
- Majdoddin 建立在原框架上的 exponent 改進

<div class="remark remark--note">
<strong>Remark.</strong>
正式同行審查尚未完成，但「3SUM 可以 truly subquadratic、APSP 可以 truly subcubic」這個核心結果已有相當強的外部支持。
</div>

### 時間界比較

<table class="table-center">
  <thead>
    <tr>
      <th></th>
      <th>3SUM</th>
      <th>APSP</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>原始演算法</td>
      <td>$O(n^2)$</td>
      <td>$O(n^3)$</td>
    </tr>
    <tr>
      <td>Alman &amp; Vassilevska Williams</td>
      <td>$O(n^{1.9992})$</td>
      <td>$O(n^{2.99942})$</td>
    </tr>
    <tr>
      <td>Majdoddin</td>
      <td>$n^{1.99450+o(1)}$</td>
      <td>$n^{2.99450+o(1)}$</td>
    </tr>
  </tbody>
</table>

### 外部討論

#### Oded Goldreich

Oded Goldreich 將 Alman 與 Vassilevska Williams 的論文列入 [Oded's Choices](https://www.wisdom.weizmann.ac.il/~oded/my-choice.html)。

#### University of Michigan Theory Seminar

Josh Alman 排定於 2026 年 10 月 23 日在 [University of Michigan Theory Seminar](https://cse.engin.umich.edu/event/truly-subquadratic-3sum-and-truly-subcubic-apsp-via-triangles-in-sparse-lopsided-graphs) 報告這項工作。

## References

### Papers

- Josh Alman, Virginia Vassilevska Williams. *Truly Subquadratic 3SUM and Truly Subcubic APSP via Triangles in Sparse Lopsided Graphs*. [arXiv:2610.06783](https://arxiv.org/abs/2610.06783)
- Sankeerth Rao Karingula, Shachar Lovett. *A simplified proof of polynomial improvements for 3SUM and APSP*. [arXiv:2610.15663](https://arxiv.org/abs/2610.15663), [ECCC TR26-247](https://eccc.weizmann.ac.il/report/2026/247/)
- Ruhollah Majdoddin. *Thin matrix products up to $D \le N^{0.172}$ and lossless reductions for 3SUM, Exact Triangle and APSP, with 3SUM over abelian groups and a dichotomy for coordinatewise problems*. [arXiv:2610.17420](https://arxiv.org/abs/2610.17420)

### Formalization

- [anthropics/formal-math: 3sum-apsp](https://github.com/anthropics/formal-math/tree/main/3sum-apsp)
- [3sum-apsp/docs/MACHINE.md](https://github.com/anthropics/formal-math/blob/main/3sum-apsp/docs/MACHINE.md)

### Discussion

- [Oded's Choices](https://www.wisdom.weizmann.ac.il/~oded/my-choice.html)
- [University of Michigan Theory Seminar](https://cse.engin.umich.edu/event/truly-subquadratic-3sum-and-truly-subcubic-apsp-via-triangles-in-sparse-lopsided-graphs)
