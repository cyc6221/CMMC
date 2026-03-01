---
layout: page
title: Security of ElGamal
date: 2026-02-11
last_updated: 2026-02-11
tags: [ElGamal, DDH, IND-CPA, CCA2, malleability]
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

## DDH

The **Decisional Diffie–Hellman (DDH) assumption** in a cyclic group $G=\langle g\rangle$ of order $q$ states that, given $(g^x, g^y, g^z)$ for uniformly random $x,y,z\in \mathbb{Z}_q$, it is computationally infeasible to decide whether

$$
z \equiv xy \pmod q,
$$

i.e., whether $g^z = g^{xy}$, or whether $g^z$ is a random independent group element.

---

<div class="theorem">

<strong> Lemma. </strong>

If DDH is hard in the group $G$ then ElGamal encryption is polynomially secure against a passive adversary.

</div>

---

<div class="theorem">

<strong> Lemma. </strong>

ElGamal ecryption is malleable.

</div>

<div class="proof">

假設 Eve 觀察到一個 ElGamal 密文
$$c=(c_1,c_2)=(g^k,\, m\cdot h^k),$$
其中 $h=g^x$，$x$ 為私鑰，而 $k$ 是一次性的隨機值（ephemeral key）。

Eve 雖然不知道明文 $m$，也不知道 $k$ 或私鑰 $x$，但她仍然可以<strong>直接</strong>構造出一個對應於明文 $2m$ 的有效密文：
$$c'=(c_1,\,2c_2)=(g^k,\,2m\cdot h^k).$$

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

---

ElGamal encryption is not secure under an adaptively chosen plaintext attack.

<div class="theorem">

<strong> Lemma. </strong>

ElGamal ecryption is not CCA2 secure.

</div>

<div class="proof">

假設 Eve 想破解的密文為
$$c=(c_1,c_2)=(g^k,\, m\cdot h^k).$$

在 CCA2（chosen-ciphertext attack）模型下，Eve 可以呼叫 decryption oracle 解密任意「不是原密文」的密文。

因此 Eve 構造一個相關密文
$$c'=(c_1,\,2c_2),$$
並詢問 decryption oracle 對 $c'$ 解密，得到回傳的明文 $m'$。

ElGamal 的解密會計算
$$m'=\frac{2c_2}{(c_1)^x},$$
其中 $x$ 是 secret key，且 $h=g^x$。

代入 $c_1=g^k$ 與 $c_2=m\cdot h^k$：
$$
\frac{m'}{2}
=\frac{2c_2(c_1)^{-x}}{2}
=\frac{2(m\cdot h^k)(g^k)^{-x}}{2}
=\frac{2m\cdot (g^{x})^k\cdot g^{-xk}}{2}
=\frac{2m}{2}
=m.
$$

因此 Eve 只要用 oracle 回傳的 $m'$ 做一次簡單運算（除以 2），就能恢復原始明文 $m$。
這表示 ElGamal 在 CCA2 下不安全。

</div>
