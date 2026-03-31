---
layout: page
title: Primality Proving Algorithms
date: 2026-03-29
last_updated: 2026-03-31
tags: [primality-proving, primality-testing, ecpp, elliptic-curves, hyperelliptic-curves]
---

primality proving algorithm 的目標，不是只給出「這個數很可能是 prime」的判定，而是要輸出一個可以被第三方驗證的證明，使得某個整數確實為 prime。這和 probabilistic primality testing 的角色不同：後者主要用來快速排除 composite，或給出高度可信的 probable prime；前者則要求真正的證明物件可以被獨立檢查。原始章節一開始便指出，這類證明的一個自然要求是：**驗證 proof 的成本應該低於生成 proof 的成本**。:contentReference[oaicite:0]{index=0}

## From Primality Testing to Primality Proving

在實作上，許多 primality testing algorithm 的輸出其實是 **certificate of compositeness**，而不是 certificate of primality。也就是說，當演算法發現一個數是 composite 時，往往可以順便給出 witness；但若演算法輸出 probable prime，這通常並不等於它已經給出了「一定是質數」的正式證明。

因此，primality proving 要處理的是另一個層次的問題：當一個整數已經通過了多輪的 probabilistic tests，現在希望進一步獲得一個完全確定的證明時，應該如何做到。這使得 primality proving algorithm 在實際流程中，通常不是最前線的篩選工具，而是用在候選值已經非常可信之後。:contentReference[oaicite:2]{index=2}

<div class="definition">
<strong>Definition.</strong>
A primality testing routine which produces a certificate which can be checked by a third party to prove that the number is indeed prime is called a <em>primality proving algorithm</em>, and the certificate will be called a <em>proof of primality</em>.
</div>

<div class="remark">
<strong>Remark.</strong>
A proof of primality is not merely a positive test outcome. It is an explicit certificate that supports independent and efficient verification.
</div>

## Why a Proof of Primality Is Different

對一個輸出為 composite 的演算法而言，證明通常很直接。例如若試除法找到一個非平凡因數，或若 Fermat test / Miller–Rabin test 找到 witness，那麼驗證者只要重新檢查這個 witness 是否成立即可。這類情況下，證明的是「它不是質數」。:contentReference[oaicite:3]{index=3}

但對 prime 而言，事情並沒有那麼直接。單純說「目前沒找到任何反例」並不足以構成證明。primality proving algorithm 需要輸出某種結構化的 certificate，使得驗證者能在不重新執行整個搜尋過程的前提下，快速確認 primality。

<div class="remark">
<strong>Remark.</strong>
A certificate of compositeness usually consists of a witness against primality, whereas a proof of primality must positively certify that no such obstruction exists.
</div>

## Practical Role of Primality Proving

在實作上，primality proving algorithm 通常不會一開始就直接對隨機整數使用。更常見的流程是：

1. 先用快速的 primality tests 篩選候選值；
2. 讓候選值通過多輪 Miller-Rabin 之類的 probabilistic tests；
3. 當這個數已經高度可信地看起來是 prime 時，再使用 primality proving algorithm 產生最終 proof。

這樣的安排是合理的，因為 probabilistic test 非常快，能迅速排除大部分 composite；而 primality proving 的目標則是把最後這個「高度可信」進一步提升成「完全確定」。原始章節也明確說明，這類 proving programs 通常是在 one is morally certain that the number is actually prime 的情況下才會被呼叫。:contentReference[oaicite:4]{index=4}

<div class="remark">
<strong>Remark.</strong>
In practice, primality proving is often applied only after a number has already passed several rounds of probabilistic primality tests.
</div>

## ECPP

原始章節指出，最成功的 primality proving algorithm 是 **ECPP**, 即 **Elliptic Curve Primality Prover**。它是建立在 elliptic curves 上的 primality proving method。這條路線本身並不是憑空出現的，而是延續了較早的 finite-field primality proving ideas，再發展出 elliptic-curve 版本。:contentReference[oaicite:5]{index=5}

<div class="definition">
<strong>Definition.</strong>
ECPP stands for <em>Elliptic Curve Primality Prover</em>.
</div>

原始章節也提到，ECPP 的前身可以追溯到 Pocklington 與 Lehmer 的 primality proving algorithm，而 elliptic curve variant 則與 Goldwasser 和 Kilian 有關。這表示 ECPP 並不只是「把橢圓曲線拿來做 primality test」，而是把 primality proving 的證明框架移植到更豐富的群結構中，利用 elliptic curves 的算術來構造 proof of primality。:contentReference[oaicite:6]{index=6}

## Nature of ECPP

ECPP 是 randomized algorithm。這意味著它不是單純的 deterministic verification procedure，而是在生成 proof 的過程中帶有隨機性。原始章節對它的性質有兩個重要描述：

- 當輸入是 prime 時，ECPP **並沒有數學上保證一定輸出 witness**；
- 當輸入是 composite 時，ECPP **也不保證一定會 terminate**。:contentReference[oaicite:7]{index=7}

