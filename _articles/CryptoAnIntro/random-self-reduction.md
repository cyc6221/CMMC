---
layout: page
title: Random Self-Reduction
date: 2026-03-25
last_updated: 2026-03-25
tags: [RSA, DDH, random-self-reduction, average-case-hardness]
---

在密碼學中，一個問題若只在最壞情況下困難，通常還不足以作為安全性的基礎。原因是密碼系統實際面對的是一般分佈下出現的 instance，而不是刻意挑選出的極端例子。若某個問題僅對少數特殊 instance 困難，但在平均情況下其實容易，則它便不適合作為密碼假設。

**Random self-reduction** 所描述的，正是把任意 **給定的 instance** 轉換為同一問題的一個 **隨機 instance**，並保留原問題答案的方法。若能在平均情況下解決該問題，也就能解決任意指定的 instance。

對 fixed-modulus RSA problem 與 fixed-group DDH problem 而言，兩者都存在這樣的性質，因此它們的 average-case hardness 與 worst-case hardness 並不是彼此分離的。

## RSA is Random Self-Reducible

對 RSA 而言，核心想法很直接。假設我們面對的 instance 是

$$
c = m^e \pmod N.
$$

若這個 instance 看起來很特殊、很困難，我們可以隨機選取一個可逆元素 $s$，並把密文改寫成

$$
c' = s^e c \pmod N.
$$

新的 instance 對應到明文 $m' = sm$。

由於 $s$ 是均勻隨機選取的，因此 $m'$ 也會像隨機元素一樣分佈。於是，原本任意給定的 instance 就被轉換成了一個平均意義下的隨機 RSA instance。若能解出這個新 instance，就能再反推出原本的 $m$。

<div class="lemma">
<strong>Lemma.</strong>
RSA problem is random self-reducible.
</div>

<div class="proof">
<strong>Proof.</strong>

Suppose we are given

$$
c = m^e \pmod N.
$$

Choose

$$
s \in (\mathbb Z/N\mathbb Z)^\ast
$$

uniformly at random, and define

$$
c' = s^e c \pmod N.
$$

Then

$$
c' = s^e m^e = (sm)^e \pmod N.
$$

Let

$$
m' = sm \pmod N.
$$

Then

$$
c' = {m'}^e \pmod N.
$$

Thus $c'$ is again an RSA instance of the same form.

If one can recover $m'$ from $c'$, then one can compute

$$
m = m' s^{-1} \pmod N.
$$

Therefore, solving a random RSA instance suffices to solve any given RSA instance. Hence the RSA problem is random self-reducible. ∎
</div>

## DDH is Random Self-Reducible

對 DDH 而言，目標是判斷一個 triple

$$
(x,y,z) = (g^a,g^b,g^c)
$$

是否滿足 $c=ab$，也就是是否為合法的 Diffie–Hellman triple。這裡的 random self-reduction 不是去恢復某個秘密，而是把原本的 triple 隨機變換成另一個 triple，同時保留「是否為合法 DH triple」這件事。

做法是隨機選取一些參數，把原本的三個分量重新組合，得到新的 triple $(x',y',z')$。若原本是合法的 DH triple，轉換後仍然合法；若原本不是，轉換後也仍然不是。更重要的是，這個變換會把 instance 洗成平均意義下的隨機分佈。因此，只要能在平均情況下判定 DDH，就能判定任意給定的 DDH instance。

<div class="lemma">
<strong>Lemma.</strong>
DDH problem is random self-reducible.
</div>

<div class="proof">
<strong>Proof.</strong>

Consider

$$
(x,y,z) = (g^a,g^b,g^c).
$$

Choose random $u_1,u_2,v$, and define

$$
(x',y',z')
=
(g^{a_1},g^{b_1},g^{c_1})
=
\bigl(x^v g^{u_1},\; y g^{u_2},\; z^v y^{u_1} x^{vu_2} g^{u_1u_2}\bigr).
$$

From the first two components,

$$
x' = x^v g^{u_1} = g^{av+u_1},
\qquad
y' = y g^{u_2} = g^{b+u_2}.
$$

Hence define

$$
a_1 = av+u_1,
\qquad
b_1 = b+u_2.
$$

If $(x,y,z)$ is a valid Diffie–Hellman triple, then $z=g^{ab}$, and so

$$
z'
= z^v y^{u_1} x^{vu_2} g^{u_1u_2}
= g^{abv} g^{bu_1} g^{avu_2} g^{u_1u_2}
= g^{(av+u_1)(b+u_2)}.
$$

Therefore,

$$
z' = g^{a_1b_1},
$$

so $(x',y',z')$ is again a valid Diffie–Hellman triple.

Thus the transformation preserves whether the given triple is Diffie–Hellman, while randomizing the instance. Therefore, solving random DDH instances suffices to solve arbitrary DDH instances. Hence the DDH problem is random self-reducible. ∎
</div>

---

<div class="remark">
<strong>Remark.</strong>
Random self-reduction shows that, for problems such as RSA and DDH, hardness is not confined to a small collection of specially chosen instances. Instead, an algorithm that succeeds on random instances can be used to solve arbitrary instances as well.

對 RSA problem 與 DDH problem 而言，這表示其困難性並不是來自少數特殊的 worst-case instances，而是能夠透過隨機自我化約延伸到一般情況下的 instances。換言之，若隨機 instance 可解，則任意 instance 亦可解。
</div>

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 19. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
