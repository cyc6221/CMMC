---
layout: page
title: Security of Encryption
date: 2026-02-11
last_updated: 2026-03-01
tags: [security-notions, public-key]
---

這篇筆記整理 **public-key encryption** 的主要安全概念。

內容先簡要區分 **primitive、protocol、system** 三個層次，說明加密方案在整體密碼系統中的位置；接著介紹幾個核心安全定義，包括 **perfect security、semantic security、indistinguishability of encryptions**，以及它們和 **IND-CPA、IND-CCA1、IND-CCA2** 的關係。最後補充 **non-malleability** 與 **plaintext awareness** 這兩個常見但較進階的概念。

## Primitives, Protocols and Systems

### Primitives（密碼學原語）

- 最底層的密碼學「基本構件/運算」，只保證某個局部性質
- e.g. raw RSA `m^e mod N`、模指數 `g^x mod p`、Hash、PRF、Block cipher
- primitive 不等於可直接使用的安全方案。以 raw RSA 為例，它是 deterministic：在相同 public key 下，同一明文永遠對應同一密文，因此無法滿足現代公鑰加密所要求的不可區分性（例如 IND-CPA）。

### Protocols（密碼學協定）

- 把 primitives **組合成一套流程/互動規則**，達成安全目標（機密性、完整性、認證…）
- e.g. RSA-OAEP（隨機 padding 的 RSA 加密方案）、Diffie–Hellman key exchange、Schnorr 簽章流程

### Systems（密碼學系統）

- 把 protocol **工程化落地**成可用產品/平台，包含大量周邊：金鑰管理、RNG、錯誤處理、實作防 side-channel、部署設定、UX
- e.g. TLS/HTTPS、Signal、企業 PKI

### 層級關係

- **Primitive 是磚頭** → **Protocol 是拼法/流程** → **System 是真正蓋好的房子**  
- 安全性不會自動「往上繼承」：primitive 安全 ≠ protocol 安全 ≠ system 安全

## Notions of Security

要想考慮一個 encryption scheme 的安全性，可以先思考三件事：

1. the goal of the adversary 對手的目標
2. the types of attack allowed 允許攻擊的種類
3. the computational model 計算模型

### Perfect Security (information theoretic security)

- 即使對手有**無限計算能力**，拿到密文也**得不到任何明文資訊**，稱作密文對明文「完全不透露」
- **Shannon 定理**：
  - 金鑰長度 = 訊息長度
  - 同一把金鑰不能重複使用（one-time）
- public key encryption scheme 做不到 Perfect Security：因為在 public key model 中，encryption key 通常要用來加密**很多訊息**，而且金鑰通常被設計成**很短/固定大小**，因此無法滿足「金鑰跟訊息一樣長且不能重複用」的必要條件

### Semantic Security

Semantic security（語意安全性）是 public-key encryption 最核心的安全概念之一。其直觀意義是：**給定 ciphertext，不應讓任何多項式時間的攻擊者獲得關於 plaintext 的任何有用資訊。**

更精確地說，看到密文之後，攻擊者對明文所能計算出的任何有效資訊，都不應比「沒有看到密文時」多出可察覺的優勢。

為了抓住這個概念的核心直覺，可以考慮一個簡化版本：將攻擊者想知道的資訊抽象成 plaintext 的一個 1-bit property，也就是一個函數

$$
g:\;M\to\{0,1\},
$$

其中 $M$ 為 message space。設攻擊者為演算法 $S$，它的輸入為 public key $pk$ 與 ciphertext $c$，目標是輸出對 $g(m)$ 的猜測，其中

$$
m=\mathrm{Dec}(sk,c).
$$

若攻擊者看到密文後，能以非忽略優勢預測 $g(m)$，則表示密文洩漏了某種關於明文的資訊。反之，若對所有多項式時間的攻擊者 $S$、所有有效可計算的函數 $g$，攻擊者都無法從密文中得到任何非忽略優勢，則稱此 scheme 為 semantically secure。

因此，semantic security 的核心要求可以理解為：

> ciphertext 不應幫助攻擊者有效地學到任何關於 plaintext 的可用資訊。

### Polynomial Security

由於 semantic security 的原始定義較不易直接操作，因此實務上通常改用一個等價的遊戲式定義來刻畫安全性，也就是 **indistinguishability of encryptions**。有些教材會將這種在多項式時間模型下的不可區分性稱為 **polynomial security**。

其基本遊戲如下：

<div class="remark" style="border-left: 4px solid #2563eb; background: #eff6ff; padding: 12px 14px; border-radius: 8px; margin: 14px 0; line-height: 1.75;">

