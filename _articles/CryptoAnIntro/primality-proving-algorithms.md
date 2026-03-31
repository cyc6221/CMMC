---
layout: page
title: Primality Proving Algorithms
date: 2026-03-29
last_updated: 2026-03-31
tags: [primality-testing, ecpp, elliptic-curves, hyperelliptic-curves]
---

primality proving algorithm 的目標，不是只給出「這個數很可能是 prime」的判定，而是輸出一個可以被第三方獨立驗證的證明，使得某個整數確實為 prime。這和 probabilistic primality testing 的角色不同：後者主要用來快速排除 composite，或給出高度可信的 probable prime；前者則要求能夠提供真正的證明物件，並且讓驗證成本低於生成成本。

## From Primality Testing to Primality Proving

在實作上，許多 primality testing algorithm 的輸出其實是 compositeness 的證據，而不是 primality 的證據。也就是說，當演算法發現一個數是 composite 時，往往可以同時給出 witness；但若演算法輸出 probable prime，這通常並不等於它已經給出了「一定是質數」的正式證明。

因此，primality proving 要處理的是另一個層次的問題：當一個整數已經通過多輪 probabilistic tests，現在希望進一步獲得一個完全確定的證明時，應該如何做到。這使得 primality proving algorithm 在實際流程中，通常不是最前線的篩選工具，而是用在候選值已經非常可信之後。

### Proof of Primality

proof of primality 並不只是一次正面的測試結果，而是一份可被獨立檢查的 certificate。驗證者不需要重新執行整個搜尋流程，只需要檢查這份證明本身是否成立，即可確認該整數為 prime。

<div class="remark">
<strong>Remark.</strong>
A proof of primality is stronger than an output of “probably prime.” It is an explicit certificate that supports independent verification.
</div>

### Compositeness Witness and Primality Certificate

對於輸出為 composite 的情況，證明通常較直接。例如若演算法找到非平凡因數，或找到某個 witness 使得 primality test 失敗，則驗證者只需重新檢查該 witness 是否成立即可。這類證據所表明的是「它不是質數」。

但對 prime 而言，情況並不相同。單純說「目前沒有找到反例」並不足以構成證明。primality proving algorithm 必須輸出某種結構化的 certificate，使得驗證者能夠正面確認 primality。

## Practical Role of Primality Proving

在實作上，primality proving algorithm 通常不會直接拿來處理隨機整數。更常見的流程是先用快速的 probabilistic primality tests 篩選候選值，讓候選值通過多輪 Miller–Rabin 之類的測試之後，再使用 primality proving algorithm 產生最終 proof。

這樣的安排是合理的，因為 probabilistic tests 非常快，能迅速排除大部分 composite；而 primality proving 的目標則是把最後這個「高度可信」進一步提升成「完全確定」。

<div class="remark">
<strong>Remark.</strong>
In practice, primality proving is often applied only after a number has already passed several rounds of probabilistic primality tests.
</div>

## ECPP

ECPP 是目前最成功的 primality proving algorithm 之一。ECPP 是 **Elliptic Curve Primality Prover** 的縮寫，表示它是建立在 elliptic curves 上的 primality proving method。它延續了較早期 finite-field primality proving 的思路，並將證明框架發展到 elliptic-curve setting 中。

### Nature of ECPP

ECPP 是 randomized algorithm。這表示它在生成 proof 的過程中使用隨機性，而不是單純的 deterministic verification procedure。

它的性質有兩個重要特點：

- 當輸入是 prime 時，它在數學上不保證一定會輸出 proof；
- 當輸入是 composite 時，它也不保證一定會終止。

這說明 ECPP 的強項並不是最強形式的 termination guarantee，而是在實際使用中表現非常成功。

<div class="remark">
<strong>Remark.</strong>
ECPP is a randomized algorithm. Its practical performance is strong, but its termination behavior is not given in the strongest possible form for every input.
</div>

### Efficiency of ECPP

儘管如此，ECPP 仍然具有兩個非常重要的優點。第一，它可以在 polynomial time 內運作；第二，它所產生的 proofs of primality 可以更快地被驗證。這使得它非常適合用在「生成 proof 較重、驗證 proof 較輕」的應用情境中。

這裡的重點不只是 ECPP 很快，而是它符合 certificate-based proof system 的理想形式：生成 proof 需要較多工作，但 verification 更便宜。

### Finite-Field Background

在 elliptic-curve 方法之前，已經有建立在 finite fields 上的 primality proving algorithm。ECPP 可以看作是把 primality proving 的方法推進到 elliptic curves 的版本。由於 elliptic curves 提供了更靈活的群結構，因此在效率與實務表現上往往更有優勢，這也是 ECPP 能夠成為最成功方法之一的重要原因。

## Adleman–Huang Algorithm

除了 ECPP 之外，另一條不同的路線是 Adleman–Huang primality proving algorithm。它和 ECPP 的主要差別，在於它對 termination 有更強的數學保證。

當輸入是 prime 時，Adleman–Huang algorithm 保證能夠終止並輸出 proof of primality。這一點與 ECPP 形成明顯對比。

### Hyperelliptic Curves

這個演算法不是建立在普通 elliptic curves 上，而是建立在 hyperelliptic curves 上。也就是說，它把曲線方法進一步推廣到更複雜的幾何結構中。

### Theoretical Guarantee and Practical Use

Adleman–Huang method 的理論吸引力在於，它對 prime input 具有明確的 termination guarantee。不過在實務上，這種方法並沒有像 ECPP 那樣廣泛採用。

造成這種差異的原因，一方面是 hyperelliptic curve 所涉及的數學較為複雜，另一方面則是因為在實際使用中，ECPP 通常能以較少的工作量產生 primality proof，因此更具實務優勢。

<div class="remark">
<strong>Remark.</strong>
The hyperelliptic-curve method offers a stronger formal guarantee on prime inputs, while ECPP is generally preferred in practice because it typically achieves the goal with less work.
</div>

## Polynomial-Time Primality Proofs

若需要對某個整數是否為 prime 給出完全確定的結論，則存在能在 polynomial time 內完成的 primality proving algorithms。這表示 primality 不只是可測試的，也是可證明的，而且證明過程仍然落在可接受的計算範圍內。

這裡的重點不在於所有 polynomial-time primality proving algorithms 都同樣適合實作，而在於從理論與方法論上，prime 可以被有效率地 certification，並不需要退回到指數級成本的方法。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 12. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
