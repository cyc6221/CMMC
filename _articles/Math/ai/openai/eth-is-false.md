---
layout: page
title: The Exponential Time Hypothesis is False
description: 整理 openai/math 第 378 項結果：以次指數時間、多項式空間精確計數 k-CNF 的滿足賦值，反駁 Exponential Time Hypothesis。
date: 2026-10-27
last_updated: 2026-10-29
redirect_from:
  - /articles/Math/ai/openai/disproof-of-eth/
---
openai/math {% include gh-link.html href="https://github.com/openai/math" label="repo" aria_label="repo: openai/math on GitHub" %} 的第 378 項結果 {% include math/ai/openai-result.html num="378" %}：對每個固定的 $k\ge2$，給出確定性演算法，在次指數時間與多項式空間內精確計算 $k$-CNF 的滿足賦值個數。取 $k=3$ 時，3-SAT 可在 $2^{o(n)}$ 時間內判定，與 Exponential Time Hypothesis（ETH）矛盾。

## 主要結果

> We give a deterministic algorithm for exactly counting the satisfying assignments of an arbitrary $k$-CNF formula. For every fixed $k\ge2$, on a formula with $n$ variables and $m$ clauses, our algorithm uses $\mathrm{poly}_k(n,m)$ space and runs in time $(n+m)^{O_k(1)}2^{n/(\log n)^{\frac12+o(1)}}$. Our algorithm refutes the Exponential Time Hypothesis (ETH), which postulates that deciding $3$-SAT on $n$ variables requires $2^{\Omega(n)}$ time in the worst case.

<div class="theorem">
<strong>Theorem 1.1</strong>
For each fixed $k\ge2$, there exists a deterministic algorithm that, given a $k$-CNF $F$ on $n\ge20$ declared variables with $m$ clauses, computes $\#F=|\{x\in\{0,1\}^n:F(x)=1\}|$ in
$$(n+m)^{O_k(1)}2^{O_k(n\log\log n/\sqrt{\log n})}$$
bit operations and $(n+m)^{O_k(1)}$ bits of space. For each fixed $D>0$, its running time on inputs with $m\le Dn$ is
$$(n+m)^{O_{k,D}(1)}2^{O_{k,D}(n/\sqrt{\log n})}.$$
</div>

- 輸出是滿足賦值的個數 $\\#F$。$\\#F>0$ 即判定 $F$ 可滿足。
- 指數 $n\log\log n/\sqrt{\log n}$ 是 $o(n)$，一般情形的時間可寫成 $2^{n/(\log n)^{1/2+o(1)}}$。clause 數 $m\le Dn$ 時，指數降為 $n/\sqrt{\log n}$。
- 只用 rational interpolation 得到較弱的指數 $O_k(\rho(n))$，其中 $\rho(n)=n(\log\log n)^2/\sqrt{\log n}$。定理中的兩個界由 tensor contraction 得到。
- 演算法確定性，空間為多項式。$\\#F>0$ 時，逐一固定變數可以找出滿足賦值。
- 時間界是 $2^{o(n)}$，不是多項式。$2^{o(n)}$ 在一般的多項式時間 reduction 下不會保持（需要 $2^{n^{o(1)}}$），因此不能推出一般的 NP 問題有次指數演算法。

## 被反駁的假設

計數 $\\#F>0$ 同時判定 satisfiability 與 unsatisfiability，所以 $2^{o(n)}$ 時間的計數演算法反駁：

- ETH 與 SETH：每個固定的 $k$ 都有 $(n+m)^{O_k(1)}2^{o(n)}$ 時間的確定性演算法。
- Gap-ETH：判定 satisfiability 同時解決它的 promise problem。
- NSETH：同一個演算法判定 unsatisfiability。
- \#ETH：$\\#3$-SAT 在 $2^{o(n)}\mathrm{poly}(n,m)$ 時間內解出。
- 上述假設的 bounded-error 隨機化版本：確定性演算法同樣反駁它們。

這個結果不與受限證明系統（例如 regular resolution）的無條件指數下界衝突。

## 方法概要

演算法把計數寫成多項式在若干點的取值，再用內插還原。以下從每個變數至多出現在三個 clause 的 3-CNF 開始。

### 計數多項式

設 $F$ 的每個 clause 至多含三個 literal，每個變數至多出現在三個 clause。clause $e$ 涉及的變數集合記為 $I_e$，其 satisfaction polynomial 為

$$\Phi_e=1-\prod_{v\in I_e}\bigl(1-L_{e,v}(X_v)\bigr),$$

其中 positive literal 的 $L_{e,v}(X_v)=X_v$，negative literal 的 $L_{e,v}(X_v)=1-X_v$。例如 $x_a\vee\neg x_b\vee x_c$ 對應 $1-(1-X_a)X_b(1-X_c)$。在 $\{0,1\}$ 輸入上，$\Phi_e$ 等於 1 若且唯若該 clause 被滿足，因此

