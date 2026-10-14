---
layout: page
title: "[BD20] Proof of Theorem 4.1"
author1: "Mihir Bellare"
author2: "Wei Dai"
venue: "INDOCRYPT 2020"
date: 2026-04-15
last_updated: 2026-10-14
label: "paper"
tags: [square-root-barrier, paper, MBDL]
---

This note records the proof page for [Theorem 4.1 in chapter 4]({{ "/research/papers/BD20/BD20-4/" | relative_url }}) of [the paper]({{ "/research/papers/BD20/" | relative_url }})<a class="cite" href="#bib-bd20">BD20</a>. Related chapters include:

- [1 Introduction]({{ "/research/papers/BD20/BD20-1/" | relative_url }})
- [2 Preliminaries]({{ "/research/papers/BD20/BD20-2/" | relative_url }})
- [3 The Multi-Base Discrete Logarithm Problem]({{ "/research/papers/BD20/BD20-3/" | relative_url }})
- [4 Schnorr Identification and Signatures from MBDL]({{ "/research/papers/BD20/BD20-4/" | relative_url }})
  - [4.1 Schnorr Identification from MBDL]({{ "/research/papers/BD20/BD20-4.1/" | relative_url }})
  - [4.2 Schnorr Signature from MBDL]({{ "/research/papers/BD20/BD20-4.2/" | relative_url }})
- [5 MBDL hardness in the Generic Group Model]({{ "/research/papers/BD20/BD20-5/" | relative_url }})
- [A Okamoto Identification and Signature from MBDL]({{ "/research/papers/BD20/BD20-A/" | relative_url }})
- [B Ratio-based tightness]({{ "/research/papers/BD20/BD20-B/" | relative_url }})

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

### Idea of the Reduction

Schnorr 的 IMP-PA 安全性歸約到 DL 時，dl 對手將目標點 $Y$ 設為公鑰 $X$。Theorem 4.1 若沿用同一做法，問題在於如何用離散對數 oracle $\mathrm{DLO}$ 避免 rewinding 並得到緊的歸約。這條路線並不明確，$\mathrm{DLO}$ 看起來也無法直接提供幫助。

此處的歸約不把目標點 $Y$ 設為公鑰，改為分析 $\mathcal{A}$ 的一次成功冒充。$\mathrm{Tr}$ 的模擬仍透過該方案的 honest-verifier zero-knowledge 性質完成。

$\mathcal{A}$ 提供 $R_\ast$，收到 $c_\ast$ 後回傳 $z_\ast$，滿足 $g^{z_\ast} = R_\ast X^{c_\ast}$，其中 $X$ 是公鑰。因此 $\mathcal{A}$ 實際上算出了 $R_\ast X^{c_\ast}$ 的離散對數。若 $\mathcal{B}$ 收到 mbdl challenge $Y$ 後能安排 $Y = R_\ast X^{c_\ast}$，則 $z_\ast = \mathrm{DL}_{G,g}(Y)$，$\mathcal{B}$ 直接輸出 $z_\ast$ 即獲勝。

安排 $Y = R_\ast X^{c_\ast}$ 的步驟用到 $\mathrm{DLO}$。$\mathcal{B}$ 把 $X$ 當作公鑰交給 $\mathcal{A}$，也就是公鑰被設成 $\mathcal{B}$ 可以相對於它計算離散對數的那個底。$\mathcal{A}$ 給出 $R_\ast$ 後，$\mathcal{B}$ 回傳

$$
c_\ast = \mathrm{DL}_{G,X}\!\left(Y R_\ast^{-1}\right),
$$

即可保證 $Y = R_\ast X^{c_\ast}$，而這個值可由 $\mathrm{DLO}$ 算出。

還有兩個分布層面的細節。$\mathrm{Init}$ 回傳的 $X$ 是生成元，而真實的公鑰是群中的隨機元素，兩者分布不同；另外，經由 $\mathrm{DLO}$ 算出的挑戰也必須具有正確分布。這兩點在 Formal Proof 中處理。

### Adversary B

