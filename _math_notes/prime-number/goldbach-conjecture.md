---
layout: page
title: Goldbach's Conjecture
date: 2026-11-01
last_updated: 2026-11-05
---

**Goldbach's conjecture**：每個大於 $2$ 的偶數都可以寫成兩個質數之和。這是 [Landau's problems]({{ '/math/notes/prime-number/landau-problems/' | relative_url }}) 之一，源自 1742 年 Goldbach 與 Euler 的通信。

<div class="definition">
<strong>Goldbach's Conjecture (strong / binary)</strong>
Every even integer $N>2$ can be written as $N=p+q$ with $p,q$ prime.
</div>

<div class="definition">
<strong>Goldbach's Weak Conjecture (ternary)</strong>
Every odd integer $N>5$ can be written as the sum of three primes.
</div>

## Small Cases

<table class="table-center">
  <thead>
    <tr>
      <th>$N$</th>
      <th>分解</th>
      <th>個數</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>4</td><td>2+2</td><td>1</td></tr>
    <tr><td>6</td><td>3+3</td><td>1</td></tr>
    <tr><td>8</td><td>3+5</td><td>1</td></tr>
    <tr><td>10</td><td>3+7, 5+5</td><td>2</td></tr>
    <tr><td>12</td><td>5+7</td><td>1</td></tr>
    <tr><td>14</td><td>3+11, 7+7</td><td>2</td></tr>
    <tr><td>16</td><td>3+13, 5+11</td><td>2</td></tr>
    <tr><td>18</td><td>5+13, 7+11</td><td>2</td></tr>
    <tr><td>20</td><td>3+17, 7+13</td><td>2</td></tr>
    <tr><td>22</td><td>3+19, 5+17, 11+11</td><td>3</td></tr>
  </tbody>
</table>

不計順序的分解個數記錄在 {% include oeis.html id="A045917" %}。個數整體隨 $N$ 增加，但會隨 $N$ 的質因數而起伏。

## Strong Implies Weak

<div class="lemma">
<strong>Lemma.</strong>
The strong Goldbach conjecture implies the weak Goldbach conjecture.
</div>

<div class="proof">
<strong>Proof.</strong>
Let $N>5$ be odd. Then $N-3$ is even and $N-3>2$. By the strong conjecture, $N-3=p+q$ for primes $p,q$, so
$$
N=3+p+q
$$
is a sum of three primes.
</div>

反方向不成立：ternary 版本已被證明，binary 版本仍然開放。

## Heuristic

### Hardy–Littlewood Asymptotic

令 $r(N)$ 為 $N=p+q$ 的有序分解個數。Hardy 與 Littlewood <a class="cite" href="#bib-hl23">HL23</a> 用 circle method 的啟發式推導，猜測

$$
r(N)\sim 2C_2\prod_{\substack{p\mid N\\ p>2}}\frac{p-1}{p-2}\cdot\frac{N}{(\ln N)^2},
$$

其中 $C_2=\prod_{p>2}\left(1-\frac{1}{(p-1)^2}\right)\approx 0.6601618$ 是 twin prime constant。

<div class="remark">
乘積 $\prod_{p\mid N,\,p>2}\frac{p-1}{p-2}$ 解釋了分解個數的起伏：若 $3\mid N$，則對質數 $p>3$，$p$ 與 $N-p$ 不會同時被 $3$ 整除，分解變得比較容易，所以 $3$ 的倍數通常有較多分解。
</div>

主項 $N/(\ln N)^2$ 隨 $N$ 趨於無窮，所以若這個漸近式成立，Goldbach's conjecture 對足夠大的 $N$ 成立。

## Partial Results

### Ternary Goldbach

<div class="theorem">
<strong>Theorem (Vinogradov, 1937). <a class="cite" href="#bib-vin37">Vin37</a></strong>
Every sufficiently large odd integer is the sum of three primes.
</div>

Vinogradov 的證明用 circle method 加上指數和 $\sum_{p\le N}e(p\alpha)$ 在 minor arcs 上的估計，但「足夠大」的門檻原本極為巨大，無法用電腦補完。

<div class="theorem">
<strong>Theorem (Helfgott, 2013). <a class="cite" href="#bib-hel13">Hel13</a></strong>
Every odd integer $N>5$ is the sum of three primes.
</div>

Helfgott 的證明適用於 $N\ge 10^{27}$。較小的範圍由電腦驗證完成，Helfgott 與 Platt <a class="cite" href="#bib-hp13">HP13</a> 已驗證到 $8.875\cdot 10^{30}$。

