---
layout: page
title: Block Cipher
date: 2026-03-09
last_updated: 2026-03-09
tags: [block-cipher, DES, AES]
---

Block cipher（區塊密碼）是對稱式加密中最核心的 primitive 之一。它以**固定長度的資料區塊**為單位進行轉換：給定一把 secret key，將一個 plaintext block 映射成一個 ciphertext block，並且應當能夠有效地反向解密。

本頁整理 block cipher 的基本定義、block size、modes of operation、DES 與 AES 的背景，以及 iterated block cipher、round function、key schedule、invertibility 與常見 cryptanalysis 的概念。

## Basic Description

一個 block cipher 以固定長度的 block 為輸入與輸出。若以 $m$ 表示 plaintext block，$k$ 表示 secret key，$c$ 表示 ciphertext block，則可寫為

$$
c = e_k(m),
$$

其中 $e$ 是 encryption function。對應的 decryption function 記為 $d$，滿足

$$
m = d_k(c).
$$

也就是說，對每一個固定的 key $k$，加密與解密應形成一對互逆的轉換。因此，對固定的 key 而言，block cipher 可以視為定義在固定長度 block 空間上的一個可逆轉換。

<div class="remark">
  <p><b>Notation.</b> Let
  <ul>
    <li>$m$ denote the plaintext block</li>
    <li>$k$ denote the secret key</li>
    <li>$e$ denote the encryption function</li>
    <li>$d$ denote the decryption function</li>
    <li>$c$ denote the ciphertext block</li>
  </ul>
</div>

## Block Size

Block cipher 的一個基本參數是 **block size**。它決定一次加密操作所處理的資料長度。

早期的 DES 採用 **64-bit block size**。現代 block cipher 則多半使用 **128 bits** 或更大的 block size。較大的 block size 通常有助於降低某些由區塊重複所造成的風險，因此在現代設計中更常見。

## Modes of Operation

由於 block cipher 一次只能處理固定大小的一個 block，而實際訊息通常長於單一 block，因此需要一套方法將多個 block 串接起來加密，這就是 **mode of operation**。

mode of operation 決定了：

- 多個 plaintext blocks 如何依序加密
- 各個 ciphertext blocks 之間是否存在相依性
- transmission error 會如何影響解密結果
- 是否需要額外輸入，例如 initialization vector（IV）

某些 mode 會讓第一個 block 的輸出影響第二個 block 的加密，進而影響整段訊息的安全性與錯誤傳播特性。

<div class="example">
  <p>常見的 block cipher modes of operation 包括：</p>
  <ul>
    <li><b>ECB</b>: Electronic Codebook</li>
    <li><b>CBC</b>: Cipher Block Chaining</li>
    <li><b>CFB</b>: Cipher Feedback</li>
    <li><b>OFB</b>: Output Feedback</li>
    <li><b>CTR</b>: Counter Mode</li>
  </ul>
</div>

### initialization vector (IV)

有些 modes of operation 需要一個初始值輸入到 encryption 與 decryption 中，常見稱為 **initialization vector (IV)**。IV 的使用目的通常包括：

- 避免相同 plaintext 在相同 key 下總是產生相同 ciphertext
- 提高多次加密相似訊息時的安全性
- 為多 block 結構提供必要的隨機化或同步資訊

mode 的選擇在實務中極為重要，因為即使底層 block cipher 安全，不適當的 mode 仍可能導致系統脆弱。

## Examples of Block Ciphers

Block cipher 的例子包含早期的重要設計與現代常見標準：

<div class="example">
  <ul>
    <li><b>DES</b>（Data Encryption Standard）：歷史上非常重要的 block cipher，但因為 key length 過短，現今已不再被視為安全標準</li>
    <li><b>3DES</b>（Triple DES）：透過多次套用 DES 來提升安全性的延伸設計</li>
    <li><b>AES</b>（Advanced Encryption Standard）：目前最主要的現代對稱式 block cipher 標準</li>
    <li><b>RC5</b>：一種設計上強調簡潔與效率的 block cipher</li>
    <li><b>RC6</b>：曾作為 AES 競賽 finalist 的 block cipher</li>
  </ul>
</div>

在這些 block ciphers 中，DES 具有特別重要的歷史地位，而 AES 則是現代標準。

## DES

DES（Data Encryption Standard）是最著名的早期 block cipher 之一。它在 1970 年代中期被採用為美國聯邦標準，之後也迅速成為銀行應用中的事實標準。

### Characteristics of DES

- block size: 64 bits
- key length: 56 bits

DES 在其時代是一個極具影響力的設計，但到了 1990 年代初，逐漸顯露出不足之處。

### Why DES Became Inadequate

主要原因包括：

1. **Block length too small**  
   64-bit block size 對後來的應用而言偏小。

2. **Key length too short**  
   56-bit key 已不足以抵抗現代計算能力下的 exhaustive search。

