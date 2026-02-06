---
layout: page
title: Partial Exposure of the LSBs of the RSA Decryption Exponent
date: 2026-02-06
last_updated: 2026-02-06
tags: [RSA, partial-key-exposure, LSB, private-exponent, Coppersmith, LLL]
---

當 RSA 使用 **small public exponent** $e$（例如 $e=3$）時，如果攻擊者已知 private exponent $d$ 的一段 **LSBs (least significant bits)**，即使只知道「四分之一」長度的低位 bits，也可能進一步恢復完整的 $d$，甚至完成對 $N$ 的 factorization。

核心想法是：把 $d$ 拆成「已知低位 + 未知高位」，利用 RSA 的關係式導出一個關於 $p \bmod 2^{n/4}$ 的同餘條件，將問題轉化為「已知 prime factor 的部分 bits」的情況；接著透過 **Coppersmith/LLL** 類的 lattice 技術嘗試 factor $N$，一旦成功得到 $p,q$，就能回推出完整的 $d$。相關的 prime factor bits recovery 方法可參考：

[Partial Exposure of the some bits of the RSA Prime Factors]({{ "/articles/CryptoAnIntro/some-bits-of-the-RSA-prime-factors/" | relative_url }}).

<!-- --- -->

## Setup

設

- $N = pq$ 為 $n$-bit RSA modulus，且 $p \approx q$
- public key 為 $(N,e)$，private exponent 為 $d$

已知 $d$ 的 $n/4$ 個 LSBs，記為 $d_0$，並寫成

$$
d = d_0 + 2^{n/4}x_0,
$$

其中未知量 $x_0$ 滿足

$$
0 \le x_0 \le 2^{3n/4}.
$$

同時回憶 RSA 的基本等式：存在整數 $k$（且 $0 < k < e$）使得

$$
ed - k\bigl(N - (p+q) + 1\bigr) = 1.
$$

$k$ 為 even。

### Derive a congruence for \(p \bmod 2^{n/4}\)

由 $N=pq$，可將上式整理成一個把 $p$ 拉出來的形式（書上寫成）

$$
edp - kp(N - p + 1) + kN = p.
$$

令

$$
p_0 \equiv p \pmod{2^{n/4}},
$$

並把 $d = d_0 + 2^{n/4}x_0$ 代回，上式在模 $2^{n/4}$ 下會消去含 $2^{n/4}x_0$ 的項，得到一個只含已知 $d_0$ 與未知 $p_0$ 的同餘（書上標為 Equation (15)）：

$$
ed_0p_0 - kp_0(N - p_0 + 1) + kN - p_0 \equiv 0 \pmod{2^{n/4}}.
$$

重點：**這個式子只在模 $2^{n/4}$ 下成立，且不再含未知的 $x_0$**，因此可以用來枚舉/求解可能的 $p_0$。

<div class="algorithm">

<strong>Algorithm idea (recover $d$ via factoring $N$)</strong>

<p>可以用下面的流程恢復完整的 $d$：</p>

<h4>Step 1: enumerate $k$</h4>

<p>由於 $0 < k < e$ 且 $e$ 很小，攻擊者可以枚舉每個可能的 $k$。</p>

<h4>Step 2: solve Equation (15) for $p_0$</h4>

<p>對固定的 $k$，在模 $2^{n/4}$ 下解：</p>

$$
ed_0p_0 - kp_0(N - p_0 + 1) + kN - p_0 \equiv 0 \pmod{2^{n/4}}.
$$

<p>文中指出：每個 $k$ 會產生 $O(4)$ 個可能的 $p_0$（也就是常數個候選值）。</p>

<h4>Step 3: factor $N$ using partial bits of $p$</h4>

<p>一旦取得候選 $p_0 \equiv p \pmod{2^{n/4}}$，就把問題轉化成「已知 prime factor 的部分 bits」的情況：</p>

<ul>
  <li>已知 $p$ 的 $n/4$ 個 LSBs</li>
  <li>使用 <strong>bivariate Coppersmith (heuristic) + LLL</strong> 尋找小根</li>
  <li>進而恢復 $p, q$，完成 factorization</li>
</ul>

<p>若候選 $p_0$ 正確，這一步就能成功 factor 出 $N$。</p>

<h4>Step 4: recover $d$</h4>

<p>當 $p, q$ 已知後，可直接算出：</p>

$$
\varphi(N) = (p-1)(q-1),
$$

<p>再由</p>

$$
ed \equiv 1 \pmod{\varphi(N)}
$$

<p>恢復 $d$（例如計算 $e^{-1} \bmod \varphi(N)$）。</p>

</div>

<!-- --- -->

### Summary

已知 $d$ 的 $n/4$ 個 **LSBs**（記為 $d_0$）時：

1. 將 $d = d_0 + 2^{n/4}x_0$
2. 由 RSA 關係式導出 Equation (15)，得到關於 $p_0 \equiv p \pmod{2^{n/4}}$ 的同餘
3. 枚舉小範圍的 $k$，對每個 $k$ 解出少量候選 $p_0$
4. 對每個候選 $p_0$ 套用 5.2 的 **Coppersmith/LLL** 因式分解法
5. 一旦 factor 成功，就能恢復完整 $d$

<div class="remark">

<ol>
  <li>這個攻擊利用了「$e$ 很小」使得 $k$ 可枚舉，以及「已知 $d$ 的低位」使得 Equation (15) 在模 $2^{n/4}$ 下不含未知 $x_0$。 </li>
  <li>真正的 heavy lifting 在於 Step 3：把「已知 $p \bmod 2^{n/4}$」轉成 factorization，這正是 5.2 的核心結論（Coppersmith + lattice/LLL）。</li>
</ol>

</div>
