---
layout: page
title: DES
date: 2026-03-31
last_updated: 2026-03-31
tags: [block-cipher, DES]
---

**DES** 是一種以 [Feistel]({{ "/articles/CryptoAnIntro/feistel-cipher/" | relative_url }}) 結構為基礎的 [Block Cipher]({{ "/articles/CryptoAnIntro/block-cipher/" | relative_url }})。其基本參數為：

- round 數為 $16$
- block length 為 $64$ bits
- key length 為 $56$ bits
- 每個 round key $K_1, \dots, K_{16}$ 為 $48$ bits

由於 $56$-bit key 對現代應用而言偏短，因此實務上常見以多次 DES 組合成 3DES，以增加有效金鑰長度。

![8.3-triple-DES.svg]({{ '/assets/img/CryptoAnIntro/8.3-triple-DES.svg' | relative_url }})

## Overall Structure

DES 的整體流程如下：

1. 對 $64$-bit plaintext 做 initial permutation
2. 將結果切成左半與右半
3. 執行 $16$ 輪 identical operations
4. 將兩半重新組合
5. 進行 final permutation
   - final permutation 是 initial permutation 的 inverse。

![8.4-DES-as-a-feistel-cipher.svg]({{ '/assets/img/CryptoAnIntro/8.4-DES-as-a-feistel-cipher.svg' | relative_url }})

若以 $(L_0, R_0)$ 表示初始分塊，則每輪更新為

$$
L_i = R_{i-1}, \qquad R_i = L_{i-1} \oplus F(K_i, R_{i-1}),
$$

最後輸出在進入 inverse permutation 前會交換成 $(R_{16}, L_{16})$。

<div class="remark">
<strong>Remark.</strong>
DES 在主體 Feistel iteration 前後都加入 permutation。這些 permutation 的功能主要是整體結構安排與實作考量；DES 的核心安全性仍主要來自 rounds 中的 expansion、S-box、P-box 與 key mixing。
</div>

## DES Round Function

DES 每一輪中的函數 $F$ 由數個步驟組成。輸入是右半部 $32$ bits 與 round key $48$ bits，輸出為 $32$ bits。其流程如下：

### Initial and Final Permutations

DES 一開始使用 initial permutation $IP$，最後使用 inverse permutation $IP^{-1}$。若輸入 bit string 為 $x_1,\dots,x_{64}$，則 $IP$ 的表格表示輸出每一個位置從哪個輸入位置取值。換言之，若表中第一個數是 $58$，表示輸出第 $1$ bit 取自輸入第 $58$ bit。

這些 permutation 可直接視為固定重排，不涉及金鑰與非線性運算。

### Expansion Permutation

先將右半部的 $32$ bits 擴展並置換成 $48$ bits。這一步不只是單純補長，而是讓某些輸入 bit 同時影響不同位置，使後續 substitution 之間建立關聯，增加 diffusion。

其 expansion table 為：

$$
\begin{aligned}
&32\ 1\ 2\ 3\ 4\ 5\\
&4\ 5\ 6\ 7\ 8\ 9\\
&8\ 9\ 10\ 11\ 12\ 13\\
&12\ 13\ 14\ 15\ 16\ 17\\
&16\ 17\ 18\ 19\ 20\ 21\\
&20\ 21\ 22\ 23\ 24\ 25\\
&24\ 25\ 26\ 27\ 28\ 29\\
&28\ 29\ 30\ 31\ 32\ 1
\end{aligned}
$$

這個表也顯示相鄰區段會共享邊界 bit，因此一個 bit 可能同時影響兩個不同 S-box 的輸入。

### Round Key Addition

擴展後的 $48$-bit 結果與 round key 做 XOR：

$$
X = E(R_{i-1}) \oplus K_i.
$$

這是 round key 進入 DES round 的唯一位置。

### Splitting

接著將 $48$ bits 切成八組，每組 $6$ bits。每一組都會送入一個對應的 S-box。

### S-Box Substitution

八個不同的 S-box 各自接收一個 $6$-bit input，輸出一個 $4$-bit 值，因此總輸出長度為 $32$ bits。S-box 是 DES 的主要 non-linear component，也是安全性的核心來源之一。

對一個輸入 bit string $b_1b_2b_3b_4b_5b_6$，row 由第 $1$ 與第 $6$ 個 bit 決定，column 由中間四個 bit $b_2b_3b_4b_5$ 決定。也就是：

$$
\text{row} = (b_1b_6)_2, \qquad \text{column} = (b_2b_3b_4b_5)_2.
$$

再從對應 S-box 的查表結果輸出 $4$ bits。

### P-Box Permutation

八個 S-box 的輸出組合成 $32$ bits 後，再經過 P-box permutation，產生 $F$ 的最終輸出。其作用是重新排列 S-box 的輸出位置，讓單一 S-box 的影響在下一輪擴散到更廣的位置。

P-box table 為：

$$
\begin{aligned}
&16\ 7\ 20\ 21\\
&29\ 12\ 28\ 17\\
&1\ 15\ 23\ 26\\
&5\ 18\ 31\ 10\\
&2\ 8\ 24\ 14\\
&32\ 27\ 3\ 9\\
&19\ 13\ 30\ 6\\
&22\ 11\ 4\ 25
\end{aligned}
$$

## Key Schedule

DES 的 key schedule 從原始 key 產生 $16$ 個 round keys。原始輸入通常寫成 $64$ bits，其中有 $8$ 個 parity bits，因此真正用於加密的是其中的 $56$ bits。parity bits 位於位置 $8,16,\dots,64$，用於讓每個 byte 含有 odd number of bits。

### PC-1

首先對 $64$-bit 輸入做一個 permutation 並捨去 parity bits，得到 $56$ bits。這個 permutation 稱為 PC-1。

PC-1 的輸出再切成兩個 $28$-bit halves，記為 $C_0$ 與 $D_0$。

### Left Shifts

對每一輪 $i$，分別對左右兩半做循環左移：

$$
C_i = C_{i-1} \lll p_i, \qquad D_i = D_{i-1} \lll p_i,
$$

其中 $\lll p_i$ 表示 cyclic left shift $p_i$ 個位置。若 $i = 1,2,9,16$，則 $p_i = 1$；其餘 rounds 皆為 $p_i = 2$。

### PC-2

將 $C_i$ 與 $D_i$ 接回成 $56$ bits 後，再經過第二個 permutation PC-2，輸出該輪所需的 $48$-bit round key $K_i$。

因此整個 key schedule 流程可概括為：

$$
\text{64-bit input key} \xrightarrow{\text{PC-1}} (C_0, D_0)
\xrightarrow{\text{left shifts}}
(C_i, D_i)
\xrightarrow{\text{PC-2}} K_i.
$$

<div class="remark">
<strong>Remark.</strong>
DES 使用 Feistel 結構，因此即使 round function $F$ 中包含 expansion、table lookup 與 permutation 等不可逆操作，整體每一輪仍然可逆。這讓 DES 可以把設計重點放在 non-linear substitution 與 diffusion 的效果，而不需要要求每個元件 individually 可逆。DES 的 round function 本身不是可逆函數，但這不影響 DES 的可解密性。真正保證可逆的是 Feistel round 的更新形式，而不是 $F$ 的內部每個步驟。
</div>

## 3DES

由於 DES 的 $56$-bit key 長度不足，實務上常以 Triple DES 補強。3DES 透過三次 DES 組合使用多個金鑰，可把有效 key length 提高到較大的等級。常見的三金鑰版本使用三把獨立金鑰，另也有兩金鑰版本，其中第一把與第三把相同。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 8. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
