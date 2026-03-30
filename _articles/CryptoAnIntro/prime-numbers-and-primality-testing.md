---
layout: page
title: Prime Numbers and Primality Testing
date: 2026-03-29
last_updated: 2026-03-30
tags: [prime, primality-testing]
---

質數在公鑰密碼中扮演核心角色。許多密碼系統的參數生成都需要大質數，例如 RSA 與 Rabin 需要選取質數 $p,q$ 來形成模數 $N=pq$；ElGamal 會需要選取滿足 $q \mid (p-1)$ 的參數；橢圓曲線系統則常要求群的階可被大質數整除。這使得「如何有效找到質數」成為實作密碼系統時的基礎問題。

與因數分解相比，檢驗一個整數是否為質數通常要容易得多。實務上可以使用非常快速的 primality testing algorithm 來判斷一個數是否為質數；有些演算法屬於 probabilistic algorithm，可能帶有極小的錯誤機率，但這個錯誤機率可以透過重複執行有效壓低。除此之外，也存在能夠輸出 primality certificate 的方法，使第三方可以快速驗證某個數確實為質數。

<div class="remark">
<strong>Remark.</strong>
<b>Why Prime Numbers Matter</b><br>
在密碼學中，質數不是單純的數論研究對象，而是建構安全參數時的基本材料。當系統需要一個難以分解的模數、需要一個具有大質數子群的乘法群，或需要一條其群階具有大質數因子的橢圓曲線時，都會回到質數生成的問題。從這個角度來看，<b>prime generation</b> and <b>primality testing</b> 是實作公鑰密碼時不可分離的兩個步驟
</div>

## Prime Density

在討論如何找到質數之前，先要了解一個更基本的問題：質數在整數中是否夠常見。若質數過於稀少，則即使有快速檢驗方法，實際生成大質數仍會變得困難；反之，若質數分布密度足夠高，則只要隨機抽樣並配合有效檢驗程序，就能在合理時間內找到所需的質數。

<div class="theorem">
<strong>Theorem. Prime Number Theorem.</strong>
The function $\pi(X)$ counts the number of primes less than $X$, where we have the approximation
$$
\pi(X)\approx \frac{X}{\log X}
$$
</div>

Prime Number Theorem 說明了質數雖然愈往後愈稀疏，但並沒有稀少到難以遇見的程度。若 $p$ 是隨機選取的一個大整數，則它為質數的機率大約是
$$
\frac{1}{\log p}.
$$
這提供了一個很重要的 heuristic：隨機抽取大整數並進行 primality test，平均不需要太多次就能找到一個質數。

<div class="example">
<strong>Example.</strong>
對一個 512-bit 的整數而言，其為質數的機率大約是
$$
\frac{1}{\log p}\approx \frac{1}{355}.
$$
若只考慮奇數，平均大約測試 $177$ 個候選值左右就能遇到一個質數。
</div>

這也是為什麼 large prime generation 在實務上是可行的：重點不在於質數是否夠多，而在於 primality test 是否夠有效率。

<div class="remark">
<strong>Remark.</strong>
The Prime Number Theorem provides a heuristic explanation for why random search is practical in prime generation: large primes are sparse, but not prohibitively rare.
</div>

## Primality Testing and Related Directions

判斷一個整數是否為質數，大致可分成兩個方向：**primality testing** 與 **primality proving**。前者著重於有效判定一個數是 prime 還是 composite；後者則著重於產生可被第三方驗證的 primality certificate。

在 primality testing 中，演算法不一定直接輸出完整證明。許多實用方法的目標，是快速排除 composite，或判定某個整數具有極高可信度為 prime。若演算法輸出 composite，通常還會附帶一個 witness，作為可驗證的 compositeness certificate。相對地，primality proving 的目標則是輸出真正的 proof of primality，並希望第三方驗證這個 proof 的成本低於重新生成它。

<div class="definition">
<strong>Definition.</strong>
A primality testing routine which produces a certificate that can be checked by a third party to prove that the number is indeed prime is called a <em>primality proving algorithm</em>, and the certificate is called a <em>proof of primality</em>.
</div>

最基本的方法是 [Trial Division]({{ "/articles/CryptoAnIntro/trial-division/" | relative_url }}). 它提供了最直接的 primality test，也可自然延伸到 factoring。當整數規模增大後，實務上更常使用 probabilistic methods，以極小錯誤機率換取效率；這部分可進一步連到 [Fermat Primality Test]({{ "/articles/CryptoAnIntro/fermat-primality-test/" | relative_url }}) 與 [Miller-Rabin Primality Test]({{ "/articles/CryptoAnIntro/miller-rabin-primality-test/" | relative_url }}). 若目標是產生可驗證的證明，則會進一步連到 [Primality Proving Algorithms]({{ "/articles/CryptoAnIntro/primality-proving-algorithms/" | relative_url }}).

另一方面，若關心的問題不只是判定 prime 或 composite，而是進一步分解整數，則主題會延伸到 factoring 的脈絡。這部分的後續內容包括 [Factoring Algorithms]({{ "/articles/CryptoAnIntro/factoring-algorithms/" | relative_url }}), [Smooth Numbers and Factoring Complexity]({{ "/articles/CryptoAnIntro/smooth-numbers-and-factoring-complexity/" | relative_url }}), [Pollard's p - 1 Method]({{ "/articles/CryptoAnIntro/pollards-p-minus-1-method/" | relative_url }}), [Difference of Two Squares and Relations]({{ "/articles/CryptoAnIntro/difference-of-two-squares-and-relations/" | relative_url }}), 與 [Number Field Sieve]({{ "/articles/CryptoAnIntro/number-field-sieve/" | relative_url }}).

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 12. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
