---
layout: page
title: Security of Signatures
date: 2026-03-20
last_updated: 2026-03-21
tags: [digital-signature, signature-security, RSA]
---

數位簽章的安全性在於防止攻擊者為未經授權的訊息產生有效簽章。對簽章機制而言，攻擊成功不必然意味著私鑰被恢復；只要攻擊者能偽造合法簽章，系統便已失去安全性。

## Types of Forgery

### Total Break

Total break 表示攻擊者的能力已經等同於合法簽章者。這通常可理解為私鑰已被恢復，或攻擊者已經能夠像真正的持有人一樣，對各種訊息產生有效簽章。這是最嚴重的破壞形式，因為攻擊者已可全面冒充合法簽章者。

### Selective Forgery

Selective forgery 表示攻擊者能夠對自己指定的一個特定訊息，偽造出有效簽章。此時攻擊者未必知道私鑰，也未必能對所有訊息簽章，但只要能對某個目標訊息成功偽造，就已足以造成實際威脅。

即使攻擊者無法對所有訊息簽章，只要能對某個指定訊息成功偽造，簽章機制仍不能視為安全。

### Existential Forgery

Existential forgery 表示攻擊者不需要事先指定目標訊息，只要能夠找到某一個新的訊息，並為其產生一個通過驗證的有效簽章，就算攻擊成功。這個訊息甚至可能只是隨機位元字串，而不一定具有明確語意。重點在於，攻擊者成功產生了一組新的 $(m,\sigma)$，其中 $m$ 不是先前已被合法簽署過的訊息，但驗證演算法仍然接受 $\sigma$ 為 $m$ 的有效簽章。

### Comparison of the Three Notions

若從攻擊者的偽造能力來看，三者的強弱順序為

$$
\text{Total Break} \;>\; \text{Selective Forgery} \;>\; \text{Existential Forgery}.
$$

這是因為 total break 幾乎等同於完全掌握簽章能力；selective forgery 只要求攻擊者能對某個指定的目標訊息完成偽造；existential forgery 則只要求攻擊者能對某個新的訊息完成偽造即可。

但若從安全要求的角度來看，順序正好相反。若一個簽章機制能夠抵抗 existential forgery，那麼它自然也能抵抗 selective forgery，也更不可能發生 total break。因此，能夠抵抗 existential forgery 是較強的安全要求，而只抵抗 selective forgery 則是較弱的要求。

$$
\text{Secure against Existential Forgery}
\;\Rightarrow\;
\text{Secure against Selective Forgery}
\;\Rightarrow\;
\text{Secure against Total Break}.
$$

由於 existential forgery 對攻擊者而言成功條件最寬鬆，因此能夠抵抗 existential forgery 是較強的安全要求。也正因如此，簽章機制的安全性通常定義為：對任何 adaptive adversary 而言，產生 existential forgery 在計算上皆不可行。

## Definition of Security for Signatures

<div class="definition" style="border-left:4px solid #0f766e; background:#ecfeff; padding:12px 14px; border-radius:8px; margin:14px 0; line-height:1.7;">

<strong>Definition.</strong>

A signature scheme is deemed to be secure if it is infeasible for an adaptive adversary to produce an existential forgery.

</div>

## Raw RSA Signatures and Forgery

在簽章系統中，hash function 的使用是不可或缺的。這一點可以從最原始的 RSA 簽章方式清楚看出。若直接將 RSA 簽章定義為

$$
s = m^d \pmod N,
$$

其中 $d$ 為私鑰指數，則此簽章機制存在明顯的安全缺陷。其根本原因在於 raw RSA 直接保留了 RSA 的乘法結構，因而允許攻擊者利用這個代數性質構造有效簽章。

### Existential Forgery on Raw RSA

對 raw RSA 而言，即使是在被動攻擊模型下，也能直接構造 existential forgery。攻擊者不需要查詢 signing oracle，只需先任意選取一個值 $s$，再計算

$$
m = s^e \pmod N,
$$

其中 $e$ 為公開指數。如此便得到一組 $(m,s)$，而且此組資料會通過驗證，因為

$$
s^e \equiv m \pmod N.
$$

因此，攻擊者可直接構造出某個訊息 $m$ 的有效簽章 $s$，從而完成 existential forgery。這表示 raw RSA 無法抵抗最基本的簽章偽造。

### Selective Forgery on Raw RSA

raw RSA 也無法抵抗主動攻擊下的 selective forgery。設攻擊者希望對指定訊息 $m$ 偽造簽章。首先，攻擊者任取一個隨機元素

$$
m_1 \in (\mathbb{Z}/N\mathbb{Z})^\ast,
$$

再令

$$
m_2 = \frac{m}{m_1}.
$$

更精確地說，這裡的運算應理解為模 $N$ 乘法群中的運算，因此

$$
m_2 \equiv m \cdot m_1^{-1} \pmod N.
$$

接著，攻擊者向 signing oracle 查詢 $m_1$ 與 $m_2$ 的簽章，得到

$$
s_1 = m_1^d \pmod N,
\qquad
s_2 = m_2^d \pmod N.
$$

然後令

$$
s = s_1 s_2 \pmod N.
$$

由於 RSA 簽章保有乘法性，可得

$$
\begin{aligned}
s
&= s_1 s_2 \pmod N \\
&= m_1^d \cdot m_2^d \pmod N \\
&= (m_1 m_2)^d \pmod N \\
&= m^d \pmod N.
\end{aligned}
$$

因此，$s$ 即為訊息 $m$ 的有效簽章。也就是說，攻擊者雖未直接要求 oracle 對 $m$ 簽章，仍可藉由兩個相關訊息的簽章組合出目標訊息的簽章，從而完成 selective forgery。

### Necessity of Hashing

上述例子顯示，raw RSA 的問題不在於計算是否困難，而在於其簽章形式直接暴露了 RSA 的代數結構。只要簽章保持這種可乘性，攻擊者便能透過簡單的代數操作構造偽造簽章。

因此，實際上的 RSA-based signature scheme 不會直接對訊息 $m$ 計算

$$
s = m^d \pmod N,
$$

而是先對訊息施加 hash，並結合適當的編碼與 padding 機制，例如 Full Domain Hash 或 RSA-PSS。這些設計的目的，在於打破 raw RSA 直接暴露的代數結構，避免攻擊者藉由乘法性構造偽造簽章。換言之，RSA 簽章的安全性不能只依賴 RSA inversion 的困難性，還必須透過 hash 與 padding 消除可被利用的代數結構。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 18. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
