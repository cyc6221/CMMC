---
layout: page
title: Bit Security
date: 2026-03-24
last_updated: 2026-03-24
tags: [bit-security, hard-predicate, DL, RSA]
---

在密碼學中，攻擊者未必想恢復全部秘密資訊，而可能只想知道其中某一個 bit。此時自然會問：**從函數輸出中計算輸入的單一 bit，是否仍然是困難的**。

例如對 RSA 函數 $x \mapsto y = x^e \pmod N$，攻擊者或許不在乎完整求出 $x$，而只想知道 $x \bmod 2$，也就是 $x$ 的奇偶性。若即使只是這一個 bit，也不能從函數輸出中被有效求得，我們便說這個函數具有 **bit security**。

## Hard Predicate

<div class="definition">
<strong>Definition. Hard Predicate.</strong>
Let $f : S \to T$ be a one-way function, where $S$ and $T$ are finite sets, and let $B : S \to \{0,1\}$ be a binary function, called a predicate. We say that $B(x)$ is a <em>hard predicate</em> for $f$ if:
<ol>
  <li>$B(x)$ is easy to compute when $x \in S$ is known, and</li>
  <li>$B(x)$ is hard to compute given only $f(x)$.</li>
</ol>
</div>

證明某個 predicate 為 hard predicate 的典型方法，是先假設存在一個 oracle，能夠在只給定 $f(x)$ 的情況下計算出 $B(x)$，再證明若有此 oracle，便可有效反轉 $f$。因此，若 $f$ 是 one-way function，則 $B(x)$ 不應能由 $f(x)$ 有效求得，也就是說，$B$ 是 $f$ 的 hard predicate。

此外，也可以定義 $k$-bit predicate 與 hard $k$-bit predicate；此時 $B$ 的值域不再是 $\{0,1\}$，而是長度為 $k$ 的 bit string。

## Hard Predicate for Discrete Logarithm

Let $G$ denote a finite abelian group of prime order $q$, and let $g$ be a generator of $G$. Consider the following predicate:

$$
B_2(x) = x \bmod 2
$$

In other words, $B_2(x)$ returns the least significant bit of the discrete logarithm $x$.

<div class="theorem">
<strong>Theorem.</strong>
The predicate $B_2$ is a hard predicate for the function

$$
x \mapsto g^x
$$
</div>

<div class="proof">
<strong>Proof.</strong>
Let $O(h,g)$ denote an oracle which returns the least significant bit of the discrete logarithm of $h$ to the base $g$, i.e. it computes $B_2(x)$ for $x=\log_g h$. We need to show how to use $O$ to solve a discrete logarithm problem. <br>

Suppose we are given $h=g^x$. We perform the following steps. First let $t=\frac{1}{2} \pmod q$. Then set $y=0$ and $z=1$, and repeat the following until $h=1$:
<ul>
  <li>$b = O(h,g)$.</li>
  <li>If $b=1$, then set $y=y+z$ and $h=h/g$.</li>
  <li>Set $h=h^t$ and $z=2z$.</li>
</ul>
We then output $y$ as the discrete logarithm of the original element $h$ with respect to $g$.
</div>

DL 部分的關鍵在於：若已知目前離散對數的奇偶性，便可逐步恢復其值。

設 $h=g^x$。若 oracle 回傳 $x$ 為偶數，則可直接將指數除以 $2$；若 oracle 回傳 $x$ 為奇數，則先將 $x$ 減去 $1$ 使其成為偶數，再將其除以 $2$。由於群階 $q$ 是奇質數，$2$ 在模 $q$ 下可逆，因此上述操作在指數上是良定的。

重複此過程，便可依次確定 $x$ 的二進位表示，最終恢復完整的離散對數。由此可見，若能有效計算 $x \bmod 2$，便能進一步解出整個 discrete logarithm，因此 $B_2$ 是函數 $x \mapsto g^x$ 的 hard predicate。

<div class="example">
<strong>Example.</strong>
Consider the field $\mathbb{F}_{607}$ and the element $g=64$ of order $q=101$. We wish to find the discrete logarithm of $h=56$ with respect to $g$.

Using the algorithm above, we obtain the following table:

