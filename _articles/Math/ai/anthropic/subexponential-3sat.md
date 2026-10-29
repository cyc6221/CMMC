---
layout: page
title: A $2^{o(n)}$ Time Algorithm for 3-SAT
description: 整理 anthropics/formal-math 的 eth 專案：確定性演算法在次指數時間內計數 k-CNF 的滿足賦值，反駁 Exponential Time Hypothesis。
date: 2026-10-29
last_updated: 2026-10-29
---
anthropics/formal-math {% include gh-link.html href="https://github.com/anthropics/formal-math" label="repo" aria_label="repo: anthropics/formal-math on GitHub" %} 的 `eth` 專案 {% include gh-link.html href="https://github.com/anthropics/formal-math/tree/main/eth" label="eth" aria_label="eth project on GitHub" %} 收錄論文 *A $2^{o(n)}$ Time Algorithm for 3-SAT*（署名 Claude，Anthropic，2026-10-26）與其 Lean 4 形式化，於 2026-10-27 公開。論文給出確定性演算法，在 $2^{o(n)}$ 時間內計數 $k$-CNF 的滿足賦值，反駁 Exponential Time Hypothesis（ETH）。

核心演算法由 Anthropic 內部的 research Claude model 在 10 月 16 日找到，用了 1400 萬個 output token，過程沒有人類輸入；Anthropic 的研究人員再與 Claude 合作整理成論文。OpenAI 的內部模型獨立且同時期宣稱證明了類似結果，見 [The Exponential Time Hypothesis is False]({{ '/articles/Math/ai/openai/eth-is-false/' | relative_url }})。

## 主要結果

以下 $\log=\log_2$。CNF 是 clause 的集合，不重複 clause；「$n$ 個變數 occur」指每個變數都出現在某個 clause 中。

<div class="theorem">
<strong>Theorem 1 (Main Theorem)</strong>
There is a deterministic algorithm that, given a $k$-CNF with $m$ clauses in which $n$ variables occur, computes the number of satisfying assignments of these $n$ variables in time
$$2^{O(\min\{k^2n\log\log n/\sqrt{\log n},\,km/\sqrt{\log m}\})},$$
where the $O(\cdot)$ hides an absolute constant.
</div>

<div class="theorem">
<strong>Theorem 2 (Simplified version of Theorem 1)</strong>
For every $\delta>0$ there is a deterministic algorithm that computes the number of satisfying assignments of a 3-CNF on $n$ variables, with any number of clauses, in time $O(2^{\delta n})$.
</div>

- 定理 1 是單一個演算法，常數不依賴 $k$，給出明確的 $o(n)$ 速率；反駁 ETH 只需要定理 2，即對每個 $\delta>0$ 各有一個 $O(2^{\delta n})$ 時間的演算法。
- 演算法先得到以 clause 數表示的 $2^{O(km/\sqrt{\log m})}$，再結合 sparsification 得到以 $n$ 表示的界。輸入本身已稀疏時，時間為 $2^{O(kn/\sqrt{\log n})}$，指數沒有 $\log\log n$ 因子。
- 論文主體只證明定理 2。定理 1 中 $m$ 的界在附錄 A、B 證明，$n$ 的界在附錄 D，用到附錄 C 的保持計數 sparsification。
- 此前的紀錄：確定性 3-SAT 為 $O(1.328^n)$，隨機化 3-SAT 為 $O(1.308^n)$，\#3-SAT 為 $O(1.6423^n)$。

<div class="remark">
結果純屬漸近。$m=5n$ 的 3-CNF 要 $n>10^{10\,000}$，只以 $n$ 表示的界要 $n>10^{10^8}$，證明的界才比窮舉的 $2^n$ 好；這個方法不論怎麼實作，在 $n\le10^7$ 時大概都不會有改進。
</div>

## 被反駁的假設

$s_k$ 為所有使某個確定性演算法能在 $O(2^{\delta n})$ 時間內判定 $k$-SAT 的 $\delta\ge0$ 的下確界，$s_\infty=\sup_{k\ge3}s_k$。ETH 即 $s_3>0$，Strong Exponential Time Hypothesis（SETH）即 $s_\infty=1$。

