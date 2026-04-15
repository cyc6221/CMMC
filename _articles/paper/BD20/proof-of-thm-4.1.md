---
layout: page
title: "[BD20] Proof of Theorem 4.1"
author1: "Mihir Bellare"
author2: "Wei Dai"
venue: "INDOCRYPT 2020"
date: 2026-04-15
last_updated: 2026-04-15
label: "paper"
tags: [square-root-barrier, paper]
---

This note records the proof page for [Theorem 4.1 in chapter 4]({{ "/articles/paper/BD20/BD20-4/" | relative_url }}) of the paper [The Multi-Base Discrete Logarithm Problem: Tight Reductions and Non-Rewinding Proofs for Schnorr Identification and Signatures]({{ "/articles/paper/BD20/" | relative_url }}). Related chapters include:

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

Additionally, $T_{\mathcal{B}}$ is roughly $T_{\mathcal{A}}$ plus simulation overhead
$\mathcal{O} (Q^{Tr}_{\mathcal{A}} \cdot T^{\mathrm{exp}}_\mathbb{G})$.
</div>
