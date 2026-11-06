---
layout: page
title: Oppermann's Conjecture
date: 2026-11-05
last_updated: 2026-11-05
---

**Oppermann's conjecture**：對每個 $n>1$，$n^2$ 的左右兩側各有一段長度 $n$ 的區間，兩段都含有質數。Ludvig Oppermann 在 1877 年的演講中提出，1882 年發表 <a class="cite" href="#bib-opp82">Opp82</a>，至今仍未被證明。

<div class="definition">
<strong>Oppermann's Conjecture</strong>
For every integer $n>1$, there is at least one prime in $(n^2-n,\,n^2)$ and at least one prime in $(n^2,\,n^2+n)$.
</div>

用質數計數函數可以寫成 <a class="cite" href="#bib-rib04">Rib04</a>

$$
\pi(n^2-n)<\pi(n^2)<\pi(n^2+n),\qquad n>1.
$$

區間的端點 $n^2-n=(n-1)n$ 與 $n^2+n=n(n+1)$ 是 pronic numbers。平方數與 pronic numbers 交錯排列，把大於 $2$ 的整數切成一段段區間，猜想要求每一段都含有質數。

## Small Cases

<table class="table-center">
  <thead>
    <tr>
      <th>$n$</th>
      <th>$(n^2-n,n^2)$ 內的質數</th>
      <th>$(n^2,n^2+n)$ 內的質數</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>2</td><td>3</td><td>5</td></tr>
    <tr><td>3</td><td>7</td><td>11</td></tr>
    <tr><td>4</td><td>13</td><td>17, 19</td></tr>
    <tr><td>5</td><td>23</td><td>29</td></tr>
    <tr><td>6</td><td>31</td><td>37, 41</td></tr>
    <tr><td>7</td><td>43, 47</td><td>53</td></tr>
    <tr><td>8</td><td>59, 61</td><td>67, 71</td></tr>
    <tr><td>9</td><td>73, 79</td><td>83, 89</td></tr>
    <tr><td>10</td><td>97</td><td>101, 103, 107, 109</td></tr>
  </tbody>
</table>

兩段區間內的質數個數分別記錄在 {% include oeis.html id="A094189" %} 與 {% include oeis.html id="A089610" %}。前者包含端點，所以 $n=2$ 時多算了質數 $2$。

## Heuristic

由 [Prime Number Theorem]({{ '/math/notes/prime-number/prime-number-theorem/' | relative_url }})，長度 $n$、位置在 $n^2$ 附近的區間內，質數個數的期望值約為

$$
\frac{n}{\ln n^2}=\frac{n}{2\ln n}.
$$