<div class="theorem">
<strong>Corollary 5</strong>
$s_k=0$ for every $k\ge3$. Hence $s_\infty=0$, and both ETH and SETH are false.
</div>

<div class="theorem">
<strong>Corollary 6</strong>
For every $k\ge3$ and $\delta>0$ there is a deterministic algorithm that computes the number of satisfying assignments of a $k$-CNF on $n$ variables in time $O(2^{\delta n})$. For $k=3$ this says that the counting version #ETH of ETH is false.
</div>

- 3-CNF 可滿足若且唯若滿足賦值個數為正，所以定理 2 給出 $s_3=0$。由 Impagliazzo–Paturi–Zane 的 sparsification，$s_3=0$ 推出每個 $k\ge3$ 都有 $s_k=0$。
- 隨機化版本同樣不成立：確定性演算法是不使用隨機位元的隨機化演算法。
- NSETH 不成立：$k$-DNF 是 tautology 若且唯若它的否定（一個 $k$-CNF）不可滿足，而確定性演算法也是非確定性演算法。
- Orthogonal Vectors 假設不被定理 1 反駁。
- 論文以 Claude 搜尋文獻，找到 800 多篇論文至少有一個自己的結果只在 ETH 或蘊含它的假設（例如 SETH、Gap-ETH）下證明；同時在未被反駁的假設下也成立的結果不計入。

## 推論

<div class="theorem">
<strong>Corollary 7</strong>
For all $\delta>0$ and $k\ge3$ there are deterministic algorithms that, given a graph on $n$ vertices, with any number of edges, and an integer $s$, compute in time $O(2^{\delta n})$ the number of its independent sets of size $s$, and likewise of its cliques, vertex covers and dominating sets of size $s$ and of its proper colorings with $k$ colors. In particular, they decide Independent Set, Clique, Vertex Cover, Dominating Set and $k$-Coloring, since subsets of independent sets and of cliques, and supersets of vertex covers and of dominating sets, are again such sets.
</div>

- 判定版本的 Independent Set、Clique、Vertex Cover 與 $k$-Coloring 由既有的 subexponential reduction family 得到；Dominating Set 與各種計數需要另外把問題寫成 $O(n)$ 個變數與 clause 的 3-CNF，再套用推論 6。
- 由 Williams 的定理，ETH 不成立推出 $\mathrm E^{\mathrm{NP}}$（以 NP oracle 在 $2^{O(n)}$ 時間內可判定的語言類）中有語言不能由大小 $O(n)$ 的 Boolean 電路判定。

## 方法概要

由保持計數的 sparsification，只需對 $m=O(n)$ 的公式，在每個 $\delta>0$ 下達到 $O(2^{\delta m})$ 時間。

### 從計數到 sum of products

把每個 clause 視為節點 $a$，帶局部變數 $z_a$ 與值 $W_a(z_a)$：$z_a$ 滿足該 clause 時為 1，否則為 0。共用變數的兩個 clause 以邊相連，邊上每個共用變數一個位元，$\Psi_{a,b}(z_a,z_b)$ 檢查兩邊對共用變數的取值一致。滿足賦值的個數為

$$Z=\sum_z\prod_aW_a(z_a)\prod_{\{a,b\}}\Psi_{a,b}(z_a,z_b).$$

這些比較有冗餘：一個變數出現在 $d$ 個 clause 時，兩兩比較用到 $d(d-1)/2$ 條邊，但相等具有遞移性，只沿一條鏈比較相鄰的出現就得到同一個 $Z$，該變數只剩 $d-1$ 個邊位元。因此所有邊上的位元總數少於 $3m$。

合併一組節點時，組內的 $W$ 與 $\Psi$ 乘進新節點的 $W$，$Z$ 不變。若函數 $F(z_a,z_b)=\sum_{\theta\in\\{0,1\\}^c}f(z_a,\theta)f'(z_b,\theta)$，稱它 cost $c$ 個位元；對一條 cost $c$ 位元的邊，把對 $\theta$ 的求和移到最外層，兩側就可以分開求和。

