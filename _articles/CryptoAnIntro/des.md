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

$(L_0, R_0)$ 為初始分塊，每輪更新為

$$
L_i = R_{i-1}, \qquad R_i = L_{i-1} \oplus F(K_i, R_{i-1}),
$$

最後輸出在 final permutation 前會交換成 $(R_{16}, L_{16})$。

<div class="remark">
<strong>Remark.</strong>
DES 在主體 Feistel iteration 前後都加入 permutation。這些 permutation 的功能主要是整體結構安排與實作考量；DES 的核心安全性仍主要來自 rounds 中的 expansion、S-box、P-box 與 key mixing。
</div>

## DES Structure and Round Function

DES 的整體運算可分成兩個層次來看。最外層先對 $64$-bit 輸入做 initial permutation $IP$，在 $16$ 輪 Feistel iteration 結束後，再做 inverse permutation $IP^{-1}$。而在每一輪內部，真正負責混淆與擴散的是 round function $F$，其輸入為右半部的 $32$ bits 與 round key $48$ bits，輸出為 $32$ bits。

## Initial and Final Permutations

DES 一開始對輸入區塊施加 initial permutation $IP$，最後再施加 inverse permutation $IP^{-1}$。這兩個 permutation 都是固定的 bit 重排，不涉及金鑰，也不提供非線性；它們的作用是按照既定位置重新排列輸入與輸出 bits。

若輸入 bit string 為 $x_1,\dots,x_{64}$，則 $IP$ 的表格表示輸出各位置分別取自哪一個輸入位置。例 如表中左上角是 $58$，表示輸出第 $1$ 個 bit 取自輸入第 $58$ 個 bit。

### Initial Permutation $IP$

$$
IP =
\begin{pmatrix}
58 & 50 & 42 & 34 & 26 & 18 & 10 & 2 \\
60 & 52 & 44 & 36 & 28 & 20 & 12 & 4 \\
62 & 54 & 46 & 38 & 30 & 22 & 14 & 6 \\
64 & 56 & 48 & 40 & 32 & 24 & 16 & 8 \\
57 & 49 & 41 & 33 & 25 & 17 & 9 & 1 \\
59 & 51 & 43 & 35 & 27 & 19 & 11 & 3 \\
61 & 53 & 45 & 37 & 29 & 21 & 13 & 5 \\
63 & 55 & 47 & 39 & 31 & 23 & 15 & 7
\end{pmatrix}
$$

### Inverse Initial Permutation $IP^{-1}$

$$
IP^{-1} =
\begin{pmatrix}
40 & 8 & 48 & 16 & 56 & 24 & 64 & 32 \\
39 & 7 & 47 & 15 & 55 & 23 & 63 & 31 \\
38 & 6 & 46 & 14 & 54 & 22 & 62 & 30 \\
37 & 5 & 45 & 13 & 53 & 21 & 61 & 29 \\
36 & 4 & 44 & 12 & 52 & 20 & 60 & 28 \\
35 & 3 & 43 & 11 & 51 & 19 & 59 & 27 \\
34 & 2 & 42 & 10 & 50 & 18 & 58 & 26 \\
33 & 1 & 41 & 9 & 49 & 17 & 57 & 25
\end{pmatrix}
$$

## DES Round Function

在第 $i$ 輪中，DES 的 Feistel 更新為

$$
L_i = R_{i-1}, \qquad
R_i = L_{i-1} \oplus F(K_i, R_{i-1}).
$$

因此 round function $F$ 的任務是：將右半部 $R_{i-1}$ 的 $32$ bits，結合 round key $K_i$ 的 $48$ bits，轉換成新的 $32$-bit 輸出，再與左半部做 XOR。

### Expansion Permutation

首先，將右半部的 $32$ bits 經過 expansion permutation 擴展為 $48$ bits。這一步不只是把長度從 $32$ 補到 $48$，而是透過重複使用某些邊界 bits，使相鄰區塊之間產生交疊，讓同一個輸入 bit 可能同時影響不同的 S-box，從而增加 diffusion。

其 expansion table 為

$$
E =
\begin{pmatrix}
32 & 1 & 2 & 3 & 4 & 5 \\
4 & 5 & 6 & 7 & 8 & 9 \\
8 & 9 & 10 & 11 & 12 & 13 \\
12 & 13 & 14 & 15 & 16 & 17 \\
16 & 17 & 18 & 19 & 20 & 21 \\
20 & 21 & 22 & 23 & 24 & 25 \\
24 & 25 & 26 & 27 & 28 & 29 \\
28 & 29 & 30 & 31 & 32 & 1
\end{pmatrix}
$$

