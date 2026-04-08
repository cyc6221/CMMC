---
layout: page
title: Random Oracle Model
date: 2026-03-07
last_updated: 2026-04-08
tags: [square-root-barrier]
---

Random Oracle Model（ROM, 隨機預言機模型）是密碼學中常用的一種**理想化安全模型**。在這個模型裡，雜湊函數 $H$ 不被看成某個具體可實作的演算法（例如 SHA-256），而是被抽象成一個**真正隨機且一致的 oracle**：對每個新的輸入，它會回傳均勻隨機的輸出；而對同一輸入的重複查詢，則永遠回傳相同結果。

ROM 常用來分析密碼學協議的安全性，特別是在 **Fiat–Shamir transformation**、數位簽章、公開金鑰加密等情境中。它的重要性不在於描述真實世界中的 hash function，而在於提供一個可操作的理論框架，使許多原本難以處理的安全證明得以建立。

## Definition

在 Random Oracle Model 中，存在一個公開可查詢的 oracle $H$，所有參與者，包括誠實方與 adversary，都可以對其查詢。此 oracle 具有以下性質：

1. **隨機性（randomness）**：對於每個從未查詢過的新輸入 $x$，$H(x)$ 會從輸出空間中均勻隨機選出。
2. **一致性（consistency）**：若某輸入 $x$ 已經被查詢過，則往後每次查詢 $H(x)$ 都會得到完全相同的輸出。
3. **公開可查詢（public access）**：所有演算法都可以查詢此 oracle，包括誠實參與者與 adversary。

因此，ROM 中的 hash function 不是一個具體函數，而是一個理想化的數學物件。安全證明中的重點，是研究協議在這種「理想雜湊」環境下是否成立。

## Role of the Model

在許多協議中，hash function 並不只是單純用來壓縮資料，而是直接參與安全機制，例如：

- 將互動式協議中的 challenge 非互動化
- 將 message 與 commitment 綁定
- 產生不可預測的挑戰值
- 模擬理想的隨機性來源

這些用途使得 hash function 在安全性分析中扮演接近「隨機挑戰產生器」的角色。然而，在標準模型（standard model）裡，hash function 是一個固定且可描述的函數，直接證明其具有這種理想效果通常相當困難。ROM 的做法就是暫時把它提升成理想 oracle，藉此將分析焦點集中在協議結構本身。

因此，ROM 最核心的功能之一，是支撐從互動式協議到非互動式協議的安全分析，特別是 Fiat–Shamir transformation 中由 verifier 隨機給出的 challenge 被替換為公開可計算的 hash 值這件事。

## Typical Applications

ROM 最經典的應用之一，是分析由互動式識別協議經 Fiat–Shamir transformation 所得到的非互動式簽章方案，例如：

- **Fiat–Shamir transformation**
- **Schnorr signature**
- **GQ signature**
- **RSA-OAEP**（其安全分析也常與 random oracle 技術密切相關）

在這些情境中，原本由 verifier 隨機選出的 challenge，會被替換成某個 hash 值，例如
$$
c = H(m,R).
$$

若將 $H$ 視為 random oracle，則這個值就可以被理解成「可公開計算、但對攻擊者而言仍具有理想隨機性」的 challenge。這正是許多 ROM 安全證明成立的基礎。

## Advantages and Limitations

### Advantages

Random Oracle Model 的主要優點包括：

1. **簡化安全分析**：許多原本難以處理的非互動協議，在 ROM 下可以得到較乾淨的安全證明。
2. **適合分析 Fiat–Shamir 類轉換**：因為 hash 可被視為隨機 challenge 的替代品。
3. **對實務設計影響深遠**：許多重要協議的安全性分析最初都是在 ROM 下建立。

### Limitations

但 ROM 也有明確限制：

