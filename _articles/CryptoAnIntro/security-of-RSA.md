---
layout: page
title: Security of RSA
date: 2026-02-11
last_updated: 2026-02-11
tags: []
---

## RSA

<div class="theorem">

<strong> Lemma. </strong>

RSA is not ploynomiall secure.

</div>

<div class="proof">

假設攻擊者已知使用者只會加密兩個訊息其中之一：$m_1$ 或 $m_2$（例如 buy/sell、yes/no 這類二選一的指令）。
攻擊者知道公開金鑰 $(N,e)$，並且攔截到密文
$$c \equiv m^e \pmod N,$$
其中 $m \in \{m_1, m_2\}$。攻擊者的目標是判斷 $m$ 到底是 $m_1$ 還是 $m_2$。

由於 RSA 的加密是決定性的（deterministic），攻擊者只要自己計算
$$c' \equiv m_1^e \pmod N,$$
然後比較 $c'$ 與攔截到的 $c$：

<ul>
<li>若 $c'=c$，則可確定 $m=m_1$。</li>
<li>若 $c'\neq c$，則可確定 $m=m_2$。</li>
</ul>

因此攻擊者可以在多項式時間內（實際上只需要一次 modular exponentiation）分辨明文是哪一個候選訊息，
這表示「裸 RSA」（沒有加入隨機化 padding）不具備基本的語意安全性（semantic security），因此也就不能稱為 polynomially secure。

</div>

## Homomorphic Property

<div class="definition">

Given the encryption of $m_1$ and $m_2$ we can determine the encryption of $m_1 \cdot m_2$, without knowing $m_1$ or $m_2$.

</div>

<div class="theorem">

<strong> Lemma. </strong>

RSA is not CCA2 secure.

</div>

<div class="proof">

假設 Eve 想破解的密文為
$$c \equiv m^e \pmod N.$$

在 CCA2（adaptive chosen-ciphertext attack）模型下，Eve 可以呼叫 decryption oracle 解密任意<strong>不是原密文</strong>的密文。
Eve 利用 RSA 的乘法同態性（multiplicative property），構造一個「相關密文」
$$c' \equiv 2^e \cdot c \pmod N,$$
並詢問 decryption oracle 對 $c'$ 解密，得到回傳的明文 $m'$。

由於 RSA 解密是取 $d$ 次方：
$$
m' \equiv (c')^d \equiv (2^e c)^d \equiv 2^{ed}\, c^d \pmod N.
$$
又因為 $c \equiv m^e \pmod N$，所以
$$c^d \equiv (m^e)^d \equiv m^{ed} \equiv m \pmod N.$$
同時 $ed \equiv 1 \pmod{\varphi(N)}$，因此對於可逆的訊息 $m$（例如 $m\in \mathbb{Z}_N^\*$），有 $m^{ed}\equiv m$。

於是
$$m' \equiv 2^{ed}\, m \equiv 2m \pmod N.$$

最後 Eve 只要將 oracle 回傳的結果除以 2（在模 $N$ 下等價於乘上 $2^{-1}$）即可得到原明文：
$$
m \equiv \frac{m'}{2} \pmod N.
$$

因此 Eve 能在擁有 decryption oracle 的情況下恢復 $m$，表示「裸 RSA」（沒有 CCA 安全的 padding，如 OAEP）不是 CCA2 secure。

</div>
