---
layout: page
title: Computing Pi
date: 2026-11-03
last_updated: 2026-11-03
---

圓周率 $\pi$ 是圓周長與直徑的比值，也是 $\sin x$ 的最小正零點。$\pi$ 是無理數（Lambert, 1761），也是超越數（Lindemann, 1882），因此十進位展開 {% include oeis.html id="A000796" %} 不會終止也不會循環，只能用逼近的方式計算。

$$
\pi = 3.14159265358979323846264338327950288419716939937510\ldots
$$

各種計算方法的差別主要在**收斂速度**：每多做一步（一項、一次迭代）能多得幾位正確的數字。

## 幾何法：正多邊形逼近

Archimedes 用圓的內接與外切正 $n$ 邊形夾住圓周長。設單位圓（直徑 $1$）的內接正 $n$ 邊形周長為 $p_n$、外切正 $n$ 邊形周長為 $P_n$，則 $p_n < \pi < P_n$，且邊數加倍時

$$
P_{2n} = \frac{2 p_n P_n}{p_n + P_n}, \qquad p_{2n} = \sqrt{p_n P_{2n}}
$$

也就是調和平均與幾何平均交替進行。從正六邊形 $p_6 = 3$、$P_6 = 2\sqrt{3}$ 出發，加倍四次到正 $96$ 邊形，可得 $3\tfrac{10}{71} < \pi < 3\tfrac{1}{7}$。

<div class="remark">
每次邊數加倍，誤差大約縮小為原來的 $1/4$，也就是每次迭代只多約 $0.6$ 位數字，收斂很慢。
</div>

## 無窮級數

### Leibniz 級數

由 $\arctan x = \sum_{k \ge 0} \frac{(-1)^k x^{2k+1}}{2k+1}$（$|x| \le 1$）代入 $x = 1$：

$$
\frac{\pi}{4} = 1 - \frac{1}{3} + \frac{1}{5} - \frac{1}{7} + \cdots
$$

交錯級數的誤差不超過下一項，取 $N$ 項的誤差約為 $1/(2N)$，要 $d$ 位數字需要約 $10^d$ 項，實用上不可行。

### Machin 型公式

讓 $\arctan$ 的引數變小，級數就收斂得快。Machin（1706）的公式：

$$
\frac{\pi}{4} = 4 \arctan \frac{1}{5} - \arctan \frac{1}{239}
$$

驗證方式是用複數：$\arctan \frac{1}{a} = \arg(a + i)$，而

$$
\frac{(5+i)^4}{239+i} = \frac{476 + 480i}{239 + i} = 2 + 2i
$$

其輻角為 $\pi/4$。$\arctan(1/5)$ 每項約多 $\log_{10} 25 \approx 1.4$ 位數字。電腦時代之前的紀錄多半用這類公式，例如 Shanks 在 1873 年算到 707 位（第 528 位起錯誤）。

### Euler 的 Basel 級數

$$
\frac{\pi^2}{6} = \sum_{n \ge 1} \frac{1}{n^2}
$$

形式漂亮但誤差約 $1/N$，收斂同樣很慢，多用來展示 $\pi$ 與數論的關係。

## 快速收斂級數

### Ramanujan 級數

Ramanujan（1914）給出一系列與模函數相關的級數，其中最有名的是

$$
\frac{1}{\pi} = \frac{2\sqrt{2}}{9801} \sum_{k \ge 0} \frac{(4k)!\,(1103 + 26390k)}{(k!)^4\, 396^{4k}}
$$

每一項約多 $8$ 位數字。

### Chudnovsky 公式

Chudnovsky 兄弟（1988）的公式：

$$
\frac{1}{\pi} = 12 \sum_{k \ge 0} \frac{(-1)^k (6k)!\,(13591409 + 545140134k)}{(3k)!\,(k!)^3\, 640320^{3k + 3/2}}
$$

每一項約多 $14$ 位數字，是目前打破 $\pi$ 位數紀錄的標準做法（如 y-cruncher）。

<div class="remark">
係數 $640320^3$ 與 $e^{\pi\sqrt{163}} \approx 640320^3 + 744$ 有關，來自類數為 $1$ 的虛二次域 $\mathbb{Q}(\sqrt{-163})$。
</div>

