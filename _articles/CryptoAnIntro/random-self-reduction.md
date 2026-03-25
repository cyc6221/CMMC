---
layout: page
title: Random Self-Reduction
date: 2026-03-25
last_updated: 2026-03-25
tags: [RSA, DDH, random-self-reduction, average-case-hardness]
---

在複雜度理論與密碼學中，一個自然的疑問是：某個問題若在最壞情況下很難，是否代表它在平均情況下也同樣困難？這個問題之所以重要，是因為密碼系統所面對的並不是某些特別挑選出的極端實例，而是一般分佈下出現的 instance。若一個問題只是 **worst-case hard**，但在 **average case** 下其實容易，那麼它就不適合作為密碼安全性的基礎。原文指出，對固定模數下的 RSA problem，以及固定群上的 DDH problem，可以利用 **random self-reduction** 把任意給定的 instance 轉換為隨機 instance；因此，只要平均情況可解，最壞情況也就可解，兩者的困難性必須相當接近。:contentReference[oaicite:1]{index=1}

## RSA is Random Self-Reducible

<div class="lemma">
<strong>Lemma.</strong>
The RSA problem is random self-reducible.
</div>

<div class="proof">
<strong>Proof.</strong>

Suppose we are given $c$ and are asked to solve

$$
c = m^e \pmod N,
$$

where the idea is that this is a “hard” problem instance. We reduce this to an “average” problem instance by choosing

$$
s \in (\mathbb Z/N\mathbb Z)^\ast
$$

at random and setting

$$
c' = s^e c \pmod N.
$$

We then try to solve

$$
c' = {m'}^e \pmod N.
$$

The key observation is that since

$$
c = m^e \pmod N,
$$

we have

$$
c' = s^e m^e = (sm)^e \pmod N.
$$

Hence, if we define

$$
m' = sm \pmod N,
$$

then $c'$ is again an RSA instance of exactly the same form, but now associated to the randomized message $m'$.

由於 $s$ 是從 $(\mathbb Z/N\mathbb Z)^\ast$ 中均勻隨機選取的，而乘上固定的可逆元素會在此集合上保留均勻分佈，因此 $m' = sm$ 會像一個隨機元素一樣分佈。換句話說，原本可能是某個特殊且困難的 instance $c=m^e$，經過乘上隨機的 $s^e$ 之後，就被轉成了一個「平均情況下的 RSA instance」。

若我們有一個演算法能夠在平均情況下解 RSA，也就是能從

$$
c' = {m'}^e \pmod N
$$

恢復出 $m'$，那麼便可進一步計算

$$
m = m' s^{-1} \pmod N,
$$

也就是原文所寫的

$$
m = \frac{m'}{s}.
$$

因此，只要 RSA 在平均情況下容易求解，就可以藉由這個隨機化步驟解出任意給定的 RSA instance。這說明 RSA problem 的 worst-case hardness 與 average-case hardness 是緊密連結的，也就是說 RSA problem 是 random self-reducible。∎
</div>

## DDH is Random Self-Reducible

<div class="lemma">
<strong>Lemma.</strong>
The DDH problem is random self-reducible.
</div>

<div class="proof">
<strong>Proof.</strong>

Consider a triple

$$
(x,y,z) = (g^a, g^b, g^c),
$$

and we wish to test whether it is a valid Diffie–Hellman triple, namely whether

$$
c = ab.
$$

To randomize this instance, define a related triple

$$
(x',y',z') = (g^{a_1}, g^{b_1}, g^{c_1})
= \bigl(x^v g^{u_1},\; y g^{u_2},\; z^v y^{u_1} x^{v u_2} g^{u_1 u_2}\bigr),
$$

for random $u_1,u_2,v$.

先看前兩個分量：

$$
x' = x^v g^{u_1} = g^{av+u_1},
\qquad
y' = y g^{u_2} = g^{b+u_2}.
$$

因此可令

$$
a_1 = av+u_1,\qquad b_1 = b+u_2.
$$

再看第三個分量。若原本 $(x,y,z)$ 是合法的 Diffie–Hellman triple，也就是 $z=g^{ab}$，則

$$
z'
= z^v y^{u_1} x^{vu_2} g^{u_1u_2}
= g^{abv} g^{bu_1} g^{avu_2} g^{u_1u_2}
= g^{(av+u_1)(b+u_2)}.
$$

因此

$$
z' = g^{a_1 b_1},
$$

也就是說 $(x',y',z')$ 仍然是一個合法的 Diffie–Hellman triple。

反過來，這個變換也保留了「是否合法 DH triple」這件事；也就是說，原本是合法 triple 當且僅當變換後也是合法 triple。於是，一個固定的 DDH instance 可以被轉換成另一個隨機化後的 DDH instance，而不改變答案本身。

更重要的是，原文進一步指出：若原本的 triple 是合法的，則 $(x',y',z')$ 會均勻分佈在所有合法的 Diffie–Hellman triples 之中；若原本的 triple 不合法，則變換後的分佈會均勻落在所有 triples 上，而不僅限於合法者。這表示此轉換不僅保留真假，還把原始 instance 洗成一個平均意義下的隨機 instance。

因此，若存在一個演算法能在平均情況下判定 DDH，則透過上述隨機化構造，也能判定任意給定的 DDH instance。故 DDH problem 也是 random self-reducible。∎
</div>

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 19. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
