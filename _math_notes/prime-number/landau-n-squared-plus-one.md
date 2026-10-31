---
layout: page
title: Landau's n²+1 Conjecture
date: 2026-11-01
last_updated: 2026-11-01
---

**Landau's $n^2+1$ conjecture**：有無限多個形如 $n^2+1$ 的質數。這是 [Landau's problems]({{ '/math/notes/prime-number/landau-problems/' | relative_url }}) 之一，也稱為 near-square primes problem。

<div class="definition">
<strong>Landau's Conjecture on $n^2+1$</strong>
There are infinitely many integers $n$ such that $n^2+1$ is prime.
</div>

## Small Cases

滿足條件的 $n$ 為 $1,2,4,6,10,14,16,20,24,26,\dots$（OEIS [A005574](https://oeis.org/A005574)），對應的質數為 $2,5,17,37,101,197,257,401,577,677,\dots$（OEIS [A002496](https://oeis.org/A002496)）。

<div class="lemma">
<strong>Lemma.</strong>
If $n>1$ and $n^2+1$ is prime, then $n$ is even and $n\not\equiv \pm 2\pmod 5$.
</div>

<div class="proof">
<strong>Proof.</strong>
If $n>1$ is odd, then $n^2+1$ is even and $n^2+1>2$, so it is not prime. Hence $n$ is even.
If $n\equiv\pm 2\pmod 5$, then $n^2\equiv 4\pmod 5$, so $5\mid n^2+1$. Since $n>2$ in this case, $n^2+1>5$, so it is not prime.
</div>

因此 $n>1$ 時，$n$ 的個位數只能是 $0,4,6$，與上面的列表一致。

## Heuristic

對奇質數 $q$，$q\mid n^2+1$ 等價於 $n^2\equiv -1\pmod q$。這個同餘式在 $q\equiv 1\pmod 4$ 時有兩個解，在 $q\equiv 3\pmod 4$ 時無解。因此 $n^2+1$ 永遠不會被 $q\equiv 3\pmod 4$ 的質數整除，比隨機整數更容易是質數。

令 $\chi(q)=(-1)^{(q-1)/2}$。Hardy 與 Littlewood 的 Conjecture F 給出

$$
\#\{n\le N : n^2+1\text{ prime}\}\sim \frac{C}{2}\cdot\frac{N}{\ln N},\qquad C=\prod_{q>2}\left(1-\frac{\chi(q)}{q-1}\right)\approx 1.3728.
$$

其中 $\frac{1}{2\ln N}=\frac{1}{\ln N^2}$ 是大小約 $N^2$ 的整數為質數的機率，$C$ 修正對各個奇質數的整除性。

## Related Results

### Iwaniec's Theorem

<div class="theorem">
<strong>Theorem (Iwaniec, 1978).</strong>
There are infinitely many integers $n$ such that $n^2+1$ is either a prime or a product of two primes.
</div>

### Large Prime Factors

另一個方向是證明 $n^2+1$ 有很大的質因數。若 $n^2+1$ 有無限多次是質數，則其最大質因數無限多次等於 $n^2+1$，指數為 $2$。目前已知 $n^2+1$ 的最大質因數無限多次超過 $n^{\theta}$，指數 $\theta$ 的進展為：Hooley (1967) 的 $1.1$、Deshouillers–Iwaniec (1982) 的 $1.2024$，以及 Merikoski 的 $1.279$。

### Thinner Polynomial Sequences

<div class="theorem">
<strong>Theorem (Fermat; Euler).</strong>
An odd prime $p$ can be written as $a^2+b^2$ with integers $a,b$ if and only if $p\equiv 1\pmod 4$.
</div>

因此形如 $a^2+b^2$ 的質數有無限多個。$n^2+1$ 是固定 $b=1$ 的情形，數列從約 $x$ 個降到約 $\sqrt{x}$ 個（在 $x$ 以下），密度太低，現有方法無法處理。

<div class="theorem">
<strong>Theorem (Friedlander–Iwaniec, 1998).</strong>
There are infinitely many primes of the form $a^2+b^4$.
</div>

$a^2+b^4$ 在 $x$ 以下約有 $x^{3/4}$ 個值，介於 $a^2+b^2$ 與 $n^2+1$ 之間。Heath-Brown (2001) 也證明了形如 $x^3+2y^3$ 的質數有無限多個，其值的個數約為 $x^{2/3}$。

## Generalization

**Bunyakovsky conjecture**：若整係數不可約多項式 $f$ 的首項係數為正，且 $f(1),f(2),\dots$ 沒有共同的質因數，則 $f(n)$ 有無限多次是質數。$f(n)=n^2+1$ 是最簡單的二次情形；目前沒有任何次數大於 $1$ 的多項式被證明滿足此猜想。次數為 $1$ 的情形即 Dirichlet's theorem on arithmetic progressions。