<div class="algorithm">
  <div class="algorithm-title">Adversary $\mathcal{B}^{\mathrm{DLO}}$</div>

  <p><strong>Init:</strong></p>
  <ol>
    <li>
      <code>Set</code>
      $(Y, X) \xleftarrow{\$} \mathrm{Init}()$; <code>Run</code>
      $z_\ast \xleftarrow{\$} \mathcal{A}^{\mathrm{Ch}, \mathrm{Tr}}(X)$
    </li>
    <li>
      <code>Return</code>
      $z_\ast$
    </li>
  </ol>

  <p><strong>Ch($R_\ast$):</strong></p>
  <ol>
    <li>
      <code>Set</code>
      $W \leftarrow R_\ast^{-1} \cdot Y$; $c_\ast \leftarrow \mathrm{DLO}(1, W)$
    </li>
    <li>
      <code>Return</code>
      $c_\ast$
    </li>
  </ol>

  <p><strong>Tr:</strong></p>
  <ol>
    <li>
      <code>Set</code>
      $z \xleftarrow{\$} \mathbb{Z}_p$; $c \xleftarrow{\$} \mathbb{Z}_p$; $R \leftarrow g^z \cdot X^{-c}$
    </li>
    <li>
      <code>Return</code>
      $(R, c, z)$
    </li>
  </ol>
</div>

此處的 $\mathrm{Init}$ 是 MBDL 遊戲 $\mathrm{G}^{\mathrm{mbdl}}_{G,g,1}$ 的 $\mathrm{Init}$，回傳要求離散對數的挑戰 $Y$ 以及底 $X$。$\mathrm{Ch}$ 與 $\mathrm{Tr}$ 是 $\mathcal{B}$ 定義的子程序，用來為 $\mathcal{A}$ 模擬同名的 oracle。

下方三個遊戲共用同一組介面 $\mathrm{Init}$、$\mathrm{Ch}$、$\mathrm{Tr}$、$\mathrm{Fin}$。

### Game 0

<div class="algorithm">
  <div class="algorithm-title">Game $\mathrm{Gm}_0$</div>

  <p><strong>Init:</strong></p>
  <ol>
    <li>
      <code>Set</code>
      $p \leftarrow \lvert G \rvert$; $y \xleftarrow{\$} \mathbb{Z}_p$; $Y \leftarrow g^y$; $x \xleftarrow{\$} \mathbb{Z}_p$; $X \leftarrow g^x$
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
      $c_\ast \xleftarrow{\$} \mathbb{Z}_p$
    </li>
    <li>
      <code>Return</code>
      $c_\ast$
    </li>
  </ol>

  <p><strong>Tr:</strong></p>
  <ol>
    <li>
      <code>Set</code>
      $z \xleftarrow{\$} \mathbb{Z}_p$; $c \xleftarrow{\$} \mathbb{Z}_p$; $R \leftarrow g^z \cdot X^{-c}$
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
      $p \leftarrow \lvert G \rvert$; $y \xleftarrow{\$} \mathbb{Z}_p$; $Y \leftarrow g^y$; $x \xleftarrow{\$} \mathbb{Z}_p$
    </li>
    <li>
      <code>If</code>
      $(x = 0)$ then set $\mathrm{bad} \leftarrow \mathrm{true}$ and sample $x \xleftarrow{\$} \mathbb{Z}_p^\ast$
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
      $c_\ast \xleftarrow{\$} \mathbb{Z}_p$
    </li>
    <li>
      <code>Return</code>
      $c_\ast$
    </li>
  </ol>

  <p><strong>Tr:</strong></p>
  <ol>
    <li>
      <code>Set</code>
      $z \xleftarrow{\$} \mathbb{Z}_p$; $c \xleftarrow{\$} \mathbb{Z}_p$; $R \leftarrow g^z \cdot X^{-c}$
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
      $p \leftarrow \lvert G \rvert$; $y \xleftarrow{\$} \mathbb{Z}_p$; $Y \leftarrow g^y$; $x \xleftarrow{\$} \mathbb{Z}_p^\ast$; $X \leftarrow g^x$
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

  <p><strong>Tr:</strong></p>
  <ol>
    <li>
      <code>Set</code>
      $z \xleftarrow{\$} \mathbb{Z}_p$; $c \xleftarrow{\$} \mathbb{Z}_p$; $R \leftarrow g^z \cdot X^{-c}$
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

### Formal Proof

<div class="proof">
<strong>Proof.</strong>

The games implement the transcript oracle via the zero-knowledge simulation rather than the secret key. Game $\mathrm{Gm}_1$ differs from $\mathrm{Gm}_0$ only in step 2 of $\mathrm{Init}$, where it sets $\mathrm{bad}$ and resamples $x$ if $x = 0$. Otherwise $\mathrm{Gm}_0$ is the same as game $\mathrm{Gm}^{\mathrm{imp\text{-}pa}}_{\mathrm{ID}}$, so

