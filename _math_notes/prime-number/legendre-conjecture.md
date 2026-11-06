---
layout: page
title: Legendre's Conjecture
date: 2026-10-31
last_updated: 2026-11-05
---

**Legendre's conjecture**：任意兩個相鄰的完全平方數之間都至少有一個質數。這是 Landau 在 1912 年列出的四個質數問題（[Landau's problems]({{ '/math/notes/prime-number/landau-problems/' | relative_url }})）之一 <a class="cite" href="#bib-lan12">Lan12</a>，至今仍未被證明。

<div class="definition">
<strong>Legendre's Conjecture</strong>
For every positive integer $n$, there is a prime $p$ with $n^2 < p < (n+1)^2$.
</div>

區間 $(n^2,(n+1)^2)$ 的長度是 $2n+1$，而端點都不是質數，所以猜想等價於這 $2n$ 個整數中至少有一個是質數。

## Small Cases

<table class="table-center">
  <thead>
    <tr>
      <th>$n$</th>
      <th>區間</th>
      <th>質數</th>
      <th>個數</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>$(1,4)$</td>
      <td>2, 3</td>
      <td>2</td>
    </tr>
    <tr>
      <td>2</td>
      <td>$(4,9)$</td>
      <td>5, 7</td>
      <td>2</td>
    </tr>
    <tr>
      <td>3</td>
      <td>$(9,16)$</td>
      <td>11, 13</td>
      <td>2</td>
    </tr>
    <tr>
      <td>4</td>
      <td>$(16,25)$</td>
      <td>17, 19, 23</td>
      <td>3</td>
    </tr>
    <tr>
      <td>5</td>
      <td>$(25,36)$</td>
      <td>29, 31</td>
      <td>2</td>
    </tr>
    <tr>
      <td>6</td>
      <td>$(36,49)$</td>
      <td>37, 41, 43, 47</td>
      <td>4</td>
    </tr>
    <tr>
      <td>7</td>
      <td>$(49,64)$</td>
      <td>53, 59, 61</td>
      <td>3</td>
    </tr>
    <tr>
      <td>8</td>
      <td>$(64,81)$</td>
      <td>67, 71, 73, 79</td>
      <td>4</td>
    </tr>
    <tr>
      <td>9</td>
      <td>$(81,100)$</td>
      <td>83, 89, 97</td>
      <td>3</td>
    </tr>
    <tr>
      <td>10</td>
      <td>$(100,121)$</td>
      <td>101, 103, 107, 109, 113</td>
      <td>5</td>
    </tr>
  </tbody>
</table>

區間內質數的個數記錄在 {% include oeis.html id="A014085" %}。個數整體隨 $n$ 增加，但並非單調。

## Heuristic

由 [Prime Number Theorem]({{ '/math/notes/prime-number/prime-number-theorem/' | relative_url }})，$x$ 附近質數的密度約為 $1/\ln x$。區間 $(n^2,(n+1)^2)$ 內的 $x$ 都滿足 $\ln x\approx 2\ln n$，因此區間內質數個數的期望值約為

$$
\frac{2n+1}{\ln n^2}\approx\frac{n}{\ln n}.
$$

這個值隨 $n$ 趨於無窮，所以從機率的角度看，區間內完全沒有質數的情況應該只發生有限次，而小範圍的計算顯示一次也沒有發生。困難在於 Prime Number Theorem 只控制 $\pi(x)$ 的平均行為，無法排除某個長度約 $2\sqrt{x}$ 的短區間完全沒有質數。

## Prime Gaps

令 $p_k$ 為第 $k$ 個質數，$g_k=p_{k+1}-p_k$ 為 prime gap。Legendre's conjecture 可以化成對 prime gap 的上界。

<div class="lemma">
<strong>Lemma.</strong>
If $g_k \le 2\sqrt{p_k}+1$ for every $k$, then Legendre's conjecture holds.
</div>

<div class="proof">
<strong>Proof.</strong>
Suppose there is no prime in $(n^2,(n+1)^2)$ for some $n\ge 1$.<br>
Since $2\in(1,4)$, we have $n\ge 2$, so $n^2\ge 4>2$ and there is a largest prime $p_k$ less than $n^2$.<br>
Because $(n+1)^2$ is not prime and the interval contains no prime, the next prime satisfies $p_{k+1}>(n+1)^2$.<br>
Hence
$$
g_k=p_{k+1}-p_k>(n+1)^2-n^2=2n+1.
$$

Since $p_k<n^2$, we have $\sqrt{p_k}<n$, so $2\sqrt{p_k}+1<2n+1<g_k$, contradicting the assumption.
</div>

目前已知的 prime gap 上界都比 $2\sqrt{p_k}$ 大得多，因此這個方向的進展還不足以證明猜想。

### Unconditional Results

<div class="theorem">
<strong>Theorem (Baker–Harman–Pintz, 2001). <a class="cite" href="#bib-bhp01">BHP01</a></strong>
For all sufficiently large $x$, the interval $[x-x^{0.525},x]$ contains a prime.
</div>

取 $x=(n+1)^2$，這個結果保證區間 $[(n+1)^2-(n+1)^{1.05},(n+1)^2]$ 內有質數。但 $(n+1)^{1.05}$ 最終會大於 $2n+1$，區間左端會越過 $n^2$，因此不足以推出 Legendre's conjecture。要直接得到猜想，需要把指數 $0.525$ 降到 $\frac12$，且常數不超過 $2$。

