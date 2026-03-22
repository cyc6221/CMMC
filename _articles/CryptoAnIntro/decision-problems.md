---
layout: page
title: Decision Problems
date: 2026-03-22
last_updated: 2026-03-22
tags: []
---

在複雜度理論中，最基本的出發點之一就是 **decision problem（判定問題）**。作者先提醒，密碼學裡常見的一個錯誤，是把某些「只在少數特殊實例上很難」的問題誤當成真正適合拿來做密碼基礎的困難問題；因此在進入更深入的密碼學討論之前，需要先回顧一些複雜度理論中的基本概念。:contentReference[oaicite:0]{index=0}

## What is a Decision Problem?

所謂 **decision problem**，就是答案只有 **yes/no** 的問題。輸入是一個 instance（實例），通常會被編碼成某種形式，例如長度為 \(n\) 的二進位字串。很多時候，我們可以把所有可能輸入看成一個集合 \(I\)，再指定其中一個子集合 \(S\)，而判定問題的本質就是：

\[
\text{給定 } I \text{ 中的一個 instance，判斷它是否屬於 } S.
\]

也就是在問：

\[
\text{Is } I \in S ?
\]

這種寫法的好處是，許多不同領域的問題都能被統一地放進同一個框架中討論。:contentReference[oaicite:1]{index=1}

## Basic Examples

### Primality

第一個例子是質數判定。令 \(I\) 為所有整數，令 \(S\) 為所有質數所形成的子集合，則對應的 decision problem 就是：

> 給定一個整數，判斷它是不是質數。

這是一個很典型的 yes/no 問題。:contentReference[oaicite:2]{index=2}

### Graph Colouring

第二個例子是圖著色問題。令 \(I\) 為所有圖，令 \(S\) 為所有可以用 \(k\) 種顏色著色的圖，則對應的 decision problem 為：

> 給定一張圖，判斷它是否可以只用 \(k\) 種顏色完成著色。

這裡所謂的 \(k\)-colourable，是指能把 \(k\) 個顏色指派給每個頂點，並且每一條邊連接的兩個頂點都不會被染成相同顏色。:contentReference[oaicite:3]{index=3}

這個例子很重要，因為它說明了：即使原本看起來像是「建構一個著色方案」的問題，也可以先轉寫成單純的 yes/no 判定形式。

## Turning Computational Problems into Decision Problems

作者接著強調，雖然前面只談 decision problem，但很多一般的計算問題都可以改寫成 decision problem。書中用一個密碼學裡很重要的例子來說明：**knapsack problem**。:contentReference[oaicite:4]{index=4}

## Decision Knapsack Problem

**Decision Knapsack Problem** 的定義如下：

給定 \(n\) 個物品，每個物品有不同的重量 \(w_i\)，問是否可以挑選其中某些物品，使得它們的總重量剛好等於指定值 \(S\)。形式化地說，就是問是否存在

\[
b_i \in \{0,1\}
\]

使得

\[
S = b_1w_1 + b_2w_2 + \cdots + b_nw_n.
\]

其中 \(b_i = 1\) 表示選擇第 \(i\) 個物品，\(b_i = 0\) 表示不選。因為最後只問「是否存在這樣的選法」，所以它是一個 decision problem。作者也提到，這個問題在最壞情況下的求解時間看起來會隨著物品數目呈指數成長。:contentReference[oaicite:5]{index=5}

## From Decision Version to Search Version

雖然前面的版本只問「有沒有解」，但我們也可以問更進一步的問題：

> 如果真的有解，那能不能把那些 \(b_i\) 的值找出來？

這就是一般的 **Knapsack Problem**。它不只要求回答 yes/no，還要求實際找出解：

\[
S = b_1w_1 + b_2w_2 + \cdots + b_nw_n.
\]

書中假設這樣的解唯一。:contentReference[oaicite:6]{index=6}

這裡的重要觀念是：**一個一般的計算問題，往往可以先考慮它對應的 decision version**。先研究 decision version，通常更適合放到複雜度理論的框架中分析。

## Why the Decision Version Matters

作者接著指出，如果我們已經有一個能回答 decision knapsack problem 的 oracle，那麼其實可以進一步把真正的 knapsack 解也一步步找出來。也就是說，若能回答「這個 instance 有沒有解」，就能進一步幫助我們回答「解是什麼」。:contentReference[oaicite:7]{index=7}

書中的想法是：先詢問整個 instance 是否有解；若有，再逐步測試某個物品是否能出現在答案裡，並相應更新剩下的目標重量 \(T\)。透過這種方式，可以一個一個決定每個 \(b_i\) 的值。:contentReference[oaicite:8]{index=8}

這說明了一件事：**decision version 並不只是簡化版問題，它常常已經保留了原問題的重要結構**。

## Why This Viewpoint Is Useful

把問題寫成 decision problem 有幾個好處。

第一，它讓不同型態的問題能用一致的方式表述。無論是數論中的 primality，還是圖論中的 colouring，甚至是密碼學中的 knapsack，都能用「某個 instance 是否屬於某個集合」的形式理解。:contentReference[oaicite:9]{index=9}

第二，這種表述方式非常適合後續定義複雜度類別，例如 \(P\)、\(NP\)、\(co\text{-}NP\) 等。因為這些類別本質上就是在分類：哪些 yes/no 問題能快速解決，哪些 yes/no 問題雖然不一定能快速解決，但可以快速驗證。:contentReference[oaicite:10]{index=10} :contentReference[oaicite:11]{index=11}

第三，這也解釋了為什麼在理論計算機科學與密碼學中，常常不是直接問「怎麼找答案」，而是先問「能不能判斷答案是否存在」。這樣的轉換不是形式上的小技巧，而是整個複雜度理論的標準語言。:contentReference[oaicite:12]{index=12} :contentReference[oaicite:13]{index=13}

## Summary

本節的核心可以整理成三點：

1. **Decision problem** 是答案只有 yes/no 的問題，可以抽象成判斷某個 instance 是否屬於集合 \(S\)。:contentReference[oaicite:14]{index=14}  
2. 很多看似一般的計算問題，都能先轉寫成 decision problem，例如 primality、graph colouring 與 decision knapsack problem。:contentReference[oaicite:15]{index=15}  
3. Decision version 並不只是簡化形式；在 knapsack 的例子中，若已知 decision version 的 oracle，便能進一步求出原本的解。:contentReference[oaicite:16]{index=16} :contentReference[oaicite:17]{index=17}

因此，在開始討論 \(P\)、\(NP\) 與 NP-completeness 之前，先理解 decision problem 的語言與角色，是很自然也很必要的一步。
