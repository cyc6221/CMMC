---
layout: page
title: CrocSwap integer-mult-bounds
date: 2026-10-21
last_updated: 2026-10-26
---
CrocSwap/integer-mult-bounds {% include gh-link.html href="https://github.com/CrocSwap/integer-mult-bounds" label="repo" aria_label="repo: CrocSwap/integer-mult-bounds on GitHub" %}

{% include math/ai/repo-stats.html repo="CrocSwap/integer-mult-bounds" %}
<script defer src="{{ '/assets/js/repo-stats.js' | relative_url }}"></script>

integer-mult-bounds 是改進 openai/math Result #109 的社群專案，建立於 2026 年 10 月 7 日，由 Douglas Colkitt 維護。成果以 PR 形式由社群貢獻，經 maintainer review 後整合。

#109 給出整數乘法的 deterministic 時間界 $O(n(\log n)^{1-\kappa})$，其中 $\kappa=2^{-182}$。專案保留 #109 的框架，優化其中的有限建構、遞迴成本帳與 packing 等環節，把 $\kappa$ 往上推。多數進展不是全新的整數乘法演算法，而是在同一個框架內改善個別瓶頸。

本文內容更新至 2026 年 10 月 26 日，其中的狀態與 $\kappa$ 以此為準。文中的日期與時間以 UTC 計。

## OpenAI #109

