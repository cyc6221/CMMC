---
layout: page
title: oai-math-revised
description: 追蹤 mathcommunity/oai-math-revised 中已 merge、且對 openai/math 的結果、驗證或理解有實質改善的 PR，依 result family 整理：manuscript 修訂、follow-up works 與獨立的 re-check。
date: 2026-10-27
last_updated: 2026-10-31
pr_repo: mathcommunity/oai-math-revised
redirect_from:
  - /articles/Math/ai/openai/oai-math-revised/
---
mathcommunity/oai-math-revised {% include gh-link.html href="https://github.com/mathcommunity/oai-math-revised" label="repo" aria_label="repo: mathcommunity/oai-math-revised on GitHub" %}

{% include math/ai/repo-stats.html repo="mathcommunity/oai-math-revised" %}

oai-math-revised 是社群對 openai/math 論文的修訂計畫，獨立於 OpenAI，不是 OpenAI 認可或贊助的專案。

目前追蹤的 result family：#003、#087、#095、#102、#103、#109、#142、#151、#165、#246。

<div class="remark">
<strong>Remark.</strong>
本頁收錄對 openai/math 的結果有實質改善的 merged PR。依改善的性質分類：
<ul>
<li>改善結果或驗證：簡化或加強證明、補上驗證的缺口、釐清依賴關係。</li>
<li>改善理解：重寫或逐步說明證明，或對應到 Lean declaration 的導讀。</li>
<li>只補引用、修正自動收集的 notes，以及 repository 層級的同步，不收錄。</li>
</ul>
</div>

<script defer src="{{ '/assets/js/repo-stats.js' | relative_url }}"></script>

## {% include math/ai/openai-result.html num="003" %}

PR 修改的是 *Uniform exclusion of Landau–Siegel zeros* 的 manuscript。後續的 exposition 與 variant 以沒有編號的 remark 列在 introduction，原有的 theorem 編號不變。

### PR {% include pr-link.html num=2 %}

2026-10-18 merge，由 `teorth` 提交。在 introduction 加入 remark，指向 Banks、Kerr、Green 三份後續 exposition，並更新 byline 與日期。

### PR {% include pr-link.html num=3 %}

2026-10-20 merge，由 `teorth` 提交。延伸 PR {% include pr-link.html num=2 %} 的 remark，加入 Tao 對 Green 論證的 sketch（含 Pascadi 的觀察）、Barreto 以 Wronskian 取代 resultant 的 variant，以及 Pescador 的 variant。

### PR {% include pr-link.html num=45 %}

2026-10-27 merge，由 `teorth` 提交。再延伸同一個 remark（現稱 "Subsequent expositions and developments"），加入：