<div class="remark">
同樣的方法對立方數有效。Ingham (1937) <a class="cite" href="#bib-ing37">Ing37</a> 證明了 $[x,x+x^{5/8+\varepsilon}]$ 對足夠大的 $x$ 含有質數。取 $x=n^3$，區間長度 $(n+1)^3-n^3=3n^2+3n+1$ 約為 $x^{2/3}$，而 $\frac58<\frac23$，所以對足夠大的 $n$，$n^3$ 與 $(n+1)^3$ 之間必有質數。
</div>

### Under the Riemann Hypothesis

<div class="theorem">
<strong>Theorem (Cramér, 1920). <a class="cite" href="#bib-cra20">Cra20</a></strong>
Assuming the Riemann Hypothesis, $g_k = O\!\left(\sqrt{p_k}\,\log p_k\right)$.
</div>

即使在 [Riemann Hypothesis]({{ '/math/notes/prime-number/riemann-hypothesis/' | relative_url }}) 之下，上界仍多出一個 $\log p_k$ 的因子，所以 RH 也不足以推出 Legendre's conjecture。

### Cramér's Conjecture

Cramér <a class="cite" href="#bib-cra36">Cra36</a> 依據隨機模型猜測 $g_k=O\!\left((\log p_k)^2\right)$。若此猜想成立，則對足夠大的 $k$ 有 $g_k<2\sqrt{p_k}+1$，再搭配有限範圍的計算，即可推出 Legendre's conjecture。

## Related Conjectures

- [Andrica's conjecture]({{ '/math/notes/prime-number/andrica-conjecture/' | relative_url }})：$\sqrt{p_{k+1}}-\sqrt{p_k}<1$。等價於 $g_k<2\sqrt{p_k}+1$，可以推出 Legendre's conjecture。
- [Oppermann's conjecture]({{ '/math/notes/prime-number/oppermann-conjecture/' | relative_url }})：$(n^2-n,n^2)$ 與 $(n^2,n^2+n)$ 都含有質數。可以推出 Legendre's conjecture，也可以推出 Andrica's conjecture 與 Brocard's conjecture。
- [Brocard's conjecture]({{ '/math/notes/prime-number/brocard-conjecture/' | relative_url }})：$k\ge 2$ 時，$p_k^2$ 與 $p_{k+1}^2$ 之間至少有四個質數。

## Partial Results

### Chen's Theorem on $P_2$

<div class="theorem">
<strong>Theorem (Chen, 1975). <a class="cite" href="#bib-che75">Che75</a></strong>
For all sufficiently large $n$, there is an integer $m$ with $n^2<m<(n+1)^2$ that is either a prime or a product of two primes.
</div>

這是目前最接近 Legendre's conjecture 的無條件結果：把「質數」放寬為「至多兩個質因數的乘積」後，結論成立。

### Computational Verification

Oliveira e Silva、Herzog 與 Pardi 在 2014 年 <a class="cite" href="#bib-ohp14">OHP14</a> 驗證了 $4\cdot 10^{18}$ 以下的所有 prime gap，最大值為 $1476$。對 $(n+1)^2\le 4\cdot10^{18}$，若 $2n+1>1476$，即 $n\ge 738$，區間 $(n^2,(n+1)^2)$ 的長度超過這個範圍內的任何 prime gap，因此必含質數；$n<738$ 的情形可以直接檢查。由此 Legendre's conjecture 對 $n$ 至少到約 $2\cdot 10^9$ 都成立。

## References

<ul class="bib">
  <li id="bib-lan12">
    <span class="bib-key">Lan12</span>
    <span class="bib-body">E. Landau. <i>Gelöste und ungelöste Probleme aus der Theorie der Primzahlverteilung und der Riemannschen Zetafunktion.</i> Jahresbericht der Deutschen Mathematiker-Vereinigung, 21:208–228, 1912.</span>
  </li>
  <li id="bib-bhp01">
    <span class="bib-key">BHP01</span>
    <span class="bib-body">R. C. Baker, G. Harman, and J. Pintz. <i>The difference between consecutive primes, II.</i> Proceedings of the London Mathematical Society, 83(3):532–562, 2001.</span>
  </li>
  <li id="bib-ing37">
    <span class="bib-key">Ing37</span>
    <span class="bib-body">A. E. Ingham. <i>On the difference between consecutive primes.</i> The Quarterly Journal of Mathematics, 8(1):255–266, 1937.</span>
  </li>
  <li id="bib-cra20">
    <span class="bib-key">Cra20</span>
    <span class="bib-body">H. Cramér. <i>Some theorems concerning prime numbers.</i> Arkiv för Matematik, Astronomi och Fysik, 15(5):1–33, 1920.</span>
  </li>
  <li id="bib-cra36">
    <span class="bib-key">Cra36</span>
    <span class="bib-body">H. Cramér. <i>On the order of magnitude of the difference between consecutive prime numbers.</i> Acta Arithmetica, 2:23–46, 1936.</span>
  </li>
  <li id="bib-che75">
    <span class="bib-key">Che75</span>
    <span class="bib-body">J.-R. Chen. <i>On the distribution of almost primes in an interval.</i> Scientia Sinica, 18:611–627, 1975.</span>
  </li>
  <li id="bib-ohp14">
    <span class="bib-key">OHP14</span>
    <span class="bib-body">T. Oliveira e Silva, S. Herzog, and S. Pardi. <i>Empirical verification of the even Goldbach conjecture and computation of prime gaps up to $4\cdot 10^{18}$.</i> Mathematics of Computation, 83(288):2033–2060, 2014.</span>
  </li>
</ul>