<table>
  <thead>
    <tr>
      <th style="text-align:center;">$h$</th>
      <th style="text-align:center;">$O(h,g)$</th>
      <th style="text-align:center;">$z$</th>
      <th style="text-align:center;">$y$</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:center;">56</td>
      <td style="text-align:center;">0</td>
      <td style="text-align:center;">1</td>
      <td style="text-align:center;">0</td>
    </tr>
    <tr>
      <td style="text-align:center;">451</td>
      <td style="text-align:center;">1</td>
      <td style="text-align:center;">2</td>
      <td style="text-align:center;">2</td>
    </tr>
    <tr>
      <td style="text-align:center;">201</td>
      <td style="text-align:center;">1</td>
      <td style="text-align:center;">4</td>
      <td style="text-align:center;">6</td>
    </tr>
    <tr>
      <td style="text-align:center;">288</td>
      <td style="text-align:center;">0</td>
      <td style="text-align:center;">8</td>
      <td style="text-align:center;">6</td>
    </tr>
    <tr>
      <td style="text-align:center;">100</td>
      <td style="text-align:center;">1</td>
      <td style="text-align:center;">16</td>
      <td style="text-align:center;">22</td>
    </tr>
    <tr>
      <td style="text-align:center;">454</td>
      <td style="text-align:center;">0</td>
      <td style="text-align:center;">32</td>
      <td style="text-align:center;">22</td>
    </tr>
    <tr>
      <td style="text-align:center;">64</td>
      <td style="text-align:center;">1</td>
      <td style="text-align:center;">64</td>
      <td style="text-align:center;">86</td>
    </tr>
  </tbody>
</table>

因此最後得到 $y=86$，也就是 $g^{86}=h \pmod{607}$。也就是說，$\log_g 56 = 86$。

</div>

## Hard Predicates for the RSA Problem

對 RSA 問題而言，給定 $c=m^e \pmod N$，可考慮以下三種 hard predicates：

- $B_1(m)=m \bmod 2$
- $B_h(m)=0$ if $m < N/2$ otherwise $B_h(m)=1$
- $B_k(m)=m \bmod 2^k$ where $k=O(\log\log N)$

若將這些 predicates 對應的 oracle 分別記為 $O_1(c,N)$、$O_h(c,N)$ 與 $O_k(c,N)$，則 $O_1$ 與 $O_h$ 之間存在密切關係。只要能計算其中之一，便可據此構造出另一者。

$$
O_h(c,N)=O_1(c \cdot 2^e \bmod N, N)
$$

$$
O_1(c,N)=O_h(c \cdot 2^{-e} \bmod N, N)
$$

因此，判斷明文的奇偶性與判斷明文是否落在區間 $[0, N/2)$ 內，在計算能力上是等價的。

若能判斷明文 $m$ 是否落在區間 $[0, N/2)$ 內，便可逐步縮小 $m$ 的可能範圍，進而恢復其值。其關鍵在於 RSA 函數滿足

$$
(2m)^e \equiv 2^e m^e \pmod N
$$

因此從密文 $c=m^e \pmod N$ 出發，可以有效構造出對應於 $2m,4m,8m,\dots$ 的密文。每一步利用 oracle 判斷目前對應明文位於區間的前半或後半，便可將搜尋範圍縮小一半，這正是一種二分搜尋的過程。

<div class="example">
<strong>Example.</strong>
假設已知一個 oracle $O_h$ 或 $O_1$，則可利用下列二分搜尋程序反轉 RSA 函數。

令 $y=c$、$l=0$、$h=N$。當 $h-l \ge 1$ 時，重複執行以下步驟：
<ul>
  <li>計算 $b = O_h(y,N)$；</li>
  <li>更新 $y = y \cdot 2^e \pmod N$；</li>
  <li>令 $m = (h+l)/2$；</li>
  <li>若 $b=1$，則設 $l=m$；否則設 $h=m$。</li>
</ul>
當程序結束時，$\lfloor h \rfloor$ 即為密文 $c$ 在 RSA 函數下的原像。

設公開資訊為 $N=10403$，$e=7$，並考慮密文 $c=3$。利用 oracle $O_h(y,N)$，可逐步得到下表：

