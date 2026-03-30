---
layout: page
title: Number Field Sieve
date: 2026-03-30
last_updated: 2026-03-30
tags: [number-field-sieve, factoring, algebraic-number-fields, sieving, factor-base, congruence-of-squares]
---

Number Field Sieve (NFS) 是目前已知最快的通用整數分解演算法之一。它的核心目標仍然是構造
$$
x^2 \equiv y^2 \pmod N,
$$
再藉由
$$
\gcd(x-y,N)
$$
嘗試取出 $N$ 的非平凡因數。與其他現代 factoring methods 相同，NFS 也包含 relation collection 與 linear algebra 兩個主要階段；不同之處在於，NFS 不是只在整數環中尋找 relations，而是進一步使用 algebraic number fields 的結構來提高 relation collection 的效率。

## General Form

NFS 的整體架構仍然遵循 congruence of squares 的基本思路。若能找到整數 $x,y$ 使得
$$
x^2 \equiv y^2 \pmod N,
$$
則有
$$
(x-y)(x+y)\equiv 0 \pmod N.
$$
若這組平方同餘不是平凡的，便可能透過
$$
\gcd(x-y,N)
$$
得到一個非平凡因數。

<div class="remark">
<div><strong>Remark.</strong></div>
The Number Field Sieve is the fastest known factoring algorithm. The basic idea is to factor a number $N$ by finding two integers $x$ and $y$ such that
$$
x^2 \equiv y^2 \pmod N.
$$
</div>

NFS 的關鍵不是最後這一步，而是如何有效建出產生平方同餘所需的大量 relations。

## From the Linear Sieve to NFS

理解 NFS 的一個自然出發點，是先看 linear sieve 的結構。linear sieve 嘗試尋找一些小整數 $a$ 與參數 $\lambda$，使得
$$
b=a+N\lambda
$$
是 smooth 的。若 $a$ 本身也可以在 factor base 上分解，就能得到 relation
$$
a \equiv b \pmod N.
$$
蒐集足夠多 relations 後，再用線性代數把它們組合成平方。

NFS 延續了這個框架，但 relation 的來源不再只是整數的 smoothness，而是同時在兩個 number fields 中尋找可對應的 smooth 結構。也就是說，NFS 不改變 factoring 的總體架構，而是改變 relations 的生成方式。

## Initial Setup

NFS 一開始要選擇兩個 monic, irreducible polynomials with integer coefficients $f_1,f_2$，設其 degrees 分別為 $d_1,d_2$，並找到一個整數 $m$，使得
$$
f_1(m)\equiv f_2(m)\equiv 0 \pmod N.
$$

接著定義兩個 number fields
$$
K_1=\mathbf{Q}(\theta_1),\qquad K_2=\mathbf{Q}(\theta_2),
$$
其中
$$
f_1(\theta_1)=0,\qquad f_2(\theta_2)=0.
$$

並考慮兩個 homomorphisms
$$
\phi_i:\mathbf{Z}[\theta_i]\to \mathbf{Z}/N\mathbf{Z},
\qquad
\theta_i\mapsto m.
$$

這樣的設定使得兩個不同 number fields 中的元素，最終都能映到同一個模 $N$ 的世界裡。NFS 的整個設計，就是在兩個 number fields 中同步蒐集 relations，最後把它們映回 $\mathbf{Z}/N\mathbf{Z}$ 形成平方同餘。

## Target Relations

NFS 希望找到一個集合
$$
S\subseteq \{(a,b)\in \mathbf{Z}^2:\gcd(a,b)=1\}
$$
使得
$$
\prod_{(a,b)\in S}(a-b\theta_1)=\beta^2
\qquad\text{and}\qquad
\prod_{(a,b)\in S}(a-b\theta_2)=\gamma^2
$$
其中 $\beta\in K_1,\gamma\in K_2$。

若能做到這件事，則映到模 $N$ 之後可得
$$
\phi_1(\beta)^2\equiv \phi_2(\gamma)^2 \pmod N.
$$
這就提供了所需的平方同餘，接著便可用最大公因數運算嘗試分解 $N$。

因此，NFS 的 relation 並不是單純整數上的 factorization relation，而是同時要求在兩個不同的 number fields 中都形成 square structure。

## Smoothness in Number Fields

在 NFS 中，smoothness 的概念必須從整數推廣到 algebraic integers。

<div class="definition">
<div><strong>Definition 12.5.</strong></div>
An algebraic integer is ‘smooth’ if and only if the ideal it generates is only divisible by ‘small’ prime ideals.
</div>

