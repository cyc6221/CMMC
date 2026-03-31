---
layout: page
title: Feistel Cipher
date: 2026-03-31
last_updated: 2026-03-31
tags: [block-cipher, DES]
---

Feistel cipher 是一種重要的 block cipher 結構。其核心做法是先把輸入區塊分成左右兩半，然後重複進行多輪更新。若第 $i-1$ 輪的輸入為 $(L_{i-1}, R_{i-1})$，第 $i$ 輪定義為

$$
L_i = R_{i-1}, \qquad R_i = L_{i-1} \oplus F(K_i, R_{i-1}).
$$

其中 $K_i$ 是第 $i$ 輪 round key，$F$ 是 round function。這種結構的重要特徵在於：即使 $F$ 本身不可逆，整個 round 仍然可逆。

![8.2-basic-operation-of-a-feistel-cipher.svg]({{ '/assets/img/CryptoAnIntro/8.2-basic-operation-of-a-feistel-cipher.svg' | relative_url }})

## Encryption and Decryption

### Encryption

$$
L_i = R_{i-1},
R_i = L_{i-1} \oplus F(K_i, R_{i-1}).
$$

### Decryption

$$
R_{i-1} = L_i,
L_{i-1} = R_i \oplus F(K_i, L_i).
$$

## Round Invertibility

Feistel 結構的可逆性可以直接由 round update 式子看出。已知

$$
L_i = R_{i-1}, \qquad R_i = L_{i-1} \oplus F(K_i, R_{i-1}),
$$

則可由 $L_i = R_{i-1}$ 得到

$$
R_{i-1} = L_i.
$$

再代回第二式：

$$
R_i = L_{i-1} \oplus F(K_i, L_i).
$$

因此

$$
L_{i-1} = R_i \oplus F(K_i, L_i).
$$

所以解密可寫成

$$
R_{i-1} = L_i, \qquad L_{i-1} = R_i \oplus F(K_i, L_i).
$$

這表示只要 round key 已知，就能逐輪反向還原先前狀態。

<div class="remark">
<strong>Remark.</strong>
Feistel 結構的重點不在於要求 $F$ 可逆，而在於整個 round 的排列方式保證可逆。這使得設計者可以更自由地選擇 $F$ 的形式，把重點放在混淆與擴散效果，而不是先滿足可逆性。
</div>

## Properties

### Design Advantage

Feistel cipher 有兩個直接的設計優點。第一，$F$ 可以是任意函數，而不需要先保證其本身可逆，仍然能得到可逆的加密結構。第二，加密與解密可以共用相同的程式或電路，只需要在解密時將 round key 的使用順序反過來即可。

這使得 Feistel 結構在硬體與實作上都很自然，也成為經典 block cipher 設計的重要形式。

### Security Considerations

Feistel 結構本身只保證可逆，並不自動保證安全。實際安全性仍取決於下列因素：

- round keys 如何由主金鑰產生
- 總共使用多少 rounds
- 函數 $F$ 的設計方式

若這些部分設計不佳，即使採用 Feistel 結構，仍可能被攻破。

### Feistel Cipher as an Iterated Block Cipher

許多 block ciphers 透過 repeated rounds 來累積安全性。Feistel cipher 就是一種典型的 iterated block cipher：每一輪只做簡單操作，但在多輪反覆作用下，逐步增強 substitution、permutation 與 key mixing 的整體效果。

<div class="remark">
<strong>Remark.</strong>
在 iterated block cipher 中，單一 round 通常不夠安全；安全性來自多輪疊加後所形成的整體混淆與擴散效果。因此 round 數增加時，通常會提高 block cipher 的安全程度。
</div>

### Relation to DES

DES 是 Feistel cipher 的一個具代表性的變形。它沿用左右半部交替更新的結構，並透過 16 輪 round、round key schedule，以及額外的 permutation 與 substitution 元件來建立實際的加密演算法。Feistel 結構提供了 DES 的骨架，而 DES 的安全性則進一步依賴其 $F$ 函數與整體參數設計。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 8. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
