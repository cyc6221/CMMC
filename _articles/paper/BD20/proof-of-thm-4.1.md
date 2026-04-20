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

在將 Schnorr 的 IMP-PA 安全性歸約到 DL 時，所構造的 dl 對手 $\mathcal{B}$ 會將目標點 $Y$ 設為公鑰 $X$。對 Theorem 4.1 而言，沿用相同思路看似自然；然而問題在於，如何使用離散對數 oracle $\mathrm{DLO}$ 來避免 rewinding 並得到緊的歸約。作者指出，這一路線其實並不明確，而且 $\mathrm{DLO}$ oracle 本身似乎也無法直接幫助完成這件事。

<div class="algorithm">
  <div class="algorithm-title">Adversary $\mathcal{B}^{\mathrm{DLO}}$</div>

  <p><strong>Init:</strong></p>
  <ol>
    <li>
      <code>Set</code>
      $(Y, X) \leftarrow^{\$} \mathrm{Init}()$; <code>Run</code>
      $z^\ast \leftarrow^{\$} \mathcal{A}^{\mathrm{Ch}, \mathrm{Tr}}(X)$
    </li>
    <li>
      <code>Return</code>
      $z^\ast$
    </li>
  </ol>

  <p><strong>Ch($R^\ast$):</strong></p>
  <ol>
    <li>
      <code>Set</code>
      $W \leftarrow (R^\ast)^{-1} \cdot Y$; $c^\ast \leftarrow \mathrm{DLO}(1, W)$
    </li>
    <li>
      <code>Return</code>
      $c^\ast$
    </li>
  </ol>

  <p><strong>Tr:</strong></p>
  <ol>
    <li>
      <code>Set</code>
      $z \leftarrow^{\$} \mathbb{Z}_p$; $c \leftarrow^{\$} \mathbb{Z}_p$; $R \leftarrow g^z \cdot X^{-c}$
    </li>
    <li>
      <code>Return</code>
      $(R, c, z)$
    </li>
  </ol>
</div>

作者採取的歸約與先前方法的關鍵差異，在於**不**將目標點 $Y$ 設為公鑰。相反地，分析改為觀察對手 $\mathcal{A}$ 的一次成功冒充。（$\mathcal{A}$ 的 transcript oracle $\mathrm{Tr}$ 的模擬，仍透過該方案的誠實驗證者零知識性質完成。）

對手 $\mathcal{A}$ 提供 $R_\ast$，收到 $c_\ast$，然後回傳 $z_\ast$，滿足 $g^{z_\ast}=R_\ast X^{c_\ast}$，其中 $X$ 是公鑰。

因此，$\mathcal{A}$ 實際上計算出了 $R_\ast X^{c_\ast}$ 的離散對數。此處的安排是令該值恰好等於 mbdl challenge $Y$；也就是說，當 $\mathcal{B}$ 收到輸入 $Y$ 時，會設法使 $Y=R_\ast X^{c_\ast}$。

若此安排成功，則 $\mathcal{A}$ 回傳的 $z_\ast$ 就是 $\mathrm{DL}_{G,g}(Y)$，因此 $\mathcal{B}$ 可直接輸出該值並獲勝。

接下來的問題是，應如何安排 $Y=R_\ast X^{c_\ast}$。這正是 $\mathrm{DLO}$ oracle 發揮作用的地方。

對手 $\mathcal{B}$ 將 $X$ 作為輸入提供給 $\mathcal{A}$，也就是說，公鑰相對於群生成元被設成 $\mathcal{B}$ 可以計算離散對數的那個底。

之後，當 $\mathcal{A}$ 提供 $R_\ast$ 時，$\mathcal{B}$ 便回傳一個挑戰 $c_\ast$，以保證 $Y=R_\ast X^{c_\ast}$。

這表示 $$c_\ast = \mathrm{DL}_{G,X}\!\left(YR_\ast^{-1}\right)$$，而這正是 $\mathcal{B}$ 可以透過其 $\mathrm{DLO}$ oracle 計算的。

還有一些分布層面的細節需要處理。例如，$\mathrm{Init}$ 所回傳的 $X$ 是一個生成元，而公鑰則是群中的一個隨機元素，因此兩者的分布並不完全相同；此外，透過 $\mathrm{DLO}$ 計算出的挑戰也必須具有正確分布。這些問題都會在後續分析中處理。

### Formal Proof

各過程會透過註解指出它們出現於哪些遊戲中。遊戲 $\mathrm{Gm}_1$ 包含第 2 行中的方框程式碼，而 $\mathrm{Gm}_0$ 不包含。這兩個遊戲都透過零知識模擬來實作 transcript oracle，而不是使用秘密金鑰。

除此之外，$\mathrm{Gm}_0$ 與遊戲 $$\mathrm{Gm}^{\mathrm{imp\mbox{-}pa}}_{\mathrm{ID}}$$ 相同，因此可得

