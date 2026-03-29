---
layout: page
title: Security of DL-based Signature
date: 2026-03-26
last_updated: 2026-03-26
tags: [signature, Schnorr, DSA, EC-DSA, forking-lemma, random-oracle]
---

數位簽章安全性的證明，在 random oracle model 中常透過 **forking lemma** 來進行。其核心想法是：若一個 adversary 能在某個 hash-query 的回答下產生合法 forgery，則 reduction 可以在相同 random tape 下重跑 adversary，並只改動那個關鍵 hash-query 的回覆，從而得到兩個彼此相關、但 challenge 不同的偽造簽章。接著再利用這兩份輸出之間的代數關係，恢復底層 hard problem 的解。

對離散對數型簽章而言，這種方法並不是一體適用。Schnorr signatures 中，forking 後會保留相同的 commitment，因此可直接解出 secret key；DSA 中則因為 reduction modulo $q$ 的存在，無法從相同的 $r$ 推回相同的 ephemeral key；EC-DSA 也有類似障礙，但在某些額外條件下可以部分修補。當 adversary 由 passive 升級為 active 時，關鍵則變成：reduction 能否在不知道私鑰的情況下，模擬 signing oracle。

## Forking Lemma

在這裡考慮的簽章方案中，簽章通常可以抽象寫成下列形式：

- signer 先產生一個可能為空的 commitment $\sigma_1$；
- 再計算 $h = H(\sigma_1 \| m)$；
- 最後利用 $\sigma_1$ 與 $h$ 算出第二部分 $\sigma_2$。

因此輸出可記為 $(\sigma_1, H(\sigma_1 \| m), \sigma_2)$。常見例子如下：

- DSA：$\sigma_1 = \emptyset$，$h = H(m)$，$\sigma_2 = \left(r,\frac{h+xr}{k} \bmod q\right)$，其中 $r = (g^k \bmod p) \bmod q$。
- EC-DSA：$\sigma_1 = \emptyset$，$h = H(m)$，$\sigma_2 = \left(r,\frac{h+xr}{k} \bmod q\right)$，其中 $r = x\text{-coord}([k]G)$。
- Schnorr signatures：$\sigma_1 = g^k$，$h = H(\sigma_1 \| m)$，$\sigma_2 = xh + k \bmod q$。

在 random oracle model 中，reduction $B^A$ 可以控制 hash oracle 的回答。若 adversary $A$ 能以 non-negligible probability 產生 existential forgery，則可假設它一定曾查詢過關鍵的 hash 值 $h = H(\sigma_1 \| m)$；否則 reduction 可以代為補查，不影響分析。

forking lemma 的操作是：讓 $A$ 在**相同 random tape** 下執行兩次。第一次正常回答所有 hash queries；第二次則挑某一個 hash query，將其回答改成另一個值。若剛好被改動的是 critical hash query，則兩次執行會得到同一訊息上的兩份 forgery：
$$
(m,\sigma_1,h,\sigma_2), \qquad (m,\sigma_1,h',\sigma_2').
$$
兩份輸出之間唯一關鍵的差異，在於 hash challenge 由 $h$ 變成 $h'$。接下來是否能把這兩份簽章轉化為底層 hard problem 的解，就取決於 scheme 本身的代數結構。

## Passive Adversary

passive adversary 只觀察 public key、hash oracle，以及可能的公開資訊，不具備額外的 signing oracle 互動能力。這種情況下，forking lemma 最容易直接套用。

### Schnorr Signature (Passive Adversary)

Schnorr signature 的公開金鑰寫作 $y=g^x$。對訊息 $m$，簽章者隨機選取 $k$，令
$$
r = g^k, \qquad h = H(r \| m), \qquad s = xh + k \pmod q.
$$
因此簽章可寫為 $(h,s)$，驗證條件則可重寫成
$$
g^s = y^h r.
$$

<div class="theorem">
<strong>Theorem 20.1.</strong> In the random oracle model, assuming discrete logarithms are hard to compute for the group G, no passive adversary against Schnorr signatures can exist for the group G.
</div>

