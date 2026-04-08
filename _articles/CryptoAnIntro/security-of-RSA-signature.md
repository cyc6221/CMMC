---
layout: page
title: Security of RSA Signature
date: 2026-03-26
last_updated: 2026-04-08
tags: [RSA, signature, random-oracle, FDH, RSA-PSS]
---

RSA-based signature 的安全性，通常放在 [random oracle model]({{ "/articles/Cryptology/ROM/" | relative_url }}) 下討論。這裡有兩個經典方案：**RSA with Full-Domain Hashing (FDH)** 與 **RSA-PSS**。前者的結構直接，適合說明如何把「偽造簽章」歸約成「反轉 RSA function」；後者則透過隨機化與編碼機制，形成更完整的簽章設計。兩者都建立在 RSA inversion 的困難性之上，但在簽章形式、驗證方式與安全性證明的技術細節上有所不同。

## RSA with Full-Domain Hashing (FDH)

RSA-FDH 的核心想法是：先將訊息經過一個值域覆蓋整個 RSA domain 的 hash function，再用 RSA 私鑰對其做反演。設 $N$ 是 RSA modulus，公開指數為 $e$，私密指數為 $d$，定義 RSA function

$$
f:(\mathbb Z/N\mathbb Z)^\ast \to (\mathbb Z/N\mathbb Z)^\ast,\qquad f(x)=x^e \bmod N.
$$

RSA problem 就是：給定 $y=f(x)$，求出 $x$。

在 RSA-FDH 中，令

$$
H:\{0,1\}^\ast \to (\mathbb Z/N\mathbb Z)^\ast.
$$

對訊息 $m$ 的簽章定義為

$$
s = H(m)^d = f^{-1}(H(m)).
$$

驗證時檢查

$$
s^e \equiv H(m) \pmod N.
$$

若成立，就接受此簽章。這種形式非常直接：**簽章就是對 hash value 做 RSA inversion**。

<div class="remark">
<strong>Remark.</strong>
FDH 中的「full-domain hash」是指 $H$ 的輸出直接落在 $(\mathbb Z/N\mathbb Z)^\ast$ 中。這使得簽章可以寫成 $s=H(m)^d \bmod N$，也使 security reduction 的形式相當自然。在理論分析中，這種 hash function 通常以 random oracle 來建模。
</div>

### Security Intuition

設 adversary $A$ 可以在 random oracle model 下對 RSA-FDH 做 **existential forgery under active attack**。也就是說，$A$ 可以：

1. 查詢 hash oracle；
2. 查詢 signing oracle；
3. 最後輸出某個新訊息 $m$ 的有效簽章 $s$，而且這個 $m$ 並沒有被要求簽過。

要證明 RSA-FDH 的安全性，可以構造一個 reduction algorithm $B^A$，利用 $A$ 來反轉給定的 RSA challenge $y$。

做法是：$B^A$ 從 $A$ 的所有 hash queries 中，隨機挑一個位置 $t$，把那一次 hash query 的答案直接設成 challenge $y$。若最後 $A$ 恰好在那個訊息上輸出 forgery，則因為有效簽章必須滿足

$$
s^e \equiv H(m) \pmod N,
$$

而此時 $H(m)=y$，所以得到

$$
s^e \equiv y \pmod N.
$$

因此 $s$ 就是 $y$ 的 RSA inverse。

<div class="theorem">
<strong>Theorem 20.4.</strong>
In the random oracle model if an active adversary $A$ exists which produces an existential forgery for RSA-FDH, which requires $q_H$ hash queries and $q_S$ signature queries, then there is an algorithm which given $y$ can invert the RSA function on $y$ with probability $1/q_H$.
</div>

<div class="proof">
<strong>Proof.</strong>
設 reduction $B^A$ 的輸入是一個 RSA challenge $y \in (\mathbb Z/N\mathbb Z)^\ast$，目標是求出 $x$ 使得 $x^e \equiv y \pmod N$。

首先，$B^A$ 在 $\{1,\dots,q_H\}$ 中均勻隨機選一個索引 $t$，把它視為將要嵌入 challenge 的那一次 hash query。接著 $B^A$ 開始模擬 $A$ 的 oracle view。

對於第 $i$ 次 hash query，若查詢訊息為 $m_i$，則分兩種情況：

若 $i=t$，直接定義
$$
H(m_t)=y.
$$