這一定義的重點在於：不再只看一個整數是否能分解成小質數，而是看一個 algebraic integer 所生成的 ideal，是否只由小的 prime ideals 構成。這使得 smoothness 的觀念得以搬到 algebraic number fields 中，也讓 sieve 技術可以在更豐富的代數環境中運作。

## Norms and Factor Bases

令
$$
F_i(X,Y)=Y^{d_i}f_i(X/Y).
$$
則對於每個 $i$，有 norm relation
$$
N_{K_i/\mathbf{Q}}(a-b\theta_i)=F_i(a,b).
$$

這表示：若想知道 $a-b\theta_i$ 是否在某個意義下是 smooth 的，可以先觀察其 norm $F_i(a,b)$ 是否具有合適的質因數分解。雖然 algebraic integer 本身的 factorization 與整數不同，但 norm 提供了一個連結，讓整數上的資訊可以協助偵測 ideal smoothness。

對每個 polynomial，NFS 定義一個 factor base：
$$
F_i=\{(p,r): p \text{ a prime},\ r\in \mathbf{Z}\text{ such that }f_i(r)\equiv 0 \pmod p\}.
$$

每個 $(p,r)\in F_i$ 對應到一個 degree one prime ideal
$$
\langle p,\theta_i-r\rangle
=
p\mathbf{Z}[\theta_i]+(\theta_i-r)\mathbf{Z}[\theta_i].
$$

factor base 的角色，與其他 sieve-based factoring methods 類似：它提供了一組可控制的小 building blocks，使 relations 能以有限維的形式被編碼與處理。

## Sieving for Relations

NFS 與其他 factoring methods 一樣，也透過 sieve 來蒐集 relations。對固定的 $a$，在某個範圍內考慮 $b$ 的可能值，並建立 sieve array。初始時，陣列值大致反映
$$
\log_2(F_1(a,b)\cdot F_2(a,b)).
$$

接著對 factor base 中的每個 $(p,r)$，若某個 $b$ 滿足
$$
a-rb\equiv 0 \pmod p,
$$
便從對應位置扣除 $\log_2 p$。如果某個位置最後剩下的值很小，就代表對應的 $F_1(a,b)$ 與 $F_2(a,b)$ 很可能在 factor base 上有大部分的分解，因此 $(a,b)$ 很可能提供一條 relation。

<div class="remark">
<div><strong>Remark.</strong></div>
If the tolerance level is set in a sensible way then we have a good chance that both $F_1(a,b)$ and $F_2(a,b)$ factor over the prime ideals in the factorbase, with the possibility of some large prime ideals creeping in.
</div>

這種做法的精神與 linear sieve 很接近：不是對每個候選值都做完整分解，而是先用 sieve 快速篩出最有可能成功的候選者，再集中成本處理這些候選者。

## From Ideal Squares to Element Squares

relations 蒐集完之後，會經過線性代數，找出某個 subset $S$，使得
$$
\prod_{(a,b)\in S}\langle a-b\theta_i\rangle
$$
在 ideal sense 下是平方。這還不夠，因為最終需要的是 element square，也就是希望
$$
\prod_{(a,b)\in S}(a-b\theta_i)
$$
本身是某個元素的平方，而不只是其 generated ideal 是平方。

這裡就需要額外加入來自 infinite places 的條件，確保 square ideal 確實對應到 square element。實作上會透過加入一些 quadratic characters 來達成這件事。

## Quadratic Characters

為了保證最後得到的是 element square，而不只是 ideal square，NFS 會引入額外的 quadratic character conditions。

取某些適當的 rational primes $q$，要求對於選出的 relation subset $S$，有
$$
\prod_{(a,b)\in S}\left(\frac{a-bs_q}{q}\right)=1,
$$
其中 $\left(\frac{\cdot}{q}\right)$ 是 Legendre symbol。

由於 Legendre symbol 具有乘法性，這可以轉成線性條件，加進 relation matrix 中作為額外欄位。如此一來，最終透過 linear algebra 找到的 relation subset，不只會讓 ideal exponents 形成偶數，也會在 sign 與 infinite places 的層面滿足平方條件。

## Taking Square Roots

即使透過 linear algebra 已知某個乘積應該是平方，仍然需要真的把平方根算出來。例如若有
$$
\beta^2=\sum_{j=0}^{d_1-1} a_j\theta_1^j,
$$
則還必須求出
$$
\beta=\sum_{j=0}^{d_1-1} b_j\theta_1^j
$$
使得
$$
\left(\sum_{j=0}^{d_1-1} b_j\theta_1^j\right)^2
=
\sum_{j=0}^{d_1-1} a_j\theta_1^j.
$$

