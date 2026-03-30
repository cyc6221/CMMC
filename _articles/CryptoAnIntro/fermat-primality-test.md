---
layout: page
title: Fermat Primality Test
date: 2026-03-30
last_updated: 2026-03-30
tags: [fermat-test, primality-testing, pseudoprime, carmichael-numbers]
---

Fermat primality test 是一種 probabilistic primality test。它的出發點不是直接構造質數證明，而是利用一個質數一定滿足的同餘性質，來快速排除許多 composite。這個方法的優點在於 modular exponentiation 可以非常快地完成，因此即使輸入是大整數，也能有效進行測試。

## Basic Idea

Fermat primality test 建立在 Fermat’s Little Theorem 上。若 $p$ 是 prime，且 $a$ 與 $p$ 互質，則
$$
a^{p-1}\equiv 1 \pmod p.
$$
因此，對一個待測整數 $n$，若找到某個 $a$ 使得
$$
a^{n-1}\not\equiv 1 \pmod n,
$$
那麼 $n$ 就不可能是 prime。也就是說，這個測試本質上是一個 **compositeness test**：它能有效證明某個數是 composite，但不能單靠一次測試就證明某個數一定是 prime。

<div class="theorem">
<strong>Theorem.</strong>
If $p$ is prime and $a\in (\mathbb{Z}/p\mathbb{Z})^\ast$, then
$$
a^{p-1}\equiv 1 \pmod p.
$$
</div>

<div class="remark">
<strong>Remark.</strong>
The Fermat primality test uses the converse heuristic of Fermat's Little Theorem: if $a^{n-1}\not\equiv 1 \pmod n$, then $n$ is definitely composite.
</div>

## Relation with Lagrange’s Theorem

