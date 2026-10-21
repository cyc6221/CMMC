---
layout: page
title: CrocSwap integer-mult-bounds
date: 2026-10-21
last_updated: 2026-10-22
---

CrocSwap/integer-mult-bounds <a class="gh-link" href="https://github.com/CrocSwap/integer-mult-bounds" target="_blank" rel="noopener noreferrer" aria-label="CrocSwap/integer-mult-bounds on GitHub"><svg viewBox="0 0 16 16" class="ico" aria-hidden="true"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>GitHub</a>

{% include math/ai/repo-stats.html repo="CrocSwap/integer-mult-bounds" %}
<script defer src="{{ '/assets/js/repo-stats.js' | relative_url }}"></script>

它是改進 OpenAI Math Result #109 的社群專案。#109 給出整數乘法的 deterministic 時間界 $O(n(\log n)^{1-\kappa})$，其中 $\kappa=2^{-182}$。專案保留 #109 的框架，優化其中的有限建構、遞迴成本帳與 packing 等環節，把 $\kappa$ 往上推。專案於 2026 年 10 月 7 日建立，由 Douglas Colkitt 維護，成果以 PR 形式由社群貢獻，經 maintainer review 後整合。

多數進展不是全新的整數乘法演算法，而是在同一個框架內改善個別瓶頸。本文內容更新至 2026 年 10 月 22 日。

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
      <td>Selected：#1094<br>（maintainer-reviewed）</td>
      <td>$0.001672660197076918\approx 2^{-9.22}$</td>
    </tr>
    <tr>
      <td>最高的 conditional claim：#4359<br>（open，待外部數學 review）</td>
      <td>$0.0023$</td>
    </tr>
  </tbody>
</table>