$$
\begin{aligned}
\mathbf{Adv}^{\mathrm{imp\text{-}pa}}_{\mathrm{ID}}(\mathcal{A})
&= \Pr[\mathrm{Gm}_0(\mathcal{A})] \\
&= \Pr[\mathrm{Gm}_1(\mathcal{A})] + \bigl(\Pr[\mathrm{Gm}_0(\mathcal{A})] - \Pr[\mathrm{Gm}_1(\mathcal{A})]\bigr).
\end{aligned}
$$

Games $\mathrm{Gm}_0$ and $\mathrm{Gm}_1$ are identical-until-bad, so by the Fundamental Lemma of Game Playing <a class="cite" href="#bib-br06">BR06</a>,

$$
\Pr[\mathrm{Gm}_0(\mathcal{A})] - \Pr[\mathrm{Gm}_1(\mathcal{A})] \le \Pr[\mathrm{Gm}_1(\mathcal{A}) \text{ sets } \mathrm{bad}].
$$

Clearly $\Pr[\mathrm{Gm}_1(\mathcal{A}) \text{ sets } \mathrm{bad}] \le 1/p$. Now we can work with $\mathrm{Gm}_1$, where the public key $X$ is a random element of $G^\ast$ rather than of $G$. We claim that

$$
\Pr[\mathrm{Gm}_1(\mathcal{A})] = \Pr[\mathrm{Gm}_2(\mathcal{A})].
\tag{9}
$$

In $\mathrm{Init}$, game $\mathrm{Gm}_2$ picks $x$ directly from $\mathbb{Z}_p^\ast$, just like $\mathrm{Gm}_1$, and also rewrites $\mathrm{Fin}$ in a different but equivalent way. The main thing to check is that $\mathrm{Ch}$ in $\mathrm{Gm}_2$ is equivalent to that in $\mathrm{Gm}_1$, meaning that $\mathrm{Ch}$ in $\mathrm{Gm}_2$ results in $c_\ast$ being uniformly distributed in $\mathbb{Z}_p$.

For this, regard $R_\ast, X$ as fixed and define the function $f_{R_\ast,X} : G \to \mathbb{Z}_p$ by $f_{R_\ast,X}(Y) = \mathrm{DL}_{G,X}(R_\ast^{-1} Y)$. The adversary has no information about $Y$ prior to receiving $c_\ast$ from $\mathrm{Ch}$, so the claim is established if we show that $f_{R_\ast,X}$ is a bijection. This is true because $X \in G^\ast$ is a generator, which means that the function $h_{R_\ast,X} : \mathbb{Z}_p \to G$ defined by $h_{R_\ast,X}(c_\ast) = R_\ast X^{c_\ast}$ is the inverse of $f_{R_\ast,X}$. This establishes Eq. (9).

We now claim that adversary $\mathcal{B}$ satisfies

$$
\Pr[\mathrm{Gm}_2(\mathcal{A})] \le \mathbf{Adv}^{\mathrm{mbdl}}_{G,g,1}(\mathcal{B}).
\tag{10}
$$

Adversary $\mathcal{B}$ has access to oracle $\mathrm{DLO}$ as per game $\mathrm{G}^{\mathrm{mbdl}}_{G,g,1}$. In the code, $\mathrm{Ch}$ and $\mathrm{Tr}$ are subroutines defined by $\mathcal{B}$ and used to simulate the oracles of the same names for $\mathcal{A}$. Adversary $\mathcal{B}$ has input the challenge $Y$ whose discrete logarithm in base $g$ it needs to compute, as well as the base $X$ relative to which it may make one discrete logarithm query. It runs $\mathcal{A}$ on input $X$, so $\mathcal{A}$ regards it as the public key, consistent with $\mathrm{Gm}_2$.

Subroutine $\mathrm{Ch}$ uses $\mathrm{DLO}$ to produce $c_\ast$ in the same way as $\mathrm{Ch}$ of $\mathrm{Gm}_2$, and $\mathrm{Tr}$ is simulated as in $\mathrm{Tr}$ of $\mathrm{Gm}_2$. If $\mathrm{Fin}$ of $\mathrm{Gm}_2$ returns true, then

