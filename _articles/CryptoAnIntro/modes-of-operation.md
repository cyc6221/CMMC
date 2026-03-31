---
layout: page
title: Modes of Operation
date: 2026-03-31
last_updated: 2026-03-31
tags: [block-cipher, modes-of-operation]
---

[Block Cipher]({{ "/articles/CryptoAnIntro/block-cipher/" | relative_url }}) 一次只能處理固定長度的區塊，因此在加密長訊息時，必須規定如何將多個 plaintext blocks 串接起來使用。這種使用方式稱為 mode of operation。

不同的 mode 不只影響加密流程，也會影響：

- 相同 plaintext blocks 是否會對應到相同 ciphertext blocks
- 是否能抵抗刪除或插入區塊的攻擊
- 傳輸錯誤會如何擴散到解密結果
- 是否能平行化處理
- 是否能把 block cipher 當成 stream cipher 使用

常見模式包括 ECB、CBC、OFB、CFB、CTR。

## ECB Mode

### Encryption and Decryption

Electronic Code Book Mode 是最直接的模式。將訊息切成 $n$-bit blocks：

$$
m_1, m_2, \dots, m_q,
$$

若最後一塊長度不足，則先 padding。接著逐塊加密：

$$
c_i = e_k(m_i).
$$

解密則是逐塊反向處理：

$$
m_i = d_k(c_i).
$$

每個 block 都獨立處理，不依賴前後文。

### Limitation

ECB 的主要問題在於，若兩個 plaintext blocks 相同，即

$$
m_i = m_j,
$$

則會得到

$$
c_i = c_j.
$$

因此相同內容會留下相同的密文模式。除此之外，由於各塊彼此獨立，攻擊者可以做區塊刪除、插入、重放或替換，而不容易被偵測。

<div class="remark">
<strong>Remark.</strong>
ECB 的問題不在於單一 block cipher 本身，而在於每個 block 缺乏上下文。相同的輸入永遠得到相同的輸出，會使資料的結構資訊直接暴露出來。
</div>

### Error Propagation

在 ECB 中，若 ciphertext 某一 bit 發生傳輸錯誤，則對應的整個 plaintext block 會被錯誤解密，但其他 blocks 不受影響。

## CBC Mode

### Encryption

Cipher Block Chaining Mode 會把前一個 ciphertext block 接到下一個 block 的加密輸入中。設 plaintext blocks 為

$$
m_1, \dots, m_q,
$$

並引入一個初始值 $IV$。加密定義為

$$
c_1 = e_k(m_1 \oplus IV),
$$

$$
c_i = e_k(m_i \oplus c_{i-1}) \quad \text{for } i>1.
$$

也就是先將當前 plaintext block 與前一個 ciphertext block XOR，再送入 block cipher。

### Decryption

解密時需同樣知道 $IV$，其公式為

$$
m_1 = d_k(c_1) \oplus IV,
$$

$$
m_i = d_k(c_i) \oplus c_{i-1} \quad \text{for } i>1.
$$

驗證很直接。由於

$$
c_i = e_k(m_i \oplus c_{i-1}),
$$

先解密得

$$
d_k(c_i) = m_i \oplus c_{i-1},
$$

再 XOR 一次 $c_{i-1}$，即可還原出

$$
m_i = d_k(c_i) \oplus c_{i-1}.
$$

### Role of the IV

$IV$ 的作用是在同一把 key 下，讓相同訊息的不同加密結果可以不同。若每則訊息都使用新的隨機 $IV$，則即使兩則訊息前綴相同，第一個 ciphertext block 也不會相同。

### Error Propagation

在 CBC 中，若 $c_i$ 某一 bit 發生錯誤，則：

- 第 $i$ 個 plaintext block 會整塊錯誤
- 第 $i+1$ 個 plaintext block 會有對應的一個 bit 錯誤

因此錯誤會影響兩個 blocks，而不只一個。

## OFB Mode

### Stream-Cipher View

Output Feedback Mode 會把 block cipher 轉成 stream cipher。選定一個參數 $j$，其中 $1 \le j \le n$，表示每次 keystream 輸出多少 bits。通常建議取 $j=n$。