[openai/math](https://github.com/openai/math) 的第 109 項結果是 OpenAI 於 2026 年 9 月 23 日發表的 preprint [*Integer multiplication below $n\log n$*](https://github.com/openai/math/tree/main/preprints/Integer-multiplication-below-n-log-n-September-23-2026)。以下為原文。

### Abstract

> We give a deterministic algorithm that multiplies two $n$-bit integers in $O(n(\lg n)^{1-\kappa})$ worst-case time, with $\kappa=2^{-182}$, on one fixed finite-alphabet Turing machine with a fixed finite number of one-dimensional tapes. The algorithm is exact for every input length and disproves the $n\log n$ optimality conjecture of Schönhage and Strassen in this model.

### Main theorem

<div class="definition">
<strong>Setup</strong>
For a binary string $x$ of length $n$, let $\operatorname{val}(x)$ be its nonnegative integer value, with the leftmost bit most significant. For $0\le z&lt;2^k$, let $\operatorname{bin}_k(z)$ denote its binary representation padded on the left to length $k$. We consider exact multiplication: on input $x\#y$, with $x,y\in\{0,1\}^n$, the output must be $\operatorname{bin}_{2n}(\operatorname{val}(x)\operatorname{val}(y))$. Write $\lg n=\max\{\lceil\log_2 n\rceil,1\}$.
</div>

<div class="theorem">
<strong>Theorem 1</strong>
There is one deterministic Turing machine $A$, with a fixed finite alphabet and a fixed finite number of one-dimensional tapes, that computes this exact product for every $n\ge1$ and every pair of $n$-bit inputs. Its worst-case running time satisfies
$$T_A(n)=O\!\left(n(\lg n)^{1-\kappa}\right),\qquad \kappa=2^{-182}.$$
</div>

<div class="remark">
<strong>Remark.</strong>
The bound is asymptotic through all input lengths. The constants and thresholds in the construction are extremely large; the algorithm is intended to establish a bit-complexity bound. The theorem refutes an eventual $\Omega(n\log n)$ lower bound for every fixed multiplication machine in this model.
</div>

$\kappa$ 越大，$(\lg n)^{1-\kappa}$ 越小，所以改進這個結果等同於提高 $\kappa$。

## 目前狀態

<table class="table-center">
  <thead>
    <tr>
      <th>項目</th>
      <th>$\kappa$</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>OpenAI #109</td>
      <td>$2^{-182}$</td>
    </tr>
    <tr>
      <td>Past selected：#1094<br>（maintainer-reviewed）</td>
      <td>$0.001672660197076918\approx 2^{-9.22}$</td>
    </tr>
    <tr>
      <td>Past selected：#4359<br>（maintainer-reviewed）</td>
      <td>$0.0023>2^{-9}$</td>
    </tr>
    <tr>
      <td>#4416<br>（intermediate reviewed checkpoint）</td>
      <td>$0.00268647$</td>
    </tr>
    <tr>
      <td>Past selected：#4470<br>（maintainer-reviewed）</td>
      <td>$0.00302015$</td>
    </tr>
    <tr>
      <td>Past selected：#4610<br>（maintainer-reviewed）</td>
      <td>$0.0030217758$</td>
    </tr>
    <tr>
      <td>Past selected：#5413<br>（maintainer-reviewed）</td>
      <td>$0.003027288235$</td>
    </tr>
    <tr>
      <td>Current selected：#5599<br>（merged, maintainer-reviewed）</td>
      <td>$0.00310045$</td>
    </tr>
    <tr>
      <td>Highest open claim：#5440<br>（open, no maintainer review）</td>
      <td>$0.0033999964$</td>
    </tr>
  </tbody>
</table>

### #1094

Past selected：Rohan Arun 的 [#1094](https://github.com/CrocSwap/integer-mult-bounds/pull/1094)，狀態是 maintainer-reviewed conditional finite construction。它建立在 Jeremy Kothe 的 #1087 packing 與累積的 k8 / slot / T16 建構上，bit supplier 是 DreamingOfClouds 的 #589（建立在 eumemic 的 #555 上）。重放指令為 `make frontier1094-verify`。

### #4359

Past selected：zxv 的 [#4359](https://github.com/CrocSwap/integer-mult-bounds/pull/4359)，狀態是 maintainer-reviewed conditional productive-helper construction。它讓 helper 結束時已完成的 transform 成為有用的輸出，並以 Jacob Alan Sussman 的 mixed-target recursion 為直接的概念前驅，承接先前的 complex / native、binary word 與 outer / precision 工作（完整名單見 [contributors](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/community-productive4359-contributors.md)）。$\kappa$ 比 #1094 高 37.51%，重放指令為 `make frontier4359-verify`，現在保留為 historical checkpoint。

#4359 的驗證方面，maintainer 以全新的 23-stage sequential replay 比對 59 個重新產生的 artifact，並對變動的 compiler、native lift、delayed BIT cover 與 outer-transfer 介面做 AI 協助的 mathematical review。Ryanson Jonathan 的 [#4404](https://github.com/CrocSwap/integer-mult-bounds/pull/4404) 另以獨立實作做了 exact flow / rank audit。

### #4416

Reviewed checkpoint：Cinna Davis 的 [#4416](https://github.com/CrocSwap/integer-mult-bounds/pull/4416)，$\kappa=0.00268647$，狀態是 merged、maintainer-reviewed，但未升為 selected。它在 tensor composition 之後，對過小的 productive transform 另付費補足（paid completion），讓 paid 與 target 嚴格分離，使 p7 controller 能通過 #4359 的 strict compiler 條件。其 exponent saving 比 #4359 的 $0.0023$ 大 16.80%，這個比較不是實測的執行時間。

驗證方面，[#4420](https://github.com/CrocSwap/integer-mult-bounds/pull/4420) 與 [#4428](https://github.com/CrocSwap/integer-mult-bounds/pull/4428) 獨立檢查 moment、paid-tail 與 paid-completion 不等式；maintainer 在 10 月 21 日完成 #4416 與 zxv 的 #4433 的 [proof review](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-intake-evidence/pr4416/PROOF-REVIEW.md)，限於保留的 #4359 假設。Selected record 當時仍是 $0.0023$，所以它是 intermediate checkpoint；這份 review 後來被 #4470 的 selection 重用為 foundation。

### #4470

Past selected：Cinna Davis 的 [#4470](https://github.com/CrocSwap/integer-mult-bounds/pull/4470)，於 2026 年 10 月 22 日升為 selected，狀態是 maintainer-reviewed conditional joint-helper construction。它同時調整 helper 的 entrance、exit 與 contact frame，再用 query-thinned 的 16-pair controller。它承接 Cinna 自己的 #4416、#4440、#4441、#4447，以及 zxv 的 productive-helper native / compiler 與 Jacob Alan Sussman 的 mixed-target recursion（完整名單見 [contributors](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/community-joint4470-contributors.md)）。$\kappa=60403/20000000$，其 exponent saving 比 #4359 的 $0.0023$ 大 31.31%，比 #4416 的 $0.00268647$ 大 12.42%。這些百分比比較的是 exponent saving，不是實測的執行時間。重放指令為 `make frontier4470-verify`，現在保留為 historical checkpoint。

驗證方面，maintainer 對變動的建構做八個 scoped、serial 的重放。Source 完全相同的 #4359 與 #4416 foundation review 被明確重用，不重跑。Linux（Python 3.12）上的 hosted CI 通過了 selected 的八段重放，見 [integration receipt](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-intake-evidence/pr4470/INTEGRATION.json)。

#4470 的 [proof review](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-intake-evidence/pr4470/PROOF-REVIEW.md) 先完成，selection 隨後在同一天（10 月 22 日）完成。Archive 合併、conditional review 與 selection 是三件不同的事；selection 另需一致的 source closure、重放指令與公開狀態更新。

### #4610

Past selected：Cao Yifan 的 [#4610](https://github.com/CrocSwap/integer-mult-bounds/pull/4610)，於 2026 年 10 月 23 日升為 selected，狀態是 maintainer-reviewed conditional native-map construction。它沿用 #4470 的 p16 controller，同時調整 helper 的 entrance、scalar contact 與 native map。$\kappa=15108879/5000000000=0.0030217758$，比 #4470 高 $1.6258\times10^{-6}$。重放指令為 `make frontier4610-verify`，現在保留為 historical checkpoint。

Selection 以 Chris R 的 [#5241](https://github.com/CrocSwap/integer-mult-bounds/pull/5241) 為依據：它對 #4610 做獨立的 source-bound audit，涵蓋 phase、任意輸入、invoice、compiler 與 outer 各階段。Maintainer 以完整的 independent admission replay 重放，並明確重用前一個 selected 的 controller、ordinary BIT 與 physical / compiler foundation。被接受的是凍結的 native word 與 compiler point，不是 PR 內每個探索性結果；#4470 的五個框架假設不變。

### #5413

Past selected：Chris R 的 [#5413](https://github.com/CrocSwap/integer-mult-bounds/pull/5413)，於 2026 年 10 月 24 日升為 selected，狀態是 maintainer-reviewed conditional neutral-caller construction。它補完 Dillon Amburgey 的 [#5402](https://github.com/CrocSwap/integer-mult-bounds/pull/5402)（保留全部 632 個 native input 的 eight-mode coupled helper provider）的輸出，接在 Ali Romman 的 [#5398](https://github.com/CrocSwap/integer-mult-bounds/pull/5398)（direct backward caller）上。$\kappa=605457647/200000000000=0.003027288235$，比 #4610 高約 0.182424%。重放指令為 `make frontier5413-verify`，現在保留為 historical checkpoint。

相對 #5398 與 #5400 只多 $5\times10^{-12}$，這是 compiler / outer headroom，不是新的 recursive-price saving。Selection 納入 #5407（provider audit）與 [#5414](https://github.com/CrocSwap/integer-mult-bounds/pull/5414)（獨立檢查 neutrality 與必要的 pricing），並明確重用 #4610 的 foundation。

### #5599

Current selected：Ali Romman 的 [#5599](https://github.com/CrocSwap/integer-mult-bounds/pull/5599)，於 2026 年 10 月 26 日升為 selected，狀態是 maintainer-reviewed conditional P104 helper-subspace construction。它在 P104 word 上做 13 個 helper-subspace split，產生真正獨立的輸入並切開 productive target，不增加 paid Gaussian call。完整 caller 有 13,048 個 productive field 與 66,726 個 paid call。$\kappa=62009/20000000=0.00310045$，其 exponent saving 比 #5413 的 $0.003027288235$ 大約 2.41674%，這個比較不是實測的執行時間。重放指令為 `make frontier5599-verify`。

它承接 hexapode 的 [#5565](https://github.com/CrocSwap/integer-mult-bounds/pull/5565)（commuting-contact cascade）、Joel Pulikkan 的 [#5569](https://github.com/CrocSwap/integer-mult-bounds/pull/5569)、DreamingOfClouds 的 [#5561](https://github.com/CrocSwap/integer-mult-bounds/pull/5561)、thu-nmrc 的 [#5551](https://github.com/CrocSwap/integer-mult-bounds/pull/5551) 與 Ali Romman 自己的 #5544、#5545、#5580（完整名單見 [contributors](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/community-p1045599-contributors.md)）。

驗證方面，完整 construction、原本的獨立 caller positive control、adapted caller 與 optimized construction 的重放，都在 Linux 上以 1 GiB 的取樣記憶體上限 serial 通過，positive control 與凍結的輸出完全一致。前一個 foundation 被明確重用，五個 conditional 框架假設不變。這不是完整的 Lean 定理或獨立的人類驗證，超大的 uniform word 與 rounded multiplier 沒有實體化。細節見 [proof review](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-intake-evidence/pr5599-completion/PROOF-REVIEW.md)。

### open claim

目前 $\kappa$ 最高的 open claim 是 DaysSky 的 [#5440](https://github.com/CrocSwap/integer-mult-bounds/pull/5440)，$\kappa=951999/280000000=0.0033999964$，尚未 merge，沒有 maintainer review。以下是作者的宣稱：它把 p19 coded-reverse chain 實體化並計價，complex supplier 為 $0.007578535$，BIT supplier 為 $17/5000$，BIT 一側綁住 $0.0034$：在 $0.0034$ 時 outer ledger 的 `actual_bit_above_effective` 失敗，所以取在 $0.0034$ 下方約 $3.6\times10^{-9}$ 處。同一個值的 [#5270](https://github.com/CrocSwap/integer-mult-bounds/pull/5270) 不用 coded overlay，作者自述為 draft。

在 #5599 的 P104 線上，最高的 open claim 是 Ali Romman 的 [#5678](https://github.com/CrocSwap/integer-mult-bounds/pull/5678)，$\kappa=0.00310815849$，比 #5660 高 $1.39516\times10^{-6}$。

## $\kappa$ 的里程碑

下表依 $\kappa$ 由小到大列出 selected result 的主要節點，貢獻欄只列主要作者。第一個 reviewed community checkpoint（round two）的 $\kappa=5.1017\times10^{-5}$ 首次超過 $2^{-15}$。

<table class="table-center">
  <thead>
    <tr>
      <th>里程碑</th>
      <th>$\kappa$</th>
      <th>主要貢獻</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>OpenAI #109</td>
      <td>$2^{-182}$</td>
      <td>OpenAI</td>
    </tr>
    <tr>
      <td>frozen-154</td>
      <td>$2^{-154}$</td>
      <td>原 network 與 recurrence exponent 的 patch</td>
    </tr>
    <tr>
      <td>ternary-30</td>
      <td>$2^{-30}$</td>
      <td>ternary five-subset circuit</td>
    </tr>
    <tr>
      <td>round two（#62）</td>
      <td>$5.1017\times10^{-5}$</td>
      <td>Avi Eisenberg<br>eumemic<br>Alejandro Zarzuelo Urdiales</td>
    </tr>
    <tr>
      <td>#104 stopped product-ring</td>
      <td>$7.7948\times10^{-5}$</td>
      <td>icekylinx</td>
    </tr>
    <tr>
      <td>#115 partial-gauge</td>
      <td>$9.2634\times10^{-5}$</td>
      <td>icekylinx</td>
    </tr>
    <tr>
      <td>#130 three-stage cover</td>
      <td>$3.1460\times10^{-4}$</td>
      <td>icekylinx</td>
    </tr>
    <tr>
      <td>paired-cube（#144）</td>
      <td>$4.6092\times10^{-4}$</td>
      <td>icekylinx</td>
    </tr>
    <tr>
      <td>recycled bit registers（#146–#148、#150）</td>
      <td>$4.7215\times10^{-4}$</td>
      <td>William Porter<br>DaysSky<br>Thomas Marchand<br>Rohan Gupta</td>
    </tr>
    <tr>
      <td>#186</td>
      <td>$6.6189\times10^{-4}$</td>
      <td>Dugongue</td>
    </tr>
    <tr>
      <td>#210</td>
      <td>$7.1005\times10^{-4}$</td>
      <td>eumemic</td>
    </tr>
    <tr>
      <td>gen4（#276、#279）</td>
      <td>$7.2357\times10^{-4}$</td>
      <td>DreamingOfClouds<br>Rohan Arun</td>
    </tr>
    <tr>
      <td>#531</td>
      <td>$1.5178\times10^{-3}$</td>
      <td>icekylinx</td>
    </tr>
    <tr>
      <td>#535</td>
      <td>$1.5849\times10^{-3}$</td>
      <td>icekylinx<br>DreamingOfClouds</td>
    </tr>
    <tr>
      <td>#588</td>
      <td>$1.6023\times10^{-3}$</td>
      <td>Jeremy Kothe</td>
    </tr>
    <tr>
      <td>#617</td>
      <td>$1.6352\times10^{-3}$</td>
      <td>Jeremy Kothe</td>
    </tr>
    <tr>
      <td>#626</td>
      <td>$1.6355\times10^{-3}$</td>
      <td>Chafik Boukhalfa</td>
    </tr>
    <tr>
      <td>#942</td>
      <td>$1.6620\times10^{-3}$</td>
      <td>Jonathan Capalbo</td>
    </tr>
    <tr>
      <td>#1042</td>
      <td>$1.6722\times10^{-3}$</td>
      <td>Jeremy Kothe</td>
    </tr>
    <tr>
      <td>#1094</td>
      <td>$1.6727\times10^{-3}$</td>
      <td>Rohan Arun</td>
    </tr>
    <tr>
      <td>#4359</td>
      <td>$2.3\times10^{-3}$</td>
      <td>zxv</td>
    </tr>
    <tr>
      <td>#4470</td>
      <td>$3.02015\times10^{-3}$</td>
      <td>Cinna Davis</td>
    </tr>
    <tr>
      <td>#4610</td>
      <td>$3.02178\times10^{-3}$</td>
      <td>Cao Yifan</td>
    </tr>
    <tr>
      <td>#5413</td>
      <td>$3.02729\times10^{-3}$</td>
      <td>Chris R<br>Dillon Amburgey<br>Ali Romman</td>
    </tr>
    <tr>
      <td>#5599（目前 selected）</td>
      <td>$3.10045\times10^{-3}$</td>
      <td>Ali Romman<br>hexapode</td>
    </tr>
  </tbody>
</table>

## 近期發展

以下依序為 #1094 之後的主要 PR。#1094 被選定之後，maintainer 完成了 19 批 review（efficient100 至 efficient1900，每批約 100 個 PR），這些 review 保留各 PR 的建構、負面結果與驗證工具，但沒有更動 selected $\kappa$，直到 #4359 被選定。除 #1094、#4359、#4470、#4610、#5413 與 #5599 外，下列 PR 都不是 selected result。

### #1094：T16 rare-pattern exchanges

$\kappa=0.001672660197076918$，狀態為 merged，曾是 selected，現已由 #4359 取代。

PR #1094 的主要手段是在十六個 bin 之間重複做 whole-helper repacking，並以 rare full-bin pattern 作為起點。Helper 的位置被重排，idle rank 的分布因此改善，而 scalar word、role width 與 source-event 時間都不變。有限驗證中有 193 個 role placement 改變，完整的 finite verification 與 outer inequalities 全部通過。PR 明確不主張 unconditional theorem、global optimum 或 Lean claim。

性質上是 packing 與 owner allocation 的改進，不是新的遞迴建構。

### #2848：T248 residue exchange

$\kappa\approx0.00171865850830493$，狀態為 merged conditional candidate，selected result 不變。

前一個 T124 allocation（[#2843](https://github.com/CrocSwap/integer-mult-bounds/pull/2843)）留下一個 rank-9 的 cold-start residue。#2848 把兩份 copy 交錯，並把一個 width-7 的 helper 移到另一份 copy 初始的 rank-16 bin 中，兩份 T124 合成 T248。完整 paid cost 的變化為 $H_2+H_{16}-2H_9<0$。

這是 allocation 的實質改進，不是小數位的精修。改進發生在同一個建構的不同 replica 之間，而不是單一 supplier 內部。

### #4088 與 #4100：從 conditional 到 proposed unconditional

$\kappa=0.00173097911567079247276057$，兩者皆為 merged。

- [#4088](https://github.com/CrocSwap/integer-mult-bounds/pull/4088) 以 mixed fourth staged entry 把 conditional $\kappa$ 提高 $8.696\times10^{-9}$。
- [#4100](https://github.com/CrocSwap/integer-mult-bounds/pull/4100) 使用同一個有限 profile，數值上只比 #4088 高約 $5.7\times10^{-25}$，重點是提交一份 unconditional 建構的完整書面證明，嘗試處理先前繼承的 transfer premises。

PR #4100 提出的做法包括 balanced CRT tree、batched reversible switches、fixed-tape accounting、precision 處理、exact recovery、Gaussian assembly 與 sparse repair。PR 自述為 author-submitted proof，並有大量 AI 協助；independent acceptance 與 formal verification 皆未主張，selected frontier 也沒有變動。

### #4181：packing ceiling

$\kappa\approx0.001730980255989037$，狀態為 merged。它與 #4359 同批進入 `main`，在整合中作為 conditional comparison checkpoint：owner / fill、root enclosure 與六個應被拒絕的 control 都已檢查，繼承的 native 與 outer 假設仍保留。

PR #4181 保留 #4088 的四個 word，只改兩處：哪些 call 使用 fourth-entry word（前 1080 個 tick），以及這些 call 的 owner 如何依時間順序填入。結果比 #4088 高 $1.14\times10^{-9}$，並達到 [#4091](https://github.com/CrocSwap/integer-mult-bounds/pull/4091) 對這組固定 word 證明的 pooled ceiling。

因此在這四個 word 上，單靠重新 packing 已無法再提高 $\kappa$。PR 的結論是進一步需要 changed word 或 changed inventory。

### #4359：productive jobs

$\kappa=0.0023$，狀態為 merged，曾是 selected（maintainer-reviewed conditional），現已由 #4470 取代。比 #4181 高 $5.690\times10^{-4}$（+32.87%），比 #1094 高 37.51%。這些百分比比較的是 exponent saving，不是實測的執行時間。

在 uniform supplier 的介面中，每個 local unit 都要把 helper 還原。然而 helper 結束時常常握有一份已完成、對自身任意輸入的已知 transform，還原等於為同一份工作付兩次。#4359 把這些 completed transform 當作 productive job，按其本身的 rank 計價，於是一個 local unit 可以產出多種 rank 的 job。Complex 的 p3 controller 的 productive job 有 rank 6、7、8、9、25、57。Mixed saving $C$ 由下式決定：

$$
\sum_r p_r\, r^{1-C}=\sum_k W_k\, k^{1-C},
$$

其中 $p_r$ 是 rank 為 $r$ 的 paid recursive call 數，$W_k$ 是 rank 為 $k$ 的 productive output 數。

接著用 finite integer compiler 把這個 mixed 結構編譯回 uniform supplier，讓 #109 繼承的 outer theorem 可以使用：

- Complex 的 mixed root 約為 $C\approx0.00230509$。
- 編譯後在 explicit rank 處的 uniform saving 為 $0.002304$，是綁住的一側。BIT 一側為 $0.0027$。
- Outer bill 的每一項 saving 都嚴格高於 $0.0023$，最小餘裕為 $1.97698\times10^{-6}$，因此宣稱 $\kappa=0.0023$。

PR 給出的兩個 winning template 的 rank 分別為 $2^{276540184361}$（complex）與 $2^{6552928412}$（BIT），完整的 word 與常數尚未生成，所以這是 asymptotic existence result，不是實用演算法。Compiler、native adapters、common-weight BIT interface 與 support-local outer transfer 等新論證，經過 maintainer 的 AI 協助 proof review 與有限檢查，尚未形式化，也未經獨立的人類 review。

PR 列出的後續問題包括：把整條論證當作一個整體做外部 review、縮小 template 的 rank，以及改善 complex 一側的 tariff。Complex 已是綁住的一側，單獨增加 BIT 的 saving 無法再推進。後兩項在 #4359 之後都有 PR 接手。

### #4405 至 #4416：#4359 之後 merge 的 candidate

這幾個 PR 已進入 `main`，但自述為 conditional research result awaiting review，它們本身都不是 selected。

- [#4405](https://github.com/CrocSwap/integer-mult-bounds/pull/4405)（$\kappa=0.00230509$）：#4359 宣稱的 $\kappa$ 與 complex mixed root 之間還有餘裕。#4405 證明一族有理參數，可取任何低於該 root 的固定有理 $\kappa$，並以實際的 complement 係數取代粗略估計，縮小 template rank。
- [#4411](https://github.com/CrocSwap/integer-mult-bounds/pull/4411) 與 [#4413](https://github.com/CrocSwap/integer-mult-bounds/pull/4413)（$\kappa$ 維持 $0.0023$）：兩者各自縮小 #4359 的 template rank。#4411 為 $2^{465000}$（complex）與 $2^{7100}$（BIT）；#4413 重新平衡原本的 ledger，rank 為 $2^{268300549}$ 與 $2^{14664}$，54 個 predicate 全部嚴格成立。
- [#4412](https://github.com/CrocSwap/integer-mult-bounds/pull/4412)（$\kappa=0.00247755$）：#4359 為了讓 raw mixed unit 通過 strict compiler，限制了 helper packing 與 paid rank。#4412 用 native composition theorem 與另行驗證的 tail bound 去掉這項限制：把 native array program 依時間順序 lockstep 組合，2,856 個 helper occurrence 都給獨立的任意輸入，896 個 main idle window 也當作完整 transform 計價。
- [#4414](https://github.com/CrocSwap/integer-mult-bounds/pull/4414)（$\kappa=0.00267987$）：把 #4359 的 p6 controller 綁到完整的 native physical word，在 105 個 axis 上檢查。完整的 6,648-input invoice 中，target rank mass 為 108,769，paid mass 為 108,257。
- [#4416](https://github.com/CrocSwap/integer-mult-bounds/pull/4416)（$\kappa=0.00268647$）：p7 controller 的 native moment 比 p6 強，但 productive rank 太小，舊的 tail bound 不接受它。#4416 在 tensor composition 之後，對過小的 productive transform 另付費補足（paid completion），讓 paid 與 target 嚴格分離。Invoice 有 7,688 個 productive field，target rank mass 為 131,723，paid mass 為 131,115。

[#4420](https://github.com/CrocSwap/integer-mult-bounds/pull/4420) 與 [#4428](https://github.com/CrocSwap/integer-mult-bounds/pull/4428) 獨立檢查 #4416 的 moment、paid-tail 與 paid-completion 不等式，結論為成立。

Maintainer 隨後在 2026 年 10 月 21 日完成 #4416 與 zxv 的 [#4433](https://github.com/CrocSwap/integer-mult-bounds/pull/4433)（p7 的 tensor power 與 uniform-rank exponent 縮小）的 [proof review](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-intake-evidence/pr4416/PROOF-REVIEW.md)。在保留的 #4359 native / physical 與 outer 假設下，結論是 $\kappa=0.00268647$ 成立，#4433 較小的 sufficient construction 支持同一個值；native controller、chronological product、paid completion、splitting、compiler 估計與 outer substitution 都沒有 blocking defect。這是 AI 協助的 review 與有限重放，不是形式化驗證。當時 selected record 仍是 $0.0023$，這份 review 後來成為 #4470 selection 重用的 foundation 之一。

### #4440 至 #4470：p16 / p17 controller

以下都已 merge。#4470 已於 10 月 22 日升為 selected，另有 maintainer 的 proof review（見該項），涵蓋它累積的 #4440、#4441 與 #4447 建構，但不單獨認可各前驅 PR 自己的 $\kappa$ 數值；其餘的 $\kappa$ 是作者自行檢查的 conditional 宣稱，不是 selected。

- [#4440](https://github.com/CrocSwap/integer-mult-bounds/pull/4440)（$\kappa=0.00296$，比 #4416 高 10.18%）：p7 controller 在只需要一份 copied rank-one query shear 的地方，付了完整的 stage 與 idle transform。#4440 把這些 call 換成 query shear，並扣掉因此失去的 productive helper。Complex word 有 17 組 pair、19 個 full native call 與 16 個 query shear；另有一條 16-pair 的 BIT word，ordinary saving 為 $0.0034$。
- [#4441](https://github.com/CrocSwap/integer-mult-bounds/pull/4441)（$\kappa=0.00300105$）：對 #4440 的 19 個 full native call 套用 helper retiming，paid call 由 72,902 降為 69,273。
- [#4447](https://github.com/CrocSwap/integer-mult-bounds/pull/4447)（$\kappa=0.00300123$）：補上一個先前未列入的 contact span（三維）。在 contact B/480 把 frame 732 換成它兩個 incoming frame 的 span，四個 incident paid rank 由 $[2,2,1,3]$ 變為 $[1,1,2,4]$，其改善來自 $1+4^{1-C}<2^{1-C}+3^{1-C}$ 的嚴格凹性。
- [#4453](https://github.com/CrocSwap/integer-mult-bounds/pull/4453)（zxv，$\kappa=0.00300120$）：同一條 p17 鏈，$\kappa$ 與 #4447 相近，重點是把 uniform-rank exponent 縮小 71.9 倍。
- [#4470](https://github.com/CrocSwap/integer-mult-bounds/pull/4470)（$\kappa=0.00302015$，比 #4447 高 0.6304%）：同時調整 helper 的 entrance、exit 與中間 scalar contact frame，並把 productive helper 的非線性 credit 一起放進優化。使用 18 個 full native call 與 15 個 query shear 的 p16 controller，invoice 有 10,928 個 productive field 與 64,620 個 paid job。
  - Maintainer 的 [proof review](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-intake-evidence/pr4470/PROOF-REVIEW.md) 在保留的 native / physical、compiler 與 outer 假設下通過，$\kappa=60403/20000000=0.00302015$，沒有發現 blocking defect。它以全新的有限重放檢查 retiming 新增的 transport、全部 helper boundary 與其餘的 final transport，並納入 Mihir Srivastava 的 [#4504](https://github.com/CrocSwap/integer-mult-bounds/pull/4504)（chronological frame 與 paid invoice）與 Ryanson Jonathan 的 #4478（算術）。
  - Review 不單獨認可前驅各自的 $\kappa$ 數值、選配的搜尋與 global optimality。

- [#4479](https://github.com/CrocSwap/integer-mult-bounds/pull/4479)（$\kappa$ 維持 $0.00302015$）：不改 controller 與 invoice，把 #4470 的 sufficient uniform rank 由 $2^{64215200000000}$ 縮小到 $2^{558100005581}$。
- [#4483](https://github.com/CrocSwap/integer-mult-bounds/pull/4483)（zxv）：移除 tensor padding，sufficient uniform-rank exponent 縮小 199.32 倍。
- [#4507](https://github.com/CrocSwap/integer-mult-bounds/pull/4507)（Mihir Srivastava）：縮小 direct-flow 的 batch width，同時保留 chronological call。

#4483 與 #4507 屬於 compiler 大小的改進，maintainer 留待另案 review。

[#4455](https://github.com/CrocSwap/integer-mult-bounds/pull/4455) 與 [#4478](https://github.com/CrocSwap/integer-mult-bounds/pull/4478) 分別獨立檢查 p17 這條 PR 鏈與 #4470 的算術，結論為成立。這些 $\kappa$ 都是 conditional construction 的宣稱，不是新的 root 數值。

### #4535 與 #4568：critical-root claim

兩者皆已 merge，沒有 maintainer review。它們不改 #4470 的 native word 與 paid invoice，只換掉 compiler 的 leaf-count 估計，並重設 outer 參數點。

Dillon 的 [#4532](https://github.com/CrocSwap/integer-mult-bounds/pull/4532)（merged，no new $\kappa$）證明一個 adaptive gate 的充分條件：moment 有交叉點，且 mirror 在每一點都有嚴格餘裕，就能在恰好的 crossing exponent 處得到 leaf-count 界

$$L(n)\le A\,n^{\theta}(c+\log n)^p,\qquad n\ge1.$$

它對 p7 與 p16 的 crossing 分別給出完整的 critical-root majorant，$p=1/10$ 與 $p=2/5$。

- [#4535](https://github.com/CrocSwap/integer-mult-bounds/pull/4535)（hexapode，$\kappa=0.003020165$，比 #4470 高 $1.5\times10^{-8}$）：把 #4532 的 critical-root compiler 接在 #4470 不變的 native supplier 上。Productive width 10,928 與 paid invoice 64,620 個 job 都不變，54 個 strict predicate 與四個 functional guard 全部通過。需要的 frozen rank 為 $N=2^{10^{12}}$。
- [#4568](https://github.com/CrocSwap/integer-mult-bounds/pull/4568)（hexapode，$\kappa=0.00302016597$，比 #4535 高 $9.7\times10^{-10}$）：採用 Ryanson Jonathan 的 [#4564](https://github.com/CrocSwap/integer-mult-bounds/pull/4564) 較小的 outer slack $d=10^{-12}$，並以新的固定 word 在 $N=2^{10^{14}}$ 取得較大的 $\kappa$。

Ryanson Jonathan 的 [#4563](https://github.com/CrocSwap/integer-mult-bounds/pull/4563)、#4564 與 [#4565](https://github.com/CrocSwap/integer-mult-bounds/pull/4565) 在同一個 $\kappa$ 下縮小 #4535 的 frozen rank。#4565 搭配 #4564 的 outer slack，把 exponent 由 $10^{12}$ 降到約 $1.18\times10^{10}$（約 85 倍）；只用 #4535 原本的 slack 時約為 $3.16\times10^{10}$（約 32 倍）。[#4536](https://github.com/CrocSwap/integer-mult-bounds/pull/4536)、[#4569](https://github.com/CrocSwap/integer-mult-bounds/pull/4569) 與 [#4570](https://github.com/CrocSwap/integer-mult-bounds/pull/4570) 分別獨立檢查 #4535 的算術、#4532 的 critical-root majorant 證明與 #4568 的算術，結論都是成立，也都不提出新的 $\kappa$。

兩個 PR 都明說：巨大的 word 只由演算法定義、沒有實體化，繼承的 native、physical、analytic 與 recovery 假設仍是前提，不主張實用加速，也不主張變更 selected record。

### #4610：joint helper construction

[#4610](https://github.com/CrocSwap/integer-mult-bounds/pull/4610)（Cao Yifan，於 10 月 23 日升為 selected，$\kappa=15108879/5000000000=0.0030217758$，比 #4535 高 $1.6108\times10^{-6}$）：沿用 #4470 的 p16 controller，同時調整 helper 的 entrance、scalar contact 與 native map。Paid profile（rank:個數）由 `{1:2201,2:412,3:506,4:135,5:36,8:8}` 改為 `{1:2201,2:412,3:510,4:127,5:40,8:8}`，四組 rank-four 的 paid job 換成 rank-three 與 rank-five 的 pair，改善來自 $4(2\cdot4^t-3^t-5^t)>0$（$0<t<1$）的嚴格凹性。完整 controller 有 64,404 個 paid call 與 10,928 個 productive field。

最近一次更新保留 native word 與 profile，只把 compiler 的 finite contraction reserve 由 $10^{-9}$ 降到 $10^{-11}$，需要的 frozen rank 為 $N=2^{38569300000000000}$。PR 自述為 conditional construction 的 scoped Lean certificate，不是完整的 Lean 乘法定理，不主張實用加速、獨立的人類 review 或 hosted-CI 重放，也不主張變更 selected record。Merge 時它沒有 maintainer review；Chris R 的 [#5241](https://github.com/CrocSwap/integer-mult-bounds/pull/5241) 補上獨立的 audit 後，才在 10 月 23 日升為 selected。

同一條線上較低的 candidate（皆已 merge）有 hexapode 的 [#4626](https://github.com/CrocSwap/integer-mult-bounds/pull/4626)（$\kappa=0.003021569$，結合 #4610 的 warp geometry 與 helper621 的新 entrance chart），以及 Cinna Davis 的 [#4672](https://github.com/CrocSwap/integer-mult-bounds/pull/4672)（$\kappa=0.00302166$，作者明說不是 frontier advance）。

Word RAM 是另一條線，由 Dugongue 提出。[#4538](https://github.com/CrocSwap/integer-mult-bounds/pull/4538) 與 [#4541](https://github.com/CrocSwap/integer-mult-bounds/pull/4541)把 Turing machine 的乘法界轉移到 bounded-word RAM：若 Turing machine 的時間為 $O(n(\log n)^{1-\kappa})$，則 RAM operation 數為 $O(n/(\log n)^{\kappa})$。[#4630](https://github.com/CrocSwap/integer-mult-bounds/pull/4630)、[#4635](https://github.com/CrocSwap/integer-mult-bounds/pull/4635) 與 [#4713](https://github.com/CrocSwap/integer-mult-bounds/pull/4713) 改為直接以 native Word RAM 執行，不經 Turing machine 模擬，$\kappa$ 依序為 $0.0030201655$、$0.0030217754$ 與 $0.0030217758$，後兩者轉移 #4610 的 profile，#4713 另證明可以不用 unit-cost DIV。這些都已 merge，都不提高 Turing machine 的 $\kappa$。

### #4610 之後的上界與 coded reverse stage

#4610 merge 之後，一組 PR 轉向上界與尚未計價的建構，都明說 no new $\kappa$。以下 PR 都已 merge 進 `main`，都沒有 maintainer 的 proof review。

- Cinna Davis 的 [#4658](https://github.com/CrocSwap/integer-mult-bounds/pull/4658)：對 #4470、#4610 與 #4626 的 profile，native / thin 的 path-family controller（1 至 64 個 pair、所有 split 與 native stage 子集）在 $C\ge0.003022$ 時全部失敗。這是精確的 complete-invoice 拒絕證明，只涵蓋這個 word 與 interface，不是 controller 的全域上界。
- [#4696](https://github.com/CrocSwap/integer-mult-bounds/pull/4696)：證明在 #4610 保留的 graph 上，付費的 symmetric-phase 改動無法改善它的 moment。
- Dugongue 的 [#4929](https://github.com/CrocSwap/integer-mult-bounds/pull/4929) 建構 center-free 的 native producer，以 rank-8 port code $A=I-14P$ 去掉 owned center 上的八個 rank-8 child，paid profile 為 `{1:2201,2:412,3:510,4:127,5:40}`（相對 #4610 少了 `8:8`）；$A$ 的特徵值為 $1$（104 次）與 $-13$（8 次），逆為 $I+(A-I)/13$。[#4933](https://github.com/CrocSwap/integer-mult-bounds/pull/4933) 把它接成 phase-correct 的 coded p16 caller，去掉 144 個 center call；[#4932](https://github.com/CrocSwap/integer-mult-bounds/pull/4932) 證明單一 bank 的 adapter 在 scoped 範圍內有上界。
- SethBurkart123 的 [#4940](https://github.com/CrocSwap/integer-mult-bounds/pull/4940)：把 controller 以 $A$ 共軛，使所有 reverse stage 成為 center-free 的 backward word，forward stage 成為先經 $A^{-1}$ 混合 source 的 query shear，即 $\text{Coded}=A\cdot\text{Standard}\cdot A^{-1}$，只有 controller 邊界的 x-role 與 thin stage 的 source 需要重新編碼。Repo 的 outer ledger（54 個 strict predicate 與四個 functional guard）接受到 $\kappa=0.0033999971$ 為止，$0.0034$ 時只有 `actual_bit_above_effective` 失敗。若這些重新編碼可被接受，BIT supplier 會把 conditional $\kappa$ 限制在約 $0.0034$（比 $0.0030217758$ 高 12.5%）。
  - 未建立的部分：thin stage 的 $A^{-1}$ 混合與 x-role 輸入輸出轉換在實際 frame 上的 physical admission、$\times1/13$ 的計價，以及 ambient rank 153 的 compiler 常數（已發表的 tensor power 1024 在 $0.0034$ 附近違反 capacity inequality）與 integer-height 檢驗。PR 不主張任何 $\kappa$，沒有 hosted CI、Lean 或獨立 review。後來的 open PR [#5440](https://github.com/CrocSwap/integer-mult-bounds/pull/5440) 宣稱已把 p19 coded-reverse chain 實體化並計價，得到 $\kappa=0.0033999964$。

### #5241 至 #5413：owned helper relation 與 coupled caller

以下都已 merge。#5413 已於 10 月 24 日升為 selected；其餘的 $\kappa$ 是作者自行檢查的 conditional 宣稱，不是 selected。

- [#5241](https://github.com/CrocSwap/integer-mult-bounds/pull/5241)（Chris R，no new $\kappa$）：對 #4610 做獨立的 source-bound audit，是 #4610 升為 selected 的依據。
- [#5377](https://github.com/CrocSwap/integer-mult-bounds/pull/5377)（Ali Romman，$\kappa=0.00302235$，比 #4610 高 $5.742\times10^{-7}$）：在每個 backward call 讓 L230 變成 private，用四個任意的 cold helper 組出 $h_{230}=h_{324}-h_{326}-h_{328}+h_{333}$，並扣掉因此失去的 rank-nine productive 輸出。
- [#5383](https://github.com/CrocSwap/integer-mult-bounds/pull/5383)（Ali Romman，$\kappa=0.00302666$，比 #5377 高 $4.31\times10^{-6}$）：八個獨立的 helper relation 同時去掉八個 backward rank-eight center 與八個之後的 rank-one job，失去的八個 rank-nine helper target 全部計價。
- [#5387](https://github.com/CrocSwap/integer-mult-bounds/pull/5387)（Dugongue，$\kappa=0.003026674765$，比 #5383 高 $1.4765\times10^{-8}$）：把 completion reserve 縮小到 $10^{-12}$，paid profile 不變，只是 compiler 餘裕的小幅改善。
- [#5390](https://github.com/CrocSwap/integer-mult-bounds/pull/5390)（Dugongue，$\kappa=0.0030266747680744$，比 #5387 高 $3.0744\times10^{-12}$）：在 #5387 的 $\kappa$ 下，用 direct tail 選出較小的 matched compiler，tensor power 由 1024 降為 505，sufficient exponent 約縮小 2.1 倍。這不是實測的執行時間。
- [#5392](https://github.com/CrocSwap/integer-mult-bounds/pull/5392)（Ali Romman，$\kappa=0.00302725$，比 #5387 高 $5.75235\times10^{-7}$）：owned circuit transposition，兩個 forward call 改用縮減後的 backward supplier。
- [#5398](https://github.com/CrocSwap/integer-mult-bounds/pull/5398)（Ali Romman，$\kappa=0.00302728823$，比 #5392 高 $3.823\times10^{-8}$）：direct backward caller，不轉置 circuit，讓全部 18 個 full call 使用完成的 backward supplier。它與 #5392 的 paid profile 上限相同，多出的部分來自 compiler headroom。
- [#5402](https://github.com/CrocSwap/integer-mult-bounds/pull/5402)（Dillon Amburgey，no new $\kappa$）：eight-mode coupled helper provider，保留全部 632 個 native input；八個 coupled 輸出在補完之前不得到獨立的 Gaussian target credit。
- [#5413](https://github.com/CrocSwap/integer-mult-bounds/pull/5413)（Chris R，$\kappa=0.003027288235$，比 #5398 高 $5\times10^{-12}$）：補完 #5402 的 coupled-output caller，不假設八個 coupled mode 起始為空白。新增的 144 個 paid rank-eight job 與 144 個 rank-eight target 逐 rank 抵銷，所以增量是 compiler / outer headroom。
  - Selection 納入 [#5407](https://github.com/CrocSwap/integer-mult-bounds/pull/5407)（provider audit）與 [#5414](https://github.com/CrocSwap/integer-mult-bounds/pull/5414)（獨立檢查 neutrality 與 pricing）。

Chris R 的 [#5384](https://github.com/CrocSwap/integer-mult-bounds/pull/5384)、[#5395](https://github.com/CrocSwap/integer-mult-bounds/pull/5395)、[#5396](https://github.com/CrocSwap/integer-mult-bounds/pull/5396)、[#5399](https://github.com/CrocSwap/integer-mult-bounds/pull/5399) 與 [#5400](https://github.com/CrocSwap/integer-mult-bounds/pull/5400) 分別獨立驗證 #5377、#5383 與 #5387、#5392、#5398 的 $\kappa$ 與 pricing，結論為成立。GamingPuzzled 的 [#5462](https://github.com/CrocSwap/integer-mult-bounds/pull/5462) 與 [#5468](https://github.com/CrocSwap/integer-mult-bounds/pull/5468) 只取得 $10^{-12}$ 到 $10^{-11}$ 量級的 numerical headroom，不是新的 saving。

### #5544 至 #5599：P104 word 與 helper-subspace split

以下都已 merge。#5599 已於 10 月 26 日升為 selected。P104 word 來自 David Arias、Cinna Davis 與 Gareth Davidson 的 #2152、#2219 與 #2305，具有 527 個獨立的 helper output。

- [#5544](https://github.com/CrocSwap/integer-mult-bounds/pull/5544)（Ali Romman，$\kappa=0.00304057$，比 #5413 高 $1.3281765\times10^{-5}$）：把 P104 word 的實際 native Gaussian rank 綁到目前的 mixed-target recursion，給出 literal 的 p16 / a7 caller。改變的是遞迴成本 profile，不是多取舊 crossing 的位數。
- [#5545](https://github.com/CrocSwap/integer-mult-bounds/pull/5545)（Ali Romman，$\kappa=0.00304117$，比 #5544 高 $6.0\times10^{-7}$）：把 P104 register 341 與 345 上的一個減法從四維 frame 移到九維 frame，每個 full call 的 paid 由 $H_1+2H_5$ 換成 $H_5+H_6$，改善來自 $6^t<1+5^t$（$0<t<1$）。
- [#5551](https://github.com/CrocSwap/integer-mult-bounds/pull/5551)（thu-nmrc，$\kappa=0.00304153$）：改兩個 coupled frame itinerary，每個 supplier invocation 的 paid delta 為 $+2H_1-3H_2+H_3-H_4+H_5$，嚴格凹性證明對 $(0,1)$ 內每個 exponent 都有淨改善。
- [#5561](https://github.com/CrocSwap/integer-mult-bounds/pull/5561)（DreamingOfClouds，$\kappa=0.0030814243$）：重新安排 #5551 的 word 的 helper endpoint 與 stop frame，paid call 由 69,912 降為 66,852。
- [#5569](https://github.com/CrocSwap/integer-mult-bounds/pull/5569)（Joel Pulikkan，$\kappa=0.00308181$，raw crossing 比 #5561 高 $3.94\times10^{-7}$）：priced successor hand-off of helper 706。
- [#5580](https://github.com/CrocSwap/integer-mult-bounds/pull/5580)（Ali Romman，$\kappa=0.00308189$，raw crossing 比 #5569 高 $7.6453\times10^{-8}$）：把一個 ADD 由三維 chart 移到四維 chart，18 個 forward call 各把兩個 rank-three paid transport 換成一個 rank-two 與一個 rank-four。
- [#5565](https://github.com/CrocSwap/integer-mult-bounds/pull/5565)（hexapode，$\kappa=0.00308534$，比 #5580 高 $3.45\times10^{-6}$）：three-stage commuting-contact cascade，complete paid call 由 66,852 降為 66,744。
- [#5599](https://github.com/CrocSwap/integer-mult-bounds/pull/5599)（Ali Romman，$\kappa=0.00310045$，比 #5565 高 $1.511\times10^{-5}$）：13 個 helper-subspace split，已升為 selected。

同一時間 merge、但低於 #5599 的 candidate 有 Ali Romman 的 [#5601](https://github.com/CrocSwap/integer-mult-bounds/pull/5601)（$\kappa=0.00308595$）與 [#5602](https://github.com/CrocSwap/integer-mult-bounds/pull/5602)（$\kappa=0.00309980$，coupled helper bases），以及 flyingviper 的 [#5605](https://github.com/CrocSwap/integer-mult-bounds/pull/5605)（$\kappa=0.00308326$，compensated shared P104 relay）。

### 尚未 merge 的 open claim

以下都沒有 maintainer review。

- P19 線：DaysSky 的 [#5270](https://github.com/CrocSwap/integer-mult-bounds/pull/5270) 與 [#5440](https://github.com/CrocSwap/integer-mult-bounds/pull/5440)，$\kappa=0.0033999964$。
- P104 線 A（各 PR 接在前一個上）：
  - Ali Romman 的 [#5627](https://github.com/CrocSwap/integer-mult-bounds/pull/5627)（$\kappa=0.00310440546$，比 #5599 高 $3.95546\times10^{-6}$）：composed helper splits。
  - zxv 的 [#5643](https://github.com/CrocSwap/integer-mult-bounds/pull/5643)（$0.00310458$，比 #5627 高 $1.7454\times10^{-7}$，paid A2 rank exchange）與 Ali Romman 的 [#5644](https://github.com/CrocSwap/integer-mult-bounds/pull/5644)（$0.00310626335$，比 #5627 高 $1.85789\times10^{-6}$，三個 helper cleanup）。
  - zxv 的 [#5650](https://github.com/CrocSwap/integer-mult-bounds/pull/5650)（$0.00310644468$，比 #5644 高 $1.8133\times10^{-7}$）結合 #5644 的 helper cleanup 與 #5643 的 A2 exchange。
  - Ali Romman 的 [#5660](https://github.com/CrocSwap/integer-mult-bounds/pull/5660)（$0.00310676333$）接在 #5650 的 composition 上，[#5678](https://github.com/CrocSwap/integer-mult-bounds/pull/5678)（$0.00310815849$，比 #5660 高 $1.39516\times10^{-6}$，四個 temporary public-register basis 移除內部 contact）再接在 #5660 上。
- P104 線 B：flyingviper 的 [#5608](https://github.com/CrocSwap/integer-mult-bounds/pull/5608)（$0.00310184$，比 #5599 高 $1.39\times10^{-6}$，結合 #5605 的 relay、#5565 的 commuting contact 與 #5599 的 helper split）、[#5612](https://github.com/CrocSwap/integer-mult-bounds/pull/5612)（$0.00310299$）與 [#5613](https://github.com/CrocSwap/integer-mult-bounds/pull/5613)（$0.00310440$），依序各接在前一個上。
- Scratch-net 的 [#5606](https://github.com/CrocSwap/integer-mult-bounds/pull/5606)（$\kappa=0.00309871$，prepared P104 split helper）：它比較的是 #5599 較早的版本（$0.00309839$），低於現在 selected 的 $0.00310045$。

上面兩條線在各自前一個 PR 之上的增量，落在 $10^{-7}$ 到 $10^{-6}$ 量級。

### 追蹤的 PR

<table class="table-center">
  <thead>
    <tr>
      <th>PR</th>
      <th>$\kappa$</th>
      <th>Description</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>#1094</td>
      <td>0.001672660197</td>
      <td>T16 rare-pattern packing</td>
      <td>Merged, past selected</td>
    </tr>
    <tr>
      <td>#2848</td>
      <td>0.001718658508</td>
      <td>T248 cross-replica residue exchange</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#4088</td>
      <td>0.001730979116</td>
      <td>mixed fourth staged entry</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#4100</td>
      <td>0.001730979116</td>
      <td>proposed unconditional batched-CRT construction</td>
      <td>Merged, not independently accepted</td>
    </tr>
    <tr>
      <td>#4181</td>
      <td>0.001730980256</td>
      <td>reaches the fixed-word pooled packing ceiling</td>
      <td>Merged, comparison checkpoint</td>
    </tr>
    <tr>
      <td>#4359</td>
      <td>0.0023</td>
      <td>productive jobs and mixed-to-uniform compiler</td>
      <td>Merged, past selected</td>
    </tr>
    <tr>
      <td>#4405</td>
      <td>0.00230509</td>
      <td>closes the mixed-root slack, smaller template rank</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#4412</td>
      <td>0.00247755</td>
      <td>native tensor strictification</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#4414</td>
      <td>0.00267987</td>
      <td>complete p6 native controller</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#4416</td>
      <td>0.00268647</td>
      <td>p7 controller with paid target padding</td>
      <td>Merged, reviewed checkpoint</td>
    </tr>
    <tr>
      <td>#4440</td>
      <td>0.00296</td>
      <td>query-thinned productive controllers</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#4441</td>
      <td>0.00300105</td>
      <td>query thinning plus helper retiming</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#4447</td>
      <td>0.00300123</td>
      <td>adds a missing contact span</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#4470</td>
      <td>0.00302015</td>
      <td>joint helper boundaries and p16 controller</td>
      <td>Past selected (Oct 22), maintainer-reviewed</td>
    </tr>
    <tr>
      <td>#4535</td>
      <td>0.003020165</td>
      <td>critical-root compiler on #4470's supplier</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#4568</td>
      <td>0.00302016597</td>
      <td>smaller outer slack, rank reset to $2^{10^{14}}$</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#4610</td>
      <td>0.0030217758</td>
      <td>joint helper interfaces and native maps, tighter compiler reserve</td>
      <td>Past selected (Oct 23), maintainer-reviewed</td>
    </tr>
    <tr>
      <td>#4626</td>
      <td>0.003021569</td>
      <td>#4610's warp geometry with helper621's entrance chart</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#4672</td>
      <td>0.00302166</td>
      <td>coordinated contact and helper frames on the round-two supplier</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#5377</td>
      <td>0.00302235</td>
      <td>one owned helper relation</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#5383</td>
      <td>0.00302666</td>
      <td>eight joint helper relations</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#5392</td>
      <td>0.00302725</td>
      <td>owned circuit transposition</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#5398</td>
      <td>0.00302728823</td>
      <td>direct backward caller</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#5413</td>
      <td>0.003027288235</td>
      <td>complete coupled-output caller</td>
      <td>Past selected (Oct 24), maintainer-reviewed</td>
    </tr>
    <tr>
      <td>#5440</td>
      <td>0.0033999964</td>
      <td>p19 coded-reverse chain</td>
      <td>Open, highest open claim</td>
    </tr>
    <tr>
      <td>#5544</td>
      <td>0.00304057</td>
      <td>literal p16/a7 caller on the P104 word</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#5545</td>
      <td>0.00304117</td>
      <td>one subtraction moved to the full frame</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#5551</td>
      <td>0.00304153</td>
      <td>coupled P104 contacts</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#5561</td>
      <td>0.0030814243</td>
      <td>retimed helper endpoints of #5551</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#5565</td>
      <td>0.00308534</td>
      <td>three-stage commuting-contact cascade</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#5569</td>
      <td>0.00308181</td>
      <td>priced hand-off of helper 706</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#5580</td>
      <td>0.00308189</td>
      <td>event-contact step</td>
      <td>Merged, candidate</td>
    </tr>
    <tr>
      <td>#5599</td>
      <td>0.00310045</td>
      <td>thirteen helper-subspace splits</td>
      <td>Current selected (Oct 26), maintainer-reviewed</td>
    </tr>
    <tr>
      <td>#5678</td>
      <td>0.00310815849</td>
      <td>paid interior bases</td>
      <td>Open</td>
    </tr>
  </tbody>
</table>

<div class="remark">
<strong>Remark.</strong>
<ul>
<li><strong>Merged</strong>：PR 已進入 <code>main</code>。不表示升為 selected，也不表示數學上已被獨立驗證。</li>
<li><strong>Open</strong>：尚未進入 <code>main</code>。</li>
<li><strong>Past / Current selected</strong>：曾經或目前是專案的 selected result，一定經過 maintainer review。</li>
<li><strong>Candidate</strong>：merge 後但未升為 selected 的 conditional 宣稱，merge 時 $\kappa$ 高於當時的 selected。</li>
<li><strong>Reviewed checkpoint</strong>：已有 maintainer review、但未升為 selected 的 candidate。</li>
<li><strong>Maintainer review</strong>：專案維護者的 AI 協助 proof review，限於保留的假設，不是形式化驗證或獨立的人類 review。</li>
</ul>
</div>

## 技術

### 建構

建構遞迴地把寬度 $m$ 的工作換成 rank 為 $r$ 的 child calls，並以 child histogram 記錄各 rank 的 call 數。完整的 bill 包含 contract 要求的額外成本，必須嚴格小於 1。只減少 scalar additions 而不改變 histogram，不會改善 $\kappa$，最多改善執行或 precision。

### 優化方式的演進

改進可以大致分成幾個層次：

- **Helper 縮減**：減少 recursive helper call 的數量或成本。
- **Storage 與 owner 重用**：重用已不再活躍的 helper 佔用的儲存空間，例如 recycled bit registers（#146–#148、#150）。
- **Packing 與 scheduling**：helper inventory 不變，改變它在 owner、bin 與時間窗口之間的安排。#1094 屬於這類。
- **跨 replica 組合**：讓一份 copy 的閒置容量吸收另一份 copy 的 residue。#2848 屬於這類。
- **固定建構的 ceiling**：#4181 顯示目前這組 staged word 的 packing 已到 pooled optimum，之後需要改變 word 或 inventory。
- **Productive recursive work**：#4359 改變帳的記法，讓已完成的 helper transform 成為有用的輸出，而不是被還原。
- **Native 組合與 paid completion**：#4412、#4414、#4416 把 helper 的 native program 依時間順序組合，並對過小的 productive transform 付費補足，讓 compiler 的 strict 條件成立，也使更強的 controller（p6、p7）可以使用。
- **Query shear 與 retiming**：#4440 起，用 copied rank-one query shear 取代 full transform，再以 helper retiming、contact span 與 joint helper boundary 逐步減少 paid job。
- **Critical-root compiler**：#4535 起，native supplier 與 paid invoice 沿用 #4470，改在恰好的 crossing exponent 取得 leaf-count 界，並收緊 outer 參數。
- **Native map 與 compiler reserve**：#4610 回頭調整 helper 的 entrance、scalar contact 與 native map，並縮小 compiler 的 finite reserve。
- **Owned helper relation 與 backward caller**：#5377 起，用 owned relation 去掉 backward call 的 rank-eight center，再以 circuit transposition 或 direct backward caller 讓全部 full call 使用縮減後的 supplier（#5383、#5392、#5398、#5413）。
- **P104 word 與 helper-subspace split**：#5544 起改用 P104 word 的 literal caller，再以 contact 重排、helper retiming 與 helper-subspace split 減少 paid call 或增加獨立輸入（#5544 至 #5599）。

### 瓶頸

以下是 #1094 時期的評估。最終的 $\kappa$ 與遞迴 saving $a$ 之間採用限制性換算 $\kappa=a/(1+a)$，評估日期為 2026 年 10 月 16 日（revision 6）：

- complex primitive 支撐約 $a=0.00167546$
- bit primitive 支撐約 $a=0.00173343$

兩者中 complex 一側較小，是綁住 $\kappa$ 的一側。要讓 $\kappa>0.01$，兩個 effective primitive budget 都需要超過約 $1/99$。這描述的是目前建構的瓶頸，不是整數乘法的下界。

PR #4359 之後 complex 仍是綁住的一側：#4359 中 complex 的 uniform saving 為 $0.002304$，BIT 為 $0.0027$。#4440 起的建構保留一條支撐 $0.0034$ 的 BIT word，$\kappa$ 的提高來自 complex controller 的改進。#4535 與 #4568 沒有再動 controller，提高的幅度只有 $1.5\times10^{-8}$ 與 $9.7\times10^{-10}$，來自 compiler 與 outer 參數的收緊。#4610 則改動 helper 與 native map，$\kappa$ 再提高到 $0.0030217758$。#4940 的計算指出，若 coded 重新編碼可被接受，BIT supplier 會把 conditional $\kappa$ 限制在約 $0.0034$；目前 selected 的 $0.00310045$ 仍低於這個值，open 的 #5440 宣稱 $0.0033999964$。

### 可能的改進方向

- decoder 或 helper inventory：節省更多 rank，或減少遞迴 call 的數量與大小。
- call 之間的邊界：去掉下一個 call 重複做的 restoration 或 conversion。
- supplier interface lemma：放寬目前 contract 排除的 word。
- complex controller：減少 paid job 或提高 productive credit，這是 #4359 之後多數 PR 的方向。
- template rank：#4359 與 #4470 的 winning template 都是 algorithm-defined 而未實體化，縮小 rank 是 #4359 之後 PR 的另一個目標，例如 #4411、#4413（#4359）、#4479、#4483（#4470）與 #4563 至 #4565（#4535）。

### 前提與限制

<div class="remark">
<strong>Remark.</strong>
$\kappa$ 衡量的是漸近 exponent saving，不是實測的執行時間。
</div>

所有結果都以 #109 的框架與一般歸約為前提，專案不是 OpenAI 的官方釋出或背書。Selected result 的 scope 保留以下 conditional 假設（#4470 起的五個框架假設，#4610、#5413 與 #5599 沿用）：

- native / all-column movement：native operator、phase 慣例、spectator 與 whole-job adapter 在每個正的 column multiplicity 下都成立
- owned erasure：owned stream 與 suspended center 遵守保留的 allocation、erasure 與 ownership 規則
- compiler closure：finite mixed-target compiler 與 chronological product、completion、splitting 滿足保留的 uniform closure
- outer transfer：保留的 outer cost 估計與 outer substitution 適用於新的 finite template
- precision 與 fixed-tape：保留的 fixed-tape movement 與 precision / storage 規定適用於新的 finite template
- analytic decomposition、fine-prime avoidance 與 exact recovery

Selected result 的驗證是 maintainer 的 AI 協助 proof review，加上 scoped、serial 的變動建構重放（#4470 為八段，#5599 在 Linux 上以 1 GiB 取樣記憶體上限通過），並明確重用前一個 selected 的 foundation，並非完整的 Lean multiplication theorem，也不是獨立的人類 review。Winning uniform template 由演算法定義，沒有實體化，專案不主張實用上的加速。其餘 candidate 則各自附帶作者提交的證據與獨立檢查。

## References

### Repository

- [CrocSwap/integer-mult-bounds](https://github.com/CrocSwap/integer-mult-bounds)
- [selected-result.json](https://github.com/CrocSwap/integer-mult-bounds/blob/main/certificates/selected-result.json)
- [PR #4359 proof review](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-intake-evidence/pr4359/PROOF-REVIEW.md)
- [PR #4416 / #4433 proof review](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-intake-evidence/pr4416/PROOF-REVIEW.md)
- [PR #4470 proof review](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-intake-evidence/pr4470/PROOF-REVIEW.md)
- [PR #4470 selection / integration receipt](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-intake-evidence/pr4470/INTEGRATION.json)
- [PR #4610 proof review](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-intake-evidence/pr4610/PROOF-REVIEW.md)
- [PR #5413 promotion](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-intake-evidence/pr5413-promotion/PROMOTION.md)
- [PR #5599 proof review](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-intake-evidence/pr5599-completion/PROOF-REVIEW.md)
- [PR #5599 selection / integration receipt](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-intake-evidence/pr5599-completion/INTEGRATION.json)
- [current-status.md](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/current-status.md)
- [bottleneck-brief.md](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/bottleneck-brief.md)
- [pr-ledger.md](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-ledger.md)
- [autoresearch.md](https://github.com/CrocSwap/integer-mult-bounds/blob/main/autoresearch.md)
- [Discussions](https://github.com/CrocSwap/integer-mult-bounds/discussions)

### Pull requests

- [#1094 Conditional kappa 0.001672660197076918: rare-pattern T16 exchanges](https://github.com/CrocSwap/integer-mult-bounds/pull/1094)
- [#2848 T248 residue exchange: conditional κ ≈ 0.00171865850830493](https://github.com/CrocSwap/integer-mult-bounds/pull/2848)
- [#4088 Improve conditional κ with a mixed fourth staged entry](https://github.com/CrocSwap/integer-mult-bounds/pull/4088)
- [#4091 Prove the sharp pooled optimum for fourth staging](https://github.com/CrocSwap/integer-mult-bounds/pull/4091)
- [#4100 Propose unconditional κ = 0.00173097911567079247276057 via batched CRT](https://github.com/CrocSwap/integer-mult-bounds/pull/4100)
- [#4181 Conditional κ = 0.001730980255989036959962: one-third fourth-entry fill attaining #4091's pooled ceiling](https://github.com/CrocSwap/integer-mult-bounds/pull/4181)
- [#4359 Conditional κ = 0.0023 (+5.690e-4, +32.87% over #4181): productive helper jobs compiled into a uniform supplier](https://github.com/CrocSwap/integer-mult-bounds/pull/4359)
- [#4404 Independently check #4359's explicit-rank chain: H0/H1, superpotentials, the exit recurrence and 19,895 exact lockstep flows hold (no new κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4404)
- [#4405 Refine PR4359: conditional κ = 0.00230509 and smaller explicit template ranks](https://github.com/CrocSwap/integer-mult-bounds/pull/4405)
- [#4411 Reduce conditional κ = 0.0023 template ranks to 2^465000 and 2^7100](https://github.com/CrocSwap/integer-mult-bounds/pull/4411)
- [#4412 Conditional κ = 0.00247755 via native tensor strictification](https://github.com/CrocSwap/integer-mult-bounds/pull/4412)
- [#4413 Rebalance #4359's own ledger at unchanged kappa 0.0023: explicit ranks shrink to 2^268300549 (complex) and 2^14664 (BIT) with all 54 predicates strict (no new κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4413)
- [#4414 Conditional κ = 0.00267987 with a complete p6 native controller](https://github.com/CrocSwap/integer-mult-bounds/pull/4414)
- [#4416 Conditional κ = 0.00268647 via paid target padding after native composition](https://github.com/CrocSwap/integer-mult-bounds/pull/4416)
- [#4433 Reduce p7 tensor power and uniform-rank exponent (41.6× and 46.38M×)](https://github.com/CrocSwap/integer-mult-bounds/pull/4433)
- [#4440 Conditional κ = 0.00296 via query-thinned productive controllers (+10.18%)](https://github.com/CrocSwap/integer-mult-bounds/pull/4440)
- [#4441 Conditional κ = 0.00300105 (+4.105e-5 over #4440): combine query thinning and helper retiming](https://github.com/CrocSwap/integer-mult-bounds/pull/4441)
- [#4447 Conditional kappa = 0.00300123 via a missing three-dimensional contact span](https://github.com/CrocSwap/integer-mult-bounds/pull/4447)
- [#4453 Conditional κ = 0.00300120 (71.9× smaller uniform-rank exponent)](https://github.com/CrocSwap/integer-mult-bounds/pull/4453)
- [#4470 Conditional kappa = 0.00302015 (+0.6304% over #4447): joint helper boundaries](https://github.com/CrocSwap/integer-mult-bounds/pull/4470)
- [#4479 Reduce #4470 local compiler rank 115× at unchanged conditional κ](https://github.com/CrocSwap/integer-mult-bounds/pull/4479)
- [#4483 Remove tensor padding (199.32× smaller uniform-rank exponent)](https://github.com/CrocSwap/integer-mult-bounds/pull/4483)
- [#4507 Reduce direct-flow batch widths while preserving chronological calls](https://github.com/CrocSwap/integer-mult-bounds/pull/4507)
- [#4532 Prove adaptive gate criterion and critical-root leaf bounds (no κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4532)
- [#4535 Improve conditional multiplication kappa to 0.003020165 via critical-root transfer](https://github.com/CrocSwap/integer-mult-bounds/pull/4535)
- [#4538 Word RAM transfer: finite TM compiler, checked logarithmic-width bridge and native kernels](https://github.com/CrocSwap/integer-mult-bounds/pull/4538)
- [#4541 Packed Word RAM transfer: conditional O(n / log^κ n) multiplication (no new TM κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4541)
- [#4568 Conditional κ = 0.00302016597 (+9.7e-10 over #4535)](https://github.com/CrocSwap/integer-mult-bounds/pull/4568)
- [#4610 Conditional κ = 0.0030217758: joint helper interfaces and Lean compiler tightening](https://github.com/CrocSwap/integer-mult-bounds/pull/4610)
- [#4626 Improve conditional kappa to 0.003021569 with helper621 and a funded compiler gap](https://github.com/CrocSwap/integer-mult-bounds/pull/4626)
- [#4630 Conditional native Word RAM κ = 0.0030201655: fused execution without TM simulation](https://github.com/CrocSwap/integer-mult-bounds/pull/4630)
- [#4635 Conditional Word RAM κ = 0.0030217754 (+0.0000016099 over #4630)](https://github.com/CrocSwap/integer-mult-bounds/pull/4635)
- [#4658 Certify the native/thin path-family ceiling C < 0.003022 and price H repair headroom](https://github.com/CrocSwap/integer-mult-bounds/pull/4658)
- [#4672 Coordinate contact/helper frames on the round-two supplier (conditional kappa 0.00302166; not frontier)](https://github.com/CrocSwap/integer-mult-bounds/pull/4672)
- [#4696 Prove paid symmetric-phase changes cannot improve PR4610’s moment (no new κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4696)
- [#4713 Conditional DIV-free Word RAM κ = 0.0030217758 (+4e-10 over #4635)](https://github.com/CrocSwap/integer-mult-bounds/pull/4713)
- [#4929 Construct a center-free native producer with an explicit rank-8 port code (no new κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4929)
- [#4932 Prove a scoped one-bank ceiling for the #4929 coded-port adapter (no new κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4932)
- [#4933 Emit a phase-correct coded p16 caller removing 144 center calls (no κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4933)
- [#4940 Consume the #4929 center-free word with coded reverse stages and A⁻¹-mixed query shears (no κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4940)
- [#5270 Certify conditional kappa 0.0033999964 via the p19 word without the coded overlay (complex 0.007578535, BIT 0.0034, zero field bill)](https://github.com/CrocSwap/integer-mult-bounds/pull/5270)
- [#5377 Conditional κ = 0.00302235 (+5.742e-7 over #4610): one owned helper relation](https://github.com/CrocSwap/integer-mult-bounds/pull/5377)
- [#5383 Conditional κ = 0.00302666 (+4.31e-6 over #5377): eight joint helper relations](https://github.com/CrocSwap/integer-mult-bounds/pull/5383)
- [#5387 Raise conditional κ to 0.003026674765 with a smaller completion reserve](https://github.com/CrocSwap/integer-mult-bounds/pull/5387)
- [#5390 Certify κ = 0.0030266747680744 and a smaller matched compiler using direct tails](https://github.com/CrocSwap/integer-mult-bounds/pull/5390)
- [#5392 Conditional κ = 0.00302725 (+5.75235e-7 over #5387): owned circuit transposition](https://github.com/CrocSwap/integer-mult-bounds/pull/5392)
- [#5398 Conditional κ = 0.00302728823 (+3.823e-8 over #5392): direct backward caller](https://github.com/CrocSwap/integer-mult-bounds/pull/5398)
- [#5402 Preserve all 632 native inputs in an eight-mode coupled helper provider](https://github.com/CrocSwap/integer-mult-bounds/pull/5402)
- [#5413 Complete coupled-output caller: conditional κ = 0.003027288235 (+5e-12 over #5400)](https://github.com/CrocSwap/integer-mult-bounds/pull/5413)
- [#5440 Price the p19 coded-reverse chain: conditional κ = 0.0033999964](https://github.com/CrocSwap/integer-mult-bounds/pull/5440)
- [#5462 Conditional κ = 0.0030272882389 (+3.9e-12 over #5413, numerical headroom only); exact owned-relation optimum closes the relation lever](https://github.com/CrocSwap/integer-mult-bounds/pull/5462)
- [#5468 Conditional κ = 0.0030272882489783: gap-parametric precision for the #5413 caller (numerical headroom only, +1.0e-11 over #5462)](https://github.com/CrocSwap/integer-mult-bounds/pull/5468)
- [#5544 Conditional κ = 0.00304057 (+1.3281765e-5 over #5413)](https://github.com/CrocSwap/integer-mult-bounds/pull/5544)
- [#5545 Conditional κ = 0.00304117 (+6.0e-7 over #5544)](https://github.com/CrocSwap/integer-mult-bounds/pull/5545)
- [#5551 Improve complete conditional κ to 0.00304153 via coupled P104 contacts](https://github.com/CrocSwap/integer-mult-bounds/pull/5551)
- [#5561 P104 free helper endpoints: conditional κ .0030814243 (retime of #5551's word)](https://github.com/CrocSwap/integer-mult-bounds/pull/5561)
- [#5565 Conditional κ = 0.00308534 (+3.45e-6 over #5580): P104 three-stage commuting-contact cascade](https://github.com/CrocSwap/integer-mult-bounds/pull/5565)
- [#5569 Conditional κ .00308181 (+3.94e-7 over #5561): priced successor hand-off of helper 706 on the P104 word](https://github.com/CrocSwap/integer-mult-bounds/pull/5569)
- [#5580 Conditional κ = 0.00308189 (+7.6453e-8 raw over #5569)](https://github.com/CrocSwap/integer-mult-bounds/pull/5580)
- [#5599 Raise conditional kappa to 0.00310045 with independent helper splits](https://github.com/CrocSwap/integer-mult-bounds/pull/5599)
- [#5601 Conditional κ = 0.00308595 (+7.4120e-7 raw over #5565)](https://github.com/CrocSwap/integer-mult-bounds/pull/5601)
- [#5602 Conditional κ = 0.00309980 (+1.41e-6 over #5599): coupled helper bases](https://github.com/CrocSwap/integer-mult-bounds/pull/5602)
- [#5605 Conditional kappa 0.00308326 (+1.37e-6 over #5580): compensated shared P104 relay](https://github.com/CrocSwap/integer-mult-bounds/pull/5605)
- [#5606 Conditional κ 0.00309871 from a prepared P104 split helper](https://github.com/CrocSwap/integer-mult-bounds/pull/5606)
- [#5608 Conditional kappa 0.00310184 (+1.39e-6 over updated #5599): compose the shared relay and helper splits](https://github.com/CrocSwap/integer-mult-bounds/pull/5608)
- [#5612 Conditional kappa 0.00310299 (+1.15e-6 over #5608): delayed shared P104 preparation](https://github.com/CrocSwap/integer-mult-bounds/pull/5612)
- [#5613 Conditional kappa 0.00310440 (+1.41e-6 over #5612): compose the paid helper boundary](https://github.com/CrocSwap/integer-mult-bounds/pull/5613)
- [#5627 Raise conditional kappa to 0.00310440546 with composed helper splits](https://github.com/CrocSwap/integer-mult-bounds/pull/5627)
- [#5643 Conditional κ = 0.00310458 (+1.7454e-7, +0.0056223% over #5627): paid A2 rank exchange](https://github.com/CrocSwap/integer-mult-bounds/pull/5643)
- [#5644 Conditional κ = 0.00310626335 (+1.85789e-6 over #5627): three helper cleanups](https://github.com/CrocSwap/integer-mult-bounds/pull/5644)
- [#5650 Conditional κ = 0.00310644468 (+1.8133e-7, +0.00583756% over #5644): combine helper cleanup with the A2 exchange](https://github.com/CrocSwap/integer-mult-bounds/pull/5650)
- [#5660 Improve conditional κ to 0.00310676333 with a four-gate contact rewrite](https://github.com/CrocSwap/integer-mult-bounds/pull/5660)
- [#5678 Conditional κ = 0.00310815849 (+1.39516e-6 over #5660): paid interior bases](https://github.com/CrocSwap/integer-mult-bounds/pull/5678)

#### Independent checks

- [#4420 Independently check #4416's moment and paid-tail inequalities at κ = 0.00268647: all hold; the tested saving sits 9.05e-9 below this invoice's limit (no new κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4420)
- [#4428 Independently check #4416's paid-completion tensor bound at kappa 0.00268647: proof steps and arithmetic hold; gamma margin 8e-6; least v 5745 (no new κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4428)
- [#4446 Independent retimed p17 certificate: conditional kappa = 0.003001053](https://github.com/CrocSwap/integer-mult-bounds/pull/4446)
- [#4455 Independently check the p17 chain #4440, #4441, #4446, #4447, #4453 (kappa 0.00296..0.0030012): invoices, strictification, roots and compiler ranks hold (no new κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4455)
- [#4478 Independently check #4470's arithmetic (κ = 0.00302015): invoice, local change, root bracket, tails (no new κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4478)
- [#4504 Independently audit #4470 chronological frames and paid invoice (no new kappa)](https://github.com/CrocSwap/integer-mult-bounds/pull/4504)
- [#4563 Certify #4535 at a 13x smaller finite rank: N = 2^77,014,944,503 instead of 2^10^12 (same κ = 0.003020165)](https://github.com/CrocSwap/integer-mult-bounds/pull/4563)
- [#4564 Certify #4535 at outer slack d=1e-12: all 54 predicates pass, frozen rank N = 2^29,328,002,299 (34x below 2^10^12, same κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4564)
- [#4565 Retuned p16 critical-root majorant (M=2^24, ell0=64, p=3/10): #4535's frozen rank 2^11,825,387,808, 85x below 2^10^12 (same κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4565)
- [#4536 Independently check #4535's arithmetic (κ = 0.003020165): critical root, gap 377e-12, mirror, absorption, binding outer row (no new κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4536)
- [#4569 Independent proof check of #4532 §1.1, §2.2-2.3, §3 (critical-root majorant under #4535's κ): every step verified, no gap (no new κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4569)
- [#4570 Independently check #4568's arithmetic (κ = 0.00302016597): outer ledger, gap, absorption; frozen rank 6.9x smaller with #4565 (no new κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4570)
- [#5241 Independently verify #4610’s conditional κ gain over selected #4470](https://github.com/CrocSwap/integer-mult-bounds/pull/5241)
- [#5384 Independently validate κ = 0.00302235 and the owned-relation price ceiling](https://github.com/CrocSwap/integer-mult-bounds/pull/5384)
- [#5395 Independently validate κ = 0.003026674765 and the eight-relation price plane](https://github.com/CrocSwap/integer-mult-bounds/pull/5395)
- [#5396 Independently validate joint relations and conditional κ = 0.003026674765](https://github.com/CrocSwap/integer-mult-bounds/pull/5396)
- [#5399 Independently validate κ = 0.00302725 and the owned-transpose phase/cost proof](https://github.com/CrocSwap/integer-mult-bounds/pull/5399)
- [#5400 Independently validate κ = 0.00302728823 for the direct backward caller](https://github.com/CrocSwap/integer-mult-bounds/pull/5400)
- [#5407 Independently audit the coupled provider and conditional closure budget (no new κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/5407)
- [#5414 Independently verify PR5413 neutrality, necessary pricing and source application](https://github.com/CrocSwap/integer-mult-bounds/pull/5414)

### Original result

- [openai/math](https://github.com/openai/math)
- [Integer multiplication below n log n](https://github.com/openai/math/tree/main/preprints/Integer-multiplication-below-n-log-n-September-23-2026)
