---
layout: page
title: Security of RSA Signature
date: 2026-03-26
last_updated: 2026-03-26
tags: [RSA, signature, random-oracle, FDH, RSA-PSS]
---

RSA-based signature 的安全性，在 provable security 的脈絡下，通常放在 **random oracle model** 中討論。這裡有兩個很重要的代表性方案：**RSA with Full-Domain Hashing (FDH)** 與 **RSA-PSS**。前者的結構最直接，也最適合說明如何把「偽造簽章」歸約成「反轉 RSA function」；後者則是在實作上更自然、也更接近標準化使用方式的方案。課本中指出，RSA-FDH 可在 random oracle model 下證明安全，而 RSA-PSS 也可在同樣模型下、基於 RSA assumption 證明安全，只是書中沒有展開完整證明。:contentReference[oaicite:0]{index=0} :contentReference[oaicite:1]{index=1}

## RSA with Full-Domain Hashing (FDH)

RSA-FDH 的核心想法非常直接：把訊息先經過一個「值域覆蓋整個 RSA domain」的 hash function，再用 RSA 私鑰對其做反演。也就是說，若 $N$ 是 RSA modulus，公開指數為 $e$，私密指數為 $d$，定義 RSA function

$$
f:(\mathbb Z/N\mathbb Z)^\ast \to (\mathbb Z/N\mathbb Z)^\ast,\qquad f(x)=x^e \bmod N,
$$

則 RSA problem 就是：給定 $y=f(x)$，求出 $x$。

在 RSA-FDH 中，假設有一個 hash function

$$
H:\{0,1\}^\ast \to (\mathbb Z/N\mathbb Z)^\ast,
$$

簽署訊息 $m$ 時，直接輸出

$$
s = H(m)^d = f^{-1}(H(m)).
$$

驗證時則檢查

$$
s^e \equiv H(m) \pmod N.
$$

若成立，就接受此簽章。這種形式的好處是結構非常乾淨：**簽章就是對 hash value 做 RSA inversion**。因此，只要能把 adversary 的 forgery 對準某一個特定的 hash query，就有機會把它轉成 RSA inversion。:contentReference[oaicite:2]{index=2}

<div class="remark">
<strong>Remark.</strong>
FDH 的名稱「full-domain hash」來自於：$H$ 的輸出不是一般固定長度 bit string，而是直接落在 $(\mathbb Z/N\mathbb Z)^\ast$ 中。這使得簽章可以寫成 $s = H(m)^d \bmod N$，也使 security reduction 的形式特別自然。不過這也帶來一個實務上的問題：這類 hash function 並不容易真正構造，因此課本中的安全性證明是在 random oracle model 下進行。 
</div>

### 安全性直觀

設 adversary $A$ 可以在 random oracle model 下對 RSA-FDH 做 **existential forgery under active attack**。也就是說，$A$ 可以：

1. 查詢 hash oracle；
2. 查詢 signing oracle；
3. 最後輸出某個新訊息 $m$ 的有效簽章 $s$，而且這個 $m$ 並沒有被要求簽過。

要證明 RSA-FDH 安全，我們要構造一個 reduction algorithm $B^A$，利用 $A$ 來反轉給定的 RSA challenge $y$。

想法是：$B^A$ 從 $A$ 的所有 hash queries 中，隨機挑一個位置 $t$，把那一次 hash query 的答案直接設成 challenge $y$。若最後 $A$ 恰好在那個訊息上輸出 forgery，則因為有效簽章必須滿足

$$
s^e \equiv H(m) \pmod N,
$$

而此時 $H(m)=y$，所以就得到

$$
s^e \equiv y \pmod N.
$$

因此 $s$ 就是 $y$ 的 RSA inverse，也就是我們要找的解。:contentReference[oaicite:3]{index=3}

<div class="theorem">
<strong>Theorem 20.4.</strong>
In the random oracle model if an active adversary $A$ exists which produces an existential forgery for RSA-FDH, which requires $q_H$ hash queries and $q_S$ signature queries, then there is an algorithm which given $y$ can invert the RSA function on $y$ with probability $1/q_H$.
</div>

<div class="proof">
<strong>Proof.</strong>
證明的核心是把 adversary 的某一次 hash query「埋入」RSA inversion challenge。設 reduction $B^A$ 的輸入是一個 RSA challenge $y \in (\mathbb Z/N\mathbb Z)^\ast$，目標是求出 $x$ 使得 $x^e \equiv y \pmod N$。

首先，$B^A$ 在 $\{1,\dots,q_H\}$ 中均勻隨機選一個索引 $t$，把它想成「希望 adversary 最後偽造的那個 hash query 位置」。接著 $B^A$ 開始模擬 $A$ 的 oracle view。

