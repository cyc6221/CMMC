---
layout: page
title: Security of Encryption
date: 2026-02-11
last_updated: 2026-02-11
tags: []
---

- Primitives（密碼學原語）
  - 最底層的密碼學「基本構件/運算」，只保證某個局部性質
  - e.g. raw RSA `m^e mod N`、模指數 `g^x mod p`、Hash、PRF、Block cipher
  - primitive ≠ 可直接用的安全方案；例如 **raw RSA 是確定性**，同明文同鑰匙會得到同密文 → 會洩漏資訊

- Protocols（密碼學協定）
  - 把 primitives **組合成一套流程/互動規則**，達成安全目標（機密性、完整性、認證…）
  - e.g. RSA-OAEP（隨機 padding 的 RSA 加密方案）、Diffie–Hellman key exchange、Schnorr 簽章流程

- Systems（密碼學系統）
  - 把 protocol **工程化落地**成可用產品/平台，包含大量周邊：金鑰管理、RNG、錯誤處理、實作防 side-channel、部署設定、UX
  - e.g. TLS/HTTPS、Signal、企業 PKI

- 層級關係
  - **Primitive 是磚頭** → **Protocol 是拼法/流程** → **System 是真正蓋好的房子**  
  - 安全性不會自動「往上繼承」：primitive 安全 ≠ protocol 安全 ≠ system 安全

## Notions of Security

要想考慮一個 encryption scheme 的安全性，可以先思考三件事：

1. the goal of the adversary 對手的目標
2. the types of attack allowed 允許攻擊的種類
3. the computational model 計算模型

### Perfect Security (information theoretic security)

- 即使對手有**無限計算能力**，拿到密文也**得不到任何明文資訊**
  - 密文對明文「完全不透露」
- **Shannon 定理**：
  - 金鑰長度 = 訊息長度
  - 同一把金鑰不能重複使用（one-time）
- public key encryption scheme 做不到 Perfect Security：因為在 public key model 中，encryption key 通常要用來加密**很多訊息**，而且金鑰通常被設計成**很短/固定大小**，因此無法滿足「金鑰跟訊息一樣長且不能重複用」的必要條件

### Semantic Security

### Polynomial Security

## Notions of Attacks

### Passive Attack, aka Chosen Plaintext Attack (CPA)

- **對手能力**：
  - 只能觀察通訊中的密文（eavesdropping）。
  - 可使用加密黑箱（Encryption Oracle）：輸入任意明文 $m$，取得密文 $Enc(pk,m)$。
  - 不能使用解密黑箱（無 Decryption Oracle）。
- 對手可以「**選擇明文**」並取得其加密結果（chosen plaintext）。在 public key 情境下這很自然，因為任何人（包含攻擊者）本來就能用 public key 執行加密。
- **安全目標（直覺）**：即使對手能加密大量自選明文，也**無法分辨**挑戰密文究竟對應哪個明文（**IND-CPA**）。

### Chosen Ciphertext Attack (CCA1)

也稱作 **lunchtime attack**：Eve 可在「挑戰前」的一段時間（好比午餐時間使用者不在）向解密黑箱提交她選擇的密文，取得其解密結果；但在拿到挑戰密文後，就必須在**無法再使用黑箱**的情況下自行分析。

- **對手能力**：
  - 具備 CPA 的能力（可加密）。
  - 另外可在**挑戰之前**使用解密黑箱（Decryption Oracle）。
  - 可要求解密「多項式次」自選密文，但**僅限挑戰前**；拿到挑戰密文後**不可再查詢**。
- **遊戲分段**：
  - **find 階段**：可問解密黑箱。
  - **guess 階段**：不可問解密黑箱。
- **安全目標（直覺）**：即使對手在挑戰前解密了大量密文，仍**無法從挑戰密文取得明文資訊**（**IND-CCA1**）。

### Adaptive Chosen Ciphertext Attack (CCA2)

- **對手能力**：
  - 全程皆可使用**解密黑箱**，且為**適應性**：可依先前查詢/輸出的資訊，動態決定下一個要解密的密文。
  - **唯一禁止**：不能要求黑箱解密**挑戰密文本身** $c^*$（否則遊戲直接被破解）。
- **遊戲分段**：
  - **find 階段**：可問解密黑箱。
  - **guess 階段**：也可問解密黑箱（但不能問 $c^*$）。
- 實務上常見「可誘使系統解密某些密文」的情境（錯誤訊息、API、協定互動等），因此一般認為新的公鑰加密方案應至少達到 **IND-CCA2**。
- **安全目標（直覺）**：就算對手幾乎能任意解密（除了 $c^*$），仍**無法分辨**挑戰密文對應哪個明文（**IND-CCA2**）。

### 強度排序

$$
\text{CPA} \;<\; \text{CCA1} \;<\; \text{CCA2}
$$

越強的攻擊模型代表對手能力越大；能在越強模型下證明安全的方案，通常也更適合部署到真實系統。

---

<div class="definition">

A public key encryption algorithm is said to be secure if it is semantically secure against an adaptive chosen plaintext attack.

</div>

<div class="definition">

A public key encryption algorithm is said to be secure if it is polynomially secure against an adaptive chosen plaintext attack.

</div>

<div class="theorem">

For a passive adversary, a system which is polynomially secure must necessarily be semantically secure.

</div>

## Others

### Non-Malleability

<div class="theorem">

<strong> Lemma. </strong>

A malleable encryption scheme is not secure against an adaptive chosen ciphertext attack.

</div>

### Plaintext Aware
