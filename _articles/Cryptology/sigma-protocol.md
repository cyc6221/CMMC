---
layout: page
title: Sigma Protocol
date: 2026-04-08
last_updated: 2026-04-08
tags: [square-root-barrier]
---

Sigma-protocol 是一類非常重要的三步驟互動式證明協定，常用來讓一個 prover 向 verifier 證明自己知道某個 witness，但又不直接洩漏 witness 本身。它在 identification scheme、zero-knowledge proof、proof of knowledge，以及後續的 Fiat–Shamir transformation 中都扮演核心角色。

Sigma-protocol 通常針對某個 relation $R$ 定義。所謂 relation，是由 instance 與 witness 所組成的配對集合。給定公開的 instance $x$，prover 持有一個對應的秘密 witness $w$，目標是向 verifier 證明 $(x,w)\in R$。它的核心特徵很集中：協定只有三步、challenge 由 verifier 公開隨機給出、單一 transcript 不應洩漏 witness，而如果能對同一個第一訊息成功回答兩個不同 challenge，通常就足以抽出 witness。也因為這種結構非常乾淨，Sigma-protocol 成為許多 identification scheme 與 Fiat–Shamir 型簽章的基礎模板。

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

之所以稱為 public-coin，是因為 verifier 在第二步送出的 challenge $c$ 是公開隨機選出的，不依賴任何隱藏狀態。這種結構雖然簡潔，但已足以支撐許多重要的安全性質。整個協定通常就圍繞著 transcript
$$
(a,c,z)
$$
來分析：第一步的 $a$ 可以視為某種承諾或隨機遮罩後的值，第二步的 $c$ 用來迫使 prover 對特定問題作答，第三步的 $z$ 則把先前的隨機性與 witness 結合，讓 verifier 能檢查整體是否一致。

## Structure and Core Properties

Sigma-protocol 的典型流程如下：

1. prover 根據公開 instance $x$ 與秘密 witness $w$，先產生第一則訊息 $a$。
2. verifier 隨機選擇 challenge $c$ 並送給 prover。
3. prover 根據 $(x,w,a,c)$ 算出 response $z$。
4. verifier 檢查 transcript $(a,c,z)$ 是否滿足驗證條件。

這類協定最經典的三個性質是 completeness、special soundness 與 special honest-verifier zero-knowledge。這三者幾乎可以視為 Sigma-protocol 的標誌性特徵，也正好對應三件事：誠實 prover 會成功、不知道 witness 的偽造者不能同時應付多個 challenge、而單一誠實執行的 transcript 不會洩漏秘密。

### Completeness

<div class="definition">
<div><strong>Completeness.</strong> A Sigma-protocol is complete if for every $(x,w)\in R$, an honest execution between the prover $P(x,w)$ and the verifier $V(x)$ is accepted with probability $1$.</div>
</div>

完備性表示：只要 prover 真的知道合法 witness，並且雙方都誠實執行協定，那 verifier 就會接受。

### Special Soundness

<div class="definition">
<div><strong>Special Soundness.</strong> A Sigma-protocol has special soundness if there exists an efficient extractor $E$ such that, given two accepting transcripts
$$
(a,c,z),\qquad (a,c',z')
$$
with the same first message $a$ and distinct challenges $c\neq c'$, the extractor can compute a witness $w$ such that $(x,w)\in R$.</div>
</div>

這個性質是 Sigma-protocol 最關鍵的部分之一。它表示：若有人能針對同一個 commitment $a$，回答兩個不同 challenge 並都通過驗證，那麼從這兩份 transcript 中就能抽出 witness。換句話說，若一個人有能力同時應付不同 challenge，那不只是「運氣好」，而是他手上其實掌握了真正的秘密。這也是 Sigma-protocol 常被拿來建立 proof of knowledge 的原因。

### Special Honest-Verifier Zero-Knowledge

<div class="definition">
<div><strong>Special Honest-Verifier Zero-Knowledge (SHVZK).</strong> A Sigma-protocol has special honest-verifier zero-knowledge if there exists a probabilistic polynomial-time simulator $S$ that, given an instance $x$ and a challenge $c$, can generate an accepting transcript $(a,c,z)$ whose distribution is identical to, or computationally indistinguishable from, that of a real transcript produced in an honest interaction.</div>
</div>

