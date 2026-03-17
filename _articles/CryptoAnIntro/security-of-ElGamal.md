---
layout: page
title: Security of ElGamal
date: 2026-02-11
last_updated: 2026-03-16
tags: [ElGamal, DDH, IND-CPA, CCA2, malleability]
---

## DDH

<div class="definition">

<strong>Definition. Decisional Diffie–Hellman Assumption (DDH).</strong>

Let $G = \langle g \rangle$ be a cyclic group of prime order $q$. The DDH assumption states that the distributions

$$
(g^x, g^y, g^{xy}) \quad \text{and} \quad (g^x, g^y, g^z)
$$

are computationally indistinguishable, where $x,y,z$ are chosen uniformly at random from $\mathbb{Z}_q$.

</div>

DDH 是 discrete-log-based cryptography 中最基本的 decisional assumption 之一。它表示 adversary 在看到 $g^x$ 與 $g^y$ 之後，仍無法有效判斷第三個元素究竟是 $g^{xy}$，還是一個獨立隨機的 group element。ElGamal 的 polynomial security 正是建立在此 assumption 上。

## IND-CPA Security

<div class="theorem">

<strong>Lemma.</strong>

If DDH is hard in the group $G$, then ElGamal encryption is polynomially secure against a passive adversary.

</div>

<div class="algorithm">
  <b>Algorithm.</b>
  <ol>
    <li>Input a DDH instance $(g^x,g^y,g^z)$.</li>
    <li>Set the public key to $h=g^x$.</li>
    <li>Run the find stage of adversary $A$ on input $h$, and obtain $(m_0,m_1,s)$.</li>
    <li>Set $c_1=g^y$.</li>
    <li>Choose a random bit $b\in\{0,1\}$.</li>
    <li>Set $c_2=m_b\cdot g^z$.</li>
    <li>Run the guess stage of adversary $A$ on input $(c_1,c_2), h, m_0, m_1, s$, and obtain a bit $b'$.</li>
    <li>If $b=b'$, output <code>DDH</code>; otherwise output <code>random</code>.</li>
  </ol>
</div>

<div class="proof">

<strong>Proof.</strong>

假設存在一個 polynomial-time adversary $A$，可以破壞 ElGamal encryption 的 polynomial security。我們將利用 $A$ 來構造一個演算法，進而解出 DDH problem，與 DDH assumption 矛盾。

給定一組 DDH instance

$$
(g^x,g^y,g^z),
$$

我們先令 public key 為

$$
h=g^x.
$$

接著執行 adversary $A$ 的 find stage，取得兩個 challenge messages $m_0,m_1$ 以及 state information $s$。然後隨機選取一個 bit $b\in\{0,1\}$，並構造 ciphertext

$$
(c_1,c_2)=(g^y,\; m_b\cdot g^z).
$$

再將此 ciphertext 交給 $A$ 的 guess stage。

若 $z=xy$，則

$$
(c_1,c_2)=(g^y,\; m_b g^{xy})
$$

正好是一個合法的 ElGamal encryption，因此 $A$ 若真的能分辨 challenge ciphertext 對應的是 $m_0$ 或 $m_1$，就能以 non-negligible advantage 猜中 $b$。

反之，若 $z$ 是獨立均勻隨機的，則 $g^z$ 並不是正確的 Diffie–Hellman value。此時 $(c_1,c_2)$ 不再是合法的 ElGamal challenge ciphertext，所以 $A$ 的輸出應該與 $b$ 幾乎無關，其成功機率只能接近 $1/2$。

因此，我們可以根據 $A$ 的行為來區分輸入的 $(g^x,g^y,g^z)$ 究竟是真正的 DDH tuple，還是 random tuple。這就得到一個 polynomial-time algorithm 來解 DDH，與 DDH assumption 矛盾。

所以，不存在這樣的 adversary $A$；也就是說，在 DDH assumption 成立時，ElGamal encryption 對 passive adversary 是 polynomially secure 的。

</div>

## Malleability

<div class="theorem">

<strong>Lemma.</strong>

ElGamal encryption is malleable.

</div>

<div class="proof">

<strong>Proof.</strong>

假設 Eve 觀察到一個 ElGamal 密文

$$
c=(c_1,c_2)=(g^k,\, m\cdot h^k),
$$

其中 $h=g^x$，$x$ 為私鑰，而 $k$ 是一次性的隨機值（ephemeral key）。

Eve 雖然不知道明文 $m$，也不知道 $k$ 或私鑰 $x$，但她仍然可以<strong>直接</strong>構造出一個對應於明文 $2m$ 的有效密文：

$$
c'=(c_1,\,2c_2)=(g^k,\,2m\cdot h^k).
$$

檢查解密結果：對 $c'$ 解密會得到

$$
m'=\frac{2c_2}{(c_1)^x}
=\frac{2(m\cdot h^k)}{(g^k)^x}
=\frac{2m\cdot g^{xk}}{g^{xk}}
=2m.
$$

因此，Eve 可以在不知道 $m$ 的情況下，將密文「可控地」轉換為另一個密文，使其解密結果變成 $2m$。
這正是 ElGamal 具有 malleability（可塑性）的意思。

</div>

## CCA2 Insecurity

ElGamal encryption is not secure against an adaptive chosen-ciphertext attack.

此攻擊正是利用 ElGamal 的 malleability。

<div class="theorem">

<strong>Lemma.</strong>

ElGamal encryption is not CCA2 secure.

</div>

<div class="proof">

<strong>Proof.</strong>

假設 Eve 想破解的密文為
$$
c=(c_1,c_2)=(g^k,\; m\cdot h^k).
$$

在 CCA2（chosen-ciphertext attack）模型下，Eve 可以查詢 decryption oracle，要求解密任何一個與原 challenge ciphertext 不同的密文。

因此 Eve 構造一個相關密文
$$
c'=(c_1,\; 2c_2),
$$
並將其送入 decryption oracle，得到回傳的明文 $m'$。

由 ElGamal 的解密公式可得
$$
m'=\frac{2c_2}{(c_1)^x},
$$
其中 $x$ 是 secret key，且 $h=g^x$。將 $c_1=g^k$ 與 $c_2=m\cdot h^k$ 代入，可得
$$
m'
=\frac{2(m\cdot h^k)}{(g^k)^x}
=\frac{2m\cdot (g^x)^k}{g^{kx}}
=2m.
$$

因此 Eve 只要再將 oracle 回傳的 $m'$ 除以 $2$，即可恢復原始明文 $m$。也就是說，Eve 能夠藉由查詢一個與 challenge ciphertext 相關但不同的密文，成功解出 challenge plaintext。

這表示 ElGamal encryption is not secure against an adaptive chosen-ciphertext attack.

</div>

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 18. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
