---
layout: page
title: openai/math Overview
date: 2026-10-22
last_updated: 2026-10-22
---

openai/math <a class="gh-link" href="https://github.com/openai/math" target="_blank" rel="noopener noreferrer" aria-label="openai/math on GitHub"><svg viewBox="0 0 16 16" class="ico" aria-hidden="true"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>GitHub</a>

{% include math/ai/repo-stats.html repo="openai/math" %}
<script defer src="{{ '/assets/js/repo-stats.js' | relative_url }}"></script>

`openai/math` 收錄內部模型產生的數學手稿與支持證明的材料，於 2026 年 10 月 6 日公開。本文只整理 repo 的結構，不逐題列出成果。

## 結構

```text
openai/math
├── README.md
├── overview.pdf               # 372 families, grouped by discipline
├── overview.tex               # LaTeX source of overview.pdf
├── CONTENTS.md                # manuscript map
├── history.md                 # withdrawals, fixes, new formalizations
├── LICENSE                    # Apache-2.0
├── preprints/                 # one directory per manuscript
├── lean/                      # Lean library
│   ├── OAI/                   # formalizations, by subject
│   └── formalization.yaml     # manuscript <-> Lean <-> verification config
└── reasoning_traces/          # abridged reasoning summaries (10 PDFs)
```

- Catalog 共 719 份 manuscripts，分為 372 個 families。
  - 一個 family 把相關論文放在一起，可能包含主要結果、輔助論證、推論或替代證明。
- 條目編號依 catalog 順序排列；編號到 377，中間有未使用的號碼。
- 約 42% 的 top-line results 已有 Lean formalization（300 / 719）。

## 領域分佈

把 372 個 families 分成 17 個領域，以下依目錄順序列出。

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

## 更新紀錄

### 2026-10-07

- 撤回 3 份 manuscripts：其中一篇有 sign error，另兩篇依賴它的構造。
- 修訂 14 份 manuscripts：包含 proof repairs、statement 修正與依賴關係的釐清。
- 另有 13 份 manuscripts 更新引用與版本日期，以引用修訂後的相關論文。
- 新增 6 個 formalizations。
- 另新增 5 項支持性結果的形式化材料。

## family

### Theoretical computer science

- #109 Integer multiplication below $n\log n$
  - [preprint](https://github.com/openai/math/tree/main/preprints/Integer-multiplication-below-n-log-n-September-23-2026)
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