先令

$$
X_1 = IV.
$$

對每個 $i=1,2,\dots,q$，做以下步驟：

$$
Y_i = e_k(X_i),
$$

$$
E_i = \text{the leftmost } j \text{ bits of } Y_i,
$$

$$
c_i = m_i \oplus E_i,
$$

$$
X_{i+1} = Y_i.
$$

因此 block cipher 的輸出會反覆餵回自身，形成 keystream generator。

### Decryption

由於這裡實際上是用 keystream 與 plaintext XOR，所以解密使用同樣的 keystream：

$$
m_i = c_i \oplus E_i.
$$

### Error Propagation

OFB 的一個特點是：ciphertext 若有一個 bit 發生錯誤，解密後只會在對應 plaintext 的一個 bit 產生錯誤，不會繼續擴散。

<div class="remark">
<strong>Remark.</strong>
OFB 的 keystream 與 plaintext、ciphertext 本身無關，只由 key 與 IV 決定。因此一旦 keystream 生成，就可視為在做同步式 stream cipher 的 XOR 加解密。
</div>

## CFB Mode

### Basic Rule

Cipher Feedback Mode 也會把 block cipher 轉成 stream cipher，但它和 OFB 的差別在於：下一步使用的不是前一步的加密輸出，而是與 ciphertext 有關的值。

其描述為：先令

$$
Y_0 = IV,
$$

再對每個 $i$ 計算

$$
Z_i = e_k(Y_{i-1}),
$$

$$
E_i = \text{the leftmost } j \text{ bits of } Z_i,
$$

再以這些 bits 與資料做 XOR 產生輸出。

這個模式的核心概念是：keystream 的生成會受到前面 ciphertext 的影響，因此它不像 OFB 那樣完全獨立於 ciphertext。

### Error Propagation

CFB 的單一 bit 錯誤會影響目前這一段與下一段的解密結果，錯誤擴散性質與 CBC 類似。

## CTR Mode

### Encryption Rule

Counter Mode 也是將 block cipher 當成 keystream generator 使用。先選擇一個公開的 $IV$ 或 counter，並要求對同一把 key 的不同訊息使用不同的起始 counter。對第 $i$ 個 block，加密規則為

$$
c_i = m_i \oplus e_k(IV + i).
$$

也就是將 $IV+i$ 當成 block cipher 的輸入，再將輸出與 plaintext block XOR。

### Decryption

由於 XOR 的對稱性，解密公式相同：

$$
m_i = c_i \oplus e_k(IV + i).
$$

### Advantage

CTR mode 有幾個重要優點。

第一，每個 block 都能獨立處理，因為第 $i$ 塊只依賴 $IV+i$，不依賴前一個 block 的加密結果，因此可平行化加密與解密。

第二，即使兩個 plaintext blocks 相同，也不會像 ECB 那樣得到相同 ciphertext，因為它們對應到不同的 counter input。

第三，每個 ciphertext block 都和其位置綁定，因為解密時必須知道它是用哪個 counter 值產生的 keystream。

<div class="remark">
<strong>Remark.</strong>
CTR 結合了兩種特性：它像 ECB 一樣容易平行化，又避免了 ECB 中「相同明文對應相同密文」的問題，因此在實作與效能上都很有吸引力。
</div>

## Comparison of Error Propagation

不同模式的傳輸錯誤擴散情形如下：

### ECB

ciphertext 中一個 bit 錯誤，會導致對應 plaintext block 整塊錯誤。

### CBC

ciphertext 中一個 bit 錯誤，會導致：

- 對應 plaintext block 整塊錯誤
- 下一個 plaintext block 有一個 bit 錯誤

### OFB

ciphertext 中一個 bit 錯誤，只會導致 plaintext 中對應一個 bit 錯誤。

### CFB

ciphertext 中一個 bit 錯誤，會影響當前段與下一段。

### CTR

由於是與 keystream XOR，ciphertext 中一個 bit 錯誤，通常只會對應到 plaintext 中一個 bit 錯誤。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 8. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
