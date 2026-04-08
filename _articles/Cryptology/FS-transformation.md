---
layout: page
title: Fiat–Shamir Transformation
date: 2026-04-08
last_updated: 2026-04-08
tags: [square-root-barrier]
---

Fiat–Shamir transformation 是密碼學中非常重要的一個技巧。它的核心想法是：把原本需要 verifier 送出隨機挑戰的三步驟互動式識別協定，轉換成不需要互動的簽章機制。這個轉換使得許多以 $\Sigma$-protocol 為基礎的識別協定，都可以自然地導出對應的數位簽章方案。

在互動式版本中，prover 先送出一個 commitment，verifier 再送出 challenge，最後 prover 回覆 response。Fiat–Shamir transformation 的做法是用雜湊函數來決定 challenge，使得 signer 可以自己計算出原本應由 verifier 隨機產生的挑戰值。也就是說，互動中的「隨機挑戰」被替換成
$$
c = H(\text{public data}, a, m),
$$
其中 $a$ 是 commitment，$m$ 是欲簽署的訊息，而 $H$ 通常在安全證明中被視為 random oracle。

## From Identification to Signatures

Fiat–Shamir transformation 最初是從 identification scheme 出發。典型的互動流程可寫成：

1. prover 以隨機性產生一個 first message $a$；
2. verifier 送出隨機 challenge $c$；
3. prover 回傳 response $z$；
4. verifier 檢查 $(a,c,z)$ 是否滿足驗證條件。

若這是一個公開金鑰識別協定，那麼 public key 就扮演 verifier 驗證所需的公開資訊，而 secret key 則讓 prover 能生成合法回應。Fiat–Shamir transformation 將其中第二步的 verifier challenge 改為由雜湊值決定，於是整個流程不再需要互動。

<div class="definition">
<div><strong>Definition.</strong> Let $(P,V)$ be a three-move public-coin identification scheme. The Fiat–Shamir transform of $(P,V)$ is the signature scheme in which a signature on message $m$ is produced by first computing a commitment $a$, then setting
$$
c = H(\mathsf{pk}, a, m),
$$
and finally computing a response $z$ exactly as the prover would answer challenge $c$. The signature is the pair $(a,z)$, and verification recomputes $c$ from the hash function and checks whether $(a,c,z)$ is an accepting transcript.</div>
</div>

這個定義反映了 FS transform 的基本形式：簽章其實就是一份「看起來像識別協定 transcript 的資料」，只不過其中的 challenge 不再由 verifier 提供，而是由 hash 決定。

## The General Structure

若原始的 $\Sigma$-protocol 寫成
$$
a \leftarrow P_1(x,w), \qquad
c \leftarrow \mathcal{C}, \qquad
z \leftarrow P_2(x,w,a,c),
$$
其中 $x$ 是 statement，$w$ 是 witness，則經過 Fiat–Shamir transformation 後，對訊息 $m$ 的簽章可寫成
$$
a \leftarrow P_1(x,w), \qquad
c := H(x,a,m), \qquad
z \leftarrow P_2(x,w,a,c).
$$
輸出的 signature 為 $(a,z)$。驗證者重新計算
$$
c := H(x,a,m)
$$
並檢查
$$
V(x,a,c,z)=1.
$$

這裡最重要的變化在於：原本互動中由 verifier 負責提供隨機性，現在改由 hash function 模擬這個隨機來源。因此 FS transform 的安全性分析通常依賴 random oracle model，而不是單純把 $H$ 視為任意固定的具體雜湊函數。

## Relation with $\Sigma$-Protocols

Fiat–Shamir transformation 最常搭配的是 $\Sigma$-protocol。這類協定通常具有三個核心性質：

- completeness；
- special soundness；
- honest-verifier zero-knowledge。

其中，special soundness 對簽章安全性特別重要，因為它保證：若對同一個 first message $a$，存在兩個不同 challenge $c \neq c'$ 及對應的有效 responses $z,z'$，那麼便可以從這兩份 transcript 中抽取出 witness。這正是許多安全證明中使用 rewinding 或 forking 的根本原因。