隨著電腦網路與專用硬體的進步，56-bit DES key 已可被實際恢復，因此 DES 不再適合作為新的加密標準。

## AES Competition and Rijndael

為了取代 DES，NIST（National Institute of Standards and Technology）發起了一場公開競賽，目標是選出新的 block cipher standard，也就是後來的 **AES（Advanced Encryption Standard）**。

與 DES 的設計過程不同，AES 的選拔與分析是公開進行的。來自世界各地的研究團隊提交候選演算法，最終有五個演算法進入決選：

- **MARS**，由 IBM 的研究團隊提出
- **RC6**，由 RSA Security 的研究團隊提出
- **Twofish**，由 Counterpane、UC Berkeley 與其他研究者組成的團隊提出
- **Serpent**，由來自以色列、挪威與英國的三位學者提出
- **Rijndael**，由兩位比利時密碼學家提出

最後，NIST 於 2000 年宣布 **Rijndael** 為最終勝出者，並在其標準化後成為今日所稱的 **AES**。

## Iterated Block Ciphers

DES 與所有 AES finalists 都屬於 **iterated block ciphers**。

其基本想法是：block cipher 並不是透過一次單一步驟完成加密，而是透過**重複使用一個相對簡單的 round function**，逐輪將輸入資料轉換，最終得到 ciphertext。

其核心思想是，單一 round function 本身通常相對簡單，但透過多輪反覆作用，可以逐步累積混淆與擴散效果，從而形成安全的整體加密結構。

### Round Function

一個 round function 接受一個 $n$-bit block 作為輸入，並輸出一個 $n$-bit block，其中 $n$ 就是整體 block cipher 的 block size。

若總共有 $r$ 輪，則加密過程可理解為：

- 輸入 block 進入第 1 輪
- 第 1 輪輸出進入第 2 輪
- ...
- 第 $r$ 輪輸出成為最終 ciphertext

### Number of Rounds

一般而言，增加 round 的數量會提高 block cipher 的安全程度，因為每多一輪，資料中的結構就被進一步打散與混合。不過，更多 rounds 也意味著更高的運算成本，因此實際設計中需要在 security 與 efficiency 之間取平衡。

在這種多輪結構中，每一輪通常不只套用 round function，還會搭配對應的 round key，而這些 round keys 則由 key schedule 從主 secret key 推導而來。

## Round Keys and Key Schedule

每一次使用 round function 時，都會搭配一把 **round key**。若共有 $r$ 輪，則 round keys 通常記為

$$
k_i \qquad \text{for } 1 \le i \le r.
$$

這些 round keys 並不是彼此獨立隨機選出的，而是由同一把 master key 系統性地推導出來。這個過程稱為 **key schedule**。

也就是說：

- 使用者真正持有的是 master key $k$
- 系統再由 $k$ 推導出 $k_1, k_2, \dots, k_r$

在解密過程中，round keys 通常會以與加密相反的順序使用。

## Invertibility of the Round

為了使 decryption 成立，整個 round transformation 必須是 **invertible**。換句話說，加密後的結果必須能夠被有效地反向還原。不過，這一點應理解為對**整體 round 結構**的要求，而不是對 round 內每一個局部元件的逐一要求；也就是說，**整個 round 必須可逆，但其中每一個子函數不一定都必須 individually invertible**。

這個觀念在 DES 與 Rijndael 的設計中呈現出明顯差異：

| Cipher | 整體 round 是否可逆 | 各主要子步驟是否可逆 | 說明 |
|---|---|---|---|
| DES | 是 | 否 | DES 的某些 round 元件本身不可逆，但由於整體結構的安排，整個 round 仍然可以被反向還原。 |
| Rijndael | 是 | 是 | Rijndael 不僅整個 round 可逆，其 round 中的主要步驟也都是可逆的。 |

因此，從設計觀點來看，**可解密性真正要求的是整體 round 的可逆性**；至於 round 內部是否由完全可逆的子函數組成，則取決於 cipher 本身採用的結構。DES 說明了「部分元件不可逆但整體仍可逆」的可能性，而 Rijndael 則展示了「整體與主要子步驟皆可逆」的另一種設計方式。

## Cryptanalysis

block cipher 的安全性並不是自動成立的。密碼分析者可以透過不同方法來嘗試恢復 key，或找出演算法的弱點。

從廣義上看，對 block cipher 的分析既包括直接的搜尋與分解技巧，也包括特定的攻擊模型與統計分析方法，例如 exhaustive search、pre-computed tables、divide-and-conquer、chosen plaintext attack、differential cryptanalysis 與 linear cryptanalysis。

以下列出幾種在 block cipher 分析中常見的重要方法與觀點。

### Exhaustive Search

**Exhaustive search**，也就是 brute-force attack，指的是嘗試所有可能的 keys，直到找到正確者。這是一種最直接的攻擊方式，因此 key length 必須足夠大，才能使此法不可行。

### Pre-computed Tables and Divide-and-Conquer

