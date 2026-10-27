---
layout: page
title: Exponential Time Hypothesis
description: 說明 Exponential Time Hypothesis（ETH）的定義、與 SETH、Gap-ETH、NSETH、#ETH 的關係，以及以它們為前提的 conditional lower bound。
date: 2026-10-27
last_updated: 2026-10-27
---
Exponential Time Hypothesis（ETH）是關於 3-SAT 最壞情況時間的猜想：3-SAT 沒有次指數時間的演算法。ETH 與它的強化版本是 parameterized complexity 與 fine-grained complexity 中許多 conditional lower bound 的前提。

## SAT 與指數時間

CNF 公式是若干 clause 的 AND，每個 clause 是若干 literal 的 OR；$k$-CNF 的每個 clause 至多含 $k$ 個 literal。$k$-SAT 問是否存在讓公式為真的賦值。$k\ge3$ 時 $k$-SAT 是 NP-complete。

窮舉 $n$ 個變數的所有賦值需要 $2^n$ 的時間。已知的改進仍是 $c^n$ 的形式，$c>1$ 為常數：

- Schöning 的隨機區域搜尋：從隨機賦值出發，反覆翻轉某個未滿足 clause 中隨機選取的變數。對 $k$-SAT 達到 $(n+m)^{O(1)}(2-2/k)^n$，3-SAT 為 $(4/3)^n$。
- PPSZ：以有界 resolution 導出額外的 clause，再依隨機順序賦值，有被迫的值就取，否則猜測。其後續分析（Hertli）對 3-SAT 得到隨機化的 $O(1.308^n)$。

這些演算法的底數隨 $k$ 增大而趨近 2，改進幅度越來越小。

## ETH

<div class="definition">
<strong>Exponential Time Hypothesis (ETH).</strong>
Deciding $3$-SAT on $n$ variables requires $2^{\Omega(n)}$ time in the worst case.
</div>

- 時間以變數數 $n$ 計，不是輸入長度。
- 3-CNF 是 $k$-CNF 的特例，所以對每個固定的 $k\ge3$，$k$-SAT 同樣需要 $2^{\Omega(n)}$ 時間。
- ETH 不只排除多項式時間，也排除所有 $2^{o(n)}$ 時間的演算法，因此強於 $\mathrm P\ne\mathrm{NP}$。
- Sparsification lemma 說明，任意 $k$-CNF 可以表示成 $2^{\varepsilon n}$ 個 clause 數為 $O_{k,\varepsilon}(n)$ 的 $k$-CNF 的析取。因此討論 ETH 時，clause 數可以視為 $n$ 的線性函數。

## 相關假設

| 假設 | 內容 | 代表性用途 |
|---|---|---|
| ETH | 3-SAT 需要 $2^{\Omega(n)}$ 的確定性時間 | Clique 對解大小的依賴；constraint satisfaction 與 partitioned subgraph isomorphism 對 treewidth 的依賴 |
| SETH | 對每個 $\varepsilon\in(0,1)$，存在固定的 $k$，使 $k$-SAT 沒有 $2^{(1-\varepsilon)n}(n+m)^{O(1)}$ 時間的確定性演算法 | Hitting Set、Set Splitting 的指數界；P 內問題的二次下界 |
| Gap-ETH | 存在常數 $\delta,\gamma>0$，使 $m=O(n)$ 時沒有 $O(2^{\gamma n})$ 時間的演算法能區分可滿足的 3-CNF 與每個賦值至少違反 $\delta$ 比例 clause 的 3-CNF | Label Cover 與 dense CSP 的近似困難性；排除 Clique 與 Dominating Set 的 fixed-parameter 近似 |
| NSETH | 對每個 $\varepsilon>0$，存在固定的 $k$，使 $k$-CNF 的 unsatisfiability 沒有 $2^{(1-\varepsilon)n}(n+m)^{O(1)}$ 時間的非確定性演算法 | 確定性 fine-grained reduction（例如從 SAT 到 3SUM 或 All-Pairs Shortest Paths）的障礙 |
| #ETH | 精確計數 3-CNF 的滿足賦值需要 $2^{\Omega(n)}$ 的確定性時間 | 排除無權二分圖（$v$ 個頂點、$O(v)$ 條邊）上計數 perfect matching 的 $2^{o(v)}$ 時間演算法 |

- SETH 的 Merlin–Arthur 版本 MA-SETH 已在 2016 年被 Williams 反駁。他給出在 $2^{n/2}\mathrm{poly}(n,m)$ 時間內驗證 $k$-CNF unsatisfiability 的協定。
- ETH、SETH 與 Gap-ETH 另有 bounded-error 隨機化版本，排除同樣時間內的隨機化演算法。
- 這些假設限制的是演算法的時間，與受限證明系統（例如 regular resolution）的無條件指數下界是不同層次的陳述。

## 以 ETH 與 SETH 為前提的下界

