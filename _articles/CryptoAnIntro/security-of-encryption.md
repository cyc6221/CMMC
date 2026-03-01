---
layout: page
title: Security of Encryption
date: 2026-02-11
last_updated: 2026-03-01
tags: []
---

## Primitives, Protocols and Systems

### Primitives（密碼學原語）

- 最底層的密碼學「基本構件/運算」，只保證某個局部性質
- e.g. raw RSA `m^e mod N`、模指數 `g^x mod p`、Hash、PRF、Block cipher
- primitive ≠ 可直接用的安全方案；例如 **raw RSA 是確定性**，同明文同鑰匙會得到同密文 → 會洩漏資訊

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

### Polynomial Security

## Notions of Attacks

### Passive Attack, aka Chosen Plaintext Attack (CPA)

- **對手能力**：
  - 只能觀察通訊中的密文（eavesdropping）
  - 可使用加密黑箱（Encryption Oracle）：輸入任意明文 $m$，取得密文 $Enc(pk,m)$
  - 不能使用解密黑箱（No Decryption Oracle）
- 對手可以「**選擇明文**」並取得其加密結果（chosen plaintext），在 public key 情境下這很自然，因為任何人（包含攻擊者）本來就能用 public key 執行加密
- **安全目標（直覺）**：即使對手能加密大量自選明文，也**無法分辨**挑戰密文究竟對應哪個明文（**IND-CPA**）

### Chosen Ciphertext Attack (CCA1)

也稱作 **lunchtime attack**：Eve 可在「挑戰前」的一段時間（好比午餐時間使用者不在）向解密黑箱提交她選擇的密文，取得其解密結果；但在拿到挑戰密文後，就必須在**無法再使用黑箱**的情況下自行分析。

- **對手能力**：
  - 具備 CPA 的能力（可加密）
  - 另外可在**挑戰之前**使用解密黑箱（Decryption Oracle）
  - 可要求解密「多項式次」自選密文，但**僅限挑戰前**；拿到挑戰密文後**不可再查詢**
- **遊戲分段**：
  - **find 階段**：可問解密黑箱
  - **guess 階段**：不可問解密黑箱
- **安全目標（直覺）**：即使對手在挑戰前解密了大量密文，仍**無法從挑戰密文取得明文資訊**（**IND-CCA1**）

### Adaptive Chosen Ciphertext Attack (CCA2)

- **對手能力**：
  - 全程皆可使用**解密黑箱**，且為**適應性**：可依先前查詢/輸出的資訊，動態決定下一個要解密的密文
  - **唯一禁止**：不能要求黑箱解密**挑戰密文本身** $c^*$（否則遊戲直接被破解）
- **遊戲分段**：
  - **find 階段**：可問解密黑箱
  - **guess 階段**：也可問解密黑箱（但不能問 $c^*$）
- 實務上常見「可誘使系統解密某些密文」的情境（錯誤訊息、API、協定互動等），因此一般認為新的公鑰加密方案應至少達到 **IND-CCA2**。
- **安全目標（直覺）**：就算對手幾乎能任意解密（除了 $c^*$），仍**無法分辨**挑戰密文對應哪個明文（**IND-CCA2**）

### 強度排序

$$
\text{CPA} \;<\; \text{CCA1} \;<\; \text{CCA2}
$$

越強的攻擊模型代表對手能力越大；能在越強模型下證明安全的方案，通常也更適合部署到真實系統。

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
這個證明使用 <b>反證法</b> 來說明：如果一個公鑰加密方案滿足「多項式安全」（通常可理解為 IND-CPA 那種左/右或 0/1 挑戰遊戲的安全），那它一定也會滿足 <b>語意安全</b>（semantic security）。
</p>

<p><strong>Step 1：反設（假設語意安全不成立）</strong></p>
<p>
假設此加密方案 <b>不是</b> 語意安全。依定義，表示存在一個多項式時間的攻擊者（或演算法） $S$，它能從密文中「預測出明文的某個函數值」 $g(m)$，而且成功優勢不是可忽略的。
形式化寫成：存在某個多項式 $p(k)$，使得當安全參數 $k$ 足夠大時，
</p>

$$
\mathrm{Adv}_S > \frac{1}{p(k)}.
$$

<p>
（這裡的 $\mathrm{Adv}_S$ 表示 $S$ 在語意安全遊戲中相對於隨機猜測的優勢。）
</p>

<p><strong>Step 2：用 $S$ 當作「黑箱」，構造一個新攻擊者 $A$</strong></p>
<p>
我們要構造一個攻擊者 $A$，去攻擊「多項式安全」的挑戰遊戲（也就是典型的：選兩個訊息、拿到其中一個的密文、猜是哪一個）。
$A$ 會把剛才那個破壞語意安全的 $S$ 當作 oracle（黑箱）來用。
</p>

<p><strong>Step 3：Find 階段——挑兩個訊息 $m_0,m_1$</strong></p>
<p>
在多項式安全的遊戲裡，$A$ 必須先輸出兩個訊息 $m_0, m_1$。
我們讓 $A$ 選出兩個使得下式成立的訊息：
</p>

