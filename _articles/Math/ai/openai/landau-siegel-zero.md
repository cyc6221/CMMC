---
layout: page
title: Landau–Siegel Zero
description: 追蹤 openai/math 第 003 項 Landau–Siegel zeros 的 uniform exclusion 發布之後的發展：重新證明、簡化、explicit constant、更強的 bound、formal verification 與推廣。
date: 2026-10-27
last_updated: 2026-10-27
pr_repo: mathcommunity/oai-math-revised
---
2026 年 10 月，openai/math {% include gh-link.html href="https://github.com/openai/math" label="repo" aria_label="repo: openai/math on GitHub" %} 的 Family 003 宣稱排除了 Landau–Siegel zero。結果發布後不久，陸續出現獨立的重新證明、簡化、定量化、形式驗證與推廣。這份筆記追蹤 003 發布之後這個問題的發展。

<script defer src="{{ '/assets/js/repo-stats.js' | relative_url }}"></script>

## 起點：OpenAI/math {% include math/ai/openai-result.html num="003" %}

2026-10-06 OpenAI 公開 research catalog，Family 003 包含三條結果：

- *The Quasi-Riemann Hypothesis*：$\mathrm{Re}(s)>7/8$ {% include gh-link.html href="https://github.com/openai/math/tree/main/preprints/The-Quasi-Riemann-Hypothesis-September-30-2026" label="preprint" aria_label="preprint: The Quasi-Riemann Hypothesis (7/8) on GitHub" %}（2026-09-30）
- *The Quasi-Riemann Hypothesis*：$\mathrm{Re}(s)>11/12$ {% include gh-link.html href="https://github.com/openai/math/tree/main/preprints/The-Quasi-Riemann-Hypothesis-October-5-2026" label="preprint" aria_label="preprint: The Quasi-Riemann Hypothesis (11/12) on GitHub" %}（2026-10-05）
- *Uniform exclusion of Landau–Siegel zeros* {% include gh-link.html href="https://github.com/openai/math/tree/main/preprints/Uniform-exclusion-of-Landau-Siegel-zeros-October-1-2026" label="preprint" aria_label="preprint: Uniform exclusion of Landau–Siegel zeros on GitHub" %}（2026-10-01）

核心結論是存在 absolute constant $c>0$，使得

$$(1-\beta)\log q\ge c.$$

這排除的是異常逼近 $1$ 的 Landau–Siegel zero，並不表示所有 real zero 都不存在。

## 獨立的重新證明

同一個定理很快出現多種不同的 proof architecture。

### William Banks