這樣的分治不足以得到次指數時間：稀疏 expander（例如隨機公式）上每個平衡切割都被 $\Omega(n)$ 位元跨越，事先固定一棵切割樹並枚舉跨越的位元，時間是 $2^{\Omega(n)}$，只能改進指數中的常數。

### Eight-square identity

<div class="lemma">
<strong>Lemma (Eight-square identity)</strong>
There is a function $\sigma:\{0,1\}^3\times\{0,1\}^3\to\{-1,1\}$ such that for all $x,y,u,v\in\{0,1\}^3$, with $\oplus$ the bitwise exclusive or,
$$2\,[x=v]\,[y=u]=[x\oplus y\oplus u\oplus v=0]\bigl(\sigma(x,y)\sigma(v,u)+\sigma(x,u)\sigma(v,y)\bigr).\tag{12}$$
</div>

<div class="proof">
<strong>Proof.</strong>
Let $\sigma(p,q)=(-1)^{\phi(p,q)}$ with $\phi(p,q)=\sum_{k\le k'}p_kq_{k'}+q_1p_2p_3+p_1q_2p_3+p_1p_2q_3$. Equation (12) is a statement about $12$ bits, and it can be checked at all $4096$ settings.
</div>

<div class="remark">
它的古典形式把 $(a_1^2+\cdots+a_8^2)(b_1^2+\cdots+b_8^2)$ 寫成八個平方和，由 Degen（1818）與 Graves（1843）各自找到，後者來自 octonion 的 norm 可乘。
</div>

等式左邊是兩個交叉的相等測試，右邊兩項各是一個四節點的 parity 乘上兩個符號因子。展開後 $W$ 可能為負，一項不再是某個公式的滿足賦值個數，所以遞迴處理的是更一般的問題：$K$ 個節點兩兩相連，每條邊 $\lambda$ 位元，每條邊是相等測試，$W_a$ 為任意整數值函數。

### 一層遞迴

第 $\ell$ 層有 $K_\ell=g^2$ 個節點，$g=3K_{\ell-1}^8$。一層的步驟為：

1. 把節點放在 $g\times g$ 的 grid 上。兩個 row 與兩個 column 決定一個 rectangle，每條對角線恰屬於一個 rectangle。對每個 rectangle 的兩條對角線，以 3 位元為一塊套用上面的恆等式，$Z$ 展開成 $(t+1)^{\lvert R\rvert}$ 項，其中 $t=\lceil\lambda/3\rceil$，$R$ 為 rectangle 的集合。
2. 每一項中合併所有 row 或所有 column（取較便宜的一種），得到 $g$ 個節點，邊上的位元總數至多約 $(11/12+1/g)S$，$S$ 為原本的位元總數。
3. 把這 $g$ 個節點平衡地合併成 $K_{\ell-1}$ 組，使任兩組之間至多 $L$ 個位元，成為第 $\ell-1$ 層的問題。平衡的分組由隨機分組的機率論證保證存在，演算法嘗試所有分組，因此仍是確定性的。
4. 遞迴求出每一項，相加後除以 $2^{t\lvert R\rvert}$。

演算法把總和展開成帶正負號的多個 tensor network，不同項以不同順序 contract，因此不受 Austrin–Kaski–Kubjas 對單一 contraction tree 的下界限制；它也不使用快速矩陣乘法。

### 指數趨於 0

第 $\ell$ 層的時間為 $2^{e_\ell S}$ 乘上多項式因子，其中

$$e_0=1,\qquad e_\ell=\Bigl(\frac{11}{12}+\frac{2}{K_{\ell-1}}\Bigr)e_{\ell-1}+\frac{5}{K_{\ell-1}}.$$