可見每一列對應一個 $6$-bit 區塊，而相鄰列之間共享邊界位置，因此某些 bits 會重複出現在不同列中。

### Round Key Addition

擴展後的 $48$-bit 結果與 round key 做 XOR：

$$
X = E(R_{i-1}) \oplus K_i.
$$

這是 round key 唯一直接進入 round function 的位置。也就是說，DES 的每一輪雖然包含多個變換，但真正將金鑰混入資料的地方只有這一步。

### Splitting

接著，將 $48$ bits 切成八組，每組 $6$ bits：

$$
X = B_1 \| B_2 \| \cdots \| B_8,
\qquad B_j \in \{0,1\}^6.
$$

每一組 $B_j$ 都會送入一個對應的 S-box $S_j$。

### S-Box Substitution

DES 共有八個不同的 S-box。每個 S-box 都將一個 $6$-bit 輸入映成一個 $4$-bit 輸出，因此八個 S-box 合起來剛好把 $48$ bits 壓回 $32$ bits。這一步是 DES 的主要非線性來源，也是整體安全性的核心部分之一。

若某個 S-box 的輸入為

$$
B = b_1b_2b_3b_4b_5b_6,
$$

則其 row 與 column 的決定方式為

$$
\text{row} = (b_1b_6)_2, \qquad
\text{column} = (b_2b_3b_4b_5)_2.
$$

也就是最外側兩個 bits 決定 row，中間四個 bits 決定 column，再由該表格查出對應的 $4$-bit 輸出。

### S-Box 1

$$
S_1 =
\begin{pmatrix}
14 & 4 & 13 & 1 & 2 & 15 & 11 & 8 & 3 & 10 & 6 & 12 & 5 & 9 & 0 & 7 \\
0 & 15 & 7 & 4 & 14 & 2 & 13 & 1 & 10 & 6 & 12 & 11 & 9 & 5 & 3 & 8 \\
4 & 1 & 14 & 8 & 13 & 6 & 2 & 11 & 15 & 12 & 9 & 7 & 3 & 10 & 5 & 0 \\
15 & 12 & 8 & 2 & 4 & 9 & 1 & 7 & 5 & 11 & 3 & 14 & 10 & 0 & 6 & 13
\end{pmatrix}
$$

### S-Box 2

$$
S_2 =
\begin{pmatrix}
15 & 1 & 8 & 14 & 6 & 11 & 3 & 4 & 9 & 7 & 2 & 13 & 12 & 0 & 5 & 10 \\
3 & 13 & 4 & 7 & 15 & 2 & 8 & 14 & 12 & 0 & 1 & 10 & 6 & 9 & 11 & 5 \\
0 & 14 & 7 & 11 & 10 & 4 & 13 & 1 & 5 & 8 & 12 & 6 & 9 & 3 & 2 & 15 \\
13 & 8 & 10 & 1 & 3 & 15 & 4 & 2 & 11 & 6 & 7 & 12 & 0 & 5 & 14 & 9
\end{pmatrix}
$$

### S-Box 3

$$
S_3 =
\begin{pmatrix}
10 & 0 & 9 & 14 & 6 & 3 & 15 & 5 & 1 & 13 & 12 & 7 & 11 & 4 & 2 & 8 \\
13 & 7 & 0 & 9 & 3 & 4 & 6 & 10 & 2 & 8 & 5 & 14 & 12 & 11 & 15 & 1 \\
13 & 6 & 4 & 9 & 8 & 15 & 3 & 0 & 11 & 1 & 2 & 12 & 5 & 10 & 14 & 7 \\
1 & 10 & 13 & 0 & 6 & 9 & 8 & 7 & 4 & 15 & 14 & 3 & 11 & 5 & 2 & 12
\end{pmatrix}
$$

### S-Box 4

$$
S_4 =
\begin{pmatrix}
7 & 13 & 14 & 3 & 0 & 6 & 9 & 10 & 1 & 2 & 8 & 5 & 11 & 12 & 4 & 15 \\
13 & 8 & 11 & 5 & 6 & 15 & 0 & 3 & 4 & 7 & 2 & 12 & 1 & 10 & 14 & 9 \\
10 & 6 & 9 & 0 & 12 & 11 & 7 & 13 & 15 & 1 & 3 & 14 & 5 & 2 & 8 & 4 \\
3 & 15 & 0 & 6 & 10 & 1 & 13 & 8 & 9 & 4 & 5 & 11 & 12 & 7 & 2 & 14
\end{pmatrix}
$$

