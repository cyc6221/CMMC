---
layout: page
title: Wiener's Attack on RSA
date: 2026-01-26
last_updated: 2026-01-26
tags: [attack, RSA]
---

在 RSA 中，通常會選擇較小的 public exponent $e$ (常見：$e=3, 17, 65537$)。Sometimes 有人會想要更快的 private key operations，這時候他們會選擇把 private exponent $d$ 也選小一點。

但是如果 $d$ 選得太小，這會導致

1. 對應的 $e \equiv d^{-1} \pmod{\varphi(N)}$ 通常不再是常見的小值（如 65537），而會落在 $[1,\varphi(N))$ 中的某個較大值。
2. $d$ 太小會不安全，除了 **暴力搜尋 exhaustive search** 可以破解，還可以使用 **連分數 continued fractions** 方式攻擊 。

這種使用連分數的攻擊，稱作 Wiener's Attack。

<div class="remark">

<strong> Note. </strong>

Wiener’s attack shows that RSA is insecure if the private exponent is too small. <br>
In particular, if \(d < \tfrac{1}{3}N^{1/4}\) (under standard RSA assumptions), then \(d\) can be recovered efficiently using continued fractions. <br>
Hence, one should avoid choosing such small \(d\). <br>

</div>

## Continued Fractions 連分數

### continued fraction expansion 連分數展開

給定一個實數 $\alpha \in \mathbb{R}$，令

* $\alpha_0 = \alpha$
* $a_0 = \lfloor \alpha_0 \rfloor$（$\alpha$ 的整數部分）

接著對每個 $i \ge 0$，定義：
$$
a_i = \lfloor \alpha_i \rfloor,\quad
\alpha_{i+1} = \frac{1}{\alpha_i-a_i}.
$$

* $a_i$ 是 $\alpha_i$ 的整數部分
* $\alpha_i - a_i$ 是 $\alpha_i$ 的小數部分
* 把小數部分取倒數，遞迴下去，得到一串整數 $a_0,a_1,a_2,\dots$

這串整數 $a_0,a_1,a_2,\dots$ 就叫做 $\alpha$ 的 **continued fraction expansion**。

### convergents

定義兩個整數序列 $p_i, q_i$ 來生成一連串分數 $\frac{p_i}{q_i}$，稱為 **convergents**。

初始化：

* $p_0 = a_0, q_0 = 1$
* $p_1 = a_0 a_1 +1, q_1 = a_1$
* For $i\ge 2$,

$$
p_i=a_i p_{i-1}+p_{i-2},\qquad
q_i=a_i q_{i-1}+q_{i-2}.
$$

<div class="definition">

<strong> Definition. </strong>

The integers $a_0, a_1, a_2, \dots$ are called the continued fraction expansion of $\alpha$ and the fractions $\frac{p_i}{q_i}$ are called the convergents.

</div>

<div class="theorem">

<strong> Fact 1: $\gcd(p_i,q_i)=1$ </strong>

每個 convergent $\frac{p_i}{q_i}$ 都是**最簡分數**（分子分母互質）：
$$
\gcd(p_i,q_i)=1\quad \forall i.
$$

</div>

<div class="theorem>

<strong> Fact 2: 分母 $q_i$ 成長很快 </strong>

$$
q_i=a_i q_{i-1}+q_{i-2} \ge q_{i-1} +q_{i-2}
$$
因此 $q_i$ 至少以 Fibonacci 速度成長（近似指數成長）。分母越來越大，所以 convergents 的近似也越來越精細。

</div>

### 重要結果

若 $p, q$ 是整數且滿足
$$
\left|\alpha - \frac{p}{q}\right|\le \frac{1}{2q^2},
$$
那麼 $\frac{p}{q}$ 一定是 $\alpha$ 的某個 convergent（出現在連分數展開的 convergents 序列中）。

<div class="remark">

If $p$ and $q$ are two integers with
$$
\left|\alpha - \frac{p}{q}\right|\le \frac{1}{2q^2},
$$
then $\frac{p}{q}$ is a convergent of the continued fraction expansion of $\alpha$.

</div>

## Attack

* Assume RSA modulus $N = pq, \quad q < p < 2q$

* Assume decryption exponent $d$ is small (attacker knows that) $d < \frac13 N^{1/4}.$

* The encryption exponent $e$ satisfies $ed \equiv 1 \pmod{\varphi(N)}, \quad \varphi(N) = (p-1)(q-1).$

* Assume $1 < e < \varphi(N)$

### First

There is an integer $k$ such that
$$
ed - k\varphi(N) = 1.
$$

兩邊同除 $d\varphi(N)$ 得
$$
\left|\frac{e}{\varphi(N)}-\frac{k}{d}\right|=\frac{1}{d\varphi(N)}.
$$

Moreover, $\gcd(k,d)=1$ since any common divisor of $k$ and $d$ must divide $ed-k\varphi(N)=1$.

### Second

1. $\varphi(N)=(p-1)(q-1)=pq-(p+q)+1=N-(p+q)+1$

2. $N-\varphi(N)=p+q-1$

3. $q < p < 2q \Rightarrow p + q < 3q$

4. $N = p q \ge q^2 \Rightarrow q \le \sqrt N$

5. $p + q - 1 < p + q < 3 q \le 3 \sqrt N$

6. Hence,

$$
|N - \varphi(N)| = | p + q -1 | < 3 \sqrt N.
$$

<div class="definition">

利用這個誤差界，可以估計