這兩點很重要。它們說明 ECPP 雖然在實務上非常成功，但其理論保證並不是「對所有輸入都穩定地完成」。也就是說，ECPP 的強項不是絕對形式上的 termination guarantee，而是實際表現非常好。

<div class="remark">
<strong>Remark.</strong>
ECPP is a randomized algorithm. It is not mathematically guaranteed to always produce an output when the input is prime, and if the input is composite it is not guaranteed to terminate at all.
</div>

儘管如此，ECPP 仍然具有兩個非常強的優點。第一，它 **runs in polynomial time**；第二，它所產生的 **proofs of primality can be verified even faster**。這使得它非常適合放在「生成端較重、驗證端較輕」的應用場景中。

<div class="lemma">
<strong>Lemma.</strong>
The ECPP algorithm runs in polynomial time, and the proofs of primality it produces can be verified even faster.
</div>

這裡的重點不是只說 ECPP 很快，而是它符合 primality proving 所要求的理想型態：**生成 proof 雖然需要較多工作，但 verification 更便宜**。這正是 certificate-based proof system 應有的設計方向。

## Finite-Field Roots and Elliptic-Curve Extension

原始章節指出，ECPP 並不是第一個 primality proving algorithm。更早之前已有建立在 finite fields 上的方法，代表性名字是 **Pocklington** 與 **Lehmer**。ECPP 可看作是把 primality proving 的證明框架推進到 elliptic curves 的版本。:contentReference[oaicite:9]{index=9}

<div class="remark">
<strong>Remark.</strong>
The elliptic-curve approach to primality proving extends older finite-field methods associated with Pocklington and Lehmer.
</div>

這種延伸是重要的，因為 elliptic curves 提供了更靈活的群結構，使得在實作與效率上能夠比舊方法更有優勢。也正因如此，ECPP 會被描述為最成功的 primality proving algorithm。

## Adleman-Huang Algorithm

除了 ECPP 之外，原始章節也提到另一條不同路線：**Adleman and Huang** 的 primality proving algorithm。它和 ECPP 的最大差別，在於它對 termination 有更強的數學保證。:contentReference[oaicite:10]{index=10}

<div class="lemma">
<strong>Lemma.</strong>
There is an algorithm due to Adleman and Huang which, unlike the ECPP method, is guaranteed to terminate with a proof of primality on input of a prime number.
</div>

這個演算法不是建立在普通 elliptic curves 上，而是建立在 **hyperelliptic curves** 的 generalized setting 上。也就是說，它把曲線方法再往上推廣到更複雜的幾何物件。:contentReference[oaicite:11]{index=11}

<div class="definition">
<strong>Definition.</strong>
The Adleman-Huang primality proving algorithm is based on a generalization of elliptic curves called <em>hyperelliptic curves</em>.
</div>

## Theoretical Guarantee versus Practical Efficiency

Adleman-Huang method 的理論吸引力在於：當輸入是 prime 時，它 **guaranteed to terminate with a proof of primality**。這和 ECPP 形成鮮明對比，因為 ECPP 雖然在實務上非常好用，但並沒有同樣強的 termination guarantee。:contentReference[oaicite:12]{index=12}

然而，原始章節也指出，Adleman-Huang algorithm 據作者所知從未被實作。原因不只是它所涉及的數學更複雜，也包括一個很實際的考量：雖然 hyperelliptic variant 在理論上有保證，但在實務上 ECPP 幾乎總是能以更少的工作量產生 proof。:contentReference[oaicite:13]{index=13}

<div class="remark">
<strong>Remark.</strong>
The hyperelliptic-curve method has a stronger mathematical guarantee, but ECPP is preferred in practice because it typically produces primality proofs with less work.
</div>

這個對比很能反映 computational number theory 中常見的一種情況：**理論最強保證的演算法，不一定是實務上最成功的演算法**。在 primality proving 這個主題中，ECPP 與 Adleman-Huang 正好代表了這兩種不同取向：

- ECPP：practical success, efficient proofs, weaker formal guarantee；
- Adleman-Huang：stronger formal guarantee, heavier mathematics, little practical adoption。

## Polynomial-Time Primality Proofs

原始章節最後也明確指出：若確實需要完全確定某個數是 prime，則存在能在 polynomial time 內完成的 primality proving algorithms。這件事的意義在於，primality 不只是可測試的，還是可證明的，而且證明過程不需要超出可接受的計算範圍。

<div class="theorem">
<strong>Theorem.</strong>
If one really needs to be certain that a number is prime, then there are primality proving algorithms which run in polynomial time.
</div>

這裡的重點不在於所有 polynomial-time primality proving algorithms 都同樣適合實作，而在於從理論與方法論上，**prime can be certified efficiently** 這件事是成立的。對密碼系統而言，這表示當應用場景真的需要形式上無可爭議的 prime certificate 時，並不需要退回到指數級成本的方法。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 12. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
