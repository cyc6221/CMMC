---
layout: page
title: "[BD20] Quantitative Comparison for 4.1"
author1: "Mihir Bellare"
author2: "Wei Dai"
venue: "INDOCRYPT 2020"
date: 2026-04-17
last_updated: 2026-04-17
label: "paper"
tags: [square-root-barrier, paper, MBDL]
---

This note records the quantitative comparison for [4.1 Schnorr Identification from MBDL]({{ "/articles/paper/BD20/BD20-4.1/" | relative_url }}) in [chapter 4 Schnorr Identification and Signatures from MBDL]({{ "/articles/paper/BD20/BD20-4/" | relative_url }}) of [the paper]({{ "/articles/paper/BD20/" | relative_url }})<a class="cite" href="#bib-bd20">BD20</a>. Related notes include [Proof of Theorem 4.1]({{ "/articles/paper/BD20/proof-of-thm-4.1/" | relative_url }}) and [4.2 Schnorr Signature from MBDL]({{ "/articles/paper/BD20/BD20-4.2/" | relative_url }}).

- [1 Introduction]({{ "/articles/paper/BD20/BD20-1/" | relative_url }})
- [2 Preliminaries]({{ "/articles/paper/BD20/BD20-2/" | relative_url }})
- [3 The Multi-Base Discrete Logarithm Problem]({{ "/articles/paper/BD20/BD20-3/" | relative_url }})
- [4 Schnorr Identification and Signatures from MBDL]({{ "/articles/paper/BD20/BD20-4/" | relative_url }})
- [5 MBDL hardness in the Generic Group Model]({{ "/articles/paper/BD20/BD20-5/" | relative_url }})
- [A Okamoto Identification and Signature from MBDL]({{ "/articles/paper/BD20/BD20-A/" | relative_url }})
- [B Ratio-based tightness]({{ "/articles/paper/BD20/BD20-B/" | relative_url }})

---

## Quantitative Comparison

具體安全性的改進，最終會反映為效率的提升，因為在固定安全等級下，可以使用較小的參數，因此 scheme algorithms 會更快。這裡對此作量化，觀察式 (8) 相較於式 (7)，對 identification scheme 的效率改進究竟帶來了什麼。

目標是確保：任何執行時間為 $t$ 的 adversary $A$，其優勢
$$
Adv^{\mathrm{imp\text{-}pa}}_{ID}(A)
$$
在違反
$$
\mathrm{IMP\text{-}PA}
$$
security of
$$
ID=\mathrm{SchID}[G,g]
$$
時都至多為 $\epsilon$。  
在這裡，$t,\epsilon$ 是可有多種選擇的參數。例如，
$$
t = 2^{90} \text{ and } \epsilon = 2^{-32}
$$
是一種選擇，這反映了一個 128-bit security level，其中 bit-security level 定義為
$$
\log_2(t/\epsilon).
$$

scheme algorithms 的成本是群中 exponentiation 的成本，而它對元素表示大小
$$
k=\log p
$$
是三次方。  
因此，希望知道 $k$ 應取何值，才能以可證方式保證所需的安全性。  
式 (7) 與式 (8) 會導出不同的 $k$ 選擇，分別記為 $k_1$ 與 $k_2$，且
$$
k_2 < k_1 .
$$
最終將得到：式 (8) 允許 scheme 達到
$$
s=(k_1/k_2)^3
$$
倍加速。

令 $B_1$ 表示式 (7) 中提到的 DL adversary，令 $B_2$ 表示式 (8) 中提到的 1-MBDL adversary。  
要使用這些方程式，現在還需要估計它們各自的 advantage。為此，假設 $G$ 是一個群，其中與 discrete log 相關問題的安全性可由在 generic group model (GGM) 中證明的界所捕捉，而根據目前對某些 elliptic curve groups 的理解，這看起來是合理的。  
這裡忽略執行時間中的 simulation overhead，因為 $A$ 的 transcript queries 數量反映的是 identification protocol 的 online executions，理應遠小於 $A$ 的執行時間，因此取 $B_1$ 與 $B_2$ 的執行時間都大約為 $t$，亦即 IMP-PA adversary $A$ 的執行時間。