- **Find 階段**：攻擊者 $A$ 輸出兩個等長明文 $m_0,m_1$。
- **Challenge 階段**：系統隨機選擇一個位元 $b\in\{0,1\}$，並回傳挑戰密文
  $$
  c^*=\mathrm{Enc}(pk,m_b)
  $$
  給攻擊者。
- **Guess 階段**：攻擊者輸出一個猜測位元 $b'$，試圖判斷挑戰密文究竟加密了 $m_0$ 還是 $m_1$。

攻擊者的 advantage 定義為

$$
\operatorname{Adv}_A
=
\left|
\Pr[b'=b]-\tfrac12
\right|.
$$

若對所有多項式時間的攻擊者 $A$，其 advantage 都是 negligible，則稱此 scheme 在此模型下滿足 polynomial security；也就是說，攻擊者**無法有效區分兩個候選明文的加密結果**。

</div>

這個定義直接刻畫了「密文不可區分」的概念，也是現代加密安全定義中最常使用的形式。若再進一步依照攻擊者可使用的 oracle 能力不同，就會得到：

- **IND-CPA**
- **IND-CCA1**
- **IND-CCA2**

等不同強度的安全定義。

此外，這個遊戲也清楚說明：若加密是 deterministic，則攻擊者可以自行計算

$$
\mathrm{Enc}(pk,m_0),\quad \mathrm{Enc}(pk,m_1)
$$

並與挑戰密文比對，從而立即分辨出 $b$。因此，實用的 public-key encryption 必須包含隨機化（randomization），才能達到這類不可區分性安全。

在多項式時間模型下，semantic security 與 indistinguishability of encryptions 是等價的；因此實務上通常先證明 indistinguishability，再由此推出 semantic security。

## Notions of Attacks

討論 public-key encryption 的安全性時，除了要說明「攻擊者想達成什麼目標」，也必須明確描述「攻擊者被允許做什麼」。  
不同的 attack model，對應到不同強度的安全要求；攻擊者能力越強，安全定義也越嚴格。

### Passive Attack / Chosen Plaintext Attack (CPA)

最弱的攻擊模型是 **passive attack**。在此模型中，攻擊者只能觀察通訊中的 ciphertext，而不能要求系統解密任何密文。

在 public-key encryption 中，由於 public key 本來就是公開的，任何人都可以自行加密任意明文。因此，對公鑰加密而言，passive attack 自然對應到 **chosen plaintext attack（CPA）** 的模型：攻擊者可以自由選擇 plaintext，並計算其對應的加密結果，但無法取得任何解密資訊。

- **攻擊者能力**
  - 可觀察通訊中的 ciphertext
  - 可使用 public key 對任意自選明文進行加密
  - 不可使用 decryption oracle

- **安全目標**
  - 即使攻擊者能加密大量自選明文，仍無法有效分辨挑戰密文對應的是哪一個候選明文

這對應到最基本的不可區分性安全定義：**IND-CPA**。

### Chosen Ciphertext Attack (CCA1)

**CCA1** 又稱為 **lunchtime attack**。其直觀情境是：攻擊者在拿到挑戰密文之前，可以暫時存取解密能力；但挑戰一旦發出後，便不能再使用解密 oracle。

- **攻擊者能力**
  - 具備 CPA 模型中的所有能力
  - 在挑戰之前，可以對多項式個自選密文查詢 decryption oracle
  - 挑戰之後，不可再使用 decryption oracle

- **遊戲分段**
  - **Find 階段**：可進行 encryption 與 decryption 查詢
  - **Challenge 階段**：系統回傳挑戰密文
  - **Guess 階段**：攻擊者只能根據先前取得的資訊進行判斷，不可再查詢解密 oracle

- **安全目標**
  - 即使攻擊者在挑戰前已經解密過大量自選密文，仍無法從挑戰密文中獲得足以分辨明文的資訊

這對應到 **IND-CCA1** 安全。

### Adaptive Chosen Ciphertext Attack (CCA2)

**CCA2** 是更強的攻擊模型，也常稱為 **adaptive chosen ciphertext attack**。  
在此模型中，攻擊者不僅可以在挑戰前查詢解密 oracle，也可以在挑戰後持續查詢，並根據先前回覆自適應地決定下一個要送去解密的密文。

唯一的限制是：**攻擊者不能要求解密挑戰密文本身** $c^*$，否則遊戲將被直接破解。

- **攻擊者能力**
  - 具備 CPA 的所有能力
  - 在挑戰前後皆可使用 decryption oracle
  - 可依據 oracle 的回覆動態調整後續查詢
  - 唯一禁止查詢的是挑戰密文 $c^*$ 本身

- **遊戲分段**
  - **Find 階段**：可查詢 decryption oracle
  - **Challenge 階段**：系統回傳挑戰密文 $c^*$
  - **Guess 階段**：仍可繼續查詢 decryption oracle，但不得提交 $c^*$

- **安全目標**
  - 即使攻擊者幾乎可以任意解密其他密文，仍無法有效分辨挑戰密文對應的是哪一個候選明文

這對應到最強、也最常被視為實務標準的不可區分性定義：**IND-CCA2**。

### 強度關係

這三種 attack model 的強度滿足

$$
\text{CPA} \;<\; \text{CCA1} \;<\; \text{CCA2}.
$$

也就是說，攻擊者能力越往右越強，安全要求也越嚴格。  
因此：

- 若一個 scheme 在 **IND-CCA2** 下安全，則它必然也在 **IND-CCA1** 與 **IND-CPA** 下安全
- 反過來則不成立：一個只滿足 IND-CPA 的方案，未必能抵抗 CCA1 或 CCA2 攻擊

在現代 public-key encryption 中，若方案要部署到真實系統，通常至少希望能滿足 **IND-CCA2**，因為實務環境中常出現各種可被利用的解密行為，例如錯誤訊息、協定回應、API 互動或格式檢查結果等。

---

<div class="definition">

<strong> Definition. </strong>

A public key encryption algorithm is said to be secure if it is semantically secure against an adaptive chosen plaintext attack.

</div>

<div class="definition">

<strong> Definition. </strong>

A public key encryption algorithm is said to be secure if it is polynomially secure against an adaptive chosen plaintext attack.

</div>

這兩個概念彼此相關，下面的定理將精確地刻畫它們之間的關係：

<div class="theorem">

<strong> Theorem. </strong>

For a passive adversary, a system which is polynomially secure must necessarily be semantically secure.

</div>

<div class="proof">

<strong> Proof. </strong>

<p>
以下使用 <b>反證法</b>。假設某個公鑰加密方案是 polynomially secure，但不是 semantically secure。
則存在一個多項式時間的攻擊者 $S$，以及某個函數 $g$，使得 $S$ 能從密文中以非忽略優勢預測 $g(m)$。亦即，存在某個多項式 $p(k)$，使得當安全參數 $k$ 夠大時，
</p>

$$
\mathrm{Adv}_S > \frac{1}{p(k)}.
$$

<p>
接著利用此攻擊者 $S$ 構造一個新的攻擊者 $A$，用來破壞 polynomial security。
</p>

<p><b>Step 1: Find 階段</b></p>
<p>
攻擊者 $A$ 選擇兩個訊息 $m_0,m_1$，使得
</p>

$$
g(m_0)\neq g(m_1).
$$

<p>
也就是說，這兩個訊息在函數 $g$ 所描述的性質上有所不同。
</p>

<p><b>Step 2: Challenge 階段</b></p>
<p>
系統隨機選擇一個位元 $b\in\{0,1\}$，並回傳挑戰密文
</p>

$$
c_b=\mathrm{Enc}(pk,m_b).
$$

<p>
攻擊者 $A$ 的目標是判斷此密文對應的是 $m_0$ 還是 $m_1$。
</p>

<p><b>Step 3: Guess 階段</b></p>
<p>
攻擊者 $A$ 將挑戰密文 $c_b$ 與公開資訊交給攻擊者 $S$，令 $S$ 輸出對 $g(m_b)$ 的猜測。
由於 $g(m_0)\neq g(m_1)$，$A$ 可依 $S$ 的輸出判斷應猜測 $b=0$ 或 $b=1$：
若輸出為 $g(m_0)$，則猜 $b=0$；若輸出為 $g(m_1)$，則猜 $b=1$。
</p>

<p>
因此，只要 $S$ 能以非忽略優勢正確預測 $g(m_b)$，$A$ 就能以相同的非忽略優勢正確分辨 $b$。換言之，
</p>

$$
\mathrm{Adv}_A = \mathrm{Adv}_S > \frac{1}{p(k)}.
$$

<p>
這表示 $A$ 能以非忽略優勢破壞 polynomial security，與原先假設矛盾。
因此反設不成立，故 polynomial security 必然推出 semantic security。
</p>

</div>

## Others

### Non-Malleability

Non-malleability 描述加密方案的「不可被可控變形」性質。給定密文

$$
C = Enc(pk,M),
$$

攻擊者在不知道 $M$ 的情況下，無法有效率地構造另一個合法密文 $C' \neq C$ 使得

$$
M' = Dec(sk,C')
$$

