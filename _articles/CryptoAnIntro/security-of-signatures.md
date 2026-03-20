---
layout: page
title: Security of Signatures
date: 2026-03-20
last_updated: 2026-03-20
tags: [signature]
---

數位簽章的安全性在於防止攻擊者為未經授權的訊息產生有效簽章。對簽章機制而言，攻擊者不一定需要恢復私鑰才算成功；只要能在某種意義下偽造出合法簽章，就代表系統已經失去安全性。

## Types of Forgery

### Total Break

Total break 表示攻擊者的能力已經等同於合法簽章者。這通常可理解為私鑰已被恢復，或攻擊者已經能夠像真正的持有人一樣，對各種訊息產生有效簽章。這是最嚴重的破壞形式，因為一旦達到 total break，攻擊者便可以全面冒充原本的簽章者，整個簽章系統的信任基礎也隨之崩潰。

### Selective Forgery

Selective forgery 表示攻擊者能夠對自己指定的一個特定訊息，偽造出有效簽章。此時攻擊者未必知道私鑰，也未必能對所有訊息簽章，但只要能對某個目標訊息成功偽造，就已足以造成實際威脅。例如攻擊者若能指定一份合約、一筆交易內容，或某個授權聲明，並對該訊息產生合法簽章，那麼即使私鑰本身沒有外洩，簽章機制仍不能視為安全。

### Existential Forgery

Existential forgery 表示攻擊者不需要事先指定目標訊息，只要能夠找到某一個新的訊息，並為其產生一個通過驗證的有效簽章，就算攻擊成功。這個訊息甚至可能只是隨機位元字串，而不一定具有明確語意。重點在於，攻擊者成功產生了一組新的 $(m,\sigma)$，其中 $m$ 不是先前已被合法簽署過的訊息，但驗證演算法仍然接受 $\sigma$ 為 $m$ 的有效簽章。

### Comparison of the Three Notions

若從攻擊者的偽造能力來看，三者的強弱順序為

$$
\text{Total Break} \;>\; \text{Selective Forgery} \;>\; \text{Existential Forgery}.
$$

這是因為 total break 幾乎等同於完全掌握簽章能力；selective forgery 只要求攻擊者能對某個指定的目標訊息完成偽造；existential forgery 則只要求攻擊者能對某個新的訊息完成偽造即可。

但若從安全要求的角度來看，順序正好相反。若一個簽章機制能夠抵抗 existential forgery，那麼它自然也能抵抗 selective forgery，也更不可能發生 total break。因此，能夠抵抗 existential forgery 是較強的安全要求，而只抵抗 selective forgery 則是較弱的要求。

$$
\text{Secure against Existential Forgery}
\;\Rightarrow\;
\text{Secure against Selective Forgery}
\;\Rightarrow\;
\text{Secure against Total Break}.
$$

在直觀上，existential forgery 只要求攻擊者隨便找到一個新訊息並成功偽造即可；selective forgery 則要求攻擊者對自己真正想攻擊的特定訊息成功偽造；total break 則表示攻擊者已經具備完整簽章能力，幾乎等同於取得私鑰。也正因為 existential forgery 對攻擊者而言成功條件更寬鬆，所以要防住它反而是更強的安全目標。在實務上，由於簽章系統可能被用在合約、交易、授權聲明、挑戰回應協定，甚至任意格式的位元字串上，因此通常會要求簽章機制至少能抵抗 existential forgery。

---

<div class="definition" style="border-left:4px solid #0f766e; background:#ecfeff; padding:12px 14px; border-radius:8px; margin:14px 0; line-height:1.7;">

<strong>Definition.</strong>

A signature scheme is deemed to be secure if it is infeasible for an adaptive adversary to produce an existential forgery.

</div>
