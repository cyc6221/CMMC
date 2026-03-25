---
layout: page
title: Randomized Complexity Classes
date: 2026-03-25
last_updated: 2026-03-25
tags: [complexity-theory, randomized-algorithm, RP, BPP, ZPP]
---

隨機化複雜度類別用來描述：當演算法可以使用 randomness 時，哪些 decision problems 仍然能在 polynomial time 內有效處理。與 deterministic complexity classes 不同，這裡的重點不只是在執行時間，還包括錯誤發生的方式，以及演算法是否保證終止。

在進入 $RP$、$BPP$、$ZPP$ 之前，可以先分別參考三種典型的 randomized algorithms：

- [Monte Carlo Algorithm]({{ "/articles/CryptoAnIntro/monte-carlo-algorithm/" | relative_url }})
- [Atlantic City Algorithm]({{ "/articles/CryptoAnIntro/atlantic-city-algorithm/" | relative_url }})
- [Las Vegas Algorithm]({{ "/articles/CryptoAnIntro/las-vegas-algorithm/" | relative_url }})

這三種模型分別對應到單邊錯誤、雙邊錯誤，以及零錯誤但可能不終止的情況；而 $RP$、$BPP$、$ZPP$ 則是它們在 complexity theory 中的對應類別。

## Random Witnesses and Decision Problems

設 $DP$ 是一個 decision problem，$S$ 是所有 answer 為 yes 的 instances 所形成的集合。對於輸入 instance $I$，隨機化演算法可視為除了讀取 $I$ 之外，還額外讀取一個隨機字串 $w$，並根據 $(I,w)$ 的組合輸出 yes 或 no。

這樣的觀點很重要，因為在定義 randomized complexity classes 時，常會把 randomness 看成某種隨機選出的 witness，然後用「對多少比例的 $w$，演算法輸出正確答案」來描述其正確性。

## Class $RP$

<div class="definition">
<strong>Definition.</strong>
A decision problem $DP$ is said to be in the class $RP$ if there exists an algorithm $A(I,w)$ running in polynomial time such that
<ul>
  <li>if $I \in S$, then for at least half of the witnesses $w$, the algorithm outputs "$I \in S$";</li>
  <li>if $I \notin S$, then for all witnesses $w$, the algorithm outputs "$I \notin S$".</li>
</ul>
</div>

$RP$ 對應的是 one-sided error 的情況。若 instance 的正確答案是 no，演算法永遠不會誤判成 yes；若正確答案是 yes，則演算法至少有固定常數機率成功接受。

這正是 [Monte Carlo Algorithm]({{ "/articles/CryptoAnIntro/monte-carlo-algorithm/" | relative_url }}) 在 complexity class 上的對應版本。重點不在於成功機率剛好是 $1/2$，而是在於它大於 $0$ 且可以透過重複執行放大成功率。

<div class="remark">
<strong>Remark.</strong>
The error in $RP$ is one-sided: false positives are impossible, while false negatives may occur with bounded probability.
</div>

## Class $BPP$

<div class="definition">
<strong>Definition.</strong>
A decision problem $DP$ is said to be in the class $BPP$ if there exists an algorithm $A(I,w)$ running in polynomial time such that
<ul>
  <li>if $I \in S$, then for at least $\frac{2}{3}$ of the witnesses $w$, the algorithm outputs "$I \in S$";</li>
  <li>if $I \notin S$, then for at least $\frac{2}{3}$ of the witnesses $w$, the algorithm outputs "$I \notin S$".</li>
</ul>
</div>

$BPP$ 允許 yes 與 no 兩邊都發生錯誤，但要求正確率至少高於 $1/2$ 一個固定常數。這表示演算法雖然可能判錯，卻可以藉由 repeated trials 與 majority vote 把錯誤機率壓低到指數小。

這對應到 [Atlantic City Algorithm]({{ "/articles/CryptoAnIntro/atlantic-city-algorithm/" | relative_url }}) 的模型，也就是 polynomial-time、two-sided error 的 randomized algorithm。

<div class="remark">
<strong>Remark.</strong>
The constants $\frac{1}{2}$ and $\frac{2}{3}$ are not essential. Any fixed success probability strictly greater than $\frac{1}{2}$ can be amplified by repetition.
</div>

## Class $ZPP$

<div class="definition">
<strong>Definition.</strong>
The class $ZPP$ is defined by
$$
ZPP = RP \cap co\text{-}RP.
$$
</div>

$ZPP$ 表示一個問題同時屬於 $RP$ 與 $co$-$RP$。直觀上，這代表 yes 與 no 兩邊都能以 one-sided error 的方式處理，因此可以進一步組合成 zero-error 的 randomized computation。

它對應到 [Las Vegas Algorithm]({{ "/articles/CryptoAnIntro/las-vegas-algorithm/" | relative_url }})：演算法一旦輸出答案，就一定正確，但可能需要隨機時間，或在某些表述下可能不保證立即終止。

<div class="remark">
<strong>Remark.</strong>
$ZPP$ captures the idea of randomized polynomial-time computation with zero error.
</div>

## Containment Relations

課文通常會列出這些基本包含關係：

$$
P \subseteq ZPP \subseteq RP \subseteq NP
$$

以及

$$
ZPP \subseteq BPP.
$$

這些關係反映了：deterministic polynomial-time computation 可以視為 randomized computation 的特例，而 zero-error 與 one-sided error 類別又都自然包含在 bounded-error computation 的框架中。

<div class="remark">
<strong>Remark.</strong>
These containments describe what is known unconditionally. Whether some of these inclusions are strict remains open.
</div>

## Error Reduction

對於 $RP$ 與 $BPP$，一個重要觀念是 error reduction。若單次執行的成功率只是一個固定常數，只要獨立重複執行多次，就能把整體錯誤機率壓得非常小。

對 $RP$ 而言，只要多次嘗試並在任一次接受時輸出 yes，就能降低 false negative 的機率。對 $BPP$ 而言，則可用 majority vote 來降低雙邊錯誤。

這也是 randomized algorithms 在實務上很重要的一點：即使單次執行帶有隨機性，只要錯誤率可放大控制，仍然可以視為可靠的有效率計算。

## Example: Primality Testing

隨機化複雜度類別的一個經典例子是 primality testing。

像 Fermat test 與 Miller--Rabin test，會把 compositeness 的檢測放在 one-sided error 的框架下，因此可視為與 $RP$ 相關的例子。另一方面，某些 primality proving 方法則對應到 zero-error 的觀點，因此可放到 $ZPP$ 的脈絡下理解。

這些例子顯示，randomness 不只是分析上的方便工具，而是真的能在 number-theoretic problems 中帶來有效率的演算法設計。

## Next

若想先從演算法行為本身理解這些類別，可以依序閱讀：

- [Monte Carlo Algorithm]({{ "/articles/CryptoAnIntro/monte-carlo-algorithm/" | relative_url }})
- [Atlantic City Algorithm]({{ "/articles/CryptoAnIntro/atlantic-city-algorithm/" | relative_url }})
- [Las Vegas Algorithm]({{ "/articles/CryptoAnIntro/las-vegas-algorithm/" | relative_url }})

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 19. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
