---
layout: page
title: openai/math Overview
description: 整理 openai/math 的目錄結構、手稿與形式化統計、領域分佈及更新紀錄。
date: 2026-10-22
last_updated: 2026-10-22
---

openai/math {% include gh-link.html href="https://github.com/openai/math" label="repo" aria_label="repo: openai/math on GitHub" %}

{% include math/ai/repo-stats.html repo="openai/math" %}
<script defer src="{{ '/assets/js/repo-stats.js' | relative_url }}"></script>

`openai/math` 收錄內部模型產生的數學手稿與支持證明的材料，於 2026 年 10 月 6 日公開。本文只整理 repo 的結構，不逐題列出成果。

## 結構

以下列出主要目錄與檔案。

```text
openai/math
├── README.md
├── overview.pdf               # 依領域分類的 372 個 families
├── overview.tex
├── CONTENTS.md                # 手稿索引
├── history.md                 # 撤回、修訂與新增形式化證明的紀錄
├── LICENSE                    # Apache-2.0
├── preprints/                 # 手稿與各版本材料，包含舊版及撤回稿
├── lean/
└── reasoning_traces/          # 推理過程摘要（10 份 PDF）
```

## 手稿與形式化統計

- Catalog 共 719 份 manuscripts，分為 372 個 families。
  - 一個 family 把相關論文放在一起，可能包含主要結果、輔助論證、推論或替代證明。
- 條目編號依 catalog 順序排列；編號到 377，未使用的號碼為 045、061、070、123、163。
- 已形式化的主要結果（top-line results）：300 / 719。

## 領域分佈

把 372 個 families 分成 17 個領域，以下依 catalog 順序列出。

| 領域 | Families | 編號範圍 |
|---|---|---|
| Number theory | 31 | 001–031 |
| Algebraic and complex geometry | 36 | 032–069 |
| Real and complex analysis | 16 | 071–086 |
| Convex and metric geometry | 15 | 087–101 |
| Theoretical computer science | 40 | 102–142 |
| Dynamical systems and ergodic theory | 12 | 143–154 |
| Combinatorics | 37 | 155–192 |
| Algebra | 18 | 193–210 |
| Probability and statistical mechanics | 29 | 211–239 |
| Mathematical logic | 6 | 240–245 |
| Group theory | 14 | 246–259 |
| Mathematical physics | 25 | 260–284 |
| Operator algebras | 19 | 285–303 |
| Topology | 18 | 304–321 |
| Functional analysis | 11 | 322–332 |
| Differential geometry | 29 | 333–361 |
| Partial differential equations | 16 | 362–377 |
{: .table-center}

## 更新紀錄

### 2026-10-07

- 撤回 3 份 manuscripts：其中一篇有 sign error，另兩篇依賴它的構造。
- 修訂 14 份 manuscripts：包含 proof repairs、statement 修正與依賴關係的釐清。
- 另有 13 份 manuscripts 更新引用與版本日期，以引用修訂後的相關論文。
- 新增 6 個 formalizations。
- 另新增 5 項支持性結果的補充。

## 相關筆記

### Number theory

- #003 The quasi-Riemann hypothesis {% include gh-link.html href="https://github.com/openai/math/tree/main/preprints/The-Quasi-Riemann-Hypothesis-September-30-2026" label="preprint" aria_label="preprint: The Quasi-Riemann Hypothesis on GitHub" %}
  - [The Quasi-Riemann Hypothesis]({{ '/articles/Math/ai/openai/quasi-riemann-hypothesis/' | relative_url }})

### Theoretical computer science

- #109 Integer multiplication below $n\log n$ {% include gh-link.html href="https://github.com/openai/math/tree/main/preprints/Integer-multiplication-below-n-log-n-September-23-2026" label="preprint" aria_label="preprint: Integer multiplication below n log n on GitHub" %}
  - [CrocSwap integer-mult-bounds]({{ '/articles/Math/ai/openai/integer-mult-bounds/' | relative_url }})

## References

### OpenAI announcement

- [Sharing AI progress in mathematics](https://openai.com/index/sharing-ai-progress-in-mathematics/)：OpenAI 的公告。

### Catalog

- [README](https://github.com/openai/math/blob/main/README.md)：repo 的導覽、產生方式與引用方式。
- [overview.pdf](https://github.com/openai/math/blob/main/overview.pdf)：372 個 families 的說明，依領域分類。
- [CONTENTS.md](https://github.com/openai/math/blob/main/CONTENTS.md)：manuscript map，用來找個別論文與支持材料。
- [preprints/](https://github.com/openai/math/tree/main/preprints)：PDF、原始檔，以及各手稿的引用與編譯說明。

### Lean

- [Lean library](https://github.com/openai/math/blob/main/lean/README.md)：形式化證明的說明。
- [formalization.yaml](https://github.com/openai/math/blob/main/lean/formalization.yaml)：形式化證明、對應論文與驗證設定的 catalogue。
- [Comparator instructions](https://github.com/openai/math/blob/main/lean/ComparatorChallenges/README.md)：額外的檢查說明。

### Supplementary

- [reasoning_traces/](https://github.com/openai/math/tree/main/reasoning_traces)：十個 families 的 abridged reasoning summaries。
- [history.md](https://github.com/openai/math/blob/main/history.md)：更新歷史。
