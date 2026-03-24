---
layout: page
title: Knapsack-Based Cryptosystems
date: 2026-03-24
last_updated: 2026-03-24
tags: [knapsack, Merkle-Hellman, LLL, lattice]
---

Knapsack-based cryptosystems 是早期 public-key cryptography 的一類構造，其核心想法是：選擇一個看似困難的 **subset sum problem** 作為公開金鑰，並保留某些 private trapdoor information，使得合法接收者可以有效率地解出對應的 knapsack instance。

這類系統背後的直覺與 RSA 有些相似：公開的是一個對外看起來困難的問題，而私鑰持有者則知道如何把它轉回容易處理的形式。不過，knapsack 類問題雖然在一般情況下被認為困難，實際上卻不容易構造出在平均情況下也足夠困難的實例。因此，早期的 knapsack-based cryptosystems 後來大多被證明不安全。

在這一節中，最重要的例子是 **Merkle--Hellman knapsack cryptosystem**。它以一個容易求解的 **super-increasing knapsack** 作為私鑰，再透過模運算將其轉換成看似困難的公開 knapsack。然而，這樣的公開結構仍然保留了可被利用的規律，最終可透過 lattice-based 方法加以破解。

## super-increasing knapsack

若一組 weights
$$
\{w_1,w_2,\dots,w_n\}
$$
滿足對每個 $j \ge 2$ 都有
$$
w_j > \sum_{i=1}^{j-1} w_i,
$$
則稱這組 weights 為 **super-increasing**。

例如：
$$
\{2,3,6,13,27,52\}
$$
就是一組 super-increasing sequence，因為
$$
3>2,\qquad 6>2+3,\qquad 13>2+3+6,
$$
依此類推。

這種 knapsack 特別容易解，原因在於最大的 weight 若不超過目前目標值 $S$，那麼它必定應該被選入解中；反之則不應選入。因此可以從最大的 weight 開始一路往回檢查，使用 greedy 的方式在線性時間內求解。

### Algorithm to solve super-increasing knapsack

<div class="algorithm">

<ul>
  <li>輸入一組 super-increasing weights
    $$
    \{w_1,w_2,\dots,w_n\}
    $$
    與目標值 $S$。
  </li>
  <li>對 $i=n,n-1,\dots,1$ 依序進行以下步驟：</li>
  <li>若
    $$
    S \ge w_i,
    $$
    則令
    $$
    b_i=1,
    $$
    並更新
    $$
    S \leftarrow S-w_i.
    $$
  </li>
  <li>否則令
    $$
    b_i=0.
    $$
  </li>
  <li>當所有位置都處理完成後：
    <ul>
      <li>若最後
        $$
        S=0,
        $$
        則輸出
        $$
        (b_1,b_2,\dots,b_n).
        $$
      </li>
      <li>若
        $$
        S\neq 0,
        $$
        則輸出 <code>No Solution</code>。
      </li>
    </ul>
  </li>
</ul>

</div>

這個演算法之所以正確，關鍵就在於 super-increasing 的條件保證了：每一步對目前最大 weight 的判斷都是唯一且不會後悔的。因此，相較於一般 subset sum problem，super-increasing knapsack 是非常容易處理的。

## Merkle--Hellman Knapsack Cryptosystem

Merkle--Hellman cryptosystem 的設計目標，是將一個容易解的 super-increasing knapsack 隱藏成一個看起來困難的 knapsack，並把後者當作 public key。

### Key generation

先選擇一組私密的 super-increasing sequence：
$$
\{w_1,w_2,\dots,w_n\}.
$$

再選擇兩個私密整數 $N$ 與 $M$，使得
$$
\gcd(N,M)=1.
$$

然後定義公開 weights 為
$$
w_i' \equiv Nw_i \pmod M,\qquad 1\le i\le n.
$$

