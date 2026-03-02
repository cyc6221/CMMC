---
layout: page
title: Freshman's Dream
date: 2026-03-02
last_updated: 2026-03-02
tags: [algebra]
---

Freshman’s dream（國一新生之夢）指一個常見的初學者直覺：將冪次「錯誤地」分配到加法上，誤以為

$$
(a+b)^n = a^n + b^n
$$

在一般的整數／實數運算中，這個等式多半不成立，因此被戲稱為「新生之夢」。

## 一般情況

一般情況下不成立的原因，因為二項式定理給出

$$
(a+b)^n=\sum_{k=0}^{n}\binom{n}{k}a^{\,n-k}b^k
$$

展開式除了兩端的 $a^n$ 與 $b^n$ 之外，還包含許多交叉項，因此通常無法簡化為 $a^n+b^n$。

### 以 $n=2$ 為例

$$
(a+b)^2=a^2+2ab+b^2\neq a^2+b^2
$$

其中 $2ab$ 即為造成不相等的交叉項。

## 模質數 $\bmod p$ 的情況

令 $p$ 為質數。在模 $p$ 的運算中，有

$$
(a+b)^p \equiv a^p + b^p \pmod p
$$

此結論來自二項式係數的整除性。對於 $1\le k\le p-1$，

$$
\binom{p}{k}\equiv 0 \pmod p
$$

因此二項式展開中的所有中間項係數都被 $p$ 整除，在模 $p$ 下等同消失。

由二項式定理，

$$
(a+b)^p
=\sum_{k=0}^{p}\binom{p}{k}a^{\,p-k}b^k
\equiv a^p+b^p \pmod p
$$

### 以模 $5$ 為例

$$
(a+b)^5
= a^5+5a^4b+10a^3b^2+10a^2b^3+5ab^4+b^5
\equiv a^5+b^5 \pmod 5
$$

## 特徵為 $p$ 的環／域的情況

設 $R$ 為一個特徵為 $p$ 的交換環（或域），即

$$
p\cdot 1_R = 0
$$

此時二項式定理同樣成立，且對 $1\le k\le p-1$ 的二項式係數在 $R$ 中為零：

$$
\binom{p}{k}\cdot 1_R = 0
$$

因此展開式的中間項全部消失，得到等式（不再只是同餘）：

$$
(a+b)^p = a^p + b^p \qquad \text{於 } R \text{ 中成立}
$$

## Frobenius 映射

在特徵為 $p$ 的環／域中，映射

$$
\varphi(x)=x^p
$$

滿足

$$
\varphi(a+b)=\varphi(a)+\varphi(b),\qquad \varphi(ab)=\varphi(a)\varphi(b)
$$

因此 $\varphi$ 是一個環同態，稱為 **Frobenius 同態**。在特徵為 $p$ 的環／域裡，Freshman’s dream 的成立可視為 Frobenius 同態對加法相容性的直接表現。

## 推廣到 $p^m$ 次方

在特徵為 $p$ 的情況下，對任意整數 $m\ge 1$ 亦成立：

$$
(a+b)^{p^m}=a^{p^m}+b^{p^m}
$$

此結論可由反覆套用 $(x+y)^p=x^p+y^p$ 或以歸納法得到。

## 參考資料

- [Freshman’s dream](https://en.wikipedia.org/wiki/Freshman%27s_dream)
- [國一新生之夢](https://zh.wikipedia.org/wiki/%E4%B8%AD%E4%B8%80%E6%96%B0%E7%94%9F%E4%B9%8B%E5%A4%A2)
