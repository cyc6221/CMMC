---
layout: page
title: "[BD20] Quantitative Comparison for 4.3"
author1: "Mihir Bellare"
author2: "Wei Dai"
venue: "INDOCRYPT 2020"
date: 2026-04-17
last_updated: 2026-04-17
label: "paper"
tags: [square-root-barrier, paper, MBDL]
---

This note records the quantitative comparison for 4.3 in [chapter 4 Schnorr Identification and Signatures from MBDL]({{ "/articles/paper/BD20/BD20-4/" | relative_url }}) of [the paper]({{ "/articles/paper/BD20/" | relative_url }})<a class="cite" href="#bib-bd20">BD20</a>. Related notes include [4.1 Schnorr Identification from MBDL]({{ "/articles/paper/BD20/BD20-4.1/" | relative_url }}), [Proof of Theorem 4.1]({{ "/articles/paper/BD20/proof-of-thm-4.1/" | relative_url }}), and [Quantitative Comparison for 4.1]({{ "/articles/paper/BD20/quantitative-comparison-4.1/" | relative_url }}).

- [1 Introduction]({{ "/articles/paper/BD20/BD20-1/" | relative_url }})
- [2 Preliminaries]({{ "/articles/paper/BD20/BD20-2/" | relative_url }})
- [3 The Multi-Base Discrete Logarithm Problem]({{ "/articles/paper/BD20/BD20-3/" | relative_url }})
- [4 Schnorr Identification and Signatures from MBDL]({{ "/articles/paper/BD20/BD20-4/" | relative_url }})
- [5 MBDL hardness in the Generic Group Model]({{ "/articles/paper/BD20/BD20-5/" | relative_url }})
- [A Okamoto Identification and Signature from MBDL]({{ "/articles/paper/BD20/BD20-A/" | relative_url }})
- [B Ratio-based tightness]({{ "/articles/paper/BD20/BD20-B/" | relative_url }})

---

## Quantitative Comparison

數值比較將以最佳的既有界為準，也就是式 (15)。  
對於若干組 $t, q_h, \epsilon$ 的值，且滿足
$$
t \ge q_h = Q_H^A,
$$
Figure 1 顯示了式 (13) 相對於式 (15) 的 speedup
$$
s .
$$
表格顯示，這個 speedup 比同一圖中對 Schnorr identification 所示的稍微小一些，但仍然相當顯著。  
例如，若希望時間為
$$
t = 2^{64}
$$
的 attacks 其 advantage 至多為
$$
\epsilon = 2^{-64},
$$
則 Theorem 4.3 允許把群大小降到足以帶來
$$
5.4
$$
倍加速的程度。

為了導出這些估計，使用與 identification 部分相同的 framework 與 setup。  
令 $G$ 為一個 prime-order group，階為 $p$，generator 為 $g$。  
目標是確保：任何執行時間為 $t$、對 $H$ 發出 $q_h$ 次 queries、對 $\mathrm{SIGN}$ 發出 $q_s$ 次 queries 的 adversary $A$，在違反
$$
DS = \mathrm{SchSig}[G,g]
$$
的 UF security 時，其 advantage
$$
Adv^{\mathrm{uf}}_{DS}(A)
$$
都至多為 $\epsilon$，其中 $t, \epsilon, q_h, q_s$ 為參數。  
假設
$$
q_s \ll q_h \le t,
$$
這與實務中的情況一致。

令 $B_1, B_2$ 分別表示式 (15) 與式 (13) 中的 adversaries。  
與前面相同，假設
$$
Adv^{\mathrm{dl}}_{G,g}(B_1) \approx \frac{t^2}{p}
$$
來自 [47]，並且由 Theorem 5.1 得
$$
Adv^{\mathrm{mbdl}}_{G,g,1}(B_2) \approx \frac{t^2}{p}.
$$
則有
$$
Adv^{\mathrm{uf}}_{DS}(A)
\le
\epsilon_1(t,q_h)
\approx
\sqrt{\frac{q_h t^2}{p}}
$$
以及
$$
Adv^{\mathrm{uf}}_{DS}(A)
\le
\epsilon_2(t,q_h)
\approx
q_h \cdot \frac{t^2}{p}
=
\frac{q_h t^2}{p}
\approx
\epsilon_1(t,q_h)^2 .
$$

在上述估計中，已略去 additive term，該項的量級為
$$
\frac{q_h q_s}{p},
$$
因為對於合理的參數值——包括此處考慮的那些——它相較於其他項可以忽略不計。  
因此 $\epsilon_1, \epsilon_2$ 都不依賴 $q_s$，但要記得後者預期會比 $q_h$ 小得多。  
於是新的界 $\epsilon_2$ 大約是先前那個界的平方，因此總是更小。

接著同樣可以問：在兩種情況下，$p$ 應取何值才能確保
$$
Adv^{\mathrm{uf}}_{DS}(A) \le \epsilon ?
$$
在
$$
\epsilon_1(t,q_h) \le \epsilon
$$
中對 $p$ 求解，可得
$$
p_1 \approx \frac{t^2 q_h}{\epsilon^2},
$$
而在
$$
\epsilon_2(t,q_h) \le \epsilon
$$
中對 $p$ 求解，可得
$$
p_2 \approx \frac{t^2 q_h}{\epsilon}.
$$
與前面相同，可見
$$
p_2 < p_1,
$$
因此 Theorem 4.3 保證可在較小的群中達到所需安全性。  
群元素表示大小的比值為
$$
r \approx \frac{\log(p_1)}{\log(p_2)}
\approx
\frac{\log(t^2 q_h / \epsilon) + \log(1/\epsilon)}{\log(t^2 q_h / \epsilon)}
=
1 + \frac{\log(1/\epsilon)}{\log(t^2 q_h / \epsilon)}.
$$

如前所述，速度比（speedup factor）為
$$
s = r^3,
$$
現在可以對它作數值估計。  
對於若干組 $t, \epsilon$ 的值，Figure 1 顯示了在既有結果（$i=1$）與這裡的結果（$i=2$）下，為保證所需安全性所需的群大小 $p_i$ 的對數，並進一步顯示 speedup $s$。

## References

<ul class="bib">
  <li id="bib-bd20">
    <span class="bib-key">BD20</span>
    <span class="bib-body">M. Bellare and W. Dai. <i>The Multi-Base Discrete Logarithm Problem: Tight Reductions and Non-Rewinding Proofs for Schnorr Identification and Signatures.</i> In Progress in Cryptology-INDOCRYPT '20, pages 529-552, 2020.</span>
  </li>
</ul>
