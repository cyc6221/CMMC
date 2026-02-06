---
layout: page
title: Partial Exposure of some bits of the RSA Prime Factors
date: 2026-02-06
last_updated: 2026-02-06
tags: [RSA, partial-key-exposure, prime-factor, LSB, Coppersmith]
---

如果攻擊者不是拿到 private exponent，而是拿到 RSA 質因數 $p$ 的部分 bits。若已知 $p$ 的一段 bits（例如最低位的一段），在某些參數下可以用 **Coppersmith** 類的方法在 polynomial time 內把 $p, q$ 找回來，等同直接 factor $N$。

<!-- --- -->

## Setup

設 RSA modulus 為 $N = p \cdot q$，其中 $N$ 是 $n$-bit，並假設 $p \approx q$（典型 RSA 設定，兩者同階）。

假設攻擊者已知 $p$ 的 **$n/4$ 個 LSBs**（least significant bits）。因為 $p$ 約為 $n/2$-bit，這等價於已知構成 $p$ 的 bits 中「較低的一半」。

把 $p$ 分解成已知低位與未知高位：

$$
p = x_0 \cdot 2^{n/4} + p_0,
$$

其中

- $p_0$ 為已知（$n/4$ 個 LSBs）
- $x_0$ 為未知（大約 $n/4$ bit）
- $0 < x_0 < 2^{n/4}$

同樣把 $q$ 寫成

$$
q = y_0 \cdot 2^{n/4} + q_0,
$$

其中 $q_0$ 是 $q$ 的 $n/4$ 個 LSBs（未知），$y_0$ 也是未知。

### Step 1: recover $q_0$ from a modular relation

由 $N = pq$，取 mod $2^{n/4}$：

$$
N \equiv p_0 q_0 \pmod{2^{n/4}}.
$$

因為 $p_0$ 已知，且在 RSA 中 $p$ 通常為 odd，因此 $p_0$ 也會是 odd，通常可在 $2^{n/4}$ 下可逆，即 $\gcd(p_0,2^{n/4})=1$ 。因此可解出

$$
q_0 \equiv N \cdot p_0^{-1} \pmod{2^{n/4}}.
$$

也就是說：**知道 $p$ 的 $n/4$ 個 LSBs，會導致 $q$ 的 $n/4$ 個 LSBs 也可被推得**。

### Step 2: build a bivariate polynomial with a small root

將 $p, q$ 的分解代回 $N = pq$，考慮多項式

$$
f(x,y) = (p_0 + 2^{n/4}x)(q_0 + 2^{n/4}y) - N.
$$

展開：

$$
f(x,y) = p_0q_0 + 2^{n/4}(p_0y + q_0x) + 2^{n/2}xy - N.
$$

真正的未知量 $(x_0, y_0)$ 會滿足

$$
f(x_0, y_0) = 0.
$$

而且由於 $p \approx q \approx \sqrt{N}$，可估計

$$
0 < x_0, y_0 < 2^{n/4} \approx N^{1/4}.
$$

因此 $(x_0, y_0)$ 是一個 **small root**（小根）。

### Step 3: apply bivariate Coppersmith (heuristic)

這裡使用 **Coppersmith’s method** 的 **bivariate** 延伸（常見以 heuristic 形式使用）：

- $f(x,y)$ 是 degree two 的二元多項式
- 已知它在整數域存在一個小根 $(x_0, y_0)$
- 且 $\lvert x_0 \rvert, \lvert y_0 \rvert \le N^{1/4}$

在這些條件下，可以透過 lattice 建構與 **LLL reduction** 找到等價約束，進而在 polynomial time 內恢復 $x_0, y_0$。

一旦得到 $x_0, y_0$，就能重建：

$$
p = x_0 \cdot 2^{n/4} + p_0,
\qquad
q = y_0 \cdot 2^{n/4} + q_0,
$$

從而 factor $N$。

<!-- --- -->

<div class="algorithm">

已知 $p$ 的 $n/4$ 個 LSBs：

<ol>
  <li> 由 $N \equiv p_0q_0 \pmod{2^{n/4}}$ 推出 $q_0$ </li>
  <li> 構造二元多項式 $f(x,y) = (p_0 + 2^{n/4}x)(q_0 + 2^{n/4}y) - N$ </li>
  <li> 由 bivariate Coppersmith 找到小根 $(x_0,y_0)$ </li>
  <li> 還原 $p, q$，完成 factorization </li>
</ol>

</div>

<!-- --- -->

<div class="remark">

<ol>
  <li> 類似的攻擊也適用於「已知 $p$ 的 $n/4$ 個 MSBs (most significant bits)」的情況，只是分解與多項式構造會以高位資訊為主。 </li>
  <li> 上述推導依賴 $p \approx q$（balanced RSA），以及在 $2^{n/4}$ 下 $p_0$ 可逆這類典型條件。 </li>
</ol>

</div>