某些攻擊可能預先計算大量中間值並存成表格，以在攻擊階段加速搜尋。這類方法通常涉及時間與空間的 trade-off。另一些密碼結構則可能允許攻擊者將一個大問題拆成多個較小的問題分別處理，再將結果整合，從而降低整體攻擊成本。

### Chosen Plaintext Attacks

在 **chosen plaintext attack** 中，攻擊者可自行選擇特定 plaintext，並觀察其加密結果。精心設計的輸入有時可以揭露 cipher 內部結構或 key 的資訊，因此這是一種非常重要的攻擊模型。

### Differential Cryptanalysis

**Differential cryptanalysis** 的基本想法，是觀察兩個 plaintexts 之間的特定差異，並研究這種差異在加密過程中如何傳播到 ciphertext。常見的差異度量是 XOR difference，因此分析者會研究 plaintext pair 與 ciphertext pair 的 XOR difference，並利用某些差異傳播機率偏離隨機行為的現象，推測 key 的相關資訊。

### Linear Cryptanalysis

**Linear cryptanalysis** 則是嘗試用某些 linear expressions 去近似 cipher 中的 non-linear components。如果某些線性關係出現的機率與真正隨機情況相比存在可觀察偏差，則這種偏差也可能被用來推測 key 的部分資訊。

<div class="remark">
  <p><b>Remark.</b> Differential cryptanalysis 與 linear cryptanalysis 都是非常成功且影響深遠的密碼分析技術。它們對 block cipher 設計產生了直接影響，也成為評估新 cipher 時不可忽略的標準。</p>
  <p>不過，這並不表示所有重要 cipher 都會被它們實際攻破。對於設計良好的 block ciphers，例如 DES 與 Rijndael，這些方法雖然是分析時必須考慮的經典攻擊，但並未使其在原設計參數下失去實用安全性。</p>
</div>

## Substitution and Permutation

DES 與 Rijndael 之所以重要，不只是因為它們在實務上的地位，也因為它們體現了 block cipher 設計中的一般原理，尤其是 **substitution** 與 **permutation**。

這兩類操作在古典密碼中就已出現，但現代 block cipher 將它們設計得更加精細與複雜。

值得注意的是，單獨使用 substitution 或 permutation 並不自動產生安全性。真正的安全性來自於：

- 這些操作如何被設計
- 它們如何跨多輪反覆套用
- 它們是否能有效地實現混淆（confusion）與擴散（diffusion）

因此，modern block cipher 的安全性是**多輪結構與整體設計**共同作用的結果。這也是為什麼現代 block cipher 常被理解為多輪 substitution-permutation 結構，或更廣義地說，是透過反覆混淆與擴散來建立安全性。從這個角度看，block cipher 的設計不只是單純堆疊步驟，而是要讓 substitution 與 permutation 在多輪作用下共同形成足夠強的安全性。

## Block Cipher vs. Stream Cipher

Block cipher 與 stream cipher 都屬於 symmetric encryption 的重要類型，但其工作方式與適用情境有所不同。前者以固定大小的 block 為單位進行轉換，後者則通常透過 internal state 持續產生 keystream，以逐步加密資料流。

### Comparison

從理論與實作角度來看，兩者各有優勢，並不能簡單地說哪一種一定較好。常見的比較觀點包括：

- **Block ciphers are more general**  
  block cipher 通常被視為較 general 的 primitive，因為透過適當的 mode of operation，它可以在許多情境下被轉化為類似 stream cipher 的使用方式。

- **Stream ciphers often have a more mathematical structure**  
  stream cipher 往往帶有較明顯的數學結構。這種結構可能使它們在某些情況下更容易分析，也可能使某些攻擊更容易建立；但另一方面，它也可能有助於安全性研究與理論證明。

- **Stream ciphers are efficient in hardware but may be less convenient in some software settings**  
  stream ciphers 常以逐 bit 或逐小單位的方式處理資料，因此在某些 software 環境下未必特別方便；但在 hardware 上，它們往往能夠達到很高的效率。

- **Block ciphers suit both hardware and software**  
  block ciphers 通常同時適用於 hardware 與 software，不過在專用硬體中，其速度未必總能勝過 stream ciphers。

- **Hardware is faster but less flexible than software**  
  hardware 實作通常具有較高效能，但彈性較差；software 實作則較容易更新、部署與修改。因此，實際系統究竟選擇 block cipher 還是 stream cipher，除了理論安全性之外，也會受到工程需求與應用場景的影響。

## Summary

block cipher 是一種對固定長度 block 進行可逆轉換的 symmetric primitive。其安全性通常建立在多輪 iterated structure、round function、round key 與 key schedule 的整體設計之上。DES 代表了早期具有歷史影響力的標準，而 AES（Rijndael）則是現代最具代表性的 block cipher 標準。

理解 block cipher，不僅需要掌握其基本定義，也需要理解 modes of operation、invertibility、substitution and permutation，以及其對各種 cryptanalysis 方法的抵抗能力。
