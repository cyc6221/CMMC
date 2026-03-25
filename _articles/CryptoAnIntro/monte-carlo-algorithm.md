---
layout: page
title: Monte Carlo Algorithm
date: 2026-03-25
last_updated: 2026-03-25
tags: [randomized-algorithm, RP]
---

Monte Carlo algorithm 是最典型的 randomized algorithm 之一。它的特徵在於：演算法一定會在 polynomial time 內停止，但輸出的答案可能有小機率出錯。因此分析重點不只是 running time，還包括錯誤出現在哪一邊，以及這個錯誤機率能否有效控制。

在 randomized complexity theory 中，Monte Carlo algorithm 與 one-sided error 的觀念密切相關，並且對應到 complexity class $RP$。若想從整體角度理解它在隨機化複雜度中的位置，可參考 [Randomized Complexity Classes]({{ "/articles/CryptoAnIntro/randomized-complexity-classes/" | relative_url }}).

<div class="remark">
<ul>
  <li> Always outputs <b>false</b> if the answer is actually <b>false</b>.</li>
  <li> Answers <b>true</b> with probability $\geq 1/2$.</li>
  <li> Otherwise answers <b>false</b>, even though the actual answer is <b>true</b>.</li>
</ul>
</div>

## Basic Idea

與 deterministic algorithm 不同，Monte Carlo algorithm 在執行過程中會使用 randomness，因此即使輸入相同，不同次執行也可能得到不同結果。不過，這種隨機性並不是毫無限制的；它仍然要求：

- running time 必須受到 polynomial bound 控制；
- 錯誤只發生在某一側；
- 成功機率至少大於某個固定常數。

因此，Monte Carlo algorithm 不是「碰運氣的演算法」，而是一種可以被嚴格分析的有效率計算模型。

## Definition

<div class="definition">
<strong>Definition.</strong>
A Monte-Carlo algorithm is a randomized algorithm running in polynomial time such that
<ul>
  <li>if the correct answer is false, then the algorithm always outputs false;</li>
  <li>if the correct answer is true, then the algorithm outputs true with probability at least $\frac{1}{2}$.</li>
</ul>
</div>

這個定義強調兩件事。第一，它一定會在 polynomial time 內停止。第二，它允許錯誤，但錯誤只可能發生在 true 的那一側，也就是把 true 錯判成 false，而不會把 false 錯判成 true。

<div class="remark">
<strong>Remark.</strong>
A Monte-Carlo algorithm has one-sided error: it may fail to recognize a yes-instance, but it never accepts a no-instance incorrectly.
</div>

## One-Sided Error

Monte Carlo algorithm 最核心的特徵，就是 **one-sided error**。

若把 decision problem 寫成 yes/no 的形式，那麼它的行為可以整理成：

- 對 **no-instance**：一定拒絕；
- 對 **yes-instance**：有至少固定常數機率接受。

因此，這類演算法的錯誤不是平均分布在兩邊，而是集中在單一方向。這種結構很重要，因為它表示只要演算法輸出 yes，就可以確信答案真的為 yes；真正不可靠的是輸出 no 的情況，因為那有可能只是這次隨機選擇失敗而已。

## Why It Is Useful

雖然 Monte Carlo algorithm 可能出錯，但它仍然非常有用，因為它具備兩個關鍵優點。

第一，它的執行時間受到 polynomial bound 控制，因此每次執行都很快。第二，它的錯誤率可以透過 repetition 有效降低。只要多跑幾次，並在任一次成功時接受，就能把漏判 yes-instance 的機率壓得很低。

因此，Monte Carlo algorithm 的價值不在於單次執行永遠正確，而在於：

- 單次執行已經有不錯的成功率；
- 多次重複後可以變得非常可靠；
- 每次執行仍維持有效率。

## Error Reduction by Repetition

假設某個 yes-instance 在一次執行中被正確接受的機率至少是 $\frac{1}{2}$。若獨立重複執行 $k$ 次，並且只要其中一次接受就輸出 yes，則它連續失敗 $k$ 次的機率至多為

$$
\left(\frac{1}{2}\right)^k.
$$

這表示只要增加 repetition 次數，錯誤率就會以指數速度下降。

<div class="remark">
<strong>Remark.</strong>
The constant $\frac{1}{2}$ is not essential. Any fixed success probability bounded away from $0$ can be amplified by independent repetition.
</div>

這也是 randomized algorithms 中非常常見的技巧：單次執行只要保證一個固定常數的成功率，就足以透過 amplification 得到極高的整體可靠性。

## Relation to $RP$

Monte Carlo algorithm 在 complexity theory 中，對應到 class $RP$。

<div class="definition">
<strong>Definition.</strong>
A decision problem $DP$ is in $RP$ if there exists a polynomial-time randomized algorithm such that
<ul>
  <li>if $I \in S$, then the algorithm accepts with probability at least $\frac{1}{2}$;</li>
  <li>if $I \notin S$, then the algorithm always rejects.</li>
</ul>
</div>

這與前面的 Monte Carlo 定義本質上是同一件事，只是換成 complexity class 的語言來描述。也因此，當一個問題屬於 $RP$，就表示它可以由 one-sided error 的 Monte Carlo algorithm 在 polynomial time 內解決。

若想看更完整的整理，可參考 [Randomized Complexity Classes]({{ "/articles/CryptoAnIntro/randomized-complexity-classes/" | relative_url }}).

## Example: Compositeness Testing

Monte Carlo algorithm 的典型例子，是用來測試一個整數是否為 composite 的 randomized tests。

像 Fermat test 或 Miller--Rabin test，都不是直接「證明它是質數」，而是試圖找出它是合數的證據。它們的行為通常是：

- 若輸入是 prime，則不會誤判成 composite；
- 若輸入是 composite，則有固定常數機率找到證據並輸出 composite。

因此，這類測試正好符合 one-sided error 的結構，也就是 Monte Carlo algorithm 的標準範例。

## Comparison with Other Randomized Algorithms

Monte Carlo algorithm 與其他兩種常見 randomized algorithms 的差別可以簡單整理如下：

- 與 **Atlantic City algorithm** 相比：Monte Carlo 只有單邊錯誤，而 Atlantic City 允許雙邊錯誤。
- 與 **Las Vegas algorithm** 相比：Monte Carlo 一定停止，但可能出錯；Las Vegas 不會出錯，但可能不停止。

可以分別參考：

- [Atlantic City Algorithm]({{ "/articles/CryptoAnIntro/atlantic-city-algorithm/" | relative_url }})
- [Las Vegas Algorithm]({{ "/articles/CryptoAnIntro/las-vegas-algorithm/" | relative_url }})

## Intuition

Monte Carlo algorithm 的直觀理解可以寫成一句話：

> it always finishes quickly, but it may occasionally miss a correct yes-answer.

換句話說，它的風險不在於「亂給錯答案」，而在於「有時候找不到本來存在的證據」。只要把這個結構抓住，就比較不容易和 other randomized models 混淆。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 19. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
