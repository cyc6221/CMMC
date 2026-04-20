---
layout: page
title: "[BD20] Proof of Theorem 4.1"
author1: "Mihir Bellare"
author2: "Wei Dai"
venue: "INDOCRYPT 2020"
date: 2026-04-15
last_updated: 2026-04-15
label: "paper"
tags: [square-root-barrier, paper, MBDL]
---

This note records the proof page for [Theorem 4.1 in chapter 4]({{ "/articles/paper/BD20/BD20-4/" | relative_url }}) of [the paper]({{ "/articles/paper/BD20/" | relative_url }})<a class="cite" href="#bib-bd20">BD20</a>. Related chapters include:

- [1 Introduction]({{ "/articles/paper/BD20/BD20-1/" | relative_url }})
- [2 Preliminaries]({{ "/articles/paper/BD20/BD20-2/" | relative_url }})
- [3 The Multi-Base Discrete Logarithm Problem]({{ "/articles/paper/BD20/BD20-3/" | relative_url }})
- [4 Schnorr Identification and Signatures from MBDL]({{ "/articles/paper/BD20/BD20-4/" | relative_url }})
  - [4.1 Schnorr Identification from MBDL]({{ "/articles/paper/BD20/BD20-4.1/" | relative_url }})
  - [4.2 Schnorr Signature from MBDL]({{ "/articles/paper/BD20/BD20-4.2/" | relative_url }})
- [5 MBDL hardness in the Generic Group Model]({{ "/articles/paper/BD20/BD20-5/" | relative_url }})
- [A Okamoto Identification and Signature from MBDL]({{ "/articles/paper/BD20/BD20-A/" | relative_url }})
- [B Ratio-based tightness]({{ "/articles/paper/BD20/BD20-B/" | relative_url }})

---

## Theorem 4.1

<div class="theorem">
<strong>Theorem 4.1</strong>
Let $\mathbb{G}$ be a group of prime order $p = \lvert \mathbb{G} \rvert$ and $g \in \mathbb{G}^\ast$ be a generator of $\mathbb{G}$.
<br>
Let $\mathrm{ID} = \mathrm{SchID}[\mathbb{G}, g]$ be the Schnorr identification scheme.
<br>
Let $\mathcal{A}$ be an adversary attacking the imp-pa security of $\mathrm{ID}$.
<br>
Then we can construct an adversary $\mathcal{B}$ such that

$$
\mathbf{Adv}^{\mathrm{imp\text{-}pa}}_{\mathrm{ID}}(\mathcal{A})
\le
\mathbf{Adv}^{\mathrm{mbdl}}_{\mathbb{G},g,1}(\mathcal{B}) + \frac{1}{p}.
$$

Additionally, $\mathrm{T}_{\mathcal{B}}$ is roughly $\mathrm{T}_{\mathcal{A}}$ plus simulation overhead
$\mathcal{O} (Q^{\mathrm{Tr}}_{\mathcal{A}} \cdot \mathrm{T}^{\mathrm{exp}}_\mathbb{G})$.
</div>

## Proof of Theorem 4.1

回顧一下，在將 Schnorr 的 IMP-PA 安全性歸約到 DL 時，所構造的 dl 對手 $\mathcal{B}$ 會將目標點 $Y$ 設為公鑰 $X$。在我們的情況下，採取相同的方法是很自然的。問題在於，如何使用離散對數 oracle $\mathrm{DLO}$ 來避免 rewinding 並得到緊的歸約。然而這一點並不明確，而且事實上 $\mathrm{DLO}$ oracle 似乎並無助於此。

我們的歸約與先前的方法不同之處在於，**不**將目標點 $Y$ 設為公鑰。相反地，我們觀察對手 $\mathcal{A}$ 的一次成功冒充。（$\mathcal{A}$ 的 transcript oracle $\mathrm{Tr}$ 的模擬仍然是透過該方案的誠實驗證者零知識性質來完成。）對手 $\mathcal{A}$ 提供 $R_\ast$，收到 $c_\ast$，然後回傳 $z_\ast$，滿足
$g^{z_\ast}=R_\ast X^{c_\ast}$，其中 $X$ 是公鑰。因此，$\mathcal{A}$ 實際上計算出了 $R_\ast X^{c_\ast}$ 的離散對數。我們使其等於我們的 mbdl challenge $Y$，也就是說，$\mathcal{B}$ 在輸入 $Y$ 時，安排 $Y=R_\ast X^{c_\ast}$。若它能成功做到這一點，則 $\mathcal{A}$ 回傳的 $z_\ast$ 的確會是 $\mathrm{DL}_{G,g}(Y)$，於是它便可輸出並獲勝。

但是，我們如何安排 $Y=R_\ast X^{c_\ast}$ 呢？這就是 $\mathrm{DLO}$ oracle 發揮作用之處。對手 $\mathcal{B}$ 將 $X$ 作為輸入給 $\mathcal{A}$，也就是說，公鑰相對於群生成元被設成 $\mathcal{B}$ 可以計算離散對數的那個底。現在，當 $\mathcal{A}$ 提供 $R_\ast$ 時，對手 $\mathcal{B}$ 回傳一個挑戰 $c_\ast$，以保證 $Y=R_\ast X^{c_\ast}$。

這表示 $$c_\ast = \mathrm{DL}_{G,X}\!\left(YR_\ast^{-1}\right)$$，而這正是 $\mathcal{B}$ 可以透過其 $\mathrm{DLO}$ oracle 計算的。

一些細節包括：$\mathrm{Init}$ 所回傳的 $X$ 是一個生成元，而公鑰則是群中的一個隨機元素，因此兩者的分布並不完全相同；以及透過 $\mathrm{DLO}$ 計算出的挑戰必須具有正確的分布。分析中將會處理這些問題。

