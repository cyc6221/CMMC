---
layout: page
title: Twin Prime Conjecture
date: 2026-11-01
last_updated: 2026-11-01
---

**Twin prime conjecture**：有無限多對相差 $2$ 的質數。這是 [Landau's problems]({{ '/math/notes/prime-number/landau-problems/' | relative_url }}) 之一。

<div class="definition">
<strong>Twin Prime Conjecture</strong>
There are infinitely many primes $p$ such that $p+2$ is also prime.
</div>

滿足條件的 $(p,p+2)$ 稱為 **twin primes**。前幾對為 $(3,5),(5,7),(11,13),(17,19),(29,31),(41,43),(59,61),(71,73)$，較小者記錄在 OEIS [A001359](https://oeis.org/A001359)。

## Form of Twin Primes

<div class="lemma">
<strong>Lemma.</strong>
If $(p,p+2)$ is a twin prime pair other than $(3,5)$, then $p=6k-1$ and $p+2=6k+1$ for some integer $k\ge 1$.
</div>

<div class="proof">
<strong>Proof.</strong>
If $p=3$, the pair is $(3,5)$. Otherwise $p>3$, so $p$ is divisible by neither $2$ nor $3$, hence $p\equiv 1$ or $5\pmod 6$.
If $p\equiv 1\pmod 6$, then $p+2\equiv 3\pmod 6$, so $3\mid p+2$ and $p+2>3$, contradicting that $p+2$ is prime.
Therefore $p\equiv 5\pmod 6$, i.e. $p=6k-1$ and $p+2=6k+1$.
</div>

因此除了 $(3,5)$ 之外，twin primes 中間夾的數都是 $6$ 的倍數。

## Heuristic

### Hardy–Littlewood Asymptotic

令 $\pi_2(x)$ 為滿足 $p\le x$ 且 $p+2$ 為質數的 $p$ 的個數。Hardy 與 Littlewood 猜測

$$
\pi_2(x)\sim 2C_2\,\frac{x}{(\ln x)^2},\qquad C_2=\prod_{p>2}\left(1-\frac{1}{(p-1)^2}\right)\approx 0.6601618.
$$

若把 $p$ 與 $p+2$ 是否為質數視為獨立事件，機率各約 $1/\ln x$，得到 $x/(\ln x)^2$。常數 $2C_2$ 修正了兩者對小質數整除性的相關：例如 $p$ 為奇質數時 $p+2$ 必為奇數，這使機率加倍，對奇質數 $q$ 的修正則給出 $C_2$。

## Brun's Theorem

<div class="theorem">
<strong>Theorem (Brun, 1919).</strong>
The sum of the reciprocals of the twin primes converges:
$$
B_2=\left(\frac13+\frac15\right)+\left(\frac15+\frac17\right)+\left(\frac1{11}+\frac1{13}\right)+\cdots<\infty.
$$
</div>

$B_2\approx 1.902160583$ 稱為 **Brun's constant**，這個數值是由已知 twin primes 加上漸近修正外推而得。

<div class="remark">
所有質數的倒數和 $\sum_p 1/p$ 發散，可以據此證明質數有無限多個。Brun's theorem 顯示這個方法對 twin primes 失效：倒數和收斂，所以無法從收斂性判斷 twin primes 是否有限。Brun 為了證明這個定理發展出 Brun sieve，是現代 sieve method 的起點。
</div>

## Partial Results

### Chen's Theorem

<div class="theorem">
<strong>Theorem (Chen, 1973).</strong>
There are infinitely many primes $p$ such that $p+2$ is either a prime or a product of two primes.
</div>

### Bounded Gaps

令 $p_n$ 為第 $n$ 個質數。Twin prime conjecture 等價於

$$
\liminf_{n\to\infty}(p_{n+1}-p_n)=2.
$$

<div class="theorem">
<strong>Theorem (Zhang, 2013).</strong>
$$
\liminf_{n\to\infty}(p_{n+1}-p_n)<7\times 10^7.
$$
</div>

這是第一次證明相鄰質數的差有無限多次落在某個固定上界之內。

<div class="theorem">
<strong>Theorem (Maynard, 2013; Tao independently).</strong>
For every $m\ge 1$,
$$
\liminf_{n\to\infty}(p_{n+m}-p_n)<\infty.
$$
In particular, $\liminf_{n\to\infty}(p_{n+1}-p_n)\le 600$.
</div>

Polymath8b 結合 Maynard 的方法，把上界改進到 $246$。在 Elliott–Halberstam conjecture 的推廣版本下，上界可以降到 $6$。

<div class="remark">
即使在最強的假設下，上界仍停在 $6$ 而無法到 $2$，原因是 sieve method 的 parity problem：sieve 無法區分質因數個數的奇偶，因此無法單獨保證 $p$ 與 $p+2$ 同時為質數。
</div>

## Generalizations

**Polignac's conjecture** 把差值 $2$ 推廣到任意偶數：對每個偶數 $k$，有無限多對相鄰質數相差 $k$。$k=2$ 即 twin prime conjecture。

**Dickson's conjecture** 與 **Hardy–Littlewood $k$-tuple conjecture** 進一步處理多個線性式 $a_ix+b_i$ 同時為質數的情形，twin prime conjecture 對應 $(x,\,x+2)$。