而 honest-verifier zero-knowledge 則使得 transcript 可以被模擬，這在分析簽章安全性與建構模擬器時也很常出現。

<div class="remark">
<div><strong>Remark.</strong> The Fiat–Shamir transform is most natural when applied to a public-coin three-move protocol, especially a $\Sigma$-protocol, because the verifier's only message is a random challenge.</div>
</div>

也就是說，FS transform 並不是任意互動式協定都能直接套用；它最適合的情境，是 verifier 的行為本來就只是在送出一個均勻隨機挑戰。

## Schnorr Signature as a Standard Example

Schnorr identification scheme 是 Fiat–Shamir transformation 最經典的例子之一。

設群 $G=\langle g \rangle$ 的階為 $q$，secret key 為 $x \in \mathbb{Z}_q$，public key 為
$$
y = g^x.
$$
在互動式 Schnorr identification 中：

1. prover 選取隨機 $r \leftarrow \mathbb{Z}_q$，送出
   $$
   a = g^r;
   $$
2. verifier 送出 challenge $c$；
3. prover 回傳
   $$
   z = r + cx \pmod q;
   $$
4. verifier 檢查
   $$
   g^z = a y^c.
   $$

套用 Fiat–Shamir transformation 之後，challenge 改為
$$
c = H(y,a,m),
$$
因此簽章為
$$
\sigma = (a,z),
$$
其中
$$
z = r + cx \pmod q.
$$
驗證時重新計算
$$
c = H(y,a,m)
$$
並檢查
$$
g^z = a y^c.
$$

這說明 Schnorr signature 本質上就是 Schnorr identification 的 FS 版本。很多其他簽章方案也可以用同樣方式理解：先有 identification protocol，再用 FS transform 將其去互動化。

## Why the Random Oracle Model Appears

在互動式識別協定中，challenge 是 verifier 真正隨機產生的；但在非互動式簽章中，challenge 來自雜湊函數輸出。若想把兩者視為同樣安全，便需要把雜湊函數理想化成 random oracle，亦即對每個新輸入輸出均勻隨機值，且對同一輸入保持一致。

<div class="definition">
<div><strong>Definition.</strong> In the random oracle model, a hash function $H$ is treated as an oracle that returns an independently uniform random output on every new query, while repeated queries on the same input return the same output as before.</div>
</div>

在這個模型下，簽章者與攻擊者都可以查詢 oracle，而安全證明的 reduction 則可以在必要時「程式化」某些 oracle 回答。這也是 FS transform 的證明技術中反覆出現 oracle programming、rewinding、forking lemma 等方法的原因。

若不在 random oracle model 中工作，則 FS transform 的安全性通常無法直接成立。也就是說，FS transform 並不是單純把 challenge 換成雜湊值就自動安全；真正支撐這個轉換的，是對雜湊函數的理想化假設與其對應的證明框架。

## Security Intuition

Fiat–Shamir transformation 的直觀安全性來自以下想法：若攻擊者能偽造一份有效簽章 $(a,z)$，那麼這份資料就對應到一個有效 transcript
$$
(a,c,z), \qquad c = H(x,a,m).
$$
若證明者能再取得同一個 $a$ 搭配另一個不同 challenge $c'$ 的有效回應 $z'$，則可利用原始 $\Sigma$-protocol 的 special soundness 抽出 witness，進而解決底層困難問題，例如離散對數或 RSA inversion。

這個思路在安全證明中通常不是直接完成的，因為 challenge 由 hash function 決定，而不是 reduction 自由指定。因此證明會嘗試：

1. 監看攻擊者對 random oracle 的查詢；
2. 對特定輸入進行 oracle programming；
3. 透過 rewinding 讓攻擊者在相同的 commitment 下看到不同 challenge；
4. 從兩份 accepting transcripts 中抽出底層秘密。

這正是 forking lemma 背後的基本邏輯。

## The Forking Perspective

