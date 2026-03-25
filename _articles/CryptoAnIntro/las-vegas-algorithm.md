---
layout: page
title: Las Vegas Algorithm
date: 2026-03-25
last_updated: 2026-03-25
tags: [randomized-algorithm, ZPP]
---

Las Vegas algorithm 是 randomized algorithm 中一種非常重要的模型。它的核心特徵是：**只要演算法輸出答案，該答案就一定正確**。因此，隨機性影響的不是 correctness，而是演算法是否能在某一次執行中順利終止，以及需要花多少時間才成功完成。

這種模型體現了 zero-error randomized computation 的思想：允許演算法在執行過程中依賴隨機選擇，但不容許它輸出錯誤答案。也正因如此，Las Vegas algorithm 在 randomized complexity theory 中與 complexity class $ZPP$ 密切相關。

<div class="remark">
<strong>Las Vegas Algorithm</strong>
<ul>
  <li> Will terminate with the correct answer with probability $\geq \frac{1}{2}$.</li>
  <li> Otherwise will not terminate.</li>
</ul>
</div>

## Basic Idea

在 randomized computation 中，隨機性通常用來降低計算成本或幫助搜尋結構。不過，不同的 randomized models 允許把風險放在不同地方：有些允許小機率輸出錯誤答案，有些則要求答案永遠正確，而把不確定性放在執行時間或停止行為上。Las Vegas algorithm 屬於後者。

它的基本精神是：

- 演算法一旦結束並輸出結果，該結果必定正確；
- 隨機性只影響這次執行是否成功完成；
- 因此不確定的不是答案對不對，而是這次能不能順利得到答案。

這使 Las Vegas algorithm 成為 zero-error randomized computation 的典型代表。

## Definition

<div class="definition">
<strong>Definition.</strong>
A Las Vegas algorithm is a randomized algorithm such that
<ul>
  <li>whenever the algorithm terminates, the output is correct;</li>
  <li>the algorithm terminates with probability at least $\frac{1}{2}$.</li>
</ul>
</div>

這裡的 $\frac{1}{2}$ 並不是本質上的特殊數值，而只是代表存在一個固定的常數下界，使得演算法在單次執行中有非忽略的機率成功終止。若一次執行沒有成功，它可以選擇繼續運行，或者理解為重新啟動另一輪隨機化過程。

<div class="remark">
<strong>Remark.</strong>
A Las Vegas algorithm never outputs an incorrect answer. Its randomness affects termination rather than correctness.
</div>

## Zero-Error Property

Las Vegas algorithm 最重要的性質就是 **zero error**。這表示它不會輸出錯誤的 yes，也不會輸出錯誤的 no。對於 decision problem 而言，只要它做出了判定，該判定就一定正確。

因此，Las Vegas algorithm 的風險不在於「可能答錯」，而在於「這次是否能成功結束」。這種結構和 bounded-error randomized computation 有本質上的不同：後者接受小機率錯誤，以換取每次都能在固定時間內完成；前者則拒絕錯誤輸出，把隨機性的影響留在 termination behavior 上。

## Why It Is Useful

Las Vegas algorithm 的價值，在於它同時保留了 randomness 的彈性與 correctness 的絕對保證。這種模式特別適合那些可以透過隨機方法搜尋某種 structure、witness 或 certificate，而一旦找到之後又能快速驗證其正確性的情況。

在這類問題中，演算法可以透過反覆嘗試不同的隨機選擇來尋找成功路徑；若尚未成功，寧可繼續嘗試，也不願輸出未經保證的答案。這反映出一種較為保守的隨機化策略：寧可把不確定性放在時間上，也不把不確定性放在答案上。

## Repetition and Expected Efficiency

若單次執行成功終止的機率至少為某個固定常數，例如 $\frac{1}{2}$，那麼把演算法反覆重新啟動，就能使長時間一直失敗的機率快速下降。也就是說，雖然某一次執行不保證一定完成，但整體而言，它仍可能在期望意義下具有良好的效率。

這也是 Las Vegas algorithm 與 zero-error polynomial-time computation 連結的重要原因：它不要求每一次執行都在固定時間內成功，而是要求整體計算在期望上仍然有效率。

<div class="remark">
<strong>Remark.</strong>
The key point is not the exact constant $\frac{1}{2}$, but the existence of a constant lower bound on the probability of successful termination.
</div>

## Relation to $ZPP$

Las Vegas algorithm 在 complexity theory 中對應到 class $ZPP$。

<div class="definition">
<strong>Definition.</strong>
The class $ZPP$ is defined by
$$
ZPP = RP \cap co\text{-}RP.
$$
</div>

直觀上，$ZPP$ 表示可以由 zero-error randomized polynomial-time computation 解決的 decision problems。它不像 $RP$ 那樣只允許 one-sided error，也不像 $BPP$ 那樣允許 two-sided bounded error；相反地，它要求演算法完全不輸出錯誤答案，並把隨機性的角色限制在執行過程與停止行為上。

因此，Las Vegas algorithm 可以看作 $ZPP$ 的自然 algorithmic model。

## Comparison with Other Randomized Models

Las Vegas algorithm 與其他 randomized models 的差異，主要在於 correctness 與 termination 之間的取捨方式不同。

- **Monte Carlo algorithm**：一定停止，但可能以小機率輸出錯誤答案。
- **Atlantic City algorithm**：一定在 polynomial time 內停止，但 yes 與 no 兩邊都可能出錯。
- **Las Vegas algorithm**：輸出永遠正確，但不保證每次執行都會成功終止。

因此，Las Vegas algorithm 並不是 bounded-error model，而是 zero-error model。它的重點不是限制錯誤機率，而是完全排除錯誤輸出的可能性。

## Example: Primality Proving

在 number-theoretic algorithms 中，某些 primality proving 方法可以放在 Las Vegas algorithm 的脈絡下理解。其基本想法是：演算法可能需要依賴隨機選擇去尋找某種證明結構或輔助資訊，但只要它成功產生輸出，該輸出所支持的 primality conclusion 就是正確的。

這類例子說明，Las Vegas algorithm 並不只是理論上的抽象模型，而是和實際演算法設計有密切關聯。隨機性在其中扮演的是搜尋與加速的角色，而不是降低答案可靠性的代價。

### See also

- [Randomized Complexity Classes]({{ "/articles/CryptoAnIntro/randomized-complexity-classes/" | relative_url }})
- [Monte Carlo Algorithm]({{ "/articles/CryptoAnIntro/monte-carlo-algorithm/" | relative_url }})
- [Atlantic City Algorithm]({{ "/articles/CryptoAnIntro/atlantic-city-algorithm/" | relative_url }})

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 19. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