### 指數時間與 parameterized 問題

- ETH：Clique 對解大小的依賴；constraint satisfaction 與 partitioned subgraph isomorphism 對 treewidth 的依賴。
- SETH：Hitting Set 與 Set Splitting 的指數界；Independent Set 與 Dominating Set 對 treewidth 的依賴；Subset Sum 與 Bicriteria Path 的 pseudopolynomial 演算法能加速多少。

### P 內的問題

SETH 被用來排除 P 內問題的多項式因子加速：

- edit distance、longest common subsequence、dynamic time warping、Fréchet distance、regular-expression matching：不能比二次時間快多項式因子。
- graph diameter 的近似。
- 圖更新下 reachability 計數與最大 strongly connected component 大小的維護。

### 較弱的假設

部分下界只需要比 SETH 弱的假設：

- Orthogonal Vectors Conjecture（OVC）：對每個固定的 $\varepsilon>0$，沒有 $O(N^{2-\varepsilon}\mathrm{poly}(d))$ 時間的演算法，能判定兩個各含 $N$ 個 $d$ 維 Boolean 向量的集合中，是否有一對分別取自兩個集合的正交向量。從 SAT 到 Orthogonal Vectors 的 reduction 說明 SETH 蘊含 OVC。longest common subsequence 與 regular-expression matching 的下界由 OVC 導出。
- 無限制的 CNF-SAT 對任何常數 $\delta>0$ 都沒有 $2^{(1-\delta)n}\mathrm{poly}(n,m)$ 時間的演算法：Fréchet distance、graph diameter 近似，以及 Independent Set 與 Dominating Set 對 treewidth 的依賴由它導出。這個假設允許 clause 的寬度隨 $n$ 增長，SETH 則對每個固定寬度的 $k$-SAT 陳述。

## 近期發展

2026-10-26，openai/math 公開第 378 項結果，宣稱給出 $2^{o(n)}$ 時間的 $k$-CNF 計數演算法，反駁 ETH 及上表的其他假設。整理見 [Disproof of the Exponential Time Hypothesis]({{ '/articles/Math/ai/openai/disproof-of-eth/' | relative_url }})。

## References

### ETH 與 SETH

- Russell Impagliazzo, Ramamohan Paturi. [On the Complexity of $k$-SAT](https://doi.org/10.1006/jcss.2000.1727). Journal of Computer and System Sciences 62(2), 2001.
- Russell Impagliazzo, Ramamohan Paturi, Francis Zane. [Which Problems Have Strongly Exponential Complexity?](https://doi.org/10.1006/jcss.2001.1774) Journal of Computer and System Sciences 63(4), 2001.
- Ryan Williams. [Strong ETH Breaks With Merlin and Arthur: Short Non-Interactive Proofs of Batch Evaluation](https://doi.org/10.4230/LIPIcs.CCC.2016.2). 31st Conference on Computational Complexity, 2016.

### 變體

- Irit Dinur. [Mildly Exponential Reduction from Gap 3SAT to Polynomial-Gap Label-Cover](https://eccc.weizmann.ac.il/report/2016/128/). ECCC TR16-128, 2016.
- Pasin Manurangsi, Prasad Raghavendra. [A Birthday Repetition Theorem and Complexity of Approximating Dense CSPs](https://doi.org/10.4230/LIPIcs.ICALP.2017.78). ICALP 2017.
- Marco L. Carmosino, Jiawei Gao, Russell Impagliazzo, Ivan Mihajlin, Ramamohan Paturi, Stefan Schneider. [Nondeterministic Extensions of the Strong Exponential Time Hypothesis and Consequences for Non-reducibility](https://doi.org/10.1145/2840728.2840746). ITCS 2016.
- Holger Dell, Thore Husfeldt, Dániel Marx, Nina Taslaman, Martin Wahlén. [Exponential Time Complexity of the Permanent and the Tutte Polynomial](https://arxiv.org/abs/1206.1775). ACM Transactions on Algorithms 10(4), 2014.
- Radu Curticapean. [Block Interpolation: A Framework for Tight Exponential-Time Counting Complexity](https://doi.org/10.1016/j.ic.2018.02.008). Information and Computation 261, 2018.

### SAT 演算法

- Uwe Schöning. [A Probabilistic Algorithm for $k$-SAT and Constraint Satisfaction Problems](https://doi.org/10.1109/SFFCS.1999.814612). FOCS 1999.
- Ramamohan Paturi, Pavel Pudlák, Michael E. Saks, Francis Zane. [An Improved Exponential-Time Algorithm for $k$-SAT](https://doi.org/10.1145/1066100.1066101). Journal of the ACM 52(3), 2005.
- Timon Hertli. [3-SAT Faster and Simpler—Unique-SAT Bounds for PPSZ Hold in General](https://doi.org/10.1137/120868177). SIAM Journal on Computing 43(2), 2014.
