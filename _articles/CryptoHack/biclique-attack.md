---
layout: page
title: Biclique Attack
date: 2026-03-08
last_updated: 2026-03-08
label:
tags: [CryptoHack, Symmetric Cryptography, AES]
---

Biclique attack 是一種針對區塊密碼的密碼分析方法。2011 年，Bogdanov 等人利用這個方法，提出了對 **full AES** 的第一個「**在理論上比 brute force 略快**」的 key-recovery attack。對 **AES-128** 而言，其時間複雜度約為 **\(2^{126.1}\)**，相比暴力破解所需的 **\(2^{128}\)**，只帶來非常有限的改進。換句話說，這項結果在理論上確實略微降低了 AES-128 的安全強度，但降幅極小。<a class="cite" href="#bib-bog11">Bog11</a>

這類結果的重要性主要在於**理論層面**。它說明了 full AES 並非在嚴格意義下與窮舉搜尋完全等價，也就是說，研究者確實找到了一種比單純枚舉所有金鑰更有效率的攻擊方式。然而，從**實務角度**來看，biclique attack 的成本仍然極高，遠遠超出現實可行範圍，因此通常**不被視為對 AES 實際部署的可信威脅**。在目前的公開研究中，AES 仍然被普遍視為安全且廣泛使用的主流 block cipher。<a class="cite" href="#bib-bog11">Bog11</a>

換個角度來看，biclique attack 的意義更接近於「**理論上的小幅突破**」，而不是「**實務上的重大破壞**」。雖然它在非常狹義的學術定義下可以被稱為對 AES 的一種 break，因為它優於 brute force，但這並不表示 AES 在真實世界中已經不安全。相反地，AES 仍然具有相當充足的 security margin，而 biclique attack 也沒有動搖其在現代密碼學與工程實作中的核心地位。

Biclique attack 之所以經常被提及，主要是因為它是針對 **full-round AES** 的分析結果，而不是只攻擊 reduced-round 版本。不過，它對安全性的影響仍然非常有限：對 AES-128 而言，安全等級只是從 128 bits 略微下降到約 126.1 bits。因此，這項成果通常被理解為密碼分析上的理論進展，而不是足以改變 AES 實際安全性的重大突破。<a class="cite" href="#bib-bog11">Bog11</a>

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
