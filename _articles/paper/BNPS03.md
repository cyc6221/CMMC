---
layout: page
title: "The One-More-RSA-Inversion Problems and the Security of Chaum's Blind Signature Scheme"
author1: "Mihir Bellare"
author2: "Chanathip Namprempre"
author3: "David Pointcheval"
author4: "Michael Semanko"
venue: "Journal of Cryptology, 2003"
date: 2026-03-08
last_updated: 2026-03-08
label: "paper"
tags: [square-root-barrier, one-more, paper]
---

## Abstract

本文提出了一類新的計算問題，稱為 **one-more-RSA inversion problems**。論文的主要結果指出，在這一類問題中，分別稱為 **chosen-target inversion problem** 與 **known-target inversion problem** 的兩個問題，在計算複雜度上是 **polynomially equivalent** 的。

在此基礎上，本文進一步說明了如何利用上述結果，於 **random oracle model** 下，建立 **Chaum’s RSA-based blind signature scheme** 的安全性證明；亦即，只要假設上述任一問題是困難的，便可導出該盲簽章方案的安全性。

此外，本文也定義了對應的 **one-more-discrete-logarithm problems**，並證明了類似的結果。論文最後指出，自其 preliminary version 問世以來，所引入的這些新問題也已在其他研究工作中獲得進一步應用。
