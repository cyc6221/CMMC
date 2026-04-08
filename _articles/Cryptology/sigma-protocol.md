---
layout: page
title: Sigma-Protocol
date: 2026-04-08
last_updated: 2026-04-08
tags: [square-root-barrier]
---

Sigma-protocol 是一類非常重要的三步驟互動式證明協定，常用來讓一個 prover 向 verifier 證明自己知道某個 witness，但又不直接洩漏 witness 本身。它在 identification scheme、zero-knowledge proof、proof of knowledge，以及後續的 Fiat–Shamir transformation 中都扮演核心角色。

Sigma-protocol 通常針對某個 relation $R$ 定義。所謂 relation，是由 instance 與 witness 所組成的配對集合。給定公開的 instance $x$，prover 持有一個對應的秘密 witness $w$，目標是向 verifier 證明 $(x,w)\in R$。

<div class="definition">
<div><strong>Definition.</strong> A <em>Sigma-protocol</em> for a relation $R$ is a three-move public-coin interactive proof between a prover $P$ and a verifier $V$:
$$
a \;\to\; c \;\to\; z,
$$
where:
<ul>
  <li>$a$ is the first message (the commitment),</li>
  <li>$c$ is a random verifier challenge,</li>
  <li>$z$ is the prover response.</li>
</ul>
The verifier then checks whether $(x,a,c,z)$ is accepting.</div>
</div>

之所以稱為 public-coin，是因為 verifier 在第二步送出的 challenge $c$ 是公開隨機選出的，不依賴任何隱藏狀態。這種結構非常簡潔，但已足以支撐許多重要的安全性質。

## 基本結構

Sigma-protocol 的典型流程如下：

1. prover 根據公開 instance $x$ 與秘密 witness $w$，先產生第一則訊息 $a$。
2. verifier 隨機選擇 challenge $c$ 並送給 prover。
3. prover 根據 $(x,w,a,c)$ 算出 response $z$。
4. verifier 檢查 transcript $(a,c,z)$ 是否滿足驗證條件。

因此，一個 transcript 通常寫成
$$
(a,c,z).
$$

在許多例子中，第一步的 $a$ 可以理解為某種「承諾」或「隨機遮罩後的值」，challenge $c$ 用來迫使 prover 對某個特定問題作答，而 response $z$ 則將 witness 與先前的隨機性結合起來，使 verifier 能夠檢查答案是否一致。

## 完備性、特殊可靠性與特殊零知識

Sigma-protocol 最經典的三個性質是 completeness、special soundness 與 special honest-verifier zero-knowledge。這三者幾乎可視為 Sigma-protocol 的標誌性特徵。

<div class="definition">
<div><strong>Completeness.</strong> A Sigma-protocol is complete if for every $(x,w)\in R$, an honest execution between the prover $P(x,w)$ and the verifier $V(x)$ is accepted with probability $1$.</div>
</div>

完備性表示：只要 prover 真的知道合法 witness，並且雙方都誠實執行協定，那 verifier 就會接受。

<div class="definition">
<div><strong>Special Soundness.</strong> A Sigma-protocol has special soundness if there exists an efficient extractor $E$ such that, given two accepting transcripts
$$
(a,c,z),\qquad (a,c',z')
$$
with the same first message $a$ and distinct challenges $c\neq c'$, the extractor can compute a witness $w$ such that $(x,w)\in R$.</div>
</div>

這個性質是 Sigma-protocol 非常關鍵的一點。它表示：若有人能針對同一個 commitment $a$，回答兩個不同 challenge 並都通過驗證，那麼從這兩份 transcript 中就能抽出 witness。也就是說，能成功回答多個不同 challenge 的能力，本質上代表他真的「知道」某個秘密。

這也是 proof of knowledge 直觀上成立的原因。因為一個真正不知道 witness 的人，通常只能希望 verifier 剛好問到自己能應付的 challenge；一旦 verifier 換另一個 challenge，偽造就會失敗。

<div class="definition">
<div><strong>Special Honest-Verifier Zero-Knowledge (SHVZK).</strong> A Sigma-protocol has special honest-verifier zero-knowledge if there exists a probabilistic polynomial-time simulator $S$ that, given an instance $x$ and a challenge $c$, can generate an accepting transcript $(a,c,z)$ whose distribution is identical to, or computationally indistinguishable from, that of a real transcript produced in an honest interaction.</div>
</div>

這裡的重點是 honest-verifier。也就是說，simulator 假設 verifier 的 challenge 的確是依照協定誠實隨機選出的。在這個前提下，simulator 不需要 witness，也能直接產生看起來像真的 transcript。這說明 transcript 本身不會洩漏額外資訊，因此具有零知識性。

