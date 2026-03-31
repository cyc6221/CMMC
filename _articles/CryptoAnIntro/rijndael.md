---
layout: page
title: Rijndael
date: 2026-03-31
last_updated: 2026-03-31
tags: [block-cipher, rijndael, AES]
---

## Basic Structure

Rijndael 是一種不採用 Feistel 結構的 block cipher。它與 DES 一樣，都是透過多輪反覆運算來累積安全性，但每一輪的操作形式不同。Rijndael 的設計建立在明確的代數結構上，多數運算可用 $\mathbb{F}_{2^8}$ 上的運算來描述。

Rijndael 可支援 block size 為 $128$、$192$、$256$ bits，也可支援 key size 為 $128$、$192$、$256$ bits。不同的 block size 與 key size 組合會對應不同的 round 數。這裡只考慮最常用的版本：block size 為 $128$ bits、key size 為 $128$ bits，此時 round 數為 $10$。

## Finite Field Representation

Rijndael 將一個 byte 視為 $\mathbb{F}_{2^8}$ 中的元素，也就是將 8-bit 向量對應到 binary polynomial。若 byte 的十六進位表示為 `0x83`，則其 bit pattern 為

$$
1,0,0,0,0,0,1,1,
$$

對應的多項式為

$$
x^7 + x + 1.
$$

因此 `0x83` 可視為代表多項式 $x^7 + x + 1$。在 $\mathbb{F}_{2^8}$ 中的運算，是將多項式運算再模去不可約多項式

$$
m(x) = x^8 + x^4 + x^3 + x + 1.
$$

Rijndael 也將 32-bit word 視為 $\mathbb{F}_{2^8}[X]$ 中次數小於四的多項式。若一個 word 為

$$
a_0 \| a_1 \| a_2 \| a_3,
$$

則對應到多項式

$$
a_3X^3 + a_2X^2 + a_1X + a_0.
$$

這裡的運算是在 $\mathbb{F}_{2^8}[X]$ 上進行，並模去

$$
M(X) = X^4 + 1.
$$

<div class="remark">
<strong>Remark.</strong>
Rijndael 的一個重要特徵是其元件大多有明確的代數描述，而不是只依賴查表或經驗性設計。這使它在分析 differential 與 linear cryptanalysis 時，有較清楚的數學結構可供研究。
</div>

## State Matrix

Rijndael 在內部使用一個 $4 \times 4$ 的 byte matrix，稱為 state matrix：

$$
S =
\begin{pmatrix}
s_{0,0} & s_{0,1} & s_{0,2} & s_{0,3} \\
s_{1,0} & s_{1,1} & s_{1,2} & s_{1,3} \\
s_{2,0} & s_{2,1} & s_{2,2} & s_{2,3} \\
s_{3,0} & s_{3,1} & s_{3,2} & s_{3,3}
\end{pmatrix}.
$$

每一個 round key 也可寫成相同形式的 $4 \times 4$ matrix：

$$
K_i =
\begin{pmatrix}
k_{0,0} & k_{0,1} & k_{0,2} & k_{0,3} \\
k_{1,0} & k_{1,1} & k_{1,2} & k_{1,3} \\
k_{2,0} & k_{2,1} & k_{2,2} & k_{2,3} \\
k_{3,0} & k_{3,1} & k_{3,2} & k_{3,3}
\end{pmatrix}.
$$

實作時通常將 state 視為四個 32-bit words，也就是四個 column。

## Round Operations

Rijndael 的 round function 由四個基本操作組成：SubBytes、ShiftRows、MixColumns、AddRoundKey。

### SubBytes

SubBytes 會對 state matrix 中的每一個 byte 個別進行 substitution。設某個 byte 為 $s = [s_7,\dots,s_0]$，將其視為 $\mathbb{F}_{2^8}$ 中的元素後，SubBytes 分成兩步：

1. 先取 multiplicative inverse，得到新 byte $x = [x_7,\dots,x_0]$。若輸入為零，則約定仍映到零。
2. 再套用一個 affine transformation，得到輸出 byte $y$：

$$
\begin{pmatrix}
y_0\\
y_1\\
y_2\\
y_3\\
y_4\\
y_5\\
y_6\\
y_7
\end{pmatrix}
=
\begin{pmatrix}
1&0&0&0&1&1&1&1\\
1&1&0&0&0&1&1&1\\
1&1&1&0&0&0&1&1\\
1&1&1&1&0&0&0&1\\
1&1&1&1&1&0&0&0\\
0&1&1&1&1&1&0&0\\
0&0&1&1&1&1&1&0\\
0&0&0&1&1&1&1&1
\end{pmatrix}
\begin{pmatrix}
x_0\\
x_1\\
x_2\\
x_3\\
x_4\\
x_5\\
x_6\\
x_7
\end{pmatrix}
\oplus
\begin{pmatrix}
1\\
1\\
0\\
0\\
0\\
1\\
1\\
0
\end{pmatrix}.
$$

這一步提供主要的非線性來源。加密與解密各自使用互為 inverse 的 S-box。

### ShiftRows

ShiftRows 會對 state matrix 的每一列做循環位移。對 128-bit 版本而言，變換為