這裡的重點是 honest-verifier。也就是說，simulator 假設 verifier 的 challenge 的確是依照協定誠實隨機選出的。在這個前提下，simulator 不需要 witness，也能直接產生看起來像真的 transcript。這反映出一個很重要的現象：單獨看一份 transcript，驗證者不應從中學到 witness 的額外資訊。

### Why These Properties Matter

設想某個 prover 可以對同一個 $a$ 分別回應兩個不同挑戰 $c\neq c'$。這代表第一步的承諾 $a$ 中，其實已經隱含了足夠資訊，使得一旦兩個不同 challenge 的答案都被揭露，就能解出 witness。這種性質在很多具體協定裡都能直接看見。

在 Schnorr protocol 中，若有
$$
z=r+ce,\qquad z'=r+c'e,
$$
則兩式相減得到
$$
z-z'=(c-c')e.
$$
只要 $c\neq c'$，就可以解出秘密 $e$。因此，能對同一個第一訊息成功回答兩個不同 challenge，本質上就等價於知道離散對數 witness。

另一方面，Sigma-protocol 常見的是 special honest-verifier zero-knowledge，而不是直接保證對所有惡意 verifier 都是零知識。原因在於 simulator 通常採取的是「先指定 challenge，再倒推構造 transcript」的方式。換句話說，它先拿到 $c$，再反推出適合的 $(a,z)$，使得整個 transcript 通過驗證。

在 verifier 誠實時，challenge 本來就會均勻隨機產生，因此這種模擬方式自然可行，也能重建真實分布。但若 verifier 可以惡意依照先前訊息選 challenge，simulator 未必能如此直接地控制輸出分布，因此通常需要更強的技巧或額外轉換。也因此，Sigma-protocol 的標準零知識保證通常是 HVZK 或 SHVZK，而不是一開始就得到完整的一般惡意驗證者零知識。

從更高的角度看，Sigma-protocol 的核心結構正是：單看一份 transcript，並不足以抽出 witness；但若能拿到兩份 challenge 不同、第一訊息相同的 accepting transcripts，witness 就會浮現出來。後續很多 proof of knowledge、rewinding、forking lemma 與 tightness 的分析，都是從這個觀察出發。

## A Canonical Example: Schnorr Protocol

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

這個例子非常完整地展現了 Sigma-protocol 的基本精神。

### Completeness, Soundness, and SHVZK in Schnorr

