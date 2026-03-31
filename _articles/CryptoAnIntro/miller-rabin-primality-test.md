---
layout: page
title: Miller-Rabin Primality Test
date: 2026-03-29
last_updated: 2026-03-31
tags: [primality-testing]
---

**Miller-Rabin primality test** 是一種 *probabilistic primality test*。它延續了 Fermat test 以 modular exponentiation 快速檢查 compositeness 的想法，並進一步避免了 Carmichael numbers 這類例外情形所造成的問題。它的重點不在於直接輸出 primality proof，而在於：若輸入是 composite，則存在能揭露其 compositeness 的 base；而且對隨機選到的 base 而言，將 composite 誤判為 prime 的機率有明確上界。

## Basic Idea

Miller-Rabin test 的出發點，是把
$$
n-1
$$
寫成
$$
n-1=2^s m,
$$
其中 $m$ 為奇數。接著先計算
$$
b=a^m \bmod n,
$$
再不斷平方，觀察序列
$$
a^m,\ a^{2m},\ a^{2^2m},\ \dots,\ a^{2^{s}m}
\pmod n.
$$
若 $n$ 是 odd prime，則這條序列必須呈現特定結構：它要嘛一開始就等於 $1$，要嘛在某一步先到達 $-1 \pmod n$，之後平方才會回到 $1$。若這條鏈中出現了不應該出現的平方根結構，就可判定 $n$ 為 composite。

<div class="definition">
<strong>Definition.</strong>
Let $n$ be an odd integer. Write
$$
n-1=2^s m
$$
with $m$ odd. For a base $a$, the Miller-Rabin test examines the sequence
$$
a^m,\ a^{2m},\ a^{2^2m},\ \dots,\ a^{2^{s}m}\pmod n.
$$
</div>

### Why write $n-1=2^s m$?

把 $n-1$ 拆成 $2$ 的冪次乘上一個奇數，相當於把指數中的二進位結構分離出來。這使得演算法不是只檢查單一 congruence
$$
a^{n-1}\equiv 1 \pmod n,
$$
而是檢查從 $a^m$ 開始連續平方時的整體行為。

這與 Fermat test 有明顯差別。Fermat test 只檢查最終是否有
$$
a^{n-1}\equiv 1 \pmod n.
$$
但對 composite 而言，只看終點可能會被 pseudo-prime 欺騙。Miller-Rabin 會檢查到達終點之前的整條平方鏈，因此能偵測更多不合法的情況。

## Algorithm

<div class="algorithm">
<strong>Algorithm. Miller-Rabin test for primality</strong>

<pre><code>Write $n-1=2^s m$, with $m$ odd

for $j=0$ to $k-1$ do
    Pick $a$ from $[2,\ldots,n-2]$
    $b=a^m \bmod n$
    if $b\ne 1$ and $b\ne n-1$ then
        $i=1$
        while $i&lt;s$ and $b\ne n-1$ do
            $b=b^2 \bmod n$
            if $b=1$ then return $(\text{Composite},a)$
            $i=i+1$
        end
        if $b\ne n-1$ then return $(\text{Composite},a)$
    end
end
return ("Probably Prime")</code></pre>
</div>

### Step 1: Compute $a^m \bmod n$

先計算
$$
b=a^m \bmod n.
$$
若
$$
b=1
$$
或
$$
b\equiv -1 \pmod n,
$$
則這個 base 暫時沒有暴露出 compositeness，演算法進入下一輪。

### Step 2: Repeated Squaring

若初始的 $b$ 既不是 $1$ 也不是 $-1$，則開始反覆平方：
$$
b \leftarrow b^2 \bmod n.
$$
每做一次平方，就相當於把指數從 $m$ 變成 $2m,4m,8m,\dots$。

### Step 3: Detect Illegal Structure

