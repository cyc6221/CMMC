---
layout: page
title: Difference of Two Squares and Relations
date: 2026-03-30
last_updated: 2026-03-30
tags: [difference-of-two-squares, relations, factor-base, linear-algebra, congruence-of-squares]
---

許多整數分解演算法的核心都可歸結為同一個目標：找出兩個整數 $x,y$，使得
$$
x^2 \equiv y^2 \pmod N.
$$
一旦得到這樣的平方同餘，就有機會藉由最大公因數運算把 $N$ 的非平凡因數取出來。因此，difference of two squares 不只是單一步驟，而是許多 factoring methods 的結構核心。

## Difference of Two Squares

若已知
$$
x^2 \equiv y^2 \pmod N,
$$
則可改寫成
$$
x^2-y^2=(x-y)(x+y)\equiv 0 \pmod N.
$$
這表示 $N$ 整除 $(x-y)(x+y)$。若 $N=pq$，其中 $p,q$ 是不同質數，則理想情況下，希望其中一個因數整除 $x-y$，另一個因數整除 $x+y$。若真是如此，便可透過
$$
\gcd(x-y,N)
$$
取得一個非平凡因數。

設
$$
N=pq.
$$
則可能出現下列四種情況：

1. $p\mid (x-y)$ 且 $q\mid (x+y)$。
2. $p\mid (x+y)$ 且 $q\mid (x-y)$。
3. $p,q$ 都整除 $x-y$。
4. $p,q$ 都整除 $x+y$。

若計算
$$
d=\gcd(x-y,N),
$$
則分別對應為：

- 第一種情況：$d=p$
- 第二種情況：$d=q$
- 第三種情況：$d=N$
- 第四種情況：$d=1$

因此，若成功找到一組非平凡的平方同餘，便有相當機率從 $\gcd(x-y,N)$ 得到真正的因數。這也是為什麼許多分解演算法最後都不是直接找因數，而是先找 congruence of squares。

## Why This Idea Is Central

difference of two squares 的重要性在於：它把原本直接分解 $N$ 的問題，轉換成尋找某種可組合的關係式。直接找因數通常沒有明顯結構可用，但平方同餘則可以透過大量 relations 的蒐集與組合來產生。

現代分解法大多遵循這樣的框架：

- 先找很多 relations；
- 再把這些 relations 相乘；
- 讓各個質數的總指數變成偶數；
- 因而形成平方；
- 最後得到
  $$
  X^2 \equiv Y^2 \pmod N.
  $$

因此，difference of two squares 並不是孤立技巧，而是 relation-based factoring 的終點形式。

## Relations on a Factor Base

為了產生平方同餘，通常先選定一組小質數集合，稱為 factor base。之後尋找許多 relations，使相關數值都能在 factor base 上分解。

<div class="remark">
<div><strong>Remark.</strong></div>
Most modern factoring methods have the following strategy based on the difference of two squares method:
<ul>
  <li>Take a smoothness bound $B$.</li>
  <li>Compute a factorbase $F$ of all prime numbers $p$ less than $B$.</li>
  <li>Find a large number of values giving relations on the factorbase.</li>
  <li>Using linear algebra modulo $2$, find a combination of the relations to give an $X$ and $Y$ with $X^2=Y^2 \pmod N$.</li>
  <li>Attempt to factor $N$ by computing $\gcd(X-Y,N)$.</li>
</ul>
</div>

這裡的 relation，本質上是某種可寫成 factor base 上質數冪次乘積的同餘式。若有足夠多 relations，就能把它們組合成平方。

## From Relations to Squares

假設 factor base 是
$$
F=\{p,q,r\},
$$
並得到若干 relations。若將等式兩邊移到同一側，可把 relation 看成
$$
p^{e_1}q^{e_2}r^{e_3}\equiv 1 \pmod N
$$
這樣的形式。

現在的目標不是單獨使用某一個 relation，而是把若干個 relations 相乘，讓每個質數的總指數都變成偶數。因為只要所有指數皆為偶數，整體就能寫成平方。

例如若乘起來得到
$$
p^{2a}q^{2b}r^{2c}\equiv 1 \pmod N,
$$
則可寫成
$$
(p^aq^br^c)^2 \equiv 1^2 \pmod N.
$$
這樣便形成所需的平方同餘。

因此，relations 的意義不在於單條 relation 本身，而在於它們能否彼此組合後產生偶數指數結構。

## Exponent Vectors Modulo 2

判斷一組 relations 相乘後是否形成平方，只需要關心各質數指數的奇偶性。因此自然會把每一條 relation 的 exponent vector 取 mod $2$。

若某條 relation 對應的指數向量是
$$
(e_1,e_2,e_3),
$$
則在模 $2$ 下只記錄
$$
(e_1 \bmod 2,\ e_2 \bmod 2,\ e_3 \bmod 2).
$$
這樣的表示已足以判斷：多條 relation 相乘後，某個質數的總指數是否為偶數。

這是因為：

