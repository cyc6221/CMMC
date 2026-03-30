---
layout: page
title: Pollard's p-1 Method
date: 2026-03-30
last_updated: 2026-03-30
tags: [pollards-p-minus-1, factoring, power-smooth, fermats-little-theorem, special-purpose-factoring]
---

Pollard's $p-1$ method 是一種 special-purpose factoring algorithm。它不是對所有合數都同樣有效，而是特別適合處理這樣的情況：目標整數 $N$ 的某個質因數 $p$，其 $p-1$ 具有很多小的 prime power 因子。當這種結構存在時，演算法可以利用模 $p$ 乘法群的性質，把 $p$ 從 $N$ 中分離出來。

## Basic Idea

設
$$
N=pq,
$$
其中 $p,q$ 是未知質因數。Pollard's $p-1$ method 的核心想法是：若存在某個界 $B$，使得 $p-1$ 是 $B$-power smooth，而 $q-1$ 不是 $B$-power smooth，則可構造一個數 $a$，使得
$$
a\equiv 1 \pmod p
$$
但通常
$$
a\not\equiv 1 \pmod q.
$$
一旦出現這種情況，就表示 $p$ 會整除 $a-1$，而 $q$ 不整除 $a-1$，因此可由
$$
\gcd(a-1,N)
$$
取出非平凡因數 $p$。

這個方法的本質是：利用某個因數 $p$ 的群階資訊，而不是直接對 $N$ 本身做一般性搜尋。

## Power Smooth Condition

Pollard's $p-1$ method 所依賴的關鍵條件，是 $p-1$ 必須具有足夠平滑的結構。

<div class="definition">
<div><strong>Definition 12.4 (Power Smooth).</strong></div>
A number is said to be $B$-power smooth if every prime power dividing $N$ is less than $B$.
</div>

若 $p-1$ 是 $B$-power smooth，表示在 $p-1$ 的質因數分解中，每個出現的 prime power 都不大。這通常意味著 $p-1$ 很可能整除某個由小整數構造出的巨大指數，例如 $B!$。一旦做到這一點，就可透過模 $p$ 的乘法群把指數壓到群階的倍數上。

## Why Fermat's Little Theorem Is Used

這個方法直接利用了 Fermat's Little Theorem。對任意與 $p$ 互質的整數 $a$，都有
$$
a^{p-1}\equiv 1 \pmod p.
$$
因此若能構造一個指數 $M$，使得
$$
p-1 \mid M,
$$
則必有
$$
a^M\equiv 1 \pmod p.
$$

Pollard's $p-1$ method 中常選擇的 $M$，實際上是透過小整數連續乘冪累積出來的，效果相當於讓 $M$ 含有大量小質數及其高次冪。若 $p-1$ 的結構足夠 smooth，則很容易有 $p-1\mid M$。

但另一個質因數 $q$ 的 $q-1$ 若不具備相同性質，通常不會整除這個 $M$，因此不一定會有
$$
a^M\equiv 1 \pmod q.
$$
這正是演算法能把 $p$ 與 $q$ 分開的原因。

## Standard Form of the Method

通常取初始值 $a=2$，然後依序對小整數做 modular exponentiation，逐步把指數推高。

<div class="algorithm">
<div><strong>Algorithm 12.4: Pollard’s $P-1$ factoring method.</strong></div>
Set $a=2$. For $j=2$ to $B$ do
$$
a=a^j \bmod N.
$$
Then compute
$$
p=\gcd(a-1,N).
$$
If $p\neq 1$ and $p\neq N$, return that $p$ is a factor of $N$; otherwise return “No Result”.
</div>

這段迭代的結果等價於把 $a$ 變成
$$
a=2^{B!}\pmod N.
$$
因此，演算法本質上是在檢查：當指數取為 $B!$ 時，是否會讓某個質因數對應的乘法群先回到單位元，而另一個質因數還沒有。

## Why the Method Works

假設
$$
N=pq,
$$
並且 $p-1$ 是 $B$-power smooth。由於 $B!$ 含有所有不超過 $B$ 的整數因子，因此很有機會使
$$
p-1\mid B!.
$$
若這成立，則
$$
2^{B!}\equiv 1 \pmod p.
$$
也就是說，若令
$$
a=2^{B!}\pmod N,
$$
則有
$$
a-1\equiv 0 \pmod p.
$$

若另一方面 $q-1\nmid B!$，則通常不會有
$$
a\equiv 1 \pmod q.
$$
於是 $q$ 不整除 $a-1$。在這種情況下，
$$
\gcd(a-1,N)=p.
$$

因此，演算法之所以成功，不是因為它「直接找到因數」，而是因為它建出一個數，這個數在模 $p$ 下剛好等於 $1$，但在模 $q$ 下通常不是 $1$。

## Structural Interpretation

