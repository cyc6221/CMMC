---
layout: page
title: Goldbach's Conjecture
date: 2026-11-01
last_updated: 2026-11-01
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

不計順序的分解個數記錄在 OEIS [A045917](https://oeis.org/A045917)。個數整體隨 $N$ 增加，但會隨 $N$ 的質因數而起伏。

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

令 $r(N)$ 為 $N=p+q$ 的有序分解個數。Hardy 與 Littlewood 用 circle method 的啟發式推導，猜測

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
<strong>Theorem (Vinogradov, 1937).</strong>
Every sufficiently large odd integer is the sum of three primes.
</div>

Vinogradov 的證明用 circle method 加上指數和 $\sum_{p\le N}e(p\alpha)$ 在 minor arcs 上的估計，但「足夠大」的門檻原本極為巨大，無法用電腦補完。

<div class="theorem">
<strong>Theorem (Helfgott, 2013).</strong>
Every odd integer $N>5$ is the sum of three primes.
</div>

Helfgott 把門檻降到約 $10^{27}$，再搭配電腦驗證完成小範圍。

### Binary Goldbach

<div class="theorem">
<strong>Theorem (Chen, 1973).</strong>
Every sufficiently large even integer $N$ can be written as $N=p+m$, where $p$ is prime and $m$ is either a prime or a product of two primes.
</div>

<div class="theorem">
<strong>Theorem (Chudakov, van der Corput, Estermann, 1938).</strong>
Almost all even integers are sums of two primes; that is, the number of even $N\le x$ that are not the sum of two primes is $o(x)$.
</div>

Montgomery 與 Vaughan (1975) 進一步證明例外集合的大小為 $O(x^{1-\delta})$，其中 $\delta>0$ 為某個常數。

### Computational Verification

Oliveira e Silva、Herzog 與 Pardi 在 2014 年驗證了 $4\cdot 10^{18}$ 以下所有偶數都滿足 Goldbach's conjecture。
