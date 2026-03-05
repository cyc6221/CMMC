---
layout: page
title: "The One-More Discrete Logarithm Assumption in the Generic Group Model"
date: 2026-03-05
last_updated: 2026-03-05
label: "paper"
tags: [square-root-barrier, one-more, paper]
---

## Abstract

**one more-discrete logarithm assumption (OMDL)** 是多種方案安全性分析中常用的假設 <a class="cite" href="#bib-bnps03">BNPS03</a>，涵蓋 identification protocols、blind signature 與 multi-signature schemes，例如 **blind Schnorr signatures** 與近期的 **MuSig2** multi-signatures。由於這些方案產生的是標準 **Schnorr signatures**，因此可與既有系統相容，例如在 blockchains 的情境中。

此外，OMDL 也被用於若干關於「某些 security reductions 不可能存在」的結果之推導與討論。

就既有文獻而言，OMDL 的形式化分析相對有限；例如，針對其在 **generic group model (GGM)** 中成立的證明，文獻中曾出現相關主張。<a class="cite" href="#bib-sho97">Sho97</a>（NOTE：本文對先前的主張進行檢視，並指出其中可能存在問題。<a class="cite" href="#bib-cdg18">CDG18</a>）

本文在 **generic group model (GGM)** 中給出了 **one more-discrete logarithm assumption (OMDL)** 的形式化證明，並同時在 GGM 中證明了一個相關假設：**one-more computational Diffie-Hellman assumption**。相較於既有在 GGM 中的證明路線，本文採用不同的證明策略，以新的論證取代對 **Schwartz-Zippel Lemma** 的使用。

## References

<ul class="bib">

  <li id="bib-bnps03">
    <span class="bib-key">BNPS03</span>
    <span class="bib-body">Mihir Bellare, Chanathip Namprempre, David Pointcheval, and Michael Semanko. <i>The one-more-RSA-inversion problems and the security of Chaum’s blind signature scheme.</i> Journal of Cryptology, 16(3):185–215, 2003.</span>
  </li>

  <li id="bib-sho97">
    <span class="bib-key">Sho97</span>
    <span class="bib-body">Victor Shoup. <i>Lower Bounds for Discrete Logarithms and Related Problems.</i> In Advances in Cryptology—EUROCRYPT’97, 1997.</span>
  </li>

  <li id="bib-cdg18">
    <span class="bib-key">CDG18</span>
    <span class="bib-body">Sandro Coretti, Yevgeniy Dodis, and Siyao Guo. <i>Non-uniform bounds in the random permutation, ideal-cipher, and generic-group models.</i> In Hovav Shacham and Alexandra Boldyreva (eds.), CRYPTO 2018, Part I, LNCS 10991, pp. 693–721. Springer, 2018.</span>
  </li>

</ul>
