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

## References

<ul class="bib">
  <li id="bib-bd20">
    <span class="bib-key">BD20</span>
    <span class="bib-body">M. Bellare and W. Dai. <i>The Multi-Base Discrete Logarithm Problem: Tight Reductions and Non-Rewinding Proofs for Schnorr Identification and Signatures.</i> In Progress in Cryptology-INDOCRYPT '20, pages 529-552, 2020.</span>
  </li>
</ul>
