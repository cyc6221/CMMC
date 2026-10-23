---
layout: page
title: The Quasi-Riemann Hypothesis
date: 2026-10-23
last_updated: 2026-10-23
---
openai/math {% include gh-link.html href="https://github.com/openai/math" label="repo" aria_label="repo: openai/math on GitHub" %} 的第 003 項結果，證明所有 Dirichlet $L$-function（包含 Riemann zeta function $\zeta(s)$）在半平面 $\mathrm{Re}(s)>7/8$ 沒有零點。同一個半平面對 $\mathbb{Q}(\sqrt{-3})$ 上的每個 finite-order Hecke $L$-function 也成立。

結果由三份 OpenAI preprint 組成：

- 主文：*The Quasi-Riemann Hypothesis: A Zero-Free Half-Plane $\mathrm{Re}(s)>7/8$* {% include gh-link.html href="https://github.com/openai/math/tree/main/preprints/The-Quasi-Riemann-Hypothesis-September-30-2026" label="preprint" aria_label="preprint: The Quasi-Riemann Hypothesis (7/8) on GitHub" %}（2026-09-30）
- Landau–Siegel zeros：*Uniform exclusion of Landau–Siegel zeros* {% include gh-link.html href="https://github.com/openai/math/tree/main/preprints/Uniform-exclusion-of-Landau-Siegel-zeros-October-1-2026" label="preprint" aria_label="preprint: Uniform exclusion of Landau–Siegel zeros on GitHub" %}（2026-10-01）
- 另一種方法證明 $\mathrm{Re}(s)>11/12$：*The Quasi-Riemann Hypothesis* {% include gh-link.html href="https://github.com/openai/math/tree/main/preprints/The-Quasi-Riemann-Hypothesis-October-5-2026" label="preprint" aria_label="preprint: The Quasi-Riemann Hypothesis (alternate 11/12 proof) on GitHub" %}（2026-10-05）

## Quasi-Riemann hypothesis

對 $\zeta(s)$ 而言，存在固定的 $\theta_0<1$，使 $\zeta(s)$ 在 $\mathrm{Re}(s)>\theta_0$ 沒有零點，稱為 quasi-Riemann hypothesis。它要求的是在每個高度都成立的同一個間隙，而不只是 $\mathrm{Re}(s)=1$ 上不為零。對 Dirichlet $L$-function 的對應版本，要求單一的 $\theta_0<1$ 對所有 character 一致，與 conductor 及高度無關。

古典的 zero-free region 隨 conductor 或高度增大而逼近 $\mathrm{Re}(s)=1$，且可能允許一個單一的 real exceptional zero，因此無法給出固定半平面的一致排除。Zero-density estimate 則是估計位於某條垂直線右側的零點個數，並不排除所有零點。

## OpenAI #003

### Abstract

> We prove that all finite-order Hecke $L$-functions over $\mathbb{Q}(\sqrt{-3})$ and all Dirichlet $L$-functions are zero-free in the half-plane $\mathrm{Re}(s)>7/8$, with the principal pole at $s=1$ allowed. In particular, the Riemann zeta function is zero-free in this half-plane, proving the quasi-Riemann hypothesis.

### Main theorem

<div class="theorem">
<strong>Theorem 1.1</strong>
Every finite-order Hecke $L$-function over $F=\mathbb{Q}(\sqrt{-3})$ has no zero in $\mathrm{Re}(s)>7/8$. The same holds for every Dirichlet $L$-function, including $\zeta(s)$. A pole at $s=1$ for a principal character is allowed.
</div>

<div class="remark">
<strong>Remark.</strong>
定理說明 $\zeta(s)$ 的 nontrivial zeros（位於 $0<\mathrm{Re}(s)<1$ 的零點）的實部上確界至多為 $7/8$。邊界 $\mathrm{Re}(s)=7/8$ 不包含在內，$(7/8,1)$ 內的 exceptional real zero 則被排除。定理沒有證明 Riemann hypothesis 或其推廣，後者要求 nontrivial zeros 位於 $\mathrm{Re}(s)=1/2$，目前仍是 open problem。
</div>

