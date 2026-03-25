---
layout: page
title: Atlantic City Algorithm
date: 2026-03-25
last_updated: 2026-03-25
tags: [randomized-algorithm, BPP]
---

Atlantic City algorithm 是另一種典型的 randomized algorithm。它和 Monte Carlo algorithm 一樣，都要求演算法在 polynomial time 內停止；不同之處在於，Atlantic City algorithm 允許錯誤出現在 yes 與 no 兩邊，因此屬於 **two-sided error** 的模型。

在 randomized complexity theory 中，Atlantic City algorithm 對應到 complexity class $BPP$。若想先看整體脈絡，可參考 [Randomized Complexity Classes]({{ "/articles/CryptoAnIntro/randomized-complexity-classes/" | relative_url }}).

<div class="remark">
<strong>Atlantic City Algorithm</strong>
<ul>
  <li> Outputs <b>true</b> with probability $\geq 2/3$ of being correct.</li>
  <li> Outputs <b>false</b> with probability $\geq 2/3$ of being correct.</li>
</ul>
</div>

## Basic Idea

在 randomized computation 中，有些演算法雖然不能保證每次都完全正確，但可以保證：

- 每次執行都會在 polynomial time 內結束；
- 無論輸出 yes 或 no，正確率都明顯高於 $\frac{1}{2}$；
- 只要重複執行，就能把錯誤機率有效降低。

Atlantic City algorithm 正是這種 bounded-error randomized computation 的代表模型。

## Definition

<div class="definition">
<strong>Definition.</strong>
An Atlantic City algorithm is a randomized algorithm running in polynomial time such that
<ul>
  <li>if the correct answer is true, then the algorithm outputs true with probability at least $\frac{2}{3}$;</li>
  <li>if the correct answer is false, then the algorithm outputs false with probability at least $\frac{2}{3}$.</li>
</ul>
</div>

這個定義表示：不管正確答案是哪一邊，演算法都有固定常數機率給出正確答案；但 unlike Monte Carlo algorithm，它不能保證某一邊完全不出錯。

<div class="remark">
<strong>Remark.</strong>
An Atlantic City algorithm has two-sided error: both false positives and false negatives may occur, but each with bounded probability.
</div>

## Two-Sided Error

Atlantic City algorithm 的核心特徵是 **two-sided error**。若以 yes/no instance 來看，它的行為可以整理成：

- 對 **yes-instance**：大多數情況下接受；
- 對 **no-instance**：大多數情況下拒絕。

這表示 yes 與 no 兩邊都可能被誤判，但誤判機率都受到固定常數上界控制。只要正確率嚴格大於 $\frac{1}{2}$，就可以透過 repetition 將整體錯誤率快速壓低。

## Why It Is Useful

Atlantic City algorithm 的價值，在於它比 one-sided error 模型更一般。

有些問題不容易設計成「只在單一方向出錯」的演算法，但仍然可以做到：

- 每次執行都很快；
- 正確率穩定高於隨機猜測；
- 經由多次獨立執行，最終正確率變得非常高。

因此，two-sided error 並不代表演算法不可靠；相反地，只要錯誤率可控，它仍然是非常有效率且實用的計算模型。

## Error Reduction by Majority Vote

假設某個 Atlantic City algorithm 在單次執行中，輸出正確答案的機率至少為 $\frac{2}{3}$。若獨立重複執行 $k$ 次，並採用 majority vote 作為最終輸出，則整體錯誤機率會隨著 $k$ 增加而快速下降。

直觀上，因為每次執行偏向正確答案，所以多數決會把這種偏向累積起來，使得最後輸出錯誤的機率呈指數衰減。

<div class="remark">
<strong>Remark.</strong>
The constant $\frac{2}{3}$ is not essential. Any fixed success probability strictly greater than $\frac{1}{2}$ can be amplified by independent repetition and majority vote.
</div>

這也是 bounded-error randomized algorithms 的核心思想：單次執行不必完美，只要 slightly better than random guessing，就足以透過 amplification 建立高可靠度。

## Relation to $BPP$

Atlantic City algorithm 在 complexity theory 中對應到 class $BPP$。

<div class="definition">
<strong>Definition.</strong>
A decision problem $DP$ is in $BPP$ if there exists a polynomial-time randomized algorithm such that
<ul>
  <li>if $I \in S$, then the algorithm accepts with probability at least $\frac{2}{3}$;</li>
  <li>if $I \notin S$, then the algorithm rejects with probability at least $\frac{2}{3}$.</li>
</ul>
</div>

因此，$BPP$ 可以理解為 bounded-error polynomial-time randomized computation，也就是 Atlantic City algorithm 的 complexity-class 版本。

若想看與 $RP$、$ZPP$ 的對照，可參考 [Randomized Complexity Classes]({{ "/articles/CryptoAnIntro/randomized-complexity-classes/" | relative_url }}).

## Comparison with Monte Carlo Algorithm

Atlantic City algorithm 和 [Monte Carlo Algorithm]({{ "/articles/CryptoAnIntro/monte-carlo-algorithm/" | relative_url }}) 的主要差別，在於錯誤的型態。

Monte Carlo algorithm 只有單邊錯誤，也就是某一邊永遠不會判錯；Atlantic City algorithm 則允許 yes 和 no 兩邊都發生錯誤，只是兩邊的錯誤率都被 bounded。

所以可以簡單記成：

- Monte Carlo: one-sided error
- Atlantic City: two-sided error

## Comparison with Las Vegas Algorithm

和 [Las Vegas Algorithm]({{ "/articles/CryptoAnIntro/las-vegas-algorithm/" | relative_url }}) 相比，Atlantic City algorithm 的特徵是：

- Atlantic City algorithm：一定停止，但可能出錯；
- Las Vegas algorithm：不會出錯，但可能不停止。

這兩者的對比很重要，因為它們分別代表 randomized computation 中兩種不同的妥協方式：一種接受小機率錯誤來換取固定執行時間；另一種則堅持答案必須正確，但把不確定性轉移到停止時間上。

## Intuition

Atlantic City algorithm 的直觀理解可以寫成一句話：

> it always finishes quickly, and it is usually correct on both yes- and no-instances.

這種模型最關鍵的地方，不是它「可能會錯」，而是它「錯誤機率可以被有效控制並持續放大降低」。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 19. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
