---
layout: page
title: Prime Numbers and Primality Testing
description: Prime numbers 在公鑰密碼中的角色，以及 primality testing 與 primality proving 的基本觀念。
date: 2026-03-30
last_updated: 2026-03-30
tags: [prime-numbers, primality-testing, computational-number-theory, cryptography]
---

質數在公鑰密碼中扮演核心角色。許多密碼系統的參數生成都需要大質數，例如 RSA 與 Rabin 需要選取質數 $p,q$ 來形成模數 $N=pq$；ElGamal 會需要選取滿足 $q \mid (p-1)$ 的參數；橢圓曲線系統則常要求群的階可被大質數整除。這使得「如何有效找到質數」成為實作密碼系統時的基礎問題。

與因數分解相比，檢驗一個整數是否為質數通常要容易得多。實務上可以使用非常快速的 primality testing algorithm 來判斷一個數是否為質數；有些演算法屬於 probabilistic algorithm，可能帶有極小的錯誤機率，但這個錯誤機率可以透過重複執行有效壓低。除此之外，也存在能夠輸出 primality certificate 的方法，使第三方可以快速驗證某個數確實為質數。

## Why Prime Numbers Matter

在密碼學中，質數不是單純的數論研究對象，而是建構安全參數時的基本材料。當系統需要一個難以分解的模數、需要一個具有大質數子群的乘法群，或需要一條其群階具有大質數因子的橢圓曲線時，都會回到質數生成的問題。從這個角度來看，prime generation 與 primality testing 是實作公鑰密碼時不可分離的兩個步驟。

## Prime Density

在討論如何找到質數之前，先要了解一個更基本的問題：質數在整數中是否夠常見。若質數過於稀少，則即使有快速檢驗方法，實際生成大質數仍會變得困難；反之，若質數分布密度足夠高，則只要隨機抽樣並配合有效檢驗程序，就能在合理時間內找到所需的質數。

<div class="theorem">
<strong>Theorem 12.1 (Prime Number Theorem).</strong>
The function $\pi(X)$ counts the number of primes less than $X$, where we have the approximation
$$
\pi(X)\approx \frac{X}{\log X}.
$$
</div>

Prime Number Theorem 說明了質數雖然愈往後愈稀疏，但並沒有稀少到難以遇見的程度。若 $p$ 是隨機選取的一個大整數，則它為質數的機率大約是
$$
\frac{1}{\log p}.
$$
這提供了一個很重要的 heuristic：隨機抽取大整數並進行 primality test，平均不需要太多次就能找到一個質數。

例如對一個 512-bit 的整數而言，其為質數的機率大約是
$$
\frac{1}{\log p}\approx \frac{1}{355}.
$$
若只考慮奇數，平均大約測試 $177$ 個候選值左右就能遇到一個質數。這也是為什麼 large prime generation 在實務上是可行的：重點不在於質數是否夠多，而在於 primality test 是否夠有效率。

<div class="remark">
<strong>Remark.</strong>
The Prime Number Theorem provides a heuristic explanation for why random search is practical in prime generation: large primes are sparse, but not prohibitively rare.
</div>

## Primality Testing and Primality Proving

判斷一個整數是否為質數，大致可以分成兩種方向。

第一種是 **primality testing**。這類方法的目標是在效率與可信度之間取得平衡。很多實用演算法並不直接輸出「這個數一定是質數」的證明，而是輸出「這個數看起來像質數」或「這個數一定是合數」的判斷。若演算法輸出合數，通常還會附帶一個 witness，作為可驗證的 compositeness certificate。

第二種是 **primality proving**。這類方法的目標不是只給出高可信度的結論，而是輸出一個真正的 proof of primality。這個 proof 應該滿足一個自然要求：第三方驗證它時，所花的代價要比生成它更小。也就是說，primality certificate 的價值不只在於說服自己，而在於它能被快速獨立驗證。

<div class="definition">
<strong>Definition.</strong>
A primality testing routine which produces a certificate that can be checked by a third party to prove that the number is indeed prime is called a <em>primality proving algorithm</em>, and the certificate is called a <em>proof of primality</em>.
</div>

## Trial Division as a Baseline

最直接的 primality test 是 trial division。對輸入 $p$，逐一檢查 $2$ 到 $\sqrt{p}$ 之間的整數是否整除 $p$；若沒有任何非平凡因數，則 $p$ 為質數。這個方法的優點在於它不只判斷合數，還能直接給出一個非平凡因數，因此當輸出為 composite 時，驗證非常直接。

但 trial division 的缺點也很明顯。若輸入本身是質數，最壞情況需要做到 $\sqrt{p}$，而這相對於輸入長度 $\log_2 p$ 而言是指數時間，因此不適合用在大整數上。它也無法為「是質數」這件事提供精簡而可重複驗證的 certificate；若要再次確認，只能把整個程序重做一次。

不過，trial division 並非完全沒有價值。對很小的數，它仍然是最自然的方法；而在較進階的 primality tests 中，也常先拿小質數做 partial trial division，快速排除大量顯然的合數。例如，先檢查所有小於 $100$ 的質數因子，可以大幅縮小後續需要進一步測試的候選集合。

<div class="remark">
<strong>Remark.</strong>
Trial division is computationally inefficient for large inputs, but it remains useful as a preliminary filtering step before more advanced primality tests are applied.
</div>

## Probabilistic Viewpoint

現代 primality testing 的重要觀念之一，是接受「極小錯誤機率」作為效率交換的代價。對於大整數候選值，與其追求每一次都給出絕對確定的證明，實務上更常做的是使用快速的 probabilistic test，並透過多次獨立測試將錯誤機率壓到可以忽略的程度。這類方法的核心不是一次就保證正確，而是讓錯誤機率隨重複次數呈指數下降。

在這個框架下，後續常見的演算法包括 Fermat test 與 Miller–Rabin test。前者利用 Fermat’s Little Theorem 建構 compositeness test，但會遇到 pseudo-primes 與 Carmichael numbers 的問題；後者則進一步修正這個弱點，使得每次測試接受 composite 的機率能夠有效受控。

<div class="remark">
<strong>Remark.</strong>
In practical prime generation, the main issue is usually not whether primality can be proven in principle, but whether compositeness can be rejected quickly and probable primes can be identified with negligibly small error.
</div>

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 12. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