<div class="proof">
<strong>Proof.</strong>
設 reduction $B^A$ 的輸入是一個 discrete logarithm instance
$$
y = g^x,
$$
其目標是恢復 $x$。假設 adversary $A$ 在 public key $y$ 下能以 non-negligible probability 偽造 Schnorr signature。對 $A$ 套用 forking lemma 後，$B^A$ 可得到同一訊息上的兩份合法簽章：
$$
(m,\sigma_1 = g^k,h,\sigma_2 = xh + k \bmod q)
$$
以及
$$
(m,\sigma_1' = g^{k'},h',\sigma_2' = xh' + k' \bmod q).
$$

由於兩次執行使用相同 random tape，且 fork 成功時保留了相同的 commitment，因此
$$
\sigma_1 = \sigma_1'.
$$
也就是
$$
g^k = g^{k'}.
$$
因群的階為 $q$，可得
$$
k \equiv k' \pmod q.
$$
因此可直接把兩條簽章方程式相減：
$$
\sigma_2 - \sigma_2' \equiv (xh+k) - (xh'+k') \pmod q.
$$
由 $k \equiv k'$ 得
$$
\sigma_2 - \sigma_2' \equiv x(h-h') \pmod q.
$$
令
$$
A = h-h' \pmod q, \qquad B = \sigma_2-\sigma_2' \pmod q,
$$
則有
$$
Ax \equiv B \pmod q.
$$

又因為第二次執行在 critical hash query 上刻意改變了回答，所以
$$
h \neq h' \pmod q,
$$
因此
$$
A \neq 0 \pmod q.
$$
既然 $q$ 為群的階，$A$ 在 $\mathbb F_q$ 中可逆，故
$$
x \equiv A^{-1}B \pmod q.
$$

於是 $B^A$ 能從偽造 Schnorr signature 的 adversary 中恢復 discrete logarithm，與 discrete logarithm hard 的假設矛盾。故不存在這樣的 passive adversary。
</div>

Schnorr 的關鍵，在於 fork 後保留下來的是同一個 commitment $g^k$。一旦 commitment 相同，就能推出兩次用到的是同一個 $k$，因而把未知量只剩下 $x$，最終直接解出 discrete logarithm。

### DSA Signature

DSA 的簽章形式為
$$
r = (g^k \bmod p) \bmod q, \qquad s = \frac{h+xr}{k} \pmod q,
$$
其中 $h = H(m)$。若照著 Schnorr 的思路對 DSA 使用 forking lemma，則會得到兩份簽章：
$$
(m,\emptyset,h,(r,s))
$$
與
$$
(m,\emptyset,h',(r',s')).
$$
對應的方程式為
$$
r = (g^k \bmod p)\bmod q, \qquad s = \frac{h+xr}{k} \pmod q,
$$
$$
r' = (g^{k'} \bmod p)\bmod q, \qquad s' = \frac{h'+xr'}{k'} \pmod q.
$$

這裡的問題在於：和 Schnorr 不同，fork 後並沒有明確保留下某個能唯一決定 $k$ 的 group element。特別是，連 $r=r'$ 都不一定成立，因此完全無法推出 $k=k'$。少了這一步，就不能把兩條方程式相減來消去 $k$。

即使進一步修改 DSA，把 hash 改成
$$
h = H(m \| r),
$$
使它更像 Schnorr 的結構，fork 後可以保證兩次 critical hash query 都對應同一個 $r$，仍然只會得到
$$
r = r',
$$
以及
$$
r = (g^k \bmod p)\bmod q, \qquad r' = (g^{k'} \bmod p)\bmod q.
$$
但從
$$
(g^k \bmod p)\bmod q = (g^{k'} \bmod p)\bmod q
$$
仍然**無法推出**
$$
k = k'.
$$

障礙就在於最後那個 reduction modulo $q$：它把原本群元素中的資訊壓縮掉了。若沒有這一步 reduction，理論上就比較有機會走出像 Schnorr 那樣的 proof；但 DSA 正是靠這個設計才保有較小的 signature size。因此，DSA 的效率特性也正是這種 reduction proof 卡住的來源。

對 DSA 而言，這套 proof technique 不適用，而且目前也沒有已知的安全性證明可由這條路線建立。

### EC-DSA Signature

EC-DSA 的簽章形式與 DSA 類似，只是把 multiplicative group 換成 elliptic curve group。對修改後的版本，假設
$$
h = H(m \| r),
$$
其中
$$
r = x\text{-coord}([k]P) \bmod q,
$$
簽章方程式為
$$
s = \frac{h+xr}{k} \pmod q.
$$

fork 後得到兩份簽章資料：
$$
r = x\text{-coord}([k]P) \bmod q, \qquad s = \frac{h+xr}{k} \pmod q,
$$
$$
r' = x\text{-coord}([k']P) \bmod q, \qquad s' = \frac{h'+xr'}{k'} \pmod q,
$$
其中還有
$$
r = r'.
$$