與 $M$ 存在攻擊者可預期且可利用的關係（例如翻轉指定位元、對數值做加減乘除、改變特定欄位等）。此處已排除 trivial 的重送（replay）情形。

> An encryption scheme is said to be non-malleable if given a ciphertext $C$, corresponding to an unknown plaintext $M$, it is impossible to determine a valid ciphertext $C'$ on a 'related' message $M'$.

<div class="theorem">

<strong> Lemma. </strong>

A malleable encryption scheme is not secure against an adaptive chosen ciphertext attack.

</div>

<div class="proof">

<strong> Proof. </strong>

挑戰密文為

$$
c_b = Enc(pk,m_b),\quad b\in\{0,1\}.
$$

可塑性保證存在有效率的轉換，使攻擊者可由 $c_b$ 構造

$$
c_b' = f(c_b),\quad c_b' \neq c_b,
$$

並使其解密結果

$$
m_b' = Dec(sk,c_b')
$$

與 $m_b$ 存在已知且可利用的關係，例如

$$
m_b' = g(m_b).
$$

CCA2 允許詢問解密 oracle 於 $c_b'$（因為 $c_b' \neq c_b$），因此攻擊者得到 $m_b'$。攻擊者利用已知關係由 $m_b'$ 推回 $m_b$，或至少可分辨 $b$，從而違反 IND-CCA2 安全性。

