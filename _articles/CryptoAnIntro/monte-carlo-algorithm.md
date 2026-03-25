---
layout: page
title: Monte Carlo Algorithm
date: 2026-03-25
last_updated: 2026-03-25
tags: [randomized-algorithm, RP]
---

Monte Carlo algorithm 是 randomized algorithm 中最基本也最常見的一種模型。它的核心特徵是：演算法一定會在 polynomial time 內停止，但允許以小機率輸出錯誤答案。隨機性影響的不是是否能在有限時間內完成，而是答案是否可能在某些情況下失敗。

在複雜度理論中，這種模型特別適合描述那些能夠快速運行、並且具有可控制錯誤率的隨機化程序。其重點不只在於 running time，也在於錯誤發生的方式，以及這種錯誤能否透過 repetition 有效降低。

<div class="remark">
<strong>Monte Carlo Algorithm</strong>
<ul>
  <li> Always runs in polynomial time.</li>
  <li> May output an incorrect answer with small probability.</li>
  <li> In the one-sided error setting, the error occurs only on one side of the decision.</li>
</ul>
</div>

## Basic Idea

與 deterministic algorithm 不同，Monte Carlo algorithm 在執行過程中會使用 randomness，因此即使輸入相同，不同次執行也可能得到不同結果。不過，這種隨機性並不是毫無限制的；它必須建立在可分析的結構上。

一方面，演算法的 running time 必須受到 polynomial bound 控制，因此每次執行都能在有效率的時間內完成。另一方面，雖然輸出可能出錯，但錯誤機率必須受到固定常數的限制，而不是任意放大。這使得 Monte Carlo algorithm 並不是單純依賴運氣，而是一種可以在理論上嚴格處理的計算模型。

## Definition

<div class="definition">
<strong>Definition.</strong>
A Monte-Carlo algorithm is a randomized algorithm running in polynomial time such that
<ul>
  <li>if the correct answer is false, then the algorithm always outputs false;</li>
  <li>if the correct answer is true, then the algorithm outputs true with probability at least $\frac{1}{2}$.</li>
</ul>
</div>

這個定義描述的是 one-sided error 的情形。它保證對某一側的答案永遠不會犯錯，而另一側則允許有固定常數機率失敗。更具體地說，若正確答案是 false，演算法一定會輸出 false；若正確答案是 true，則演算法至少有 $\frac{1}{2}$ 的機率輸出 true。

<div class="remark">
<strong>Remark.</strong>
A Monte-Carlo algorithm in this form has one-sided error: it may fail to recognize a yes-instance, but it never accepts a no-instance incorrectly.
</div>

## One-Sided Error

one-sided error 是 Monte Carlo algorithm 最重要的結構特徵之一。若將 decision problem 寫成 yes/no 的形式，則它的行為可以理解為：

- 對 no-instance，一定拒絕；
- 對 yes-instance，以至少固定常數機率接受。

因此，只要演算法輸出 yes，就可以確信答案真的為 yes。真正具有不確定性的，是輸出 no 的情況，因為那有可能只是這次隨機選擇沒有成功找到證據。也正因如此，這種模型特別適合用在「尋找存在性證據」的情境：一旦找到，就能確認答案；若沒找到，則未必表示答案不存在。

## Why It Is Useful

Monte Carlo algorithm 的價值，在於它同時兼具效率與可靠性上的可控制性。

首先，它保證每次執行都在 polynomial time 內完成，因此在計算成本上是可接受的。其次，雖然單次執行可能失敗，但只要單次成功率有固定下界，就能透過重複執行來大幅降低整體錯誤率。換言之，它不要求單次執行完美無誤，而是要求單次執行已經有足夠好的表現，進而讓 amplification 成為可能。

## Error Reduction by Repetition

假設某個 yes-instance 在一次執行中被正確接受的機率至少是 $\frac{1}{2}$。若獨立重複執行 $k$ 次，並且只要其中一次接受就輸出 yes，則連續 $k$ 次都失敗的機率至多為

$$
\left(\frac{1}{2}\right)^k.
$$

因此，隨著 repetition 次數增加，錯誤率會以指數速度下降。這代表只要多做若干次獨立嘗試，就能把原本固定常數的失敗機率壓到極小。

<div class="remark">
<strong>Remark.</strong>
The constant $\frac{1}{2}$ is not essential. Any fixed success probability bounded away from $0$ can be amplified by independent repetition.
</div>

這種 amplification 現象是 randomized algorithms 中非常核心的觀念。理論上只要單次執行不是「幾乎總是失敗」，那麼經過足夠次數的獨立重複後，就能得到非常高的整體可信度。

## Relation to $RP$

Monte Carlo algorithm 在 complexity theory 中對應到 class $RP$。

<div class="definition">
<strong>Definition.</strong>
A decision problem $DP$ is in $RP$ if there exists a polynomial-time randomized algorithm such that
<ul>
  <li>if $I \in S$, then the algorithm accepts with probability at least $\frac{1}{2}$;</li>
  <li>if $I \notin S$, then the algorithm always rejects.</li>
</ul>
</div>

這只是把前述 one-sided error Monte Carlo algorithm 的性質，改用 complexity class 的語言重新表述而已。也就是說，一個問題屬於 $RP$，表示它可以在 polynomial time 中由這種具有 one-sided error 的 randomized algorithm 解決。

## Example: Compositeness Testing

Monte Carlo algorithm 的經典例子之一，是 compositeness testing 的隨機化方法。

像 Fermat test 或 Miller--Rabin test 的基本精神，都不是直接證明一個整數是 prime，而是嘗試找出它是 composite 的證據。這類方法的結構通常是：

- 若輸入確實是 prime，則不會錯誤地宣告它為 composite；
- 若輸入是 composite，則有固定常數機率找到 witness，從而輸出 composite。

這正符合 one-sided error 的形式：當證據被找到時，可以確定輸入是合數；若暫時找不到證據，則不能立刻保證它是質數，只能說本次測試未成功揭露其合數性。也因如此，重複測試能有效提高整體判斷的可靠度。

## Comparison with Other Randomized Algorithms

在 randomized computation 中，不同模型的差異通常落在「是否一定停止」與「是否允許錯誤」這兩個面向上。

Monte Carlo algorithm 的位置相當清楚：它一定會在 polynomial time 內結束，但允許小機率錯誤。若關注的是 one-sided error，則錯誤只會集中在單一方向，而不是分散在 yes 與 no 兩邊。這種結構使它成為理論分析與實際設計中都非常自然的一類隨機化模型。

## See also

- [Randomized Complexity Classes]({{ "/articles/CryptoAnIntro/randomized-complexity-classes/" | relative_url }})
- [Atlantic City Algorithm]({{ "/articles/CryptoAnIntro/atlantic-city-algorithm/" | relative_url }})
- [Las Vegas Algorithm]({{ "/articles/CryptoAnIntro/las-vegas-algorithm/" | relative_url }})

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 19. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
