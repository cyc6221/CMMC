---
layout: page
title: "Lower Bounds for Discrete Logarithms and Related Problems"
author1: "Victor Shoup"
authors: 
venue: "EUROCRYPT 1997"
date: 2026-03-05
last_updated: 2026-03-05
label: "paper"
tags: [square-root-barrier, paper]
---

## Abstract

本文研究 **discrete logarithm** 及其相關問題在 **generic algorithms** 模型下的計算複雜度。所謂 **generic algorithms**，是指除了群元素被編碼為唯一的二進位字串之外，不利用其編碼之任何特殊結構的演算法。

本文證明了這些問題的複雜度下界，且該下界與已知上界一致：任何 **generic algorithm** 都必須執行 $\Omega(p^{1/2})$ 次群運算，其中 $p$ 為整除該群階的最大質因數。

此外，本文還提出了一種修正有缺陷的 **Diffie–Hellman oracle** 的新方法。
