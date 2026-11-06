---
layout: page
title: Landau's Problems
date: 2026-11-01
last_updated: 2026-11-05
---

**Landau's problems**：Landau 在 1912 年國際數學家大會（ICM, Cambridge）列出的四個質數問題 <a class="cite" href="#bib-lan12">Lan12</a>。他認為這四個問題以當時的方法無法解決，至今四個都仍未被證明。

## The Four Problems

<table class="table-center">
  <thead>
    <tr>
      <th>問題</th>
      <th>敘述</th>
      <th>最接近的結果</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="{{ '/math/notes/prime-number/goldbach-conjecture/' | relative_url }}">Goldbach's Conjecture</a></td>
      <td>每個大於 $2$ 的偶數都是兩個質數之和</td>
      <td>Chen <a class="cite" href="#bib-che73">Che73</a>：$p+P_2$；ternary 版本已由 Helfgott <a class="cite" href="#bib-hel13">Hel13</a> 證明</td>
    </tr>
    <tr>
      <td><a href="{{ '/math/notes/prime-number/twin-prime-conjecture/' | relative_url }}">Twin Prime Conjecture</a></td>
      <td>有無限多個質數 $p$ 使 $p+2$ 也是質數</td>
      <td>Maynard <a class="cite" href="#bib-may15">May15</a>、Polymath <a class="cite" href="#bib-pol14">Pol14</a>：$\liminf (p_{n+1}-p_n)\le 246$</td>
    </tr>
    <tr>
      <td><a href="{{ '/math/notes/prime-number/legendre-conjecture/' | relative_url }}">Legendre's Conjecture</a></td>
      <td>$n^2$ 與 $(n+1)^2$ 之間必有質數</td>
      <td>Chen <a class="cite" href="#bib-che75">Che75</a>：區間內必有 $P_2$</td>
    </tr>
    <tr>
      <td><a href="{{ '/math/notes/prime-number/landau-n-squared-plus-one/' | relative_url }}">Landau's n²+1 Conjecture</a></td>
      <td>有無限多個形如 $n^2+1$ 的質數</td>
      <td>Iwaniec <a class="cite" href="#bib-iwa78">Iwa78</a>：無限多個 $n^2+1$ 為 $P_2$</td>
    </tr>
  </tbody>
</table>

$P_2$ 表示質數或兩個質數的乘積。

<div class="remark">
四個問題在 sieve 方向的最佳結果都停在 $P_2$，原因相同：sieve method 有 parity problem，無法區分質因數個數為奇數或偶數的整數，因此單靠 sieve 只能得到「至多兩個質因數」，無法推進到「恰好一個質因數」。
</div>

## Common Structure

四個問題都在問某個稀疏的整數集合裡是否有（或有無限多個）質數：

- Goldbach：集合 $\\{N-p : p\text{ prime}\\}$ 中是否有質數。
- Twin prime：集合 $\\{p+2 : p\text{ prime}\\}$ 中是否有無限多個質數。
- Legendre：長度約 $2\sqrt{x}$ 的短區間中是否有質數。
- $n^2+1$：二次多項式的值中是否有無限多個質數。

由 [Prime Number Theorem]({{ '/math/notes/prime-number/prime-number-theorem/' | relative_url }}) 的隨機模型，四個問題的期望數量都趨於無窮，Hardy 與 Littlewood <a class="cite" href="#bib-hl23">HL23</a> 也對其中三個給出了精確的漸近猜想。困難在於把平均行為轉成對特定稀疏集合的保證。

## References

<ul class="bib">
  <li id="bib-lan12">
    <span class="bib-key">Lan12</span>
    <span class="bib-body">E. Landau. <i>Gelöste und ungelöste Probleme aus der Theorie der Primzahlverteilung und der Riemannschen Zetafunktion.</i> Jahresbericht der Deutschen Mathematiker-Vereinigung, 21:208–228, 1912.</span>
  </li>
  <li id="bib-che73">
    <span class="bib-key">Che73</span>
    <span class="bib-body">J.-R. Chen. <i>On the representation of a larger even integer as the sum of a prime and the product of at most two primes.</i> Scientia Sinica, 16:157–176, 1973.</span>
  </li>
  <li id="bib-hel13">
    <span class="bib-key">Hel13</span>
    <span class="bib-body">H. A. Helfgott. <i>The ternary Goldbach conjecture is true.</i> <a href="https://arxiv.org/abs/1312.7748">arXiv:1312.7748</a>, 2013.</span>
  </li>
  <li id="bib-may15">
    <span class="bib-key">May15</span>
    <span class="bib-body">J. Maynard. <i>Small gaps between primes.</i> Annals of Mathematics, 181(1):383–413, 2015.</span>
  </li>
  <li id="bib-pol14">
    <span class="bib-key">Pol14</span>
    <span class="bib-body">D. H. J. Polymath. <i>Variants of the Selberg sieve, and bounded intervals containing many primes.</i> Research in the Mathematical Sciences, 1:12, 2014.</span>
  </li>
  <li id="bib-che75">
    <span class="bib-key">Che75</span>
    <span class="bib-body">J.-R. Chen. <i>On the distribution of almost primes in an interval.</i> Scientia Sinica, 18:611–627, 1975.</span>
  </li>
  <li id="bib-iwa78">
    <span class="bib-key">Iwa78</span>
    <span class="bib-body">H. Iwaniec. <i>Almost-primes represented by quadratic polynomials.</i> Inventiones Mathematicae, 47(2):171–188, 1978.</span>
  </li>
  <li id="bib-hl23">
    <span class="bib-key">HL23</span>
    <span class="bib-body">G. H. Hardy and J. E. Littlewood. <i>Some problems of 'Partitio numerorum'; III: On the expression of a number as a sum of primes.</i> Acta Mathematica, 44:1–70, 1923.</span>
  </li>
</ul>