<table>
  <thead>
    <tr>
      <th style="text-align:center;">$y$</th>
      <th style="text-align:center;">$O_h(y,N)$</th>
      <th style="text-align:center;">$l$</th>
      <th style="text-align:center;">$h$</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:center;">$3$</td>
      <td style="text-align:center;">0</td>
      <td style="text-align:center;">0</td>
      <td style="text-align:center;">10403</td>
    </tr>
    <tr>
      <td style="text-align:center;">$3 \cdot 2^7$</td>
      <td style="text-align:center;">1</td>
      <td style="text-align:center;">0</td>
      <td style="text-align:center;">5201.5</td>
    </tr>
    <tr>
      <td style="text-align:center;">$3 \cdot 4^7$</td>
      <td style="text-align:center;">1</td>
      <td style="text-align:center;">2600.75</td>
      <td style="text-align:center;">5201.5</td>
    </tr>
    <tr>
      <td style="text-align:center;">$3 \cdot 8^7$</td>
      <td style="text-align:center;">1</td>
      <td style="text-align:center;">3901.125</td>
      <td style="text-align:center;">5201.5</td>
    </tr>
    <tr>
      <td style="text-align:center;">$3 \cdot 16^7$</td>
      <td style="text-align:center;">0</td>
      <td style="text-align:center;">4551.3125</td>
      <td style="text-align:center;">5201.5</td>
    </tr>
    <tr>
      <td style="text-align:center;">$3 \cdot 32^7$</td>
      <td style="text-align:center;">0</td>
      <td style="text-align:center;">4551.3125</td>
      <td style="text-align:center;">4876.40625</td>
    </tr>
    <tr>
      <td style="text-align:center;">$3 \cdot 64^7$</td>
      <td style="text-align:center;">1</td>
      <td style="text-align:center;">4551.3125</td>
      <td style="text-align:center;">4713.859375</td>
    </tr>
    <tr>
      <td style="text-align:center;">$3 \cdot 128^7$</td>
      <td style="text-align:center;">0</td>
      <td style="text-align:center;">4632.5859375</td>
      <td style="text-align:center;">4713.859375</td>
    </tr>
    <tr>
      <td style="text-align:center;">$3 \cdot 256^7$</td>
      <td style="text-align:center;">1</td>
      <td style="text-align:center;">4632.5859375</td>
      <td style="text-align:center;">4673.22265625</td>
    </tr>
    <tr>
      <td style="text-align:center;">$3 \cdot 512^7$</td>
      <td style="text-align:center;">1</td>
      <td style="text-align:center;">4652.904296875</td>
      <td style="text-align:center;">4673.22265625</td>
    </tr>
    <tr>
      <td style="text-align:center;">$3 \cdot 1024^7$</td>
      <td style="text-align:center;">1</td>
      <td style="text-align:center;">4663.0634765625</td>
      <td style="text-align:center;">4673.22265625</td>
    </tr>
    <tr>
      <td style="text-align:center;">$3 \cdot 2048^7$</td>
      <td style="text-align:center;">1</td>
      <td style="text-align:center;">4668.14306640625</td>
      <td style="text-align:center;">4673.22265625</td>
    </tr>
    <tr>
      <td style="text-align:center;">$3 \cdot 4096^7$</td>
      <td style="text-align:center;">1</td>
      <td style="text-align:center;">4670.682861328125</td>
      <td style="text-align:center;">4673.22265625</td>
    </tr>
    <tr>
      <td style="text-align:center;">$3 \cdot 8192^7$</td>
      <td style="text-align:center;">0</td>
      <td style="text-align:center;">4671.9527587890625</td>
      <td style="text-align:center;">4673.22265625</td>
    </tr>
  </tbody>
</table>

最後區間縮小到只剩下 $4672$ 附近，因此可得 RSA 函數 $x \mapsto x^7 \pmod{10403}$ 對密文 $3$ 的原像為 $4672$。

</div>

<div class="remark">
<strong>Remark.</strong>
Bit security 所關心的，並不是單一 bit 是否只是微不足道的局部資訊，而是這類看似有限的資訊是否已足以恢復整體秘密。對離散對數問題而言，最低位元構成 hard predicate；對 RSA 問題而言，奇偶性、是否落在 $N/2$ 以上，以及某些低位 bits 也都構成 hard predicates。這表示對這些 one-way functions 而言，局部資訊的洩漏在本質上與整體反轉同樣危險。
</div>

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 19. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