</div>

<div class="remark">

<strong> Remark. </strong>

上面的 Lemma 說明：若一個加密方案具有 malleability，則攻擊者可利用對挑戰密文的受控變形，配合 decryption oracle 的查詢能力，間接取得關於挑戰明文的資訊，因此該方案不可能在 adaptive chosen ciphertext attack 下安全。

換言之，在 CCA2 模型下，安全性必須排除這種可被有效利用的 ciphertext transformation。也就是說，若一個方案能達到 IND-CCA2 安全，則它必須具備 non-malleability：

$$
\text{IND-CCA2} \Rightarrow \text{non-malleable}.
$$

更一般地說，indistinguishability 與 non-malleability 之間的關係必須在相同的 attack model 下討論。特別是在 CCA2 模型下，標準結果指出：

$$
\text{NM-CCA2} \iff \text{IND-CCA2}.
$$

因此，在 adaptive chosen ciphertext attack 的情境中，non-malleability 與 indistinguishability 可視為等價的安全要求。

</div>

### Plaintext Awareness

**Plaintext Awareness**（明文感知性）是一種比一般 indistinguishability 更強的安全直覺。它大致表示：若攻擊者能構造出一個**有效密文**，那麼其行為中應已隱含足夠資訊，使得可以從中抽取出對應的明文。這裡的「有效密文」通常指

$$
\mathrm{Dec}(sk,C)\neq \bot.
$$

> A scheme is called plaintext aware if it is computationally difficult to construct a valid ciphertext without being given the corresponding plaintext to start with.

若 $C$ 為一個有效密文，記其對應明文為

$$
M := \mathrm{Dec}(sk,C).
$$

plaintext awareness 的核心意義並不是單純聲稱「攻擊者一定已經明確知道 $M$」，而是說：若攻擊者能輸出一個有效密文 $C$，則通常存在某種有效率的 extractor，可根據攻擊者的運算過程抽取出對應的明文 $M$。因此，攻擊者並不能在完全不了解其內容的情況下，憑空構造出有意義的有效密文。

這個概念在 chosen ciphertext attack 的脈絡中特別重要。於 CCA 模型下，攻擊者試圖透過提交密文給 decryption oracle，從回覆的解密結果中取得額外資訊。若一個加密方案具備 plaintext awareness，則攻擊者若能產生一個會被接受的有效密文，原則上其對應明文應已可由 extractor 自其行為中抽出；因此，decryption oracle 不再提供本質上新的資訊。這也是 plaintext awareness 常被用來支撐 CCA 安全分析的原因。

值得注意的是，plaintext awareness 通常出現在 **Random Oracle Model（ROM）** 下的安全分析中。於此模型中，hash function 被理想化為 random oracle，使得研究者可以更精確地描述攻擊者是否能在不知道明文的情況下構造有效密文。這個概念在某些經典公鑰加密方案的安全證明中，扮演了重要的技術性角色。