$$\#F=\sum_{x\in\{0,1\}^n}\prod_{e}\Phi_e\bigl((x_v)_{v\in I_e}\bigr).$$

乘積的總次數至多 $3n$。這個線性的次數界是後面內插所需的性質。

### 分組與線性測量

若變數可以分成 $r$ 組 $S_1,\dots,S_r$，每組至多 $2n/r$ 個變數，且每個 clause 的變數都在同一組內，則 $\\#F=\prod_g N_g$，其中 $N_g$ 是只看第 $g$ 組的計數。逐組窮舉的成本至多 $r\,2^{2n/r}$，遠小於 $2^n$。一般的公式沒有這樣的分割。

演算法引入參數 $T$，把 clause $e$ 中的 $X_v$ 換成線性式 $\langle\vec P_{e,v}(T),\vec X\rangle$，並要求 $T=0$ 時還原為 $X_v$，係數的次數至多 $R$。令

$$H(T)=\sum_{x\in\{0,1\}^n}\prod_{e}\Phi_e\bigl((\langle\vec P_{e,v}(T),x\rangle)_{v\in I_e}\bigr),$$

則 $H(0)=\\#F$，$\deg H\le 3nR$。在選定的點 $T=1,\dots,Q$，替換後的 clause 只透過少量整數線性測量 $y_g=C_gx_g$ 依賴其他組。固定所有測量值 $\vec y$ 之後，各組可以獨立求和：

$$H(t)=\sum_{\vec y}\prod_{g=1}^{r}\Bigl(\sum_{u:\,C_gu=y_g}A_{t,g}(u;\vec y)\Bigr),$$

其中 $A_{t,g}(u;\vec y)$ 是指派給第 $g$ 組的 clause 在 $u$ 與 $\vec y$ 下的取值乘積。測量的總列數至多 $2\tau n$，每列係數的絕對值總和至多 $D$，所以測量值的組合至多 $(2D+1)^{2\tau n}$ 種。每種只需窮舉組內的賦值，總時間約為 $(2D+1)^{2\tau n}2^{2n/r}$（略去多項式因子）。

### 由 Taylor 係數還原計數

$H$ 的次數至多 $3nR$，只知道 $H(1),\dots,H(Q)$ 不足以決定 $H$。改為在每個點取 $H(t+z)$ 的 $z^0,\dots,z^q$ 係數，其中 $q=\lfloor 3nR/Q\rfloor$。兩個次數至多 $3nR$ 的多項式若有相同的資料，差能被 $\prod_{t=1}^{Q}(T-t)^{q+1}$ 整除，而這個乘積的次數 $Q(q+1)>3nR$，所以差為零。解有理線性方程組即可還原 $H$，取常數項得 $H(0)=\\#F$。

每個點需要 $O(1+nR/Q)$ 個係數，因此目標是讓 $R$ 相對於 $Q$ 夠小。這些 Taylor 係數經由 inclusion–exclusion 化為固定 formal input $\vec X=\mathbf 1_U$ 的和，每一項仍可用上一節的分離演算法計算。

### 一般的 $k$-CNF

每個變數至多出現三次的限制，由保持計數的 sparsification 與變數複製處理。sparsification 把滿足賦值劃分給同一組變數上的稀疏公式，再化為 bounded-occurrence 的情形。

替換式由輔助有理方陣 $M_0$ 構造：$\operatorname{rank}(I-M_0)$ 的上界限制測量個數，$M_0$ 非零項的限制使替換式的次數保持很小。這個方陣來自對 $(-1)^j$ 在短區間上的插值多項式，變數取 commuting permutation matrices。

## 推論

### Max-$k$-SAT 近似

<div class="theorem">
<strong>Corollary 1.2</strong>
For every fixed $k\ge2$ and $\varepsilon>0$, there exists a randomized algorithm that, given a $k$-CNF $F$ on $n\ge20$ variables with $m$ clauses, finds an assignment satisfying at least $\operatorname{OPT}(F)-\varepsilon m$ clauses with probability $1-2^{-\Omega(n)}$, in $(n+m)^{O_{k,\varepsilon}(1)}2^{O_{k,\varepsilon}(\rho(n))}$ time and $(n+m)^{O_{k,\varepsilon}(1)}$ space, where $\rho(n)=n(\log\log n)^2/\sqrt{\log n}$.
</div>

先隨機抽樣 $O(n/\varepsilon^2)$ 個 clause。Hoeffding 不等式與 union bound 使所有賦值的滿足比例誤差至多 $\varepsilon/2$。再用定理 1.1、對門檻的二分搜尋與自我歸約，找出樣本上的最佳賦值。

### 圖的計數

<div class="theorem">
<strong>Corollary 1.3</strong>
On simple graphs with $v$ vertices and $e$ edges, the number of independent sets and, for each fixed $q\ge2$, the number of proper $q$-colorings can be computed deterministically in $2^{o(v)}$ time and $\mathrm{poly}_q(v,e)$ space. The number of perfect matchings can be computed deterministically in $2^{o(v+e)}$ time and $\mathrm{poly}(v,e)$ space.
</div>