$$
g(m_0) \neq g(m_1).
$$

<p>
直覺上：既然語意安全的定義是「給密文不應該學到任何關於明文的資訊」，那只要 $g(m)$ 是某個要被保護的「明文性質」，我們就挑兩個在這個性質上不同的明文，這樣才能用 $g$ 的值去判斷挑戰到底加密了哪一個。
（原文提到 $g$ 在訊息空間上的輸出是均勻的，所以要找 $g(m_0)\neq g(m_1)$ 很容易。）
</p>

<p><strong>Step 4：挑戰——拿到 $c_b$</strong></p>
<p>
遊戲接著隨機選一個位元 $b\in\{0,1\}$，並回傳挑戰密文：
</p>

$$
c_b = \mathrm{Enc}(pk, m_b).
$$

<p>
攻擊者 $A$ 的任務就是猜出 $b$。
</p>

<p><strong>Step 5：Guess 階段——把 $c_b$ 丟給 $S$ 解「語意題」</strong></p>
<p>
在 guess 階段，$A$ 直接把挑戰密文 $c_b$（以及必要的輔助資訊 $y$，例如公開參數或先前得到的資料）交給 oracle $S$：
</p>

$$
S(c_b, y) \approx g(m_b).
$$

<p>
也就是：$S$ 會輸出它對 $g(m_b)$ 的最佳猜測。
</p>

<p>
接著 $A$ 做一個很直接的比對：
</p>

<ul>
  <li>如果 $S$ 的輸出等於 $g(m_0)$，那 $A$ 就猜 $b=0$。</li>
  <li>如果 $S$ 的輸出等於 $g(m_1)$，那 $A$ 就猜 $b=1$。</li>
</ul>

<p>
因為我們刻意選到 $g(m_0)\neq g(m_1)$，所以這個判斷是有意義的。
</p>

<p><strong>Step 6：成功率與優勢的傳遞</strong></p>
<p>
如果 $S$ 在語意安全遊戲中能以非忽略優勢猜對 $g(m_b)$，那麼 $A$ 在多項式安全遊戲中也能以相同的優勢猜對 $b$。
因此兩者的成功機率（或優勢）會對應起來。
原文用機率式表達這種「成功會一起成功」的關係，結論是：
</p>

$$
\mathrm{Adv}_A = \mathrm{Adv}_S > \frac{1}{p(k)}.
$$

<p>
也就是：只要語意安全能被 $S$ 破壞（有非忽略優勢），我們就能用它做出 $A$ 去破壞多項式安全（同樣有非忽略優勢）。
</p>

<p><strong>Step 7：導出矛盾，完成反證</strong></p>
<p>
但如果方案原本被假設是「多項式安全」，那就不應該存在這樣的 $A$ 能有非忽略優勢破壞它。
因此反設（「不語意安全」）不成立。
</p>

<p>
所以得到結論：<b>多項式安全 $\Rightarrow$ 語意安全</b>。
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

A malleable encryption scheme is not secure against an adaptive chosen plaintext attack.

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

上面 Lemma 等價地給出反向：

$$
\text{IND-CCA2} \Rightarrow \text{non-malleable}
$$

在 CCA2 模型下，若方案允許受控的密文變形，攻擊者可藉由解密 oracle 對變形後密文查詢，間接獲得挑戰明文的資訊，進而破壞不可區分性。

此外，標準結果指出在 CCA2 模型下：

$$
\text{NM-CCA2} \Rightarrow \text{IND-CCA2}
$$

因此兩者在多項式歸約意義下等價：

$$
\text{NM-CCA2} \iff \text{IND-CCA2}
$$

</div>

### Plaintext Aware

**Plaintext Awareness** 是一種很強的安全直覺：對手若未先掌握「對應的明文」，就難以（計算上困難）構造出任何**有效密文**。

這裡的「有效密文」通常指
$$
Dec(sk, C)\neq \bot.
$$

> A scheme is called plaintext aware if it is computationally difficult to construct a valid ciphertext without being given the corresponding plaintext to start with.

#### 核心想法

若 $C$ 為有效密文，令
$$
M := Dec(sk, C).
$$
plaintext awareness 表達：對手能產生有效密文 $C$ 的能力，通常意味著它已經知道對應明文 $M$，或至少存在有效率的方法能從對手的運算軌跡中抽取出該 $M$。

#### 對 CCA 的直覺含意

在 CCA（Chosen Ciphertext Attack）中，對手依賴解密 oracle 的回覆 $Dec(sk, C)$ 來獲取額外資訊。

plaintext aware 的方案使這種利用失效：對手若能提交會被接受的密文 $C$，通常已掌握其解密結果 $M$，因此 oracle 回覆不提供新增資訊。此性質直覺上排除有意義的 CCA 利用。

#### ROM 的定位

plaintext awareness 通常只在 **Random Oracle Model (ROM)** 下被定義與使用，並在相關安全性分析中把雜湊函數視為理想化的 random oracle 來刻畫「能否在不知道明文的情況下構造有效密文」。
