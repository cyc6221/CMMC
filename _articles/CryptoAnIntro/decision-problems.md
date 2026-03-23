---
layout: page
title: Decision Problems
date: 2026-03-22
last_updated: 2026-03-23
tags: [complexity-theory, decision-problems, knapsack]
---

在密碼學與複雜度理論中，討論「一個問題是否困難」之前，首先需要明確問題是如何被表述的。最基本的表述方式之一，就是 **Decision Problem**。

## Decision Problem

**Decision Problem** 就是答案只有 **yes/no** 的問題。輸入是一個 **instance（實例）**，通常會被編碼成某種形式，例如長度為 $n$ 的二進位字串。可以把所有可能輸入看成一個集合 $I$，再指定其中一個子集合 $S$，而判定問題的本質就是：

$$
\text{給定 } I \text{ 中的一個 instance，判斷它是否屬於 } S.
$$

也就是在問：

$$
\text{Is } I \in S ?
$$

這種寫法的好處在於，許多不同領域的問題都可以被放進同一個框架中討論。從這個角度看，Decision Problem 並不是某種特殊類型的題目，而是理論計算機科學描述問題的標準語言。

## Basic Examples

### Primality

**Primality Testing（質數判定）** 是最典型的例子之一。令 $I$ 為所有整數，令 $S$ 為所有質數所形成的子集合，則對應的 Decision Problem 為：

<div class="definition">
  <strong>Example. Primality Testing</strong>
  給定一個整數，判斷它是不是質數。
</div>

這是一個標準的 yes/no 問題：每個輸入最後只需要回答「是質數」或「不是質數」。

### Graph Colouring

另一個常見例子是 **Graph Colouring（圖著色問題）**。令 $I$ 為所有圖，令 $S$ 為所有可以用 $k$ 種顏色著色的圖，則對應的 Decision Problem 為：

<div class="example">
  <strong>Example. Graph Colouring</strong>
  給定一張圖，判斷它是否可以只用 $k$ 種顏色完成著色。
</div>

這裡的 $k$-colourable 是指能把 $k$ 個顏色指派給每個頂點，並且每一條邊連接的兩個頂點都不會被染成相同顏色。

這個例子說明，即使原本看起來像是「建構一個著色方案」的問題，也可以先改寫成單純的 yes/no 形式。這正是複雜度理論常採取的觀點：先研究某個問題的判定版本，再分析它的計算難度。

## Turning Computational Problems into Decision Problems

雖然複雜度理論的基本語言是 Decision Problem，但許多一般的計算問題也都可以先改寫成 Decision Problem。這種轉換在理論上非常重要，因為它讓原本要求「求出答案」的問題，先變成只要求「判斷答案是否存在」的問題，從而更容易納入複雜度類別的框架中分析。

一個典型例子就是 **knapsack problem**。

### Decision Knapsack Problem

<div class="example">
  <strong>Definition. Decision Knapsack Problem</strong>

  Given $n$ items with different weights $w_i$, determine whether there exist $b_i \in \set{0,1}$ such that $$ S = b_1 w_1 + b_2 w_2 + \cdots + b_n w_n. $$
</div>

這個版本只問是否存在一組選法，使得所選物品的總重量恰好等於指定值 $S$，因此它是一個典型的 Decision Problem。

* 其中 $b_i = 1$ 表示選擇第 $i$ 個物品，$b_i = 0$ 表示不選。

雖然 knapsack 看起來更像一個組合搜尋問題，但只要改寫成「是否存在某種選法」，它就自然成為標準的 yes/no 判定問題。這也說明，許多一般的計算問題都可以先轉化成 decision version，再放進複雜度理論的框架中分析。

### Knapsack Problem

<div class="definition">
  <strong>Definition. Knapsack Problem</strong>

  Find $b_i \in \set{0,1}$ such that $$ S = b_1 w_1 + b_2 w_2 + \cdots + b_n w_n, $$ assuming such a solution is unique.
</div>

這裡的問題不再只是問「有沒有解」，而是要求實際找出使等式成立的那組 $b_i$。換句話說，這裡要求的是 search version，而不是 decision version。

<div class="algorithm">
  <strong>Algorithm.</strong>
  <ol>
    <li>
        令 $O$ 為 decision knapsack problem 的 oracle。先查詢 $O(w_1,\dots,w_n,S)$。
        若結果為 false，則回傳 false
    </li>
    <li>令 $T=S$</li>
    <li>初始化 $b_1=b_2=\cdots=b_n=0$</li>
    <li>對 $i=1,2,\dots,n$ 依序執行下列步驟：
      <ol>
        <li>若 $T=0$ 則回傳 $ (b_1,\dots,b_n) $
        </li>
        <li>
            查詢 $ O(w_{i+1},\dots,w_n,\; T-w_i) $
            若結果為 true，則令 $ T=T-w_i \quad,\quad b_i=1 $
        </li>
      </ol>
    </li>
  </ol>
</div>

<div class="remark">
  <strong>Remark.</strong>
  這個 algorithm 說明，只要有一個能回答 decision knapsack problem 的 oracle，就不只能判斷某個 instance 是否有解，還可以進一步一步把真正的解找出來。做法是從目標值 $S$ 開始，依序判斷每個物品是否能被納入解中，並隨著選擇結果更新剩餘的目標值。透過這種方式，就可以逐步決定每個 $b_i$ 的值。
</div>

<div class="remark">
  <strong>Remark.</strong>
  這裡反映出一個重要觀念：decision version 並不只是原問題的簡化版，它往往已經保留了原問題的核心結構。以 knapsack 為例，只要能有效回答「是否存在解」，在唯一解的假設下，就能進一步還原實際的解。因此，在複雜度理論中，判定問題並不是不重要的弱化形式，而是分析計算問題時非常核心的表述方式。
</div>

## Next

**Decision Problem** 提供了一種統一且適合複雜度分析的語言，也構成了後續討論 $P$、$NP$ 與 NP-completeness 的基本出發點。理解判定問題的表述方式之後，就可以進一步進入多項式時間複雜度類別的定義與比較。

[Polynomial Complexity Classes]({{ "/articles/CryptoAnIntro/polynomial-complexity-classes/" | relative_url }})

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 19. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
