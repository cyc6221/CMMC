---
layout: page
title: Trial Division
date: 2026-03-30
last_updated: 2026-03-30
tags: [trial-division, primality-testing, factoring, computational-number-theory]
---

Trial division 是最直接的整數檢驗方法之一。它的核心想法非常簡單：若一個整數 $n>1$ 是 composite，則它一定存在一個不超過 $\sqrt{n}$ 的非平凡因數。因此，要判斷 $n$ 是否為 prime，只需要檢查從 $2$ 到 $\lfloor \sqrt{n}\rfloor$ 之間是否有整數可以整除 $n$。若存在，則 $n$ 是 composite；若不存在，則 $n$ 是 prime。

## Basic Idea

對輸入整數 $n$，trial division 的做法是依序測試
$$
2,3,4,\dots,\lfloor \sqrt{n}\rfloor
$$
是否滿足
$$
d\mid n.
$$
只要找到一個非平凡因數 $d$，就可以立刻停止，並判定 $n$ 為 composite。若所有這些整數都無法整除 $n$，則可判定 $n$ 為 prime。這個方法的優點在於，它不只給出「不是質數」的判定，還同時找到了實際的因數。

<div class="definition">
<strong>Definition.</strong>
Trial division is the method of testing an integer $n$ by checking whether any integer $d$ with $2\le d\le \sqrt{n}$ divides $n$.
</div>

## Why It Is Correct

trial division 的正確性來自一個基本事實：若
$$
n=ab
$$
且 $1<a<n,\ 1<b<n$，那麼 $a$ 與 $b$ 不可能同時都大於 $\sqrt{n}$。因為若兩者都大於 $\sqrt{n}$，則
$$
ab>\sqrt{n}\cdot \sqrt{n}=n,
$$
這與 $ab=n$ 矛盾。於是只要 $n$ 是 composite，就一定至少有一個因數不超過 $\sqrt{n}$。因此，把所有 $2$ 到 $\sqrt{n}$ 的整數都檢查過一次，就已經足以判定 $n$ 是否為質數。

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

由這個 lemma 可直接得到 trial division 的判定依據。

<div class="theorem">
<strong>Theorem.</strong>
An integer $n>1$ is prime if and only if no integer $d$ with $2\le d\le \sqrt{n}$ divides $n$.
</div>

<div class="proof">
<strong>Proof.</strong>
If $n$ is prime, then by definition it has no non-trivial divisors, so no integer $d$ with $2\le d\le \sqrt{n}$ divides $n$.

Conversely, suppose no integer $d$ with $2\le d\le \sqrt{n}$ divides $n$. If $n$ were composite, then by the previous lemma it would have a non-trivial divisor in the interval $[2,\sqrt{n}]$, which is a contradiction. Hence $n$ must be prime.
</div>

## Trial Division as a Primality Test

當 trial division 用在 primality testing 時，它是一個完全 deterministic 的方法。它不像 probabilistic test 那樣會出現「probably prime」這類結論，而是直接給出確定答案：不是找到因數，就是確認在必要範圍內沒有任何因數，因此可判定為 prime。

這種方法的一個明顯優點是：若輸出 composite，則找到的因數本身就是一個非常直接的 certificate。第三方只要檢查這個因數是否真的整除 $n$，就能立即確認 $n$ 不是 prime。相較之下，若輸出 prime，則它並不會額外產生一個精簡的 certificate；若別人想再次確認，基本上仍需重新執行同樣的檢查程序。

<div class="remark">
<strong>Remark.</strong>
When trial division outputs that $n$ is composite, it also outputs a non-trivial factor of $n$, which serves as an easily verifiable certificate of compositeness.
</div>

## Running Time

trial division 最大的缺點在於效率。若輸入 $n$ 本身是質數，或者它的最小因數很大，那麼演算法在最壞情況下必須一路檢查到 $\sqrt{n}$。因此它的步數量級是
$$
O(\sqrt{n}).
$$
若把輸入大小視為
$$
\log_2 n,
$$
那麼 $\sqrt{n}$ 相對於輸入長度而言是指數級成長，因此這不是 polynomial-time algorithm。

<div class="remark">
<strong>Remark.</strong>
In the worst case, trial division requires $\sqrt{n}$ steps, which is exponential in the input length $\log_2 n$.
</div>

這裡要注意的是，數論中常直接以整數 $n$ 的大小來寫複雜度，例如 $O(\sqrt{n})$；但在計算複雜度理論中，真正的輸入長度是整數的 bit-length，也就是 $\log_2 n$。因此一個看似只有平方根的複雜度，對大型輸入其實已經非常慢。

## Why It Is Still Useful

雖然 trial division 對大整數來說效率很差，但它在實作中仍然很常出現，原因是它對小範圍的檢查非常便宜，而且能快速排除大量顯然的 composite。

最基本的例子是偶數檢查。任何大於 $2$ 的偶數都不可能是 prime，因此在進入較複雜的 primality test 之前，先做少量 trial division 幾乎是自然步驟。更一般地，若只檢查到某個小界 $Y$，就能先排除所有含有小質因數的候選值。這種做法稱為 partial trial division。

若先用所有小於 $Y$ 的質數做試除，那麼剩下仍未被排除的 composite 的比例可寫成
$$
\prod_{p<Y}\left(1-\frac{1}{p}\right).
$$
例如取 $Y=100$，則這個比例大約是
$$
\prod_{p<100}\left(1-\frac{1}{p}\right)\approx 0.12.
$$
這表示只用很小範圍的 trial division，就能先濾掉大部分 composite，讓後續更進階的 primality test 專注在較有希望的候選值上。

<div class="remark">
<strong>Remark.</strong>
Partial trial division is often used as a preprocessing step: it is inexpensive and eliminates a large proportion of composite integers before more advanced tests are applied.
</div>

## Trial Division in Factoring

trial division 不只可以用來測 primality，也可以直接拿來做 factoring。若目標是分解整數 $N$，則可以從小到大測試每個可能的因數 $p$；每當發現 $p\mid N$，就反覆把 $p$ 除掉，直到不再可整除為止，從而得到該質因數的 exponent。這樣便能逐步把 $N$ 的 prime factorization 建立出來。原始章節在 factoring 的部分也把它列為最基本的方法，並指出其最壞時間仍為
$$
O(\sqrt{N}),
$$
因此對一般大整數 factoring 來說並不實用，但對很小的數仍然是自然選擇。

<div class="definition">
<strong>Definition.</strong>
Factoring by trial division is the method of testing successive integers $p$ from $2$ to $\sqrt{N}$, and whenever $p$ divides $N$, repeatedly dividing out $p$ to determine its exponent in the factorization of $N$.
</div>

當 trial division 用在 factoring 時，它的角色與 primality testing 略有不同。在 primality testing 中，它的目標是回答「是否為質數」；在 factoring 中，它的目標是輸出完整的質因數分解。雖然兩者都依賴「只需要檢查到平方根」這個事實，但 factoring 版本會在找到因數後持續除去，直到取得對應的冪次。

## Practical Interpretation

在計算上，trial division 最適合的情境不是處理真正巨大的整數，而是：

- 輸入本身很小；
- 作為更高階 primality test 前的 preliminary filter；
- 作為 factoring algorithm 中最前面的清理步驟，用來移除小質因數。

它之所以重要，不是因為它夠快，而是因為它最直接、最容易實作，且在處理小因數時非常有效。對後續的 probabilistic primality tests 與更進階 factoring methods 而言，trial division 常是最前面的基本層。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 12. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