$K_\ell=9K_{\ell-1}^{16}$ 以雙指數成長。$K_0=64$ 時 $e_1\approx1.03$，比 $e_0$ 大；從第 2 層起 $K_{\ell-1}\ge K_1=9\cdot2^{96}$，$2/K_{\ell-1}$ 與 $5/K_{\ell-1}$ 可以忽略，因此 $e_\ell\le1.12(11/12)^\ell\to0$。

對公式而言，把 clause 合併成 $3K_\ell^8$ 群再平衡，得到邊上位元總數約 $3m$ 的第 $\ell$ 層問題，時間為 $2^{3e_\ell m+O(m/K_\ell)}$ 乘上 $m$ 的多項式。取只依賴 $\delta$ 的常數層數 $\ell$，即得 $O(2^{\delta m})$。

### 濃縮描述

README 附了一段濃縮描述，Claude Opus 5.5 在 high effort 下能由它重新推出：對每個 $\delta>0$，3-SAT 可在 $O(2^{\delta n})$ 時間內判定（不含定理 1 的較強界）。

> Let 2^{e(K)·K²λ}·poly(λ) be the time to contract tensor networks on K_K with λ bits per edge and arbitrary node tensors. Then e(9K^16) ≤ 0.9·e(K) + O(1/K). Put the nodes on a grid: the two diagonals of each rectangle form a swap. Per bit, SWAP = I − 2·singlet; grouping by the number of singlets gives λ+1 operators with (row rank)·(column rank) ≤ 12^λ. For each choice of operators, merge each row or each column into one node, whichever is cheaper, and regroup these into K balanced classes.

## Lean 形式化

[MainResults.lean](https://github.com/anthropics/formal-math/blob/main/eth/MainResults.lean) 只含定義、只 import Mathlib，其中兩個定義是主張：

- `ETHIsFalse`：$s_3=0$，以 Mathlib 的確定性 multi-stack Turing machine（`Turing.FinTM2`，stack alphabet 有限）計步數。
- `MainTheorem`：存在一台機器與一個常數 $C$，兩者都在 $k$ 與公式之前選定，使得對每個 $k\ge1$、$n\ge4$，以及變數 $x_0,\dots,x_{n-1}$ 都出現、沒有重複 clause、$m\ge2$ 的 $k$-CNF，機器在 $2^{C\min\\{km/\sqrt{\log m},\,k^2n\log\log n/\sqrt{\log n}\\}}$ 步內輸出滿足賦值的個數。

檢查的範圍與限制：

- `ETHIsFalse` 由 `MainTheorem` 推出。證明只用 Lean 的三個標準 axiom（`propext`、`Classical.choice`、`Quot.sound`），通過 Lean kernel、`leanchecker`，以及 Comparator 中獨立實作的 kernel `nanoda`。
- 定義是否忠實表達論文的陳述，無法由機器檢查。論文附錄 E 列出 Lean 陳述與印刷版本的差異，[PaperIndex.lean](https://github.com/anthropics/formal-math/blob/main/eth/proof/PaperIndex.lean) 對照論文每個編號陳述的 Lean 版本。
- Lean 開發由 AI 模型撰寫、由同一模型的其他 instance 審查；論文撰寫時沒有已知的人工檢查，常數 $C$ 沒有明確給出。

## References

### anthropics/formal-math

- [anthropics/formal-math: eth](https://github.com/anthropics/formal-math/tree/main/eth)
- [eth/README.md](https://github.com/anthropics/formal-math/blob/main/eth/README.md)
- [paper.pdf](https://github.com/anthropics/formal-math/blob/main/eth/paper.pdf)：A $2^{o(n)}$ Time Algorithm for 3-SAT。
- [MainResults.lean](https://github.com/anthropics/formal-math/blob/main/eth/MainResults.lean)
- [proof/PaperIndex.lean](https://github.com/anthropics/formal-math/blob/main/eth/proof/PaperIndex.lean)

### 相關筆記

- [Exponential Time Hypothesis]({{ '/articles/Math/others/exponential-time-hypothesis/' | relative_url }})
- [The Exponential Time Hypothesis is False]({{ '/articles/Math/ai/openai/eth-is-false/' | relative_url }})