*On the OpenAI proof that Landau–Siegel zeros do not exist* [arXiv:2610.15483](https://arxiv.org/abs/2610.15483)

給出完整的人類 exposition，並把 OpenAI 原本只寫成 $c>0$ 的常數換成 explicit numerical constant。結果從 qualitative theorem 變成 quantitative theorem。

### Bryce Kerr

*A simpler proof that there are no Landau–Siegel zeros* [arXiv:2610.21099](https://arxiv.org/abs/2610.21099)

把 OpenAI 證明中較重的 interpolation 與 determinant machinery 換成較簡單的 pigeonhole construction 加上 Masser zero estimate。

### Ben Green

*On Landau–Siegel zeros* [hexagon:2610.00311](https://hexagonmath.org/2610.00311)

OpenAI 的證明使用較大的 biquadratic field $\mathbb{Q}(\sqrt d,\sqrt2)$。Green 發現可以直接在 $\mathbb{Q}(\sqrt d)$ 中進行，並把關鍵的 determinant 換成 explicit Gram determinant。

Green 的 formulation 後來由 Tao 寫成 proof sketch：*[A sketch of the proof of non-existence of Siegel zeroes](https://terrytao.wordpress.com/2026/10/19/a-sketch-of-the-proof-of-non-existence-of-siegel-zeroes/)*。

## 社群版本的 manuscript

mathcommunity/oai-math-revised {% include gh-link.html href="https://github.com/mathcommunity/oai-math-revised" label="repo" aria_label="repo: mathcommunity/oai-math-revised on GitHub" %}

{% include math/ai/repo-stats.html repo="mathcommunity/oai-math-revised" %}

oai-math-revised 收錄了 *Uniform exclusion of Landau–Siegel zeros* 的 revised manuscript。

### PR {% include pr-link.html num=2 %}

2026-10-18 merge，由 `teorth` 提交。把 Banks、Kerr、Green 三個後續版本加入 revised manuscript，作者欄從 OpenAI 改為 OpenAI (with community contributions)。原本一次性的 AI manuscript 變成由社群維護的數學文件。

### PR {% include pr-link.html num=3 %}

已 merge。收進以下內容：

- Tao 的 Green-proof exposition：[A sketch of the proof of non-existence of Siegel zeroes](https://terrytao.wordpress.com/2026/10/19/a-sketch-of-the-proof-of-non-existence-of-siegel-zeroes/)
- Pascadi observation
- Barreto variant：[An elementary proof of the non-existence of Landau–Siegel zeros](https://x.com/acerfur/status/2112239827077026128)
- Pescador variant

討論的問題從 OpenAI 的證明是否正確，轉為這個 argument 能推到多遠。

## 改進 bound

### Pascadi

沿著 OpenAI-style construction 繼續 adjoin square roots，prime-sum estimate 中某個係數可以逼近 $\frac12$。這項觀察針對的是證明本身的 parameter structure。

### Barreto 與 Pescador

得到更 sharp 的 estimate：

$$\frac12\log x+\frac14\log q+\log\log x+O(1).$$

Barreto 還把某些 algebraic nonsingularity argument 換成 Wronskian。最終得到

$$(1-\beta)\log q\ge 1-O\!\left(\frac{\log\log q}{\log q}\right),$$

與 OpenAI 原始的 $(1-\beta)\log q\ge c$ 已是不同的精細程度。這些內容由 PR {% include pr-link.html num=3 %} 加入 revised paper。

## Explicit constant

問題從「存在某個 $c>0$」轉為「$c$ 可以多大」，以及 $(1-\beta)\log q$ 的 asymptotic lower bound 究竟是多少。

<table class="table-center">
  <thead>
    <tr>
      <th>工作</th>
      <th>方向</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>OpenAI</td>
      <td>證明存在某個 absolute $c>0$</td>
    </tr>
    <tr>
      <td>Banks</td>
      <td>給 explicit constant</td>
    </tr>
    <tr>
      <td>Kimura</td>
      <td>給可計算的 gap，並用於 class-number computation</td>
    </tr>
    <tr>
      <td>Guo</td>
      <td>改善與統一 explicit bound</td>
    </tr>
    <tr>
      <td>Barreto / Pescador</td>
      <td>漸近上更強的 gap</td>
    </tr>
  </tbody>
</table>

## Formal verification

003 在 openai/math 中本來就有 Lean formalization。之後 Kimura 等人的工作把相關的 explicit statements 再 formalize，並放進實際的 downstream computation。形式驗證的用途從檢查 AI 給出的定理，變成把已驗證的定理當作後續計算的基礎。

## 後續應用與推廣

### Imaginary quadratic class number

Kimura 把 Landau–Siegel zero 的排除用於 imaginary quadratic class number 的 effective classification。過去 Siegel theorem 的 constant 是 ineffective，這類問題無法真正計算；有了 explicit gap 之後可以算下去。

### 推廣到 base field

Banks 把 argument 從 $\mathbb{Q}$ 推廣到一般 number field，進而得到 effective Brauer–Siegel 類型的結果。

## 各階段整理

<table class="table-center">
  <thead>
    <tr>
      <th>階段</th>
      <th>工作</th>
      <th>內容</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>重新證明</td>
      <td>Banks</td>
      <td>explicit constant、完整證明</td>
    </tr>
    <tr>
      <td>重新證明</td>
      <td>Kerr</td>
      <td>較簡單的證明</td>
    </tr>
    <tr>
      <td>重新證明</td>
      <td>Green</td>
      <td>quadratic field 與 Gram determinant 的證明</td>
    </tr>
    <tr>
      <td>社群整合</td>
      <td>PR {% include pr-link.html num=2 %}</td>
      <td>合併 Banks、Kerr、Green 的版本，附 Tao 的 proof sketch</td>
    </tr>
    <tr>
      <td>社群整合</td>
      <td>PR {% include pr-link.html num=3 %}</td>
      <td>合併 Tao 的 Green-proof exposition 與 Pascadi、Barreto、Pescador 的後續結果</td>
    </tr>
    <tr>
      <td>改進 bound</td>
      <td>Pascadi</td>
      <td>對證明結構的新觀察</td>
    </tr>
    <tr>
      <td>改進 bound</td>
      <td>Barreto / Pescador</td>
      <td>漸近上更強的 bound</td>
    </tr>
    <tr>
      <td>應用</td>
      <td>Kimura</td>
      <td>explicit gap、formalization、class-number 的應用</td>
    </tr>
    <tr>
      <td>應用</td>
      <td>Banks</td>
      <td>推廣到一般 number field、Brauer–Siegel 類型的結果</td>
    </tr>
  </tbody>
</table>

## References

### openai/math

- [openai/math](https://github.com/openai/math)
- [CONTENTS.md](https://github.com/openai/math/blob/main/CONTENTS.md)：manuscript map，#003 的條目與摘要。

### Preprints

- [The Quasi-Riemann Hypothesis: A Zero-Free Half-Plane $\mathrm{Re}(s)>7/8$](https://github.com/openai/math/tree/main/preprints/The-Quasi-Riemann-Hypothesis-September-30-2026)
- [The Quasi-Riemann Hypothesis (11/12)](https://github.com/openai/math/tree/main/preprints/The-Quasi-Riemann-Hypothesis-October-5-2026)
- [Uniform exclusion of Landau–Siegel zeros](https://github.com/openai/math/tree/main/preprints/Uniform-exclusion-of-Landau-Siegel-zeros-October-1-2026)

### Expositions

- W. D. Banks, [On the OpenAI proof that Landau–Siegel zeros do not exist](https://arxiv.org/abs/2610.15483)
- B. Kerr, [A simpler proof that there are no Landau–Siegel zeros](https://arxiv.org/abs/2610.21099)
- B. Green, [On Landau–Siegel zeros](https://hexagonmath.org/2610.00311)
- T. Tao, [A sketch of the proof of non-existence of Siegel zeroes](https://terrytao.wordpress.com/2026/10/19/a-sketch-of-the-proof-of-non-existence-of-siegel-zeroes/)
- K. Barreto, [An elementary proof of the non-existence of Landau–Siegel zeros](https://x.com/acerfur/status/2112239827077026128)

### Cited in the preprint

- R. F. Lu, A. Zaman, H. Zhao, [arXiv:2602.03626](https://arxiv.org/abs/2602.03626)
- D. W. Masser, [doi:10.1007/BF01389194](https://doi.org/10.1007/BF01389194)

### Community

- [mathcommunity/oai-math-revised](https://github.com/mathcommunity/oai-math-revised)
- PR {% include pr-link.html num=2 %}、{% include pr-link.html num=3 %}