若在尚未出現 $-1$ 之前就先碰到
$$
b=1,
$$
則表示找到了 mod $n$ 下不正常的平方根鏈。這種情況不可能發生在 prime modulus，因此可直接判定 $n$ 為 composite。

若整條平方鏈一路都沒有出現
$$
-1 \pmod n,
$$
最後仍未到達 $n-1$，也同樣可判定 $n$ 為 composite。

## Why the Test Works

### Structural Intuition

若 $n=p$ 是 odd prime，則在有限域 $\mathbb{F}_p$ 中，方程式
$$
x^2\equiv 1 \pmod p
$$
只有兩個解：
$$
x\equiv 1 \pmod p,\qquad x\equiv -1 \pmod p.
$$
因此，若一個值經過平方後變成 $1$，那它在 prime modulus 下先前只能是 $\pm 1$。Miller-Rabin 正是利用這個結構。

換句話說，若在 repeated squaring 的過程中發現某個值
$$
b\not\equiv \pm 1 \pmod n
$$
卻滿足
$$
b^2\equiv 1 \pmod n,
$$
那就表示 $n$ 的模結構不像 prime modulus，因此 $n$ 必為 composite。

<div class="lemma">
<strong>Lemma.</strong>
If $p$ is an odd prime, then the only solutions to
$$
x^2\equiv 1 \pmod p
$$
are
$$
x\equiv 1 \pmod p \quad \text{and} \quad x\equiv -1 \pmod p.
$$
</div>

<div class="proof">
<strong>Proof.</strong>
If
$$
x^2\equiv 1 \pmod p,
$$
then
$$
x^2-1\equiv 0 \pmod p,
$$
so
$$
(x-1)(x+1)\equiv 0 \pmod p.
$$
Since $p$ is prime, it follows that
$$
x-1\equiv 0 \pmod p
$$
or
$$
x+1\equiv 0 \pmod p.
$$
Hence
$$
x\equiv 1 \pmod p
\quad\text{or}\quad
x\equiv -1 \pmod p.
$$
</div>

這個 lemma 是 Miller-Rabin 判定規則的核心。測試所偵測的，正是 composite modulus 下可能出現、但 prime modulus 下不會出現的非平凡平方根結構。

### Miller-Rabin Witness

若對某個 base $a$，Miller-Rabin test 輸出
$$
(\text{Composite},a),
$$
那麼 $a$ 就是一個 Miller-Rabin witness for compositeness。這表示用這個 base 所生成的平方鏈，已經直接展示出 $n$ 不可能是 prime。

<div class="definition">
<strong>Definition.</strong>
If $n$ is composite, then $a$ is called a <em>Miller-Rabin witness</em> for the compositeness of $n$ when the Miller-Rabin test with base $a$ outputs $(\text{Composite},a)$.
</div>

這類 witness 和 Fermat test 中的 compositeness witness 一樣，都可作為可驗證的證據。任何人只要重新執行相同的 modular exponentiation 與 repeated squaring，就能檢查這個 base 是否確實揭露了 compositeness。

<div class="remark">
<strong>Remark.</strong>
A Miller-Rabin witness is a certificate of compositeness: once a witness $a$ is found, the failure can be verified efficiently by repeating the same modular computations.
</div>

### Probable Prime

若對隨機挑選的 $k$ 個 bases，演算法都沒有找到 witness，則輸出
$$
\text{"Probably Prime"}.
$$
這個輸出不是 primality proof，而只是表示：在目前測過的 bases 中，沒有觀察到 composite 的證據。

<div class="definition">
<strong>Definition.</strong>
An integer $n$ that passes the Miller-Rabin test for a chosen set of bases is called a <em>probable prime</em> with respect to those bases.
</div>

因此，Miller-Rabin 的語意與 deterministic primality proof 不同。它不是保證「一定是 prime」，而是表示「若是 composite，被隨機 base 漏掉的機率很小」。

### Error Probability

