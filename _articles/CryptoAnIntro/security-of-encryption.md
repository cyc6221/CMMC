---
layout: page
title: Security of Encryption
date: 2026-02-11
last_updated: 2026-03-01
tags: [security-notions, public-key]
---

這篇筆記整理 public-key encryption 的主要安全概念。

內容先簡要區分 primitive、protocol、system 三個層次，說明 encryption scheme 在整體密碼系統中的位置；接著介紹幾個核心安全定義，包括 perfect security、semantic security、indistinguishability of encryptions，以及它們和 IND-CPA、IND-CCA1、IND-CCA2 的關係。最後補充 non-malleability 與 plaintext awareness 這兩個常見但較進階的概念。

## Quick Links

- [Primitives](https://cyc6221.github.io/CMMC/articles/CryptoAnIntro/security-of-encryption/#primitives)
- [Protocols](https://cyc6221.github.io/CMMC/articles/CryptoAnIntro/security-of-encryption/#protocols)
- [Systems](https://cyc6221.github.io/CMMC/articles/CryptoAnIntro/security-of-encryption/#systems)
- [Perfect Security](https://cyc6221.github.io/CMMC/articles/CryptoAnIntro/security-of-encryption/#perfect-security)
- [Semantic Security](https://cyc6221.github.io/CMMC/articles/CryptoAnIntro/security-of-encryption/#semantic-security)
- [Polynomial Security](https://cyc6221.github.io/CMMC/articles/CryptoAnIntro/security-of-encryption/#polynomial-security)
- [Passive Attack / CPA](https://cyc6221.github.io/CMMC/articles/CryptoAnIntro/security-of-encryption/#passive-attack--chosen-plaintext-attack-cpa)
- [CCA1](https://cyc6221.github.io/CMMC/articles/CryptoAnIntro/security-of-encryption/#chosen-ciphertext-attack-cca1)
- [CCA2](https://cyc6221.github.io/CMMC/articles/CryptoAnIntro/security-of-encryption/#adaptive-chosen-ciphertext-attack-cca2)
- [Non-Malleability](https://cyc6221.github.io/CMMC/articles/CryptoAnIntro/security-of-encryption/#non-malleability)
- [Plaintext Awareness](https://cyc6221.github.io/CMMC/articles/CryptoAnIntro/security-of-encryption/#plaintext-awareness)

## Primitives, Protocols and Systems

### Primitives

- 最底層的密碼學基本構件，只保證某個局部性質
- e.g. raw RSA `m^e mod N`、模指數 `g^x mod p`、Hash、PRF、Block cipher
- primitive 不等於可直接使用的安全方案。以 raw RSA 為例，它是 deterministic：在相同 public key 下，同一 plaintext 永遠對應同一 ciphertext，因此無法滿足現代 public-key encryption 所要求的不可區分性（例如 IND-CPA）

### Protocols

- 把 primitives **組合成一套流程或互動規則**，達成安全目標，例如 confidentiality、integrity、authentication
- e.g. RSA-OAEP、Diffie–Hellman key exchange、Schnorr signature

### Systems

- 把 protocol **工程化落地**成可用產品或平台，包含大量周邊要素：key management、RNG、error handling、side-channel 防護、deployment configuration、UX
- e.g. TLS/HTTPS、Signal、企業 PKI

### 層級關係

- **Primitive 是磚頭** → **Protocol 是拼法 / 流程** → **System 是真正蓋好的房子**
- 安全性不會自動往上繼承：primitive 安全 ≠ protocol 安全 ≠ system 安全

## Notions of Security

要考慮一個 encryption scheme 的安全性，可以先思考三件事：

1. the goal of the adversary  
2. the types of attack allowed  
3. the computational model  

### Perfect Security

- 即使 adversary 具有**無限計算能力**，在觀察到 ciphertext 之後也**無法得到任何關於 plaintext 的資訊**；也就是說，ciphertext 對 plaintext 完全不透露任何資訊
- **Shannon theorem** 說明，要達到 perfect security，必須滿足下列條件：
  - key 的長度至少要與 message 的長度相同
  - 同一把 key 不能重複使用（one-time）
- 一般的 public-key encryption scheme 無法達到 perfect security。因為在 public-key model 中，public key 必須能被重複使用來加密**多個 message**，而且 key 通常是**固定大小**，不可能隨每個 message 成長到相同長度，因此無法滿足 Shannon perfect security 所需的條件

### Semantic Security

Semantic security 是 public-key encryption 最核心的安全概念之一。其直觀意義是：**給定 ciphertext，不應讓任何 polynomial-time adversary 獲得關於 plaintext 的任何有用資訊。**

更精確地說，看到 ciphertext 之後，adversary 對 plaintext 所能計算出的任何有效資訊，都不應比「沒有看到 ciphertext 時」多出可察覺的優勢。

為了抓住這個概念的核心直覺，可以考慮一個簡化版本：將 adversary 想知道的資訊抽象成 plaintext 的一個 1-bit property，也就是一個函數

$$
g:\;M\to\{0,1\},
$$

其中 $M$ 為 message space。設 adversary 為演算法 $S$，它的輸入為 public key $pk$ 與 ciphertext $c$，目標是輸出對 $g(m)$ 的猜測，其中

$$
m=\mathrm{Dec}(sk,c).
$$

若 adversary 看到 ciphertext 後，能以 non-negligible advantage 預測 $g(m)$，則表示 ciphertext 洩漏了某種關於 plaintext 的資訊。反之，若對所有 polynomial-time adversary $S$、所有有效可計算的函數 $g$，adversary 都無法從 ciphertext 中得到任何 non-negligible advantage，則稱此 scheme 為 semantically secure。

因此，semantic security 的核心要求可以理解為：

> ciphertext 不應幫助 adversary 有效地學到任何關於 plaintext 的可用資訊。

### Polynomial Security

由於 semantic security 的原始定義較不易直接操作，因此實務上通常改用一個等價的 game-based 定義來刻畫安全性，也就是 **indistinguishability of encryptions**。有些教材會將這種在 polynomial-time model 下的不可區分性稱為 **polynomial security**。

其基本遊戲如下：

<div class="remark" style="border-left: 4px solid #2563eb; background: #eff6ff; padding: 12px 14px; border-radius: 8px; margin: 14px 0; line-height: 1.75;">

<ul>
  <li>
    <b>Find 階段</b>：adversary $A$ 輸出兩個等長 plaintext $m_0,m_1$
  </li>
  
  <li>
    <b>Challenge 階段</b>：系統隨機選擇一個位元 $b\in\{0,1\}$，並回傳挑戰 ciphertext
    $$
    c^*=\mathrm{Enc}(pk,m_b)
    $$
    給 adversary
  </li>
  
  <li>
    <b>Guess 階段</b>：adversary 輸出一個猜測位元 $b'$，試圖判斷挑戰 ciphertext 究竟加密了 $m_0$ 還是 $m_1$ adversary 的 advantage 定義為
    $$
    \operatorname{Adv}_A
    =
    \left|
    \Pr[b'=b]-\tfrac12
    \right|.
    $$

    若對所有 polynomial-time adversary $A$，其 advantage 都是 negligible，則稱此 scheme 在此模型下滿足 polynomial security；也就是說，adversary <b>無法有效區分兩個候選 plaintext 的加密結果</b>。
  </li>
</ul>

</div>

這個定義直接刻畫了 ciphertext 不可區分的概念，也是現代加密安全定義中最常使用的形式。若再進一步依照 adversary 可使用的 oracle 能力不同，就會得到：

- **IND-CPA**
- **IND-CCA1**
- **IND-CCA2**

等不同強度的安全定義。

此外，這個遊戲也清楚說明：若加密是 deterministic，則 adversary 可以自行計算

$$
\mathrm{Enc}(pk,m_0),\quad \mathrm{Enc}(pk,m_1)
$$

並與挑戰 ciphertext 比對，從而立即分辨出 $b$。因此，實用的 public-key encryption 必須包含 randomization，才能達到這類不可區分性安全。

在 polynomial-time model 下，semantic security 與 indistinguishability of encryptions 是等價的；因此實務上通常先證明 indistinguishability，再由此推出 semantic security。

## Notions of Attacks

討論 public-key encryption 的安全性時，除了要說明 adversary 想達成什麼目標，也必須明確描述 adversary 被允許做什麼。不同的 attack model 對應到不同強度的安全要求；adversary 能力越強，安全定義也越嚴格。

### Passive Attack / Chosen Plaintext Attack (CPA)

最弱的 attack model 是 **passive attack**。在此模型中，adversary 只能觀察通訊中的 ciphertext，而不能要求系統解密任何 ciphertext。

在 public-key encryption 中，由於 public key 本來就是公開的，任何人都可以自行加密任意 plaintext。因此，對公鑰加密而言，passive attack 自然對應到 **chosen plaintext attack（CPA）**：adversary 可以自由選擇 plaintext，並計算其對應的加密結果，但無法取得任何解密資訊。

- **adversary 的能力**
  - 可觀察通訊中的 ciphertext
  - 可使用 public key 對任意自選 plaintext 進行加密
  - 不可使用 decryption oracle

- **安全目標**
  - 即使 adversary 能加密大量自選 plaintext，仍無法有效分辨挑戰 ciphertext 對應的是哪一個候選 plaintext

這對應到最基本的不可區分性安全定義：**IND-CPA**。

### Chosen Ciphertext Attack (CCA1)

**CCA1** 又稱為 **lunchtime attack**。其直觀情境是：adversary 在拿到挑戰 ciphertext 之前，可以暫時存取解密能力；但挑戰一旦發出後，便不能再使用 decryption oracle。

- **adversary 的能力**
  - 具備 CPA model 中的所有能力
  - 在挑戰之前，可以對多項式個自選 ciphertext 查詢 decryption oracle
  - 挑戰之後，不可再使用 decryption oracle

- **遊戲分段**
  - **Find 階段**：可進行 encryption 與 decryption 查詢
  - **Challenge 階段**：系統回傳挑戰 ciphertext
  - **Guess 階段**：adversary 只能根據先前取得的資訊進行判斷，不可再查詢 decryption oracle

- **安全目標**
  - 即使 adversary 在挑戰前已經解密過大量自選 ciphertext，仍無法從挑戰 ciphertext 中獲得足以分辨 plaintext 的資訊

這對應到 **IND-CCA1** 安全。

### Adaptive Chosen Ciphertext Attack (CCA2)

**CCA2** 是更強的 attack model，也常稱為 **adaptive chosen ciphertext attack**。在此模型中，adversary 不僅可以在挑戰前查詢 decryption oracle，也可以在挑戰後持續查詢，並根據先前回覆自適應地決定下一個要送去解密的 ciphertext。

唯一的限制是：**adversary 不能要求解密挑戰 ciphertext 本身** $c^*$，否則遊戲將被直接破解。

- **adversary 的能力**
  - 具備 CPA 的所有能力
  - 在挑戰前後皆可使用 decryption oracle
  - 可依據 oracle 的回覆動態調整後續查詢
  - 唯一禁止查詢的是挑戰 ciphertext $c^*$ 本身

- **遊戲分段**
  - **Find 階段**：可查詢 decryption oracle
  - **Challenge 階段**：系統回傳挑戰 ciphertext $c^*$
  - **Guess 階段**：仍可繼續查詢 decryption oracle，但不得提交 $c^*$

- **安全目標**
  - 即使 adversary 幾乎可以任意解密其他 ciphertext，仍無法有效分辨挑戰 ciphertext 對應的是哪一個候選 plaintext

這對應到最強、也最常被視為實務標準的不可區分性定義：**IND-CCA2**。

### 強度關係

這三種 attack model 的強度滿足

$$
\text{CPA} \;<\; \text{CCA1} \;<\; \text{CCA2}.
$$

也就是說，adversary 能力越往右越強，安全要求也越嚴格。因此：

- 若一個 scheme 在 **IND-CCA2** 下安全，則它必然也在 **IND-CCA1** 與 **IND-CPA** 下安全
- 反過來則不成立：一個只滿足 IND-CPA 的方案，未必能抵抗 CCA1 或 CCA2 attack

在現代 public-key encryption 中，若方案要部署到真實系統，通常至少希望能滿足 **IND-CCA2**，因為實務環境中常出現各種可被利用的解密行為，例如 error message、protocol response、API interaction 或 format check result。

---

<div class="definition">

<strong> Definition. </strong>

A public key encryption algorithm is said to be secure if it is semantically secure against an adaptive chosen plaintext attack.

</div>

<div class="definition">

<strong> Definition. </strong>

A public key encryption algorithm is said to be secure if it is polynomially secure against an adaptive chosen plaintext attack.

</div>

這兩個概念彼此相關，下面的定理刻畫其中一個方向的關係：

<div class="theorem">

<strong> Theorem. </strong>

For a passive adversary, a system which is polynomially secure must necessarily be semantically secure.

</div>

<div class="proof">

<strong> Proof. </strong>

<p>
以下使用 <b>反證法</b>。假設某個 public-key encryption scheme 是 polynomially secure，但不是 semantically secure。則存在一個 polynomial-time adversary $S$，以及某個函數 $g$，使得 $S$ 能從 ciphertext 中以 non-negligible advantage 預測 $g(m)$。亦即，存在某個多項式 $p(k)$，使得當 security parameter $k$ 夠大時，
</p>

$$
\mathrm{Adv}_S > \frac{1}{p(k)}.
$$

<p>
接著利用此 adversary $S$ 構造一個新的 adversary $A$，用來破壞 polynomial security。
</p>

<p><b>Step 1 (Find)</b></p>
<p>
adversary $A$ 選擇兩個訊息 $m_0,m_1$，使得
</p>

$$
g(m_0)\neq g(m_1).
$$

<p>
也就是說，這兩個訊息在函數 $g$ 所描述的性質上有所不同。
</p>

<p><b>Step 2 (Challenge)</b></p>
<p>
系統隨機選擇一個位元 $b\in\{0,1\}$，並回傳挑戰 ciphertext
</p>

$$
c_b=\mathrm{Enc}(pk,m_b).
$$

<p>
adversary $A$ 的目標是判斷此 ciphertext 對應的是 $m_0$ 還是 $m_1$。
</p>

<p><b>Step 3 (Guess)</b></p>
<p>
adversary $A$ 將挑戰 ciphertext $c_b$ 與公開資訊交給 adversary $S$，令 $S$ 輸出對 $g(m_b)$ 的猜測。由於 $g(m_0)\neq g(m_1)$，$A$ 可依 $S$ 的輸出判斷應猜測 $b=0$ 或 $b=1$：若輸出為 $g(m_0)$，則猜 $b=0$；若輸出為 $g(m_1)$，則猜 $b=1$。
</p>

<p>
因此，只要 $S$ 能以 non-negligible advantage 正確預測 $g(m_b)$，$A$ 就能以相同的 non-negligible advantage 正確分辨 $b$。換言之，
</p>

$$
\mathrm{Adv}_A = \mathrm{Adv}_S > \frac{1}{p(k)}.
$$

<p>
這表示 $A$ 能以 non-negligible advantage 破壞 polynomial security，與原先假設矛盾。因此反設不成立，故 polynomial security 必然推出 semantic security。
</p>

</div>

## Additional Notions

### Non-Malleability

Non-malleability 描述 encryption scheme 的「不可被可控變形」性質。給定 ciphertext

$$
C = \mathrm{Enc}(pk,M),
$$

adversary 在不知道 $M$ 的情況下，無法有效率地構造另一個合法 ciphertext $C' \neq C$，使得

$$
M' = \mathrm{Dec}(sk,C')
$$

與 $M$ 存在 adversary 可預期且可利用的關係，例如翻轉特定位元、對數值做加減乘除、改變特定欄位等。此處已排除 trivial 的 replay 情形。

> An encryption scheme is said to be non-malleable if given a ciphertext $C$, corresponding to an unknown plaintext $M$, it is impossible to determine a valid ciphertext $C'$ on a related message $M'$.

<div class="theorem">

<strong> Lemma. </strong>

A malleable encryption scheme is not secure against an adaptive chosen ciphertext attack.

</div>

<div class="proof">

<strong> Proof. </strong>

挑戰 ciphertext 為

$$
c_b = \mathrm{Enc}(pk,m_b),\quad b\in\{0,1\}.
$$

malleability 保證存在有效率的轉換，使 adversary 可由 $c_b$ 構造

$$
c_b' = f(c_b),\quad c_b' \neq c_b,
$$

並使其解密結果

$$
m_b' = \mathrm{Dec}(sk,c_b')
$$

與 $m_b$ 存在已知且可利用的關係，例如

$$
m_b' = g(m_b).
$$

CCA2 允許查詢 decryption oracle 於 $c_b'$（因為 $c_b' \neq c_b$），因此 adversary 得到 $m_b'$。接著 adversary 可利用已知關係由 $m_b'$ 推回 $m_b$，或至少可分辨 $b$，從而違反 IND-CCA2 安全性。

</div>

<div class="remark">

<strong> Remark. </strong>

上面的 Lemma 說明：若一個 encryption scheme 具有 malleability，則 adversary 可利用對挑戰 ciphertext 的受控變形，配合 decryption oracle 的查詢能力，間接取得關於挑戰 plaintext 的資訊，因此該方案不可能在 adaptive chosen ciphertext attack 下安全。

換言之，在 CCA2 model 下，安全性必須排除這種可被有效利用的 ciphertext transformation。也就是說，若一個 scheme 能達到 IND-CCA2 安全，則它必須具備 non-malleability：

$$
\text{IND-CCA2} \Rightarrow \text{non-malleable}.
$$

更一般地說，indistinguishability 與 non-malleability 之間的關係必須在相同的 attack model 下討論。特別是在 CCA2 model 下，標準結果指出：

$$
\text{NM-CCA2} \iff \text{IND-CCA2}.
$$

因此，在 adaptive chosen ciphertext attack 的情境中，non-malleability 與 indistinguishability 可視為等價的安全要求。

</div>

### Plaintext Awareness

**Plaintext Awareness** 是一種比一般 indistinguishability 更強的安全直覺。它大致表示：若 adversary 能構造出一個**有效 ciphertext**，那麼其行為中應已隱含足夠資訊，使得可以從中抽取出對應的 plaintext。這裡的有效 ciphertext 通常指

$$
\mathrm{Dec}(sk,C)\neq \bot.
$$

> A scheme is called plaintext aware if it is computationally difficult to construct a valid ciphertext without being given the corresponding plaintext to start with.

若 $C$ 為一個有效 ciphertext，記其對應 plaintext 為

$$
M := \mathrm{Dec}(sk,C).
$$

plaintext awareness 的核心意義並不是單純聲稱 adversary 一定已經明確知道 $M$，而是說：若 adversary 能輸出一個有效 ciphertext $C$，則通常存在某種有效率的 extractor，可根據 adversary 的運算過程抽取出對應的 plaintext $M$。因此，adversary 並不能在完全不了解其內容的情況下，憑空構造出有意義的有效 ciphertext。

這個概念在 chosen ciphertext attack 的脈絡中特別重要。於 CCA model 下，adversary 試圖透過提交 ciphertext 給 decryption oracle，從回覆的解密結果中取得額外資訊。若一個 encryption scheme 具備 plaintext awareness，則 adversary 若能產生一個會被接受的有效 ciphertext，原則上其對應 plaintext 應已可由 extractor 自其行為中抽出；因此，decryption oracle 不再提供本質上新的資訊。這也是 plaintext awareness 常被用來支撐 CCA 安全分析的原因。

plaintext awareness 通常出現在 **Random Oracle Model（ROM）** 下的安全分析中。於此模型中，hash function 被理想化為 random oracle，使得研究者可以更精確地描述 adversary 是否能在不知道 plaintext 的情況下構造有效 ciphertext。這個概念在某些經典 public-key encryption scheme 的安全證明中，扮演了重要的技術性角色。
