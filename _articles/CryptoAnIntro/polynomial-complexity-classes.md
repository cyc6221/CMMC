---
layout: page
title: Polynomial Complexity Classes
date: 2026-03-22
last_updated: 2026-03-23
tags: []
---

在前一節〈[Decision Problems]({{ "/articles/CryptoAnIntro/decision-problems/" | relative_url }})〉中，已經先將計算問題表述成只有 yes 或 no 兩種答案的 decision problem。這樣的表述方式提供了一個統一的框架，使不同問題之間的計算難度得以比較。

在此基礎上，接下來便要進一步討論：這些 decision problems 究竟有多難。複雜度理論正是研究這個問題的工具。它依照「能否有效率地求解」以及「能否有效率地驗證」來分類不同的問題。本節將介紹 $P$、$co\text{-}P$、$NP$、$co\text{-}NP$ 與 $NP$-complete 等基本類別，並說明這些概念雖然構成理解計算困難度的基礎，卻仍不足以直接作為密碼學安全性的完整依據。

## The Class $P$

一個 decision problem 若屬於 **$P$**，意思是存在一個演算法，對於所有答案為 yes 的 instance，都能在 **polynomial time** 內輸出 yes。這裡的時間是以 **bit operations** 來衡量，而 polynomial time 的意思是：所需位元操作數量被某個輸入大小的多項式函數所界定。在這樣的表述下，若答案是 no，演算法甚至不一定要保證在多項式時間內停機；但如果它真的停下來，就必須回答正確。

直觀上，$P$ 代表的是那些「容易計算」的問題，也就是存在有效率演算法的問題。例如，給定整數 $x,y,z$，判斷 $z=x\cdot y$ 是否成立；或者給定密文 $c$、金鑰 $k$ 與明文 $m$，判斷 $c$ 是否是 $m$ 在某個加密系統下用 $k$ 加密後的結果。這些都屬於容易驗算的問題，因此可以理解為位於 $P$ 中。

## The Class $co\text{-}P$

若把前面 $P$ 的定義中 yes 與 no 的角色對調，就得到 **$co\text{-}P$**。也就是說，對於所有答案為 no 的 instance，都能在 polynomial time 內輸出 no。換句話說，$P$ 著重的是能快速確認 yes，而 $co\text{-}P$ 著重的是能快速確認 no。

事實上，

$$
P = co\text{-}P.
$$

證明方式很直接。假設有一個演算法 $A$，只要 instance 的答案是 yes，就能在 $n^c$ 的時間內輸出 yes。那麼只要把 $A$ 跑起來：若它在 $n^c$ 步內輸出 yes，就接受 yes；若超過 $n^c$ 還沒有輸出 yes，就直接終止它並輸出 no。這樣一來，就能把原本「快速確認 yes」的能力轉換成「快速確認 no」的能力，因此 $P$ 與 $co\text{-}P$ 相等。

## The Class $NP$

一個 decision problem 若屬於 **$NP$**，意思是：對每一個答案為 yes 的 instance，都存在一個 **witness**，而且這個 witness 可以在 polynomial time 內被檢查。這裡的 witness 可以理解成一份「證明」，用來證明這個 instance 的確屬於 yes 的那一側。

這裡最重要的點不是「能不能快速找到 witness」，而是「若有人把 witness 給你，你能不能快速驗證它是對的」。這正是 $NP$ 與 $P$ 的關鍵差別所在。

例如：

- **Composite problem**：問一個整數 $N$ 是否為合成數。這個問題在 $NP$ 中，因為 witness 可以是一個非平凡因數，而驗證方式只要檢查它是否真的整除 $N$ 即可。
- **$k$-colourability**：問圖 $G$ 是否可用 $k$ 種顏色著色。這時 witness 就是一組具體的著色方式，而驗證時只需確認每條邊的兩端頂點顏色不同即可。
- **Knapsack**：問某個 knapsack instance 是否有解。這時 witness 就是那組 $b_i$ 的值，而驗證只需計算
  $$
  S=b_1w_1+\cdots+b_nw_n
  $$
  是否成立。

在這些例子裡，並沒有假設 witness 本身可以在 polynomial time 內被找出來；只是假設它能被 polynomial time 驗證。也因此，明顯有

$$
P \subset NP.
$$

因為若一個問題本來就能快速解，那麼當然也能快速驗證。

理論計算機科學中最重要的公開問題之一，就是：

$$
P \stackrel{?}{=} NP.
$$

多數人相信答案是否定的，也就是相信

$$
P \ne NP.
$$

這表示：有些問題雖然其 yes instance 有簡短且可快速驗證的證明，但整體而言卻仍然沒有已知的有效率求解演算法。

## The Class $co\text{-}NP$

與 $co\text{-}P$ 的定義方式相同，**$co\text{-}NP$** 是把 $NP$ 中 yes 與 no 的角色對調後得到的類別。也就是說，對於每一個答案為 no 的 instance，都存在一個可在 polynomial time 驗證的 witness。換句話說，$NP$ 是「yes 有短證明」，而 $co\text{-}NP$ 是「no 有短證明」。

