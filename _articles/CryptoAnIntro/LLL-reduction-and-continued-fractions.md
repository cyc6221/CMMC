---
layout: page
title: Lattice Reduction and Continued Fractions
date: 2026-02-03
last_updated: 2026-02-03
tags: [Lattice, lattice-cryptography, LA, LLL, GSO, SVP, Algorithm, continued-fractions]
---

## Before reading

這一段在說明 **continued fractions** 與 **lattice reduction**（特別是 **LLL algorithm**）之間的關聯。先閱讀 [Lattice]({{ "/articles/CryptoAnIntro/lattice/" | relative_url }}) 與 [LLL reduction]({{ "/articles/CryptoAnIntro/LLL-reduction/" | relative_url }}) 。

<!-- --- -->

## Lattice Reduction and Continued Fractions

**Continued fractions** 的目標是：給定一個實數 $\alpha$，找到整數 $p,q$（希望 $q$ 不要太大），使得

$$
|q\alpha - p|
$$

很小。這等價於 $\frac{p}{q}$ 是 $\alpha$ 的近似，因為

$$
\left|\alpha - \frac{p}{q}\right|
= \frac{|q\alpha - p|}{|q|}.
$$

同樣效果也可以用 **lattice** 搭配 **LLL algorithm** 達成。考慮由下列矩陣的 column vectors 生成的 lattice：

$$
\begin{pmatrix}
1 & 0 \\
C \alpha & -C
\end{pmatrix},
$$

其中 $C$ 是常數（常見做法是取大一點，讓 error term 被放大，方便 LLL 找到）。

對任意整數 $p,q$，這個 lattice 內包含向量

$$
\begin{pmatrix}
q \\
C (q \alpha -p)
\end{pmatrix}
=
\begin{pmatrix}
1 & 0 \\
C \alpha & -C
\end{pmatrix}
\begin{pmatrix}
q \\
p
\end{pmatrix}.
$$

如果 LLL 找到一個「short vector」接近上式，就同時表示：

- 第一個座標 $\left | q \right |$ 小（分母不大）
- 第二個座標 $\left | C ( q \alpha - p ) \right |$ 小，因此 $\left | q \alpha - p \right |$ 小（近似誤差小）

因此可以把 **LLL algorithm** 視為 **continued fractions algorithm** 的 **multi-dimensional generalization**：連分數在低維情況下提供最佳有理近似；而 LLL 在更一般的高維 lattice 中，透過找 short vectors 來達到類似的「找近似／找整數關係」效果。