公開金鑰就是
$$
\{w_1',w_2',\dots,w_n'\},
$$
而私鑰則包含原本的 super-increasing sequence 以及 $(N,M)$。

這樣的想法是：對外公開的是一個看起來一般的 knapsack problem，但知道私密參數的人可以把它轉回原本容易的 super-increasing knapsack。

### Encryption

將明文分成長度為 $n$ 的 bit blocks。對於一個 block
$$
(b_1,b_2,\dots,b_n)\in\{0,1\}^n,
$$
密文定義為
$$
c=\sum_{i=1}^n b_iw_i'.
$$

也就是說，凡是 bit 為 $1$ 的位置，就把對應的 public weight 加總起來。

### Example

<div class="example">

取私鑰中的 super-increasing knapsack 為
$$
\{2,3,6,13,27,52\},
$$
並選擇
$$
N=31,\qquad M=105.
$$

由此得到公開 knapsack：
$$
\{62,93,81,88,102,37\}.
$$

若明文分成三個 blocks：
$$
011000,\qquad 110101,\qquad 101110,
$$
則加密結果為：

<ul>
  <li>
    $$
    011000 \longmapsto 93+81=174
    $$
  </li>
  <li>
    $$
    110101 \longmapsto 62+93+88+37=280
    $$
  </li>
  <li>
    $$
    101110 \longmapsto 62+81+88+102=333
    $$
  </li>
</ul>

因此密文為
$$
174,\ 280,\ 333.
$$

</div>

### Decryption

合法接收者知道私鑰中的 $N,M$ 以及原本的 super-increasing sequence。由於
$$
\gcd(N,M)=1,
$$
所以 $N$ 在模 $M$ 下存在反元素 $N^{-1}$。接收者可以對每個 ciphertext block $c$ 計算
$$
c' \equiv N^{-1}c \pmod M.
$$

這樣就能把公開的 hard knapsack 轉回私密的 easy knapsack，然後再使用 super-increasing knapsack 的線性時間演算法解出 bit string。

在上面的例子中，
$$
N^{-1}\equiv 61 \pmod{105}.
$$

因此：

<ul>
  <li>
    $$
    174\cdot 61 \equiv 9 \pmod{105},
    $$
    而
    $$
    9=3+6,
    $$
    所以得到
    $$
    011000.
    $$
  </li>
  <li>
    $$
    280\cdot 61 \equiv 70 \pmod{105},
    $$
    而
    $$
    70=2+3+13+52,
    $$
    所以得到
    $$
    110101.
    $$
  </li>
  <li>
    $$
    333\cdot 61 \equiv 48 \pmod{105},
    $$
    而
    $$
    48=2+6+13+27,
    $$
    所以得到
    $$
    101110.
    $$
  </li>
</ul>

因此接收者可以成功還原原始明文。

## Why the Merkle--Hellman Scheme Fails

Merkle--Hellman 的基本設計雖然很巧妙，但它最終仍然是不安全的。問題不在於合法接收者的解密流程，而在於它所產生的 public knapsack 並不是真正隨機且困難的 knapsack，而是保留了某種特殊結構。

為了說明這件事，先定義一組 knapsack weights
$$
\{w_1,\dots,w_n\}
$$
的 **density** 為
$$
d=\frac{n}{\max\{\log_2 w_i:1\le i\le n\}}.
$$

當 density 偏低時，這類 knapsack 通常可以利用 **lattice basis reduction** 的方法有效求解。Merkle--Hellman 的問題就在於：它所產生的 public knapsack 會形成 **low-density knapsack**，因此容易受到 lattice-based attack。

所以這個系統雖然試圖把 easy knapsack 偽裝成 hard knapsack，但這種偽裝並不夠徹底。攻擊者不需要知道私鑰，也能從公開 weights 的結構中恢復出對應的 solution。

## LLL algorithm

LLL algorithm 是 Lenstra--Lenstra--Lovász 提出的 lattice basis reduction 演算法。它的目的是把一組 lattice basis 轉換成另一組較「短」且較「接近正交」的 basis。雖然 LLL 不一定能找出最短向量，但在很多實務情況下，它能有效找到相當短的向量，因此成為分析格問題的重要工具。

在 low-density knapsack attack 中，會把 subset sum problem 轉換成一個 lattice 問題。假設我們想解的是
$$
\sum_{i=1}^n b_iw_i=S,\qquad b_i\in\{0,1\}.
$$

可以構造一個 $(n+1)$ 維 lattice，其生成矩陣為
$$
A=
\begin{pmatrix}
1&0&0&\cdots&0&\frac12\\
0&1&0&\cdots&0&\frac12\\
0&0&1&\cdots&0&\frac12\\
\vdots&\vdots&\vdots&\ddots&\vdots&\vdots\\
0&0&0&\cdots&1&\frac12\\
w_1&w_2&w_3&\cdots&w_n&S
\end{pmatrix}.
$$

若原本 knapsack 的解為 bit vector
$$
(b_1,\dots,b_n),
$$
則令
$$
x=(b_1,\dots,b_n,-1).
$$
對應的 lattice vector
$$
y=A\cdot x
$$
會滿足
$$
y_i=
\begin{cases}
b_i-\frac12,&1\le i\le n,\\
0,&i=n+1.
\end{cases}
$$

因此這個向量非常短，因為它的長度滿足
$$
\|y\|<\frac{\sqrt{n}}{2}.
$$

而在 low-density knapsack 所對應的 lattice 中，這樣的向量通常顯得特別短。若此時對矩陣 $A$ 套用 LLL algorithm，得到一組 reduced basis，則新的第一個 basis vector 很可能就是這個短向量，進而讓攻擊者恢復出原本的 bit solution。

從這個角度來看，LLL attack 並不是直接暴力解 subset sum，而是把問題轉換到 lattice 中，再利用幾何結構找出隱藏的短向量。這也是為什麼 Merkle--Hellman 雖然建立在 knapsack problem 之上，卻仍然能被有效攻破。

## Remarks

Knapsack-based cryptosystems 在密碼學史上具有重要意義，因為它們展示了從 combinatorial hard problem 建構 public-key cryptography 的早期嘗試。不過，這類系統的失敗也說明了一個關鍵事實：

一般問題在複雜度理論上很難，並不代表它所誘導出的隨機實例也同樣適合作為密碼基礎。

Merkle--Hellman 的例子正好反映出這一點。即使一般 knapsack problem 很難，但特定構造出的公開 knapsack 仍可能因為具有可利用的代數或幾何結構，而被 lattice-based techniques 成功破解。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 19. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
