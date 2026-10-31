---
layout: page
title: oai-math-revised
description: 追蹤 mathcommunity/oai-math-revised 中已 merge 的 PR，依 openai/math 的 result family 整理：manuscript 修訂、follow-up works、評論與 AI-only 的調查。
date: 2026-10-27
last_updated: 2026-10-27
pr_repo: mathcommunity/oai-math-revised
redirect_from:
  - /articles/Math/ai/openai/oai-math-revised/
---
mathcommunity/oai-math-revised {% include gh-link.html href="https://github.com/mathcommunity/oai-math-revised" label="repo" aria_label="repo: mathcommunity/oai-math-revised on GitHub" %}

{% include math/ai/repo-stats.html repo="mathcommunity/oai-math-revised" %}

oai-math-revised 是社群對 openai/math 論文的修訂計畫，獨立於 OpenAI，不是 OpenAI 認可或贊助的專案。

目前追蹤的 result family：#003、#095、#109、#142、#179、#240、#246、#325。

<script defer src="{{ '/assets/js/repo-stats.js' | relative_url }}"></script>

## {% include math/ai/openai-result.html num="003" %}

PR 修改的是 *Uniform exclusion of Landau–Siegel zeros* 的 manuscript。後續的 exposition 與 variant 以沒有編號的 remark 列在 introduction，原有的 theorem 編號不變。

### PR {% include pr-link.html num=2 %}

2026-10-18 merge，由 `teorth` 提交。在 introduction 加入 remark，指向 Banks、Kerr、Green 三份後續 exposition，並更新 byline 與日期。

### PR {% include pr-link.html num=3 %}

2026-10-20 merge，由 `teorth` 提交。延伸 PR {% include pr-link.html num=2 %} 的 remark，加入 Tao 對 Green 論證的 sketch（含 Pascadi 的觀察）、Barreto 以 Wronskian 取代 resultant 的 variant，以及 Pescador 的 variant。

## {% include math/ai/openai-result.html num="095" %}

### PR {% include pr-link.html num=23 %}

2026-10-24 merge，由 `schmittj` 提交。建立 *A Nonspectrahedral Hyperbolicity Cone* 的 `NOTES.md`，在 Follow-up works 加入 Kevin Shu 的 blog post [*A Digestion of A Counterexample to the Generalized Lax Conjecture*](https://www.quasicoherent.blog/posts/generalized_lax/)（Quasicoherent，2026-10-12）。文章沒有署名，依該論文 `AGENT_NOTES.md` 的做法歸於 Kevin Shu。內容說明論文如何由 positive maps 的 quadratic family 構造 hyperbolicity cone，以及這些 cone 為什麼不是 spectrahedral。

## {% include math/ai/openai-result.html num="109" %}

### PR {% include pr-link.html num=24 %}

2026-10-24 merge，由 `mark-schultz-wu` 提交。建立 *Integer multiplication below n log n* 的 `NOTES.md`，在 Constructive comments / reviews 加入 David Harvey 的 [*On the recently proposed o(n log n) integer multiplication algorithm*](https://web.maths.unsw.edu.au/~davidharvey/research/subnlogn.pdf)（2026-10-20）。Harvey 是 2021 年 $O(n\log n)$ 演算法的共同作者，論文以該演算法為基礎。這份 note 逐步說明核心 gadget 與 tensor amplification，認為主結果 plausible，並列出尚未檢查的部分。

## {% include math/ai/openai-result.html num="142" %}

### PR {% include pr-link.html num=33 %}

2026-10-25 merge，由 `schmittj` 提交。在 *Deterministic Polynomial Factorization over Prime Fields* 的 `NOTES.md` 的 Follow-up works 加入 Felipe Voloch 分享的 [draft note](https://github.com/user-attachments/files/33915910/kummer_cover_geometric_writeup_q2.pdf)。note 用 cyclic cover $y^q=F(x)$ 去掉無窮遠點後的 Picard 1-motive 與其 Kummer cover，重新詮釋第 4、8 節的 modules $T_t$ 與 label tests，並把這套 formalism 延伸到 $q=2$，沒有主張該情形有新的演算法。依 Voloch 本人的說明，note 由 AI chat 整理而成。

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