許多 FS-based signatures 的安全證明都依賴 forking lemma。它的核心思想不是直接從單次偽造抽取 witness，而是把攻擊者執行兩次，讓兩次執行在前面使用同樣的隨機性與同樣的 oracle 回答，但在某一個關鍵 hash query 上給出不同答案。若兩次都成功產生有效簽章，則得到兩份共享相同 commitment $a$ 但 challenge 不同的 transcripts，便可利用 special soundness 完成抽取。

<div class="remark">
<div><strong>Remark.</strong> The forking argument typically loses probability, because the reduction must first guess which hash query is relevant to the forgery and then obtain two successful executions that diverge at that point.</div>
</div>

這也是為什麼 FS transform 與 square-root loss、rewinding loss、tightness gap 等議題有密切關係。特別是在 Schnorr 類簽章中，經典證明往往無法得到緊密歸約，而這正是後續文獻持續研究的重點。

## Benefits of the Transformation

Fiat–Shamir transformation 的優點非常明顯。

### Removing Interaction

最直接的效果是把 identification protocol 轉成 signature scheme，不再需要 signer 與 verifier 線上互動。這使得協定在實務上更容易部署，也讓簽章可以離線產生並被任何人驗證。

### Reusing Existing Proof Systems

許多設計良好的 identification schemes，尤其是 $\Sigma$-protocol，都能透過 FS transform 直接導出簽章方案。這讓設計者可以先研究互動式協定的正確性與知識性，再將其轉成簽章。

### Efficient Verification Structure

FS-based signatures 常保有原始協定的代數結構，因此驗證通常相對簡潔。例如 Schnorr 類簽章的驗證式就直接來自 identification protocol 的驗證關係。

## Limitations and Caveats

Fiat–Shamir transformation 雖然非常強大，但它也有明確限制。

### Dependence on the Random Oracle Model

FS transform 的經典安全性通常建立在 ROM 中。這代表安全結論是「在 random oracle model 下成立」，而不是無條件地對所有真實雜湊函數都成立。

### Tightness Issues

許多證明要用 rewinding 或 forking lemma，因此 reduction 的成功機率可能明顯劣化。這會造成安全參數與底層困難問題之間出現 gap，也就是常說的 non-tight reduction。

### Applicability Constraints

並不是所有互動式證明或識別協定都適合直接做 FS transform。若協定不是 public-coin、不是三步驟型態、或缺乏足夠好的 soundness 抽取結構，則轉換後的安全性分析可能變得困難，甚至根本不成立。

## Variants and Further Directions

Fiat–Shamir transformation 後來有許多延伸版本。研究方向包括：

### Fiat–Shamir with Aborts

在 lattice-based signatures 中，常會出現 Fiat–Shamir with aborts。這類方法會在生成 response 後依某種條件決定是否放棄該次輸出，以控制輸出分布並維持安全性。

### Unruh-Style Transformations

在後量子與量子 random oracle model 的脈絡下，原始 FS transform 不一定足夠，因此也發展出更適合量子查詢模型的轉換方法，例如 Unruh transform。

### Tight Fiat–Shamir Analyses

另一條重要方向是研究如何避免經典 forking lemma 帶來的損失，或改以新的中介問題、代數模型、非 rewinding 技術來獲得更緊密的安全歸約。這和 Schnorr、GQ 及 square-root barrier 等議題密切相關。

## Conceptual Role in Modern Cryptography

Fiat–Shamir transformation 的地位不只是「把互動拿掉」而已。更重要的是，它建立了一條非常有影響力的設計路線：

1. 先構造一個具有良好性質的互動式 proof 或 identification scheme；
2. 再透過 hash-based challenge 將其轉為非互動版本；
3. 最後在 ROM 中分析其簽章安全性。

這條路線在數位簽章、零知識證明、proof systems、以及許多後續非互動化技術中都反覆出現。從這個角度看，Fiat–Shamir transformation 是互動式密碼協定與非互動式密碼工具之間的一個核心橋樑。
