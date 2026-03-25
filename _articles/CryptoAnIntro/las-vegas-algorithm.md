---
layout: page
title: Las Vegas Algorithm
date: 2026-03-25
last_updated: 2026-03-25
tags: [randomized-algorithm, ZPP]
---

Las Vegas algorithm 是 randomized algorithm 中另一個很重要的模型。它和 Monte Carlo algorithm、Atlantic City algorithm 的最大不同在於：**只要它輸出答案，答案就一定正確**。換句話說，它不容許錯誤輸出；隨機性影響的不是答案正確性，而是演算法是否會在有限時間內停止，或需要花多少時間才成功結束。

在 randomized complexity theory 中，Las Vegas algorithm 與 zero-error computation 的觀念密切相關，並對應到 complexity class $ZPP$。若想先看整體整理，可參考 [Randomized Complexity Classes]({{ "/articles/CryptoAnIntro/randomized-complexity-classes/" | relative_url }}).

<div class="remark">
<strong>Las Vegas Algorithm</strong>
<ul>
  <li> Will terminate with the correct answer with probability $\geq 1/2$.</li>
  <li> Otherwise will not terminate.</li>
</ul>
</div>

## Basic Idea

在 randomized computation 中，有些演算法選擇接受小機率錯誤，以換取固定的 polynomial running time；但 Las Vegas algorithm 走的是另一條路。它要求：

- 演算法一旦輸出答案，就必須完全正確；
- 隨機性只影響它何時成功結束；
- 因此不確定的不是 correctness，而是 termination behavior。

這使得 Las Vegas algorithm 成為 zero-error randomized computation 的自然代表。

## Definition

<div class="definition">
<strong>Definition.</strong>
A Las Vegas algorithm is a randomized algorithm such that
<ul>
  <li>whenever the algorithm terminates, the output is correct;</li>
  <li>the algorithm terminates with probability at least $\frac{1}{2}$.</li>
</ul>
</div>

根據課文的表述，Las Vegas algorithm 的特徵是：它有至少固定常數機率在一次執行中成功終止並給出正確答案；否則它可能不終止。也就是說，隨機性影響的是「這次有沒有成功完成」，而不是「完成時答案對不對」。

<div class="remark">
<strong>Remark.</strong>
A Las Vegas algorithm never outputs an incorrect answer. Its randomness affects termination rather than correctness.
</div>

## Zero Error

Las Vegas algorithm 最重要的性質，就是 **zero error**。

這代表：

- 若演算法輸出 yes，則 yes 一定正確；
- 若演算法輸出 no，則 no 也一定正確；
- 它不會給出錯誤答案。

因此，與 Monte Carlo 或 Atlantic City algorithm 相比，Las Vegas algorithm 的不確定性完全不在 correctness 上，而是在它是否能順利終止。

## Why It Is Useful

Las Vegas algorithm 的優點，在於它保留了 randomness 帶來的計算彈性，同時又不犧牲 correctness。

這樣的模型特別適合在下列情況出現：

- 想利用隨機性快速搜尋某種 certificate 或 structure；
- 找到時可以立即驗證並保證正確；
- 找不到時寧可繼續找，也不願意冒險輸出錯誤答案。

因此，它代表的是一種比較保守的隨機化策略：寧可延後結束，也不接受錯誤。

## Repetition and Expected Success

若一次執行成功終止的機率至少為 $\frac{1}{2}$，那麼反覆重新啟動演算法，就能以高機率在不多次嘗試後得到正確答案。

直觀上，每次執行都至少有固定常數機率成功，因此重複進行時，長時間一直失敗的機率會快速下降。這也是為什麼 zero-error randomized algorithms 雖然單次執行可能不保證結束，整體上仍可視為有效率的計算模式。

<div class="remark">
<strong>Remark.</strong>
The key point is not the exact constant $\frac{1}{2}$, but the existence of a constant lower bound on the probability of successful termination.
</div>

## Relation to $ZPP$

Las Vegas algorithm 在 complexity theory 中，對應到 class $ZPP$。

<div class="definition">
<strong>Definition.</strong>
The class $ZPP$ is defined by
$$
ZPP = RP \cap co\text{-}RP.
$$
</div>

直觀上，$ZPP$ 表示可以用 zero-error randomized polynomial-time computation 解決的 decision problems。它的重點不是 bounded two-sided error，也不是 one-sided error，而是完全不允許錯誤輸出。

因此，Las Vegas algorithm 可以看作是 $ZPP$ 的 algorithmic model。

## Comparison with Monte Carlo Algorithm

和 [Monte Carlo Algorithm]({{ "/articles/CryptoAnIntro/monte-carlo-algorithm/" | relative_url }}) 相比，Las Vegas algorithm 的差別非常鮮明：

- Monte Carlo algorithm：一定停止，但可能出錯；
- Las Vegas algorithm：不會出錯，但可能不停止。

所以兩者其實是在不同面向上做 trade-off：一個犧牲 correctness 的絕對保證，另一個則犧牲 termination 的絕對保證。

## Comparison with Atlantic City Algorithm

和 [Atlantic City Algorithm]({{ "/articles/CryptoAnIntro/atlantic-city-algorithm/" | relative_url }}) 相比，Las Vegas algorithm 的差別在於：

- Atlantic City algorithm：兩邊都可能出錯，但一定會在 polynomial time 結束；
- Las Vegas algorithm：輸出永遠正確，但隨機性可能影響是否終止。

因此，Las Vegas algorithm 不是 bounded-error model，而是 zero-error model。

## Example: Primality Proving

在 number-theoretic algorithms 中，某些 primality proving 方法可以放在 Las Vegas algorithm 的脈絡下理解。其想法是：演算法可能需要隨機嘗試某些結構或證明過程，但只要它成功產生輸出，就能保證該 primality conclusion 是正確的。

因此，這類方法提供了 zero-error randomized computation 的典型例子，也說明了 $ZPP$ 不只是抽象定義，而是與具體演算法設計密切相關。

## Intuition

Las Vegas algorithm 的直觀理解可以寫成一句話：

> it never lies, but it may keep trying until it succeeds.

這句話正好點出它和其他 randomized models 的根本差異：它把隨機性的風險放在時間與停止性上，而不是放在答案正確性上。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 19. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
