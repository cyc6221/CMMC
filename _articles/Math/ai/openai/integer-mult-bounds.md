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

目前的 selected 是 Ali Romman 的 [#5599](https://github.com/CrocSwap/integer-mult-bounds/pull/5599)，於 2026 年 10 月 26 日升為 selected，$\kappa$ 為

$$
\boxed{\kappa=0.00310045}
$$

<table class="table-center">
  <thead>
    <tr>
      <th>項目</th>
      <th>PR</th>
      <th>$\kappa$</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Previous selected</td>
      <td>#5413</td>
      <td>$0.003027288235$</td>
    </tr>
    <tr>
      <td>Current selected</td>
      <td>#5599</td>
      <td>$0.00310045$</td>
    </tr>
  </tbody>
</table>

#5599 已 merge，是 maintainer-reviewed（維護者的 AI 協助 proof review，限於保留的假設）的 conditional P104 helper-subspace construction。它在 P104 word 上做 13 個 helper-subspace split，完整的 caller 有 13,048 個 productive field 與 66,726 個 paid call，重放指令為 `make frontier5599-verify`。

與前一個 selected #5413 相比，exponent saving 約大 2.41674%，這個比較不是實測的 running-time improvement。Selected result 仍保留既有的 conditional 假設，不是完整的 Lean multiplication theorem，也不是 independent human proof review。

## 主要演進

從 #1094 到 #5599，selected $\kappa$ 經過四次主要的技術轉折。#4359 讓 helper 完成的 transform 成為 productive output，改變了遞迴的帳；#4416 到 #4470 在這個 framework 上大幅減少 paid job；#4610 到 #5413 持續壓低 recursive cost；#5544 到 #5599 則轉向 P104 word。其中 #4416 通過 maintainer review，但從未成為 selected，不在 selected progression 中。

<table class="table-center">
  <thead>
    <tr>
      <th>階段</th>
      <th>PR</th>
      <th>$\kappa$</th>
      <th>狀態</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>起點</td>
      <td>#1094</td>
      <td>$0.00167\ldots$</td>
      <td>Past selected</td>
    </tr>
    <tr>
      <td>productive helper</td>
      <td>#4359</td>
      <td>$0.0023$</td>
      <td>Past selected</td>
    </tr>
    <tr>
      <td rowspan="2">productive framework 的下一次跳躍</td>
      <td>#4416</td>
      <td>$0.00268647$</td>
      <td>Reviewed checkpoint（never selected）</td>
    </tr>
    <tr>
      <td>#4470</td>
      <td>$0.00302015$</td>
      <td>Past selected</td>
    </tr>
    <tr>
      <td rowspan="2">持續壓低 recursive cost</td>
      <td>#4610</td>
      <td>$0.0030217758$</td>
      <td>Past selected</td>
    </tr>
    <tr>
      <td>#5413</td>
      <td>$0.003027288235$</td>
      <td>Past selected</td>
    </tr>
    <tr>
      <td>P104 路線</td>
      <td>#5599</td>
      <td>$0.00310045$</td>
      <td>Current selected</td>
    </tr>
  </tbody>
</table>

<div class="remark">
<strong>Remark.</strong>
<ul>
<li><strong>Merged</strong>：PR 已進入 <code>main</code>，不表示升為 selected，也不表示已被獨立驗證。</li>
<li><strong>Selected</strong>：曾經或目前是專案的 selected result，一定經過 maintainer review。Archive 合併、conditional review 與 selection 是三件不同的事，selection 另需一致的 source closure、重放指令與公開狀態更新。</li>
<li><strong>Candidate</strong>：merge 後但未升為 selected 的 conditional 宣稱，其 $\kappa$ 是作者提交的數值，未經 maintainer 單獨認可。例外是 #4416 與 #4433 的 joint p7 reviewed checkpoint：它通過 maintainer 的 proof review，但從未升為 selected。</li>
</ul>
</div>

各 selected result 以 `make frontier<PR>-verify` 重放，例如 `make frontier4359-verify`。

沒有升為 selected 的 PR 不在此逐一列出，完整清單在 repo 的 [pr-ledger.md](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-ledger.md)。

### #1094：packing / owner allocation 的起點

Rohan Arun 的 [#1094](https://github.com/CrocSwap/integer-mult-bounds/pull/1094)，$\kappa=0.001672660197076918\approx 2^{-9.22}$，狀態是 maintainer-reviewed conditional finite construction。它建立在 Jeremy Kothe 的 #1087 packing 與累積的 k8 / slot / T16 建構上，bit supplier 是 DreamingOfClouds 的 #589（建立在 eumemic 的 #555 上）。

主要手段是在十六個 bin 之間重複做 whole-helper repacking，並以 rare full-bin pattern 為起點。Helper 的位置被重排，idle rank 的分布因此改善，而 scalar word、role width 與 source-event 時間都不變。它是 productive-helper framework 出現之前，packing 與 owner allocation 路線的 selected checkpoint。

#1094 被選定之後，maintainer 完成 19 批 review（efficient100 至 efficient1900），#2848、#4088、#4181 等 PR 也在同一個框架內繼續調整，但都沒有升為 selected。#4181 顯示，在固定的四個 word 上，重新 packing 已達 pooled ceiling（$\kappa\approx0.00173098$），再往上需要改變 word 或 inventory。這個 ceiling 只限於這四個固定的 word，不是整個框架的上限。這段期間 selected $\kappa$ 維持在 #1094，直到 #4359。

### #4359：productive helper

zxv 的 [#4359](https://github.com/CrocSwap/integer-mult-bounds/pull/4359) 不是單純的 packing improvement，而是 recursive accounting framework 的質變。Selected $\kappa$ 由 $0.00167\ldots$ 升到 $0.0023>2^{-9}$。

Uniform supplier 的介面原本要求每個 local unit 把 helper 還原。然而 helper 結束時常常已握有一份對自身任意輸入的 completed transform，還原等於為同一份工作付兩次。#4359 讓這份 completed transform 成為 productive output，按它自己的 rank 計價，於是一個 local unit 可以產出多種 rank 的 job。遞迴的帳同時計入 paid call 與 productive target，mixed saving $C$ 由下式決定：

$$
\sum_r p_r\, r^{1-C}=\sum_k W_k\, k^{1-C},
$$

其中 $p_r$ 是 rank 為 $r$ 的 paid recursive call 數，$W_k$ 是 rank 為 $k$ 的 productive output 數。再用 finite integer compiler 把這個 mixed 結構編譯回 uniform supplier（由演算法定義的 finite template），#109 繼承的 outer theorem 才能使用。從 $C$ 到 $\kappa=0.0023$ 的步驟如下：

- Complex 的 mixed root 約為 $C\approx0.00230509$。
- 編譯後在 explicit rank 處的 uniform saving 為 $0.002304$，是綁住的一側；BIT 一側為 $0.0027$。
- Outer bill 的每一項 saving 都嚴格高於 $0.0023$，最小餘裕為 $1.97698\times10^{-6}$，因此宣稱 $\kappa=0.0023$。

PR 給出的兩個 winning template 的 rank 分別為 $2^{276540184361}$（complex）與 $2^{6552928412}$（BIT），完整的 word 與常數尚未生成，所以這是 asymptotic existence result，不是實用演算法。

#4359 的狀態是 maintainer-reviewed conditional productive-helper construction。它以 Jacob Alan Sussman 的 mixed-target recursion 為直接的概念前驅，承接先前的 complex / native、binary word 與 outer / precision 工作（完整名單見 [contributors](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/community-productive4359-contributors.md)）。$\kappa$ 比 #1094 高 37.51%。之後所有 selected result 都建立在這個 productive-helper framework 上。

驗證方面，maintainer 以全新的 23-stage sequential replay 比對 59 個重新產生的 artifact，並對變動的 compiler、native lift、delayed BIT cover 與 outer-transfer 介面做 AI 協助的 mathematical review。Ryanson Jonathan 的 [#4404](https://github.com/CrocSwap/integer-mult-bounds/pull/4404) 另以獨立實作做了 exact flow / rank audit。

### #4416 至 #4470：productive framework 的下一次跳躍

在 #4359 之後，PR 沿用同一個 framework，先讓 controller 的 native 組合更強，再逐步減少 paid job。

- **#4416（reviewed checkpoint）**：Cinna Davis 的 [#4416](https://github.com/CrocSwap/integer-mult-bounds/pull/4416)，$\kappa=0.00268647$，比 #4359 大 16.80%。它在 tensor composition 之後，對過小的 productive transform 另付費補足（paid completion），讓 paid 與 productive target 嚴格分離，使更強的 p7 controller 能通過 #4359 的 strict compiler 條件。它是 merged、maintainer-reviewed，但從未升為 selected：當時 selected 仍是 #4359 的 $0.0023$，隨後出現更強的 #4470。[#4420](https://github.com/CrocSwap/integer-mult-bounds/pull/4420) 與 [#4428](https://github.com/CrocSwap/integer-mult-bounds/pull/4428) 獨立檢查 moment、paid-tail 與 paid-completion 不等式；maintainer 在 10 月 21 日完成 #4416 與 zxv 的 #4433 的 [proof review](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-intake-evidence/pr4416/PROOF-REVIEW.md)，限於保留的 #4359 假設。這份 review 後來被 #4470 的 selection 重用為 foundation。
- **#4470（selected）**：Cinna Davis 的 [#4470](https://github.com/CrocSwap/integer-mult-bounds/pull/4470)，於 10 月 22 日升為 selected，狀態是 maintainer-reviewed conditional joint-helper construction，$\kappa=60403/20000000=0.00302015$，比 #4359 大 31.31%，比 #4416 大 12.42%。它累積 #4416 與中間的 #4440、#4441、#4447（依序引入 copied rank-one query shear、helper retiming 與缺漏的 contact span，三者都沒有單獨升為 selected），同時調整 helper 的 entrance、exit 與 contact frame，再配上 query-thinned 的 16-pair controller。它也承接 zxv 的 productive-helper native / compiler 與 Jacob Alan Sussman 的 mixed-target recursion（完整名單見 [contributors](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/community-joint4470-contributors.md)）。

#4470 的驗證方面，maintainer 對變動的建構做八個 scoped、serial 的重放。Source 完全相同的 #4359 與 #4416 foundation review 被明確重用，不重跑。Linux（Python 3.12）上的 hosted CI 通過了 selected 的八段重放，見 [integration receipt](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-intake-evidence/pr4470/INTEGRATION.json) 與 [proof review](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-intake-evidence/pr4470/PROOF-REVIEW.md)。

### #4610 至 #5413：在同一 framework 上持續壓低 recursive cost

在 #4470 之後，selected 先後換成 Cao Yifan 的 [#4610](https://github.com/CrocSwap/integer-mult-bounds/pull/4610)（10 月 23 日，$\kappa=15108879/5000000000=0.0030217758$）與 Chris R 的 [#5413](https://github.com/CrocSwap/integer-mult-bounds/pull/5413)（10 月 24 日，$\kappa=605457647/200000000000=0.003027288235$）。這一階段沒有像 #4359 那樣改變 accounting model，而是沿用 #4470 的 p16 controller，逐項壓低 recursive cost：

- native map 與 helper 的 entrance、scalar contact（#4610）
- helper relation：以 owned relation 去掉 backward call 的 rank-eight center（[#5377](https://github.com/CrocSwap/integer-mult-bounds/pull/5377)、[#5383](https://github.com/CrocSwap/integer-mult-bounds/pull/5383)）
- backward caller：[#5392](https://github.com/CrocSwap/integer-mult-bounds/pull/5392) 以 circuit transposition 讓兩個 forward call 改用縮減後的 backward supplier，#5398 的 direct backward caller 則讓全部 18 個 full call 使用完成的 backward supplier
- caller 的建構：以 coupled-output caller 補完 eight-mode coupled helper provider（[#5402](https://github.com/CrocSwap/integer-mult-bounds/pull/5402)、#5413）
- paid-rank 的分布：依嚴格凹性，把 rank-four 的 job 換成 rank-three 與 rank-five 的 pair（#4610）
- compiler 與 outer 的 headroom（#5413）

其間許多 candidate 各自只改其中一項，沒有升為 selected。#5413 比 #4470 只高約 $7.14\times10^{-6}$，增幅遠小於 #4359 與 #4470 的跳躍。

兩者的 selection 依據：

- **#4610**：比 #4470 高 $1.6258\times10^{-6}$。Selection 以 Chris R 的 [#5241](https://github.com/CrocSwap/integer-mult-bounds/pull/5241) 為依據，它對 #4610 做獨立的 source-bound audit，涵蓋 phase、任意輸入、invoice、compiler 與 outer 各階段。Maintainer 以完整的 independent admission replay 重放，並明確重用前一個 selected 的 controller、ordinary BIT 與 physical / compiler foundation。被接受的是凍結的 native word 與 compiler point，不是 PR 內每個探索性結果。
- **#5413**：比 #4610 高約 0.182424%。它補完 Dillon Amburgey 的 [#5402](https://github.com/CrocSwap/integer-mult-bounds/pull/5402)（保留全部 632 個 native input 的 eight-mode coupled helper provider）的輸出，接在 Ali Romman 的 [#5398](https://github.com/CrocSwap/integer-mult-bounds/pull/5398)（direct backward caller）上。相對 #5398 與 #5400 只多 $5\times10^{-12}$，這是 compiler / outer headroom，不是新的 recursive-price saving。Selection 納入 [#5407](https://github.com/CrocSwap/integer-mult-bounds/pull/5407)（provider audit）與 [#5414](https://github.com/CrocSwap/integer-mult-bounds/pull/5414)（獨立檢查 neutrality 與必要的 pricing），並明確重用 #4610 的 foundation。

### #5544 至 #5599：P104 路線

P104 word 來自 David Arias、Cinna Davis 與 Gareth Davidson 的 #2152、#2219 與 #2305，具有 527 個獨立的 helper output。Ali Romman 的 [#5544](https://github.com/CrocSwap/integer-mult-bounds/pull/5544) 把 P104 的 literal caller 與實際的 native Gaussian rank 接進 mixed-target recursion，$\kappa=0.00304057$，比 #5413 高 $1.33\times10^{-5}$，這條路線因此有了新的改善空間。

之後的 PR 在 P104 word 上累積改進，$\kappa$ 升到 $0.00308534$（hexapode 的 [#5565](https://github.com/CrocSwap/integer-mult-bounds/pull/5565)）。#5544 起的這些 PR 都是 candidate：$\kappa$ 是作者提交的 conditional 宣稱，upstream ledger 標為 partially reviewed（scoped review 與 triage），不會因為後繼的 #5599 通過 review 而被追認。主要手段是：

- coupled frame itinerary：改寫兩個 coupled frame 的路徑（[#5551](https://github.com/CrocSwap/integer-mult-bounds/pull/5551)）
- helper endpoint retiming：重排 helper 的 endpoint 與 stop frame（[#5561](https://github.com/CrocSwap/integer-mult-bounds/pull/5561)）
- helper reuse：把 helper 交給後繼的 call（[#5569](https://github.com/CrocSwap/integer-mult-bounds/pull/5569)）
- contact / frame rewrite：把一個減法或 ADD 移到維度較高的 frame（[#5545](https://github.com/CrocSwap/integer-mult-bounds/pull/5545)、[#5580](https://github.com/CrocSwap/integer-mult-bounds/pull/5580)）
- commuting-contact cascade（#5565）

最後 Ali Romman 的 [#5599](https://github.com/CrocSwap/integer-mult-bounds/pull/5599) 在 P104 word 上做 13 個 helper-subspace split，產生真正獨立的輸入並切開 productive target，不增加 paid Gaussian call，於 10 月 26 日成為 current selected：

$$
\boxed{\kappa=0.00310045}.
$$

#5599 承接 hexapode 的 #5565、Joel Pulikkan 的 [#5569](https://github.com/CrocSwap/integer-mult-bounds/pull/5569)、DreamingOfClouds 的 [#5561](https://github.com/CrocSwap/integer-mult-bounds/pull/5561)、thu-nmrc 的 [#5551](https://github.com/CrocSwap/integer-mult-bounds/pull/5551) 與 Ali Romman 自己的 #5544、#5545、#5580（完整名單見 [contributors](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/community-p1045599-contributors.md)）。

驗證方面，完整 construction、原本的獨立 caller positive control、adapted caller 與 optimized construction 的重放，都在 Linux 上以 1 GiB 的取樣記憶體上限 serial 通過，positive control 與凍結的輸出完全一致。前一個 foundation 被明確重用，超大的 uniform word 與 rounded multiplier 沒有實體化。細節見 [proof review](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-intake-evidence/pr5599-completion/PROOF-REVIEW.md)。

## 歷史 $\kappa$ 里程碑

$\kappa$ 由 #109 的 $2^{-182}$ 逐步上升到目前 selected 的 $0.00310045$。下表依 $\kappa$ 由小到大列出 selected result 的主要節點，並標出各節點的代表性機制與主要作者。

<table class="table-center">
  <thead>
    <tr>
      <th>Checkpoint</th>
      <th>$\kappa$</th>
      <th>代表性機制</th>
      <th>主要貢獻</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>OpenAI #109</td>
      <td>$2^{-182}$</td>
      <td>original result</td>
      <td>OpenAI</td>
    </tr>
    <tr>
      <td>frozen-154</td>
      <td>$2^{-154}$</td>
      <td>原 network 與 recurrence exponent 的 patch</td>
      <td>—</td>
    </tr>
    <tr>
      <td>ternary-30</td>
      <td>$2^{-30}$</td>
      <td>ternary five-subset circuit</td>
      <td>—</td>
    </tr>
    <tr>
      <td>round two（#62）</td>
      <td>$5.1017\times10^{-5}$</td>
      <td>interval strips、core-aware pair assembly（第一個 reviewed community checkpoint，首次超過 $2^{-15}$）</td>
      <td>Avi Eisenberg<br>eumemic<br>Alejandro Zarzuelo Urdiales</td>
    </tr>
    <tr>
      <td>#104</td>
      <td>$7.7948\times10^{-5}$</td>
      <td>stopped product-ring interchange</td>
      <td>icekylinx</td>
    </tr>
    <tr>
      <td>#115</td>
      <td>$9.2634\times10^{-5}$</td>
      <td>partial-gauge、cube producers</td>
      <td>icekylinx</td>
    </tr>
    <tr>
      <td>#130</td>
      <td>$3.1460\times10^{-4}$</td>
      <td>three-stage cover</td>
      <td>icekylinx</td>
    </tr>
    <tr>
      <td>paired-cube（#144）</td>
      <td>$4.6092\times10^{-4}$</td>
      <td>paired cubes、shared completed cores</td>
      <td>icekylinx</td>
    </tr>
    <tr>
      <td>recycled bit registers（#146–#148、#150）</td>
      <td>$4.7215\times10^{-4}$</td>
      <td>recycled bit registers</td>
      <td>William Porter<br>DaysSky<br>Thomas Marchand<br>Rohan Gupta</td>
    </tr>
    <tr>
      <td>#186</td>
      <td>$6.6189\times10^{-4}$</td>
      <td>shared-edge supplier、coordinated frames、entrance banks</td>
      <td>Dugongue</td>
    </tr>
    <tr>
      <td>#210</td>
      <td>$7.1005\times10^{-4}$</td>
      <td>five-stage banks、F₂ movement fusion</td>
      <td>eumemic</td>
    </tr>
    <tr>
      <td>gen4（#276、#279）</td>
      <td>$7.2357\times10^{-4}$</td>
      <td>paired-cube bit word、concave-descent retiming</td>
      <td>DreamingOfClouds<br>Rohan Arun</td>
    </tr>
    <tr>
      <td>#531</td>
      <td>$1.5178\times10^{-3}$</td>
      <td>direct delivery</td>
      <td>icekylinx</td>
    </tr>
    <tr>
      <td>#535</td>
      <td>$1.5849\times10^{-3}$</td>
      <td>post-center rank-four kernels</td>
      <td>icekylinx<br>DreamingOfClouds</td>
    </tr>
    <tr>
      <td>#588</td>
      <td>$1.6023\times10^{-3}$</td>
      <td>gate-move frame coalescence</td>
      <td>Jeremy Kothe</td>
    </tr>
    <tr>
      <td>#617</td>
      <td>$1.6352\times10^{-3}$</td>
      <td>second dim-4 cold end per factory block</td>
      <td>Jeremy Kothe</td>
    </tr>
    <tr>
      <td>#626</td>
      <td>$1.6355\times10^{-3}$</td>
      <td>coordinated owner repair</td>
      <td>Chafik Boukhalfa</td>
    </tr>
    <tr>
      <td>#942</td>
      <td>$1.6620\times10^{-3}$</td>
      <td>T37 whole-owner packing</td>
      <td>Jonathan Capalbo</td>
    </tr>
    <tr>
      <td>#1042</td>
      <td>$1.6722\times10^{-3}$</td>
      <td>T16 owner packing on the seven-slot k8 word</td>
      <td>Jeremy Kothe</td>
    </tr>
    <tr>
      <td>#1094</td>
      <td>$1.6727\times10^{-3}$</td>
      <td>packing / owner allocation（rare-pattern T16 exchanges）</td>
      <td>Rohan Arun</td>
    </tr>
    <tr>
      <td>#4359</td>
      <td>$2.3\times10^{-3}$</td>
      <td>productive helper</td>
      <td>zxv</td>
    </tr>
    <tr>
      <td>#4470</td>
      <td>$3.02015\times10^{-3}$</td>
      <td>joint helper boundaries</td>
      <td>Cinna Davis</td>
    </tr>
    <tr>
      <td>#4610</td>
      <td>$3.02178\times10^{-3}$</td>
      <td>native-map refinement</td>
      <td>Cao Yifan</td>
    </tr>
    <tr>
      <td>#5413</td>
      <td>$3.02729\times10^{-3}$</td>
      <td>caller / helper relation</td>
      <td>Chris R<br>Dillon Amburgey<br>Ali Romman</td>
    </tr>
    <tr>
      <td>#5599（目前 selected）</td>
      <td>$3.10045\times10^{-3}$</td>
      <td>P104 helper-subspace split</td>
      <td>Ali Romman<br>hexapode</td>
    </tr>
  </tbody>
</table>

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
- **Owned helper relation 與 backward caller**：#5377 起，用 owned relation 去掉 backward call 的 rank-eight center（#5377、#5383），再讓 backward call 改用縮減後的 supplier：#5392 以 circuit transposition 轉換兩個 forward call，#5398 的 direct backward caller 涵蓋全部 18 個 full call，#5413 補完 coupled-output caller。
- **P104 word 與 helper-subspace split**：#5544 起改用 P104 word 的 literal caller，再以 contact 重排、helper retiming 與 helper-subspace split 減少 paid call 或增加獨立輸入（#5544 至 #5599）。

### 瓶頸

以下是 #1094 時期的評估。最終的 $\kappa$ 與遞迴 saving $a$ 之間採用限制性換算 $\kappa=a/(1+a)$，評估日期為 2026 年 10 月 16 日（revision 6）：

- complex primitive 支撐約 $a=0.00167546$
- bit primitive 支撐約 $a=0.00173343$

兩者中 complex 一側較小，是綁住 $\kappa$ 的一側。要讓 $\kappa>0.01$，兩個 effective primitive budget 都需要超過約 $1/99$。這描述的是目前建構的瓶頸，不是整數乘法的下界。

PR #4359 之後 complex 仍是綁住的一側：#4359 中 complex 的 uniform saving 為 $0.002304$，BIT 為 $0.0027$。[#4440](https://github.com/CrocSwap/integer-mult-bounds/pull/4440) 起的建構保留一條 16-pair 的 BIT word，其 ordinary saving 為 $0.0034$，$\kappa$ 的提高來自 complex controller 的改進。#4535 與 #4568 沒有再動 controller，提高的幅度只有 $1.5\times10^{-8}$ 與 $9.7\times10^{-10}$，來自 compiler 與 outer 參數的收緊。#4610 則改動 helper 與 native map，$\kappa$ 再提高到 $0.0030217758$。[#4940](https://github.com/CrocSwap/integer-mult-bounds/pull/4940) 另做了一項不主張 $\kappa$ 的計算：它以 [#4929](https://github.com/CrocSwap/integer-mult-bounds/pull/4929) 的 center-free port code $A$ 共軛 controller，即 $\text{Coded}=A\cdot\text{Standard}\cdot A^{-1}$，使 reverse stage 成為 center-free，只有 controller 邊界需要重新編碼。若這些重新編碼可被接受，BIT supplier 會把 conditional $\kappa$ 限制在約 $0.0034$，目前 selected 的 $0.00310045$ 低於這個值。這不是已建立的上界：重新編碼在實際 frame 上的 physical admission、計價與 compiler 常數都未建立，#4940 也沒有 maintainer 的 proof review。

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
- compiler closure：finite mixed-target compiler 與 chronological product、completion、splitting 滿足保留的 uniform closure，保留的 outer cost 估計與 outer substitution 也適用於新的 finite template
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

除 #1094、#4359、#4470、#4610、#5413 與 #5599 曾是 selected，以及 #4416 / #4433 的 joint p7 reviewed checkpoint 外，標題中的 $\kappa$ 都是作者的宣稱，不代表已被 maintainer 認可，各 PR 的處置見 [pr-ledger.md](https://github.com/CrocSwap/integer-mult-bounds/blob/main/docs/research/pr-ledger.md)。

- [#1094 Conditional kappa 0.001672660197076918: rare-pattern T16 exchanges](https://github.com/CrocSwap/integer-mult-bounds/pull/1094)
- [#2848 T248 residue exchange: conditional κ ≈ 0.00171865850830493](https://github.com/CrocSwap/integer-mult-bounds/pull/2848)
- [#4088 Improve conditional κ with a mixed fourth staged entry](https://github.com/CrocSwap/integer-mult-bounds/pull/4088)
- [#4181 Conditional κ = 0.001730980255989036959962: one-third fourth-entry fill attaining #4091's pooled ceiling](https://github.com/CrocSwap/integer-mult-bounds/pull/4181)
- [#4359 Conditional κ = 0.0023 (+5.690e-4, +32.87% over #4181): productive helper jobs compiled into a uniform supplier](https://github.com/CrocSwap/integer-mult-bounds/pull/4359)
- [#4404 Independently check #4359's explicit-rank chain: H0/H1, superpotentials, the exit recurrence and 19,895 exact lockstep flows hold (no new κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4404)
- [#4411 Reduce conditional κ = 0.0023 template ranks to 2^465000 and 2^7100](https://github.com/CrocSwap/integer-mult-bounds/pull/4411)
- [#4412 Conditional κ = 0.00247755 via native tensor strictification](https://github.com/CrocSwap/integer-mult-bounds/pull/4412)
- [#4413 Rebalance #4359's own ledger at unchanged kappa 0.0023: explicit ranks shrink to 2^268300549 (complex) and 2^14664 (BIT) with all 54 predicates strict (no new κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4413)
- [#4414 Conditional κ = 0.00267987 with a complete p6 native controller](https://github.com/CrocSwap/integer-mult-bounds/pull/4414)
- [#4416 Conditional κ = 0.00268647 via paid target padding after native composition](https://github.com/CrocSwap/integer-mult-bounds/pull/4416)
- [#4433 Reduce p7 tensor power and uniform-rank exponent (41.6× and 46.38M×)](https://github.com/CrocSwap/integer-mult-bounds/pull/4433)
- [#4440 Conditional κ = 0.00296 via query-thinned productive controllers (+10.18%)](https://github.com/CrocSwap/integer-mult-bounds/pull/4440)
- [#4441 Conditional κ = 0.00300105 (+4.105e-5 over #4440): combine query thinning and helper retiming](https://github.com/CrocSwap/integer-mult-bounds/pull/4441)
- [#4447 Conditional kappa = 0.00300123 via a missing three-dimensional contact span](https://github.com/CrocSwap/integer-mult-bounds/pull/4447)
- [#4470 Conditional kappa = 0.00302015 (+0.6304% over #4447): joint helper boundaries](https://github.com/CrocSwap/integer-mult-bounds/pull/4470)
- [#4479 Reduce #4470 local compiler rank 115× at unchanged conditional κ](https://github.com/CrocSwap/integer-mult-bounds/pull/4479)
- [#4483 Remove tensor padding (199.32× smaller uniform-rank exponent)](https://github.com/CrocSwap/integer-mult-bounds/pull/4483)
- [#4535 Improve conditional multiplication kappa to 0.003020165 via critical-root transfer](https://github.com/CrocSwap/integer-mult-bounds/pull/4535)
- [#4568 Conditional κ = 0.00302016597 (+9.7e-10 over #4535)](https://github.com/CrocSwap/integer-mult-bounds/pull/4568)
- [#4610 Conditional κ = 0.0030217758: joint helper interfaces and Lean compiler tightening](https://github.com/CrocSwap/integer-mult-bounds/pull/4610)
- [#4929 Construct a center-free native producer with an explicit rank-8 port code (no new κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4929)
- [#4940 Consume the #4929 center-free word with coded reverse stages and A⁻¹-mixed query shears (no κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4940)
- [#5377 Conditional κ = 0.00302235 (+5.742e-7 over #4610): one owned helper relation](https://github.com/CrocSwap/integer-mult-bounds/pull/5377)
- [#5383 Conditional κ = 0.00302666 (+4.31e-6 over #5377): eight joint helper relations](https://github.com/CrocSwap/integer-mult-bounds/pull/5383)
- [#5392 Conditional κ = 0.00302725 (+5.75235e-7 over #5387): owned circuit transposition](https://github.com/CrocSwap/integer-mult-bounds/pull/5392)
- [#5398 Conditional κ = 0.00302728823 (+3.823e-8 over #5392): direct backward caller](https://github.com/CrocSwap/integer-mult-bounds/pull/5398)
- [#5402 Preserve all 632 native inputs in an eight-mode coupled helper provider](https://github.com/CrocSwap/integer-mult-bounds/pull/5402)
- [#5413 Complete coupled-output caller: conditional κ = 0.003027288235 (+5e-12 over #5400)](https://github.com/CrocSwap/integer-mult-bounds/pull/5413)
- [#5544 Conditional κ = 0.00304057 (+1.3281765e-5 over #5413)](https://github.com/CrocSwap/integer-mult-bounds/pull/5544)
- [#5545 Conditional κ = 0.00304117 (+6.0e-7 over #5544)](https://github.com/CrocSwap/integer-mult-bounds/pull/5545)
- [#5551 Improve complete conditional κ to 0.00304153 via coupled P104 contacts](https://github.com/CrocSwap/integer-mult-bounds/pull/5551)
- [#5561 P104 free helper endpoints: conditional κ .0030814243 (retime of #5551's word)](https://github.com/CrocSwap/integer-mult-bounds/pull/5561)
- [#5565 Conditional κ = 0.00308534 (+3.45e-6 over #5580): P104 three-stage commuting-contact cascade](https://github.com/CrocSwap/integer-mult-bounds/pull/5565)
- [#5569 Conditional κ .00308181 (+3.94e-7 over #5561): priced successor hand-off of helper 706 on the P104 word](https://github.com/CrocSwap/integer-mult-bounds/pull/5569)
- [#5580 Conditional κ = 0.00308189 (+7.6453e-8 raw over #5569)](https://github.com/CrocSwap/integer-mult-bounds/pull/5580)
- [#5599 Raise conditional kappa to 0.00310045 with independent helper splits](https://github.com/CrocSwap/integer-mult-bounds/pull/5599)

#### Independent checks

- [#4420 Independently check #4416's moment and paid-tail inequalities at κ = 0.00268647: all hold; the tested saving sits 9.05e-9 below this invoice's limit (no new κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4420)
- [#4428 Independently check #4416's paid-completion tensor bound at kappa 0.00268647: proof steps and arithmetic hold; gamma margin 8e-6; least v 5745 (no new κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4428)
- [#4563 Certify #4535 at a 13x smaller finite rank: N = 2^77,014,944,503 instead of 2^10^12 (same κ = 0.003020165)](https://github.com/CrocSwap/integer-mult-bounds/pull/4563)
- [#4564 Certify #4535 at outer slack d=1e-12: all 54 predicates pass, frozen rank N = 2^29,328,002,299 (34x below 2^10^12, same κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4564)
- [#4565 Retuned p16 critical-root majorant (M=2^24, ell0=64, p=3/10): #4535's frozen rank 2^11,825,387,808, 85x below 2^10^12 (same κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/4565)
- [#5241 Independently verify #4610’s conditional κ gain over selected #4470](https://github.com/CrocSwap/integer-mult-bounds/pull/5241)
- [#5400 Independently validate κ = 0.00302728823 for the direct backward caller](https://github.com/CrocSwap/integer-mult-bounds/pull/5400)
- [#5407 Independently audit the coupled provider and conditional closure budget (no new κ)](https://github.com/CrocSwap/integer-mult-bounds/pull/5407)
- [#5414 Independently verify PR5413 neutrality, necessary pricing and source application](https://github.com/CrocSwap/integer-mult-bounds/pull/5414)

### Original result

- [openai/math](https://github.com/openai/math)
- [Integer multiplication below n log n](https://github.com/openai/math/tree/main/preprints/Integer-multiplication-below-n-log-n-September-23-2026)
