---
layout: page
title: OpenAI Math Announcements
date: 2026-10-22
last_updated: 2026-10-22
---

OpenAI 官方在「AI 做數學」這條線上的主要公告，按時間排列。2026 年 5 月是第一次公開宣布模型解決 open problem，10 月 6 日則集中釋出 `openai/math` 中的全部成果。

<script defer src="{{ '/assets/js/repo-stats.js' | relative_url }}"></script>

## 2026-05-20

**An OpenAI model has disproved a central conjecture in discrete geometry** [原文](https://openai.com/index/model-disproves-discrete-geometry-conjecture/)

OpenAI 首次公開宣布內部模型推翻一個離散幾何的核心猜想：平面上的 unit distance problem。

### 問題

Erdős 在 1946 年提出：平面上 $n$ 個點中，距離恰為 $1$ 的點對最多有幾個？把最大值記為 $u(n)$。方格點構造給出 $u(n)\ge n^{1+c/\log\log n}$，已知最佳上界是 $u(n)=O(n^{4/3})$（Spencer–Szemerédi–Trotter）。長期的看法是方格構造本質上已是最佳，即 $u(n)=n^{1+O(1/\log\log n)}$。

### 公告內容

- 模型給出無窮多組例子，使下界相對 Erdős 的原始下界有 polynomial 量級的改進。這與 $u(n)=n^{1+O(1/\log\log n)}$ 相矛盾，表示方格構造並非最佳。
- 證明由一組外部數學家檢查，他們另外寫了一篇 companion paper 說明論證與意義。
- 證明來自一個新的 general-purpose reasoning model。OpenAI 說明它不是專為數學訓練的模型，沒有針對證明策略搜尋做 scaffolding，也不是針對這個問題設計。

## 2026-07-29

**Accelerating scientific discovery with ChatGPT for Academic Researchers** [原文](https://openai.com/index/chatgpt-for-academic-researchers/)

OpenAI 讓學術研究者使用 frontier models，並指出數學研究已快速成為 AI 的重要應用場景。這篇偏向研究生態與部署，不是單一成果的發布。

### 計畫內容

- 對象是選定學術機構的研究者，涵蓋科學、數學與工程，用途從 grant preparation 到 hypothesis testing。
- 首批 10,000 人，機構包括 Institute for Advanced Study 與 École normale supérieure；計畫在 2027 年前擴大到 100,000 人。
- 起始提供 GPT‑5.6 Sol Pro。每位參與者可以邀請最多四位同機構的合作者。
- 資料預設不用於訓練模型。

### 8 月 10 日更新

新申請者改為進入 waitlist。首輪有超過 13,000 份申請在審核，初始名單以抽籤決定。未被選上的申請者，在秋季重新開放申請時仍可被選入。

## 2026-08-01

**Ten advances in mathematics and theoretical computer science** [原文](https://openai.com/index/ten-advances-in-mathematics/)

openai/ten-proofs <a class="gh-link" href="https://github.com/openai/ten-proofs" target="_blank" rel="noopener noreferrer" aria-label="openai/ten-proofs on GitHub"><svg viewBox="0 0 16 16" class="ico" aria-hidden="true"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>GitHub</a>

{% include math/ai/repo-stats.html repo="openai/ten-proofs" %}

OpenAI 一次公布 10 項數學與理論資工成果，每項都解決或大幅推進一個 long-standing open problem。結果來自 Astra 的一個內部版本，OpenAI 稱 Astra 為 next major model，尚未釋出。這是 10 月 `openai/math` 大規模公開之前的一次集中發布。

### 十項成果

| 領域 | 結果 | Lean 檔案 |
|---|---|---|
| Sphere packing | 高維球填充密度的新上界，達到 Cohn–Elkies threshold | `SpherePacking.lean` |
| Coding theory | Binary codes 在每個最小距離下的上界有指數級改進，spherical codes 有對應的界 | `MetricCodes.lean` |
| Group theory | 構造出 non-sofic group，回答是否每個群都有 finite permutation approximations | `NonSoficGroup.lean` |
| Operator algebras | Connes's rigidity conjecture 的反例：某些群並不由其 group von Neumann algebra 決定 | `ConnesRigidity.lean` |
| Arithmetic circuit complexity | Permanent 在 arithmetic circuits 與 formulas 上的新下界，包括 $n^4/\log n$ 的 formula 下界 | `Permanent.lean` |
| Quantum information | 任意有限兩人量子遊戲的 exponential parallel repetition | `QuantumParallelRepetition.lean` |
| Lattices | Closest vector problem 的 polynomial-factor hardness of approximation | `GapCVP.lean` |
| Convex and lattice geometry | Ehrhart's volume conjecture：質心是唯一內部格點的凸體，其最大體積在每個維度下的 sharp 值 | `EhrhartVolumeInequality.lean` |
| Combinatorics | Multicolor triangle Ramsey numbers 的 superexponential 下界，解決 Erdős problem 183 | `MulticolorTriangleRamsey.lean` |
| Extremal graph theory | Compactness 與 degeneracy 猜想的反例，解決 Erdős problems 146 與 180 | `CompactnessAndDegeneracy.lean` |

### 驗證與成本

- 每項結果都附 Lean 證明，收錄於 `openai/ten-proofs`，每項一個 `.lean` 檔，`lake build All` 可一次編譯全部。
- 另外公布手稿與模型推理過程的敘述。
- 數學論證由模型產生，人類與同一個模型合作，把論證整理成手稿。
- OpenAI 估計，以 Sol API 價格計，找出這十個解的 token 成本約 2,000 美元，不含訓練成本。

## 2026-09-06

**Research acceleration: The view inside OpenAI** [原文](https://openai.com/index/research-acceleration-view-inside-openai/)

OpenAI 說明內部研究如何被 automated AI researcher 與 coding agents 加速。內容不限於數學，但可作為之後數學成果大量出現的背景。

### 目標與進度

- 2025 年秋季，OpenAI 公開的目標是：2026 年 9 月前做出 automated research intern，2028 年 3 月前做出 automated AI researcher。
- Research intern 的定義是：在人類指導下，執行定義明確的研究任務，包括熟練研究者需要數天才能完成的任務。
- 依 OpenAI 的量測，intern 的目標已經達成。研究組織在 8 月中旬，每一個人類工作日對應約 3.1 個 agent 工作日。
- OpenAI 表示正朝 2028 年 3 月的 automated AI researcher 穩定推進。

### 限制

OpenAI 指出，AI 研究是有許多瓶頸的複雜過程，整體進展不一定跟上這些指標。研究優先序、要追哪些想法與結果，以及是否擴大、暫停或部署系統，仍由人決定。

## 2026-09-08

**On the Navier–Stokes Millennium Prize Problem** [原文](https://openai.com/index/navier-stokes-solution/)

OpenAI 宣布內部模型給出一個證明，顯示三維 Navier–Stokes 方程描述的流體運動可以在有限時間內產生 singularity。OpenAI 同時公開證明的 writeup 與 Lean formalization。

### 宣稱的內容

- 初始狀態是靜止的光滑流體，外力為光滑函數，能量有限；解在有限時間內 blow up。
- 這是對全域光滑性的否定，不是證明。OpenAI 說明結果對應 Clay 問題陳述中的 (C)，也對應 (D)。

<div class="remark">
<strong>Remark.</strong>
Clay 的官方問題有四個版本：(A)、(B) 是無外力時，$\mathbb{R}^3$ 與週期情形下光滑解的全域存在性；(C)、(D) 是有外力時，對應情形下解的 breakdown。證明其中任一個即可。有外力的版本屬於問題本身，不是對原問題的弱化。
</div>

<div class="remark">
<strong>Remark.</strong>
Lean 檢查的是形式化之後的陳述。形式化的陳述是否忠實對應 Clay 問題，需要另外對照。
</div>

## 2026-09-21

**Advisory Group on Mathematics and Artificial Intelligence** [原文](https://openai.com/index/advisory-group-on-mathematics-and-ai/)

OpenAI 表示 8 月 28 日開始訓練一個新的內部模型。除了 Navier–Stokes，這個模型已經解決 100 多個 long-standing open problems，涵蓋數學的大多數領域，進展速度連 OpenAI 內部的數學家都感到意外。公告沒有列出問題清單。

### 顧問團體

Advisory Group on Mathematics and Artificial Intelligence 由 Institute for Advanced Study 主辦，有九位成員：

- François Charles（ENS-PSL）
- Camillo De Lellis（IAS、GSSI）
- Timothy Gowers（Collège de France、Cambridge）
- Martin Hairer（EPFL、Imperial College London）
- Nikhil Srivastava（Berkeley、Simons Institute）
- Ulrike Tillmann（Oxford）
- Ravi Vakil（Stanford）
- Edward Witten（IAS）
- Melanie Matchett Wood（Harvard）

### 職責與限制

- 職責是諮詢性質：評估新結果的重要性、就成果如何公開與學術規範提供建議。第一項工作是協助 OpenAI 公開這 100 多項結果。
- 成員不領酬勞，團體獨立於任何 AI 公司運作，對任何 AI 公司都沒有決策權。
- 團體的起點是 OpenAI 接洽部分成員，想成立外部顧問委員會；成員決定改成獨立團體，再邀請其他人加入。
- 團體不負責就 OpenAI 內部數學研究的推進速度提供建議。

這項公告出現在 9 月稍早 25 位 Fields 獎得主聯署公開信之後。公開信的論點是，AI 公司競相解決著名問題，威脅了數學家的智識工作。

## 2026-10-06

**Sharing AI progress in mathematics** [原文](https://openai.com/index/sharing-ai-progress-in-mathematics/)

openai/math <a class="gh-link" href="https://github.com/openai/math" target="_blank" rel="noopener noreferrer" aria-label="openai/math on GitHub"><svg viewBox="0 0 16 16" class="ico" aria-hidden="true"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>GitHub</a>

{% include math/ai/repo-stats.html repo="openai/math" %}

OpenAI 正式大規模釋出 `openai/math`，內容是內部模型產生的數學手稿與支持證明的材料。OpenAI 說明，模型在既有數學評測飽和之後，改在 open research problems 上評測，這些成果即來自這些評測。其中第 109 項的後續整理見 [CrocSwap integer-mult-bounds]({{ '/articles/Math/ai/openai/integer-mult-bounds/' | relative_url }})。

### 釋出內容

- Catalog 共 719 份 manuscripts，分為 372 個 families。一個 family 把相關論文放在一起，可能包含主要結果、輔助論證、推論或替代證明。每個 family 依數學領域分類。
- 目錄有 overview PDF、manuscript map（`CONTENTS.md`）、`preprints/`（PDF、原始檔與引用、編譯說明）、Lean library 與 formalization catalogue，以及更新歷史。
- 授權為 Apache-2.0。

### 驗證狀態

- 約 42% 的 top-line results 已有 Lean formalization，其餘會在取得後陸續補上。
- 沒有 formalization 的結果可能有問題，OpenAI 表示會盡快修正。
- 另提供 Comparator 的檢查說明。

### 產生方式

- 絕大多數結果用同一套流程，由尚未釋出的內部模型產生。平均每項結果使用三小時的 ChatGPT Pro thinking compute。
- 評測期間模型被問了約 4,000 個問題，整理成 families 與 manuscripts，並要求達到一定的重要性，得到上述 catalog。
- 例外是 Riemann zeta function 的 zero-free region，以及 CM abelian varieties 上的 Hodge Conjecture 的證明。其中 $\operatorname{Re}(s)>11/12$ 的 zero-free region 的 writeup 經人工編輯，以提升可讀性。

### Reasoning summaries

另外釋出十個 families 的 abridged reasoning summaries：

| Family | 主題 |
|---|---|
| 007 | Multiplicative functions 的 ordinary two-point correlations |
| 017 | $\pi$ 的 irrationality exponent |
| 087 | Symmetric 與 general Mahler conjectures |
| 102 | 基本 semidefinite threshold 處的 ordinary NP-hardness |
| 159 | Arithmetic progressions 的 quasipolynomial bounds |
| 197 | 特徵 2 下的 Kaplansky direct-finiteness conjecture |
| 221 | Diluted spin glasses 的 Mézard–Parisi formula |
| 271 | Quantum Heisenberg ferromagnet 的 spontaneous magnetization |
| 287 | Free group factors 的 isomorphism |
| 362 | 三維 relativistic Vlasov–Maxwell system |

### 公開方式

- OpenAI 諮詢了 Institute for Advanced Study 的 Advisory Group，以擬定公開這些成果的 best practices。
- 修正與修訂以新版本發布，舊版本保持可取得；每份手稿附 BibTeX。
- 目前以 GitHub repository 發布，同時評估符合顧問團體準則的社群代管方案。
- OpenAI 計畫資助 workshops、conferences 與 special programs，協助理解重大的 AI 成果，並更新未來公開重大科學進展的標準。
- 產生這些成果的模型尚未釋出，OpenAI 表示正在研究如何負責任地釋出。

## References

### OpenAI announcements

- [An OpenAI model has disproved a central conjecture in discrete geometry](https://openai.com/index/model-disproves-discrete-geometry-conjecture/)
- [Accelerating scientific discovery with ChatGPT for Academic Researchers](https://openai.com/index/chatgpt-for-academic-researchers/)
- [Ten advances in mathematics and theoretical computer science](https://openai.com/index/ten-advances-in-mathematics/)
- [Research acceleration: The view inside OpenAI](https://openai.com/index/research-acceleration-view-inside-openai/)
- [On the Navier–Stokes Millennium Prize Problem](https://openai.com/index/navier-stokes-solution/)
- [Advisory Group on Mathematics and Artificial Intelligence](https://openai.com/index/advisory-group-on-mathematics-and-ai/)
- [Sharing AI progress in mathematics](https://openai.com/index/sharing-ai-progress-in-mathematics/)

### Repositories

- [openai/math](https://github.com/openai/math)
- [openai/ten-proofs](https://github.com/openai/ten-proofs)

### Advisory group

- [Advisory Group on Mathematics and Artificial Intelligence](https://agmai.org)
- [OpenAI forms math advisory group as its AI resolves more than 100 open problems](https://techcrunch.com/2026/09/21/openai-forms-math-advisory-group-as-its-ai-resolves-more-than-100-open-problems/)

### Coverage

- [OpenAI Astra: ten open math problems for about $2,000](https://letsdatascience.com/blog/openai-astra-ten-open-math-problems-2000-dollars)
