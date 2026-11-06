---
layout: page
title: Brocard's Conjecture
date: 2026-11-05
last_updated: 2026-11-05
---

**Brocard's conjecture**：從第二個質數開始，相鄰質數的平方之間至少有四個質數。Henri Brocard 在 1904 年提出 <a class="cite" href="#bib-wei">Wei</a>，至今仍未被證明。

<div class="definition">
<strong>Brocard's Conjecture</strong>
Let $p_k$ be the $k$-th prime. For every $k\ge 2$,
$$
\pi(p_{k+1}^2)-\pi(p_k^2)\ge 4.
$$
</div>

條件 $k\ge 2$ 是必要的：$2^2$ 與 $3^2$ 之間只有 $5,7$ 兩個質數。

<div class="remark">
Brocard's problem 是另一個問題：求 $n!+1=m^2$ 的整數解。兩者同名但無關。
</div>

## Small Cases

<table class="table-center">
  <thead>
    <tr>
      <th>$k$</th>
      <th>$p_k$</th>
      <th>$p_{k+1}$</th>
      <th>$\pi(p_{k+1}^2)-\pi(p_k^2)$</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>2</td><td>3</td><td>2</td></tr>
    <tr><td>2</td><td>3</td><td>5</td><td>5</td></tr>
    <tr><td>3</td><td>5</td><td>7</td><td>6</td></tr>
    <tr><td>4</td><td>7</td><td>11</td><td>15</td></tr>
    <tr><td>5</td><td>11</td><td>13</td><td>9</td></tr>
    <tr><td>6</td><td>13</td><td>17</td><td>22</td></tr>
    <tr><td>7</td><td>17</td><td>19</td><td>11</td></tr>
    <tr><td>8</td><td>19</td><td>23</td><td>27</td></tr>
    <tr><td>9</td><td>23</td><td>29</td><td>47</td></tr>
    <tr><td>10</td><td>29</td><td>31</td><td>16</td></tr>
  </tbody>
</table>

{% include oeis-card.html id="A050216" %}

個數會隨 $g_k=p_{k+1}-p_k$ 大幅起伏：twin primes 之間的個數明顯較少。

## Heuristic

由 [Prime Number Theorem]({{ '/math/notes/prime-number/prime-number-theorem/' | relative_url }})，$p_k^2$ 附近質數的密度約為 $1/\ln p_k^2$，而

$$
p_{k+1}^2-p_k^2=g_k(p_{k+1}+p_k)\approx 2g_kp_k,
$$

所以個數的期望值約為

$$
\frac{2g_kp_k}{2\ln p_k}=\frac{g_kp_k}{\ln p_k}.
$$

因為 $g_k\ge 2$，這個值至少約為 $2p_k/\ln p_k$，隨 $k$ 趨於無窮。實際的個數通常遠大於 $4$，猜想的下界並不緊。

## Relation to Other Conjectures

$p_k^2$ 與 $p_{k+1}^2$ 之間恰好有 $g_k$ 個連續的平方區間 $(m^2,(m+1)^2)$。

若 [Legendre's conjecture]({{ '/math/notes/prime-number/legendre-conjecture/' | relative_url }}) 成立，每個平方區間至少有一個質數，所以個數至少為 $g_k\ge 2$，還不足以推出 Brocard's conjecture。

若 [Oppermann's conjecture]({{ '/math/notes/prime-number/oppermann-conjecture/' | relative_url }}) 成立，每個平方區間至少有兩個質數，所以個數至少為 $2g_k\ge 4$，這正是 Brocard's conjecture <a class="cite" href="#bib-wel05">Wel05</a>。

## Computational Verification

由 prime gap 的計算 <a class="cite" href="#bib-ohp14">OHP14</a>，Oppermann's conjecture 對 $n$ 至少到約 $2\cdot 10^9$ 都已驗證，因此由上面的推論，Brocard's conjecture 對 $p_{k+1}$ 至少到約 $2\cdot 10^9$ 都成立。

## References

<ul class="bib">
  <li id="bib-wei">
    <span class="bib-key">Wei</span>
    <span class="bib-body">E. W. Weisstein. <a href="https://mathworld.wolfram.com/BrocardsConjecture.html"><i>Brocard's Conjecture.</i></a> MathWorld.</span>
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