- Roelof van Dijk 的 [*A Frobenius determinant proof of the non-existence of Landau–Siegel zeros*](https://hexagonmath.org/2610.00409)：用 Frobenius congruence 同時處理整除與 determinant 不為零，避開 resultant 與 Wronskian。
- Victor Zhenyu Guo 的 [*An explicit elementary proof of no Landau–Siegel zeros*](https://arxiv.org/abs/2610.30476)：初等證明，對每個 conductor $q\ge3$ 給出明確常數 $c=1/100$。
- Scott Kominers 的 [*Small algebraic integers and Frobenius prime sums*](https://hexagonmath.org/2610.00451)：把 determinant 論證用到有限 Galois 擴張中的每個 Frobenius class，得到加權的 Chebotarev 型界。
- William Banks 的 [*Landau-Siegel zeros over a base field and effective Brauer-Siegel*](https://arxiv.org/abs/2610.31402)：推廣到固定數體的二次擴張，並推出 effective Brauer–Siegel 定理。
- Paul Nelson 的[線上筆記](https://ultronozm.github.io/math/20261020T163023--siegel-zeros.html)：詳述 Galois 擴張中 Frobenius class 的方法，含明確常數。
- Paul Pollack 的 [*The missing Lin(ni)k*](https://hexagonmath.org/2610.00545)：結合 Landau–Siegel zeros 的排除與 Selberg 的 symmetry formula，給出 Linnik 定理的初等證明。

另修正 Banks 與 Barreto 參考文獻的字母順序，在 `NOTES.md` 的 Follow-up works 列出 12 項。日期更新、PDF 重新編譯後為 10 頁，theorem 編號不變。

## {% include math/ai/openai-result.html num="087" %}

### PR {% include pr-link.html num=47 %}

2026-10-27 merge，由 `schmittj` 提交。建立 *The symmetric Mahler conjecture and its equality cases* 的 `NOTES.md`，在 Follow-up works 加入 Rotem Assouline 的 [*Notes on OpenAI's proof of the symmetric Mahler conjecture*](https://rotemassouline.github.io/symmetric-mahler/)（網頁筆記，2026-10-23 更新）。內容是對該論文 volume product 上界與 equality case（Hanner polytope 的線性像）證明的重寫，仍在進行中，附 figures、互動 applet，以及對照論文編號的表。筆記自述根據與 Claude 的對話寫成，且作者未完整驗證證明。

## {% include math/ai/openai-result.html num="095" %}

### PR {% include pr-link.html num=23 %}

2026-10-24 merge，由 `schmittj` 提交。建立 *A Nonspectrahedral Hyperbolicity Cone* 的 `NOTES.md`，在 Follow-up works 加入 Kevin Shu 的 blog post [*A Digestion of A Counterexample to the Generalized Lax Conjecture*](https://www.quasicoherent.blog/posts/generalized_lax/)（Quasicoherent，2026-10-12）。文章沒有署名，依該論文 `AGENT_NOTES.md` 的做法歸於 Kevin Shu。內容說明論文如何由 positive maps 的 quadratic family 構造 hyperbolicity cone，以及這些 cone 為什麼不是 spectrahedral。

## {% include math/ai/openai-result.html num="102" %}

Family 102 有四篇 direct proof：*A Direct Proof of Optimal Max-Cut Hardness*、*The Factor-Two Hardness Threshold for Vertex Cover*、*Constant-factor hardness of Min-UnCut*、*Constant-factor hardness of directed feedback vertex set*。

### PR {% include pr-link.html num=59 %}

2026-10-30 merge，由 `schmittj` 提交，由 Kunal Relia 建議。在四篇的 introduction 各加入沒有編號的 remark "Relation to the Unique Games Theorem"：若同一批釋出的 *The Unique Games Theorem* 成立，主結果也可由它加上先前的 conditional reduction 推出。

- Max-Cut：Khot–Kindler–Mossel–O'Donnell（2007），搭配 Majority Is Stablest。
- Vertex Cover：Khot–Regev（2008）。
- Min-UnCut：Khot–Kindler–Mossel–O'Donnell（2007）的 weighted 形式，蘊含 unweighted 的情形。
- Directed feedback vertex set：Guruswami–Manokaran–Raghavendra（2008）或 Svensson（2013）。

四篇的證明本身不使用 *The Unique Games Theorem*，remark 指出各自實際使用的 hardness input。每篇另加入該論文的一條參考文獻，更新 byline 與日期，並新增 `NOTES.md`。重新編譯後，Max-Cut 與 Vertex Cover 的 cross-reference 改顯示 TeX 指定的環境名稱（例如 "Theorem 2.2" 變為 "Proposition 2.2"），編號不變。Relia 建議在 abstract 加入「只以 P ≠ NP 為條件」的字樣，因為會誤述這些無條件的 NP-hardness 定理，未採用。

## {% include math/ai/openai-result.html num="103" %}

### PR {% include pr-link.html num=57 %}

2026-10-29 merge，由 `Beltran12138` 提交。建立 *Exact Derandomization of Logarithmic Space: L = RL = BPL* 的 `NOTES.md`，在 Constructive comments / reviews 加入 [oai-math-recheck 的 family 103](https://github.com/Beltran12138/oai-math-recheck/tree/f3507cf8b0b5761e792f8b0adbecbc0f1dff5966/families/103)（獨立 re-check，2026-10-11）。

2026-10-26 的 Comparator run 對這個 challenge 只比較 `definition_names` 所列 20 個 definition 的型別，不比較 body，因此證明可能使用不同的 definition。re-check 針對同一個 openai/math commit（`fd4aeeb`）補上這個缺口：

- 分別 elaborate challenge 與 OpenAI 的 solution，傾印定理 statement 可達的 55 個 `OAI` constant，包含各 definition 的 body。兩份傾印在 arm64 與 x86_64 上逐位元組相同，20 個 definition 都在其中。
- 只改 `BPL` 的 body 的 negative control 會被拒絕，所以比較確實涵蓋 body。
- 證明的 39 個 module 都能 build，定理只依賴 `propext`、`Classical.choice`、`Quot.sound`。

re-check 沒有顯示機器模型是 L、RL、BPL 的標準模型。OpenAI 在 10-26 的更新已清空這個 challenge 的 `definition_names`，之後的 Comparator run 會直接比較這些 body。re-check 的 harness 與這份 note 由 Claude Code 協助撰寫，提交者已檢查。

## {% include math/ai/openai-result.html num="109" %}

### PR {% include pr-link.html num=24 %}

2026-10-24 merge，由 `mark-schultz-wu` 提交。建立 *Integer multiplication below n log n* 的 `NOTES.md`，在 Constructive comments / reviews 加入 David Harvey 的 [*On the recently proposed o(n log n) integer multiplication algorithm*](https://web.maths.unsw.edu.au/~davidharvey/research/subnlogn.pdf)（2026-10-20）。Harvey 是 2021 年 $O(n\log n)$ 演算法的共同作者，論文以該演算法為基礎。這份 note 逐步說明核心 gadget 與 tensor amplification，認為主結果 plausible，並列出尚未檢查的部分。

## {% include math/ai/openai-result.html num="142" %}

### PR {% include pr-link.html num=33 %}

2026-10-25 merge，由 `schmittj` 提交。在 *Deterministic Polynomial Factorization over Prime Fields* 的 `NOTES.md` 的 Follow-up works 加入 Felipe Voloch 分享的 [draft note](https://github.com/user-attachments/files/33915910/kummer_cover_geometric_writeup_q2.pdf)。note 用 cyclic cover $y^q=F(x)$ 去掉無窮遠點後的 Picard 1-motive 與其 Kummer cover，重新詮釋第 4、8 節的 modules $T_t$ 與 label tests，並把這套 formalism 延伸到 $q=2$，沒有主張該情形有新的演算法。依 Voloch 本人的說明，note 由 AI chat 整理而成。

## {% include math/ai/openai-result.html num="151" %}

### PR {% include pr-link.html num=48 %}

2026-10-27 merge，由 `schmittj` 提交，來源是 `AI-Thales` 提交的 issue。建立 *A C¹ Counterexample to the Entropy Conjecture* 的 `NOTES.md`，在 Follow-up works 加入 Andrey Gogolev 的 [*A counterexample to the Shub entropy conjecture*](https://people.math.osu.edu/gogolyev.1/index_files/EC_example7.pdf)（expository note，2026-10-11）。note 以初等方式說明以該論文為基礎的構造：對每個有限的 $r\ge1$，給出 $S^1\times S^2\times S^2\times S^2$ 上拓樸熵為 0、在二階同調上有 eigenvalue 2 的 noninvertible $C^r$ 自映射。note 把構造歸於這篇論文，並說明使用了 OpenAI 的模型來簡化與理解證明。

## {% include math/ai/openai-result.html num="165" %}

### PR {% include pr-link.html num=58 %}

2026-10-28 merge，由 `schmittj` 提交，來源是 `dimpase` 提交的 issue。建立 *The crossing number of complete bipartite graphs* 的 `NOTES.md`，在 Follow-up works 加入 Dima Pasechnik 的 [*Crossing-number forest*](https://dimpase.github.io/crossing-number-forest/)（[source](https://github.com/dimpase/crossing-number-forest)）。這是 Forester 網站，把論文的論證拆成帶標籤的 definition、lemma 與 proof account，標出相依關係，並對應到論文的編號結果與 Lean declaration。網站自述 proof account 是對論文證明的重建，且未在本機執行 Lean。

## {% include math/ai/openai-result.html num="246" %}

### PR {% include pr-link.html num=22 %}

2026-10-24 merge，由 `schmittj` 提交。建立 *A Modulus Proof of Cannon's Conjecture* 的 `NOTES.md`，在 Follow-up works 加入 Mario Bonk 的演講 [*The AI Proof of Cannon's conjecture*](https://www.youtube.com/watch?v=L2DU0VupdlU&t=1896s)（Quasiworld online seminar，2026-10-22，影片）。演講介紹這篇論文給出的 Cannon's conjecture 證明。

