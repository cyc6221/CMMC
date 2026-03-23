---
layout: page
title: List of NPC Problems
date: 2026-03-22
last_updated: 2026-03-23
tags: [complexity-theory, NP-Complete, Karp's 21 Problems, Reductions]
---

在討論 $NP$-complete 問題時，最重要的想法之一是：這並不是幾個彼此無關、各自困難的特殊問題，而是一整類可以透過 polynomial-time reduction 彼此連結起來的問題。只要其中任何一個問題能在 polynomial time 內求解，那麼所有屬於 $NP$ 的問題也都能在 polynomial time 內求解，因此會推出 $P = NP$。

這個觀念在複雜度理論中具有關鍵地位，而它的經典起點之一，就是 Richard Karp 在 1972 年整理出的 **21 個 $NP$-complete 問題**。這些問題提供了一個龐大的起始庫，使後續研究者可以透過 reduction 持續證明更多新問題也是 $NP$-complete。也因此，理解一些代表性的 $NP$-complete 問題，不只是記住若干例子，而是在熟悉整個理論框架的基本地圖。

## What Does $NP$-Complete Mean?

一個 decision problem 若是 **$NP$-complete**，通常包含兩層意思：

<ul>
  <li>它本身屬於 $NP$，也就是 yes instance 具有可在 polynomial time 內驗證的 witness。</li>
  <li>每一個屬於 $NP$ 的問題都可以在 polynomial time 內 reduce 到它。</li>
</ul>

因此，$NP$-complete 問題可以被理解為 $NP$ 中最困難的一群問題。只要其中任一個問題被放進 $P$，就會得到

$$
P = NP.
$$

## Some Important $NP$-Complete Problems

下面先列出一些最常見、也最有代表性的 $NP$-complete 問題。它們常出現在演算法、複雜度理論、最佳化與密碼學背景討論中。

<div class="example">
  <b>Important examples of $NP$-complete problems.</b>
  <ul>
    <li><b>SAT (Boolean satisfiability problem)</b>：給定一個布林公式，問是否存在一組變數指派使整個公式為真。Cook–Levin theorem 說明了 SAT 是第一個被證明為 $NP$-complete 的問題。</li>
    <li><b>3-SAT</b>：SAT 的特殊形式，其中公式寫成 conjunctive normal form，且每個 clause 恰有三個 literal。這是最常見的 $NP$-complete 起點之一。</li>
    <li><b>CLIQUE</b>：給定一張圖 $G$ 與整數 $k$，問圖中是否存在大小至少為 $k$ 的 clique，也就是任兩點都相鄰的頂點集合。</li>
    <li><b>VERTEX COVER</b>：給定圖 $G$ 與整數 $k$，問是否存在大小至多為 $k$ 的頂點集合，使每條邊至少有一端被這個集合覆蓋。</li>
    <li><b>INDEPENDENT SET</b>：給定圖 $G$ 與整數 $k$，問是否存在大小至少為 $k$ 的 independent set，也就是其中任兩點皆不相鄰的頂點集合。</li>
    <li><b>HAMILTONIAN CYCLE</b>：問一張圖中是否存在一條經過每個頂點恰一次並回到起點的 cycle。</li>
    <li><b>HAMILTONIAN PATH</b>：問一張圖中是否存在一條經過每個頂點恰一次的 path。</li>
    <li><b>3-COLOURING</b>：問一張圖是否可以用三種顏色為所有頂點著色，並使每條邊兩端的顏色不同。</li>
    <li><b>SUBSET SUM</b>：給定一組整數與一個目標值，問是否存在某個子集合，其元素總和恰好等於目標值。</li>
    <li><b>PARTITION</b>：問一組整數是否可以被分成兩部分，且兩部分總和相等。</li>
    <li><b>KNAPSACK</b>：給定權重、價值與限制，問是否存在滿足條件的選取方式。這是組合最佳化與密碼學歷史中都很重要的一類問題。</li>
    <li><b>SET COVER</b>：給定一個 universe 與若干子集合，問是否能用不超過 $k$ 個子集合覆蓋整個 universe。</li>
    <li><b>EXACT COVER</b>：問是否存在若干子集合，使它們恰好不重疊地覆蓋整個 universe。</li>
    <li><b>TRAVELLING SALESMAN DECISION PROBLEM</b>：給定距離上界 $B$，問是否存在一條總長度不超過 $B$ 的巡迴路徑。</li>
  </ul>
</div>

## Karp's 21 $NP$-Complete Problems

Richard Karp 在 1972 年的經典論文 **“Reducibility Among Combinatorial Problems”** 中，整理並證明了 21 個著名的 combinatorial problems 都是 $NP$-complete。這份清單是複雜度理論史上非常重要的里程碑，因為它顯示 $NP$-completeness 並不是 SAT 的孤立現象，而是廣泛存在於圖論、邏輯、集合系統、排序與最佳化等許多領域。

常見整理下，Karp 的 21 個問題包括：

<div class="example">
  <b>Karp's 21 problems.</b>
  <ol>
    <li>Satisfiability (SAT)</li>
    <li>0–1 Integer Programming</li>
    <li>Clique</li>
    <li>Set Packing</li>
    <li>Vertex Cover</li>
    <li>Set Covering</li>
    <li>Feedback Node Set</li>
    <li>Feedback Arc Set</li>
    <li>Directed Hamiltonian Circuit</li>
    <li>Hamiltonian Circuit</li>
    <li>Satisfiability of Boolean expressions in CNF with 3 literals per clause (3-SAT)</li>
    <li>Chromatic Number</li>
    <li>Clique Cover</li>
    <li>Exact Cover</li>
    <li>Hitting Set</li>
    <li>Steiner Tree</li>
    <li>3-Dimensional Matching</li>
    <li>Knapsack</li>
    <li>Job Sequencing</li>
    <li>Partition</li>
    <li>Max Cut</li>
  </ol>
</div>

<div class="remark">
  <b>Remark.</b>
  不同教材或條目在名稱翻譯、決定問題版本、圖是否有向、以及某些問題的標題上，可能會出現些微差異；但核心意思是一樣的：Karp 透過 polynomial-time reductions 建立了一批具有代表性的 $NP$-complete 問題，讓後續的 $NP$-completeness 證明可以從這些問題作為起點繼續展開。
</div>

## Why This List Matters

Karp 的 21 個問題之所以重要，不只是因為它們本身困難，而是因為它們建立了一種證明方法。當要證明一個新問題是 $NP$-complete 時，通常不需要從頭證明「所有 $NP$ 問題都可以 reduce 到它」，而是只要從某個已知的 $NP$-complete 問題出發，構造一個 polynomial-time reduction 即可。

這就是為什麼在實際複雜度理論中，reduction 是核心工具，而 Karp 的清單則像是一組「基準問題」。只要熟悉其中幾個最常見的問題，例如 SAT、3-SAT、CLIQUE、VERTEX COVER、HAMILTONIAN CYCLE、3-COLOURING 與 KNAPSACK，通常就已經能讀懂大量的 $NP$-completeness 證明。

## Relations Among Some Standard Problems

許多經典問題之間有非常自然的對應關係。例如在圖論中：

<ul>
  <li>圖 $G$ 中的 clique，對應到補圖 $\overline{G}$ 中的 independent set。</li>
  <li>一個 vertex cover 的補集合，對應到一個 independent set。</li>
</ul>

因此，CLIQUE、INDEPENDENT SET 與 VERTEX COVER 這三個問題經常一起出現，因為它們之間的 reduction 與結構對應都很直接。這也是學習 $NP$-complete 問題時最常先掌握的一組例子。

## A Note on Decision vs Optimization

許多知名問題在日常語言中通常是以「最佳化問題」的形式出現，例如：

<ul>
  <li>最短 travelling salesman tour 是多短？</li>
  <li>最小 vertex cover 有多小？</li>
  <li>最大 clique 有多大？</li>
</ul>

但在複雜度理論裡，$NP$-complete 通常是指它們的 **decision version**，也就是改問：

<ul>
  <li>是否存在長度不超過 $B$ 的 TSP tour？</li>
  <li>是否存在大小至多為 $k$ 的 vertex cover？</li>
  <li>是否存在大小至少為 $k$ 的 clique？</li>
</ul>

這樣做的目的，是把所有問題放到統一的 yes/no 框架中，才能納入 $P$、$NP$ 與 $NP$-complete 的分類。

## Closing Remark

$NP$-complete 問題之所以重要，在於它們提供了一個理解計算困難度的共同語言。它們告訴我們：不同領域中看似完全不同的問題，可能其實共享同樣層級的困難性。從 SAT 到圖著色，從 Hamiltonian cycle 到 knapsack，這些問題共同構成了複雜度理論中最核心的一張地圖。

## References

- Richard M. Karp, *Reducibility Among Combinatorial Problems*, 1972.
- Wikipedia contributors, *NP-completeness*. [Wikipedia](https://en.wikipedia.org/wiki/NP-completeness)
- 維基百科 contributors，〈NP完全〉。[中文維基百科](https://zh.wikipedia.org/zh-tw/NP%E5%AE%8C%E5%85%A8)