$$
g^{z_\ast} = X^{c_\ast} R_\ast = Y R_\ast^{-1} R_\ast = Y,
$$

so $\mathcal{B}$ wins. This establishes Eq. (10).

Combining the above,

$$
\mathbf{Adv}^{\mathrm{imp\text{-}pa}}_{\mathrm{ID}}(\mathcal{A})
= \Pr[\mathrm{Gm}_0(\mathcal{A})]
\le \Pr[\mathrm{Gm}_1(\mathcal{A})] + \frac{1}{p}
= \Pr[\mathrm{Gm}_2(\mathcal{A})] + \frac{1}{p}
\le \mathbf{Adv}^{\mathrm{mbdl}}_{G,g,1}(\mathcal{B}) + \frac{1}{p},
$$

which is the claimed bound.
</div>

<div class="remark">
<strong>Remark.</strong>
上述證明中幾個省略的細節補充如下。

<ul>
  <li><strong>$\mathrm{Gm}_1$ 中 $x$ 的分布。</strong> $x$ 先在 $\mathbb{Z}_p$ 中均勻取樣，若 $x = 0$ 則在 $\mathbb{Z}_p^\ast$ 中均勻重抽。任一 $a \in \mathbb{Z}_p^\ast$ 最終被取到的機率為 $\frac{1}{p} + \frac{1}{p} \cdot \frac{1}{p-1} = \frac{1}{p-1}$，所以最終的 $x$ 在 $\mathbb{Z}_p^\ast$ 上均勻，與 $\mathrm{Gm}_2$ 的 $\mathrm{Init}$ 一致。同時 $\Pr[x = 0] = 1/p$，即 $\Pr[\mathrm{Gm}_1(\mathcal{A}) \text{ sets } \mathrm{bad}] = 1/p$。</li>
  <li><strong>Eq. (9) 中 $f_{R_\ast,X}$ 的定義域。</strong> $R_\ast$ 是 $\mathcal{A}$ 輸出的群元素，屬於 $G$，所以對任意 $Y \in G$ 都有 $R_\ast^{-1} Y \in G$，$\mathrm{DL}_{G,X}$ 有定義。$X$ 是 $G$ 的生成元，因此 $f_{R_\ast,X}$ 與 $h_{R_\ast,X}$ 互為反函數。</li>
  <li><strong>$Y$ 與 $\mathcal{A}$ 的視角獨立。</strong> 在 $\mathrm{Gm}_2$ 中 $Y = g^y$，$y$ 在 $\mathbb{Z}_p$ 中均勻且 $g$ 是生成元，所以 $Y$ 在 $G$ 上均勻。在 $\mathrm{Ch}$ 回傳 $c_\ast$ 之前，$\mathcal{A}$ 看到的只有 $X$（只取決於 $x$）以及 $\mathrm{Tr}$ 的輸出（只取決於 $z, c, X$），它們都不依賴 $Y$。因此對固定的 $R_\ast, X$，$c_\ast = f_{R_\ast,X}(Y)$ 在 $\mathbb{Z}_p$ 中均勻且與 $\mathcal{A}$ 的視角獨立，與 $\mathrm{Gm}_1$ 中獨立均勻取樣的 $c_\ast$ 同分布。</li>
  <li><strong>$\mathrm{Fin}$ 的等價性。</strong> $g$ 是生成元，所以 $z_\ast \in \mathbb{Z}_p$ 滿足 $g^{z_\ast} = X^{c_\ast} R_\ast$ 若且唯若 $z_\ast = \mathrm{DL}_{G,g}(X^{c_\ast} R_\ast)$。</li>
  <li><strong>時間界。</strong> $\mathcal{B}$ 只執行 $\mathcal{A}$ 一次。$\mathrm{Ch}$ 被呼叫一次，需要一次 $\mathrm{DLO}$ 查詢和常數個群運算。每次 $\mathrm{Tr}$ 查詢計算 $R = g^z X^{-c}$，需要常數個指數運算。共有 $Q^{\mathrm{Tr}}_{\mathcal{A}}$ 次 $\mathrm{Tr}$ 查詢，所以 $\mathrm{T}_{\mathcal{B}}$ 約為 $\mathrm{T}_{\mathcal{A}} + \mathcal{O}(Q^{\mathrm{Tr}}_{\mathcal{A}} \cdot \mathrm{T}^{\mathrm{exp}}_G)$。</li>
</ul>
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
