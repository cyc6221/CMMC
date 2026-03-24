---
layout: page
title: Bit Security
date: 2026-03-24
last_updated: 2026-03-24
tags: [bit-security, hard-predicate, discrete-logarithm, RSA, one-way-function]
---

在複雜度理論中，我們曾經討論過 decision problem，也就是輸出只有一個 bit 的問題。在密碼學中，也會出現類似的情況：攻擊者未必想恢復全部秘密資訊，而可能只想知道其中某一個 bit。此時自然會問，**計算單一 bit 的資訊，是否和恢復整體資訊一樣困難**。

例如對 RSA 函數 $x \mapsto y = x^e \pmod N$，攻擊者或許不在乎完整求出 $x$，而只想知道 $x \bmod 2$，也就是 $x$ 的奇偶性。我們希望即使只是這一個 bit，也不能從函數輸出中被有效求得。這種性質便稱為 **bit security**。

bit security 和 semantic security 之間有明顯關聯。若攻擊者僅由密文便能判斷明文的某一個 bit，例如奇偶性，那麼密文其實已經洩漏了明文的部分資訊，因此也就破壞了系統的語意安全。

## Hard Predicate

<div class="definition">
<strong>Definition. Hard Predicate.</strong>
Let $f : S \to T$ be a one-way function, where $S$ and $T$ are finite sets, and let $B : S \to \{0,1\}$ be a binary function, called a predicate. We say that $B(x)$ is a <em>hard predicate</em> for $f$ if:
<ol>
  <li>$B(x)$ is easy to compute when $x \in S$ is known, and</li>
  <li>$B(x)$ is hard to compute given only $f(x)$.</li>
</ol>
</div>

證明某個 predicate 是 hard predicate 的典型方法，是先假設存在一個 oracle，能夠在只知道 $f(x)$ 的情況下求出 $B(x)$，再進一步證明：若有這個 oracle，就能有效地反轉 $f$。如此一來，若 $f$ 確實是 one-way function，則 $B$ 就應當是 hard predicate。

更一般地，也可以定義 $k$-bit predicate 與 hard $k$-bit predicate，只是此時 $B$ 的值域不再是 $\{0,1\}$，而是長度為 $k$ 的 bit string。

## Hard Predicate for Discrete Logarithm

設 $G$ 為一個有限阿貝爾群，其階為質數 $q$，並令 $g$ 為其生成元。考慮以下 predicate：$B_2(x) = x \bmod 2$。也就是說，$B_2(x)$ 回傳離散對數 $x$ 的最低位元。

<div class="theorem">
<strong>Theorem.</strong>
The predicate $B_2$ is a hard predicate for the function $x \mapsto g^x$.
</div>

<div class="proof">
<strong>Proof.</strong>
Let $O(h,g)$ denote an oracle which returns the least significant bit of the discrete logarithm of $h$ to the base $g$, i.e. it computes $B_2(x)$ for $x=\log_g h$. We need to show how to use $O$ to solve a discrete logarithm problem.

Suppose we are given $h=g^x$. We perform the following steps. First let $t=\frac{1}{2} \pmod q$. Then set $y=0$ and $z=1$, and repeat the following until $h=1$:
<ul>
  <li>$b = O(h,g)$.</li>
  <li>If $b=1$, then set $y=y+z$ and $h=h/g$.</li>
  <li>Set $h=h^t$ and $z=2z$.</li>
</ul>
We then output $y$ as the discrete logarithm of the original element $h$ with respect to $g$.
</div>

這個 proof 的核心想法是：若我們知道目前離散對數的奇偶性，就可以逐步把它拆解出來。

假設目前 $h=g^x$。若 oracle 告訴我們 $x$ 是偶數，則可直接將指數除以 $2$；若 oracle 告訴我們 $x$ 是奇數，則先把 $x$ 減去 $1$，使其變成偶數，再除以 $2$。在群階 $q$ 為奇質數的情況下，$2$ 在模 $q$ 下可逆，所以「除以 $2$」是合法操作。如此反覆進行，就能一位一位地恢復 $x$ 的二進位資訊，最後得到完整的離散對數。

因此，只要能計算 $x \bmod 2$，就能進一步解出整個 discrete logarithm，故 $B_2$ 是 hard predicate。

<div class="example">
<strong>Example.</strong>
Consider the field $\mathbb{F}_{607}$ and the element $g=64$ of order $q=101$. We wish to find the discrete logarithm of $h=56$ with respect to $g$.

Using the algorithm above, we obtain the following table:
</div>

