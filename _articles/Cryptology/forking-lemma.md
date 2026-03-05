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

對許多協議（例如 Schnorr 與 GQ），兩份 transcript 可用來抽取 witness（例如離散對數或 RSA 相關秘密）。Forking lemma 用來量化下列事實：若偽造者的成功率為 $\varepsilon$，則透過重跑並在關鍵點改變 challenge 的方式，有可觀的機率同時得到上述兩份 transcript。這種做法本質上依賴 rewinding（或在 ROM 下的 forking），並常導致 reduction 的成功率出現平方等級的衰減，對應到 square-root barrier 的現象。

## 設定：Identification 與 Signature

同一個三回合結構通常對應兩種物件：

- **Identification (ID)**：互動式協議，challenge 由 verifier 隨機給定。
- **Signature (SIG)**：Fiat–Shamir 把 challenge 改為由雜湊決定，典型形式為

$$
\mathsf{ch} := H(m,\mathsf{cmt}),
$$

其中 $H$ 是隨機預言機（ROM）。偽造者 $\mathcal{F}$ 可自適應查詢 $H$ 至多 $q_H$ 次。

## 典型版 Forking Lemma（常用敘述）

令

$$
\varepsilon = \Pr[\mathcal{F}\text{ 產生一份成功偽造}],
$$

且 $\mathcal{F}$ 對 $H$ 的查詢次數至多為 $q_H$。則存在一個 forker（常記為 $\mathcal{A}$），可以透過固定同一份隨機性重跑 $\mathcal{F}$，並在某個關鍵的 $H$ 查詢點改變回覆，使得獲得兩份同一 $\mathsf{cmt}$ 且 challenge 不同的成功 transcript 的機率下界具有下列典型形式：

$$
\Pr[\text{得到兩份同 }\mathsf{cmt}\text{、不同 }\mathsf{ch}\text{ 的成功 transcript}]
\ \gtrsim\
\frac{\varepsilon(\varepsilon - 1/\vert\mathcal{C}\vert)}{q_H},
$$

其中 $\vert\mathcal{C}\vert$ 是 challenge 空間大小。當 $\vert\mathcal{C}\vert$ 足夠大時，$1/\vert\mathcal{C}\vert$ 往往可忽略，常見的簡化表達為

$$
\Omega\!\left(\frac{\varepsilon^2}{q_H}\right).
$$

此型態可視為把「單次成功機率 $\varepsilon$」提升到「兩次成功（可抽取 witness）所需事件」時，成功率出現平方等級衰減的量化描述。

## Forking 程序：概念性的構造

forking 的構造通常可抽象為下列流程：

1. 第一次執行偽造者 $\mathcal{F}$，以表格方式一致地模擬隨機預言機 $H$（同一輸入回同一輸出）。
2. 在 $\mathcal{F}$ 成功偽造的執行軌跡中，識別出決定最終 challenge 的關鍵查詢，典型地對應於 $(m,\mathsf{cmt})$ 的某次 $H$-query。
3. 將執行回復到關鍵查詢之前，使用相同的隨機性重跑 $\mathcal{F}$，但在該關鍵查詢點把 $H(m,\mathsf{cmt})$ 的回覆改為另一個獨立隨機值 $\mathsf{ch}'$。
4. 若第二次仍然成功，且產生相同承諾 $\mathsf{cmt}$，則得到 fork：兩份成功 transcript 共享相同 $\mathsf{cmt}$ 但 challenge 不同。

## 機率計算：平方差從何而來（核心）

設「單次成功」事件為 $S$，且

$$
\Pr[S] = \varepsilon.
$$

抽取 witness 需要「同承諾、不同 challenge 的兩次成功」，可視為一個「雙成功」事件 $F$。在量級上，$F$ 往往接近

$$
\Pr[F] \approx \varepsilon^2,
$$

而在 ROM 的 Fiat–Shamir 情境中，forking lemma 典型給出

$$
\Pr[F] \ \gtrsim\ \Omega\!\left(\frac{\varepsilon^2}{q_H}\right).
$$

因此，若 reduction 以 $F$ 的發生作為解底層困難問題的切入點，常見推導會導出平方根型界：

$$
\varepsilon \ \lesssim\ \sqrt{q_H\cdot \epsilon^{\mathrm{hard}}(t)},
$$

其中 $\epsilon^{\mathrm{hard}}(t)$ 表示 $t$ 時間下解底層困難問題的最佳成功率（例如 Schnorr 對應 DLOG；GQ 對應 RSA inversion）。

## Schnorr：ID 與 SIG 的 square-root gap

### 攻擊基準：generic DLOG 的量級

在群階約為 $p$ 的群中，若用 Generic Group Model（Shoup 的 generic hardness）估計 $t$ 時間內解 DLOG 的成功率，常見量級為

