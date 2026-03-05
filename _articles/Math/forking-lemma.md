---
layout: page
title: Forking Lemma
date: 2026-03-05
last_updated: 2026-03-05
tags: [square-root-barrier]
---

## 直覺：為何稱為 “forking”

在 Fiat–Shamir（FS）或以 $\Sigma$-protocol 為基礎的三回合結構中，攻擊者若能產生一份可驗證的 transcript

$$
(\mathsf{cmt},\mathsf{ch},\mathsf{rsp}),
$$

則常見的 reduction 目標是取得同一個承諾 $\mathsf{cmt}$ 下，對兩個不同 challenge 的成功回應：

$$
(\mathsf{cmt},\mathsf{ch}_1,\mathsf{rsp}_1),\quad (\mathsf{cmt},\mathsf{ch}_2,\mathsf{rsp}_2),\ \ \mathsf{ch}_1\neq \mathsf{ch}_2.
$$

對許多協議（例如 Schnorr），兩份 transcript 可用來抽取 witness（例如離散對數或私鑰）。

Forking lemma 用來量化下列事實：若偽造者的成功率為 $\varepsilon$，則透過重跑並在關鍵點改變 challenge 的方式，有可觀的機率同時得到上述兩份 transcript。這通常導致 reduction 的成功率出現平方等級的衰減（或等價地造成平方根損失），並與 square-root barrier 的現象相呼應。

## 設定：Fiat–Shamir 與隨機預言機

考慮由三回合協議經 Fiat–Shamir 轉換得到的簽章（或識別），其中 challenge 由隨機預言機 $H$ 決定：

$$
\mathsf{ch} := H(m,\mathsf{cmt}).
$$

偽造者 $\mathcal{F}$ 可自適應查詢 $H$ 至多 $q_H$ 次，最後輸出一份可驗證的偽造（等價於輸出可驗證 transcript）。

## 典型版 Forking Lemma（常用敘述）

令

$$
\varepsilon = \Pr[\mathcal{F}\text{ 產生一份成功偽造}],
$$

且 $\mathcal{F}$ 對 $H$ 的查詢次數至多為 $q_H$。則存在一個 forker（常記為 $\mathcal{A}$），可以透過固定同一份隨機性重跑 $\mathcal{F}$，並在某個關鍵的 $H$ 查詢點改變回覆，使得獲得兩份同一 $\mathsf{cmt}$ 且 challenge 不同的成功 transcript 的機率下界具有下列典型形式：

$$
\Pr[\text{得到兩份同 }\mathsf{cmt}\text{、不同 }\mathsf{ch}\text{ 的成功 transcript}]
\ \gtrsim\
\frac{\varepsilon(\varepsilon - 1/ \vert \mathcal{C} \vert)}{q_H},
$$

其中 $\vert \mathcal{C} \vert$ 是 challenge 空間大小。當 $\vert \mathcal{C} \vert$ 足夠大時，$1/ \vert \mathcal{C} \vert$ 往往可忽略，常見的簡化表達為

$$
\Omega\!\left(\frac{\varepsilon^2}{q_H}\right).
$$

此型態表達了從單次偽造成功提升到能抽取 witness 所需的兩次成功時，成功率通常會出現平方等級的衰減。

## Forking 程序：概念性的構造

forking 的構造通常可抽象為下列流程：

1. 第一次執行偽造者 $\mathcal{F}$，以表格方式一致地模擬隨機預言機 $H$（同一輸入回同一輸出）。
2. 在 $\mathcal{F}$ 產生成功偽造的執行軌跡中，識別出決定最終 challenge 的關鍵查詢，典型地對應於 $(m,\mathsf{cmt})$ 的某次 $H$-query。
3. 將執行回復到關鍵查詢之前，使用相同的隨機性重跑 $\mathcal{F}$，但在該關鍵查詢點把 $H(m,\mathsf{cmt})$ 的回覆改為另一個獨立隨機值 $\mathsf{ch}'$。
4. 若第二次仍然成功，且產生相同承諾 $\mathsf{cmt}$，則得到 fork：兩份成功 transcript 共享相同 $\mathsf{cmt}$ 但 challenge 不同。

## 與 square-root barrier 的關係

在許多 FS 類 reduction 中，抽取 witness 需要兩份不同 challenge 的成功 transcript。若由 forking lemma 得到的成功機率約為 $\Omega(\varepsilon^2/q_H)$，則在把 reduction 改寫為偽造成功率的上界時，常導出平方根形狀的 tightness 損失。例如在忽略常數與低階項時，常見推導會呈現為

$$
\varepsilon \ \lesssim\ \sqrt{q_H\cdot \mathrm{Adv}_{\text{hard}}},
$$

其中 $\mathrm{Adv}_{\text{hard}}$ 是解底層困難問題（如 DLOG 或 RSA 相關問題）的優勢。此平方根形式反映了 reduction 相對於真實攻擊的鬆弛程度，並構成 square-root barrier 討論中的核心現象之一。

## 與 Schnorr 與 GQ 類協議的對齊方式

對 Schnorr（DLOG-based）與 GQ（RSA-based）等三回合結構，安全證明中的抽取器通常需要同承諾、不同 challenge 的兩份 transcript。ROM 下常以 forking lemma 形式化此抽取過程；標準模型下則常見使用 rewinding 相關技巧。兩者在機率界的形狀上往往呈現類似的平方根損失結構。

## 小結

Forking lemma 提供一種典型的機率分析：當偽造者對 FS 轉換後的協議具有成功率 $\varepsilon$，透過重跑與在關鍵隨機預言機回覆點分叉，可在約 $\Omega(\varepsilon^2/q_H)$ 的機率下得到兩份同承諾、不同 challenge 的成功 transcript，從而支援 witness 抽取；而這種平方型成功率衰減，對應到多數 FS 類 reduction 的平方根 tightness 損失現象。