在 #ETH 下，Curticapean 排除了 $v$ 個頂點、$O(v)$ 條邊的無權二分圖上，計數 perfect matching 的確定性 $2^{o(v)}$ 時間演算法。推論 1.3 的 perfect matching 演算法適用於這類圖。

### 電路下界

Williams 證明：若 ETH 不成立，則 $\mathrm E^{\mathrm{NP}}$（以 NP oracle 在確定性時間 $2^{O(n)}$ 內可判定的語言類）沒有線性大小的電路。電路可編碼成 $O(n+s)$ 個變數與 clause 的 3-CNF，所以定理 1.1 在 $2^{o(n)}$ 時間內判定線性大小電路的 satisfiability。由此得到 $\mathrm E^{\mathrm{NP}}\not\subseteq\mathrm{SIZE}(O(n))$，量化後的版本為：

<div class="theorem">
<strong>Corollary 1.4</strong>
Let $C_L(n)$ be the minimum number of noninput gates in a circuit computing $L$ on $\{0,1\}^n$, allowing arbitrary Boolean gates of fan-in at most two and unrestricted fan-out. There exist a language $L\in\mathrm E^{\mathrm{NP}}$ and a constant $c>0$ such that
$$C_L(n)>c\,n\sqrt{\log n}\qquad\text{for infinitely many }n.$$
</div>

這是 $\mathrm E^{\mathrm{NP}}$ 的下界，不是 NP 的超多項式電路下界。

## 對既有下界的影響

以 ETH 或 SETH 為前提的下界失去這個前提。其中部分下界只需要較弱的假設，可能仍然成立：

- longest common subsequence 與 regular-expression matching 的下界由 Orthogonal Vectors Conjecture 導出。
- Fréchet distance、graph diameter 近似，以及 Independent Set 與 Dominating Set 對 treewidth 的依賴，由無限制的 CNF-SAT 假設導出。這個假設允許 clause 寬度隨 $n$ 增長，而定理 1.1 只對每個固定的寬度 $k$ 成立。

要從這個 SAT 演算法得到某個問題的更快演算法，需要一個從該問題到固定寬度 SAT、且控制變數個數的 reduction。clause 大小至多 $k$ 的 Set Splitting 有這樣的 reduction：每個元素一個 Boolean 變數，表示它在哪一側。因此對固定的 $k$，它在全集大小上有次指數時間（略去輸入大小的多項式因子）。硬度結果依賴 ETH 或 SETH 的其他問題，也值得重新尋找演算法。

## 驗證狀態

OpenAI 表示，由 Russell Impagliazzo、Ramamohan Paturi 與 Ryan Williams 領導的獨立電腦科學家小組將檢驗並說明這個證明，材料應小組要求立即公開。

第 378 項有對應的 Lean formalization {% include gh-link.html href="https://github.com/openai/math/blob/main/lean/docs/378.md" label="docs" aria_label="Lean docs: 378 on GitHub" %}。對固定的 $k\ge2$，Lean 證明確定性機器對 canonically encoded 的 $k$-CNF（$n$ 個變數，encoding 的 bit 長度為 $L$）精確計數，時間為

$$(L+1)^{O_k(1)}2^{O_k(n(\log\log n)^2/\sqrt{\log n})},$$

且任一步驟中已走訪的 tape cell 總數至多 $(L+1)^{O_k(1)}$。這是較弱的指數 $\rho(n)$。對 $m$ 個 clause 的較強界 $(n+m)^{O_k(1)}2^{O_k(n\log\log n/\sqrt{\log n})}$ 由論文給出。

### Comparator statement

<table class="table-center">
  <thead>
    <tr>
      <th>Result</th>
      <th>Comparator statement</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Exact counting and SAT on canonical inputs in subexponential time and polynomial space</td>
      <td><a href="https://github.com/openai/math/blob/main/lean/ComparatorChallenges/SubexponentialSAT.lean">SubexponentialSAT.lean</a></td>
    </tr>
  </tbody>
</table>

## References

### openai/math

- [openai/math](https://github.com/openai/math)
- [CONTENTS.md](https://github.com/openai/math/blob/main/CONTENTS.md)：manuscript map，第 378 項的條目與摘要。
- [history.md](https://github.com/openai/math/blob/main/history.md)：2026-10-26 的更新紀錄。

### Preprint

- [The Exponential Time Hypothesis is False](https://github.com/openai/math/tree/main/preprints/The-Exponential-Time-Hypothesis-is-False-October-25-2026)

### 引用的結果

- Ryan Williams. [Improving Exhaustive Search Implies Superpolynomial Lower Bounds](https://doi.org/10.1137/10080703X). SIAM Journal on Computing 42(3), 2013.