經典的 Shoup 結果 <a class="cite" href="#bib-sho97">Sho97</a> 給出
$$
Adv^{\mathrm{dl}}_{G,g}(B_1) \approx \frac{t^2}{p},
$$
而 Theorem 5.1 說明
$$
Adv^{\mathrm{mbdl}}_{G,g,1}(B_2) \approx \frac{t^2}{p}.
$$

這裡特別指出：這兩個界相同，是 1-MBDL assumption 的一個核心特徵。  
Theorem 4.1（如 Figure 1 所示）所帶來的效率改進，不只是因為式 (8) 的 reduction 是 tight 的，也來自於 1-MBDL problem 與 DL problem 一樣難解，也就是說
$$
Adv^{\mathrm{mbdl}}_{G,g,1}(B_2) \approx Adv^{\mathrm{dl}}_{G,g}(B_1) \approx \frac{t^2}{p}.
$$

接著，把目前所得結論整理起來，對 $A$ 的 IMP-PA advantage 便得到兩個界：第一個來自式 (7)，第二個來自式 (8)，並略去 $1/p$ 項，得到
$$
Adv^{\mathrm{imp\text{-}pa}}_{ID}(A) \le \epsilon_1(t) = \sqrt{\frac{t^2}{p}} = \frac{t}{\sqrt{p}} \tag{11}
$$
以及
$$
Adv^{\mathrm{imp\text{-}pa}}_{ID}(A) \le \epsilon_2(t) = \frac{t^2}{p}. \tag{12}
$$

回顧目標，是要確保
$$
Adv^{\mathrm{imp\text{-}pa}}_{\mathrm{SchID}[G,g]}(A) \le \epsilon .
$$
現在問：在兩種情況下，$p$ 需取何值才能保證此事？  
在方程式
$$
\epsilon=\epsilon_1(t)
$$
與
$$
\epsilon=\epsilon_2(t)
$$
中對 $p$ 求解，可得對應的兩個值：
$$
p_1 \approx \frac{t^2}{\epsilon^2}
\quad \text{and} \quad
p_2 \approx \frac{t^2}{\epsilon}.
$$
可見
$$
p_1 > p_2,
$$
也就是說，Theorem 4.1 保證在較小大小的群中，也能達到與式 (7) 相同的安全性。最後，群元素表示大小的比值為
$$
r \approx \frac{\log(p_1)}{\log(p_2)}
\approx
\frac{\log(t^2/\epsilon)+\log(1/\epsilon)}{\log(t^2/\epsilon)}
=
1+\frac{\log(1/\epsilon)}{\log(t^2/\epsilon)}.
$$

scheme algorithms 在群中使用 exponentiation，而其時間是 cubic 的，因此速度比為
$$
s=r^3,
$$
稱之為 speedup factor，現在可以對它作數值估計。  
對若干組 $t,\epsilon$ 的值，Figure 1 顯示了在既有結果（$i=1$）與這裡的結果（$i=2$）下，為保證所需安全性所需的群大小 $p_i$ 的對數，並進一步給出 speedup $s$。

例如，若希望時間為
$$
t=2^{64}
$$
的 attacks 其 advantage 至多為
$$
\epsilon=2^{-64},
$$
則既有結果需要一個大小為 $p_1$ 的群，滿足
$$
\log(p_1) \approx 256,
$$
而這裡的結果則只需大小為 $p_2$ 的群，滿足
$$
\log(p_2) \approx 192,
$$
這會帶來
$$
2.4\times
$$
的加速。當然，還可以構造出更多類似例子。

## References

<ul class="bib">
  <li id="bib-bd20">
    <span class="bib-key">BD20</span>
    <span class="bib-body">M. Bellare and W. Dai. <i>The Multi-Base Discrete Logarithm Problem: Tight Reductions and Non-Rewinding Proofs for Schnorr Identification and Signatures.</i> In Progress in Cryptology-INDOCRYPT '20, pages 529-552, 2020.</span>
  </li>

  <li id="bib-sho97">
    <span class="bib-key">Sho97</span>
    <span class="bib-body">V. Shoup. <i>Lower bounds for discrete logarithms and related problems.</i> In W. Fumy, editor, EUROCRYPT'97, volume 1233 of LNCS, pages 256-266. Springer, Heidelberg, May 1997.</span>
  </li>
</ul>
