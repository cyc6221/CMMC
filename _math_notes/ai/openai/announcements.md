---
layout: page
title: OpenAI Math Announcements
date: 2026-10-22
last_updated: 2026-10-30
redirect_from:
  - /articles/Math/ai/openai/announcements/
---

本文按時間整理 OpenAI 在 2026 年 5 月至 10 月的主要數學成果公告，並補充研究工具、顧問團體與成果公開方式的背景。5 月公布 unit-distance 猜想的反例，10 月 6 日則集中釋出 `openai/math` 的數學成果。

<script defer src="{{ '/assets/js/repo-stats.js' | relative_url }}"></script>

## 2026-05-20 單位距離猜想

**An OpenAI model has disproved a central conjecture in discrete geometry** [原文](https://openai.com/index/model-disproves-discrete-geometry-conjecture/)

OpenAI 宣布內部模型推翻平面 unit distance problem 中的 Erdős 猜想，即單位距離點對數的最大值滿足 $u(n)=n^{1+o(1)}$。

### Problem

<div class="definition">
<strong>Planar unit distance problem</strong>
If you place $n$ points in the plane, how many pairs of points can be exactly distance $1$ apart? Write $u(n)$ for the maximum.
</div>

Erdős 在 1946 年提出這個問題。方格點構造給出 $u(n)\ge n^{1+c/\log\log n}$，其中 $c>0$ 為常數；已知最佳上界是 $u(n)=O(n^{4/3})$（Spencer–Szemerédi–Trotter）。Erdős 猜想 $u(n)=n^{1+o(1)}$，也就是其成長速度低於任何固定次方 $n^{1+\varepsilon}$（$\varepsilon>0$）。

### 公告內容

- 模型構造出一族反例：存在固定常數 $\delta>0$，使得無限多個 $n$ 滿足 $u(n)\ge n^{1+\delta}$。這與 $u(n)=n^{1+o(1)}$ 相矛盾，並在原有方格構造的下界上取得 polynomial 量級的改進。
- 證明由一組外部數學家檢查；他們另撰 [Remarks on the disproof of the unit distance conjecture](https://cdn.openai.com/pdf/74c24085-19b0-4534-9c90-465b8e29ad73/unit-distance-remarks.pdf)，說明論證與意義。
- 證明來自一個新的 general-purpose reasoning model。OpenAI 說明它不是專為數學訓練的模型，沒有針對證明策略搜尋做 scaffolding，也不是針對這個問題設計。

## 2026-07 Cycle double cover

**A Proof of the Cycle Double Cover Conjecture** [原文](https://cdn.openai.com/pdf/04d1d1e4-bc75-476a-97cf-49055cd98d31/cdc_proof.pdf)

openai/cdc-lean <a class="gh-link" href="https://github.com/openai/cdc-lean" target="_blank" rel="noopener noreferrer" aria-label="repo: openai/cdc-lean on GitHub"><svg viewBox="0 0 16 16" class="ico" aria-hidden="true"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>repo</a>

{% include math/ai/repo-stats.html repo="openai/cdc-lean" %}

OpenAI 發表 cycle double cover conjecture 的證明。這個猜想由 Tutte、Itai 與 Rodeh、Szekeres、Seymour 先後提出，長期懸而未決。這次發表的形式是一篇三頁的論文加上 Lean 形式化，不是部落格文章。

<div class="remark remark--note">
<strong>日期註記.</strong>
公開時間為 2026 年 7 月，確切日期尚待確認（<a href="https://arxiv.org/abs/2607.16356">日期依據</a>）。
</div>

### Statement

<div class="definition">
<strong>Cycle double cover</strong>
A cycle double cover of a graph is a multiset of cycles in which every edge occurs exactly twice.
</div>

<div class="theorem">
<strong>Theorem 1.1</strong>
Every finite bridgeless undirected graph has a cycle double cover.
</div>

圖允許平行邊，兩條平行邊視為一個 cycle。

### 證明概要

- 先化約到 loopless cubic graphs（Jaeger）。
- 由 8-flow theorem（Kilpatrick、Jaeger）與 Tutte 的 group-flow theorem，每個 bridgeless graph 都有 nowhere-zero $\Gamma=\mathbb{F}_2^3$-flow。
- 關鍵的化約是下面的引理，它是 proper 3-edge-colouring 的放寬版本。

<div class="lemma">
<strong>Lemma 2.1</strong>
Let $G$ be a loopless cubic multigraph. Suppose that every edge $e$ is assigned a two-element set $P_e\subseteq\Gamma$ such that, for every $v\in V(G)$ and $s\in\Gamma$, $\#\{e\ni v: s\in P_e\}\in\{0,2\}$. Then $G$ has a cycle double cover.
</div>

- 要構造這些 $P_e$，等價於解一個 $\mathbb{F}_2$ 上的線性方程組。證明用對偶性說明方程組必有解，是一個初等的線性代數論證。

### 產生方式

論文中的 statement of AI use：

> The proof in this note is entirely due to GPT 5.6 Sol Ultra and the writeup with Codex (with GPT 5.6 Sol).

OpenAI 另外公開了給模型的完整 prompt。Prompt 要求完整解決這個猜想，不接受部分進展，指示以多個 agents 搜尋（最多 64 個並行），並至少花 8 小時才可返回。

### 驗證

- `openai/cdc-lean` 以 Lean 對有限、無 loop、無 bridge 的 multigraph 做 kernel check，終點是 `CDCLean.cycleDoubleCover_of_bridgeless`，其中也形式化了 Jaeger–Kilpatrick 的 eight-flow theorem。`CDCLean/Audit.lean` 的審計應只列出 `propext`、`Classical.choice` 與 `Quot.sound`。
- Jim Geelen（arXiv:2607.15399，7 月 16 日）與 Sang-il Oum（arXiv:2607.16356，7 月 17 日）各自寫了說明。Johannes Carmesin 在 Matroid Union 的文章中表示證明正確，並提到除了 OpenAI 的版本，還有獨立的 Lean 形式化。

## 2026-07-29 學術研究支援

**Accelerating scientific discovery with ChatGPT for Academic Researchers** [原文](https://openai.com/index/chatgpt-for-academic-researchers/)

OpenAI 讓學術研究者使用 frontier models，並指出數學研究已快速成為 AI 的重要應用場景。這篇偏向研究生態與部署，不是單一成果的發布。

### 計畫內容

- 對象是選定學術機構的研究者，涵蓋科學、數學與工程，用途從 grant preparation 到 hypothesis testing。
- 首批 10,000 人，機構包括 Institute for Advanced Study 與 École normale supérieure；計畫持續擴展，於 2027 年內達到 100,000 人。
- 起始提供 GPT-5.6 Sol Pro。每位參與者可以邀請最多四位同機構的合作者。
- 資料預設不用於訓練模型。

### 8 月 10 日更新

新申請者改為進入 waitlist。首輪有超過 13,000 份申請在審核，首批 10,000 個名額從符合資格的申請者中抽籤決定。未被選上的申請者，在秋季重新開放申請時仍可被選入。[官方更新](https://openai.com/index/chatgpt-for-academic-researchers/)

## 2026-08-01 十項數學進展

**Ten advances in mathematics and theoretical computer science** [原文](https://openai.com/index/ten-advances-in-mathematics/)

openai/ten-proofs <a class="gh-link" href="https://github.com/openai/ten-proofs" target="_blank" rel="noopener noreferrer" aria-label="repo: openai/ten-proofs on GitHub"><svg viewBox="0 0 16 16" class="ico" aria-hidden="true"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>repo</a>

{% include math/ai/repo-stats.html repo="openai/ten-proofs" %}

OpenAI 一次公布 10 項數學與理論資工成果，每項都解決或大幅推進一個 long-standing open problem。結果來自 Astra 的一個內部版本，OpenAI 當時稱 Astra 為下一個主要模型，尚未釋出。這是 10 月 `openai/math` 大規模公開之前的一次集中發布。

### The results

| Topic | Result | Lean file |
|---|---|---|
| High-dimensional sphere packing | Improved asymptotic upper bounds on sphere-packing density, reaching the Cohn–Elkies threshold. | `SpherePacking.lean` |
| Binary and spherical codes | Exponentially stronger upper bounds for binary codes at every minimum distance, together with corresponding bounds for spherical codes. | `MetricCodes.lean` |
| Non-sofic groups | A construction of a non-sofic group, resolving whether every group admits finite permutation approximations. | `NonSoficGroup.lean` |
| Connes's rigidity conjecture | A counterexample to the conjecture that certain groups are determined by their group von Neumann algebras. | `ConnesRigidity.lean` |
| Arithmetic circuit complexity | New lower bounds for computing the permanent with arithmetic circuits and formulas, including an $n^4 / \log n$ formula lower bound. | `Permanent.lean` |
| Quantum parallel repetition | Exponential parallel repetition for arbitrary finite, two-player quantum games. | `QuantumParallelRepetition.lean` |
| Closest vector problem | Polynomial-factor hardness of approximation for the closest vector problem, with related consequences for decoding and lattice problems. | `GapCVP.lean` |
| Ehrhart's volume conjecture | The sharp maximum volume in every dimension for a convex body whose centroid is its only interior lattice point. | `EhrhartVolumeInequality.lean` |
| Multicolor Ramsey numbers | A superexponential lower bound for multicolor triangle Ramsey numbers, resolving Erdős problem 183. | `MulticolorTriangleRamsey.lean` |
| Extremal number conjectures | Counterexamples to the compactness and degeneracy conjectures in extremal graph theory, resolving Erdős problems 146 and 180. | `CompactnessAndDegeneracy.lean` |

### 驗證與成本

- 每項結果都附 Lean 證明，收錄於 `openai/ten-proofs`，每項一個 `.lean` 檔，`lake build All` 可一次編譯全部。
- 另外公布論文與模型推理過程的 walkthroughs。
- 數學論證由模型產生，人類與同一個模型合作，把論證整理成手稿。
- OpenAI 估計，以 Sol API 價格計，找出這十個解的 token 成本約 2,000 美元，不含訓練成本。

## 2026-09-03 質數間隔

**GPT-6 Astra: A new generation of intelligence** [原文](https://openai.com/index/gpt-6-astra/)

這是 GPT-6 Astra 的發表，不是數學專文。發表同時公布兩篇質數間隔的論文，證明都歸給 GPT 6 Astra，各有一個 Lean repo。以下只整理數學的部分。

### Short gaps

**Improved Short Gaps Between Primes** [論文](https://cdn.openai.com/pdf/51126fac-1b68-4128-9666-c908bcc16033/short_gaps.pdf)

openai/PrimeGaps186 <a class="gh-link" href="https://github.com/openai/PrimeGaps186" target="_blank" rel="noopener noreferrer" aria-label="repo: openai/PrimeGaps186 on GitHub"><svg viewBox="0 0 16 16" class="ico" aria-hidden="true"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>repo</a>

{% include math/ai/repo-stats.html repo="openai/PrimeGaps186" %}

<div class="definition">
<strong>Admissible tuples and DHL</strong>
A set of distinct integers is admissible if it omits a residue class modulo every prime. Write $\mathrm{DHL}[k,j]$ for the assertion that every admissible $k$-tuple has infinitely many translates containing at least $j$ primes. Write $H_m:=\liminf_{n\to\infty}(p_{n+m}-p_n)$, where $p_n$ is the $n$th prime.
</div>

<div class="theorem">
<strong>Theorem 1.1</strong>
The assertion $\mathrm{DHL}[40,2]$ holds.
</div>

<div class="theorem">
<strong>Corollary 1.2</strong>
We have $H_1\le 186$.
</div>

- 結果為 $\liminf_{n\to\infty}(p_{n+1}-p_n)\le 186$。取一個直徑為 186、含 40 個元素的 admissible set，由 Theorem 1.1 可得無限多個平移各含至少兩個質數，因此 $H_1\le 186$，即 Corollary 1.2。孿生質數猜想是 $H_1=2$，仍未解決。
- 先前的 unconditional 紀錄是 Polymath 8b 的 $H_1\le 246$。同時期 Stadlmann 獨立證明了 $H_1\le 240$。
- 方法：結合 Polymath 8a 與 Stadlmann 的 equidistribution estimates，再用互補的 factorization conditions，使相關的乘積成為 triply densely divisible。這讓 multidimensional Selberg sieve 可以用更大的 support，配合更好的數值最佳化，得到 $\mathrm{DHL}[40,2]$。
- Lean 形式化是 **conditional**：依賴數值的 integral 與 cap bounds，以及最終來自 Deligne 的有限體 Riemann hypothesis 結果的 finite-field exponential-sum estimates，共三條明列的 axiom。repo 另附 Python-FLINT 程式，驗證其中的數值界。

### Long gaps

**Improved Long Gaps Between Primes** [論文](https://cdn.openai.com/pdf/51126fac-1b68-4128-9666-c908bcc16033/long_gaps.pdf)

openai/LongGapsBetweenPrimes <a class="gh-link" href="https://github.com/openai/LongGapsBetweenPrimes" target="_blank" rel="noopener noreferrer" aria-label="repo: openai/LongGapsBetweenPrimes on GitHub"><svg viewBox="0 0 16 16" class="ico" aria-hidden="true"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>repo</a>

{% include math/ai/repo-stats.html repo="openai/LongGapsBetweenPrimes" %}

<div class="definition">
<strong>Largest prime gap</strong>
Let $p_n$ denote the $n$th prime and let $G(X)=\max_{p_{n+1}\le X}(p_{n+1}-p_n)$. Write $\log_j$ for the $j$-fold iterated logarithm.
</div>

<div class="theorem">
<strong>Theorem 1.1</strong>
There is an absolute constant $c>0$ such that, for all sufficiently large $X$,
$$G(X)\ge c\,\frac{\log X\,(\log_2 X)^2\log_4 X}{(\log_3 X)^2}.$$
</div>

- 這比 Rankin 的界 $G(X)\gg \log X\log_2 X\log_4 X/(\log_3 X)^2$ 多了 $\log_2 X$ 的因子。
- 歷史進展：Westzynthius、Erdős、Rankin 依序推進；Erdős 問 Rankin 界的常數能否任意大，並為此開出 10,000 美元的獎金，Maynard 與 Ford–Green–Konyagin–Tao 各自獨立證明；之後 Ford–Green–Konyagin–Maynard–Tao 給出定量的界；GPT 5.6 Sol 在 Erdős Problems 網站（Problem #4）上貼出的論證給出更強的界。上述 Theorem 1.1 再往前推進。
- 證明的主要輸入是 Proposition 1.2（short translates），再套用 Erdős–Rankin 的構造。
- repo 含有 Theorem 1.1 的完整 Lean 證明 `LongGapsBetweenPrimes.lean`，沒有標示為 conditional。

## 2026-09-06 研究加速

**Research acceleration: The view inside OpenAI** [原文](https://openai.com/index/research-acceleration-view-inside-openai/)

OpenAI 說明內部研究如何被 automated AI researcher 與 coding agents 加速。內容不限於數學，但可作為之後數學成果大量出現的背景。

### 目標與進度

- 2025 年秋季，OpenAI 公開的目標是：2026 年 9 月前做出 automated research intern，2028 年 3 月前做出 automated AI researcher。
- Research intern 的定義是：在人類指導下，執行定義明確的研究任務，包括熟練研究者需要數天才能完成的任務。
- 依 OpenAI 的量測，intern 的目標已經達成。以 8 小時為一個標準工作日，研究組織在 8 月中旬的總 agent 執行時間相當於每一個人類工作日對應約 3.1 個 agent 工作日。[官方量測](https://openai.com/index/research-acceleration-view-inside-openai/)
- OpenAI 表示正朝 2028 年 3 月的 automated AI researcher 穩定推進。

### 限制

OpenAI 指出，AI 研究是有許多瓶頸的複雜過程，整體進展不一定跟上這些指標。研究優先序、要追哪些想法與結果，以及是否擴大、暫停或部署系統，仍由人決定。

## 2026-09-08 Navier–Stokes 與 Euler

**On the Navier–Stokes Millennium Prize Problem** [原文](https://openai.com/index/navier-stokes-solution/)

openai/NavierStokesAndEuler <a class="gh-link" href="https://github.com/openai/NavierStokesAndEuler" target="_blank" rel="noopener noreferrer" aria-label="repo: openai/NavierStokesAndEuler on GitHub"><svg viewBox="0 0 16 16" class="ico" aria-hidden="true"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>repo</a>

{% include math/ai/repo-stats.html repo="openai/NavierStokesAndEuler" %}

OpenAI 宣布內部模型提出三維 Navier–Stokes 方程的證明，其論文主張流體運動可以在有限時間內產生 singularity，並同時公開證明的 writeup 與 Lean formalization。

### 宣稱的內容

<div class="theorem">
<strong>Navier–Stokes</strong>
For every positive viscosity, we prove two results:
<ul>
<li><em>Whole space $\mathbb{R}^3$:</em> There exist smooth initial data and forcing for which no global smooth solution with uniformly bounded kinetic energy exists.</li>
<li><em>Periodic torus $\mathbb{R}^3/\mathbb{Z}^3$:</em> There exist smooth periodic initial data and forcing for which no global smooth solution exists.</li>
</ul>
</div>

OpenAI 主張，這兩個結果證明有光滑外力時可發生有限時間 breakdown，分別對應 Clay 問題陳述中的 (C) 與 (D)。

<div class="remark">
<strong>Remark.</strong>
Clay 的官方問題有四個版本：(A)、(B) 是無外力時，$\mathbb{R}^3$ 與週期情形下光滑解的全域存在性；(C)、(D) 是有外力時，對應情形下解的 breakdown。證明其中任一個即可。有外力的版本屬於問題本身，不是對原問題的弱化。
</div>

<div class="remark">
<strong>Remark.</strong>
Lean 檢查的是形式化之後的陳述。形式化的陳述是否忠實對應 Clay 問題，需要另外對照。
</div>

### Euler 方程

`openai/NavierStokesAndEuler` 另外收錄第二篇論文 *Finite time blowup for the Euler equation* 的 Lean formalization。

<div class="theorem">
<strong>Euler</strong>
We construct smooth, compactly supported, divergence-free initial velocity on $\mathbb{R}^3$ whose solution to the unforced incompressible Euler equations develops a singularity in finite time. The velocity's $C^1$ norm becomes unbounded near that time, and the time integral of the vorticity's $L^\infty$ norm diverges.
</div>

### 驗證

- 兩篇論文的結果都以 Lean 4 形式化，用 Lake 與 Mathlib 編譯。
- 獨立檢查可用 Comparator，說明在 repo 的 `ComparatorChallenges/README.md`。

## 2026-09-21 數學與 AI 顧問團體

**Advisory Group on Mathematics and Artificial Intelligence** [原文](https://openai.com/index/advisory-group-on-mathematics-and-ai/)

OpenAI 表示 8 月 28 日開始訓練一個新的內部模型。除了 Navier–Stokes，這個模型已經解決 100 多個 long-standing open problems，涵蓋數學的大多數領域，進展速度連 OpenAI 內部的數學家都感到意外。公告沒有列出問題清單。

### 顧問團體

Advisory Group on Mathematics and Artificial Intelligence 由 Institute for Advanced Study 主辦，有九位成員：

- François Charles（ENS-PSL）
- Camillo De Lellis（IAS、GSSI）
- Timothy Gowers（Collège de France、Cambridge）
- Martin Hairer（EPFL、Imperial College London）
- Nikhil Srivastava（Berkeley、Simons Institute）
- Ulrike Tillmann（Oxford）
- Ravi Vakil（Stanford）
- Edward Witten（IAS）
- Melanie Matchett Wood（Harvard）

### 職責與限制

- 職責是諮詢性質：評估新結果的重要性、就成果如何公開與學術規範提供建議。第一項工作是協助 OpenAI 公開這 100 多項結果。
- 成員不領酬勞，團體獨立於任何 AI 公司運作，對任何 AI 公司都沒有決策權。
- 團體的起點是 OpenAI 接洽部分成員，想成立外部顧問委員會；成員決定改成獨立團體，再邀請其他人加入。
- 團體不負責就 OpenAI 內部數學研究的推進速度提供建議。

這項公告出現在 9 月稍早 25 位 Fields 獎得主聯署公開信之後。公開信的論點是，AI 公司競相解決著名問題，威脅了數學家的智識工作。

## 2026-10-06 數學成果公開

**Sharing AI progress in mathematics** [原文](https://openai.com/index/sharing-ai-progress-in-mathematics/)

openai/math <a class="gh-link" href="https://github.com/openai/math" target="_blank" rel="noopener noreferrer" aria-label="repo: openai/math on GitHub"><svg viewBox="0 0 16 16" class="ico" aria-hidden="true"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>repo</a>

{% include math/ai/repo-stats.html repo="openai/math" %}

OpenAI 正式大規模釋出 `openai/math`，內容是內部模型產生的數學手稿與支持證明的材料。OpenAI 說明，模型在既有數學評測飽和之後，改在 open research problems 上評測，這些成果即來自這些評測。

### 釋出內容

- 截至 2026 年 10 月 26 日，目錄統計為 721 份 manuscripts，分為 373 個 families。一個 family 把相關論文放在一起，可能包含主要結果、輔助論證、推論或替代證明。每個 family 依數學領域分類。[目錄統計](https://github.com/openai/math/blob/main/README.md)
- 目錄有 overview PDF、manuscript map（`CONTENTS.md`）、`preprints/`（PDF、原始檔與引用、編譯說明）、Lean library 與 formalization catalogue，以及更新歷史。
- 授權為 Apache-2.0。

### 驗證狀態

- 部分結果已有 Lean formalization，其餘會在取得後陸續補上；截至 10 月 7 日的比例見下方更新。
- 沒有 formalization 的結果可能有問題，OpenAI 表示會盡快修正。
- 另提供 Comparator 的檢查說明。

### 產生方式

- 絕大多數結果用同一套流程，由尚未釋出的內部模型產生。平均每項結果使用三小時的 ChatGPT Pro thinking compute。
- 評測期間模型被問了約 4,000 個問題，整理成 families 與 manuscripts，並要求達到一定的重要性，得到上述 catalog。
- 例外是 a zero-free region for the Riemann zeta function，以及 the Hodge Conjecture for CM abelian varieties 的證明。其中 $\operatorname{Re}(s)>11/12$ 的 zero-free region 的 writeup 經人工編輯，以提升可讀性。

### Reasoning summaries

另外釋出十個 families 的 abridged reasoning summaries：

| Family | Subject |
|---|---|
| 007 | Ordinary two-point correlations of multiplicative functions |
| 017 | The irrationality exponent of $\pi$ |
| 087 | Symmetric and general Mahler conjectures |
| 102 | Ordinary NP-hardness at the basic semidefinite threshold |
| 159 | Quasipolynomial bounds for arithmetic progressions |
| 197 | Kaplansky's direct-finiteness conjecture in characteristic two |
| 221 | The Mézard–Parisi formula for diluted spin glasses |
| 271 | Spontaneous magnetization in the quantum Heisenberg ferromagnet |
| 287 | Isomorphism of free group factors |
| 362 | The three-dimensional relativistic Vlasov–Maxwell system |

### 公開方式

- OpenAI 諮詢了 Institute for Advanced Study 的 Advisory Group，以擬定公開這些成果的 best practices。
- 修正與修訂以新版本發布，舊版本保持可取得；每份手稿附 BibTeX。
- 目前以 GitHub repository 發布，同時評估符合顧問團體準則的社群代管方案。
- OpenAI 將持續更新公開重大科學進展的標準。
- 產生這些成果的模型尚未釋出，OpenAI 表示正在研究如何負責任地釋出。

### 10 月 7 日更新

這次更新包含撤回、修訂與新增形式化。[更新紀錄](https://github.com/openai/math/blob/main/history.md)

*Algebraicity of Weil classes on split abelian eightfolds* 的符號錯誤使 stabilization-trace cancellation 論證失效，也影響兩篇相依手稿使用的構造，因此撤回三篇：

- *Algebraicity of Weil classes on split abelian eightfolds*
- *Algebraicity of Kuga–Satake Correspondences for K3 Surfaces*
- *The rational Hodge conjecture for products of K3 surfaces*

另有 14 篇手稿修訂證明、陳述、假設、相依結果或引用；13 篇其他手稿則更新對修訂版本的引用與版本日期。撤回的手稿保留問題說明與封存版本，修訂的手稿也保留舊版。

新增 6 項形式化及 5 項支援結果的補充後，官方統計有 300 個主要結果（top-line results）完成形式化，以目錄的 719 份手稿為分母，比例為 $300/719\approx 42\%$。

### 10 月 15 日更新

OpenAI 宣布提供 500 萬美元，支持 Simons Foundation 的新計畫，協助數學家檢查、理解並延伸 AI 產生的成果。資金由 Simons Foundation 管理與分配，用於 workshops、conferences 與 special programs；OpenAI 也將向該基金會支持的研究者提供模型與運算資源。[官方更新](https://openai.com/index/sharing-ai-progress-in-mathematics/)

### 10 月 26 日更新

新增兩份 manuscripts，均附 Lean formalization，目錄因此增至 721 份、373 個 families。[更新紀錄](https://github.com/openai/math/blob/main/history.md)

- *Local smoothing for the Euclidean wave equation*（family 079）：以輔助偏微分方程證明任意空間維度 $n\ge2$ 的 Sogge local smoothing conjecture，並推出 Kakeya maximal 與維度猜想，以及 Stein 球面 restriction 估計在猜想範圍內部的結果。與 10 月 6 日的釋出相同，OpenAI 直接公開模型輸出。
- *The Exponential Time Hypothesis is False*（新 family 378）：給出在次指數時間與多項式空間內精確計數固定寬度 CNF 滿足賦值的確定性演算法，3-SAT 的情形反駁 Exponential Time Hypothesis。Russell Impagliazzo、Ramamohan Paturi 與 Ryan Williams 領導的獨立電腦科學家小組將檢驗並說明這個證明；應小組要求，材料立即公開。

形式化方面，*The rational Hodge conjecture for CM abelian varieties* 新增 Lean formalization，部分 Comparator 設定與 Lean formalizations 也經修正。*The maximum number of mutually unbiased bases in dimension six* 補回排除第四組 mutually unbiased basis 的 C++ 原始碼與數值紀錄，並附 Python checker 驗證紀錄的一致性與覆蓋範圍。

README 同日改稱這些手稿由 unnamed internal OpenAI model 產生，並表示它們較適合視為原始研究資料，而非整理完成的學術論文；credit、優先權與同期工作完全交由數學社群判斷。

### 10 月 29 日更新

*The rational Hodge conjecture for CM abelian varieties* 的 Comparator challenge 與 solution 的 namespace 不一致，已調整對齊。[更新紀錄](https://github.com/openai/math/blob/main/history.md)

## References

### OpenAI announcements

- [An OpenAI model has disproved a central conjecture in discrete geometry](https://openai.com/index/model-disproves-discrete-geometry-conjecture/)
- [Accelerating scientific discovery with ChatGPT for Academic Researchers](https://openai.com/index/chatgpt-for-academic-researchers/)
- [Ten advances in mathematics and theoretical computer science](https://openai.com/index/ten-advances-in-mathematics/)
- [GPT-6 Astra: A new generation of intelligence](https://openai.com/index/gpt-6-astra/)
- [Research acceleration: The view inside OpenAI](https://openai.com/index/research-acceleration-view-inside-openai/)
- [On the Navier–Stokes Millennium Prize Problem](https://openai.com/index/navier-stokes-solution/)
- [Advisory Group on Mathematics and Artificial Intelligence](https://openai.com/index/advisory-group-on-mathematics-and-ai/)
- [Sharing AI progress in mathematics](https://openai.com/index/sharing-ai-progress-in-mathematics/)

### Papers

- Noga Alon et al. [Remarks on the disproof of the unit distance conjecture](https://cdn.openai.com/pdf/74c24085-19b0-4534-9c90-465b8e29ad73/unit-distance-remarks.pdf)
- [A Proof of the Cycle Double Cover Conjecture](https://cdn.openai.com/pdf/04d1d1e4-bc75-476a-97cf-49055cd98d31/cdc_proof.pdf)
- [Prompt used for "A Proof of the Cycle Double Cover Conjecture"](https://cdn.openai.com/pdf/04d1d1e4-bc75-476a-97cf-49055cd98d31/cdc_prompt.pdf)
- [Ten advances in mathematics and theoretical computer science](https://cdn.openai.com/pdf/ten-proofs-oai.pdf), [reasoning walkthroughs](https://cdn.openai.com/pdf/reasoning-walkthroughs.pdf)
- [Improved Short Gaps Between Primes](https://cdn.openai.com/pdf/51126fac-1b68-4128-9666-c908bcc16033/short_gaps.pdf), [abridged chain of thought](https://cdn.openai.com/pdf/51126fac-1b68-4128-9666-c908bcc16033/short_gaps_abridged_cot.pdf)
- [Improved Long Gaps Between Primes](https://cdn.openai.com/pdf/51126fac-1b68-4128-9666-c908bcc16033/long_gaps.pdf), [abridged chain of thought](https://cdn.openai.com/pdf/51126fac-1b68-4128-9666-c908bcc16033/long_gaps_abridged_cot.pdf)
- [Finite time blowup for Navier–Stokes](https://cdn.openai.com/pdf/32d9f210-8b73-45e0-91bc-82a30aef8a9a/navier-stokes.pdf)
- [Finite time blowup for the Euler equation](https://cdn.openai.com/pdf/315b36cd-ec98-4023-8342-93345194ece1/euler.pdf)

### Repositories

- [openai/math](https://github.com/openai/math)
- [openai/ten-proofs](https://github.com/openai/ten-proofs)
- [openai/NavierStokesAndEuler](https://github.com/openai/NavierStokesAndEuler)
- [openai/cdc-lean](https://github.com/openai/cdc-lean)
- [openai/PrimeGaps186](https://github.com/openai/PrimeGaps186)
- [openai/LongGapsBetweenPrimes](https://github.com/openai/LongGapsBetweenPrimes)

### Cycle double cover

- Jim Geelen. *OpenAI's proof of the Cycle Double Cover Theorem*. [arXiv:2607.15399](https://arxiv.org/abs/2607.15399)
- Sang-il Oum. *A proof of the cycle double cover conjecture by OpenAI: An exposition*. [arXiv:2607.16356](https://arxiv.org/abs/2607.16356)
- Johannes Carmesin. [The cycle double cover theorem](https://matroidunion.org/?p=6255). Matroid Union

### Advisory group

- [Advisory Group on Mathematics and Artificial Intelligence](https://agmai.org)
- [OpenAI forms math advisory group as its AI resolves more than 100 open problems](https://techcrunch.com/2026/09/21/openai-forms-math-advisory-group-as-its-ai-resolves-more-than-100-open-problems/)

### Coverage

- [OpenAI Astra: ten open math problems for about $2,000](https://letsdatascience.com/blog/openai-astra-ten-open-math-problems-2000-dollars)