若 $i\neq t$，則自行隨機選一個
$$
s_i \in (\mathbb Z/N\mathbb Z)^\ast,
$$
並定義
$$
H(m_i)=s_i^e \bmod N.
$$

這樣一來，對所有 $i\neq t$ 的訊息，都已知對應的 RSA inverse，因為
$$
f(s_i)=s_i^e=H(m_i)\pmod N.
$$
所以若 adversary 之後要求簽署這些訊息，就可以直接回覆簽章 $s_i$。

接著處理 signing queries。若 $A$ 要求簽署某個訊息 $m_i$，但尚未做過對應的 hash query，就先替它補做 hash query，再回應簽章。

- 若 $m_i=m_t$，則模擬失敗並中止。因為此時 $H(m_t)=y$，而 $B^A$ 並不知道 $y$ 的 RSA inverse。
- 若 $m_i\neq m_t$，則由先前設計，已知某個 $s_i$ 滿足
  $$
  s_i^e \equiv H(m_i) \pmod N,
  $$
  因此可以合法回覆簽章 $s_i$。

最後，假設 $A$ 輸出一組 forgery $(m,s)$。由於這是一個有效簽章，必有
$$
s^e \equiv H(m) \pmod N.
$$

又因為這是 existential forgery，訊息 $m$ 不能是先前問過 signing oracle 的訊息。

若 $m\neq m_t$，則這次無法從 forgery 中得到 RSA inversion。

若 $m=m_t$，則由模擬方式知
$$
H(m_t)=y,
$$
故
$$
s^e \equiv H(m_t)=y \pmod N.
$$
因此 $s$ 正是一個滿足 $f(s)=y$ 的值，也就是 $y$ 的 RSA inverse。

接著分析成功機率。$B^A$ 是在 $q_H$ 次 hash queries 中隨機選一個位置 $t$ 來埋入 challenge。若 adversary 最後成功偽造的訊息剛好對應到第 $t$ 次 hash query，則 reduction 成功。由於 $t$ 是均勻隨機選的，因此成功機率為
$$
\frac{1}{q_H}.
$$

於是得到結論：若存在能偽造 RSA-FDH 的 active adversary，則可利用它以機率 $1/q_H$ 反轉 RSA function。
</div>

### Why This Reduction Works

這個 proof 的關鍵有兩點。

第一，對所有不是第 $t$ 個的 hash query，$B^A$ 都故意把 hash value 設成某個隨機值的 $e$ 次方，也就是

$$
H(m_i)=s_i^e.
$$

因此自然知道對應的簽章 $s_i$，可以完整模擬 signing oracle。

第二，真正無法簽署的，只有那一個被嵌入 challenge 的位置 $t$，因為那裡的 hash value 被設成 $y$。所以 reduction 是否成功，取決於 adversary 最後偽造的目標訊息，是否剛好落在這個位置上。

也正因如此，這個 reduction 不是 tight 的；它會損失一個大約 $q_H$ 的因子，這也就是 theorem 中成功機率只有 $1/q_H$ 的原因。

<div class="remark">
<strong>Remark.</strong>
RSA-FDH 的安全性證明典型地呈現了 random oracle proof 的做法：reduction 並不是被動接受一個固定的 hash function，而是主動地編程 random oracle 的輸出，使某個特定查詢點對應到 RSA inversion challenge。整個 proof 的關鍵，就在於這種 oracle programmability。
</div>

## RSA-PSS

RSA-PSS（Probabilistic Signature Scheme）是另一個重要的 RSA-based signature。與 FDH 相比，它的主要特色是：**簽章時會加入隨機性**，因此同一則訊息即使重複簽署，也不一定得到相同簽章。其安全性同樣在 random oracle model 下討論，但設計上不需要直接使用 full-domain hash，而是透過隨機值、hash 與編碼結構共同形成待簽署的 RSA input。

### Parameters and Functions

設 RSA modulus $N$ 的位元長度為 $k$，公開指數為 $e$，私密指數為 $d$。選兩個整數 $k_0,k_1$，滿足

$$
k_0+k_1 \le k-1.
$$

再定義兩個函數：

$$
G:\{0,1\}^{k_1} \to \{0,1\}^{k-k_1-1},
$$

以及

$$
H:\{0,1\}^\ast \to \{0,1\}^{k_1}.
$$