和 DSA 不同的是，在某些條件下，從相同的 $x$-coordinate 可以推出
$$
[k']P = [k]P \quad \text{or} \quad [k']P = -[k]P.
$$
因此可得
$$
k' \equiv k \pmod q \qquad \text{or} \qquad k' \equiv -k \pmod q.
$$
也就是
$$
k' = \pm k \pmod q.
$$

把這兩種可能分開看。

若 $k' = k$，則
$$
s = \frac{h+xr}{k}, \qquad s' = \frac{h'+xr}{k}.
$$
兩式相減可得
$$
s-s' = \frac{h-h'}{k} \pmod q,
$$
因此
$$
(s-s')k = h-h' \pmod q.
$$

若 $k' = -k$，則
$$
s' = \frac{h'+xr}{-k} = -\frac{h'+xr}{k} \pmod q.
$$
因此
$$
s+s' = \frac{h-h'}{k} \pmod q,
$$
亦即
$$
(s+s')k = h-h' \pmod q.
$$

這兩種情形可統一寫成
$$
(s \mp s')k = h-h' \pmod q.
$$
因此 reduction 可以得到 **兩個候選值**：
$$
k = \frac{h-h'}{\,s-s'\,} \pmod q
\qquad \text{or} \qquad
k = \frac{h-h'}{\,s+s'\,} \pmod q.
$$

一旦得到候選的 $k$，就可由
$$
s = \frac{h+xr}{k} \pmod q
$$
改寫為
$$
x = \frac{sk-h}{r} \pmod q.
$$
因此對每個候選的 $k$，都可算出對應的候選 secret key
$$
x = (sk-h)r^{-1} \pmod q.
$$
最後再檢查哪一個滿足
$$
[x]P = Y.
$$

<div class="theorem">
<strong>Theorem 20.2.</strong> In the random oracle model the above modified version of EC-DSA is secure against passive adversaries, assuming that the discrete logarithm problem in $E(\mathbb F_p)$ is hard and $q = \#E(\mathbb F_p) > p$.
</div>

<div class="proof">
<strong>Proof.</strong>
對修改後的 EC-DSA 套用 forking lemma，可得兩份同一訊息上的偽造簽章，使得
$$
r = r', \qquad h = H(m \| r), \qquad h' = H(m \| r').
$$
又由
$$
r = x\text{-coord}([k]P) \bmod q, \qquad r' = x\text{-coord}([k']P) \bmod q,
$$
在條件 $q > p$ 下，可由 $r=r'$ 推得兩種可能：
$$
k' = k \pmod q \qquad \text{or} \qquad k' = -k \pmod q.
$$

若 $k'=k$，則
$$
s = \frac{h+xr}{k}, \qquad s' = \frac{h'+xr}{k},
$$
所以
$$
s-s' = \frac{h-h'}{k} \pmod q,
$$
進而
$$
k = (h-h')(s-s')^{-1} \pmod q.
$$

若 $k'=-k$，則
$$
s' = \frac{h'+xr'}{k'} = -\frac{h'+xr}{k} \pmod q,
$$
因此
$$
s+s' = \frac{h-h'}{k} \pmod q,
$$
進而
$$
k = (h-h')(s+s')^{-1} \pmod q.
$$

所以 reduction 最多得到兩個候選的 $k$。對每個候選值，都可由
$$
s = \frac{h+xr}{k} \pmod q
$$
改寫成
$$
x = (sk-h)r^{-1} \pmod q.
$$
因此會得到兩個候選的 $x$。最後只需檢查哪一個滿足公開金鑰條件
$$
[x]P = Y.
$$
正確的那一個就是所要求的 discrete logarithm 解。

故若存在能被動偽造上述修改版 EC-DSA 的 adversary，便能構造出解 elliptic-curve discrete logarithm problem 的演算法，與假設矛盾。
</div>

這裡與 DSA 最本質的差別是：在 elliptic curve 上，相同的 $x$-coordinate 至多對應到兩個互為相反數的點，因此雖然不能唯一恢復 $k$，但仍可以把候選數量壓到 2 個，最後再檢查公開金鑰即可。這也是修改版 EC-DSA 在特定條件下能建立 passive security 的原因。

