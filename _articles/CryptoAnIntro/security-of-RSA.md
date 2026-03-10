---
layout: page
title: Security of RSA
date: 2026-02-11
last_updated: 2026-03-10
tags: [rsa, semantic-security, ind-cpa, cca2]
---

## Semantic Security and IND-CPA

在 public-key encryption 中，常用的基本安全標準是 **semantic security**，其標準化遊戲版本可表述為 **IND-CPA**。在一般設定下，若加密方案是 randomized，且攻擊者為 **PPT adversary**、優勢要求為 **negligible advantage**，則 semantic security 與 IND-CPA 可視為等價的安全概念。

對 RSA 而言，真正的問題在於「裸 RSA」的加密是 deterministic；因此只要 plaintext space 具有可猜測性，攻擊者便可直接利用 public key 自行加密候選 plaintext 並與目標 ciphertext 比較，從而破壞這個基本安全要求。

<div class="remark" style="border-left:4px solid #0f766e; background:#ecfeff; padding:12px 14px; border-radius:8px; margin:14px 0; line-height:1.7;">
<strong>Remark.</strong>

文獻中常見 <i>textbook RSA</i>、<i>plain RSA</i>、<i>raw RSA</i>、以及中文的「裸 RSA」等說法。這些用語通常都指<b>沒有加入 randomized padding 或 encoding transform 的基本 RSA encryption</b>，也就是直接將 $m$ 映射為 $c = m^e \bmod N$。實務上它們通常可視為同義；若要統一表述，本文以下使用 <b>raw RSA</b>。
</div>

## Raw RSA is not semantically secure

Raw RSA 的基本加密形式為：給定 public key $(N,e)$，將 plaintext $m$ 加密為

$$
c = m^e \bmod N.
$$

由於 public-key encryption 中 encryption algorithm 與 public key 皆為公開資訊，攻擊者可以自行對任意候選 plaintext 計算其 ciphertext，並與攔截到的 ciphertext 比對。

只要 plaintext space 具有可猜測性，例如二選一指令、固定格式訊息、低熵資料，這種 deterministic encryption 就能被有效 distinguish，因而不滿足 semantic security，也等價地不滿足 IND-CPA。

<div class="theorem">

<b>Lemma.</b>

RSA is not polynomially secure.

</div>

<div class="proof">

<b>Proof.</b>

假設攻擊者已知使用者只會加密兩個訊息其中之一：$m_1$ 或 $m_2$。攻擊者知道 public key $(N,e)$，並且攔截到 ciphertext

$$
c \equiv m^e \pmod N
$$

其中 $m \in \{m_1, m_2\}$。攻擊者的目標是判斷 $m$ 到底是 $m_1$ 還是 $m_2$。

由於 RSA encryption 是 deterministic，攻擊者只要自行計算

$$
c_1 \equiv m_1^e \pmod N
$$

然後比較 $c_1$ 與攔截到的 $c$：

<ul>
  <li>若 $c_1 = c$，則可確定 $m = m_1$；</li>
  <li>若 $c_1 \neq c$，則可確定 $m = m_2$。</li>
</ul>

因此攻擊者可以在 polynomial time 內分辨 ciphertext 對應的是哪一個候選 plaintext。這表示 raw RSA 不具備 semantic security；換言之，它無法滿足 IND-CPA 所要求的不可區分性，因此不能視為安全的 public-key encryption scheme。

</div>

## Multiplicative Homomorphism

raw RSA 不僅因為 deterministic 而無法達到 semantic security，它的代數結構本身還具有一個更強的特徵：**multiplicative homomorphism**。

這表示攻擊者即使不知道 plaintext，也能對 ciphertext 做可預測的代數操作，並使解密後的結果以可控制的方式改變。這種性質會導致 **malleability**，而在更強的攻擊模型中，尤其是 **CCA2**，這正是致命弱點的來源。

<div class="definition">

<b>Definition.</b>

Given the encryption of $m_1$ and $m_2$, one can determine the encryption of $m_1 \cdot m_2$, without knowing $m_1$ or $m_2$.

</div>

對 RSA 而言，這個性質直接由下式給出：

$$
(m_1 m_2)^e \bmod N
=
\bigl((m_1^e \bmod N)\cdot(m_2^e \bmod N)\bigr)\bmod N.
$$

也就是說，若

$$
c_1 = m_1^e \bmod N,
\qquad
c_2 = m_2^e \bmod N,
$$

則

$$
c_1 c_2 \bmod N
$$

正是 $m_1 m_2 \bmod N$ 的 encryption。

## Raw RSA is not IND-CCA2 secure

有了上述 multiplicative homomorphism，便能理解為何 raw RSA 在 **CCA2** 模型下同樣不安全。

在 CCA2 中，攻擊者除了取得 target ciphertext 外，還可以查詢 **decryption oracle** 來解密任意其他 ciphertext。雖然攻擊者不能直接送出 challenge ciphertext 本身，但若加密方案具有 malleability，攻擊者就能從 target ciphertext 構造出另一個不同、但與原 plaintext 具有簡單代數關係的相關 ciphertext，並藉由 oracle 的回覆恢復原始 plaintext。

<div class="theorem">

<b>Lemma.</b>

RSA is not CCA2 secure.

</div>

<div class="proof">

<b>Proof.</b>

假設 Eve 攔截到 ciphertext

$$
c \equiv m^e \pmod N,
$$

其中 $m \in \mathbb{Z}_N^*$。

在 CCA2 模型下，Eve 可以呼叫 decryption oracle 解密任意<b>不是原密文</b>的 ciphertext。Eve 利用 RSA 的 multiplicative homomorphism，取一個可逆元素 $r \in \mathbb{Z}_N^*$，例如 $r=2$，構造相關 ciphertext

$$
c' \equiv r^e \cdot c \pmod N.
$$

由於 $c' \neq c$，Eve 可以將 $c'$ 送入 decryption oracle，取得回傳的 plaintext $m'$。

RSA decryption 會計算 $d$ 次方，因此

$$
m' \equiv (c')^d \equiv (r^e c)^d \equiv r^{ed} \cdot c^d \pmod N.
$$

又因為

$$
c \equiv m^e \pmod N,
$$

所以

$$
c^d \equiv (m^e)^d \equiv m^{ed} \pmod N.
$$

由於 $ed \equiv 1 \pmod{\varphi(N)}$，對於 $m,r \in \mathbb{Z}_N^*$ 有

$$
m^{ed} \equiv m \pmod N,
\qquad
r^{ed} \equiv r \pmod N.
$$

因此可得

$$
m' \equiv r m \pmod N.
$$

最後 Eve 只要乘上 $r^{-1} \bmod N$，即可恢復原始 plaintext：

$$
m \equiv r^{-1} m' \pmod N.
$$

所以 Eve 雖然不能直接要求 oracle 解密原始 ciphertext $c$，卻可以透過一個不同但相關的 ciphertext $c'$，有效恢復 $m$。這表示 raw RSA 無法抵抗 chosen-ciphertext attack，因此不是 CCA2 secure。

</div>