$$
\begin{aligned}
\mathrm{Adv}^{\mathrm{imp\mbox{-}pa}}_{\mathrm{ID}}(\mathcal{A})
&=
\Pr[\mathrm{Gm}_0(\mathcal{A})] \\
&=\Pr[\mathrm{Gm}_1(\mathcal{A})]+\bigl(\Pr[\mathrm{Gm}_0(\mathcal{A})]-\Pr[\mathrm{Gm}_1(\mathcal{A})]\bigr).
\end{aligned}
$$

遊戲 $\mathrm{Gm}_0,\mathrm{Gm}_1$ 是 identical-until-bad，因此根據 Game Playing 的基本引理 <a class="cite" href="#bib-br06">BR06</a>，可得

$$
\Pr[\mathrm{Gm}_0(\mathcal{A})]-\Pr[\mathrm{Gm}_1(\mathcal{A})]\le \Pr[\mathrm{Gm}_1(\mathcal{A}) \text{ sets bad}] .
$$

顯然，
$$
\Pr[\mathrm{Gm}_1(\mathcal{A}) \text{ sets bad}] \le 1/p.
$$
接著可改在 $\mathrm{Gm}_1$ 中工作，其中公鑰 $X$ 是 $G^\ast$ 中的一個隨機元素，而不是 $G$ 中的一個元素。作者主張

