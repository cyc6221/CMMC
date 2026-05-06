---
layout: page
title: Sophomore’s Dream
date: 2026-03-03
last_updated: 2026-03-03
tags: [calculus]
---

**Sophomore’s Dream** 是一個「看起來很不合理但卻成立」的恆等式，把一個奇怪的積分和一個同樣奇怪的級數連在一起。

## 經典版本

$$
\int_{0}^{1} x^{-x}\,dx \;=\; \sum_{n=1}^{\infty} n^{-n}.
$$

## 一般情況

對參數 $a$（在可交換級數與積分的收斂條件下，例如 $\| a \| \le 1$），有：

$$
\int_{0}^{1} x^{a x}\,dx \;=\; \sum_{n=0}^{\infty}\frac{(-a)^n}{(n+1)^{n+1}}.
$$

### $a=-1$

把 $a=-1$ 代回去，就得到上面的經典式：

$$
\int_{0}^{1} x^{-x}\,dx
=\sum_{n=0}^{\infty}\frac{1}{(n+1)^{n+1}}
=\sum_{m=1}^{\infty} m^{-m}.
$$

---

這個結果之所以有名，是因為左邊的 integrand $x^{-x}=e^{-x\ln x}$ 不像能積出漂亮的值，而右邊 $\sum n^{-n}$ 也不是常見的特殊函數級數；但兩者竟然精確相等，因此被戲稱為「**Sophomore’s dream**」。

## 參考資料

- [Sophomore’s dream](https://en.wikipedia.org/wiki/Sophomore%27s_dream)
- [二年級之夢](https://zh.wikipedia.org/wiki/%E4%BA%8C%E5%B9%B4%E7%B4%9A%E4%B9%8B%E5%A4%A2)

## 參見

- [Freshman's Dream]({{ "/articles/Math/freshmans-dream" | relative_url }})
