---
layout: page
title: Knapsack-Based Cryptosystems
date: 2026-03-24
last_updated: 2026-03-24
tags: [knapsack, Merkle-Hellman, LLL, lattice]
---

Knapsack-based cryptosystems 是早期 public-key cryptography 的一類構造，其核心想法是：選擇一個看似困難的 **subset sum problem** 作為公開金鑰，並保留某些 private trapdoor information，使得合法接收者可以有效率地解出對應的 knapsack instance。

這類系統背後的直覺與 RSA 有些相似：公開的是一個對外看起來困難的問題，而私鑰持有者則知道如何把它轉回容易處理的形式。不過，knapsack 類問題雖然在一般情況下被認為困難，實際上卻不容易構造出在平均情況下也足夠困難的實例。因此，早期的 knapsack-based cryptosystems 後來大多被證明不安全。

<div class="remark">
<strong>Remark.</strong>
這裡的重點不是一般的 knapsack problem 是否困難，而是由加密系統產生出的實例是否在平均情況下仍然足夠困難。複雜度理論中的 worst-case hardness，並不會自動保證密碼學上需要的 average-case hardness。
</div>

在這一節中，最重要的例子是 **Merkle-Hellman knapsack cryptosystem**。它以一個容易求解的 **super-increasing knapsack** 作為私鑰，再透過模運算將其轉換成看似困難的公開 knapsack。然而，這樣的公開結構仍然保留了可被利用的規律，最終可透過 lattice-based 方法加以破解。

## Super-Increasing Knapsack

若一組 weights $\{w_1,w_2,\dots,w_n\}$ 滿足對每個 $j \ge 2$ 都有

$$
w_j > \sum_{i=1}^{j-1} w_i,
$$

則稱這組 weights 為 **super-increasing**。

<div class="example">
<strong>Example.</strong>
序列 $\{2,3,6,13,27,52\}$ 是一組 super-increasing sequence

因為 $3>2$、$6>2+3$、$13>2+3+6$，依此類推，每一項都大於前面所有項的總和。
</div>

這種 knapsack 特別容易解，原因在於最大的 weight 若不超過目前目標值 $S$，那麼它必定應該被選入解中；反之則不應選入。因此可以從最大的 weight 開始一路往回檢查，使用 greedy 的方式在線性時間內求解。

<div class="remark">
<strong>Remark.</strong>
一般的 subset sum problem 並不能直接用這種 greedy 方法處理；super-increasing 的特殊性，正是在於它保證了每一步局部決策都是正確的。
</div>

### Algorithm to Solve Super-Increasing Knapsack

給定一組依序排列的 super-increasing weights 與目標值 $S$，可用以下 greedy 步驟求解。

<div class="algorithm">
<strong>Steps.</strong>

<ol>
  <li>令目標值為 $S$。</li>
  <li>對 $i=n,n-1,\dots,1$：</li>
  <li>
    若 $S \ge w_i$，則令 $b_i=1$，並將 $S$ 更新為 $S-w_i$；
    否則令 $b_i=0$。
  </li>
  <li>當所有 $i$ 都處理完後，檢查剩餘的 $S$。</li>
  <li>若 $S=0$，輸出 $(b_1,b_2,\dots,b_n)$。</li>
  <li>若 $S\neq 0$，輸出 <code>No Solution</code>。</li>
</ol>

</div>

這個演算法之所以正確，關鍵就在於 super-increasing 的條件保證了：每一步對目前最大 weight 的判斷都是唯一且不會後悔的。因此，相較於一般 subset sum problem，super-increasing knapsack 是非常容易處理的。

<div class="example">
<strong>Example.</strong>
若 weights 為 $\{2,3,6,13,27,52\}$，目標值為 $S=70$，則可由大到小依序檢查：

<ul>
  <li>$70 \ge 52$，因此選取 $52$，剩餘值變為 $18$；</li>
  <li>$18 < 27$，因此不選 $27$；</li>
  <li>$18 \ge 13$，因此選取 $13$，剩餘值變為 $5$；</li>
  <li>$5 < 6$，因此不選 $6$；</li>
  <li>$5 \ge 3$，因此選取 $3$，剩餘值變為 $2$；</li>
  <li>$2 \ge 2$，因此選取 $2$，剩餘值變為 $0$。</li>
</ul>

因此得到 $70=2+3+13+52$，對應的 bit string 為 $110101$。
</div>

## Merkle-Hellman Knapsack Cryptosystem

Merkle-Hellman cryptosystem 的設計目標，是將一個容易解的 super-increasing knapsack 隱藏成一個看起來困難的 knapsack，並把後者當作 public key。

### Key Generation

Merkle-Hellman cryptosystem 的 key generation 過程如下：