| $h$ | $O(h,g)$ | $z$ | $y$ |
| :-: | :-: | :-: | :-: |
| 56 | 0 | 1 | 0 |
| 451 | 1 | 2 | 2 |
| 201 | 1 | 4 | 6 |
| 288 | 0 | 8 | 6 |
| 100 | 1 | 16 | 22 |
| 454 | 0 | 32 | 22 |
| 64 | 1 | 64 | 86 |

因此最後得到 $y=86$，也就是 $g^{86}=h \pmod{607}$。換言之，$\log_g 56 = 86$。

## Hard Predicates for the RSA Problem

對 RSA 問題而言，給定 $c=m^e \pmod N$，可考慮以下三種 hard predicates：

- $B_1(m)=m \bmod 2$。
- $B_h(m)=0$ 若 $m < N/2$，否則 $B_h(m)=1$。
- $B_k(m)=m \bmod 2^k$，其中 $k=O(\log\log N)$。

若分別以 oracle 表示，則記為 $O_1(c,N)$、$O_h(c,N)$ 與 $O_k(c,N)$。

其中前兩者彼此有緊密關係，因為 $O_h(c,N)=O_1(c \cdot 2^e \bmod N, N)$，以及 $O_1(c,N)=O_h(c \cdot 2^{-e} \bmod N, N)$。因此，只要能計算其中之一，便可轉而計算另一者。

### Main Idea

RSA 部分的核心觀念是：若我們能判斷明文 $m$ 是否小於 $N/2$，那麼就能對 $m$ 的值域做二分搜尋。

因為對 RSA 而言，$(2m)^e \equiv 2^e m^e \pmod N$，所以從密文 $c=m^e \pmod N$ 出發，我們可以有效構造出對應於 $2m,4m,8m,\dots$ 的密文。每次透過 oracle 判斷「目前對應的明文是在前半還是後半」，就能把可能範圍縮小一半，最終將原本的明文完整恢復。

<div class="example">
<strong>Example.</strong>
Given an oracle for $O_h$ or $O_1$, we can invert the RSA function using a standard binary-search style algorithm.

Set $y=c$, $l=0$, and $h=N$. While $h-l \ge 1$, perform:
<ul>
  <li>$b = O_h(y,N)$,</li>
  <li>$y = y \cdot 2^e \pmod N$,</li>
  <li>$m = (h+l)/2$,</li>
  <li>if $b=1$, set $l=m$; otherwise set $h=m$.</li>
</ul>
When the loop terminates, the value $\lfloor h \rfloor$ is the preimage of $c$ under the RSA function.
</div>

設公開資訊為 $N=10403$，$e=7$，並考慮密文 $c=3$。利用 oracle $O_h(y,N)$，可逐步得到下表：

| $y$ | $O_h(y,N)$ | $l$ | $h$ |
| :-: | :-: | :-: | :-: |
| $3$ | 0 | 0 | 10403 |
| $3 \cdot 2^7$ | 1 | 0 | 5201.5 |
| $3 \cdot 4^7$ | 1 | 2600.75 | 5201.5 |
| $3 \cdot 8^7$ | 1 | 3901.125 | 5201.5 |
| $3 \cdot 16^7$ | 0 | 4551.3125 | 5201.5 |
| $3 \cdot 32^7$ | 0 | 4551.3125 | 4876.40625 |
| $3 \cdot 64^7$ | 1 | 4551.3125 | 4713.859375 |
| $3 \cdot 128^7$ | 0 | 4632.5859375 | 4713.859375 |
| $3 \cdot 256^7$ | 1 | 4632.5859375 | 4673.22265625 |
| $3 \cdot 512^7$ | 1 | 4652.904296875 | 4673.22265625 |
| $3 \cdot 1024^7$ | 1 | 4663.0634765625 | 4673.22265625 |
| $3 \cdot 2048^7$ | 1 | 4668.14306640625 | 4673.22265625 |
| $3 \cdot 4096^7$ | 1 | 4670.682861328125 | 4673.22265625 |
| $3 \cdot 8192^7$ | 0 | 4671.9527587890625 | 4673.22265625 |

最後區間縮小到只剩下 $4672$ 附近，因此可得 RSA 函數 $x \mapsto x^7 \pmod{10403}$ 對密文 $3$ 的原像為 $4672$。

<div class="remark">
<strong>Remark.</strong>
從這一節可以看出，bit security 並不是在問「只知道一個 bit 是否無關緊要」，而是在問：某些看似極少量的資訊，是否其實已經足以恢復整個秘密。對離散對數而言，最低位元是 hard predicate；對 RSA 而言，奇偶性、是否落在 $N/2$ 以上，以及某些低位 bits，也都是 hard predicates。這說明對這些 one-way functions 而言，局部資訊的洩漏在本質上與整體反轉一樣危險，也正是理解 semantic security 與更進一步安全性概念的重要基礎。
</div>

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 19. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
