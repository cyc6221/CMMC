---
layout: page
title: "The One-More Discrete Logarithm Assumption in the Generic Group Model"
date: 2026-03-05
last_updated: 2026-03-05
label: "paper"
tags: [square-root-barrier, one-more, paper]
---

## Abstract

**one more-discrete logarithm assumption (OMDL)** 是多種方案安全性分析的基礎，包含 identification protocols、blind signature 與 multi-signature schemes，例如 **blind Schnorr signatures** 與近期的 **MuSig2** multi-signatures。由於這些方案產生的是標準 **Schnorr signatures**，因此能與既有系統相容，例如在 blockchains 的情境中。  
此外，許多關於「某些 security reductions 不可能存在」的結果也會假設 OMDL。  

儘管 OMDL 被廣泛使用，令人意外的是，它一直缺乏任何嚴謹的分析；甚至連它在 **generic group model (GGM)** 中成立的證明都沒有。（我們指出一個既有的聲稱證明其實是有缺陷的。）  

在本研究中，我們在 GGM 中給出了 OMDL 的形式化證明。我們也在 GGM 中證明了一個相關假設：**one-more computational Diffie-Hellman assumption**。我們的證明方式不同於先前在 GGM 中的證明，並以新的論證取代了對 **Schwartz-Zippel Lemma** 的使用。
