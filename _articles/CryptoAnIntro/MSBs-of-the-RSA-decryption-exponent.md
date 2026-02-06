---
layout: page
title: Partial Exposure of the MSBs of the RSA Decryption Exponent
date: 2026-02-06
last_updated: 2026-02-06
tags: [RSA, partial-key-exposure, MSB, private-exponent, small-exponent]
---

在 RSA 中，若使用常見的 **small public exponent** $e$（例如 $e = 3$），攻擊者即使不知道質數 $p, q$，也可能相對「容易」地恢復 private key $d$ 的 **MSBs (most significant bits)** 中約一半。

存在一個很小的整數 $k$（且 $0 < k < e$），使得攻擊者可以只用公開的 $N$ 構造出一個非常接近 $d$ 的近似值，而其誤差上界只有 $O(\sqrt{N})$。

## Setup

令 $N = p \cdot q$。public key 為 $(N, e)$，private key 為 $d$，滿足

$$
ed \equiv 1 \pmod{\varphi(N)}
$$

因此存在整數 $k$ 使得

$$
ed - k\varphi(N) = 1,
\qquad 0 < k < e.
$$

因為

$$
\varphi(N) = (p-1)(q-1) = N - (p+q) + 1
$$

所以可改寫為

$$
ed - k\bigl(N - (p+q) + 1\bigr) = 1
$$

## Candidate approximation for $d$

由於 $k$ 落在很小的範圍 $0 < k < e$，攻擊者可以枚舉每個可能的 $i$：

$$
0 < i < e
$$

並計算候選近似值

$$
d_i=\left\lfloor \frac{iN+1}{e}\right\rfloor
$$

直覺上，當 $i = k$ 時，$d_i$ 會是 $d$ 的良好近似。

## Why $d_k$ is close to $d$

由

$$
ed - k\varphi(N)=1
\Rightarrow
d=\frac{k\varphi(N)+1}{e}
$$

而候選值相當於用

$$
\frac{kN+1}{e}
$$

來近似 $d$。兩者差距為

$$
\left \lvert
\frac{kN+1}{e}-\frac{k\varphi(N)+1}{e}
\right \rvert
= \frac{k(N-\varphi(N))}{e}
$$

又因為

$$
N-\varphi(N)=p+q-1
$$

可得

$$
\lvert d_k-d \rvert
\le
\frac{k(p+q)}{e}
$$

在典型 RSA 設定中 $p, q$ 同階，故 $p+q = O(\sqrt{N})$，因此可以得到一個保守的估計：

$$
\lvert d_k-d \rvert
\le
\frac{3k\sqrt{N}}{e}
<
3\sqrt{N}
$$

## Consequence: half of the MSBs leak

關鍵在於「$d$ 的尺度」與「近似誤差」的量級差距：

- $d$ 的大小約為 $\Theta(N)$（大約是 $n$-bit 等級）
- 但我們得到的近似 $d_k$ 與真實 $d$ 的差距滿足 $\lvert d_k - d \rvert = O(\sqrt{N})$（大約是 $n/2$-bit 等級）

因此，$d$ 必定位於區間

$$
[d_k - O(\sqrt{N}),\ d_k + O(\sqrt{N})]
$$

也就是說：在已知 $d_k$ 的情況下，$d$ 只剩下約 $\sqrt{N}$ 種可能。由於 $\sqrt{N} = 2^{n/2}$，這代表 $d$ 的不確定性主要集中在「低位約 $n/2$ 個 bits」，而「高位約 $n/2$ 個 bits」幾乎已被固定。換句話說，透過 $d_k$ 這個近似值，可以直接確定 $d$ 的 **MSBs 約一半 bits**。

<div class="example">

<strong> Special case: $e = 3$ </strong>

當 $e = 3$ 時，

$$
0 < k < 3 \Rightarrow k \in \{1,2\}.
$$

此情況下可判定 $k = 2$，因此只需計算

$$
d_2=\left\lfloor\frac{2N+1}{3}\right\rfloor
$$

即可恢復 $d$ 的 half of the MSBs。

</div>

<div class="remark">

即使能「trivially」恢復 $d$ 的一部分 MSBs，目前仍沒有已知方法能僅憑這些 MSBs 進一步恢復 $d$ 的其餘 bits，從而完整還原 private key。

</div>