1. **真實世界不存在真正的 random oracle**：實際系統使用的是具體 hash function，如 SHA-256、SHA-3。
2. **ROM 安全不自動推出實作安全**：一個方案在 ROM 下安全，並不代表把 oracle 換成真實 hash function 後仍然安全。
3. **ROM 與 standard model 不同**：ROM 的安全性帶有理想化假設，standard model 的安全性則更接近現實，也通常更難證明。

因此，ROM 應被理解為一種強而有力的分析工具，而不是對真實系統的無條件保證。閱讀安全證明時，必須清楚分辨「在 ROM 下成立」與「在標準模型下成立」是不同層次的結論。

## Schnorr Scheme

### Schnorr Identification

Schnorr identification protocol 是一個三回合互動式協議。設 prover 的秘密為 $x$，公開值為
$$
y = g^x.
$$

協議流程如下：

1. Prover 選擇隨機數 $r$，計算
   $$
   R = g^r
   $$
   並將 $R$ 傳送給 verifier。
2. Verifier 隨機選擇 challenge $c$。
3. Prover 回覆
   $$
   s = r + cx.
   $$
4. Verifier 檢查
   $$
   g^s = R \cdot y^c.
   $$

這裡的關鍵是 challenge $c$ 原本由 verifier 隨機產生，因此互動式安全性建立在真實隨機挑戰之上。

### Schnorr Signature

Schnorr signature 可視為對上述 identification protocol 套用 Fiat–Shamir transformation 的結果。其做法是用 hash function 取代 verifier 的隨機 challenge：

1. 選擇隨機數 $r$，計算
   $$
   R = g^r.
   $$
2. 計算
   $$
   c = H(m,R),
   $$
   其中 $m$ 為欲簽署的訊息。
3. 計算
   $$
   s = r + cx.
   $$
4. 輸出簽章
   $$
   (R,s).
   $$

驗證者重新計算
$$
c = H(m,R)
$$
並檢查
$$
g^s = R \cdot y^c.
$$

這裡的 ROM 假設使 $H(m,R)$ 可以扮演原本互動式協議中隨機 challenge 的角色。也就是說，ROM 提供了一個理想化框架，讓非互動簽章的安全分析能夠沿著互動式協議的結構進行。

## GQ Scheme

### GQ Identification

GQ（Guillou–Quisquater）identification protocol 是一個基於 RSA 結構的互動式識別協議。設公開參數為 $(N,e)$，並設公開值與秘密滿足某個 RSA 型關係。其典型流程可寫成：

1. Prover 選擇隨機數 $r$，計算
   $$
   R = r^e \bmod N
   $$
   並送給 verifier。
2. Verifier 隨機選擇 challenge $c$。
3. Prover 回覆
   $$
   s = r \cdot x^c \bmod N,
   $$
   其中 $x$ 為秘密。
4. Verifier 驗證
   $$
   s^e \equiv R \cdot y^c \pmod N.
   $$

與 Schnorr identification 相同，這裡的 challenge $c$ 也是由 verifier 隨機給出。

### GQ Signature

將 GQ identification 經 Fiat–Shamir transformation 非互動化後，可得到 GQ signature。其核心步驟為：

1. 計算
   $$
   R = r^e \bmod N.
   $$
2. 計算
   $$
   c = H(m,R).
   $$
3. 計算
   $$
   s = r \cdot x^c \bmod N.
   $$
4. 輸出簽章
   $$
   (R,s).
   $$

驗證時，重新計算 $c = H(m,R)$，並檢查
$$
s^e \equiv R \cdot y^c \pmod N.
$$

在這裡，ROM 的角色與 Schnorr 的情形相同：它使 $H(m,R)$ 可以被視為理想隨機 challenge，從而把原本互動式協議中的安全結構轉移到非互動簽章中。

整體來看，Schnorr 與 GQ 都呈現了同一個核心現象：ROM 的重要用途，不只是把 hash function 假設得很強，而是把 verifier 原本提供的隨機挑戰，替換成一個公開可計算、但在分析中仍可視為理想隨機的值，藉此支撐 Fiat–Shamir transformation 的安全證明。