不過，這裡就不像 $P$ 與 $co\text{-}P$ 那樣自然相等。若

$$
P \ne NP,
$$

則可推出

$$
NP \ne co\text{-}NP.
$$

因此一般會認為

$$
NP \ne co\text{-}NP.
$$

這表示「yes 有可驗證證明」與「no 有可驗證證明」通常應被視為不同層次的性質。

## Size of Witnesses

除了問某個問題是否在 $NP$ 裡之外，另一個值得注意的問題是：**一個 witness 可以多小？** 也就是說，不只要看某個問題是否有可驗證證明，還可以進一步問這份證明本身需要多長。

以 **COMPOSITES** 為例，對於一個合成數 $N$，可以用兩種方式作為證明它是 composite 的 witness：

1. **直接給一個因數**。此時 witness 的大小是
   $$
   O(\log n).
   $$
   因為一個因數本身所需的位元長度與輸入大小呈對數關係。

2. **給一個 Miller–Rabin witness $a$**。在假設廣義黎曼猜想（GRH）成立下，這個 witness 的大小甚至可以做到
   $$
   O(\log\log n),
   $$
   因為此時可以取
   $$
   a \le O((\log n)^2).
   $$

這說明即使同樣是一個 $NP$ 問題，其證明的長度也可能有很大差異。

## $NP$-Complete Problems

一個 decision problem $DP$ 若是 **$NP$-complete**，表示每一個屬於 $NP$ 的問題都可以在 polynomial time 內 **reduce** 到 $DP$。也就是說，若能有效率地解掉這個 $DP$，那麼所有 $NP$ 問題都能有效率地解掉。形式上可寫成：

$$
DP \in P \implies P = NP.
$$

因此，$NP$-complete 問題可以被看成是 $NP$ 中最困難的一群問題。

經典例子包括：

- **3-colouring problem**
- **knapsack problem**

這兩個例子也說明了一件事：理論上的高困難度與實務上的密碼適用性，未必是同一件事。

## Factoring Is in $NP$, but Probably Not $NP$-Complete

像 **factoring** 或 **COMPOSITES** 這樣的問題，已知位於 $NP$ 中，但目前並不知道它們是不是 $NP$-complete。更進一步地說，許多密碼學真正依賴的困難問題，例如 factoring、discrete logarithm 等，雖然位於 $NP$，但通常並不被認為和 $NP$-complete 問題有直接關聯。

這件事很重要，因為它提醒我們：**密碼學上重要的「難題」與理論計算機科學中最極端的「最難問題」並不是同一類概念**。

## Worst-Case Hardness vs Average-Case Hardness

這裡最關鍵的一點，是要分清楚 **worst-case complexity** 與 **average-case hardness** 的差別。即使 $NP$-complete 問題在最壞情況下看起來比 factoring 更難，也不代表它們更適合拿來作為密碼學基礎。

原因在於，複雜度理論談的是 worst-case complexity，但密碼學真正需要的是 average-case hardness。也就是說，單單證明「某些極端輸入很難」是不夠的；真正需要的是：對於實際生成出來、平均意義下的 instance，它們也應該難以求解。

過去曾被提議拿來做密碼系統的 knapsack 問題，往往都屬於某些「平均情況並不夠難」的實例，因此最後總能找到有效率演算法將它們破解。這也是為什麼 knapsack-based cryptosystems 的歷史表現不佳。

## The Example of 3-Colouring

為了更清楚說明 worst-case 與 average-case 的差異，可以看 **3-colouring** 這個例子。理論上，判斷一張圖是否可 3-著色，在最壞情況下是 $NP$-complete；但平均而言，它其實很容易。原因是：對一張隨機圖來說，不管圖有多大，它通常根本不會是 3-colourable。

一個簡單的 backtracking 著色法如下：

- 先將圖 $G$ 的頂點任意排序為 $v_1,\dots,v_t$。
- 顏色集合為 $\{1,2,3\}$。
- 依照排序逐一造訪頂點。
- 每次都嘗試使用當前可用的最小顏色。
- 若卡住，就回溯到最近一個已著色頂點，改試下一個顏色。
- 若第一個頂點都無法再換色，就輸出「不可 3-著色」。
- 若最後一個頂點成功上色，則輸出「可 3-著色」。

對一張有 $t$ 個頂點的隨機圖而言，這個演算法平均走訪的頂點數少於 197，而且這個界與 $t$ 的大小無關。換句話說，雖然 3-colouring 在最壞情況下非常難，但對平均隨機圖來說，卻往往能在幾乎固定成本內很快判定為不可著色。

這也正好帶出整節最重要的結論：$P$、$NP$、$co\text{-}NP$ 與 $NP$-complete 這些複雜度類別，幫助我們理解問題在理論上的困難程度；但對密碼學來說，真正重要的不只是最壞情況下有多難，而是平均情況下是否仍然夠難。也因此，$NP$-completeness 本身並不足以保證一個問題適合拿來作為密碼基礎。

## References

- Nigel P. Smart, *Cryptography: An Introduction* (3rd ed.), Chapter 19. [PDF](https://nigelsmart.github.io/Crypto_Book/book.pdf)