<ol>
  <li>選擇一組私密的 super-increasing sequence $\{w_1,w_2,\dots,w_n\}$。</li>
  <li>選擇兩個私密整數 $N$ 與 $M$，滿足 $\gcd(N,M)=1$。</li>
  <li>對每個 $i=1,2,\dots,n$，計算
    $w_i' \equiv Nw_i \pmod M$。
  </li>
  <li>以 $\{w_1',w_2',\dots,w_n'\}$ 作為 public key。</li>
  <li>以原本的 super-increasing sequence 與 $(N,M)$ 作為 private key。</li>
</ol>

公開 weights 所形成的是一個看似一般的 knapsack instance；然而，知道私密參數的人可以將其轉回原本容易求解的 super-increasing knapsack。

<div class="remark">
<strong>Remark.</strong>
若直接公開原本的 super-increasing sequence，攻擊者便可利用 greedy 方法有效解密。因此，Merkle-Hellman 的核心設計就是透過模乘將這個 easy instance 隱藏起來。
</div>

### Encryption

將明文分成長度為 $n$ 的 bit blocks。對於一個 block $(b_1,b_2,\dots,b_n)\in\{0,1\}^n$，密文定義為 $c=\sum_{i=1}^n b_iw_i'$。

也就是說，凡是 bit 為 $1$ 的位置，就把對應的 public weight 加總起來。

<div class="remark">
<strong>Remark.</strong>
從加密者的角度來看，這只是單純計算一個公開的加權總和；真正讓系統成立的是，合法接收者可以利用私鑰把這個總和重新轉回 super-increasing knapsack。
</div>

<div class="example">
<strong>Example.</strong>

取私鑰中的 super-increasing knapsack 為 $\{2,3,6,13,27,52\}$，並選擇 $N=31,\ M=105$。

由此得到公開 knapsack： $\{62,93,81,88,102,37\}$

若明文分成三個 blocks：
<ul>
  <li>$011000$</li>
  <li>$110101$</li>
  <li>$101110$</li>
</ul>

則加密結果為：

<ul>
  <li>$011000 \longmapsto 93+81=174$</li>
  <li>$110101 \longmapsto 62+93+88+37=280$</li>
  <li>$101110 \longmapsto 62+81+88+102=333$</li>
</ul>

因此密文為
$174,\ 280,\ 333$。

</div>

### Decryption

合法接收者知道私鑰中的 $N,M$ 以及原本的 super-increasing sequence。因為 $\gcd(N,M)=1$，所以 $N$ 在模 $M$ 下存在反元素 $N^{-1}$。對每個 ciphertext block $c$，接收者計算 $c' \equiv N^{-1}c \pmod M$，即可將公開的 hard knapsack 轉回私密的 easy knapsack，再利用 super-increasing knapsack 的演算法恢復對應的 bit string。

<div class="example">
<strong>Example.</strong>

在上面的例子中，$N^{-1}\equiv 61 \pmod{105}$。

因此：

<ul>
  <li>$174\cdot 61 \equiv 9 \pmod{105}$，而 $9=3+6$，所以得到 $011000$。</li>
  <li>$280\cdot 61 \equiv 70 \pmod{105}$，而 $70=2+3+13+52$，所以得到 $110101$。</li>
  <li>$333\cdot 61 \equiv 48 \pmod{105}$，而 $48=2+6+13+27$，所以得到 $101110$。</li>
</ul>

因此接收者可以成功還原原始明文。
</div>

<div class="remark">
<strong>Remark.</strong>
解密的本質不是直接解公開 knapsack，而是先利用私鑰把它變回容易求解的 super-increasing knapsack。這就是 trapdoor 的作用。
</div>

## Why the Merkle-Hellman Scheme Fails

Merkle-Hellman 的基本設計雖然很巧妙，但它最終仍然是不安全的。問題不在於合法接收者的解密流程，而在於它所產生的 public knapsack 並不是真正隨機且困難的 knapsack，而是保留了某種特殊結構。

為了說明這件事，對一組 knapsack weights $\{w_1,\dots,w_n\}$，定義其 density 為

$$
d=\frac{n}{\max\{\log_2 w_i:1\le i\le n\}}.
$$

當 density 偏低時，這類 knapsack 通常可以利用 **lattice basis reduction** 的方法有效求解。Merkle-Hellman 的問題就在於：它所產生的 public knapsack 會形成 **low-density knapsack**，因此容易受到 lattice-based attack。

<div class="remark">
<strong>Remark.</strong>
這裡的失敗重點不是「背包問題不夠難」，而是「這個系統產生的背包太有結構」。也就是說，問題出在 cryptosystem 的 instance distribution，而不是 subset sum 本身的理論難度。
</div>

所以這個系統雖然試圖把 easy knapsack 偽裝成 hard knapsack，但這種偽裝並不夠徹底。攻擊者不需要知道私鑰，也能從公開 weights 的結構中恢復出對應的 solution。

## LLL Algorithm

LLL Algorithm 是 Lenstra--Lenstra--Lovász 提出的 lattice basis reduction 演算法。它的目的是將一組 lattice basis 轉換成另一組較短且較接近正交的 basis。雖然 LLL 不一定能找出最短向量，但在許多實務情況下，它能有效找到相當短的向量，因此成為分析 lattice problem 的重要工具。

在 low-density knapsack attack 中，subset sum problem 可以轉換成一個 lattice problem。假設我們想解的是

$$
\sum_{i=1}^n b_iw_i=S,\quad b_i\in\{0,1\}.
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

若原本 knapsack 的解為 bit vector $(b_1, \dots, b_n)$，則考慮向量

$$
x=
\begin{pmatrix}
b_1\\
\vdots\\
b_n\\
-1
\end{pmatrix}
$$

對應的 lattice vector $y=Ax$ 會滿足

$$
y_i=
\begin{cases}
b_i-\frac12,&1\le i\le n,\\
0,&i=n+1.
\end{cases}
$$

因此，$y$ 會是一個非常短的向量，因為它的長度滿足

$$
\|y\|
= \sqrt{y_1^2+y_2^2+\cdots+y_n^2+y_{n+1}^2}
<\frac{\sqrt{n}}{2}.
$$

<div class="remark">
<strong>Remark.</strong>
這裡的關鍵觀察是：原本的 bit solution 會對應到 lattice 中的一個特別短的向量。因此，攻擊者不必直接枚舉所有 bit string，而可以改成在對應的 lattice 中尋找短向量。
</div>

在 low-density knapsack 所對應的 lattice 中，這樣的向量通常會顯得特別短。若此時對矩陣 $A$ 套用 LLL Algorithm，得到一組 reduced basis，則新的第一個 basis vector 很可能就是這個短向量，進而使攻擊者恢復出原本的 bit solution。

<div class="example">
<strong>Example.</strong>
若某個 knapsack instance 的解為 $(b_1,b_2,b_3,b_4)=(1,0,1,1)$，則在對應的 lattice 構造中，會考慮向量
$$
x=
\begin{pmatrix}
1\\
0\\
1\\
1\\
-1
\end{pmatrix}.
$$
乘上生成矩陣後，可得到一個最後一座標為 $0$、其餘座標都形如 $b_i-\frac12$ 的短向量。由於前面各座標只會是 $\frac12$ 或 $-\frac12$，因此整體長度很小，也就使得這個向量容易成為 LLL reduction 的目標。
</div>

從這個角度來看，LLL attack 並不是直接暴力解 subset sum problem，而是先將問題轉換到 lattice 中，再利用其幾何結構找出隱藏的短向量。這也是為什麼 Merkle--Hellman 雖然建立在 knapsack problem 之上，卻仍然能被有效攻破。

<div class="example">
<strong>Example.</strong>
延續前面的例子，考慮公開 knapsack $\{62,93,81,88,102,37\}$ 與 target $S=174$，也就是要求解
$$
62b_1+93b_2+81b_3+88b_4+102b_5+37b_6=174.
$$

依照上述 lattice construction，可構造對應矩陣
$$
A=
\begin{pmatrix}
1&0&0&0&0&0&\frac12\\
0&1&0&0&0&0&\frac12\\
0&0&1&0&0&0&\frac12\\
0&0&0&1&0&0&\frac12\\
0&0&0&0&1&0&\frac12\\
0&0&0&0&0&1&\frac12\\
62&93&81&88&102&37&174
\end{pmatrix}.
$$

對此矩陣套用 LLL Algorithm 後，可得到新的 lattice basis
$$
A'=
\frac12
\begin{pmatrix}
1&-1&-2&2&3&2&0\\
-1&-3&0&-2&-1&-2&0\\
-1&-1&-2&2&-1&2&0\\
1&-1&-2&0&-1&-2&-2\\
1&-1&0&2&-3&0&4\\
1&1&0&-2&1&2&0\\
0&0&-2&0&0&-2&2
\end{pmatrix}.
$$

在這組 reduced basis 中，可取一個很短的向量
$$
y=
\frac12
\begin{pmatrix}
1\\
-1\\
-1\\
1\\
1\\
1\\
0
\end{pmatrix}.
$$

再由 $Ax=y$，可得到
$$
x=A^{-1}y=
\begin{pmatrix}
0\\
-1\\
-1\\
0\\
0\\
0\\
1
\end{pmatrix},
$$
可進一步恢復出對應的 bit solution
$$
(b_1,b_2,b_3,b_4,b_5,b_6)=(0,1,1,0,0,0),
$$
也就是
$$
011000.
$$

這正好對應前面 encryption 與 decryption 例子中的第一個 ciphertext block，因為
$$
93+81=174.
$$
因此，即使不知道私鑰，攻擊者仍可能透過 LLL reduction 從公開 knapsack 中恢復出對應的 bit solution。
</div>

---

Knapsack-based cryptosystems 在密碼學史上具有重要意義，因為它們展示了從 combinatorial hard problem 建構 public-key cryptography 的早期嘗試。不過，這類系統的失敗也說明了一個關鍵事實：一般問題在複雜度理論上很難，並不代表它所誘導出的隨機實例也同樣適合作為密碼基礎。

<div class="remark">
<strong>Remark.</strong>
Merkle-Hellman 的例子提醒我們：設計加密系統時，不能只依賴「底層問題很難」這一點，還必須考慮公開參數是否引入了額外結構，讓攻擊者可以使用更強的工具繞過原本的困難性。
</div>

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 19. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