若 prover 真的知道 $x$，則驗證式一定成立，所以 completeness 很直接。若存在兩個可接受 transcript
$$
(a,c,z),\qquad (a,c',z')
$$
且 $c\neq c'$，則
$$
g^z=a y^c,\qquad g^{z'}=a y^{c'}.
$$
兩式相除可得
$$
g^{z-z'}=y^{c-c'}=g^{x(c-c')},
$$
因此
$$
x=\frac{z-z'}{c-c'}
\quad (\text{mod } q).
$$
這正是 special soundness。另一方面，若要模擬 transcript，給定 challenge $c$ 之後可以先任選 $z$，再定義
$$
a=g^z y^{-c}.
$$
如此構造出的 transcript $(a,c,z)$ 會通過驗證，且分布與真實執行一致，因此 Schnorr protocol 也具有 SHVZK。

## Knowledge Extraction, Identification, and Fiat–Shamir

Sigma-protocol 常被視為 proof of knowledge 的自然來源，但兩者不是完全同義。更精確地說，是 special soundness 讓人可以構造 extractor，因此 Sigma-protocol 很適合建立 knowledge-type 的安全論證。

<div class="definition">
<div><strong>Proof of Knowledge.</strong> An interactive proof is a proof of knowledge if whenever a prover can make the verifier accept with sufficiently high probability, there exists an efficient extractor that can use that prover to compute a witness.</div>
</div>

在很多情況下，extractor 的做法是 rewinding：先與 prover 互動，拿到第一個成功的 transcript；接著回到 challenge 發送之前，保持第一則訊息 $a$ 不變，重新送出另一個 challenge；若 prover 再次成功，extractor 就可利用兩份 transcript 抽出 witness。也因如此，rewinding 幾乎是 Sigma-protocol 證明中的標準技術，而後來很多對 Fiat–Shamir 簽章的安全分析，也都沿用了這種思路。

許多 identification scheme 的核心，就是 prover 透過 Sigma-protocol 證明自己知道某個秘密。例如 Schnorr identification 與 Guillou–Quisquater identification 都屬於這個範疇。在這種設定下，攻擊者的目標通常是假冒合法 prover，通過 verifier 的隨機挑戰。Sigma-protocol 在這裡提供了一個非常自然的分析框架。一方面，zero-knowledge 顯示互動過程本身不應洩漏秘密，因此觀察 transcript 不足以學會 witness；另一方面，special soundness 則說明，若某個攻擊者真的能穩定地通過驗證，那麼透過 rewinding 往往就能把它轉成一個 witness extractor，進一步連到 underlying hard problem。也就是說，成功 impersonation 通常不只是「騙過 verifier」，而會被解讀成「其實已掌握秘密」。

Sigma-protocol 與 Fiat–Shamir transformation 的關係也非常密切。Fiat–Shamir 的基本想法，是把原本由 verifier 隨機給出的 challenge $c$，改成由雜湊函數決定，例如
$$
c = H(x,a).
$$
這樣原本的三步驟互動協定
$$
a \to c \to z
$$
就能改寫成非互動形式。

若把訊息 $m$ 一起納入雜湊，便得到典型的 Fiat–Shamir 型簽章結構：

1. signer 先產生 $a$；
2. 再計算
   $$
   c=H(m,x,a);
   $$
3. 最後輸出 $(a,z)$ 作為簽章。

這正是 Schnorr signature 等簽章方案的核心形式。不過，一旦從互動版轉為非互動版，安全性分析通常就不再只是直接套用 Sigma-protocol 的三個性質，而必須進一步在 random oracle model 中分析。這時 rewinding、forking lemma、tight reduction 與 square-root loss 等議題便自然出現。

## Challenge Space, Transcripts, and the Square-Root Barrier

Sigma-protocol 的安全性也與 challenge space 的大小密切相關。若 challenge 空間太小，攻擊者就可能靠猜測 verifier 將送出的 challenge 來提高成功率；若 challenge 空間夠大，則單次猜中的機率就會很低。從這個角度看，challenge 的不可預測性本身就是 soundness 的重要來源。

若 challenge space 記為 $\mathcal{C}$，而某個不知道 witness 的偽造者只能事先準備對其中一個 challenge 的回答，那麼它成功的機率通常不會超過
$$
\frac{1}{|\mathcal{C}|}.
$$
這也說明了為何 verifier 的 challenge 必須是隨機且在 prover 送出第一訊息之後才決定。若 challenge 可預測，Sigma-protocol 的 soundness 便會大幅削弱。

從 transcript 的角度看，Sigma-protocol 其實同時控制了兩件事。第一，單一 accepting transcript
$$
(a,c,z)
$$
應當是可以被模擬的，因此它本身不該洩漏 witness，這對應到 SHVZK。第二，若存在兩份具有相同第一訊息、但 challenge 不同的 accepting transcripts，則它們合在一起應能抽出 witness，這對應到 special soundness。

因此，Sigma-protocol 最核心的數學特徵可以概括成一句話：單看一份 transcript 沒有知識可抽，但兩份相容而 challenge 不同的 transcript 合起來就足以暴露 witness。這種結構正是它能同時表現出零知識與知識擷取性的原因。

Sigma-protocol 常見於離散對數知識證明、RSA 型 witness 的知識證明、identification schemes、zero-knowledge proof 的基本模組，以及 Fiat–Shamir 型簽章。很多更複雜的協定，其實都可以拆成若干個 Sigma-protocol 或其變形來理解，因此它不只是一類特定協定，而是一種非常基本的設計範式。

在許多 Fiat–Shamir 型簽章的安全證明中，底層互動協定往往就是某種 Sigma-protocol。經典證明通常會透過 rewinding 或 forking，試圖從一個成功偽造者手中取得兩份具有相同第一訊息、但 challenge 不同的 accepting transcripts，然後再利用 special soundness 抽出 witness。

這種方法雖然自然，也與 Sigma-protocol 的結構高度一致，但往往不是 tight 的。原因正是：reduction 為了得到兩個不同 challenge 下都成功的 transcript，通常需要額外的分叉與重試，而這會帶來明顯的機率損失。在許多重要例子中，這種損失正表現為典型的 square-root loss。也因此，Sigma-protocol 不只是零知識與 identification 的基本工具，同時也是後續 tight reduction、forking lemma 與 square-root barrier 討論的起點。