這個值隨 $n$ 趨於無窮。困難與 [Legendre's conjecture]({{ '/math/notes/prime-number/legendre-conjecture/' | relative_url }}) 相同：需要控制長度約 $\sqrt{x}$ 的短區間。

## Consequences

### Legendre's Conjecture

<div class="lemma">
<strong>Lemma.</strong>
Oppermann's conjecture implies Legendre's conjecture.
</div>

<div class="proof">
<strong>Proof.</strong>
For $n=1$, the interval $(1,4)$ contains the prime $2$. For $n\ge 2$, Oppermann's conjecture gives a prime in $(n^2,n^2+n)$, and $(n^2,n^2+n)\subset(n^2,(n+1)^2)$.
</div>

同樣的論證可以拿到更多。區間 $(n^2,(n+1)^2)$ 在 $n^2+n$ 被切成 $(n^2,n^2+n)$ 與 $((n+1)^2-(n+1),(n+1)^2)$，兩段都含有質數，所以 $n\ge 2$ 時每個平方區間至少有兩個質數。

### Andrica's Conjecture

<div class="lemma">
<strong>Lemma.</strong>
Oppermann's conjecture implies <a href="{{ '/math/notes/prime-number/andrica-conjecture/' | relative_url }}">Andrica's conjecture</a>.
</div>

<div class="proof">
<strong>Proof.</strong>
Andrica's conjecture is equivalent to $g_k<2\sqrt{p_k}+1$ for all $k$, where $g_k=p_{k+1}-p_k$. For $p_k=2$ we have $g_1=1<2\sqrt{2}+1$.

Let $p_k\ge 3$. Squares are composite, and pronic numbers greater than $2$ are even, so $p_k$ is neither. Hence $p_k$ lies in exactly one of the intervals $(n^2,n^2+n)$ or $(n^2-n,n^2)$ for some $n\ge 2$.

Case 1: $n^2<p_k<n^2+n$. Oppermann's conjecture for $n+1$ gives a prime in $(n^2+n,(n+1)^2)$, so $p_{k+1}<(n+1)^2$. Then
$$
g_k<(n+1)^2-n^2=2n+1<2\sqrt{p_k}+1,
$$
where the last step uses $n<\sqrt{p_k}$.

Case 2: $n^2-n<p_k<n^2$. Oppermann's conjecture for $n$ gives a prime in $(n^2,n^2+n)$, so $p_{k+1}<n^2+n$. Then
$$
g_k<(n^2+n)-(n^2-n)=2n.
$$
Since $p_k\ge n^2-n+1>\left(n-\tfrac12\right)^2$, we have $\sqrt{p_k}>n-\tfrac12$, so $2n<2\sqrt{p_k}+1$.

In both cases $g_k<2\sqrt{p_k}+1$.
</div>

### Brocard's Conjecture

<div class="lemma">
<strong>Lemma. <a class="cite" href="#bib-wel05">Wel05</a></strong>
Oppermann's conjecture implies <a href="{{ '/math/notes/prime-number/brocard-conjecture/' | relative_url }}">Brocard's conjecture</a>.
</div>

<div class="proof">
<strong>Proof.</strong>
Let $k\ge 2$. Then $p_k$ and $p_{k+1}$ are odd primes, so $p_{k+1}\ge p_k+2$. Therefore the range from $p_k^2$ to $p_{k+1}^2$ contains the two disjoint square intervals $(p_k^2,(p_k+1)^2)$ and $((p_k+1)^2,(p_k+2)^2)$. Since $p_k\ge 3$, each of them contains at least two primes by the previous observation, which gives at least four primes.
</div>

## Computational Verification

若 $n\ge 3$ 且 $(n^2-n,n^2)$ 或 $(n^2,n^2+n)$ 不含質數，因為區間端點都不是質數，包住這段區間的 prime gap 至少為 $n+2$。

$4\cdot 10^{18}$ 以下的 prime gap 最大值為 $1476$ <a class="cite" href="#bib-ohp14">OHP14</a>，所以只要 $n+2>1476$，且區間落在 $4\cdot 10^{18}$ 以下，這段區間就必含質數；$n<1475$ 的情形可以直接檢查。因此 Oppermann's conjecture 對 $n$ 至少到約 $2\cdot 10^9$ 都成立。

## References

<ul class="bib">
  <li id="bib-opp82">
    <span class="bib-key">Opp82</span>
    <span class="bib-body">L. Oppermann. <i>Om vor Kundskab om Primtallenes Mængde mellem givne Grændser.</i> Oversigt over Det Kongelige Danske Videnskabernes Selskabs Forhandlinger og Dets Medlemmers Arbejder, pages 169–179, 1882.</span>
  </li>
  <li id="bib-rib04">
    <span class="bib-key">Rib04</span>
    <span class="bib-body">P. Ribenboim. <i>The Little Book of Bigger Primes.</i> 2nd edition, Springer, 2004.</span>
  </li>
  <li id="bib-wel05">
    <span class="bib-key">Wel05</span>
    <span class="bib-body">D. Wells. <i>Prime Numbers: The Most Mysterious Figures in Math.</i> John Wiley &amp; Sons, 2005.</span>
  </li>
  <li id="bib-ohp14">
    <span class="bib-key">OHP14</span>
    <span class="bib-body">T. Oliveira e Silva, S. Herzog, and S. Pardi. <i>Empirical verification of the even Goldbach conjecture and computation of prime gaps up to $4\cdot 10^{18}$.</i> Mathematics of Computation, 83(288):2033–2060, 2014.</span>
  </li>
</ul>
