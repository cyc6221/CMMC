---
layout: page
title: Provable Security
date: 2026-03-25
last_updated: 2026-03-25
tags: [provable-security, reduction, random-oracle]
---

Provable security 並不是證明一個 cryptosystem 具有絕對安全性，而是證明：**若某個 adversary 能有效攻破此系統，則可利用它去解某個公認困難的數學問題**。因此，這種安全性是建立在 hardness assumption 上的相對安全性，而不是 unconditional security。

## Basic Idea

provable security 的核心形式是 **reduction**。  
也就是說，假設存在一個 adversary $A$ 可以打破某個 cryptosystem 的安全性，則可以構造另一個 algorithm $B^A$，把 $A$ 當成 subroutine 使用，進而解出某個困難問題。

<div class="remark">
<strong>Remark.</strong>
Provable security 的典型結構是：
$$
\text{break the cryptosystem} \;\Longrightarrow\; \text{solve a hard problem}.
$$
因此，若底層困難問題被認為不可有效解決，便可反向支持該 cryptosystem 的安全性。
</div>

## Security Parameter and Non-negligible Probability

在 complexity-based cryptography 中，安全性通常以 security parameter $k$ 來衡量，例如 modulus 或 key 的 bit-length。

若某個 adversary 的成功機率至少為

$$
\frac{1}{p(k)}
$$

其中 $p(k)$ 是某個 polynomial，則稱這個成功機率是 **non-negligible**。  
也就是說，攻擊成功率不能只是極小的偶然事件，而必須在理論上足以構成有效攻擊。

## Role of Security Definitions

provable security 的重要性不只在於做 reduction proof，更在於它提供了一套精確的安全定義。  
現代密碼學中的許多基本概念，例如 semantic security、indistinguishability、existential forgery、adaptive chosen ciphertext attack，都是在這種框架下被形式化的。

<div class="remark">
<strong>Remark.</strong>
Provable security 的一個重要貢獻，是把「什麼叫安全」這件事明確化，使 cryptographic schemes 的安全性能以數學方式描述與比較。
</div>

## Reduction Proofs

在 reduction proof 中，通常希望證明：

- 若 adversary $A$ 能攻擊某個 scheme；
- 則可利用 $A$ 構造一個 algorithm $B^A$；
- 而 $B^A$ 可以有效解某個 hard problem。

這種證明方式在被動攻擊模型下通常較容易處理，例如把 encryption scheme 的安全性歸約到 DDH、QUADRES 等困難問題。

## Difficulty with Active Adversaries

當 adversary 是 active adversary 時，證明會困難得多。  
原因在於 adversary 可以查詢 decryption oracle 或 signature oracle，而 reduction algorithm 必須模擬這些 oracle 的行為。

這帶來幾個要求：

- oracle 的回答必須正確；
- oracle 的輸出分布必須看起來與真實情況一致；
- 不同查詢之間必須保持一致性；
- reduction 往往不知道 secret key，卻仍須回答這些查詢。

<div class="remark">
<strong>Remark.</strong>
Active security proof 的核心困難在於：reduction 必須在不知道 secret key 的情況下，模擬只有合法持有者才能完成的操作。
</div>

## Random Oracle Model

為了處理上述模擬困難，cryptography 中常引入 **random oracle model**。  
在此模型中，hash function 被視為一個理想化的 random oracle：

- 對新的輸入，輸出均勻隨機值；
- 對重複的輸入，保持與先前相同的輸出。

這使 reduction 可以透過控制 oracle 的回應，設計出所需的模擬環境，進而完成安全性證明。

### Limitation of the Random Oracle Model

random oracle model 雖然使許多 proof 成為可能，但它本身仍是一種理想化假設。  
真實世界中的 hash function 並不是真正的 random oracle，因此在此模型下得到的安全證明，不能直接等同於真實實作中的完整安全保證。

<div class="remark">
<strong>Remark.</strong>
A proof in the random oracle model shows security only under the additional assumption that the hash function behaves like an ideal random oracle.
</div>

<div class="remark">
<strong> 甚麼是 provable security？ </strong>

<b> Provable security（可證明安全性）</b> 是現代密碼學中用來描述安全性的數學方法。<br>

它的核心想法是：先在一個明確的安全模型中，精確定義「什麼叫做安全」；再證明如果有任何有效率的攻擊者能夠以非可忽略的優勢攻破某個密碼系統，那麼就可以利用這個攻擊者去有效率地解一個被假設為困難的數學問題。<br>

因此，在該困難假設成立的前提下，這個密碼系統對任何多項式時間攻擊者而言都是安全的，也就是說，其被攻破的成功機率或攻擊優勢至多是 <b> negligible </b>。<br>

更簡單地說，provable security 的重點在於：<b>把原本抽象的「安全性」轉化成可以用數學模型、reduction 和機率嚴格表述的命題。</b><br>

不過要注意，provable security 證明的是一種<b>條件式安全</b>：它依賴於特定的安全模型、攻擊者能力設定，以及某些計算困難假設是否成立；因此它不是對現實世界「絕對安全」的保證，而是在明確假設下所能得到的嚴格數學保證。<br>

</div>

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 20. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
