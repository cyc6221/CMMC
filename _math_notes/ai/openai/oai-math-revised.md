---
layout: page
title: oai-math-revised
description: 追蹤 mathcommunity/oai-math-revised 中已 merge 的 PR，依 openai/math 的 result family 整理：manuscript 修訂、follow-up works、評論與 AI-only 的調查。
date: 2026-10-27
last_updated: 2026-10-31
pr_repo: mathcommunity/oai-math-revised
redirect_from:
  - /articles/Math/ai/openai/oai-math-revised/
---
mathcommunity/oai-math-revised {% include gh-link.html href="https://github.com/mathcommunity/oai-math-revised" label="repo" aria_label="repo: mathcommunity/oai-math-revised on GitHub" %}

{% include math/ai/repo-stats.html repo="mathcommunity/oai-math-revised" %}

oai-math-revised 是社群對 openai/math 論文的修訂計畫，獨立於 OpenAI，不是 OpenAI 認可或贊助的專案。

目前追蹤的 result family：#003、#087、#095、#102、#103、#109、#124、#142、#151、#165、#179、#240、#246、#325、#378。

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

## {% include math/ai/openai-result.html num="124" %}

### PR {% include pr-link.html num=55 %}

2026-10-29 merge，由 `ziangni-sys` 提交。在 *A polynomial-time algorithm for three-machine unit-job scheduling* 的 introduction 與參考文獻加入 16 筆經典文獻。這個問題 $P3\mid\mathrm{prec},p_j=1\mid C_{\max}$ 是 Garey–Johnson 的 OPEN8。theorem、section、equation 的編號不變。新增的文獻依用途分為：

- 兩台機器：Gabow（1982）、Garey–Johnson（1976、1977）。
- 機器數是輸入的一部分：Lenstra–Rinnooy Kan（1978）證明判定長度為 3 的排程是 NP-complete，因此除非 P = NP，否則沒有比 4/3 更好的近似比；Bodlaender–Fellows（1995）證明以機器數為參數時是 W[2]-hard。
- 三台機器的 open 狀態：Lenstra–Rinnooy Kan（1984）、Schuurman–Woeginger（1999）、Johnson（2005）、Mnich–van Bevern（2018，Open Problem 6），以及 Lawler–Lenstra–Rinnooy Kan–Shmoys（1993）的 survey。
- 特殊情形：Hu（1961，in-tree）、Papadimitriou–Yannakakis（1979，interval order）、Dolev–Warmuth（1985）。
- 近似：Graham（1966），比值 $2-1/m$；Lam–Sethi（1977），Coffman–Graham 的比值 $2-2/m$，三台機器為 4/3。

byline 改為 "OpenAI (with community contributions)"，日期改為 2026-10-27。重新編譯也把 PDF 中 lemma、proposition、definition 被印成 "Theorem" 的 cross-reference 名稱改正（例如 "Theorem 4.1" 變為 "Definition 4.1"）。參考文獻由 Claude Code 搜尋與起草，提交者確認 16 筆都存在。

## {% include math/ai/openai-result.html num="142" %}

### PR {% include pr-link.html num=33 %}