這一步在 NFS 中並不簡單，因為係數通常非常巨大，而且運算發生在 number field 裡。常見做法是先在很多大質數模下計算平方根，再利用 Hensel lifting 與 Chinese Remainder Theorem 將結果重建出來。

<div class="remark">
<div><strong>Remark.</strong></div>
One way this is overcome is by computing such a square root modulo a large number of very large primes. We then perform Hensel lifting and Chinese remaindering to recover the square root.
</div>

因此，NFS 中的 square root step 並不是一個裝飾性的附帶步驟，而是整個演算法完成平方同餘所不可缺少的一環。

## Polynomial Selection

NFS 的實際效率極度依賴一開始如何選擇 polynomials $f_1,f_2$。理論上只要求
$$
f_1(m)\equiv f_2(m)\equiv 0 \pmod N,
$$
但在實作上，通常還希望 polynomials 具有一些更好的性質，例如：

- 係數小；
- 有較多 real roots；
- 對許多小質數有較多 roots modulo $p$；
- Galois groups 較小。

這些性質都會影響 sieve 階段 relation 的產出效率，因此 polynomial selection 往往是 NFS 中最需要經驗與技巧的部分之一。

<div class="remark">
<div><strong>Remark.</strong></div>
It is often worth spending a few weeks trying to find a good couple of polynomials before one starts to attempt the factorization algorithm proper.
</div>

這也反映出：NFS 雖然在理論上有清楚的高層架構，但實作成敗很大程度取決於前期的 heuristic optimization。

## Large Prime Variation and Parallelism

與其他現代 factoring methods 一樣，NFS 也能使用 large prime variation。也就是說，relation 不必完全在 factor base 上分解，只要除了少數較大的 prime ideals 之外，其餘部分已經 smooth，就仍可保留下來，之後再與其他 relations 拼接。

此外，NFS 的 relation collection 階段高度適合平行化。不同區域的 sieve 幾乎可以獨立進行，因此可把工作分派給大量機器，最後再把找到的 relations 回傳到中央主機做統整與 linear algebra。

<div class="remark">
<div><strong>Remark.</strong></div>
The sieving can be carried out in parallel. The slaves communicate any relations they find to the central master computer which performs the linear algebra step.
</div>

這種分工方式使 NFS 成為大型分解專案中的標準選擇：前段 relation collection 可大規模分散執行，後段 linear algebra 則集中在高效能設備上處理。

## Relation Matrix and Linear Algebra

當收集到足夠多 relations 後，便會把它們編碼成 matrix。這個 matrix 不只記錄 factor base 中各 prime ideals 的 exponent parity，也會加入 quadratic characters 等額外資訊。接著在 $\mathbf{F}_2$ 上求其 kernel，找到一組非平凡線性依賴，從而得到可形成平方的 relation subset。

這一步與其他 modern factoring methods 十分相似。換句話說，NFS 與 QS 或其他 relation-based methods 最大的不同，並不在 linear algebra 階段，而是在 relation collection 的來源與品質。

## Why NFS Is Faster

NFS 之所以成為最快的通用整數分解法，關鍵在於其 relation collection 的 asymptotic behavior 優於 earlier methods。相較於 Quadratic Sieve 的複雜度約為
$$
L_N(1/2,c),
$$
NFS 可達到
$$
L_N(1/3,c)
$$
的型態。這使得當 $N$ 足夠大時，NFS 的成長速度顯著較慢，因此在大規模 factoring 上更具優勢。

NFS 並不是因為最後的 $\gcd$ 或 linear algebra 比別的方法更簡單，而是因為它在更深層的代數結構中找 relations，使 smoothness 的平衡點被推進到更好的漸近尺度。

## A Small Example

若要用非常簡化的方式展示 NFS 的結構，可考慮選擇
$$
N=290^2+1=84101,
$$
取
$$
f_1(x)=x^2+1,\qquad f_2(x)=x-290,
$$
並令 $m=290$。則有
$$
f_1(m)\equiv f_2(m)\equiv 0 \pmod N.
$$

接著在兩側分別考慮對應的 algebraic structures，一側是 $\mathbf{Z}[i]$，另一側則是 $\mathbf{Z}$。從一些 pairs $(x,y)$ 可得到對應的 factorization relations，再透過簡單的 linear algebra 把它們組合成平方。最後把對應元素映到模 $N$ 中，便能得到平方同餘，進而分解出 $N$ 的非平凡因數。

這個例子展示的不是實務上的完整 NFS，而是其最核心的邏輯：在兩個不同的代數世界中同時建立可組合的平方結構，最後映回模 $N$ 產生 congruence of squares。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 12. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