### Binary Goldbach

<div class="theorem">
<strong>Theorem (Chen, 1973). <a class="cite" href="#bib-che73">Che73</a></strong>
Every sufficiently large even integer $N$ can be written as $N=p+m$, where $p$ is prime and $m$ is either a prime or a product of two primes.
</div>

<div class="theorem">
<strong>Theorem (Chudakov, van der Corput, Estermann, 1937–1938). <a class="cite" href="#bib-chu37">Chu37</a> <a class="cite" href="#bib-cor38">Cor38</a> <a class="cite" href="#bib-est38">Est38</a></strong>
Almost all even integers are sums of two primes; that is, the number of even $N\le x$ that are not the sum of two primes is $o(x)$.
</div>

Montgomery 與 Vaughan (1975) <a class="cite" href="#bib-mv75">MV75</a> 進一步證明例外集合的大小為 $O(x^{1-\delta})$，其中 $\delta>0$ 為某個常數。

### Computational Verification

Oliveira e Silva、Herzog 與 Pardi 在 2014 年 <a class="cite" href="#bib-ohp14">OHP14</a> 驗證了 $4\cdot 10^{18}$ 以下所有偶數都滿足 Goldbach's conjecture。

## References

<ul class="bib">
  <li id="bib-hl23">
    <span class="bib-key">HL23</span>
    <span class="bib-body">G. H. Hardy and J. E. Littlewood. <i>Some problems of 'Partitio numerorum'; III: On the expression of a number as a sum of primes.</i> Acta Mathematica, 44:1–70, 1923.</span>
  </li>
  <li id="bib-vin37">
    <span class="bib-key">Vin37</span>
    <span class="bib-body">I. M. Vinogradov. <i>Representation of an odd number as a sum of three primes.</i> Comptes Rendus (Doklady) de l'Académie des Sciences de l'URSS, 15:169–172, 1937.</span>
  </li>
  <li id="bib-hel13">
    <span class="bib-key">Hel13</span>
    <span class="bib-body">H. A. Helfgott. <i>The ternary Goldbach conjecture is true.</i> <a href="https://arxiv.org/abs/1312.7748">arXiv:1312.7748</a>, 2013.</span>
  </li>
  <li id="bib-hp13">
    <span class="bib-key">HP13</span>
    <span class="bib-body">H. A. Helfgott and D. J. Platt. <i>Numerical verification of the ternary Goldbach conjecture up to $8.875\cdot 10^{30}$.</i> Experimental Mathematics, 22(4):406–409, 2013.</span>
  </li>
  <li id="bib-che73">
    <span class="bib-key">Che73</span>
    <span class="bib-body">J.-R. Chen. <i>On the representation of a larger even integer as the sum of a prime and the product of at most two primes.</i> Scientia Sinica, 16:157–176, 1973.</span>
  </li>
  <li id="bib-chu37">
    <span class="bib-key">Chu37</span>
    <span class="bib-body">N. G. Chudakov. <i>On the Goldbach problem</i> (in Russian). Doklady Akademii Nauk SSSR, 17:335–338, 1937.</span>
  </li>
  <li id="bib-cor38">
    <span class="bib-key">Cor38</span>
    <span class="bib-body">J. G. van der Corput. <i>Sur l'hypothèse de Goldbach.</i> Proceedings of the Koninklijke Nederlandse Akademie van Wetenschappen, 41:76–80, 1938.</span>
  </li>
  <li id="bib-est38">
    <span class="bib-key">Est38</span>
    <span class="bib-body">T. Estermann. <i>On Goldbach's problem: proof that almost all even positive integers are sums of two primes.</i> Proceedings of the London Mathematical Society, s2-44(1):307–314, 1938.</span>
  </li>
  <li id="bib-mv75">
    <span class="bib-key">MV75</span>
    <span class="bib-body">H. L. Montgomery and R. C. Vaughan. <i>The exceptional set in Goldbach's problem.</i> Acta Arithmetica, 27:353–370, 1975.</span>
  </li>
  <li id="bib-ohp14">
    <span class="bib-key">OHP14</span>
    <span class="bib-body">T. Oliveira e Silva, S. Herzog, and S. Pardi. <i>Empirical verification of the even Goldbach conjecture and computation of prime gaps up to $4\cdot 10^{18}$.</i> Mathematics of Computation, 83(288):2033–2060, 2014.</span>
  </li>
</ul>
