---
layout: page
title: Boneh–DeMillo–Lipton Fault Attack
date: 2026-03-11
last_updated: 2026-03-11
tags: [RSA]
---

Boneh–DeMillo–Lipton Fault Attack 是針對 **CRT-based RSA implementation** 的經典 **fault attack** <a class="cite" href="#bib-bdl01">BDL01</a>。此攻擊說明：若 attacker 能在 RSA signature 的計算過程中使其中一部分運算發生錯誤，則只要取得一個 faulted signature，就可能直接分解 RSA modulus $N$，進而 recover private key。

這類攻擊的重點不在於直接從數學上破解 RSA，而在於利用 **implementation fault**。也就是說，RSA 的數學結構本身可能是安全的，但若裝置在實際計算時遭受外部干擾，例如 voltage glitch、clock glitch、加熱、冷卻或其他硬體層級的 fault injection，則輸出的錯誤結果可能洩漏出原本不應暴露的 secret information。

在 RSA signature 的情境下，若實作使用 **Chinese Remainder Theorem (CRT)** 來加速計算，攻擊效果尤其明顯。因為 CRT 會將簽章運算拆成模 $p$ 與模 $q$ 兩部分分別計算；只要其中一邊被 fault 擾動，而另一邊仍然正確，attacker 就能利用兩者之間的不一致，從錯誤 signature 中抽出 modulus 的一個質因數。

<div class="remark">

Boneh–DeMillo–Lipton Fault Attack 常被稱為 <b>Bellcore attack</b>，兩者通常指的就是這個針對 <b>CRT-RSA signature</b> 的經典 fault attack。

</div>

## CRT-based RSA Signature

設 RSA modulus 為 $N = pq$，其中 $p,q$ 為兩個大質數，$e$ 為 public exponent，$d$ 為 private exponent。對於 message $m$，先計算其 hash $h = H(m)$。

RSA signature 的目標是計算

$$
s = h^d \pmod N.
$$

### Signature Computation

為了加速，實作上通常不直接模 $N$ 做 exponentiation，而是先分別在模 $p$ 與模 $q$ 下計算：

$$
s_p = h^{d_p} \pmod p,
$$

$$
s_q = h^{d_q} \pmod q,
$$

其中

$$
d_p = d \pmod{p-1}, \qquad d_q = d \pmod{q-1}.
$$

### CRT Recombination

接著再使用 CRT 將兩個 residue 合併成最終 signature。

$$
u = (s_q - s_p)T \pmod q,
$$

$$
s = s_p + up,
$$

其中

$$
T = p^{-1} \pmod q.
$$

這樣得到的 $s$ 同時滿足

$$
s \equiv s_p \pmod p,
\qquad
s \equiv s_q \pmod q,
$$

因此就是正確的 RSA signature。

## Fault Attack on CRT-RSA

Boneh–DeMillo–Lipton Fault Attack 的關鍵在於：attacker 不需要讓整個計算崩潰，只需要讓 CRT 計算中的其中一部分出錯即可。

### Faulted Signature

假設 attacker 成功對裝置注入 fault，使得 $s_p$ 被錯誤地計算，而 $s_q$ 仍然保持正確。此時卡片輸出的最終值 $s$ 不再是正確的 RSA signature，但它仍然保留一半正確的 CRT 結構。換言之，輸出的 $s$ 會滿足

$$
s^e \not\equiv h \pmod p,
$$

但仍有

$$
s^e \equiv h \pmod q.
$$

這表示 faulted signature 在模 $q$ 下仍然看起來像合法 signature，但在模 $p$ 下已經失效。

### Why the Attack Works

由於

$$
s^e \equiv h \pmod q,
$$

可知

$$
q \mid (s^e - h).
$$

也就是說，$s^e - h$ 一定可以被 $q$ 整除。另一方面，因為模 $p$ 下已經錯誤，所以通常有

$$
p \nmid (s^e - h).
$$

因此，$s^e - h$ 與 $N = pq$ 的最大公因數就會直接暴露其中一個質因數。

### Attack Requirements

此攻擊通常依賴以下條件：

- implementation 使用 CRT 來加速 RSA signature；
- attacker 能對裝置注入 fault；
- fault 只影響部分 computation，而非使整個裝置停止；
- attacker 能取得 faulted signature；
- attacker 知道對應的 message 或其 hash $h$。

在這些條件下，單一錯誤輸出就可能足以 factor $N$。

## Recovering a Factor of $N$

由前述關係可直接計算

$$
q = \gcd(s^e - h, N).
$$

一旦得到 $q$，就可立刻求得

$$
p = \frac{N}{q}.
$$

從而完成 modulus 的分解。之後便能重新計算

$$
\varphi(N) = (p-1)(q-1)
$$

以及 private exponent $d$，整個 RSA system 因而被破壞。

這個 attack 的本質在於：faulted signature 雖然不是合法的 RSA signature，但它仍保留「一邊正確、一邊錯誤」的 CRT 結構。正是這個不對稱性，使得 attacker 能透過 gcd computation 抽出 modulus 的一個質因數。

## Countermeasures

為了抵抗此類 fault attack，常見方法包括：

- 在輸出 signature 之前先驗證
  $$
  s^e \equiv h \pmod N;
  $$
- 避免未檢查地輸出 faulted result；
- 在 CRT 運算中加入 consistency check；
- 採用 fault detection 與 hardware protection 機制；
- 在高安全需求裝置中加強對 voltage、clock、temperature 等異常環境的監測。

防禦的核心思想是：即使內部某一步驟發生 fault，也不能讓錯誤結果直接暴露給 attacker。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 17. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)

### papers

<ul class="bib">
  <li id="bib-bdl01">
    <span class="bib-key">BDL01</span>
    <span class="bib-body">D. Boneh, R. A. DeMillo, and R. J. Lipton. <i>On the Importance of Eliminating Errors in Cryptographic Computations.</i> Journal of Cryptology, 14(2):101–119, 2001.</span>
  </li>
</ul>

### YouTube Videos

- [The theory of The Boneh, DeMillo, Lipton Fault attack](https://youtu.be/9i02fjm8EPI?si=5qlEJAG6SjMmKfea) by orel lavie
- [The Boneh, DeMillo, Lipton Fault attack in practice](https://youtu.be/XLqseoch_wM?si=hA4s2CNSKGmlVdS-) by orel lavie
- [Introduction to The Boneh, DeMillo, Lipton Fault attack - RSA-CRT](https://youtu.be/kkqEYy-fS0A?si=o6vLJTgmlhJPnX-o) by orel lavie