## 為什麼 special soundness 很重要

設想某個 prover 可以對同一個 $a$ 分別回應兩個不同挑戰 $c\neq c'$。這代表第一步的承諾 $a$ 中，其實已經隱含了足夠資訊，使得一旦兩個不同 challenge 的答案都被揭露，就能解出 witness。

在 Schnorr protocol 中，這件事特別清楚。若有
$$
z=r+ce,\qquad z'=r+c'e,
$$
則兩式相減得到
$$
z-z'=(c-c')e,
$$
只要 $c\neq c'$，就可以解出秘密 $e$。這正是 extractor 的核心想法。

因此，Sigma-protocol 的安全性往往依賴一個分叉式觀察：成功偽造一次不一定代表知道 witness，但若能在同一個第一訊息下對兩個不同挑戰都成功，就足以抽出 witness。

## 為什麼是 honest-verifier zero-knowledge

Sigma-protocol 常見的是 special honest-verifier zero-knowledge，而不是直接保證對所有惡意 verifier 都是零知識。原因在於 simulator 通常是「先拿到 challenge $c$，再倒推構造 $(a,z)$」，這要求 challenge 的形式可以被預先指定。

在誠實 verifier 的情況下，challenge 本來就是均勻隨機的，因此 simulator 容易重建真實分布。但如果 verifier 可以惡意地根據先前訊息調整 challenge，則零知識模擬通常需要額外技巧，未必能直接從 Sigma-protocol 的基本形式得到。

因此，Sigma-protocol 的標準零知識保證通常是 HVZK 或 SHVZK，而更強的零知識性質則常需要額外轉換或更複雜的設計。

## 典型例子：Schnorr Protocol

Sigma-protocol 最經典的例子之一是 Schnorr protocol。設 $G=\langle g\rangle$ 為一個循環群，公開 instance 為
$$
y=g^x,
$$
其中 $x$ 是 prover 的秘密 witness。prover 要證明自己知道離散對數 $x$。

協定如下：

1. prover 選隨機 $r$，送出
   $$
   a=g^r.
   $$
2. verifier 選隨機 challenge $c$。
3. prover 回答
   $$
   z=r+cx.
   $$
4. verifier 檢查
   $$
   g^z \stackrel{?}= a\cdot y^c.
   $$

驗證式成立，因為
$$
g^z=g^{r+cx}=g^r(g^x)^c=a\cdot y^c.
$$

這個例子完整展現了 Sigma-protocol 的三個典型性質：

### Completeness

若 prover 確實知道 $x$，則驗證式一定成立。

### Special soundness