對於第 $i$ 次 hash query，若查詢訊息為 $m_i$，則分兩種情況處理：

若 $i=t$，$B^A$ 直接定義
$$
H(m_t)=y.
$$

若 $i\neq t$，則 $B^A$ 自行隨機選一個
$$
s_i \in (\mathbb Z/N\mathbb Z)^\ast,
$$
並定義
$$
H(m_i)=s_i^e \bmod N.
$$

這樣做的好處是：對於所有 $i\neq t$ 的訊息，$B^A$ 都已經「知道」其 hash value 的 RSA inverse，因為
$$
f(s_i)=s_i^e=H(m_i)\pmod N.
$$
所以若 adversary 之後要求簽署這些訊息，$B^A$ 可以直接把 $s_i$ 當成簽章回覆。

現在看 signing queries。若 $A$ 要求簽署某個訊息 $m_i$，但尚未做過對應的 hash query，$B^A$ 先替它補做 hash query，再回應簽章。

- 若 $m_i=m_t$，則 $B^A$ 必須失敗並中止。因為這時 $H(m_t)=y$，而 $B^A$ 並不知道 $y$ 的 RSA inverse，所以無法模擬這個簽章。
- 若 $m_i\neq m_t$，則由先前的設計，$B^A$ 已知某個 $s_i$ 滿足
  $$
  s_i^e \equiv H(m_i) \pmod N,
  $$
  因此可合法回覆簽章 $s_i$。

最後，假設 $A$ 輸出一組 forgery $(m,s)$。由於這是一個有效簽章，必有
$$
s^e \equiv H(m) \pmod N.
$$

又因為是 existential forgery，訊息 $m$ 不能是先前問過 signing oracle 的訊息。現在分情況：

若 $m\neq m_t$，則 $B^A$ 這次沒有得到想要的 inversion，因而失敗。

若 $m=m_t$，則由模擬方式知
$$
H(m_t)=y,
$$
故
$$
s^e \equiv H(m_t)=y \pmod N.
$$
因此 $s$ 正是一個滿足 $f(s)=y$ 的值，也就是 $y$ 的 RSA inverse，故 $B^A$ 成功解出 RSA problem。

接著分析成功機率。$B^A$ 是在 $q_H$ 次 hash queries 中隨機選一個位置 $t$ 來埋入 challenge。若 adversary 最後成功偽造的訊息剛好對應到第 $t$ 次 hash query，則 reduction 成功。由於 $t$ 是均勻隨機選的，且其選擇與 adversary 的 view 獨立，因此成功機率大約就是
$$
\frac{1}{q_H}.
$$

這就得到 theorem 的結論：若存在能偽造 RSA-FDH 的 active adversary，則可利用它以約 $1/q_H$ 的機率反轉 RSA function。
</div>

### 為什麼這個 reduction 成立

這個 proof 最關鍵的地方有兩個。

第一，對所有不是第 $t$ 個的 hash query，$B^A$ 都故意把 hash value 設成某個隨機值的 $e$ 次方，也就是
$$
H(m_i)=s_i^e.
$$
因此它自然知道對應的簽章 $s_i$，可以完美模擬 signing oracle。

第二，真正不知道怎麼簽的，就只有那一個特別位置 $t$，因為那裡的 hash value 被設成 challenge $y$。所以 reduction 的全部希望都在於：adversary 最後偽造的目標訊息，剛好就是這一個位置。

也正因如此，這個證明雖然漂亮，但不是 tight reduction；它會損失一個大約 $q_H$ 的因子。這正是 theorem 中成功機率只有 $1/q_H$ 的原因。:contentReference[oaicite:4]{index=4}

<div class="remark">
<strong>Remark.</strong>
RSA-FDH 的安全性證明非常典型地展現了 random oracle proof 的風格：reduction 並不是被動地接受一個固定的 hash function，而是主動地「編程」random oracle 的輸出，使某個特定查詢點對應到 RSA inversion challenge。整個 proof 的力量，正是建立在這種 oracle programmability 之上。
</div>

## RSA-PSS

RSA-PSS（Probabilistic Signature Scheme）是另一種重要的 RSA-based signature。和 FDH 相比，它的特色是：**簽章時會加入隨機性**，因此同一則訊息即使重複簽署，也不一定得到相同簽章。課本指出，RSA-PSS 也能在 random oracle model 下基於 RSA assumption 證明安全，而且它比 RSA-FDH 更具實務吸引力，因為它只需要傳統意義下輸出 bit strings 的 hash functions，而不需要一個直接映到 $(\mathbb Z/N\mathbb Z)^\ast$ 的 full-domain hash。

### 參數與函數