對於形式化證明，考慮圖 5 中的遊戲。各過程會（透過註解）指出它們出現於哪些遊戲中。遊戲 $\mathrm{Gm}_1$ 包含第 2 行中的方框程式碼，而 $\mathrm{Gm}_0$ 不包含。這兩個遊戲都透過零知識模擬來實作 transcript oracle，而不是使用秘密金鑰；除此之外，$\mathrm{Gm}_0$ 與遊戲 

$$
\mathrm{Gm}^{\mathrm{imp\mbox{-}pa}}_{\mathrm{ID}}
$$

相同，因此我們有

$$
\begin{aligned}
\mathrm{Adv}^{\mathrm{imp\mbox{-}pa}}_{\mathrm{ID}}(\mathcal{A})
&=
\Pr[\mathrm{Gm}_0(\mathcal{A})] \\
&=\Pr[\mathrm{Gm}_1(\mathcal{A})]+\bigl(\Pr[\mathrm{Gm}_0(\mathcal{A})]-\Pr[\mathrm{Gm}_1(\mathcal{A})]\bigr).
\end{aligned}
$$

遊戲 $\mathrm{Gm}_0,\mathrm{Gm}_1$ 是 identical-until-bad，因此根據 Game Playing 的基本引理 [11]，我們有

$$
\Pr[\mathrm{Gm}_0(\mathcal{A})]-\Pr[\mathrm{Gm}_1(\mathcal{A})]\le \Pr[\mathrm{Gm}_1(\mathcal{A}) \text{ sets bad}] .
$$

顯然，
$$
\Pr[\mathrm{Gm}_1(\mathcal{A}) \text{ sets bad}] \le 1/p.
$$
現在我們可以改在 $\mathrm{Gm}_1$ 中工作，其中公鑰 $X$ 是 $G^\ast$ 中的一個隨機元素，而不是 $G$ 中的一個元素。我們主張

$$
\Pr[\mathrm{Gm}_1(\mathcal{A}) = \Pr[\mathrm{Gm}_2(\mathcal{A})]
\tag{9}
$$

我們現在來證明這一點。在第 4 行，遊戲 $\mathrm{Gm}_2$ 直接從 $\mathbb{Z}_p^\ast$ 中選取 $x$，就像 $\mathrm{Gm}_1$ 一樣，並且也以不同但等價的方式重寫了 $\mathrm{FIN}$。

主要需要檢查的是，$$\mathrm{Gm}_2$$ 中的 $$\mathrm{Ch}$$ 與 $$\mathrm{Gm}_1$$ 中的對應程式是等價的，也就是說第 6 行會使得 $$c_\ast$$ 在 $$\mathbb{Z}_p$$ 中均勻分布。

為此，固定 $R_\ast,X$，並定義函數
$$f_{R_\ast,X} : G\rightarrow \mathbb{Z}_p$$ 為
$$f_{R_\ast,X}(Y) = \mathrm{DL}_{G,X}(R_\ast^{-1}Y)$$。

在第 6 行收到 $c_\ast$ 之前，對手對 $Y$ 沒有任何資訊，因此若我們能證明 $f_{R_\ast,X}$ 是雙射，則該主張成立。

這確實如此，因為 $X\in G^\ast$ 是一個生成元，這表示函數
$$h_{R_\ast,X} : \mathbb{Z}_p \rightarrow G$$，定義為
$$h_{R_\ast,X}(c_\ast) = R_\ast X^{c_\ast}$$，
就是 $f_{R_\ast,X}$ 的反函數。這就證明了式 (9)。

我們現在主張，圖 5 中所示的對手 $\mathcal{B}$ 滿足

$$
\Pr[\mathrm{Gm}_2(\mathcal{A})]
\le
\mathrm{Adv}^{\mathrm{mbdl}}_{G,g,1}(\mathcal{B})
\tag{10}
$$

將上述結果合併即可完成證明，因此剩下要證明的是式 (10)。

對手 $\mathcal{B}$ 依照遊戲 $\mathrm{G}^{\mathrm{mbdl}}_{G,g,1}$ 的規則存取 oracle $\mathrm{DLO}$。

在程式中，$\mathrm{Ch}$ 與 $\mathrm{Tr}$ 是由 $\mathcal{B}$ 定義的子程序，並用來為 $\mathcal{A}$ 模擬同名的 oracle。

對手 $\mathcal{B}$ 的輸入是 challenge $Y$，其需要計算相對於底 $g$ 的離散對數；同時它還得到底 $X$，相對於此底它可以執行一次離散對數運算。

它在輸入 $X$ 下執行 $\mathcal{A}$，因此後者將其視為公鑰，這與 $\mathrm{Gm}_2$ 一致。

子程序 $\mathrm{Ch}$ 使用 $\mathrm{DLO}$ 以與 $\mathrm{Gm}_2$ 第 6 行相同的方式產生 $$c_\ast$$。它依照 $\mathrm{Gm}_2$ 第 7 行模擬 $\mathrm{Tr}$。

若 $\mathrm{Gm}_2$ 在第 9 行回傳 true，則我們有

$$
g^{z_\ast}=X^{c_\ast}R_\ast=YR_\ast^{-1}R_\ast=Y
$$

，因此 $\mathcal{B}$ 獲勝。

## References

<ul class="bib">
  <li id="bib-bd20">
    <span class="bib-key">BD20</span>
    <span class="bib-body">M. Bellare and W. Dai. <i>The Multi-Base Discrete Logarithm Problem: Tight Reductions and Non-Rewinding Proofs for Schnorr Identification and Signatures.</i> In Progress in Cryptology-INDOCRYPT '20, pages 529-552, 2020.</span>
  </li>
</ul>