## Active Adversary

一旦 adversary 可以發出 signing queries，reduction 不只要處理最終 forgery，還必須在**不知道私鑰**的情況下，回答對方的簽章請求。這一步稱為 **simulation of signing queries**。

若 hash function 只吃訊息 $m$，則 adversary 可能在要求簽章之前，就先查過 $H(m)$。這樣 reduction 之後便無法再修改這個 hash 回應，也就無法自由地構造模擬簽章。這也是 Schnorr 這類方案中，hash 輸入要包含像 $\sigma_1$ 這樣直到簽章當下才決定之值的原因。

因此，在 random oracle model 中，只要能成功模擬 signing oracle，active attack 所需的互動便可被 reduction 重現，安全性分析也就能延續 passive case 的思路。

### Schnorr Signature (Active Adversary)

Schnorr 的真實簽章為：對訊息 $m$，選隨機 $k$，令
$$
r = g^k, \qquad h = H(r \| m), \qquad s = xh + k \pmod q.
$$
輸出 $(h,s)$。

模擬器在不知道 $x$ 的情況下，改成反過來做：

1. 隨機選 $s,h \in \mathbb F_q$；
2. 設
   $$
   r = g^s y^{-h};
   $$
3. 若之前的 random-oracle list 中已存在 $(r \| m,h')$ 且 $h' \ne h$，則重選；
4. 將 hash oracle 編程為
   $$
   H(r \| m) = h;
   $$
5. 輸出「簽章」$(h,s)$。

現在驗證這確實是一份合法 Schnorr signature。因為公開金鑰為 $y=g^x$，所以
$$
r = g^s y^{-h} = g^s g^{-xh} = g^{s-xh}.
$$
因此若令
$$
k = s-xh \pmod q,
$$
就有
$$
r = g^k.
$$
而且
$$
s = xh + k \pmod q.
$$
這正是 Schnorr signature 的正確關係式，所以 $(h,s)$ 的分佈與真實簽章一致。

重點在於：模擬器不是先選 $k$ 再算 $s$，而是先隨機選出最終要輸出的 $(h,s)$，再反推出對應的 $r$，最後把 random oracle 在 $(r \| m)$ 上的值程式化成 $h$。這種作法之所以可行，正是因為在 random oracle model 中，reduction 可以控制 hash oracle 的回答。

<div class="theorem">
<strong>Theorem 20.3.</strong> In the random oracle model, assuming discrete logarithms are hard to compute for the group G, no active adversary against Schnorr signatures can exist for the group G.
</div>

<div class="proof">
<strong>Proof.</strong>
要把 passive security 的 argument 推到 active case，關鍵是說明：在不知道私鑰 $x$ 的情況下，仍可模擬對 adversary 的 signing queries。

對任意訊息 $m$，模擬器先隨機選
$$
s,h \in \mathbb F_q,
$$
再定義
$$
r = g^s y^{-h}.
$$
接著把 random oracle 在 $(r \| m)$ 上的回答設成 $h$，並輸出 $(h,s)$。

需驗證此輸出為合法簽章。由 $y=g^x$ 得
$$
r = g^s y^{-h} = g^s g^{-xh} = g^{s-xh}.
$$
令
$$
k = s-xh \pmod q,
$$
則
$$
r = g^k
$$
且
$$
s = xh + k \pmod q.
$$
因此 $(h,s)$ 確實滿足 Schnorr 簽章的驗證式。

此外，由於 $h$ 被視為 random oracle 的輸出，而 $s$ 也是均勻隨機選取，故此模擬簽章與真實簽章在分佈上不可區分。於是 active adversary 所看到的互動，可由 simulator 完整模擬。既然 passive adversary 已可被轉化為 discrete logarithm solver，則 active adversary 也同樣不能存在。
</div>

Schnorr 在 active case 中依然可證，最核心的原因就是：其 hash 輸入包含 $r$，而 $r$ 又可以先由 simulator 反推構造，再把 oracle 回答補上。若 hash 只依賴 $m$，這種 simulation 通常就做不到。對 DSA 而言，並不存在相同型態的安全結論；EC-DSA 的已知證明方向也不是這裡這種將 hash 當作 generic object 再歸約到 discrete logarithm 的路線。