Selected result 為 Rohan Arun 的 [#1094](https://github.com/CrocSwap/integer-mult-bounds/pull/1094)，狀態是 maintainer-reviewed conditional finite construction。它建立在 Jeremy Kothe 的 #1087 packing 與累積的 k8 / slot / T16 建構上，bit supplier 仍是 DreamingOfClouds 的 #589（建立在 eumemic 的 #555 上）。重放指令為 `make frontier1094-verify`。

[#4359](https://github.com/CrocSwap/integer-mult-bounds/pull/4359) 的 $\kappa=0.0023$ 尚未取代 selected result。兩者都仍繼承 #109 框架中 compiler、hosting、precision / tape 與 analytic transfer 等假設。

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
      <td>stopped product-ring</td>
      <td>$7.7948\times10^{-5}$</td>
      <td>icekylinx</td>
    </tr>
    <tr>
      <td>partial-gauge（延伸 #104）</td>
      <td>$9.2634\times10^{-5}$</td>
      <td>icekylinx</td>
    </tr>
    <tr>
      <td>three-stage cover（延伸 #115）</td>
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
      <td>#1094（目前 selected）</td>
      <td>$1.6727\times10^{-3}$</td>
      <td>Rohan Arun</td>
    </tr>
  </tbody>
</table>

## 近期發展

以下依序為 #1094 之後的主要 PR。除 #1094 外，都不是 selected result。#1094 被選定之後，maintainer 已完成 19 批 review（efficient100 至 efficient1900，每批約 100 個 PR），這些 review 保留各 PR 的建構、負面結果與驗證工具，但沒有更動 selected $\kappa$。

### #1094：T16 rare-pattern exchanges

$\kappa=0.001672660197076918$，狀態為 merged 且 selected。

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

$\kappa\approx0.001730980255989037$，狀態為 open candidate，由作者自行檢查，未經 maintainer review。

PR #4181 保留 #4088 的四個 word，只改兩處：哪些 call 使用 fourth-entry word（前 1080 個 tick），以及這些 call 的 owner 如何依時間順序填入。結果比 #4088 高 $1.14\times10^{-9}$，並達到 [#4091](https://github.com/CrocSwap/integer-mult-bounds/pull/4091) 對這組固定 word 證明的 pooled ceiling。

因此在這四個 word 上，單靠重新 packing 已無法再提高 $\kappa$。PR 的結論是進一步需要 changed word 或 changed inventory。

### #4359：productive jobs

$\kappa=0.0023$，狀態為 open conditional candidate，待外部數學 review。比 #4181 高 $5.690\times10^{-4}$（+32.87%），比 #1094 高 37.51%。這些百分比比較的是 exponent saving，不是實測的執行時間。

在 uniform supplier 的介面中，每個 local unit 都要把 helper 還原。然而 helper 結束時常常握有一份已完成、對自身任意輸入的已知 transform，還原等於為同一份工作付兩次。#4359 把這些 completed transform 當作 productive job，按其本身的 rank 計價，於是一個 local unit 可以產出多種 rank 的 job。Complex 的 p3 controller 的 productive job 有 rank 6、7、8、9、25、57。Mixed saving $C$ 由下式決定：

$$
\sum_r p_r\, r^{1-C}=\sum_k W_k\, k^{1-C},
$$

其中 $p_r$ 是 rank 為 $r$ 的 paid recursive call 數，$W_k$ 是 rank 為 $k$ 的 productive output 數。

接著用 finite integer compiler 把這個 mixed 結構編譯回 uniform supplier，讓 #109 繼承的 outer theorem 可以使用：

- Complex 的 mixed root 約為 $C\approx0.00230509$。
- 編譯後在 explicit rank 處的 uniform saving 為 $0.002304$，是綁住的一側。BIT 一側為 $0.0027$。
- Outer bill 的每一項 saving 都嚴格高於 $0.0023$，最小餘裕為 $1.97698\times10^{-6}$，因此宣稱 $\kappa=0.0023$。

兩個 winning template 的 rank 分別為 $2^{276540184361}$（complex）與 $2^{6552928412}$（BIT），完整的 word 與常數尚未生成，所以這是 asymptotic existence result，不是實用演算法。Compiler、native adapters、common-weight BIT interface 與 support-local outer transfer 等新論證是書面證明加上有限檢查，尚未形式化，也未經外部接受。

PR 列出的後續問題包括：把整條論證當作一個整體做外部 review、縮小 template 的 rank，以及改善 complex 一側的 tariff。Complex 已是綁住的一側，單獨增加 BIT 的 saving 無法再推進。

### 追蹤的 PR

<table class="table-center">
  <thead>
    <tr>
      <th>PR</th>
      <th>$\kappa$</th>
      <th>內容</th>
      <th>狀態</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>#1094</td>
      <td>0.001672660197</td>
      <td>T16 rare-pattern packing</td>
      <td>Selected</td>
    </tr>
    <tr>
      <td>#2848</td>
      <td>0.001718658508</td>
      <td>T248 cross-replica residue exchange</td>
      <td>Merged，candidate</td>
    </tr>
    <tr>
      <td>#4088</td>
      <td>0.001730979116</td>
      <td>mixed fourth staged entry</td>
      <td>Merged，candidate</td>
    </tr>
    <tr>
      <td>#4100</td>
      <td>0.001730979116</td>
      <td>proposed unconditional batched-CRT 建構</td>
      <td>Merged，未經獨立接受</td>
    </tr>
    <tr>
      <td>#4181</td>
      <td>0.001730980256</td>
      <td>達到 fixed-word pooled packing ceiling</td>
      <td>Open candidate</td>
    </tr>
    <tr>
      <td>#4359</td>
      <td>0.0023</td>
      <td>productive jobs 與 mixed-to-uniform compiler</td>
      <td>Open candidate</td>
    </tr>
  </tbody>
</table>

Merged 只表示 PR 已進入 `main`，不表示升為 selected，也不表示數學上已被獨立驗證。Candidate 是尚未升為 selected 的更大 $\kappa$ 宣稱。

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

### 瓶頸

以下是 #1094 時期的評估。最終的 $\kappa$ 與遞迴 saving $a$ 之間採用限制性換算 $\kappa=a/(1+a)$，評估日期為 2026 年 10 月 16 日（revision 6）：

- complex primitive 支撐約 $a=0.00167546$
- bit primitive 支撐約 $a=0.00173343$

兩者中 complex 一側較小，是綁住 $\kappa$ 的一側。要讓 $\kappa>0.01$，兩個 effective primitive budget 都需要超過約 $1/99$。這描述的是目前建構的瓶頸，不是整數乘法的下界。

### 可能的改進方向

- decoder 或 helper inventory：節省更多 rank，或減少遞迴 call 的數量與大小。
- call 之間的邊界：去掉下一個 call 重複做的 restoration 或 conversion。
- supplier interface lemma：放寬目前 contract 排除的 word。

### 前提與限制

<div class="remark">
<strong>Remark.</strong>
$\kappa$ 衡量的是漸近 exponent saving，不是實測的執行時間。
</div>

所有結果都以 #109 的框架與一般歸約為前提，專案不是 OpenAI 的官方釋出或背書。以下 obligations 仍是 conditional：

- all-size / compiler
- common-label / mutable-source realization
- whole-call hosting
- precision / tape 與 exact recovery
- analytic obligations

Selected result 的驗證是 maintainer review 加上有限規模的重放，並非完整的 Lean multiplication theorem。Candidate 與 merged 的結果則各自附帶作者提交的證據，狀態見上方各 PR。

## References

### Repository

- [CrocSwap/integer-mult-bounds](https://github.com/CrocSwap/integer-mult-bounds)
- [selected-result.json](https://github.com/CrocSwap/integer-mult-bounds/blob/main/certificates/selected-result.json)
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
- [#4359 Conditional κ = 0.0023: productive helper jobs compiled into a uniform supplier](https://github.com/CrocSwap/integer-mult-bounds/pull/4359)

### Original result

- [openai/math](https://github.com/openai/math)
- [Integer multiplication below n log n](https://github.com/openai/math/tree/main/preprints/Integer-multiplication-below-n-log-n-September-23-2026)
