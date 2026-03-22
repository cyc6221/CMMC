---
layout: page
title: Decision Problems
date: 2026-03-22
last_updated: 2026-03-22
tags: []
---

在複雜度理論中，**decision problem（判定問題）** 是最基本的出發點之一。密碼學中常見的一個觀念誤區，是把某些只在少數特殊實例上困難的問題，誤認為適合作為密碼基礎的困難問題。要避免這種混淆，就需要先掌握複雜度理論中對問題的標準描述方式。

## What is a Decision Problem?

所謂 **decision problem**，就是答案只有 **yes/no** 的問題。輸入是一個 instance（實例），通常會被編碼成某種形式，例如長度為 $n$ 的二進位字串。很多時候，可以把所有可能輸入看成一個集合 $I$，再指定其中一個子集合 $S$，而判定問題的本質就是：

$$
\text{給定 } I \text{ 中的一個 instance，判斷它是否屬於 } S.
$$

也就是在問：

$$
\text{Is } I \in S ?
$$

這種寫法的好處在於，許多不同領域的問題都可以被放進同一個框架中討論。從這個角度看，decision problem 並不是某種特殊類型的題目，而是理論計算機科學描述問題的標準語言。

## Basic Examples

### Primality

質數判定是最典型的例子之一。令 $I$ 為所有整數，令 $S$ 為所有質數所形成的子集合，則對應的 decision problem 為：

<div class="definition">
  <strong>Problem Statement.</strong>
  給定一個整數，判斷它是不是質數。
</div>

這是一個標準的 yes/no 問題：每個輸入最後只需要回答「是質數」或「不是質數」。

### Graph Colouring

另一個常見例子是圖著色問題。令 $I$ 為所有圖，令 $S$ 為所有可以用 $k$ 種顏色著色的圖，則對應的 decision problem 為：

<div class="definition">
  <strong>Problem Statement.</strong>
  給定一張圖，判斷它是否可以只用 $k$ 種顏色完成著色。
</div>

這裡所謂的 $k$-colourable，是指能把 $k$ 個顏色指派給每個頂點，並且每一條邊連接的兩個頂點都不會被染成相同顏色。

這個例子說明，即使原本看起來像是「建構一個著色方案」的問題，也可以先改寫成單純的 yes/no 形式。這正是複雜度理論常採取的觀點：先研究某個問題的判定版本，再分析它的計算難度。

## Turning Computational Problems into Decision Problems

雖然複雜度理論的基本語言是 decision problem，但許多一般的計算問題也都可以先改寫成 decision problem。這種轉換在理論上非常重要，因為它讓原本要求「求出答案」的問題，先變成只要求「判斷答案是否存在」的問題，從而更容易納入複雜度類別的框架中分析。

一個典型例子就是 **knapsack problem**。

## Decision Knapsack Problem

**Decision Knapsack Problem** 的內容如下：

給定 $n$ 個物品，每個物品有不同的重量 $w_i$，問是否可以挑選其中某些物品，使得它們的總重量剛好等於指定值 $S$。形式化地說，就是問是否存在

$$
b_i \in \{0,1\}
$$

使得

$$
S = b_1w_1 + b_2w_2 + \cdots + b_nw_n.
$$

其中 $b_i = 1$ 表示選擇第 $i$ 個物品，$b_i = 0$ 表示不選。因為最後只問「是否存在這樣的選法」，所以這是一個 decision problem。

這個例子很重要，因為它看起來不像單純的 yes/no 題目，而比較像一個組合搜尋問題；但只要把問題改寫成「是否存在某種選法」，它就自然成為 decision problem。這也說明了，很多一般的計算問題其實都能轉化成判定問題來研究。

## From Decision Version to Search Version

在 knapsack 的例子中，如果只問「有沒有解」，得到的是 decision version；如果進一步要求找出實際的解，也就是找出各個 $b_i$ 的值，那麼得到的就是 search version：

<div class="definition">
  <strong>Problem Statement.</strong>
  如果真的有解，找出使
  $$
  S = b_1w_1 + b_2w_2 + \cdots + b_nw_n
  $$
  成立的 $b_i \in \{0,1\}$。
</div>

這裡的重要觀念是：**一般計算問題往往可以先考慮它對應的 decision version**。在複雜度理論裡，decision version 通常更適合作為分析對象，因為後續定義的許多複雜度類別，本質上都是在分類哪些 yes/no 問題容易解、哪些 yes/no 問題不容易解。

## Why the Decision Version Matters

decision version 並不只是原問題的簡化版，它往往已經保留了原問題的核心結構。以 knapsack 為例，如果已經有一個能回答 decision knapsack problem 的 oracle，那麼不只可以知道「有沒有解」，還能進一步一步把真正的解找出來。

做法的想法是這樣的：先詢問整個 instance 是否有解；如果答案是 yes，再逐步測試某個物品是否能包含在答案中，並對剩下的目標重量作相應更新。透過反覆提問，就可以逐一決定每個 $b_i$ 的值。

因此，decision version 雖然表面上只問存在性，但在很多情況下，它其實已經足以提供求解原問題所需的關鍵資訊。這也是為什麼複雜度理論如此重視判定版本，而不是把它視為不重要的弱化形式。

## Why This Viewpoint Is Useful

把問題寫成 decision problem 有幾個明顯的好處。

首先，它提供了一種一致的表述方式。無論是數論中的 primality，圖論中的 colouring，還是密碼學中的 knapsack，都可以寫成「某個 instance 是否屬於某個集合」的形式。這種統一的觀點使得不同領域的問題能夠放在一起比較。

其次，這種表述方式非常適合後續定義複雜度類別，例如 $P$、$NP$、$co\text{-}NP$ 等。這些類別本質上都是在分類 yes/no 問題：哪些問題可以快速解決，哪些問題的答案雖然不一定能快速找到，但可以快速驗證。

最後，這也解釋了為什麼理論計算機科學與密碼學常常不是直接問「怎麼找答案」，而是先問「能不能判斷答案是否存在」。這種轉換不是單純的形式技巧，而是整個複雜度理論的基本語言。理解 decision problem 的角色，也就是在為後續理解 $P$、$NP$ 與 NP-completeness 打基礎。
