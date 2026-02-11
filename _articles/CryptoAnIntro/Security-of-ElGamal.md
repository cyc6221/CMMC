---
layout: page
title: Security of ElGamal
date: 2026-02-11
last_updated: 2026-02-11
tags: [ElGamal, DDH, IND-CPA, CCA2, malleability]
---

<div class="theorem">

<strong> Lemma. </strong>

If DDH is hard in the group $G$ then ElGamal encryption is polynomially secure against a passive adversary.

</div>

<div class="theorem">

<strong> Lemma. </strong>

ElGamal ecryption is malleable.

</div>

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
