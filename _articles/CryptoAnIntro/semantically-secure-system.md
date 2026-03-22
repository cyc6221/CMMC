---
layout: page
title: Semantically Secure System
date: 2026-03-21
last_updated: 2026-03-22
tags: [Goldwasser-Micali, semantic-security, QUADRES, quadratic-residue, CCA2]
---

RSA 即使在被動攻擊下也不具備 semantic security，因此自然會希望找到一個真正語意安全，且安全性建立在 factoring-like assumption 上的公鑰系統。歷史上第一個達成這個目標的重要例子，就是 **Goldwasser-Micali encryption scheme**。

這個系統雖然不適合實務使用，因為它一次只能加密一個 bit，但它在理論上的地位非常重要：它清楚展示了語意安全可以建立在一個明確的數論困難問題上，也就是 **QUADRES problem**。

## Quadratic Residues and Pseudo-squares

令

$$
Q_N=\{x^2 \pmod N : x \in (\mathbb Z/N\mathbb Z)^\ast\}
$$

表示模 $N$ 下的平方集合，也就是 quadratic residues。

再令

$$
J_N=\left\{a \in (\mathbb Z/N\mathbb Z)^\ast : \left(\frac{a}{N}\right)=1\right\}
$$

表示 Jacobi symbol 等於 $+1$ 的元素集合。

則

$$
J_N \setminus Q_N
$$

中的元素稱為 **pseudo-squares**。它們的 Jacobi symbol 看起來和平方相同，但實際上並不是平方。

若 $N=pq$ 是 RSA-like modulus，則

$$
|J_N|=\frac{(p-1)(q-1)}{2}, \qquad |Q_N|=\frac{(p-1)(q-1)}{4}.
$$

因此，$J_N$ 中大約只有一半元素是真正的平方，另一半則是 pseudo-squares。

## QUADRES Problem

<div class="definition">
<strong>QUADRES problem.</strong>
Given $x \in J_N$, determine whether or not $x \in Q_N$.
</div>

也就是說，當我們拿到一個 Jacobi symbol 為 $+1$ 的元素 $x$ 時，目標是判定它究竟是真正的 quadratic residue，還是只是落在 $J_N \setminus Q_N$ 中的 pseudo-square。  
對不知道 $N$ 因數分解的人來說，這個判定被認為是困難的，而這也正是 Goldwasser-Micali encryption scheme 安全性的基礎。

## Goldwasser-Micali Encryption Scheme

### Key Generation

選擇兩個大質數 $p,q$，令

$$
N=pq.
$$

私鑰為 $(p,q)$。

公開金鑰除了包含 $N$ 之外，還要包含一個元素

$$
y \in J_N \setminus Q_N.
$$

也就是說，$y$ 的 Jacobi symbol 為 $+1$，但它不是平方。

可先選取 $y_p \in \mathbb F_p^\ast$ 與 $y_q \in \mathbb F_q^\ast$，使得

$$
\left(\frac{y_p}{p}\right)=\left(\frac{y_q}{q}\right)=-1,
$$

再利用 Chinese Remainder Theorem 組合成模 $N$ 下的元素 $y$。如此可保證 $y \notin Q_N$，但仍滿足

$$
\left(\frac{y}{N}\right)=1.
$$

### Encryption

Goldwasser-Micali 一次只加密一個 bit $b \in \{0,1\}$。

加密方法為：

1. 隨機選取
   $$
   x \in (\mathbb Z/N\mathbb Z)^\ast.
   $$
2. 計算
   $$
   c=y^b x^2 \pmod N.
   $$

因此：

- 若 $b=0$，則
  $$
  c=x^2 \pmod N,
  $$
  此時 $c \in Q_N$。
- 若 $b=1$，則
  $$
  c=yx^2 \pmod N,
  $$
  此時 $c \in J_N \setminus Q_N$。

所以 ciphertext 所承載的 bit，本質上是藏在「平方」與「pseudo-square」這兩類元素之間。

<div class="remark" style="background:#fff8e1;border-left:4px solid #d4a017;padding:0.8rem 1rem;">
這個系統的效率非常差，因為一個 bit 的 plaintext 需要傳送一個模 $N$ 的元素作為 ciphertext，因此它的重要性主要在理論上，而非實務應用。
</div>

### Decryption