設 RSA modulus $N$ 的位元長度為 $k$，公開指數為 $e$，私密指數為 $d$。再選兩個整數 $k_0,k_1$，滿足

$$
k_0+k_1 \le k-1.
$$

課本提到，實作上可以取例如 $k_0=k_1=128$ 或 $160$。另外定義兩個函數：

$$
G:\{0,1\}^{k_1} \to \{0,1\}^{k-k_1-1},
$$

以及

$$
H:\{0,1\}^\ast \to \{0,1\}^{k_1}.
$$

其中 $G$ 是一個擴展型函數，$H$ 是一個壓縮型 hash function。再把 $G$ 分成前後兩段：

$$
G_1:\{0,1\}^{k_1}\to\{0,1\}^{k_0},
$$

表示取 $G(w)$ 的前 $k_0$ bits；以及

$$
G_2:\{0,1\}^{k_1}\to\{0,1\}^{k-k_0-k_1-1},
$$

表示取 $G(w)$ 的後 $k-k_0-k_1-1$ bits。:contentReference[oaicite:6]{index=6}

### 簽章流程

對訊息 $m$ 進行簽章時，步驟如下。

首先隨機產生一個長度為 $k_0$ 的 bit string：

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

也就是說，RSA-PSS 並不是直接對 $H(m)$ 做 RSA inversion，而是先把訊息 $m$ 與隨機鹽值 $r$ 混合，再經過一個特定的編碼結構，形成 $y$ 後才去做 RSA inversion。這個編碼結構把冗餘、遮罩與隨機性都放進去，使得驗證者能從 $s^e$ 中檢查整體結構是否一致。:contentReference[oaicite:7]{index=7}

### 驗證流程

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

只有當三者都成立時，簽章才接受。:contentReference[oaicite:8]{index=8}

### 為什麼驗證會正確

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

- 第一個 bit 是 $0$，故 $b=0$；
- 中間那段 $\alpha$ 就是 $G_1(w)\oplus r$；
- 最後那段 $\gamma$ 就是 $G_2(w)$。

因此驗證者計算

$$
r = \alpha \oplus G_1(w)
\;=\;
(G_1(w)\oplus r)\oplus G_1(w)
\;=\;
r,
$$

成功還原原本的隨機值。接著再檢查

$$
H(m\|r)=w,
$$

這也成立，因為簽章時的 $w$ 正是如此定義的。

所以一個合法生成的 RSA-PSS 簽章一定會通過驗證。這個推導也說明了：RSA-PSS 的驗證不是只檢查某個單純等式，而是在檢查整個編碼格式的一致性。這也是它和最直接的 textbook RSA signature 很不一樣的地方。

<div class="remark">
<strong>Remark.</strong>
RSA-PSS 的一個重要特色是 probabilistic。由於簽章時會隨機選擇 $r$，即使同一訊息 $m$ 被簽兩次，也通常會產生不同的 $w$、不同的 $y$，因此得到不同的簽章 $s$。這使得 scheme 的結構比 deterministic 的 RSA-FDH 更靈活，也更符合現代標準化設計的方向。
</div>

### 為什麼 PSS 比 FDH 更實務化

RSA-FDH 的數學形式很漂亮，但它要求

$$
H:\{0,1\}^\ast \to (\mathbb Z/N\mathbb Z)^\ast.
$$

也就是 hash 的值域要直接覆蓋整個 RSA domain。這在理論上便於 reduction，但在實作上不自然。相對地，RSA-PSS 只需要比較傳統的 hash function 與 mask generation style 的擴展函數：$H$ 輸出固定長度 bit string，$G$ 則把某段 bit string 擴展成更長的 bit string。然後藉由精心安排的 encoding，再把結果視為整數送進 RSA inversion。

因此，PSS 的優勢不是「比較容易理解」，而是 **比較符合真實系統如何處理 bit strings 與 padding/encoding 的方式**。課本也明確指出：RSA-PSS 的優勢在於它不需要 full-domain hash，而只需要傳統型態的 hash function。

## Next

RSA-FDH 與 RSA-PSS 都是在 **random oracle model** 下建立安全性的經典 RSA signature scheme。FDH 的結構最簡單，適合看懂「existential forgery $\Rightarrow$ RSA inversion」這種 reduction proof 的基本型態；PSS 則透過隨機化與編碼機制，提供更貼近實務標準的設計。前者的證明重點在於如何把某個 hash query 嵌入 RSA challenge，後者的重點則在於如何透過 probabilistic encoding，把簽章安全性仍然連回 RSA assumption。整體而言，這兩個方案共同展示了：RSA 本身不是直接安全的簽章系統，真正的安全性來自於 **hashing / encoding / randomization** 與 **security reduction** 的結合。