$$
\Pr[\mathrm{Gm}_1(\mathcal{A}) = \Pr[\mathrm{Gm}_2(\mathcal{A})]
\tag{9}
$$

以下說明這一點。在第 4 行，遊戲 $\mathrm{Gm}_2$ 直接從 $\mathbb{Z}_p^\ast$ 中選取 $x$，就像 $\mathrm{Gm}_1$ 一樣，並且也以不同但等價的方式重寫了 $\mathrm{FIN}$。

主要需要檢查的是，$$\mathrm{Gm}_2$$ 中的 $$\mathrm{Ch}$$ 與 $$\mathrm{Gm}_1$$ 中的對應程式是等價的，也就是說第 6 行會使得 $$c_\ast$$ 在 $$\mathbb{Z}_p$$ 中均勻分布。

為此，固定 $R_\ast,X$，並定義函數
$$f_{R_\ast,X} : G\rightarrow \mathbb{Z}_p$$ 為
$$f_{R_\ast,X}(Y) = \mathrm{DL}_{G,X}(R_\ast^{-1}Y)$$。

在第 6 行收到 $c_\ast$ 之前，對手對 $Y$ 沒有任何資訊，因此只要證明 $f_{R_\ast,X}$ 是雙射，該主張便成立。

這確實如此，因為 $X\in G^\ast$ 是一個生成元，這表示函數
$$h_{R_\ast,X} : \mathbb{Z}_p \rightarrow G$$，定義為
$$h_{R_\ast,X}(c_\ast) = R_\ast X^{c_\ast}$$，
就是 $f_{R_\ast,X}$ 的反函數。這就證明了式 (9)。

接著主張，圖 5 中所示的對手 $\mathcal{B}$ 滿足

$$
\Pr[\mathrm{Gm}_2(\mathcal{A})]
\le
\mathrm{Adv}^{\mathrm{mbdl}}_{G,g,1}(\mathcal{B})
\tag{10}
$$

將上述結果合併後，證明便告完成；因此剩下只需證明式 (10)。

對手 $\mathcal{B}$ 依照遊戲 $\mathrm{G}^{\mathrm{mbdl}}_{G,g,1}$ 的規則存取 oracle $\mathrm{DLO}$。

在程式中，$\mathrm{Ch}$ 與 $\mathrm{Tr}$ 是由 $\mathcal{B}$ 定義的子程序，並用來為 $\mathcal{A}$ 模擬同名的 oracle。

對手 $\mathcal{B}$ 的輸入是 challenge $Y$，其需要計算相對於底 $g$ 的離散對數；同時它還得到底 $X$，相對於此底它可以執行一次離散對數運算。

它在輸入 $X$ 下執行 $\mathcal{A}$，因此後者將其視為公鑰，這與 $\mathrm{Gm}_2$ 一致。

子程序 $\mathrm{Ch}$ 使用 $\mathrm{DLO}$ 以與 $\mathrm{Gm}_2$ 第 6 行相同的方式產生 $$c_\ast$$。它依照 $\mathrm{Gm}_2$ 第 7 行模擬 $\mathrm{Tr}$。

若 $\mathrm{Gm}_2$ 在第 9 行回傳 true，則可得

$$
g^{z_\ast}=X^{c_\ast}R_\ast=YR_\ast^{-1}R_\ast=Y
$$

，因此 $\mathcal{B}$ 獲勝。

### Game 0

<div class="algorithm">
  <div class="algorithm-title">Game $\mathrm{Gm}_0$</div>

  <p><strong>Init:</strong></p>
  <ol>
    <li>
      <code>Set</code>
      $p \leftarrow \lvert G \rvert$; $y \leftarrow^{\$} \mathbb{Z}_p$; $Y \leftarrow g^y$; $x \leftarrow^{\$} \mathbb{Z}_p$; $X \leftarrow g^x$
    </li>
    <li>
      <code>Return</code>
      $(Y, X)$
    </li>
  </ol>

  <p><strong>Ch($R_\ast$):</strong></p>
  <ol>
    <li>
      <code>Set</code>
      $c_\ast \leftarrow^{\$} \mathbb{Z}_p$
    </li>
    <li>
      <code>Return</code>
      $c_\ast$
    </li>
  </ol>

  <p><strong>Tr($W$):</strong></p>
  <ol>
    <li>
      <code>Set</code>
      $z \leftarrow^{\$} \mathbb{Z}_p$; $c \leftarrow^{\$} \mathbb{Z}_p$; $R \leftarrow g^z \cdot X^{-c}$
    </li>
    <li>
      <code>Return</code>
      $(R, c, z)$
    </li>
  </ol>

  <p><strong>Fin($z_\ast$):</strong></p>
  <ol>
    <li>
      <code>Return</code>
      $(g^{z_\ast} = X^{c_\ast} R_\ast)$
    </li>
  </ol>
</div>

### Game 1

<div class="algorithm">
  <div class="algorithm-title">Game $\mathrm{Gm}_1$</div>

  <p><strong>Init:</strong></p>
  <ol>
    <li>
      <code>Set</code>
      $p \leftarrow \lvert G \rvert$; $y \leftarrow^{\$} \mathbb{Z}_p$; $Y \leftarrow g^y$; $x \leftarrow^{\$} \mathbb{Z}_p$
    </li>
    <li>
      <code>If</code>
      $(x = 0)$ then set $\mathrm{bad} \leftarrow \mathrm{true}$ and sample $x \leftarrow^{\$} \mathbb{Z}_p^\ast$
    </li>
    <li>
      <code>Set</code>
      $X \leftarrow g^x$
    </li>
    <li>
      <code>Return</code>
      $(Y, X)$
    </li>
  </ol>

  <p><strong>Ch($R_\ast$):</strong></p>
  <ol>
    <li>
      <code>Set</code>
      $c_\ast \leftarrow^{\$} \mathbb{Z}_p$
    </li>
    <li>
      <code>Return</code>
      $c_\ast$
    </li>
  </ol>

  <p><strong>Tr($W$):</strong></p>
  <ol>
    <li>
      <code>Set</code>
      $z \leftarrow^{\$} \mathbb{Z}_p$; $c \leftarrow^{\$} \mathbb{Z}_p$; $R \leftarrow g^z \cdot X^{-c}$
    </li>
    <li>
      <code>Return</code>
      $(R, c, z)$
    </li>
  </ol>

  <p><strong>Fin($z_\ast$):</strong></p>
  <ol>
    <li>
      <code>Return</code>
      $(g^{z_\ast} = X^{c_\ast} R_\ast)$
    </li>
  </ol>
</div>

### Game 2

<div class="algorithm">
  <div class="algorithm-title">Game $\mathrm{Gm}_2$</div>

  <p><strong>Init:</strong></p>
  <ol>
    <li>
      <code>Set</code>
      $p \leftarrow \lvert G \rvert$; $y \leftarrow^{\$} \mathbb{Z}_p$; $Y \leftarrow g^y$; $x \leftarrow^{\$} \mathbb{Z}_p^\ast$; $X \leftarrow g^x$
    </li>
    <li>
      <code>Return</code>
      $(Y, X)$
    </li>
  </ol>

  <p><strong>Ch($R_\ast$):</strong></p>
  <ol>
    <li>
      <code>Set</code>
      $W \leftarrow R_\ast^{-1} \cdot Y$; $c_\ast \leftarrow \mathrm{DL}_{G,X}(W)$
    </li>
    <li>
      <code>Return</code>
      $c_\ast$
    </li>
  </ol>

  <p><strong>Tr($W$):</strong></p>
  <ol>
    <li>
      <code>Set</code>
      $z \leftarrow^{\$} \mathbb{Z}_p$; $c \leftarrow^{\$} \mathbb{Z}_p$; $R \leftarrow g^z \cdot X^{-c}$
    </li>
    <li>
      <code>Return</code>
      $(R, c, z)$
    </li>
  </ol>

  <p><strong>Fin($z_\ast$):</strong></p>
  <ol>
    <li>
      <code>Return</code>
      $(z_\ast = \mathrm{DL}_{G,g}\!\left(X^{c_\ast} R_\ast\right))$
    </li>
  </ol>
</div>

## References

<ul class="bib">
  <li id="bib-bd20">
    <span class="bib-key">BD20</span>
    <span class="bib-body">M. Bellare and W. Dai. <i>The Multi-Base Discrete Logarithm Problem: Tight Reductions and Non-Rewinding Proofs for Schnorr Identification and Signatures.</i> In Progress in Cryptology-INDOCRYPT '20, pages 529-552, 2020.</span>
  </li>

  <li id="bib-br06">
    <span class="bib-key">BR06</span>
    <span class="bib-body">M. Bellare and P. Rogaway. <i>The security of triple encryption and a framework for code-based game-playing proofs.</i> In S. Vaudenay, editor, EUROCRYPT 2006, volume 4004 of LNCS, pages 409-426. Springer, Heidelberg, May/June 2006.</span>
  </li>
</ul>