論證分兩步。先對 $\mathbb{Q}(\sqrt{-3})$ 上的 Hecke $L$-function 證明半平面，再用 quadratic factorization 把 Hecke 的結果轉到所有 Dirichlet character：Dirichlet character $\chi$ 與 ideal norm 合成後得到 $F$ 上的 Hecke character，除了有限多個 Euler factor 外，它的 $L$-function 等於 $L(s,\chi)L(s,\chi\chi_{-3})$，其中 $\chi_{-3}$ 是 $F/\mathbb{Q}$ 的 quadratic character。被略去的 Euler factor 在 $\mathrm{Re}(s)>0$ 不為零，principal pole 另外處理。

## Companion preprints

### 11/12 的另一個證明

> We establish the quasi-Riemann hypothesis by proving that every Dirichlet $L$-function, including Riemann's zeta function, has no zeros in the half-plane $\mathrm{Re}(s)>11/12$. More generally, we prove the same zero-free half-plane for every finite-order Hecke $L$-function over $K=\mathbb{Q}(\sqrt{-3})$. In particular, this rules out the existence of Landau–Siegel zeros.

<div class="theorem">
<strong>Theorem 1.1</strong>
Every finite-order Hecke $L$-function over $K$ has no zeros in the half-plane $\mathrm{Re}(s)>11/12$. Thus every Dirichlet $L$-function, including $\zeta(s)$, has no zeros for $\mathrm{Re}(s)>11/12$.
</div>

<div class="remark">
<strong>Remark.</strong>
這份 preprint 自述 Theorem 1.1 是通往 $\mathrm{Re}(s)>7/8$ 的自然中間步驟，為了簡潔而單獨寫成。OpenAI 說明，這份 writeup 經人工編輯以提升可讀性，其餘手稿則由模型直接產生。
</div>

### Landau–Siegel zeros

> We prove the uniform exclusion of Landau–Siegel zeros. There is an absolute constant $c>0$ such that every real zero $\beta\in(0,1)$ of every primitive nonprincipal real Dirichlet $L$-function of conductor $q\ge3$ satisfies $(1-\beta)\log q\ge c$.

<div class="theorem">
<strong>Theorem 1</strong>
There is an absolute constant $c>0$ such that every real zero $\beta\in(0,1)$ of every primitive nonprincipal real Dirichlet $L$-function of conductor $q\ge3$ satisfies
$$(1-\beta)\log q\ge c.$$
</div>

## References

### openai/math

- [openai/math](https://github.com/openai/math)
- [CONTENTS.md](https://github.com/openai/math/blob/main/CONTENTS.md)：manuscript map，#003 的條目與摘要。
- [openai/math Overview]({{ '/articles/Math/ai/openai/math-overview/' | relative_url }})
- [OpenAI Math Announcements]({{ '/articles/Math/ai/openai/announcements/' | relative_url }})

### Preprints

- [The Quasi-Riemann Hypothesis: A Zero-Free Half-Plane $\mathrm{Re}(s)>7/8$](https://github.com/openai/math/tree/main/preprints/The-Quasi-Riemann-Hypothesis-September-30-2026)
- [The Quasi-Riemann Hypothesis (alternate 11/12 proof)](https://github.com/openai/math/tree/main/preprints/The-Quasi-Riemann-Hypothesis-October-5-2026)
- [Uniform exclusion of Landau–Siegel zeros](https://github.com/openai/math/tree/main/preprints/Uniform-exclusion-of-Landau-Siegel-zeros-October-1-2026)

### OpenAI announcement

- [Sharing AI progress in mathematics](https://openai.com/index/sharing-ai-progress-in-mathematics/)