$$
\begin{aligned}
\left|\frac{e}{N}-\frac{k}{d}\right|
&= \left|\frac{ed-Nk}{dN}\right| \\
&= \left|\frac{ed-k\varphi(N)-k(N-\varphi(N))}{dN}\right| \\
&= \left|\frac{1-k(N-\varphi(N))}{dN}\right| \\
&\le \frac{1+k|N-\varphi(N)|}{dN} \\
&< \frac{1+3k\sqrt{N}}{dN}
= \frac{1}{dN}+\frac{3k}{d\sqrt{N}}
\end{aligned}
$$

</div>

### Third

因為$e < \varphi(N)$, 所以
$$
k=\frac{ed-1}{\varphi(N)} < \frac{ed}{\varphi(N)} < d,
$$
因此$ k < d$。

再由假設$d < \frac13 N^{1/4}$，得到
$$
k < d < \frac13 N^{1/4}.
$$

從前面已推得誤差界得知

$$
\left|\frac{e}{N}-\frac{k}{d}\right|
< \frac{1}{dN} + \frac{3k}{d\sqrt N}.
$$

代入 $k<\frac13 N^{1/4}$，得

$$
\frac{3k}{d\sqrt N}
\le \frac{3\cdot \frac13 N^{1/4}}{d\sqrt N}
= \frac{1}{dN^{1/4}}.
$$

又由 $d<\frac13N^{1/4}$ 得 $N^{1/4}>3d$，因此
$$
\frac{1}{dN^{1/4}}<\frac{1}{3d^2}.
$$

另外 $N^{1/4}>3d \Rightarrow N>(3d)^4=81d^4$，所以
$$
\frac{1}{dN}<\frac{1}{81d^5}\le \frac{1}{6d^2}\quad(d\ge 1).
$$

因此
$$
\left|\frac{e}{N}-\frac{k}{d}\right|
<\frac{1}{6d^2}+\frac{1}{3d^2}
=\frac{1}{2d^2}.
$$

### Fourth

<div class="remark">

連分數 continued fractions 的重要性質是：

若對實數 $\alpha$ 與有理數 $\frac{p}{q}$（$q>0$），滿足
$$
\left|\alpha-\frac{p}{q}\right| < \frac{1}{2q^2},
$$
則 $\frac{p}{q}$ 必定是 $\alpha$ 的某個 convergent。

</div>

令
$$
\alpha=\frac{e}{N}.
$$

由上一步我們已得到關鍵不等式
$$
|\alpha-\frac{k}{d}| =
|\frac{e}{N}-\frac{k}{d}| <
\frac{1}{2d^2}.
$$

因此可知 $\frac{k}{d}$ 必定出現在 $\frac{e}{N}$ 的連分數 convergents 之中。

i.e., **對 $\frac{e}{N}$ 做 continued fraction expansion，逐一枚舉每個 convergent 的分母，就一定會遇到正確的 $d$。**

### Fifth

對 $\dfrac{e}{N}$ 的連分數展開會產生一串 convergents
$$
\frac{k_1}{d_1},\ \frac{k_2}{d_2},\ \dots
$$
其中某一個會是正確的
$$
\frac{k}{d}.
$$
因此我們可以對每個 convergent（把分母當作候選 $d$）做回推驗證，檢查它是否真能形成正確 RSA 私鑰。

<div class="algorithm">

<strong> Algorithm. </strong>

<ol>
    <li> Compute the continued fraction expansion of \( \dfrac{e}{N} \). </li>
    <li> For each convergent \( \dfrac{k_i}{d_i} \), treat \( d_i \) as a candidate private exponent. </li>
    <li> Verify by checking, for several random \( m \) with \( \gcd(m, N) = 1 \),
    \[
        (m^e)^{d_i} \equiv m \pmod N.
    \]
    If it holds for multiple \( m \), accept \( d_i \) as the correct private exponent \( d \). </li>
</ol>

</div>

### Complexity

連分數的 convergents 數量大約是 $ O(\log N)$, 因此枚舉候選並逐一驗證的成本很低；整體攻擊相當快速。

<div class="remark">

<strong> Conclusion. </strong>

If
$$
d < \frac{1}{3}N^{1/4}
$$
then \(d \) can be recovered efficiently via Wiener's attack using continued fractions.

</div>

---

<div class="example">

<strong>Example.</strong>

Suppose RSA modulus
$$
N = 9, 449, 868, 410, 449
$$

and public exponent
$$
e = 6, 792, 605, 526, 025
$$

<div class="remark">

在這個範例中
$$
N = 9, 449, 868, 410, 449, \quad q = 1, 234, 577, \quad p = 7, 654, 337
$$
可見 $p > 2q$，因此不符合前面假設的 $q < p < 2q$（balanced primes）。 <br>

不過 Wiener attack 的流程仍可照常進行； $q < p < 2q$ 只是用來推導誤差界並「保證成功」的充分條件，在此例中即使不滿足也仍然成功。

</div>

已知解密指數滿足
$$
d < \frac{1}{3}N^{1/4} \approx 584.
$$

計算 $\alpha=\frac{e}{N}$ 的 continued fraction expansion

列出 convergents：
$$
1,
\ \frac{2}{3},
\ \frac{3}{4},
\ \frac{5}{7},
\ \frac{18}{25},
\ \frac{23}{32},
\ \frac{409}{569},
\ \frac{1659}{2308},
\ \dots
$$

接著依序檢查每個 convergent 的分母是否可能是私鑰指數 \(d\)。
由於第 \(7\) 個 convergent 的分母為 \(569\)，且符合 \(d<584\)，因此得到 $d = 569$ 也就是第 \(7\) 個 convergent 的分母。

</div>

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 17. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
