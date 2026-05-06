---
layout: page
title: AES
date: 2026-03-08
last_updated: 2026-05-06
label:
tags: [CryptoHack, Symmetric Cryptography, AES]
---

> [Symmetric Cryptography Overview](https://cryptohack.org/courses/symmetric/course_details/)

## AES 簡介

`AES`，`Advanced Encryption Standard`，進階加密標準，是目前廣泛使用的對稱式區塊加密演算法，基於 `Rijndael` 設計。它以 `128-bit` 為固定區塊大小，支援 `128-bit`、`192-bit` 與 `256-bit` 三種金鑰長度，分別對應 `10`、`12`、`14` 輪加密。每一輪的主要操作包含 `SubBytes`、`ShiftRows`、`MixColumns` 與 `AddRoundKey`，其中最後一輪會省略 `MixColumns`。這些步驟共同提供混淆與擴散，形成 `AES` 的安全性基礎。

在實務應用上，`AES` 通常會搭配區塊運作模式使用，例如 `CBC`、`CTR`、`GCM`；一般不建議使用 `ECB`，因為它會暴露資料的結構模式。`AES` 在效能與安全性之間取得良好平衡，因此廣泛應用於 `TLS`、磁碟加密、`VPN` 與各種通訊協定。實作時除了演算法本身，也要特別注意 `IV` / `nonce` 的生成方式、金鑰管理，以及時序或功耗分析等側通道攻擊風險。

## Encryption

1. 將 `128-bit` 明文拆成 `16` 個位元組，依 `column-major` 順序填入 `4x4` 的狀態矩陣 `State`。
2. 使用 `Key Expansion` 從原始金鑰推導出所有輪密鑰（`round keys`）。以 `AES-128` 為例，會產生 `11` 個 `128-bit` 輪密鑰，也就是 `Nr = 10`。
3. 初始步驟是執行 `AddRoundKey(state, roundKey[0])`，將狀態矩陣與第 `0` 輪密鑰做 `XOR`。
4. 主迴圈中，對每一輪 `round = 1 .. Nr` 依序執行：
   - `SubBytes`：對每個位元組套用 `S-box`，提供非線性混淆。
   - `ShiftRows`：將各列做循環左移，`row0` 不動、`row1` 左移 `1`、`row2` 左移 `2`、`row3` 左移 `3`，加強位元組間的擴散。
   - 若 `round != Nr`，則執行 `MixColumns`：對每一欄在 `GF(2^8)` 上做矩陣運算，混合欄內的四個位元組。
   - `AddRoundKey`：將目前狀態與當前輪密鑰做 `XOR`。
5. 加密完成後，將 `State` 依原本順序讀出，即可得到 `128-bit` 密文。

解密流程是上述步驟的逆向版本，因此需要改用對應的反向操作。

### Encryption Pseudocode

```text
state = plaintext
state = AddRoundKey(state, roundKey[0])
for round = 1 .. Nr:
    state = SubBytes(state)
    state = ShiftRows(state)
    if round != Nr:
        state = MixColumns(state)
    state = AddRoundKey(state, roundKey[round])
ciphertext = state
```

## Decryption

解密是加密步驟的逆序運算，主要使用 `InvSubBytes`、`InvShiftRows`、`InvMixColumns` 與 `AddRoundKey`。其中 `AddRoundKey` 之所以仍可直接使用，是因為 `XOR` 的逆運算就是 `XOR` 本身。典型流程如下：

1. 將 `128-bit` 密文載入 `4x4` 狀態矩陣 `State`。
2. 先執行 `AddRoundKey(state, roundKey[Nr])`，也就是與最後一輪的輪密鑰做 `XOR`。
3. 主迴圈中，對每一輪 `round = Nr-1` 遞減到 `0`，依序執行：
   - `InvShiftRows(state)`
   - `InvSubBytes(state)`
   - `AddRoundKey(state, roundKey[round])`
   - 若 `round != 0`，則執行 `InvMixColumns(state)`。
4. 完成後即可還原出明文。

### Decryption Pseudocode

```text
state = ciphertext
state = AddRoundKey(state, roundKey[Nr])
for round = Nr-1 downto 0:
    state = InvShiftRows(state)
    state = InvSubBytes(state)
    state = AddRoundKey(state, roundKey[round])
    if round != 0:
        state = InvMixColumns(state)
plaintext = state
```

## Implementation Notes

- `InvMixColumns` 與 `MixColumns` 一樣都在 `GF(2^8)` 上運算，但使用的矩陣係數不同，實作時需要正確使用逆矩陣常數。
- 解密通常沿用加密時產生的 `Key Expansion` 結果，但也可以依實作需求預先整理逆向使用的 `round keys`，或在運算過程中即時轉換。
- `SubBytes` 使用固定的 `S-box`，`MixColumns` 則依賴 `GF(2^8)` 的有限域運算，實作時要注意位元運算與常數 `0x11b` 的模約簡。
- `Key Expansion` 包含 `Rcon`、位移與 `S-box`，若金鑰管理不當或 `round key` 洩露，整體加密安全性也會受到影響。

## Problem

### aes0

> Link: [Keyed Permutations](https://cryptohack.org/courses/symmetric/aes0/)

這題主要是在建立對 AES 結構的直覺，先理解它是 keyed permutation，而不是單純把資料做固定變換。

### aes1

> Link: [Resisting Bruteforce](https://cryptohack.org/courses/symmetric/aes1/)

這題重點是金鑰空間與暴力破解成本，幫助建立後面進入 `AES-128` 時對安全性的基本感覺。

### aes2

> Link: [Structure of AES](https://cryptohack.org/courses/symmetric/aes2/)
> File: `matrix.py`

這題要實作 `matrix2bytes`，把 `4x4` 的 state matrix 依目前矩陣中的排列順序展平成一串位元組，最後再轉成 `bytes`。

```python
def matrix2bytes(matrix):
    return bytes(sum(matrix, []))
```

做法就是先把二維矩陣攤平成一維串列，再用 `bytes(...)` 組回輸出。

### aes3

> Link: [Round Keys](https://cryptohack.org/courses/symmetric/aes3/)
> File: `add_round_key.py`

這題是實作 `AddRoundKey`，也就是把 `state` 和 `round key` 對應位置逐一做 `XOR`。

```python
def add_round_key(s, k):
    return [[ss ^ kk for ss, kk in zip(s_row, k_row)]
            for s_row, k_row in zip(s, k)]
```

### aes4

> Link: [Confusion through Substitution](https://cryptohack.org/courses/symmetric/aes4/)
> File: `sbox.py`

這題要做 `SubBytes`，把 state 中的每個 byte 經過 `S-box` 查表轉換。

```python
def sub_bytes(s, sbox=s_box):
    return [[sbox[ss] for ss in s_row] for s_row in s]
```

### aes5

> Link: [Diffusion through Permutation](https://cryptohack.org/courses/symmetric/aes5/)
> File: `diffusion.py`

這題主要是實作 `InvShiftRows`，把每一列依照列索引往右循環移回去，抵消原本 `ShiftRows` 造成的位移。

```python
def inv_shift_rows(s):
    s[1][1], s[2][1], s[3][1], s[0][1] = s[0][1], s[1][1], s[2][1], s[3][1]
    s[2][2], s[3][2], s[0][2], s[1][2] = s[0][2], s[1][2], s[2][2], s[3][2]
    s[3][3], s[0][3], s[1][3], s[2][3] = s[0][3], s[1][3], s[2][3], s[3][3]
```

### aes6

> Link: [Bringing It All Together](https://cryptohack.org/courses/symmetric/aes6/)
> File: `aes_decrypt.py`

這題是把前面拆開的元件串成完整 `AES` 解密流程：先展開 `round keys`，再依照 `InvShiftRows -> InvSubBytes -> AddRoundKey -> InvMixColumns` 的順序逐輪還原。

```python
def decrypt(key, ciphertext):
    round_keys = expand_key(key)

    state = bytes2matrix(ciphertext)
    state = add_round_key(state, round_keys[N_ROUNDS])

    for round_index in range(N_ROUNDS - 1, 0, -1):
        inv_shift_rows(state)

        for i in range(4):
            for j in range(4):
                state[i][j] = inv_s_box[state[i][j]]

        state = add_round_key(state, round_keys[round_index])
        inv_mix_columns(state)

    inv_shift_rows(state)
    for i in range(4):
        for j in range(4):
            state[i][j] = inv_s_box[state[i][j]]
    state = add_round_key(state, round_keys[0])

    return matrix2bytes(state)
```
