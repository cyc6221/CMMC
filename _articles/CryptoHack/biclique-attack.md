---
layout: page
title: Biclique Attack
date: 2026-03-08
last_updated: 2026-03-08
label:
tags: [CryptoHack, Symmetric Cryptography, AES]
---

Biclique attack 是一種針對區塊密碼的密碼分析方法。2011 年，Bogdanov 等人將此技巧應用到 **full AES**，提出了第一個在**理論上略優於 brute force** 的 key-recovery attack。以 **AES-128** 為例，其時間複雜度約為 **$2^{126.1}$**，相比暴力破解的 **$2^{128}$**，確實稍微降低了理論安全強度。<a class="cite" href="#bib-bog11">Bog11</a>

不過，這種改進的幅度其實非常有限。雖然從學術定義上來看，只要存在比 brute force 更快的攻擊，就可以說該 cipher 在某種狹義下被「break」了；但 biclique attack 的成本仍然高得不可實行，因此它**不構成對 AES 實際部署的可信威脅**。也就是說，這項結果更像是在理論分析上取得了一點進展，而不是在現實世界中真正動搖了 AES 的安全性。

這也是 biclique attack 最值得注意的地方：它不是攻擊 reduced-round AES，而是直接針對 **full-round AES** 給出結果。因此，它常被拿來作為一個例子，說明即使是像 AES 這樣被廣泛信任的 block cipher，也仍然可以被持續研究與改進分析；只是這種分析結果未必代表實務上的危險。

整體而言，biclique attack 的意義主要在於：它顯示 **full AES 並非在嚴格形式上與窮舉搜尋完全等價**，但這個差距非常小，小到不足以改變 AES 在現代密碼學與工程實作中的核心地位。對使用者而言，AES 依然是安全且主流的對稱式加密標準；而對研究者而言，biclique attack 則是一個具有代表性的理論成果。<a class="cite" href="#bib-bog11">Bog11</a>

## References

<ul class="bib">
  <li id="bib-bog11">
    <span class="bib-key">Bog11</span>
    <span class="bib-body">A. Bogdanov, D. Khovratovich, and C. Rechberger. <i>Biclique Cryptanalysis of the Full AES.</i> In <i>Advances in Cryptology – ASIACRYPT 2011</i>, pages 344–371, 2011.</span>
  </li>
  <li id="bib-cryptohack">
    <span class="bib-key">CH</span>
    <span class="bib-body">CryptoHack. <i>AES.</i> Course page. Available at: <a href="https://cryptohack.org/courses/symmetric/aes1/">https://cryptohack.org/courses/symmetric/aes1/</a>.</span>
  </li>
  <li id="bib-wikibiclique">
    <span class="bib-key">Wiki</span>
    <span class="bib-body">Wikipedia contributors. <i>Biclique attack.</i> Wikipedia. Available at: <a href="https://en.wikipedia.org/wiki/Biclique_attack">https://en.wikipedia.org/wiki/Biclique_attack</a>.</span>
  </li>
</ul>
