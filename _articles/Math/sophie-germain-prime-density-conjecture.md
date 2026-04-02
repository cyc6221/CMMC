---
layout: page
title: Sophie-Germain Prime Density Conjecture
date: 2026-04-02
last_updated: 2026-04-02
label: "prime"
tags: [prime, conjecture, sophie-germain-primes]
---

Sophie-Germain prime 是指一個質數 $p$，滿足 $2p+1$ 也是質數。若以 $\pi_{SG}(x)$ 表示不超過 $x$ 的 Sophie-Germain primes 的個數，則其密度猜想預測，當 $x\to\infty$ 時，
$$
\pi_{SG}(x)\sim 2C_2\frac{x}{(\log x)^2},
$$
其中
$$
C_2=\prod_{p>2}\frac{p(p-2)}{(p-1)^2}
$$
為 twin prime constant。這表示 Sophie-Germain primes 被預期具有與 twin primes 類似的漸近分布規律，其數量約為 $\dfrac{x}{(\log x)^2}$ 的等級，而常數因子則由上述乘積給出。這個猜想可視為 Hardy–Littlewood 型質數分布預測在 $p$ 與 $2p+1$ 同時為質數這種情形下的具體表現。

<div class="definition">
<strong>Sophie-Germain Prime Density Conjecture</strong>
The number of primes $q \le m$ such that $2q + 1$ is also a prime is asymptotically $\dfrac{2C_2 m}{\ln^2 m}$ where $C_2$ is the twin prime constant (estimated to be approximately $0.66$). Primes $q$ with this property are called Sophie-Germain primes.
</div>

## To-read

- [A proof of Sophie Germain primes conjecture](https://hal.science/hal-02169242v11/file/SGPC_2021_jj.pdf)
- [A NOTE ON SOPHIE GERMAIN PRIMES](https://math.colgate.edu/~integers/z83/z83.pdf)
- [A question on the density of Sophie Germain primes](https://math.stackexchange.com/questions/3179484/a-question-on-the-density-of-sophie-germain-primes)
