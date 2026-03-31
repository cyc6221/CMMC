---
layout: page
title: Trial Division
date: 2026-03-29
last_updated: 2026-03-31
tags: [primality-testing, prime-factor]
---

**Trial division** 是最直接的整數檢驗方法之一。若整數 $n>1$ 是 composite，則它必有一個不超過 $\sqrt{n}$ 的非平凡因數。因此，要判斷 $n$ 是否為 prime，只需檢查從 $2$ 到 $\lfloor \sqrt{n}\rfloor$ 之間是否有整數可整除 $n$。若存在，則 $n$ 是 composite；若不存在，則 $n$ 是 prime。

## Basic Idea

對輸入整數 $n$，trial division 依序測試
$$
2,3,4,\dots,\lfloor \sqrt{n}\rfloor
$$
是否滿足
$$
d\mid n.
$$
只要找到一個非平凡因數 $d$，即可停止並判定 $n$ 為 composite。若所有這些整數都無法整除 $n$，則可判定 $n$ 為 prime。此方法不只判定合數，也能直接找出因數。

<div class="definition">
<strong>Definition.</strong>
Trial division is the method of testing an integer $n$ by checking whether any integer $d$ with $2\le d\le \sqrt{n}$ divides $n$.
</div>

## Correctness

trial division 的正確性來自以下事實：若
$$
n=ab
$$
且 $1<a<n,\ 1<b<n$，則 $a$ 與 $b$ 不可能同時都大於 $\sqrt{n}$。否則
$$
ab>\sqrt{n}\cdot \sqrt{n}=n,
$$
與 $ab=n$ 矛盾。因此，只要 $n$ 是 composite，就至少有一個因數不超過 $\sqrt{n}$。檢查完 $2$ 到 $\sqrt{n}$ 的所有整數後，便足以判定 $n$ 是否為質數。

<div class="lemma">
<strong>Lemma.</strong>
If $n$ is composite, then $n$ has a non-trivial divisor $d$ such that $2\le d\le \sqrt{n}$.
</div>

<div class="proof">
<strong>Proof.</strong>
Suppose $n$ is composite. Then there exist integers $a,b$ such that
$$
n=ab
$$
with $1<a<n$ and $1<b<n$. If both $a>\sqrt{n}$ and $b>\sqrt{n}$, then
$$
ab>\sqrt{n}\sqrt{n}=n,
$$
which is impossible. Hence at least one of $a$ or $b$ is at most $\sqrt{n}$. Therefore $n$ has a non-trivial divisor $d$ with
$$
2\le d\le \sqrt{n}.
$$
</div>

<div class="theorem">
<strong>Theorem.</strong>
An integer $n>1$ is prime if and only if no integer $d$ with $2\le d\le \sqrt{n}$ divides $n$.
</div>

<div class="proof">
<strong>Proof.</strong>
If $n$ is prime, then by definition it has no non-trivial divisors, so no integer $d$ with $2\le d\le \sqrt{n}$ divides $n$.

Conversely, suppose no integer $d$ with $2\le d\le \sqrt{n}$ divides $n$. If $n$ were composite, then by the previous lemma it would have a non-trivial divisor in the interval $[2,\sqrt{n}]$, which is a contradiction. Hence $n$ must be prime.
</div>

## Primality Test

當 trial division 用於 primality testing 時，它是完全 deterministic 的方法。它不會輸出「probably prime」，而是直接給出確定答案：不是找到因數，就是確認在必要範圍內沒有因數，因此可判定為 prime。

它的一個優點是：若輸出 composite，則找到的因數本身就是 certificate。第三方只需檢查此因數是否整除 $n$，即可確認 $n$ 不是 prime。若輸出 prime，則不會額外產生精簡的 certificate；若要再次確認，通常仍需重新執行同樣的檢查。

<div class="remark">
<strong>Remark.</strong>
When trial division outputs that $n$ is composite, it also outputs a non-trivial factor of $n$, which serves as an easily verifiable certificate of compositeness.
</div>

## Running Time

trial division 的主要缺點是效率。若輸入 $n$ 本身是質數，或其最小因數很大，則最壞情況下必須檢查到 $\sqrt{n}$。因此步數量級為
$$
O(\sqrt{n}).
$$
若把輸入大小視為
$$
\log_2 n,
$$
則 $\sqrt{n}$ 相對於輸入長度是指數級成長，因此這不是 polynomial-time algorithm。

<div class="remark">
<strong>Remark.</strong>
In the worst case, trial division requires $\sqrt{n}$ steps, which is exponential in the input length $\log_2 n$.
</div>

數論中常直接以整數 $n$ 的大小表示複雜度，例如 $O(\sqrt{n})$；但在計算複雜度理論中，真正的輸入長度是 bit-length，也就是 $\log_2 n$。因此，平方根級複雜度對大輸入仍然很慢。

## Practical Use

雖然 trial division 對大整數效率不高，但在實作中仍然很常用，因為檢查小因數的成本低，且能快速排除大量 composite。

最基本的例子是偶數檢查。任何大於 $2$ 的偶數都不是 prime，因此在較複雜的 primality test 之前，先做少量 trial division 是很自然的步驟。更一般地，也可以只測試某個界 $Y$ 以下的質數；這種作法常稱為 partial trial division，其作用是先移除所有含有小質因數的候選值。

若先對所有小於 $Y$ 的質數做試除，則仍未被排除的 composite 所占比例可寫成
$$
\prod_{p<Y}\left(1-\frac{1}{p}\right).
$$
例如取 $Y=100$，則此比例約為
$$
\prod_{p<100}\left(1-\frac{1}{p}\right)\approx 0.12.
$$
這表示只用很小範圍的 trial division，就能先濾掉大部分 composite，讓後續更進階的 primality test 集中在較有希望的候選值上。

<div class="remark">
<strong>Remark.</strong>
Partial trial division 常作為前處理步驟，因為它實作簡單、成本低，且對排除含有小質因數的 composite 特別有效。
</div>

### Trial Division in Factoring

trial division 不只可用於 primality testing，也可直接用於 factoring。若目標是分解整數 $N$，則可由小到大測試各個可能因數 $p$；每當發現 $p\mid N$，就反覆將 $p$ 除去，直到不再可整除，以得到該質因數在分解中出現的 exponent。如此便可逐步建立 $N$ 的 prime factorization。

其最壞時間仍為
$$
O(\sqrt{N}),
$$
因此對一般的大整數 factoring 並不實用；不過對小整數而言，它仍然是最自然也最直接的方法之一。

<div class="remark">
<strong>Remark.</strong>
trial division 特別適合用在輸入較小的情況，或作為 primality testing 與 factoring 的前置步驟，用來先移除小質因數，再交由更進階的方法處理。
</div>

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 12. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