因為解密者知道 $p,q$，所以可以判斷一個 ciphertext 是否為 quadratic residue。

密文一定落在 $J_N$ 中，因此只要檢查它是否屬於 $Q_N$ 即可：

- 若 $c \in Q_N$，則明文 bit 為 $0$；
- 若 $c \notin Q_N$，則明文 bit 為 $1$。

具體上，可以計算 Legendre symbol

$$
\left(\frac{c}{p}\right).
$$

- 若結果為 $+1$，則 $c$ 是平方，故 bit 為 $0$；
- 若結果為 $-1$，則 $c$ 不是平方，故 bit 為 $1$。

## Security Against Passive Adversaries

<div class="theorem">

<strong> Lemma. </strong>

If the QUADRES problem is hard for the modulus $N$ then the above encryption system is polynomially secure against passive adversaries.

</div>

<div class="proof">

<strong> Proof. </strong>

假設存在一個被動攻擊者 $A$，能夠攻擊 Goldwasser-Micali encryption scheme，則我們可以利用它來解 QUADRES problem。

假設現在給定一個

$$
j \in J_N
$$

並要求判定它是否屬於 $Q_N$。

由於此系統只加密 bit，因此在 find stage 中，攻擊者在輸入 public key $(y,N)$ 後，只會輸出兩個訊息

$$
m_0=0,\qquad m_1=1.
$$

接著直接構造 ciphertext

$$
c=j.
$$

此時：

- 若 $j \in Q_N$，則 $c$ 是訊息 $m_0$ 的合法密文；
- 若 $j \notin Q_N$，則 $c$ 是訊息 $m_1$ 的合法密文。

因此，只要把這個 $c$ 丟給攻擊者 $A$，並觀察它判斷 $c$ 對應哪個訊息，就能知道 $j$ 是否屬於 $Q_N$。

也就是說，若存在這樣的攻擊者，我們就能解決 QUADRES problem，與 QUADRES 困難性假設矛盾。因此 Goldwasser-Micali encryption scheme 對 passive adversaries 具有 polynomial security。

</div>

這個證明的重點在於：若有人能分辨加密 $0$ 與加密 $1$ 的密文，就代表他其實能分辨一個元素是 quadratic residue 還是 pseudo-square，而這正是 QUADRES problem 的本質。

## Insecurity Against Adaptive Adversaries

前面的論證只能說明此系統對被動攻擊安全，並不能推出它對 adaptive chosen-ciphertext attack 也安全。事實上，Goldwasser-Micali 並不具備 CCA2 security。

<div class="theorem">

<strong> Lemma. </strong>

The Goldwasser-Micali encryption scheme is insecure against an adaptive chosen ciphertext attack.

</div>

<div class="proof">

<strong> Proof. </strong>

設目標密文為

$$
c=y^b x^2 \pmod N,
$$

攻擊者希望得知其中加密的 bit $b$。

雖然攻擊者不能直接要求 decryption oracle 解密 $c$，但可以要求 oracle 解密任意其他密文。於是攻擊者選擇一個隨機的非零元素 $z$，並構造

$$
c' = c \cdot z^2 \pmod N.
$$

因為 $z^2$ 本身是平方，所以乘上 $z^2$ 並不會改變 $c$ 所對應的 bit。換句話說，$c'$ 仍然是同一個 bit $b$ 的合法加密。

因此，只要把 $c'$ 送去 decryption oracle，oracle 回傳的解密結果就會是 $b$，而這同時也就是目標密文 $c$ 所對應的 bit。

所以 Goldwasser-Micali encryption scheme 無法抵抗 adaptive chosen-ciphertext attack。

</div>

這個攻擊成立的原因在於：此系統的密文結構具有某種可操作性，攻擊者可以將目標密文轉換成另一個不同但等價的密文，然後利用 oracle 間接取得原密文的解密結果。

## Summary

Goldwasser-Micali encryption scheme 是早期最具代表性的 semantically secure public-key encryption scheme 之一。它的核心想法，是利用 quadratic residue 與 pseudo-square 之間的不可區分性來隱藏 bit，並將安全性建立在 QUADRES problem 的困難性上。

在被動攻擊模型下，這個系統具備 polynomial security；但在 adaptive chosen-ciphertext attack 下，它則是不安全的。這也說明了 semantic security 與 CCA2 security 之間仍有明顯差距。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 18. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