其中 $G$ 是擴展型函數，$H$ 是壓縮型 hash function。再將 $G$ 分成前後兩段：

$$
G_1:\{0,1\}^{k_1}\to\{0,1\}^{k_0},
$$

表示取 $G(w)$ 的前 $k_0$ bits；以及

$$
G_2:\{0,1\}^{k_1}\to\{0,1\}^{k-k_0-k_1-1},
$$

表示取 $G(w)$ 的後 $k-k_0-k_1-1$ bits。

### Signing Process

對訊息 $m$ 進行簽章時，先隨機產生一個長度為 $k_0$ 的 bit string：

$$
r \in \{0,1\}^{k_0}.
$$

接著計算

$$
w = H(m\|r).
$$

然後組出一個長度為 $k$ bits 的編碼值

$$
y = 0 \| w \| (G_1(w)\oplus r)\|G_2(w).
$$

最後輸出簽章

$$
s = y^d \bmod N.
$$

也就是說，RSA-PSS 並不是直接對 $H(m)$ 做 RSA inversion，而是先把訊息 $m$ 與隨機值 $r$ 混合，再經過特定的編碼結構形成 $y$，最後才對 $y$ 做 RSA inversion。

### Verification Process

收到訊息 $m$ 與簽章 $s$ 後，驗證者先計算

$$
y = s^e \bmod N.
$$

再把 $y$ 切成

$$
b \| w \| \alpha \| \gamma,
$$

其中：

- $b$ 長度為 1 bit，
- $w$ 長度為 $k_1$ bits，
- $\alpha$ 長度為 $k_0$ bits，
- $\gamma$ 長度為 $k-k_0-k_1-1$ bits。

接著由 $\alpha$ 與 $w$ 恢復出

$$
r = \alpha \oplus G_1(w).
$$

最後檢查以下三個條件是否同時成立：

$$
b=0,\qquad G_2(w)=\gamma,\qquad H(m\|r)=w.
$$

只有當三者都成立時，簽章才接受。

### Why Verification Works

若簽章是合法產生的，則簽章者原本設定

$$
y = 0 \| w \| (G_1(w)\oplus r)\|G_2(w),
$$

並令

$$
s = y^d \bmod N.
$$

因此驗證時先算得

$$
s^e \equiv y \pmod N,
$$

也就是恢復出同一個 bit string $y$。把它切開後，自然得到：

- 第一個 bit 是 $0$，所以 $b=0$；
- 中間那段 $\alpha$ 就是 $G_1(w)\oplus r$；
- 最後那段 $\gamma$ 就是 $G_2(w)$。

因此驗證者計算

$$
r = \alpha \oplus G_1(w)
=
(G_1(w)\oplus r)\oplus G_1(w)
=
r,
$$

成功還原原本的隨機值。接著再檢查

$$
H(m\|r)=w,
$$

這也成立，因為簽章時的 $w$ 正是如此定義的。

所以一個合法生成的 RSA-PSS 簽章一定會通過驗證。這個推導也顯示：RSA-PSS 的驗證不是只檢查單一等式，而是在檢查整個編碼結構是否一致。

<div class="remark">
<strong>Remark.</strong>
RSA-PSS 是 probabilistic signature scheme。由於簽章時會隨機選擇 $r$，即使同一訊息 $m$ 被簽兩次，也通常會產生不同的 $w$、不同的 $y$，因此得到不同的簽章 $s$。這使它與 deterministic 的簽章形式有明顯區別。
</div>

---

<div class="remark">
<strong>Differences Between PSS and FDH</strong>

RSA-FDH 的簽章形式最直接：

$$
s = H(m)^d \bmod N.
$$

它的優點是結構簡潔，安全性 reduction 也容易表達。不過它要求 hash 值直接落在 $(\mathbb Z/N\mathbb Z)^\ast$ 中。

RSA-PSS 則不直接要求這種 full-domain hash，而是先對訊息與隨機值做雜湊，再透過編碼結構把各段資訊組合成 RSA input。這種做法更強調：

1. **簽章的隨機化**；
2. **驗證時對整體格式的一致性檢查**；
3. **以 bit-string encoding 的方式連接 hash 與 RSA inversion**。

因此，FDH 較適合用來理解 security reduction 的基本形式，而 PSS 則展現了更完整的隨機化簽章設計。
</div>

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 20. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