## 迭代法：AGM

### Gauss–Legendre 演算法

利用算術幾何平均（AGM）與橢圓積分的關係，Brent 與 Salamin（1976）各自獨立提出以下迭代：

<div class="algorithm">
<p><strong>Gauss–Legendre algorithm.</strong></p>
<ol>
<li>Set $a_0 = 1$, $b_0 = 1/\sqrt{2}$, $t_0 = 1/4$, $p_0 = 1$.</li>
<li>Repeat:
$a_{n+1} = \frac{a_n + b_n}{2}$, $b_{n+1} = \sqrt{a_n b_n}$, $t_{n+1} = t_n - p_n (a_n - a_{n+1})^2$, $p_{n+1} = 2 p_n$.</li>
<li>Output $\pi \approx \frac{(a_{n+1} + b_{n+1})^2}{4 t_{n+1}}$.</li>
</ol>
</div>

此迭代**二次收斂**：每次迭代正確位數約加倍，$25$ 次迭代即可得到超過 $4500$ 萬位。代價是每一步都需要全精度的開根號與乘法。

### Borwein 演算法

Borwein 兄弟（1980 年代）給出三次、四次甚至更高次收斂的迭代，每次迭代位數乘以 $3$、$4$ 倍。

## 數位抽取：BBP 公式

Bailey、Borwein、Plouffe（1995）發現

$$
\pi = \sum_{k \ge 0} \frac{1}{16^k} \left( \frac{4}{8k+1} - \frac{2}{8k+4} - \frac{1}{8k+5} - \frac{1}{8k+6} \right)
$$

因為分母是 $16^k$，乘上 $16^n$ 後取小數部分，配合模冪運算就能**直接算出第 $n$ 位十六進位數字**，不需要先算出前面的位數，記憶體只需 $O(\log n)$。常用來驗證大規模計算的結果。

## 機率法：Monte Carlo

### 隨機投點

在正方形 $[0,1]^2$ 中均勻隨機取點，落在四分之一圓 $x^2 + y^2 \le 1$ 內的機率為 $\pi/4$。投 $N$ 點的標準差約為 $1/\sqrt{N}$，每多一位數字需要 $100$ 倍的點。

### Buffon 投針

平行線間距為 $d$，隨機投長度 $\ell \le d$ 的針，針與線相交的機率為 $\frac{2\ell}{\pi d}$。同樣是 $1/\sqrt{N}$ 的收斂速度。

## 高精度計算的實作要點

算到數百萬位以上時，公式本身只是一部分，瓶頸在大數運算：

- **大數乘法**：用 Karatsuba、Toom–Cook，或 FFT／NTT 乘法（Schönhage–Strassen），把 $n$ 位乘法從 $O(n^2)$ 降到接近 $O(n \log n)$。
- **Binary splitting**：把級數的部分和寫成分數 $P(a,b)/Q(a,b)$ 並遞迴對半合併，讓大部分運算都是大小相近的整數相乘，配合快速乘法時 Chudnovsky 級數的總成本約為 $O(n \log^3 n)$。
- **除法與開根號**：用 Newton 法把它們轉成乘法。
- **驗證**：用兩種不同公式（如 Chudnovsky 與 Ramanujan）分別計算，或用 BBP 抽查尾端的十六進位數字。

<table class="table-center">
  <thead>
    <tr><th>方法</th><th>每步增加的位數</th><th>類型</th></tr>
  </thead>
  <tbody>
    <tr><td>正多邊形</td><td>約 $0.6$ 位／次加倍</td><td>線性</td></tr>
    <tr><td>Leibniz</td><td>$d$ 位需約 $10^d$ 項</td><td>次線性</td></tr>
    <tr><td>Machin</td><td>約 $1.4$ 位／項</td><td>線性</td></tr>
    <tr><td>Ramanujan</td><td>約 $8$ 位／項</td><td>線性</td></tr>
    <tr><td>Chudnovsky</td><td>約 $14$ 位／項</td><td>線性</td></tr>
    <tr><td>Gauss–Legendre</td><td>位數加倍／次</td><td>二次</td></tr>
    <tr><td>Monte Carlo</td><td>$N$ 增 $100$ 倍多 $1$ 位</td><td>機率性</td></tr>
  </tbody>
</table>