Miller-Rabin 的重要性在於它有比 Fermat test 更強的錯誤機率控制。對 composite 的 $n$，對每一個隨機 base $a$，演算法把它錯誤接受為 prime 的機率至多是
$$
\frac14.
$$
因此若用 $k$ 個不同的 bases 重複測試，且每一次都回傳 “Probably Prime”，則總錯誤機率至多為
$$
\left(\frac14\right)^k.
$$

<div class="theorem">
<strong>Theorem.</strong>
If $n$ is composite, then the Miller-Rabin test has probability at most
$$
\frac14
$$
of accepting $n$ as prime for each random base $a$. Hence after $k$ independent iterations, the error probability is at most
$$
\left(\frac14\right)^k.
$$
</div>

例如當 $k=20$ 時，誤判機率上界是
$$
\left(\frac14\right)^{20}=2^{-40}.
$$
這已經足夠小，因此在實務上，Miller-Rabin 常被視為非常可靠的 primality test。

<div class="remark">
<strong>Remark.</strong>
Repeated application of the Miller-Rabin test drives the error probability down exponentially fast, which is why it is widely used in practical prime generation.
</div>

## Comparison and Practice

### Comparison with Fermat Test

Fermat test 只檢查
$$
a^{n-1}\equiv 1 \pmod n
$$
是否成立，因此 Carmichael numbers 會造成根本性的問題：有些 composite 對所有與它互質的 base 都會通過 Fermat test。

Miller-Rabin 並不是只看最終是否到達 $1$，而是沿著
$$
a^m,\ a^{2m},\ a^{4m},\dots,a^{2^s m}
$$
一路檢查平方鏈的合法性。這使得 composite 即使通過最終的 Fermat congruence，也仍可能在中途暴露出不可能出現在 prime modulus 下的平方根結構。因此 Carmichael numbers 不再構成同樣層級的例外。

<div class="remark">
<strong>Remark.</strong>
The Miller-Rabin test does not merely check the final congruence
$$
a^{n-1}\equiv 1 \pmod n;
$$
it also checks whether the intermediate repeated squaring steps are consistent with the structure of a prime modulus.
</div>

### Choice of Bases

實作上，演算法在每一輪會從
$$
[2,\ldots,n-2]
$$
中選一個 base $a$。理論分析通常把 base 視為隨機選取，因此每輪的錯誤機率界限才會是 $1/4$。

若目標是高效率且高可信度的 primality testing，常見策略就是選擇適量的 bases 重複執行。這樣做的成本主要來自 modular exponentiation，但這仍然相當快，因此整體演算法非常適合用在 large prime generation 的前置階段。

### GRH and Small Witnesses

在理論上，Miller-Rabin 還有一個與 small witnesses 有關的性質。若 $n$ 是 composite，則在 Generalized Riemann Hypothesis 之下，可以保證存在一個 Miller-Rabin witness $a$，其大小滿足
$$
a\le O((\log n)^2).
$$
這表示在 GRH 假設下，尋找 witness 不必搜索非常大的 base 範圍。

<div class="remark">
<strong>Remark.</strong>
Under the Generalized Riemann Hypothesis (GRH), if $n$ is composite then there exists a Miller-Rabin witness $a$ with
$$
a\le O((\log n)^2).
$$
</div>

這個性質表示：在額外的數論假設下，Miller-Rabin 不只是一個隨機化演算法，也能與較小範圍的 base 搜尋建立更強的理論連結。

### Practical Interpretation

Miller-Rabin 的輸出可以分成兩種理解：

- 若輸出 composite，則這是確定性結論，且附帶一個 witness；
- 若輸出 probable prime，則這不是 proof of primality，而是經過多輪隨機測試後，尚未發現任何 compositeness 的證據。

因此，它在實作中的角色通常是 large prime generation 的主力測試工具：先快速過濾絕大多數 composite，留下高度可信的 probable primes；若之後還需要完全形式上的證明，再交給 primality proving algorithm 處理。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 12. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
