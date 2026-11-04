---
layout: page
title: Andrica's Conjecture
date: 2026-11-05
last_updated: 2026-11-05
---

**Andrica's conjecture**：相鄰質數的平方根之差永遠小於 $1$。Dorin Andrica 在 1986 年提出，至今仍未被證明。

<div class="definition">
<strong>Andrica's Conjecture</strong>
Let $p_k$ be the $k$-th prime. For every $k\ge 1$,
$$
\sqrt{p_{k+1}}-\sqrt{p_k}<1.
$$
</div>

## Prime Gap Form

令 $g_k=p_{k+1}-p_k$。不等式 $\sqrt{p_{k+1}}<\sqrt{p_k}+1$ 兩邊都是正數，平方後得到等價的條件：

$$
p_{k+1}<p_k+2\sqrt{p_k}+1,
$$

也就是 $g_k<2\sqrt{p_k}+1$。因此 Andrica's conjecture 是一個 prime gap 上界。

$\sqrt{x}$ 的尺度遠大於平均 gap $\ln x$，所以這個上界看起來很寬鬆，但目前的方法仍無法證明。Baker–Harman–Pintz 的無條件結果只到 $g_k=O(p_k^{0.525})$，而 Riemann Hypothesis 之下的 $g_k=O(\sqrt{p_k}\log p_k)$ 仍多一個 $\log p_k$ 的因子。

## Small Cases

令 $A_k=\sqrt{p_{k+1}}-\sqrt{p_k}$。

<table class="table-center">
  <thead>
    <tr>
      <th>$k$</th>
      <th>$p_k$</th>
      <th>$p_{k+1}$</th>
      <th>$A_k$</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>2</td><td>3</td><td>0.3178</td></tr>
    <tr><td>2</td><td>3</td><td>5</td><td>0.5040</td></tr>
    <tr><td>3</td><td>5</td><td>7</td><td>0.4097</td></tr>
    <tr><td>4</td><td>7</td><td>11</td><td>0.6709</td></tr>
    <tr><td>5</td><td>11</td><td>13</td><td>0.2889</td></tr>
    <tr><td>6</td><td>13</td><td>17</td><td>0.5176</td></tr>
    <tr><td>7</td><td>17</td><td>19</td><td>0.2358</td></tr>
    <tr><td>8</td><td>19</td><td>23</td><td>0.4369</td></tr>
    <tr><td>9</td><td>23</td><td>29</td><td>0.5893</td></tr>
    <tr><td>10</td><td>29</td><td>31</td><td>0.1826</td></tr>
  </tbody>
</table>

已知範圍內的最大值出現在 $k=4$：$\sqrt{11}-\sqrt{7}\approx 0.670873$（{% include oeis.html id="A218012" %}）。第二大的是 $\sqrt{127}-\sqrt{113}\approx 0.639282$。

## Implies Legendre's Conjecture

<div class="lemma">
<strong>Lemma.</strong>
Andrica's conjecture implies <a href="{{ '/math/notes/prime-number/legendre-conjecture/' | relative_url }}">Legendre's conjecture</a>.
</div>

<div class="proof">
<strong>Proof.</strong>
Suppose there is no prime in $(n^2,(n+1)^2)$ for some $n\ge 1$. Since $2\in(1,4)$, we have $n\ge 2$, so there is a largest prime $p_k$ less than $n^2$. Because $(n+1)^2$ is not prime and the interval contains no prime, $p_{k+1}>(n+1)^2$. Therefore
$$
\sqrt{p_{k+1}}-\sqrt{p_k}>(n+1)-n=1,
$$
contradicting Andrica's conjecture.
</div>

<div class="remark">
反方向目前推不出來。若 Legendre's conjecture 成立，且 $n^2<p_k<(n+1)^2$，則下一個質數小於 $(n+2)^2$，所以
$$
g_k<(n+2)^2-n^2=4n+4<4\sqrt{p_k}+4.
$$
這個上界約為 Andrica 條件的兩倍。
</div>

[Oppermann's conjecture]({{ '/math/notes/prime-number/oppermann-conjecture/' | relative_url }}) 則比 Andrica's conjecture 更強，證明見該篇。

## Computational Verification

$4\cdot 10^{18}$ 以下的 prime gap 最大值為 $1476$。當 $p_k>543906$ 時，$2\sqrt{p_k}+1>1476$，所以在這個範圍內條件自動成立；$p_k\le 543906$ 的情形可以直接檢查。因此 Andrica's conjecture 對 $p_{k+1}<4\cdot 10^{18}$ 都成立。
