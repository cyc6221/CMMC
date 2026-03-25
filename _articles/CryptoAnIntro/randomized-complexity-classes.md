---
layout: page
title: Randomized Complexity Classes
date: 2026-03-25
last_updated: 2026-03-25
tags: [complexity-theory, randomized-algorithm, RP, BPP, ZPP]
---

隨機化複雜度類別描述的是：當演算法允許使用 randomness 時，哪些 decision problems 仍可在 polynomial time 內有效處理。與 deterministic complexity classes 相比，這裡除了執行時間之外，還必須考慮錯誤的型態與演算法是否保證終止。

三種典型的 randomized algorithms：

- [Monte Carlo Algorithm]({{ "/articles/CryptoAnIntro/monte-carlo-algorithm/" | relative_url }})
- [Atlantic City Algorithm]({{ "/articles/CryptoAnIntro/atlantic-city-algorithm/" | relative_url }})
- [Las Vegas Algorithm]({{ "/articles/CryptoAnIntro/las-vegas-algorithm/" | relative_url }})

這三種模型分別對應到單邊錯誤、雙邊錯誤，以及零錯誤但可能不終止的情形；相對應的 complexity classes 則是 $RP$、$BPP$ 與 $ZPP$。

在這些定義中，randomness 可視為演算法額外讀取的一段隨機字串 $w$。因此，randomized complexity classes 通常以「對多少比例的 $w$，演算法輸出正確答案」來描述其正確性。

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

這正是〈[Monte Carlo Algorithm]({{ "/articles/CryptoAnIntro/monte-carlo-algorithm/" | relative_url }})〉在 complexity class 上的對應版本。重點不在於成功機率剛好是 $1/2$，而是在於它大於 $0$ 且可以透過重複執行放大成功率。

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

這對應到〈[Atlantic City Algorithm]({{ "/articles/CryptoAnIntro/atlantic-city-algorithm/" | relative_url }})〉的模型，也就是 polynomial-time、two-sided error 的 randomized algorithm。

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

它對應到〈[Las Vegas Algorithm]({{ "/articles/CryptoAnIntro/las-vegas-algorithm/" | relative_url }})〉演算法一旦輸出答案，就一定正確，但可能需要隨機時間，或在某些表述下可能不保證立即終止。

<div class="remark">
<strong>Remark.</strong>
$ZPP$ captures the idea of randomized polynomial-time computation with zero error.
</div>

## Containment Relations

這些 randomized complexity classes 之間有以下基本包含關係：

$$
P \subseteq ZPP \subseteq RP \subseteq NP
$$

以及

$$
P \subseteq ZPP \subseteq co\text{-}RP \subseteq co\text{-}NP
$$

再加上

$$
RP \subseteq BPP,\qquad co\text{-}RP \subseteq BPP,
$$

因此可得

$$
ZPP = RP \cap co\text{-}RP \subseteq BPP.
$$

這些包含關係反映了幾個基本事實。首先，deterministic polynomial-time computation 可以視為 randomized computation 的特例，因此 $P$ 自然包含在這些隨機化類別之中。其次，$RP$ 描述 one-sided error 的 randomized polynomial-time computation，而 $co$-$RP$ 則是其補問題版本。當一個問題同時屬於 $RP$ 與 $co$-$RP$ 時，便得到零錯誤的類別 $ZPP$。另一方面，$BPP$ 容許 bounded two-sided error，因此自然包含 $RP$ 與 $co$-$RP$ 這兩類 one-sided error computation。

<div class="remark">
<strong>Remark.</strong>
These containments are known unconditionally. It is not known in general whether any of these inclusions are strict.
</div>

## Error Reduction

對於 $RP$ 與 $BPP$，一個重要觀念是 error reduction。若單次執行的成功率只是一個固定常數，只要獨立重複執行多次，就能把整體錯誤機率壓得非常小。

對 $RP$ 而言，只要多次嘗試並在任一次接受時輸出 yes，就能降低 false negative 的機率。對 $BPP$ 而言，則可用 majority vote 來降低雙邊錯誤。

這也是 randomized algorithms 在實務上很重要的一點：即使單次執行帶有隨機性，只要錯誤率可放大控制，仍然可以視為可靠的有效率計算。

## Example: Primality Testing

隨機化複雜度類別的一個經典例子是 primality testing 與 compositeness testing。這些例子說明：randomness 不只是分析上的輔助工具，而是確實能在 number-theoretic problems 中帶來有效率的演算法設計。

像 Fermat test 與 Miller--Rabin test，都是用來檢測一個整數是否為 composite 的 Monte Carlo algorithms。它們的特徵是：若輸入 $N$ 為 prime，演算法一定不會誤判為 composite；若 $N$ 為 composite，則演算法至少有固定常數機率偵測出這件事。因此，compositeness testing 屬於 one-sided error 的框架，可視為與 $RP$ 對應的典型例子。換句話說，

$$
\text{COMPOSITES} \in RP.
$$

這正反映了 $RP$ 的定義：對 yes-instances（此處為 composite numbers），演算法有固定常數機率接受；對 no-instances（此處為 prime numbers），演算法永遠不會誤接受。

另一方面，Adleman--Huang algorithm 提供了 primality proving 的隨機化方法。它屬於 Las Vegas 型態：演算法一旦輸出答案，答案必定正確；隨機性影響的是它是否能在某次嘗試中成功完成，而不是輸出的正確性。因此，primality testing 也可放在 zero-error randomized computation 的脈絡下理解，亦即

$$
\text{PRIMALITY} \in ZPP.
$$

這個例子同時把前面的幾個觀念串接起來：Fermat test 與 Miller--Rabin test 說明了 one-sided error 與 $RP$ 的意義；Adleman--Huang algorithm 則對應到 zero-error 與 $ZPP$。因此，primality testing 不只是隨機化演算法的應用範例，也是一個用來理解 $RP$、$ZPP$ 與不同 error models 之間關係的標準例子。

## See also

- [Monte Carlo Algorithm]({{ "/articles/CryptoAnIntro/monte-carlo-algorithm/" | relative_url }})
- [Atlantic City Algorithm]({{ "/articles/CryptoAnIntro/atlantic-city-algorithm/" | relative_url }})
- [Las Vegas Algorithm]({{ "/articles/CryptoAnIntro/las-vegas-algorithm/" | relative_url }})

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 19. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
