---
layout: page
title: Security of RSA
date: 2026-02-11
last_updated: 2026-02-11
tags: []
---

## Semantic Security = Indistinguishability (IND-CPA)

在下列標準設定下，語意安全性與不可區分性是等價的（semantic security is equivalent to IND-CPA indistinguishability）：

- **攻擊者能力**：攻擊者為多項式時間（PPT）的隨機化（probabilistic）演算法。
- **安全衡量**：攻擊者的優勢（advantage）必須是**可忽略的**（negligible）。
- **加密型態**：加密演算法為**機率式/隨機化**（同一明文多次加密可產生不同密文）。
- **攻擊模型**：採用 **CPA** 等級，即 **IND-CPA** 的挑戰遊戲設定。

在這些條件下，兩者可以互相 **reduction**：

- 若攻擊者能從密文中推得明文的某個性質 $f(m)$，且具有非可忽略優勢，則可構造一個 **IND-CPA distinguisher**：選擇兩個只在該性質上不同的候選明文，並藉由對挑戰密文的判斷在遊戲中獲勝。
- 反之，若存在能在 IND-CPA 遊戲中以非可忽略優勢分辨挑戰密文對應 $m_0$ 或 $m_1$ 的 distinguisher，則表示密文洩漏了可用來推斷明文資訊的訊號，從而違反語意安全性。

另外，若攻擊者能力升級到可查詢解密 oracle 的 **CCA2** ，則需改用相對應更強的 **IND-CCA2** 安全定義。

## RSA is not polynomially secure

RSA 的基本加密形式為：給定公開金鑰 $(N,e)$，將明文 $m$ 加密為 $c = m^e \bmod N$。

由於 public key scheme 中加密演算法與公鑰皆為公開資訊，攻擊者可以自行對任意候選明文計算其密文並與攔截到的密文比對。

只要明文空間具有可猜測性（例如二選一指令、固定格式訊息、低熵資料），這種決定式加密就能被有效區分，因而不滿足 semantic security，等價地也不滿足 IND-CPA。

在 PPT 下，它不具備所要求的可忽略安全優勢，因此不是 polynomially secure。

<div class="theorem">

<strong> Lemma. </strong>

RSA is not ploynomially secure.

</div>

<div class="proof">

<strong> Proof. </strong>

假設攻擊者已知使用者只會加密兩個訊息其中之一：$m_1$ 或 $m_2$（例如 buy/sell、yes/no 這類二選一的指令）。
攻擊者知道公開金鑰 $(N,e)$，並且攔截到密文

$$
c \equiv m^e \pmod N
$$

其中 $m \in \{m_1, m_2\}$。攻擊者的目標是判斷 $m$ 到底是 $m_1$ 還是 $m_2$。

由於 RSA 的加密是 deterministic ，攻擊者只要自己計算

$$
c' \equiv m_1^e \pmod N
$$

然後比較 $c'$ 與攔截到的 $c$：

<ul>
<li>若 $c'=c$，則可確定 $m=m_1$。</li>
<li>若 $c'\neq c$，則可確定 $m=m_2$。</li>
</ul>

因此攻擊者可以在多項式時間內（實際上只需要一次 modular exponentiation）分辨明文是哪一個候選訊息，
這表示「裸 RSA」（沒有加入隨機化 padding）不具備基本的語意安全性（semantic security），因此也就不能稱為 polynomially secure。

</div>

## Homomorphic Property

「裸 RSA」因為決定式而無法達到語意安全；然而，即使先不討論隨機化 padding，RSA 的代數結構本身還帶來另一個更關鍵的特徵：同態性（homomorphic property）。

這個性質使得攻擊者能在不知道明文的情況下，對密文進行可預測的代數操作，並讓解密結果以可控制的方式改變。這種「可塑性（malleability）」在更強的攻擊模型（特別是選擇密文攻擊）中往往是致命的切入點。

<div class="definition">

Given the encryption of $m_1$ and $m_2$ we can determine the encryption of $m_1 \cdot m_2$, without knowing $m_1$ or $m_2$.

</div>

對 RSA 而言，同態性直接由下式給出：

$$
(m_1 \cdot m_2)^e \pmod N = (( {m_1}^e \pmod N ) \cdot ( {m_2}^e \pmod N )) \pmod N
$$

## RSA is not CCA2 secure

有了上述同態性，就能理解為何「裸 RSA」在 CCA2 模型下同樣不安全。

在 CCA2 中，攻擊者除了取得目標密文外，還能對任意其他密文呼叫解密 oracle。若加密具備可塑性，攻擊者便能從目標密文構造出「不同但相關」的新密文，透過 oracle 的回覆取得與目標明文成簡單代數關係的值，最後再將其還原成原明文。下面的引理與證明即展示了這個典型攻擊模式，因此可得出「裸 RSA」不具備 IND-CCA2 安全性。

<div class="theorem">

<strong> Lemma. </strong>

RSA is not CCA2 secure.

</div>

<div class="proof">

<strong> Proof. </strong>

假設 Eve

$$
c \equiv m^e \pmod N.
$$

在 CCA2 模型下，Eve 可以呼叫 decryption oracle 解密任意<b>不是原密文</b>的密文。
Eve 利用 RSA 的乘法同態性（multiplicative property），構造一個「相關密文」
$$c' \equiv 2^e \cdot c \pmod N,$$
並詢問 decryption oracle 對 $c'$ 解密，得到回傳的明文 $m'$。

由於 RSA 解密是取 $d$ 次方：
$$
m' \equiv (c')^d \equiv (2^e c)^d \equiv 2^{ed}\, c^d \pmod N.
$$
又因為 $c \equiv m^e \pmod N$，所以
$$c^d \equiv (m^e)^d \equiv m^{ed} \equiv m \pmod N.$$
同時 $ed \equiv 1 \pmod{\varphi(N)}$，因此對於可逆的訊息 $m$（例如 $m\in \mathbb{Z}_N^*$），有 $m^{ed}\equiv m$。

於是
$$m' \equiv 2^{ed}\, m \equiv 2m \pmod N.$$

最後 Eve 只要將 oracle 回傳的結果除以 2（在模 $N$ 下等價於乘上 $2^{-1}$）即可得到原明文：
$$
m \equiv \frac{m'}{2} \pmod N.
$$

因此 Eve 能在擁有 decryption oracle 的情況下恢復 $m$，表示「裸 RSA」（沒有 CCA 安全的 padding，如 OAEP）不是 CCA2 secure。

</div>
