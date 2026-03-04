---
layout: page
title: PRIMES is in P
date: 2026-03-02
last_updated: 2026-03-02
label: "paper"
tags: [primality testing, prime, paper]
---

試除法等價於檢查所有 $m\le \sqrt{n}$ 的除法，因此需要 $\Omega(\sqrt{n})$ 次操作； **Sieve of Eratosthenes** 雖然能在產生「小於 $n$ 的所有質數」時做到約 $O(n\log\log n)$ 的時間，但其成本仍以 $n$ 本身為尺度，而非輸入長度 $\lceil\log n\rceil$ 為尺度，因此對大型 $n$ 依然不符合複雜度理論中「有效率」的標準。複雜度理論中的高效率通常指時間是輸入長度的多項式，即 $\mathrm{poly}(\log n)$。

**Fermat's Littel Theorem** 指出：若 $p$ 為質數且 $p\nmid a$，則 $a^{p-1}\equiv 1\pmod p$，因此可用快速冪有效率檢查 $a^{n-1}\equiv 1\pmod n$。此方法仍不足以構成正確的質數判定，因為合成數可能對某些 $a$ 通過，而 **Carmichael number** 甚至會對所有與 $n$ 互質的 $a$ 通過。<a class="cite" href="#bib-car10">Car10</a>

## 複雜度觀點下的 PRIMES

語言 **PRIMES**（所有質數所構成的集合）落在 **co-NP**：若 $n$ 是合成數，給出一個非平凡因子 $d$（滿足 $1<d<n$ 且 $d\mid n$）即可在多項式時間內驗證 $n\notin PRIMES$。此外，Pratt 在 1975 年證明 PRIMES 也屬於 **NP** <a class="cite" href="#bib-pra75">Pra75</a>：每個質數都存在可在多項式時間驗證的精簡證書（succinct certificate），因此

$$
PRIMES \in NP \cap coNP.
$$

### 重要演算法路線回顧

- **Miller–Rabin（Rabin）**：無條件、隨機化、多項式時間；至今仍是實務上最常用的 probable prime test 之一，常用於大質數候選的快速篩選。<a class="cite" href="#bib-rab80">Rab80</a>
- **Solovay–Strassen**：在教學與理論脈絡中仍具代表性，能清楚展示 Jacobi/Legendre（二次剩餘）如何導出質數測試；實務上多半由 Miller–Rabin 與其組合測試取代。<a class="cite" href="#bib-ss77">SS77</a>
- **橢圓曲線路線（Goldwasser–Kilian / Atkin / Adleman–Huang）**：建立「可產生質數證書」的方向，使第三方能快速驗證質數性；後續發展成實務上常用的 primality proving（如 ECPP）的核心基礎。<a class="cite" href="#bib-gk86">GK86</a>
- **AKS**：給出無條件、確定性、多項式時間的質數判定，證明 $PRIMES \in P$；主要價值在複雜度理論與方法學層面的里程碑意義。<a class="cite" href="#bib-aks04">AKS04</a>

## AKS 的主要結論

本文給出第一個**無條件（unconditional）**、**確定性（deterministic）**、**多項式時間（polynomial-time）** 的質數判定演算法，證明

$$
PRIMES \in P.
$$

AKS 的原始分析（早期版本）可寫成 $\tilde O((\log n)^{12})$，在發表版中改進為約 $\tilde O((\log n)^{7.5})$；其中 $\tilde O(\cdot)$ 表示忽略多重對數（polylog）因子。<a class="cite" href="#bib-aks04">AKS04</a>  

Introduction 也指出：若採用關於 **Sophie Germain primes / safe primes** 的分布密度之啟發式假設，AKS 的時間界可進一步降到 $\tilde O((\log n)^6)$；此類密度型假設目前仍缺乏完整證明。<a class="cite" href="#bib-aks04">AKS04</a>  

後續 Lenstra 與 Pomerance 以 **Gaussian periods** 改寫 AKS 類方法，在**不依賴任何 Sophie Germain 相關假設**的情況下，也能達到約 $(\log n)^6\cdot(2+\log\log n)^c$ 的確定性時間界（其中 $c$ 為可有效計算的常數）。<a class="cite" href="#bib-lp05">LP05</a>

## References

<ul class="bib">
  <li id="bib-car10">
    <span class="bib-key">Car10</span>
    <span class="bib-body">R. D. Carmichael. *Note on a number theory function.* Bull. Amer. Math. Soc., 16:232–238, 1910.</span>
  </li>
  <li id="bib-pra75">
    <span class="bib-key">Pra75</span>
    <span class="bib-body">V. Pratt. *Every prime has a succinct certificate.* SIAM Journal on Computing, 4:214–220, 1975.</span>
  </li>
  <li id="bib-rab80">
    <span class="bib-key">Rab80</span>
    <span class="bib-body">M. O. Rabin. *Probabilistic algorithm for testing primality.* J. Number Theory, 12:128–138, 1980.</span>
  </li>
  <li id="bib-ss77">
    <span class="bib-key">SS77</span>
    <span class="bib-body">R. Solovay and V. Strassen. *A fast Monte-Carlo test for primality.* SIAM Journal on Computing, 6:84–86, 1977.</span>
  </li>
  <li id="bib-gk86">
    <span class="bib-key">GK86</span>
    <span class="bib-body">S. Goldwasser and J. Kilian. *Almost all primes can be quickly certified.* In *Proceedings of the Annual ACM Symposium on the Theory of Computing*, pages 316–329, 1986.</span>
  </li>
  <li id="bib-aks04">
    <span class="bib-key">AKS04</span>
    <span class="bib-body">M. Agrawal, N. Kayal, and N. Saxena. *PRIMES is in P.* Annals of Mathematics, 160(2):781–793, 2004.</span>
  </li>
  <li id="bib-lp05">
    <span class="bib-key">LP05</span>
    <span class="bib-body">H. W. Lenstra, Jr. and C. Pomerance. *Primality testing with Gaussian periods*, 2005.</span>
  </li>
</ul>

<!-- 
存連結
https://www.cse.iitk.ac.in/users/manindra/algebra/primality_v6.pdf
https://annals.math.princeton.edu/wp-content/uploads/annals-v160-n2-p12.pdf
 -->