從群論角度來看，Fermat’s Little Theorem 可以視為更一般事實的一個特例。若 $G$ 是有限乘法群，則對任意 $a\in G$，有
$$
a^{\#G}=1.
$$
當 $G=(\mathbb{Z}/n\mathbb{Z})^\ast$ 時，就得到
$$
a^{\varphi(n)}\equiv 1 \pmod n.
$$
再把 $n$ 取成 prime $p$，因為 $\varphi(p)=p-1$，就得到
$$
a^{p-1}\equiv 1 \pmod p.
$$
Fermat primality test 正是利用這個性質，把「prime 一定滿足的條件」拿來作為篩除 composite 的工具。

## Fermat Test to the Base $a$

給定整數 $n>2$ 與一個 base $a$，其中 $2\le a\le n-1$，Fermat test to the base $a$ 的步驟就是計算
$$
b=a^{n-1}\bmod n.
$$
若 $b\ne 1$，則立即判定 $n$ 為 composite；若 $b=1$，則這個 base 沒有提供 compositeness 的證據，此時只能說 $n$ 對這個 base 通過了 Fermat test。

<div class="definition">
<strong>Definition.</strong>
Given an integer $n$ and a base $a$, the Fermat test to the base $a$ checks whether
$$
a^{n-1}\equiv 1 \pmod n.
$$
If this congruence fails, then $n$ is composite.
</div>

## Algorithm

實作上通常不只測一次，而是隨機挑選多個 base。若某一次出現
$$
a^{n-1}\not\equiv 1 \pmod n,
$$
就立刻輸出 composite；若重複做了 $k$ 次都沒有失敗，則輸出 probably prime。原始章節給出的 pseudo-code 如下。

<div class="algorithm">
<strong>Algorithm 12.1: Fermat’s test for primality</strong>
for $i=0$ to $k-1$ do  
Pick $a$ from $[2,\ldots,n-1]$  
$b=a^{n-1}\bmod n$  
if $b\ne 1$ then return $(\text{Composite},a)$  
end  
return ("Probably Prime")
</div>

這裡的關鍵是 modular exponentiation 可以在 polynomial time 內完成，因此單次測試相當快。整個方法之所以可行，不是因為它保證一次就判定質數，而是因為它可以非常快速地重複許多次。

## Witness for Compositeness

若 Fermat test 輸出 $(\text{Composite},a)$，那麼這個 $a$ 就是一個 witness for compositeness。因為任何人只要重新驗證
$$
a^{n-1}\not\equiv 1 \pmod n
$$
就能確認 $n$ 不是 prime。這使得 Fermat test 在輸出 composite 時，會同時附帶一個容易驗證的證據。

<div class="definition">
<strong>Definition.</strong>
If $n$ is composite and
$$
a^{n-1}\not\equiv 1 \pmod n,
$$
then $a$ is called a witness for the compositeness of $n$.
</div>

<div class="remark">
<strong>Remark.</strong>
A witness for compositeness is a verifiable certificate that $n$ is not prime.
</div>

## Probable Prime

若重複做了多次 Fermat test 都沒有找到 witness，演算法就會回傳 “Probably Prime”。這個輸出不能理解成「已經證明是質數」，而只能理解成「目前沒有找到 compositeness 的證據」。因此，Fermat test 的語意不是 proof of primality，而是 repeated failure to refute primality。

根據原始章節的敘述，若 $n$ 是 composite，則對隨機選到的 base $a$，以大於 $1/2$ 的機率會得到
$$
a^{n-1}\ne 1 \pmod n.
$$
因此若做 $k$ 次都沒有找到 witness，則把 composite 誤判為 “Probably Prime” 的機率至多約為
$$
\frac{1}{2^k}.
$$
這也是為什麼重複測試可以快速降低錯誤機率。

<div class="remark">
<strong>Remark.</strong>
If the algorithm outputs “Probably Prime” after $k$ iterations, then $n$ is either prime or a probable prime, and the error probability is at most $2^{-k}$ under the stated analysis.
</div>

## Pseudo-Prime

Fermat test 的根本限制在於：有些 composite 也可能滿足
$$
a^{n-1}\equiv 1 \pmod n
$$
對某些 base 成立。當這種情況發生時，Fermat test 就無法用這個 base 偵測出 compositeness。這類 composite 被稱為 pseudo-prime to the base $a$。

原始章節給的一個例子是
$$
n=11\cdot 31=341,\qquad a=2.
$$
此時雖然 $341$ 明顯不是質數，但仍有
$$
2^{340}\equiv 1 \pmod{341}.
$$
因此，341 是一個 Fermat pseudo-prime to the base $2$。這說明了通過單一 base 的 Fermat test，並不足以保證 primality。

<div class="definition">
<strong>Definition.</strong>
A composite integer $n$ is called a <em>(Fermat) pseudo-prime to the base $a$</em> if
$$
a^{n-1}\equiv 1 \pmod n.
$$
</div>

## Carmichael Numbers

pseudo-prime 現象雖然已經顯示 Fermat test 不完美，但還有一類更麻煩的例外：某些 composite 對所有與它互質的 base 都會通過 Fermat test。這些數稱為 Carmichael numbers。也就是說，對這類數而言，只要 base 與 $n$ 互質，就永遠有
$$
a^{n-1}\equiv 1 \pmod n.
$$
因此單靠 Fermat test，不可能從這些 base 中找到 witness。

原始章節指出，Carmichael numbers 有無限多個，最前面的例子包括
$$
561,\ 1105,\ 1729.
$$
它們並不是隨機偶發的極端例外，而是一個真正需要正視的結構性障礙。

<div class="definition">
<strong>Definition.</strong>
A composite integer $N$ is called a <em>Carmichael number</em> if
$$
a^{N-1}\equiv 1 \pmod N
$$
for every $a$ coprime to $N$.
</div>

原始章節列出 Carmichael numbers 的幾個性質：

<div class="lemma">
<strong>Lemma.</strong>
Carmichael numbers have the following properties:
<ul>
  <li>They are always odd.</li>
  <li>They have at least three prime factors.</li>
  <li>They are square free.</li>
  <li>If $p$ divides a Carmichael number $N$ then $p-1$ divides $N-1$.</li>
</ul>
</div>

這些性質說明 Carmichael numbers 並不是隨便拼湊出的 composite，而是具有特殊算術結構的整數。也正因為這類數的存在，Fermat test 在實務上通常不被視為最終使用的 primality test，而更常被 Miller–Rabin 之類更強的測試取代。

## Practical Meaning

Fermat primality test 的重要性在於，它展示了 probabilistic primality testing 的基本模式：

1. 使用一個 prime 必須滿足的代數性質；
2. 透過快速 modular exponentiation 檢查這個性質；
3. 一旦失敗就立即得到 compositeness；
4. 若重複成功，則只得到 probable primality，而不是 proof of primality。

因此，Fermat test 的核心價值不在於它最終是否足夠安全，而在於它是理解後續更強演算法的一個基本起點。Miller–Rabin test 可以看成是在相同精神下，進一步修補 pseudo-prime 與 Carmichael number 所造成的缺陷。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 12. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