從群論角度來看，Pollard's $p-1$ method 是在利用群
$$
(\mathbf{Z}/p\mathbf{Z})^\times
$$
的階為 $p-1$ 這件事。若 exponent $M$ 是群階的倍數，則任意元素升到 $M$ 次方都會回到單位元。

因此，這個方法不是隨機撞因數，而是刻意利用某個因數 $p$ 所對應乘法群的已知結構。真正未知的部分不是群階的形式，而是哪一個質因數會剛好讓 $p-1$ 具有 smooth structure。

## Example of Success

考慮
$$
N=15770708441.
$$
若取 $B=180$，執行演算法後可得
$$
a=2^{B!}\pmod N = 1162022425.
$$
接著計算
$$
\gcd(a-1,N)=135979.
$$
因此得到一個非平凡因數
$$
p=135979.
$$

此時
$$
N=135979\cdot 115979.
$$
而兩個質因數的前一個整數分別為
$$
135979-1=135978=2\cdot 3\cdot 131\cdot 173,
$$
以及
$$
115979-1=115978=2\cdot 103\cdot 563.
$$
可見前者的結構對 $B=180$ 而言是 power smooth 的，而後者不是，因此演算法成功把第一個因數取了出來。

## Complexity

Pollard's $p-1$ method 的複雜度可寫為
$$
O\!\left(B\log B(\log N)^2+(\log N)^3\right).
$$
這表示：若 $B$ 本身不大，例如
$$
B=O((\log N)^i)
$$
對某個固定整數 $i$ 而言，則整體時間可以是 polynomial time。

<div class="remark">
<div><strong>Remark.</strong></div>
One can show that the complexity of the $P-1$ method is given by
$$
O(B\log B(\log N)^2+(\log N)^3).
$$
So if we choose $B=O((\log N)^i)$, for some integer $i$, then this is a polynomial-time factoring algorithm, but it only works for numbers of a special form.
</div>

這裡的關鍵不是它本身一定快，而是只要目標整數剛好有某個因數滿足平滑條件，它就能非常有效率。

## Why It Is Not a General-Purpose Method

Pollard's $p-1$ method 的限制很明顯：它的成功高度依賴某個質因數 $p$ 的 $p-1$ 是否 smooth。若 $p-1$ 含有很大的質因數或大 prime powers，則即使 $N$ 本身不大，演算法也可能完全得不到結果。

<div class="remark">
<div><strong>Remark.</strong></div>
The $P-1$ method is not really a general-purpose factoring algorithm. It works well only when a prime factor $p$ of $N$ has the property that $p-1$ is $B$-power smooth for a reasonably small bound $B$.
</div>

因此，這種方法更適合被理解為「針對特殊結構的攻擊方法」，而不是像 Quadratic Sieve 或 Number Field Sieve 那樣的通用分解法。

## Choice of $B$

演算法中需要先選定一個 smoothness bound $B$。這個參數太小時，可能無法覆蓋 $p-1$ 的所有 prime powers；太大時，計算量又會增加。因此實作上常會逐步增加 $B$，希望在成本與成功機率之間取得平衡。

$B$ 的角色可以理解成：使用者對目標因數結構的猜測尺度。若猜得準，演算法可能很快成功；若猜不到適當範圍，就不會有結果。

## Relation to Safe Primes

由於 Pollard's $p-1$ method 的存在，在某些應用中會建議選擇滿足
$$
p-1=2p_1,\qquad q-1=2q_1,
$$
其中 $p_1,q_1$ 也是質數的質數。這樣的質數稱為 safe primes。

<div class="remark">
<div><strong>Remark.</strong></div>
If RSA primes are chosen so that
$$
p-1=2p_1 \qquad\text{and}\qquad q-1=2q_1,
$$
where $p_1$ and $q_1$ are prime, then the primes $p$ and $q$ are called safe primes.
</div>

若使用 safe primes，則 $p-1$ 和 $q-1$ 幾乎不可能是小界下的 power smooth numbers，因此 Pollard's $p-1$ method 會失去效果。

不過在現代大型 RSA modulus 的情況下，即使只是隨機選取足夠大的質數，$p-1$ 恰好極度 smooth 的機率也已經很低。因此是否必須特別選 safe primes，往往要視具體安全需求而定。

## Failure Modes

Pollard's $p-1$ method 失敗時，通常有兩種典型情況：

- $\gcd(a-1,N)=1$，表示目前指數還不足以讓任何一個質因數單獨露出來；
- $\gcd(a-1,N)=N$，表示所有質因數都同時使 $a\equiv 1$，因此無法區分出非平凡因數。

前者通常代表 $B$ 太小，或目標因數沒有 smooth 結構；後者則表示目前得到的 congruence 太強，沒有提供區分能力。

這也說明了為什麼 Pollard's $p-1$ method 雖然概念簡潔，但在實際使用時仍需要根據輸出狀況調整參數與策略。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 12. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
