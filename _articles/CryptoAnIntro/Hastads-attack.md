---
layout: page
title: Håstad’s Attack
date: 2026-03-10
last_updated: 2026-03-11
tags: [RSA, Coppersmith, broadcast-attack]
---

Håstad’s Attack 是對 **textbook RSA** 的經典攻擊。若同一個 message 被送給多個不同接收者，且他們使用相同的小 public exponent，則 adversary 可能由多個 ciphertext 直接 recover plaintext。

最基本的情形是 **broadcast attack**。同一個 message 被加密到不同 modulus 下時，這些 ciphertext 可用 **Chinese Remainder Theorem** 合併，進而還原 $m^e$，最後取整數 $e$ 次根 recover $m$。

這個想法也可推廣到帶有固定格式的訊息。即使每位使用者實際加密的內容不完全相同，只要這些 ciphertext 之間仍保有可描述的 algebraic structure，問題仍可轉化為 modular polynomial 的 small-root problem，並用 **Coppersmith's Theorem** 解出。因此，這個 attack 說明 deterministic RSA encoding 在 broadcast setting 下的脆弱性，也說明固定且可預測的 padding 並不足以保證安全。

## Basic Broadcast Attack

假設有三個不同接收者，其 public keys 為

$$
(N_i, e_i), \quad i=1,2,3,
$$

且都使用相同的 encryption exponent

$$
e_i = 3.
$$

若 sender 將同一個 message $m$ 傳給三位接收者，則得到

$$
c_i \equiv m^3 \pmod{N_i}, \quad i=1,2,3.
$$

若 $N_1,N_2,N_3$ 兩兩互質，則可利用 **Chinese Remainder Theorem** 合併這三個 congruences，得到某個整數 $C$ 使得

$$
C \equiv m^3 \pmod{N_1N_2N_3}.
$$

若再滿足

$$
m^3 < N_1N_2N_3,
$$

則上式其實給出整數等式

$$
C = m^3.
$$

因此只要取整數立方根，即可 recover

$$
m = \sqrt[3]{C}.
$$

## Generalized Håstad’s Attack

現在考慮帶有固定格式的情形。對 user $i$，設 ciphertext 為

$$
c_i = (i \cdot 2^\ell + m)^3 \pmod{N_i}.
$$

雖然每位使用者加密的內容不同，但這些 ciphertext 仍具有共同的 algebraic structure。

更一般地，考慮 $k$ 個 users，使用相同的 public encryption exponent $e$。定義

$$
g_i(x) = (i \cdot 2^\ell + x)^e - c_i, \quad 1 \le i \le k.
$$

則真正的 message $m$ 滿足

$$
g_i(m) = 0 \pmod{N_i}, \quad 1 \le i \le k.
$$

因此，recover $m$ 的問題可轉化為尋找這組 modular polynomial equations 的共同小根。

### Combining the Equations

令

$$
N = N_1N_2\cdots N_k.
$$

由 **Chinese Remainder Theorem**，可找到係數 $t_i$，使得

$$
g(x) = \sum_{i=1}^k t_i g_i(x)
$$

滿足

$$
g(m) = 0 \pmod{N}.
$$

由於每個 $g_i(x)$ 都是 **degree $e$ 的 monic polynomial**，因此 $g(x)$ 也是一個適合套用 **Coppersmith's Theorem** 的 polynomial。

### Recovering the Small Root

若 $m$ 夠小，則可用 **Coppersmith's Theorem** 在 polynomial time 中 recover $m$。在這裡，若

$$
m < \min_i N_i < N^{1/k} < N^{1/e},
$$

且

$$
k > e,
$$

則 $m$ 落在 small-root method 可處理的範圍內，因此可以 recover $m$。

<div class="remark">

Håstad’s Attack 常被稱為 **broadcast attack**。最基本的版本處理完全相同 message 的廣播情形；更一般的版本則處理帶有固定且可預測格式的訊息。兩者的核心都是利用 ciphertext 之間的 algebraic relation 來 recover plaintext。

</div>

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 17. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