2026-10-25 merge，由 `schmittj` 提交。在 *Deterministic Polynomial Factorization over Prime Fields* 的 `NOTES.md` 的 Follow-up works 加入 Felipe Voloch 分享的 [draft note](https://github.com/user-attachments/files/33915910/kummer_cover_geometric_writeup_q2.pdf)。note 用 cyclic cover $y^q=F(x)$ 去掉無窮遠點後的 Picard 1-motive 與其 Kummer cover，重新詮釋第 4、8 節的 modules $T_t$ 與 label tests，並把這套 formalism 延伸到 $q=2$，沒有主張該情形有新的演算法。依 Voloch 本人的說明，note 由 AI chat 整理而成。

## {% include math/ai/openai-result.html num="151" %}

### PR {% include pr-link.html num=48 %}

2026-10-27 merge，由 `schmittj` 提交，來源是 `AI-Thales` 提交的 issue。建立 *A C¹ Counterexample to the Entropy Conjecture* 的 `NOTES.md`，在 Follow-up works 加入 Andrey Gogolev 的 [*A counterexample to the Shub entropy conjecture*](https://people.math.osu.edu/gogolyev.1/index_files/EC_example7.pdf)（expository note，2026-10-11）。note 以初等方式說明以該論文為基礎的構造：對每個有限的 $r\ge1$，給出 $S^1\times S^2\times S^2\times S^2$ 上拓樸熵為 0、在二階同調上有 eigenvalue 2 的 noninvertible $C^r$ 自映射。note 把構造歸於這篇論文，並說明使用了 OpenAI 的模型來簡化與理解證明。

## {% include math/ai/openai-result.html num="165" %}

### PR {% include pr-link.html num=58 %}

2026-10-28 merge，由 `schmittj` 提交，來源是 `dimpase` 提交的 issue。建立 *The crossing number of complete bipartite graphs* 的 `NOTES.md`，在 Follow-up works 加入 Dima Pasechnik 的 [*Crossing-number forest*](https://dimpase.github.io/crossing-number-forest/)（[source](https://github.com/dimpase/crossing-number-forest)）。這是 Forester 網站，把論文的論證拆成帶標籤的 definition、lemma 與 proof account，標出相依關係，並對應到論文的編號結果與 Lean declaration。網站自述 proof account 是對論文證明的重建，且未在本機執行 Lean。

## {% include math/ai/openai-result.html num="179" %}

### PR {% include pr-link.html num=1 %}

2026-10-18 merge，由 `nellore` 提交。在 *The circulant Hadamard conjecture* 的 introduction 加入一段，引用涵蓋 symmetric case 的早期結果，並同步更新 `references.bib` 與 PDF。

## {% include math/ai/openai-result.html num="240" %}

Family 240 有兩篇 manuscript：*Eventual Categoricity for Abstract Elementary Classes* 與 *A CH Obstruction to a Prescribed Categoricity Threshold*。兩者的 PR 都圍繞 Christian Espíndola 先前的 topos-theoretic 工作（[arXiv:1906.09169](https://arxiv.org/abs/1906.09169)、[arXiv:2301.13167](https://arxiv.org/abs/2301.13167)）。

### PR {% include pr-link.html num=36 %}

2026-10-25 merge，由 `schmittj` 提交。在 *Eventual Categoricity for Abstract Elementary Classes* 的 `NOTES.md` 加入 Jason Rute、Artem Chernikov 與 Espíndola 在 X 上的[討論](https://x.com/archernikov/status/2108219871213568342)（2026-10-08 至 2026-10-17），主題是 Espíndola 先前宣稱的證明（arXiv:1906.09169）的狀態。Chernikov 表示，依他的理解，該證明目前未被 small AEC 社群接受；Espíndola 回覆該社群沒有 topos theorist，且他的論文正在以 Lean formalize。論文在 Section 1 說明沒有引入那些 preprint 的內容。

### PR {% include pr-link.html num=35 %}

2026-10-25 merge，由 `schmittj` 提交。在 *A CH Obstruction to a Prescribed Categoricity Threshold* 的 `NOTES.md` 加入 Espíndola 在 X 上的[回覆](https://x.com/christianrubene/status/2111425004667572321)（2026-10-17）。論文的主定理與 arXiv:2301.13167 的 Theorem 4.1 結論相反，Section 7 描述了該證明某一步的 obstruction；Espíndola 的回覆表示論文的 Proposition 7.2 與他的某個結果矛盾。OpenAI 的 Lean formalization 涵蓋 Theorem 1.1，不涵蓋 Section 7。

### PR {% include pr-link.html num=42 %}

2026-10-25 merge，由 `solevillar` 提交。在同一份 `NOTES.md` 加入 AI-only 的調查報告 `espindola-investigation-by-agent-2026-10-25.pdf`，針對 Espíndola 提出的兩點：E1 是 Lemma 5.2 / Proposition 5.7 的 cardinal bound，E2 是 Proposition 7.2 與他的 Theorem 4.1。報告另用 Lean comparator 檢查 formalization，並校對 arXiv:2301.13167 的 Theorem 4.1，附上 GPT-6 Astra 與 Claude Opus 的八份底層報告。內容沒有經過任何人檢查，也沒有解決這個問題，仍需要專家判斷。

## {% include math/ai/openai-result.html num="246" %}

### PR {% include pr-link.html num=22 %}

2026-10-24 merge，由 `schmittj` 提交。建立 *A Modulus Proof of Cannon's Conjecture* 的 `NOTES.md`，在 Follow-up works 加入 Mario Bonk 的演講 [*The AI Proof of Cannon's conjecture*](https://www.youtube.com/watch?v=L2DU0VupdlU&t=1896s)（Quasiworld online seminar，2026-10-22，影片）。演講介紹這篇論文給出的 Cannon's conjecture 證明。

## {% include math/ai/openai-result.html num="325" %}

Family 325 有兩篇 manuscript：*A direct proof of the complete Crouzeix inequality* 與 *The complete Crouzeix theorem*。

### PR {% include pr-link.html num=29 %}

2026-10-25 merge，由 `abhijit-c` 提交。從兩篇 manuscript 的 `AGENT_NOTES.md` 的 Comments and discussion 移除 `trostaft` 的一則 Hacker News 留言，提交者自述即該留言的作者。他指出留言有誤：Crouzeix 改進的是 rate 前面的常數，而不是 rate，相關討論可見 Embree 的 technical report [arXiv:2209.01231](https://arxiv.org/abs/2209.01231) Section 2.2。這個 PR 只修正 AI 收集的 notes，不是對證明的 review。

## {% include math/ai/openai-result.html num="378" %}

Family 378 是 *The Exponential Time Hypothesis is False*。

### PR {% include pr-link.html num=60 %}

2026-10-29 merge，由 `chelsinchaos`（Chelsea A. McElveen）提交。在該論文的資料夾加入 `NOTES.md` 與 `checks/`：Section 2.3–2.7 的 executable toy model、Section 2.7 construction 的結構性評論，以及兩項寫作建議。不改動 TeX 與論文的主張。實作與撰寫由 Claude 協助。

### PR {% include pr-link.html num=68 %}

2026-10-30 merge，由 `schmittj` 提交，修正 PR {% include pr-link.html num=60 %} 加入的 `NOTES.md`。review 發現該檔的結構性評論有數學上的問題，對 Lean 的敘述不準確，指令也無法重現表格，且不符合 `AGENTS.md` 的格式。處理方式：

- `NOTES.md` 由約 1,100 字縮為約 210 字，移除 Commentary 各節（含評論 2(a)、2(b)、表格與對 $t$-dependence 的建議）。
- 移除 `checks/`，script 仍在貢獻者的 repository。
- 保留 Contributions 紀錄、$R=Q+1$ 的例子，以及貢獻者 repository 的連結。

保留的連結是 McElveen 的 [*Measurement-Indexed Counting: An Executable Study of OpenAI's \#3-SAT Algorithm, Semiring Component Caches, and the Limits of Oblivious Sampling*](https://github.com/chelsinchaos/measurement-indexed-counting/tree/7a73e39b11c71d2b3c7209074e04e84208612b58)（manuscript、程式與資料集，2026-10-28）。其中的 Python 模型逐項對照 brute force（$n\le14$），使用 heuristic schedule 而非論文的 derandomized 版本。review 的細節在 PR {% include pr-link.html num=60 %} 的 comment。PR 沒有主張論文有錯。