$$
\begin{pmatrix}
s_{0,0} & s_{0,1} & s_{0,2} & s_{0,3} \\
s_{1,0} & s_{1,1} & s_{1,2} & s_{1,3} \\
s_{2,0} & s_{2,1} & s_{2,2} & s_{2,3} \\
s_{3,0} & s_{3,1} & s_{3,2} & s_{3,3}
\end{pmatrix}
\mapsto
\begin{pmatrix}
s_{0,0} & s_{0,1} & s_{0,2} & s_{0,3} \\
s_{1,1} & s_{1,2} & s_{1,3} & s_{1,0} \\
s_{2,2} & s_{2,3} & s_{2,0} & s_{2,1} \\
s_{3,3} & s_{3,0} & s_{3,1} & s_{3,2}
\end{pmatrix}.
$$

第一列不移動，第二列左移一格，第三列左移兩格，第四列左移三格。這一步讓不同 column 的資料在多輪中逐步混合。

### MixColumns

MixColumns 會逐一處理 state 的每一個 column。若某個 column 對應到多項式

$$
a(X) = a_0 + a_1X + a_2X^2 + a_3X^3,
$$

則新的 column 由它與多項式

$$
c(X) = 0x02 + 0x01 \cdot X + 0x01 \cdot X^2 + 0x03 \cdot X^3
$$

相乘後，再模去 $M(X)=X^4+1$ 得到。

這可寫成矩陣形式：

$$
\begin{pmatrix}
b_0\\
b_1\\
b_2\\
b_3
\end{pmatrix}
=
\begin{pmatrix}
0x02 & 0x03 & 0x01 & 0x01\\
0x01 & 0x02 & 0x03 & 0x01\\
0x01 & 0x01 & 0x02 & 0x03\\
0x03 & 0x01 & 0x01 & 0x02
\end{pmatrix}
\begin{pmatrix}
a_0\\
a_1\\
a_2\\
a_3
\end{pmatrix}.
$$

這一步使每個 output byte 同時依賴同一個 column 中的四個 input bytes，負責 row 方向的擴散。

<div class="remark">
<strong>Remark.</strong>
ShiftRows 與 MixColumns 是配合設計的。ShiftRows 讓不同 column 的資料彼此交錯，MixColumns 再在每個 column 內做線性混合。兩者疊加後，可使每個 output byte 逐步依賴更多 input bytes。
</div>

### AddRoundKey

AddRoundKey 是最直接的一步，將 state matrix 與對應 round key 逐 byte 做 XOR。若目前 state 為 $S$、round key 為 $K_i$，則更新為

$$
S \leftarrow S \oplus K_i.
$$

由於 XOR 自反，因此 inverse operation 也是同樣的 XOR。

## Round Structure

在 128-bit block、128-bit key 的版本中，Rijndael 的加密流程如下：

### Initial Round

先做一次

$$
\text{AddRoundKey}(S, K_0).
$$

### Main Rounds

接著做 $9$ 輪，每一輪依序為：

1. SubBytes
2. ShiftRows
3. MixColumns
4. AddRoundKey

也就是對 $i=1,\dots,9$：

$$
S \xrightarrow{\text{SubBytes}} S \xrightarrow{\text{ShiftRows}} S \xrightarrow{\text{MixColumns}} S \xrightarrow{\text{AddRoundKey}(K_i)} S.
$$

### Final Round

最後一輪不做 MixColumns，而是：

1. SubBytes
2. ShiftRows
3. AddRoundKey$(K_{10})$

因此 Rijndael encryption outline 可寫成：

```text
AddRoundKey(S, K0)
for i = 1 to 9 do
    SubBytes(S)
    ShiftRows(S)
    MixColumns(S)
    AddRoundKey(S, Ki)
end
SubBytes(S)
ShiftRows(S)
AddRoundKey(S, K10)
```

解密則依逆序使用 inverse operations，並依序使用反向的 round keys。

## Key Schedule

Rijndael 需要從主金鑰產生多個 round keys。對 128-bit key 版本，主金鑰先切成四個 32-bit words：

$$
(k_0, k_1, k_2, k_3).
$$

round constants 定義為

$$
RC_i = x^i \pmod{x^8 + x^4 + x^3 + x + 1}.
$$

將 round keys 記為 $(W_{4i}, W_{4i+1}, W_{4i+2}, W_{4i+3})$。初始時

$$
W_0 = K_0,\quad W_1 = K_1,\quad W_2 = K_2,\quad W_3 = K_3.
$$

對每個 $i=1,\dots,10$，先計算

$$
T = \text{RotBytes}(W_{4i-1}),
$$

再做

$$
T = \text{SubBytes}(T),
$$

接著加上 round constant：

$$
T = T \oplus RC_i.
$$

然後依序產生四個新 words：

$$
W_{4i} = W_{4i-4} \oplus T,
$$

$$
W_{4i+1} = W_{4i-3} \oplus W_{4i},
$$

$$
W_{4i+2} = W_{4i-2} \oplus W_{4i+1},
$$

$$
W_{4i+3} = W_{4i-1} \oplus W_{4i+2}.
$$

其中 RotBytes 表示將一個 word 以 byte 為單位左旋一格，SubBytes 表示對 word 中每個 byte 套用 Rijndael 的 encryption S-box。

這個 key schedule 的特徵是：每一輪都由前面已知的 words 推出新 words，並透過 RotBytes、SubBytes 與 round constants 打破簡單線性規律。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 8. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