- 偶數次方在 mod $2$ 下記為 $0$；
- 奇數次方在 mod $2$ 下記為 $1$；
- 相乘時指數相加；
- 因此是否成平方，只取決於向量和是否為零向量。

## Linear Algebra Modulo 2

relations 的組合問題因此可轉成線性代數問題。若有很多條 relation，可把每一條 relation 的 exponent vector mod $2$ 作為矩陣的一列，得到一個矩陣 $A$。

若存在非零二元向量 $z$ 使得
$$
zA=0 \pmod 2,
$$
則表示由 $z$ 所選出的那些 relations 相乘後，所有質數的總指數都是偶數，因此形成平方。

<div class="remark">
<div><strong>Remark.</strong></div>
To find which equations to multiply together to obtain a square, we take a matrix $A$ with $\#F$ columns and number of rows equal to the number of equations. Each equation is coded into the matrix as a row, modulo two. We now try and find a binary vector $z$ such that
$$
zA=0 \pmod 2.
$$
</div>

這一步就是現代 factoring methods 中 relation combining 的核心。原本看似數論性的問題，在這裡被轉換成求矩陣 kernel 的問題。

## Why More Relations Than Factor Base Elements Are Needed

若 factor base 有 $\#F$ 個元素，那麼每條 relation 會對應到一個長度為 $\#F$ 的 mod $2$ 向量。想要找到非平凡線性依賴，通常就需要 relations 的數量多於 factor base 的維度。

這與一般線性代數相同：若向量數量超過空間維度，就必然存在非平凡線性關係。因此在 factoring 中，relation collection 的目標之一，就是蒐集比 factor base 大小還要多的 relations，讓 kernel 必然非空。

## Example of Combining Relations

設 factor base 為
$$
F=\{p,q,r\},
$$
並考慮三條 relations：

$$
p^2q^5r^2 = p^3q^4r^3 \pmod N,
$$

$$
pq^3r^5 = pqr^2 \pmod N,
$$

$$
p^3q^5r^3 = pq^3r^2 \pmod N.
$$

將每條 relation 整理到同一側後，可分別得到

$$
p^{-1}qr^{-1}\equiv 1 \pmod N,
$$

$$
q^2r^3\equiv 1 \pmod N,
$$

$$
p^2q^2r\equiv 1 \pmod N.
$$

若只看指數 mod $2$，則可寫成矩陣
$$
A=
\begin{pmatrix}
1 & 1 & 1\\
0 & 0 & 1\\
0 & 0 & 1
\end{pmatrix}.
$$
若取
$$
z=(0,1,1),
$$
則有
$$
zA=0 \pmod 2.
$$
這表示第二條與第三條 relation 相乘後，所有質數的總指數都變成偶數，因此可形成平方。

這個例子顯示：找平方同餘的關鍵，不是肉眼觀察每條 relation，而是把它們編碼成 mod $2$ 的向量後，自動地由 linear algebra 找出可組合的子集。

## Sparse Matrices in Factoring

實際分解中，factor base 的大小可能非常大，因此 relation matrix 也會非常大。不過這類矩陣通常非常 sparse，因為每條 relation 只涉及少數幾個質數，而不會在所有欄位上都有非零值。

這使得 factoring 中的 linear algebra 與一般 dense Gaussian elimination 很不同。若直接用標準 dense matrix representation，記憶體成本會非常高，因此實作上通常需要專門為 sparse binary matrices 設計的演算法。

<div class="remark">
<div><strong>Remark.</strong></div>
The matrix is very, very sparse. Standard Gaussian Elimination would start with a sparse matrix and end up with an upper triangular dense matrix, so advanced matrix algorithms are deployed which try not to alter the matrix too much.
</div>

因此，在大型 factoring project 中，linear algebra 常常是最困難的階段之一，不只是因為數學上要求 kernel，而是因為矩陣規模本身極大。

## Relations as Group-Theoretic Information

relations 也可以從群論角度理解。對於模 $N$ 的乘法群而言，factor base 可視為某種生成元的候選集合，而 relations 則反映這些元素之間的依賴關係。當 relations 足夠多時，就能藉由這些依賴關係構造出平方同餘。

因此，relations 的蒐集不是單純記錄一些分解結果，而是在逐步累積足以讓群結構中某些元素合併成平方的資訊。

## Relation Collection as the Main Challenge

在這類方法中，最後的目標雖然是找到
$$
X^2 \equiv Y^2 \pmod N,
$$
但真正困難的部分通常不是最後的 $\gcd(X-Y,N)$，而是如何有效蒐集足夠多的 relations。

<div class="remark">
<div><strong>Remark.</strong></div>
The trick in all algorithms of this form is how to find the relations. All the other details of the algorithms are basically the same.
</div>

這也解釋了為什麼不同 factoring methods 雖然共享相同的 difference-of-two-squares 架構，但仍然發展出許多不同的 relation collection 技術，例如 continued fractions、quadratic forms、sieving，以及 number fields 中的 ideal factorizations。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 12. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
