---
layout: page
title: Atlantic City Algorithm
date: 2026-03-25
last_updated: 2026-03-25
tags: [randomized-algorithm, BPP]
---

Atlantic City algorithm 是 randomized algorithm 的一種典型模型。它要求演算法在 polynomial time 內停止，但允許演算法在 yes-instance 與 no-instance 上都以小機率輸出錯誤答案，因此屬於 **two-sided error** 的隨機化計算模型。

在 complexity theory 中，Atlantic City algorithm 對應到 complexity class $BPP$，因此它代表的是 **bounded-error polynomial-time randomized computation**。

<div class="remark">
<strong>Atlantic City Algorithm</strong>
<ul>
  <li>It always halts in polynomial time.</li>
  <li>If the correct answer is <b>true</b>, it outputs <b>true</b> with probability at least $\frac{2}{3}$.</li>
  <li>If the correct answer is <b>false</b>, it outputs <b>false</b> with probability at least $\frac{2}{3}$.</li>
</ul>
</div>

## Basic Idea

在 randomized computation 中，有些演算法雖然不能保證每次都完全正確，但可以保證每次執行都很快，而且正確率穩定高於隨機猜測。Atlantic City algorithm 描述的正是這種情形：演算法一定會在 polynomial time 內結束，並且無論正確答案是 yes 或 no，都有固定常數機率輸出正確答案。

這種模型的重點不在於「完全不犯錯」，而在於錯誤機率被嚴格控制在一個固定界限之下。只要單次執行的成功率嚴格大於 $\frac{1}{2}$，就能利用 repetition 把整體錯誤機率有效降低。

## Definition

<div class="definition">
<strong>Definition.</strong>
An Atlantic City algorithm is a randomized algorithm running in polynomial time such that
<ul>
  <li>if the correct answer is true, then the algorithm outputs true with probability at least $\frac{2}{3}$;</li>
  <li>if the correct answer is false, then the algorithm outputs false with probability at least $\frac{2}{3}$.</li>
</ul>
</div>

這個定義表示，演算法在兩種情況下都可能犯錯，但每一邊的錯誤機率都被限制在至多 $\frac{1}{3}$。因此，Atlantic City algorithm 的本質不是 one-sided guarantee，而是 **two-sided bounded error**。

<div class="remark">
<strong>Remark.</strong>
An Atlantic City algorithm may make both false positives and false negatives, but each occurs only with bounded probability.
</div>

## Two-Sided Error

Atlantic City algorithm 的核心特徵是 **two-sided error**。若把輸入區分為 yes-instance 與 no-instance，則它的行為可以理解為：

- 對 yes-instance，大多數情況下會接受；
- 對 no-instance，大多數情況下會拒絕。

也就是說，兩邊都存在誤判的可能性，但誤判機率都不會太大。這種模型比 one-sided error 更一般，因為它不要求演算法把錯誤侷限在某一個方向，而只要求整體判斷在兩邊都保持足夠高的正確率。

## Why It Is Useful

Atlantic City algorithm 的重要性在於，它為許多「難以做到完全正確、但可以做到高機率正確」的問題提供了一個自然的計算模型。

有些問題不容易設計出只在單一方向出錯的演算法，但仍然可以做到：

- 每次執行都在 polynomial time 內完成；
- 輸出答案的正確率穩定高於 $\frac{1}{2}$；
- 經由獨立重複執行，可以把最終錯誤率降得非常低。

因此，允許 two-sided error 並不表示演算法不可靠；相反地，只要錯誤率可控，這種模型仍然具有很高的理論價值與實用性。

## Error Reduction by Majority Vote

假設某個 Atlantic City algorithm 單次執行輸出正確答案的機率至少為 $\frac{2}{3}$。若將它獨立重複執行 $k$ 次，並用 majority vote 作為最終輸出，那麼整體錯誤機率會隨著 $k$ 的增加而快速下降。

其直觀原因在於：每一次執行都偏向正確答案，因此多數決會把這種偏向累積起來。當重複次數足夠多時，最終結果偏離正確答案的機率會呈指數衰減。

<div class="remark">
<strong>Remark.</strong>
The constant $\frac{2}{3}$ is not essential. Any fixed success probability strictly greater than $\frac{1}{2}$ can be amplified by independent repetition and majority vote.
</div>

因此，Atlantic City algorithm 的重點不在於單次執行必須完美，而在於它已經具備一個穩定的正確性偏差，這就足以透過 amplification 建立高可靠度的演算法。

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

因此，$BPP$ 所描述的正是 bounded-error polynomial-time randomized computation，而 Atlantic City algorithm 則可以看成這個複雜度類別在演算法層次上的具體表現。

## Comparison with Other Randomized Algorithms

從停止性與錯誤型態來看，Atlantic City algorithm 可以和另外兩類常見的 randomized algorithms 對照理解：

- **Monte Carlo algorithm**：一定在 polynomial time 內停止，但通常只允許 one-sided error；
- **Atlantic City algorithm**：一定在 polynomial time 內停止，但允許 two-sided error；
- **Las Vegas algorithm**：不會輸出錯誤答案，但停止時間可能是隨機的。

Atlantic City algorithm 所代表的妥協方式，是接受一個小而可控制的錯誤機率，換取穩定而有效率的執行時間。這使它成為 randomized complexity theory 中最自然、也最重要的模型之一。

## See also

- [Randomized Complexity Classes]({{ "/articles/CryptoAnIntro/randomized-complexity-classes/" | relative_url }})
- [Monte Carlo Algorithm]({{ "/articles/CryptoAnIntro/monte-carlo-algorithm/" | relative_url }})
- [Las Vegas Algorithm]({{ "/articles/CryptoAnIntro/las-vegas-algorithm/" | relative_url }})

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 19. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