### S-Box 5

$$
S_5 =
\begin{pmatrix}
2 & 12 & 4 & 1 & 7 & 10 & 11 & 6 & 8 & 5 & 3 & 15 & 13 & 0 & 14 & 9 \\
14 & 11 & 2 & 12 & 4 & 7 & 13 & 1 & 5 & 0 & 15 & 10 & 3 & 9 & 8 & 6 \\
4 & 2 & 1 & 11 & 10 & 13 & 7 & 8 & 15 & 9 & 12 & 5 & 6 & 3 & 0 & 14 \\
11 & 8 & 12 & 7 & 1 & 14 & 2 & 13 & 6 & 15 & 0 & 9 & 10 & 4 & 5 & 3
\end{pmatrix}
$$

### S-Box 6

$$
S_6 =
\begin{pmatrix}
12 & 1 & 10 & 15 & 9 & 2 & 6 & 8 & 0 & 13 & 3 & 4 & 14 & 7 & 5 & 11 \\
10 & 15 & 4 & 2 & 7 & 12 & 9 & 5 & 6 & 1 & 13 & 14 & 0 & 11 & 3 & 8 \\
9 & 14 & 15 & 5 & 2 & 8 & 12 & 3 & 7 & 0 & 4 & 10 & 1 & 13 & 11 & 6 \\
4 & 3 & 2 & 12 & 9 & 5 & 15 & 10 & 11 & 14 & 1 & 7 & 6 & 0 & 8 & 13
\end{pmatrix}
$$

### S-Box 7

$$
S_7 =
\begin{pmatrix}
4 & 11 & 2 & 14 & 15 & 0 & 8 & 13 & 3 & 12 & 9 & 7 & 5 & 10 & 6 & 1 \\
13 & 0 & 11 & 7 & 4 & 9 & 1 & 10 & 14 & 3 & 5 & 12 & 2 & 15 & 8 & 6 \\
1 & 4 & 11 & 13 & 12 & 3 & 7 & 14 & 10 & 15 & 6 & 8 & 0 & 5 & 9 & 2 \\
6 & 11 & 13 & 8 & 1 & 4 & 10 & 7 & 9 & 5 & 0 & 15 & 14 & 2 & 3 & 12
\end{pmatrix}
$$

### S-Box 8

$$
S_8 =
\begin{pmatrix}
13 & 2 & 8 & 4 & 6 & 15 & 11 & 1 & 10 & 9 & 3 & 14 & 5 & 0 & 12 & 7 \\
1 & 15 & 13 & 8 & 10 & 3 & 7 & 4 & 12 & 5 & 6 & 11 & 0 & 14 & 9 & 2 \\
7 & 11 & 4 & 1 & 9 & 12 & 14 & 2 & 0 & 6 & 10 & 13 & 15 & 3 & 5 & 8 \\
2 & 1 & 14 & 7 & 4 & 10 & 8 & 13 & 15 & 12 & 9 & 0 & 3 & 5 & 6 & 11
\end{pmatrix}
$$

### P-Box Permutation

八個 S-box 的輸出接起來後，得到 $32$ bits，再經過 P-box permutation 重新排列，形成 $F$ 的最終輸出。這一步的作用是將某個 S-box 的輸出 bits 分散到不同位置，讓它們在下一輪 expansion 時影響更多不同的 S-box，進一步增強 diffusion。

其 P-box table 為

$$
P =
\begin{pmatrix}
16 & 7 & 20 & 21 \\
29 & 12 & 28 & 17 \\
1 & 15 & 23 & 26 \\
5 & 18 & 31 & 10 \\
2 & 8 & 24 & 14 \\
32 & 27 & 3 & 9 \\
19 & 13 & 30 & 6 \\
22 & 11 & 4 & 25
\end{pmatrix}
$$

因此，若將 eight S-box outputs 組成的 $32$-bit 字串記為 $Y$，則 round function 的輸出可寫為

$$
F(K_i, R_{i-1}) = P\bigl(S(E(R_{i-1}) \oplus K_i)\bigr),
$$

其中 $S$ 表示八個 S-box 並行作用後所形成的整體 substitution。

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
