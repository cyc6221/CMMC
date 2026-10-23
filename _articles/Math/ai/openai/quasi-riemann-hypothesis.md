---
layout: page
title: The Quasi-Riemann Hypothesis
date: 2026-10-23
last_updated: 2026-10-23
---
[openai/math](https://github.com/openai/math) 的第 003 項結果，證明所有 Dirichlet $L$-function（包含 Riemann zeta function $\zeta(s)$）在半平面 $\operatorname{Re}s>7/8$ 沒有零點。同一個半平面對 $\mathbb{Q}(\sqrt{-3})$ 上的每個 finite-order Hecke $L$-function 也成立。

結果由三份 OpenAI preprint 組成：主文 [*The Quasi-Riemann Hypothesis: A Zero-Free Half-Plane $\operatorname{Re}s>7/8$*](https://github.com/openai/math/blob/main/preprints/The-Quasi-Riemann-Hypothesis-September-30-2026/paper.pdf)（2026 年 9 月 30 日）、[*Uniform exclusion of Landau–Siegel zeros*](https://github.com/openai/math/blob/main/preprints/Uniform-exclusion-of-Landau-Siegel-zeros-October-1-2026/paper.pdf)（10 月 1 日），以及以另一種方法證明 $\operatorname{Re}s>11/12$ 的 [*The Quasi-Riemann Hypothesis*](https://github.com/openai/math/blob/main/preprints/The-Quasi-Riemann-Hypothesis-October-5-2026/paper2.pdf)（10 月 5 日）。以下 Abstract 與定理為原文。

## Quasi-Riemann hypothesis

對 $\zeta(s)$ 而言，存在固定的 $\theta_0<1$，使 $\zeta(s)$ 在 $\operatorname{Re}s>\theta_0$ 沒有零點，稱為 quasi-Riemann hypothesis。它要求的是在每個高度都成立的同一個間隙，而不只是 $\operatorname{Re}s=1$ 上不為零。對 Dirichlet $L$-function 的對應版本，要求單一的 $\theta_0<1$ 對所有 character 一致，與 conductor 及高度無關。

古典的 zero-free region 隨 conductor 或高度增大而逼近 $\operatorname{Re}s=1$，且可能允許一個單一的 real exceptional zero，因此無法給出固定半平面的一致排除。Zero-density estimate 則是估計位於某條垂直線右側的零點個數，並不排除所有零點。

## OpenAI #003

### Abstract

> We prove that all finite-order Hecke $L$-functions over $\mathbb{Q}(\sqrt{-3})$ and all Dirichlet $L$-functions are zero-free in the half-plane $\operatorname{Re}s>7/8$, with the principal pole at $s=1$ allowed. In particular, the Riemann zeta function is zero-free in this half-plane, proving the quasi-Riemann hypothesis.

### Main theorem

<div class="theorem">
<strong>Theorem 1.1</strong>
Every finite-order Hecke $L$-function over $F=\mathbb{Q}(\sqrt{-3})$ has no zero in $\operatorname{Re}s>7/8$. The same holds for every Dirichlet $L$-function, including $\zeta(s)$. A pole at $s=1$ for a principal character is allowed.
</div>

<div class="remark">
<strong>Remark.</strong>
定理說明 $\zeta(s)$ 的 nontrivial zeros（位於 $0<\operatorname{Re}s<1$ 的零點）的實部上確界至多為 $7/8$。邊界 $\operatorname{Re}s=7/8$ 不包含在內，$(7/8,1)$ 內的 exceptional real zero 則被排除。定理沒有證明 Riemann hypothesis 或其推廣，後者要求 nontrivial zeros 位於 $\operatorname{Re}s=1/2$，目前仍是 open problem。
</div>

論證分兩步。先對 $\mathbb{Q}(\sqrt{-3})$ 上的 Hecke $L$-function 證明半平面，再用 quadratic factorization 把 Hecke 的結果轉到所有 Dirichlet character：Dirichlet character $\chi$ 與 ideal norm 合成後得到 $F$ 上的 Hecke character，除了有限多個 Euler factor 外，它的 $L$-function 等於 $L(s,\chi)L(s,\chi\chi_{-3})$，其中 $\chi_{-3}$ 是 $F/\mathbb{Q}$ 的 quadratic character。被略去的 Euler factor 在 $\operatorname{Re}s>0$ 不為零，principal pole 另外處理。

## Companion preprints

### 11/12 的另一個證明

> We establish the quasi-Riemann hypothesis by proving that every Dirichlet $L$-function, including Riemann's zeta function, has no zeros in the half-plane $\operatorname{Re}s>11/12$. More generally, we prove the same zero-free half-plane for every finite-order Hecke $L$-function over $K=\mathbb{Q}(\sqrt{-3})$. In particular, this rules out the existence of Landau–Siegel zeros.

<div class="theorem">
<strong>Theorem 1.1</strong>
Every finite-order Hecke $L$-function over $K$ has no zeros in the half-plane $\operatorname{Re}s>11/12$. Thus every Dirichlet $L$-function, including $\zeta(s)$, has no zeros for $\operatorname{Re}s>11/12$.
</div>

<div class="remark">
<strong>Remark.</strong>
這份 preprint 自述 Theorem 1.1 是通往 $\operatorname{Re}s>7/8$ 的自然中間步驟，為了簡潔而單獨寫成。OpenAI 說明，這份 writeup 經人工編輯以提升可讀性，其餘手稿則由模型直接產生。
</div>

### Landau–Siegel zeros

> We prove the uniform exclusion of Landau–Siegel zeros. There is an absolute constant $c>0$ such that every real zero $\beta\in(0,1)$ of every primitive nonprincipal real Dirichlet $L$-function of conductor $q\ge3$ satisfies $(1-\beta)\log q\ge c$.

<div class="theorem">
<strong>Theorem 1</strong>
There is an absolute constant $c>0$ such that every real zero $\beta\in(0,1)$ of every primitive nonprincipal real Dirichlet $L$-function of conductor $q\ge3$ satisfies
$$(1-\beta)\log q\ge c.$$
</div>

## Lean formalization

repo 的 [Lean 文件](https://github.com/openai/math/blob/main/lean/docs/003.md)說明形式化的範圍：

- 對 $\zeta(s)$ 與所有 Dirichlet $L$-function，在所有正整數 modulus 與所有 character 上一致地取得 $\theta=7/8$。
- 對 $\mathbb{Q}(\sqrt{-3})$ 上的 finite-order Hecke $L$-function 取得同一個界。
- Dirichlet 與 Hecke 的敘述都排除 principal character 在 $s=1$ 的 pole。
- Landau–Siegel zeros 的結果：存在常數 $c>0$，使每個 conductor $q\ge3$ 的 primitive nonprincipal real Dirichlet character，其 $L$-function 的每個實零點 $0<\beta<1$ 都滿足 $1-\beta\ge c/\log q$。兩種 parity 都包含，沒有給出 $c$ 的明確數值。
- 這排除了 $1-c/\log q<\beta<1$ 內的實零點，但沒有排除 $(0,1)$ 內其他位置的實零點。
- Preprint 後段的應用不在形式化範圍內。

<table class="table-center">
  <thead>
    <tr>
      <th>Result</th>
      <th>Comparator statement</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Riemann zeta $7/8$ bound</td>
      <td><a href="https://github.com/openai/math/blob/main/lean/ComparatorChallenges/QuasiRiemannHypothesis.lean">QuasiRiemannHypothesis.lean</a></td>
    </tr>
    <tr>
      <td>Dirichlet $L$-function $7/8$ bound</td>
      <td><a href="https://github.com/openai/math/blob/main/lean/ComparatorChallenges/DirichletSevenEighths.lean">DirichletSevenEighths.lean</a></td>
    </tr>
    <tr>
      <td>Finite-order Hecke $L$-function $7/8$ bound</td>
      <td><a href="https://github.com/openai/math/blob/main/lean/ComparatorChallenges/HeckeSevenEighths.lean">HeckeSevenEighths.lean</a></td>
    </tr>
    <tr>
      <td>Uniform real-zero gap</td>
      <td><a href="https://github.com/openai/math/blob/main/lean/ComparatorChallenges/SiegelZeros.lean">SiegelZeros.lean</a></td>
    </tr>
  </tbody>
</table>