$$
\epsilon^{\mathrm{dl}}(t)\ \approx\ \frac{t^2}{p}.
$$

### Identification（互動式）

使用 rewinding / reset lemma 類分析時，證明常給出平方根型界：

$$
\epsilon^{\mathrm{ID}}(t)\ \lesssim\ \sqrt{\epsilon^{\mathrm{dl}}(t)}.
$$

代入 $\epsilon^{\mathrm{dl}}(t)\approx t^2/p$ 得

$$
\epsilon^{\mathrm{ID}}(t)\ \lesssim\ \frac{t}{\sqrt{p}}.
$$

這與攻擊基準 $t^2/p$ 之間形成 square-root gap。

### Signature（Fiat–Shamir, ROM）

在 ROM 下，Schnorr 簽章的安全歸約通常透過 forking lemma，因此界常呈現

$$
\epsilon^{\mathrm{SIG}}(t)\ \lesssim\ \sqrt{q_H\cdot \epsilon^{\mathrm{dl}}(t)}.
$$

代入 $\epsilon^{\mathrm{dl}}(t)\approx t^2/p$ 得

$$
\epsilon^{\mathrm{SIG}}(t)\ \lesssim\ \sqrt{q_H}\cdot \frac{t}{\sqrt{p}}.
$$

這顯示簽章的界除了平方根損失外，還會額外帶入 $\sqrt{q_H}$。

### 具體數字例子（顯示平方差）

取 $p\approx 2^{256}$，$t=2^{80}$。

攻擊（直接做 DLOG）的成功率量級：

$$
\frac{t^2}{p}\ =\ \frac{2^{160}}{2^{256}}\ =\ 2^{-96}.
$$

ID 的證明界量級：

$$
\frac{t}{\sqrt{p}}\ =\ \frac{2^{80}}{2^{128}}\ =\ 2^{-48}.
$$

兩者相差 $2^{48}$ 倍，對應到典型的 square-root gap。

## GQ：ID 與 SIG 的 square-root gap（RSA 家族）

GQ（Guillou–Quisquater）是 RSA-based 的 $\Sigma$-protocol 家族，與 Schnorr 在結構上相似，差別在底層困難性改為 RSA inversion（或其變形）。以下用同一套符號描述差距。

### 攻擊基準：RSA inversion 的量級

令 $t$ 時間下解 RSA inversion 的最佳成功率量級記為

$$
\epsilon^{\mathrm{rsa}}(t).
$$

將「最佳已知攻擊」視為直接做 RSA inversion，即以 $\epsilon^{\mathrm{rsa}}(t)$ 作為攻擊基準。

### Identification（互動式）

互動式 GQ ID 的證明（採 rewinding / reset 類抽取）通常呈現平方根型界：

$$
\epsilon^{\mathrm{ID}}_{\mathrm{GQ}}(t)\ \lesssim\ \sqrt{\epsilon^{\mathrm{rsa}}(t)}.
$$

因此若攻擊基準是 $\epsilon^{\mathrm{rsa}}(t)$，則證明界在量級上出現平方根落差。

### Signature（Fiat–Shamir, ROM）

Fiat–Shamir 後的 GQ 簽章在 ROM 下常透過 forking lemma 分析，界常呈現

$$
\epsilon^{\mathrm{SIG}}_{\mathrm{GQ}}(t)\ \lesssim\ \sqrt{q_H\cdot \epsilon^{\mathrm{rsa}}(t)}.
$$

同樣地，若以 $\epsilon^{\mathrm{rsa}}(t)$ 作為攻擊基準，則可看出平方根型 tightness 損失，並且另帶 $\sqrt{q_H}$ 因子。

## 小結

Forking lemma 與 rewinding 類技巧把「單次成功」推進到「兩次成功（可抽取 witness）」時，成功率在量級上出現平方（或在反向上界中出現平方根）。因此：

- **ID（Schnorr / GQ）** 的典型界形狀為

$$
\epsilon^{\mathrm{ID}}(t)\ \lesssim\ \sqrt{\epsilon^{\mathrm{hard}}(t)}.
$$

- **SIG（FS in ROM, Schnorr / GQ）** 的典型界形狀為

$$
\epsilon^{\mathrm{SIG}}(t)\ \lesssim\ \sqrt{q_H\cdot \epsilon^{\mathrm{hard}}(t)}.
$$

其中 $\epsilon^{\mathrm{hard}}(t)$ 分別對應到 DLOG 或 RSA inversion 的最佳成功率量級。這些平方根型界與最佳已知攻擊（多為直接解底層困難問題）之間的差距，正是 square-root barrier 討論的核心內容之一。