若有兩個可接受 transcript
$$
(a,c,z),\qquad (a,c',z')
$$
且 $c\neq c'$，則
$$
g^z=a y^c,\qquad g^{z'}=a y^{c'}.
$$
兩式相除可得
$$
g^{z-z'}=y^{c-c'}=g^{x(c-c')}.
$$
因此
$$
x=\frac{z-z'}{c-c'}
\quad (\text{mod } q).
$$

### SHVZK

給定 challenge $c$，simulator 可先任選 $z$，再定義
$$
a=g^z y^{-c}.
$$
如此構造出的 transcript $(a,c,z)$ 會通過驗證，且分布與真實執行一致。

## Sigma-protocol 與 proof of knowledge

Sigma-protocol 常被視為 proof of knowledge 的自然來源，但兩者不是完全同義。更準確地說，special soundness 讓人可以構造 extractor，因此 Sigma-protocol 很適合用來建立 knowledge-type security argument。

<div class="definition">
<div><strong>Proof of Knowledge.</strong> An interactive proof is a proof of knowledge if whenever a prover can make the verifier accept with sufficiently high probability, there exists an efficient extractor that can use that prover to compute a witness.</div>
</div>

Sigma-protocol 的 extractor 往往透過 rewinding 運作：先與 prover 互動拿到第一份 accepting transcript，再回到 challenge 之前，改送另一個 challenge，若再次成功，就利用兩份 transcript 抽出 witness。

也因此，rewinding 技術與 Sigma-protocol 有非常深的關聯。許多後續安全證明，尤其是 Fiat–Shamir 轉換後簽章的安全性分析，都建立在這種 rewinding / forking 的結構上。

## Sigma-protocol 與 identification scheme

許多 identification scheme 的核心，就是 prover 透過 Sigma-protocol 證明自己知道某個秘密。例如 Schnorr identification 與 Guillou–Quisquater identification 都屬於這個範疇。

在 identification setting 中，攻擊者的目標通常是假冒 prover。若某個假冒者能成功通過 verifier 的隨機挑戰，那麼透過 special soundness 與 rewinding，往往就能將其轉換成一個 witness extractor，進一步連到 underlying hard problem。

因此，Sigma-protocol 提供了 identification scheme 的標準分析框架：  
一方面用 zero-knowledge 說明互動過程不洩漏秘密；另一方面用 soundness / knowledge extraction 說明若有人能成功冒充，就等於他掌握了真正的 witness。

## Sigma-protocol 與 Fiat–Shamir transformation

Sigma-protocol 與 Fiat–Shamir transformation 的關係非常密切。Fiat–Shamir 的核心想法，是把原本由 verifier 隨機選出的 challenge $c$，改成由雜湊函數決定，例如
$$
c = H(x,a).
$$
這樣原本的三步驟互動協定
$$
a \to c \to z
$$
就能改寫成非互動形式，簽章也因此產生：

1. signer 先產生 $a$；
2. 再計算
   $$
   c=H(m,x,a);
   $$
3. 最後輸出 $(a,z)$ 作為簽章。

這就是許多 Fiat–Shamir 型簽章的基本結構。Schnorr signature 便是最著名的例子之一。

不過，一旦從互動版轉成非互動版，安全證明通常就不再只是直接套用 Sigma-protocol 的性質，而必須在 random oracle model 中進一步分析。這時 rewinding、forking lemma、tight reduction、以及 square-root loss 等議題都會出現。

## Challenge space 的角色

Sigma-protocol 的安全性與 challenge space 的大小密切相關。若 challenge 空間太小，攻擊者就可能靠猜測 challenge 來提高成功率；若 challenge 空間夠大，則單次猜中 challenge 的機率會很低。

在許多理論分析中，設 challenge 空間大小為 $|\mathcal{C}|$。若不知道 witness 的偽造者只能事先準備對某一個 challenge 的回答，那麼它成功的機率通常不會超過
$$
\frac{1}{|\mathcal{C}|}.
$$

這也說明了為何 challenge 必須由 verifier 隨機產生，並且不能讓 prover 預先知道。challenge 的不可預測性，是 soundness 的來源之一。

## Transcript 的觀點

從 transcript 的角度看，Sigma-protocol 研究的是接受條件
$$
V(x,a,c,z)=1
$$
所定義的結構。special soundness 說的是：兩個 challenge 不同、但第一訊息相同的 accepting transcripts，足以解出 witness。SHVZK 說的是：單一 accepting transcript 的分布可以被模擬，而不需要 witness。

也就是說，Sigma-protocol 同時控制了兩件事：

1. 單一 transcript 不洩漏秘密；
2. 多個相容 transcript 的組合則蘊含 witness。

這種「單看一份 transcript 沒資訊，但兩份不同 challenge 的 transcript 合起來就可抽出 witness」的結構，正是 Sigma-protocol 最核心的數學特徵。

## 常見應用

Sigma-protocol 常見於以下情境：

- 離散對數知識證明
- RSA 型 witness 的知識證明
- identification schemes
- zero-knowledge proof 的基本模組
- Fiat–Shamir 型簽章
- 更複雜證明系統中的子協定

很多複雜的協定其實都可以分解為若干個 Sigma-protocol 或其變形，因此理解 Sigma-protocol 的結構，通常是理解現代公鑰密碼與零知識證明的重要起點。

## 與 square-root barrier 的關聯

在許多 Fiat–Shamir 型簽章的安全證明中，底層互動協定往往就是某種 Sigma-protocol。經典證明會透過 rewinding 或 forking，從一個成功偽造者身上取得兩份具有相同第一訊息、但不同 challenge 的 accepting transcripts，再用 special soundness 抽出 witness。

這種分析方式雖然自然，但在許多情況下會導致 non-tight reduction，甚至出現典型的 square-root loss。原因就在於：為了得到兩個不同 challenge 下都成功的 transcript，reduction 常需要額外的重複、分叉與機率損失。

因此，Sigma-protocol 不只是零知識與 identification 的基本工具，也正是後續 tightness 問題、forking lemma、以及 square-root barrier 討論的起點。

## 小結構整理

Sigma-protocol 可以濃縮理解成下面的框架：

- 它是一個三步驟 public-coin 協定；
- prover 用它證明自己知道某個 witness；
- completeness 保證誠實 prover 一定成功；
- special soundness 保證兩個不同 challenge 的 accepting transcripts 可抽出 witness；
- special honest-verifier zero-knowledge 保證單一 transcript 可被模擬，不洩漏 witness；
- 它是 identification scheme 與 Fiat–Shamir transformation 的核心基礎。

理解這個框架後，再看 Schnorr、GQ、Fiat–Shamir、forking lemma 與 tight reduction，就會清楚很多。
